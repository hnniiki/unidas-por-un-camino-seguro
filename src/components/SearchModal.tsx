import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  BookOpen, 
  ShieldAlert, 
  PhoneCall, 
  HelpCircle, 
  GraduationCap, 
  Sparkles, 
  Scale, 
  ChevronRight,
  Clock,
  CheckCircle2,
  Tag,
  CornerDownLeft,
  Flame,
  AlertCircle
} from 'lucide-react';
import { 
  buildSearchIndex, 
  searchContent, 
  SearchResultItem, 
  SearchCategory, 
  SEARCH_CATEGORIES, 
  POPULAR_SEARCH_TERMS 
} from '../utils/searchIndex';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
  darkMode: boolean;
  initialQuery?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  darkMode,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('todos');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Pre-build index memoized
  const searchIndex = useMemo(() => buildSearchIndex(), []);

  // Compute live results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchContent(query, selectedCategory, searchIndex);
  }, [query, selectedCategory, searchIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        if (initialQuery) {
          setQuery(initialQuery);
        }
      }, 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setExpandedItemId(null);
    }
  }, [isOpen, initialQuery]);

  // Reset selected index on results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  // Keyboard navigation inside modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      if (results.length > 0 && results[selectedIndex]) {
        e.preventDefault();
        handleSelectResult(results[selectedIndex]);
      }
    }
  };

  const handleSelectResult = (item: SearchResultItem) => {
    onNavigate(item.targetTab);
    onClose();
  };

  const handlePopularTermClick = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  const getCategoryIcon = (category: SearchResultItem['category']) => {
    switch (category) {
      case 'derechos':
        return <Scale className="w-4 h-4 text-rose-500" />;
      case 'familias':
        return <BookOpen className="w-4 h-4 text-emerald-500" />;
      case 'rutas':
        return <ShieldAlert className="w-4 h-4 text-brand-plum dark:text-brand-soft" />;
      case 'emergencia':
        return <PhoneCall className="w-4 h-4 text-amber-500" />;
      case 'mitos':
        return <Sparkles className="w-4 h-4 text-purple-500" />;
      case 'capacitacion':
        return <GraduationCap className="w-4 h-4 text-blue-500" />;
      case 'preguntas':
        return <HelpCircle className="w-4 h-4 text-teal-500" />;
      default:
        return <Search className="w-4 h-4 text-stone-500" />;
    }
  };

  const getCategoryBadgeClass = (category: SearchResultItem['category']) => {
    switch (category) {
      case 'derechos':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800/40';
      case 'familias':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40';
      case 'rutas':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800/40';
      case 'emergencia':
        return 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/40';
      case 'mitos':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/40';
      case 'capacitacion':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800/40';
      case 'preguntas':
        return 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200 dark:border-teal-800/40';
      default:
        return 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl bg-white dark:bg-[#1E1120] rounded-2xl shadow-2xl border border-stone-200 dark:border-[#4B2E4F] overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] transition-all"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header Bar */}
        <div className="p-3.5 sm:p-4 border-b border-stone-200 dark:border-[#3B1F3D] bg-stone-50/70 dark:bg-[#28132A]/70 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white dark:bg-[#381B3B] border border-stone-200 dark:border-[#5B3E60] text-[#4B2E4F] dark:text-brand-soft shadow-xs">
            <Search className="w-5 h-5" />
          </div>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar derechos, leyes, guías familiares, rutas de atención, mitos..."
              className="w-full bg-transparent text-sm sm:text-base font-semibold text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none pr-8"
              aria-label="Buscar en la plataforma"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-white rounded-full"
                title="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl border border-stone-200 dark:border-[#5B3E60] text-stone-500 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-[#3B1F3D] text-xs font-semibold flex items-center gap-1 transition"
          >
            <span className="hidden sm:inline">ESC</span>
            <X className="w-4 h-4 sm:hidden" />
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="px-3.5 sm:px-4 py-2.5 border-b border-stone-100 dark:border-[#311633] bg-white dark:bg-[#1E1120] overflow-x-auto no-scrollbar flex items-center gap-1.5">
          {SEARCH_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#4B2E4F] text-white shadow-xs scale-[1.02]'
                    : 'bg-stone-100 dark:bg-[#2C162E] text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#3C223F]'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body / Results */}
        <div 
          ref={resultsContainerRef}
          className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3 divide-y divide-stone-100 dark:divide-[#311633]/60"
        >
          {query.trim() === '' ? (
            /* Empty State / Recommended Searches */
            <div className="py-4 space-y-5 animate-fadeIn">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Búsquedas Frecuentes y Temas Clave
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCH_TERMS.map((term, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePopularTermClick(term)}
                      className="px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-[#28132A] hover:bg-stone-100 dark:hover:bg-[#381B3B] border border-stone-200/80 dark:border-[#4B2E4F]/60 text-xs font-semibold text-stone-700 dark:text-stone-200 transition flex items-center gap-1.5 text-left group"
                    >
                      <Tag className="w-3 h-3 text-[#7A6786] dark:text-brand-soft group-hover:scale-110 transition-transform" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Navigation Cards */}
              <div className="pt-4 border-t border-stone-100 dark:border-[#311633]">
                <span className="text-xs font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-3">
                  Explorar por Secciones Principales
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div 
                    onClick={() => {
                      onNavigate('derechos');
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 hover:border-rose-300 dark:hover:border-rose-700 cursor-pointer transition group"
                  >
                    <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-bold text-xs">
                      <Scale className="w-4 h-4" />
                      <span>Derechos y Leyes</span>
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1 leading-snug">
                      Código Penal, Ley N° 31945 y prevención del abuso infantil.
                    </p>
                  </div>

                  <div 
                    onClick={() => {
                      onNavigate('familias');
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-300 dark:hover:border-emerald-700 cursor-pointer transition group"
                  >
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                      <BookOpen className="w-4 h-4" />
                      <span>Guías Familiares</span>
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1 leading-snug">
                      Herramientas de diálogo de 10 a 18 años y crianza positiva.
                    </p>
                  </div>

                  <div 
                    onClick={() => {
                      onNavigate('ruta');
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700 cursor-pointer transition group"
                  >
                    <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold text-xs">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Rutas de Atención</span>
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1 leading-snug">
                      Servicios Amigables MINSA, CEM, DEMUNA y Kit 72h.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            /* No Results Found */
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-[#2C162E] flex items-center justify-center mx-auto text-stone-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-stone-800 dark:text-white">
                No encontramos resultados para "{query}"
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
                Prueba con términos más generales como <em>"anticonceptivos"</em>, <em>"línea 100"</em>, <em>"derechos"</em> o <em>"familia"</em>.
              </p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mt-2 text-xs font-bold text-[#4B2E4F] dark:text-brand-soft hover:underline"
              >
                Limpiar búsqueda y ver sugerencias
              </button>
            </div>
          ) : (
            /* Render Results */
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 px-1">
                <span>{results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}</span>
                <span className="text-[11px] hidden sm:inline">Usa ↑ ↓ y Enter para navegar</span>
              </div>

              {results.map((item, index) => {
                const isSelected = selectedIndex === index;
                const isExpanded = expandedItemId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border p-3.5 sm:p-4 transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-stone-50 dark:bg-[#2A152C] border-[#4B2E4F]/40 dark:border-[#7A6786] ring-1 ring-[#4B2E4F]/20'
                        : 'bg-white dark:bg-[#1E1120] border-stone-200/80 dark:border-[#381B3B] hover:bg-stone-50/70 dark:hover:bg-[#261328]'
                    }`}
                    onClick={() => handleSelectResult(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="p-2 rounded-xl bg-stone-100 dark:bg-[#381B3B] mt-0.5 flex-shrink-0">
                          {getCategoryIcon(item.category)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${getCategoryBadgeClass(item.category)}`}>
                              {item.categoryLabel}
                            </span>
                            {item.severity === 'critica' && (
                              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-rose-500 text-white leading-none">
                                Prioridad Crítica
                              </span>
                            )}
                            {item.legalReference && (
                              <span className="text-[10px] font-medium text-stone-500 dark:text-stone-400 truncate">
                                ⚖️ {item.legalReference}
                              </span>
                            )}
                          </div>

                          <h4 className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-white leading-snug">
                            {item.title}
                          </h4>

                          {item.subtitle && (
                            <p className="text-[11px] font-medium text-[#7A6786] dark:text-brand-soft mt-0.5 leading-tight">
                              {item.subtitle}
                            </p>
                          )}

                          <p className="text-xs text-stone-600 dark:text-stone-300 mt-1.5 line-clamp-2 leading-relaxed">
                            {item.excerpt}
                          </p>

                          {/* Key points preview if expanded or present */}
                          {item.keyPoints && item.keyPoints.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-stone-100 dark:border-[#381B3B] space-y-1">
                              {item.keyPoints.slice(0, 2).map((kp, kidx) => (
                                <div key={kidx} className="flex items-start gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                                  <span className="line-clamp-1">{kp}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Action */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0 self-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectResult(item);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#4B2E4F] hover:bg-[#5B3E60] text-white text-xs font-bold flex items-center gap-1 shadow-xs transition"
                        >
                          <span className="hidden sm:inline">{item.actionLabel}</span>
                          <span className="sm:hidden">Ver</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-3 border-t border-stone-200 dark:border-[#3B1F3D] bg-stone-50 dark:bg-[#241126] flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium">
              <CornerDownLeft className="w-3 h-3" />
              <span>Enter para abrir</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1 font-medium">
              <span>Líneas gratuitas: <strong>100</strong> (Violencia) y <strong>113 opc 3</strong> (Salud)</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-stone-700 dark:text-stone-300 hover:underline"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
