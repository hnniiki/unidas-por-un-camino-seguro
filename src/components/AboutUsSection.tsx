import React from 'react';
import { 
  GraduationCap, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Users, 
  Target, 
  Award, 
  Volume2, 
  ArrowRight, 
  Lightbulb, 
  CheckCircle2, 
  Flower2, 
  Share2 
} from 'lucide-react';
import { speechService } from '../utils/speech';

interface AboutUsSectionProps {
  darkMode: boolean;
  onNavigate?: (tab: string) => void;
  onOpenChat?: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  darkMode,
  onNavigate,
  onOpenChat
}) => {
  const manifestoSpeech = "Somos Nikolle Mendoza y Alexandra Ramos, estudiantes de 5.º de secundaria y fundadoras de Unidas por un Camino Seguro. Creamos este espacio con el propósito de brindar información, promover la prevención y ayudar a que más adolescentes puedan tomar decisiones responsables, informadas y seguras para construir su futuro.";

  const handleSpeech = (text: string) => {
    speechService.speak(text);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Sobre Nosotras - Unidas por un Camino Seguro',
        text: 'Conoce la iniciativa fundada por Nikolle Mendoza y Alexandra Ramos, estudiantes de 5.° de secundaria para la prevención y el bienestar juvenil.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Top Hero Banner */}
      <section 
        id="about-hero-section"
        
        className={`rounded-3xl p-6 sm:p-10 border relative overflow-hidden transition-all duration-300 ${
          darkMode 
            ? 'bg-gradient-to-br from-[#3C223F] via-[#2D1630] to-[#1F0E22] border-brand-slate text-white shadow-xl' 
            : 'bg-gradient-to-br from-[#FAF5FC] via-[#F3EBF7] to-[#ECE0F0] border-purple-200 text-[#2D1432] shadow-sm'
        }`}
      >
        {/* Background decorative ambient lights */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#A58DB5]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[#7A6786]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#4B2E4F] text-amber-300 dark:bg-[#5B3760] px-3.5 py-1.5 rounded-full text-xs font-black shadow-xs">
              <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Liderazgo Juvenil, Innovación Social & Futuro</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4B2E4F] dark:text-white tracking-tight leading-tight">
              Sobre Nosotras
            </h1>
            
            <p className="text-sm sm:text-base text-[#4B2E4F]/90 dark:text-stone-200 leading-relaxed font-medium">
              Conoce la historia, el propósito y la visión detrás de <strong className="text-[#4B2E4F] dark:text-amber-300">Unidas por un Camino Seguro</strong>, un proyecto escolar y social creado por y para adolescentes que transforma la educación sexual y la prevención en herramientas de empoderamiento.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => handleSpeech(manifestoSpeech)}
              id="speech-about-manifesto-btn"
              title="Escuchar manifiesto fundacional"
              className="px-4 py-3 rounded-2xl bg-white dark:bg-stone-800 text-[#4B2E4F] dark:text-amber-300 border border-brand-soft dark:border-stone-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition hover:scale-105 shadow-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-[#7A6786] dark:text-amber-300" />
              <span>Escuchar Manifiesto</span>
            </button>
            <button
              onClick={handleShare}
              id="share-about-page-btn"
              title="Compartir esta iniciativa"
              className="p-3 rounded-2xl bg-[#4B2E4F] hover:bg-[#5D3862] text-amber-300 transition hover:scale-105 shadow-md cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Presentation Quote Card */}
        <div className={`mt-8 p-6 sm:p-8 rounded-3xl border relative transition-all duration-300 ${
          darkMode 
            ? 'bg-[#351C37]/90 border-brand-slate text-white shadow-inner' 
            : 'bg-white/95 backdrop-blur-sm border-brand-soft text-[#4B2E4F] shadow-sm'
        }`}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#4B2E4F] text-amber-300 flex items-center justify-center flex-shrink-0 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-3 flex-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#7A6786] dark:text-amber-300">
                Nuestra Declaración Fundacional
              </span>
              <blockquote className="text-base sm:text-lg lg:text-xl font-bold leading-relaxed text-[#4B2E4F] dark:text-amber-100 italic">
                “Somos Nikolle Mendoza y Alexandra Ramos, estudiantes de 5.º de secundaria y fundadoras de Unidas por un Camino Seguro. Creamos este espacio con el propósito de brindar información, promover la prevención y ayudar a que más adolescentes puedan tomar decisiones responsables, informadas y seguras para construir su futuro.”
              </blockquote>
              
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9E3DC] dark:bg-[#4B2E4F]/80 text-[#4B2E4F] dark:text-amber-200 text-xs font-bold border border-brand-soft/60">
                  <Flower2 className="w-3.5 h-3.5 text-[#7A6786] dark:text-amber-300" /> 5.º Año de Secundaria
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9E3DC] dark:bg-[#4B2E4F]/80 text-[#4B2E4F] dark:text-amber-200 text-xs font-bold border border-brand-soft/60">
                  <Heart className="w-3.5 h-3.5 text-[#7A6786] dark:text-amber-300" /> Prevención & Bienestar
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-300/60">
                  <Award className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300" /> Proyecto de Competencia & Impacto Social
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Profile Cards Grid */}
      <section id="founders-grid-section" className="space-y-4">
        <div className="text-center space-y-1.5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[#7A6786] dark:text-amber-300 text-xs font-black uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Equipo Fundador & Liderazgo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#4B2E4F] dark:text-white">
            Conoce a las Creadoras de la Iniciativa
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
            Estudiantes comprometidas en generar un impacto positivo en sus comunidades y colegios a través de la empatía y la educación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* Founder 1: Nikolle Mendoza */}
          <div 
            id="founder-card-nikolle"
            className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between ${
              darkMode 
                ? 'bg-[#351C37] border-brand-slate text-white hover:border-amber-300' 
                : 'bg-white border-brand-soft text-[#4B2E4F] hover:border-[#7A6786] shadow-md'
            }`}
          >
            {/* Top Accent Gradient Bar in Brand Palette */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#4B2E4F] via-[#7A6786] to-[#A58DB5]" />

            <div className="space-y-5">
              {/* Header with Avatar & Status */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#4B2E4F] via-[#7A6786] to-[#A58DB5] p-1 shadow-lg group-hover:scale-105 transition flex-shrink-0">
                    <div className="w-full h-full rounded-xl bg-[#E9E3DC] dark:bg-stone-900 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl sm:text-3xl">👩‍🎓</span>
                      <span className="text-[9px] font-black text-[#4B2E4F] dark:text-amber-300 uppercase">5.° Sec</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#CFC3DE]/50 dark:bg-[#4B2E4F] text-[#4B2E4F] dark:text-amber-300 border border-brand-soft dark:border-brand-slate">
                      Fundadora & Creadora
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#4B2E4F] dark:text-white mt-1">
                      Nikolle Mendoza
                    </h3>
                    <p className="text-xs font-bold text-stone-600 dark:text-stone-300 flex items-center gap-1.5 mt-0.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#7A6786] dark:text-amber-300" />
                      <span>Estudiante de 5.º de secundaria</span>
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-xl bg-[#E9E3DC] dark:bg-stone-800 text-[#4B2E4F] dark:text-amber-300 flex items-center justify-center flex-shrink-0 border border-brand-soft/50">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              {/* Founder Role & Description */}
              <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-stone-200">
                <p>
                  Impulsora del diseño conceptual, la arquitectura pedagógica y la visión inclusiva de la plataforma. Con un enfoque orientado al liderazgo transformador y la empatía adolescente, lidera la articulación de contenidos que responden a las dudas reales de las y los jóvenes.
                </p>
                
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-stone-900/60 border border-brand-soft/70 dark:border-stone-700/80 space-y-1.5">
                  <div className="text-[11px] font-black uppercase tracking-wider text-[#4B2E4F] dark:text-amber-300 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-[#7A6786] dark:text-amber-300" />
                    <span>Pilares de Liderazgo & Aporte</span>
                  </div>
                  <ul className="space-y-1 text-xs text-stone-600 dark:text-stone-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Estrategia de comunicación juvenil sin tabúes.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Integración de herramientas interactivas y recursos en PDF.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Compromiso con la equidad de género y la prevención oportuna.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quote Footer */}
            <div className="pt-4 mt-5 border-t border-brand-soft/80 dark:border-stone-700/80">
              <div className="text-xs font-semibold text-[#4B2E4F] dark:text-amber-200 italic flex items-center gap-2">
                <span>“El conocimiento es la herramienta más poderosa para decidir con libertad y seguridad.”</span>
              </div>
            </div>
          </div>

          {/* Founder 2: Alexandra Ramos */}
          <div 
            id="founder-card-alexandra"
            className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between ${
              darkMode 
                ? 'bg-[#351C37] border-brand-slate text-white hover:border-amber-300' 
                : 'bg-white border-brand-soft text-[#4B2E4F] hover:border-[#7A6786] shadow-md'
            }`}
          >
            {/* Top Accent Gradient Bar in Brand Palette */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#7A6786] via-[#A58DB5] to-[#4B2E4F]" />

            <div className="space-y-5">
              {/* Header with Avatar & Status */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#7A6786] via-[#A58DB5] to-[#4B2E4F] p-1 shadow-lg group-hover:scale-105 transition flex-shrink-0">
                    <div className="w-full h-full rounded-xl bg-[#E9E3DC] dark:bg-stone-900 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl sm:text-3xl">👩‍🎓</span>
                      <span className="text-[9px] font-black text-[#4B2E4F] dark:text-amber-300 uppercase">5.° Sec</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#CFC3DE]/50 dark:bg-[#4B2E4F] text-[#4B2E4F] dark:text-amber-300 border border-brand-soft dark:border-brand-slate">
                      Fundadora & Creadora
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#4B2E4F] dark:text-white mt-1">
                      Alexandra Ramos
                    </h3>
                    <p className="text-xs font-bold text-stone-600 dark:text-stone-300 flex items-center gap-1.5 mt-0.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#7A6786] dark:text-amber-300" />
                      <span>Estudiante de 5.º de secundaria</span>
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-xl bg-[#E9E3DC] dark:bg-stone-800 text-[#4B2E4F] dark:text-amber-300 flex items-center justify-center flex-shrink-0 border border-brand-soft/50">
                  <Heart className="w-4 h-4" />
                </div>
              </div>

              {/* Founder Role & Description */}
              <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-stone-200">
                <p>
                  Co-creadora enfocada en la investigación de derechos juveniles, rutas de atención integral y el fortalecimiento de la red de apoyo escolar y familiar. Promueve activamente espacios seguros de consulta confidencial y orientación sin juzgar.
                </p>
                
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-stone-900/60 border border-brand-soft/70 dark:border-stone-700/80 space-y-1.5">
                  <div className="text-[11px] font-black uppercase tracking-wider text-[#4B2E4F] dark:text-amber-300 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-[#7A6786] dark:text-amber-300" />
                    <span>Pilares de Liderazgo & Aporte</span>
                  </div>
                  <ul className="space-y-1 text-xs text-stone-600 dark:text-stone-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Investigación de protocolos oficiales (MINSA, MIMP, Línea 100).</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Fomento del diálogo respetuoso entre padres, docentes y adolescentes.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Diseño de dinámicas educativas para el bienestar emocional.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quote Footer */}
            <div className="pt-4 mt-5 border-t border-brand-soft/80 dark:border-stone-700/80">
              <div className="text-xs font-semibold text-[#4B2E4F] dark:text-amber-200 italic flex items-center gap-2">
                <span>“Acompañar y escuchar sin prejuicios abre caminos hacia un futuro con mejores oportunidades.”</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Core Pillars Section: Education, Prevention, Union, Future */}
      <section id="pillars-section" className="space-y-6">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#7A6786] dark:text-amber-300">
            Nuestros 4 Ejes Fundamentales
          </span>
          <h3 className="text-2xl font-black text-[#4B2E4F] dark:text-white">
            Los Valores que Guían Nuestro Proyecto
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Pillar 1: Educación */}
          <div className={`p-5 rounded-2xl border transition duration-200 hover:-translate-y-1 ${
            darkMode ? 'bg-[#351C37] border-brand-slate text-stone-200' : 'bg-white border-brand-soft text-[#4B2E4F] shadow-sm'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-[#E9E3DC] dark:bg-[#4B2E4F] text-[#4B2E4F] dark:text-amber-300 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-sm text-[#4B2E4F] dark:text-white mb-1.5">
              1. Educación
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Información clara, verídica y desmitificada, validada por fuentes científicas y adaptada al lenguaje juvenil.
            </p>
          </div>

          {/* Pillar 2: Prevención */}
          <div className={`p-5 rounded-2xl border transition duration-200 hover:-translate-y-1 ${
            darkMode ? 'bg-[#351C37] border-brand-slate text-stone-200' : 'bg-white border-brand-soft text-[#4B2E4F] shadow-sm'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-[#E9E3DC] dark:bg-[#4B2E4F] text-[#4B2E4F] dark:text-amber-300 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-sm text-[#4B2E4F] dark:text-white mb-1.5">
              2. Prevención
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Herramientas oportunas, protocolos ante emergencias, salud integral y prevención de riesgos para una vida plena.
            </p>
          </div>

          {/* Pillar 3: Unión */}
          <div className={`p-5 rounded-2xl border transition duration-200 hover:-translate-y-1 ${
            darkMode ? 'bg-[#351C37] border-brand-slate text-stone-200' : 'bg-white border-brand-soft text-[#4B2E4F] shadow-sm'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-[#E9E3DC] dark:bg-[#4B2E4F] text-[#4B2E4F] dark:text-amber-300 flex items-center justify-center mb-3">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-sm text-[#4B2E4F] dark:text-white mb-1.5">
              3. Unión
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Sororidad, apoyo entre pares y fortalecimiento del vínculo de confianza entre familias, colegios y comunidades.
            </p>
          </div>

          {/* Pillar 4: Futuro */}
          <div className={`p-5 rounded-2xl border transition duration-200 hover:-translate-y-1 ${
            darkMode ? 'bg-[#351C37] border-brand-slate text-stone-200' : 'bg-white border-brand-soft text-[#4B2E4F] shadow-sm'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-[#E9E3DC] dark:bg-[#4B2E4F] text-[#4B2E4F] dark:text-amber-300 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-sm text-[#4B2E4F] dark:text-white mb-1.5">
              4. Futuro
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Fomentar proyectos de vida sólidos, desarrollo académico y metas personales para que cada adolescente brille.
            </p>
          </div>

        </div>
      </section>

      {/* Social Impact & Innovation Metrics Bar */}
      <section 
        id="impact-metrics-section"
        className={`p-6 sm:p-8 rounded-3xl border ${
          darkMode 
            ? 'bg-[#2D1630] border-brand-slate text-white' 
            : 'bg-white border-brand-soft text-[#4B2E4F] shadow-sm'
        }`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#4B2E4F] dark:text-amber-300">
              5.° Sec
            </div>
            <div className="text-xs font-bold text-[#7A6786] dark:text-stone-300">
              Liderazgo Escolar Activo
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#4B2E4F] dark:text-amber-300">
              5 Idiomas
            </div>
            <div className="text-xs font-bold text-[#7A6786] dark:text-stone-300">
              Inclusión Andina & Nativa
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#4B2E4F] dark:text-amber-300">
              100% Gratis
            </div>
            <div className="text-xs font-bold text-[#7A6786] dark:text-stone-300">
              Acceso Universal y Seguro
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#4B2E4F] dark:text-amber-300">
              Oficial
            </div>
            <div className="text-xs font-bold text-[#7A6786] dark:text-stone-300">
              MINSA, MIMP, UNICEF, OPS
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Closing Statement Banner */}
      <section 
        id="about-closing-banner"
        className={`rounded-3xl p-8 sm:p-12 border text-center relative overflow-hidden transition-all duration-300 shadow-lg ${
          darkMode 
            ? 'bg-gradient-to-r from-[#4B2E4F] via-[#3D1E42] to-[#2B142F] border-amber-400/50 text-white' 
            : 'bg-gradient-to-r from-[#4B2E4F] via-[#3D1E42] to-[#2B142F] text-white border-brand-slate'
        }`}
      >
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-[#4B2E4F] flex items-center justify-center mx-auto shadow-md">
            <Flower2 className="w-6 h-6" />
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-300 tracking-tight leading-snug">
            “Juntas informamos, prevenimos y construimos un camino más seguro.” 🌷
          </h3>

          <p className="text-xs sm:text-sm text-purple-100 max-w-xl mx-auto leading-relaxed font-medium">
            Te invitamos a explorar todos los módulos educativos, utilizar nuestro mapa de puntos seguros y compartir esta plataforma con tus compañeras, docentes y familia.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {onNavigate && (
              <button
                onClick={() => onNavigate('inicio')}
                className="px-5 py-3 rounded-2xl bg-amber-300 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm transition hover:scale-105 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Explorar la Plataforma</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-xs sm:text-sm transition hover:scale-105 backdrop-blur-xs flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Conversar con Navi</span>
              </button>
            )}

            {onNavigate && (
              <button
                onClick={() => onNavigate('recursos')}
                className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-xs sm:text-sm transition hover:scale-105 backdrop-blur-xs flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>Ver Guías en PDF</span>
              </button>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};
