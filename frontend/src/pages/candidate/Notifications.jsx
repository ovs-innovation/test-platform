import { useEffect, useState } from 'react';
import { notificationService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader, Spinner } from '../../components/ui.jsx';
import { formatDateTime } from '../../lib/format.js';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [state, setState] = useState('loading');
  const [marking, setMarking] = useState(false);

  const load = async () => {
    setState('loading');
    try {
      setNotifications(await notificationService.list());
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
    } finally {
      setMarking(false);
    }
  };

  const markOne = async (id) => {
    await notificationService.markRead(id);
    setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n)));
  };

  if (state === 'loading') return <LoadingScreen label="Loading notifications…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  const unread = notifications.filter((n) => !n.read_at).length;

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle={unread > 0 ? `${unread} unread` : 'All caught up'}
        actions={unread > 0 && (
          <button type="button" className="btn-secondary text-sm" onClick={markAll} disabled={marking}>
            {marking ? <Spinner className="h-4 w-4" /> : 'Mark all read'}
          </button>
        )}
      />

      {notifications.length === 0 ? (
        <div className="card p-8 text-center text-sm text-slate-500">No notifications yet.</div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`card flex items-start justify-between gap-4 p-4 ${!n.read_at ? 'border-l-4 border-brand-500 bg-brand-50/30' : ''}`}
            >
              <div>
                <p className="font-medium text-slate-900">{n.title}</p>
                <p className="mt-1 text-sm text-slate-600">{n.body}</p>
                <p className="mt-2 text-xs text-slate-400">{formatDateTime(n.created_at)}</p>
              </div>
              {!n.read_at && (
                <button type="button" className="shrink-0 text-xs text-brand-600 hover:underline" onClick={() => markOne(n.id)}>
                  Mark read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
