import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('/*', cors());

// ── CONSTANTS ─────────────────────────────────────────────────────────────────

const GROQ_MODEL_TEXT   = 'llama-3.3-70b-versatile';   // text-only
const GROQ_MODEL_VISION = 'meta-llama/llama-4-scout-17b-16e-instruct'; // vision
const MAX_TOKENS        = 1024;
const GROQ_API_URL      = 'https://api.groq.com/openai/v1/chat/completions';

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

/**
 * Check whether any message in the array contains image content.
 */
function messagesHaveImages(messages) {
  return messages.some(msg =>
    Array.isArray(msg.content) && msg.content.some(p => p.type === 'image')
  );
}

/**
 * Convert Anthropic-style image objects to Groq/OpenAI vision format.
 * Groq vision expects: { type: 'image_url', image_url: { url: 'data:...' } }
 */
function formatForVision(messages) {
  return messages.map(msg => {
    if (!Array.isArray(msg.content)) return msg;
    const parts = msg.content.map(part => {
      if (part.type === 'text') return { type: 'text', text: part.text };
      if (part.type === 'image' && part.source?.type === 'base64') {
        return {
          type: 'image_url',
          image_url: { url: `data:${part.source.media_type};base64,${part.source.data}` },
        };
      }
      return null;
    }).filter(Boolean);
    return { ...msg, content: parts };
  });
}

/**
 * Strip all image content — used when routing to the text-only model.
 * Replaces image-only messages with a placeholder text.
 */
function sanitiseToText(messages) {
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

  // Route to vision model if the student attached an image, text-only model otherwise
  const useVision = messagesHaveImages(messages);
  const model     = useVision ? GROQ_MODEL_VISION : GROQ_MODEL_TEXT;
  const formatted = useVision ? formatForVision(messages) : sanitiseToText(messages);

  let groqRes;
  try {
    groqRes = await fetch(GROQ_API_URL, {
      method:  'POST',
      headers: { 'Authorization': `Bearer ${c.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model:      model,
        max_tokens: MAX_TOKENS,
        messages:   [{ role: 'system', content: system }, ...formatted],
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
    const lastUser = formatted[formatted.length - 1];
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
