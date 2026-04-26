import { useState, useRef, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface Props {
  onSubmit: (text: string) => Promise<void>;
  isLoading: boolean;
}

export function TaskInput({ onSubmit, isLoading }: Props) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    setValue('');
    await onSubmit(trimmed);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-end gap-3 bg-white rounded-2xl border border-gray-200 shadow-sm p-3 focus-within:border-blue-300 focus-within:shadow-md transition-all">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="הוסף משימה... (Enter לשליחה)"
        rows={1}
        className="flex-1 resize-none text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
        style={{ direction: 'auto' } as unknown as React.CSSProperties}
        disabled={isLoading}
      />
      <div className="flex items-center gap-2 flex-shrink-0">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!value.trim()}
            className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
