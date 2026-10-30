import React from 'react';
import { NaviMascot } from './NaviMascot';
import { 
  ShieldCheck, 
  Phone, 
  HeartHandshake, 
  ExternalLink, 
  Lock, 
  Heart, 
  MessageSquare, 
  School,
  Sparkles
} from 'lucide-react';
import { HOTLINES } from '../data/mockData';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenChat: () => void;
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenChat,
  darkMode,
}) => {
  const handleQuickExit = () => {
    window.location.replace('https://www.google.com');
  };

  return (
    <footer className="bg-[#1D0C20] text-white border-t border-purple-900/60 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Navi Mascot */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <NaviMascot size="sm" showBadge={false} animated={false} />
              <div>
                <span className="text-[10px] uppercase font-black text-amber-300 tracking-wider block">
                  Unidas por un camino seguro
                </span>
                <h4 className="text-base font-black text-white">
                  Prevención del Embarazo Adolescente
                </h4>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed font-medium">
              Plataforma pedagógica, médica y de orientación ciudadana orientada a erradicar el embarazo no planificado, proteger a menores de 15 años y promover proyectos de vida libres y saludables.
            </p>

            <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/60 text-xs text-purple-200 italic font-medium">
              “¿Tienes una duda? Suéltala. Navi no te va a mirar raro.”
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
              Secciones Educativas
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('inicio')} className="text-stone-300 hover:text-white transition cursor-pointer">
                  • Inicio & Misión
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('nosotras')} className="hover:text-amber-300 transition text-pink-300 font-bold cursor-pointer">
                  • Sobre Nosotras 💗 (Fundadoras)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('familias')} className="text-stone-300 hover:text-white transition cursor-pointer">
                  • Familias & Hijos (Diálogo por Edades)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mitos')} className="text-stone-300 hover:text-white transition cursor-pointer">
                  • Mitos & Realidades Científicas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('derechos')} className="text-stone-300 hover:text-white transition cursor-pointer">
                  • Bienestar Emocional & Redes (Foco)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ruta')} className="text-stone-300 hover:text-white transition cursor-pointer">
                  • Ruta de Atención & Servicios Amigables
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mapa')} className="text-amber-300 hover:underline transition font-bold cursor-pointer">
                  • Mapa Seguro & Reportes Ciudadanos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('recursos')} className="text-amber-300 hover:underline transition font-bold cursor-pointer">
                  • Guías & Infografías en PDF Descargables
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('juegos')} className="text-stone-300 hover:text-white transition cursor-pointer">
                  • Juegos: Memory, Creencias e Insignias
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('seguimiento')} className="text-stone-300 hover:text-white transition cursor-pointer">
                  • Seguimiento de Casos & Alertas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('capacitacion')} className="text-stone-300 hover:text-white transition cursor-pointer">
                  • Capacitación a Personal y Docentes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Líneas Oficiales de Apoyo */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
              Líneas Gratuitas de Emergencia y Salud
            </h4>
            <div className="space-y-2 text-xs">
              <a 
                href="tel:100" 
                className="p-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/40 flex items-center justify-between transition group cursor-pointer"
              >
                <div>
                  <span className="font-extrabold text-white block">Línea 100 (MIMP)</span>
                  <span className="text-[11px] text-red-200">Violencia familiar y sexual 24/7</span>
                </div>
                <span className="bg-red-600 text-white font-black px-2 py-0.5 rounded text-[11px]">100</span>
              </a>

              <a 
                href="tel:113" 
                className="p-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-800/40 flex items-center justify-between transition group cursor-pointer"
              >
                <div>
                  <span className="font-extrabold text-white block">Línea 113 (MINSA) Opción 3</span>
                  <span className="text-[11px] text-purple-200">Salud sexual y reproductiva</span>
                </div>
                <span className="bg-amber-400 text-stone-950 font-black px-2 py-0.5 rounded text-[11px]">113-3</span>
              </a>

              <a 
                href="tel:080076888" 
                className="p-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-800/40 flex items-center justify-between transition group cursor-pointer"
              >
                <div>
                  <span className="font-extrabold text-white block">SíseVe (MINEDU)</span>
                  <span className="text-[11px] text-purple-200">Reportes de violencia escolar</span>
                </div>
                <span className="bg-purple-800 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">0800-76-888</span>
              </a>
            </div>
          </div>

          {/* Col 4: Privacidad & Salida de Emergencia */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
              Privacidad y Seguridad
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed font-medium">
              Tu navegación es totalmente privada. No almacenamos cookies rastreadoras ni compartimos datos personales.
            </p>

            <button
              onClick={handleQuickExit}
              className="w-full bg-red-700 hover:bg-red-800 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition border border-red-500 shadow-md cursor-pointer"
              title="Salida Rápida: abre Google de inmediato"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Salida Rápida de Emergencia</span>
            </button>

            <button
              onClick={onOpenChat}
              className="w-full bg-[#421D46] hover:bg-[#58275D] text-white font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md border border-purple-700 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-amber-300" />
              <span>Conversar con Navi</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-purple-900/60 space-y-3 text-xs text-stone-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              © {new Date().getFullYear()} <strong>Unidas por un camino seguro</strong>. Creado y fundado por <strong>Nikolle Mendoza</strong> y <strong>Alexandra Ramos</strong> (5.° de secundaria). Contenido educativo con respaldo institucional.
            </p>
            <div className="flex items-center gap-4 flex-shrink-0">
              <button 
                onClick={() => onNavigate('nosotras')} 
                className="hover:text-amber-300 transition text-pink-300 font-bold underline cursor-pointer"
              >
                Conoce a las Fundadoras 💗
              </button>
              <span>•</span>
              <span className="flex items-center gap-1 text-purple-200 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Espacio Seguro
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
