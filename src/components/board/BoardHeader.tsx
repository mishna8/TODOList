import { useState } from 'react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Board } from '../../types';
import { COLOR_CLASSES } from '../../constants';
import { Modal } from '../ui/Modal';
import { useTasks } from '../../hooks/useTasks';

interface Props {
  board: Board;
  taskCount: number;
}

export function BoardHeader({ board, taskCount }: Props) {
  const { dispatch } = useTasks();
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [nameInput, setNameInput] = useState(board.name);
  const colors = COLOR_CLASSES[board.color] ?? COLOR_CLASSES['gray'];

  const handleRename = () => {
    if (nameInput.trim()) {
      dispatch({ type: 'UPDATE_BOARD', payload: { ...board, name: nameInput.trim() } });
    }
    setRenaming(false);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_BOARD', boardId: board.id });
    setMenuOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${colors.dot}`} />
          <h2 className={`font-semibold text-sm ${colors.text}`}>{board.name}</h2>
          <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-1.5 py-0.5">{taskCount}</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="text-gray-300 hover:text-gray-500 p-1 rounded-lg hover:bg-gray-100"
          >
            <MoreHorizontal size={16} />
          </button>

          {menuOpen && (
            <div className="absolute left-0 top-7 bg-white border border-gray-100 rounded-xl shadow-lg z-10 min-w-[140px] py-1">
              <button
                onClick={() => { setRenaming(true); setMenuOpen(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <Pencil size={14} />
                שנה שם
              </button>
              {!board.isDefault && (
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={14} />
                  מחק בורד
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {renaming && (
        <Modal title="שנה שם בורד" onClose={() => setRenaming(false)}>
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:border-blue-400"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRename()}
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <button onClick={() => setRenaming(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">ביטול</button>
            <button onClick={handleRename} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">שמור</button>
          </div>
        </Modal>
      )}
    </>
  );
}
