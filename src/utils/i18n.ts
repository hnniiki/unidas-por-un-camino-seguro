export type SupportedLanguage = 'es' | 'qu' | 'ay' | 'ash' | 'en';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  region: string;
  flagEmoji: string;
  badgeText: string;
  greeting: string;
  speechLang: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'es',
    name: 'Español',
    nativeName: 'Español',
    region: 'Castellano Andino y Latinoamericano',
    flagEmoji: '🇵🇪',
    badgeText: 'Predeterminado',
    greeting: '¡Bienvenido/a a un camino seguro!',
    speechLang: 'es-ES'
  },
  {
    code: 'qu',
    name: 'Quechua',
    nativeName: 'Runasimi (Qusqu-Qullaw / Chanka)',
    region: 'Lengua Nativa Andina (Perú, Bolivia, Ecuador)',
    flagEmoji: '🏔️',
    badgeText: 'Allin Kawsay',
    greeting: 'Allillanchu! Hamuykuy allin ñanman, kawsayninchikta waqaychanapaq.',
    speechLang: 'es-PE'
  },
  {
    code: 'ay',
    name: 'Aymara',
    nativeName: 'Aymar aru',
    region: 'Lengua Nativa del Altiplano (Bolivia, Perú, Chile)',
    flagEmoji: '🌾',
    badgeText: 'Suma Qamaña',
    greeting: 'Kamisaraki! Purintati suma thakhi sarantañataki.',
    speechLang: 'es-BO'
  },
  {
    code: 'ash',
    name: 'Asháninka',
    nativeName: 'Asháninka (Nanejetsi)',
    region: 'Lengua Nativa Amazónica (Selva Central del Perú)',
    flagEmoji: '🌿',
    badgeText: 'Kametsa Asaiki',
    greeting: 'Kitaiteri! Piñaatsiri kametsa amitsakotantsi aneañaji.',
    speechLang: 'es-PE'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    region: 'International Language',
    flagEmoji: '🌐',
    badgeText: 'International',
    greeting: 'Welcome to Safe Journey! Youth empowerment & maternal wellbeing.',
    speechLang: 'en-US'
  }
];

export interface TranslationDict {
  welcomeModalTitle: string;
  welcomeModalSubtitle: string;
  chooseLanguage: string;
  enterPlatform: string;
  rememberChoice: string;
  changeLanguageAnytime: string;
  navInicio: string;
  navFamilias: string;
  navMitos: string;
  navBienestar: string;
  navRuta: string;
  navMap: string;
  navRecursos: string;
  navNosotras: string;
  navJuegos: string;
  navSeguimiento: string;
  navCapacitacion: string;
  navPreguntas: string;
  navMore: string;
  talkToNavi: string;
  audioReaderActive: string;
  audioReaderInactive: string;
  streakText: string;
  xpText: string;
  emergencyBannerText: string;
  emergencyHotlinesTitle: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  statOneInFiveTitle: string;
  statOneInFiveDesc: string;
  statSource: string;
  naviIntroSpeech: string;
  nativeLanguagesBadge: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDict> = {
  es: {
    welcomeModalTitle: "Selecciona tu Idioma o Lengua Nativa",
    welcomeModalSubtitle: "Queremos que tú y tu familia accedan a información clara, segura y respetuosa en su propia lengua.",
    chooseLanguage: "Elige una opción para continuar:",
    enterPlatform: "Ingresar a la Plataforma",
    rememberChoice: "Guardar preferencia en este dispositivo",
    changeLanguageAnytime: "Podrás cambiar de idioma en cualquier momento desde la barra superior.",
    navInicio: "Inicio",
    navFamilias: "Familias & Hijos",
    navMitos: "Mitos & Realidades",
    navBienestar: "Bienestar & Redes",
    navRuta: "Ruta de Atención",
    navMap: "Mapa Seguro & Reportes",
    navRecursos: "Guías & Recursos",
    navNosotras: "Sobre Nosotras 💗",
    navJuegos: "Juegos & Retos",
    navSeguimiento: "Seguimiento de Casos",
    navCapacitacion: "Capacitación Profesional",
    navPreguntas: "Dudas y Preguntas Anónimas",
    navMore: "Más Recursos",
    talkToNavi: "Hablar con Navi",
    audioReaderActive: "Detener lectura accesible",
    audioReaderInactive: "Activar lectura accesible",
    streakText: "d racha",
    xpText: "XP",
    emergencyBannerText: "Líneas de ayuda gratuitas y confidenciales 24/7 en la región andina:",
    emergencyHotlinesTitle: "Canales de Emergencia y Denuncia Inmediata",
    heroBadge: "Guía de Prevención y Bienestar Juvenil",
    heroTitle: "Unidas por un Camino Seguro",
    heroSubtitle: "Educación integral, diálogo en familia, salud sexual y bienestar emocional para prevenir el embarazo adolescente en la región andina.",
    statOneInFiveTitle: "1 de cada 5 adolescentes",
    statOneInFiveDesc: "En nuestra región queda embarazada antes de terminar el colegio. Hablar en casa y en su lengua materna previene y protege.",
    statSource: "Fuente: PLANEA / UNICEF / OPS / INEI / ORAS-CONHU",
    naviIntroSpeech: "Bienvenida a Unidas por un camino seguro. Soy Navi, tu búho consejero para prevenir el embarazo no planificado, resolver dudas y cuidar tu futuro.",
    nativeLanguagesBadge: "Lenguas Nativas e Inglés Disponibles"
  },
  qu: {
    welcomeModalTitle: "Akllay rimayniykita (Lengua Nativa)",
    welcomeModalSubtitle: "Qamwan aylluykiwan allin yachaykunata chaskinkichik, sumaq kawsaypi, kikin simiykipi.",
    chooseLanguage: "Huk simita akllay yaykunaykipaq:",
    enterPlatform: "Yaykuy Ñanman (Ingresar)",
    rememberChoice: "Kay rimayta waqaychay kay dispositivopi",
    changeLanguageAnytime: "Ima pachapas simita tikrayta atinki hanaq kaq barramanta.",
    navInicio: "Qallariy (Inicio)",
    navFamilias: "Ayllukuna & Wawakuna",
    navMitos: "Pantaykuna & Chiqap",
    navBienestar: "Allin Kawsay & Llikakuna",
    navRuta: "Qhali Kay Ñan",
    navMap: "Ñan Saywiti & Willaykuna",
    navRecursos: "Yachay Qillqakuna",
    navNosotras: "Ñuqaykumanta (Nosotras) 💗",
    navJuegos: "Pukllaykuna & Atipaykuna",
    navSeguimiento: "Kasukuna Qatiy",
    navCapacitacion: "Yachachiqkuna Yachay",
    navPreguntas: "Pakasqa Tapukuykuna",
    navMore: "Aswan Yachaykuna",
    talkToNavi: "Navi-wan rimay",
    audioReaderActive: "Uyarinata sayachiy",
    audioReaderInactive: "Uyarinata kichariy (Audio)",
    streakText: "p'unchaw",
    xpText: "XP Yachay",
    emergencyBannerText: "Yanapakuy llikakuna mana qullqillapaq 24/7 suyunchikpi:",
    emergencyHotlinesTitle: "Usqhaylla Yanapakuy Waqyaykuna",
    heroBadge: "Sumaq Kawsaypaq Yachaykuna",
    heroTitle: "Kuskanchis Allin Ñanpi (Unidas)",
    heroSubtitle: "Yachay, ayllupi rimanakuy, qhali kawsay wawakunata amachanapaq, mana munasqa chichu kayta hark'anapaq.",
    statOneInFiveTitle: "Pichqamanta huk sipas (1 de cada 5)",
    statOneInFiveDesc: "Suyunchikpi yachay wasita manaraq tukuspa wiksallikunku. Wasipi kikin siminchikpi rimayqa amachanmi.",
    statSource: "Pukyu: PLANEA / UNICEF / OPS / INEI / ORAS-CONHU",
    naviIntroSpeech: "Allillanchu! Ñuqam kani Navi, yuyaysapa ch'useqa. Hamuykuy allin ñanman kawsayninchikta waqaychanapaq.",
    nativeLanguagesBadge: "Runasimi / Allin Kawsay"
  },
  ay: {
    welcomeModalTitle: "Aru ajllt'asiñani (Lengua Aymara)",
    welcomeModalSubtitle: "Jumanaka familiampi suma yatichäwinak qillqatanaka ch'amanchañataki kikin arusanxa.",
    chooseLanguage: "Mä aru ajllt'am mantantañataki:",
    enterPlatform: "Mantantañani (Ingresar)",
    rememberChoice: "Aka arunxa imañani aka aparatona",
    changeLanguageAnytime: "Kunapachas mayjt'ayasmawa alayxankir barana.",
    navInicio: "Qalltawi (Inicio)",
    navFamilias: "Wila Masinaka & Wawanaka",
    navMitos: "Armatanaka & Chiqa",
    navBienestar: "Suma Qamaña & Ch'amanchawi",
    navRuta: "Qullaña Thakhi",
    navMap: "Qullaña Saywita",
    navRecursos: "Yatichäwi Qillqatanaka",
    navNosotras: "Nanakanxata (Nosotras) 💗",
    navJuegos: "Anatäwinaka & Yant'awinaka",
    navSeguimiento: "Yatiyäwinak arknaqaña",
    navCapacitacion: "Yatichirinakataki",
    navPreguntas: "Imantata Jiskt'anaka",
    navMore: "Juk'amp Yatiyawinaka",
    talkToNavi: "Navi-mpi aruskipam",
    audioReaderActive: "Ist'awi sayt'ayaña",
    audioReaderInactive: "Ist'awi naktayaña (Audio)",
    streakText: "uru",
    xpText: "XP Ch'ama",
    emergencyBannerText: "Yanapiri llikanaka inaki 24/7 markasanxa:",
    emergencyHotlinesTitle: "Jank'aki Yanapiri Telefononaka",
    heroBadge: "Wayn tawaqutaki Suma Yatichäwi",
    heroTitle: "Mä Suma Thakhi Mayacht'ata (Unidas)",
    heroSubtitle: "Aylluna aruskipawi, suma qamaña wawanakan jakäwipa jark'aqañataki jan walt'awinakata.",
    statOneInFiveTitle: "Phisqata mayni tawaqu (1 de cada 5)",
    statOneInFiveDesc: "Markasanxa yatiqaña wasita jan tukuyasa usurit uñjasi. Utana aruskipawix jark'aqañawa.",
    statSource: "Fuente: PLANEA / UNICEF / OPS / INEI / ORAS-CONHU",
    naviIntroSpeech: "Kamisaraki! Nayan sutijax Navi satatwa. Purintati suma thakhi sarantañataki.",
    nativeLanguagesBadge: "Aymar Aru / Suma Qamaña"
  },
  ash: {
    welcomeModalTitle: "Pikowakote añane (Asháninka)",
    welcomeModalSubtitle: "Kametsa pikemakotantyari pishaninkapee, pitsipatakotero pañane ashaninka.",
    chooseLanguage: "Piñeero apaniro añane pinkinanteari:",
    enterPlatform: "Pinkinante (Ingresar)",
    rememberChoice: "Pamine aka añane aka",
    changeLanguageAnytime: "Poshiyatajero pañane kapichaji.",
    navInicio: "Kenkitsarentsi (Inicio)",
    navFamilias: "Ahaninkapee & Eentsipee",
    navMitos: "Tsipetantsi & Kyaariperori",
    navBienestar: "Kametsa Asaiki & Amitakotanentsi",
    navRuta: "Antameta Oshirentsi",
    navMap: "Saywite & Kenkitsatantsi",
    navRecursos: "Yotanentsipee",
    navNosotras: "Aroka (Sobre Nosotras) 💗",
    navJuegos: "Manaantsipee & Yotanentsi",
    navSeguimiento: "Kenkitsatsaantsi",
    navCapacitacion: "Yometantatsiri",
    navPreguntas: "Oserinkantsipee",
    navMore: "Pashini Yotanentsi",
    talkToNavi: "Piñaate Navi",
    audioReaderActive: "Pitsonkero kemantsi",
    audioReaderInactive: "Pinkeme kemantsi (Audio)",
    streakText: "kitaiteri",
    xpText: "XP",
    emergencyBannerText: "Amitakotantsi tekatsi ipinatyaa 24/7 tsikikayeta:",
    emergencyHotlinesTitle: "Phone Kemisantatsiri Shiramparintsi",
    heroBadge: "Kametsa Añantsi Eentsipeetaki",
    heroTitle: "Tsipatakarori Kametsa Añantsi",
    heroSubtitle: "Yotanentsi, kenkitsatantsi ahaninkapeeki amitsakoteroni evankaripee.",
    statOneInFiveTitle: "Aparoni paboroqui (1 de cada 5)",
    statOneInFiveDesc: "Evankaripee omonkaratairo eentsi tekeraari yotanentsi omonkarate. Ahaninkapeeki akowaakotero.",
    statSource: "Fuente: PLANEA / UNICEF / OPS / INEI / ORAS-CONHU",
    naviIntroSpeech: "Kitaiteri! Naro Navi. Piñaatsiri kametsa amitsakotantsi aneañaji.",
    nativeLanguagesBadge: "Asháninka / Selva Central"
  },
  en: {
    welcomeModalTitle: "Select your Language / Native Tongue",
    welcomeModalSubtitle: "Access clear, respectful, and evidence-based guidance on adolescent wellbeing and teenage pregnancy prevention.",
    chooseLanguage: "Choose a language to continue:",
    enterPlatform: "Enter Platform",
    rememberChoice: "Remember my preference on this device",
    changeLanguageAnytime: "You can change language anytime from the top navigation bar.",
    navInicio: "Home",
    navFamilias: "Families & Youth",
    navMitos: "Myths & Realities",
    navBienestar: "Wellbeing & Networks",
    navRuta: "Healthcare Route",
    navMap: "Safety Map & Reports",
    navRecursos: "Guides & Resources",
    navNosotras: "About Us 💗",
    navJuegos: "Games & Challenges",
    navSeguimiento: "Case Tracking",
    navCapacitacion: "Professional Training",
    navPreguntas: "Anonymous Questions",
    navMore: "More Resources",
    talkToNavi: "Talk with Navi",
    audioReaderActive: "Stop audio reader",
    audioReaderInactive: "Activate accessible reader",
    streakText: "d streak",
    xpText: "XP",
    emergencyBannerText: "Free and confidential 24/7 emergency hotlines across the Andean region:",
    emergencyHotlinesTitle: "Immediate Emergency & Reporting Hotlines",
    heroBadge: "Youth Wellbeing & Prevention Guide",
    heroTitle: "United for a Safe Journey",
    heroSubtitle: "Comprehensive education, family dialogue, sexual health, and emotional wellbeing to prevent teenage pregnancy in the Andean region.",
    statOneInFiveTitle: "1 in 5 adolescent girls",
    statOneInFiveDesc: "In our region becomes pregnant before finishing school. Talking at home in your native language empowers and protects.",
    statSource: "Source: PLANEA / UNICEF / PAHO / INEI / ORAS-CONHU",
    naviIntroSpeech: "Welcome to United for a Safe Journey. I am Navi, your owl counselor for youth wellbeing and informed decision-making.",
    nativeLanguagesBadge: "Native Languages & English Available"
  }
};
