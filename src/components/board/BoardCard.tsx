import { Board, Task } from '../../types';
import { BoardHeader } from './BoardHeader';
import { TaskItem } from '../task/TaskItem';
import { COLOR_CLASSES } from '../../constants';

interface Props {
  board: Board;
  tasks: Task[];
}

export function BoardCard({ board, tasks }: Props) {
  const colors = COLOR_CLASSES[board.color] ?? COLOR_CLASSES['gray'];
  const activeTasks = tasks.filter(t => t.status !== 'done');
  const doneTasks = tasks.filter(t => t.status === 'done');

  return (
    <div className={`rounded-2xl border p-4 ${colors.bg} ${colors.border}`}>
      <BoardHeader board={board} taskCount={activeTasks.length} />

      <div className="space-y-2">
        {activeTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>

      {doneTasks.length > 0 && activeTasks.length > 0 && (
        <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
          <p className="text-xs text-gray-400 mb-2">הושלמו</p>
          <div className="space-y-1">
            {doneTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {doneTasks.length > 0 && activeTasks.length === 0 && (
        <div className="space-y-2">
          {doneTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}

      {tasks.length === 0 && (
        <p className="text-xs text-gray-400 text-center py-4">אין משימות עדיין</p>
      )}
    </div>
  );
}
