import { useState, useEffect, useCallback } from 'react';
import { getDuplicates, upsertDuplicate } from '../../api/client';
import DuplicateRow from './DuplicateRow';
import toast from 'react-hot-toast';
import Spinner from '../ui/Spinner';

export default function DuplicatesPage() {
  const [dups, setDups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addCode, setAddCode] = useState('');
  const [addQty, setAddQty] = useState(1);
  const [adding, setAdding] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getDuplicates();
      setDups(res.data.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function addDuplicate(e) {
    e.preventDefault();
    const code = addCode.trim().toUpperCase().replace(/\s/g, '');
    if (!code) return;
    setAdding(true);
    try {
      await upsertDuplicate(code, addQty);
      setAddCode('');
      setAddQty(1);
      await load();
      toast.success('Repetida agregada');
    } catch {
      toast.error('Error al agregar. ¿El código existe en el catálogo?');
    } finally {
      setAdding(false);
    }
  }

  const total = dups.reduce((s, d) => s + d.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Repetidas {total > 0 && <span className="text-base font-normal text-gray-400">({total} total)</span>}
      </h1>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-5">
        <form onSubmit={addDuplicate} className="flex gap-2 items-end mb-5">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Código</label>
            <input
              value={addCode}
              onChange={e => setAddCode(e.target.value)}
              placeholder="ARG17"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-20">
            <label className="block text-xs text-gray-500 mb-1">Cantidad</label>
            <input
              type="number"
              min={1}
              value={addQty}
              onChange={e => setAddQty(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={adding || !addCode.trim()}
            className="px-4 py-2 rounded-lg bg-panini-blue text-white font-semibold text-sm disabled:opacity-40 hover:bg-blue-800 transition-colors"
          >
            Agregar
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center py-8"><Spinner /></div>
        ) : dups.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No tenés repetidas registradas</p>
        ) : (
          <div>{dups.map(d => <DuplicateRow key={d.stickerId} dup={d} onChanged={load} />)}</div>
        )}
      </div>
    </div>
  );
}
