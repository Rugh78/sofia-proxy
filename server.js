import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { buildPedagogyBlock } from './curriculum.js';

const app = new Hono();

// 🔒 1. Secure CORS (restrict to your actual domain + local dev)
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

// ✅ 2. Validation Middleware for /message endpoints ONLY
app.use('/message*', async (c, next) => {
  try {
    const body = await c.req.json();
    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return c.json({ error: { message: 'messages array is required and must not be empty' } }, 400);
    }
    c.set('body', body);
    await next();
  } catch {
    return c.json({ error: { message: 'Invalid JSON payload' } }, 400);
  }
});

// 🛡️ 3. Rate Limiting Helper (per-IP, using KV if available)
async function checkRateLimit(env, ip, limit = 60, windowSecs = 3600) {
  if (!env.TUTOR_CACHE) return true; // Skip if KV not configured
  const key = `rl:${ip}`;
  const current = Number(await env.TUTOR_CACHE.get(key) || 0);
  if (current >= limit) return false;
  await env.TUTOR_CACHE.put(key, String(current + 1), { expirationTtl: windowSecs });
  return true;
}

// 📉 4. Sliding Window: Trim conversation history to save tokens
function trimConversationHistory(messages, maxTurns = 6) {
  const system = messages.find(m => m.role === 'system');
  const history = messages.filter(m => m.role !== 'system');
  const trimmed = history.slice(-maxTurns);
  if (history.length > maxTurns) {
    trimmed.unshift({ role: 'system', content: '[Context: Earlier conversation summarized. Focus on the most recent exchanges above.]' });
  }
  return system ? [system, ...trimmed] : trimmed;
}

// 🔑 5. Cache Key Generator: NOW INCLUDES grade + subject + question
function makeCacheKey(subject, grade, question) {
  const norm = question.toLowerCase().replace(/[^\w\s]/g, '').trim().replace(/\s+/g, '_').slice(0, 60);
  const g = (grade || 'unknown').replace(/[^\w]/g, '_');
  const s = (subject || 'general').replace(/[^\w]/g, '_');
  return `qa:${s}:${g}:${norm}`;
}

// 🗄️ Firestore Helpers
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
function decodeField(field) {
  if (!field) return null;
  if ('stringValue' in field) return field.stringValue;
  if ('integerValue' in field) return Number(field.integerValue);
  if ('timestampValue' in field) return field.timestampValue;
  return null;
}
async function fetchStudentMemory(env, studentKey) {
  const res = await fetch(`${firestoreBase(env)}/sofia_profiles/${encodeURIComponent(studentKey)}?key=${env.FIREBASE_API_KEY}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  const fields = data.fields || {};
  return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, decodeField(v)]));
}
async function saveStudentMemory(env, studentKey, payload) {
  const res = await fetch(`${firestoreBase(env)}/sofia_profiles/${encodeURIComponent(studentKey)}?key=${env.FIREBASE_API_KEY}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: encodeFields(payload) }),
  });
  if (!res.ok) throw new Error(await res.text());
}

// 📥 Student Profile Routes
app.get('/student/:studentKey', async (c) => {
  if (!hasFirestore(c.env)) return c.json({ error: { message: 'Firestore not configured' } }, 503);
  try {
    return c.json({ student: await fetchStudentMemory(c.env, c.req.param('studentKey')) });
  } catch (err) {
    return c.json({ error: { message: err.message } }, 500);
  }
});

// ✅ FIX #1: Student POST route now parses its own body (not relying on /message middleware)
app.post('/student/:studentKey', async (c) => {
  if (!hasFirestore(c.env)) return c.json({ error: { message: 'Firestore not configured' } }, 503);
  try {
    const body = await c.req.json(); // ✅ Parse here, not via c.get('body')
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

// 🧠 Dynamic System Prompt Generator
app.post('/prompt', async (c) => {
  try {
    const { grade, subject, mode = 'guiada' } = await c.req.json();
    return c.json({ system: buildPedagogyBlock(mode, grade, subject) });
  } catch (err) {
    return c.json({ error: { message: err.message } }, 500);
  }
});

// 💬 Standard /message Endpoint (Non-Streaming)
app.post('/message', async (c) => {
  const { messages, system, userId = 'default_user', subject = 'general', grade = '1º ESO' } = c.get('body');
  const lastUserMsg = messages.filter(m => m.role === 'user').pop();

  // 🛡️ Rate limiting check
  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
  if (!(await checkRateLimit(c.env, ip))) {
    return c.json({ error: { message: 'Too many requests. Please wait a moment.' } }, 429);
  }

  // A. Check KV Cache — ✅ FIX #3: cache key now includes grade
  let cachedResponse = null;
  let isCached = false;
  if (c.env.TUTOR_CACHE && lastUserMsg?.content) {
    const cacheKey = makeCacheKey(subject, grade, lastUserMsg.content);
    cachedResponse = await c.env.TUTOR_CACHE.get(cacheKey);
    if (cachedResponse) isCached = true;
  }

  let aiText = cachedResponse;

  // B. Call Groq if not cached
  if (!isCached) {
    const trimmedMessages = trimConversationHistory(
      [{ role: 'system', content: system }, ...messages],
      6
    );

    // ✅ FIX #2: Switch to stronger model for pedagogical reasoning
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${c.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // ✅ Upgraded from 8b-instant
        messages: trimmedMessages,
        max_tokens: 900,
      }),
    });

    if (!groqRes.ok) {
      return c.json({ error: { message: await groqRes.text() } }, 500);
    }

    const data = await groqRes.json();
    aiText = data.choices?.[0]?.message?.content ?? '¡Lo siento! Error inesperado.';

    // C. Save to KV Cache (24h TTL) — ✅ grade included in key
    if (c.env.TUTOR_CACHE && aiText && !aiText.toLowerCase().includes('error') && !aiText.toLowerCase().includes('lo siento')) {
      const cacheKey = makeCacheKey(subject, grade, lastUserMsg?.content || '');
      await c.env.TUTOR_CACHE.put(cacheKey, aiText, { expirationTtl: 86400 }).catch(() => {});
    }
  }

  // D. Save to Firestore (fire-and-forget)
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

// 🌊 Streaming /message/stream Endpoint
app.post('/message/stream', async (c) => {
  const { messages, system, userId = 'default_user', subject = 'general', grade = '1º ESO' } = c.get('body');
  const lastUserMsg = messages.filter(m => m.role === 'user').pop();

  // 🛡️ Rate limiting
  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
  if (!(await checkRateLimit(c.env, ip))) {
    return c.json({ error: { message: 'Too many requests. Please wait a moment.' } }, 429);
  }

  // Check cache first — ✅ grade in key
  let cachedResponse = null;
  let isCached = false;
  if (c.env.TUTOR_CACHE && lastUserMsg?.content) {
    const cacheKey = makeCacheKey(subject, grade, lastUserMsg.content);
    cachedResponse = await c.env.TUTOR_CACHE.get(cacheKey);
    if (cachedResponse) isCached = true;
  }

  // Return cached as simulated SSE if found
  if (isCached) {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(` ${JSON.stringify({ choices: [{ delta: { content: cachedResponse } }] })}\n\n`));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      }
    });
    c.header('Content-Type', 'text/event-stream');
    c.header('Cache-Control', 'no-cache');
    c.header('Connection', 'keep-alive');
    return c.body(stream);
  }

  // Trim history for Groq
  const trimmedMessages = trimConversationHistory(
    [{ role: 'system', content: system }, ...messages],
    6
  );

  // ✅ FIX #2: Use stronger model
  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${c.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: trimmedMessages,
      max_tokens: 900,
      stream: true,
    }),
  });

  if (!groqRes.ok) {
    return c.json({ error: { message: await groqRes.text() } }, 500);
  }

  c.header('Content-Type', 'text/event-stream');
  c.header('Cache-Control', 'no-cache');
  c.header('Connection', 'keep-alive');

  // Pipe through TransformStream to capture full text for caching & Firestore
  let fullResponse = '';
  const transformStream = new TransformStream({
    transform(chunk, controller) {
      const text = new TextDecoder().decode(chunk);
      const lines = text.split('\n');
      for (const line of lines) {
        if (line.startsWith(' ') && line !== ' [DONE]') {
          try {
            const parsed = JSON.parse(line.slice(6));
            const delta = parsed.choices?.[0]?.delta?.content || '';
            fullResponse += delta;
          } catch {}
        }
      }
      controller.enqueue(chunk);
    },
    flush() {
      if (hasFirestore(c.env) && fullResponse) {
        const lastUser = lastUserMsg || messages[messages.length - 1];
        const fsBase = firestoreBase(c.env);
        const saveMsg = async (role, content) => {
          await fetch(`${fsBase}/sofia_messages/${userId}/history?key=${c.env.FIREBASE_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fields: { role: { stringValue: role }, content: { stringValue: content }, timestamp: { timestampValue: new Date().toISOString() } }
            })
          });
        };
        c.executionCtx.waitUntil(Promise.all([
          saveMsg(lastUser.role, lastUser.content),
          saveMsg('assistant', fullResponse)
        ]));
        if (c.env.TUTOR_CACHE) {
          const cacheKey = makeCacheKey(subject, grade, lastUserMsg?.content || '');
          c.env.TUTOR_CACHE.put(cacheKey, fullResponse, { expirationTtl: 86400 }).catch(() => {});
        }
      }
    }
  });

  return c.body(groqRes.body.pipeThrough(transformStream));
});

app.get('/', (c) => c.text('Sofía Worker OK'));
export default app;
