import { exportMissing, exportDuplicates } from '../../api/client';

function ExportGroup({ title, exportFn }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {['txt', 'csv', 'json'].map(fmt => (
          <a
            key={fmt}
            href={exportFn(fmt)}
            download
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors uppercase"
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
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Exportar</h1>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 flex flex-col gap-6">
        <ExportGroup title="Faltantes" exportFn={exportMissing} />
        <hr className="border-gray-200 dark:border-gray-700" />
        <ExportGroup title="Repetidas" exportFn={exportDuplicates} />
      </div>
    </div>
  );
}
