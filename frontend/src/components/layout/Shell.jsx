import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import useTheme from '../../hooks/useTheme';

export default function Shell() {
  const [dark, toggleDark] = useTheme();
  return (
    <div className="min-h-screen bg-panini-cream dark:bg-panini-dark-navy text-gray-900 dark:text-gray-100">
      <Navbar dark={dark} onToggle={toggleDark} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1a3a6b',
            color: '#fff',
            fontFamily: 'Oswald, sans-serif',
            letterSpacing: '0.05em',
            borderRadius: '12px',
          },
          duration: 2500,
        }}
      />
    </div>
  );
}
