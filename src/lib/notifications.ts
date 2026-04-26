import { Task } from '../types';

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

export function fireNotification(task: Task): void {
  if (Notification.permission !== 'granted') return;
  new Notification('משימה קרובה', {
    body: task.text,
    icon: '/favicon.svg',
  });
}

export function isOverdue(dueDate: string): boolean {
  return new Date(dueDate) < new Date(new Date().toDateString());
}

export function isDueSoon(dueDate: string): boolean {
  const due = new Date(dueDate);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return due <= tomorrow && !isOverdue(dueDate);
}
