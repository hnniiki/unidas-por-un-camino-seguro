import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Scale, 
  HeartHandshake, 
  Clock, 
  Phone, 
  FileText, 
  Lock, 
  CheckCircle2, 
  Volume2, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { WARNING_TOPICS } from '../data/mockData';
import { speechService } from '../utils/speech';

interface WarningSignsAndRightsSectionProps {
  darkMode: boolean;
  onOpenReportModal: () => void;
  onOpenChat: () => void;
}

export const WarningSignsAndRightsSection: React.FC<WarningSignsAndRightsSectionProps> = ({
  darkMode,
  onOpenReportModal,
  onOpenChat,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('violencia-sexual');

  const selectedTopic = WARNING_TOPICS.find(t => t.id === selectedTopicId) || WARNING_TOPICS[0];

  const handleRead = (text: string) => {
    speechService.speak(text);
  };

  return (
    <div className="space-y-10">
      
      {/* Critical Focus Header Alert */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-red-900 via-brand-plum to-purple-950 text-white border-2 border-red-500/60 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-red-600/90 text-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider animate-pulse">
              <ShieldAlert className="w-4 h-4" />
              <span>Foco Prioritario de Protección y Derechos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Identificación de Alertas, Protección a Menores de 15 Años y Rutas de Denuncia
            </h2>
            <p className="text-xs sm:text-sm text-brand-cream/90 leading-relaxed">
              La ley y la salud pública protegen prioritariamente a niñas, niños y adolescentes. Conoce las señales de abuso, las rutas de atención médica inmediata (Kit de 72 horas) y la restitución integral de derechos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <a
              href="tel:100"
              className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg transition"
            >
              <Phone className="w-4 h-4" />
              <span>Línea 100 (Gratis 24h)</span>
            </a>
            <button
              onClick={onOpenReportModal}
              className="bg-brand-lilac hover:bg-brand-soft text-brand-plum font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg transition"
            >
              <FileText className="w-4 h-4" />
              <span>Reportar Caso Confidencial</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Tabs for Topics */}
      <div className="flex flex-wrap gap-2">
        {WARNING_TOPICS.map((topic) => {
          const isSelected = topic.id === selectedTopicId;
          return (
            <button
              key={topic.id}
              id={`btn-warning-tab-${topic.id}`}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition flex items-center gap-2 border ${
                isSelected
                  ? 'bg-brand-plum text-white border-brand-plum shadow-md'
                  : 'bg-white dark:bg-[#351C37] text-brand-plum dark:text-brand-soft border-brand-lilac/40 hover:bg-brand-soft/30'
              }`}
            >
              <AlertTriangle className={`w-4 h-4 ${topic.severity === 'critica' ? 'text-red-500' : 'text-amber-500'}`} />
              <span>{topic.title}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Topic Detailed Panel */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${
        darkMode ? 'bg-[#351C37] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 pb-4 border-b border-brand-lilac/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                selectedTopic.severity === 'critica'
                  ? 'bg-red-600 text-white'
                  : 'bg-amber-600 text-white'
              }`}>
                Prioridad {selectedTopic.severity.toUpperCase()}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-brand-plum dark:text-white">
              {selectedTopic.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/80 mt-0.5">
              {selectedTopic.subtitle}
            </p>
          </div>

          <button
            onClick={() => handleRead(`${selectedTopic.title}. ${selectedTopic.legalFramework}`)}
            className="p-2.5 rounded-xl bg-brand-soft/40 hover:bg-brand-soft text-brand-plum transition text-xs font-bold flex items-center gap-1.5 flex-shrink-0"
            title="Escuchar información médica y legal"
          >
            <Volume2 className="w-4 h-4" />
            <span>Escuchar protocolo</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* Left Column: Señales de Alerta */}
          <div className="lg:col-span-6 space-y-4">
            <h4 className="font-black text-sm uppercase tracking-wider text-red-700 dark:text-red-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Señales de Alerta que Debemos Identificar:
            </h4>
            <div className="space-y-2.5">
              {selectedTopic.signs.map((sign, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-xs sm:text-sm text-red-950 dark:text-red-100 flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="w-2 h-2 rounded-full bg-red-600 mt-1.5 flex-shrink-0" />
                  <span>{sign}</span>
                </div>
              ))}
            </div>

            {/* Legal Framework Box */}
            <div className="p-4 rounded-2xl bg-brand-soft/30 dark:bg-[#2C152E] border border-brand-lilac/40 space-y-1.5 mt-4">
              <h5 className="text-xs font-black uppercase tracking-wider text-brand-plum dark:text-brand-soft flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-brand-plum dark:text-brand-soft" />
                Marco Legal y Normativo:
              </h5>
              <p className="text-xs text-[#4B2E4F] dark:text-brand-cream leading-relaxed font-medium">
                {selectedTopic.legalFramework}
              </p>
            </div>
          </div>

          {/* Right Column: Protocolo de Acción Paso a Paso */}
          <div className="lg:col-span-6 space-y-4">
            <h4 className="font-black text-sm uppercase tracking-wider text-brand-plum dark:text-brand-soft flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Protocolo de Atención Médica y Legal Especializada:
            </h4>
            <div className="space-y-3">
              {selectedTopic.protocolAction.map((step, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 flex items-start gap-2.5 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* Support Hotline Connections */}
            <div className="p-4 rounded-2xl bg-brand-plum text-white border border-brand-lilac/40 space-y-2 mt-4">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-soft block">
                Canales de Atención Directa para este caso:
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedTopic.resources.map((res, i) => (
                  <span key={i} className="bg-brand-slate/60 text-white text-xs font-bold px-3 py-1 rounded-lg border border-brand-lilac/30">
                    {res}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Dedicated Section: El Kit de Emergencia de 72 Horas */}
      <div className="rounded-3xl p-6 sm:p-8 bg-brand-plum text-white border border-brand-lilac/40 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-brand-slate/50">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase">
              <Clock className="w-3.5 h-3.5" />
              Ventana de 72 Horas
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Protocolo Médico: Kit de Emergencia para Víctimas de Violencia Sexual
            </h3>
            <p className="text-xs sm:text-sm text-brand-cream/80 max-w-3xl">
              Ante una agresión sexual, acudir a cualquier establecimiento de salud del MINSA dentro de las primeras 72 horas es vital para proteger la vida y salud de la víctima.
            </p>
          </div>

          <a
            href="tel:113"
            className="bg-brand-lilac hover:bg-brand-soft text-brand-plum font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition flex-shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>Orientación 113 Opción 3</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#371E3A] border border-brand-lilac/30 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-brand-lilac text-brand-plum font-black flex items-center justify-center text-sm">
              1
            </div>
            <h4 className="font-bold text-sm text-brand-soft">
              Anticoncepción de Emergencia (AOE)
            </h4>
            <p className="text-xs text-brand-cream/80 leading-relaxed">
              Evita un embarazo no planificado producto de la agresión. Es 100% gratuita y no requiere denuncia previa para ser administrada.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#371E3A] border border-brand-lilac/30 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-brand-lilac text-brand-plum font-black flex items-center justify-center text-sm">
              2
            </div>
            <h4 className="font-bold text-sm text-brand-soft">
              Profilaxis Post-Exposición VIH (PEP)
            </h4>
            <p className="text-xs text-brand-cream/80 leading-relaxed">
              Tratamiento antirretroviral de 28 días que previene de forma altamente efectiva la transmisión del virus del VIH si se inicia dentro de las 72h.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#371E3A] border border-brand-lilac/30 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-brand-lilac text-brand-plum font-black flex items-center justify-center text-sm">
              3
            </div>
            <h4 className="font-bold text-sm text-brand-soft">
              Antibióticos para ITS
            </h4>
            <p className="text-xs text-brand-cream/80 leading-relaxed">
              Dosis preventiva contra Sífilis, Gonorrea, Clamidia y Hepatitis B para evitar secuelas de salud física a largo plazo.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#371E3A] border border-brand-lilac/30 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-brand-lilac text-brand-plum font-black flex items-center justify-center text-sm">
              4
            </div>
            <h4 className="font-bold text-sm text-brand-soft">
              Contención Psicológica y Legal
            </h4>
            <p className="text-xs text-brand-cream/80 leading-relaxed">
              Primeros auxilios psicológicos y articulación inmediata con el Centro Emergencia Mujer (CEM) para medidas de protección y asesoría legal.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
