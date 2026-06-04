import ProgressBar from '../ui/ProgressBar';

export default function OverallProgress({ stats }) {
  if (!stats) return null;
  const { total, owned, pct } = stats;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-panini-blue to-panini-blue-light rounded-2xl shadow-xl p-6 text-white">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-14 -left-10 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">🏆</span>
            <span className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
              Mi Álbum · WC 2026
            </span>
          </div>
          <p className="font-display text-5xl font-bold text-white leading-none">
            {owned}
            <span className="text-2xl font-normal text-white/40"> / {total}</span>
          </p>
          <p className="text-white/50 text-sm mt-1 font-normal">figuritas pegadas</p>
        </div>

        <div className="text-right shrink-0">
          <p className="font-display text-6xl font-bold text-panini-gold leading-none">{pct}%</p>
          <p className="text-white/50 text-xs mt-1 font-normal uppercase tracking-widest">completado</p>
        </div>
      </div>

      <div className="relative mt-5">
        <ProgressBar value={owned} max={total} className="h-3 bg-white/20" gold />
      </div>
    </div>
  );
}
