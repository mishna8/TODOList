import { useTasks } from '../../hooks/useTasks';
import { BoardCard } from '../board/BoardCard';
import { EmptyState } from '../ui/EmptyState';

export function BoardGrid() {
  const { state } = useTasks();
  const hasAnyTask = state.tasks.length > 0;
  const boardsWithTasks = state.boards.filter(b => state.tasks.some(t => t.boardId === b.id));
  const boardsToShow = hasAnyTask ? boardsWithTasks : state.boards;

  if (!hasAnyTask) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
      {boardsToShow.map(board => (
        <BoardCard
          key={board.id}
          board={board}
          tasks={state.tasks.filter(t => t.boardId === board.id)}
        />
      ))}
    </div>
  );
}
