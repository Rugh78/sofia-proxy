const GRADE_INFO = {
  '1º ESO':  { age: 12, level: 'básico',      detail: 'Contenidos de iniciación. Usa ejemplos muy cotidianos y concretos. Frases cortas. Vocabulario sencillo.' },
  '2º ESO':  { age: 13, level: 'básico',      detail: 'Consolida conceptos de 1º ESO. Introduce razonamiento abstracto poco a poco.' },
  '3º ESO':  { age: 14, level: 'intermedio',  detail: 'Nivel intermedio. Puede manejar más abstracción y relaciones entre conceptos.' },
  '4º ESO':  { age: 15, level: 'intermedio',  detail: 'Nivel intermedio-alto. Prepara para Bachillerato. Exige más rigor y precisión.' },
  '1º Bach': { age: 16, level: 'avanzado',    detail: 'Nivel Bachillerato. Rigor académico alto. Puede usar terminología técnica y razonamiento formal.' },
  '2º Bach': { age: 17, level: 'avanzado',    detail: 'Nivel máximo pre-universitario. Orientado a selectividad (EBAU). Máximo rigor, síntesis y precisión.' },
};

const LEARNING_MODES = {
  diagnostico: {
    label: 'Diagnóstico',
    goal: 'detectar qué sabe ya la alumna, qué confusiones tiene y desde dónde conviene empezar',
    flow: 'Empieza con 2-3 preguntas breves de comprobación. No expliques demasiado al principio. Tras detectar el nivel, resume en una frase lo que domina y en otra lo que toca reforzar.',
  },
  guiada: {
    label: 'Guiada',
    goal: 'enseñar paso a paso con andamiaje, comprobando comprensión entre micro-pasos',
    flow: 'Usa explicaciones cortas, una sola idea cada vez, luego pide a la alumna completar el siguiente paso o justificar una decisión.',
  },
  practica: {
    label: 'Práctica',
    goal: 'consolidar el aprendizaje mediante ejercicios graduados, feedback inmediato y recuperación activa',
    flow: 'Propón una secuencia de ejercicios de menor a mayor dificultad. Tras cada respuesta, da feedback breve, corrige el error exacto y plantea el siguiente reto.',
  }
};

const MADRID_CURRICULUM = {
  stageGoals: [
    'desarrollar hábitos de estudio y trabajo individual y en equipo',
    'usar fuentes de información con sentido crítico y apoyar el aprendizaje con tecnología',
    'aprender a identificar problemas, planificar soluciones y revisar resultados',
    'desarrollar iniciativa, confianza y capacidad de aprender a aprender',
    'comunicar con corrección ideas y razonamientos',
  ],
  methodology: [
    'trabajar con contenidos, criterios de evaluación, estándares de aprendizaje y metodología didáctica',
    'atender a la diversidad y ajustar la ayuda a la necesidad concreta de la alumna',
    'convertir el aprendizaje en actividades planificadas con evidencia observable',
  ],
  subjects: {
    'Matemáticas': {
      rationale: 'En el currículo madrileño la resolución de problemas, la investigación, la modelización y el uso de herramientas tecnológicas son el eje transversal de la materia.',
      grades: {
        '1º ESO': {
          focus: ['números naturales, enteros y fracciones', 'proporcionalidad básica', 'lenguaje algebraico inicial', 'geometría plana', 'estadística inicial', 'resolución de problemas'],
          outcomes: ['interpreta el enunciado y distingue datos de pregunta', 'justifica operaciones y unidades', 'relaciona representaciones numéricas, gráficas y algebraicas'],
          misconceptions: ['confundir parte-todo con división exacta', 'operar sin comprobar unidades', 'aplicar reglas mecánicas sin sentido del problema'],
        },
        '2º ESO': {
          focus: ['números racionales', 'porcentajes y proporcionalidad', 'expresiones algebraicas', 'ecuaciones sencillas', 'geometría del plano y espacio', 'probabilidad básica'],
          outcomes: ['elige estrategias de resolución con más autonomía', 'explica por qué un procedimiento funciona', 'interpreta resultados en contexto'],
          misconceptions: ['mezclar porcentaje con variación absoluta', 'resolver ecuaciones sin revisar el significado', 'confundir área, perímetro y volumen'],
        },
        '3º ESO': {
          focus: ['potencias y notación científica', 'polinomios', 'ecuaciones y sistemas', 'funciones', 'geometría', 'estadística y probabilidad'],
          outcomes: ['modeliza situaciones con lenguaje algebraico', 'resuelve ecuaciones para problemas reales', 'comunica y revisa el proceso matemático'],
          misconceptions: ['forzar métodos algebraicos sin entender la situación', 'leer gráficas de forma superficial', 'ignorar la plausibilidad del resultado'],
        },
        '4º ESO': {
          focus: ['profundización algebraica', 'funciones', 'geometría analítica', 'estadística y probabilidad', 'preparación para itinerarios posteriores'],
          outcomes: ['argumenta con más rigor', 'elige el método adecuado según el problema', 'conecta conceptos entre bloques'],
          misconceptions: ['aplicar recetas sin justificar', 'no conectar la representación gráfica con la algebraica', 'perder precisión en el lenguaje matemático'],
        },
      }
    },
    'Biología': {
      rationale: 'La materia debe ayudar a observar, explicar y relacionar fenómenos naturales con la salud, los seres vivos y el medio ambiente.',
      grades: {
        '1º ESO': {
          focus: ['seres vivos', 'célula', 'funciones vitales', 'ecosistemas', 'salud y hábitos'],
          outcomes: ['describe procesos con vocabulario científico básico', 'clasifica ejemplos', 'relaciona ciencia y vida cotidiana'],
          misconceptions: ['memorizar nombres sin comprender funciones', 'confundir niveles de organización', 'mezclar nutrición con alimentación'],
        },
        '2º ESO': {
          focus: ['materia y energía en los ecosistemas', 'relaciones tróficas', 'biodiversidad', 'impacto humano y sostenibilidad'],
          outcomes: ['explica relaciones causa-efecto en sistemas naturales', 'interpreta esquemas y cadenas tróficas', 'propone medidas sencillas de cuidado ambiental'],
          misconceptions: ['entender los ecosistemas como listas de seres vivos', 'confundir hábitat con nicho', 'ver el impacto humano solo como contaminación visible'],
        },
        '3º ESO': {
          focus: ['organización del cuerpo humano', 'nutrición', 'relación', 'reproducción', 'salud'],
          outcomes: ['explica procesos corporales', 'interpreta causas y consecuencias', 'toma decisiones informadas sobre salud'],
          misconceptions: ['separar sistemas sin ver su coordinación', 'repetir definiciones sin función biológica', 'no conectar hábitos con prevención'],
        },
        '4º ESO': {
          focus: ['genética básica', 'evolución', 'biotecnología', 'ecología y salud'],
          outcomes: ['relaciona herencia y variabilidad', 'explica cambios evolutivos con evidencias', 'valora implicaciones éticas y sociales de la ciencia'],
          misconceptions: ['pensar la evolución como progreso lineal', 'confundir gen con rasgo visible', 'tratar la genética como puro vocabulario'],
        },
      }
    },
    'Historia': {
      rationale: 'La enseñanza debe construir pensamiento histórico, comprensión del tiempo, causalidad y relación entre hechos, fuentes y contextos.',
      grades: {
        '1º ESO': {
          focus: ['prehistoria', 'primeras civilizaciones', 'mundo clásico', 'ejes temporales y mapas'],
          outcomes: ['ordena cronológicamente', 'usa vocabulario histórico básico', 'explica cambios y permanencias'],
          misconceptions: ['aprender fechas sin proceso histórico', 'confundir simultaneidad con causalidad', 'ignorar el uso de mapas y fuentes'],
        },
        '2º ESO': {
          focus: ['Edad Media', 'Al-Ándalus', 'reinos cristianos', 'Edad Moderna temprana'],
          outcomes: ['conecta hechos con contexto', 'interpreta mapas y fuentes sencillas', 'compara sociedades'],
          misconceptions: ['ver periodos históricos como bloques aislados', 'reducir Al-Ándalus a una etiqueta', 'responder sin situar espacio y tiempo'],
        },
        '3º ESO': {
          focus: ['expansión europea', 'Antiguo Régimen', 'Ilustración', 'revoluciones liberales e industrialización'],
          outcomes: ['explica transformaciones políticas, económicas y sociales', 'relaciona causas y consecuencias', 'compara procesos históricos'],
          misconceptions: ['separar revoluciones políticas y económicas', 'memorizar acontecimientos sin hilo conductor', 'olvidar a los actores sociales'],
        },
        '4º ESO': {
          focus: ['Edad Contemporánea', 'España contemporánea', 'cambios políticos y sociales', 'siglo XX y mundo actual'],
          outcomes: ['analiza causas y consecuencias', 'argumenta con evidencias', 'relaciona procesos históricos'],
          misconceptions: ['simplificar conflictos complejos', 'usar explicaciones monocausales', 'no distinguir hecho, interpretación y opinión'],
        },
      }
    },
    'Lengua': {
      rationale: 'La prioridad es comprender, expresar, argumentar y revisar el propio lenguaje oral y escrito con creciente autonomía.',
      grades: {
        '1º ESO': {
          focus: ['comprensión lectora', 'tipos de texto', 'gramática básica', 'ortografía', 'expresión escrita'],
          outcomes: ['localiza ideas principales', 'mejora frases y textos', 'justifica reglas básicas de lengua'],
          misconceptions: ['centrarse solo en etiquetas gramaticales', 'corregir sin explicar', 'escribir sin planificar'],
        },
        '2º ESO': {
          focus: ['sintaxis básica', 'cohesión textual', 'géneros literarios', 'expresión oral y escrita'],
          outcomes: ['analiza estructuras', 'redacta con mayor coherencia', 'comenta textos con apoyo'],
          misconceptions: ['confundir función con categoría', 'hacer análisis mecánicos', 'no revisar la cohesión del texto'],
        },
        '3º ESO': {
          focus: ['oración compuesta', 'tipologías textuales', 'comentario guiado', 'literatura', 'argumentación'],
          outcomes: ['relaciona forma y intención comunicativa', 'escribe textos mejor estructurados', 'justifica análisis con ejemplos'],
          misconceptions: ['memorizar definiciones sin aplicarlas', 'comentar textos sin citar evidencia', 'mezclar resumen con análisis'],
        },
        '4º ESO': {
          focus: ['argumentación', 'comentario de texto', 'sintaxis avanzada', 'literatura contemporánea', 'escritura formal'],
          outcomes: ['defiende una interpretación con evidencias', 'redacta con precisión y registro adecuado', 'revisa de forma autónoma'],
          misconceptions: ['opinar sin justificar', 'abusar de fórmulas de comentario', 'descuidar cohesión y registro'],
        },
      }
    },
    'Inglés': {
      rationale: 'El aprendizaje debe combinar comprensión, producción, interacción y uso funcional del idioma en situaciones reales.',
      grades: {
        '1º ESO': {
          focus: ['vocabulario cotidiano', 'present simple/continuous', 'comprensión básica', 'producción guiada'],
          outcomes: ['entiende mensajes sencillos', 'responde con estructuras modelo', 'gana confianza para comunicarse'],
          misconceptions: ['traducir palabra por palabra', 'usar reglas sin contexto', 'ignorar pronunciación y comprensión'],
        },
        '2º ESO': {
          focus: ['past simple', 'comparatives', 'reading/listening guiado', 'writing estructurado'],
          outcomes: ['usa tiempos y estructuras con apoyo', 'corrige errores frecuentes', 'mejora fluidez y comprensión'],
          misconceptions: ['mezclar tiempos verbales sin referencia temporal', 'aprender listas sin uso comunicativo', 'escribir sin modelos'],
        },
        '3º ESO': {
          focus: ['present perfect', 'future forms', 'conditionals básicos', 'reading inferencial', 'speaking guiado'],
          outcomes: ['selecciona la estructura según intención comunicativa', 'comprende información explícita e inferida', 'se expresa con mayor autonomía'],
          misconceptions: ['confundir present perfect con past simple', 'centrarse solo en gramática aislada', 'evitar hablar por miedo al error'],
        },
        '4º ESO': {
          focus: ['conditionals', 'reported speech', 'passive voice', 'writing formal', 'interacción y mediación'],
          outcomes: ['usa estructuras complejas con más control', 'ajusta el registro', 'comprende textos y audios más variados'],
          misconceptions: ['transformar estructuras sin comprender su función', 'descuidar el contexto comunicativo', 'pensar que hablar bien es no cometer ningún error'],
        },
      }
    }
  }
};

const SUBJECT_LANGUAGE = {
  'Matemáticas': 'es',
  'Biología': 'en',
  'Física y Química': 'es',
  'Historia': 'en',
  'Lengua': 'es',
  'Inglés': 'en',
};

const SUBJECT_META = {
  'Matemáticas': {
    language: 'es',
    badge: 'ES',
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
    language: 'en',
    badge: 'EN',
    welcomePrompt: 'Which Biology topic should we start with today?',
    topicPrompt: 'Which topic do you want to work on, and what feels difficult right now?',
    modePrompts: {
      diagnostico: 'Let’s start with a **diagnostic check** in Biology. I’ll ask a few short questions to see your starting point.',
      guiada: 'We are switching to **guided learning** in Biology. We will go step by step, one idea at a time.',
      practica: 'We are now in **practice mode** for Biology. I’ll give you short tasks and immediate feedback.',
    },
    chips: {
      diagnostico: '🎯 Diagnose',
      guiada: '🧭 Guided',
      practica: '💪 Practice',
      exam: '📝 Exam mode',
    },
  },
  'Física y Química': {
    language: 'es',
    badge: 'ES',
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
    language: 'en',
    badge: 'EN',
    welcomePrompt: 'Which Social Sciences topic should we start with today?',
    topicPrompt: 'Which Geography or History topic do you want to work on, and what part feels hardest?',
    modePrompts: {
      diagnostico: 'Let’s start with a **diagnostic check** in Social Sciences. I’ll ask a few short questions to see what you already remember.',
      guiada: 'We are switching to **guided learning** in Social Sciences. We will connect ideas step by step.',
      practica: 'We are now in **practice mode** for Social Sciences. I’ll give you short questions with immediate feedback.',
    },
    chips: {
      diagnostico: '🎯 Diagnose',
      guiada: '🧭 Guided',
      practica: '💪 Practice',
      exam: '📝 Exam mode',
    },
  },
  'Lengua': {
    language: 'es',
    badge: 'ES',
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
    language: 'en',
    badge: 'EN',
    welcomePrompt: 'Which English topic should we start with today?',
    topicPrompt: 'Which topic do you want to work on, and what part feels hardest?',
    modePrompts: {
      diagnostico: 'Let’s begin with a short **diagnostic check** in English. I’ll ask a few quick questions first.',
      guiada: 'We are switching to **guided learning** in English. We will build the answer step by step.',
      practica: 'We are now in **practice mode** for English. I’ll give you short exercises and instant feedback.',
    },
    chips: {
      diagnostico: '🎯 Diagnose',
      guiada: '🧭 Guided',
      practica: '💪 Practice',
      exam: '📝 Exam mode',
    },
  },
};

const SUBJECT_UNIT_MAP = {
  'Lengua': {
    '1º ESO': [
      { id: 'len1-u1', title: 'La comunicación, significado y sentido, letras y sonidos', keywords: ['comunicación', 'significado', 'sentido', 'letras', 'sonidos'] },
      { id: 'len1-u2', title: 'Las lenguas de España, morfemas y formación de palabras', keywords: ['lenguas de españa', 'morfemas', 'formación de palabras', 'mayúsculas'] },
      { id: 'len1-u3', title: 'Los textos, sustantivo y determinantes', keywords: ['textos', 'sustantivo', 'determinantes', 'artículo'] },
      { id: 'len1-u4', title: 'Clases de textos y géneros literarios', keywords: ['clases de textos', 'géneros literarios', 'demostrativos', 'posesivos'] },
      { id: 'len1-u5', title: 'La narración y la narrativa', keywords: ['narración', 'narrativa', 'interjección', 'relativos'] },
      { id: 'len1-u6', title: 'La noticia, pronombres y cuento', keywords: ['noticia', 'pronombres', 'cuento', 'comunicación audiovisual'] },
      { id: 'len1-u7', title: 'La descripción y el adjetivo', keywords: ['descripción', 'adjetivo', 'acentuación', 'leyenda', 'mito'] },
      { id: 'len1-u8', title: 'Descripción de personas y lugares, verbo y novela', keywords: ['descripción de personas', 'lugares', 'verbo', 'novela'] },
      { id: 'len1-u9', title: 'El diálogo, diccionarios y lírica', keywords: ['diálogo', 'diccionarios', 'hiatos', 'conjugación verbal', 'lírica'] },
      { id: 'len1-u10', title: 'Clases de diálogo, puntuación, adverbio, preposiciones y conjunciones', keywords: ['clases de diálogo', 'punto', 'coma', 'adverbio', 'preposiciones', 'conjunciones'] },
      { id: 'len1-u11', title: 'Descripción y diálogo en la narración, grupos sintácticos y teatro', keywords: ['grupos sintácticos', 'teatro', 'dos puntos', 'acepciones'] },
      { id: 'len1-u12', title: 'Lenguaje e Internet, oración, sujeto y predicado, literatura y cine', keywords: ['internet', 'oración', 'sujeto', 'predicado', 'literatura y cine'] },
    ],
  },
  'Biología': {
    '1º ESO': [
      { id: 'bg1-geosfera', title: 'La Geosfera terrestre e impactos de actividades humanas', titleEn: 'The geosphere and human impact', keywords: ['geosfera', 'rocas', 'minerales', 'volcanes'] },
      { id: 'bg1-atmosfera', title: 'La Atmósfera terrestre e impactos de actividades humanas', titleEn: 'The atmosphere and human impact', keywords: ['atmósfera', 'aire', 'capas', 'contaminación'] },
      { id: 'bg1-hidrosfera', title: 'La Hidrosfera terrestre e impactos de actividades humanas', titleEn: 'The hydrosphere and human impact', keywords: ['hidrosfera', 'agua', 'ríos', 'mares', 'ciclo del agua'] },
      { id: 'bg1-biosfera-celula', title: 'La Biosfera terrestre y la célula', titleEn: 'The biosphere and the cell', keywords: ['biosfera', 'seres vivos', 'célula', 'cell'] },
      { id: 'bg1-clasificacion', title: 'Clasificación de seres vivos y reinos', titleEn: 'Classification of living things and kingdoms', keywords: ['clasificación', 'reinos', 'taxonomy', 'living things'] },
      { id: 'bg1-plantas', title: 'Reino Plantas', titleEn: 'Plant kingdom', keywords: ['plantas', 'plants', 'photosynthesis', 'fotosíntesis'] },
      { id: 'bg1-animal', title: 'Reino Animal', titleEn: 'Animal kingdom', keywords: ['animals', 'animales', 'animal kingdom'] },
      { id: 'bg1-invertebrados', title: 'Animales invertebrados', titleEn: 'Invertebrate animals', keywords: ['invertebrates', 'invertebrados', 'arthropods'] },
      { id: 'bg1-vertebrados', title: 'Animales vertebrados', titleEn: 'Vertebrate animals', keywords: ['vertebrates', 'vertebrados', 'mammals', 'birds', 'fish'] },
      { id: 'bg1-salud', title: 'Hábitos saludables', titleEn: 'Healthy habits', keywords: ['healthy habits', 'hábitos saludables', 'health', 'alimentación'] },
    ],
  },
  'Historia': {
    '1º ESO': [
      { id: 'gh1-tierra', title: 'La Tierra y su representación', titleEn: 'Earth and its representation', keywords: ['tierra', 'representación', 'mapas', 'coordenadas'] },
      { id: 'gh1-relieve', title: 'El relieve terrestre', titleEn: 'Landforms and relief', keywords: ['relieve', 'montañas', 'llanuras'] },
      { id: 'gh1-aguas', title: 'Las aguas', titleEn: 'Water on Earth', keywords: ['aguas', 'ríos', 'mares', 'océanos'] },
      { id: 'gh1-clima', title: 'El clima', titleEn: 'Climate', keywords: ['clima', 'temperatura', 'precipitaciones'] },
      { id: 'gh1-paisajes', title: 'Los paisajes de la Tierra', titleEn: 'Earth landscapes', keywords: ['paisajes', 'paisaje natural', 'paisaje humanizado'] },
      { id: 'gh1-continentes', title: 'Atlas de los continentes', titleEn: 'Continents atlas', keywords: ['continentes', 'atlas'] },
      { id: 'gh1-espana-fisica', title: 'El estudio físico de España', titleEn: 'Physical geography of Spain', keywords: ['españa', 'relieve de españa', 'clima de españa'] },
      { id: 'gh1-prehistoria', title: 'La prehistoria', titleEn: 'Prehistory', keywords: ['prehistoria', 'paleolítico', 'neolítico'] },
      { id: 'gh1-fluviales', title: 'Mesopotamia y Egipto', titleEn: 'Mesopotamia and Egypt', keywords: ['mesopotamia', 'egipto', 'civilizaciones fluviales'] },
      { id: 'gh1-grecia', title: 'La civilización griega', titleEn: 'Ancient Greece', keywords: ['grecia', 'griega', 'polis'] },
      { id: 'gh1-roma', title: 'La civilización romana', titleEn: 'Ancient Rome', keywords: ['roma', 'romana', 'imperio romano'] },
      { id: 'gh1-antiguedad-espana', title: 'España en la Antigüedad', titleEn: 'Ancient Spain', keywords: ['hispania', 'españa en la antigüedad'] },
    ],
  },
  'Física y Química': {
    '2º ESO': [
      { id: 'fyq2-destrezas', title: 'Magnitudes, S.I., cambio de unidades, notación científica y cifras significativas', keywords: ['magnitudes', 's.i.', 'unidades', 'notación científica', 'cifras significativas'] },
      { id: 'fyq2-lab', title: 'Trabajo de laboratorio e informes', keywords: ['laboratorio', 'informe', 'experimento'] },
      { id: 'fyq2-estados', title: 'Estados de agregación', keywords: ['sólido', 'líquido', 'gas', 'estados de agregación'] },
      { id: 'fyq2-mezclas', title: 'Mezclas y disoluciones', keywords: ['mezclas', 'disoluciones', 'soluto', 'disolvente'] },
      { id: 'fyq2-atomo', title: 'El átomo', keywords: ['átomo', 'electrones', 'protones', 'neutrones'] },
      { id: 'fyq2-cambio', title: 'El cambio', keywords: ['cambio físico', 'cambio químico'] },
      { id: 'fyq2-movimiento', title: 'El movimiento', keywords: ['movimiento', 'velocidad', 'trayectoria'] },
      { id: 'fyq2-fuerzas', title: 'Las fuerzas', keywords: ['fuerzas', 'newton', 'rozamiento'] },
      { id: 'fyq2-energia', title: 'La energía', keywords: ['energía', 'trabajo', 'potencia'] },
    ],
    '3º ESO': [
      { id: 'fyq3-gases', title: 'Leyes de los gases', keywords: ['gases', 'boyle', 'charles', 'presión', 'volumen', 'temperatura'] },
      { id: 'fyq3-mezclas', title: 'Mezclas y disoluciones', keywords: ['mezclas', 'disoluciones', 'concentración'] },
      { id: 'fyq3-atomo', title: 'El átomo', keywords: ['átomo', 'modelo atómico'] },
      { id: 'fyq3-nomenclatura', title: 'Nomenclatura y compuestos químicos', keywords: ['nomenclatura', 'compuestos', 'óxidos', 'sales'] },
      { id: 'fyq3-reacciones', title: 'Reacciones químicas', keywords: ['reacciones químicas', 'reactivos', 'productos'] },
      { id: 'fyq3-movimiento', title: 'El movimiento', keywords: ['movimiento', 'aceleración'] },
      { id: 'fyq3-fuerzas', title: 'Las fuerzas', keywords: ['fuerzas', 'dinámica'] },
      { id: 'fyq3-energia', title: 'La energía', keywords: ['energía', 'calor', 'trabajo'] },
    ],
    '4º ESO': [
      { id: 'fyq4-materia', title: 'Sistemas materiales, modelos atómicos y cuantificación de la materia', keywords: ['sistemas materiales', 'modelos atómicos', 'mol'] },
      { id: 'fyq4-inorganica', title: 'Formulación inorgánica', keywords: ['formulación inorgánica', 'óxidos', 'sales'] },
      { id: 'fyq4-organica', title: 'Formulación orgánica', keywords: ['formulación orgánica', 'hidrocarburos'] },
      { id: 'fyq4-cambio', title: 'El cambio', keywords: ['estequiometría', 'reacciones'] },
      { id: 'fyq4-movimiento', title: 'El movimiento', keywords: ['cinemática', 'movimiento'] },
      { id: 'fyq4-fuerza', title: 'La fuerza como agente de cambio', keywords: ['leyes de newton', 'fuerza'] },
      { id: 'fyq4-gravitacion', title: 'Gravitación y presión en fluidos', keywords: ['gravitación', 'presión', 'fluidos'] },
      { id: 'fyq4-energia', title: 'La energía', keywords: ['energía', 'conservación'] },
    ],
  },
};

function getCurriculumGuide(grade, subject) {
  const subjectKey = resolveSubjectKey(subject);
  const subjectGuide = MADRID_CURRICULUM.subjects[subjectKey] || {};
  const byGrade = subjectGuide.grades?.[grade];
  if (getSubjectLanguage(subjectKey) === 'en') {
    const englishSubjects = {
      'Biología': {
        rationale: 'The subject should help the student observe, explain, and connect natural phenomena with health, living things, and the environment.',
        grades: {
          '1º ESO': {
            focus: ['living things', 'the cell', 'life processes', 'ecosystems', 'health and habits'],
            outcomes: ['describes processes using basic scientific vocabulary', 'classifies examples correctly', 'connects science to everyday life'],
            misconceptions: ['memorising names without understanding functions', 'confusing levels of organisation', 'mixing up nutrition and feeding'],
          },
          '2º ESO': {
            focus: ['matter and energy in ecosystems', 'food chains and food webs', 'biodiversity', 'human impact and sustainability'],
            outcomes: ['explains cause-and-effect relationships in natural systems', 'interprets diagrams and food chains', 'suggests simple environmental care actions'],
            misconceptions: ['treating ecosystems as simple lists of living things', 'confusing habitat and niche', 'seeing human impact only as visible pollution'],
          },
          '3º ESO': {
            focus: ['human body organisation', 'nutrition', 'coordination and response', 'reproduction', 'health'],
            outcomes: ['explains body processes clearly', 'interprets causes and consequences', 'makes informed health decisions'],
            misconceptions: ['studying systems separately without seeing coordination', 'repeating definitions without biological meaning', 'not connecting habits with prevention'],
          },
          '4º ESO': {
            focus: ['basic genetics', 'evolution', 'biotechnology', 'ecology and health'],
            outcomes: ['connects inheritance and variation', 'explains evolutionary change using evidence', 'reflects on ethical and social implications of science'],
            misconceptions: ['thinking of evolution as linear progress', 'confusing genes with visible traits', 'treating genetics as vocabulary only'],
          },
        },
      },
      'Historia': {
        rationale: 'The subject should build historical and geographical thinking, helping the student understand time, place, causality, sources, and context.',
        grades: {
          '1º ESO': {
            focus: ['prehistory', 'early civilisations', 'the classical world', 'timelines and maps'],
            outcomes: ['places events in chronological order', 'uses basic historical vocabulary', 'explains change and continuity'],
            misconceptions: ['memorising dates without understanding processes', 'confusing simultaneity with causality', 'ignoring the use of maps and sources'],
          },
          '2º ESO': {
            focus: ['the Middle Ages', 'Al-Andalus', 'Christian kingdoms', 'the early Modern Age'],
            outcomes: ['connects events with context', 'interprets simple maps and sources', 'compares societies'],
            misconceptions: ['treating periods as isolated blocks', 'reducing Al-Andalus to a label', 'answering without placing events in time and space'],
          },
          '3º ESO': {
            focus: ['European expansion', 'the Old Regime', 'the Enlightenment', 'liberal revolutions and industrialisation'],
            outcomes: ['explains political, economic, and social change', 'connects causes and consequences', 'compares historical processes'],
            misconceptions: ['separating political and economic revolutions', 'memorising events without a clear thread', 'forgetting social actors'],
          },
          '4º ESO': {
            focus: ['the Contemporary Age', 'contemporary Spain', 'political and social change', 'the twentieth century and today’s world'],
            outcomes: ['analyses causes and consequences', 'argues using evidence', 'connects historical processes'],
            misconceptions: ['oversimplifying complex conflicts', 'using single-cause explanations', 'not distinguishing fact, interpretation, and opinion'],
          },
        },
      },
      'Inglés': {
        rationale: 'Learning should combine comprehension, production, interaction, and meaningful language use in real situations.',
        grades: {
          '1º ESO': {
            focus: ['everyday vocabulary', 'present simple and present continuous', 'basic comprehension', 'guided production'],
            outcomes: ['understands simple messages', 'responds using model structures', 'gains confidence when communicating'],
            misconceptions: ['translating word by word', 'using rules without context', 'ignoring pronunciation and comprehension'],
          },
          '2º ESO': {
            focus: ['past simple', 'comparatives', 'guided reading and listening', 'structured writing'],
            outcomes: ['uses tenses and structures with support', 'corrects common errors', 'improves fluency and understanding'],
            misconceptions: ['mixing tenses without a clear time reference', 'learning lists without communicative use', 'writing without models'],
          },
          '3º ESO': {
            focus: ['present perfect', 'future forms', 'basic conditionals', 'inferential reading', 'guided speaking'],
            outcomes: ['chooses the right structure for the communicative purpose', 'understands explicit and inferred information', 'expresses ideas more independently'],
            misconceptions: ['confusing present perfect with past simple', 'focusing only on isolated grammar', 'avoiding speaking because of fear of mistakes'],
          },
          '4º ESO': {
            focus: ['conditionals', 'reported speech', 'passive voice', 'formal writing', 'interaction and mediation'],
            outcomes: ['uses more complex structures with greater control', 'adjusts register', 'understands a wider range of texts and audio'],
            misconceptions: ['transforming structures without understanding their function', 'neglecting communicative context', 'thinking speaking well means never making mistakes'],
          },
        },
      },
    };
    const englishGuide = englishSubjects[subjectKey] || {};
    const englishGrade = englishGuide.grades?.[grade];
    return {
      rationale: englishGuide.rationale || 'Turn teaching into clear goals, visible learning evidence, and guided practice.',
      focus: englishGrade?.focus || ['essential course content', 'applied understanding', 'growing independence'],
      outcomes: englishGrade?.outcomes || ['explains what they are doing', 'applies what they learned', 'spots and corrects mistakes with support'],
      misconceptions: englishGrade?.misconceptions || ['answers from memory without real understanding', 'struggles to justify the method', 'needs support to review mistakes'],
      units: byGrade?.units || SUBJECT_UNIT_MAP[subjectKey]?.[grade] || [],
    };
  }
  return {
    rationale: subjectGuide.rationale || 'Aterriza la enseñanza en objetivos claros, evidencia de aprendizaje y práctica guiada.',
    focus: byGrade?.focus || ['contenidos esenciales del curso', 'comprensión aplicada', 'autonomía progresiva'],
    outcomes: byGrade?.outcomes || ['explica lo que hace', 'aplica lo aprendido', 'detecta y corrige errores con ayuda'],
    misconceptions: byGrade?.misconceptions || ['responde de memoria sin comprensión', 'le cuesta justificar el procedimiento', 'necesita apoyo para revisar errores'],
    units: byGrade?.units || SUBJECT_UNIT_MAP[subjectKey]?.[grade] || [],
  };
}

function buildPedagogyBlock(modeKey, grade, subject) {
  const mode = LEARNING_MODES[modeKey] || LEARNING_MODES.guiada;
  const curriculum = getCurriculumGuide(grade, subject);
  const language = getSubjectLanguage(subject);
  const englishMedium = {
    stageGoals: [
      'build steady study habits and work well independently and with others',
      'use information sources critically and support learning with technology',
      'identify problems, plan solutions, and review results',
      'develop initiative, confidence, and learning-to-learn habits',
      'communicate ideas and reasoning clearly',
    ],
    methodology: [
      'work with content, assessment criteria, learning evidence, and teaching methodology',
      'adapt support to the student’s specific need',
      'turn learning into planned activities with visible evidence',
    ],
    subjects: {
      'Biología': {
        rationale: 'The subject should help the student observe, explain, and connect natural phenomena with health, living things, and the environment.',
        grades: {
          '1º ESO': {
            focus: ['living things', 'the cell', 'life processes', 'ecosystems', 'health and habits'],
            outcomes: ['describes processes using basic scientific vocabulary', 'classifies examples correctly', 'connects science to everyday life'],
            misconceptions: ['memorising names without understanding functions', 'confusing levels of organisation', 'mixing up nutrition and feeding'],
          },
          '2º ESO': {
            focus: ['matter and energy in ecosystems', 'food chains and food webs', 'biodiversity', 'human impact and sustainability'],
            outcomes: ['explains cause-and-effect relationships in natural systems', 'interprets diagrams and food chains', 'suggests simple environmental care actions'],
            misconceptions: ['treating ecosystems as simple lists of living things', 'confusing habitat and niche', 'seeing human impact only as visible pollution'],
          },
          '3º ESO': {
            focus: ['human body organisation', 'nutrition', 'coordination and response', 'reproduction', 'health'],
            outcomes: ['explains body processes clearly', 'interprets causes and consequences', 'makes informed health decisions'],
            misconceptions: ['studying systems separately without seeing coordination', 'repeating definitions without biological meaning', 'not connecting habits with prevention'],
          },
          '4º ESO': {
            focus: ['basic genetics', 'evolution', 'biotechnology', 'ecology and health'],
            outcomes: ['connects inheritance and variation', 'explains evolutionary change using evidence', 'reflects on ethical and social implications of science'],
            misconceptions: ['thinking of evolution as linear progress', 'confusing genes with visible traits', 'treating genetics as vocabulary only'],
          },
        },
      },
      'Historia': {
        rationale: 'The subject should build historical and geographical thinking, helping the student understand time, place, causality, sources, and context.',
        grades: {
          '1º ESO': {
            focus: ['prehistory', 'early civilisations', 'the classical world', 'timelines and maps'],
            outcomes: ['places events in chronological order', 'uses basic historical vocabulary', 'explains change and continuity'],
            misconceptions: ['memorising dates without understanding processes', 'confusing simultaneity with causality', 'ignoring the use of maps and sources'],
          },
          '2º ESO': {
            focus: ['the Middle Ages', 'Al-Andalus', 'Christian kingdoms', 'the early Modern Age'],
            outcomes: ['connects events with context', 'interprets simple maps and sources', 'compares societies'],
            misconceptions: ['treating periods as isolated blocks', 'reducing Al-Andalus to a label', 'answering without placing events in time and space'],
          },
          '3º ESO': {
            focus: ['European expansion', 'the Old Regime', 'the Enlightenment', 'liberal revolutions and industrialisation'],
            outcomes: ['explains political, economic, and social change', 'connects causes and consequences', 'compares historical processes'],
            misconceptions: ['separating political and economic revolutions', 'memorising events without a clear thread', 'forgetting social actors'],
          },
          '4º ESO': {
            focus: ['the Contemporary Age', 'contemporary Spain', 'political and social change', 'the twentieth century and today’s world'],
            outcomes: ['analyses causes and consequences', 'argues using evidence', 'connects historical processes'],
            misconceptions: ['oversimplifying complex conflicts', 'using single-cause explanations', 'not distinguishing fact, interpretation, and opinion'],
          },
        },
      },
      'Inglés': {
        rationale: 'Learning should combine comprehension, production, interaction, and meaningful language use in real situations.',
        grades: {
          '1º ESO': {
            focus: ['everyday vocabulary', 'present simple and present continuous', 'basic comprehension', 'guided production'],
            outcomes: ['understands simple messages', 'responds using model structures', 'gains confidence when communicating'],
            misconceptions: ['translating word by word', 'using rules without context', 'ignoring pronunciation and comprehension'],
          },
          '2º ESO': {
            focus: ['past simple', 'comparatives', 'guided reading and listening', 'structured writing'],
            outcomes: ['uses tenses and structures with support', 'corrects common errors', 'improves fluency and understanding'],
            misconceptions: ['mixing tenses without a clear time reference', 'learning lists without communicative use', 'writing without models'],
          },
          '3º ESO': {
            focus: ['present perfect', 'future forms', 'basic conditionals', 'inferential reading', 'guided speaking'],
            outcomes: ['chooses the right structure for the communicative purpose', 'understands explicit and inferred information', 'expresses ideas more independently'],
            misconceptions: ['confusing present perfect with past simple', 'focusing only on isolated grammar', 'avoiding speaking because of fear of mistakes'],
          },
          '4º ESO': {
            focus: ['conditionals', 'reported speech', 'passive voice', 'formal writing', 'interaction and mediation'],
            outcomes: ['uses more complex structures with greater control', 'adjusts register', 'understands a wider range of texts and audio'],
            misconceptions: ['transforming structures without understanding their function', 'neglecting communicative context', 'thinking speaking well means never making mistakes'],
          },
        },
      },
    },
  };

  if (language === 'en') {
    const subjectGuide = englishMedium.subjects[subject] || {};
    const byGrade = subjectGuide.grades?.[grade] || {};
    const modeLabels = {
      diagnostico: { label: 'Diagnostic', goal: 'identify what the student already knows, where the confusion is, and where to start', flow: 'Begin with 2-3 short checking questions. Do not over-explain at first. After checking, summarise in one sentence what she already knows and in one sentence what needs reinforcement.' },
      guiada: { label: 'Guided', goal: 'teach step by step with scaffolding and frequent checks for understanding', flow: 'Use short explanations with one idea at a time, then ask the student to complete the next step or justify a choice.' },
      practica: { label: 'Practice', goal: 'consolidate learning through graded exercises, immediate feedback, and active recall', flow: 'Give a sequence of tasks from easier to harder. After each answer, give brief feedback, correct the exact mistake, and then propose the next challenge.' },
    };
    const modeEn = modeLabels[modeKey] || modeLabels.guiada;
    return `MADRID CURRICULUM BASE:
- ESO stage goals: ${englishMedium.stageGoals.join('; ')}.
- Design support using this curriculum structure: ${englishMedium.methodology.join('; ')}.
- In ${subject}, prioritise: ${(byGrade.focus || curriculum.focus).join(', ')}.
- Evidence to look for during the conversation: ${(byGrade.outcomes || curriculum.outcomes).join('; ')}.
- Common misconceptions to watch for: ${(byGrade.misconceptions || curriculum.misconceptions).join('; ')}.
- Pedagogical purpose of the subject: ${subjectGuide.rationale || curriculum.rationale}

CURRENT LEARNING MODE: ${modeEn.label}
- Goal of this mode: ${modeEn.goal}
- How to run the session: ${modeEn.flow}`;
  }

  return `BASE CURRICULAR MADRID:
- Etapa ESO: ${MADRID_CURRICULUM.stageGoals.join('; ')}.
- Diseña la ayuda con esta estructura curricular: ${MADRID_CURRICULUM.methodology.join('; ')}.
- En ${subject}, prioriza: ${curriculum.focus.join(', ')}.
- Evidencias que debes buscar durante la conversación: ${curriculum.outcomes.join('; ')}.
- Errores frecuentes a vigilar: ${curriculum.misconceptions.join('; ')}.
- Sentido pedagógico de la materia: ${curriculum.rationale}

MODO DE APRENDIZAJE ACTUAL: ${mode.label}
- Objetivo del modo: ${mode.goal}
- Forma de conducir la sesión: ${mode.flow}`;
}

function normalizeSubjectName(subject) {
  return (subject || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .trim()
    .toLowerCase();
}

function resolveSubjectKey(subject) {
  if (SUBJECT_LANGUAGE[subject]) return subject;
  const normalized = normalizeSubjectName(subject);
  const aliases = {
    matematicas: 'Matemáticas',
    biologia: 'Biología',
    'biologia y geologia': 'Biología',
    fisica: 'Física y Química',
    'fisica y quimica': 'Física y Química',
    historia: 'Historia',
    'geografia e historia': 'Historia',
    lengua: 'Lengua',
    ingles: 'Inglés',
    english: 'Inglés',
  };
  if (aliases[normalized]) return aliases[normalized];
  if (normalized.includes('biolog')) return 'Biología';
  if (normalized.includes('hist') || normalized.includes('geograf')) return 'Historia';
  if (normalized.includes('ingl') || normalized.includes('english')) return 'Inglés';
  return Object.keys(SUBJECT_LANGUAGE).find(key => normalizeSubjectName(key) === normalized) || subject;
}

function getSubjectLanguage(subject) {
  const key = resolveSubjectKey(subject);
  return SUBJECT_LANGUAGE[key] || 'es';
}

function getSubjectMeta(subject) {
  const key = resolveSubjectKey(subject);
  return SUBJECT_META[key] || SUBJECT_META['Matemáticas'];
}

function getSubjectUnits(subject, grade) {
  const key = resolveSubjectKey(subject);
  return SUBJECT_UNIT_MAP[key]?.[grade] || [];
}

function getUnitDisplayTitle(subject, unit, lang) {
  if (!unit) return '';
  if (lang === 'en' && unit.titleEn) return unit.titleEn;
  return unit.title;
}

function detectCurriculumUnit(subject, grade, text) {
  if (!text) return null;
  const norm = text.toLowerCase();
  const units = getSubjectUnits(subject, grade);
  return units.find(unit => unit.keywords.some(keyword => norm.includes(keyword.toLowerCase()))) || null;
}


