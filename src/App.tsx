/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EmergencyHotlinesBar } from './components/EmergencyHotlinesBar';
import { Navbar } from './components/Navbar';
import { QuickSearchBanner } from './components/QuickSearchBanner';
import { SearchModal } from './components/SearchModal';
import { HeroSection } from './components/HeroSection';
import { FamilyGuideSection } from './components/FamilyGuideSection';
import { MythsRealitiesSection } from './components/MythsRealitiesSection';
import { EmotionalWellbeingSection } from './components/EmotionalWellbeingSection';
import { WarningSignsAndRightsSection } from './components/WarningSignsAndRightsSection';
import { RutaAtencionSection } from './components/RutaAtencionSection';
import { InteractiveGamesSection } from './components/InteractiveGamesSection';
import { CaseTrackingAndAlerts } from './components/CaseTrackingAndAlerts';
import { StaffTrainingSection } from './components/StaffTrainingSection';
import { AnonymousQuestionsSection } from './components/AnonymousQuestionsSection';
import { EducationalResourcesSection } from './components/EducationalResourcesSection';
import { AboutUsSection } from './components/AboutUsSection';
import { ChatWithNaviModal } from './components/ChatWithNaviModal';
import { ReportCaseModal } from './components/ReportCaseModal';
import { QuickYouthEngagement } from './components/QuickYouthEngagement';
import { LanguageSelectionModal } from './components/LanguageSelectionModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { NotificationRemindersModal } from './components/NotificationRemindersModal';
import { Footer } from './components/Footer';
import { NaviMascot } from './components/NaviMascot';
import { NaviWardrobeModal } from './components/NaviWardrobeModal';
import { MessageCircle, Sparkles, X, Volume2, ShieldAlert } from 'lucide-react';
import { SupportedLanguage } from './utils/i18n';
import { UserProfile } from './types';
import { authStorage } from './utils/authStorage';
import { syncAllScheduledReminders } from './utils/remindersStorage';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(true);
  const [isRemindersModalOpen, setIsRemindersModalOpen] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('es');
  
  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');

  // User Authentication & Profile State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'register' | 'login'>('register');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isNaviWardrobeOpen, setIsNaviWardrobeOpen] = useState<boolean>(false);

  const [xp, setXp] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [quizLaunchRequest, setQuizLaunchRequest] = useState<number>(0);
  const [showNaviFloatingBubble, setShowNaviFloatingBubble] = useState<boolean>(true);

  // Global keyboard shortcut for search (Ctrl+K or ⌘K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+K or ⌘K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      // Check for '/' when not focused on an input/textarea
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Initialize active user session and calculate streak
  useEffect(() => {
    try {
      const savedUser = authStorage.getCurrentUser();
      if (savedUser) {
        const updated = authStorage.calculateUpdatedStreak(savedUser);
        setCurrentUser(updated);
        setXp(updated.xp || 0);
        setStreak(updated.streak || 0);
        authStorage.saveCurrentUser(updated);
      }
    } catch (e) {
      console.warn('Error loading user session:', e);
    }

    // Synchronize and schedule any pending appointment notifications
    try {
      syncAllScheduledReminders();
    } catch (e) {
      console.warn('Error syncing reminders:', e);
    }
  }, []);

  // Initialize language from localStorage if user previously selected it
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('app_language_preference') as SupportedLanguage;
      if (savedLang) {
        setCurrentLanguage(savedLang);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddXp = (amount: number) => {
    setXp(prev => {
      const newXp = prev + amount;
      if (currentUser) {
        const updatedUser = { ...currentUser, xp: newXp };
        setCurrentUser(updatedUser);
        authStorage.saveCurrentUser(updatedUser);
      }
      return newXp;
    });
  };

  const handleIncrementStreak = () => {
    setStreak(prev => {
      const newStreak = prev + 1;
      if (currentUser) {
        const updatedUser = { ...currentUser, streak: newStreak };
        setCurrentUser(updatedUser);
        authStorage.saveCurrentUser(updatedUser);
      }
      return newStreak;
    });
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setXp(user.xp || 0);
    setStreak(user.streak || 0);
    authStorage.saveCurrentUser(user);
  };

  const handleLogout = () => {
    authStorage.saveCurrentUser(null);
    setCurrentUser(null);
    setXp(0);
    setStreak(0);
  };

  const handleUpdateUserProfile = (updated: UserProfile) => {
    setCurrentUser(updated);
    authStorage.saveCurrentUser(updated);
  };

  const handleOpenAuthModal = (mode: 'register' | 'login' = 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      darkMode ? 'bg-[#251027] text-white' : 'bg-brand-cream text-[#2D1A30]'
    }`}>
      
      {/* 1. Top Emergency Hotlines Bar */}
      <EmergencyHotlinesBar />

      {/* 2. Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        xp={xp}
        streak={streak}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenChat={() => setIsChatOpen(true)}
        currentLanguage={currentLanguage}
        onSelectLanguage={(lang) => setCurrentLanguage(lang)}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
        currentUser={currentUser}
        onOpenAuthModal={handleOpenAuthModal}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenWardrobe={() => setIsNaviWardrobeOpen(true)}
        onOpenReminders={() => setIsRemindersModalOpen(true)}
        onOpenSearch={(query) => {
          setSearchInitialQuery(query || '');
          setIsSearchOpen(true);
        }}
      />

      {/* 3. Main Content Views */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'inicio' && (
          <div className="space-y-12 animate-fadeIn">
            <HeroSection
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenChat={() => setIsChatOpen(true)}
              darkMode={darkMode}
              currentLanguage={currentLanguage}
              onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
              currentUser={currentUser}
              onOpenAuthModal={handleOpenAuthModal}
              onOpenProfileModal={() => setIsProfileModalOpen(true)}
              onOpenWardrobeModal={() => setIsNaviWardrobeOpen(true)}
            />
            <QuickYouthEngagement
              darkMode={darkMode}
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenChat={() => setIsChatOpen(true)}
              onAddXp={handleAddXp}
              streak={streak}
              onIncrementStreak={handleIncrementStreak}
              onOpenWardrobeModal={() => setIsNaviWardrobeOpen(true)}
              quizLaunchRequest={quizLaunchRequest}
            />
            <div className="pt-4">
              <EmotionalWellbeingSection
                darkMode={darkMode}
                onOpenChat={() => setIsChatOpen(true)}
                onOpenReportModal={() => setIsReportModalOpen(true)}
                onAddXp={handleAddXp}
              />
            </div>
            <div className="pt-4">
              <FamilyGuideSection
                darkMode={darkMode}
                onAddXp={handleAddXp}
              />
            </div>
            <div className="pt-4">
              <WarningSignsAndRightsSection
                darkMode={darkMode}
                onOpenReportModal={() => setIsReportModalOpen(true)}
                onOpenChat={() => setIsChatOpen(true)}
              />
            </div>
            <div className="pt-4">
              <MythsRealitiesSection
                darkMode={darkMode}
                onAddXp={handleAddXp}
              />
            </div>
          </div>
        )}

        {activeTab === 'familias' && (
          <div className="animate-fadeIn">
            <FamilyGuideSection
              darkMode={darkMode}
              onAddXp={handleAddXp}
            />
          </div>
        )}

        {activeTab === 'mitos' && (
          <div className="animate-fadeIn">
            <MythsRealitiesSection
              darkMode={darkMode}
              onAddXp={handleAddXp}
            />
          </div>
        )}

        {activeTab === 'derechos' && (
          <div className="space-y-12 animate-fadeIn">
            <EmotionalWellbeingSection
              darkMode={darkMode}
              onOpenChat={() => setIsChatOpen(true)}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              onAddXp={handleAddXp}
            />
            <div className="pt-4 border-t border-brand-lilac/30">
              <WarningSignsAndRightsSection
                darkMode={darkMode}
                onOpenReportModal={() => setIsReportModalOpen(true)}
                onOpenChat={() => setIsChatOpen(true)}
              />
            </div>
          </div>
        )}

        {activeTab === 'ruta' && (
          <div className="animate-fadeIn">
            <RutaAtencionSection
              darkMode={darkMode}
              onOpenReminders={() => setIsRemindersModalOpen(true)}
            />
          </div>
        )}

        {activeTab === 'juegos' && (
          <div className="animate-fadeIn">
            <InteractiveGamesSection
              darkMode={darkMode}
              xp={xp}
              onAddXp={handleAddXp}
              streak={streak}
              onIncrementStreak={handleIncrementStreak}
            />
          </div>
        )}

        {activeTab === 'seguimiento' && (
          <div className="animate-fadeIn">
            <CaseTrackingAndAlerts
              darkMode={darkMode}
              onOpenReportModal={() => setIsReportModalOpen(true)}
            />
          </div>
        )}

        {activeTab === 'capacitacion' && (
          <div className="animate-fadeIn">
            <StaffTrainingSection
              darkMode={darkMode}
              onAddXp={handleAddXp}
            />
          </div>
        )}

        
{activeTab === 'mapa' && (
  <div className="animate-fadeIn max-w-4xl mx-auto py-8">
    <div
      className={`rounded-3xl p-6 sm:p-10 text-center border shadow-lg ${
        darkMode
          ? "bg-[#321734] border-[#5B3E60] text-white"
          : "bg-white border-[#E5D7DE] text-[#2D1A30]"
      }`}
    >
      <div className="text-6xl mb-5">🗺️</div>

      <h2 className="text-2xl sm:text-3xl font-black text-[#8B5E83] dark:text-[#E8C2B0] mb-4">
        Centros de Salud del Perú
      </h2>

      <p className="text-sm sm:text-base opacity-80 mb-6">
        Encuentra establecimientos de salud cerca de ti.
        Explora el mapa interactivo del Perú, identifica
        centros médicos y consulta cómo llegar.
      </p>

      <button
        type="button"
        onClick={() => setIsReportModalOpen(true)}
        className="bg-[#4B2E4F] hover:bg-[#6B4370] text-white font-bold px-8 py-4 rounded-xl shadow-md transition transform hover:scale-105"
      >
        📍 Buscar centros de salud cercanos
      </button>

      <p className="text-xs opacity-60 mt-5">
        La ubicación solamente se solicitará con tu permiso.
        Los resultados dependen de los establecimientos
        registrados en OpenStreetMap.
      </p>
    </div>
  </div>
)}


        {activeTab === 'recursos' && (
          <div className="animate-fadeIn">
            <EducationalResourcesSection
              darkMode={darkMode}
              onOpenChat={() => setIsChatOpen(true)}
              onAddXp={handleAddXp}
            />
          </div>
        )}

        {activeTab === 'nosotras' && (
          <div className="animate-fadeIn">
            <AboutUsSection
              darkMode={darkMode}
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenChat={() => setIsChatOpen(true)}
            />
          </div>
        )}

        {activeTab === 'preguntas' && (
          <div className="animate-fadeIn">
            <AnonymousQuestionsSection
              darkMode={darkMode}
              onOpenChat={() => setIsChatOpen(true)}
              onAddXp={handleAddXp}
            />
          </div>
        )}
      </main>

      {/* 4. Footer */}
      <Footer
        onNavigate={(tab) => setActiveTab(tab)}
        onOpenChat={() => setIsChatOpen(true)}
        darkMode={darkMode}
      />

      {/* 5. Floating Mascot Navi Trigger with Speech Bubble */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 pointer-events-auto">
        {showNaviFloatingBubble && (
          <div className="bg-white dark:bg-[#351C37] text-brand-plum dark:text-white p-3 rounded-2xl shadow-xl border border-brand-lilac/40 max-w-xs text-xs animate-bounce relative">
            <button
              onClick={() => setShowNaviFloatingBubble(false)}
              className="absolute top-1.5 right-1.5 p-0.5 text-brand-slate hover:text-brand-plum rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <p className="font-bold pr-4">
              “¿Tienes una duda? Suéltala. Navi no te va a mirar raro.”
            </p>
            <span className="text-[10px] text-brand-slate dark:text-brand-soft block mt-1">
              Haz clic abajo para chatear en privado 🦉
            </span>
          </div>
        )}

        <button
          id="btn-floating-navi-chat"
          onClick={() => setIsChatOpen(true)}
          className="bg-brand-plum hover:bg-brand-slate text-white p-3 sm:p-3.5 rounded-full shadow-2xl transition transform hover:scale-105 active:scale-95 flex items-center gap-2 border-2 border-brand-lilac group"
          title="Abrir chat confidencial con Navi"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <NaviMascot size="sm" showBadge={false} animated={true} />
          </div>
          <span className="hidden sm:inline font-extrabold text-xs text-white">
            Hablar con Navi
          </span>
        </button>
      </div>

      {/* 6. Chat with Navi Modal */}
      <ChatWithNaviModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        darkMode={darkMode}
        onAddXp={handleAddXp}
        currentLanguage={currentLanguage as any}
      />

      {/* 7. Confidential Case Report Modal */}
      <ReportCaseModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        darkMode={darkMode}
        onAddXp={handleAddXp}
      />

      {/* 8. Initial Language / Native Tongue Selection Modal */}
      {isLanguageModalOpen && (
        <LanguageSelectionModal
          currentLanguage={currentLanguage}
          onSelectLanguage={(lang) => setCurrentLanguage(lang)}
          onClose={() => setIsLanguageModalOpen(false)}
          darkMode={darkMode}
        />
      )}

      {/* 9. User Authentication (Register / Login / Guest) Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalMode}
        darkMode={darkMode}
      />

      {/* 10. Private User Profile & Preferences Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={currentUser}
        onLogout={handleLogout}
        onUpdateUser={handleUpdateUserProfile}
        onOpenAuthModal={() => handleOpenAuthModal('register')}
        darkMode={darkMode}
      />

      {/* 11. Global Quick Search Modal (Derechos, Guías, Rutas de Atención) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(tab) => setActiveTab(tab)}
        darkMode={darkMode}
        initialQuery={searchInitialQuery}
      />

      {/* 12. Browser Notification & Appointment Reminders Modal */}
      <NotificationRemindersModal
        isOpen={isRemindersModalOpen}
        onClose={() => setIsRemindersModalOpen(false)}
        darkMode={darkMode}
        onOpenChat={() => {
          setIsRemindersModalOpen(false);
          setIsChatOpen(true);
        }}
      />

      <NaviWardrobeModal
        isOpen={isNaviWardrobeOpen}
        onClose={() => setIsNaviWardrobeOpen(false)}
        darkMode={darkMode}
        onNavigateToQuiz={() => {
          setIsNaviWardrobeOpen(false);
          setActiveTab('inicio');
          setQuizLaunchRequest(request => request + 1);
        }}
      />

    </div>
  );
}
