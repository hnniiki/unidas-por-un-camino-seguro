export interface Hotline {
  name: string;
  number: string;
  description: string;
  hours: string;
  badge: string;
  icon: string;
  isEmergency?: boolean;
  whatsappNumber?: string;
  optionDetail?: string;
}

export interface MythReality {
  id: string;
  category: 'anticoncepcion' | 'fertilidad' | 'relaciones' | 'cuerpo' | 'salud';
  myth: string;
  reality: string;
  explanation: string;
  tips: string[];
}

export interface AgeGuide {
  id: string;
  ageRange: string;
  title: string;
  summary: string;
  physicalChanges: string[];
  emotionalAspects: string[];
  risksPrevention: string[];
  conversationStarters: string[];
  dosAndDonts: {
    do: string[];
    dont: string[];
  };
}

export interface WarningSignTopic {
  id: string;
  title: string;
  subtitle: string;
  severity: 'alta' | 'critica' | 'informativa';
  signs: string[];
  legalFramework: string;
  protocolAction: string[];
  resources: string[];
}

export interface ServiceRoute {
  id: string;
  name: string;
  type: 'salud' | 'legal' | 'proteccion' | 'educativo';
  targetAudience: string;
  whatTheyProvide: string[];
  confidentialityRules: string;
  howToAccess: string;
  requirements: string[];
}

export interface MemoryCard {
  id: number;
  pairId: number;
  title: string;
  iconName: string;
  description: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface BeliefCircleItem {
  id: string;
  statement: string;
  isCorrectTrue: boolean;
  explanation: string;
  category: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'conocimiento' | 'participacion' | 'salud' | 'solidaridad';
  requiredXp: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  category: 'dialogo' | 'salud' | 'reflexion' | 'informacion';
  actionPrompt: string;
}

export interface ReportedCase {
  id: string;
  ticketCode: string;
  date: string;
  type: 'violencia_sexual' | 'menor_15' | 'matrimonio_infantil' | 'acoso_escolar' | 'embarazo_vulnerable' | 'orientacion_urgente';
  ageRange: string;
  department: string;
  status: 'recibido' | 'evaluacion' | 'derivado_cem' | 'derivado_salud' | 'acompanamiento' | 'resuelto';
  priority: 'critica' | 'alta' | 'media';
  descriptionSummary: string;
  timeline: {
    timestamp: string;
    stage: string;
    note: string;
  }[];
}

export interface MedicalReminder {
  id: string;
  title: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'navi';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  isAudioPlaying?: boolean;
}

export interface AnonymousQuestionItem {
  id: string;
  topic: string;
  question: string;
  createdAt: string;
  answered: boolean;
  specialistAnswer?: string;
  ageGroup?: string;
}

export interface CountryPregnancyStat {
  id: string;
  country: string;
  flag: string;
  rateDescription: string;
  percentageBeforeSchool: number; // e.g. 20 (1 de cada 5)
  ruralVsUrban: string;
  keyChallenge: string;
  protectiveFactor: string;
  source: string;
}

export interface PeerPressureScenario {
  id: string;
  title: string;
  context: string;
  pressureQuote: string;
  peerPressureType: string;
  assertiveResponse: string;
  selfEsteemReflection: string;
  supportNetworkAction: string;
}

export interface SupportNetworkRole {
  id: string;
  roleTitle: string;
  avatarIcon: string;
  howTheyHelp: string;
  andeanContext: string;
  safeBoundaryAdvice: string;
}

export interface HealthAccompanimentStep {
  step: number;
  title: string;
  goal: string;
  parentAdvice: string;
  teenRight: string;
  avoidThis: string;
}

export interface AndeanFamilyContext {
  id: string;
  title: string;
  culture: 'Quechua' | 'Aymara' | 'Amazónica' | 'Rural' | 'Migrante Urbano';
  quote: string;
  culturalValue: string;
  dailySituation: string;
  empatheticResolution: string;
}

export interface AndeanMaternalHealthIndicator {
  country: string;
  flag: string;
  prenatalCoverage: number | null; // % (N/D for Chile)
  trainedBirthAttendant: number; // %
  modernContraceptives: number; // %
  familyPlanningDemandSatisfied: number; // %
  maternalMortalityRatio: number; // per 100k NV
  adolescentFertilityRate: number; // per 1k
  earlyPrenatalFirstTrimesterCategory: '≥80%' | '<80%' | '<50%';
  fourPlusPrenatalCategory: '>80%' | '<70%' | '70-80%';
  healthExpenditureRelation: string;
  statusNote: string;
}

export interface RegionalHealthInsight {
  title: string;
  indicatorName: string;
  analysis: string;
  keyTakeaway: string;
  lacContext: string;
}

export interface StaffTrainingModule {
  id: string;
  title: string;
  targetRoles: string[];
  guidelines: {
    title: string;
    detail: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export interface TrainingModule {
  id: string;
  title: string;
  targetRole: 'Salud' | 'Docentes' | 'Trabajo Social' | 'Familias Líderes';
  duration: string;
  modulesCount: number;
  description: string;
  keyProtocols: string[];
  legalNorms: string[];
  completed: boolean;
}

export interface UserProfile {
  id: string;
  username: string; // Seudónimo
  displayName: string;
  age: number;
  birthDate: string;
  avatarIcon: string;
  avatarColor: string;
  interests: string[];
  isGuest: boolean;
  createdAt: string;
  xp: number;
  streak: number;
  lastActiveDate: string;
  unlockedBadgeIds: string[];
  completedChallengeIds: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
}

export type SupportedLanguage = 'es' | 'qu' | 'ay' | 'ash';
export interface AppointmentReminder {
  id: string;
  title: string;
  category: 'orientacion_salud' | 'metodo_anticonceptivo' | 'control_medico' | 'apoyo_psicologico' | 'seguimiento_caso';
  facilityName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  notes?: string;
  reminderAdvanceMinutes: number; // e.g. 15, 60, 1440 (1 day)
  isCompleted: boolean;
  createdAt: string;
}

export interface NaviProactiveTip {
  id: string;
  title: string;
  body: string;
  tag: string;
  category: 'derechos' | 'metodos' | 'prevencion' | 'bienestar';
}


