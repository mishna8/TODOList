import { Sparkles } from 'lucide-react';
import { TaskInput } from '../input/TaskInput';

interface Props {
  onAddTask: (text: string) => Promise<void>;
  isLoading: boolean;
}

export function Header({ onAddTask, isLoading }: Props) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-100 px-6 py-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={20} className="text-blue-500" />
          <h1 className="text-lg font-bold text-gray-800">רשימת משימות חכמה</h1>
        </div>
        <TaskInput onSubmit={onAddTask} isLoading={isLoading} />
      </div>
    </header>
  );
}
