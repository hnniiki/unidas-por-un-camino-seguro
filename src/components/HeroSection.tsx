import React from 'react';
import { NaviMascot } from './NaviMascot';
import { 
  MessageCircle, 
  Shirt,
  ShieldCheck, 
  HelpCircle, 
  Users, 
  Sparkles, 
  HeartHandshake, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Volume2,
  Languages,
  UserPlus,
  User,
  Flame,
  MapPin,
  BookOpen,
  Compass,
  Heart,
  GraduationCap
} from 'lucide-react';
import { speechService } from '../utils/speech';
import { SupportedLanguage, TRANSLATIONS, SUPPORTED_LANGUAGES } from '../utils/i18n';
import { UserProfile } from '../types';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  onOpenChat: () => void;
  darkMode: boolean;
  currentLanguage?: SupportedLanguage;
  onOpenLanguageModal?: () => void;
  currentUser?: UserProfile | null;
  onOpenAuthModal?: (mode?: 'register' | 'login') => void;
  onOpenProfileModal?: () => void;
  onOpenWardrobeModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenChat,
  darkMode,
  currentLanguage = 'es',
  onOpenLanguageModal,
  currentUser,
  onOpenAuthModal,
  onOpenProfileModal,
  onOpenWardrobeModal
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.es;
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const handleReadIntro = () => {
    speechService.speak(
      t.naviIntroSpeech,
      currentLangObj.speechLang,
      1.0
    );
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative background blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-brand-lilac/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Main Hero Card */}
        <div className={`rounded-3xl p-6 sm:p-10 border transition-all ${
          darkMode 
            ? 'bg-[#3C223F] border-brand-slate/60 text-white shadow-2xl' 
            : 'bg-white border-brand-soft/80 text-[#2D1A30] shadow-xl'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Hero Message & Mission */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Motto Tag & Native Language Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 bg-brand-soft/40 border border-brand-lilac/50 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-brand-plum">
                  <Sparkles className="w-4 h-4 text-brand-plum animate-spin" style={{ animationDuration: '6s' }} />
                  <span>{t.heroBadge}</span>
                </div>

                <button
                  type="button"
                  onClick={onOpenLanguageModal}
                  className="inline-flex items-center gap-1.5 bg-brand-plum/10 dark:bg-brand-plum/40 hover:bg-brand-plum/20 border border-brand-lilac px-3 py-1.5 rounded-full text-xs font-bold text-brand-plum dark:text-brand-soft transition"
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>{currentLangObj.flagEmoji} {currentLangObj.nativeName}</span>
                </button>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  {t.heroTitle}
                </h1>
                <p className={`text-base sm:text-lg leading-relaxed ${
                  darkMode ? 'text-stone-200' : 'text-stone-700'
                }`}>
                  {t.heroSubtitle}
                </p>
              </div>

              {/* Navi Mascot Motto Callout */}
              <div className="p-4 rounded-2xl bg-brand-plum text-white border border-brand-lilac/40 relative shadow-inner">
                <div className="flex items-start gap-3.5">
                  <div className="flex-shrink-0 mt-0.5">
                    <NaviMascot size="sm" showBadge={false} animated={false} />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-soft block">
                      Mensaje de Navi:
                    </span>
                    <p className="text-sm sm:text-base font-bold text-white italic mt-0.5">
                      “¿Tienes una duda? Suéltala. Navi no te va a mirar raro.”
                    </p>
                    <p className="text-xs text-purple-100 mt-1">
                      Pregúntame sobre métodos anticonceptivos, mitos, consentimiento, cambios de tu cuerpo o qué hacer ante una emergencia.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="btn-hero-chat"
                  onClick={onOpenChat}
                  className="bg-brand-plum hover:bg-brand-slate text-white font-extrabold px-6 py-3 rounded-xl text-sm transition shadow-lg hover:shadow-xl flex items-center gap-2 transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-brand-lilac" />
                  <span>Pregúntale a Navi ahora</span>
                </button>

                {currentUser && !currentUser.isGuest ? (
                  <button
                    id="btn-hero-profile"
                    onClick={onOpenProfileModal}
                    className="bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-950 dark:text-amber-200 font-extrabold px-5 py-3 rounded-xl text-sm transition border border-amber-300 dark:border-amber-700 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Mi Espacio (@{currentUser.username})</span>
                  </button>
                ) : (
                  <button
                    id="btn-hero-create-account"
                    onClick={() => onOpenAuthModal && onOpenAuthModal('register')}
                    className="bg-gradient-to-r from-[#4B2E4F] to-[#7A6786] hover:opacity-90 text-white font-black px-5 py-3 rounded-xl text-sm transition shadow-md flex items-center gap-2 active:scale-95"
                  >
                    <UserPlus className="w-4 h-4 text-amber-300" />
                    <span>Crear una cuenta</span>
                  </button>
                )}

                <button
                  id="btn-hero-families"
                  onClick={() => onNavigate('familias')}
                  className="bg-brand-lilac/30 hover:bg-brand-lilac/50 text-brand-plum font-bold px-5 py-3 rounded-xl text-sm transition border border-brand-lilac/60 flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Guía para Familias</span>
                </button>

                <button
                  id="btn-hero-navi-wardrobe"
                  onClick={onOpenWardrobeModal}
                  className="bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-950 dark:text-amber-200 font-bold px-5 py-3 rounded-xl text-sm transition border border-amber-300 dark:border-amber-700 flex items-center gap-2"
                >
                  <Shirt className="w-4 h-4" />
                  <span>Personaliza a Navi</span>
                </button>

                <button
                  id="btn-hero-audio"
                  onClick={handleReadIntro}
                  className="p-3 rounded-xl bg-brand-soft/30 hover:bg-brand-soft text-brand-plum transition border border-brand-lilac/40"
                  title="Escuchar introducción"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Mini Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-brand-lilac/20 text-xs font-medium">
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>100% Anónimo y Seguro</span>
                </div>
                <div className="flex items-center gap-1.5 text-brand-slate dark:text-brand-soft">
                  <HeartHandshake className="w-4 h-4 flex-shrink-0" />
                  <span>Basado en Evidencia Científica</span>
                </div>
                <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>Protección Legal y Rutas de Apoyo</span>
                </div>
              </div>
            </div>

            {/* Right Col: Navi Mascot Interactive Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className={`w-full max-w-sm rounded-2xl p-6 border text-center relative ${
                darkMode ? 'bg-[#2A142D] border-[#5A3462]' : 'bg-purple-50/70 border-purple-200/80'
              }`}>
                {/* Floating Mascot */}
                <div className="cursor-pointer" onClick={onOpenChat} title="¡Haz clic para chatear con Navi!">
                  <NaviMascot size="hero" mood="happy" />
                </div>

                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-black text-brand-plum dark:text-white">
                    ¡Hola! Soy Navi 🦉
                  </h3>
                  <p className="text-xs text-stone-700 dark:text-stone-200 leading-relaxed font-medium">
                    Tu búho consejero de confianza. Estoy aquí para aclarar todas tus dudas con respeto, ciencia y sin juzgarte nunca.
                  </p>
                </div>

                <button
                  onClick={onOpenChat}
                  className="mt-4 w-full bg-[#421D46] hover:bg-[#58275D] text-white font-extrabold py-2.5 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Iniciar conversación confidencial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Action Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          
          {/* Card 1: Familias */}
          <div 
            id="card-quick-familias"
            onClick={() => onNavigate('familias')}
            className={`p-5 rounded-2xl border cursor-pointer group transition-all duration-300 hover:-translate-y-1 ${
              darkMode ? 'bg-[#3C223F] border-[#6D4C72] hover:border-amber-400' : 'bg-white border-stone-200 hover:border-[#4B2E4F] shadow-sm hover:shadow-md'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#4B2E4F] dark:bg-[#5B3760] text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition shadow-inner">
              <Users className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="font-black text-base text-[#3B1F3D] dark:text-white group-hover:text-[#4B2E4F] dark:group-hover:text-amber-300 transition">
              Diálogo Familiar
            </h3>
            <p className="text-xs text-stone-700 dark:text-stone-200 mt-1 leading-relaxed">
              Guías por edad: cómo hablar de cambios, límites, afecto y proyecto de vida sin tabúes.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-black text-[#4B2E4F] dark:text-amber-300 mt-3 group-hover:underline">
              Ver guías por edad <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Card 2: Mitos y Realidades */}
          <div 
            id="card-quick-mitos"
            onClick={() => onNavigate('mitos')}
            className={`p-5 rounded-2xl border cursor-pointer group transition-all duration-300 hover:-translate-y-1 ${
              darkMode ? 'bg-[#3C223F] border-[#6D4C72] hover:border-amber-400' : 'bg-white border-stone-200 hover:border-[#4B2E4F] shadow-sm hover:shadow-md'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#4B2E4F] dark:bg-[#5B3760] text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition shadow-inner">
              <HelpCircle className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="font-black text-base text-[#3B1F3D] dark:text-white group-hover:text-[#4B2E4F] dark:group-hover:text-amber-300 transition">
              Mitos & Realidades
            </h3>
            <p className="text-xs text-stone-700 dark:text-stone-200 mt-1 leading-relaxed">
              Desmentimos falsas creencias sobre anticoncepción, primera vez, fertilidad y pastilla del día siguiente.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-black text-[#4B2E4F] dark:text-amber-300 mt-3 group-hover:underline">
              Explorar mitos <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Card 3: Bienestar Emocional y Redes Seguras */}
          <div 
            id="card-quick-derechos"
            onClick={() => onNavigate('derechos')}
            className={`p-5 rounded-2xl border cursor-pointer group transition-all duration-300 hover:-translate-y-1 ${
              darkMode ? 'bg-[#3C223F] border-[#6D4C72] hover:border-amber-400' : 'bg-white border-stone-200 hover:border-[#4B2E4F] shadow-sm hover:shadow-md'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#4B2E4F] dark:bg-[#5B3760] text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition shadow-inner">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-black text-base text-[#3B1F3D] dark:text-white group-hover:text-[#4B2E4F] dark:group-hover:text-amber-300 transition">
                Bienestar & Redes
              </h3>
              <span className="bg-amber-400 text-stone-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                Foco Central
              </span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-200 mt-1 leading-relaxed">
              Manejo de presión de grupo, autoestima, cifras andinas (1 de cada 5) y cómo acompañar a servicios de salud.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-black text-[#4B2E4F] dark:text-amber-300 mt-3 group-hover:underline">
              Explorar bienestar y redes <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Card 4: Ruta de Atención */}
          <div 
            id="card-quick-ruta"
            onClick={() => onNavigate('ruta')}
            className={`p-5 rounded-2xl border cursor-pointer group transition-all duration-300 hover:-translate-y-1 ${
              darkMode ? 'bg-[#3C223F] border-[#6D4C72] hover:border-amber-400' : 'bg-white border-stone-200 hover:border-[#4B2E4F] shadow-sm hover:shadow-md'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#4B2E4F] dark:bg-[#5B3760] text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition shadow-inner">
              <HeartHandshake className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="font-black text-base text-[#3B1F3D] dark:text-white group-hover:text-[#4B2E4F] dark:group-hover:text-amber-300 transition">
              Servicios Amigables
            </h3>
            <p className="text-xs text-stone-700 dark:text-stone-200 mt-1 leading-relaxed">
              A dónde acudir: postas amigables, Centros Emergencia Mujer (CEM) y DEMUNA sin costo ni estigma.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-black text-[#4B2E4F] dark:text-amber-300 mt-3 group-hover:underline">
              Ver rutas de atención <ArrowRight className="w-3 h-3" />
            </span>
          </div>

        </div>

        {/* Highlighted Banner for Citizen Map, PDF Resources & About Founders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div 
            onClick={() => onNavigate('mapa')}
            className={`p-5 rounded-2xl border cursor-pointer group transition-all duration-300 hover:-translate-y-1 flex items-center justify-between gap-4 ${
              darkMode ? 'bg-gradient-to-r from-[#3A1F3D] to-[#2B142D] border-amber-400/40 hover:border-amber-400' : 'bg-amber-50/70 border-amber-200 hover:border-amber-400 shadow-sm'
            }`}
          >
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black uppercase">
                <Compass className="w-3 h-3" />
                <span>Interactiva</span>
              </div>
              <h4 className="font-black text-sm text-[#3B1F3D] dark:text-white">
                Mapa Seguro & Reportes
              </h4>
              <p className="text-xs text-stone-700 dark:text-stone-300">
                Puntos amigables, CEM y alertas comunitarias anónimas.
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#4B2E4F] text-amber-300 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition shadow-sm">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div 
            onClick={() => onNavigate('recursos')}
            className={`p-5 rounded-2xl border cursor-pointer group transition-all duration-300 hover:-translate-y-1 flex items-center justify-between gap-4 ${
              darkMode ? 'bg-gradient-to-r from-[#2B1B38] to-[#1E1128] border-purple-400/40 hover:border-purple-400' : 'bg-purple-50/70 border-purple-200 hover:border-purple-400 shadow-sm'
            }`}
          >
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#4B2E4F] text-amber-300 text-[10px] font-black uppercase">
                <BookOpen className="w-3 h-3" />
                <span>PDF Descargables</span>
              </div>
              <h4 className="font-black text-sm text-[#3B1F3D] dark:text-white">
                Guías Rápidas Oficiales
              </h4>
              <p className="text-xs text-stone-700 dark:text-stone-300">
                Afiches pedagógicos y protocolo de 72h listos para imprimir.
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#4B2E4F] text-amber-300 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition shadow-sm">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div 
            onClick={() => onNavigate('nosotras')}
            className={`p-5 rounded-2xl border cursor-pointer group transition-all duration-300 hover:-translate-y-1 flex items-center justify-between gap-4 ${
              darkMode ? 'bg-gradient-to-r from-[#3B1C33] to-[#250F22] border-pink-400/40 hover:border-pink-400' : 'bg-pink-50/70 border-pink-200 hover:border-pink-400 shadow-sm'
            }`}
          >
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-pink-500 text-white text-[10px] font-black uppercase">
                <Heart className="w-3 h-3" />
                <span>Fundadoras 5.° Sec</span>
              </div>
              <h4 className="font-black text-sm text-[#3B1F3D] dark:text-white">
                Sobre Nosotras 💗
              </h4>
              <p className="text-xs text-stone-700 dark:text-stone-300">
                Nikolle Mendoza & Alexandra Ramos, líderes escolares.
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-pink-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition shadow-sm">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
