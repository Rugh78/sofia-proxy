const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/message', (req, res) => {
  const { apiKey, messages, system } = req.body;

  // Convert messages to Gemini format
  const geminiMessages = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: Array.isArray(m.content)
      ? m.content.map(c => c.type === 'text' ? { text: c.text } : { inlineData: { mimeType: c.source.media_type, data: c.source.data } })
      : [{ text: m.content }]
  }));

  const payload = JSON.stringify({
    system_instruction: { parts: [{ text: system }] },
    contents: geminiMessages,
    generationConfig: { maxOutputTokens: 1000 }
  });

  const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const proxyReq = https.request(options, proxyRes => {
    let data = '';
    proxyRes.on('data', chunk => data += chunk);
    proxyRes.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        // Convert Gemini response to Anthropic-like format
        const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          res.json({ content: [{ type: 'text', text }] });
        } else {
          res.status(500).json({ error: parsed.error || 'No response from Gemini' });
        }
      } catch(e) {
        res.status(500).json({ error: 'Parse error: ' + data.slice(0, 200) });
      }
    });
  });

  proxyReq.on('error', err => res.status(500).json({ error: err.message }));
  proxyReq.write(payload);
  proxyReq.end();
});

app.get('/', (_, res) => res.send('Sofia proxy running ✅'));

const PORT = process.env.PORT || 3000;
export default {
  async fetch(request, env, ctx) {
    // This allows your Express app to handle the Cloudflare request
    return app.handle(request, env, ctx);
  },
};
