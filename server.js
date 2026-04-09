import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('/*', cors());

// ── CONSTANTS ─────────────────────────────────────────────────────────────────

const GROQ_MODEL      = 'llama-3.3-70b-versatile'; // upgraded from 8b-instant
const MAX_TOKENS      = 1024;                        // was 400 — too low for tutoring
const GROQ_API_URL    = 'https://api.groq.com/openai/v1/chat/completions';


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
  if ('stringValue'   in field) return field.stringValue;
  if ('integerValue'  in field) return Number(field.integerValue);
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

/**
 * Save a single chat message to Firestore.
 *
 * Previous version used a subcollection path without a document ID:
 *   sofia_messages/{userId}/history          ← broken (POST to collection)
 *
 * Fixed: use a flat document with a unique ID composed of userId + timestamp:
 *   sofia_messages/{userId}_{timestamp}      ← valid Firestore document path
 *
 * This avoids the subcollection REST issue and keeps messages queryable.
 */
async function saveMessageToFirestore(env, userId, role, content) {
  const safeUserId  = (userId || 'anonymous').replace(/[^a-zA-Z0-9_-]/g, '_');
  const timestamp   = new Date().toISOString();
  const documentId  = `${safeUserId}_${timestamp}_${role}`;
  const contentStr  = typeof content === 'string' ? content : JSON.stringify(content);

  await fetch(
    `${firestoreBase(env)}/sofia_messages/${encodeURIComponent(documentId)}?key=${env.FIREBASE_API_KEY}`,
    {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          userId:    { stringValue: safeUserId },
          role:      { stringValue: role },
          content:   { stringValue: contentStr },
          timestamp: { timestampValue: timestamp },
        },
      }),
    }
  );
}


// ── MESSAGE SANITISATION ──────────────────────────────────────────────────────

/**
 * Strip image content from messages before sending to Groq.
 *
 * The frontend can attach images (content is an array of image + text objects).
 * llama-3.3-70b-versatile does not support vision. Passing image objects causes
 * a Groq API error. This function reduces any array-content message to text only,
 * preserving any text parts so the conversation still makes sense.
 */
function sanitiseMessages(messages) {
  return messages.map(msg => {
    if (!Array.isArray(msg.content)) return msg; // already a plain string — fine

    // Extract text parts only; ignore image parts
    const textParts = msg.content
      .filter(part => part.type === 'text')
      .map(part => part.text)
      .join('\n')
      .trim();

    return {
      ...msg,
      content: textParts || '[Image attached — describe what you see in it]',
    };
  });
}


// ── ROUTES ────────────────────────────────────────────────────────────────────

// GET /student/:studentKey — load student profile + progress from Firestore
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

// POST /student/:studentKey — save student profile + progress to Firestore
app.post('/student/:studentKey', async (c) => {
  if (!hasFirestore(c.env)) {
    return c.json({ error: { message: 'Firestore not configured' } }, 503);
  }
  try {
    const studentKey = c.req.param('studentKey');
    const body = await c.req.json();
    await saveStudentMemory(c.env, studentKey, {
      profileJson:  JSON.stringify(body.profile  || {}),
      progressJson: JSON.stringify(body.progress || {}),
      sessionsJson: JSON.stringify(body.sessions || []),
      updatedAt:    new Date().toISOString(),
    });
    return c.json({ ok: true });
  } catch (err) {
    return c.json({ error: { message: err.message } }, 500);
  }
});

// POST /message — send a message to the AI and return its reply
app.post('/message', async (c) => {

  // ── 1. Parse and validate request body ──
  let body;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: { message: 'Invalid JSON in request body' } }, 400);
  }

  const { system, userId = 'anonymous' } = body;
  const messages = body.messages;

  if (!Array.isArray(messages) || messages.length === 0) {
    return c.json({ error: { message: '`messages` must be a non-empty array' } }, 400);
  }
  if (!system || typeof system !== 'string') {
    return c.json({ error: { message: '`system` must be a non-empty string' } }, 400);
  }

  // ── 2. Sanitise messages (strip images — model is text-only) ──
  const sanitised = sanitiseMessages(messages);

  // ── 3. Call Groq ──
  let groqRes;
  try {
    groqRes = await fetch(GROQ_API_URL, {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${c.env.GROQ_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        model:      GROQ_MODEL,
        max_tokens: MAX_TOKENS,
        messages:   [{ role: 'system', content: system }, ...sanitised],
      }),
    });
  } catch (err) {
    return c.json({ error: { message: `Groq fetch failed: ${err.message}` } }, 502);
  }

  if (!groqRes.ok) {
    const errText = await groqRes.text();
    return c.json({ error: { message: `Groq error ${groqRes.status}: ${errText}` } }, 502);
  }

  let groqData;
  try {
    groqData = await groqRes.json();
  } catch {
    return c.json({ error: { message: 'Failed to parse Groq response' } }, 502);
  }

  const aiText = groqData.choices?.[0]?.message?.content?.trim()
    ?? '¡Lo siento! Hubo un error inesperado. Por favor, inténtalo de nuevo.';

  // ── 4. Save messages to Firestore (fire-and-forget) ──
  if (hasFirestore(c.env)) {
    const lastUser = sanitised[sanitised.length - 1];
    c.executionCtx.waitUntil(
      Promise.allSettled([
        saveMessageToFirestore(c.env, userId, lastUser.role, lastUser.content),
        saveMessageToFirestore(c.env, userId, 'assistant', aiText),
      ])
    );
  }

  // ── 5. Return response in the format the frontend expects ──
  return c.json({ content: [{ type: 'text', text: aiText }] });
});

// Health check
app.get('/', (c) => c.text('Sofía Worker OK'));

export default app;
