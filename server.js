import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('/*', cors());

app.post('/message', async (c) => {
  const { apiKey, messages, system } = await c.req.json();

  const groqMessages = [
    { role: 'system', content: system },
    ...messages.map(m => ({
      role: m.role,
      content: typeof m.content === 'string' ? m.content : m.content[0].text
    }))
  ];

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: groqMessages,
      max_tokens: 1024
    })
  });

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;

  return c.json({ content: [{ type: 'text', text }] });
});

app.get('/', (c) => c.text('Sofia Proxy running with Hono ✅'));

export default app;
