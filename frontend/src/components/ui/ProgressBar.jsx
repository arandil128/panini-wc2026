export default function ProgressBar({ value, max, className = '', gold = false }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className={`w-full rounded-full h-2.5 overflow-hidden ${className || 'bg-gray-200 dark:bg-gray-700'}`}>
      <div
        className={`h-full rounded-full transition-all duration-700 ${
          gold
            ? 'bg-gradient-to-r from-panini-gold to-yellow-300'
            : 'bg-gradient-to-r from-panini-blue to-panini-blue-light'
        }`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
