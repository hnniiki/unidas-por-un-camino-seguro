export interface SafetyPoint {
  id: string;
  title: string;
  category: 'safe_point' | 'risk_point' | 'service_point' | 'community_alert';
  type: 'posta_salud' | 'centro_emergencia_mujer' | 'demuna' | 'comisaria' | 'zona_insegura' | 'acoso_callejero' | 'alumbrado_deficiente' | 'punto_vigilado';
  latitude: number;
  longitude: number;
  city: string;
  department: string;
  address: string;
  description: string;
  phone?: string;
  schedule?: string;
  verified: boolean;
  upvotes: number;
  reportsCount: number;
  severity?: 'baja' | 'media' | 'alta' | 'seguro';
  tags: string[];
  createdAt: string;
  servicesOffered?: string[];
}

export interface CitizenReportInput {
  title: string;
  category: 'safe_point' | 'risk_point' | 'community_alert';
  type: string;
  latitude: number;
  longitude: number;
  city: string;
  department: string;
  address: string;
  description: string;
  severity: 'baja' | 'media' | 'alta' | 'seguro';
  anonymous: boolean;
  reporterAlias?: string;
}

export interface EducationalInfographic {
  id: string;
  title: string;
  category: 'prevencion' | 'derechos' | 'emergencia_72h' | 'anticoncepcion' | 'dialogo_familiar' | 'seguridad_callejera';
  categoryLabel: string;
  description: string;
  readTime: string;
  tags: string[];
  bulletPoints: string[];
  keyProtocol: string;
  authoritativeSource: string;
  hotlineEmergency?: string;
  downloadFilename: string;
  badgeColor: string;
  steps: {
    number: number;
    title: string;
    description: string;
    tip: string;
  }[];
}
