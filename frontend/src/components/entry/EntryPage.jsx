import { useState } from 'react';
import useCollectionStore from '../../store/collectionStore';
import CodeInput from './CodeInput';
import toast from 'react-hot-toast';

export default function EntryPage() {
  const { paste } = useCollectionStore();
  const [busy, setBusy] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  async function handleConfirm(codes) {
    setBusy(true);
    try {
      const res = await paste(codes);
      setLastResult({ codes, newCount: res.newCount ?? codes.length });
      toast.success(`${res.newCount ?? codes.length} figurita${codes.length > 1 ? 's' : ''} pegada${codes.length > 1 ? 's' : ''} ✓`);
    } catch {
      toast.error('Error al pegar las figuritas');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <h1 className="page-title">Pegar figuritas</h1>

      <div className="card p-6 border border-gray-100 dark:border-panini-blue/20">
        {busy ? (
          <div className="text-center py-8 text-gray-400 font-display uppercase tracking-wider text-sm">
            Guardando...
          </div>
        ) : (
          <CodeInput onConfirm={handleConfirm} />
        )}
      </div>

      {lastResult && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-2xl p-4">
          <p className="text-sm font-display font-semibold text-green-800 dark:text-green-300 uppercase tracking-wide">
            ✓ Pegadas: {lastResult.codes.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
