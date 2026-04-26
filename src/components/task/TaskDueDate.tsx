import { Calendar } from 'lucide-react';
import { isOverdue } from '../../lib/notifications';

export function TaskDueDate({ dueDate }: { dueDate: string }) {
  const overdue = isOverdue(dueDate);
  const formatted = new Date(dueDate).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <span className={`flex items-center gap-1 text-xs ${overdue ? 'text-red-600 font-semibold' : 'text-gray-400'}`}>
      <Calendar size={12} />
      {formatted}
      {overdue && ' (באיחור)'}
    </span>
  );
}
