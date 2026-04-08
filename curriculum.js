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
    rationale: 'Learning must combine comprehension, production, interaction, and functional use in real-life situations.',
    grades: {
      '1º ESO': { focus: ['everyday vocabulary', 'present simple/continuous', 'guided production'], outcomes: ['understands simple messages', 'model structures'], misconceptions: ['translating word-for-word', 'ignoring pronunciation'] },
      '2º ESO': { focus: ['past simple', 'comparatives', 'structured writing'], outcomes: ['tense usage', 'improves fluency'], misconceptions: ['mixing tenses without reference', 'writing without models'] },
      '3º ESO': { focus: ['present perfect', 'future forms', 'basic conditionals'], outcomes: ['communicative intent', 'greater autonomy'], misconceptions: ['confusing present perfect with past simple', 'isolated grammar'] },
      '4º ESO': { focus: ['conditionals', 'reported speech', 'passive voice'], outcomes: ['complex structures', 'adjusts register'], misconceptions: ['structure vs function', 'neglecting context'] }
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
