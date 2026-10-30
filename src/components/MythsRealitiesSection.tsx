import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Volume2, 
  Filter, 
  RotateCw, 
  Lightbulb, 
  ShieldAlert,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { MYTHS_REALITIES } from '../data/mockData';
import { speechService } from '../utils/speech';

interface MythsRealitiesSectionProps {
  darkMode: boolean;
  onAddXp?: (amount: number) => void;
}

export const MythsRealitiesSection: React.FC<MythsRealitiesSectionProps> = ({
  darkMode,
  onAddXp,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [revealedIds, setRevealedIds] = useState<string[]>([]);

  const filteredMyths = selectedCategory === 'todos'
    ? MYTHS_REALITIES
    : MYTHS_REALITIES.filter(m => m.category === selectedCategory);

  const toggleReveal = (id: string) => {
    if (revealedIds.includes(id)) {
      setRevealedIds(revealedIds.filter(i => i !== id));
    } else {
      setRevealedIds([...revealedIds, id]);
      if (onAddXp) onAddXp(15);
    }
  };

  const handleRead = (myth: string, reality: string, explanation: string) => {
    speechService.speak(`Mito: ${myth}. Realidad: ${reality}. Explicación: ${explanation}`);
  };

  const categories = [
    { id: 'todos', label: 'Todos los temas' },
    { id: 'anticoncepcion', label: 'Anticoncepción' },
    { id: 'fertilidad', label: 'Fertilidad y Ciclo' },
    { id: 'relaciones', label: 'Relaciones y Afecto' },
    { id: 'salud', label: 'Salud y Corresponsabilidad' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 border ${
        darkMode ? 'bg-[#3C223F] border-brand-slate text-white' : 'bg-white border-brand-soft shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-brand-soft/50 text-brand-plum px-3 py-1 rounded-full text-xs font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>Desarmando Creencias Falsas con Ciencia</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-plum dark:text-white">
              Mitos y Realidades sobre la Sexualidad y la Prevención
            </h2>
            <p className={`text-sm sm:text-base max-w-3xl leading-relaxed ${
              darkMode ? 'text-brand-cream/80' : 'text-[#5B4861]'
            }`}>
              Muchos miedos y errores nacen de rumores o desinformación en redes. Toca cada tarjeta para descubrir la verdad respaldada por la Organización Mundial de la Salud y el MINSA.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-brand-soft/30 p-3 rounded-2xl border border-brand-lilac/30 text-xs font-bold text-brand-plum dark:text-brand-soft flex-shrink-0">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
            <span>{revealedIds.length} de {MYTHS_REALITIES.length} mitos desmentidos</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-brand-lilac/20">
          <Filter className="w-4 h-4 text-brand-slate dark:text-brand-soft mr-1" />
          {categories.map(cat => (
            <button
              key={cat.id}
              id={`filter-myth-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                selectedCategory === cat.id
                  ? 'bg-brand-plum text-white border-brand-plum shadow-sm'
                  : 'bg-white dark:bg-[#351C37] text-[#4B2E4F] dark:text-brand-soft border-brand-lilac/40 hover:bg-brand-soft/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Interactive Myth Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMyths.map((item) => {
          const isRevealed = revealedIds.includes(item.id);

          return (
            <div
              key={item.id}
              id={`myth-card-${item.id}`}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                darkMode ? 'bg-[#351C37] border-brand-slate' : 'bg-white border-brand-soft shadow-sm'
              }`}
            >
              {/* Myth Header */}
              <div className="p-6 border-b border-brand-lilac/20 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/40 px-2.5 py-0.5 rounded-full">
                    <XCircle className="w-3.5 h-3.5" />
                    Mito Frecuente
                  </span>

                  <button
                    onClick={() => handleRead(item.myth, item.reality, item.explanation)}
                    className="p-1.5 rounded-lg bg-brand-soft/40 hover:bg-brand-soft text-brand-plum transition text-xs"
                    title="Escuchar audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-base sm:text-lg font-black text-brand-plum dark:text-white leading-snug">
                  “{item.myth}”
                </h3>
              </div>

              {/* Reveal Toggle Body */}
              <div className="p-6 space-y-4">
                {isRevealed ? (
                  <div className="space-y-4 animate-fadeIn">
                    
                    {/* Reality Box */}
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800/40 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs uppercase tracking-wide">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>La Realidad Científica:</span>
                      </div>
                      <p className="text-sm font-bold text-emerald-950 dark:text-emerald-100 leading-snug">
                        {item.reality}
                      </p>
                    </div>

                    {/* Detailed Explanation */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-brand-slate dark:text-brand-soft">
                        ¿Por qué ocurre esto?
                      </h4>
                      <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/90 leading-relaxed">
                        {item.explanation}
                      </p>
                    </div>

                    {/* Practical Tips */}
                    <div className="p-3.5 rounded-xl bg-brand-cream dark:bg-[#2C152E] border border-brand-lilac/30 space-y-1.5">
                      <span className="text-[11px] font-extrabold text-brand-plum dark:text-brand-soft uppercase tracking-wider flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        Consejos de Especialistas:
                      </span>
                      <ul className="space-y-1 text-xs text-[#4B2E4F] dark:text-brand-cream/80">
                        {item.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-brand-plum dark:text-brand-soft font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => toggleReveal(item.id)}
                      className="w-full text-center text-xs font-bold text-brand-slate dark:text-brand-soft hover:underline pt-1"
                    >
                      Ocultar detalles
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4 space-y-3">
                    <p className="text-xs text-[#5B4861] dark:text-brand-cream/70">
                      ¿Crees que esta afirmación es verdadera o falsa?
                    </p>
                    <button
                      id={`btn-reveal-${item.id}`}
                      onClick={() => toggleReveal(item.id)}
                      className="bg-brand-lilac hover:bg-brand-slate text-brand-plum hover:text-white font-extrabold px-5 py-2.5 rounded-xl text-xs transition shadow-sm flex items-center justify-center gap-2 mx-auto"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Ver la Realidad Médica</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
