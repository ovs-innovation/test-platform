import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
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
