import { useEffect, useRef } from 'react';
import { Task } from '../types';
import { requestNotificationPermission, fireNotification, isDueSoon } from '../lib/notifications';

export function useNotifications(tasks: Task[]) {
  const notifiedIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const check = () => {
      tasks.forEach(task => {
        if (
          task.status !== 'done' &&
          task.dueDate &&
          isDueSoon(task.dueDate) &&
          !notifiedIds.current.has(task.id)
        ) {
          fireNotification(task);
          notifiedIds.current.add(task.id);
        }
      });
    };

    check();
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, [tasks]);
}
