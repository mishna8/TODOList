import { Sparkles } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-400 select-none">
      <Sparkles size={48} className="mb-4 opacity-40" />
      <p className="text-lg font-medium">עדיין אין משימות</p>
      <p className="text-sm mt-1">הקלד משימה למעלה ו-AI ימיין אותה אוטומטית</p>
    </div>
  );
}
