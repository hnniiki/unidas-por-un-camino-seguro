import React, { useState } from 'react';
import { 
  Languages, 
  Check, 
  ArrowRight, 
  Volume2, 
  Sparkles,
  Heart
} from 'lucide-react';
import { 
  SUPPORTED_LANGUAGES, 
  SupportedLanguage, 
  TRANSLATIONS, 
  LanguageOption 
} from '../utils/i18n';
import { speechService } from '../utils/speech';
import { NaviMascot } from './NaviMascot';

interface LanguageSelectionModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  darkMode: boolean;
}

export const LanguageSelectionModal: React.FC<LanguageSelectionModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
  darkMode,
}) => {
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(currentLanguage);
  const [rememberPreference, setRememberPreference] = useState<boolean>(true);

  if (isOpen === false) return null;

  const dict = TRANSLATIONS[selectedLang] || TRANSLATIONS.es;
  const activeOption = SUPPORTED_LANGUAGES.find(l => l.code === selectedLang) || SUPPORTED_LANGUAGES[0];

  const handleConfirm = () => {
    onSelectLanguage(selectedLang);
    if (rememberPreference) {
      try {
        localStorage.setItem('app_language_preference', selectedLang);
      } catch (e) {
        console.warn('Could not save language preference:', e);
      }
    }
    onClose();
  };

  const handlePlayGreeting = (lang: LanguageOption, e: React.MouseEvent) => {
    e.stopPropagation();
    speechService.speak(lang.greeting, lang.speechLang, 0.95);
  };

  return (
    <div 
      id="modal-language-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-lang-title"
    >
      <div 
        className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          darkMode 
            ? 'bg-[#251227] border-[#5A3462] text-white' 
            : 'bg-white border-stone-200 text-[#2D1432]'
        }`}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#421D46] via-[#522958] to-[#63356A] p-6 sm:p-7 text-white relative">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center flex-shrink-0 shadow-inner">
                <Languages className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/30">
                    Multilingüe & Intercultural
                  </span>
                </div>
                <h2 id="modal-lang-title" className="text-xl sm:text-2xl font-black text-white mt-1.5 leading-tight">
                  {dict.welcomeModalTitle}
                </h2>
              </div>
            </div>

            <div className="hidden sm:block flex-shrink-0">
              <NaviMascot size="sm" mood="happy" />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-purple-100 mt-3 leading-relaxed font-medium">
            {dict.welcomeModalSubtitle}
          </p>
        </div>

        {/* Modal Body: Language Cards */}
        <div className="p-6 sm:p-7 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm font-extrabold text-[#2D1432] dark:text-white">
              {dict.chooseLanguage}
            </p>
            <span className="text-[11px] text-[#63356A] dark:text-purple-200 font-bold">
              5 opciones disponibles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = selectedLang === lang.code;
              return (
                <div
                  key={lang.code}
                  id={`lang-card-${lang.code}`}
                  onClick={() => setSelectedLang(lang.code)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedLang(lang.code);
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between text-left relative group ${
                    isSelected
                      ? 'bg-purple-50 dark:bg-[#421D46]/60 border-[#421D46] dark:border-amber-300 shadow-md scale-[1.01]'
                      : darkMode
                        ? 'bg-[#1D0E20] border-[#4E2B54] hover:border-purple-400 hover:bg-[#2D1630]'
                        : 'bg-stone-50 border-stone-200 hover:border-[#421D46] hover:bg-white'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" role="img" aria-label={lang.name}>
                          {lang.flagEmoji}
                        </span>
                        <span className="font-black text-sm sm:text-base text-stone-900 dark:text-white">
                          {lang.name}
                        </span>
                      </div>

                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-[#421D46] dark:bg-amber-300 text-white dark:text-stone-950 flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-stone-200/80 dark:bg-[#381B3C] text-stone-800 dark:text-purple-200">
                          {lang.badgeText}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-bold text-[#421D46] dark:text-amber-200">
                      {lang.nativeName}
                    </p>

                    <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-snug">
                      {lang.region}
                    </p>
                  </div>

                  {/* Audio Greeting preview */}
                  <div className="mt-3 pt-2.5 border-t border-stone-200 dark:border-stone-700/60 flex items-center justify-between">
                    <span className="text-[10px] font-medium italic text-stone-600 dark:text-stone-300 truncate max-w-[170px]">
                      "{lang.greeting.slice(0, 32)}..."
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handlePlayGreeting(lang, e)}
                      className="p-1.5 rounded-lg bg-white dark:bg-[#2F1732] border border-stone-300 dark:border-stone-600 hover:bg-stone-100 text-stone-800 dark:text-purple-200 transition"
                      title={`Escuchar saludo en ${lang.name}`}
                      aria-label={`Escuchar saludo en ${lang.name}`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active selection preview banner */}
          <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-[#1D0E20] border border-stone-200 dark:border-[#4E2B54] flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#421D46] text-white flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-xs">
              {activeOption.flagEmoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-stone-900 dark:text-white">
                  Seleccionado: {activeOption.name} ({activeOption.nativeName})
                </span>
              </div>
              <p className="text-[11px] text-stone-700 dark:text-stone-300 truncate mt-0.5">
                {activeOption.greeting}
              </p>
            </div>
          </div>

          {/* Remember Choice Checkbox */}
          <div className="flex items-center gap-2.5 pt-1">
            <input 
              type="checkbox"
              id="chk-remember-lang"
              checked={rememberPreference}
              onChange={(e) => setRememberPreference(e.target.checked)}
              className="w-4 h-4 rounded text-[#421D46] focus:ring-[#421D46] accent-[#421D46] cursor-pointer"
            />
            <label 
              htmlFor="chk-remember-lang"
              className="text-xs text-stone-800 dark:text-stone-200 font-semibold cursor-pointer select-none"
            >
              {dict.rememberChoice}
            </label>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 sm:p-6 bg-stone-100/80 dark:bg-[#1C0D20] border-t border-stone-200 dark:border-[#421D46] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-stone-600 dark:text-stone-300 text-center sm:text-left font-medium">
            {dict.changeLanguageAnytime}
          </p>

          <button
            id="btn-confirm-language"
            type="button"
            onClick={handleConfirm}
            className="w-full sm:w-auto bg-[#421D46] hover:bg-[#58275D] active:scale-95 text-white font-extrabold px-6 py-3 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <span>{dict.enterPlatform}</span>
            <ArrowRight className="w-4 h-4 text-purple-200" />
          </button>
        </div>
      </div>
    </div>
  );
};
