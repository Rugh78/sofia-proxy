import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('/*', cors());

// Helper function to save to Firestore
async function saveToFirestore(env, userId, role, text) {
  const projectId = env.FIREBASE_PROJECT_ID;
  const apiKey = env.FIREBASE_API_KEY;
  // We use a simple collection 'chats' organized by userId
  // Change the URL path to 'sofia_messages' so it stays away from Freshlist data
const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/sofia_messages/${userId}/history?key=${env.FIREBASE_API_KEY}`;

  const payload = {
    fields: {
      role: { stringValue: role },
      content: { stringValue: text },
      timestamp: { timestampValue: new Date().toISOString() }
    }
  };

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

app.post('/message', async (c) => {
  const { messages, system, userId = 'guest_user' } = await c.req.json();
  const userMessage = messages[messages.length - 1].content;

  // 1. Get AI response from Groq
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${c.env.GROQ_API_KEY}`, // Using env from context
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: 'system', content: system }, ...messages]
    })
  });

  const data = await response.json();
  const aiText = data.choices?.[0]?.message?.content;

  // 2. Save both messages to Firebase (Background tasks)
  // We don't 'await' these so the user gets the answer faster
  c.executionCtx.waitUntil(saveToFirestore(c.env, userId, 'user', userMessage));
  c.executionCtx.waitUntil(saveToFirestore(c.env, userId, 'assistant', aiText));

  return c.json({ content: [{ type: 'text', text: aiText }] });
});

export default app;
