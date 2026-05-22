export default function ProgressBar({ value, max, className = '' }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 ${className}`}>
      <div
        className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}