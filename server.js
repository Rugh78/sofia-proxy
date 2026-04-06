import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('/*', cors());

function firestoreBase(env) {
  return `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents`;
}

function hasFirestore(env) {
  return Boolean(env.FIREBASE_PROJECT_ID && env.FIREBASE_API_KEY);
}

function encodeFields(data) {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (typeof value === 'number') return [key, { integerValue: String(Math.trunc(value)) }];
      return [key, { stringValue: value == null ? '' : String(value) }];
    })
  );
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

app.get('/student/:studentKey', async (c) => {
  if (!hasFirestore(c.env)) {
    return c.json({ error: { message: 'Firestore not configured' } }, 503);
  }
  try {
    const studentKey = c.req.param('studentKey');
    const data = await fetchStudentMemory(c.env, studentKey);
    return c.json({ student: data });
  } catch (err) {
    return c.json({ error: { message: err.message } }, 500);
  }
});

app.post('/student/:studentKey', async (c) => {
  if (!hasFirestore(c.env)) {
    return c.json({ error: { message: 'Firestore not configured' } }, 503);
  }
  try {
    const studentKey = c.req.param('studentKey');
    const body = await c.req.json();
    await saveStudentMemory(c.env, studentKey, {
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

app.post('/message', async (c) => {
  const { messages, system, userId = 'default_user' } = await c.req.json();

  // ── 1. Call Groq ──
  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${c.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: system }, ...messages],
      max_tokens: 1024,
    }),
  });

  if (!groqRes.ok) {
    const err = await groqRes.text();
    return c.json({ error: { message: err } }, 500);
  }

  const data = await groqRes.json();
  const aiText = data.choices?.[0]?.message?.content ?? '¡Lo siento! Error inesperado.';

  // ── 2. Save to Firestore (fire-and-forget) ──
  if (hasFirestore(c.env)) {
    const fsBase = firestoreBase(c.env);
    const saveMsg = async (role, content) => {
      await fetch(
        `${fsBase}/sofia_messages/${userId}/history?key=${c.env.FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: {
              role:      { stringValue: role },
              content:   { stringValue: typeof content === 'string' ? content : JSON.stringify(content) },
              timestamp: { timestampValue: new Date().toISOString() },
            },
          }),
        }
      );
    };
    const lastUser = messages[messages.length - 1];
    c.executionCtx.waitUntil(
      Promise.all([
        saveMsg(lastUser.role, lastUser.content),
        saveMsg('assistant', aiText),
      ])
    );
  }

  // ── 3. Return response ──
  return c.json({ content: [{ type: 'text', text: aiText }] });
});

app.get('/', (c) => c.text('Sofía Worker OK'));

export default app;
