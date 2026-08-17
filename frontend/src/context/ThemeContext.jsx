import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  resolvedTheme: 'light',
  dark: false,
  setTheme: () => {},
  toggle: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('theme_mode') || 'light';
  });

  const [resolvedTheme, setResolvedTheme] = useState('light');

  const applyTheme = useCallback((mode) => {
    let target = mode;
    if (mode === 'system') {
      target = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    setResolvedTheme(target);
    if (target === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const setTheme = (mode) => {
    setThemeState(mode);
    localStorage.setItem('theme_mode', mode);
    applyTheme(mode);
  };

  const toggle = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  useEffect(() => {
    applyTheme(theme);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, dark: resolvedTheme === 'dark', setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

