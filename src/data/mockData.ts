import { 
  Hotline, 
  MythReality, 
  AgeGuide, 
  WarningSignTopic, 
  ServiceRoute, 
  BeliefCircleItem, 
  Badge, 
  DailyChallenge, 
  ReportedCase, 
  TrainingModule, 
  StaffTrainingModule,
  CountryPregnancyStat,
  PeerPressureScenario,
  SupportNetworkRole,
  HealthAccompanimentStep,
  AndeanFamilyContext,
  AndeanMaternalHealthIndicator,
  RegionalHealthInsight
} from '../types';

export const HOTLINES: Hotline[] = [
  {
    name: "Línea 100 – MIMP",
    number: "100",
    description: "Orientación, consejería y apoyo emocional urgente frente a situaciones de violencia familiar, acoso y violencia sexual. Totalmente gratuita y confidencial.",
    hours: "24 horas / 365 días",
    badge: "Emergencia y Violencia",
    icon: "ShieldAlert",
    isEmergency: true,
  },
  {
    name: "Línea 113 Salud – MINSA (Opción 3)",
    number: "113",
    description: "Orientación médica y obstétrica gratuita en salud sexual y reproductiva, métodos anticonceptivos, salud adolescente y planificación familiar.",
    hours: "24 horas / Gratuita nacional",
    badge: "Salud Sexual y Anticoncepción",
    icon: "HeartPulse",
    optionDetail: "Marca 113 y presiona la Opción 3",
  },
  {
    name: "SíseVe – MINEDU",
    number: "0800-76-888",
    description: "Plataforma oficial del Ministerio de Educación para reportar y dar seguimiento a casos de violencia escolar, bullying, acoso o tocamientos en colegios.",
    hours: "Lun a Vie 8:00am - 8:00pm",
    badge: "Entorno Escolar Seguro",
    icon: "School",
  },
  {
    name: "WhatsApp y Telegram – MINSA",
    number: "952 842 623 / 955 557 000",
    description: "Canal directo de mensajería para consultas discretas de salud física, salud mental y orientación sexual con profesionales del MINSA.",
    hours: "Atención continua por mensajería",
    badge: "Chat Discreto y Rápido",
    icon: "MessageSquare",
    whatsappNumber: "51952842623",
  },
];

export const MYTHS_REALITIES: MythReality[] = [
  {
    id: "mr-1",
    category: "anticoncepcion",
    myth: "Hablar de sexualidad y anticonceptivos con los hijos incita a que inicien su vida sexual antes.",
    reality: "Hablar abiertamente promueve el autocuidado, posterga el inicio sexual y reduce riesgos.",
    explanation: "La evidencia científica de la OMS y UNICEF demuestra que los adolescentes que reciben educación sexual integral (ESI) en casa y en la escuela inician su vida sexual más tarde y, cuando lo hacen, utilizan métodos de protección responsable.",
    tips: [
      "Genera espacios cotidianos de diálogo sin sermones.",
      "Valida sus dudas y respeta su intimidad sin juzgar.",
      "Infórmate junto a ellos si hay algo que desconoces."
    ]
  },
  {
    id: "mr-2",
    category: "anticoncepcion",
    myth: "En la primera relación sexual es imposible quedar embarazada.",
    reality: "El embarazo puede ocurrir desde la primera relación si hay penetración sin protección.",
    explanation: "Si la mujer ya ha comenzado a ovular (lo que ocurre desde la menarquía o incluso antes de la primera regla visible), cualquier relación coital desprotegida tiene alta probabilidad de embarazo.",
    tips: [
      "El preservativo es fundamental en todo momento.",
      "No confiar en mitos ni cuentas empíricas.",
      "Acudir a un Servicio de Salud Amigable para orientación."
    ]
  },
  {
    id: "mr-3",
    category: "anticoncepcion",
    myth: "La pastilla del día siguiente (AOE) es un método de uso regular y es abortiva.",
    reality: "La AOE no es abortiva y solo debe utilizarse ante fallas o emergencias puntuales.",
    explanation: "La Anticoncepción Oral de Emergencia actúa retrasando o impidiendo la ovulación; si el óvulo ya fue fecundado e implantado, no interrumpe el embarazo. No protege contra infecciones de transmisión sexual y pierde eficacia si se toma recurrentemente.",
    tips: [
      "Tomarla dentro de las primeras 24 a 72 horas.",
      "Disponible gratis en todos los centros de salud del MINSA.",
      "Elegir un método de uso continuo y de alta eficacia (como implante o condón)."
    ]
  },
  {
    id: "mr-4",
    category: "fertilidad",
    myth: "El método del 'ritmo' o 'retirar a tiempo' (coito interrumpido) es seguro para adolescentes.",
    reality: "Tiene una tasa de falla superior al 25% y no previene ninguna ITS.",
    explanation: "En la adolescencia los ciclos hormonales suelen ser muy irregulares. Además, el líquido preseminal puede contener espermatozoides activos, lo que hace al 'coito interrumpido' una de las principales causas de embarazos no planificados.",
    tips: [
      "Priorizar la doble protección (preservativo + método hormonal de larga duración).",
      "No basar la prevención en aplicaciones de calendario sin asesoría médica."
    ]
  },
  {
    id: "mr-5",
    category: "relaciones",
    myth: "Los celos y el control del celular son señales de que tu pareja 'te ama de verdad'.",
    reality: "El control, los celos posesivos y la presión son señales tempranas de violencia de género.",
    explanation: "El amor sano se basa en la confianza mutua, la autonomía y el respeto por los proyectos y espacios personales. Quien te quiere no te vigila, no te aísla de tus amistades ni te exige contraseñas.",
    tips: [
      "Aprende a decir NO sin sentir culpa.",
      "El consentimiento debe ser libre y entusiasta, nunca obligado.",
      "Si sientes temor ante su reacción, busca apoyo en la Línea 100."
    ]
  },
  {
    id: "mr-6",
    category: "salud",
    myth: "La prevención del embarazo es responsabilidad exclusiva de las mujeres.",
    reality: "La prevención, el consentimiento y la crianza son corresponsabilidad activa de los varones.",
    explanation: "Involucrar a los varones adolescentes en la anticoncepción (uso consistente del condón, rechazo al machismo, educación sobre consentimiento y paternidad activa) es clave para erradicar estereotipos y prevenir embarazos no deseados.",
    tips: [
      "Fomentar masculinidades positivas y corresponsables.",
      "Los varones también deben llevar preservativos y acudir a chequeos.",
      "La paternidad no es una ayuda, es un derecho y deber compartido."
    ]
  }
];

export const AGE_GUIDES: AgeGuide[] = [
  {
    id: "age-10-12",
    ageRange: "10 a 12 años (Pubertad Temprana)",
    title: "Descubrimiento de cambios corporales, límites y privacidad",
    summary: "Etapa de transición donde surgen dudas sobre el crecimiento físico, la regla, la polución nocturna y la importancia de proteger la propia intimidad.",
    physicalChanges: [
      "Aparición del vello púbico y axilar, estirón de estatura.",
      "Desarrollo del botón mamario y ensanchamiento de caderas.",
      "Primera menstruación (menarquía) y primeras eyaculaciones nocturnas.",
      "Cambios en la sudoración y piel (acné)."
    ],
    emotionalAspects: [
      "Mayor necesidad de privacidad e intimidad en el baño y habitación.",
      "Cambios de humor debidos a fluctuaciones hormonales.",
      "Curiosidad y comparación con pares en redes sociales o colegio."
    ],
    risksPrevention: [
      "Enseñar la regla de la ropa interior: 'Ningún adulto o par puede tocar tus partes íntimas ni pedirte fotos'.",
      "Identificación clara de adultos de confianza en la familia y colegio.",
      "Cuidado en internet: no compartir fotos íntimas ni aceptar desconocidos."
    ],
    conversationStarters: [
      "¿Has notado cambios en tu cuerpo que te den curiosidad o dudas?",
      "¿Sabes qué hacer si un amigo o alguien en internet te pide algo que te hace sentir incómodo/a?",
      "Quiero que sepas que de cualquier tema puedes hablar conmigo sin miedo."
    ],
    dosAndDonts: {
      do: [
        "Llamar a las partes del cuerpo por sus nombres anatómicos correctos (vulva, pene, testículos, vagina).",
        "Respetar cuando cierran la puerta para vestirse o asearse.",
        "Normalizar la menstruación como un proceso biológico natural, no como algo sucio."
      ],
      dont: [
        "Burlarse de los cambios de voz, vello o estatura.",
        "Tratar la pubertad con vergüenza o secretismo.",
        "Ignorar preguntas diciendo 'aún eres muy pequeño'."
      ]
    }
  },
  {
    id: "age-13-15",
    ageRange: "13 a 15 años (Adolescencia Media - Énfasis Protección)",
    title: "Proyecto de vida, consentimiento, presión social y derechos",
    summary: "Etapa crucial donde se consolidan la identidad, las primeras relaciones afectivas y la necesidad de herramientas para resistir presiones grupales.",
    physicalChanges: [
      "Maduración reproductiva plena y desarrollo de caracteres sexuales secundarios.",
      "Aumento del deseo y sensaciones sexuales.",
      "Aparición de ciclos menstruales más definidos."
    ],
    emotionalAspects: [
      "Importancia máxima del grupo de amigos y sentido de pertenencia.",
      "Búsqueda de autonomía y cuestionamiento de reglas familiares.",
      "Vulnerabilidad ante la presión de pareja o grupo para 'demostrar amor'."
    ],
    risksPrevention: [
      "Protección legal: Todo acto sexual con menores de 14 años es un delito tipificado como violación sexual.",
      "Prevención de matrimonio infantil y uniones tempranas forzadas.",
      "Comprensión del consentimiento: 'Solo sí es sí'. La insistencia no es consentimiento.",
      "Conocimiento de los Servicios de Salud Amigables gratuitos del MINSA."
    ],
    conversationStarters: [
      "¿Qué sueños o metas tienes para tus próximos años y cómo quieres lograrlos?",
      "Si alguien te presiona para hacer algo íntimo que no deseas, ¿cómo te gustaría responderle?",
      "¿Sabías que tienes derecho a acudir a una posta médica a pedir información de salud de manera confidencial?"
    ],
    dosAndDonts: {
      do: [
        "Hablar de relaciones saludables basadas en el buen trato mutuo.",
        "Explicar claramente qué es el consentimiento y cómo rechazar presiones.",
        "Motivar la construcción de un proyecto de vida sólido y apasionante."
      ],
      dont: [
        "Amenazar con castigos si se enamoran.",
        "Decir que 'las chicas deben cuidarse solas' o 'los varones tienen necesidades que no aguantan'.",
        "Desestimar sus preocupaciones emocionales."
      ]
    }
  },
  {
    id: "age-16-18",
    ageRange: "16 a 18 años (Adolescencia Tardía y Transición)",
    title: "Toma de decisiones autónomas, doble protección y corresponsabilidad",
    summary: "Preparación para la vida adulta, ejercicio responsable de los derechos sexuales y reproductivos, y prevención de segundos embarazos.",
    physicalChanges: [
      "Estabilización física y hormonal.",
      "Capacidad física y legal para tomar decisiones de salud personal."
    ],
    emotionalAspects: [
      "Planes vocacionales, estudios superiores y futuro laboral.",
      "Relaciones afectivas más profundas e inicio de proyectos compartidos.",
      "Manejo de la independencia y responsabilidad sobre sus actos."
    ],
    risksPrevention: [
      "Uso consistente de doble protección (preservativo + método anticonceptivo moderno).",
      "Prevención y detección temprana de ITS (VIH, VPH, Sífilis, Hepatitis B).",
      "Prevención de segundo y tercer embarazo en adolescentes que ya son madres/padres.",
      "Corresponsabilidad en la crianza y continuidad educativa obligatoria."
    ],
    conversationStarters: [
      "¿Cómo coordinas con tu pareja el cuidado mutuo de su salud y sus metas?",
      "¿Conoces los métodos anticonceptivos de larga duración como el implante subdérmico?",
      "¿Tienes dudas sobre cómo acceder a chequeos de salud preventivos?"
    ],
    dosAndDonts: {
      do: [
        "Tratarles como personas capaces de tomar decisiones informadas.",
        "Ofrecer apoyo incondicional ante cualquier dificultad o error.",
        "Asegurar que conozcan el uso correcto del preservativo femenino y masculino."
      ],
      dont: [
        "Asumir que 'ya lo saben todo por internet'.",
        "Juzgar su orientación sexual o identidad de género.",
        "Alejar el diálogo por miedo al conflicto."
      ]
    }
  }
];

export const WARNING_TOPICS: WarningSignTopic[] = [
  {
    id: "violencia-sexual",
    title: "Detección de Violencia Sexual y Abuso",
    subtitle: "Identificación de señales tempranas en el entorno familiar, escolar o digital",
    severity: "critica",
    signs: [
      "Cambios repentinos y drásticos de comportamiento: aislamiento, tristeza profunda, pesadillas o agresividad.",
      "Miedo injustificado o rechazo a estar a solas con determinado familiar, vecino, profesor o conocido.",
      "Dolores genitales o anales recurrentes, infecciones urinarias inexplicadas o ropa interior dañada.",
      "Regalos secretos, recargas de saldo o dinero entregados por adultos a cambio de 'favores' o secretos.",
      "Baja brusca en el rendimiento escolar y abandono de actividades que antes disfrutaba."
    ],
    legalFramework: "En el Perú (Código Penal Art. 173), todo acto de naturaleza sexual con una persona menor de 14 años es un delito tipificado como VIOLACIÓN SEXUAL, sin importar si hubo supuesto 'consentimiento' o promesa de convivencia.",
    protocolAction: [
      "1. Creer siempre en el testimonio del niño, niña o adolescente sin revictimizarlo.",
      "2. Activar la atención médica urgente (Kit de Emergencia para Violencia Sexual en las primeras 72 horas en cualquier posta u hospital).",
      "3. Denunciar inmediatamente ante la Policía Nacional, CEM (Centro Emergencia Mujer), Ministerio Público o llamando a la Línea 100.",
      "4. Brindar acompañamiento psicológico continuo y no permitir el contacto con el agresor."
    ],
    resources: ["Línea 100", "CEM 24 Horas", "Fiscalía de Familia", "Línea 113 Opción 3"]
  },
  {
    id: "menor-15",
    title: "Embarazo en Menores de 15 Años",
    subtitle: "Emergencia médica y legal de máxima prioridad para la protección de la vida",
    severity: "critica",
    signs: [
      "Retraso menstrual o cambios corporales en niñas y adolescentes de 10 a 14 años.",
      "Ocultamiento del abdomen mediante prendas holgadas o negativa a chequeos médicos.",
      "Convivencia forzada con hombres mayores bajo el pretexto de 'hacerse cargo'.",
      "Síntomas de alto riesgo obstétrico: anemia severa, preeclampsia, hemorragias o desnutrición."
    ],
    legalFramework: "El embarazo en menores de 15 años es evidencia directa de violación sexual en la gran mayoría de casos. La legislación y la Norma Técnica de Salud N° 208-MINSA exigen la intervención inmediata del sistema de justicia y la evaluación del Abordaje Integral para proteger la vida de la menor.",
    protocolAction: [
      "1. Derivación médica especializada para salvaguardar la salud física y mental de la niña.",
      "2. Información clara y legal sobre opciones médicas integrales (incluyendo la evaluación de la interrupción terapéutica del embarazo cuando corra riesgo la vida o salud de la gestante según marco legal vigente).",
      "3. Notificación obligatoria de oficio por parte del personal de salud a la Fiscalía Penal.",
      "4. Medidas de protección cautelar para evitar que sea obligada a convivir con el agresor."
    ],
    resources: ["Línea 100", "Hospitales Nivel II y III", "Defensoría del Pueblo", "DEMUNA"]
  },
  {
    id: "matrimonio-infantil",
    title: "Matrimonio Infantil y Uniones Tempranas Forzadas",
    subtitle: "Erradicación de prácticas que truncan el proyecto de vida y perpetúan la pobreza",
    severity: "alta",
    signs: [
      "Presión de la familia para casar o unir a una adolescente con un hombre mayor.",
      "Justificación de uniones bajo la creencia de 'reparar el honor familiar' tras un embarazo.",
      "Abandono escolar forzado para asumir roles de servidumbre doméstica y crianza.",
      "Aislamiento social y privación de libertad o comunicación con sus pares."
    ],
    legalFramework: "Ley N° 31945 (Perú): Prohíbe de manera absoluta el matrimonio de menores de 18 años en el país, declarando nulo cualquier vínculo civil previo que involucre menores.",
    protocolAction: [
      "1. Intervención de la DEMUNA y Ministerio de la Mujer y Poblaciones Vulnerables (MIMP).",
      "2. Garantía de permanencia y reinserción en el sistema escolar obligatoria.",
      "3. Sanción legal a quienes promuevan o coaccionen uniones ilegales de menores."
    ],
    resources: ["MIMP", "DEMUNA", "SíseVe MINEDU"]
  },
  {
    id: "segundo-embarazo",
    title: "Prevención de Segundo y Tercer Embarazo Adolescente",
    subtitle: "Ruptura del ciclo de vulnerabilidad mediante anticoncepción LARC y apoyo escolar",
    severity: "alta",
    signs: [
      "Falta de acceso a métodos anticonceptivos inmediatamente después del parto o cesárea.",
      "Estigma y discriminación que provocan deserción escolar de la madre adolescente.",
      "Ausencia de pensión alimenticia y falta de corresponsabilidad del progenitor.",
      "Falta de redes de cuidado infantil para que la madre pueda estudiar o trabajar."
    ],
    legalFramework: "Ley General de Educación y Normas de Inclusión Educativa prohíben la expulsión o discriminación de estudiantes gestantes o madres lactantes. El MINSA garantiza el acceso a Anticonceptivos Reversibles de Larga Duración (LARC) postparto.",
    protocolAction: [
      "1. Oferta informada y colocación voluntaria de implante subdérmico o DIU post-evento obstétrico (AIPEO).",
      "2. Activación de becas y horarios flexibles escolares para evitar la deserción.",
      "3. Asesoría legal gratuita en DEMUNA para la filiación y pensión de alimentos."
    ],
    resources: ["Postas de Salud MINSA (LARC)", "DEMUNA", "Programa Nacional de Becas (PRONABEC)"]
  }
];

export const SERVICE_ROUTES: ServiceRoute[] = [
  {
    id: "sr-1",
    name: "Servicios de Salud Amigables para Adolescentes (MINSA / EsSalud)",
    type: "salud",
    targetAudience: "Adolescentes de 12 a 17 años y jóvenes",
    whatTheyProvide: [
      "Atención confidencial, cálida y sin prejuicios por obstetras y psicólogos capacitados.",
      "Entrega gratuita de métodos anticonceptivos (preservativos, implantes, inyectables, pastillas, DIU).",
      "Anticoncepción Oral de Emergencia (AOE) sin costo ni estigma.",
      "Pruebas rápidas gratuitas de VIH, Sífilis y descarte de embarazo.",
      "Consejería en salud mental, autoestima y proyecto de vida."
    ],
    confidentialityRules: "La atención es estrictamente confidencial. La Norma Técnica de Salud respalda el derecho del adolescente a recibir consejería y métodos anticonceptivos de forma personalizada.",
    howToAccess: "Acude a cualquier centro de salud público o posta médica y solicita el 'Servicio de Atención Diferenciada para Adolescentes'. O llama al 113 Opción 3.",
    requirements: ["No requieres seguro privado.", "Atención 100% gratuita."]
  },
  {
    id: "sr-2",
    name: "Centros Emergencia Mujer (CEM) - MIMP",
    type: "proteccion",
    targetAudience: "Niñas, niños, adolescentes y mujeres víctimas de violencia familiar o sexual",
    whatTheyProvide: [
      "Asesoría legal gratuita y patrocinio judicial para denuncias penales.",
      "Acompañamiento psicológico y contención emocional especializada.",
      "Trabajo social para gestionar medidas de protección inmediata.",
      "Articulación con comisarías y juzgados de familia."
    ],
    confidentialityRules: "Resguardo absoluto de la identidad y protección de la víctima.",
    howToAccess: "Disponibles en comisarías y locales propios a nivel nacional las 24 horas del día. También mediante la Línea 100.",
    requirements: ["Atención gratuita e inmediata."]
  },
  {
    id: "sr-3",
    name: "DEMUNA (Defensoría Municipal del Niño, Niña y Adolescente)",
    type: "legal",
    targetAudience: "Familias, niños, niñas y adolescentes en su distrito",
    whatTheyProvide: [
      "Defensa y restitución de derechos vulnerados (matrícula escolar, salud, identidad).",
      "Conciliaciones extrajudiciales gratuitas para pensión de alimentos y tenencia.",
      "Orientación a padres y madres en pautas de crianza positiva.",
      "Prevención de riesgo y trabajo infantil."
    ],
    confidentialityRules: "Atención guiada por el principio del Interés Superior del Niño.",
    howToAccess: "Ubicada en la Municipalidad de tu distrito o provincia.",
    requirements: ["Servicio municipal público y gratuito."]
  }
];

export const BELIEF_CIRCLE_ITEMS: BeliefCircleItem[] = [
  {
    id: "bc-1",
    statement: "El uso del condón reduce la sensibilidad y por eso es mejor no usarlo si 'confías' en la persona.",
    isCorrectTrue: false,
    explanation: "Falso. La confianza afectiva no inmuniza contra ITS ni evita un embarazo. Los preservativos modernos ultrafinos brindan máxima sensibilidad y garantizan la protección de ambas personas.",
    category: "Anticoncepción"
  },
  {
    id: "bc-2",
    statement: "Un adolescente que tiene metas claras y un proyecto de vida suele postergar el inicio de su vida sexual.",
    isCorrectTrue: true,
    explanation: "Verdadero. Estudios de la OMS y UNICEF comprueban que la motivación hacia metas educativas y personales fortalece la autoestima y la toma de decisiones asertivas.",
    category: "Proyecto de Vida"
  },
  {
    id: "bc-3",
    statement: "Si una persona dice 'sí' al inicio pero luego se siente incómoda y dice 'no', la otra persona debe detenerse inmediatamente.",
    isCorrectTrue: true,
    explanation: "Verdadero. El consentimiento es continuo y reversible en cualquier momento. Si alguien dice 'para' o 'no quiero', continuar es una agresión sexual.",
    category: "Consentimiento"
  },
  {
    id: "bc-4",
    statement: "La pastilla del día después puede tomarse cada fin de semana como método habitual.",
    isCorrectTrue: false,
    explanation: "Falso. La AOE tiene una alta carga hormonal diseñada exclusivamente para emergencias (rotura del condón, agresión o falla). Su uso repetido causa alteraciones menstruales y menor eficacia.",
    category: "Salud"
  },
  {
    id: "bc-5",
    statement: "Todo acto sexual con una persona menor de 14 años es considerado violación sexual por la ley.",
    isCorrectTrue: true,
    explanation: "Verdadero. El Código Penal protege a los menores de 14 años al reconocer que no existe consentimiento válido debido a la asimetría de madurez y poder.",
    category: "Leyes y Derechos"
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: "b-mito-buster",
    name: "Mito Buster",
    description: "Desmantelaste 5 mitos sobre la anticoncepción y sexualidad responsable.",
    icon: "Sparkles",
    unlocked: false,
    category: "conocimiento",
    requiredXp: 50
  },
  {
    id: "b-guardian-derechos",
    name: "Guardián de Derechos",
    description: "Conociste las rutas de denuncia, protección a menores de 15 años y el Kit de Emergencia.",
    icon: "ShieldCheck",
    unlocked: false,
    category: "solidaridad",
    requiredXp: 100
  },
  {
    id: "b-lider-dialogo",
    name: "Líder de Diálogo Familiar",
    description: "Completaste las guías de comunicación asertiva entre padres e hijos.",
    icon: "Users",
    unlocked: false,
    category: "participacion",
    requiredXp: 200
  },
  {
    id: "b-maestro-consentimiento",
    name: "Maestro del Consentimiento",
    description: "Superaste el Círculo de Creencias con puntuación perfecta.",
    icon: "Award",
    unlocked: false,
    category: "conocimiento",
    requiredXp: 300
  },
  {
    id: "b-explorador-salud",
    name: "Explorador de Servicios Amigables",
    description: "Identificaste las líneas 113, 100 y los centros de salud amigables.",
    icon: "HeartHandshake",
    unlocked: false,
    category: "salud",
    requiredXp: 400
  },
  {
    id: "b-embajador-seguro",
    name: "Embajador de Camino Seguro",
    description: "Alcanzaste el nivel máximo de aprendizaje interactivo y corresponsabilidad.",
    icon: "Crown",
    unlocked: false,
    category: "solidaridad",
    requiredXp: 500
  }
];

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: "dc-1",
    title: "Charla Abierta en Familia",
    description: "Inicia una conversación de 5 minutos sobre proyectos a futuro o dudas cotidianas con un familiar o hijo.",
    xpReward: 30,
    completed: false,
    category: "dialogo",
    actionPrompt: "Conversar sobre metas personales"
  },
  {
    id: "dc-2",
    title: "Cuestionario de Mitos Express",
    description: "Revisa al menos 3 tarjetas de mitos y realidades para despejar dudas comunes.",
    xpReward: 25,
    completed: true,
    category: "informacion",
    actionPrompt: "Explorar tarjetas interactivas"
  },
  {
    id: "dc-3",
    title: "Memorizar Números Clave",
    description: "Recuerda que la Línea 100 es para violencia y la Línea 113 (opción 3) es para salud sexual gratuita.",
    xpReward: 20,
    completed: false,
    category: "salud",
    actionPrompt: "Guardar contactos de emergencia"
  },
  {
    id: "dc-4",
    title: "Reflexión sobre Consentimiento",
    description: "Recuerda que la base de toda relación sana es el respeto mutuo y la libertad de decir 'no'.",
    xpReward: 35,
    completed: false,
    category: "reflexion",
    actionPrompt: "Revisar los 5 principios del consentimiento"
  }
];

export const INITIAL_REPORTED_CASES: ReportedCase[] = [
  {
    id: "case-01",
    ticketCode: "CASO-84920",
    date: "14/08/2026",
    type: "violencia_sexual",
    ageRange: "14 años",
    department: "Lima Metropolitana",
    status: "derivado_cem",
    priority: "critica",
    descriptionSummary: "Reporte confidencial de presunta coerción y violencia sexual en entorno escolar. Activación de protocolo de urgencia.",
    timeline: [
      { timestamp: "14/08 09:30", stage: "Recepción", note: "Reporte recibido mediante formulario confidencial." },
      { timestamp: "14/08 10:15", stage: "Evaluación", note: "Clasificado con prioridad crítica (menor de 15 años)." },
      { timestamp: "14/08 11:00", stage: "Derivación", note: "Derivado al Centro Emergencia Mujer (CEM) y enlace con Línea 100." },
      { timestamp: "14/08 14:20", stage: "Atención Médica", note: "Garantizada la aplicación del Kit de Emergencia para Violencia Sexual." }
    ]
  },
  {
    id: "case-02",
    ticketCode: "CASO-71204",
    date: "12/08/2026",
    type: "menor_15",
    ageRange: "13 años",
    department: "Cusco",
    status: "acompanamiento",
    priority: "critica",
    descriptionSummary: "Detección de embarazo en adolescente de 13 años y riesgo de unión temprana forzada. Intervención multidisciplinaria.",
    timeline: [
      { timestamp: "12/08 14:00", stage: "Recepción", note: "Alerta ingresada por educadora comunitaria." },
      { timestamp: "12/08 16:30", stage: "Derivación Legal", note: "Notificación a Fiscalía de Familia y DEMUNA distrital." },
      { timestamp: "13/08 10:00", stage: "Acompañamiento", note: "Evaluación integral de salud y protección de derechos." }
    ]
  },
  {
    id: "case-03",
    ticketCode: "CASO-55910",
    date: "10/08/2026",
    type: "orientacion_urgente",
    ageRange: "16 años",
    department: "La Libertad",
    status: "resuelto",
    priority: "media",
    descriptionSummary: "Orientación sobre acceso a implante subdérmico gratuito tras sospecha de falta de atención en posta local.",
    timeline: [
      { timestamp: "10/08 11:20", stage: "Consulta", note: "Adolescente solicitó información sobre Servicios Amigables." },
      { timestamp: "10/08 12:00", stage: "Canalización", note: "Contacto con obstetra del Servicio Amigable de Trujillo." },
      { timestamp: "11/08 16:00", stage: "Resuelto", note: "Atención médica brindada satisfactoriamente con colocación de método LARC." }
    ]
  }
];

export const TRAINING_MODULES: TrainingModule[] = [
  {
    id: "tm-1",
    title: "Atención Diferenciada y Sin Prejuicios en Salud Adolescente",
    targetRole: "Salud",
    duration: "4 horas (Certificado)",
    modulesCount: 4,
    description: "Capacitación práctica para obstetras, médicos y enfermeras en la aplicación de la Norma Técnica NTS N° 208-MINSA: confidencialidad, eliminación de barreras burocráticas y trato empático.",
    keyProtocols: [
      "Atención sin exigencia de acompañamiento cuando vulnere el derecho a la salud.",
      "Prescripción y entrega oportuna de AOE y métodos de larga duración (LARC).",
      "Identificación precoz de abuso sexual y llenado de fichas epidemiológicas."
    ],
    legalNorms: ["NTS N° 208-MINSA/DGIESP-2023", "Ley General de Salud N° 26842"],
    completed: true
  },
  {
    id: "tm-2",
    title: "Protocolo del Kit de Emergencia para Víctimas de Violencia Sexual",
    targetRole: "Salud",
    duration: "3 horas (Especializado)",
    modulesCount: 3,
    description: "Manejo clínico durante las primeras 72 horas: profilaxis post-exposición para VIH (PEP), tratamiento contra ITS bacterianas, AOE y contención en crisis.",
    keyProtocols: [
      "Ventana crítica de 72 horas para máxima eficacia profiláctica.",
      "Consentimiento informado adaptado a la edad del menor.",
      "Cadena de custodia de evidencias forenses y coordinación con el Ministerio Público."
    ],
    legalNorms: ["Resolución Ministerial N° 227-2019/MINSA"],
    completed: false
  },
  {
    id: "tm-3",
    title: "Detección de Señales de Alerta y Ruta SíseVe en Colegios",
    targetRole: "Docentes",
    duration: "3 horas (Taller Práctico)",
    modulesCount: 4,
    description: "Guía para directores, tutores y psicólogos escolares: detección de grooming, violencia de género, prevención del abandono escolar en alumnas embarazadas y reporte seguro.",
    keyProtocols: [
      "Registro inmediato en plataforma SíseVe sin revictimizar al escolar.",
      "Adaptación curricular y facilidades para alumnas gestantes o lactantes.",
      "Espacios de tutoría con enfoque de proyecto de vida y educación sexual integral."
    ],
    legalNorms: ["D.S. N° 004-2018-MINEDU", "Ley N° 29719"],
    completed: false
  }
];

export const STAFF_TRAINING_MODULES: StaffTrainingModule[] = [
  {
    id: "tm-salud-1",
    title: "Atención Diferenciada y Libre de Estigma en Salud Adolescente",
    targetRoles: ["Obstetras", "Médicos Generales", "Enfermería"],
    guidelines: [
      {
        title: "Confidencialidad Médica y Autonomía",
        detail: "La Norma Técnica NTS N° 208-MINSA respalda que adolescentes pueden recibir orientación en salud sexual y métodos anticonceptivos sin exigencia obligatoria de acompañamiento parental si ello vulnera su acceso a la salud."
      },
      {
        title: "Consejería en Doble Protección",
        detail: "Promover el uso simultáneo del preservativo (prevención de ITS) con un método altamente efectivo de larga duración (LARC: implante subdérmico o DIU) adecuado a su estilo de vida."
      },
      {
        title: "Detección Inmediata de Violencia y Abuso",
        detail: "En menores de 15 años, cualquier presunción de embarazo o actividad sexual debe ser investigada prioritariamente como posible violencia sexual y notificada al CEM / Fiscalía."
      },
      {
        title: "Dispensación de Anticoncepción de Emergencia (AOE)",
        detail: "La entrega de la AOE debe ser inmediata, gratuita y sin barreras morales ni requisitos de denuncia previa para su administración."
      }
    ],
    quiz: [
      {
        question: "¿Puede un/a adolescente de 16 años solicitar consejería y un método anticonceptivo en un Servicio Amigable del MINSA sin estar acompañado de sus padres?",
        options: [
          "No, está prohibido por ley atender a menores de 18 años solos.",
          "Sí, la norma técnica de salud garantiza su atención confidencial y autónoma.",
          "Solo si presenta una carta notarial de sus tutores."
        ],
        correctAnswer: 1,
        explanation: "La Norma Técnica de Salud NTS N° 208-MINSA garantiza la atención integral, confidencial y sin barreras para adolescentes."
      },
      {
        question: "¿Cuál es la ventana de tiempo óptima para administrar el Kit de Emergencia ante violencia sexual?",
        options: [
          "Hasta 7 días después del evento.",
          "Dentro de las primeras 72 horas para máxima eficacia de la profilaxis VIH e ITS.",
          "Solo después de que el juez emita la orden correspondiente."
        ],
        correctAnswer: 1,
        explanation: "Las primeras 72 horas son críticas para iniciar la profilaxis antirretroviral (PEP) contra el VIH y prevenir ITS y embarazos forzados."
      }
    ]
  },
  {
    id: "tm-docentes-2",
    title: "Detección de Violencia, Prevención del Abandono y Ruta SíseVe",
    targetRoles: ["Docentes", "Tutores", "Psicólogos Escolares", "Directivos"],
    guidelines: [
      {
        title: "Identificación de Cambios Conductuales",
        detail: "Estar alerta ante aislamiento repentino, bajas injustificadas en notas, absentismo o comentarios de temor hacia determinados adultos."
      },
      {
        title: "Reporte Seguro en Plataforma SíseVe",
        detail: "Reportar de forma confidencial situaciones de violencia escolar o agresión sexual sin revictimizar ni exponer a la víctima ante la comunidad escolar."
      },
      {
        title: "Garantía de Continuidad Educativa",
        detail: "La Ley prohíbe la expulsión o discriminación de estudiantes embarazadas o con hijos. El colegio debe brindar adaptaciones curriculares y horarios flexibles."
      },
      {
        title: "Promoción de Proyectos de Vida",
        detail: "Fortalecer en las horas de tutoría el autoconocimiento, la asertividad para decir 'NO' ante presiones y la visión de metas universitarias o técnicas."
      }
    ],
    quiz: [
      {
        question: "¿Qué debe hacer la institución educativa si una alumna de 15 años queda embarazada?",
        options: [
          "Pedir a sus padres que la trasladen a un centro nocturno o no escolarizado.",
          "Garantizar su permanencia, matrícula y adaptaciones pedagógicas necesarias sin discriminación.",
          "Suspenderla temporalmente hasta después del parto."
        ],
        correctAnswer: 1,
        explanation: "La Ley N° 29600 y normativas del MINEDU prohíben toda forma de exclusión y obligan a la escuela a garantizar la continuidad de sus estudios."
      }
    ]
  }
];

export const COUNTRY_PREGNANCY_STATS: CountryPregnancyStat[] = [
  {
    id: "region-andina",
    country: "Región Andina (Promedio Regional)",
    flag: "🏔️",
    rateDescription: "1 de cada 5 adolescentes en nuestra región queda embarazada antes de terminar el colegio (~20%).",
    percentageBeforeSchool: 20,
    ruralVsUrban: "En zonas rurales andinas y amazónicas, la tasa se duplica respecto a las capitales urbanas.",
    keyChallenge: "Presión social de pares, estigma para hablar de sexualidad en la sobremesa y acceso distante a postas amigables.",
    protectiveFactor: "Redes familiares de confianza, educación sexual integral (ESI) en la escuela y proyecto de vida fortalecido.",
    source: "Datos: PLANEA / UNICEF / OPS / INEI"
  },
  {
    id: "peru",
    country: "Perú",
    flag: "🇵🇪",
    rateDescription: "Aproximadamente 12.6% a nivel nacional; en regiones de selva y sierra rural llega hasta 22.7%.",
    percentageBeforeSchool: 19,
    ruralVsUrban: "22.7% en áreas rurales vs 9.8% en Lima Metropolitana.",
    keyChallenge: "Normalización de uniones tempranas y barreras de prejuicio en centros de salud.",
    protectiveFactor: "Línea 100 gratuita 24h, Servicios Amigables del MINSA y plataforma SíseVe en colegios.",
    source: "Datos: INEI - ENDES / PLANEA / MINSA"
  },
  {
    id: "bolivia",
    country: "Bolivia",
    flag: "🇧🇴",
    rateDescription: "Cerca de 18 de cada 100 jóvenes entre 15 y 19 años ya son madres o están en gestación.",
    percentageBeforeSchool: 21,
    ruralVsUrban: "Mayor prevalencia en comunidades rurales del Altiplano y Tierras Bajas.",
    keyChallenge: "Falta de información accesible en lenguas originarias y tabúes sobre la anticoncepción.",
    protectiveFactor: "Comités comunitarios de salud, redes de promotores juveniles y defensorías de la niñez (Línea 102).",
    source: "Datos: EDSA / UNICEF Bolivia / OPS"
  },
  {
    id: "ecuador",
    country: "Ecuador",
    flag: "🇪🇨",
    rateDescription: "Aproximadamente 17 de cada 100 adolescentes han tenido al menos un embarazo.",
    percentageBeforeSchool: 18,
    ruralVsUrban: "Zonas rurales de la Sierra y Amazonía presentan índices superiores al 24%.",
    keyChallenge: "Deserción escolar temprana y roles de género tradicionales que asignan el cuidado exclusivamente a la mujer.",
    protectiveFactor: "Estrategia 'Educando en Familia' y centros de salud pública con dispensación confidencial (Línea 171).",
    source: "Datos: ENSANUT / MSP Ecuador / UNICEF"
  },
  {
    id: "colombia",
    country: "Colombia",
    flag: "🇨🇴",
    rateDescription: "Alrededor del 16.5% de adolescentes entre 15 y 19 años han sido madres o están embarazadas.",
    percentageBeforeSchool: 17,
    ruralVsUrban: "En zonas rurales dispersas de la cordillera la cifra supera el 23%.",
    keyChallenge: "Presión de grupo en entornos escolares y dificultad para adquirir métodos duales sin permiso parental.",
    protectiveFactor: "Servicios de Salud Amigables para Adolescentes (SSAA) y canales de protección del ICBF (Línea 141 / Línea 155).",
    source: "Datos: Profamilia / DANE / Ministerio de Salud Colombia"
  }
];

export const PEER_PRESSURE_SCENARIOS: PeerPressureScenario[] = [
  {
    id: "escenario-1",
    title: "Presión para 'demostrar amor' o iniciar relaciones sin desearlo",
    context: "Tu pareja o grupo de amigos te dicen que 'todos ya lo hicieron' y que si realmente quieres a alguien debes dar el paso ahora mismo.",
    pressureQuote: "“Si de verdad me quisieras ya habríamos estado juntos. Todas mis amistades ya lo hicieron, ¿a qué le tienes miedo?”",
    peerPressureType: "Manipulación emocional y chantaje afectivo de pareja",
    assertiveResponse: "“El cariño y el respeto no se demuestran cediendo a presiones. Decido sobre mi cuerpo cuando yo me sienta 100% lista/o, y si me respetas vas a esperar.”",
    selfEsteemReflection: "Tu valor no depende de complacer las expectativas de nadie. Decir 'NO' es un acto de valentía y amor propio que merece respeto incondicional.",
    supportNetworkAction: "Cuéntale a tu mejor amiga/o de confianza o a tu madre/padre: 'Siento que me están apurando y necesito que me escuches'."
  },
  {
    id: "escenario-2",
    title: "Presión para no usar protección ('Conmigo no pasa nada')",
    context: "En el momento íntimo, la otra persona insiste en no usar condón diciendo que 'se siente incómodo' o que 'confía en el ritmo'.",
    pressureQuote: "“No pasa nada por una sola vez, confía en mí. Con condón no se siente igual.”",
    peerPressureType: "Negociación insegura y vulneración del consentimiento protegido",
    assertiveResponse: "“La confianza se demuestra cuidándonos mutuamente. Sin protección no hay relación íntima, mi salud y mi tranquilidad son primero.”",
    selfEsteemReflection: "Cuidarte es cuidar tu proyecto de vida. La doble protección (preservativo + método) previene ITS y embarazos no planificados.",
    supportNetworkAction: "Acude a la posta o farmacia comunitaria con una persona de confianza para tener siempre métodos de barrera a mano."
  },
  {
    id: "escenario-3",
    title: "Burlas o exclusión del grupo por no beber o no seguir a la multitud",
    context: "En una fiesta o reunión comunitaria te presionan para tomar alcohol en exceso o quedarte a solas en lugares inseguros.",
    pressureQuote: "“¡No seas aburrida/o! Tómate este vaso o no te invitamos a la próxima salida.”",
    peerPressureType: "Coerción grupal y miedo al rechazo social",
    assertiveResponse: "“Tengo claras mis metas y me divierto a mi manera sin ponerme en riesgo. Quien sea mi amigo/a respetará mis límites.”",
    selfEsteemReflection: "Pertenecer a un grupo nunca debe costar tu tranquilidad ni tu seguridad personal. Los verdaderos amigos apoyan tus decisiones.",
    supportNetworkAction: "Ten siempre una 'palabra clave' pactada con tus padres o hermanos para pedir que vayan a recogerte si el ambiente se vuelve incómodo."
  },
  {
    id: "escenario-4",
    title: "Presión digital: Coerción para enviar fotos íntimas (Sexting forzado)",
    context: "Te piden fotos sin ropa por WhatsApp o redes sociales bajo la amenaza de terminar la relación o decir que 'no confías'.",
    pressureQuote: "“Pásame una foto tuya para saber que piensas en mí, nadie más la va a ver, te lo juro.”",
    peerPressureType: "Violencia digital y riesgo de extorsión / difusión no consentida",
    assertiveResponse: "“Mi intimidad y mis fotos son mías. El amor no se prueba con imágenes que puedan vulnerar mi privacidad.”",
    selfEsteemReflection: "Una vez que una imagen sale de tu teléfono, pierdes el control sobre ella. Quien te valora no te exige fotos que te incomoden.",
    supportNetworkAction: "Si recibes amenazas o difusión indebida, avisa de inmediato a un adulto protector y guarda capturas para denunciar en la Línea 100 o SíseVe."
  }
];

export const SUPPORT_NETWORK_ROLES: SupportNetworkRole[] = [
  {
    id: "sn-familia",
    roleTitle: "Madre, Padre o Cuidador Protector",
    avatarIcon: "🏡",
    howTheyHelp: "Escucha sin juzgar ni castigar, brinda afecto incondicional y orienta en decisiones de vida.",
    andeanContext: "En el hogar andino, la sobremesa y el trabajo familiar son momentos ideales para dialogar con ternura (Munakuy).",
    safeBoundaryAdvice: "Hablar con claridad genera confianza; el miedo al castigo solo provoca que el/la joven busque consejos errados fuera de casa."
  },
  {
    id: "sn-docente",
    roleTitle: "Docente / Tutor Escolar de Confianza",
    avatarIcon: "📚",
    howTheyHelp: "Brinda educación sexual integral (ESI) científica, detecta señales de acoso y canaliza casos al SíseVe.",
    andeanContext: "El maestro o maestra rural suele ser una figura de alta confianza y respeto en la comunidad.",
    safeBoundaryAdvice: "Debe respetar la privacidad del escolar y garantizar que no haya discriminación ni expulsiones por embarazo."
  },
  {
    id: "sn-salud",
    roleTitle: "Obstetra o Personal del Servicio Amigable",
    avatarIcon: "🩺",
    howTheyHelp: "Ofrece consejería médica confidencial, entrega gratuita de métodos anticonceptivos y atención sin estigmas.",
    andeanContext: "Las postas de salud andinas y rurales deben atender en la lengua materna de la persona y con calidez intercultural.",
    safeBoundaryAdvice: "La ley respalda la atención autónoma de adolescentes sin requerir autorización de terceros para consejería."
  },
  {
    id: "sn-pares",
    roleTitle: "Amistad Positiva / Líder Juvenil",
    avatarIcon: "🤝",
    howTheyHelp: "Acompaña en momentos de duda, refuerza el autoestima y anima a decir 'NO' ante presiones grupales.",
    andeanContext: "Redes juveniles comunitarias que comparten sueños de estudio técnico, universitario y proyectos productivos.",
    safeBoundaryAdvice: "Una amistad sana nunca te condiciona ni te pide que arriesgues tu bienestar para ser aceptado/a."
  }
];

export const HEALTH_ACCOMPANIMENT_STEPS: HealthAccompanimentStep[] = [
  {
    step: 1,
    title: "Diálogo previo en casa con tranquilidad",
    goal: "Normalizar la visita a la posta médica o centro de salud como un acto de cuidado y salud preventiva.",
    parentAdvice: "Dile: 'Es completamente normal consultar con un profesional de salud sobre tu cuerpo, menstruación o métodos. Estoy aquí para acompañarte si lo deseas'.",
    teenRight: "El/la adolescente tiene derecho a expresar si prefiere entrar a solas al consultorio.",
    avoidThis: "Evita reclamos como '¿Por qué quieres ir a la posta? ¿Qué hiciste?'. El tono inquisitivo rompe el vínculo."
  },
  {
    step: 2,
    title: "Llegada al establecimiento y solicitud de Servicio Amigable",
    goal: "Identificar el área de salud para adolescentes o consultorio de obstetricia.",
    parentAdvice: "Acompaña con serenidad hasta la ventanilla o módulo de triaje y apoya con los trámites iniciales de admisión.",
    teenRight: "La atención en salud sexual y reproductiva es gratuita y prioritaria en establecimientos públicos.",
    avoidThis: "Evita hablar por tu hijo/a si él o ella prefiere explicar su motivo de consulta al personal."
  },
  {
    step: 3,
    title: "Privacidad durante la consulta médica",
    goal: "Garantizar la confidencialidad médica entre el profesional y el/la paciente.",
    parentAdvice: "Pregunta con cariño: '¿Prefieres que me quede contigo adentro o te espero en la sala de espera?'. Respeta su respuesta.",
    teenRight: "La Norma Técnica NTS N° 208-MINSA garantiza la confidencialidad médica y la autonomía del adolescente.",
    avoidThis: "No te molestes si te piden esperar afuera; la privacidad médica facilita que expresen sus dudas con total sinceridad."
  },
  {
    step: 4,
    title: "Consejería y entrega de métodos según decisión informada",
    goal: "Acceso a información científica sobre doble protección (condón + método de larga duración).",
    parentAdvice: "Si te invita a pasar al cierre de la consulta, escucha las indicaciones del profesional de salud con mente abierta.",
    teenRight: "Derecho a recibir métodos anticonceptivos seguros, de calidad y sin discriminación moral.",
    avoidThis: "Evita desacreditar las recomendaciones médicas o juzgar los métodos elegidos."
  },
  {
    step: 5,
    title: "Refuerzo positivo de regreso a casa",
    goal: "Cerrar la experiencia con un sentimiento de logro, protección y fortalecimiento familiar.",
    parentAdvice: "Dile con una sonrisa: 'Gracias por confiar en mí para acompañarte. Recuerda que siempre puedes contar conmigo'.",
    teenRight: "Sentirse respaldado/a por su hogar refuerza su autoestima y autonomía para cuidarse en el futuro.",
    avoidThis: "No utilices la visita médica como argumento en futuras discusiones familiares."
  }
];

export const ANDEAN_FAMILY_CONTEXTS: AndeanFamilyContext[] = [
  {
    id: "ctx-quechua",
    title: "Familia Quechua / Sierra Central y Sur",
    culture: "Quechua",
    quote: "“Allin kawsayqa wasipi rimanakuymantam qallarin” (El buen vivir empieza con el diálogo respetuoso en el hogar).",
    culturalValue: "Ayni y Yanantin: Reciprocidad, respeto entre generaciones y protección comunitaria de los jóvenes.",
    dailySituation: "Durante las labores de cosecha o en la cena familiar, conversar con calma sobre los cambios corporales de los hijos/as.",
    empatheticResolution: "Escuchar sin miedo ni vergüenza. En el ayllu, proteger a los jóvenes es asegurar el bienestar de toda la comunidad."
  },
  {
    id: "ctx-aymara",
    title: "Familia Aymara / Altiplano y Lago Titicaca",
    culture: "Aymara",
    quote: "“Suma Qamaña: Vivir bien con salud, dignidad y decisiones conscientes para nuestras hijas e hijos.”",
    culturalValue: "Chacha-Warmi con equidad: Desmontar roles machistas para que varones y mujeres compartan responsabilidades del hogar.",
    dailySituation: "El padre enseña al hijo varón que cuidar la salud sexual y respetar a su pareja es un acto de honor y madurez.",
    empatheticResolution: "Promover la corresponsabilidad masculina desde temprana edad sin culpar a las tradiciones."
  },
  {
    id: "ctx-rural",
    title: "Familia Rural y Agrícola",
    culture: "Rural",
    quote: "“Como cuidamos la siembra tierna para que dé fruto fuerte, cuidamos los proyectos de vida de nuestros muchachos.”",
    culturalValue: "Tejido Comunitario: Apoyo mutuo entre familias vecinas y autoridades locales para evitar la violencia.",
    dailySituation: "Cuando un joven siente presión de sus amigos en fiestas patronales para beber o tener relaciones.",
    empatheticResolution: "Fortalecer su seguridad interior para que pueda decir 'NO' con firmeza y orgullo por sus metas."
  },
  {
    id: "ctx-migrante",
    title: "Familia Migrante en Contexto Urbano",
    culture: "Migrante Urbano",
    quote: "“Nuestras raíces nos dan fuerza para abrir caminos nuevos en la ciudad con estudio y salud.”",
    culturalValue: "Perseverancia y Superación: Mantener los lazos familiares mientras se navegan desafíos urbanos y redes sociales.",
    dailySituation: "Afrontar juntos la presión de modas digitales, retos en internet y el miedo a la exclusión en la escuela.",
    empatheticResolution: "Espacios semanales para hablar de salud mental, emociones y resolución de problemas sin gritos."
  }
];

export const ANDEAN_HOTLINES_BY_COUNTRY = [
  {
    country: "Perú",
    flag: "🇵🇪",
    mainLine: "Línea 100 (Violencia Familiar y Sexual 24/7) / 113 Opción 3 (Salud Sexual MINSA)",
    secondary: "SíseVe (MINEDU): 0800-76-888 / DEMUNA local",
    phone: "100"
  },
  {
    country: "Bolivia",
    flag: "🇧🇴",
    mainLine: "Línea 102 (Defensorías de la Niñez y Adolescencia) / 800-140348 (Salud)",
    secondary: "FELCV (Violencia hacia la mujer): 800-140348",
    phone: "102"
  },
  {
    country: "Ecuador",
    flag: "🇪🇨",
    mainLine: "Línea 171 Opción 2 (Ministerio de Salud Pública - Consejería SSR)",
    secondary: "ECU 911 / 1800-DELITO (Opción 4 Violencia de Género)",
    phone: "171"
  },
  {
    country: "Colombia",
    flag: "🇨🇴",
    mainLine: "Línea 141 (ICBF Protección a Niñez) / Línea 155 (Orientación a Mujeres)",
    secondary: "Línea 106 (Salud Mental y Jóvenes) / 123 Urgencias",
    phone: "141"
  }
];

export const ANDEAN_MATERNAL_HEALTH_INDICATORS: AndeanMaternalHealthIndicator[] = [
  {
    country: "Bolivia",
    flag: "🇧🇴",
    prenatalCoverage: 81.3,
    trainedBirthAttendant: 98.2,
    modernContraceptives: 50.0,
    familyPlanningDemandSatisfied: 60.7,
    maternalMortalityRatio: 160.0,
    adolescentFertilityRate: 62.1,
    earlyPrenatalFirstTrimesterCategory: "≥80%",
    fourPlusPrenatalCategory: ">80%",
    healthExpenditureRelation: "Gasto en salud moderado-bajo; reto clave en calidad y oportunidad resolutiva.",
    statusNote: "Alta cobertura prenatal (81.3%) y parto calificado (98.2%), pero persiste alta mortalidad materna (160.0 por 100k NV) y baja prevalencia anticonceptiva moderna (50.0%)."
  },
  {
    country: "Chile",
    flag: "🇨🇱",
    prenatalCoverage: null, // N/D
    trainedBirthAttendant: 99.8,
    modernContraceptives: 72.0,
    familyPlanningDemandSatisfied: 84.9,
    maternalMortalityRatio: 19.2,
    adolescentFertilityRate: 20.1,
    earlyPrenatalFirstTrimesterCategory: "≥80%",
    fourPlusPrenatalCategory: ">80%",
    healthExpenditureRelation: "Mayor gasto per cápita en salud y alta inversión pública se traducen en los mejores resultados.",
    statusNote: "Lidera la subregión con la menor tasa de fecundidad adolescente (20.1 por 1k) y la menor razón de mortalidad materna (19.2 por 100k NV)."
  },
  {
    country: "Colombia",
    flag: "🇨🇴",
    prenatalCoverage: 81.6,
    trainedBirthAttendant: 97.4,
    modernContraceptives: 77.0,
    familyPlanningDemandSatisfied: 87.1,
    maternalMortalityRatio: 83.2,
    adolescentFertilityRate: 55.8,
    earlyPrenatalFirstTrimesterCategory: "<80%",
    fourPlusPrenatalCategory: ">80%",
    healthExpenditureRelation: "Inversión intermedia con alta demanda satisfecha en planificación familiar.",
    statusNote: "Mayor uso de anticonceptivos modernos (77.0%) y 87.1% de demanda satisfecha, pero inicio temprano prenatal menor al 80% en áreas dispersas."
  },
  {
    country: "Ecuador",
    flag: "🇪🇨",
    prenatalCoverage: 79.0,
    trainedBirthAttendant: 97.0,
    modernContraceptives: 73.0,
    familyPlanningDemandSatisfied: 81.6,
    maternalMortalityRatio: 43.5,
    adolescentFertilityRate: 60.3,
    earlyPrenatalFirstTrimesterCategory: "<80%",
    fourPlusPrenatalCategory: "70-80%",
    healthExpenditureRelation: "Gasto en fortalecimiento de primer nivel de atención y red pública de salud.",
    statusNote: "Mortalidad materna intermedia-baja (43.5 por 100k NV), pero alta fecundidad adolescente (60.3 por 1k) con retos en comunidades rurales de sierra y amazonía."
  },
  {
    country: "Perú",
    flag: "🇵🇪",
    prenatalCoverage: 85.1,
    trainedBirthAttendant: 98.6,
    modernContraceptives: 58.0,
    familyPlanningDemandSatisfied: 70.8,
    maternalMortalityRatio: 63.0,
    adolescentFertilityRate: 55.3,
    earlyPrenatalFirstTrimesterCategory: "<80%",
    fourPlusPrenatalCategory: ">80%",
    healthExpenditureRelation: "Coberturas de acceso altas que requieren mayor calidad, pertinencia cultural y resolución obstétrica.",
    statusNote: "Alta cobertura prenatal (85.1%) y parto institucional/calificado (98.6%), pero brechas en uso de anticonceptivos modernos (58.0%) y mortalidad materna (63.0 por 100k NV)."
  },
  {
    country: "Venezuela",
    flag: "🇻🇪",
    prenatalCoverage: 82.6,
    trainedBirthAttendant: 98.6,
    modernContraceptives: 72.0,
    familyPlanningDemandSatisfied: 82.4,
    maternalMortalityRatio: 125.4,
    adolescentFertilityRate: 81.7,
    earlyPrenatalFirstTrimesterCategory: "<50%",
    fourPlusPrenatalCategory: ">80%",
    healthExpenditureRelation: "Menor gasto en salud per cápita e insumos se asocia directamente a mayor riesgo materno.",
    statusNote: "La mayor tasa de fecundidad adolescente (81.7 por 1k) y alta mortalidad materna (125.4 por 100k NV) con inicio temprano prenatal crítico (<50%)."
  }
];

export const REGIONAL_HEALTH_INSIGHTS: RegionalHealthInsight[] = [
  {
    title: "Atención Prenatal Temprana (Primer Trimestre)",
    indicatorName: "Oportunidad de Acceso",
    analysis: "Países con ≥80%: Bolivia, Chile, Costa Rica, Cuba, Panamá. Países con <80%: Colombia, Perú, México, Argentina, El Salvador, Brasil, Guyana, Guatemala, Venezuela (con valores <50% en Argentina, Guyana y Venezuela).",
    keyTakeaway: "El inicio tardío del control prenatal en el primer trimestre refleja barreras de acceso temprano, desinformación o estigma en adolescentes gestantes.",
    lacContext: "Lima, 23 de abril de 2026 — Informe LAC ORAS-CONHU"
  },
  {
    title: "Cobertura ≥4 Controles Prenatales",
    indicatorName: "Cantidad vs. Calidad",
    analysis: "Alta cobertura (>80%) en Perú (85.1%), Bolivia (81.3%), Colombia (81.6%), Venezuela (82.6%), Brasil, Costa Rica, Panamá. Menor a 70% en Argentina y Haití.",
    keyTakeaway: "Aunque la cobertura de 4+ controles es alta en la mayoría de países andinos, no siempre se traduce automáticamente en menor mortalidad materna: la calidad y capacidad de respuesta resolutiva de la posta es fundamental.",
    lacContext: "La calidad del cuidado prenatal salva vidas, no solo el registro numérico de visitas."
  },
  {
    title: "Partos Atendidos por Personal Capacitado e Institucional",
    indicatorName: "Institucionalización Obstétrica",
    analysis: "Nivel alto generalizado (97% – 99.8%) en todos los países andinos (Chile 99.8%, Perú 98.6%, Venezuela 98.6%, Bolivia 98.2%, Colombia 97.4%, Ecuador 97.0%).",
    keyTakeaway: "Tener parto institucional no basta si no existen cuidados obstétricos de emergencia, sangre segura y calidez intercultural. Países con alta cobertura siguen registrando muertes maternas prevenibles.",
    lacContext: "El acceso existe en papel; el desafío crítico es la calidad resolutiva en emergencias obstétricas."
  },
  {
    title: "Uso de Anticonceptivos Modernos y Demanda Satisfecha",
    indicatorName: "Autonomía y Planificación",
    analysis: "Gran variabilidad regional: <50% en Haití, Guyana y Bolivia (50.0%); intermedios en Perú (58.0%); y más altos en Chile (72.0%), Venezuela (72.0%), Ecuador (73.0%) y Colombia (77.0%). Demanda satisfecha alcanza 87.1% en Colombia pero solo 60.7% en Bolivia.",
    keyTakeaway: "Las brechas de acceso a métodos modernos y consejería sin prejuicios explican gran parte de los embarazos no planificados y la fecundidad en adolescentes.",
    lacContext: "Garantizar métodos duales gratuitos en postas amigables protege los proyectos de vida."
  },
  {
    title: "Gasto en Salud per Cápita vs. Mortalidad Materna",
    indicatorName: "Determinante Estructural",
    analysis: "Existe una relación clara y directa: menor gasto per cápita en salud se asocia a mayor mortalidad materna (Haití, Bolivia con 160.0, Venezuela con 125.4), mientras que mayor inversión se traduce en mejores resultados (Chile con 19.2).",
    keyTakeaway: "Invertir en salud pública y centros amigables para adolescentes reduce radicalmente las muertes maternas y la anemia.",
    lacContext: "Fuente: Análisis de situación ORAS CONHU y reportes regionales recientes (Lima, 2026)."
  }
];

