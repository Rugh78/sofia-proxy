import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { buildPedagogyBlock } from './curriculum.js';

const app = new Hono();

// 🔒 Secure CORS for your actual domain
app.use('/*', async (c, next) => {
  const origins = (c.env.ALLOWED_ORIGINS || '').split(',').map(o => o.trim()).filter(Boolean);
  const fallback = ['https://sofia-tutora.pages.dev', 'http://localhost:5173', 'http://localhost:8787'];
  return cors({
    origin: origins.length > 0 ? origins : fallback,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })(c, next);
});

// 🛡️ Rate limiting helper (uses KV if available)
async function checkRateLimit(env, ip, limit = 60, windowSecs = 3600) {
  if (!env.TUTOR_CACHE) return true;
  const key = `rl:${ip}`;
  const current = Number(await env.TUTOR_CACHE.get(key) || 0);
  if (current >= limit) return false;
  await env.TUTOR_CACHE.put(key, String(current + 1), { expirationTtl: windowSecs });
  return true;
}

// 📉 Sliding window: keep last 6 turns to save tokens
function trimConversationHistory(messages, maxTurns = 6) {
  const system = messages.find(m => m.role === 'system');
  const history = messages.filter(m => m.role !== 'system');
  const trimmed = history.slice(-maxTurns);
  if (history.length > maxTurns) {
    trimmed.unshift({ role: 'system', content: '[Context: Earlier conversation summarized.]' });
  }
  return system ? [system, ...trimmed] : trimmed;
}

// 🔑 Cache key: includes subject + grade + question
function makeCacheKey(subject, grade, question) {
  const norm = question.toLowerCase().replace(/[^\w\s]/g, '').trim().replace(/\s+/g, '_').slice(0, 60);
  return `qa:${(subject||'general').replace(/[^\w]/g,'_')}:${(grade||'1º_ESO').replace(/[^\w]/g,'_')}:${norm}`;
}

// 🗄️ Firestore helpers
function firestoreBase(env) {
  return `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents`;
}
function hasFirestore(env) {
  return Boolean(env.FIREBASE_PROJECT_ID && env.FIREBASE_API_KEY);
}
function encodeFields(data) {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => {
    if (typeof value === 'number') return [key, { integerValue: String(Math.trunc(value)) }];
    return [key, { stringValue: value == null ? '' : String(value) }];
  }));
}
async function saveStudentMemory(env, studentKey, payload) {
  const res = await fetch(`${firestoreBase(env)}/sofia_profiles/${encodeURIComponent(studentKey)}?key=${env.FIREBASE_API_KEY}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: encodeFields(payload) }),
  });
  if (!res.ok) throw new Error(await res.text());
}

// Student routes
app.get('/student/:studentKey', async (c) => {
  if (!hasFirestore(c.env)) return c.json({ error: { message: 'Firestore not configured' } }, 503);
  try {
    const res = await fetch(`${firestoreBase(c.env)}/sofia_profiles/${encodeURIComponent(c.req.param('studentKey'))}?key=${c.env.FIREBASE_API_KEY}`);
    if (res.status === 404) return c.json({ student: null });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    const fields = data.fields || {};
    const student = Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, v.stringValue || v.integerValue || null]));
    return c.json({ student });
  } catch (err) {
    return c.json({ error: { message: err.message } }, 500);
  }
});

app.post('/student/:studentKey', async (c) => {
  if (!hasFirestore(c.env)) return c.json({ error: { message: 'Firestore not configured' } }, 503);
  try {
    const body = await c.req.json();
    await saveStudentMemory(c.env, c.req.param('studentKey'), {
      profileJson: JSON.stringify(body.profile || {}),
      progressJson: JSON.stringify(body.progress || {}),
      sessionsJson: JSON.stringify(body.sessions || []),
      updatedAt: new Date().toISOString(),
    });
    return c.json({ ok: true });
  } catch (err) {
    return c.json({ error: { message: err.message } }, 500);
  }
});

// Prompt generator (for dynamic system prompts)
app.post('/prompt', async (c) => {
  try {
    const { grade, subject, mode = 'guiada' } = await c.req.json();
    return c.json({ system: buildPedagogyBlock(mode, grade, subject) });
  } catch (err) {
    return c.json({ error: { message: err.message } }, 500);
  }
});

// 💬 ONLY ONE Groq call: Standard /message endpoint
app.post('/message', async (c) => {
  const { messages, system, userId = 'default_user', subject = 'general', grade = '1º ESO' } = await c.req.json();
  const lastUserMsg = messages.filter(m => m.role === 'user').pop();

  // Rate limit
  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
  if (!(await checkRateLimit(c.env, ip))) {
    return c.json({ error: { message: 'Too many requests. Please wait.' } }, 429);
  }

  // Check cache first
  let aiText = null;
  let isCached = false;
  if (c.env.TUTOR_CACHE && lastUserMsg?.content) {
    const cacheKey = makeCacheKey(subject, grade, lastUserMsg.content);
    aiText = await c.env.TUTOR_CACHE.get(cacheKey);
    if (aiText) isCached = true;
  }

  // Call Groq ONLY if not cached
  if (!isCached) {
    const trimmed = trimConversationHistory([{ role: 'system', content: system }, ...messages], 6);
    
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${c.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // ✅ Stronger model for pedagogy
        messages: trimmed,                 // ✅ Sliding window saves tokens
        max_tokens: 900,                   // ✅ Increased from 400
      }),
    });
    
    if (!groqRes.ok) return c.json({ error: { message: await groqRes.text() } }, 500);
    const data = await groqRes.json();
    aiText = data.choices?.[0]?.message?.content ?? '¡Lo siento! Error inesperado.';

    // Save to cache (24h TTL)
    if (c.env.TUTOR_CACHE && aiText && !/error|lo siento/i.test(aiText)) {
      const cacheKey = makeCacheKey(subject, grade, lastUserMsg?.content || '');
      await c.env.TUTOR_CACHE.put(cacheKey, aiText, { expirationTtl: 86400 }).catch(() => {});
    }
  }

  // Save to Firestore (fire-and-forget)
  if (hasFirestore(c.env)) {
    const lastUser = lastUserMsg || messages[messages.length - 1];
    const saveMsg = async (role, content) => {
      await fetch(`${firestoreBase(c.env)}/sofia_messages/${userId}/history?key=${c.env.FIREBASE_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            role: { stringValue: role },
            content: { stringValue: typeof content === 'string' ? content : JSON.stringify(content) },
            timestamp: { timestampValue: new Date().toISOString() },
          },
        }),
      });
    };
    c.executionCtx.waitUntil(Promise.all([
      saveMsg(lastUser.role, lastUser.content),
      saveMsg('assistant', aiText),
    ]));
  }

  return c.json({ content: [{ type: 'text', text: aiText }], cached: isCached });
});

app.get('/', (c) => c.text('Sofía Worker OK'));
export default app;
