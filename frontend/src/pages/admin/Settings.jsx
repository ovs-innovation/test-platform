import { useEffect, useState } from 'react';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, PageHeader, Spinner } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function AdminSettings() {
  const toast = useToast();
  const [settings, setSettings] = useState({ site_name: '', support_email: '' });
  const [broadcast, setBroadcast] = useState({ title: '', body: '', role: 'candidate' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminService.settings().then(setSettings).finally(() => setLoading(false));
  }, []);

  const saveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminService.updateSettings(settings);
      toast.success('Settings saved');
    } catch (err) { toast.error(err.message); }
    finally { setSaving(false); }
  };

  const sendBroadcast = async (e) => {
    e.preventDefault();
    try {
      const res = await adminService.broadcast(broadcast);
      toast.success(`Sent to ${res.sent} users`);
      setBroadcast({ title: '', body: '', role: 'candidate' });
    } catch (err) { toast.error(err.message); }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="space-y-8">
      <div>
        <PageHeader title="Platform Settings" subtitle="Global configuration and contact settings." />
        <form onSubmit={saveSettings} className="card max-w-lg space-y-4 p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
          <div><label className="label">Site Name</label><input className="input" value={settings.site_name || ''} onChange={(e) => setSettings((s) => ({ ...s, site_name: e.target.value }))} /></div>
          <div><label className="label">Support Email</label><input className="input" type="email" value={settings.support_email || ''} onChange={(e) => setSettings((s) => ({ ...s, support_email: e.target.value }))} /></div>
          <div className="flex justify-end pt-2">
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? <Spinner className="h-4 w-4" /> : 'Save Settings'}</button>
          </div>
        </form>
      </div>
      <div>
        <PageHeader title="Broadcast Notification" subtitle="Send an instant notification announcement to all registered students." />
        <form onSubmit={sendBroadcast} className="card max-w-lg space-y-4 p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
          <div>
            <label className="label">Announcement Title</label>
            <input className="input" placeholder="Title" value={broadcast.title} onChange={(e) => setBroadcast((b) => ({ ...b, title: e.target.value }))} required />
          </div>
          <div>
            <label className="label">Message Body</label>
            <textarea className="input" rows={3} placeholder="Message content..." value={broadcast.body} onChange={(e) => setBroadcast((b) => ({ ...b, body: e.target.value }))} required />
          </div>
          <div className="flex justify-end pt-2">
            <button type="submit" className="btn-primary">📢 Send Broadcast</button>
          </div>
        </form>
      </div>
    </div>
  );
}

