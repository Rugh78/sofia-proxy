export const GRADE_INFO = {
  '1º ESO':  { age: 12, level: 'básico',      detail: 'Contenidos de iniciación. Usa ejemplos muy cotidianos y concretos. Frases cortas. Vocabulario sencillo.' },
  '2º ESO':  { age: 13, level: 'básico',      detail: 'Consolida conceptos de 1º ESO. Introduce razonamiento abstracto poco a poco.' },
  '3º ESO':  { age: 14, level: 'intermedio',  detail: 'Nivel intermedio. Puede manejar más abstracción y relaciones entre conceptos.' },
  '4º ESO':  { age: 15, level: 'intermedio',  detail: 'Nivel intermedio-alto. Prepara para Bachillerato. Exige más rigor y precisión.' },
  '1º Bach': { age: 16, level: 'avanzado',    detail: 'Nivel Bachillerato. Rigor académico alto. Puede usar terminología técnica y razonamiento formal.' },
  '2º Bach': { age: 17, level: 'avanzado',    detail: 'Nivel máximo pre-universitario. Orientado a selectividad (EBAU). Máximo rigor, síntesis y precisión.' },
};

export const LEARNING_MODES = {
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

export const MADRID_CURRICULUM = {
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
    'Física y Química': {
        rationale: 'Estudio de la materia, sus cambios y las leyes del movimiento y la energía.',
        grades: {
          '2º ESO': {
            focus: ['Magnitudes y unidades SI', 'Estados de agregación', 'Mezclas y disoluciones', 'Propiedades de la materia'],
            outcomes: ['Realiza cambios de unidades', 'Distingue mezcla de sustancia pura', 'Aplica el modelo cinético'],
            misconceptions: ['Confundir masa y peso', 'Pensar que el calor es una sustancia', 'No distinguir entre cambio físico y químico'],
          },
          '3º ESO': {
            focus: ['El átomo', 'Enlace químico', 'Reacciones químicas', 'Leyes de los gases', 'Movimiento y fuerzas'],
            outcomes: ['Calcula partículas subatómicas', 'Ajusta ecuaciones químicas', 'Resuelve problemas de velocidad y aceleración'],
            misconceptions: ['Confundir átomo con molécula', 'No entender la conservación de la masa'],
          },
          '4º ESO': {
            focus: ['Configuración electrónica', 'Estequiometría', 'Cinemática avanzada', 'Dinámica y Newton', 'Trabajo y Energía'],
            outcomes: ['Realiza cálculos estequiométricos con moles', 'Aplica leyes de Newton', 'Resuelve problemas de energía mecánica'],
            misconceptions: ['Confundir fuerza con energía', 'No aplicar correctamente los vectores en fuerzas'],
          }
        }
    }
  }
};

export const ENGLISH_MEDIUM_CURRICULUM = {
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

export const SUBJECT_LANGUAGE = {
  'Matemáticas': 'es', 'Biología': 'en', 'Física y Química': 'es',
  'Historia': 'en', 'Lengua': 'es', 'Inglés': 'en',
};

export const SUBJECT_META = {
  'Matemáticas': {
    language: 'es', badge: 'ES',
    welcomePrompt: '¿Por qué tema de Matemáticas empezamos hoy?',
    topicPrompt: '¿Qué tema quieres trabajar y qué te está costando?',
    modePrompts: {
      diagnostico: 'Vamos a empezar con un **diagnóstico** en Matemáticas. Te haré preguntas cortas para ver desde dónde partimos.',
      guiada: 'Pasamos a **enseñanza guiada** en Matemáticas. Iremos paso a paso, con una idea cada vez.',
      practica: 'Entramos en **práctica** de Matemáticas. Voy a proponerte ejercicios cortos con feedback inmediato.',
    }
  },
  'Biología': {
    language: 'en', badge: 'EN',
    welcomePrompt: 'Which Biology topic should we start with today?',
    topicPrompt: 'Which topic do you want to work on, and what feels difficult right now?',
    modePrompts: {
      diagnostico: 'Let’s start with a **diagnostic check** in Biology. I’ll ask a few short questions to see your starting point.',
      guiada: 'We are switching to **guided learning** in Biology. We will go step by step, one idea at a time.',
      practica: 'We are now in **practice mode** for Biology. I’ll give you short tasks and immediate feedback.',
    }
  },
  'Historia': {
    language: 'en', badge: 'EN',
    welcomePrompt: 'Which Social Sciences topic should we start with today?',
    topicPrompt: 'Which Geography or History topic do you want to work on, and what part feels hardest?',
    modePrompts: {
      diagnostico: 'Let’s start with a **diagnostic check** in Social Sciences. I’ll ask a few short questions to see what you already remember.',
      guiada: 'We are switching to **guided learning** in Social Sciences. We will connect ideas step by step.',
      practica: 'We are now in **practice mode** for Social Sciences. I’ll give you short questions with immediate feedback.',
    }
  },
  'Inglés': {
    language: 'en', badge: 'EN',
    welcomePrompt: 'Which English topic should we start with today?',
    topicPrompt: 'Which topic do you want to work on, and what part feels hardest?',
    modePrompts: {
      diagnostico: 'Let’s begin with a short **diagnostic check** in English. I’ll ask a few quick questions first.',
      guiada: 'We are switching to **guided learning** in English. We will build the answer step by step.',
      practica: 'We are now in **practice mode** for English. I’ll give you short exercises and instant feedback.',
    }
  },
  'Física y Química': {
    language: 'es', badge: 'ES',
    welcomePrompt: '¿Por qué tema de Física y Química empezamos hoy?',
    topicPrompt: '¿Qué tema quieres trabajar y qué parte te resulta más difícil?',
    modePrompts: {
      diagnostico: 'Vamos a empezar con un **diagnóstico** en Física y Química. Te haré unas preguntas cortas para ver desde dónde partimos.',
      guiada: 'Pasamos a **enseñanza guiada** en Física y Química. Iremos paso a paso, con el procedimiento bien justificado.',
      practica: 'Entramos en **práctica** de Física y Química. Te propondré ejercicios cortos con corrección inmediata.',
    }
  },
  'Lengua': {
    language: 'es', badge: 'ES',
    welcomePrompt: '¿Por qué tema de Lengua empezamos hoy?',
    topicPrompt: '¿Qué tema quieres trabajar y en qué parte necesitas más ayuda?',
    modePrompts: {
      diagnostico: 'Vamos a empezar con un **diagnóstico** en Lengua. Te haré preguntas cortas para ver tu punto de partida.',
      guiada: 'Pasamos a **enseñanza guiada** en Lengua. Iremos paso a paso, con ejemplos muy claros.',
      practica: 'Entramos en **práctica** de Lengua. Te propondré ejercicios cortos con feedback inmediato.',
    }
  }
};

export const SUBJECT_UNIT_MAP = {
  'Lengua': {
    '1º ESO': [
      { id: 'len1-u1', title: 'La comunicación, letras y sonidos', keywords: ['comunicación', 'significado', 'sonidos'] },
      { id: 'len1-u2', title: 'Las lenguas de España y morfemas', keywords: ['lenguas de españa', 'morfemas', 'palabras'] },
      { id: 'len1-u3', title: 'Los textos y el sustantivo', keywords: ['textos', 'sustantivo', 'determinantes'] },
      { id: 'len1-u12', title: 'La oración, sujeto y predicado', keywords: ['oración', 'sujeto', 'predicado'] },
    ],
  },
  'Biología': {
    '1º ESO': [
      { id: 'bg1-celula', title: 'La Biosfera y la célula', titleEn: 'The biosphere and the cell', keywords: ['celula', 'cell', 'biosfera'] },
      { id: 'bg1-animal', title: 'Reino Animal', titleEn: 'Animal kingdom', keywords: ['animal', 'vertebrados', 'invertebrados'] },
    ],
  },
  'Matemáticas': {
    '1º ESO': [
      { id: 'mat1-frac', title: 'Fracciones y Decimales', keywords: ['fracción', 'fracciones', 'decimal', 'partes'] }
    ]
  }
};

// --- LOGIC FUNCTIONS ---

export function resolveSubjectKey(subject) {
  const normalized = (subject || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (normalized.includes('matemat')) return 'Matemáticas';
  if (normalized.includes('biolog')) return 'Biología';
  if (normalized.includes('fisica') || normalized.includes('quimica')) return 'Física y Química';
  if (normalized.includes('historia') || normalized.includes('sociales') || normalized.includes('geograf')) return 'Historia';
  if (normalized.includes('lengua')) return 'Lengua';
  if (normalized.includes('ingles') || normalized.includes('english')) return 'Inglés';
  return 'Matemáticas';
}

export function getSubjectLanguage(subject) {
  return SUBJECT_LANGUAGE[resolveSubjectKey(subject)] || 'es';
}

export function getCurriculumGuide(grade, subject) {
  const key = resolveSubjectKey(subject);
  const lang = getSubjectLanguage(key);
  
  if (lang === 'en') {
    const subjectGuide = ENGLISH_MEDIUM_CURRICULUM.subjects[key] || {};
    const byGrade = subjectGuide.grades?.[grade] || { focus: [], outcomes: [], misconceptions: [] };
    return {
      rationale: subjectGuide.rationale || 'Support learning with visible evidence.',
      focus: byGrade.focus,
      outcomes: byGrade.outcomes,
      misconceptions: byGrade.misconceptions
    };
  }

  const subjectGuide = MADRID_CURRICULUM.subjects[key] || {};
  const byGrade = subjectGuide.grades?.[grade] || { focus: [], outcomes: [], misconceptions: [] };
  return {
    rationale: subjectGuide.rationale || 'Apoyo pedagógico basado en evidencias.',
    focus: byGrade.focus,
    outcomes: byGrade.outcomes,
    misconceptions: byGrade.misconceptions
  };
}

export function buildPedagogyBlock(modeKey, grade, subject) {
  const mode = LEARNING_MODES[modeKey] || LEARNING_MODES.guiada;
  const curr = getCurriculumGuide(grade, subject);
  const lang = getSubjectLanguage(subject);
  const isEn = lang === 'en';

  if (isEn) {
    const medium = ENGLISH_MEDIUM_CURRICULUM;
    return `BILINGUAL MODE (MADRID CURRICULUM):
- ESO Goals: ${medium.stageGoals.join('; ')}
- Method: ${medium.methodology.join('; ')}
- Subject Focus: ${curr.focus.join(', ')}
- Evidence to seek: ${curr.outcomes.join('; ')}
- Common misconceptions: ${curr.misconceptions.join('; ')}
- Pedagogical rationale: ${curr.rationale}

CURRENT LEARNING MODE: ${mode.label}
- Mode Goal: ${mode.goal}
- Session flow: ${mode.flow}`;
  }

  return `BASE CURRICULAR MADRID (ESPAÑOL):
- Metas etapa: ${MADRID_CURRICULUM.stageGoals.join('; ')}
- Metodología: ${MADRID_CURRICULUM.methodology.join('; ')}
- Prioriza en esta materia: ${curr.focus.join(', ')}
- Evidencias a buscar: ${curr.outcomes.join('; ')}
- Errores comunes a vigilar: ${curr.misconceptions.join('; ')}
- Sentido pedagógico: ${curr.rationale}

MODO DE APRENDIZAJE: ${mode.label}
- Objetivo del modo: ${mode.goal}
- Flujo de la sesión: ${mode.flow}`;
}

export function getSubjectMeta(subject) {
  return SUBJECT_META[resolveSubjectKey(subject)] || SUBJECT_META['Matemáticas'];
}

export function getSubjectUnits(subject, grade) {
  return SUBJECT_UNIT_MAP[resolveSubjectKey(subject)]?.[grade] || [];
}

export function getUnitDisplayTitle(subject, unit, lang) {
  if (!unit) return '';
  return (lang === 'en' && unit.titleEn) ? unit.titleEn : unit.title;
}

export function detectCurriculumUnit(subject, grade, text) {
  if (!text) return null;
  const norm = text.toLowerCase();
  const units = getSubjectUnits(subject, grade);
  return units.find(u => u.keywords.some(k => norm.includes(k.toLowerCase()))) || null;
}
