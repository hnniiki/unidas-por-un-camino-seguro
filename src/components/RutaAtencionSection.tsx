import React, { useState } from 'react';
import { 
  HeartPulse, 
  ShieldCheck, 
  Scale, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Volume2, 
  Sparkles, 
  Lock,
  ArrowRight,
  Info,
  Bell
} from 'lucide-react';
import { SERVICE_ROUTES } from '../data/mockData';
import { speechService } from '../utils/speech';

interface RutaAtencionSectionProps {
  darkMode: boolean;
  onOpenReminders?: () => void;
}

export const RutaAtencionSection: React.FC<RutaAtencionSectionProps> = ({
  darkMode,
  onOpenReminders,
}) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>(SERVICE_ROUTES[0].id);

  const selectedRoute = SERVICE_ROUTES.find(r => r.id === selectedRouteId) || SERVICE_ROUTES[0];

  const handleRead = (text: string) => {
    speechService.speak(text);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 border ${
        darkMode ? 'bg-[#3C223F] border-brand-slate text-white' : 'bg-white border-brand-soft shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-brand-soft/50 text-brand-plum px-3 py-1 rounded-full text-xs font-bold">
              <MapPin className="w-4 h-4" />
              <span>Ruta de Atención Integral y Confidencial</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-plum dark:text-white">
              ¿A dónde acudir? Servicios de Salud Amigables y Centros de Apoyo
            </h2>
            <p className={`text-sm sm:text-base max-w-3xl leading-relaxed ${
              darkMode ? 'text-brand-cream/80' : 'text-[#5B4861]'
            }`}>
              Conoce las instituciones públicas donde recibirás orientación médica gratuita, métodos anticonceptivos, contención psicológica y defensa legal sin discriminación ni juzgamiento.
            </p>
          </div>

          <button
            onClick={() => handleRead('Ruta de atención: Tienes derecho a ser atendido en cualquier posta de salud en el Servicio Amigable de forma gratuita y confidencial.')}
            className="p-3 rounded-xl bg-brand-lilac/30 hover:bg-brand-lilac/50 text-brand-plum dark:text-white transition border border-brand-lilac/60 flex items-center gap-2 flex-shrink-0"
            title="Escuchar guía de atención"
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-xs font-bold">Escuchar Ruta</span>
          </button>
        </div>
      </div>

      {/* Services Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SERVICE_ROUTES.map((route) => {
          const isSelected = route.id === selectedRouteId;
          return (
            <div
              key={route.id}
              id={`card-route-${route.id}`}
              onClick={() => setSelectedRouteId(route.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-brand-plum text-white border-brand-plum shadow-lg ring-2 ring-brand-lilac'
                  : darkMode
                  ? 'bg-[#351C37] border-brand-slate text-white hover:border-brand-lilac'
                  : 'bg-white border-brand-soft text-[#2D1A30] hover:border-brand-plum shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isSelected
                    ? 'bg-brand-lilac text-brand-plum'
                    : 'bg-brand-soft/40 text-brand-plum dark:text-brand-soft'
                }`}>
                  {route.type.toUpperCase()}
                </span>
                <Lock className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-soft' : 'text-brand-slate'}`} />
              </div>

              <h3 className="font-extrabold text-base mb-1">
                {route.name}
              </h3>
              <p className={`text-xs leading-relaxed ${
                isSelected ? 'text-brand-cream/90' : 'text-[#5B4861] dark:text-brand-cream/70'
              }`}>
                Público objetivo: {route.targetAudience}
              </p>
            </div>
          );
        })}
      </div>

      {/* Detailed Service Information */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${
        darkMode ? 'bg-[#351C37] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 pb-4 border-b border-brand-lilac/20">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-brand-plum dark:text-white">
              {selectedRoute.name}
            </h3>
            <p className="text-xs sm:text-sm text-brand-slate dark:text-brand-soft mt-0.5 font-semibold">
              {selectedRoute.targetAudience}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {onOpenReminders && (
              <button
                type="button"
                onClick={onOpenReminders}
                className="bg-brand-soft hover:bg-brand-lilac text-brand-plum font-extrabold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm"
                title="Programar recordatorio para este servicio"
              >
                <Bell className="w-3.5 h-3.5 text-brand-plum" />
                <span>Agendar Recordatorio</span>
              </button>
            )}
            <a
              href="tel:113"
              className="bg-brand-lilac hover:bg-brand-soft text-brand-plum font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Consultar al 113</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* Col Left: Qué ofrecen */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="font-black text-sm uppercase tracking-wider text-brand-plum dark:text-brand-soft flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Servicios Gratuitos que Brindan:
            </h4>
            <div className="space-y-2">
              {selectedRoute.whatTheyProvide.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-brand-cream/60 dark:bg-[#2C152E] border border-brand-lilac/30 text-xs sm:text-sm text-[#4B2E4F] dark:text-brand-cream flex items-start gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-plum dark:bg-brand-soft mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Confidentiality Guarantee */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800/40 space-y-1 mt-4">
              <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Garantía de Confidencialidad y Respeto:</span>
              </div>
              <p className="text-xs text-emerald-950 dark:text-emerald-100 leading-relaxed font-medium">
                {selectedRoute.confidentialityRules}
              </p>
            </div>
          </div>

          {/* Col Right: Cómo acceder y Requisitos */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-brand-plum text-white border border-brand-lilac/40 space-y-3 shadow-md">
              <h4 className="font-black text-sm text-brand-soft uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                ¿Cómo acceder al servicio?
              </h4>
              <p className="text-xs text-brand-cream/90 leading-relaxed">
                {selectedRoute.howToAccess}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-brand-soft/20 dark:bg-[#3C223F] border border-brand-lilac/40 space-y-2">
              <h4 className="font-bold text-xs text-brand-plum dark:text-brand-soft uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-brand-slate dark:text-brand-soft" />
                Requisitos y Condiciones:
              </h4>
              <ul className="space-y-1.5 text-xs text-[#5B4861] dark:text-brand-cream/90">
                {selectedRoute.requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
