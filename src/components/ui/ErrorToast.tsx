import { X } from 'lucide-react';

interface Props {
  message: string;
  onDismiss: () => void;
}

export function ErrorToast({ message, onDismiss }: Props) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg">
      <span className="text-sm">{message}</span>
      <button onClick={onDismiss} className="hover:opacity-70">
        <X size={16} />
      </button>
    </div>
  );
}
