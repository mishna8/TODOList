import { TasksContext, useTasksReducer, useTasks } from './hooks/useTasks';
import { useClaudeCategorization } from './hooks/useClaudeCategorization';
import { useNotifications } from './hooks/useNotifications';
import { Header } from './components/layout/Header';
import { BoardGrid } from './components/layout/BoardGrid';
import { ErrorToast } from './components/ui/ErrorToast';

function AppInner() {
  const { addTask, isLoading, error, clearError } = useClaudeCategorization();
  const { state } = useTasks();
  useNotifications(state.tasks);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddTask={addTask} isLoading={isLoading} />
      <main className="max-w-7xl mx-auto">
        <BoardGrid />
      </main>
      {error && <ErrorToast message={error} onDismiss={clearError} />}
    </div>
  );
}

export default function App() {
  const { state, dispatch } = useTasksReducer();

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      <AppInner />
    </TasksContext.Provider>
  );
}
