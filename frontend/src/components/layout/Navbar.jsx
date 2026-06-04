import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const links = [
  { to: '/',           label: 'Álbum',     end: true },
  { to: '/entry',      label: 'Pegar'              },
  { to: '/ocr',        label: 'OCR'                },
  { to: '/duplicates', label: 'Repetidas'          },
  { to: '/export',     label: 'Exportar'           },
];

export default function Navbar({ dark, onToggle }) {
  return (
    <header className="sticky top-0 z-10 bg-panini-blue shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-14 gap-6">
        <span className="font-display font-bold text-panini-gold text-xl shrink-0 tracking-widest uppercase">
          ⚽ WC 2026
        </span>

        <nav className="flex gap-0.5 overflow-x-auto flex-1">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `px-3 py-1.5 text-sm font-display font-semibold whitespace-nowrap transition-all
                 border-b-2 uppercase tracking-wide ${
                  isActive
                    ? 'text-panini-gold border-panini-gold'
                    : 'text-white/60 border-transparent hover:text-white hover:border-white/30'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <ThemeToggle dark={dark} onToggle={onToggle} light />
      </div>
    </header>
  );
}
