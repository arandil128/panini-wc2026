import { useState } from 'react';
import { deltaDuplicate, deleteDuplicate } from '../../api/client';
import toast from 'react-hot-toast';

export default function DuplicateRow({ dup, onChanged }) {
  const [busy, setBusy] = useState(false);

  async function delta(d) {
    if (busy) return;
    setBusy(true);
    try {
      await deltaDuplicate(dup.stickerId, d);
      onChanged();
    } catch {
      toast.error('Error al actualizar');
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (busy) return;
    setBusy(true);
    try {
      await deleteDuplicate(dup.stickerId);
      onChanged();
    } catch {
      toast.error('Error al eliminar');
    } finally {
      setBusy(false);
    }
  }

  const label = dup.sticker?.playerName || dup.sticker?.description || dup.stickerId;

  return (
    <div className="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <span className="font-mono text-xs text-gray-400 w-14 shrink-0">{dup.stickerId}</span>
      <span className="flex-1 text-sm truncate">{label}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => delta(-1)}
          disabled={busy}
          className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-600 dark:text-gray-400 font-bold text-lg leading-none flex items-center justify-center transition-colors"
        >
          −
        </button>
        <span className="w-8 text-center font-bold tabular-nums">{dup.quantity}</span>
        <button
          onClick={() => delta(1)}
          disabled={busy}
          className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900/30 text-gray-600 dark:text-gray-400 font-bold text-lg leading-none flex items-center justify-center transition-colors"
        >
          +
        </button>
      </div>
      <button onClick={remove} disabled={busy} className="text-red-400 hover:text-red-600 text-sm ml-2" title="Eliminar">✕</button>
    </div>
  );
}
