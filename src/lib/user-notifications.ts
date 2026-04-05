export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "placement" | "info" | "success" | "hr";
  read: boolean;
}

const STORAGE_KEY = "nova_connect_user_notifications";

const getAllNotifications = (): Record<string, AppNotification[]> => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.warn("Error reading notifications storage", error);
    return {};
  }
};

const setAllNotifications = (data: Record<string, AppNotification[]>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("Error writing notifications storage", error);
  }
};

export const getUserNotifications = (email: string): AppNotification[] => {
  const all = getAllNotifications();
  return all[email] || [];
};

export const setUserNotifications = (email: string, notifications: AppNotification[]): void => {
  const all = getAllNotifications();
  all[email] = notifications;
  setAllNotifications(all);
};

export const addUserNotification = (email: string, notification: Omit<AppNotification, "id" | "read">): AppNotification[] => {
  const current = getUserNotifications(email);
  const next: AppNotification[] = [
    {
      ...notification,
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      read: false,
    },
    ...current,
  ];
  setUserNotifications(email, next);
  return next;
};

export const markNotificationRead = (email: string, id: string): AppNotification[] => {
  const current = getUserNotifications(email);
  const next = current.map((n) => (n.id === id ? { ...n, read: true } : n));
  setUserNotifications(email, next);
  return next;
};
