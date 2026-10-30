import React, { useState } from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  HelpCircle, 
  Phone, 
  Volume2, 
  ChevronRight, 
  Lightbulb, 
  Heart, 
  Compass, 
  ArrowRight,
  Smile,
  Lock,
  Share2,
  FileCheck2,
  Globe2,
  BookOpen
} from 'lucide-react';
import { 
  COUNTRY_PREGNANCY_STATS, 
  PEER_PRESSURE_SCENARIOS, 
  SUPPORT_NETWORK_ROLES, 
  HEALTH_ACCOMPANIMENT_STEPS, 
  ANDEAN_FAMILY_CONTEXTS,
  ANDEAN_HOTLINES_BY_COUNTRY,
  ANDEAN_MATERNAL_HEALTH_INDICATORS,
  REGIONAL_HEALTH_INSIGHTS
} from '../data/mockData';
import { speechService } from '../utils/speech';

interface EmotionalWellbeingSectionProps {
  darkMode: boolean;
  onOpenChat: () => void;
  onOpenReportModal: () => void;
  onAddXp?: (amount: number) => void;
}

export const EmotionalWellbeingSection: React.FC<EmotionalWellbeingSectionProps> = ({
  darkMode,
  onOpenChat,
  onOpenReportModal,
  onAddXp,
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('region-andina');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('escenario-1');
  const [selectedContextId, setSelectedContextId] = useState<string>('ctx-quechua');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedHotlineCountry, setSelectedHotlineCountry] = useState<string>('Perú');
  const [viewedScenarios, setViewedScenarios] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const selectedCountry = COUNTRY_PREGNANCY_STATS.find(c => c.id === selectedCountryId) || COUNTRY_PREGNANCY_STATS[0];
  const selectedScenario = PEER_PRESSURE_SCENARIOS.find(s => s.id === selectedScenarioId) || PEER_PRESSURE_SCENARIOS[0];
  const selectedContext = ANDEAN_FAMILY_CONTEXTS.find(ctx => ctx.id === selectedContextId) || ANDEAN_FAMILY_CONTEXTS[0];
  const currentHotline = ANDEAN_HOTLINES_BY_COUNTRY.find(h => h.country === selectedHotlineCountry) || ANDEAN_HOTLINES_BY_COUNTRY[0];

  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    if (!viewedScenarios.includes(id)) {
      const nextViewed = [...viewedScenarios, id];
      setViewedScenarios(nextViewed);
      if (onAddXp) onAddXp(15);
    }
  };

  const handleReadText = (text: string) => {
    speechService.speak(text);
  };

  const handleCopyMaterial = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-12">
      
      {/* 1. Header Hero Banner - Foco Prioritario */}
      <div className={`rounded-3xl p-6 sm:p-10 border transition-all ${
        darkMode 
          ? 'bg-[#3C223F] border-brand-slate text-white shadow-2xl' 
          : 'bg-white border-brand-soft text-[#2D1A30] shadow-xl'
      }`}>
        <div className="space-y-6">
          
          {/* Tag & Audio */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-brand-soft/40 border border-brand-lilac/50 px-3.5 py-1.5 rounded-full text-xs font-black text-brand-plum">
              <Sparkles className="w-4 h-4 text-brand-plum" />
              <span>Eje Central de Desarrollo y Protección Juvenil</span>
            </div>

            <button
              onClick={() => handleReadText('Bienestar emocional, manejo de presión de grupo, autoestima y construcción de redes de apoyo seguras. Hablar de sexualidad en casa protege.')}
              className="p-2.5 rounded-xl bg-brand-lilac/30 hover:bg-brand-lilac/50 text-brand-plum dark:text-white transition border border-brand-lilac/60 flex items-center gap-2 text-xs font-bold"
              title="Escuchar resumen del foco"
            >
              <Volume2 className="w-4 h-4" />
              <span>Escuchar sección</span>
            </button>
          </div>

          {/* Main Title & Slogan */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Bienestar Emocional, Presión de Grupo, Autoestima y Redes Seguras
            </h1>
            <p className={`text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl ${
              darkMode ? 'text-brand-cream/90' : 'text-[#5B4861]'
            }`}>
              Promovemos la toma de decisiones informadas, la comunicación afectiva en el hogar andino, la erradicación del estigma y el acompañamiento respetuoso para que cada joven alcance su proyecto de vida.
            </p>
          </div>

          {/* Quick Direct Quotes & Disclaimers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            {/* Direct Slogan Box */}
            <div className="p-4 rounded-2xl bg-brand-plum text-white border border-brand-lilac/50 flex items-start gap-3 shadow-inner">
              <HeartHandshake className="w-6 h-6 text-brand-soft flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-brand-soft">
                  Mensaje Central:
                </span>
                <p className="text-sm sm:text-base font-bold italic text-white leading-snug">
                  “Hablar de sexualidad en casa protege; no incita. La confianza empodera a tu hijo/a.”
                </p>
              </div>
            </div>

            {/* Disclaimer & Youth Authorship */}
            <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
              darkMode ? 'bg-[#311834] border-brand-slate text-brand-cream' : 'bg-brand-cream/80 border-brand-lilac/60 text-[#4B2E4F]'
            }`}>
              <Users className="w-6 h-6 text-brand-slate flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-brand-slate dark:text-brand-soft">
                  Autoría y Alcance:
                </span>
                <p className="text-xs font-semibold leading-relaxed">
                  “Contenido educativo creado por adolescentes andinos. No reemplaza la orientación profesional.”
                </p>
                <span className="text-[10px] opacity-80 block">
                  Material de libre adaptación comunitaria respetando créditos y fines educativos sin fines de lucro.
                </span>
              </div>
            </div>

          </div>

          {/* Denuncia y Ayuda Inmediata Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-900/90 via-[#4B2E4F] to-[#3C223F] text-white border border-red-400/50 shadow-lg">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Líneas de Ayuda y Denuncia
                  </span>
                  <span className="text-xs font-bold text-brand-soft">
                    Atención gratuita, confidencial y 24/7
                  </span>
                </div>
                <p className="text-sm font-extrabold text-white">
                  “Si ves que una adolescente necesita ayuda o está en riesgo, comunícate de inmediato con la línea de tu país.”
                </p>
                <p className="text-xs text-brand-cream/80">
                  {currentHotline.country}: <strong className="text-brand-soft">{currentHotline.mainLine}</strong> | {currentHotline.secondary}
                </p>
              </div>

              {/* Country Helpline Selector */}
              <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                {ANDEAN_HOTLINES_BY_COUNTRY.map(h => (
                  <button
                    key={h.country}
                    onClick={() => setSelectedHotlineCountry(h.country)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                      selectedHotlineCountry === h.country
                        ? 'bg-red-600 text-white border-red-400 shadow-md'
                        : 'bg-white/10 text-brand-cream border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <span>{h.flag}</span>
                    <span>{h.country}</span>
                  </button>
                ))}

                <a
                  href={`tel:${currentHotline.phone}`}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-md"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Llamar {currentHotline.phone}</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Cifras Contextualizadas: Dato vs. Mensaje de Prevención (Recuadros Contrastados) */}
      <div className="space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-slate dark:text-brand-soft">
              <TrendingUp className="w-4 h-4 text-brand-plum dark:text-brand-soft" />
              <span>Realidad Demográfica y Territorial</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-plum dark:text-white mt-0.5">
              Cifras de Embarazo Adolescente en la Región Andina
            </h2>
          </div>

          {/* Country Selector */}
          <div className="flex flex-wrap gap-1.5">
            {COUNTRY_PREGNANCY_STATS.map((stat) => (
              <button
                key={stat.id}
                id={`btn-stat-country-${stat.id}`}
                onClick={() => setSelectedCountryId(stat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 border ${
                  selectedCountryId === stat.id
                    ? 'bg-brand-plum text-white border-brand-plum shadow-md'
                    : 'bg-white dark:bg-[#351C37] text-[#4B2E4F] dark:text-brand-soft border-brand-lilac/40 hover:bg-brand-soft/30'
                }`}
              >
                <span>{stat.flag}</span>
                <span>{stat.country.split('(')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dato vs Mensaje de Prevención (Recuadros de Alto Contraste) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Recuadro 1: El Dato (Fondo Oscuro / Plum) */}
          <div className="p-6 rounded-3xl bg-brand-plum text-white border-2 border-brand-lilac/50 shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="bg-brand-soft text-brand-plum text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                📊 El Dato Clave
              </span>
              <span className="text-xl font-black text-brand-soft">{selectedCountry.flag}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                  {selectedCountry.percentageBeforeSchool}%
                </span>
                <span className="text-xs sm:text-sm font-semibold text-brand-cream/80">
                  (1 de cada 5 adolescentes en promedio)
                </span>
              </div>
              <p className="text-base sm:text-lg font-bold text-brand-cream leading-snug">
                {selectedCountry.rateDescription}
              </p>
            </div>

            {/* Visual Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs text-brand-soft font-semibold">
                <span>Prevalencia en la Región</span>
                <span>{selectedCountry.percentageBeforeSchool} de cada 100</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-brand-soft h-3 rounded-full transition-all duration-700" 
                  style={{ width: `${selectedCountry.percentageBeforeSchool * 3.5}%` }} 
                />
              </div>
            </div>

            <div className="pt-2 border-t border-brand-lilac/30 text-xs text-brand-cream/90 space-y-1">
              <p><strong>Brecha Rural/Urbana:</strong> {selectedCountry.ruralVsUrban}</p>
              <p><strong>Desafío Principal:</strong> {selectedCountry.keyChallenge}</p>
            </div>
          </div>

          {/* Recuadro 2: El Mensaje de Prevención (Fondo Claro / Soft Contrast) */}
          <div className={`p-6 rounded-3xl border-2 transition-all space-y-4 ${
            darkMode 
              ? 'bg-[#311834] border-brand-slate text-white shadow-xl' 
              : 'bg-[#E9E3DC] border-brand-lilac text-[#2D1A30] shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                🛡️ Mensaje de Prevención y Acción
              </span>
              <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-brand-plum dark:text-brand-soft leading-snug">
                “Hablar de sexualidad en casa previene; no incita. La confianza empodera a tu hijo/a.”
              </h3>
              <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/90 leading-relaxed">
                El estigma y el silencio aumentan la vulnerabilidad. Cuando las familias y escuelas educan con afecto y evidencia científica, las y los jóvenes postergan el inicio sexual y protegen sus metas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#3C223F] border border-brand-lilac/40 space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-brand-plum dark:text-brand-soft flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Factor Protector Principal:
              </h4>
              <p className="text-xs text-[#5B4861] dark:text-brand-cream/90 leading-relaxed">
                {selectedCountry.protectiveFactor}
              </p>
            </div>

            <div className="pt-2 border-t border-brand-lilac/30 flex items-center justify-between text-xs font-bold text-brand-slate dark:text-brand-soft">
              <span>{selectedCountry.source}</span>
              <button 
                onClick={() => handleReadText(`${selectedCountry.country}: ${selectedCountry.rateDescription}. Mensaje de prevención: Hablar de sexualidad en casa protege, no incita.`)}
                className="hover:underline flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> Escuchar
              </button>
            </div>
          </div>

        </div>

        {/* Source Reference Footer for Data */}
        <div className="p-3 rounded-xl bg-brand-soft/30 border border-brand-lilac/40 text-center text-xs text-[#5B4861] dark:text-brand-cream/80 font-medium">
          Fuente de datos: <strong>{selectedCountry.source}</strong>. Cifras oficiales contextualizadas para la prevención del embarazo adolescente en la subregión andina.
        </div>

        {/* MÓDULO NUEVO: Indicadores de Acceso y Cobertura en Salud Materna (LAC / Países Andinos) */}
        <div className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-6 ${
          darkMode ? 'bg-[#311834] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-md'
        }`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-brand-lilac/30">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-brand-plum text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Reporte Técnico Regional LAC (Lima, 23 de abril de 2026)
                </span>
                <span className="text-xs font-semibold text-brand-slate dark:text-brand-soft">
                  Análisis de situación ORAS CONHU
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-brand-plum dark:text-white">
                Tabla Comparativa: Indicadores de Salud Materna en los Países Andinos
              </h3>
              <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/80 leading-relaxed max-w-4xl">
                Evidencia comparada de cobertura prenatal, institucionalización del parto, fecundidad adolescente, uso de anticonceptivos modernos y razón de mortalidad materna.
              </p>
            </div>

            <button
              onClick={() => handleReadText('Tabla comparativa de salud materna en países andinos. Cobertura prenatal, partos atendidos por personal capacitado, uso de anticonceptivos modernos, demanda satisfecha, mortalidad materna y fecundidad adolescente.')}
              className="p-2.5 rounded-xl bg-brand-lilac/30 hover:bg-brand-lilac/50 text-brand-plum dark:text-white transition border border-brand-lilac/60 flex items-center gap-2 text-xs font-bold flex-shrink-0"
              title="Escuchar resumen de indicadores"
            >
              <Volume2 className="w-4 h-4" />
              <span>Audio Resumen</span>
            </button>
          </div>

          {/* Interactive Responsive Table */}
          <div className="overflow-x-auto rounded-2xl border border-brand-lilac/40 shadow-inner">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-brand-plum text-white uppercase text-[11px] font-black tracking-wider">
                <tr>
                  <th className="p-3 sm:p-4">País Andino</th>
                  <th className="p-3 sm:p-4 text-center">Cobertura Prenatal (%)</th>
                  <th className="p-3 sm:p-4 text-center">Parto Calificado (%)</th>
                  <th className="p-3 sm:p-4 text-center">Anticonceptivos Modernos (%)</th>
                  <th className="p-3 sm:p-4 text-center">Demanda Satisfecha PF (%)</th>
                  <th className="p-3 sm:p-4 text-center">Mortalidad Materna (x 100k NV)</th>
                  <th className="p-3 sm:p-4 text-center">Fecundidad Adolescente (x 1,000)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-lilac/20 font-medium">
                {ANDEAN_MATERNAL_HEALTH_INDICATORS.map((row, idx) => (
                  <tr 
                    key={row.country}
                    className={`transition ${
                      idx % 2 === 0 
                        ? (darkMode ? 'bg-[#3C223F]/50' : 'bg-brand-cream/30') 
                        : (darkMode ? 'bg-[#311834]' : 'bg-white')
                    } hover:bg-brand-soft/20`}
                  >
                    <td className="p-3 sm:p-4 font-black flex items-center gap-2 text-brand-plum dark:text-brand-soft">
                      <span className="text-lg">{row.flag}</span>
                      <span>{row.country}</span>
                    </td>
                    <td className="p-3 sm:p-4 text-center font-bold">
                      {row.prenatalCoverage !== null ? `${row.prenatalCoverage}%` : <span className="text-brand-slate opacity-70">N/D</span>}
                    </td>
                    <td className="p-3 sm:p-4 text-center font-bold text-emerald-700 dark:text-emerald-300">
                      {row.trainedBirthAttendant}%
                    </td>
                    <td className="p-3 sm:p-4 text-center">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-xs ${
                        row.modernContraceptives >= 70 
                          ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200' 
                          : row.modernContraceptives >= 55 
                            ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200' 
                            : 'bg-red-100 text-red-900 dark:bg-red-950/60 dark:text-red-200'
                      }`}>
                        {row.modernContraceptives.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 text-center font-bold">
                      {row.familyPlanningDemandSatisfied}%
                    </td>
                    <td className="p-3 sm:p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full font-black text-xs ${
                        row.maternalMortalityRatio > 100 
                          ? 'bg-red-600 text-white' 
                          : row.maternalMortalityRatio > 50 
                            ? 'bg-amber-600 text-white' 
                            : 'bg-emerald-700 text-white'
                      }`}>
                        {row.maternalMortalityRatio}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full font-black text-xs ${
                        row.adolescentFertilityRate > 60 
                          ? 'bg-red-900/90 text-white' 
                          : row.adolescentFertilityRate > 40 
                            ? 'bg-brand-plum text-white' 
                            : 'bg-emerald-700 text-white'
                      }`}>
                        {row.adolescentFertilityRate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-right text-[11px] text-[#5B4861] dark:text-brand-cream/70 italic">
            Fuente: Análisis de situación ORAS CONHU y reportes regionales recientes (Lima, LAC).
          </div>

          {/* 5 Ejes de Análisis Técnico Regional (LAC) */}
          <div className="space-y-4 pt-2">
            <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-brand-plum dark:text-brand-soft flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              Hallazgos Clave y Desafíos de Cobertura en América Latina y el Caribe (LAC):
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {REGIONAL_HEALTH_INSIGHTS.map((insight, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-2xl border space-y-2.5 flex flex-col justify-between ${
                    darkMode ? 'bg-[#3C223F] border-brand-slate' : 'bg-brand-cream/40 border-brand-lilac/50'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-[#4B2E4F] dark:bg-[#5B3760] text-amber-300 shadow-xs">
                        {insight.indicatorName}
                      </span>
                    </div>
                    <h5 className="font-extrabold text-xs sm:text-sm text-[#3B1F3D] dark:text-white leading-snug">
                      {insight.title}
                    </h5>
                    <p className="text-xs text-stone-700 dark:text-stone-200 leading-relaxed">
                      {insight.analysis}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#311834] border border-brand-lilac/30 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                      💡 Conclusión Crítica:
                    </span>
                    <p className="text-[11px] font-bold text-[#3B1F3D] dark:text-amber-200 leading-snug">
                      {insight.keyTakeaway}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Banner Síntesis de Relación Gasto - Acceso - Calidad */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-plum via-[#5B3E60] to-brand-slate text-white border border-brand-lilac/40 shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-soft">
                    Lección de Política Pública y Salud Adolescente:
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold leading-snug text-brand-cream">
                    “Alta cobertura numérica no siempre equivale a menor mortalidad: la calidad obstétrica de emergencia, el inicio temprano en el 1er trimestre y la entrega confidencial de métodos anticonceptivos modernos salvan vidas.”
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-2xl">🌱</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Manejo de Presión de Grupo & Autoestima (Simulador Asertivo con Avatares) */}
      <div className="space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-slate dark:text-brand-soft">
              <Sparkles className="w-4 h-4 text-brand-plum dark:text-brand-soft" />
              <span>Autoestima y Asertividad Juvenil</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-plum dark:text-white mt-0.5">
              Manejo de Presión de Grupo y Toma de Decisiones
            </h2>
            <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/70">
              Aprende a reconocer situaciones de coerción o manipulación y responde con firmeza sin perder tu tranquilidad:
            </p>
          </div>

          <button
            onClick={onOpenChat}
            className="self-start sm:self-auto bg-brand-plum hover:bg-brand-slate text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm"
          >
            <MessageSquare className="w-4 h-4 fill-brand-lilac" />
            <span>Consultar dudas con Navi</span>
          </button>
        </div>

        {/* Scenario Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PEER_PRESSURE_SCENARIOS.map((scenario) => {
            const isSelected = scenario.id === selectedScenarioId;
            const isViewed = viewedScenarios.includes(scenario.id);
            return (
              <button
                key={scenario.id}
                id={`btn-scenario-${scenario.id}`}
                onClick={() => handleScenarioChange(scenario.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-brand-plum text-white border-brand-plum shadow-md'
                    : 'bg-white dark:bg-[#351C37] text-brand-plum dark:text-brand-soft border-brand-soft hover:border-brand-lilac'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase opacity-80">
                    Situación #{scenario.id.split('-')[1]}
                  </span>
                  {isViewed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold line-clamp-2">
                  {scenario.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Selected Scenario Interactive Card */}
        <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          darkMode ? 'bg-[#351C37] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-sm'
        }`}>
          
          <div className="space-y-6">
            
            {/* Scenario Title & Context */}
            <div className="space-y-2 pb-4 border-b border-brand-lilac/20">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-900 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-bold">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Tipo de Presión: {selectedScenario.peerPressureType}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-brand-plum dark:text-white">
                {selectedScenario.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/90 leading-relaxed">
                {selectedScenario.context}
              </p>
            </div>

            {/* 3 Pillars of Action for this Scenario */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* Box 1: La Presión que recibes */}
              <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 space-y-3">
                <div className="flex items-center gap-2 text-red-800 dark:text-red-300">
                  <span className="text-lg">🗣️</span>
                  <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider">
                    Lo que suelen decirte:
                  </h4>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#3C223F] border border-red-200 dark:border-red-900/50 text-xs sm:text-sm italic font-bold text-red-950 dark:text-red-200">
                  {selectedScenario.pressureQuote}
                </div>
                <p className="text-xs text-red-900/80 dark:text-red-300/80 leading-relaxed">
                  Identifica la manipulación: cuando intentan condicionar tu cariño o tu pertenencia al grupo, están vulnerando tus límites.
                </p>
              </div>

              {/* Box 2: Tu Respuesta Asertiva */}
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                  <span className="text-lg">🛡️</span>
                  <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider">
                    Tu Respuesta Asertiva:
                  </h4>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#3C223F] border border-emerald-200 dark:border-emerald-900/50 text-xs sm:text-sm font-extrabold text-emerald-950 dark:text-emerald-200">
                  {selectedScenario.assertiveResponse}
                </div>
                <p className="text-xs text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed">
                  Decir 'NO' con calma y firmeza demuestra madurez. No necesitas justificarte ni pedir disculpas por cuidar tu cuerpo.
                </p>
              </div>

              {/* Box 3: Amor Propio y Red de Apoyo */}
              <div className="p-5 rounded-2xl bg-brand-soft/20 dark:bg-[#311834] border border-brand-lilac/40 space-y-3">
                <div className="flex items-center gap-2 text-brand-plum dark:text-brand-soft">
                  <span className="text-lg">🌟</span>
                  <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider">
                    Autoestima & Acción Segura:
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/90 leading-relaxed font-medium">
                  {selectedScenario.selfEsteemReflection}
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#3C223F] border border-brand-lilac/30 text-xs text-brand-plum dark:text-brand-soft font-semibold">
                  <strong>Pide apoyo:</strong> {selectedScenario.supportNetworkAction}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* 4. Construcción de Redes de Apoyo y Diversidad Cultural Andina */}
      <div className="space-y-6">
        
        {/* Section Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-slate dark:text-brand-soft">
            <Users className="w-4 h-4 text-brand-plum dark:text-brand-soft" />
            <span>Diversidad Cultural y Vínculos Protectores</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-brand-plum dark:text-white">
            Redes de Apoyo Seguras en la Diversidad de Familias Andinas
          </h2>
          <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/70">
            Reconocemos las fortalezas del tejido comunitario, rural, indígena y migrante para proteger la salud mental y prevenir riesgos:
          </p>
        </div>

        {/* 4 Roles in the Support Network */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SUPPORT_NETWORK_ROLES.map((role) => (
            <div
              key={role.id}
              className={`p-5 rounded-2xl border transition-all ${
                darkMode ? 'bg-[#351C37] border-brand-slate' : 'bg-white border-brand-soft shadow-sm'
              }`}
            >
              <div className="text-3xl mb-3">{role.avatarIcon}</div>
              <h4 className="font-black text-sm sm:text-base text-brand-plum dark:text-white">
                {role.roleTitle}
              </h4>
              <p className="text-xs text-[#5B4861] dark:text-brand-cream/80 mt-2 leading-relaxed">
                {role.howTheyHelp}
              </p>
              <div className="mt-3 pt-3 border-t border-brand-lilac/20 text-[11px] text-brand-slate dark:text-brand-soft font-semibold">
                🌾 {role.andeanContext}
              </div>
            </div>
          ))}
        </div>

        {/* Cultural Contexts Tabs (Quechua, Aymara, Rural, Migrante) */}
        <div className={`p-6 sm:p-8 rounded-3xl border ${
          darkMode ? 'bg-[#311834] border-brand-slate text-white' : 'bg-brand-cream/60 border-brand-lilac/50 text-[#2D1A30]'
        }`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-brand-lilac/20">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-brand-plum dark:text-white">
                Situaciones Cotidianas del Hogar: ESI, Salud Mental y Roles de Género
              </h3>
              <p className="text-xs text-[#5B4861] dark:text-brand-cream/80 mt-0.5">
                Cuestionando estereotipos con empatía, sin culpar a las familias y valorando la sabiduría comunitaria:
              </p>
            </div>

            {/* Context Selector */}
            <div className="flex flex-wrap gap-1.5">
              {ANDEAN_FAMILY_CONTEXTS.map((ctx) => (
                <button
                  key={ctx.id}
                  onClick={() => setSelectedContextId(ctx.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                    selectedContextId === ctx.id
                      ? 'bg-brand-plum text-white border-brand-plum shadow-sm'
                      : 'bg-white dark:bg-[#3C223F] text-brand-plum dark:text-brand-soft border-brand-lilac/40'
                  }`}
                >
                  {ctx.culture}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#3C223F] border border-brand-lilac/30 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-slate dark:text-brand-soft">
                  Sabiduría & Valor Comunitario:
                </span>
                <h4 className="text-sm sm:text-base font-extrabold italic text-brand-plum dark:text-white">
                  {selectedContext.quote}
                </h4>
                <p className="text-xs text-[#5B4861] dark:text-brand-cream/80">
                  {selectedContext.culturalValue}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#3C223F] border border-brand-lilac/30 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600">
                  Situación Cotidiana en el Hogar:
                </span>
                <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/90 leading-relaxed font-medium">
                  {selectedContext.dailySituation}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Resolución Empática y Protectora:
                </span>
                <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed font-semibold">
                  {selectedContext.empatheticResolution}
                </p>
                <div className="pt-2 text-xs text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Diálogo sin gritos ni culpas: educar desde el afecto y la corresponsabilidad.</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-brand-soft/30 border border-brand-lilac/40 text-xs text-brand-plum dark:text-brand-cream leading-relaxed">
                💬 <strong>Frase corta para el hogar:</strong> “Hablar de sexualidad en casa protege. La confianza que le das hoy a tu hija/o es su mejor escudo para siempre.”
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 5. Guía para Familias: Cómo Acompañar a una Hija/Hijo a Servicios de Salud */}
      <div className="space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-slate dark:text-brand-soft">
              <HeartHandshake className="w-4 h-4 text-brand-plum dark:text-brand-soft" />
              <span>Acompañamiento Respetuoso y Sin Prejuicios</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-plum dark:text-white mt-0.5">
              Cómo Acompañar a una Hija o Hijo a Servicios de Salud
            </h2>
            <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/70">
              Guía paso a paso para madres, padres y cuidadores: respetando la privacidad, confidencialidad y autonomía.
            </p>
          </div>
        </div>

        {/* 5 Step Indicator Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {HEALTH_ACCOMPANIMENT_STEPS.map((s) => {
            const isCurrent = s.step === activeStep;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-brand-plum text-white border-brand-plum shadow-md'
                    : 'bg-white dark:bg-[#351C37] text-[#4B2E4F] dark:text-brand-soft border-brand-soft hover:border-brand-lilac'
                }`}
              >
                <div className="text-xs font-black uppercase opacity-80">Paso {s.step}</div>
                <div className="text-xs font-bold truncate mt-0.5">{s.title}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Details */}
        {(() => {
          const currentStep = HEALTH_ACCOMPANIMENT_STEPS.find(s => s.step === activeStep) || HEALTH_ACCOMPANIMENT_STEPS[0];
          return (
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              darkMode ? 'bg-[#351C37] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-sm'
            }`}>
              <div className="flex flex-col md:flex-row items-start justify-between gap-4 pb-4 border-b border-brand-lilac/20">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-wider text-brand-slate dark:text-brand-soft">
                    Paso #{currentStep.step} de 5
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-brand-plum dark:text-white">
                    {currentStep.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/80">
                    <strong>Objetivo:</strong> {currentStep.goal}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={activeStep === 1}
                    onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                    className="px-3 py-1.5 rounded-xl border border-brand-lilac/40 text-xs font-bold disabled:opacity-30"
                  >
                    Anterior
                  </button>
                  <button
                    disabled={activeStep === 5}
                    onClick={() => setActiveStep(prev => Math.min(5, prev + 1))}
                    className="px-3 py-1.5 rounded-xl bg-brand-plum text-white text-xs font-bold disabled:opacity-30"
                  >
                    Siguiente
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                
                {/* Lo que la familia debe hacer */}
                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
                  <h4 className="font-extrabold text-xs text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Cómo Acompañar con Amor:
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed font-medium">
                    {currentStep.parentAdvice}
                  </p>
                </div>

                {/* El derecho del adolescente */}
                <div className="p-5 rounded-2xl bg-brand-soft/20 dark:bg-[#311834] border border-brand-lilac/30 space-y-2">
                  <h4 className="font-extrabold text-xs text-brand-plum dark:text-brand-soft uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-plum dark:text-brand-soft" />
                    Derecho del Adolescente:
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/90 leading-relaxed font-medium">
                    {currentStep.teenRight}
                  </p>
                </div>

                {/* Lo que debemos evitar */}
                <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 space-y-2">
                  <h4 className="font-extrabold text-xs text-red-800 dark:text-red-300 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    Lo que Debemos Evitar:
                  </h4>
                  <p className="text-xs sm:text-sm text-red-950 dark:text-red-200 leading-relaxed font-medium">
                    {currentStep.avoidThis}
                  </p>
                </div>

              </div>
            </div>
          );
        })()}

      </div>

      {/* 6. Adaptabilidad Comunitaria y Legalidad */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${
        darkMode ? 'bg-[#311834] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-plum dark:text-brand-soft">
              <BookOpen className="w-4 h-4" />
              <span>Material Educativo Abierto & Propiedad Intelectual</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-brand-plum dark:text-white">
              Adaptación Comunitaria y Respeto de Derechos
            </h3>
            <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/80 leading-relaxed">
              Este recurso ha sido diseñado con estricto apego a la legalidad y estándares de derechos humanos. Se autoriza y alienta su adaptación libre para talleres comunitarios, escuelas rurales, cartillas informativas y radios comunales, citando la autoría educativa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <button
              onClick={handleCopyMaterial}
              className="bg-brand-plum hover:bg-brand-slate text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir Guía'}</span>
            </button>
            <button
              onClick={onOpenReportModal}
              className="bg-brand-lilac/40 hover:bg-brand-lilac/60 text-brand-plum dark:text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 border border-brand-lilac/60 transition"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Canalizar Caso</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
