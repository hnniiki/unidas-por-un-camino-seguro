import { SafetyPoint, EducationalInfographic } from '../types/citizenMap';

export const INITIAL_SAFETY_POINTS: SafetyPoint[] = [
  // Lima / Central
  {
    id: 'p-1',
    title: 'Centro de Salud Amigable Lince - MINSA',
    category: 'safe_point',
    type: 'posta_salud',
    latitude: -12.0833,
    longitude: -77.0345,
    city: 'Lima',
    department: 'Lima',
    address: 'Av. Manuel Gómez 450, Lince',
    description: 'Módulo diferenciado para adolescentes. Entrega gratuita de métodos anticonceptivos, pruebas rápidas, orientación sin juzgar y psicólogo.',
    phone: '01 471-2234',
    schedule: 'Lunes a Sábado 8:00 am - 6:00 pm',
    verified: true,
    upvotes: 48,
    reportsCount: 0,
    severity: 'seguro',
    tags: ['Salud Amigable', 'Anticonceptivos Gratis', 'Psicología', 'AOE Gratuita'],
    createdAt: '2026-08-15',
    servicesOffered: ['Implante Subdérmico', 'Preservativos', 'Pastilla de Emergencia AOE', 'Consejería Confidencial']
  },
  {
    id: 'p-2',
    title: 'Centro Emergencia Mujer (CEM) Comisaría Jesús María',
    category: 'safe_point',
    type: 'centro_emergencia_mujer',
    latitude: -12.0722,
    longitude: -77.0489,
    city: 'Lima',
    department: 'Lima',
    address: 'Av. Arnaldo Márquez 1230, Jesús María',
    description: 'Atención multidisciplinaria gratuita para niñas, adolescentes y mujeres: asesoría legal, contención psicológica y asistencia social 24/7.',
    phone: '01 433-8900 / Línea 100',
    schedule: 'Abierto las 24 horas (todos los días)',
    verified: true,
    upvotes: 62,
    reportsCount: 0,
    severity: 'seguro',
    tags: ['CEM 24/7', 'Asesoría Legal', 'Protección Urgente', 'Línea 100'],
    createdAt: '2026-08-10',
    servicesOffered: ['Medidas de Protección', 'Defensa Pública', 'Apoyo Psicosocial', 'Acompañamiento Fiscalía']
  },
  {
    id: 'p-3',
    title: 'Punto de Riesgo: Pasaje oscuro y acoso constante cerca a puente peatonal',
    category: 'risk_point',
    type: 'alumbrado_deficiente',
    latitude: -12.0911,
    longitude: -77.0289,
    city: 'Lima',
    department: 'Lima',
    address: 'Cruce Av. Canadá con Jr. Manuel Segura',
    description: 'Zona con postes de luz inoperativos y reportes ciudadanos de silbidos, acoso callejero e inseguridad a la salida escolar y nocturna.',
    verified: false,
    upvotes: 29,
    reportsCount: 6,
    severity: 'alta',
    tags: ['Sin Alumbrado', 'Acoso Callejero', 'Poco Tránsito', 'Alerta Ciudadana'],
    createdAt: '2026-08-28'
  },

  // Cusco / Sierra Andina
  {
    id: 'p-4',
    title: 'Centro de Salud Belenpampa - Cusco',
    category: 'safe_point',
    type: 'posta_salud',
    latitude: -13.5228,
    longitude: -71.9845,
    city: 'Cusco',
    department: 'Cusco',
    address: 'Calle Belenpampa s/n, Santiago, Cusco',
    description: 'Servicio diferenciado para adolescentes y jóvenes con atención bilingüe (Quechua / Castellano). Distribución de métodos y prueba de embarazo gratuita.',
    phone: '084 225478',
    schedule: 'Lunes a Viernes 7:30 am - 7:00 pm',
    verified: true,
    upvotes: 53,
    reportsCount: 0,
    severity: 'seguro',
    tags: ['Atención Quechua', 'Salud Diferenciada', 'Kit 72h', 'Orientación Gratuita'],
    createdAt: '2026-08-12',
    servicesOffered: ['Atención en Quechua', 'Anticonceptivos', 'Kit Emergencia 72 Horas', 'Atención Médica']
  },
  {
    id: 'p-5',
    title: 'DEMUNA y CEM Provincial del Cusco',
    category: 'safe_point',
    type: 'demuna',
    latitude: -13.5167,
    longitude: -71.9788,
    city: 'Cusco',
    department: 'Cusco',
    address: 'Plaza Regocijo s/n, Cusco',
    description: 'Defensoría Municipal de la Niña, Niño y Adolescente. Conciliaciones familiares, protección contra violencia escolar y vulneración de derechos.',
    phone: '084 240006',
    schedule: 'Lunes a Viernes 8:00 am - 4:30 pm',
    verified: true,
    upvotes: 41,
    reportsCount: 0,
    severity: 'seguro',
    tags: ['DEMUNA', 'Derechos Niñez', 'Protección Adolescente'],
    createdAt: '2026-08-14'
  },
  {
    id: 'p-6',
    title: 'Reporte: Zona solitaria paradero interprovincial Cusco - Urcos',
    category: 'risk_point',
    type: 'zona_insegura',
    latitude: -13.5350,
    longitude: -71.9610,
    city: 'Cusco',
    department: 'Cusco',
    address: 'Prolongación Av. Huayruropata con Vía Expresa',
    description: 'Reporte comunitario: escasa presencia policial y autos informales en horas de la noche. Se recomienda transitar en grupos y usar paraderos formales.',
    verified: false,
    upvotes: 18,
    reportsCount: 4,
    severity: 'media',
    tags: ['Transporte Informal', 'Riesgo Nocturno', 'Baja Vigilancia'],
    createdAt: '2026-08-25'
  },

  // Arequipa / Sur Andino
  {
    id: 'p-7',
    title: 'Hospital Goyeneche - Consultorio Adolescente',
    category: 'safe_point',
    type: 'posta_salud',
    latitude: -16.4022,
    longitude: -71.5283,
    city: 'Arequipa',
    department: 'Arequipa',
    address: 'Av. Goyeneche s/n, Cercado, Arequipa',
    description: 'Área de salud integral adolescente. Entrega inmediata del Kit de Violencia Sexual de emergencia y método de doble protección.',
    phone: '054 231313',
    schedule: '24 horas en Emergencia / Consultorios 8:00 am - 5:00 pm',
    verified: true,
    upvotes: 59,
    reportsCount: 0,
    severity: 'seguro',
    tags: ['Hospital Regional', 'Kit Emergencia 24h', 'Ginecología Adolescente'],
    createdAt: '2026-08-18'
  },
  {
    id: 'p-8',
    title: 'Punto de Alerta: Callejón sin cámaras cerca a parque infantil',
    category: 'risk_point',
    type: 'acoso_callejero',
    latitude: -16.4150,
    longitude: -71.5420,
    city: 'Arequipa',
    department: 'Arequipa',
    address: 'Calle Tacna con Jr. San Jerónimo, Paucarpata',
    description: 'Vecinas alertan sobre sujetos libando licor en la vía pública e intimidando a transeúntes escolares.',
    verified: false,
    upvotes: 34,
    reportsCount: 5,
    severity: 'media',
    tags: ['Consumo de Alcohol', 'Intimidación', 'Sin Serenazgo'],
    createdAt: '2026-08-26'
  },

  // Ayacucho / Huamanga
  {
    id: 'p-9',
    title: 'Centro de Salud Santa Elena - Ayacucho',
    category: 'safe_point',
    type: 'posta_salud',
    latitude: -13.1610,
    longitude: -74.2230,
    city: 'Huamanga',
    department: 'Ayacucho',
    address: 'Av. Las Palmeras s/n, San Juan Bautista, Huamanga',
    description: 'Servicio de salud amigable especializado en prevención del embarazo adolescente, consejería reproductiva y charlas comunitarias en Quechua.',
    phone: '066 312540',
    schedule: 'Lunes a Sábado 7:00 am - 7:00 pm',
    verified: true,
    upvotes: 45,
    reportsCount: 0,
    severity: 'seguro',
    tags: ['Comunidad Quechua', 'Salud Reproductiva', 'Prevención Escolar'],
    createdAt: '2026-08-20'
  },

  // Huancayo / Junín
  {
    id: 'p-10',
    title: 'Centro de Salud La Libertad - Huancayo',
    category: 'safe_point',
    type: 'posta_salud',
    latitude: -12.0680,
    longitude: -75.2090,
    city: 'Huancayo',
    department: 'Junín',
    address: 'Jr. Pichis 450, Huancayo',
    description: 'Punto seguro con consultorio diferenciado para jóvenes. Atención amigable y kit de emergencia 72h disponible.',
    phone: '064 233490',
    schedule: 'Lunes a Domingo 8:00 am - 8:00 pm',
    verified: true,
    upvotes: 38,
    reportsCount: 0,
    severity: 'seguro',
    tags: ['Huancayo Seguro', 'Kit 72h', 'Orientación Médica'],
    createdAt: '2026-08-22'
  }
];

export const EDUCATIONAL_INFOGRAPHICS: EducationalInfographic[] = [
  {
    id: 'info-1',
    title: 'Ruta Crítica de las 72 Horas: ¿Qué hacer ante una relación no protegida o violencia sexual?',
    category: 'emergencia_72h',
    categoryLabel: 'Protocolo de Emergencia 72h',
    description: 'Guía paso a paso indispensable con los tiempos biológicos clave, el Kit de Emergencia Gratuito del MINSA y cómo actuar sin miedo.',
    readTime: '3 min de lectura',
    tags: ['Kit 72h', 'AOE', 'Profilaxis VIH', 'Línea 100', 'MINSA Gratuito'],
    authoritativeSource: 'Ministerio de Salud del Perú (MINSA) - Directiva Sanitaria N° 083-MINSA y MIMP',
    hotlineEmergency: 'Línea 100 (24h) | Línea 113 Opción 3',
    downloadFilename: 'Guia_Emergencia_72Horas_Unidas.pdf',
    badgeColor: 'bg-rose-500 text-white',
    bulletPoints: [
      'Primeras 72 horas: Ventana biológica de oro para evitar embarazo no planificado y transmisión de VIH e ITS.',
      'Kit de Violencia Sexual Gratuito: Incluye pastilla anticonceptiva de emergencia (AOE), vacuna Hepatitis B y antirretrovirales preventivos contra el VIH.',
      'Cualquier posta u hospital público de salud debe entregarlo sin costo ni necesidad de denuncia policial previa.',
      'No te laves ni cambies de ropa si hubo agresión antes del examen médico legal.'
    ],
    keyProtocol: 'Acude INMEDIATAMENTE a la posta más cercana o llama gratis al 100 o 113 opción 3. No esperes a que pasen los días.',
    steps: [
      {
        number: 1,
        title: 'Buscar un lugar seguro',
        description: 'Aléjate de la persona agresora o de la situación de riesgo y comunícate con un adulto de confianza o llama a la Línea 100.',
        tip: 'Si tienes batería, guarda tu ubicación y compártela con alguien de confianza.'
      },
      {
        number: 2,
        title: 'Dirigirse a una posta u hospital dentro de las 72 horas',
        description: 'Solicita el Kit de Emergencia para Víctimas de Violencia Sexual o la Anticoncepción Oral de Emergencia (AOE).',
        tip: 'Recuerda: Es gratuito por ley en todo el territorio nacional.'
      },
      {
        number: 3,
        title: 'Recibir atención médica y preventiva contra VIH / ITS',
        description: 'El personal médico iniciará la profilaxis antirretroviral (PEP) para prevenir el VIH y administrará antibióticos para otras ITS.',
        tip: 'La medicación debe tomarse según la pauta médica completa.'
      },
      {
        number: 4,
        title: 'Acompañamiento psicológico y legal gratuito (CEM)',
        description: 'Los Centros Emergencia Mujer (CEM) asignan una abogada y una psicóloga sin costo para protegerte y pedir medidas de protección.',
        tip: 'No estás sola; la ley protege a las niñas y adolescentes en todo momento.'
      }
    ]
  },
  {
    id: 'info-2',
    title: 'Guía Rápida de Métodos Anticonceptivos Modernos: ¿Cuál es el ideal para ti?',
    category: 'anticoncepcion',
    categoryLabel: 'Salud & Anticoncepción',
    description: 'Comparativa visual clara de efectividad, duración, ventajas y uso de la doble protección (preservativo + método de larga duración).',
    readTime: '4 min de lectura',
    tags: ['Implante Subdérmico', 'Preservativo Dual', 'DIU', 'Pastillas', 'Gratis en Posta'],
    authoritativeSource: 'Organización Panamericana de la Salud (OPS) / MINSA Perú',
    downloadFilename: 'Infografia_Metodos_Anticonceptivos.pdf',
    badgeColor: 'bg-violet-600 text-white',
    bulletPoints: [
      'Estrategia de Doble Protección: El preservativo es el ÚNICO método que previene tanto embarazos como Infecciones de Transmisión Sexual (VIH, VPH, Gonorrea, Sífilis).',
      'Implante Subdérmico: 99.9% de efectividad, dura de 3 a 5 años, colocado en el brazo en 5 minutos en la posta médica.',
      'El método del ritmo y coito interrumpido tienen una tasa de fallo superior al 24%. No son recomendados.',
      'Los adolescentes pueden acceder a consejería y anticonceptivos en servicios amigables.'
    ],
    keyProtocol: 'Usa siempre preservativo masculino o femenino en cada relación sexual desde el principio hasta el final.',
    steps: [
      {
        number: 1,
        title: 'Elegir Doble Protección',
        description: 'Combina un método de alta eficacia (implante, DIU o inyectable) con el uso correcto del preservativo.',
        tip: 'Revisa siempre la fecha de vencimiento y abre el empaque con las yemas de los dedos, nunca con los dientes.'
      },
      {
        number: 2,
        title: 'Consulta médica sin juzgamiento',
        description: 'Un profesional de obstetricia evaluará tu salud y te explicará los efectos esperados (ej. cambios en el sangrado).',
        tip: 'El implante subdérmico no causa infertilidad futura ni afecta tu crecimiento.'
      },
      {
        number: 3,
        title: 'Seguimiento y control anual',
        description: 'Acude a tus controles periódicos y recuerda la fecha de renovación de tu método.',
        tip: 'Guarda tu carnet de atención o anótalo en el recordatorio de la plataforma.'
      }
    ]
  },
  {
    id: 'info-3',
    title: 'Semáforo de Seguridad Callejera & Acoso: Cómo actuar en la vía pública',
    category: 'seguridad_callejera',
    categoryLabel: 'Seguridad Ciudadana',
    description: 'Protocolos de autoprotección, cómo pedir auxilio en comercios aliados y reporte anónimo de zonas oscuras o de riesgo.',
    readTime: '3 min de lectura',
    tags: ['Acoso Callejero', 'Autoprotección', 'Puntos Seguros', 'Serenazgo'],
    authoritativeSource: 'Ley N° 30314 para Prevenir y Sancionar el Acoso Sexual en Espacios Públicos',
    hotlineEmergency: 'Central 105 PNP | Serenazgo Local',
    downloadFilename: 'Semaforo_Seguridad_Callejera.pdf',
    badgeColor: 'bg-amber-600 text-white',
    bulletPoints: [
      'Verde (Prevención): Planifica tu ruta, comparte ubicación en tiempo real con familia y transita por calles iluminadas.',
      'Amarillo (Alerta temprana): Si notas que te siguen o te incomodan, entra a un negocio, farmacia, posta o banco concurrido y pide ayuda en voz alta.',
      'Rojo (Riesgo inminente): Haz ruido, grita "FUEGO" o pide ayuda directa a un transeúnte específico ("¡Señora de chompa roja, ayúdeme que este hombre me sigue!").',
      'El acoso sexual callejero (tocamientos, exhibicionismo, persecución) es un delito sancionado penalmente.'
    ],
    keyProtocol: 'Nunca sientas vergüenza de pedir auxilio. Tu seguridad es lo primero y la comunidad está obligada a respaldarte.',
    steps: [
      {
        number: 1,
        title: 'Identificar Puntos Seguros en tu ruta',
        description: 'Ubica con anticipación comisarias, postas de salud, bodegas iluminadas y locales con vigilantes.',
        tip: 'Guarda el número directo del Serenazgo de tu distrito en marcación rápida.'
      },
      {
        number: 2,
        title: 'Reaccionar con firmeza',
        description: 'Cruza la pista, cambia de acera hacia la luz y no te aísles en pasajes estrechos.',
        tip: 'Mantén una postura erguida y no uses audífonos a volumen alto que te aíslen del entorno.'
      },
      {
        number: 3,
        title: 'Reportar en el Mapa Comunitario',
        description: 'Registra la zona de riesgo en nuestra plataforma para que la municipalidad y otras jóvenes tomen precauciones.',
        tip: 'Tu reporte es 100% anónimo y ayuda a iluminar y patrullar tu barrio.'
      }
    ]
  },
  {
    id: 'info-4',
    title: 'Guía de Diálogo Familiar: 5 Claves para hablar de sexualidad y límites en el hogar',
    category: 'dialogo_familiar',
    categoryLabel: 'Familia & Crianza Positiva',
    description: 'Orientaciones prácticas para madres, padres y cuidadores sobre cómo responder preguntas difíciles con naturalidad y respeto.',
    readTime: '4 min de lectura',
    tags: ['Diálogo en Casa', 'Crianza Afectiva', 'Prevención Temprana', 'Límites'],
    authoritativeSource: 'UNICEF / MIMP Perú - Guía de Familias Fuertes',
    downloadFilename: 'Guia_Dialogo_Familiar_Unidas.pdf',
    badgeColor: 'bg-emerald-600 text-white',
    bulletPoints: [
      'Hablar de sexualidad en casa NO adelanta la iniciación sexual; por el contrario, la posterga y promueve decisiones responsables.',
      'Nombrar las partes del cuerpo por su nombre anatómico correcto previene el abuso sexual infantil.',
      'Escuchar sin regañar ni hacer caras de escándalo para que tus hijos acudan a ti cuando tengan una duda o un problema real.',
      'Establecer proyectos de vida y metas personales compartidas en familia.'
    ],
    keyProtocol: 'Crea un ambiente de confianza diaria donde ninguna pregunta sea motivo de burla ni castigo.',
    steps: [
      {
        number: 1,
        title: 'Aprovechar momentos cotidianos',
        description: 'Usa una película, una noticia o una serie para iniciar la conversación de forma espontánea.',
        tip: 'Pregunta: "¿Tú qué opinas de lo que le pasó al personaje?" en lugar de dar un sermón.'
      },
      {
        number: 2,
        title: 'Validar emociones y dudas',
        description: 'Acepta que la adolescencia trae cambios físicos y hormonales que generan curiosidad normal.',
        tip: 'Si no sabes una respuesta, dile: "No lo sé con exactitud, pero vamos a investigarlo juntos en una fuente confiable".'
      },
      {
        number: 3,
        title: 'Enseñar sobre consentimiento y respeto mutuo',
        description: 'Explica que nadie tiene derecho a tocar su cuerpo sin su permiso, ni a exigir fotos íntimas o besos.',
        tip: 'Enséñales que decir "NO" es un derecho absoluto e innegociable.'
      }
    ]
  }
];
