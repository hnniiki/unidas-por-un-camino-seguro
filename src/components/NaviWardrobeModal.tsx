import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Check, 
  Lock, 
  Coins, 
  Shirt, 
  Glasses, 
  Crown, 
  Palette, 
  ArrowRight,
  Flame,
  Award,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  naviCustomizationService, 
  NaviCustomization, 
  WardrobeItem, 
  WARDROBE_ITEMS 
} from '../utils/naviCustomization';
import { NaviMascot } from './NaviMascot';
import { speechService } from '../utils/speech';

interface NaviWardrobeModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onNavigateToQuiz?: () => void;
}

export const NaviWardrobeModal: React.FC<NaviWardrobeModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  onNavigateToQuiz,
}) => {
  const [coins, setCoins] = useState<number>(naviCustomizationService.getCoins());
  const [customization, setCustomization] = useState<NaviCustomization>(
    naviCustomizationService.getCustomization()
  );
  const [unlockedItemIds, setUnlockedItemIds] = useState<string[]>(
    naviCustomizationService.getUnlockedItemIds()
  );
  const [activeCategory, setActiveCategory] = useState<'color' | 'hat' | 'glasses' | 'outfit'>('color');
  const [previewCustomization, setPreviewCustomization] = useState<NaviCustomization>(
    naviCustomizationService.getCustomization()
  );
  const [purchaseSuccessMessage, setPurchaseSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = naviCustomizationService.subscribe(() => {
      setCoins(naviCustomizationService.getCoins());
      const current = naviCustomizationService.getCustomization();
      setCustomization(current);
      setPreviewCustomization(current);
      setUnlockedItemIds(naviCustomizationService.getUnlockedItemIds());
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const filteredItems = WARDROBE_ITEMS.filter(item => item.category === activeCategory);

  const handleEquip = (item: WardrobeItem) => {
    naviCustomizationService.equipItem(item);
    speechService.speak(`Equipaste ${item.name}`);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#421D46', '#F59E0B', '#10B981', '#EC4899'],
    });
  };

  const handleBuyAndEquip = (item: WardrobeItem) => {
    if (coins < item.price) {
      alert(`Te faltan ${item.price - coins} monedas. ¡Responde la Trivia para conseguir más!`);
      return;
    }

    const success = naviCustomizationService.spendCoins(item.price);
    if (success) {
      naviCustomizationService.unlockItem(item.id);
      naviCustomizationService.equipItem(item);

      setPurchaseSuccessMessage(`¡Desbloqueaste y equipaste ${item.name}! 🎉`);
      setTimeout(() => setPurchaseSuccessMessage(null), 3500);

      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.5 },
        colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899'],
      });

      speechService.speak(`¡Excelente! Desbloqueaste ${item.name} por ${item.price} monedas.`);
    }
  };

  const isEquipped = (item: WardrobeItem) => {
    if (item.category === 'color') return customization.color === item.value;
    if (item.category === 'hat') return customization.hat === item.value;
    if (item.category === 'glasses') return customization.glasses === item.value;
    if (item.category === 'outfit') return customization.outfit === item.value;
    return false;
  };

  return (
    <div 
      id="modal-navi-wardrobe-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-wardrobe-title"
    >
      <div 
        className={`w-full max-w-4xl max-h-[92vh] rounded-3xl border shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          darkMode 
            ? 'bg-[#251227] border-[#5A3462] text-white' 
            : 'bg-white border-stone-200 text-[#2D1432]'
        }`}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#421D46] via-[#55275B] to-[#6C3473] p-5 sm:p-6 text-white relative">
          <div className="flex items-center justify-between gap-3">
            
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center flex-shrink-0 shadow-inner">
                <Shirt className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/30">
                    Armario & Tienda de Navi 🦉✨
                  </span>
                </div>
                <h2 id="modal-wardrobe-title" className="text-xl sm:text-2xl font-black text-white mt-1 leading-tight">
                  Personaliza a tu Búho Consejero
                </h2>
              </div>
            </div>

            {/* Live Coin Counter */}
            <div className="flex items-center gap-3">
              <div 
                id="wardrobe-coin-counter"
                className="bg-amber-400 text-stone-950 font-black px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg border-2 border-amber-300"
                title="Tus Monedas Navi ganadas en el Quiz"
              >
                <Coins className="w-5 h-5 fill-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                <span className="text-base sm:text-lg tracking-tight font-black">{coins}</span>
                <span className="text-xs uppercase font-extrabold hidden sm:inline">Monedas</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition cursor-pointer"
                aria-label="Cerrar armario"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

        {/* Purchase feedback banner */}
        {purchaseSuccessMessage && (
          <div className="bg-emerald-600 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 text-center flex items-center justify-center gap-2 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{purchaseSuccessMessage}</span>
          </div>
        )}

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 custom-scrollbar">
          
          {/* Left Col: Live Navi Avatar Stage (4 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-between p-6 rounded-3xl bg-stone-100/80 dark:bg-[#1A0C1D] border border-stone-200 dark:border-[#523259] text-center relative overflow-hidden">
            {/* Ambient decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-1 relative z-10">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 dark:text-purple-300">
                Vista Previa en Vivo
              </span>
              <h3 className="text-lg font-black text-stone-900 dark:text-white">
                Así luce tu Navi
              </h3>
            </div>

            {/* Interactive Mascot Display */}
            <div className="my-6 relative z-10 transform scale-110 sm:scale-125">
              <NaviMascot size="lg" mood="happy" showBadge={true} animated={true} />
            </div>

            {/* Currently Equipped Summary */}
            <div className="w-full space-y-2 relative z-10 pt-2 border-t border-stone-200 dark:border-stone-800">
              <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
                <span className="px-2.5 py-1 rounded-full bg-stone-200/90 dark:bg-[#2D1630] font-bold text-stone-800 dark:text-stone-200">
                  🎨 {WARDROBE_ITEMS.find(i => i.category === 'color' && i.value === customization.color)?.name}
                </span>
                {customization.hat !== 'none' && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 font-bold">
                    🎩 {WARDROBE_ITEMS.find(i => i.category === 'hat' && i.value === customization.hat)?.name}
                  </span>
                )}
                {customization.glasses !== 'none' && (
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-900 dark:text-blue-300 font-bold">
                    👓 {WARDROBE_ITEMS.find(i => i.category === 'glasses' && i.value === customization.glasses)?.name}
                  </span>
                )}
                {customization.outfit !== 'none' && (
                  <span className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-900 dark:text-purple-300 font-bold">
                    🧣 {WARDROBE_ITEMS.find(i => i.category === 'outfit' && i.value === customization.outfit)?.name}
                  </span>
                )}
              </div>

              <p className="text-[11px] text-stone-500 dark:text-stone-400 italic">
                “¡Tu Navi personalizado aparecerá en todas las secciones y en el chat!”
              </p>
            </div>
          </div>

          {/* Right Col: Wardrobe Catalog & Categories (7 cols) */}
          <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
            
            {/* Category Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory('color')}
                className={`p-2.5 rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 transition border-2 cursor-pointer ${
                  activeCategory === 'color'
                    ? 'bg-[#421D46] text-white border-[#421D46] shadow-sm'
                    : 'bg-stone-50 dark:bg-[#1E0F23] border-stone-200 dark:border-[#523259] text-stone-700 dark:text-stone-300 hover:border-[#421D46]'
                }`}
              >
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                <span>Plumaje</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('hat')}
                className={`p-2.5 rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 transition border-2 cursor-pointer ${
                  activeCategory === 'hat'
                    ? 'bg-[#421D46] text-white border-[#421D46] shadow-sm'
                    : 'bg-stone-50 dark:bg-[#1E0F23] border-stone-200 dark:border-[#523259] text-stone-700 dark:text-stone-300 hover:border-[#421D46]'
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Gorros</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('glasses')}
                className={`p-2.5 rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 transition border-2 cursor-pointer ${
                  activeCategory === 'glasses'
                    ? 'bg-[#421D46] text-white border-[#421D46] shadow-sm'
                    : 'bg-stone-50 dark:bg-[#1E0F23] border-stone-200 dark:border-[#523259] text-stone-700 dark:text-stone-300 hover:border-[#421D46]'
                }`}
              >
                <Glasses className="w-3.5 h-3.5 text-blue-400" />
                <span>Lentes</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('outfit')}
                className={`p-2.5 rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 transition border-2 cursor-pointer ${
                  activeCategory === 'outfit'
                    ? 'bg-[#421D46] text-white border-[#421D46] shadow-sm'
                    : 'bg-stone-50 dark:bg-[#1E0F23] border-stone-200 dark:border-[#523259] text-stone-700 dark:text-stone-300 hover:border-[#421D46]'
                }`}
              >
                <Shirt className="w-3.5 h-3.5 text-rose-400" />
                <span>Ropa</span>
              </button>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[46vh] overflow-y-auto custom-scrollbar p-1">
              {filteredItems.map((item) => {
                const unlocked = unlockedItemIds.includes(item.id) || item.price === 0;
                const equipped = isEquipped(item);
                const canAfford = coins >= item.price;

                return (
                  <div
                    key={item.id}
                    id={`wardrobe-item-${item.id}`}
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
                      {/* Price badge */}
                      <div>
                        {unlocked ? (
                          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                            {item.price === 0 ? 'Gratis' : 'Desbloqueado'}
                          </span>
                        ) : (
                          <div className="inline-flex items-center gap-1 text-xs font-black text-amber-700 dark:text-amber-400">
                            <Coins className="w-3.5 h-3.5 fill-amber-500" />
                            <span>{item.price} Monedas</span>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
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
                            onClick={() => handleEquip(item)}
                            className="px-3 py-1.5 rounded-xl bg-[#421D46] hover:bg-[#58275D] text-white font-black text-xs transition shadow-xs cursor-pointer"
                          >
                            Equipar
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={!canAfford}
                            onClick={() => handleBuyAndEquip(item)}
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

            {/* Quick Helper to Earn Coins */}
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-center sm:text-left">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center flex-shrink-0 font-black">
                  🪙
                </div>
                <div>
                  <h4 className="text-xs font-black text-amber-950 dark:text-amber-200">
                    ¿Cómo conseguir más monedas?
                  </h4>
                  <p className="text-[11px] text-amber-900/80 dark:text-amber-300">
                    Por cada respuesta correcta en la <strong>Trivia Exprés</strong> ganas <strong>+10 Monedas Navi</strong> y +20 XP.
                  </p>
                </div>
              </div>

              {onNavigateToQuiz && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToQuiz();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#421D46] hover:bg-[#58275D] text-white font-black text-xs flex items-center gap-1.5 whitespace-nowrap transition shadow-sm cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>Jugar Trivia Ahora</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-stone-100 dark:bg-[#190C1C] border-t border-stone-200 dark:border-[#421D46] flex items-center justify-between">
          <p className="text-xs text-stone-600 dark:text-stone-400 font-medium">
            Tus compras y monedas se guardan automáticamente en tu dispositivo.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#421D46] hover:bg-[#58275D] text-white font-extrabold text-xs transition shadow-sm cursor-pointer"
          >
            Listo, volver a la plataforma
          </button>
        </div>

      </div>
    </div>
  );
};

