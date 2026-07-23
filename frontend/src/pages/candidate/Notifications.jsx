import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { notificationService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader, Spinner, EmptyState } from '../../components/ui.jsx';
import { formatDateTime } from '../../lib/format.js';

function getNotificationStyle(title = '') {
  const lower = title.toLowerCase();
  if (lower.includes('unlocked') || lower.includes('series') || lower.includes('assigned') || lower.includes('invited')) {
    return {
      icon: '🔑',
      badgeClass: 'bg-blue-500/20 text-cyan-300 border-blue-500/30',
      borderClass: 'border-l-4 border-l-[#2563eb]',
      category: 'Test Series Access',
    };
  }
  if (lower.includes('welcome') || lower.includes('account') || lower.includes('profile')) {
    return {
      icon: '👋',
      badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      borderClass: 'border-l-4 border-l-purple-500',
      category: 'System Welcome',
    };
  }
  if (lower.includes('payment') || lower.includes('invoice') || lower.includes('purchase') || lower.includes('receipt')) {
    return {
      icon: '💳',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      borderClass: 'border-l-4 border-l-emerald-500',
      category: 'Payment Receipt',
    };
  }
  // Default Reminders / Schedule
  return {
    icon: '⏰',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    borderClass: 'border-l-4 border-l-amber-500',
    category: 'CBT Reminder',
  };
}

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [state, setState] = useState('loading');
  const [marking, setMarking] = useState(false);

  const load = async () => {
    setState('loading');
    try {
      const list = await notificationService.list();
      setNotifications(list);
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => { load(); }, []);

  const markAll = async () => {
    setMarking(true);
    try {
      await notificationService.markAllRead();
      await load();
      window.dispatchEvent(new CustomEvent('notificationStatusChanged'));
    } finally {
      setMarking(false);
    }
  };

  const markOne = async (id) => {
    await notificationService.markRead(id);
    setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n)));
    window.dispatchEvent(new CustomEvent('notificationStatusChanged'));
  };

  if (state === 'loading') return <LoadingScreen label="Loading notifications…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Notifications & Alerts"
        subtitle={unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up! No unread notifications.'}
        actions={unreadCount > 0 && (
          <button
            type="button"
            className="rounded-full border border-blue-500/30 bg-blue-500/15 px-5 py-2 text-xs font-bold text-blue-300 transition hover:bg-[#2563eb] hover:text-white"
            onClick={markAll}
            disabled={marking}
          >
            {marking ? <Spinner className="h-4 w-4" /> : 'Mark All Read'}
          </button>
        )}
      />

      {notifications.length === 0 ? (
        <div className="space-y-6">
          <EmptyState
            title="All Caught Up!"
            message="You have no unread notifications or exam schedule alerts at this time. Important test updates and receipts will appear here automatically."
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              to="/my-tests"
              className="group rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl transition hover:-translate-y-1 hover:border-blue-500/50 space-y-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                📝
              </div>
              <h3 className="font-extrabold text-white text-sm group-hover:text-[#60a5fa]">My Test Series →</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Access your enrolled NTA CBT mock test packages and practice papers.</p>
            </Link>

            <Link
              to="/analytics"
              className="group rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl transition hover:-translate-y-1 hover:border-blue-500/50 space-y-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                📈
              </div>
              <h3 className="font-extrabold text-white text-sm group-hover:text-emerald-300">Analytics Report →</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Track score trends, subject accuracy, and chapter weakness breakdowns.</p>
            </Link>

            <Link
              to="/forum"
              className="group rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl transition hover:-translate-y-1 hover:border-blue-500/50 space-y-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                💬
              </div>
              <h3 className="font-extrabold text-white text-sm group-hover:text-purple-300">Student Forum Q&A →</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Ask doubt questions and discuss mock test strategies with top aspirants.</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => {
            const style = getNotificationStyle(n.title);
            const isUnread = !n.read_at;

            return (
              <div
                key={n.id}
                className={`rounded-2xl border p-4 sm:p-5 flex items-start justify-between gap-4 transition-all duration-200 ${
                  isUnread
                    ? `${style.borderClass} border-slate-700 bg-[#0e193c] shadow-xl`
                    : 'border-slate-800/60 bg-[#0b1430]/60 opacity-60 hover:opacity-90'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Category Type Icon */}
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-lg shadow-md ${
                    isUnread ? style.badgeClass : 'bg-slate-800/60 text-slate-400 border-slate-700/40'
                  }`}>
                    {style.icon}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`font-extrabold text-sm sm:text-base ${isUnread ? 'text-white' : 'text-slate-300'}`}>{n.title}</p>
                      {isUnread && (
                        <span className="rounded-full bg-blue-500/30 px-2 py-0.5 text-[9px] font-black text-cyan-300 border border-blue-400/40">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isUnread ? 'text-slate-200' : 'text-slate-400'}`}>{n.body}</p>
                    <div className="mt-2.5 flex items-center gap-3 text-[11px] font-semibold text-slate-400">
                      <span>🕒 {formatDateTime(n.created_at)}</span>
                      <span>•</span>
                      <span className="text-slate-400">{style.category}</span>
                    </div>
                  </div>
                </div>

                {isUnread && (
                  <button
                    type="button"
                    className="shrink-0 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-bold text-cyan-300 hover:bg-[#2563eb] hover:text-white transition"
                    onClick={() => markOne(n.id)}
                  >
                    Mark read
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
