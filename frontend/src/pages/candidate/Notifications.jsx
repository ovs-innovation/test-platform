import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { notificationService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader, Spinner, EmptyState } from '../../components/ui.jsx';
import { formatDateTime } from '../../lib/format.js';
import { Bell, BookOpen, BarChart3, MessageSquare, CheckCircle2 } from 'lucide-react';

function getNotificationStyle(title = '') {
  const lower = title.toLowerCase();
  if (lower.includes('unlocked') || lower.includes('series') || lower.includes('assigned') || lower.includes('invited')) {
    return {
      badgeClass: 'bg-blue-500/10 text-blue-600 dark:text-cyan-300 border-blue-500/20',
      borderClass: 'border-l-4 border-l-blue-600',
      category: 'Test Series Access',
    };
  }
  if (lower.includes('welcome') || lower.includes('account') || lower.includes('profile')) {
    return {
      badgeClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/20',
      borderClass: 'border-l-4 border-l-purple-600',
      category: 'System Welcome',
    };
  }
  if (lower.includes('payment') || lower.includes('invoice') || lower.includes('purchase') || lower.includes('receipt')) {
    return {
      badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20',
      borderClass: 'border-l-4 border-l-emerald-600',
      category: 'Payment Receipt',
    };
  }
  return {
    badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/20',
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
    <div className="space-y-4 max-w-[1440px] mx-auto pb-12">
      <PageHeader
        title="Notifications & Alerts"
        subtitle={unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up! No unread notifications.'}
        actions={unreadCount > 0 && (
          <button
            type="button"
            className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-600 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition"
            onClick={markAll}
            disabled={marking}
          >
            {marking ? <Spinner className="h-4 w-4" /> : 'Mark All Read'}
          </button>
        )}
      />

      {notifications.length === 0 ? (
        <div className="space-y-4">
          <EmptyState
            title="All Caught Up!"
            message="You have no unread notifications or exam schedule alerts at this time. Important test updates and receipts will appear here automatically."
          />

          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              to="/my-tests"
              className="group saas-card p-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl transition hover:border-blue-500/40 space-y-1.5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-cyan-300">
                <BookOpen className="h-4 w-4" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-blue-600">My Test Series →</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Access your enrolled NTA CBT mock test packages and practice papers.</p>
            </Link>

            <Link
              to="/analytics"
              className="group saas-card p-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl transition hover:border-blue-500/40 space-y-1.5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                <BarChart3 className="h-4 w-4" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600">Analytics Report →</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Track score trends, subject accuracy, and chapter weakness breakdowns.</p>
            </Link>

            <Link
              to="/forum"
              className="group saas-card p-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl transition hover:border-blue-500/40 space-y-1.5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-300">
                <MessageSquare className="h-4 w-4" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-purple-600">Student Forum Q&A →</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Ask doubt questions and discuss mock test strategies with top aspirants.</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {notifications.map((n) => {
            const style = getNotificationStyle(n.title);
            const isUnread = !n.read_at;

            return (
              <div
                key={n.id}
                className={`saas-card rounded-xl p-4 flex items-start justify-between gap-3 transition-all duration-200 ${
                  isUnread
                    ? `${style.borderClass} bg-white dark:bg-[#111827] border-slate-200/90 dark:border-slate-800/90 shadow-2xs`
                    : 'border-slate-200/60 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40 opacity-75'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                    <Bell className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-extrabold text-xs text-slate-900 dark:text-white">{n.title}</p>
                      {isUnread && (
                        <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-extrabold text-blue-600 dark:text-cyan-300 border border-blue-500/20">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{n.body}</p>
                    <div className="mt-1.5 flex items-center gap-2 text-[10.5px] font-semibold text-slate-400">
                      <span>{formatDateTime(n.created_at)}</span>
                      <span>•</span>
                      <span>{style.category}</span>
                    </div>
                  </div>
                </div>

                {isUnread && (
                  <button
                    type="button"
                    className="shrink-0 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition"
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
