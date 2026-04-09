import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('/*', cors());

// ── CONSTANTS ─────────────────────────────────────────────────────────────────

const GROQ_MODEL   = 'llama-3.3-70b-versatile';
const MAX_TOKENS   = 1024;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const VALID_SUBJECTS = ['Matemáticas', 'Biología', 'Física y Química', 'Historia', 'Lengua', 'Inglés'];


// ── FIRESTORE HELPERS ─────────────────────────────────────────────────────────

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
  if ('stringValue'    in field) return field.stringValue;
  if ('integerValue'   in field) return Number(field.integerValue);
  if ('timestampValue' in field) return field.timestampValue;
  return null;
}

async function fetchStudentMemory(env, studentKey) {
  const res = await fetch(
    `${firestoreBase(env)}/sofia_profiles/${encodeURIComponent(studentKey)}?key=${env.FIREBASE_API_KEY}`
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(await res.text());
  const data   = await res.json();
  const fields = data.fields || {};
  return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, decodeField(v)]));
}

async function saveStudentMemory(env, studentKey, payload) {
  const res = await fetch(
    `${firestoreBase(env)}/sofia_profiles/${encodeURIComponent(studentKey)}?key=${env.FIREBASE_API_KEY}`,
    {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ fields: encodeFields(payload) }),
    }
  );
  if (!res.ok) throw new Error(await res.text());
}

async function saveMessageToFirestore(env, userId, subject, role, content) {
  const safeUserId = (userId  || 'anonymous').replace(/[^a-zA-Z0-9_-]/g, '_');
  const safeSubj   = (subject || 'unknown'  ).replace(/[^a-zA-Z0-9_-]/g, '_');
  const timestamp  = new Date().toISOString();
  const documentId = `${safeUserId}_${safeSubj}_${timestamp}_${role}`;
  const contentStr = typeof content === 'string' ? content : JSON.stringify(content);

  await fetch(
    `${firestoreBase(env)}/sofia_messages/${encodeURIComponent(documentId)}?key=${env.FIREBASE_API_KEY}`,
    {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          userId:    { stringValue: safeUserId },
          subject:   { stringValue: subject || 'unknown' },
          role:      { stringValue: role },
          content:   { stringValue: contentStr },
          timestamp: { timestampValue: timestamp },
        },
      }),
    }
  );
}

async function saveSubjectSessions(env, studentKey, sessionsPerSubject) {
  const fields = {};
  for (const [subj, sessions] of Object.entries(sessionsPerSubject)) {
    const safeKey = subj.replace(/[^a-zA-Z0-9_]/g, '_');
    fields[safeKey] = { stringValue: JSON.stringify(sessions) };
  }
  fields.updatedAt = { stringValue: new Date().toISOString() };

  const res = await fetch(
    `${firestoreBase(env)}/sofia_subject_sessions/${encodeURIComponent(studentKey)}?key=${env.FIREBASE_API_KEY}`,
    {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ fields }),
    }
  );
  if (!res.ok) throw new Error(await res.text());
}

async function fetchSubjectSessions(env, studentKey) {
  const res = await fetch(
    `${firestoreBase(env)}/sofia_subject_sessions/${encodeURIComponent(studentKey)}?key=${env.FIREBASE_API_KEY}`
  );
  if (res.status === 404) return {};
  if (!res.ok) throw new Error(await res.text());
  const data   = await res.json();
  const fields = data.fields || {};
  const result = {};
  for (const [key, field] of Object.entries(fields)) {
    if (key === 'updatedAt') continue;
    try {
      const subj = VALID_SUBJECTS.find(s => s.replace(/[^a-zA-Z0-9_]/g, '_') === key) || key;
      result[subj] = JSON.parse(decodeField(field) || '[]');
    } catch { result[key] = []; }
  }
  return result;
}


// ── MESSAGE SANITISATION ──────────────────────────────────────────────────────

function sanitiseMessages(messages) {
  return messages.map(msg => {
    if (!Array.isArray(msg.content)) return msg;
    const textParts = msg.content
      .filter(part => part.type === 'text')
      .map(part => part.text)
      .join('\n')
      .trim();
    return { ...msg, content: textParts || '[Image attached — describe what you see in it]' };
  });
}


// ── ROUTES ────────────────────────────────────────────────────────────────────

// GET /student/:studentKey
app.get('/student/:studentKey', async (c) => {
  if (!hasFirestore(c.env)) return c.json({ error: { message: 'Firestore not configured' } }, 503);
  try {
    const data = await fetchStudentMemory(c.env, c.req.param('studentKey'));
    return c.json({ student: data });
  } catch (err) { return c.json({ error: { message: err.message } }, 500); }
});

// POST /student/:studentKey
app.post('/student/:studentKey', async (c) => {
  if (!hasFirestore(c.env)) return c.json({ error: { message: 'Firestore not configured' } }, 503);
  try {
    const studentKey = c.req.param('studentKey');
    const body = await c.req.json();
    await saveStudentMemory(c.env, studentKey, {
      profileJson:  JSON.stringify(body.profile  || {}),
      progressJson: JSON.stringify(body.progress || {}),
      updatedAt:    new Date().toISOString(),
    });
    if (body.sessionsPerSubject && typeof body.sessionsPerSubject === 'object') {
      await saveSubjectSessions(c.env, studentKey, body.sessionsPerSubject);
    }
    return c.json({ ok: true });
  } catch (err) { return c.json({ error: { message: err.message } }, 500); }
});

// GET /sessions/:studentKey — all subjects
app.get('/sessions/:studentKey', async (c) => {
  if (!hasFirestore(c.env)) return c.json({ error: { message: 'Firestore not configured' } }, 503);
  try {
    const sessions = await fetchSubjectSessions(c.env, c.req.param('studentKey'));
    return c.json({ sessions });
  } catch (err) { return c.json({ error: { message: err.message } }, 500); }
});

// GET /sessions/:studentKey/:subject — one subject
app.get('/sessions/:studentKey/:subject', async (c) => {
  if (!hasFirestore(c.env)) return c.json({ error: { message: 'Firestore not configured' } }, 503);
  try {
    const studentKey = c.req.param('studentKey');
    const subject    = decodeURIComponent(c.req.param('subject'));
    if (!VALID_SUBJECTS.includes(subject))
      return c.json({ error: { message: `Unknown subject: ${subject}` } }, 400);
    const all = await fetchSubjectSessions(c.env, studentKey);
    return c.json({ sessions: all[subject] || [] });
  } catch (err) { return c.json({ error: { message: err.message } }, 500); }
});

// POST /message
app.post('/message', async (c) => {
  let body;
  try { body = await c.req.json(); }
  catch { return c.json({ error: { message: 'Invalid JSON in request body' } }, 400); }

  const { system, userId = 'anonymous', subject = 'unknown' } = body;
  const messages = body.messages;

  if (!Array.isArray(messages) || messages.length === 0)
    return c.json({ error: { message: '`messages` must be a non-empty array' } }, 400);
  if (!system || typeof system !== 'string')
    return c.json({ error: { message: '`system` must be a non-empty string' } }, 400);

  const sanitised = sanitiseMessages(messages);

  let groqRes;
  try {
    groqRes = await fetch(GROQ_API_URL, {
      method:  'POST',
      headers: { 'Authorization': `Bearer ${c.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model:      GROQ_MODEL,
        max_tokens: MAX_TOKENS,
        messages:   [{ role: 'system', content: system }, ...sanitised],
      }),
    });
  } catch (err) { return c.json({ error: { message: `Groq fetch failed: ${err.message}` } }, 502); }

  if (!groqRes.ok) {
    const errText = await groqRes.text();
    return c.json({ error: { message: `Groq error ${groqRes.status}: ${errText}` } }, 502);
  }

  let groqData;
  try { groqData = await groqRes.json(); }
  catch { return c.json({ error: { message: 'Failed to parse Groq response' } }, 502); }

  const aiText = groqData.choices?.[0]?.message?.content?.trim()
    ?? '¡Lo siento! Hubo un error inesperado. Por favor, inténtalo de nuevo.';

  if (hasFirestore(c.env)) {
    const lastUser = sanitised[sanitised.length - 1];
    c.executionCtx.waitUntil(
      Promise.allSettled([
        saveMessageToFirestore(c.env, userId, subject, lastUser.role, lastUser.content),
        saveMessageToFirestore(c.env, userId, subject, 'assistant', aiText),
      ])
    );
  }

  return c.json({ content: [{ type: 'text', text: aiText }] });
});

app.get('/', (c) => c.text('Sofía Worker OK'));

export default app;
