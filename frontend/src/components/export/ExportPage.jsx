import { exportMissing, exportDuplicates } from '../../api/client';

function ExportGroup({ title, exportFn, icon }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-display font-semibold text-panini-blue dark:text-blue-300 uppercase tracking-wide text-sm flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {['txt', 'csv', 'json'].map(fmt => (
          <a
            key={fmt}
            href={exportFn(fmt)}
            download
            className="px-4 py-2 rounded-xl border-2 border-panini-blue/20 dark:border-panini-blue/40
                       text-sm font-display font-semibold uppercase tracking-wide
                       hover:bg-panini-blue hover:text-white hover:border-panini-blue transition-all duration-200"
          >
            {fmt}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ExportPage() {
  return (
    <div className="max-w-lg mx-auto flex flex-col gap-6">
      <h1 className="page-title">Exportar</h1>

      <div className="card border border-gray-100 dark:border-panini-blue/20 p-6 flex flex-col gap-6">
        <ExportGroup title="Faltantes" exportFn={exportMissing} icon="🔍" />
        <hr className="border-gray-200 dark:border-panini-blue/20" />
        <ExportGroup title="Repetidas" exportFn={exportDuplicates} icon="📦" />
      </div>
    </div>
  );
}
