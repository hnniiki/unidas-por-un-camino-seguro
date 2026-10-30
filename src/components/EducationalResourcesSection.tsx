import React, { useState } from 'react';
import { EducationalInfographic } from '../types/citizenMap';
import { EDUCATIONAL_INFOGRAPHICS } from '../data/citizenMapData';
import { exportInfographicToPDF } from '../utils/pdfExport';
import { speechService } from '../utils/speech';
import { 
  Download, 
  BookOpen, 
  Volume2, 
  CheckCircle2, 
  Sparkles, 
  ShieldAlert, 
  FileText, 
  ArrowRight, 
  HeartHandshake, 
  Share2, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Award
} from 'lucide-react';

interface EducationalResourcesProps {
  darkMode: boolean;
  onOpenChat?: () => void;
  onAddXp?: (amount: number) => void;
}

export const EducationalResourcesSection: React.FC<EducationalResourcesProps> = ({
  darkMode,
  onOpenChat,
  onAddXp
}) => {
  const [selectedInfographicId, setSelectedInfographicId] = useState<string>(EDUCATIONAL_INFOGRAPHICS[0].id);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedInfographic = EDUCATIONAL_INFOGRAPHICS.find(i => i.id === selectedInfographicId) || EDUCATIONAL_INFOGRAPHICS[0];

  const handleDownloadPDF = (infographic: EducationalInfographic) => {
    setDownloadingId(infographic.id);
    setTimeout(() => {
      try {
        exportInfographicToPDF(infographic);
        if (onAddXp) onAddXp(25);
      } catch (e) {
        console.error('Error generating PDF:', e);
      } finally {
        setDownloadingId(null);
      }
    }, 400);
  };

  const handleSpeech = (text: string) => {
    speechService.speak(text);
  };

  const handleShare = (info: EducationalInfographic) => {
    if (navigator.share) {
      navigator.share({
        title: info.title,
        text: `${info.title} - Guía educativa de Unidas por un camino seguro`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${info.title}\n${info.description}\nProtocolo: ${info.keyProtocol}`);
      setCopiedId(info.id);
      setTimeout(() => setCopiedId(null), 3000);
    }
  };

  const filteredInfographics = EDUCATIONAL_INFOGRAPHICS.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 border relative overflow-hidden ${
        darkMode ? 'bg-[#3C223F] border-[#6D4C72] text-white' : 'bg-white border-stone-200 shadow-sm'
      }`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#4B2E4F] text-amber-300 dark:bg-[#5B3760] px-3 py-1 rounded-full text-xs font-black shadow-xs">
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Centro de Recursos Educativos & Infografías Oficiales</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3B1F3D] dark:text-white">
              Guías Rápidas, Infografías Descargables & Rutas de Acción
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 max-w-3xl leading-relaxed">
              Material pedagógico con respaldo del MINSA, MIMP, UNICEF y OPS. Diseñado para que adolescentes, familias y docentes descarguen guías en PDF de alta calidad, impriman afiches para colegios y conozcan los protocolos exactos ante emergencias.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => handleDownloadPDF(selectedInfographic)}
              className="px-5 py-3 rounded-2xl bg-[#4B2E4F] hover:bg-[#5B3760] text-amber-300 font-black text-xs sm:text-sm flex items-center gap-2 transition shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{downloadingId === selectedInfographic.id ? 'Generando PDF...' : 'Descargar Guía en PDF (+25 XP)'}</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-stone-200/60 dark:border-stone-700/60 flex-wrap">
          <span className="text-xs font-bold text-stone-500 dark:text-stone-400 mr-1">Filtrar tema:</span>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#4B2E4F] text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
            }`}
          >
            Todas las Guías ({EDUCATIONAL_INFOGRAPHICS.length})
          </button>
          <button
            onClick={() => setActiveFilter('emergencia_72h')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeFilter === 'emergencia_72h'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-rose-700 dark:text-rose-400'
            }`}
          >
            🚨 Protocolo 72 Horas
          </button>
          <button
            onClick={() => setActiveFilter('anticoncepcion')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeFilter === 'anticoncepcion'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-purple-700 dark:text-purple-400'
            }`}
          >
            🛡️ Métodos Anticonceptivos
          </button>
          <button
            onClick={() => setActiveFilter('seguridad_callejera')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeFilter === 'seguridad_callejera'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-amber-800 dark:text-amber-400'
            }`}
          >
            🚦 Seguridad Callejera
          </button>
          <button
            onClick={() => setActiveFilter('dialogo_familiar')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeFilter === 'dialogo_familiar'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-emerald-700 dark:text-emerald-400'
            }`}
          >
            👨‍👩‍👧 Diálogo Familiar
          </button>
        </div>
      </div>

      {/* Main Educational Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List of Infographics (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 block mb-1">
            Selecciona una Infografía Interactiva:
          </span>

          {filteredInfographics.map((info) => {
            const isSelected = selectedInfographicId === info.id;
            return (
              <div
                key={info.id}
                onClick={() => setSelectedInfographicId(info.id)}
                className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-200 relative ${
                  isSelected
                    ? 'bg-[#4B2E4F] text-white border-[#4B2E4F] shadow-lg ring-2 ring-amber-300'
                    : darkMode
                    ? 'bg-[#351C37] border-stone-700 text-stone-200 hover:border-amber-300'
                    : 'bg-white border-stone-200 text-stone-800 hover:border-[#4B2E4F] shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-amber-300 text-stone-950' : 'bg-[#4B2E4F]/10 dark:bg-[#5B3760] text-[#3B1F3D] dark:text-amber-200'
                  }`}>
                    {info.categoryLabel}
                  </span>
                  <span className={`text-[10px] font-medium flex items-center gap-1 ${
                    isSelected ? 'text-amber-200' : 'text-stone-400'
                  }`}>
                    <Clock className="w-3 h-3" />
                    <span>{info.readTime}</span>
                  </span>
                </div>

                <h4 className="font-extrabold text-xs sm:text-sm leading-snug mb-2">
                  {info.title}
                </h4>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 dark:border-stone-700/50">
                  <span className={`text-[11px] font-black flex items-center gap-1 ${
                    isSelected ? 'text-amber-300' : 'text-[#4B2E4F] dark:text-amber-300'
                  }`}>
                    Ver infografía completa <ArrowRight className="w-3 h-3" />
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadPDF(info);
                    }}
                    title="Descargar PDF"
                    className={`p-1.5 rounded-lg transition ${
                      isSelected ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-amber-300'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Active Infographic Reader & Visual Canvas (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
            darkMode ? 'bg-[#351C37] border-[#6D4C72] text-white' : 'bg-white border-stone-200 text-stone-900'
          }`}>
            
            {/* Header of Active Infographic */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200 dark:border-stone-700">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#4B2E4F] text-amber-300 dark:bg-[#5B3760]">
                  {selectedInfographic.categoryLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#3B1F3D] dark:text-white leading-snug mt-1">
                  {selectedInfographic.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Fuente Oficial: <strong>{selectedInfographic.authoritativeSource}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleSpeech(`${selectedInfographic.title}. ${selectedInfographic.description}. ${selectedInfographic.keyProtocol}`)}
                  title="Escuchar audio de la infografía"
                  className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-stone-700 text-stone-800 dark:text-white transition border border-stone-200 dark:border-stone-700 flex items-center gap-1.5 cursor-pointer text-xs font-bold"
                >
                  <Volume2 className="w-4 h-4 text-[#4B2E4F] dark:text-amber-300" />
                  <span className="hidden sm:inline">Escuchar</span>
                </button>

                <button
                  onClick={() => handleShare(selectedInfographic)}
                  title="Compartir o Copiar enlace"
                  className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-stone-700 text-stone-800 dark:text-white transition border border-stone-200 dark:border-stone-700 flex items-center gap-1.5 cursor-pointer text-xs font-bold"
                >
                  <Share2 className="w-4 h-4 text-[#4B2E4F] dark:text-amber-300" />
                  <span className="hidden sm:inline">{copiedId === selectedInfographic.id ? '¡Copiado!' : 'Compartir'}</span>
                </button>

                <button
                  onClick={() => handleDownloadPDF(selectedInfographic)}
                  className="px-4 py-2.5 rounded-xl bg-[#4B2E4F] hover:bg-[#5B3760] text-amber-300 font-black text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadingId === selectedInfographic.id ? 'Generando...' : 'Descargar PDF'}</span>
                </button>
              </div>
            </div>

            {/* Key Golden Protocol Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-black text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Protocolo de Actuación Indispensable</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 leading-relaxed">
                {selectedInfographic.keyProtocol}
              </p>
            </div>

            {/* Bullet Points Highlights */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#4B2E4F] dark:text-amber-300">
                Puntos Fundamentales que debes conocer:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedInfographic.bulletPoints.map((point, pIdx) => (
                  <div key={pIdx} className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-700/80 text-xs text-stone-700 dark:text-stone-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Step-by-Step Pathway */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#4B2E4F] dark:text-amber-300">
                Ruta de Acción Paso a Paso:
              </h4>

              <div className="space-y-3">
                {selectedInfographic.steps.map((step) => (
                  <div key={step.number} className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-700/80 flex flex-col sm:flex-row sm:items-start gap-3.5">
                    <div className="w-7 h-7 rounded-xl bg-[#4B2E4F] text-amber-300 flex items-center justify-center font-black text-xs flex-shrink-0 shadow-xs">
                      {step.number}
                    </div>
                    <div className="space-y-1 flex-1">
                      <h5 className="font-extrabold text-xs sm:text-sm text-stone-900 dark:text-white">
                        {step.title}
                      </h5>
                      <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="text-[11px] font-bold text-[#4B2E4F] dark:text-amber-300 flex items-center gap-1.5 pt-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Consejo clave: {step.tip}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Assistance Footer Box */}
            <div className="p-4 rounded-2xl bg-[#4B2E4F] text-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-200">
                  ¿Necesitas orientación confidencial inmediata?
                </span>
                <div className="text-xs font-bold text-white">
                  Línea 100 (Violencia Familiar y Sexual) y Línea 113 Opción 3 (Salud Sexual) atienden gratis las 24 horas.
                </div>
              </div>

              {onOpenChat && (
                <button
                  onClick={onOpenChat}
                  className="px-4 py-2 rounded-xl bg-amber-300 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-1.5 transition flex-shrink-0 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Consultar con Navi</span>
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
