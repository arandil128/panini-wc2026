import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/entry', label: 'Pegar' },
  { to: '/ocr', label: 'OCR' },
  { to: '/duplicates', label: 'Repetidas' },
  { to: '/export', label: 'Exportar' },
];

export default function Navbar({ dark, onToggle }) {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-14 gap-6">
        <span className="font-bold text-panini-blue dark:text-blue-400 text-lg shrink-0">
          Panini WC 2026
        </span>
        <nav className="flex gap-1 overflow-x-auto flex-1">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-panini-blue text-white dark:bg-blue-600'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle dark={dark} onToggle={onToggle} />
      </div>
    </header>
  );
}