import React, { useState, useRef, useEffect } from 'react';
import { NaviMascot } from './NaviMascot';
import { 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  Flame, 
  Sparkles,
  MessageCircle,
  ChevronDown,
  GraduationCap,
  HelpCircle,
  ClipboardList,
  Check,
  UserPlus,
  User,
  Shield,
  Heart,
  Search,
  Bell,
  MapPin,
  BookOpen,
  Compass,
  Coins,
  Shirt
} from 'lucide-react';
import { speechService } from '../utils/speech';
import { 
  SUPPORTED_LANGUAGES, 
  SupportedLanguage, 
  TRANSLATIONS 
} from '../utils/i18n';
import { UserProfile } from '../types';
import { naviCustomizationService } from '../utils/naviCustomization';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  xp: number;
  streak: number;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenChat: () => void;
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  onOpenLanguageModal: () => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: (mode?: 'register' | 'login') => void;
  onOpenProfileModal: () => void;
  onOpenSearch?: (initialQuery?: string) => void;
  onOpenReminders?: () => void;
  onOpenWardrobe?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  xp,
  streak,
  darkMode,
  setDarkMode,
  onOpenChat,
  currentLanguage,
  onSelectLanguage,
  onOpenLanguageModal,
  currentUser,
  onOpenAuthModal,
  onOpenProfileModal,
  onOpenSearch,
  onOpenReminders,
  onOpenWardrobe,
}) => {
  const [coins, setCoins] = useState<number>(naviCustomizationService.getCoins());
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState<boolean>(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.es;
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    naviCustomizationService.subscribe(() => setCoins(naviCustomizationService.getCoins()));
    return speechService.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleAudioReader = () => {
    if (isSpeaking) {
      speechService.stop();
    } else {
      speechService.speak(
        t.naviIntroSpeech,
        currentLangObj.speechLang,
        1.0
      );
    }
  };

  const primaryNavItems = [
    { id: 'inicio', label: t.navInicio, shortLabel: 'Inicio' },
    { id: 'mitos', label: t.navMitos, shortLabel: 'Mitos' },
    { id: 'derechos', label: t.navBienestar, shortLabel: 'Bienestar' },
    { id: 'ruta', label: t.navRuta, shortLabel: 'Ruta' },
    { id: 'juegos', label: t.navJuegos, shortLabel: 'Juegos' },
  ];

  const secondaryNavItems = [
    { id: 'familias', label: t.navFamilias || 'Familias & Hijos', icon: Shield, desc: 'Diálogo familiar, crianza y prevención' },
    { id: 'nosotras', label: t.navNosotras || 'Sobre Nosotras 💗', icon: Heart, desc: 'Conoce a las fundadoras Nikolle y Alexandra' },
    
{
  id: 'mapa',
  label: '🏥 Centros de Salud Cercanos',
  icon: MapPin,
  desc: 'Encuentra centros de salud cerca de ti'
},

    { id: 'recursos', label: t.navRecursos || 'Guías & Recursos', icon: BookOpen, desc: 'Infografías y afiches en PDF descargables' },
    { id: 'seguimiento', label: t.navSeguimiento, icon: ClipboardList, desc: 'Consulta de tickets confidenciales' },
    { id: 'capacitacion', label: t.navCapacitacion, icon: GraduationCap, desc: 'Guías para docentes y personal de salud' },
    { id: 'preguntas', label: t.navPreguntas, icon: HelpCircle, desc: 'Buzón confidencial con respuestas de Navi' },
  ];

  const isSecondaryActive = secondaryNavItems.some(item => item.id === activeTab);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#1A0F1D]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-[#4B2E4F]/50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[68px] gap-2">
          
          {/* Brand / Logo with Fixed Compact Fit */}
          <div 
            id="nav-logo"
            onClick={() => setActiveTab('inicio')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group flex-shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#4B2E4F]/5 dark:bg-[#3B1F3D] border border-[#CFC3DE]/70 dark:border-[#5B3E60] p-1 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
              <NaviMascot size="sm" animated={false} showBadge={false} />
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="flex items-center">
                <span className="text-xs sm:text-sm font-black tracking-tight text-[#4B2E4F] dark:text-white leading-none whitespace-nowrap">
                  UNIDAS POR UN CAMINO SEGURO
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-medium text-stone-500 dark:text-stone-400 leading-none mt-1 hidden 2xl:block">
                Plataforma Oficial de Acompañamiento & Prevención
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Responsive, Never Overlapping) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-shrink-0">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-tight xl:tracking-normal transition-all duration-150 whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'bg-[#4B2E4F] text-white shadow-xs'
                      : 'text-stone-600 dark:text-stone-300 hover:text-[#4B2E4F] dark:hover:text-white hover:bg-stone-100 dark:hover:bg-[#3B1F3D]/50'
                  }`}
                >
                  <span className="hidden xl:inline">{item.label}</span>
                  <span className="xl:hidden">{item.shortLabel}</span>
                </button>
              );
            })}

            {/* Dropdown for Secondary Tools */}
            <div className="relative flex-shrink-0" ref={dropdownRef}>
              <button
                id="btn-nav-more-dropdown"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 whitespace-nowrap flex-shrink-0 ${
                  isSecondaryActive
                    ? 'bg-[#7A6786] text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-[#4B2E4F] dark:hover:text-white hover:bg-stone-100 dark:hover:bg-[#3B1F3D]/50'
                }`}
              >
                <span>Más</span>
                <ChevronDown className={`w-3 h-3 opacity-70 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 max-h-[80vh] overflow-y-auto rounded-xl bg-white dark:bg-[#241226] border border-stone-200 dark:border-[#5B3E60] shadow-2xl p-1.5 z-50 animate-fadeIn">
                  {secondaryNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMoreDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg transition flex items-start gap-2.5 ${
                          isActive
                            ? 'bg-stone-100 dark:bg-[#3B1F3D] text-[#4B2E4F] dark:text-white'
                            : 'hover:bg-stone-50 dark:hover:bg-[#3B1F3D]/60 text-stone-700 dark:text-stone-200'
                        }`}
                      >
                        <div className="p-1 rounded-md bg-[#4B2E4F]/5 dark:bg-[#4B2E4F] text-[#4B2E4F] dark:text-stone-200 mt-0.5 flex-shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-tight">{item.label}</p>
                          <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">{item.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Utilities Cluster (Fixed Sized, Never Overlapping) */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            
            {/* Search Trigger Button */}
            <button
              id="btn-nav-search-trigger"
              type="button"
              onClick={() => onOpenSearch && onOpenSearch()}
              className="h-8 px-2 rounded-lg border border-stone-200/90 dark:border-[#5B3E60]/80 bg-stone-50/90 dark:bg-[#28132A] hover:bg-stone-100 dark:hover:bg-[#3B1F3D] text-stone-600 dark:text-stone-300 transition text-xs font-medium flex items-center justify-center gap-1.5 flex-shrink-0 group"
              title="Buscar derechos, guías o rutas (Ctrl+K o /)"
              aria-label="Buscar en la plataforma"
            >
              <Search className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#4B2E4F] dark:group-hover:text-white transition-colors" />
              <span className="hidden 2xl:inline text-[11px] text-stone-500 dark:text-stone-400 font-normal">Buscar...</span>
              <kbd className="hidden 2xl:inline-flex items-center text-[9px] text-stone-400 dark:text-stone-500 bg-white dark:bg-[#1E1120] border border-stone-200 dark:border-[#5B3E60] px-1 py-0.2 rounded font-sans">
                ⌘K
              </kbd>
            </button>

            {/* Language Selector */}
            <div className="relative hidden sm:block flex-shrink-0" ref={langDropdownRef}>
              <button
                id="btn-language-selector"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="h-8 px-2 rounded-lg border border-stone-200 dark:border-[#5B3E60] bg-stone-50 dark:bg-[#28132A] hover:bg-stone-100 dark:hover:bg-[#3B1F3D] text-stone-700 dark:text-stone-200 transition text-xs font-semibold flex items-center gap-1 flex-shrink-0"
                title="Cambiar idioma o lengua nativa"
                aria-label="Seleccionar idioma"
              >
                <span className="text-xs">{currentLangObj.flagEmoji}</span>
                <span className="text-[11px] font-bold uppercase">{currentLangObj.code}</span>
                <ChevronDown className={`w-2.5 h-2.5 opacity-60 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white dark:bg-[#241226] border border-stone-200 dark:border-[#5B3E60] shadow-2xl p-1.5 z-50 animate-fadeIn">
                  <div className="px-2 py-1 border-b border-stone-100 dark:border-[#3B1F3D] flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Idioma
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setLangDropdownOpen(false);
                        onOpenLanguageModal();
                      }}
                      className="text-[10px] font-bold text-[#4B2E4F] dark:text-brand-soft hover:underline"
                    >
                      Todos
                    </button>
                  </div>
                  <div className="space-y-0.5 mt-1">
                    {SUPPORTED_LANGUAGES.map((lang) => {
                      const isSelected = currentLanguage === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            onSelectLanguage(lang.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 rounded-lg transition flex items-center justify-between text-xs ${
                            isSelected
                              ? 'bg-[#4B2E4F] text-white font-bold'
                              : 'hover:bg-stone-50 dark:hover:bg-[#3B1F3D] text-stone-700 dark:text-stone-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{lang.flagEmoji}</span>
                            <span className="font-semibold">{lang.name}</span>
                          </div>
                          {isSelected && <Check className="w-3 h-3" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Minimal Toggle */}
            <button
              id="btn-dark-mode"
              onClick={() => setDarkMode(!darkMode)}
              className="hidden md:flex h-8 w-8 items-center justify-center rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#2C162E] transition flex-shrink-0"
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
              aria-label="Alternar modo oscuro"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Navi Wardrobe & Coins Button */}
            <button
              id="btn-nav-wardrobe-trigger"
              type="button"
              onClick={() => onOpenWardrobe && onOpenWardrobe()}
              className="h-8 px-2 sm:px-2.5 rounded-lg border border-amber-300 dark:border-amber-700/80 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-stone-900 dark:text-amber-200 transition text-xs font-black flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-xs active:scale-95"
              title="Armario de Navi: Personaliza colores y ropa con tus monedas del Quiz"
              aria-label="Abrir armario y tienda de Navi"
            >
              <Coins className="w-3.5 h-3.5 fill-amber-500 text-amber-600 animate-pulse" />
              <span>{coins}</span>
              <span className="hidden xl:inline text-[10px] text-amber-900 dark:text-amber-300 font-extrabold uppercase">Navi</span>
            </button>

            {/* Notification Reminders Trigger */}
            <button
              id="btn-nav-reminders-trigger"
              type="button"
              onClick={() => onOpenReminders && onOpenReminders()}
              className="relative h-8 w-8 flex items-center justify-center rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#2C162E] transition border border-transparent hover:border-stone-200 dark:hover:border-[#5B3E60] flex-shrink-0"
              title="Recordatorios de citas y avisos de Navi"
              aria-label="Abrir recordatorios de citas"
            >
              <Bell className="w-4 h-4 text-[#4B2E4F] dark:text-[#E8C2B0]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full animate-pulse ring-2 ring-white dark:ring-[#241226]" />
            </button>

            {/* User Account / Profile */}
            {currentUser && !currentUser.isGuest ? (
              <button
                id="btn-user-profile-header"
                type="button"
                onClick={onOpenProfileModal}
                className="h-8 flex items-center gap-1.5 px-2 rounded-lg border border-stone-200 dark:border-[#5B3E60] bg-white dark:bg-[#2C162E] hover:bg-stone-50 dark:hover:bg-[#3B1F3D] text-stone-800 dark:text-white transition text-xs font-bold shadow-xs active:scale-95 flex-shrink-0"
                title={`Perfil de @${currentUser.username}`}
              >
                <div 
                  className="w-5 h-5 rounded-md flex items-center justify-center text-xs text-white flex-shrink-0"
                  style={{ backgroundColor: currentUser.avatarColor || '#4B2E4F' }}
                >
                  {currentUser.avatarIcon || '🦉'}
                </div>
                <span className="hidden xl:inline text-xs font-extrabold max-w-[80px] truncate">
                  @{currentUser.username}
                </span>
                {streak > 0 && (
                  <span className="flex items-center gap-0.5 text-amber-600 dark:text-amber-300 font-black text-[10px] bg-amber-50 dark:bg-amber-950/40 px-1 py-0.2 rounded border border-amber-200/60 dark:border-amber-800/40">
                    <Flame className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                    {streak}d
                  </span>
                )}
              </button>
            ) : (
              <button
                id="btn-create-account-header"
                type="button"
                onClick={() => onOpenAuthModal('login')}
                className="hidden sm:flex h-8 items-center gap-1 px-2.5 rounded-lg border border-stone-200 dark:border-[#5B3E60] bg-white dark:bg-[#2C162E] hover:bg-stone-50 dark:hover:bg-[#3B1F3D] text-stone-700 dark:text-stone-200 text-xs font-bold transition flex-shrink-0"
                title="Acceder a tu cuenta"
              >
                <User className="w-3.5 h-3.5 text-[#7A6786] dark:text-[#A58DB5]" />
                <span className="hidden md:inline">Acceder</span>
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-[#2C162E] transition flex-shrink-0 ml-0.5"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Spacious, Organized & Sophisticated) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#1A0F1D] border-t border-stone-200 dark:border-[#4B2E4F]/60 px-5 py-4 space-y-4 animate-fadeIn shadow-2xl max-h-[85vh] overflow-y-auto">
          
          {/* User Account / Welcome Card */}
          {currentUser && !currentUser.isGuest ? (
            <div 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfileModal();
              }}
              className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-[#28132A] border border-stone-200 dark:border-[#5B3E60] cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg text-white shadow-xs"
                  style={{ backgroundColor: currentUser.avatarColor || '#4B2E4F' }}
                >
                  {currentUser.avatarIcon || '🦉'}
                </div>
                <div>
                  <p className="text-xs font-extrabold text-stone-900 dark:text-white">
                    {currentUser.displayName}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    @{currentUser.username} • {streak}d de racha • {xp} XP
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#4B2E4F] dark:text-brand-soft">
                Ver perfil →
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal('register');
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#4B2E4F] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <UserPlus className="w-3.5 h-3.5 text-amber-300" />
                <span>Crear Cuenta</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal('login');
                }}
                className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-[#5B3E60] text-xs font-bold text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-[#2C162E]"
              >
                Iniciar Sesión
              </button>
            </div>
          )}

          {/* Navi Wardrobe & Coins Button inside Mobile Drawer */}
          {onOpenWardrobe && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWardrobe();
              }}
              className="w-full py-2.5 px-3.5 rounded-xl border border-amber-300/70 dark:border-amber-700/60 bg-gradient-to-r from-amber-50 via-amber-100/50 to-orange-50 dark:from-amber-950/40 dark:via-[#351b36] dark:to-[#2a132c] text-amber-950 dark:text-amber-200 text-xs font-bold flex items-center justify-between shadow-xs hover:brightness-105 transition mb-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-400/25 text-amber-600 dark:text-amber-300 flex items-center justify-center font-bold text-base shadow-2xs">
                  🪙
                </div>
                <div className="text-left">
                  <span className="block leading-tight font-bold">Armario de Navi</span>
                  <span className="text-[10px] font-medium text-amber-800/80 dark:text-amber-300/80">
                    Cambiar color y accesorios
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-extrabold bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                <span>{coins} Monedas</span>
              </span>
            </button>
          )}

          {/* Search Trigger Button inside Mobile Drawer */}
          <div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch && onOpenSearch();
              }}
              className="w-full py-2.5 px-3.5 rounded-xl border border-stone-200 dark:border-[#5B3E60] bg-stone-50 dark:bg-[#28132A] text-stone-600 dark:text-stone-300 text-xs font-semibold flex items-center justify-between shadow-2xs hover:bg-stone-100 dark:hover:bg-[#3B1F3D] transition mb-2"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#4B2E4F] dark:text-brand-soft" />
                <span>Buscar derechos, guías, rutas...</span>
              </div>
              <span className="text-[10px] font-bold text-[#4B2E4F] dark:text-brand-soft uppercase">
                Abrir
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReminders && onOpenReminders();
              }}
              className="w-full py-2.5 px-3.5 rounded-xl border border-stone-200 dark:border-[#5B3E60] bg-stone-50 dark:bg-[#28132A] text-stone-600 dark:text-stone-300 text-xs font-semibold flex items-center justify-between shadow-2xs hover:bg-stone-100 dark:hover:bg-[#3B1F3D] transition"
            >
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                <span>Recordatorios y Alertas de Citas</span>
              </div>
              <span className="text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">
                Nativo
              </span>
            </button>
          </div>

          {/* Navigation Links Grid */}
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-1 mb-1">
              Navegación
            </p>
            {[...primaryNavItems, ...secondaryNavItems].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                    isActive
                      ? 'bg-[#4B2E4F] text-white font-bold'
                      : 'text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-[#28132A]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-white/80" />}
                </button>
              );
            })}
          </div>

          {/* Quick Accessibility & Theme in Mobile Drawer */}
          <div className="pt-3 border-t border-stone-200 dark:border-[#4B2E4F]/60 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={toggleAudioReader}
              className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                isSpeaking
                  ? 'bg-amber-500 text-white border-amber-600'
                  : 'border-stone-200 dark:border-[#5B3E60] text-stone-700 dark:text-stone-200'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? 'Detener Voz' : 'Lector de Voz'}</span>
            </button>

            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="flex-1 py-2 px-3 rounded-xl border border-stone-200 dark:border-[#5B3E60] text-xs font-semibold text-stone-700 dark:text-stone-200 flex items-center justify-center gap-2"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              <span>{darkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
            </button>
          </div>

          {/* Language Selector in Mobile Drawer */}
          <div className="pt-2 border-t border-stone-200 dark:border-[#4B2E4F]/60">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-1 mb-2">
              Idioma / Lengua Originaria
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = currentLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLanguage(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs flex items-center gap-2 transition font-medium border ${
                      isSelected
                        ? 'bg-[#4B2E4F] text-white border-[#4B2E4F]'
                        : 'bg-stone-50 dark:bg-[#28132A] text-stone-700 dark:text-stone-200 border-stone-200 dark:border-[#5B3E60]'
                    }`}
                  >
                    <span>{lang.flagEmoji}</span>
                    <span className="truncate">{lang.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </header>
  );
};
