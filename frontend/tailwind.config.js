/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        success: { DEFAULT: '#22c55e', light: '#dcfce7', dark: '#15803d' },
        danger: { DEFAULT: '#ef4444', light: '#fee2e2', dark: '#b91c1c' },
        warning: { DEFAULT: '#f59e0b', light: '#fef3c7', dark: '#b45309' },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        input: '8px',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.05)',
        card: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.05)',
        elevated: '0 4px 20px rgba(37, 99, 235, 0.08), 0 2px 6px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};
