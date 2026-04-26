import { Trash2, RefreshCw } from 'lucide-react';
import { Task } from '../../types';
import { TaskCheckbox } from './TaskCheckbox';
import { TaskProgress } from './TaskProgress';
import { TaskDueDate } from './TaskDueDate';
import { TaskPriorityBadge } from './TaskPriorityBadge';
import { useTasks } from '../../hooks/useTasks';

export function TaskItem({ task }: { task: Task }) {
  const { dispatch } = useTasks();

  const toggleDone = () => dispatch({ type: 'TOGGLE_TASK_DONE', taskId: task.id });
  const toggleStep = (stepId: string) => dispatch({ type: 'TOGGLE_STEP_DONE', taskId: task.id, stepId });
  const deleteTask = () => dispatch({ type: 'DELETE_TASK', taskId: task.id });

  return (
    <div className={`group relative p-3 rounded-xl border transition-all
      ${task.status === 'done' ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'}`}
    >
      <div className="flex gap-2">
        <div className="flex-1 min-w-0">
          {task.type === 'project' && task.steps?.length ? (
            <TaskProgress
              text={task.text}
              steps={task.steps}
              done={task.status === 'done'}
              onToggleStep={toggleStep}
              onToggleTask={toggleDone}
            />
          ) : (
            <TaskCheckbox
              text={task.text}
              done={task.status === 'done'}
              onToggle={toggleDone}
            />
          )}

          <div className="flex flex-wrap items-center gap-2 mt-2 ps-6">
            <TaskPriorityBadge priority={task.priority} />
            {task.dueDate && <TaskDueDate dueDate={task.dueDate} />}
            {task.type === 'recurring' && task.recurrenceRule && (
              <span className="flex items-center gap-1 text-xs text-blue-500">
                <RefreshCw size={11} />
                {task.recurrenceRule}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={deleteTask}
          className="opacity-0 group-hover:opacity-100 flex-shrink-0 text-gray-300 hover:text-red-400 transition-opacity mt-0.5"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
