// ─────────────────────────────────────────────────────────────────────────────
// SOFIA TUTOR · curriculum.js
// Madrid Bilingual Programme (Programa Bilingüe de la Comunidad de Madrid)
//
// STRUCTURE
//   GRADE_INFO          – age + level descriptor per course
//   LEARNING_MODES      – pedagogical modes (shared ES/EN)
//   STAGE_GOALS_ES/EN   – ESO stage goals in each language
//   METHODOLOGY_ES/EN   – teaching methodology notes in each language
//   SUBJECTS_ES         – single source of truth for Spanish-medium subjects
//   SUBJECTS_EN         – single source of truth for English ANL subjects
//   SUBJECT_META        – UI strings (prompts, badges, chips) per subject
//   SUBJECT_UNIT_MAP    – ordered unit list per subject × grade
//   Helper functions
// ─────────────────────────────────────────────────────────────────────────────


// ── GRADE INFO ───────────────────────────────────────────────────────────────

const GRADE_INFO = {
  '1º ESO':  { age: 12, level: 'básico',      detail: 'Contenidos de iniciación. Usa ejemplos muy cotidianos y concretos. Frases cortas. Vocabulario sencillo.' },
  '2º ESO':  { age: 13, level: 'básico',      detail: 'Consolida conceptos de 1º ESO. Introduce razonamiento abstracto poco a poco.' },
  '3º ESO':  { age: 14, level: 'intermedio',  detail: 'Nivel intermedio. Puede manejar más abstracción y relaciones entre conceptos.' },
  '4º ESO':  { age: 15, level: 'intermedio',  detail: 'Nivel intermedio-alto. Prepara para Bachillerato. Exige más rigor y precisión.' },
  '1º Bach': { age: 16, level: 'avanzado',    detail: 'Nivel Bachillerato. Rigor académico alto. Puede usar terminología técnica y razonamiento formal.' },
  '2º Bach': { age: 17, level: 'avanzado',    detail: 'Nivel máximo pre-universitario. Orientado a selectividad (EBAU). Máximo rigor, síntesis y precisión.' },
};


// ── LEARNING MODES ───────────────────────────────────────────────────────────
// Shared across all subjects. Language-specific labels are in SUBJECT_META.

const LEARNING_MODES = {
  diagnostico: {
    label_es: 'Diagnóstico',
    label_en: 'Diagnostic',
    goal_es: 'detectar qué sabe ya la alumna, qué confusiones tiene y desde dónde conviene empezar',
    goal_en: 'identify what the student already knows, where the confusion is, and where to start',
    flow_es: 'Empieza con 2-3 preguntas breves de comprobación. No expliques demasiado al principio. Tras detectar el nivel, resume en una frase lo que domina y en otra lo que toca reforzar.',
    flow_en: 'Begin with 2-3 short checking questions. Do not over-explain at first. After checking, summarise in one sentence what she already knows and in one sentence what needs reinforcement.',
  },
  guiada: {
    label_es: 'Guiada',
    label_en: 'Guided',
    goal_es: 'enseñar paso a paso con andamiaje, comprobando comprensión entre micro-pasos',
    goal_en: 'teach step by step with scaffolding and frequent checks for understanding',
    flow_es: 'Usa explicaciones cortas, una sola idea cada vez, luego pide a la alumna completar el siguiente paso o justificar una decisión.',
    flow_en: 'Use short explanations with one idea at a time, then ask the student to complete the next step or justify a choice.',
  },
  practica: {
    label_es: 'Práctica',
    label_en: 'Practice',
    goal_es: 'consolidar el aprendizaje mediante ejercicios graduados, feedback inmediato y recuperación activa',
    goal_en: 'consolidate learning through graded exercises, immediate feedback, and active recall',
    flow_es: 'Propón una secuencia de ejercicios de menor a mayor dificultad. Tras cada respuesta, da feedback breve, corrige el error exacto y plantea el siguiente reto.',
    flow_en: 'Give a sequence of tasks from easier to harder. After each answer, give brief feedback, correct the exact mistake, and then propose the next challenge.',
  },
};


// ── STAGE GOALS & METHODOLOGY ─────────────────────────────────────────────────

const STAGE_GOALS_ES = [
  'desarrollar hábitos de estudio y trabajo individual y en equipo',
  'usar fuentes de información con sentido crítico y apoyar el aprendizaje con tecnología',
  'aprender a identificar problemas, planificar soluciones y revisar resultados',
  'desarrollar iniciativa, confianza y capacidad de aprender a aprender',
  'comunicar con corrección ideas y razonamientos',
];

const METHODOLOGY_ES = [
  'trabajar con contenidos, criterios de evaluación, estándares de aprendizaje y metodología didáctica',
  'atender a la diversidad y ajustar la ayuda a la necesidad concreta de la alumna',
  'convertir el aprendizaje en actividades planificadas con evidencia observable',
];

const STAGE_GOALS_EN = [
  'build steady study habits and work well independently and with others',
  'use information sources critically and support learning with technology',
  'identify problems, plan solutions, and review results',
  'develop initiative, confidence, and learning-to-learn habits',
  'communicate ideas and reasoning clearly',
];

const METHODOLOGY_EN = [
  'work with content, assessment criteria, learning evidence, and teaching methodology',
  'adapt support to the student\'s specific need',
  'turn learning into planned activities with visible evidence',
];


// ── SPANISH-MEDIUM SUBJECTS (impartidas en español) ───────────────────────────
//
// Subjects: Matemáticas, Lengua Castellana y Literatura, Física y Química
// Each grade entry: focus[], outcomes[], misconceptions[]
// Física y Química starts in 2º ESO (not offered in 1º).

const SUBJECTS_ES = {

  'Matemáticas': {
    lang: 'es',
    rationale: 'En el currículo madrileño la resolución de problemas, la investigación, la modelización y el uso de herramientas tecnológicas son el eje transversal de la materia.',
    grades: {
      '1º ESO': {
        focus: ['números naturales, enteros y fracciones', 'decimales', 'proporcionalidad básica', 'lenguaje algebraico inicial', 'geometría plana', 'estadística inicial', 'resolución de problemas'],
        outcomes: ['interpreta el enunciado y distingue datos de pregunta', 'justifica operaciones y unidades', 'relaciona representaciones numéricas, gráficas y algebraicas'],
        misconceptions: ['confundir parte-todo con división exacta', 'operar sin comprobar unidades', 'aplicar reglas mecánicas sin sentido del problema'],
      },
      '2º ESO': {
        focus: ['números racionales', 'porcentajes y proporcionalidad', 'polinomios', 'expresiones algebraicas', 'ecuaciones de primer y segundo grado', 'geometría del plano y espacio', 'estadística y probabilidad básica'],
        outcomes: ['elige estrategias de resolución con más autonomía', 'explica por qué un procedimiento funciona', 'interpreta resultados en contexto'],
        misconceptions: ['mezclar porcentaje con variación absoluta', 'resolver ecuaciones sin revisar el significado', 'confundir área, perímetro y volumen'],
      },
      '3º ESO': {
        focus: ['potencias y notación científica', 'polinomios y factorización', 'ecuaciones y sistemas', 'funciones', 'geometría del espacio', 'estadística y probabilidad'],
        outcomes: ['modeliza situaciones con lenguaje algebraico', 'resuelve ecuaciones para problemas reales', 'comunica y revisa el proceso matemático'],
        misconceptions: ['forzar métodos algebraicos sin entender la situación', 'leer gráficas de forma superficial', 'ignorar la plausibilidad del resultado'],
      },
      '4º ESO': {
        focus: ['logaritmos', 'trigonometría', 'profundización algebraica', 'funciones y análisis básico', 'geometría analítica', 'estadística avanzada y probabilidad', 'preparación para itinerarios posteriores'],
        outcomes: ['argumenta con más rigor', 'elige el método adecuado según el problema', 'conecta conceptos entre bloques'],
        misconceptions: ['aplicar recetas sin justificar', 'no conectar la representación gráfica con la algebraica', 'perder precisión en el lenguaje matemático'],
      },
      '1º Bach': {
        focus: ['números reales y complejos', 'polinomios y fracciones algebraicas', 'ecuaciones y sistemas avanzados', 'geometría analítica en el plano', 'funciones: límites y continuidad', 'derivadas y aplicaciones'],
        outcomes: ['razona con rigor formal', 'elige la estrategia más eficiente', 'interpreta resultados analíticos en contexto'],
        misconceptions: ['confundir límite con valor de la función', 'operar con complejos sin entender su geometría', 'derivar sin interpretar el resultado'],
      },
      '2º Bach': {
        focus: ['integrales y aplicaciones', 'álgebra matricial y determinantes', 'geometría analítica en el espacio', 'estadística inferencial', 'probabilidad: distribuciones', 'preparación EBAU'],
        outcomes: ['sintetiza y aplica conceptos de todo el Bachillerato', 'resuelve problemas tipo EBAU con precisión', 'justifica cada paso con lenguaje matemático formal'],
        misconceptions: ['confundir primitiva con integral definida', 'operar con matrices sin comprobar compatibilidad', 'no verificar condiciones antes de aplicar un teorema'],
      },
    },
  },

  'Lengua': {
    lang: 'es',
    rationale: 'La prioridad es comprender, expresar, argumentar y revisar el propio lenguaje oral y escrito con creciente autonomía.',
    grades: {
      '1º ESO': {
        focus: ['comprensión lectora', 'tipos de texto', 'gramática básica: morfología y categorías', 'ortografía y acentuación', 'expresión escrita planificada'],
        outcomes: ['localiza ideas principales', 'mejora frases y textos', 'justifica reglas básicas de lengua'],
        misconceptions: ['centrarse solo en etiquetas gramaticales', 'corregir sin explicar', 'escribir sin planificar'],
      },
      '2º ESO': {
        focus: ['literatura medieval y Siglo de Oro', 'sintaxis básica: sujeto y predicado', 'cohesión textual', 'géneros literarios', 'expresión oral y escrita'],
        outcomes: ['analiza estructuras sintácticas sencillas', 'redacta con mayor coherencia', 'comenta textos con apoyo'],
        misconceptions: ['confundir función sintáctica con categoría gramatical', 'hacer análisis mecánicos sin comprender', 'no revisar la cohesión del texto'],
      },
      '3º ESO': {
        focus: ['Romanticismo, Realismo y literatura del siglo XIX', 'oración compuesta: coordinación y subordinación', 'tipologías textuales', 'comentario de texto guiado', 'argumentación'],
        outcomes: ['relaciona forma y intención comunicativa', 'escribe textos mejor estructurados', 'justifica análisis con ejemplos del texto'],
        misconceptions: ['memorizar definiciones sin aplicarlas', 'comentar textos sin citar evidencia', 'mezclar resumen con análisis'],
      },
      '4º ESO': {
        focus: ['literatura del siglo XX y vanguardias', 'argumentación y escritura formal', 'comentario de texto autónomo', 'sintaxis avanzada', 'análisis de textos contemporáneos'],
        outcomes: ['defiende una interpretación con evidencias', 'redacta con precisión y registro adecuado', 'revisa de forma autónoma'],
        misconceptions: ['opinar sin justificar', 'abusar de fórmulas de comentario', 'descuidar cohesión y registro'],
      },
      '1º Bach': {
        focus: ['literatura española del siglo XVIII y XIX', 'texto argumentativo y expositivo', 'sintaxis de la oración compuesta', 'variedades del español', 'comunicación en contextos formales'],
        outcomes: ['produce textos argumentativos bien estructurados', 'analiza la lengua en uso con rigor', 'relaciona obras con su contexto histórico'],
        misconceptions: ['reducir el comentario a un resumen', 'ignorar el registro y la intención comunicativa', 'analizar la lengua sin conectar forma y significado'],
      },
      '2º Bach': {
        focus: ['literatura española del siglo XX hasta hoy', 'comentario de texto integrado (lengua + literatura)', 'modalidades discursivas', 'preparación EBAU: prueba de Lengua'],
        outcomes: ['comenta textos con autonomía y precisión', 'domina los géneros y movimientos literarios del siglo XX', 'escribe con rigor, cohesión y adecuación al registro'],
        misconceptions: ['enumerar recursos sin interpretar su efecto', 'desconectar el análisis lingüístico del literario', 'no ajustar el discurso al tipo de texto pedido en EBAU'],
      },
    },
  },

  'Física y Química': {
    lang: 'es',
    // Not offered in 1º ESO in the Madrid bilingual programme.
    // Starts in 2º ESO. Graceful fallback for 1º ESO is handled in getCurriculumGuide().
    rationale: 'La materia debe ayudar a comprender el mundo natural desde modelos físicos y químicos, desarrollando la capacidad de plantear hipótesis, experimentar y razonar con rigor.',
    grades: {
      '2º ESO': {
        focus: ['magnitudes y sistema internacional de unidades', 'notación científica y cifras significativas', 'propiedades de la materia y estados de agregación', 'mezclas y disoluciones', 'el átomo: estructura básica', 'cambios físicos y químicos', 'el movimiento: velocidad y trayectoria', 'las fuerzas: concepto y efectos', 'la energía: formas y transformaciones'],
        outcomes: ['identifica y aplica el método científico', 'distingue mezcla de compuesto', 'relaciona fuerza, movimiento y energía con situaciones cotidianas'],
        misconceptions: ['confundir mezcla con reacción química', 'ignorar unidades al operar', 'pensar que un objeto en reposo no tiene fuerzas sobre él'],
      },
      '3º ESO': {
        focus: ['leyes de los gases', 'mezclas y concentración de disoluciones', 'modelos atómicos y tabla periódica', 'nomenclatura de compuestos inorgánicos', 'reacciones químicas y ajuste', 'cinemática: MRU y MRUA', 'dinámica y leyes de Newton', 'energía: calor y trabajo'],
        outcomes: ['aplica las leyes de los gases a situaciones reales', 'nombra y formula compuestos inorgánicos básicos', 'resuelve problemas de cinemática y dinámica con método'],
        misconceptions: ['confundir velocidad con aceleración', 'ajustar reacciones por tanteo sin criterio', 'mezclar modelos atómicos de distintas épocas'],
      },
      '4º ESO': {
        focus: ['sistemas materiales y cuantificación: el mol', 'modelos atómicos avanzados y enlace químico', 'formulación inorgánica completa', 'formulación orgánica: hidrocarburos y grupos funcionales', 'estequiometría', 'cinemática avanzada', 'leyes de Newton aplicadas', 'gravitación universal y presión en fluidos', 'energía: conservación y eficiencia'],
        outcomes: ['calcula masas y moles en reacciones', 'formula y nombra compuestos orgánicos e inorgánicos', 'aplica las leyes de Newton a sistemas reales con fricción'],
        misconceptions: ['confundir masa molar con número de partículas', 'olvidar la cadena principal al nombrar orgánicos', 'ignorar el rozamiento en problemas de dinámica'],
      },
      '1º Bach': {
        focus: ['estructura atómica y sistema periódico', 'enlace químico: iónico, covalente y metálico', 'formulación y reacciones en profundidad', 'termodinámica química básica', 'cinemática y dinámica avanzada', 'gravitación', 'electrostática', 'corriente eléctrica'],
        outcomes: ['predice propiedades a partir del enlace', 'aplica la primera ley de la termodinámica', 'resuelve circuitos eléctricos simples'],
        misconceptions: ['confundir energía de enlace con entalpía de reacción', 'aplicar la ley de Coulomb sin distinguir cargas', 'mezclar conceptos de física clásica con cuántica'],
      },
      '2º Bach': {
        focus: ['química orgánica: reacciones y síntesis', 'equilibrio químico y Le Chatelier', 'ácido-base y electroquímica', 'física: ondas y óptica', 'electromagnetismo', 'física moderna: relatividad y cuántica básica', 'preparación EBAU'],
        outcomes: ['predice el desplazamiento del equilibrio ante perturbaciones', 'diseña síntesis orgánicas sencillas', 'resuelve problemas EBAU de física y química con método completo'],
        misconceptions: ['invertir el sentido del principio de Le Chatelier', 'confundir oxidación con combustión', 'no identificar el tipo de problema antes de elegir la ecuación'],
      },
    },
  },

};


// ── ENGLISH-MEDIUM SUBJECTS (ANL — Áreas No Lingüísticas) ────────────────────
//
// In the Madrid Bilingual Programme these subjects are taught in English by
// specialised teachers (usually with a native-level language assistant).
//
// Subjects covered here: Biology (Biology & Geology), Historia (Geography &
// History), Inglés (Advanced English / the language subject itself).
//
// Grade availability per the official programme:
//   Biology & Geology  → 1º ESO, 3º ESO  (not 2º or 4º)
//   Geography & History → 1º, 2º, 3º ESO (moved back to Spanish in 4º for EvAU)
//   Advanced English   → 1º–4º ESO (all years)
//
// A graceful fallback is returned by getCurriculumGuide() when a grade is not
// in the official offering (e.g. a student selects Biología in 2º ESO).

const SUBJECTS_EN = {

  'Biología': {
    lang: 'en',
    // Official name in the bilingual programme: Biology and Geology
    officialName: 'Biology and Geology',
    availableGrades: ['1º ESO', '3º ESO'],
    rationale: 'The subject should help the student observe, explain, and connect natural phenomena with health, living things, and the environment. In the bilingual programme, scientific vocabulary and English reasoning skills are developed alongside content.',
    grades: {
      '1º ESO': {
        focus: ['the geosphere, atmosphere, and hydrosphere', 'the biosphere and the cell', 'classification of living things and the five kingdoms', 'plants and their functions', 'animals: invertebrates and vertebrates', 'healthy habits'],
        outcomes: ['describes natural processes using basic scientific vocabulary in English', 'classifies living things and gives examples', 'connects science to everyday life and health'],
        misconceptions: ['memorising names without understanding functions', 'confusing levels of biological organisation', 'mixing up nutrition (organism) and feeding (behaviour)'],
      },
      '3º ESO': {
        focus: ['organisation of the human body: cells, tissues, organs, systems', 'the digestive and respiratory systems', 'the circulatory and excretory systems', 'the nervous and endocrine systems', 'the locomotor system', 'reproduction and development', 'health, disease, and healthy habits'],
        outcomes: ['explains how the main body systems work and interact', 'interprets causes and consequences of illness and health choices', 'makes informed decisions about personal health using biological reasoning'],
        misconceptions: ['studying each body system in isolation without seeing coordination', 'repeating definitions without connecting to biological function', 'not linking lifestyle habits to disease prevention'],
      },
    },
  },

  'Historia': {
    lang: 'en',
    // Official name in the bilingual programme: Geography and History
    officialName: 'Geography and History',
    availableGrades: ['1º ESO', '2º ESO', '3º ESO'],
    // Note: many Madrid bilingual schools moved this subject back to Spanish in
    // 4º ESO to prepare students for the EvAU university entrance exam.
    rationale: 'The subject should build geographical and historical thinking, helping the student understand time, place, causality, sources, and context. In the bilingual programme, reading and discussing sources in English is a key skill.',
    grades: {
      '1º ESO': {
        focus: ['the Earth: representation, relief, and cartography', 'climates and landscapes of the Earth', 'the continents and physical geography of Spain', 'prehistory: Palaeolithic and Neolithic', 'early river civilisations: Mesopotamia and Egypt', 'ancient Greece and the polis', 'ancient Rome and its legacy', 'ancient Spain (Hispania)'],
        outcomes: ['places events and periods in chronological order on a timeline', 'uses basic historical and geographical vocabulary in English', 'explains change and continuity between historical periods'],
        misconceptions: ['memorising dates without understanding historical processes', 'confusing simultaneity with causality', 'not using maps and sources as evidence'],
      },
      '2º ESO': {
        focus: ['the Middle Ages in Europe: feudalism and the Church', 'the Islamic world and Al-Andalus', 'the Christian kingdoms and the Reconquista', 'the Byzantine Empire', 'medieval cities and trade', 'the early Modern Age: Renaissance and Humanism', 'the Age of Discovery and the meeting of continents'],
        outcomes: ['connects historical events with their political, social, and economic context', 'interprets simple historical maps and primary sources in English', 'compares different medieval societies and their structures'],
        misconceptions: ['treating historical periods as completely separate blocks', 'reducing Al-Andalus to a single label without nuance', 'answering questions without placing events in time and space'],
      },
      '3º ESO': {
        focus: ['the Old Regime: society, economy, and absolute monarchy', 'the Scientific Revolution and the Enlightenment', 'the Atlantic Revolutions: American and French', 'the Industrial Revolution and its social consequences', 'the expansion of capitalism and imperialism', 'the working-class movement', 'art and culture in the 18th and 19th centuries'],
        outcomes: ['explains political, economic, and social transformations using historical concepts', 'connects causes and consequences across different scales', 'compares historical processes in different countries'],
        misconceptions: ['separating political revolutions from their economic and social contexts', 'memorising events without a connecting narrative thread', 'forgetting the role of social actors and ordinary people in history'],
      },
    },
  },

  'Inglés': {
    lang: 'en',
    // Official name: Advanced English / Lengua Extranjera: Inglés
    officialName: 'Advanced English',
    availableGrades: ['1º ESO', '2º ESO', '3º ESO', '4º ESO', '1º Bach', '2º Bach'],
    rationale: 'Learning should combine comprehension, production, interaction, and meaningful language use in real situations. In the Madrid bilingual programme, students work at an accelerated pace targeting B1–B2 by end of ESO and B2–C1 by end of Bachillerato.',
    grades: {
      '1º ESO': {
        focus: ['everyday vocabulary and topics', 'present simple and present continuous', 'past simple: regular and irregular verbs', 'basic reading comprehension', 'guided writing: descriptions and short paragraphs', 'listening to simple authentic texts'],
        outcomes: ['understands short, clear messages and instructions', 'responds using model structures with growing confidence', 'writes simple descriptions and narratives with support'],
        misconceptions: ['translating word by word from Spanish', 'using grammar rules without communicative context', 'ignoring pronunciation and listening as part of language learning'],
      },
      '2º ESO': {
        focus: ['past simple vs past continuous', 'present perfect: experiences and recent events', 'comparatives and superlatives', 'modal verbs: can, must, should, might', 'guided reading and inferential comprehension', 'structured essay writing: paragraphs and linking words'],
        outcomes: ['uses past and present tenses with increasing accuracy', 'identifies explicit and implicit information in texts', 'writes structured paragraphs with topic sentence and support'],
        misconceptions: ['mixing tenses without a clear time reference', 'learning vocabulary lists without communicative use', 'writing without a clear plan or model to follow'],
      },
      '3º ESO': {
        focus: ['present perfect vs past simple in context', 'future forms: will, going to, present continuous for plans', 'first and second conditionals', 'passive voice: present and past', 'inferential and critical reading', 'guided academic speaking and presentations'],
        outcomes: ['selects the right tense and structure for the communicative purpose', 'understands both explicit and inferred meaning in longer texts', 'speaks and writes with greater autonomy and fewer scaffolding aids'],
        misconceptions: ['confusing present perfect with past simple in real contexts', 'focusing only on isolated grammar exercises without communication', 'avoiding spoken practice because of fear of making mistakes'],
      },
      '4º ESO': {
        focus: ['third conditional and mixed conditionals', 'reported speech: statements, questions, and commands', 'passive voice across all tenses', 'formal and academic writing: essays and reports', 'interaction, mediation, and discussion skills', 'preparation for Cambridge B2 / official examinations'],
        outcomes: ['uses complex structures with greater accuracy and range', 'adjusts register consistently between formal and informal contexts', 'understands a wide range of texts and audio including authentic native-speed material'],
        misconceptions: ['transforming structures mechanically without understanding their meaning or function', 'neglecting communicative context and audience when writing', 'thinking that speaking well means never making grammatical mistakes'],
      },
      '1º Bach': {
        focus: ['advanced grammar: inversion, cleft sentences, complex conditionals', 'academic vocabulary and collocations', 'critical reading of authentic texts: literature, journalism, opinion', 'formal writing: discursive essays and reports', 'listening to complex native-speed audio', 'spoken interaction and debate'],
        outcomes: ['produces well-structured formal writing with a clear argument', 'reads and listens to authentic material with high comprehension', 'discusses complex ideas with range and accuracy'],
        misconceptions: ['relying on B1-level structures when B2-C1 is expected', 'writing academic English with informal colloquial phrasing', 'not expanding vocabulary beyond the comfortable core'],
      },
      '2º Bach': {
        focus: ['C1-level grammar consolidation', 'academic writing: argumentation, concession, and coherence', 'reading strategies for long and complex texts', 'listening to lectures and podcasts', 'speaking: reasoned argument and nuanced discussion', 'preparation for EBAU English paper and/or Cambridge C1 Advanced'],
        outcomes: ['writes with precision, cohesion, and a consistent academic register', 'handles EBAU reading and writing tasks accurately under exam conditions', 'speaks fluently with clear argumentation and good range'],
        misconceptions: ['underestimating the register demands of the EBAU English paper', 'writing long sentences without clear structure or punctuation', 'not practising timed exam conditions before the real test'],
      },
    },
  },

};


// ── SUBJECT META (UI strings) ─────────────────────────────────────────────────
// Contains prompts, badges, and mode labels used by the interface.
// The lang property here mirrors the subject's lang in SUBJECTS_ES / SUBJECTS_EN.

const SUBJECT_META = {
  'Matemáticas': {
    lang: 'es',
    badge: 'ES',
    icon: '🔢',
    welcomePrompt: '¿Por qué tema de Matemáticas empezamos hoy?',
    topicPrompt: '¿Qué tema quieres trabajar y qué te está costando?',
    modePrompts: {
      diagnostico: 'Vamos a empezar con un **diagnóstico** en Matemáticas. Te haré preguntas cortas para ver desde dónde partimos.',
      guiada: 'Pasamos a **enseñanza guiada** en Matemáticas. Iremos paso a paso, con una idea cada vez.',
      practica: 'Entramos en **práctica** de Matemáticas. Voy a proponerte ejercicios cortos con feedback inmediato.',
    },
    chips: {
      diagnostico: '🎯 Diagnóstico',
      guiada: '🧭 Guiada',
      practica: '💪 Práctica',
      exam: '📝 Modo examen',
    },
  },

  'Biología': {
    lang: 'en',
    badge: 'EN',
    icon: '🧬',
    welcomePrompt: 'Which Biology topic should we start with today?',
    topicPrompt: 'Which topic do you want to work on, and what feels difficult right now?',
    modePrompts: {
      diagnostico: 'Let\'s start with a **diagnostic check** in Biology. I\'ll ask a few short questions to see your starting point.',
      guiada: 'We are switching to **guided learning** in Biology. We will go step by step, one idea at a time.',
      practica: 'We are now in **practice mode** for Biology. I\'ll give you short tasks and immediate feedback.',
    },
    chips: {
      diagnostico: '🎯 Diagnose',
      guiada: '🧭 Guided',
      practica: '💪 Practice',
      exam: '📝 Exam mode',
    },
  },

  'Física y Química': {
    lang: 'es',
    badge: 'ES',
    icon: '⚗️',
    welcomePrompt: '¿Por qué tema de Física y Química empezamos hoy?',
    topicPrompt: '¿Qué tema quieres trabajar y qué parte te resulta más difícil?',
    modePrompts: {
      diagnostico: 'Vamos a empezar con un **diagnóstico** en Física y Química. Te haré unas preguntas cortas para ver desde dónde partimos.',
      guiada: 'Pasamos a **enseñanza guiada** en Física y Química. Iremos paso a paso, con el procedimiento bien justificado.',
      practica: 'Entramos en **práctica** de Física y Química. Te propondré ejercicios cortos con corrección inmediata.',
    },
    chips: {
      diagnostico: '🎯 Diagnóstico',
      guiada: '🧭 Guiada',
      practica: '💪 Práctica',
      exam: '📝 Modo examen',
    },
  },

  'Historia': {
    lang: 'en',
    badge: 'EN',
    icon: '🏛️',
    welcomePrompt: 'Which Geography and History topic should we start with today?',
    topicPrompt: 'Which Geography or History topic do you want to work on, and what part feels hardest?',
    modePrompts: {
      diagnostico: 'Let\'s start with a **diagnostic check** in Geography and History. I\'ll ask a few short questions to see what you already remember.',
      guiada: 'We are switching to **guided learning** in Geography and History. We will connect ideas step by step.',
      practica: 'We are now in **practice mode** for Geography and History. I\'ll give you short questions with immediate feedback.',
    },
    chips: {
      diagnostico: '🎯 Diagnose',
      guiada: '🧭 Guided',
      practica: '💪 Practice',
      exam: '📝 Exam mode',
    },
  },

  'Lengua': {
    lang: 'es',
    badge: 'ES',
    icon: '📖',
    welcomePrompt: '¿Por qué tema de Lengua empezamos hoy?',
    topicPrompt: '¿Qué tema quieres trabajar y en qué parte necesitas más ayuda?',
    modePrompts: {
      diagnostico: 'Vamos a empezar con un **diagnóstico** en Lengua. Te haré preguntas cortas para ver tu punto de partida.',
      guiada: 'Pasamos a **enseñanza guiada** en Lengua. Iremos paso a paso, con ejemplos muy claros.',
      practica: 'Entramos en **práctica** de Lengua. Te propondré ejercicios cortos con feedback inmediato.',
    },
    chips: {
      diagnostico: '🎯 Diagnóstico',
      guiada: '🧭 Guiada',
      practica: '💪 Práctica',
      exam: '📝 Modo examen',
    },
  },

  'Inglés': {
    lang: 'en',
    badge: 'EN',
    icon: '🇬🇧',
    welcomePrompt: 'Which English topic should we start with today?',
    topicPrompt: 'Which topic do you want to work on, and what part feels hardest?',
    modePrompts: {
      diagnostico: 'Let\'s begin with a short **diagnostic check** in English. I\'ll ask a few quick questions first.',
      guiada: 'We are switching to **guided learning** in English. We will build the answer step by step.',
      practica: 'We are now in **practice mode** for English. I\'ll give you short exercises and instant feedback.',
    },
    chips: {
      diagnostico: '🎯 Diagnose',
      guiada: '🧭 Guided',
      practica: '💪 Practice',
      exam: '📝 Exam mode',
    },
  },
};


// ── UNIT MAP ──────────────────────────────────────────────────────────────────
// Ordered list of curriculum units per subject × grade.
// Used for topic detection and mastery tracking.
// Units that are taught in English have both title (ES) and titleEn.
// Keywords are used to detect the active unit from conversation text.

const SUBJECT_UNIT_MAP = {

  'Lengua': {
    '1º ESO': [
      { id: 'len1-u1',  title: 'La comunicación, significado y sentido, letras y sonidos',                             keywords: ['comunicación', 'significado', 'sentido', 'letras', 'sonidos'] },
      { id: 'len1-u2',  title: 'Las lenguas de España, morfemas y formación de palabras',                              keywords: ['lenguas de españa', 'morfemas', 'formación de palabras', 'mayúsculas'] },
      { id: 'len1-u3',  title: 'Los textos, sustantivo y determinantes',                                               keywords: ['textos', 'sustantivo', 'determinantes', 'artículo'] },
      { id: 'len1-u4',  title: 'Clases de textos y géneros literarios',                                                keywords: ['clases de textos', 'géneros literarios', 'demostrativos', 'posesivos'] },
      { id: 'len1-u5',  title: 'La narración y la narrativa',                                                          keywords: ['narración', 'narrativa', 'interjección', 'relativos'] },
      { id: 'len1-u6',  title: 'La noticia, pronombres y cuento',                                                      keywords: ['noticia', 'pronombres', 'cuento', 'comunicación audiovisual'] },
      { id: 'len1-u7',  title: 'La descripción y el adjetivo',                                                         keywords: ['descripción', 'adjetivo', 'acentuación', 'leyenda', 'mito'] },
      { id: 'len1-u8',  title: 'Descripción de personas y lugares, verbo y novela',                                    keywords: ['descripción de personas', 'lugares', 'verbo', 'novela'] },
      { id: 'len1-u9',  title: 'El diálogo, diccionarios y lírica',                                                    keywords: ['diálogo', 'diccionarios', 'hiatos', 'conjugación verbal', 'lírica'] },
      { id: 'len1-u10', title: 'Clases de diálogo, puntuación, adverbio, preposiciones y conjunciones',               keywords: ['clases de diálogo', 'punto', 'coma', 'adverbio', 'preposiciones', 'conjunciones'] },
      { id: 'len1-u11', title: 'Descripción y diálogo en la narración, grupos sintácticos y teatro',                  keywords: ['grupos sintácticos', 'teatro', 'dos puntos', 'acepciones'] },
      { id: 'len1-u12', title: 'Lenguaje e Internet, oración, sujeto y predicado, literatura y cine',                 keywords: ['internet', 'oración', 'sujeto', 'predicado', 'literatura y cine'] },
    ],
    '2º ESO': [
      { id: 'len2-u1',  title: 'La comunicación oral y escrita. La narración literaria',                               keywords: ['comunicación oral', 'narración literaria'] },
      { id: 'len2-u2',  title: 'Literatura medieval: el Mester de Juglaría y el Cantar de Mio Cid',                   keywords: ['juglaría', 'mio cid', 'medieval', 'cantar'] },
      { id: 'len2-u3',  title: 'La descripción. El sustantivo y el adjetivo en la oración',                           keywords: ['descripción', 'sustantivo', 'adjetivo', 'oración simple'] },
      { id: 'len2-u4',  title: 'El Mester de Clerecía y la prosa medieval',                                           keywords: ['mester de clerecía', 'prosa medieval', 'berceo'] },
      { id: 'len2-u5',  title: 'El diálogo y la exposición. El verbo: formas y conjugación',                          keywords: ['diálogo', 'exposición', 'verbo', 'conjugación'] },
      { id: 'len2-u6',  title: 'La lírica medieval y el Renacimiento',                                                 keywords: ['lírica medieval', 'renacimiento', 'garcilaso'] },
      { id: 'len2-u7',  title: 'La argumentación. Los grupos sintácticos',                                             keywords: ['argumentación', 'grupos sintácticos', 'sintagma'] },
      { id: 'len2-u8',  title: 'La narrativa y la poesía del Siglo de Oro',                                           keywords: ['siglo de oro', 'quevedo', 'góngora', 'lazarillo'] },
      { id: 'len2-u9',  title: 'Los textos periodísticos. La oración: sujeto y predicado',                            keywords: ['textos periodísticos', 'noticia', 'sujeto', 'predicado nominal', 'predicado verbal'] },
      { id: 'len2-u10', title: 'El teatro del Siglo de Oro: Lope de Vega y Calderón',                                 keywords: ['teatro siglo de oro', 'lope de vega', 'calderón', 'drama'] },
      { id: 'len2-u11', title: 'Textos publicitarios y digitales. Complementos del predicado',                        keywords: ['publicidad', 'digital', 'complemento directo', 'complemento indirecto'] },
      { id: 'len2-u12', title: 'Don Quijote y la narrativa del Siglo de Oro',                                         keywords: ['don quijote', 'cervantes', 'narrativa', 'siglo de oro'] },
    ],
    '3º ESO': [
      { id: 'len3-u1',  title: 'La comunicación: registro y contexto. La oración compuesta',                          keywords: ['registro', 'contexto', 'oración compuesta'] },
      { id: 'len3-u2',  title: 'El Romanticismo: lírica y prosa',                                                      keywords: ['romanticismo', 'espronceda', 'bécquer', 'larra'] },
      { id: 'len3-u3',  title: 'La narración y la descripción avanzadas. Coordinación y yuxtaposición',               keywords: ['coordinación', 'yuxtaposición', 'descripción avanzada'] },
      { id: 'len3-u4',  title: 'El Realismo y el Naturalismo en la novela',                                            keywords: ['realismo', 'naturalismo', 'galdós', 'clarín', 'la regenta'] },
      { id: 'len3-u5',  title: 'La exposición y el texto científico. Subordinadas sustantivas',                       keywords: ['exposición', 'texto científico', 'subordinadas sustantivas'] },
      { id: 'len3-u6',  title: 'La poesía del siglo XIX: del Romanticismo al Modernismo',                             keywords: ['modernismo', 'rubén darío', 'poesía siglo xix'] },
      { id: 'len3-u7',  title: 'La argumentación. Subordinadas adverbiales',                                           keywords: ['argumentación', 'subordinadas adverbiales', 'texto argumentativo'] },
      { id: 'len3-u8',  title: 'La Generación del 98 y el Novecentismo',                                              keywords: ['generación del 98', 'unamuno', 'azorín', 'novecentismo'] },
      { id: 'len3-u9',  title: 'El comentario de texto. Subordinadas adjetivas o de relativo',                        keywords: ['comentario de texto', 'subordinadas adjetivas', 'relativo'] },
      { id: 'len3-u10', title: 'Las Vanguardias y la Generación del 27',                                               keywords: ['vanguardias', 'generación del 27', 'lorca', 'alberti'] },
    ],
    '4º ESO': [
      { id: 'len4-u1',  title: 'Variedades del español. Sintaxis avanzada: repaso y ampliación',                      keywords: ['variedades del español', 'dialectos', 'sintaxis avanzada'] },
      { id: 'len4-u2',  title: 'La narrativa del siglo XX: la novela de posguerra',                                   keywords: ['novela posguerra', 'cela', 'delibes', 'narrativa siglo xx'] },
      { id: 'len4-u3',  title: 'El texto expositivo y argumentativo. El lenguaje de los medios',                      keywords: ['expositivo', 'argumentativo', 'medios de comunicación'] },
      { id: 'len4-u4',  title: 'La poesía del siglo XX: del 27 a los años 70',                                        keywords: ['poesía siglo xx', 'blas de otero', 'gabriel celaya', 'poesía social'] },
      { id: 'len4-u5',  title: 'El comentario de texto autónomo',                                                      keywords: ['comentario de texto', 'análisis textual', 'autonomía'] },
      { id: 'len4-u6',  title: 'El teatro del siglo XX: Valle-Inclán y Lorca',                                        keywords: ['teatro siglo xx', 'valle-inclán', 'lorca', 'esperpento'] },
      { id: 'len4-u7',  title: 'La escritura formal: informe, instancia y carta',                                     keywords: ['escritura formal', 'informe', 'instancia', 'carta formal'] },
      { id: 'len4-u8',  title: 'La narrativa actual y la literatura hispanoamericana',                                 keywords: ['narrativa actual', 'hispanoamericana', 'boom', 'garcía márquez'] },
    ],
  },

  'Matemáticas': {
    '1º ESO': [
      { id: 'mat1-u1', title: 'Números naturales y enteros',                                                           keywords: ['naturales', 'enteros', 'mcd', 'mcm', 'divisibilidad'] },
      { id: 'mat1-u2', title: 'Fracciones y decimales',                                                                keywords: ['fracciones', 'decimales', 'equivalentes', 'operaciones con fracciones'] },
      { id: 'mat1-u3', title: 'Proporcionalidad y porcentajes',                                                        keywords: ['proporcionalidad', 'porcentaje', 'razón', 'regla de tres'] },
      { id: 'mat1-u4', title: 'Introducción al álgebra: lenguaje algebraico',                                          keywords: ['álgebra', 'lenguaje algebraico', 'expresión algebraica', 'ecuación sencilla'] },
      { id: 'mat1-u5', title: 'Geometría plana: ángulos, polígonos y circunferencia',                                  keywords: ['geometría', 'ángulos', 'polígonos', 'circunferencia', 'perímetro', 'área'] },
      { id: 'mat1-u6', title: 'Estadística inicial: tablas, gráficas y medidas',                                       keywords: ['estadística', 'tablas', 'gráficas', 'media', 'moda'] },
    ],
    '2º ESO': [
      { id: 'mat2-u1', title: 'Números racionales: fracciones y operaciones',                                          keywords: ['racionales', 'fracciones', 'operaciones'] },
      { id: 'mat2-u2', title: 'Potencias, raíces y notación científica',                                               keywords: ['potencias', 'raíces', 'notación científica'] },
      { id: 'mat2-u3', title: 'Porcentajes y proporcionalidad compuesta',                                              keywords: ['porcentajes', 'proporcionalidad compuesta', 'interés'] },
      { id: 'mat2-u4', title: 'Polinomios y expresiones algebraicas',                                                  keywords: ['polinomios', 'expresiones algebraicas', 'identidades notables'] },
      { id: 'mat2-u5', title: 'Ecuaciones de primer y segundo grado',                                                  keywords: ['ecuaciones', 'primer grado', 'segundo grado', 'fórmula cuadrática'] },
      { id: 'mat2-u6', title: 'Sistemas de ecuaciones',                                                                keywords: ['sistemas de ecuaciones', 'sustitución', 'igualación', 'reducción'] },
      { id: 'mat2-u7', title: 'Geometría: semejanza y teorema de Pitágoras',                                           keywords: ['semejanza', 'teorema de pitágoras', 'escala', 'trigonometría básica'] },
      { id: 'mat2-u8', title: 'Estadística y probabilidad',                                                            keywords: ['estadística', 'probabilidad', 'frecuencia', 'diagrama'] },
    ],
    '3º ESO': [
      { id: 'mat3-u1', title: 'Números reales: potencias y radicales',                                                 keywords: ['números reales', 'potencias', 'radicales', 'irracional'] },
      { id: 'mat3-u2', title: 'Polinomios: operaciones y factorización',                                               keywords: ['polinomios', 'factorización', 'ruffini', 'raíces'] },
      { id: 'mat3-u3', title: 'Ecuaciones: cuadráticas, bicuadráticas y con radicales',                               keywords: ['ecuaciones', 'bicuadrática', 'radical', 'resolución'] },
      { id: 'mat3-u4', title: 'Sistemas de ecuaciones: métodos y problemas',                                           keywords: ['sistemas', 'sustitución', 'igualación', 'problemas'] },
      { id: 'mat3-u5', title: 'Funciones: definición, representación y tipos',                                         keywords: ['funciones', 'dominio', 'recorrido', 'gráfica'] },
      { id: 'mat3-u6', title: 'Funciones lineales y cuadráticas',                                                      keywords: ['función lineal', 'función cuadrática', 'parábola', 'pendiente'] },
      { id: 'mat3-u7', title: 'Geometría del espacio: áreas y volúmenes',                                              keywords: ['geometría del espacio', 'área', 'volumen', 'poliedros'] },
      { id: 'mat3-u8', title: 'Estadística: medidas de centralización y dispersión',                                   keywords: ['estadística', 'media', 'mediana', 'moda', 'desviación'] },
      { id: 'mat3-u9', title: 'Probabilidad: regla de Laplace y probabilidad compuesta',                               keywords: ['probabilidad', 'laplace', 'sucesos', 'diagrama de árbol'] },
    ],
    '4º ESO': [
      { id: 'mat4-u1', title: 'Números reales, logaritmos y potencias',                                                keywords: ['logaritmos', 'potencias', 'números reales'] },
      { id: 'mat4-u2', title: 'Polinomios y fracciones algebraicas',                                                   keywords: ['polinomios', 'fracciones algebraicas', 'simplificación'] },
      { id: 'mat4-u3', title: 'Ecuaciones: exponenciales, logarítmicas y trigonométricas',                            keywords: ['ecuaciones exponenciales', 'ecuaciones logarítmicas', 'ecuaciones trigonométricas'] },
      { id: 'mat4-u4', title: 'Trigonometría: razones, identidades y resolución de triángulos',                       keywords: ['trigonometría', 'seno', 'coseno', 'tangente', 'resolución de triángulos'] },
      { id: 'mat4-u5', title: 'Funciones: análisis y representación',                                                  keywords: ['funciones', 'análisis', 'continuidad', 'crecimiento'] },
      { id: 'mat4-u6', title: 'Geometría analítica: vectores, rectas y lugar geométrico',                             keywords: ['geometría analítica', 'vectores', 'rectas', 'lugar geométrico'] },
      { id: 'mat4-u7', title: 'Estadística inferencial y distribuciones',                                              keywords: ['estadística inferencial', 'distribución normal', 'muestra', 'inferencia'] },
      { id: 'mat4-u8', title: 'Probabilidad avanzada: distribuciones binomial y normal',                               keywords: ['distribución binomial', 'distribución normal', 'probabilidad'] },
    ],
  },

  'Física y Química': {
    '2º ESO': [
      { id: 'fyq2-u1', title: 'Magnitudes, S.I., notación científica y cifras significativas',                        keywords: ['magnitudes', 'sistema internacional', 'notación científica', 'cifras significativas'] },
      { id: 'fyq2-u2', title: 'Trabajo de laboratorio e informes científicos',                                         keywords: ['laboratorio', 'informe', 'experimento', 'método científico'] },
      { id: 'fyq2-u3', title: 'Propiedades de la materia y estados de agregación',                                     keywords: ['estados de agregación', 'sólido', 'líquido', 'gas', 'propiedades'] },
      { id: 'fyq2-u4', title: 'Mezclas y disoluciones',                                                                keywords: ['mezclas', 'disoluciones', 'soluto', 'disolvente', 'concentración'] },
      { id: 'fyq2-u5', title: 'El átomo: estructura y modelos básicos',                                                keywords: ['átomo', 'electrones', 'protones', 'neutrones', 'modelo atómico'] },
      { id: 'fyq2-u6', title: 'Cambios físicos y cambios químicos',                                                    keywords: ['cambio físico', 'cambio químico', 'reacción'] },
      { id: 'fyq2-u7', title: 'El movimiento: posición, velocidad y trayectoria',                                     keywords: ['movimiento', 'velocidad', 'trayectoria', 'espacio', 'tiempo'] },
      { id: 'fyq2-u8', title: 'Las fuerzas: concepto, tipos y efectos',                                               keywords: ['fuerzas', 'newton', 'rozamiento', 'deformación'] },
      { id: 'fyq2-u9', title: 'La energía: formas, transformaciones y eficiencia',                                     keywords: ['energía', 'trabajo', 'potencia', 'calor', 'eficiencia'] },
    ],
    '3º ESO': [
      { id: 'fyq3-u1', title: 'Leyes de los gases',                                                                    keywords: ['gases', 'boyle', 'charles', 'presión', 'volumen', 'temperatura'] },
      { id: 'fyq3-u2', title: 'Mezclas, disoluciones y concentración',                                                 keywords: ['mezclas', 'disoluciones', 'concentración', 'solubilidad'] },
      { id: 'fyq3-u3', title: 'Modelos atómicos y tabla periódica',                                                    keywords: ['modelos atómicos', 'tabla periódica', 'período', 'grupo'] },
      { id: 'fyq3-u4', title: 'Nomenclatura y formulación de compuestos inorgánicos',                                  keywords: ['nomenclatura', 'formulación', 'compuestos inorgánicos', 'óxidos', 'sales', 'ácidos'] },
      { id: 'fyq3-u5', title: 'Reacciones químicas: tipos y ajuste',                                                   keywords: ['reacciones químicas', 'ajuste', 'reactivos', 'productos'] },
      { id: 'fyq3-u6', title: 'Cinemática: MRU y MRUA',                                                                keywords: ['cinemática', 'mru', 'mrua', 'aceleración', 'velocidad'] },
      { id: 'fyq3-u7', title: 'Dinámica: las fuerzas y las leyes de Newton',                                          keywords: ['dinámica', 'leyes de newton', 'fuerza', 'masa', 'aceleración'] },
      { id: 'fyq3-u8', title: 'La energía: calor, trabajo y conservación',                                             keywords: ['energía', 'calor', 'trabajo', 'conservación de la energía'] },
    ],
    '4º ESO': [
      { id: 'fyq4-u1', title: 'Sistemas materiales, el mol y cuantificación de la materia',                           keywords: ['sistemas materiales', 'mol', 'masa molar', 'número de avogadro'] },
      { id: 'fyq4-u2', title: 'Modelos atómicos avanzados y enlace químico',                                           keywords: ['enlace químico', 'enlace iónico', 'enlace covalente', 'enlace metálico'] },
      { id: 'fyq4-u3', title: 'Formulación inorgánica completa',                                                       keywords: ['formulación inorgánica', 'óxidos', 'hidróxidos', 'sales', 'ácidos'] },
      { id: 'fyq4-u4', title: 'Formulación orgánica: hidrocarburos y grupos funcionales',                             keywords: ['formulación orgánica', 'hidrocarburos', 'alcanos', 'alquenos', 'grupos funcionales'] },
      { id: 'fyq4-u5', title: 'Estequiometría: masa, mol y reacciones',                                               keywords: ['estequiometría', 'reacciones', 'reactivo limitante', 'rendimiento'] },
      { id: 'fyq4-u6', title: 'Cinemática avanzada: MRUV y caída libre',                                              keywords: ['cinemática avanzada', 'mruv', 'caída libre', 'tiro vertical'] },
      { id: 'fyq4-u7', title: 'La fuerza como agente de cambio: leyes de Newton aplicadas',                          keywords: ['leyes de newton', 'fuerza', 'fricción', 'plano inclinado'] },
      { id: 'fyq4-u8', title: 'Gravitación universal y presión en fluidos',                                            keywords: ['gravitación', 'ley de gravitación', 'presión', 'fluidos', 'arquímedes'] },
      { id: 'fyq4-u9', title: 'La energía: conservación, calor y eficiencia energética',                              keywords: ['conservación de la energía', 'calor', 'eficiencia', 'fuentes de energía'] },
    ],
  },

  'Biología': {
    '1º ESO': [
      { id: 'bg1-u1', title: 'The geosphere and human impact',                                                         keywords: ['geosphere', 'geosfera', 'rocks', 'minerals', 'volcanoes', 'earthquakes'] },
      { id: 'bg1-u2', title: 'The atmosphere and human impact',                                                        keywords: ['atmosphere', 'atmósfera', 'air', 'layers', 'pollution', 'climate'] },
      { id: 'bg1-u3', title: 'The hydrosphere and human impact',                                                       keywords: ['hydrosphere', 'hidrosfera', 'water', 'rivers', 'seas', 'water cycle'] },
      { id: 'bg1-u4', title: 'The biosphere and the cell',                                                             keywords: ['biosphere', 'biosfera', 'living things', 'cell', 'célula', 'organelles'] },
      { id: 'bg1-u5', title: 'Classification of living things and the five kingdoms',                                  keywords: ['classification', 'kingdoms', 'taxonomy', 'species', 'living things'] },
      { id: 'bg1-u6', title: 'The plant kingdom',                                                                      keywords: ['plants', 'plant kingdom', 'photosynthesis', 'chlorophyll', 'roots', 'leaves'] },
      { id: 'bg1-u7', title: 'The animal kingdom',                                                                     keywords: ['animal kingdom', 'animals', 'vertebrates', 'invertebrates'] },
      { id: 'bg1-u8', title: 'Invertebrate animals',                                                                   keywords: ['invertebrates', 'arthropods', 'insects', 'molluscs', 'worms'] },
      { id: 'bg1-u9', title: 'Vertebrate animals',                                                                     keywords: ['vertebrates', 'mammals', 'birds', 'fish', 'reptiles', 'amphibians'] },
      { id: 'bg1-u10', title: 'Healthy habits and personal health',                                                    keywords: ['healthy habits', 'health', 'nutrition', 'hygiene', 'exercise'] },
    ],
    '3º ESO': [
      { id: 'bg3-u1', title: 'Organisation of the human body',                                                         keywords: ['human body', 'cells', 'tissues', 'organs', 'systems', 'organisation'] },
      { id: 'bg3-u2', title: 'The digestive system',                                                                   keywords: ['digestive system', 'digestion', 'nutrients', 'stomach', 'intestine'] },
      { id: 'bg3-u3', title: 'The respiratory system',                                                                 keywords: ['respiratory system', 'lungs', 'breathing', 'gas exchange'] },
      { id: 'bg3-u4', title: 'The circulatory system',                                                                 keywords: ['circulatory system', 'heart', 'blood', 'arteries', 'veins'] },
      { id: 'bg3-u5', title: 'The excretory system',                                                                   keywords: ['excretory system', 'kidneys', 'urine', 'excretion'] },
      { id: 'bg3-u6', title: 'The nervous system and the senses',                                                      keywords: ['nervous system', 'brain', 'neurons', 'senses', 'reflex'] },
      { id: 'bg3-u7', title: 'The endocrine system',                                                                   keywords: ['endocrine system', 'hormones', 'glands', 'regulation'] },
      { id: 'bg3-u8', title: 'The locomotor system',                                                                   keywords: ['locomotor system', 'muscles', 'bones', 'skeleton', 'joints'] },
      { id: 'bg3-u9', title: 'Reproduction and human development',                                                     keywords: ['reproduction', 'development', 'puberty', 'fertilisation', 'pregnancy'] },
      { id: 'bg3-u10', title: 'Health, disease, and prevention',                                                       keywords: ['health', 'disease', 'infection', 'immune system', 'prevention', 'vaccines'] },
    ],
  },

  'Historia': {
    '1º ESO': [
      { id: 'gh1-u1',  title: 'The Earth: representation and cartography',                                             keywords: ['earth', 'maps', 'cartography', 'coordinates', 'latitude', 'longitude'] },
      { id: 'gh1-u2',  title: 'Landforms and relief of the Earth',                                                     keywords: ['relief', 'mountains', 'plains', 'rivers', 'landforms'] },
      { id: 'gh1-u3',  title: 'Climates and landscapes of the Earth',                                                  keywords: ['climate', 'landscapes', 'biomes', 'temperature', 'rainfall'] },
      { id: 'gh1-u4',  title: 'The continents and physical geography of Spain',                                        keywords: ['continents', 'spain', 'physical geography', 'iberian peninsula'] },
      { id: 'gh1-u5',  title: 'Prehistory: Palaeolithic and Neolithic',                                                keywords: ['prehistory', 'palaeolithic', 'neolithic', 'stone age', 'cave art'] },
      { id: 'gh1-u6',  title: 'Early river civilisations: Mesopotamia and Egypt',                                      keywords: ['mesopotamia', 'egypt', 'river civilisations', 'pharaohs', 'pyramids'] },
      { id: 'gh1-u7',  title: 'Ancient Greece: the polis and democracy',                                               keywords: ['greece', 'polis', 'democracy', 'athens', 'sparta', 'greek'] },
      { id: 'gh1-u8',  title: 'Ancient Rome and its legacy',                                                           keywords: ['rome', 'roman', 'republic', 'empire', 'roman legacy'] },
      { id: 'gh1-u9',  title: 'Ancient Spain (Hispania)',                                                               keywords: ['hispania', 'ancient spain', 'romanisation', 'iberian'] },
    ],
    '2º ESO': [
      { id: 'gh2-u1',  title: 'The Early Middle Ages: the fall of Rome and the Germanic kingdoms',                     keywords: ['middle ages', 'germanic', 'fall of rome', 'early medieval'] },
      { id: 'gh2-u2',  title: 'The Islamic world and Al-Andalus',                                                      keywords: ['islam', 'al-andalus', 'muslims', 'caliphate', 'córdoba'] },
      { id: 'gh2-u3',  title: 'Feudalism and medieval European society',                                               keywords: ['feudalism', 'medieval', 'feudal society', 'lords', 'serfs'] },
      { id: 'gh2-u4',  title: 'The Christian kingdoms and the Reconquista',                                            keywords: ['reconquista', 'christian kingdoms', 'castile', 'aragon', 'navarre'] },
      { id: 'gh2-u5',  title: 'Medieval cities and the growth of trade',                                               keywords: ['medieval cities', 'trade', 'guilds', 'markets', 'black death'] },
      { id: 'gh2-u6',  title: 'The Late Middle Ages: crisis and change',                                               keywords: ['late middle ages', 'crisis', 'plague', 'hundred years war'] },
      { id: 'gh2-u7',  title: 'The Renaissance and Humanism',                                                          keywords: ['renaissance', 'humanism', 'art', 'italy', 'printing press'] },
      { id: 'gh2-u8',  title: 'The Age of Discovery and the meeting of continents',                                    keywords: ['age of discovery', 'columbus', 'exploration', 'americas', 'trade routes'] },
    ],
    '3º ESO': [
      { id: 'gh3-u1',  title: 'The Old Regime: society, economy, and absolute monarchy',                               keywords: ['old regime', 'absolute monarchy', 'estates', 'ancien régime'] },
      { id: 'gh3-u2',  title: 'The Scientific Revolution and the Enlightenment',                                       keywords: ['scientific revolution', 'enlightenment', 'reason', 'philosophes', 'newton'] },
      { id: 'gh3-u3',  title: 'The American Revolution and independence',                                              keywords: ['american revolution', 'independence', 'usa', 'declaration of independence'] },
      { id: 'gh3-u4',  title: 'The French Revolution',                                                                 keywords: ['french revolution', 'bastille', 'napoleon', 'liberté', 'robespierre'] },
      { id: 'gh3-u5',  title: 'The Industrial Revolution',                                                             keywords: ['industrial revolution', 'industry', 'steam engine', 'factories', 'manchester'] },
      { id: 'gh3-u6',  title: 'The social consequences of industrialisation',                                          keywords: ['working class', 'socialism', 'marxism', 'trade unions', 'labour movement'] },
      { id: 'gh3-u7',  title: 'Nationalism and the unification of Italy and Germany',                                  keywords: ['nationalism', 'unification', 'italy', 'germany', 'bismarck', 'garibaldi'] },
      { id: 'gh3-u8',  title: 'Imperialism and the colonisation of Africa and Asia',                                   keywords: ['imperialism', 'colonialism', 'africa', 'asia', 'empire', 'scramble for africa'] },
    ],
  },

  'Inglés': {
    '1º ESO': [
      { id: 'eng1-u1', title: 'Meeting people and talking about yourself',                                             keywords: ['greetings', 'introductions', 'personal information', 'present simple to be'] },
      { id: 'eng1-u2', title: 'Present simple and daily routines',                                                     keywords: ['present simple', 'daily routine', 'adverbs of frequency', 'habits'] },
      { id: 'eng1-u3', title: 'Present continuous and things happening now',                                           keywords: ['present continuous', 'happening now', 'ing form', 'temporary actions'] },
      { id: 'eng1-u4', title: 'Past simple: talking about what happened',                                              keywords: ['past simple', 'irregular verbs', 'past tense', 'yesterday'] },
      { id: 'eng1-u5', title: 'Reading and listening: short texts and dialogues',                                      keywords: ['reading', 'listening', 'comprehension', 'dialogues'] },
      { id: 'eng1-u6', title: 'Writing: descriptions and short paragraphs',                                            keywords: ['writing', 'description', 'paragraph', 'sentences'] },
    ],
    '2º ESO': [
      { id: 'eng2-u1', title: 'Past simple vs past continuous',                                                        keywords: ['past simple', 'past continuous', 'while', 'when', 'past tenses'] },
      { id: 'eng2-u2', title: 'Present perfect: experiences and recent events',                                        keywords: ['present perfect', 'ever', 'never', 'already', 'yet', 'just'] },
      { id: 'eng2-u3', title: 'Comparatives and superlatives',                                                         keywords: ['comparatives', 'superlatives', 'more', 'most', 'than', 'as as'] },
      { id: 'eng2-u4', title: 'Modal verbs: can, must, should, might',                                                 keywords: ['modal verbs', 'can', 'must', 'should', 'might', 'obligation', 'ability'] },
      { id: 'eng2-u5', title: 'Reading: inferential comprehension',                                                    keywords: ['reading', 'inference', 'implied meaning', 'comprehension'] },
      { id: 'eng2-u6', title: 'Writing: structured paragraphs and essays',                                             keywords: ['essay', 'paragraph', 'topic sentence', 'linking words', 'structure'] },
    ],
    '3º ESO': [
      { id: 'eng3-u1', title: 'Present perfect vs past simple in context',                                             keywords: ['present perfect', 'past simple', 'difference', 'time expressions'] },
      { id: 'eng3-u2', title: 'Future forms: will, going to, present continuous',                                      keywords: ['future', 'will', 'going to', 'future plans', 'predictions'] },
      { id: 'eng3-u3', title: 'First and second conditionals',                                                         keywords: ['conditionals', 'first conditional', 'second conditional', 'if clause'] },
      { id: 'eng3-u4', title: 'Passive voice: present and past',                                                       keywords: ['passive voice', 'passive', 'is made', 'was built', 'by'] },
      { id: 'eng3-u5', title: 'Critical reading and longer texts',                                                     keywords: ['critical reading', 'longer texts', 'main idea', 'supporting details'] },
      { id: 'eng3-u6', title: 'Speaking: presentations and guided discussion',                                         keywords: ['speaking', 'presentation', 'discussion', 'opinion', 'fluency'] },
    ],
    '4º ESO': [
      { id: 'eng4-u1', title: 'Third conditional and mixed conditionals',                                              keywords: ['third conditional', 'mixed conditional', 'if had', 'would have'] },
      { id: 'eng4-u2', title: 'Reported speech: statements, questions, commands',                                      keywords: ['reported speech', 'indirect speech', 'said that', 'asked if', 'told'] },
      { id: 'eng4-u3', title: 'Passive voice across all tenses',                                                       keywords: ['passive voice', 'all tenses', 'passive construction', 'agent'] },
      { id: 'eng4-u4', title: 'Formal writing: essays and reports',                                                    keywords: ['formal writing', 'essay', 'report', 'academic', 'register'] },
      { id: 'eng4-u5', title: 'Interaction, mediation, and discussion skills',                                         keywords: ['interaction', 'mediation', 'discussion', 'debate', 'opinion'] },
      { id: 'eng4-u6', title: 'Exam preparation: B2 / Cambridge',                                                     keywords: ['b2', 'cambridge', 'exam', 'fce', 'first certificate', 'ielts'] },
    ],
  },

};


// ── HELPER FUNCTIONS ──────────────────────────────────────────────────────────

/**
 * Normalise a subject name to a plain lowercase ASCII string for matching.
 */
function normalizeSubjectName(subject) {
  return (subject || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .trim()
    .toLowerCase();
}

/**
 * Resolve any subject string (including aliases and typos) to the canonical
 * key used in SUBJECTS_ES / SUBJECTS_EN and SUBJECT_META.
 */
function resolveSubjectKey(subject) {
  // Already a valid key?
  if (SUBJECTS_ES[subject] || SUBJECTS_EN[subject]) return subject;

  const normalized = normalizeSubjectName(subject);
  const aliases = {
    matematicas:           'Matemáticas',
    mates:                 'Matemáticas',
    maths:                 'Matemáticas',
    math:                  'Matemáticas',
    biologia:              'Biología',
    'biologia y geologia': 'Biología',
    'biology and geology': 'Biología',
    biology:               'Biología',
    'fisica y quimica':    'Física y Química',
    fisica:                'Física y Química',
    quimica:               'Física y Química',
    'physics and chemistry': 'Física y Química',
    historia:              'Historia',
    'geografia e historia':'Historia',
    'geography and history':'Historia',
    'social sciences':     'Historia',
    lengua:                'Lengua',
    'lengua castellana':   'Lengua',
    'castellano':          'Lengua',
    ingles:                'Inglés',
    english:               'Inglés',
    'advanced english':    'Inglés',
  };

  if (aliases[normalized]) return aliases[normalized];

  // Fuzzy fallback
  if (normalized.includes('biolog'))                          return 'Biología';
  if (normalized.includes('hist') || normalized.includes('geograf')) return 'Historia';
  if (normalized.includes('ingl') || normalized.includes('english'))  return 'Inglés';
  if (normalized.includes('fisica') || normalized.includes('quimica')) return 'Física y Química';
  if (normalized.includes('lengua') || normalized.includes('castellan')) return 'Lengua';
  if (normalized.includes('mat'))                             return 'Matemáticas';

  return subject; // return as-is if nothing matched
}

/**
 * Return 'es' or 'en' for a given subject string.
 */
function getSubjectLanguage(subject) {
  const key = resolveSubjectKey(subject);
  if (SUBJECTS_ES[key]) return 'es';
  if (SUBJECTS_EN[key]) return 'en';
  return 'es'; // safe default
}

/**
 * Return the SUBJECT_META entry for a given subject string.
 */
function getSubjectMeta(subject) {
  const key = resolveSubjectKey(subject);
  return SUBJECT_META[key] || SUBJECT_META['Matemáticas'];
}

/**
 * Return the ordered unit list for a given subject × grade combination.
 */
function getSubjectUnits(subject, grade) {
  const key = resolveSubjectKey(subject);
  return SUBJECT_UNIT_MAP[key]?.[grade] || [];
}

/**
 * Return the display title for a unit, in the correct language.
 * English ANL units store their title directly in English (no titleEn needed).
 */
function getUnitDisplayTitle(subject, unit, lang) {
  if (!unit) return '';
  // For English-medium subjects the title is already in English.
  // For Spanish-medium subjects the title is in Spanish.
  // The lang parameter is kept for forward-compatibility but is not needed here.
  return unit.title || '';
}

/**
 * Detect which curriculum unit is being discussed, based on keywords in text.
 * Returns the matching unit object or null.
 */
function detectCurriculumUnit(subject, grade, text) {
  if (!text) return null;
  const norm = text.toLowerCase();
  const units = getSubjectUnits(subject, grade);
  return units.find(unit =>
    unit.keywords.some(keyword => norm.includes(keyword.toLowerCase()))
  ) || null;
}

/**
 * Return the mode label in the correct language.
 */
function getModeLabel(modeKey, lang) {
  const mode = LEARNING_MODES[modeKey] || LEARNING_MODES.guiada;
  return lang === 'en' ? mode.label_en : mode.label_es;
}

/**
 * Return curriculum guide data (rationale, focus, outcomes, misconceptions,
 * units) for a given grade × subject combination.
 *
 * Handles three cases:
 *   1. Grade found in the subject's data → return it directly.
 *   2. Grade NOT in the subject's official offering (e.g. Biología in 2º ESO)
 *      → return a graceful fallback in the correct language.
 *   3. Subject not found at all → generic fallback.
 */
function getCurriculumGuide(grade, subject) {
  const key       = resolveSubjectKey(subject);
  const lang      = getSubjectLanguage(key);
  const bank      = lang === 'en' ? SUBJECTS_EN : SUBJECTS_ES;
  const subjectData = bank[key];

  if (!subjectData) {
    // Unknown subject — generic fallback
    return lang === 'en'
      ? { rationale: 'Turn teaching into clear goals, visible learning evidence, and guided practice.',
          focus: ['essential course content', 'applied understanding', 'growing independence'],
          outcomes: ['explains what they are doing', 'applies what they learned', 'spots and corrects mistakes with support'],
          misconceptions: ['answers from memory without real understanding', 'struggles to justify the method', 'needs support to review mistakes'],
          units: [] }
      : { rationale: 'Aterriza la enseñanza en objetivos claros, evidencia de aprendizaje y práctica guiada.',
          focus: ['contenidos esenciales del curso', 'comprensión aplicada', 'autonomía progresiva'],
          outcomes: ['explica lo que hace', 'aplica lo aprendido', 'detecta y corrige errores con ayuda'],
          misconceptions: ['responde de memoria sin comprensión', 'le cuesta justificar el procedimiento', 'necesita apoyo para revisar errores'],
          units: [] };
  }

  const gradeData = subjectData.grades?.[grade];

  if (!gradeData) {
    // Grade not in the official offering — graceful fallback
    const availableGrades = subjectData.availableGrades
      ? subjectData.availableGrades.join(', ')
      : Object.keys(subjectData.grades || {}).join(', ');

    return lang === 'en'
      ? { rationale: subjectData.rationale,
          focus: [`Note: ${subjectData.officialName || key} is typically offered in ${availableGrades} in the Madrid bilingual programme. Content for ${grade} may vary by school. Work with the topics the student brings to the session.`],
          outcomes: ['applies subject vocabulary correctly in English', 'explains concepts in their own words', 'connects new content to prior knowledge'],
          misconceptions: ['relying on Spanish when English is expected', 'memorising without understanding', 'not checking whether an answer makes sense'],
          units: getSubjectUnits(key, grade) }
      : { rationale: subjectData.rationale,
          focus: [`Nota: ${key} puede tener una distribución de cursos diferente en este centro. Trabaja con los contenidos que traiga el alumno a la sesión.`],
          outcomes: ['aplica el vocabulario de la materia correctamente', 'explica conceptos con sus propias palabras', 'conecta el contenido nuevo con lo que ya sabe'],
          misconceptions: ['memorizar sin comprender', 'no revisar si la respuesta tiene sentido', 'depender de fórmulas sin entender el procedimiento'],
          units: getSubjectUnits(key, grade) };
  }

  return {
    rationale:      subjectData.rationale,
    focus:          gradeData.focus,
    outcomes:       gradeData.outcomes,
    misconceptions: gradeData.misconceptions,
    units:          getSubjectUnits(key, grade),
  };
}

/**
 * Build the pedagogy block string injected into the system prompt.
 * Reads from LEARNING_MODES and getCurriculumGuide — no subject data inside.
 */
function buildPedagogyBlock(modeKey, grade, subject) {
  const key        = resolveSubjectKey(subject);
  const lang       = getSubjectLanguage(key);
  const mode       = LEARNING_MODES[modeKey] || LEARNING_MODES.guiada;
  const curriculum = getCurriculumGuide(grade, key);
  const stageGoals = lang === 'en' ? STAGE_GOALS_EN : STAGE_GOALS_ES;
  const methodology = lang === 'en' ? METHODOLOGY_EN : METHODOLOGY_ES;

  if (lang === 'en') {
    return `MADRID BILINGUAL CURRICULUM BASE:
- ESO stage goals: ${stageGoals.join('; ')}.
- Design support using this curriculum structure: ${methodology.join('; ')}.
- In ${key}, prioritise: ${curriculum.focus.join(', ')}.
- Evidence to look for during the conversation: ${curriculum.outcomes.join('; ')}.
- Common misconceptions to watch for: ${curriculum.misconceptions.join('; ')}.
- Pedagogical purpose of the subject: ${curriculum.rationale}

CURRENT LEARNING MODE: ${mode.label_en}
- Goal of this mode: ${mode.goal_en}
- How to run the session: ${mode.flow_en}`;
  }

  return `BASE CURRICULAR MADRID (PROGRAMA BILINGÜE):
- Etapa ESO: ${stageGoals.join('; ')}.
- Diseña la ayuda con esta estructura curricular: ${methodology.join('; ')}.
- En ${key}, prioriza: ${curriculum.focus.join(', ')}.
- Evidencias que debes buscar durante la conversación: ${curriculum.outcomes.join('; ')}.
- Errores frecuentes a vigilar: ${curriculum.misconceptions.join('; ')}.
- Sentido pedagógico de la materia: ${curriculum.rationale}

MODO DE APRENDIZAJE ACTUAL: ${mode.label_es}
- Objetivo del modo: ${mode.goal_es}
- Forma de conducir la sesión: ${mode.flow_es}`;
}
