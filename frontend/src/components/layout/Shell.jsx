import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import useTheme from '../../hooks/useTheme';

export default function Shell() {
  const [dark, toggleDark] = useTheme();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar dark={dark} onToggle={toggleDark} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
          duration: 3000,
        }}
      />
    </div>
  );
}