import { GoogleGenAI } from '@google/genai';
import { Board, CategorizationResult } from '../types';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY as string });

const SYSTEM_PROMPT = `You are a smart task categorization engine for a personal TODO app.
The user speaks Hebrew or English (or a mix). Always respond in valid JSON only — no extra text, no markdown.

Your job:
1. Given a task text and a list of existing boards, assign the task to the best matching board.
2. If no board fits well (confidence < 0.6), propose a NEW board with a short name and a color.
3. Detect the task type:
   - "one-time"  : a single discrete action (e.g. "buy milk", "call dentist")
   - "recurring" : happens regularly (e.g. "pay rent", "weekly gym")
   - "project"   : multi-step or long-term (e.g. "plan birthday party", "renovate kitchen")
4. Infer priority:
   - "high"   : urgent, deadline-driven, blocking, or contains words like דחוף/urgent/ASAP
   - "medium" : normal day-to-day tasks
   - "low"    : someday / nice-to-have / low urgency
5. Extract a due date if mentioned — output as YYYY-MM-DD. If only a day name is mentioned (e.g. "Friday"), use the next upcoming occurrence.
6. For recurring tasks, state recurrence: "daily", "weekly", "monthly", or a description.
7. For project tasks, list 2-5 concrete actionable sub-steps in the same language as the task.

Board color must be one of: blue, green, red, yellow, purple, pink, orange, teal, indigo, gray, emerald, violet, rose, amber, cyan, lime, sky, slate.

Respond ONLY with this exact JSON structure:
{
  "boardId": "<existing board id or null>",
  "newBoardName": "<string if boardId is null, otherwise omit>",
  "newBoardColor": "<color if boardId is null, otherwise omit>",
  "taskType": "one-time" | "recurring" | "project",
  "priority": "high" | "medium" | "low",
  "dueDate": "<YYYY-MM-DD or null>",
  "recurrenceRule": "<string or null>",
  "steps": ["<step1>", "<step2>"] or null,
  "confidence": <0.0 to 1.0>
}`;

function buildUserMessage(taskText: string, boards: Board[]): string {
  const boardList = boards.map(b => `  - id: "${b.id}", name: "${b.name}"`).join('\n');
  const today = new Date().toISOString().split('T')[0];
  return `Today's date: ${today}\n\nExisting boards:\n${boardList}\n\nNew task: "${taskText}"`;
}

export async function categorizeTask(
  taskText: string,
  boards: Board[]
): Promise<CategorizationResult> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: 'application/json',
      maxOutputTokens: 1024,
    },
    contents: buildUserMessage(taskText, boards),
  });

  let raw = response.text ?? '';
  // strip markdown code fences if present
  raw = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
  console.log('Gemini raw response:', raw);
  return JSON.parse(raw) as CategorizationResult;
}
