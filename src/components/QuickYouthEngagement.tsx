import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Gamepad2, 
  Compass, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  Trophy, 
  Zap, 
  Volume2, 
  Heart, 
  SmilePlus, 
  Play, 
  Lightbulb, 
  Coins, 
  Shirt, 
  Palette, 
  Crown, 
  Glasses, 
  Lock, 
  Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speechService } from '../utils/speech';
import { 
  naviCustomizationService, 
  NaviCustomization, 
  WARDROBE_ITEMS, 
  WardrobeItem 
} from '../utils/naviCustomization';
import { NaviMascot } from './NaviMascot';

interface QuickYouthEngagementProps {
  darkMode: boolean;
  onNavigate: (tab: string) => void;
  onOpenChat: () => void;
  onAddXp: (amount: number) => void;
  streak: number;
  onIncrementStreak: () => void;
  onOpenWardrobeModal?: () => void;
  quizLaunchRequest?: number;
}

interface QuickTriviaQuestion {
  id: number;
  question: string;
  options: { text: string; isCorrect: boolean; explanation: string }[];
  tag: string;
  emoji: string;
}

const YOUTH_TRIVIA_QUESTIONS: QuickTriviaQuestion[] = [
  {
    id: 1,
    emoji: "🛡️",
    tag: "Anticoncepción",
    question: "¿Cuál es el único método que previene tanto un embarazo no planificado como las Infecciones de Transmisión Sexual (ITS)?",
    options: [
      { text: "La pastilla anticonceptiva diaria", isCorrect: false, explanation: "Previene el embarazo si se toma correctamente, pero NO protege de ninguna ITS ni del VIH." },
      { text: "El preservativo (masculino o femenino)", isCorrect: true, explanation: "¡Exacto! Es el único método de doble protección comprobado científicamente." },
      { text: "El método del ritmo o calendario", isCorrect: false, explanation: "Tiene altísima tasa de fallos en adolescentes debido a ciclos irregulares y no previene ITS." },
      { text: "La pastilla del día después (AOE)", isCorrect: false, explanation: "Es solo para emergencias extremas, no protege de ITS y no sustituye un método habitual." }
    ]
  },
  {
    id: 2,
    emoji: "💬",
    tag: "Consentimiento",
    question: "Si tu pareja te dice 'Si me quieres de verdad, no usemos protección', ¿cuál es la respuesta más asertiva y protectora?",
    options: [
      { text: "Ceder por miedo a que se enoje o termine la relación", isCorrect: false, explanation: "El amor verdadero respeta tu salud y tus decisiones. Presionar es una señal de alerta de manipulación." },
      { text: "Decir con firmeza: 'Quererse es cuidarnos mutuamente; solo lo hacemos con protección'", isCorrect: true, explanation: "¡Excelente! Poner límites claros y firmes protege tu futuro, tu cuerpo y tu bienestar emocional." },
      { text: "Quedarte en silencio y esperar que cambie de opinión", isCorrect: false, explanation: "Tu voz y tu consentimiento valen. Mereces una comunicación abierta, respetuosa y segura." }
    ]
  },
  {
    id: 3,
    emoji: "⏰",
    tag: "Emergencias",
    question: "Si ocurrió una relación sin protección o rotura de condón, ¿cuántas horas tienes como máximo para tomar la Anticoncepción Oral de Emergencia (AOE)?",
    options: [
      { text: "Hasta 72 horas (3 días), siendo más eficaz en las primeras 24h", isCorrect: true, explanation: "¡Correcto! Mientras más pronto se tome dentro de las 72 horas, mayor es su efectividad para evitar la ovulación." },
      { text: "Hasta 2 semanas después", isCorrect: false, explanation: "Falso. Pasadas las 72 a 120 horas ya no tiene efecto y no interrumpe un embarazo ya implantado." },
      { text: "No hay límite de tiempo mientras sea antes del mes", isCorrect: false, explanation: "El tiempo es fundamental para evitar la fecundación antes de que el óvulo sea liberado." }
    ]
  },
  {
    id: 4,
    emoji: "🏥",
    tag: "Tus Derechos",
    question: "¿Puede un/a adolescente acudir a una posta médica del MINSA a pedir orientación sobre métodos anticonceptivos de forma confidencial?",
    options: [
      { text: "Sí, la norma técnica peruana garantiza atención diferenciada, gratuita y confidencial a adolescentes", isCorrect: true, explanation: "¡Totalmente cierto! Tienes derecho a recibir orientación profesional sin discriminación ni juicios morales." },
      { text: "No, la posta tiene obligación de llamar a la policía o expulsarte", isCorrect: false, explanation: "Falso. Los Servicios de Salud Amigables del MINSA protegen tu privacidad y tu derecho a la salud." },
      { text: "Solo si pagas una consulta privada costosa", isCorrect: false, explanation: "En todos los establecimientos públicos del MINSA la orientación y métodos son 100% gratuitos." }
    ]
  },
  {
    id: 5,
    emoji: "💡",
    tag: "Mitos Comunes",
    question: "¿Es verdad que lavarse con vinagre, infusiones o refresco después de tener relaciones evita el embarazo?",
    options: [
      { text: "Sí, los ácidos caseros eliminan todo de inmediato", isCorrect: false, explanation: "¡Peligroso error! Los espermatozoides entran al útero en segundos; los lavados caseros causan quemaduras químicas graves." },
      { text: "¡Falso y peligroso! No evita el embarazo y produce graves quemaduras e infecciones", isCorrect: true, explanation: "¡Exacto! Las duchas vaginales destruyen la flora bacteriana natural y causan severas lesiones químicas." },
      { text: "Solo funciona si el refresco está bien helado", isCorrect: false, explanation: "Falso total. La temperatura exterior no impide la fertilización interna." }
    ]
  },
  {
    id: 6,
    emoji: "🩺",
    tag: "Métodos Modernos",
    question: "¿Qué es el implante subdérmico (LARC) disponible gratuitamente en los centros de salud del Perú?",
    options: [
      { text: "Una varita pequeña y flexible colocada en el brazo que protege entre 3 y 5 años con 99% de eficacia", isCorrect: true, explanation: "¡Correcto! Es un método de larga duración altamente seguro, reversible y gratuito en el MINSA." },
      { text: "Una pastilla que se toma una vez al año", isCorrect: false, explanation: "No existen pastillas de duración anual. El implante es subdérmico (debajo de la piel del brazo)." },
      { text: "Un método permanente que no se puede retirar nunca", isCorrect: false, explanation: "El implante es 100% reversible; se puede retirar en cualquier momento si la persona lo decide." }
    ]
  },
  {
    id: 7,
    emoji: "⚖️",
    tag: "Protección Legal",
    question: "En el marco legal peruano (Código Penal), ¿qué establece la ley sobre relaciones sexuales con personas menores de 14 años?",
    options: [
      { text: "Constituye delito contra la libertad sexual sin importar un supuesto acuerdo", isCorrect: true, explanation: "¡Correcto! La ley protege prioritariamente la indemnidad de los menores de 14 años. La Línea 100 brinda auxilio inmediato." },
      { text: "Es legal si ambas personas se prometen matrimonio", isCorrect: false, explanation: "Falso. La ley prohibió el matrimonio infantil en el Perú y sanciona penalmente estas situaciones." },
      { text: "Solo es delito si ocurre en horario escolar", isCorrect: false, explanation: "Falso. La protección de los derechos de la niñez y adolescencia rige las 24 horas en todo el territorio." }
    ]
  },
  {
    id: 8,
    emoji: "🔬",
    tag: "Salud e ITS",
    question: "¿Una persona con Infección de Transmisión Sexual (ITS) puede no tener ningún síntoma visible y transmitirla sin saberlo?",
    options: [
      { text: "Sí, muchas ITS como clamidia, gonorrea o VPH pueden ser asintomáticas durante meses o años", isCorrect: true, explanation: "¡Exacto! Por eso la única protección real en cada relación es el uso correcto del preservativo." },
      { text: "No, cualquier infección siempre produce fiebre alta en menos de 2 horas", isCorrect: false, explanation: "Falso. Muchas infecciones no presentan síntomas tempranos evidentes." },
      { text: "Solo los adultos pueden transmitir infecciones", isCorrect: false, explanation: "Cualquier persona sexualmente activa sin protección de barrera puede contraer o transmitir una ITS." }
    ]
  }
];

const QUICK_DECISION_CARDS = [
  {
    id: 'swipe-1',
    situation: "Te invitan a una fiesta y alguien te ofrece una bebida sospechosa diciendo 'Tómala para que te relajes'.",
    emoji: "🍹",
    choiceA: "Aceptar para no parecer aburrido/a",
    choiceB: "Rechazarla y pedir una bebida cerrada",
    correctChoice: 'B',
    explanation: "Nunca aceptes bebidas abiertas o sin vigilar. Cuidar tu entorno es clave para prevenir situaciones de vulnerabilidad o violencia."
  },
  {
    id: 'swipe-2',
    situation: "Una amiga te confiesa con angustia que tiene 2 semanas de retraso y tiene miedo de hablar con sus padres.",
    emoji: "🫂",
    choiceA: "Aconsejarle tomar hierbas caseras que vio en TikTok",
    choiceB: "Acompañarla a un centro de salud o llamar a la Línea 100/113",
    correctChoice: 'B',
    explanation: "Los remedios caseros son peligrosos y falsos. La orientación médica gratuita y confidencial brinda apoyo real y seguro."
  }
];

export const QuickYouthEngagement: React.FC<QuickYouthEngagementProps> = ({
  darkMode,
  onNavigate,
  onOpenChat,
  onAddXp,
  streak,
  onIncrementStreak,
  onOpenWardrobeModal,
  quizLaunchRequest = 0,
}) => {
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'trivia' | 'decisiones' | 'ruleta' | 'armario'>('trivia');
  
  // Coin and Wardrobe Reactive State
  const [coins, setCoins] = useState<number>(naviCustomizationService.getCoins());
  const [customization, setCustomization] = useState<NaviCustomization>(
    naviCustomizationService.getCustomization()
  );
  const [unlockedItemIds, setUnlockedItemIds] = useState<string[]>(
    naviCustomizationService.getUnlockedItemIds()
  );
  const [wardrobeCategory, setWardrobeCategory] = useState<'color' | 'hat' | 'glasses' | 'outfit'>('color');

  // Trivia state
  const [currentTriviaIdx, setCurrentTriviaIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [answeredTrivia, setAnsweredTrivia] = useState<boolean>(false);
  const [triviaScore, setTriviaScore] = useState<number>(0);
  const [isTriviaComplete, setIsTriviaComplete] = useState<boolean>(false);
  const [coinsEarnedThisSession, setCoinsEarnedThisSession] = useState<number>(0);

  // Decision cards state
  const [currentCardIdx, setCurrentCardIdx] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | null>(null);
  const [showCardFeedback, setShowCardFeedback] = useState<boolean>(false);

  // Myth Roulette state
  const [rouletteText, setRouletteText] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rouletteCategory, setRouletteCategory] = useState<string>('');

  useEffect(() => {
    const unsubscribe = naviCustomizationService.subscribe(() => {
      setCoins(naviCustomizationService.getCoins());
      setCustomization(naviCustomizationService.getCustomization());
      setUnlockedItemIds(naviCustomizationService.getUnlockedItemIds());
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (quizLaunchRequest > 0) {
      setActiveInteractiveTab('trivia');
    }
  }, [quizLaunchRequest]);

  const QUICK_MYTHS_ROULETTE = [
    { myth: "“Bañarse después de tener relaciones evita el embarazo”", reality: "¡FALSO TOTAL!", reason: "Los espermatozoides viajan hacia el útero en segundos. El agua no altera este proceso.", category: "Biología" },
    { myth: "“En la primera vez una mujer no puede quedar embarazada”", reality: "¡FALSO!", reason: "Si hubo ovulación y penetración sin protección, el riesgo de embarazo existe desde la primera relación.", category: "Fertilidad" },
    { myth: "“Hablar de sexualidad en casa incita a que los jóvenes tengan relaciones antes”", reality: "¡CIENTÍFICAMENTE FALSO!", reason: "La UNESCO comprobó que los adolescentes con ESI postergan el inicio sexual y se protegen mucho mejor.", category: "Familia" },
    { myth: "“El condón solo lo debe comprar o llevar el varón”", reality: "¡FALSO!", reason: "La salud sexual y el cuidado es una responsabilidad compartida al 50%. Ambas personas deben tener protección.", category: "Responsabilidad" }
  ];

  const handleTriviaAnswer = (index: number) => {
    if (answeredTrivia) return;
    setSelectedOptionIdx(index);
    setAnsweredTrivia(true);

    const isCorrect = YOUTH_TRIVIA_QUESTIONS[currentTriviaIdx].options[index].isCorrect;
    if (isCorrect) {
      setTriviaScore(prev => prev + 1);
      onAddXp(20);
      
      // Award 10 Navi Coins for each correct answer!
      const nextCoins = naviCustomizationService.addCoins(10);
      setCoins(nextCoins);
      setCoinsEarnedThisSession(prev => prev + 10);

      confetti({ 
        particleCount: 50, 
        spread: 65, 
        origin: { y: 0.7 },
        colors: ['#F59E0B', '#10B981', '#421D46', '#EC4899']
      });
      speechService.speak("¡Respuesta correcta! Ganaste 10 monedas Navi y 20 puntos de experiencia.");
    } else {
      speechService.speak("Revisa la explicación para aprender cómo protegerte.");
    }
  };

  const handleNextTrivia = () => {
    if (currentTriviaIdx < YOUTH_TRIVIA_QUESTIONS.length - 1) {
      setCurrentTriviaIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setAnsweredTrivia(false);
    } else {
      setIsTriviaComplete(true);
      onIncrementStreak();
      confetti({ particleCount: 110, spread: 85, origin: { y: 0.5 } });
      speechService.speak(`¡Felicidades! Completaste la trivia con ${triviaScore} aciertos y ganaste ${coinsEarnedThisSession} monedas.`);
    }
  };

  const handleRestartTrivia = () => {
    setCurrentTriviaIdx(0);
    setSelectedOptionIdx(null);
    setAnsweredTrivia(false);
    setTriviaScore(0);
    setIsTriviaComplete(false);
    setCoinsEarnedThisSession(0);
  };

  const handleChoiceSelect = (choice: 'A' | 'B') => {
    if (showCardFeedback) return;
    setSelectedChoice(choice);
    setShowCardFeedback(true);
    const card = QUICK_DECISION_CARDS[currentCardIdx];
    if (choice === card.correctChoice) {
      onAddXp(25);
      naviCustomizationService.addCoins(5);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }
  };

  const handleNextCard = () => {
    if (currentCardIdx < QUICK_DECISION_CARDS.length - 1) {
      setCurrentCardIdx(prev => prev + 1);
      setSelectedChoice(null);
      setShowCardFeedback(false);
    } else {
      setCurrentCardIdx(0);
      setSelectedChoice(null);
      setShowCardFeedback(false);
    }
  };

  const handleSpinRoulette = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setRouletteText(null);

    let counter = 0;
    const interval = setInterval(() => {
      const randomItem = QUICK_MYTHS_ROULETTE[Math.floor(Math.random() * QUICK_MYTHS_ROULETTE.length)];
      setRouletteCategory(randomItem.category);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        const finalItem = QUICK_MYTHS_ROULETTE[Math.floor(Math.random() * QUICK_MYTHS_ROULETTE.length)];
        setRouletteText(`${finalItem.myth} ➡️ ${finalItem.reality}: ${finalItem.reason}`);
        setRouletteCategory(finalItem.category);
        setIsSpinning(false);
        onAddXp(15);
        naviCustomizationService.addCoins(5);
        speechService.speak(finalItem.myth + ". " + finalItem.reality + ". " + finalItem.reason);
      }
    }, 120);
  };

  const handleEquipWardrobeItem = (item: WardrobeItem) => {
    naviCustomizationService.equipItem(item);
    speechService.speak(`Equipaste ${item.name}`);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.6 },
    });
  };

  const handleBuyWardrobeItem = (item: WardrobeItem) => {
    if (coins < item.price) {
      alert(`Te faltan ${item.price - coins} monedas. ¡Responde preguntas en la Trivia para conseguir más!`);
      return;
    }
    const success = naviCustomizationService.spendCoins(item.price);
    if (success) {
      naviCustomizationService.unlockItem(item.id);
      naviCustomizationService.equipItem(item);
      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.5 },
      });
      speechService.speak(`¡Genial! Compraste ${item.name} por ${item.price} monedas.`);
    }
  };

  const activeQuestion = YOUTH_TRIVIA_QUESTIONS[currentTriviaIdx];
  const activeCard = QUICK_DECISION_CARDS[currentCardIdx];
  const wardrobeFilteredItems = WARDROBE_ITEMS.filter(item => item.category === wardrobeCategory);

  const isItemEquipped = (item: WardrobeItem) => {
    if (item.category === 'color') return customization.color === item.value;
    if (item.category === 'hat') return customization.hat === item.value;
    if (item.category === 'glasses') return customization.glasses === item.value;
    if (item.category === 'outfit') return customization.outfit === item.value;
    return false;
  };

  return (
    <div 
      id="youth-interactive-hub"
      className={`rounded-3xl p-6 sm:p-8 border transition-all ${
        darkMode 
          ? 'bg-[#251227] border-[#5A3462] text-white shadow-2xl' 
          : 'bg-white border-stone-200 text-[#2D1432] shadow-xl'
      }`}
    >
      {/* Top Banner Header with Coin Display */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#421D46] to-[#6E3B75] text-white flex items-center justify-center shadow-md">
            <Zap className="w-6 h-6 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-300/40">
                100% Interactivo & Recompensas
              </span>

              {/* Dynamic Coin Pill */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenWardrobeModal) {
                    onOpenWardrobeModal();
                  } else {
                    setActiveInteractiveTab('armario');
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs font-black shadow-xs transition cursor-pointer"
                title="Tus Monedas Navi ganadas. ¡Haz clic para vestir a Navi!"
              >
                <Coins className="w-3.5 h-3.5 fill-amber-500" />
                <span>{coins} Monedas Navi</span>
                <span className="bg-stone-950/20 text-stone-950 px-1.5 py-0.2 rounded text-[10px] uppercase font-black">
                  Armario 🦉
                </span>
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white mt-1">
              Zona Interactiva & Quiz de Prevención
            </h2>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-[#1A0C1D] p-1.5 rounded-2xl border border-stone-200 dark:border-[#523259] w-full md:w-auto overflow-x-auto">
          <button
            type="button"
            id="tab-trivia-quick"
            onClick={() => setActiveInteractiveTab('trivia')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition whitespace-nowrap cursor-pointer ${
              activeInteractiveTab === 'trivia'
                ? 'bg-[#421D46] text-white shadow-sm'
                : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-[#2F1732]'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Trivia Exprés (+10 🪙 por acierto)</span>
          </button>

          <button
            type="button"
            id="tab-wardrobe-quick"
            onClick={() => setActiveInteractiveTab('armario')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition whitespace-nowrap cursor-pointer ${
              activeInteractiveTab === 'armario'
                ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300'
                : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-[#2F1732]'
            }`}
          >
            <Shirt className="w-3.5 h-3.5 text-purple-600 dark:text-purple-300" />
            <span>Armario de Navi ({coins} 🪙)</span>
          </button>

          <button
            type="button"
            id="tab-decisions-quick"
            onClick={() => setActiveInteractiveTab('decisiones')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition whitespace-nowrap cursor-pointer ${
              activeInteractiveTab === 'decisiones'
                ? 'bg-[#421D46] text-white shadow-sm'
                : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-[#2F1732]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>¿Qué harías tú?</span>
          </button>

          <button
            type="button"
            id="tab-ruleta-quick"
            onClick={() => setActiveInteractiveTab('ruleta')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition whitespace-nowrap cursor-pointer ${
              activeInteractiveTab === 'ruleta'
                ? 'bg-[#421D46] text-white shadow-sm'
                : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-[#2F1732]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Ruleta Desmiente-Mitos</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Trivia Exprés (Con Monedas y Puntos) */}
      {activeInteractiveTab === 'trivia' && (
        <div className="pt-6 animate-fadeIn">
          {!isTriviaComplete ? (
            <div className="max-w-2xl mx-auto space-y-5">
              
              {/* Progress and Live Stats */}
              <div className="flex items-center justify-between text-xs font-bold text-stone-600 dark:text-stone-300">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{activeQuestion.emoji}</span>
                  <span className="bg-purple-100 dark:bg-[#3E1C44] px-2.5 py-0.5 rounded-full text-[#421D46] dark:text-amber-200 font-extrabold">
                    {activeQuestion.tag}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-amber-700 dark:text-amber-300 font-black flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 fill-amber-500" />
                    +{coinsEarnedThisSession} 🪙 ganadas
                  </span>
                  <span>Pregunta {currentTriviaIdx + 1} de {YOUTH_TRIVIA_QUESTIONS.length}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-stone-200 dark:bg-stone-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-[#421D46] h-full transition-all duration-300"
                  style={{ width: `${((currentTriviaIdx + 1) / YOUTH_TRIVIA_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question card */}
              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-[#1E0F23] border border-stone-200 dark:border-[#523259]">
                <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white leading-snug">
                  {activeQuestion.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {activeQuestion.options.map((opt, oIdx) => {
                  const isSelected = selectedOptionIdx === oIdx;
                  let btnStyle = 'bg-white dark:bg-[#1A0C1D] border-stone-200 dark:border-[#523259] hover:border-[#421D46] text-stone-900 dark:text-white';

                  if (answeredTrivia) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-sm';
                    } else if (isSelected && !opt.isCorrect) {
                      btnStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-100';
                    } else {
                      btnStyle = 'opacity-40 border-transparent';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      id={`trivia-opt-${currentTriviaIdx}-${oIdx}`}
                      type="button"
                      disabled={answeredTrivia}
                      onClick={() => handleTriviaAnswer(oIdx)}
                      className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm flex items-start justify-between gap-3 transition-all duration-200 cursor-pointer ${btnStyle}`}
                    >
                      <span className="leading-snug">{opt.text}</span>
                      {answeredTrivia && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      )}
                      {answeredTrivia && isSelected && !opt.isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Coin Reward Feedback */}
              {answeredTrivia && (
                <div className="p-5 rounded-2xl bg-stone-100 dark:bg-[#1E0F23] border border-stone-200 dark:border-[#523259] space-y-3.5 animate-fadeIn">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {activeQuestion.options[selectedOptionIdx!].isCorrect ? (
                      <>
                        <span className="text-emerald-800 dark:text-emerald-300 font-black text-sm flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> ¡Respuesta Correcta!
                        </span>
                        <div className="inline-flex items-center gap-1.5 bg-amber-400 text-stone-950 font-black text-xs px-3.5 py-1 rounded-full shadow-xs animate-bounce">
                          <Coins className="w-3.5 h-3.5 fill-amber-500" /> +10 Monedas Navi 🪙 (+20 XP)
                        </div>
                      </>
                    ) : (
                      <span className="text-amber-800 dark:text-amber-300 font-black text-xs sm:text-sm flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-500" /> Dato importante para tu salud:
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed font-medium">
                    {activeQuestion.options[selectedOptionIdx!].explanation}
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={handleNextTrivia}
                      className="flex-1 bg-[#421D46] hover:bg-[#58275D] text-white font-extrabold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                    >
                      <span>{currentTriviaIdx < YOUTH_TRIVIA_QUESTIONS.length - 1 ? 'Siguiente Pregunta (+10 🪙)' : 'Ver Resultados Finales'}</span>
                      <ArrowRight className="w-4 h-4 text-amber-300" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveInteractiveTab('armario')}
                      className="px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
                    >
                      <Shirt className="w-3.5 h-3.5" />
                      <span>Ver Armario ({coins} 🪙)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Trivia Completion Screen with Big Rewards */
            <div className="max-w-md mx-auto text-center space-y-5 py-4 animate-fadeIn">
              <div className="w-20 h-20 rounded-3xl bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-300 shadow-xl">
                <Trophy className="w-10 h-10" />
              </div>
              
              <div>
                <h3 className="text-2xl font-black text-stone-900 dark:text-white">
                  ¡Trivia Completada con Éxito!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
                  Obtuviste <strong className="text-amber-600 dark:text-amber-400">{triviaScore} de {YOUTH_TRIVIA_QUESTIONS.length}</strong> aciertos.
                </p>
              </div>

              {/* Reward Box */}
              <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-3">
                <div className="flex items-center justify-center gap-2 text-amber-950 dark:text-amber-200 font-black text-base">
                  <Coins className="w-5 h-5 fill-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>¡Ganaste {coinsEarnedThisSession} Monedas Navi en esta partida!</span>
                </div>
                <p className="text-xs text-amber-900/90 dark:text-amber-300 font-medium">
                  Saldo total: <strong>{coins} Monedas</strong>. ¡Úsalas ahora mismo para cambiar el color de Navi, ponerle un chullo andino, lentes o ponchito!
                </p>

                <button
                  type="button"
                  onClick={() => setActiveInteractiveTab('armario')}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-stone-950 font-black py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                >
                  <Shirt className="w-4 h-4" />
                  <span>¡Ir al Armario y Vestir a Navi Ahora! 🦉✨</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 justify-center pt-1">
                <button
                  type="button"
                  onClick={handleRestartTrivia}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-[#2F1732] font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Jugar de nuevo (+10 🪙 por acierto)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('juegos')}
                  className="px-4 py-2.5 rounded-xl bg-[#421D46] hover:bg-[#58275D] text-white font-extrabold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Ver Todos los Juegos & Memoria</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Armario & Tienda de Navi (Directly inside Tab) */}
      {activeInteractiveTab === 'armario' && (
        <div className="pt-6 animate-fadeIn max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Avatar Stage */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-stone-100/90 dark:bg-[#1A0C1D] border border-stone-200 dark:border-[#523259] text-center flex flex-col items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  Tu Búho Navi Personalizado
                </span>
                <h3 className="text-lg font-black text-stone-900 dark:text-white">
                  Vista Previa
                </h3>
              </div>

              <div className="my-6 transform scale-110 sm:scale-125">
                <NaviMascot size="lg" mood="happy" showBadge={true} animated={true} />
              </div>

              <div className="w-full pt-3 border-t border-stone-200 dark:border-stone-800 space-y-2">
                <div className="flex items-center justify-center gap-2 bg-amber-400 text-stone-950 font-black px-4 py-1.5 rounded-xl text-xs shadow-xs">
                  <Coins className="w-4 h-4 fill-amber-500" />
                  <span>Tienes {coins} Monedas Navi</span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 italic">
                  Gana +10 monedas respondiendo la Trivia Exprés
                </p>
              </div>
            </div>

            {/* Right: Wardrobe Store */}
            <div className="lg:col-span-7 space-y-4">
              {/* Category tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setWardrobeCategory('color')}
                  className={`p-2.5 rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 transition border-2 cursor-pointer ${
                    wardrobeCategory === 'color'
                      ? 'bg-[#421D46] text-white border-[#421D46] shadow-sm'
                      : 'bg-stone-50 dark:bg-[#1E0F23] border-stone-200 dark:border-[#523259] text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  <span>Plumaje</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWardrobeCategory('hat')}
                  className={`p-2.5 rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 transition border-2 cursor-pointer ${
                    wardrobeCategory === 'hat'
                      ? 'bg-[#421D46] text-white border-[#421D46] shadow-sm'
                      : 'bg-stone-50 dark:bg-[#1E0F23] border-stone-200 dark:border-[#523259] text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Gorros</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWardrobeCategory('glasses')}
                  className={`p-2.5 rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 transition border-2 cursor-pointer ${
                    wardrobeCategory === 'glasses'
                      ? 'bg-[#421D46] text-white border-[#421D46] shadow-sm'
                      : 'bg-stone-50 dark:bg-[#1E0F23] border-stone-200 dark:border-[#523259] text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <Glasses className="w-3.5 h-3.5 text-blue-400" />
                  <span>Lentes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWardrobeCategory('outfit')}
                  className={`p-2.5 rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 transition border-2 cursor-pointer ${
                    wardrobeCategory === 'outfit'
                      ? 'bg-[#421D46] text-white border-[#421D46] shadow-sm'
                      : 'bg-stone-50 dark:bg-[#1E0F23] border-stone-200 dark:border-[#523259] text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <Shirt className="w-3.5 h-3.5 text-rose-400" />
                  <span>Ropa</span>
                </button>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[46vh] overflow-y-auto custom-scrollbar p-1">
                {wardrobeFilteredItems.map((item) => {
                  const unlocked = unlockedItemIds.includes(item.id) || item.price === 0;
                  const equipped = isItemEquipped(item);
                  const canAfford = coins >= item.price;

                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        equipped
                          ? 'bg-purple-50 dark:bg-[#341838] border-[#421D46] dark:border-amber-300 shadow-md ring-2 ring-[#421D46]/20'
                          : unlocked
                            ? 'bg-stone-50 dark:bg-[#1D0E20] border-stone-200 dark:border-[#4E2B54] hover:border-purple-400'
                            : 'bg-stone-50/60 dark:bg-[#170B1A] border-stone-200/70 dark:border-stone-800'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl" role="img" aria-label={item.name}>
                              {item.previewEmoji}
                            </span>
                            <span className="font-black text-xs sm:text-sm text-stone-900 dark:text-white">
                              {item.name}
                            </span>
                          </div>

                          {equipped && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                              <Check className="w-3 h-3 stroke-[3]" /> En uso
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-snug">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between gap-2">
                        <div>
                          {unlocked ? (
                            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                              {item.price === 0 ? 'Gratis' : 'Desbloqueado'}
                            </span>
                          ) : (
                            <div className="inline-flex items-center gap-1 text-xs font-black text-amber-700 dark:text-amber-400">
                              <Coins className="w-3.5 h-3.5 fill-amber-500" />
                              <span>{item.price} 🪙</span>
                            </div>
                          )}
                        </div>

                        <div>
                          {equipped ? (
                            <button
                              type="button"
                              disabled
                              className="px-3 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-500 font-bold text-xs"
                            >
                              Puesto
                            </button>
                          ) : unlocked ? (
                            <button
                              type="button"
                              onClick={() => handleEquipWardrobeItem(item)}
                              className="px-3 py-1.5 rounded-xl bg-[#421D46] hover:bg-[#58275D] text-white font-black text-xs transition shadow-xs cursor-pointer"
                            >
                              Equipar
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={!canAfford}
                              onClick={() => handleBuyWardrobeItem(item)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 cursor-pointer ${
                                canAfford
                                  ? 'bg-amber-400 hover:bg-amber-500 text-stone-950 shadow-md'
                                  : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed'
                              }`}
                            >
                              <Lock className="w-3 h-3" />
                              <span>{canAfford ? 'Comprar' : `Faltan ${item.price - coins}`}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Call to play more */}
              <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-[#1E0F23] border border-purple-200 dark:border-purple-800 flex items-center justify-between gap-3">
                <p className="text-xs text-stone-700 dark:text-stone-300 font-medium">
                  ¿Quieres más monedas? Responde preguntas en la Trivia para desbloquear más prendas.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveInteractiveTab('trivia')}
                  className="px-4 py-2 rounded-xl bg-[#421D46] hover:bg-[#58275D] text-white font-extrabold text-xs flex items-center gap-1.5 whitespace-nowrap shadow-xs cursor-pointer"
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Jugar Trivia</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TAB 3: ¿Qué harías tú? (Decisiones Rápidas) */}
      {activeInteractiveTab === 'decisiones' && (
        <div className="pt-6 animate-fadeIn max-w-2xl mx-auto space-y-4">
          <div className="p-5 rounded-2xl bg-stone-100 dark:bg-[#1E0F23] border border-stone-200 dark:border-[#523259] space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeCard.emoji}</span>
              <span className="text-xs font-black uppercase text-[#421D46] dark:text-amber-300">
                Escenario Juvenil #{currentCardIdx + 1}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-stone-900 dark:text-white leading-relaxed">
              {activeCard.situation}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              disabled={showCardFeedback}
              onClick={() => handleChoiceSelect('A')}
              className={`p-4 rounded-2xl border-2 font-extrabold text-xs sm:text-sm text-left transition-all ${
                selectedChoice === 'A'
                  ? activeCard.correctChoice === 'A'
                    ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-900 dark:text-rose-200'
                  : 'bg-white dark:bg-[#1E0F23] border-stone-200 dark:border-[#523259] text-stone-900 dark:text-white hover:border-[#421D46]'
              }`}
            >
              <span className="text-xs text-stone-500 dark:text-purple-300 font-bold block mb-1">Opción A:</span>
              <span>{activeCard.choiceA}</span>
            </button>

            <button
              type="button"
              disabled={showCardFeedback}
              onClick={() => handleChoiceSelect('B')}
              className={`p-4 rounded-2xl border-2 font-extrabold text-xs sm:text-sm text-left transition-all ${
                selectedChoice === 'B'
                  ? activeCard.correctChoice === 'B'
                    ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-900 dark:text-rose-200'
                  : 'bg-white dark:bg-[#1E0F23] border-stone-200 dark:border-[#523259] text-stone-900 dark:text-white hover:border-[#421D46]'
              }`}
            >
              <span className="text-xs text-stone-500 dark:text-purple-300 font-bold block mb-1">Opción B:</span>
              <span>{activeCard.choiceB}</span>
            </button>
          </div>

          {showCardFeedback && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 space-y-2.5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Decisión protegida y asertiva
                </span>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400">+25 XP / +5 🪙</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 leading-relaxed font-medium">
                {activeCard.explanation}
              </p>
              <button
                type="button"
                onClick={handleNextCard}
                className="w-full mt-2 bg-[#421D46] hover:bg-[#58275D] text-white font-extrabold py-2 rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Siguiente Escenario</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Ruleta Desmiente-Mitos */}
      {activeInteractiveTab === 'ruleta' && (
        <div className="pt-6 animate-fadeIn max-w-xl mx-auto text-center space-y-4">
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
            Gira la ruleta y desmantela en segundos los mitos más comunes que circulan en redes o en el colegio.
          </p>

          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#421D46] to-[#2B132E] text-white border border-purple-800/50 shadow-inner relative overflow-hidden">
            {rouletteCategory && (
              <span className="inline-block bg-white/20 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full mb-3">
                Categoría: {rouletteCategory}
              </span>
            )}

            <div className="min-h-[90px] flex items-center justify-center">
              {isSpinning ? (
                <div className="flex items-center gap-2 text-amber-300 font-black text-base animate-pulse">
                  <Sparkles className="w-5 h-5 animate-spin" />
                  <span>Buscando un mito en la base de datos...</span>
                </div>
              ) : rouletteText ? (
                <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  {rouletteText}
                </p>
              ) : (
                <p className="text-xs sm:text-sm text-purple-200 italic">
                  Presiona el botón para girar la ruleta y ganar 15 XP + 5 monedas.
                </p>
              )}
            </div>

            <button
              type="button"
              disabled={isSpinning}
              onClick={handleSpinRoulette}
              className="mt-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black px-6 py-3 rounded-2xl text-xs sm:text-sm transition-all shadow-lg active:scale-95 flex items-center gap-2 mx-auto disabled:opacity-50 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-stone-950" />
              <span>{isSpinning ? 'Girando...' : '¡Girar Ruleta Ahora!'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
