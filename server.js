import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('/*', cors());

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
  if (c.env.FIREBASE_PROJECT_ID && c.env.FIREBASE_API_KEY) {
    const fsBase = `https://firestore.googleapis.com/v1/projects/${c.env.FIREBASE_PROJECT_ID}/databases/(default)/documents`;
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
