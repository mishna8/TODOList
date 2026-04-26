export type TaskType = 'one-time' | 'recurring' | 'project';
export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface ProjectStep {
  id: string;
  text: string;
  done: boolean;
}

export interface Task {
  id: string;
  boardId: string;
  text: string;
  type: TaskType;
  priority: Priority;
  status: TaskStatus;
  dueDate?: string;
  recurrenceRule?: string;
  steps?: ProjectStep[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface Board {
  id: string;
  name: string;
  color: string;
  icon?: string;
  createdAt: string;
  isDefault: boolean;
}

export interface CategorizationResult {
  boardId: string | null;
  newBoardName?: string;
  newBoardColor?: string;
  taskType: TaskType;
  priority: Priority;
  dueDate?: string;
  recurrenceRule?: string;
  steps?: string[];
  confidence: number;
}

export interface AppState {
  boards: Board[];
  tasks: Task[];
  lastUpdated: string;
}
