import React, { useState } from 'react';
import { 
  UserPlus, 
  LogIn, 
  User, 
  Lock, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  Eye, 
  EyeOff, 
  Check, 
  Flame, 
  Trophy, 
  Compass,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types';
import { 
  authStorage, 
  AVATAR_OPTIONS, 
  AVATAR_COLORS, 
  INTEREST_TAGS 
} from '../utils/authStorage';
import { NaviMascot } from './NaviMascot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  initialMode?: 'register' | 'login';
  darkMode?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'register',
  darkMode = false
}) => {
  const [mode, setMode] = useState<'register' | 'login'>(initialMode);
  
  // Registration form fields
  const [regUsername, setRegUsername] = useState('');
  const [regDisplayName, setRegDisplayName] = useState('');
  const [regAge, setRegAge] = useState<number>(15);
  const [regBirthDate, setRegBirthDate] = useState('2009-06-15');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAvatarIcon, setRegAvatarIcon] = useState('🦉');
  const [regAvatarColor, setRegAvatarColor] = useState('#4B2E4F');
  const [regInterests, setRegInterests] = useState<string[]>([
    'Prevención & Anticoncepción',
    'Salud Emocional & Autoestima'
  ]);

  // Login form fields
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // UI helpers
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1); // Step 1: Basic info, Step 2: Avatar & Interests

  if (!isOpen) return null;

  const handleToggleInterest = (interest: string) => {
    if (regInterests.includes(interest)) {
      if (regInterests.length > 1) {
        setRegInterests(regInterests.filter(i => i !== interest));
      }
    } else {
      setRegInterests([...regInterests, interest]);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (step === 1) {
      if (!regUsername.trim()) {
        setErrorMessage('Por favor elige un seudónimo (ej: estrella_andina, lobo_guia).');
        return;
      }
      if (regUsername.trim().length < 3) {
        setErrorMessage('El seudónimo debe tener al menos 3 caracteres.');
        return;
      }
      if (regPassword.length < 4) {
        setErrorMessage('La contraseña debe tener al menos 4 caracteres.');
        return;
      }
      if (regPassword !== regConfirmPassword) {
        setErrorMessage('Las contraseñas no coinciden.');
        return;
      }
      // Passed step 1, proceed to customization
      setStep(2);
      return;
    }

    // Step 2 Final Submission
    const result = await authStorage.registerUser(
      regUsername,
      regDisplayName || regUsername,
      regAge,
      regBirthDate,
      regPassword,
      regAvatarIcon,
      regAvatarColor,
      regInterests
    );

    if (!result.success || !result.user) {
      setErrorMessage(result.error || 'Hubo un problema al crear tu cuenta.');
      return;
    }

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    onLoginSuccess(result.user);
    onClose();
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginUsername.trim()) {
      setErrorMessage('Ingresa tu seudónimo.');
      return;
    }
    if (!loginPassword) {
      setErrorMessage('Ingresa tu contraseña.');
      return;
    }

    const result = await authStorage.loginUser(loginUsername, loginPassword);
    if (!result.success || !result.user) {
      setErrorMessage(result.error || 'Credenciales incorrectas.');
      return;
    }

    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    onLoginSuccess(result.user);
    onClose();
  };

  const handleContinueAsGuest = () => {
    const guest = authStorage.createGuestSession();
    onLoginSuccess(guest);
    onClose();
  };

  return (
    <div 
      id="auth-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#251027]/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden flex flex-col transition-all max-h-[90vh] ${
          darkMode ? 'bg-[#311834] border-[#7A6786]/60 text-white' : 'bg-white border-[#CFC3DE] text-[#2D1A30]'
        }`}
      >
        {/* Header with gradient & mascot */}
        <div className="bg-gradient-to-r from-[#4B2E4F] via-[#5B3E60] to-[#7A6786] p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition"
            aria-label="Cerrar ventana"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center flex-shrink-0 shadow-inner">
              {mode === 'register' ? (
                <UserPlus className="w-6 h-6 text-white" />
              ) : (
                <LogIn className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/30">
                {mode === 'register' ? 'Tu Espacio Seguro & Privado' : 'Bienvenido/a de Vuelta'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1 leading-tight">
                {mode === 'register' 
                  ? step === 1 ? 'Crear mi Cuenta Anónima' : 'Personaliza tu Perfil'
                  : 'Iniciar Sesión'}
              </h2>
            </div>
          </div>
        </div>

        {/* Toggle Mode Bar */}
        <div className="p-4 bg-[#E9E3DC]/40 dark:bg-[#251027]/70 border-b border-[#CFC3DE]/50 dark:border-[#4B2E4F] flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 bg-white dark:bg-[#3B1F3D] p-1 rounded-xl border border-[#CFC3DE] dark:border-[#4B2E4F] w-full">
            <button
              type="button"
              id="tab-btn-register"
              onClick={() => { setMode('register'); setStep(1); setErrorMessage(null); }}
              className={`flex-1 py-2 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 ${
                mode === 'register'
                  ? 'bg-[#4B2E4F] text-white shadow-sm'
                  : 'text-[#5B4861] dark:text-[#CFC3DE] hover:bg-[#E9E3DC]/40'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Crear Cuenta</span>
            </button>
            <button
              type="button"
              id="tab-btn-login"
              onClick={() => { setMode('login'); setErrorMessage(null); }}
              className={`flex-1 py-2 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 ${
                mode === 'login'
                  ? 'bg-[#4B2E4F] text-white shadow-sm'
                  : 'text-[#5B4861] dark:text-[#CFC3DE] hover:bg-[#E9E3DC]/40'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Ya tengo cuenta</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 custom-scrollbar">
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-700/60 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* REGISTER MODE */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="space-y-3">
                    {/* Seudónimo */}
                    <div>
                      <label className="block text-xs font-extrabold text-[#4B2E4F] dark:text-[#CFC3DE] mb-1">
                        Seudónimo o Alias Anónimo <span className="text-amber-600">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7A6786]">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          id="input-reg-username"
                          type="text"
                          required
                          value={regUsername}
                          onChange={(e) => setRegUsername(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                          placeholder="ej: lili_curiosa, valiente_2026"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#CFC3DE] dark:border-[#4B2E4F] bg-[#E9E3DC]/30 dark:bg-[#2F1733] text-xs sm:text-sm font-bold focus:ring-2 focus:ring-[#4B2E4F] outline-none"
                        />
                      </div>
                      <p className="text-[10px] text-[#7A6786] dark:text-[#A58DB5] mt-1">
                        No uses tu nombre real completo para cuidar tu 100% de privacidad.
                      </p>
                    </div>

                    {/* Nombre para mostrar opcional */}
                    <div>
                      <label className="block text-xs font-extrabold text-[#4B2E4F] dark:text-[#CFC3DE] mb-1">
                        ¿Cómo te gustaría que Navi te llame? (Opcional)
                      </label>
                      <input
                        id="input-reg-displayname"
                        type="text"
                        value={regDisplayName}
                        onChange={(e) => setRegDisplayName(e.target.value)}
                        placeholder="ej: Lili, Alex, Sam"
                        className="w-full px-3 py-2.5 rounded-xl border border-[#CFC3DE] dark:border-[#4B2E4F] bg-[#E9E3DC]/30 dark:bg-[#2F1733] text-xs sm:text-sm font-bold focus:ring-2 focus:ring-[#4B2E4F] outline-none"
                      />
                    </div>

                    {/* Edad y Fecha de Nacimiento */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-extrabold text-[#4B2E4F] dark:text-[#CFC3DE] mb-1">
                          Edad (Años)
                        </label>
                        <input
                          id="input-reg-age"
                          type="number"
                          min={10}
                          max={25}
                          value={regAge}
                          onChange={(e) => setRegAge(Number(e.target.value))}
                          className="w-full px-3 py-2.5 rounded-xl border border-[#CFC3DE] dark:border-[#4B2E4F] bg-[#E9E3DC]/30 dark:bg-[#2F1733] text-xs sm:text-sm font-bold focus:ring-2 focus:ring-[#4B2E4F] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-[#4B2E4F] dark:text-[#CFC3DE] mb-1">
                          Fecha de Nacimiento
                        </label>
                        <div className="relative">
                          <input
                            id="input-reg-birthdate"
                            type="date"
                            required
                            value={regBirthDate}
                            onChange={(e) => setRegBirthDate(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl border border-[#CFC3DE] dark:border-[#4B2E4F] bg-[#E9E3DC]/30 dark:bg-[#2F1733] text-xs sm:text-sm font-bold focus:ring-2 focus:ring-[#4B2E4F] outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Contraseña Segura */}
                    <div>
                      <label className="block text-xs font-extrabold text-[#4B2E4F] dark:text-[#CFC3DE] mb-1">
                        Contraseña Personal <span className="text-amber-600">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7A6786]">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          id="input-reg-password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="Mínimo 4 caracteres"
                          className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-[#CFC3DE] dark:border-[#4B2E4F] bg-[#E9E3DC]/30 dark:bg-[#2F1733] text-xs sm:text-sm font-bold focus:ring-2 focus:ring-[#4B2E4F] outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7A6786] hover:text-[#4B2E4F]"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirmar Contraseña */}
                    <div>
                      <label className="block text-xs font-extrabold text-[#4B2E4F] dark:text-[#CFC3DE] mb-1">
                        Confirmar Contraseña <span className="text-amber-600">*</span>
                      </label>
                      <input
                        id="input-reg-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="Repite tu contraseña"
                        className="w-full px-3 py-2.5 rounded-xl border border-[#CFC3DE] dark:border-[#4B2E4F] bg-[#E9E3DC]/30 dark:bg-[#2F1733] text-xs sm:text-sm font-bold focus:ring-2 focus:ring-[#4B2E4F] outline-none"
                      />
                    </div>
                  </div>

                  <button
                    id="btn-step1-next"
                    type="submit"
                    className="w-full mt-4 bg-[#4B2E4F] hover:bg-[#5B3E60] active:scale-95 text-white font-extrabold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition"
                  >
                    <span>Siguiente: Elegir Avatar & Intereses</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                /* Step 2: Avatar & Interests Customization */
                <div className="space-y-4 animate-fadeIn">
                  {/* Avatar Picker */}
                  <div>
                    <label className="block text-xs font-extrabold text-[#4B2E4F] dark:text-[#CFC3DE] mb-2">
                      Elige tu Avatar o Mascota Protectora:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {AVATAR_OPTIONS.map((av) => {
                        const isSelected = regAvatarIcon === av.emoji;
                        return (
                          <button
                            key={av.id}
                            type="button"
                            onClick={() => setRegAvatarIcon(av.emoji)}
                            className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition ${
                              isSelected
                                ? 'border-[#4B2E4F] bg-[#4B2E4F]/10 dark:bg-[#4B2E4F]/40 scale-105 shadow-sm'
                                : 'border-[#CFC3DE] dark:border-[#4B2E4F] hover:bg-[#E9E3DC]/40'
                            }`}
                          >
                            <span className="text-2xl">{av.emoji}</span>
                            <span className="text-[10px] font-bold text-[#5B4861] dark:text-[#CFC3DE] truncate w-full text-center">
                              {av.label.split(' ')[0]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Color Picker */}
                  <div>
                    <label className="block text-xs font-extrabold text-[#4B2E4F] dark:text-[#CFC3DE] mb-2">
                      Color de Perfil:
                    </label>
                    <div className="flex items-center gap-2">
                      {AVATAR_COLORS.map((col) => (
                        <button
                          key={col}
                          type="button"
                          onClick={() => setRegAvatarColor(col)}
                          style={{ backgroundColor: col }}
                          className={`w-8 h-8 rounded-full border-2 transition-transform flex items-center justify-center text-white ${
                            regAvatarColor === col ? 'border-white scale-110 shadow-md ring-2 ring-[#4B2E4F]' : 'border-transparent hover:scale-105'
                          }`}
                        >
                          {regAvatarColor === col && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interests Selection */}
                  <div>
                    <label className="block text-xs font-extrabold text-[#4B2E4F] dark:text-[#CFC3DE] mb-2">
                      Temas que más te interesan (para personalizar tus recomendaciones):
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {INTEREST_TAGS.map((tag) => {
                        const isChecked = regInterests.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleToggleInterest(tag)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 ${
                              isChecked
                                ? 'bg-[#4B2E4F] text-white shadow-xs'
                                : 'bg-[#E9E3DC] dark:bg-[#3C223F] text-[#5B4861] dark:text-[#CFC3DE] border border-[#CFC3DE] dark:border-[#4B2E4F]'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3" />}
                            <span>{tag}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-xl border border-[#CFC3DE] dark:border-[#4B2E4F] font-bold text-xs"
                    >
                      Atrás
                    </button>
                    <button
                      id="btn-complete-registration"
                      type="submit"
                      className="flex-1 bg-[#4B2E4F] hover:bg-[#5B3E60] active:scale-95 text-white font-extrabold py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>¡Crear mi Cuenta & Empezar Racha!</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}

          {/* LOGIN MODE */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-[#4B2E4F] dark:text-[#CFC3DE] mb-1">
                  Tu Seudónimo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7A6786]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="input-login-username"
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                    placeholder="ej: lili_curiosa"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#CFC3DE] dark:border-[#4B2E4F] bg-[#E9E3DC]/30 dark:bg-[#2F1733] text-xs sm:text-sm font-bold focus:ring-2 focus:ring-[#4B2E4F] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#4B2E4F] dark:text-[#CFC3DE] mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7A6786]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="input-login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Tu contraseña personal"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-[#CFC3DE] dark:border-[#4B2E4F] bg-[#E9E3DC]/30 dark:bg-[#2F1733] text-xs sm:text-sm font-bold focus:ring-2 focus:ring-[#4B2E4F] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7A6786] hover:text-[#4B2E4F]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                id="btn-login-submit"
                type="submit"
                className="w-full mt-4 bg-[#4B2E4F] hover:bg-[#5B3E60] active:scale-95 text-white font-extrabold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition"
              >
                <LogIn className="w-4 h-4 text-[#CFC3DE]" />
                <span>Ingresar a mi Perfil</span>
              </button>
            </form>
          )}

          {/* Guest Option Divider */}
          <div className="relative py-2 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#CFC3DE] dark:border-[#4B2E4F]"></div>
            </div>
            <span className="relative px-3 bg-white dark:bg-[#311834] text-[11px] font-bold text-[#7A6786] dark:text-[#CFC3DE]">
              ¿Prefieres explorar primero?
            </span>
          </div>

          {/* Continue as Guest Button */}
          <button
            id="btn-guest-mode"
            type="button"
            onClick={handleContinueAsGuest}
            className="w-full py-2.5 px-4 rounded-xl border border-[#CFC3DE] dark:border-[#7A6786] hover:bg-[#E9E3DC]/50 dark:hover:bg-[#3C223F] font-bold text-xs text-[#4B2E4F] dark:text-[#E9E3DC] flex items-center justify-center gap-2 transition"
          >
            <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Continuar como invitado (Explorar sin cuenta)</span>
          </button>
        </div>

        {/* Security / Privacy Footer Notice */}
        <div className="p-4 bg-[#E9E3DC]/50 dark:bg-[#251027]/70 border-t border-[#CFC3DE]/60 dark:border-[#4B2E4F] flex items-center gap-2.5 text-[11px] text-[#5B4861] dark:text-[#A58DB5]">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            Tus datos y avance se guardan de forma privada en tu dispositivo bajo tu seudónimo.
          </span>
        </div>
      </div>
    </div>
  );
};
