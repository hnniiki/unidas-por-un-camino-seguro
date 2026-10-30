import React, { useState } from 'react';
import { Phone, ShieldAlert, HeartPulse, School, Copy, Check, ChevronDown, ChevronUp, ExternalLink, X, MessageSquare, AlertTriangle } from 'lucide-react';
import { HOTLINES } from '../data/mockData';

export const EmergencyHotlinesBar: React.FC = () => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num.replace(/\D/g, ''));
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const handleQuickExit = () => {
    window.location.replace('https://www.google.com');
  };

  return (
    <div id="emergency-bar" className="bg-stone-100/95 dark:bg-[#190C1C] text-stone-900 dark:text-stone-200 border-b border-stone-200 dark:border-[#421D46] transition-colors text-xs z-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3">
        {/* Left: Essential Helplines */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 font-bold text-stone-900 dark:text-white">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
            </span>
            <span className="hidden md:inline font-bold text-xs text-stone-700 dark:text-purple-200">
              Apoyo gratuito 24/7:
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <a
              href="tel:100"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-extrabold bg-[#421D46] text-white hover:bg-[#58275D] transition shadow-xs cursor-pointer"
              title="Línea 100 (Violencia Familiar y Sexual)"
            >
              <Phone className="w-3 h-3 text-amber-300" />
              <span>Línea 100</span>
            </a>

            <a
              href="tel:113"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold bg-white dark:bg-[#28132B] text-stone-900 dark:text-white border border-stone-300 dark:border-[#523259] hover:border-[#421D46] transition cursor-pointer"
              title="Línea 113 Salud Opción 3 (Salud Sexual y Reproductiva)"
            >
              <HeartPulse className="w-3 h-3 text-rose-500" />
              <span>113 Opción 3</span>
            </a>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#421D46] dark:text-amber-300 hover:underline font-bold inline-flex items-center gap-0.5 ml-1 transition cursor-pointer"
            >
              <span>{isExpanded ? 'Cerrar directorio' : 'Más números'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Right: Quick Exit (Discreet & Compact) */}
        <div className="flex items-center gap-3 text-[11px]">
          <button
            onClick={handleQuickExit}
            className="text-stone-600 dark:text-stone-300 hover:text-red-700 dark:hover:text-red-300 font-bold inline-flex items-center gap-1 transition cursor-pointer"
            title="Cerrar y abrir Google al instante por seguridad"
          >
            <ExternalLink className="w-3 h-3" />
            <span className="hidden sm:inline">Salida Rápida</span>
          </button>
        </div>
      </div>

      {/* Expandable Directory */}
      {isExpanded && (
        <div className="bg-white dark:bg-[#251227] border-t border-stone-200 dark:border-[#5A3462] px-4 sm:px-6 lg:px-8 py-5 animate-fadeIn shadow-xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-200 dark:border-stone-800">
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-white">
                  Líneas y Contactos Oficiales de Asistencia
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5 font-medium">
                  Atención confidencial, gratuita e inmediata en todo el Perú
                </p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-[#341838] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {HOTLINES.map((hotline, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-stone-50 dark:bg-[#1E0F23] border border-stone-200 dark:border-[#523259] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#421D46] dark:text-amber-300">
                        {hotline.badge}
                      </span>
                      {hotline.isEmergency && (
                        <span className="bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 text-[10px] font-black px-2 py-0.5 rounded-full">
                          24 Horas
                        </span>
                      )}
                    </div>
                    <h5 className="font-extrabold text-xs sm:text-sm text-stone-900 dark:text-white mb-1">{hotline.name}</h5>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mb-2.5 leading-relaxed font-medium">
                      {hotline.description}
                    </p>
                    {hotline.optionDetail && (
                      <div className="bg-purple-100/70 dark:bg-[#381B3C] text-[#421D46] dark:text-purple-200 text-[11px] font-semibold p-1.5 rounded-lg mb-2.5">
                        {hotline.optionDetail}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 pt-2.5 border-t border-stone-200 dark:border-stone-800">
                    <a
                      href={`tel:${hotline.number.replace(/\D/g, '')}`}
                      className="flex-1 bg-[#421D46] hover:bg-[#58275D] text-white font-bold py-1.5 px-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition text-center shadow-xs cursor-pointer"
                    >
                      <Phone className="w-3 h-3 text-amber-300" />
                      Llamar {hotline.number.split('/')[0]}
                    </a>
                    <button
                      onClick={() => handleCopy(hotline.number)}
                      className="p-1.5 rounded-xl bg-white dark:bg-[#2A142D] border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-white text-xs hover:bg-stone-100 transition cursor-pointer"
                      title="Copiar número"
                    >
                      {copiedNumber === hotline.number ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    {hotline.whatsappNumber && (
                      <a
                        href={`https://wa.me/${hotline.whatsappNumber}?text=Hola,%20solicito%20orientación%20en%20salud`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded-xl transition cursor-pointer"
                        title="WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
