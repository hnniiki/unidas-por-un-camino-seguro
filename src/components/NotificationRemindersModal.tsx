import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  BellOff, 
  BellRing, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Send,
  AlertCircle,
  X,
  HeartHandshake
} from 'lucide-react';
import { AppointmentReminder, SupportedLanguage } from '../types';
import { notificationService, NotificationPermissionState } from '../utils/notifications';
import { 
  getStoredReminders, 
  addReminder, 
  toggleCompleteReminder, 
  deleteReminder 
} from '../utils/remindersStorage';

interface NotificationRemindersModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onOpenChat?: () => void;
}

const CATEGORY_LABELS: Record<AppointmentReminder['category'], { label: string; icon: string; color: string }> = {
  orientacion_salud: { label: 'Consejería en Salud Sexual', icon: '🩺', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' },
  metodo_anticonceptivo: { label: 'Método Anticonceptivo (Implante/DIU/Inyectable)', icon: '🛡️', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300' },
  control_medico: { label: 'Control Médico / Obstétrico', icon: '👩‍⚕️', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300' },
  apoyo_psicologico: { label: 'Atención Psicológica y Emocional', icon: '🌸', color: 'bg-pink-100 text-pink-800 dark:bg-pink-950/40 dark:text-pink-300' },
  seguimiento_caso: { label: 'Seguimiento Legal / CEM / DEMUNA', icon: '⚖️', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300' }
};

export const NotificationRemindersModal: React.FC<NotificationRemindersModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  onOpenChat,
}) => {
  const [permission, setPermission] = useState<NotificationPermissionState>('default');
  const [reminders, setReminders] = useState<AppointmentReminder[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [testSent, setTestSent] = useState<boolean>(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<AppointmentReminder['category']>('orientacion_salud');
  const [facilityName, setFacilityName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [notes, setNotes] = useState('');
  const [reminderAdvanceMinutes, setReminderAdvanceMinutes] = useState<number>(60);

  useEffect(() => {
    if (isOpen) {
      setPermission(notificationService.checkPermission());
      setReminders(getStoredReminders());
      const unsub = notificationService.subscribe((perm) => setPermission(perm));
      return () => unsub();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    const granted = await notificationService.requestPermission();
    setPermission(notificationService.checkPermission());
    if (granted) {
      // Send an immediate welcome confirmation notification
      notificationService.showNotification({
        id: 'welcome-navi-notif',
        title: '🦉 Navi: ¡Notificaciones activadas!',
        body: 'Te avisaremos a tiempo sobre tus citas médicas y mensajes importantes de salud y prevención.',
        tag: 'welcome-navi'
      });
    }
  };

  const handleSendTestNotification = () => {
    const success = notificationService.showNotification({
      id: `test-navi-${Date.now()}`,
      title: '🦉 Navi te recuerda:',
      body: 'Recuerda que tienes derecho a atención médica gratuita y confidencial en el Servicio de Salud Amigable de tu posta más cercana.',
      tag: 'test-navi-tip'
    });

    if (success) {
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    } else if (permission !== 'granted') {
      handleRequestPermission();
    }
  };

  const handleSaveReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date || !time) return;

    const newRem = addReminder({
      title: title.trim(),
      category,
      facilityName: facilityName.trim() || 'Centro de Salud MINSA',
      date,
      time,
      notes: notes.trim(),
      reminderAdvanceMinutes: Number(reminderAdvanceMinutes),
      isCompleted: false,
    });

    setReminders(getStoredReminders());
    setIsAdding(false);

    // Reset Form
    setTitle('');
    setFacilityName('');
    setDate('');
    setNotes('');

    // If notifications are enabled, show confirmation notification
    if (permission === 'granted') {
      notificationService.showNotification({
        id: `created-${newRem.id}`,
        title: '✅ Recordatorio programado con éxito',
        body: `Cita: "${newRem.title}" para el ${newRem.date} a las ${newRem.time}. Te avisaremos con anticipación.`,
        tag: 'reminder-created'
      });
    }
  };

  const handleToggleComplete = (id: string) => {
    const updated = toggleCompleteReminder(id);
    setReminders(updated);
  };

  const handleDelete = (id: string) => {
    const updated = deleteReminder(id);
    setReminders(updated);
  };

  return (
    <div 
      id="notification-reminders-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#251027]/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
    >
      <div 
        className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${
          darkMode ? 'bg-[#2E1630] border-[#5B3E60] text-white' : 'bg-white border-[#E5D7DE] text-[#2D1A30]'
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#4B2E4F] text-white flex items-center justify-between border-b border-[#5B3E60] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-xl shadow-inner">
              <BellRing className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">Recordatorios y Notificaciones</h3>
                <span className="bg-amber-400 text-[#3B1F3D] text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  API Nativa
                </span>
              </div>
              <p className="text-[11px] text-[#F9F5F8]/85">
                Alertas discretas de citas de salud, controles anticonceptivos y mensajes de Navi.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition text-xs"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          {/* Permission Status Card */}
          <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            permission === 'granted'
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/50'
              : permission === 'denied'
              ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/50'
              : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/50'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`p-2.5 rounded-xl mt-0.5 flex-shrink-0 ${
                permission === 'granted'
                  ? 'bg-emerald-500 text-white'
                  : permission === 'denied'
                  ? 'bg-rose-500 text-white'
                  : 'bg-amber-500 text-white'
              }`}>
                {permission === 'granted' ? (
                  <Bell className="w-5 h-5" />
                ) : permission === 'denied' ? (
                  <BellOff className="w-5 h-5" />
                ) : (
                  <BellRing className="w-5 h-5" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm">
                    {permission === 'granted'
                      ? 'Notificaciones en el Navegador: Activas'
                      : permission === 'denied'
                      ? 'Permiso de Notificaciones Bloqueado'
                      : 'Notificaciones en el Navegador: Pendientes'}
                  </h4>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    permission === 'granted'
                      ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200'
                      : permission === 'denied'
                      ? 'bg-rose-200 text-rose-900 dark:bg-rose-900 dark:text-rose-200'
                      : 'bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200'
                  }`}>
                    {permission === 'granted' ? 'Habilitado' : permission === 'denied' ? 'Bloqueado' : 'Requiere permiso'}
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {permission === 'granted'
                    ? 'Recibirás avisos en tu pantalla o barra del sistema incluso si estás en otra pestaña.'
                    : permission === 'denied'
                    ? 'Has bloqueado las notificaciones en tu navegador. Puedes desbloquearlas haciendo clic en el candado de la barra de direcciones.'
                    : 'Permite que el navegador te avise sobre tus citas de salud y recordatorios de métodos anticonceptivos.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto flex-shrink-0">
              {permission !== 'granted' ? (
                <button
                  type="button"
                  onClick={handleRequestPermission}
                  className="w-full sm:w-auto px-4 py-2 bg-[#4B2E4F] hover:bg-[#3B1F3D] text-white font-extrabold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Activar Notificaciones</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSendTestNotification}
                  className="w-full sm:w-auto px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{testSent ? '¡Notificación enviada!' : 'Probar Notificación'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Action Header for Reminders */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-[#4B2E4F] dark:text-[#E8C2B0]">
                Tus Citas Médicas y Recordatorios Programados
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                100% privado y guardado de manera confidencial en tu dispositivo.
              </p>
            </div>

            {!isAdding && (
              <button
                type="button"
                onClick={() => setIsAdding(true)}
                className="px-3.5 py-2 rounded-xl bg-[#4B2E4F] hover:bg-[#3B1F3D] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Cita</span>
              </button>
            )}
          </div>

          {/* Form to Add New Reminder */}
          {isAdding && (
            <form 
              onSubmit={handleSaveReminder} 
              className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-[#241027] border border-stone-200 dark:border-[#5B3E60] space-y-4 animate-fadeIn"
            >
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-[#5B3E60] pb-2">
                <span className="text-xs font-black uppercase text-[#4B2E4F] dark:text-brand-soft flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Programar Recordatorio de Cita
                </span>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="text-stone-400 hover:text-stone-600 dark:hover:text-white text-xs"
                >
                  Cancelar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold mb-1 text-stone-700 dark:text-stone-200">
                    Motivo / Título de la Cita:
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej. Consejería de Implante, Control Obstétrico, Psicología..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-[#5B3E60] bg-white dark:bg-[#311834] text-xs font-medium focus:ring-2 focus:ring-[#4B2E4F] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-stone-700 dark:text-stone-200">
                    Categoría del Servicio:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-[#5B3E60] bg-white dark:bg-[#311834] text-xs font-medium focus:ring-2 focus:ring-[#4B2E4F] outline-none"
                  >
                    {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v.icon} {v.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-stone-700 dark:text-stone-200">
                    Lugar o Establecimiento:
                  </label>
                  <input
                    type="text"
                    value={facilityName}
                    onChange={(e) => setFacilityName(e.target.value)}
                    placeholder="Ej. Posta Médica, Módulo Amigable MINSA..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-[#5B3E60] bg-white dark:bg-[#311834] text-xs font-medium focus:ring-2 focus:ring-[#4B2E4F] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-stone-700 dark:text-stone-200">
                    Fecha de la Cita:
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-[#5B3E60] bg-white dark:bg-[#311834] text-xs font-medium focus:ring-2 focus:ring-[#4B2E4F] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-stone-700 dark:text-stone-200">
                    Hora de la Cita:
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-[#5B3E60] bg-white dark:bg-[#311834] text-xs font-medium focus:ring-2 focus:ring-[#4B2E4F] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold mb-1 text-stone-700 dark:text-stone-200">
                    Avisarme con anticipación:
                  </label>
                  <select
                    value={reminderAdvanceMinutes}
                    onChange={(e) => setReminderAdvanceMinutes(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-[#5B3E60] bg-white dark:bg-[#311834] text-xs font-medium focus:ring-2 focus:ring-[#4B2E4F] outline-none"
                  >
                    <option value={15}>15 minutos antes</option>
                    <option value={60}>1 hora antes</option>
                    <option value={120}>2 horas antes</option>
                    <option value={1440}>1 día antes (Recomendado)</option>
                    <option value={2880}>2 días antes</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold mb-1 text-stone-700 dark:text-stone-200">
                    Notas o Preguntas para la Obstetra/Médico (Opcional):
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej. Llevar DNI, preguntar por duración del implante o doble protección..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-[#5B3E60] bg-white dark:bg-[#311834] text-xs font-medium focus:ring-2 focus:ring-[#4B2E4F] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 dark:border-[#5B3E60] text-xs font-bold hover:bg-stone-100 dark:hover:bg-[#311834] transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#4B2E4F] hover:bg-[#3B1F3D] text-white text-xs font-extrabold shadow-sm transition flex items-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Guardar Recordatorio</span>
                </button>
              </div>
            </form>
          )}

          {/* List of Reminders */}
          <div className="space-y-3">
            {reminders.length === 0 ? (
              <div className="text-center py-8 p-6 rounded-2xl border border-dashed border-stone-300 dark:border-[#5B3E60] text-stone-500 dark:text-stone-400 space-y-2">
                <Calendar className="w-8 h-8 mx-auto opacity-40 text-[#4B2E4F] dark:text-[#E8C2B0]" />
                <p className="text-xs font-bold">No tienes recordatorios activos.</p>
                <p className="text-[11px]">Agrega tu próxima visita a la posta o consulta de anticoncepción para recibir alertas a tiempo.</p>
              </div>
            ) : (
              reminders.map((rem) => {
                const cat = CATEGORY_LABELS[rem.category] || CATEGORY_LABELS.orientacion_salud;
                return (
                  <div
                    key={rem.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      rem.isCompleted
                        ? 'opacity-60 bg-stone-100/70 dark:bg-[#1F0C21]/60 border-stone-200 dark:border-[#4B2E4F]/40'
                        : 'bg-white dark:bg-[#311834] border-stone-200 dark:border-[#5B3E60] shadow-xs hover:border-[#4B2E4F]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleComplete(rem.id)}
                          className="mt-0.5 text-stone-400 hover:text-emerald-600 transition"
                          title={rem.isCompleted ? 'Marcar como pendiente' : 'Marcar como asistida'}
                        >
                          {rem.isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 dark:fill-emerald-950" />
                          ) : (
                            <Circle className="w-5 h-5 hover:text-[#4B2E4F]" />
                          )}
                        </button>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${cat.color}`}>
                              {cat.icon} {cat.label}
                            </span>
                            <span className="text-[11px] font-extrabold text-[#4B2E4F] dark:text-[#E8C2B0] flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {rem.date} a las {rem.time}
                            </span>
                          </div>

                          <h5 className={`text-sm font-black ${
                            rem.isCompleted 
                              ? 'line-through text-stone-500 dark:text-stone-400' 
                              : 'text-[#2D1A30] dark:text-white'
                          }`}>
                            {rem.title}
                          </h5>

                          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-300">
                            <MapPin className="w-3.5 h-3.5 text-[#4B2E4F] dark:text-brand-soft flex-shrink-0" />
                            <span>{rem.facilityName}</span>
                          </div>

                          {rem.notes && (
                            <p className="text-xs text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-[#251027] p-2 rounded-xl border border-stone-200/80 dark:border-[#5B3E60]/60 mt-1">
                              💡 <strong>Nota:</strong> {rem.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDelete(rem.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                        title="Eliminar recordatorio"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Navi Advice Reminder Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#4B2E4F]/10 to-amber-500/10 border border-[#DEC9D4] dark:border-[#5B3E60] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#4B2E4F] text-white flex items-center justify-center text-xl flex-shrink-0">
                🦉
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-[#4B2E4F] dark:text-white">
                  ¿Dudas antes de tu cita médica?
                </p>
                <p className="text-stone-600 dark:text-stone-300">
                  Navi te ayuda a preparar qué preguntas hacerle a tu obstetra sin vergüenza.
                </p>
              </div>
            </div>

            {onOpenChat && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenChat();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-[#4B2E4F] hover:bg-[#3B1F3D] text-white font-extrabold text-xs shadow-xs transition flex-shrink-0"
              >
                Hablar con Navi
              </button>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-stone-50 dark:bg-[#251027]/70 border-t border-stone-200 dark:border-[#5B3E60] flex items-center justify-between flex-shrink-0">
          <span className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Privacidad garantizada en tu navegador
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#4B2E4F] text-white font-extrabold text-xs shadow-sm transition"
          >
            Listo
          </button>
        </div>

      </div>
    </div>
  );
};
