import { Board, CategorizationResult } from '../types';

export async function categorizeTask(
  _taskText: string,
  _boards: Board[]
): Promise<CategorizationResult> {
  throw new Error('AI categorization requires a backend API proxy on public deployments');
}
