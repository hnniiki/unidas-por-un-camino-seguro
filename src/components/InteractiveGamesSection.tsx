import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  Award, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Flame, 
  HeartHandshake, 
  HelpCircle, 
  ShieldCheck,
  Zap,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BELIEF_CIRCLE_ITEMS, INITIAL_BADGES, DAILY_CHALLENGES } from '../data/mockData';
import { Badge, DailyChallenge } from '../types';
import { speechService } from '../utils/speech';

interface InteractiveGamesSectionProps {
  darkMode: boolean;
  xp: number;
  onAddXp: (amount: number) => void;
  streak: number;
  onIncrementStreak: () => void;
}

interface MemoryCardState {
  id: number;
  pairId: number;
  title: string;
  category: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MEMORY_CARDS_DATA = [
  { pairId: 1, title: "Preservativo Dual", category: "Previene ITS y Embarazo" },
  { pairId: 1, title: "Preservativo Dual", category: "Doble Protección" },
  { pairId: 2, title: "Implante LARC", category: "3 a 5 años de eficacia" },
  { pairId: 2, title: "Implante LARC", category: "Varita subdérmica reversible" },
  { pairId: 3, title: "Consentimiento", category: "Libre, voluntario y continuo" },
  { pairId: 3, title: "Consentimiento", category: "Solo sí es sí" },
  { pairId: 4, title: "Línea 100", category: "Violencia familiar y sexual 24h" },
  { pairId: 4, title: "Línea 100", category: "Orientación y auxilio gratuito" },
];

export const InteractiveGamesSection: React.FC<InteractiveGamesSectionProps> = ({
  darkMode,
  xp,
  onAddXp,
  streak,
  onIncrementStreak,
}) => {
  const [activeGameTab, setActiveGameTab] = useState<'memory' | 'circulo' | 'retos' | 'insignias'>('memory');

  // Memory Game State
  const [cards, setCards] = useState<MemoryCardState[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [matchedPairsCount, setMatchedPairsCount] = useState<number>(0);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [isMemoryWon, setIsMemoryWon] = useState<boolean>(false);

  // Belief Circle State
  const [currentBeliefIndex, setCurrentBeliefIndex] = useState<number>(0);
  const [beliefAnswered, setBeliefAnswered] = useState<boolean>(false);
  const [isUserCorrect, setIsUserCorrect] = useState<boolean | null>(null);
  const [beliefScore, setBeliefScore] = useState<number>(0);
  const [isBeliefCompleted, setIsBeliefCompleted] = useState<boolean>(false);

  // Badges & Challenges State
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [challenges, setChallenges] = useState<DailyChallenge[]>(DAILY_CHALLENGES);

  // Initialize Memory Cards on mount
  useEffect(() => {
    resetMemoryGame();
  }, []);

  const resetMemoryGame = () => {
    const shuffled = [...MEMORY_CARDS_DATA]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        pairId: item.pairId,
        title: item.title,
        category: item.category,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedIndexes([]);
    setMatchedPairsCount(0);
    setMovesCount(0);
    setIsMemoryWon(false);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndexes.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const nextCards = [...cards];
    nextCards[index].isFlipped = true;
    const nextFlipped = [...flippedIndexes, index];

    setCards(nextCards);
    setFlippedIndexes(nextFlipped);

    if (nextFlipped.length === 2) {
      setMovesCount(m => m + 1);
      const [firstIdx, secondIdx] = nextFlipped;
      if (nextCards[firstIdx].pairId === nextCards[secondIdx].pairId) {
        // Match!
        setTimeout(() => {
          setCards(prev => {
            const updated = [...prev];
            updated[firstIdx].isMatched = true;
            updated[secondIdx].isMatched = true;
            return updated;
          });
          setFlippedIndexes([]);
          setMatchedPairsCount(prev => {
            const newCount = prev + 1;
            if (newCount === MEMORY_CARDS_DATA.length / 2) {
              setIsMemoryWon(true);
              onAddXp(60);
              confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }
            return newCount;
          });
        }, 500);
      } else {
        // No match, flip back
        setTimeout(() => {
          setCards(prev => {
            const updated = [...prev];
            updated[firstIdx].isFlipped = false;
            updated[secondIdx].isFlipped = false;
            return updated;
          });
          setFlippedIndexes([]);
        }, 1200);
      }
    }
  };

  // Belief Circle Handler
  const handleBeliefAnswer = (answer: boolean) => {
    if (beliefAnswered) return;

    const currentItem = BELIEF_CIRCLE_ITEMS[currentBeliefIndex];
    const correct = answer === currentItem.isCorrectTrue;
    setIsUserCorrect(correct);
    setBeliefAnswered(true);

    if (correct) {
      setBeliefScore(s => s + 1);
      onAddXp(25);
    }
  };

  const handleNextBelief = () => {
    setBeliefAnswered(false);
    setIsUserCorrect(null);
    if (currentBeliefIndex + 1 < BELIEF_CIRCLE_ITEMS.length) {
      setCurrentBeliefIndex(i => i + 1);
    } else {
      setIsBeliefCompleted(true);
      confetti({ particleCount: 80, spread: 60 });
    }
  };

  const handleCompleteChallenge = (id: string, xpReward: number) => {
    setChallenges(prev =>
      prev.map(c => (c.id === id ? { ...c, completed: true } : c))
    );
    onAddXp(xpReward);
    confetti({ particleCount: 50, spread: 50 });
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
              <Gamepad2 className="w-4 h-4" />
              <span>Metodologías Lúdicas y Gamificación Saludable</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-plum dark:text-white">
              Aprende Jugando: Memory del Cuerpo, Círculo de Creencias e Insignias
            </h2>
            <p className={`text-sm sm:text-base max-w-3xl leading-relaxed ${
              darkMode ? 'text-brand-cream/80' : 'text-[#5B4861]'
            }`}>
              Fortalece tus conocimientos a través de dinámicas interactivas validadas pedagógicamente. Acumula puntos de experiencia (XP), completa retos diarios y desbloquea insignias de logros.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-brand-plum text-white p-3.5 rounded-2xl border border-brand-lilac/40 shadow-sm flex-shrink-0">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-brand-soft block">Tu Nivel</span>
              <span className="text-lg font-black text-yellow-300">{xp} XP</span>
            </div>
            <div className="h-8 w-px bg-brand-lilac/30" />
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-brand-soft block">Racha</span>
              <span className="text-lg font-black text-amber-400 flex items-center gap-0.5 justify-center">
                <Flame className="w-4 h-4 fill-amber-400" />
                {streak} d
              </span>
            </div>
          </div>
        </div>

        {/* Game Mode Selector */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-brand-lilac/20">
          <button
            id="tab-game-memory"
            onClick={() => setActiveGameTab('memory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              activeGameTab === 'memory'
                ? 'bg-brand-plum text-white border-brand-plum shadow-md'
                : 'bg-white dark:bg-[#351C37] text-brand-plum dark:text-brand-soft border-brand-lilac/40 hover:bg-brand-soft/30'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Memory del Cuerpo y Métodos</span>
          </button>

          <button
            id="tab-game-circulo"
            onClick={() => setActiveGameTab('circulo')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              activeGameTab === 'circulo'
                ? 'bg-brand-plum text-white border-brand-plum shadow-md'
                : 'bg-white dark:bg-[#351C37] text-brand-plum dark:text-brand-soft border-brand-lilac/40 hover:bg-brand-soft/30'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Círculo de Creencias</span>
          </button>

          <button
            id="tab-game-retos"
            onClick={() => setActiveGameTab('retos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              activeGameTab === 'retos'
                ? 'bg-brand-plum text-white border-brand-plum shadow-md'
                : 'bg-white dark:bg-[#351C37] text-brand-plum dark:text-brand-soft border-brand-lilac/40 hover:bg-brand-soft/30'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Retos Diarios Saludables</span>
          </button>

          <button
            id="tab-game-insignias"
            onClick={() => setActiveGameTab('insignias')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              activeGameTab === 'insignias'
                ? 'bg-brand-plum text-white border-brand-plum shadow-md'
                : 'bg-white dark:bg-[#351C37] text-brand-plum dark:text-brand-soft border-brand-lilac/40 hover:bg-brand-soft/30'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Insignias de Logros</span>
          </button>
        </div>
      </div>

      {/* GAME 1: MEMORY DEL CUERPO Y MÉTODOS */}
      {activeGameTab === 'memory' && (
        <div className={`p-6 sm:p-8 rounded-3xl border ${
          darkMode ? 'bg-[#351C37] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-sm'
        }`}>
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-brand-lilac/20">
            <div>
              <h3 className="text-xl font-black text-brand-plum dark:text-white">
                Memory del Cuerpo y Métodos de Protección
              </h3>
              <p className="text-xs text-[#5B4861] dark:text-brand-cream/70">
                Encuentra las parejas de conceptos clave. Movimientos: <strong>{movesCount}</strong> | Aciertos: <strong>{matchedPairsCount}/4</strong>
              </p>
            </div>

            <button
              onClick={resetMemoryGame}
              className="p-2.5 rounded-xl bg-brand-soft/40 hover:bg-brand-soft text-brand-plum transition text-xs font-bold flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar Juego</span>
            </button>
          </div>

          {isMemoryWon ? (
            <div className="text-center py-10 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-yellow-400 text-brand-plum flex items-center justify-center mx-auto shadow-lg">
                <Trophy className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-brand-plum dark:text-white">
                ¡Excelente Trabajo! Memoria Perfecta 🦉
              </h4>
              <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/80 max-w-md mx-auto">
                Has completado el juego en {movesCount} movimientos y ganaste <strong>+60 XP</strong>. ¡Has reforzado conceptos vitales de prevención!
              </p>
              <button
                onClick={resetMemoryGame}
                className="bg-brand-plum hover:bg-brand-slate text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md"
              >
                Jugar de nuevo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {cards.map((card, idx) => {
                const isOpen = card.isFlipped || card.isMatched;

                return (
                  <div
                    key={card.id}
                    id={`memory-card-${idx}`}
                    onClick={() => handleCardClick(idx)}
                    className={`h-36 sm:h-40 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 transform select-none border ${
                      card.isMatched
                        ? 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-400 opacity-90 scale-95'
                        : isOpen
                        ? 'bg-brand-soft text-brand-plum border-brand-lilac shadow-md scale-100'
                        : 'bg-brand-plum text-white border-brand-slate/60 hover:border-brand-lilac hover:scale-102 shadow-sm'
                    }`}
                  >
                    {isOpen ? (
                      <div className="space-y-1 animate-fadeIn">
                        <Sparkles className="w-5 h-5 mx-auto text-brand-plum" />
                        <h5 className="font-black text-xs sm:text-sm text-brand-plum">
                          {card.title}
                        </h5>
                        <p className="text-[10px] text-brand-plum/80 leading-tight">
                          {card.category}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Gamepad2 className="w-6 h-6 mx-auto text-brand-soft opacity-80" />
                        <span className="text-xs font-bold text-brand-soft uppercase tracking-wider block">
                          Tocar Carta
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* GAME 2: CÍRCULO DE CREENCIAS */}
      {activeGameTab === 'circulo' && (
        <div className={`p-6 sm:p-8 rounded-3xl border ${
          darkMode ? 'bg-[#351C37] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-sm'
        }`}>
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-brand-lilac/20">
            <div>
              <h3 className="text-xl font-black text-brand-plum dark:text-white">
                Círculo de Creencias (Verdadero o Falso)
              </h3>
              <p className="text-xs text-[#5B4861] dark:text-brand-cream/70">
                Pon a prueba tu pensamiento crítico. Pregunta {currentBeliefIndex + 1} de {BELIEF_CIRCLE_ITEMS.length} | Aciertos: {beliefScore}
              </p>
            </div>

            <button
              onClick={() => speechService.speak(BELIEF_CIRCLE_ITEMS[currentBeliefIndex]?.statement || '')}
              className="p-2.5 rounded-xl bg-brand-soft/40 hover:bg-brand-soft text-brand-plum transition text-xs font-bold flex items-center gap-1"
              title="Escuchar afirmación"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {isBeliefCompleted ? (
            <div className="text-center py-10 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-400 text-brand-plum flex items-center justify-center mx-auto shadow-lg">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-brand-plum dark:text-white">
                ¡Círculo de Creencias Completado!
              </h4>
              <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/80 max-w-md mx-auto">
                Obtuviste <strong>{beliefScore} de {BELIEF_CIRCLE_ITEMS.length}</strong> respuestas correctas. ¡Sigue aprendiendo y compartiendo información veraz!
              </p>
              <button
                onClick={() => {
                  setCurrentBeliefIndex(0);
                  setBeliefScore(0);
                  setIsBeliefCompleted(false);
                  setBeliefAnswered(false);
                  setIsUserCorrect(null);
                }}
                className="bg-brand-plum hover:bg-brand-slate text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md"
              >
                Volver a jugar
              </button>
            </div>
          ) : (
            <div className="space-y-6 mt-6">
              
              {/* Statement Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-brand-cream/70 dark:bg-[#2C152E] border border-brand-lilac/40 text-center space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-slate dark:text-brand-soft">
                  Categoría: {BELIEF_CIRCLE_ITEMS[currentBeliefIndex].category}
                </span>
                <p className="text-base sm:text-xl font-bold text-brand-plum dark:text-white leading-relaxed max-w-2xl mx-auto">
                  “{BELIEF_CIRCLE_ITEMS[currentBeliefIndex].statement}”
                </p>
              </div>

              {/* Answer Buttons */}
              {!beliefAnswered ? (
                <div className="flex items-center justify-center gap-4">
                  <button
                    id="btn-belief-true"
                    onClick={() => handleBeliefAnswer(true)}
                    className="flex-1 max-w-xs bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 px-6 rounded-2xl text-sm transition shadow-md flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>VERDADERO</span>
                  </button>

                  <button
                    id="btn-belief-false"
                    onClick={() => handleBeliefAnswer(false)}
                    className="flex-1 max-w-xs bg-red-600 hover:bg-red-700 text-white font-black py-3.5 px-6 rounded-2xl text-sm transition shadow-md flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    <span>FALSO</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                    isUserCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-950 dark:text-emerald-100'
                      : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 text-amber-950 dark:text-amber-100'
                  }`}>
                    {isUserCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h5 className="font-black text-sm">
                        {isUserCorrect ? '¡Correcto! (+25 XP)' : '¡Respuesta incorrecta!'}
                      </h5>
                      <p className="text-xs sm:text-sm mt-1 leading-relaxed">
                        {BELIEF_CIRCLE_ITEMS[currentBeliefIndex].explanation}
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      id="btn-belief-next"
                      onClick={handleNextBelief}
                      className="bg-brand-plum hover:bg-brand-slate text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md"
                    >
                      {currentBeliefIndex + 1 < BELIEF_CIRCLE_ITEMS.length ? 'Siguiente Afirmación' : 'Ver Resultados Finales'}
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      )}

      {/* GAME 3: RETOS DIARIOS */}
      {activeGameTab === 'retos' && (
        <div className={`p-6 sm:p-8 rounded-3xl border ${
          darkMode ? 'bg-[#351C37] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-sm'
        }`}>
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-brand-lilac/20">
            <div>
              <h3 className="text-xl font-black text-brand-plum dark:text-white">
                Retos Diarios de Hábitos Saludables y Diálogo
              </h3>
              <p className="text-xs text-[#5B4861] dark:text-brand-cream/70">
                Pequenas acciones cotidianas para fomentar la comunicación en casa y el autocuidado.
              </p>
            </div>
            <span className="text-xs font-bold text-brand-soft bg-brand-plum px-3 py-1 rounded-full">
              Actualizado hoy
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {challenges.map((ch) => (
              <div
                key={ch.id}
                id={`challenge-${ch.id}`}
                className={`p-5 rounded-2xl border transition-all ${
                  ch.completed
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 opacity-90'
                    : 'bg-brand-cream/40 dark:bg-[#2C152E] border-brand-lilac/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-slate dark:text-brand-soft">
                      {ch.category.toUpperCase()}
                    </span>
                    <h4 className="font-extrabold text-sm text-brand-plum dark:text-white">
                      {ch.title}
                    </h4>
                    <p className="text-xs text-[#5B4861] dark:text-brand-cream/80 leading-relaxed">
                      {ch.description}
                    </p>
                  </div>
                  <span className="bg-yellow-400/80 text-brand-plum text-xs font-black px-2 py-0.5 rounded-full flex-shrink-0">
                    +{ch.xpReward} XP
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-lilac/20 flex items-center justify-between">
                  <span className="text-[11px] italic text-brand-slate dark:text-brand-soft">
                    {ch.actionPrompt}
                  </span>
                  {ch.completed ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> Completado
                    </span>
                  ) : (
                    <button
                      id={`btn-complete-ch-${ch.id}`}
                      onClick={() => handleCompleteChallenge(ch.id, ch.xpReward)}
                      className="bg-brand-lilac hover:bg-brand-slate text-brand-plum hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
                    >
                      Marcar como Realizado
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GAME 4: INSIGNIAS */}
      {activeGameTab === 'insignias' && (
        <div className={`p-6 sm:p-8 rounded-3xl border ${
          darkMode ? 'bg-[#351C37] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-sm'
        }`}>
          <div className="pb-4 border-b border-brand-lilac/20">
            <h3 className="text-xl font-black text-brand-plum dark:text-white">
              Sistema de Insignias por Logros Alcanzados
            </h3>
            <p className="text-xs text-[#5B4861] dark:text-brand-cream/70">
              Desbloquea insignias a medida que aprendes, interactúas con Navi y practicas hábitos saludables.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {badges.map((badge) => {
              const isUnlocked = badge.unlocked || xp >= badge.requiredXp;

              return (
                <div
                  key={badge.id}
                  id={`badge-${badge.id}`}
                  className={`p-5 rounded-2xl border transition-all ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-brand-soft/40 to-brand-cream/60 dark:from-[#3C223F] dark:to-[#2B142D] border-brand-lilac shadow-sm'
                      : 'bg-gray-100 dark:bg-[#251126] border-gray-300 dark:border-gray-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isUnlocked ? 'bg-brand-plum text-yellow-300 shadow-md' : 'bg-gray-300 text-gray-500'
                    }`}>
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-brand-plum dark:text-white">
                        {badge.name}
                      </h4>
                      <span className="text-[10px] uppercase font-bold text-brand-slate dark:text-brand-soft">
                        {badge.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#5B4861] dark:text-brand-cream/80 mt-3 leading-relaxed">
                    {badge.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-brand-lilac/20 flex items-center justify-between text-[11px] font-bold">
                    {isUnlocked ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Desbloqueada
                      </span>
                    ) : (
                      <span className="text-brand-slate dark:text-brand-soft">
                        Requiere {badge.requiredXp} XP (tienes {xp})
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
