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
      <h1 className="page-title">
        Repetidas{' '}
        {total > 0 && (
          <span className="text-base font-normal text-gray-400 normal-case tracking-normal">
            ({total} total)
          </span>
        )}
      </h1>

      <div className="card border border-gray-100 dark:border-panini-blue/20 p-5">
        <form onSubmit={addDuplicate} className="flex gap-2 items-end mb-5">
          <div className="flex-1">
            <label className="block text-xs font-display text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
              Código
            </label>
            <input
              value={addCode}
              onChange={e => setAddCode(e.target.value)}
              placeholder="ARG17"
              className="input-base font-mono"
            />
          </div>
          <div className="w-20">
            <label className="block text-xs font-display text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
              Cant.
            </label>
            <input
              type="number"
              min={1}
              value={addQty}
              onChange={e => setAddQty(Number(e.target.value))}
              className="input-base"
            />
          </div>
          <button
            type="submit"
            disabled={adding || !addCode.trim()}
            className="btn-primary"
          >
            Agregar
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center py-8"><Spinner /></div>
        ) : dups.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6 font-display uppercase tracking-wide">
            No tenés repetidas registradas
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            {dups.map(d => <DuplicateRow key={d.stickerId} dup={d} onChanged={load} />)}
          </div>
        )}
      </div>
    </div>
  );
}
