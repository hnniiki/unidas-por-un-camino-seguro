import { 
  HOTLINES, 
  MYTHS_REALITIES, 
  AGE_GUIDES, 
  WARNING_TOPICS, 
  SERVICE_ROUTES, 
  STAFF_TRAINING_MODULES 
} from '../data/mockData';

export type SearchCategory = 'todos' | 'derechos' | 'familias' | 'rutas' | 'mitos' | 'capacitacion' | 'preguntas';

export interface SearchResultItem {
  id: string;
  category: 'derechos' | 'familias' | 'rutas' | 'mitos' | 'capacitacion' | 'preguntas' | 'emergencia';
  categoryLabel: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  tags: string[];
  targetTab: string;
  actionLabel: string;
  severity?: 'critica' | 'alta' | 'informativa';
  phone?: string;
  legalReference?: string;
  keyPoints?: string[];
}

export const SEARCH_CATEGORIES: { id: SearchCategory; label: string; countHint?: string }[] = [
  { id: 'todos', label: 'Todo el contenido' },
  { id: 'derechos', label: 'Derechos y Leyes' },
  { id: 'familias', label: 'Guías Familiares' },
  { id: 'rutas', label: 'Rutas de Atención' },
  { id: 'mitos', label: 'Mitos y Salud' },
  { id: 'capacitacion', label: 'Capacitación' },
  { id: 'preguntas', label: 'Buzón Confidencial' },
];

export const POPULAR_SEARCH_TERMS = [
  'Línea 100',
  'Pastilla del día siguiente',
  'Servicios Amigables MINSA',
  'Consentimiento',
  'Kit de Emergencia 72h',
  'Guía 13 a 15 años',
  'Ley N° 31945 (Matrimonio Infantil)',
  'Implante subdérmico',
  'CEM y DEMUNA',
  'Menores de 15 años',
  'Violencia escolar SíseVe',
  'Confidencialidad en postas'
];

export function buildSearchIndex(): SearchResultItem[] {
  const index: SearchResultItem[] = [];

  // 1. Hotlines & Emergencies
  HOTLINES.forEach((h, idx) => {
    index.push({
      id: `hotline-${idx}`,
      category: 'emergencia',
      categoryLabel: 'Línea de Emergencia y Ayuda',
      title: h.name,
      subtitle: `${h.badge} • ${h.hours}`,
      excerpt: h.description,
      tags: ['emergencia', 'violencia', 'salud sexual', 'gratuito', 'confidencial', 'ayuda', h.number, 'denuncia', 'telefono'],
      targetTab: 'inicio',
      actionLabel: `Llamar al ${h.number}`,
      phone: h.number,
      severity: h.isEmergency ? 'critica' : 'informativa',
      keyPoints: [h.hours, h.optionDetail || 'Atención gratuita y confidencial a nivel nacional']
    });
  });

  // 2. Warning Topics & Rights (Derechos)
  WARNING_TOPICS.forEach((wt) => {
    index.push({
      id: `rights-${wt.id}`,
      category: 'derechos',
      categoryLabel: 'Derechos, Leyes y Prevención',
      title: wt.title,
      subtitle: wt.subtitle,
      excerpt: wt.legalFramework,
      tags: ['derechos', 'leyes', 'violencia', 'codigo penal', 'prevencion', 'denuncia', 'abuso', 'menores', ...wt.resources],
      targetTab: 'derechos',
      actionLabel: 'Ver protocolo y marco legal',
      severity: wt.severity,
      legalReference: wt.legalFramework,
      keyPoints: wt.signs.slice(0, 3)
    });
  });

  // Additional explicit Rights and Legal Articles
  index.push({
    id: 'right-esi-autonomia',
    category: 'derechos',
    categoryLabel: 'Derechos y Marco Normativo',
    title: 'Derecho a la Atención Confidencial en Salud Sexual Adolescente',
    subtitle: 'Norma Técnica de Salud NTS N° 208-MINSA',
    excerpt: 'Garantiza que toda persona adolescente tiene derecho a acudir de manera autónoma a centros de salud para recibir orientación, consejería y métodos anticonceptivos sin barreras burocráticas.',
    tags: ['derechos', 'confidencialidad', 'posta medica', 'norma tecnica', 'minsa', 'anticoncepcion', 'autonomia', 'salud sexual'],
    targetTab: 'derechos',
    actionLabel: 'Ver derechos en salud',
    severity: 'informativa',
    legalReference: 'NTS N° 208-MINSA/DGIESP-2023'
  });

  index.push({
    id: 'right-educacion-maternidad',
    category: 'derechos',
    categoryLabel: 'Derechos y Marco Normativo',
    title: 'Ley N° 29600: Continuidad Educativa de Estudiantes Gestantes y Madres',
    subtitle: 'Protección contra la deserción y discriminación escolar',
    excerpt: 'Prohíbe la expulsión, suspensión o traslado forzado de estudiantes embarazadas o con hijos. El colegio debe otorgar permisos para controles médicos y facilidades académicas.',
    tags: ['derechos', 'educacion', 'colegio', 'embarazo escolar', 'ley 29600', 'minedu', 'madre adolescente'],
    targetTab: 'derechos',
    actionLabel: 'Ver normativa educativa',
    severity: 'alta',
    legalReference: 'Ley N° 29600 y Directivas del MINEDU'
  });

  // 3. Family Guides (Guías Familiares)
  AGE_GUIDES.forEach((ag) => {
    index.push({
      id: `family-${ag.id}`,
      category: 'familias',
      categoryLabel: 'Guía Familiar por Edades',
      title: ag.ageRange,
      subtitle: ag.title,
      excerpt: ag.summary,
      tags: ['familias', 'padres', 'hijos', 'comunicacion', 'crianza', 'pubertad', 'dialogo', ag.ageRange.toLowerCase()],
      targetTab: 'familias',
      actionLabel: 'Abrir guía familiar',
      keyPoints: [
        `Cambios físicos: ${ag.physicalChanges[0]}`,
        `Aspectos emocionales: ${ag.emotionalAspects[0]}`,
        `Prevención: ${ag.risksPrevention[0]}`
      ]
    });
  });

  // 4. Service Routes (Rutas de Atención)
  SERVICE_ROUTES.forEach((sr) => {
    index.push({
      id: `route-${sr.id}`,
      category: 'rutas',
      categoryLabel: 'Ruta de Atención Institucional',
      title: sr.name,
      subtitle: `Servicio de ${sr.type.toUpperCase()} • ${sr.targetAudience}`,
      excerpt: sr.confidentialityRules,
      tags: ['rutas', 'atencion', 'centro de salud', 'cem', 'demuna', 'denuncia', 'psicologia', 'legal', sr.type],
      targetTab: 'ruta',
      actionLabel: 'Ver cómo acceder al servicio',
      keyPoints: sr.whatTheyProvide.slice(0, 3)
    });
  });

  // Extra Kit de Emergencia Item in Routes
  index.push({
    id: 'route-kit-emergencia',
    category: 'rutas',
    categoryLabel: 'Rutas y Protocolos Médicos Urgentes',
    title: 'Kit de Emergencia para Violencia Sexual (Primeras 72 Horas)',
    subtitle: 'Gratuito en todas las postas, centros de salud y hospitales del Perú',
    excerpt: 'Incluye la profilaxis post-exposición para prevenir VIH (PEP), tratamiento antibiótico contra ITS, y la Anticoncepción Oral de Emergencia (AOE). Es gratuito y no requiere denuncia policial previa.',
    tags: ['kit de emergencia', '72 horas', 'violencia sexual', 'vih', 'pep', 'aoe', 'anticonceptivos', 'urgencia medica', 'minsa'],
    targetTab: 'ruta',
    actionLabel: 'Ver protocolo del Kit 72h',
    severity: 'critica',
    legalReference: 'Resolución Ministerial N° 227-2019/MINSA'
  });

  // 5. Myths & Realities (Mitos y Realidades)
  MYTHS_REALITIES.forEach((mr) => {
    index.push({
      id: `myth-${mr.id}`,
      category: 'mitos',
      categoryLabel: 'Mitos vs Realidades Científicas',
      title: `Mito: "${mr.myth}"`,
      subtitle: `Realidad: ${mr.reality}`,
      excerpt: mr.explanation,
      tags: ['mitos', 'creencias', 'anticoncepcion', 'embarazo', 'fertilidad', 'relaciones', 'salud', mr.category],
      targetTab: 'mitos',
      actionLabel: 'Ver desmentido completo',
      keyPoints: mr.tips
    });
  });

  // 6. Staff & Educator Training (Capacitación)
  STAFF_TRAINING_MODULES.forEach((tm) => {
    index.push({
      id: `training-${tm.id}`,
      category: 'capacitacion',
      categoryLabel: 'Capacitación para Docentes y Salud',
      title: tm.title,
      subtitle: `Dirigido a: ${tm.targetRoles.join(', ')}`,
      excerpt: tm.guidelines[0]?.detail || 'Guía especializada de atención y protocolos intersectoriales.',
      tags: ['capacitacion', 'docentes', 'salud', 'obstetras', 'profesores', 'protocolos', 'tutores', 'evaluacion'],
      targetTab: 'capacitacion',
      actionLabel: 'Ver módulo formativo',
      keyPoints: tm.guidelines.map(g => `${g.title}: ${g.detail.slice(0, 90)}...`)
    });
  });

  // 7. Anonymous Common Questions (Buzón Confidencial)
  const FAQ_ITEMS = [
    {
      id: 'faq-1',
      question: '¿Si voy a una posta médica a pedir el implante o condones, avisarán a mis padres o me pedirán DNI de mayor?',
      answer: 'No. La Norma Técnica del MINSA respalda el derecho de las y los adolescentes a recibir orientación y métodos de forma confidencial y gratuita en los Servicios de Salud Amigables.',
      category: 'Anticoncepción y Confidencialidad'
    },
    {
      id: 'faq-2',
      question: '¿Cuántas veces al año se puede tomar la pastilla del día siguiente? ¿Te deja infértil?',
      answer: 'La AOE es de uso ocasional y de emergencia, no como método regular. No causa infertilidad futura ni es abortiva. Si tienes vida sexual activa, se recomienda adoptar un método de larga duración (LARC).',
      category: 'Pastilla de Emergencia (AOE)'
    },
    {
      id: 'faq-3',
      question: 'Mi pareja insiste en no usar condón diciendo que "si lo amo, confío en él". ¿Cómo responder?',
      answer: 'El amor genuino siempre respeta tu salud y tus límites. La confianza no previene infecciones ni embarazos; el cuidado mutuo sí. Tienes derecho a decir NO sin sentir culpa.',
      category: 'Relaciones Sanas y Consentimiento'
    }
  ];

  FAQ_ITEMS.forEach(faq => {
    index.push({
      id: `faq-${faq.id}`,
      category: 'preguntas',
      categoryLabel: 'Buzón Confidencial & Dudas Frecuentes',
      title: faq.question,
      subtitle: faq.category,
      excerpt: faq.answer,
      tags: ['preguntas', 'dudas', 'anonimo', 'posta', 'confidencialidad', 'pareja', 'condon', 'aoe'],
      targetTab: 'preguntas',
      actionLabel: 'Ver respuesta de Navi',
      keyPoints: [faq.answer]
    });
  });

  return index;
}

// Normalize text for search comparison (stripping accents and lowercase)
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Search algorithm that calculates relevance scores
export function searchContent(
  query: string, 
  categoryFilter: SearchCategory = 'todos',
  index: SearchResultItem[]
): SearchResultItem[] {
  const cleanQuery = normalizeText(query);
  if (!cleanQuery) return [];

  const tokens = cleanQuery.split(/\s+/).filter(t => t.length > 0);

  const scoredResults: { item: SearchResultItem; score: number }[] = [];

  for (const item of index) {
    // Filter by category if not 'todos'
    if (categoryFilter !== 'todos') {
      if (item.category !== categoryFilter && !(categoryFilter === 'rutas' && item.category === 'emergencia')) {
        continue;
      }
    }

    const normTitle = normalizeText(item.title);
    const normSubtitle = normalizeText(item.subtitle || '');
    const normExcerpt = normalizeText(item.excerpt);
    const normCategory = normalizeText(item.categoryLabel);
    const normTags = item.tags.map(t => normalizeText(t)).join(' ');
    const normKeys = (item.keyPoints || []).map(k => normalizeText(k)).join(' ');
    const normLegal = normalizeText(item.legalReference || '');

    let score = 0;

    // Exact full query match bonuses
    if (normTitle.includes(cleanQuery)) score += 100;
    if (normSubtitle.includes(cleanQuery)) score += 60;
    if (normExcerpt.includes(cleanQuery)) score += 40;
    if (normTags.includes(cleanQuery)) score += 50;
    if (normLegal.includes(cleanQuery)) score += 45;

    // Token by token match
    let matchedAllTokens = true;
    for (const token of tokens) {
      let tokenMatched = false;

      if (normTitle.includes(token)) {
        score += 30;
        tokenMatched = true;
      }
      if (normTags.includes(token)) {
        score += 25;
        tokenMatched = true;
      }
      if (normSubtitle.includes(token)) {
        score += 20;
        tokenMatched = true;
      }
      if (normExcerpt.includes(token)) {
        score += 15;
        tokenMatched = true;
      }
      if (normCategory.includes(token)) {
        score += 10;
        tokenMatched = true;
      }
      if (normKeys.includes(token)) {
        score += 10;
        tokenMatched = true;
      }
      if (normLegal.includes(token)) {
        score += 15;
        tokenMatched = true;
      }

      if (!tokenMatched) {
        matchedAllTokens = false;
      }
    }

    if (matchedAllTokens && tokens.length > 1) {
      score += 25;
    }

    if (score > 0) {
      scoredResults.push({ item, score });
    }
  }

  // Sort descending by score
  scoredResults.sort((a, b) => b.score - a.score);

  return scoredResults.map(r => r.item);
}
