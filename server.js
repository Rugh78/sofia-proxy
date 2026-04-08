import { Hono } from 'hono';
import { cors } from 'hono/cors';
// IMPORTACIÓN COMPLETA DE LA INTELIGENCIA
import { 
  buildPedagogyBlock, 
  getSubjectMeta, 
  getSubjectLanguage, 
  detectCurriculumUnit,
  resolveSubjectKey 
} from './curriculum.js';

const app = new Hono();

// 🔒 Configuración de CORS
app.use('/*', cors());

// --- HELPERS DE FIRESTORE ---
function firestoreBase(env) {
  return `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents`;
}
function hasFirestore(env) {
  return Boolean(env.FIREBASE_PROJECT_ID && env.FIREBASE_API_KEY);
}
function encodeFields(data) {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => {
    if (typeof value === 'number') return [key, { integerValue: String(Math.trunc(value)) }];
    return [key, { stringValue: value == null ? '' : String(value) }];
  }));
}
function decodeField(field) {
  if (!field) return null;
  if ('stringValue' in field) return field.stringValue;
  if ('integerValue' in field) return Number(field.integerValue);
  if ('timestampValue' in field) return field.timestampValue;
  return null;
}

// --- RUTAS DE PERFIL ---
async function fetchStudentMemory(env, studentKey) {
  const res = await fetch(`${firestoreBase(env)}/sofia_profiles/${encodeURIComponent(studentKey)}?key=${env.FIREBASE_API_KEY}`);
  if (res.status === 404) return null;
  const data = await res.json();
  const fields = data.fields || {};
  return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, decodeField(v)]));
}

app.get('/student/:studentKey', async (c) => {
  if (!hasFirestore(c.env)) return c.json({ error: { message: 'Firestore not configured' } }, 503);
  try {
    const data = await fetchStudentMemory(c.env, c.req.param('studentKey'));
    return c.json({ student: data });
  } catch (err) { return c.json({ error: { message: err.message } }, 500); }
});

app.post('/student/:studentKey', async (c) => {
  if (!hasFirestore(c.env)) return c.json({ error: { message: 'Firestore not configured' } }, 503);
  try {
    const studentKey = c.req.param('studentKey');
    const body = await c.req.json();
    const res = await fetch(`${firestoreBase(c.env)}/sofia_profiles/${encodeURIComponent(studentKey)}?key=${c.env.FIREBASE_API_KEY}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: encodeFields({
        profileJson: JSON.stringify(body.profile || {}),
        progressJson: JSON.stringify(body.progress || {}),
        sessionsJson: JSON.stringify(body.sessions || []),
        updatedAt: new Date().toISOString(),
      })}),
    });
    return c.json({ ok: true });
  } catch (err) { return c.json({ error: { message: err.message } }, 500); }
});

// --- RUTA PRINCIPAL DE MENSAJES ---
app.post('/message', async (c) => {
  const body = await c.req.json();
  const { 
    messages, 
    userId = 'default_user', 
    subject = 'Matemáticas', 
    grade = '1º ESO', 
    learningMode = 'guiada',
    studentName = 'la alumna'
  } = body;

  // 1. Lógica de Currículo y Bilingüismo
  const pedagogyData = buildPedagogyBlock(learningMode, grade, subject);
  const instructionLang = getSubjectLanguage(subject, grade);
  
  // 2. Detección de Unidad (para el progreso del alumno)
  const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';
  const detectedUnit = detectCurriculumUnit(subject, grade, lastUserMsg);

  // 3. Construcción del System Prompt
  const finalSystemPrompt = `
Role: You are Sofía, an expert Private Tutor for a student in Madrid, Spain.
Student Profile: ${studentName}, currently in ${grade}.
Context: You are fully familiar with the LOMCE/LOMLOE curriculum of the Comunidad de Madrid.

PEDAGOGICAL RULES:
1. Socratic Method: Never give the final answer immediately. Ask leading questions to help ${studentName} find the solution themselves.
2. Bilingual Support: The instruction language for ${subject} is ${instructionLang.toUpperCase()}. 
   - If instruction is English: Use specific English terminology from the Madrid Bilingual Section, but provide a small Spanish "Glossary" for key terms at the end of the message.
   - If instruction is Spanish: Respond entirely in Spanish.
3. Curriculum Alignment: 
   ${pedagogyData}
4. Tone: Be encouraging, patient, and treat the student as "tú" (informal Spanish).
5. Study Skills: Suggest a specific technique (Pomodoro, Mind Mapping, Active Recall) when appropriate for ${subject}.

CONSTRAINTS:
- Be brief (3-6 lines per message).
- Only one question at a time.
- If this is the start, ask if they are in "Sección" or "Programa" to adapt your English level.
  `;

  // 4. Llamada a Groq
  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${c.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'system', content: finalSystemPrompt }, ...messages],
        max_tokens: 500,
        temperature: 0.7
      }),
    });

    const data = await groqRes.json();
    const aiText = data.choices?.[0]?.message?.content ?? '¡Lo siento! Error inesperado.';

    // 5. Guardar en Firestore (fire-and-forget)
    if (hasFirestore(c.env)) {
      const saveMsg = async (role, content) => {
        await fetch(`${firestoreBase(c.env)}/sofia_messages/${userId}/history?key=${c.env.FIREBASE_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fields: {
            role: { stringValue: role },
            content: { stringValue: typeof content === 'string' ? content : JSON.stringify(content) },
            timestamp: { timestampValue: new Date().toISOString() },
          }}),
        });
      };
      c.executionCtx.waitUntil(Promise.all([
        saveMsg('user', lastUserMsg),
        saveMsg('assistant', aiText),
      ]));
    }

    // 6. Respuesta al Frontend (incluyendo la unidad detectada)
    return c.json({ 
      content: [{ type: 'text', text: aiText }],
      detectedUnit: detectedUnit ? detectedUnit.id : null 
    });

  } catch (err) { return c.json({ error: { message: err.message } }, 500); }
});

// --- RUTA PARA METADATOS DE INTERFAZ ---
app.post('/subject-info', async (c) => {
  const { subject, grade } = await c.req.json();
  return c.json(getSubjectMeta(subject, grade));
});

app.get('/', (c) => c.text('Sofía Worker OK - Full Brain Active'));

export default app;
