import { useState } from 'react';
import useCollectionStore from '../../store/collectionStore';
import ProgressBar from '../ui/ProgressBar';
import SectionGrid from './SectionGrid';
import Spinner from '../ui/Spinner';

export default function SectionRow({ section }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { sectionStickers, fetchSectionStickers } = useCollectionStore();

  async function toggle() {
    if (!open && !sectionStickers[section.id]) {
      setLoading(true);
      await fetchSectionStickers(section.id);
      setLoading(false);
    }
    setOpen(o => !o);
  }

  const pct = section.total > 0 ? Math.round((section.owned / section.total) * 100) : 0;
  const isComplete = pct === 100;

  return (
    <div className={`bg-white dark:bg-panini-card-dark rounded-2xl overflow-hidden shadow-sm
      border transition-shadow duration-200
      ${isComplete
        ? 'border-panini-gold shadow-panini-gold/20'
        : 'border-gray-100 dark:border-panini-blue/20 hover:shadow-md'
      }`}
    >
      <button
        onClick={toggle}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-panini-cream dark:hover:bg-panini-blue/10 transition-colors text-left"
      >
        <span className="text-2xl w-8 text-center flex-shrink-0 leading-none">{section.flag || '🌐'}</span>

        <span className="font-display font-semibold flex-1 text-sm text-panini-blue dark:text-blue-300 uppercase tracking-wide">
          {section.name}
        </span>

        {isComplete && (
          <span className="text-panini-gold text-xs font-bold">✦ Completo</span>
        )}

        <span className="text-xs text-gray-400 dark:text-gray-500 w-14 text-right font-mono shrink-0">
          {section.owned}/{section.total}
        </span>

        <div className="w-20 shrink-0">
          <ProgressBar value={section.owned} max={section.total} gold />
        </div>

        <span className="text-xs font-display font-bold text-panini-gold w-9 text-right shrink-0">
          {pct}%
        </span>

        <span
          className="text-panini-blue/40 dark:text-blue-400/50 text-xs shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block' }}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="animate-slide-down border-t border-gray-100 dark:border-panini-blue/20 bg-panini-cream/40 dark:bg-panini-dark-navy/50">
          {loading ? (
            <div className="flex justify-center py-6">
              <Spinner />
            </div>
          ) : sectionStickers[section.id] ? (
            <SectionGrid stickers={sectionStickers[section.id]} />
          ) : null}
        </div>
      )}
    </div>
  );
}
