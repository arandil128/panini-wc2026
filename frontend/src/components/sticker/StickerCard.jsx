import { useState } from 'react';
import useCollectionStore from '../../store/collectionStore';
import toast from 'react-hot-toast';

export default function StickerCard({ sticker }) {
  const { paste, unpaste } = useCollectionStore();
  const [busy, setBusy] = useState(false);

  const isPasted = !!sticker.collectionEntry;
  const isSpecial = sticker.isSpecial;

  async function toggle() {
    if (busy) return;
    setBusy(true);
    try {
      if (isPasted) {
        await unpaste(sticker.id);
        toast.success(`${sticker.id} desmarcada`);
      } else {
        await paste([sticker.id]);
        toast.success(`${sticker.id} pegada`);
      }
    } catch {
      toast.error('Error al actualizar');
    } finally {
      setBusy(false);
    }
  }

  const label = sticker.playerName || sticker.description || sticker.id;
  const num = sticker.number;

  return (
    <button
      onClick={toggle}
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
  );
}
