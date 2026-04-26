import { ProjectStep } from '../../types';

interface Props {
  text: string;
  steps: ProjectStep[];
  done: boolean;
  onToggleStep: (stepId: string) => void;
  onToggleTask: () => void;
}

export function TaskProgress({ text, steps, done, onToggleStep, onToggleTask }: Props) {
  const completedCount = steps.filter(s => s.done).length;
  const progress = steps.length > 0 ? (completedCount / steps.length) * 100 : 0;

  return (
    <div className="w-full">
      <button onClick={onToggleTask} className="flex items-start gap-2 text-right w-full group mb-2">
        <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
          ${done ? 'bg-green-500 border-green-500' : 'border-gray-300 group-hover:border-gray-400'}`}
        >
          {done && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span className={`text-sm font-medium leading-relaxed ${done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {text}
        </span>
      </button>

      {!done && (
        <>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
            <div
              className="bg-green-400 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="space-y-1 ps-6">
            {steps.map(step => (
              <button
                key={step.id}
                onClick={() => onToggleStep(step.id)}
                className="flex items-center gap-2 text-right w-full group"
              >
                <span className={`flex-shrink-0 w-3 h-3 rounded border flex items-center justify-center transition-colors
                  ${step.done ? 'bg-green-400 border-green-400' : 'border-gray-300 group-hover:border-gray-400'}`}
                >
                  {step.done && (
                    <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className={`text-xs ${step.done ? 'line-through text-gray-400' : 'text-gray-500'}`}>
                  {step.text}
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-1 ps-6">{completedCount}/{steps.length} שלבים</p>
        </>
      )}
    </div>
  );
}
