import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle({ dark: propDark, onToggle, className = '' }) {
  const themeCtx = useTheme();

  const isDark = themeCtx?.dark ?? propDark;

  const handleClick = () => {
    if (themeCtx?.toggle) {
      themeCtx.toggle();
    } else if (themeCtx?.setTheme) {
      themeCtx.setTheme(isDark ? 'light' : 'dark');
    } else if (onToggle) {
      onToggle();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Toggle color theme mode"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-blue-500/50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:border-blue-500/50 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-xs ${className}`}
    >
      {isDark ? (
        <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

