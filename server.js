<<<<
// 🔒 1. Configuración de CORS (Permite que tu web hable con el servidor)
app.use('/*', cors());
====
// 🔒 1. Configuración de CORS (Permite que tu web hable con el servidor)
app.use('/*', async (c, next) => {
  const allowed = c.env.ALLOWED_ORIGINS?.split(',') || [];
  const origin = c.req.header('Origin');
  const corsMiddleware = cors({
    origin: allowed.includes(origin) ? origin : allowed[0],
    allowMethods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  });
  return corsMiddleware(c, next);
});
>>>>
<<<<
// 💬 4. Ruta Principal de Mensajes (La Inteligencia de Sofía)
app.post('/message', async (c) => {
  try {
    const body = await c.req.json();
    const { 
      messages, 
      userId = 'default_user', 
      subject = 'Matemáticas', 
      grade = '1º ESO', 
      learningMode = 'guiada',
      studentName = 'la alumna'
    } = body;

    // A. Obtenemos la configuración pedagógica de Madrid
    const pedagogyData = buildPedagogyBlock(learningMode, grade, subject);
    const instructionLang = getSubjectLanguage(subject, grade);
    
    // B. Detectamos si el alumno está hablando de un tema específico para el progreso
    const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';
    const detectedUnit = detectCurriculumUnit(subject, grade, lastUserMsg);

    // C. Construimos el System Prompt con tu lógica de Tutor Experto
    const finalSystemPrompt = `
Role: You are Sofía, an expert Private Tutor for a student in Madrid, Spain.
Student Profile: ${studentName}, currently in ${grade}.
Context: You are fully familiar with the LOMCE/LOMLOE curriculum of the Comunidad de Madrid and the Bilingual Program.

PEDAGOGICAL RULES:
1. Socratic Method: NEVER give the final answer immediately. Ask leading questions to help ${studentName} find the solution themselves.
2. Bilingual Support: The instruction language for ${subject} is ${instructionLang.toUpperCase()}. 
   - If instruction is English: Use specific English terminology from the Madrid Bilingual Section. At the end of your message, provide a "Glossary" (Spanish translation) for the 3 most important technical terms used.
   - If instruction is Spanish: Respond entirely in Spanish.
3. Curriculum Alignment: 
   ${pedagogyData}
4. Tone: Be encouraging, patient, and treat the student as "tú" (informal Spanish).
5. Study Skills: Suggest a specific technique (Pomodoro, Mind Mapping, Active Recall) when appropriate for ${subject}.

CONSTRAINTS:
- Be brief (3-6 lines per message).
- Only one question at a time.
- If this is the start of the conversation, introduce yourself briefly in Spanish and ask if they are in "Sección" or "Programa" to adapt your English level.
    `;

    // D. Llamada a Groq
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
====
// 💬 4. Ruta Principal de Mensajes (La Inteligencia de Sofía)
app.post('/message', async (c) => {
  try {
    const body = await c.req.json();
    const { 
      messages, 
      userId = 'default_user', 
      subject = 'Matemáticas', 
      grade = '1º ESO', 
      learningMode = 'guiada',
      studentName = 'la alumna',
      system: frontendSystemPrompt // Get the system prompt from frontend
    } = body;

    // A. Detect potential curriculum unit
    const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';
    const detectedUnit = detectCurriculumUnit(subject, grade, lastUserMsg);

    // B. Use frontend prompt if available, otherwise fallback to backend logic
    let finalSystemPrompt = frontendSystemPrompt;
    
    if (!finalSystemPrompt) {
      const pedagogyData = buildPedagogyBlock(learningMode, grade, subject);
      const instructionLang = getSubjectLanguage(subject, grade);
      
      finalSystemPrompt = `
Role: You are Sofía, an expert Private Tutor for a student in Madrid, Spain.
Student Profile: ${studentName}, currently in ${grade}.
Context: You are fully familiar with the LOMCE/LOMLOE curriculum of the Comunidad de Madrid and the Bilingual Program.

PEDAGOGICAL RULES:
1. Socratic Method: NEVER give the final answer immediately. Ask leading questions to help ${studentName} find the solution themselves.
2. Bilingual Support: The instruction language for ${subject} is ${instructionLang.toUpperCase()}. 
   - If instruction is English: Use specific English terminology from the Madrid Bilingual Section. At the end of your message, provide a "Glossary" (Spanish translation) for the 3 most important technical terms used.
   - If instruction is Spanish: Respond entirely in Spanish.
3. Curriculum Alignment: 
   ${pedagogyData}
4. Tone: Be encouraging, patient, and treat the student as "tú" (informal Spanish).
5. Study Skills: Suggest a specific technique (Pomodoro, Mind Mapping, Active Recall) when appropriate for ${subject}.

CONSTRAINTS:
- Be brief (3-6 lines per message).
- Only one question at a time.
- If this is the start of the conversation, introduce yourself briefly in Spanish and ask if they are in "Sección" or "Programa" to adapt your English level.
      `;
    }

    // C. Llamada a Groq
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
>>>>
