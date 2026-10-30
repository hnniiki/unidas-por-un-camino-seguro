// Storage and management for confidential local appointment reminders

import { AppointmentReminder } from '../types';
import { notificationService } from './notifications';

const REMINDERS_KEY = 'unidas_appointment_reminders_v1';

const DEFAULT_REMINDERS: AppointmentReminder[] = [
  {
    id: 'rem-demo-1',
    title: 'Consejería en Salud Sexual Amigable',
    category: 'orientacion_salud',
    facilityName: 'Centro de Salud MINSA (Módulo Adolescente)',
    date: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10), // in 2 days
    time: '10:30',
    notes: 'Preguntar sobre métodos anticonceptivos de larga duración (implante subdérmico). La atención es 100% gratuita y confidencial.',
    reminderAdvanceMinutes: 60,
    isCompleted: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rem-demo-2',
    title: 'Control de Método Anticonceptivo / Implante',
    category: 'metodo_anticonceptivo',
    facilityName: 'Posta Médica Local',
    date: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 10), // in 7 days
    time: '15:00',
    notes: 'Revisión periódica de rutina con la obstetra.',
    reminderAdvanceMinutes: 1440, // 1 day before
    isCompleted: false,
    createdAt: new Date().toISOString(),
  }
];

export function getStoredReminders(): AppointmentReminder[] {
  if (typeof window === 'undefined') return DEFAULT_REMINDERS;
  try {
    const raw = localStorage.getItem(REMINDERS_KEY);
    if (!raw) {
      localStorage.setItem(REMINDERS_KEY, JSON.stringify(DEFAULT_REMINDERS));
      return DEFAULT_REMINDERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading reminders:', e);
    return DEFAULT_REMINDERS;
  }
}

export function saveReminders(reminders: AppointmentReminder[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
  } catch (e) {
    console.error('Error saving reminders:', e);
  }
}

export function addReminder(item: Omit<AppointmentReminder, 'id' | 'createdAt'>): AppointmentReminder {
  const all = getStoredReminders();
  const newReminder: AppointmentReminder = {
    ...item,
    id: `rem-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newReminder, ...all];
  saveReminders(updated);

  // If date/time is in the future, schedule browser notification
  scheduleReminderNotification(newReminder);

  return newReminder;
}

export function toggleCompleteReminder(id: string): AppointmentReminder[] {
  const all = getStoredReminders();
  const updated = all.map(r => r.id === id ? { ...r, isCompleted: !r.isCompleted } : r);
  saveReminders(updated);
  if (updated.find(r => r.id === id)?.isCompleted) {
    notificationService.cancelScheduledReminder(id);
  }
  return updated;
}

export function deleteReminder(id: string): AppointmentReminder[] {
  const all = getStoredReminders();
  const updated = all.filter(r => r.id !== id);
  saveReminders(updated);
  notificationService.cancelScheduledReminder(id);
  return updated;
}

export function scheduleReminderNotification(reminder: AppointmentReminder): void {
  if (reminder.isCompleted) return;

  const appointmentDateTime = new Date(`${reminder.date}T${reminder.time}:00`);
  const reminderTime = appointmentDateTime.getTime() - (reminder.reminderAdvanceMinutes * 60 * 1000);
  const now = Date.now();
  const delayMs = reminderTime - now;

  // If the reminder is in the near future (within 24 days in memory)
  if (delayMs > 0 && delayMs < 2147483647) {
    notificationService.scheduleReminder(reminder.id, delayMs, {
      title: `🦉 Recordatorio de Cita Médica: ${reminder.title}`,
      body: `Tienes tu cita en ${reminder.facilityName} programada para las ${reminder.time} hs. ¡Tu salud y privacidad son tu derecho!`,
      tag: `reminder-${reminder.id}`,
      data: {
        reminderId: reminder.id,
        url: '#rutas',
      },
    });
  }
}

// Reschedule all active reminders on app startup
export function syncAllScheduledReminders(): void {
  const all = getStoredReminders();
  all.forEach(reminder => {
    if (!reminder.isCompleted) {
      scheduleReminderNotification(reminder);
    }
  });
}
