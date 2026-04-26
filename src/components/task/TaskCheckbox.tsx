interface Props {
  text: string;
  done: boolean;
  onToggle: () => void;
}

export function TaskCheckbox({ text, done, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="flex items-start gap-2 text-right w-full group"
    >
      <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
        ${done ? 'bg-green-500 border-green-500' : 'border-gray-300 group-hover:border-gray-400'}`}
      >
        {done && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className={`text-sm leading-relaxed ${done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
        {text}
      </span>
    </button>
  );
}
