import { useEffect } from 'react';
import useCollectionStore from '../../store/collectionStore';
import OverallProgress from './OverallProgress';
import SectionList from './SectionList';
import Spinner from '../ui/Spinner';

export default function Dashboard() {
  const { stats, sections, loading, fetchSections } = useCollectionStore();

  useEffect(() => {
    fetchSections();
  }, []);

  if (loading && !sections.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <OverallProgress stats={stats} />
      <SectionList sections={sections} />
    </div>
  );
}
