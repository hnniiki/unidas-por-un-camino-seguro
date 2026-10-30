import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Scale, 
  BookOpen, 
  ShieldAlert, 
  PhoneCall, 
  ArrowRight,
  Flame,
  Tag
} from 'lucide-react';
import { POPULAR_SEARCH_TERMS } from '../utils/searchIndex';

interface QuickSearchBannerProps {
  onOpenSearch: (initialQuery?: string) => void;
  onNavigate: (tab: string) => void;
  darkMode: boolean;
}

export const QuickSearchBanner: React.FC<QuickSearchBannerProps> = ({
  onOpenSearch,
  onNavigate,
  darkMode
}) => {
  const [localQuery, setLocalQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      onOpenSearch(localQuery.trim());
      setLocalQuery('');
    } else {
      onOpenSearch();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className={`rounded-2xl border p-3.5 sm:p-4 transition-all shadow-xs ${
        darkMode 
          ? 'bg-[#231225]/80 border-[#4B2E4F]/60 text-white backdrop-blur-sm' 
          : 'bg-white/90 border-stone-200/90 text-stone-900 backdrop-blur-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Left: Search input field */}
          <form onSubmit={handleSubmit} className="flex-1 relative flex items-center">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-brand-soft">
              <Search className="w-4 h-4" />
            </div>
            
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Buscar en la plataforma: derechos, guías familiares, rutas de atención, mitos..."
              className="w-full pl-10 pr-24 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-stone-50 dark:bg-[#1A0C1C] border border-stone-200 dark:border-[#4B2E4F] text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#4B2E4F]/40 dark:focus:ring-brand-soft/40 transition"
            />

            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#4B2E4F] hover:bg-[#5B3E60] text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-xs"
            >
              <span>Buscar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </form>

          {/* Right: Quick shortcuts */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 flex-shrink-0 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="hidden xl:inline">Sugerencias:</span>
            </span>

            <button
              type="button"
              onClick={() => onOpenSearch('Derechos y Ley 31945')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40 flex items-center gap-1 whitespace-nowrap transition flex-shrink-0"
            >
              <Scale className="w-3 h-3" />
              <span>Derechos</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenSearch('Guías Familiares')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-1 whitespace-nowrap transition flex-shrink-0"
            >
              <BookOpen className="w-3 h-3" />
              <span>Guías Familiares</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenSearch('Rutas de Atención')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 flex items-center gap-1 whitespace-nowrap transition flex-shrink-0"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Rutas MINSA / CEM</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenSearch('Línea 100')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40 flex items-center gap-1 whitespace-nowrap transition flex-shrink-0"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Línea 100</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
