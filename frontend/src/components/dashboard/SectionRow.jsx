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

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={toggle}
        className="w-full flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
      >
        <span className="text-base">{section.flag || '🌐'}</span>
        <span className="font-semibold flex-1 text-sm">{section.name}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 w-16 text-right">
          {section.owned}/{section.total}
        </span>
        <div className="w-24">
          <ProgressBar value={section.owned} max={section.total} />
        </div>
        <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
        <span className="text-gray-400 text-sm ml-1">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950">
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
