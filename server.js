const { Hono } = require('hono');
const { cors } = require('hono/cors');

const app = new Hono();
app.use('/*', cors());

// Helper to save to Firestore
async function saveChat(env, userId, userMsg, aiMsg) {
  const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/sofia_messages/${userId}/history?key=${env.FIREBASE_API_KEY}`;
  
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        role: { stringValue: 'assistant' },
        content: { stringValue: aiMsg },
        timestamp: { timestampValue: new Date().toISOString() }
      }
    })
  });
}

app.post('/message', async (c) => {
  const body = await c.req.json();
  const { messages, system, userId = "default_student" } = body;
  const lastUserMessage = messages[messages.length - 1].content;

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

  const groqData = await groqRes.json();
  const aiResponse = groqData.choices?.[0]?.message?.content;

  c.executionCtx.waitUntil(saveChat(c.env, userId, lastUserMessage, aiResponse));

  return c.json({ content: [{ type: 'text', text: aiResponse }] });
});

// THE FIX: Use the "Old School" export style
module.exports = app;
