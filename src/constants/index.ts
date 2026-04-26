import { Board } from '../types';

export const DEFAULT_BOARDS: Board[] = [
  {
    id: 'personal',
    name: 'אישי',
    color: 'blue',
    icon: 'User',
    createdAt: new Date().toISOString(),
    isDefault: true,
  },
  {
    id: 'work',
    name: 'עבודה',
    color: 'purple',
    icon: 'Briefcase',
    createdAt: new Date().toISOString(),
    isDefault: true,
  },
  {
    id: 'shopping',
    name: 'קניות',
    color: 'green',
    icon: 'ShoppingCart',
    createdAt: new Date().toISOString(),
    isDefault: true,
  },
];

export const BOARD_COLORS = [
  'blue', 'green', 'purple', 'orange', 'red',
  'pink', 'teal', 'indigo', 'amber', 'cyan',
  'rose', 'lime', 'sky', 'violet', 'emerald',
];

export const PRIORITY_LABELS: Record<string, string> = {
  high: 'דחוף',
  medium: 'רגיל',
  low: 'נמוך',
};

export const PRIORITY_COLORS: Record<string, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-gray-100 text-gray-500',
};

export const COLOR_CLASSES: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  blue:    { bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-800',    dot: 'bg-blue-500' },
  green:   { bg: 'bg-green-50',   border: 'border-green-200',   text: 'text-green-800',   dot: 'bg-green-500' },
  purple:  { bg: 'bg-purple-50',  border: 'border-purple-200',  text: 'text-purple-800',  dot: 'bg-purple-500' },
  orange:  { bg: 'bg-orange-50',  border: 'border-orange-200',  text: 'text-orange-800',  dot: 'bg-orange-500' },
  red:     { bg: 'bg-red-50',     border: 'border-red-200',     text: 'text-red-800',     dot: 'bg-red-500' },
  pink:    { bg: 'bg-pink-50',    border: 'border-pink-200',    text: 'text-pink-800',    dot: 'bg-pink-500' },
  teal:    { bg: 'bg-teal-50',    border: 'border-teal-200',    text: 'text-teal-800',    dot: 'bg-teal-500' },
  indigo:  { bg: 'bg-indigo-50',  border: 'border-indigo-200',  text: 'text-indigo-800',  dot: 'bg-indigo-500' },
  amber:   { bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-800',   dot: 'bg-amber-500' },
  cyan:    { bg: 'bg-cyan-50',    border: 'border-cyan-200',    text: 'text-cyan-800',    dot: 'bg-cyan-500' },
  rose:    { bg: 'bg-rose-50',    border: 'border-rose-200',    text: 'text-rose-800',    dot: 'bg-rose-500' },
  lime:    { bg: 'bg-lime-50',    border: 'border-lime-200',    text: 'text-lime-800',    dot: 'bg-lime-500' },
  sky:     { bg: 'bg-sky-50',     border: 'border-sky-200',     text: 'text-sky-800',     dot: 'bg-sky-500' },
  violet:  { bg: 'bg-violet-50',  border: 'border-violet-200',  text: 'text-violet-800',  dot: 'bg-violet-500' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', dot: 'bg-emerald-500' },
  gray:    { bg: 'bg-gray-50',    border: 'border-gray-200',    text: 'text-gray-800',    dot: 'bg-gray-500' },
};
