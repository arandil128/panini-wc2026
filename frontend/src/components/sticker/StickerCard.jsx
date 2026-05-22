import { useState } from 'react';
import useCollectionStore from '../../store/collectionStore';
import toast from 'react-hot-toast';

function ConfirmPopup({ label, code, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onCancel}>
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 max-w-xs w-full mx-4 flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
      >
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
          ¿Querés desmarcar
          <span className="block font-bold text-base text-gray-900 dark:text-white mt-1">
            {code} — {label}
          </span>
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
          >
            Desmarcar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StickerCard({ sticker }) {
  const { paste, unpaste } = useCollectionStore();
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const isPasted = !!sticker.collectionEntry;
  const isSpecial = sticker.isSpecial;
  const label = sticker.playerName || sticker.description || sticker.id;
  const num = sticker.number;

  function handleClick() {
    if (busy) return;
    if (isPasted) {
      setConfirming(true);
    } else {
      doPaste();
    }
  }

  async function doPaste() {
    setBusy(true);
    try {
      await paste([sticker.id]);
      toast.success(`${sticker.id} pegada`);
    } catch {
      toast.error('Error al actualizar');
    } finally {
      setBusy(false);
    }
  }

  async function doUnpaste() {
    setConfirming(false);
    setBusy(true);
    try {
      await unpaste(sticker.id);
      toast.success(`${sticker.id} desmarcada`);
    } catch {
      toast.error('Error al actualizar');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {confirming && (
        <ConfirmPopup
          label={label}
          code={sticker.id}
          onConfirm={doUnpaste}
          onCancel={() => setConfirming(false)}
        />
      )}
      <button
        onClick={handleClick}
        disabled={busy}
        title={label}
        className={`
          relative flex flex-col items-center justify-center rounded-lg border-2 p-1 text-center
          transition-all duration-200 select-none aspect-[3/4] text-xs
          ${busy ? 'opacity-50 cursor-wait' : 'cursor-pointer hover:scale-105'}
          ${isPasted
            ? isSpecial
              ? 'bg-panini-gold/20 border-panini-gold text-yellow-800 dark:text-yellow-300'
              : 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:border-green-500 dark:text-green-300'
            : 'bg-gray-100 border-gray-300 text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-500'
          }
        `}
      >
        <span className="font-bold text-[10px] leading-none mb-0.5 opacity-60">{num}</span>
        <span className="leading-tight line-clamp-2">{label}</span>
        {isPasted && (
          <span className="absolute top-0.5 right-0.5 text-[8px]">
            {isSpecial ? '✦' : '✓'}
          </span>
        )}
      </button>
    </>
  );
}
