import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import './index.css';

// Suppress third-party browser extension errors (e.g., Chrome extension reportAllChanges / VM scripts)
window.addEventListener('error', (event) => {
  if (
    event.message?.includes('reportAllChanges') ||
    event.message?.includes("reading 'startTime'") ||
    (event.filename && event.filename.includes('VM')) ||
    (event.error?.stack && event.error.stack.includes('reportAllChanges'))
  ) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
});

// Auto-recover from outdated optimize deps or stale dynamic import chunks
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  window.location.reload();
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
