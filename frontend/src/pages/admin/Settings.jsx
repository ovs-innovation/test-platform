import { useEffect, useState } from 'react';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, PageHeader, Spinner } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { ShieldAlert, Target, GraduationCap } from 'lucide-react';

export default function AdminSettings() {
  const toast = useToast();
  const [settings, setSettings] = useState({ site_name: '', support_email: '' });
  const [broadcast, setBroadcast] = useState({ title: '', body: '', role: 'candidate' });
  const [featureFlags, setFeatureFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [sRes, flagsRes] = await Promise.all([
        adminService.settings().catch(() => ({ site_name: 'EDVEDUM Academy', support_email: 'support@edvedum.ac.in' })),
        adminService.getFeatureFlags().catch(() => ({ feature_flags: [] })),
      ]);
      setSettings(sRes || {});
      setFeatureFlags(flagsRes?.feature_flags || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminService.updateSettings(settings);
      toast.success('Platform Settings Saved!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const sendBroadcast = async (e) => {
    e.preventDefault();
    try {
      const res = await adminService.broadcast(broadcast);
      toast.success(`Sent broadcast to ${res.sent || 0} active candidates`);
      setBroadcast({ title: '', body: '', role: 'candidate' });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleToggleFlag = async (flagName, currentVal) => {
    const newVal = !currentVal;
    try {
      await adminService.updateFeatureFlag(flagName, { is_enabled: newVal });
      setFeatureFlags((prev) =>
        prev.map((f) => (f.flag_name === flagName ? { ...f, is_enabled: newVal } : f))
      );
      toast.success(`Feature ${flagName} has been ${newVal ? 'ENABLED' : 'DISABLED'} platform-wide.`);
    } catch (err) {
      toast.error(err.message || 'Failed to update feature flag.');
    }
  };

  if (loading) return <LoadingScreen />;

  const isPredictedNeetEnabled = featureFlags.find((f) => f.flag_name === 'predicted_neet_score')?.is_enabled ?? true;
  const isCollegePredictionEnabled = featureFlags.find((f) => f.flag_name === 'college_prediction')?.is_enabled ?? true;

  return (
    <div className="space-y-8 max-w-4xl">
      {/* 1. Global Settings */}
      <div>
        <PageHeader title="Platform Settings" subtitle="Global branding and support email details." />
        <form onSubmit={saveSettings} className="card max-w-lg space-y-4 p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl">
          <div>
            <label className="label">Site Name</label>
            <input className="input" value={settings.site_name || ''} onChange={(e) => setSettings((s) => ({ ...s, site_name: e.target.value }))} />
          </div>
          <div>
            <label className="label">Support Email</label>
            <input className="input" type="email" value={settings.support_email || ''} onChange={(e) => setSettings((s) => ({ ...s, support_email: e.target.value }))} />
          </div>
          <div className="flex justify-end pt-2">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? <Spinner className="h-4 w-4" /> : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>

      {/* 2. Feature Flags Control Panel */}
      <div>
        <PageHeader title="AIETS Feature Flags & sensitive Prediction Controls" subtitle="Enable or disable sensitive AI score predictions and college cutoff algorithms platform-wide." />
        <div className="card max-w-lg space-y-4 p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl">
          {/* Toggle 1: Predicted NEET Score */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200/80 dark:border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">Predicted NEET Score Feature</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Controls display of estimated NEET score range on student post-test report.</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleFlag('predicted_neet_score', isPredictedNeetEnabled)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isPredictedNeetEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isPredictedNeetEnabled ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Toggle 2: College Prediction */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200/80 dark:border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">College Eligibility Predictor</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Matches student performance against historical NEET college cutoff ranks.</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleFlag('college_prediction', isCollegePredictionEnabled)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isCollegePredictionEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isCollegePredictionEnabled ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Broadcast Announcement */}
      <div>
        <PageHeader title="Broadcast Announcement" subtitle="Send instant notifications to all active candidates." />
        <form onSubmit={sendBroadcast} className="card max-w-lg space-y-4 p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl">
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
