// Browser Notification API utility for appointment reminders and Navi messages

export interface AppNotificationConfig {
  id: string;
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
  timestamp?: number;
}

export type NotificationPermissionState = 'default' | 'granted' | 'denied' | 'unsupported';

class NotificationService {
  private permission: NotificationPermissionState = 'default';
  private listeners: ((perm: NotificationPermissionState) => void)[] = [];
  private scheduledTimers: Map<string, number> = new Map();

  constructor() {
    this.checkPermission();
  }

  public checkPermission(): NotificationPermissionState {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      this.permission = 'unsupported';
    } else {
      this.permission = Notification.permission as NotificationPermissionState;
    }
    return this.permission;
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  public getPermission(): NotificationPermissionState {
    return this.permission;
  }

  public subscribe(listener: (perm: NotificationPermissionState) => void): () => void {
    this.listeners.push(listener);
    listener(this.permission);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.permission));
  }

  public async requestPermission(): Promise<boolean> {
    if (!this.isSupported()) {
      this.permission = 'unsupported';
      this.notifyListeners();
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      this.permission = result as NotificationPermissionState;
      this.notifyListeners();
      return result === 'granted';
    } catch (e) {
      console.error('Error requesting notification permission:', e);
      this.checkPermission();
      this.notifyListeners();
      return false;
    }
  }

  public showNotification(options: AppNotificationConfig): boolean {
    if (!this.isSupported()) return false;

    if (Notification.permission !== 'granted') {
      return false;
    }

    try {
      const notif = new Notification(options.title, {
        body: options.body,
        icon: options.icon || 'https://api.iconify.design/lucide:heart-handshake.svg?color=%234B2E4F',
        badge: options.badge || 'https://api.iconify.design/lucide:shield-check.svg?color=%234B2E4F',
        tag: options.tag || options.id,
        data: options.data,
      });

      notif.onclick = () => {
        window.focus();
        if (options.data?.url) {
          window.location.hash = options.data.url;
        }
        notif.close();
      };

      return true;
    } catch (err) {
      console.warn('Native notification failed, falling back:', err);
      return false;
    }
  }

  // Schedule appointment reminder (in milliseconds or specific date)
  public scheduleReminder(
    id: string,
    delayMs: number,
    options: Omit<AppNotificationConfig, 'id'>
  ): void {
    // Clear existing if any
    this.cancelScheduledReminder(id);

    const timerId = window.setTimeout(() => {
      this.showNotification({
        id,
        ...options,
      });
      this.scheduledTimers.delete(id);
    }, delayMs);

    this.scheduledTimers.set(id, timerId);
  }

  public cancelScheduledReminder(id: string): void {
    if (this.scheduledTimers.has(id)) {
      clearTimeout(this.scheduledTimers.get(id));
      this.scheduledTimers.delete(id);
    }
  }
}

export const notificationService = new NotificationService();
