import { useState } from 'react';
import { categorizeTask } from '../lib/claudeApi';
import { useTasks } from './useTasks';
import { Task, Board, ProjectStep } from '../types';
import { BOARD_COLORS } from '../constants';

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function pickColor(existingColors: string[]): string {
  const used = new Set(existingColors);
  return BOARD_COLORS.find(c => !used.has(c)) ?? BOARD_COLORS[Math.floor(Math.random() * BOARD_COLORS.length)];
}

function buildBasicTask(taskText: string, boardId: string): Task {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    boardId,
    text: taskText,
    type: 'one-time',
    priority: 'medium',
    status: 'todo',
    createdAt: now,
    updatedAt: now,
  };
}

export function useClaudeCategorization() {
  const { state, dispatch } = useTasks();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function addTask(taskText: string): Promise<void> {
    const trimmed = taskText.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await categorizeTask(trimmed, state.boards);

      let boardId = result.boardId;

      if (!boardId || !state.boards.find(b => b.id === boardId)) {
        const newBoard: Board = {
          id: generateId(),
          name: result.newBoardName ?? 'General',
          color: result.newBoardColor ?? pickColor(state.boards.map(b => b.color)),
          createdAt: new Date().toISOString(),
          isDefault: false,
        };
        dispatch({ type: 'ADD_BOARD', payload: newBoard });
        boardId = newBoard.id;
      }

      const steps: ProjectStep[] | undefined = result.steps?.map(text => ({
        id: generateId(),
        text,
        done: false,
      }));

      const task: Task = {
        id: generateId(),
        boardId,
        text: trimmed,
        type: result.taskType,
        priority: result.priority,
        status: 'todo',
        dueDate: result.dueDate ?? undefined,
        recurrenceRule: result.recurrenceRule ?? undefined,
        steps: steps?.length ? steps : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch({ type: 'ADD_TASK', payload: task });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('AI error:', msg);

      const fallbackBoardId = state.boards.find(board => board.id === 'personal')?.id ?? state.boards[0]?.id;
      if (fallbackBoardId) {
        dispatch({ type: 'ADD_TASK', payload: buildBasicTask(trimmed, fallbackBoardId) });
        setError('AI categorization is unavailable, so the task was added without smart sorting.');
      } else {
        setError(`Error: ${msg}`);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function clearError() {
    setError(null);
  }

  return { addTask, isLoading, error, clearError };
}
