import { useState } from 'react';
import { updateName } from '../../api/client';
import toast from 'react-hot-toast';

export default function StickerNameEdit({ sticker, onUpdated }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(sticker.playerName || '');
  const [saving, setSaving] = useState(false);

  async function save() {
    if (saving) return;
    setSaving(true);
    try {
      await updateName(sticker.id, value.trim() || null);
      toast.success('Nombre actualizado');
      onUpdated?.(value.trim() || null);
      setEditing(false);
    } catch {
      toast.error('Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  if (!editing) {
    return (
      <span
        onDoubleClick={() => setEditing(true)}
        className="cursor-text hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded px-1"
        title="Doble click para editar"
      >
        {sticker.playerName || <span className="text-gray-400 italic">sin nombre</span>}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1">
      <input
        autoFocus
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEditing(false); }}
        className="border border-blue-400 rounded px-1 py-0.5 text-sm w-36 dark:bg-gray-800"
      />
      <button onClick={save} disabled={saving} className="text-green-600 font-bold text-sm">✓</button>
      <button onClick={() => setEditing(false)} className="text-red-500 font-bold text-sm">✕</button>
    </span>
  );
}
