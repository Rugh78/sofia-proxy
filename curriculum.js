const GRADE_INFO = {
  '1º ESO':  { age: 12, level: 'básico',      detail: 'Contenidos de iniciación. Usa ejemplos muy cotidianos y concretos. Frases cortas. Vocabulario sencillo.' },
  '2º ESO':  { age: 13, level: 'básico',      detail: 'Consolida conceptos de 1º ESO. Introduce razonamiento abstracto poco a poco.' },
  '3º ESO':  { age: 14, level: 'intermedio',  detail: 'Nivel intermedio. Puede manejar más abstracción y relaciones entre conceptos.' },
  '4º ESO':  { age: 15, level: 'intermedio',  detail: 'Nivel intermedio-alto. Prepara para Bachillerato. Exige más rigor y precisión.' },
  '1º Bach': { age: 16, level: 'avanzado',    detail: 'Nivel Bachillerato. Rigor académico alto. Puede usar terminología técnica y razonamiento formal.' },
  '2º Bach': { age: 17, level: 'avanzado',    detail: 'Nivel máximo pre-universitario. Orientado a selectividad (EBAU). Máximo rigor, síntesis y precisión.' },
};

const LEARNING_MODES = {
  diagnostico: { label: 'Diagnóstico', goal: 'detectar qué sabe ya la alumna y sus confusiones', flow: 'Preguntas breves. Resume aciertos y lagunas antes de dar explicaciones largas.' },
  guiada: { label: 'Guiada', goal: 'enseñar paso a paso con andamiaje (scaffolding)', flow: 'Usa una idea cada vez. Pide a la alumna completar el siguiente paso o justificar una decisión.' },
  practica: { label: 'Práctica', goal: 'consolidar mediante ejercicios graduados y feedback inmediato', flow: 'Retos de menor a mayor dificultad. Corrige el error exacto tras cada respuesta.' }
};

// --- IDIOMAS POR ASIGNATURA (MADRID BILINGUAL PROGRAM) ---
const LANGUAGE_MAP = {
  'Matemáticas': 'es', 'Lengua': 'es', 'Física y Química': 'es',
  'Biología': 'en', 'Historia': 'en', 'Inglés': 'en',
  'Tecnología': 'en', 'Música': 'en', 'Plástica': 'en', 'Economía': 'en'
};

// --- CURRÍCULO DETALLADO EN ESPAÑOL ---
const SPANISH_CURRICULUM = {
  'Matemáticas': {
    grades: {
      '1º ESO': { focus: ['Enteros, fracciones y decimales', 'Proporcionalidad básica', 'Geometría plana'], outcomes: ['Distingue datos de pregunta', 'Justifica operaciones'], misconceptions: ['Confundir parte-todo con división exacta'] },
      '2º ESO': { focus: ['Polinomios', 'Ecuaciones 1º y 2º grado', 'Estadística'], outcomes: ['Resuelve problemas con álgebra', 'Interpreta tablas'], misconceptions: ['Reglas de signos en polinomios'] },
      '3º ESO': { focus: ['Funciones', 'Geometría del espacio', 'Probabilidad'], outcomes: ['Modeliza situaciones reales', 'Calcula áreas y volúmenes'], misconceptions: ['Lectura superficial de gráficas'] },
      '4º ESO': { focus: ['Logaritmos', 'Trigonometría', 'Estadística avanzada'], outcomes: ['Rigor en demostraciones', 'Cálculo de probabilidades complejas'], misconceptions: ['Confusión en razones trigonométricas'] }
    }
  },
  'Lengua': {
    grades: {
      '1º ESO': { focus: ['Sintaxis básica', 'Morfología', 'Géneros literarios'], outcomes: ['Localiza ideas principales', 'Analiza clases de palabras'], misconceptions: ['Análisis gramatical mecánico'] },
      '2º ESO': { focus: ['Literatura medieval', 'Siglo de Oro', 'Análisis sintáctico'], outcomes: ['Conecta autores con época', 'Analiza oraciones compuestas'], misconceptions: ['Confundir autor con narrador'] },
      '3º ESO': { focus: ['Romanticismo y Realismo (S.XIX)', 'Tipologías textuales'], outcomes: ['Comenta textos literarios', 'Redacta con coherencia'], misconceptions: ['Mezclar resumen con análisis'] },
      '4º ESO': { focus: ['Generación del 98 al 27', 'Vanguardias', 'Análisis de textos complejos'], outcomes: ['Crítica literaria razonada', 'Domina el registro formal'], misconceptions: ['Opinar sin justificar con el texto'] }
    }
  },
  'Física y Química': {
    grades: {
      '2º ESO': { focus: ['Propiedades de la materia', 'Mezclas y el átomo', 'Magnitudes SI'], outcomes: ['Distingue cambio físico de químico', 'Calcula densidades'], misconceptions: ['Confundir masa y peso'] },
      '3º ESO': { focus: ['Cinemática y Dinámica', 'Tabla periódica', 'Leyes de gases'], outcomes: ['Calcula velocidad y aceleración', 'Ajusta reacciones'], misconceptions: ['No entender la conservación de la masa'] },
      '4º ESO': { focus: ['Estequiometría', 'Formulación orgánica e inorgánica', 'Leyes de Newton'], outcomes: ['Cálculos con moles', 'Energía mecánica y trabajo'], misconceptions: ['Confundir fuerza con energía'] }
    }
  }
};

// --- CURRÍCULO DETALLADO EN INGLÉS (ANLs) ---
const ENGLISH_MEDIUM_CURRICULUM = {
  'Biología': {
    rationale: 'Observe, explain, and relate natural phenomena to health, living things, and the environment.',
    grades: {
      '1º ESO': { focus: ['living things', 'the cell', 'vital functions', 'ecosystems'], outcomes: ['basic scientific vocabulary', 'classifies examples'], misconceptions: ['memorizing names without understanding functions', 'confusing levels of organization'] },
      '2º ESO': { focus: ['energy in ecosystems', 'trophic relationships', 'biodiversity'], outcomes: ['cause-effect relationships', 'interprets diagrams'], misconceptions: ['habitat vs niche', 'ecosystems as simple lists'] },
      '3º ESO': { focus: ['human body systems', 'nutrition', 'coordination', 'health'], outcomes: ['bodily processes', 'informed health decisions'], misconceptions: ['separating systems without seeing coordination'] },
      '4º ESO': { focus: ['genetics', 'evolution', 'biotechnology'], outcomes: ['inheritance and variability', 'evolutionary evidence'], misconceptions: ['evolution as linear progress', 'gene vs visible trait'] }
    }
  },
  'Historia': {
    rationale: 'Build historical and geographical thinking, causality, and relationship between facts and sources.',
    grades: {
      '1º ESO': { focus: ['Earth Relief', 'Climates', 'Ancient Civilizations'], outcomes: ['Chronology', 'Historical legacy'], misconceptions: ['dates without context', 'ignoring sources'] },
      '2º ESO': { focus: ['Middle Ages', 'Al-Andalus', 'Christian kingdoms'], outcomes: ['feudalism', 'cultural exchange'], misconceptions: ['treating periods as isolated blocks'] },
      '3º ESO': { focus: ['Economic Sectors', 'Industrial Revolution', '18th & 19th Century'], outcomes: ['Trade and industry', 'Political change'], misconceptions: ['forgetting social actors'] },
      '4º ESO': { focus: ['Contemporary History', 'World Wars', '20th Century Spain'], outcomes: ['analyses conflicts', 'evidence-based arguing'], misconceptions: ['oversimplifying complex conflicts'] }
    }
  },
  'Inglés': {
    rationale: 'Learning must combine comprehension, production, interaction, and functional use in real-life situations.',
    grades: {
      '1º ESO': { focus: ['everyday vocabulary', 'present simple/continuous', 'guided production'], outcomes: ['understands simple messages', 'model structures'], misconceptions: ['translating word-for-word', 'ignoring pronunciation'] },
      '2º ESO': { focus: ['past simple', 'comparatives', 'structured writing'], outcomes: ['tense usage', 'improves fluency'], misconceptions: ['mixing tenses without reference', 'writing without models'] },
      '3º ESO': { focus: ['present perfect', 'future forms', 'basic conditionals'], outcomes: ['communicative intent', 'greater autonomy'], misconceptions: ['confusing present perfect with past simple', 'isolated grammar'] },
      '4º ESO': { focus: ['conditionals', 'reported speech', 'passive voice'], outcomes: ['complex structures', 'adjusts register'], misconceptions: ['structure vs function', 'neglecting context'] }
    }
  }
};

// --- MAPA DE UNIDADES (PARA PROGRESO) ---
const SUBJECT_UNIT_MAP = {
  'Matemáticas': {
    '1º ESO': [
      { id: 'mat1-u1', title: 'Números naturales y divisibilidad', keywords: ['naturales', 'divisibilidad', 'mcd', 'mcm', 'primos'] },
      { id: 'mat1-u2', title: 'Números enteros', keywords: ['enteros', 'negativos', 'valor absoluto', 'recta numerica'] },
      { id: 'mat1-u3', title: 'Fracciones y Decimales', keywords: ['fraccion', 'numerador', 'denominador', 'equivalentes', 'decimales'] },
      { id: 'mat1-u4', title: 'Proporcionalidad y porcentajes', keywords: ['regla de tres', 'porcentaje', 'proporcional', 'descuento'] },
      { id: 'mat1-u5', title: 'Álgebra inicial', keywords: ['algebra', 'ecuacion', 'incognita', 'monomio', 'letras'] },
      { id: 'mat1-u6', title: 'Geometría plana', keywords: ['poligono', 'triangulo', 'area', 'perimetro', 'circulo', 'pitagoras'] }
    ],
    '2º ESO': [
      { id: 'mat2-u1', title: 'Potencias y raíces', keywords: ['potencia', 'raiz cuadrada', 'exponente', 'base'] },
      { id: 'mat2-u2', title: 'Álgebra: Polinomios', keywords: ['polinomio', 'grado', 'identidad notable', 'suma de monomios'] },
      { id: 'mat2-u3', title: 'Ecuaciones y Sistemas', keywords: ['ecuacion segundo grado', 'sistema de ecuaciones', 'sustitucion', 'reduccion'] },
      { id: 'mat2-u4', title: 'Funciones y gráficas', keywords: ['ejes', 'coordenadas', 'funcion', 'pendiente', 'recta'] }
    ],
    '3º ESO': [
      { id: 'mat3-u1', title: 'Números racionales e irracionales', keywords: ['racionales', 'irracionales', 'notacion cientifica', 'error'] },
      { id: 'mat3-u2', title: 'Sucesiones', keywords: ['sucesion', 'progresion aritmetica', 'progresion geometrica', 'termino general'] },
      { id: 'mat3-u3', title: 'Geometría del espacio', keywords: ['volumen', 'area lateral', 'piramide', 'cono', 'esfera', 'prisma'] }
    ],
    '4º ESO': [
      { id: 'mat4-u1', title: 'Números reales y Logaritmos', keywords: ['reales', 'logaritmo', 'intervalo', 'entorno'] },
      { id: 'mat4-u2', title: 'Trigonometría', keywords: ['seno', 'coseno', 'tangente', 'triangulo rectangulo', 'radianes'] },
      { id: 'mat4-u3', title: 'Geometría analítica', keywords: ['vector', 'recta', 'ecuacion explicita', 'distancia entre puntos'] }
    ]
  },
  'Lengua': {
    '1º ESO': [
      { id: 'len1-u1', title: 'Comunicación y sonidos', keywords: ['comunicacion', 'lenguaje', 'letras', 'sonidos', 'fonemas'] },
      { id: 'len1-u2', title: 'Morfología: El Sustantivo', keywords: ['sustantivo', 'nombre', 'genero', 'numero', 'determinante'] },
      { id: 'len1-u3', title: 'Géneros literarios', keywords: ['lirica', 'narrativa', 'teatro', 'literatura', 'verso'] },
      { id: 'len1-u4', title: 'Sintaxis: Sujeto y Predicado', keywords: ['oracion', 'sujeto', 'predicado', 'nucleo', 'sintaxis'] }
    ],
    '2º ESO': [
      { id: 'len2-u1', title: 'Literatura Medieval', keywords: ['mester de juglaria', 'cantares de gesta', 'cid', 'romancero'] },
      { id: 'len2-u2', title: 'El Siglo de Oro', keywords: ['renacimiento', 'barroco', 'cervantes', 'quijote', 'lope de vega'] },
      { id: 'len2-u3', title: 'Complementos del verbo', keywords: ['complemento directo', 'indirecto', 'circunstancial', 'atributo'] }
    ],
    '4º ESO': [
      { id: 'len4-u1', title: 'Literatura del S. XX', keywords: ['generacion del 98', 'modernismo', 'vanguardias', 'generacion del 27'] },
      { id: 'len4-u2', title: 'Análisis de textos complejos', keywords: ['cohesion', 'adecuacion', 'coherencia', 'argumentativo'] }
    ]
  },
  'Física y Química': {
    '2º ESO': [
      { id: 'fyq2-u1', title: 'Magnitudes y Unidades', keywords: ['magnitudes', 'si', 'unidades', 'notacion cientifica'] },
      { id: 'fyq2-u2', title: 'Estados de la materia', keywords: ['solido', 'liquido', 'gas', 'modelo cinetico', 'cambio de estado'] },
      { id: 'fyq2-u3', title: 'Mezclas y disoluciones', keywords: ['mezclas', 'disoluciones', 'soluto', 'disolvente', 'homogenea'] },
      { id: 'fyq2-u4', title: 'El átomo', keywords: ['atomo', 'electrones', 'protones', 'neutrones', 'isotopo'] }
    ],
    '3º ESO': [
      { id: 'fyq3-u1', title: 'Leyes de los gases', keywords: ['boyle', 'charles', 'gay-lussac', 'presion', 'volumen'] },
      { id: 'fyq3-u2', title: 'Nomenclatura inorgánica', keywords: ['nomenclatura', 'formulacion', 'oxidos', 'sales', 'hidruros'] },
      { id: 'fyq3-u3', title: 'Reacciones químicas', keywords: ['ajuste', 'estequiometria', 'reactivos', 'productos'] },
      { id: 'fyq3-u4', title: 'Cinemática y Fuerzas', keywords: ['velocidad', 'aceleracion', 'mru', 'mrua', 'newton', 'fuerza'] }
    ],
    '4º ESO': [
      { id: 'fyq4-u1', title: 'El Mol y Estequiometría', keywords: ['mol', 'avogadro', 'masa molar', 'rendimiento', 'pureza'] },
      { id: 'fyq4-u2', title: 'Formulación Orgánica', keywords: ['carbono', 'alcanos', 'alcoholes', 'hidrocarburos'] },
      { id: 'fyq4-u3', title: 'Dinámica avanzada', keywords: ['leyes de newton', 'tension', 'normal', 'rozamiento', 'centripeta'] }
    ]
  },
  'Biología': {
    '1º ESO': [
      { id: 'bg1-u1', title: 'The Cell', titleEn: 'The Cell', keywords: ['cell', 'organelles', 'nucleus', 'mitochondria', 'prokaryotic'] },
      { id: 'bg1-u2', title: 'Living Things', titleEn: 'Living Things', keywords: ['kingdom', 'monera', 'protista', 'fungi', 'plants', 'animals'] },
      { id: 'bg1-u3', title: 'Invertebrates and Plants', titleEn: 'Invertebrates and Plants', keywords: ['arthropods', 'mollusks', 'photosynthesis', 'angiosperms'] }
    ],
    '3º ESO': [
      { id: 'bg3-u1', title: 'Human Anatomy', titleEn: 'Human Anatomy', keywords: ['digestive', 'respiratory', 'circulatory', 'excretory', 'organs'] },
      { id: 'bg3-u2', title: 'Health and Nutrition', titleEn: 'Health and Nutrition', keywords: ['nutrients', 'diet', 'diseases', 'vaccines', 'healthy habits'] }
    ],
    '4º ESO': [
      { id: 'bg4-u1', title: 'Genetics', titleEn: 'Genetics', keywords: ['dna', 'gene', 'mendel', 'inheritance', 'chromosome'] },
      { id: 'bg4-u2', title: 'Evolution', titleEn: 'Evolution', keywords: ['darwin', 'natural selection', 'lamarck', 'species'] }
    ]
  },
  'Historia': {
    '1º ESO': [
      { id: 'gh1-u1', title: 'Prehistory', titleEn: 'Prehistory', keywords: ['palaeolithic', 'neolithic', 'hominids', 'metal ages'] },
      { id: 'gh1-u2', title: 'Ancient Civilizations', titleEn: 'Ancient Civilizations', keywords: ['mesopotamia', 'egypt', 'pharaoh', 'nile'] },
      { id: 'gh1-u3', title: 'Greece and Rome', titleEn: 'Greece and Rome', keywords: ['polis', 'athens', 'sparta', 'empire', 'senate', 'republic'] }
    ],
    '2º ESO': [
      { id: 'gh2-u1', title: 'The Middle Ages', titleEn: 'The Middle Ages', keywords: ['feudalism', 'vassal', 'crusades', 'gothic', 'romanesque'] },
      { id: 'gh2-u2', title: 'Islam and Al-Andalus', titleEn: 'Islam and Al-Andalus', keywords: ['mohammad', 'caliphate', 'emirate', 'alhambra', 'reconquista'] }
    ],
    '4º ESO': [
      { id: 'gh4-u1', title: 'Historia Contemporánea', keywords: ['revolucion francesa', 'industrializacion', 'imperialismo', 'primera guerra mundial'] },
      { id: 'gh4-u2', title: 'Siglo XX y España', keywords: ['guerra civil', 'franquismo', 'segunda guerra mundial', 'transicion'] }
    ]
  },
  'Inglés': {
    '1º ESO': [
      { id: 'en1-u1', title: 'Present Tenses', keywords: ['present simple', 'continuous', 'routine', 'frequency adverbs'] }
    ],
    '2º ESO': [
      { id: 'en2-u1', title: 'Past Tenses', keywords: ['past simple', 'irregular verbs', 'used to', 'past continuous'] }
    ],
    '3º ESO': [
      { id: 'en3-u1', title: 'Perfect Tenses', keywords: ['present perfect', 'since', 'for', 'already', 'yet', 'ever'] }
    ],
    '4º ESO': [
      { id: 'en4-u1', title: 'Advanced Grammar', keywords: ['passive voice', 'reported speech', 'conditionals', 'relative clauses'] }
    ]
  }
};

// --- FUNCIONES LÓGICAS ---

function resolveSubjectKey(subject) {
  const norm = (subject || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (norm.includes('matemat')) return 'Matemáticas';
  if (norm.includes('biolog')) return 'Biología';
  if (norm.includes('fisica') || norm.includes('quimica')) return 'Física y Química';
  if (norm.includes('historia') || norm.includes('geograf') || norm.includes('sociales')) return 'Historia';
  if (norm.includes('lengua')) return 'Lengua';
  if (norm.includes('ingles') || norm.includes('english')) return 'Inglés';
  return 'Matemáticas';
}

function getSubjectLanguage(subject, grade = '1º ESO') {
  const key = resolveSubjectKey(subject);
  if (key === 'Historia' && grade === '4º ESO') return 'es';
  return LANGUAGE_MAP[key] || 'es';
}

function getCurriculumGuide(grade, subject) {
  const key = resolveSubjectKey(subject);
  const lang = getSubjectLanguage(key, grade);
  const source = lang === 'en' ? ENGLISH_MEDIUM_CURRICULUM : SPANISH_CURRICULUM;
  const guide = source[key] || { grades: {} };
  return guide.grades[grade] || { focus: ['General course content'], outcomes: ['Applied understanding'], misconceptions: [] };
}

function buildPedagogyBlock(modeKey, grade, subject) {
  const mode = LEARNING_MODES[modeKey] || LEARNING_MODES.guiada;
  const curr = getCurriculumGuide(grade, subject);
  const lang = getSubjectLanguage(subject, grade);
  
  if (lang === 'en') {
    return `MADRID BILINGUAL PROGRAM (ANL):
- Grade: ${grade} | Instruction: ENGLISH
- Key Focus: ${curr.focus.join(', ')}
- Evidence to seek: ${curr.outcomes.join('; ')}
- Misconceptions: ${curr.misconceptions.join('; ')}
- Strategy: ${mode.flow}`;
  }

  return `PROGRAMA BILINGÜE MADRID:
- Curso: ${grade} | Instrucción: ESPAÑOL
- Temas clave: ${curr.focus.join(', ')}
- Evidencias: ${curr.outcomes.join('; ')}
- Errores típicos: ${curr.misconceptions.join('; ')}
- Estrategia: ${mode.flow}`;
}

function getSubjectMeta(subject, grade = '1º ESO') {
  const key = resolveSubjectKey(subject);
  const lang = getSubjectLanguage(key, grade);
  const texts = {
    'es': { welcome: `¿Qué tema de **${key}** vemos hoy?`, topic: '¿Qué parte te cuesta más?' },
    'en': { welcome: `Which **${key}** topic should we work on today?`, topic: 'What feels hardest right now?' }
  };
  const sel = texts[lang] || texts['es'];
  return { language: lang, badge: lang.toUpperCase(), welcomePrompt: sel.welcome, topicPrompt: sel.topic };
}

function getSubjectUnits(subject, grade) {
  const key = resolveSubjectKey(subject);
  return SUBJECT_UNIT_MAP[key]?.[grade] || [];
}

function getUnitDisplayTitle(subject, unit, lang) {
  if (!unit) return '';
  return (lang === 'en' && unit.titleEn) ? unit.titleEn : unit.title;
}

function detectCurriculumUnit(subject, grade, text) {
  if (!text) return null;
  const norm = text.toLowerCase();
  const units = getSubjectUnits(subject, grade);
  return units.find(u => u.keywords.some(k => norm.includes(k.toLowerCase()))) || null;
}
