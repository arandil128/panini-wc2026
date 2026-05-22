import ProgressBar from '../ui/ProgressBar';

export default function OverallProgress({ stats }) {
  if (!stats) return null;
  const { total, owned, pct } = stats;
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6">
      <div className="flex items-end justify-between mb-3">
        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Progreso total</h2>
          <p className="text-4xl font-extrabold text-panini-blue dark:text-blue-400 mt-1">
            {owned}
            <span className="text-xl font-normal text-gray-400 dark:text-gray-500"> / {total}</span>
          </p>
        </div>
        <span className="text-3xl font-bold text-panini-blue dark:text-blue-400">{pct}%</span>
      </div>
      <ProgressBar value={owned} max={total} />
    </div>
  );
}
