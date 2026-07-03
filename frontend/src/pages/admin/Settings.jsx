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
        <PageHeader title="Site settings" subtitle="Global platform configuration." />
        <form onSubmit={saveSettings} className="card max-w-lg space-y-4 p-6">
          <div><label className="label">Site name</label><input className="input" value={settings.site_name || ''} onChange={(e) => setSettings((s) => ({ ...s, site_name: e.target.value }))} /></div>
          <div><label className="label">Support email</label><input className="input" type="email" value={settings.support_email || ''} onChange={(e) => setSettings((s) => ({ ...s, support_email: e.target.value }))} /></div>
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? <Spinner className="h-4 w-4" /> : 'Save'}</button>
        </form>
      </div>
      <div>
        <PageHeader title="Broadcast notification" subtitle="Send to all students." />
        <form onSubmit={sendBroadcast} className="card max-w-lg space-y-4 p-6">
          <input className="input" placeholder="Title" value={broadcast.title} onChange={(e) => setBroadcast((b) => ({ ...b, title: e.target.value }))} required />
          <textarea className="input" rows={3} placeholder="Message" value={broadcast.body} onChange={(e) => setBroadcast((b) => ({ ...b, body: e.target.value }))} required />
          <button type="submit" className="btn-primary">Send broadcast</button>
        </form>
      </div>
    </div>
  );
}
