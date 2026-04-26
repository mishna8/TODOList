import { Priority } from '../../types';
import { PRIORITY_COLORS, PRIORITY_LABELS } from '../../constants';

export function TaskPriorityBadge({ priority }: { priority: Priority }) {
  if (priority === 'medium') return null;
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[priority]}`}>
      {PRIORITY_LABELS[priority]}
    </span>
  );
}
