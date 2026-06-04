import { useState } from 'react';
import { createPortal } from 'react-dom';
import useCollectionStore from '../../store/collectionStore';
import toast from 'react-hot-toast';

function ConfirmPopup({ label, code, onConfirm, onCancel }) {
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-panini-card-dark rounded-2xl shadow-2xl p-6 max-w-xs w-full mx-4 flex flex-col gap-4
                   border border-panini-blue/10 dark:border-panini-blue/30"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="text-3xl mb-2">🗑️</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">¿Querés desmarcar?</p>
          <p className="font-display font-bold text-base text-panini-blue dark:text-blue-300 mt-1">
            {code} — {label}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl border border-gray-300 dark:border-gray-600
                       text-sm font-display font-semibold hover:bg-gray-100 dark:hover:bg-panini-blue/20 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-xl bg-panini-red text-white
                       text-sm font-display font-semibold hover:bg-red-700 transition-colors"
          >
            Desmarcar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function StickerCard({ sticker }) {
  const { paste, unpaste } = useCollectionStore();
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [justPasted, setJustPasted] = useState(false);

  const isPasted  = !!sticker.pasted;
  const isSpecial = sticker.isSpecial;
  const label     = sticker.playerName || sticker.description || sticker.id;
  const num       = sticker.number;

  function handleClick() {
    if (busy) return;
    if (isPasted) setConfirming(true);
    else doPaste();
  }

  async function doPaste() {
    setBusy(true);
    try {
      await paste([sticker.id]);
      toast.success(`${sticker.id} pegada ✓`);
      setJustPasted(true);
      setTimeout(() => setJustPasted(false), 400);
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
        title={`${num} · ${label}`}
        className={`
          relative flex flex-col rounded-lg overflow-hidden select-none aspect-[3/4]
          transition-all duration-200
          ${busy ? 'opacity-50 cursor-wait' : 'cursor-pointer hover:-translate-y-1 hover:shadow-lg'}
          ${justPasted ? 'animate-sticker-pop' : ''}
          ${isPasted
            ? isSpecial
              ? 'ring-2 ring-panini-gold shadow-md shadow-panini-gold/30'
              : 'ring-2 ring-green-400 shadow-md shadow-green-200 dark:shadow-green-900/30'
            : 'ring-1 ring-gray-200 dark:ring-gray-700 shadow-sm'
          }
        `}
      >
        {/* Number strip at top */}
        <div className={`w-full text-center py-[3px] text-[8px] font-display font-bold leading-none shrink-0 ${
          isPasted
            ? isSpecial ? 'bg-panini-gold text-white'   : 'bg-green-500 text-white'
            : 'bg-panini-blue text-white/80'
        }`}>
          {num}
        </div>

        {/* Card body */}
        <div className={`flex-1 relative flex items-center justify-center p-[3px] ${
          isPasted
            ? isSpecial
              ? 'bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-800/20'
              : 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/20'
            : 'bg-white dark:bg-gray-800'
        }`}>

          {/* Shimmer for special stickers */}
          {isPasted && isSpecial && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/55 to-transparent animate-shimmer" />
            </div>
          )}

          <span className={`text-[9px] leading-tight line-clamp-3 text-center relative z-10 font-normal ${
            isPasted
              ? isSpecial
                ? 'text-amber-800 dark:text-amber-300 font-semibold'
                : 'text-green-800 dark:text-green-300 font-medium'
              : 'text-gray-400 dark:text-gray-500'
          }`}>
            {label}
          </span>

          {isPasted && (
            <span className={`absolute bottom-[2px] right-[2px] text-[7px] font-bold z-10 ${
              isSpecial ? 'text-panini-gold-dark' : 'text-green-500'
            }`}>
              {isSpecial ? '✦' : '✓'}
            </span>
          )}
        </div>
      </button>
    </>
  );
}
