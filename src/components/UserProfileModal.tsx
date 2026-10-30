import React, { useState } from 'react';
import { 
  User, 
  Flame, 
  Sparkles, 
  Trophy, 
  Calendar, 
  ShieldCheck, 
  Heart, 
  LogOut, 
  Edit3, 
  Check, 
  Clock,
  Compass,
  Award,
  Zap
} from 'lucide-react';
import { UserProfile, Badge } from '../types';
import { INITIAL_BADGES } from '../data/mockData';
import { AVATAR_OPTIONS, AVATAR_COLORS } from '../utils/authStorage';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onLogout: () => void;
  onUpdateUser: (updated: UserProfile) => void;
  onOpenAuthModal: () => void;
  darkMode?: boolean;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogout,
  onUpdateUser,
  onOpenAuthModal,
  darkMode = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editDisplayName, setEditDisplayName] = useState(user?.displayName || '');
  const [editAvatarIcon, setEditAvatarIcon] = useState(user?.avatarIcon || '🦉');
  const [editAvatarColor, setEditAvatarColor] = useState(user?.avatarColor || '#4B2E4F');

  if (!isOpen) return null;

  if (!user || user.isGuest) {
    return (
      <div 
        id="guest-profile-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#251027]/80 backdrop-blur-md animate-fadeIn"
        role="dialog"
      >
        <div className={`w-full max-w-md rounded-3xl border p-6 text-center space-y-5 ${
          darkMode ? 'bg-[#311834] border-[#7A6786]/60 text-white' : 'bg-white border-[#CFC3DE] text-[#2D1A30]'
        }`}>
          <div className="w-16 h-16 rounded-full bg-[#E9E3DC] dark:bg-[#3B1F3D] flex items-center justify-center mx-auto text-3xl">
            🌱
          </div>
          <div>
            <h2 className="text-xl font-black">Estás explorando como Invitado(a)</h2>
            <p className="text-xs sm:text-sm text-[#5B4861] dark:text-[#CFC3DE] mt-1">
              Crea una cuenta con tu seudónimo favorito para guardar tus puntos XP, mantener tu racha diaria y tener tu espacio 100% privado.
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAuthModal();
              }}
              className="w-full bg-[#4B2E4F] hover:bg-[#5B3E60] text-white font-extrabold py-3 rounded-2xl text-xs sm:text-sm shadow-md transition"
            >
              Crear mi Cuenta o Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-2xl border border-[#CFC3DE] dark:border-[#4B2E4F] text-xs font-bold"
            >
              Seguir explorando
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    const updated: UserProfile = {
      ...user,
      displayName: editDisplayName.trim() || user.displayName,
      avatarIcon: editAvatarIcon,
      avatarColor: editAvatarColor
    };
    onUpdateUser(updated);
    setIsEditing(false);
  };

  return (
    <div 
      id="user-profile-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#251027]/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
    >
      <div 
        className={`w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          darkMode ? 'bg-[#311834] border-[#7A6786]/60 text-white' : 'bg-white border-[#CFC3DE] text-[#2D1A30]'
        }`}
      >
        {/* Header with user avatar & background */}
        <div 
          className="p-6 text-white relative transition-colors duration-300"
          style={{ backgroundColor: user.avatarColor || '#4B2E4F' }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-4xl shadow-inner">
                {user.avatarIcon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    @{user.username}
                  </span>
                  <span className="text-[11px] text-white/80 font-bold">
                    {user.age} años
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {user.displayName}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition text-xs"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          {/* Key Stats Bar: Racha & XP */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <Flame className="w-6 h-6 fill-white" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-amber-800 dark:text-amber-300">
                  Racha Activa
                </p>
                <p className="text-lg font-black text-amber-900 dark:text-amber-100">
                  {user.streak} días seguidos
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#E9E3DC]/60 dark:bg-[#3C223F] border border-[#CFC3DE] dark:border-[#7A6786]/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4B2E4F] text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-[#7A6786] dark:text-[#CFC3DE]">
                  Puntos XP
                </p>
                <p className="text-lg font-black text-[#4B2E4F] dark:text-white">
                  {user.xp} XP acumulados
                </p>
              </div>
            </div>
          </div>

          {/* Edit Mode Toggle */}
          {isEditing ? (
            <div className="p-4 rounded-2xl bg-[#E9E3DC]/40 dark:bg-[#251027] border border-[#CFC3DE] dark:border-[#4B2E4F] space-y-4 animate-fadeIn">
              <h3 className="text-xs font-black uppercase text-[#4B2E4F] dark:text-brand-soft">
                Personalizar Apariencia
              </h3>

              <div>
                <label className="block text-xs font-bold mb-1">Nombre / Apodo:</label>
                <input
                  type="text"
                  value={editDisplayName}
                  onChange={(e) => setEditDisplayName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#CFC3DE] dark:border-[#4B2E4F] bg-white dark:bg-[#311834] text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Elige Mascota / Avatar:</label>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setEditAvatarIcon(av.emoji)}
                      className={`p-2 rounded-xl border text-xl flex-shrink-0 ${
                        editAvatarIcon === av.emoji ? 'border-[#4B2E4F] bg-[#4B2E4F]/20 scale-110' : 'border-transparent'
                      }`}
                    >
                      {av.emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Color Favorito:</label>
                <div className="flex gap-2">
                  {AVATAR_COLORS.map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setEditAvatarColor(col)}
                      style={{ backgroundColor: col }}
                      className={`w-6 h-6 rounded-full border-2 ${
                        editAvatarColor === col ? 'border-white ring-2 ring-[#4B2E4F]' : 'border-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-xl border border-[#CFC3DE] text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-4 py-1.5 rounded-xl bg-[#4B2E4F] text-white text-xs font-bold flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  Guardar Cambios
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#7A6786] dark:text-[#CFC3DE]">
                Espacio Personal y Preferencias
              </span>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-xs font-extrabold text-[#4B2E4F] dark:text-brand-soft hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar apariencia</span>
              </button>
            </div>
          )}

          {/* Interests Tags */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#7A6786] dark:text-[#CFC3DE]">
              Tus Temas de Interés
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {user.interests && user.interests.map((it) => (
                <span
                  key={it}
                  className="px-3 py-1 rounded-full bg-[#E9E3DC] dark:bg-[#3C223F] text-[#4B2E4F] dark:text-[#CFC3DE] border border-[#CFC3DE]/70 dark:border-[#7A6786]/40 text-xs font-bold"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>

          {/* Registered Details */}
          <div className="p-4 rounded-2xl bg-[#E9E3DC]/30 dark:bg-[#2F1733] border border-[#CFC3DE]/50 dark:border-[#4B2E4F] space-y-2 text-xs text-[#5B4861] dark:text-[#CFC3DE]">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Fecha de Nacimiento:</span>
              <span className="font-bold">{user.birthDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Miembro desde:</span>
              <span className="font-bold">{user.createdAt}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Privacidad:</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Protegido por Seudónimo
              </span>
            </div>
          </div>
        </div>

        {/* Footer with Logout */}
        <div className="p-4 sm:p-5 bg-[#E9E3DC]/50 dark:bg-[#251027]/70 border-t border-[#CFC3DE]/60 dark:border-[#4B2E4F] flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#4B2E4F] text-white font-extrabold text-xs shadow-md transition"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
