import { Hono } from 'hono';
import { cors } from 'hono/cors';

// Nota: Importamos buildPedagogyBlock si lo tienes en un archivo aparte, 
// o asegúrate de que esté disponible en tu entorno de despliegue.
// Si no lo tienes aparte, pega aquí la lógica de curriculum.js
import { buildPedagogyBlock } from './curriculum.js';

const app = new Hono();

// 🔒 1. Configuración de CORS
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

// ✅ 2. Middleware de Validación
app.use('/message*', async (c, next) => {
  try {
    const body = await c.req.json();
    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return c.json({ error: { message: 'messages array is required' } }, 400);
    }
    c.set('body', body);
    await next();
  } catch {
    return c.json({ error: { message: 'Invalid JSON payload' } }, 400);
  }
});

// 🛡️ 3. Control de Límite de Peticiones (Rate Limit)
async function checkRateLimit(env, ip, limit = 100, windowSecs = 3600) {
  if (!env.TUTOR_CACHE) return true; 
  const key = `rl:${ip}`;
  const current = Number(await env.TUTOR_CACHE.get(key) || 0);
  if (current >= limit) return false;
  await env.TUTOR_CACHE.put(key, String(current + 1), { expirationTtl: windowSecs });
  return true;
}

// 📉 4. Recorte de historial para ahorrar tokens
function trimConversationHistory(messages, maxTurns = 6) {
  const system = messages.find(m => m.role === 'system');
  const history = messages.filter(m => m.role !== 'system');
  const trimmed = history.slice(-maxTurns);
  if (history.length > maxTurns) {
    trimmed.unshift({ role: 'system', content: '[Contexto: Resumen de la conversación anterior para ahorrar memoria]' });
  }
  return system ? [system, ...trimmed] : trimmed;
}

// 🔑 5. Generador de llaves de Cache
function makeCacheKey(subject, grade, question) {
  const norm = question.toLowerCase().replace(/[^\w\s]/g, '').trim().replace(/\s+/g, '_').slice(0, 60);
  const g = (grade || '1_ESO').replace(/[^\w]/g, '_');
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
  const data = await res.json();
  const fields = data.fields || {};
  return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, decodeField(v)]));
}

async function saveStudentMemory(env, studentKey, payload) {
  await fetch(`${firestoreBase(env)}/sofia_profiles/${encodeURIComponent(studentKey)}?key=${env.FIREBASE_API_KEY}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: encodeFields(payload) }),
  });
}

// 📥 Rutas de Perfil del Alumno
app.get('/student/:studentKey', async (c) => {
  if (!hasFirestore(c.env)) return c.json({ error: { message: 'Firestore no configurado' } }, 503);
  try {
    const student = await fetchStudentMemory(c.env, c.req.param('studentKey'));
    return c.json({ student });
  } catch (err) {
    return c.json({ error: { message: err.message } }, 500);
  }
});

app.post('/student/:studentKey', async (c) => {
  if (!hasFirestore(c.env)) return c.json({ error: { message: 'Firestore no configurado' } }, 503);
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

// 💬 Endpoint /message (No-Streaming)
app.post('/message', async (c) => {
  const { messages, system, userId = 'default_user', subject = 'general', grade = '1º ESO' } = c.get('body');
  const lastUserMsg = messages.filter(m => m.role === 'user').pop();

  const ip = c.req.header('cf-connecting-ip') || 'unknown';
  if (!(await checkRateLimit(c.env, ip))) {
    return c.json({ error: { message: 'Límite de mensajes alcanzado. Espera un momento.' } }, 429);
  }

  // Verificar Cache KV
  let aiText = null;
  let isCached = false;
  if (c.env.TUTOR_CACHE && lastUserMsg?.content) {
    const cacheKey = makeCacheKey(subject, grade, lastUserMsg.content);
    aiText = await c.env.TUTOR_CACHE.get(cacheKey);
    if (aiText) isCached = true;
  }

  // Si no está en cache, llamar a Groq
  if (!isCached) {
    const trimmedMessages = trimConversationHistory([{ role: 'system', content: system }, ...messages], 6);

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${c.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // MODELO RÁPIDO Y BARATO
        messages: trimmedMessages,
        max_tokens: 500,               // SUFICIENTE PARA RESPUESTAS CORTAS
        temperature: 0.7
      }),
    });

    if (!groqRes.ok) {
      const errorText = await groqRes.text();
      return c.json({ error: { message: errorText } }, 500);
    }

    const data = await groqRes.json();
    aiText = data.choices?.[0]?.message?.content ?? '¡Lo siento! Hubo un error.';

    // Guardar en Cache si la respuesta es válida
    if (c.env.TUTOR_CACHE && aiText && aiText.length > 5) {
      const cacheKey = makeCacheKey(subject, grade, lastUserMsg?.content || '');
      await c.env.TUTOR_CACHE.put(cacheKey, aiText, { expirationTtl: 86400 });
    }
  }

  // Guardar en Firestore (sin esperar para no bloquear la respuesta)
  if (hasFirestore(c.env)) {
    const fsBase = firestoreBase(c.env);
    const saveMsg = async (role, content) => {
      await fetch(`${fsBase}/sofia_messages/${userId}/history?key=${c.env.FIREBASE_API_KEY}`, {
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
      saveMsg(lastUserMsg?.role || 'user', lastUserMsg?.content || ''),
      saveMsg('assistant', aiText)
    ]));
  }

  return c.json({ content: [{ type: 'text', text: aiText }], cached: isCached });
});

app.get('/', (c) => c.text('Sofía Worker Activo y Optimizado'));

export default app;
