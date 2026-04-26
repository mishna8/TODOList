import { createContext, useContext, useReducer, useEffect, Dispatch } from 'react';
import { AppState, Board, Task } from '../types';
import { loadState, saveState } from '../lib/storage';

type Action =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; taskId: string }
  | { type: 'TOGGLE_TASK_DONE'; taskId: string }
  | { type: 'TOGGLE_STEP_DONE'; taskId: string; stepId: string }
  | { type: 'ADD_BOARD'; payload: Board }
  | { type: 'UPDATE_BOARD'; payload: Board }
  | { type: 'DELETE_BOARD'; boardId: string }
  | { type: 'LOAD_STATE'; payload: AppState };

function reducer(state: AppState, action: Action): AppState {
  const now = new Date().toISOString();
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;

    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload], lastUpdated: now };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t),
        lastUpdated: now,
      };

    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.taskId), lastUpdated: now };

    case 'TOGGLE_TASK_DONE': {
      const tasks = state.tasks.map(t => {
        if (t.id !== action.taskId) return t;
        const done = t.status !== 'done';
        return { ...t, status: done ? 'done' : 'todo', completedAt: done ? now : undefined, updatedAt: now } as Task;
      });
      return { ...state, tasks, lastUpdated: now };
    }

    case 'TOGGLE_STEP_DONE': {
      const tasks = state.tasks.map(t => {
        if (t.id !== action.taskId || !t.steps) return t;
        const steps = t.steps.map(s => s.id === action.stepId ? { ...s, done: !s.done } : s);
        const allDone = steps.every(s => s.done);
        return { ...t, steps, status: allDone ? 'done' : 'in-progress', updatedAt: now } as Task;
      });
      return { ...state, tasks, lastUpdated: now };
    }

    case 'ADD_BOARD':
      return { ...state, boards: [...state.boards, action.payload], lastUpdated: now };

    case 'UPDATE_BOARD':
      return {
        ...state,
        boards: state.boards.map(b => b.id === action.payload.id ? action.payload : b),
        lastUpdated: now,
      };

    case 'DELETE_BOARD': {
      const boards = state.boards.filter(b => b.id !== action.boardId);
      const tasks = state.tasks.filter(t => t.boardId !== action.boardId);
      return { ...state, boards, tasks, lastUpdated: now };
    }

    default:
      return state;
  }
}

export interface TasksContextValue {
  state: AppState;
  dispatch: Dispatch<Action>;
}

export const TasksContext = createContext<TasksContextValue | null>(null);

export function useTasksReducer() {
  const initial = loadState();
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return { state, dispatch };
}

export function useTasks(): TasksContextValue {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks must be used within TasksContext.Provider');
  return ctx;
}
