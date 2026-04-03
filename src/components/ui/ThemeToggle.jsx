import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
        dark
          ? 'bg-gold/20 text-gold-light hover:bg-gold/30'
          : 'bg-maroon/10 text-maroon hover:bg-maroon/20'
      } ${className}`}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? <HiSun size={18} /> : <HiMoon size={18} />}
    </button>
  );
}
