import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('/*', cors());

app.post('/message', async (c) => {
  const { messages, system, userId = "default_user" } = await c.req.json();
  
  // 1. Get AI Response
  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${c.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: 'system', content: system }, ...messages]
    })
  });

  const data = await groqRes.json();
  const aiText = data.choices[0].message.content;

  // 2. Save to Firebase (The Memory Part)
  const firebaseURL = `https://firestore.googleapis.com/v1/projects/${c.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/sofia_messages/${userId}/history?key=${c.env.FIREBASE_API_KEY}`;
  
  c.executionCtx.waitUntil(
    fetch(firebaseURL, {
      method: 'POST',
      body: JSON.stringify({
        fields: {
          content: { stringValue: aiText },
          role: { stringValue: 'assistant' },
          timestamp: { timestampValue: new Date().toISOString() }
        }
      })
    })
  );

  return c.json({ content: [{ type: 'text', text: aiText }] });
});

export default app;
