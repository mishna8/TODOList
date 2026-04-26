import { AppState } from '../types';
import { DEFAULT_BOARDS } from '../constants';

const STORAGE_KEY = 'todo-app-state';

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AppState;
  } catch {
    // corrupted storage — fall through to default
  }
  return {
    boards: DEFAULT_BOARDS,
    tasks: [],
    lastUpdated: new Date().toISOString(),
  };
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // quota exceeded or private mode
    console.warn('Could not save state to localStorage');
  }
}
