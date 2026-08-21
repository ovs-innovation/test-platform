import { createContext, useCallback, useContext, useState, useRef } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const remove = useCallback((id) => {
    if (timersRef.current.has(id)) {
      clearTimeout(timersRef.current.get(id));
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message, type = 'info', duration = 4000) => {
      if (!message) return null;

      // Suppress alarming generic internal server error toasts on client side
      const strMsg = String(message).toLowerCase();
      if (
        strMsg.includes('a server error occurred') ||
        strMsg.includes('internal_server_error') ||
        strMsg.includes('500') ||
        strMsg.includes('503')
      ) {
        return null;
      }

      let targetId = null;

      setToasts((prev) => {
        // Prevent duplicate toasts with identical message & type
        const existing = prev.find((t) => t.message === message && t.type === type);
        if (existing) {
          targetId = existing.id;
          // Refresh auto-dismiss timer for the existing toast
          if (timersRef.current.has(existing.id)) {
            clearTimeout(timersRef.current.get(existing.id));
          }
          if (duration) {
            const timer = setTimeout(() => remove(existing.id), duration);
            timersRef.current.set(existing.id, timer);
          }
          return prev;
        }

        const id = ++idCounter;
        targetId = id;

        if (duration) {
          const timer = setTimeout(() => remove(id), duration);
          timersRef.current.set(id, timer);
        }

        // Limit to maximum 3 active toasts to prevent clutter
        const newToasts = [...prev, { id, message, type }];
        if (newToasts.length > 3) {
          const oldest = newToasts[0];
          if (timersRef.current.has(oldest.id)) {
            clearTimeout(timersRef.current.get(oldest.id));
            timersRef.current.delete(oldest.id);
          }
          return newToasts.slice(1);
        }
        return newToasts;
      });

      return targetId;
    },
    [remove]
  );

  const toast = {
    success: (m, d) => push(m, 'success', d),
    error: (m, d) => push(m, 'error', d),
    info: (m, d) => push(m, 'info', d),
  };

  const styles = {
    success: 'bg-emerald-950/90 border border-emerald-500/40 text-emerald-100 shadow-xl backdrop-blur-md',
    error: 'bg-slate-900/95 border border-red-500/40 text-slate-100 shadow-2xl backdrop-blur-md',
    info: 'bg-slate-900/95 border border-slate-700/80 text-slate-100 shadow-xl backdrop-blur-md',
  };

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />,
    info: <Info className="h-5 w-5 text-sky-400 shrink-0" />,
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Positioned below fixed navbar header (top-24 sm:top-28) so navbar stays clear */}
      <div className="pointer-events-none fixed inset-x-0 top-24 sm:top-28 z-[99999] flex flex-col items-center gap-2.5 px-4 transition-all">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 w-full max-w-md rounded-xl px-4 py-3 text-sm font-semibold shadow-2xl backdrop-blur-md transition-all duration-300 transform animate-in fade-in slide-in-from-top-3 ${styles[t.type] || styles.info}`}
            role="status"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {icons[t.type] || icons.info}
              <span className="truncate leading-snug">{t.message}</span>
            </div>
            <button
              onClick={() => remove(t.id)}
              className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer shrink-0"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
