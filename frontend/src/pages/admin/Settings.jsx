import { useEffect, useState } from 'react';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, Spinner } from '../../components/ui.jsx';
import { AdminHeader, AdminCard } from '../../components/admin/AdminUI.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { Target, GraduationCap, Radio, Sliders, Shield } from 'lucide-react';

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
        adminService.settings().catch(() => ({ site_name: 'EDVEDUM Academy', support_email: 'support@edvedum.com' })),
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

  if (loading) return <LoadingScreen label="Loading system settings..." />;

  const isPredictedNeetEnabled = featureFlags.find((f) => f.flag_name === 'predicted_neet_score')?.is_enabled ?? true;
  const isCollegePredictionEnabled = featureFlags.find((f) => f.flag_name === 'college_prediction')?.is_enabled ?? true;

  return (
    <div className="space-y-6 w-full max-w-full">
      {/* Page Header */}
      <AdminHeader
        title="System Configuration & Platform Settings"
        subtitle="Global platform branding, AI prediction feature flags, and broadcast candidate announcements."
        breadcrumbs={['System Configuration']}
        status="Operational"
      />

      {/* 2-Column Grid Layout Filling Desktop Space */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {/* Left Column (6 Cols): Platform Branding & Broadcast Announcement */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. Global Platform Branding Settings */}
          <AdminCard
            title="Global Platform Identity"
            subtitle="Configure public site branding and official candidate support email"
          >
            <form onSubmit={saveSettings} className="space-y-4 pt-1">
              <div>
                <label className="label">Site Name</label>
                <input
                  className="input"
                  value={settings.site_name || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, site_name: e.target.value }))}
                />
              </div>
              <div>
                <label className="label">Support Email</label>
                <input
                  className="input"
                  type="email"
                  value={settings.support_email || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, support_email: e.target.value }))}
                />
              </div>
              <div className="flex justify-end pt-2 border-t border-slate-200/80 dark:border-slate-800">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? <Spinner className="h-4 w-4" /> : 'Save Settings'}
                </button>
              </div>
            </form>
          </AdminCard>

          {/* 2. Broadcast Candidate Announcement */}
          <AdminCard
            title="Broadcast Candidate Announcement"
            subtitle="Send real-time platform notifications to all active candidate accounts"
          >
            <form onSubmit={sendBroadcast} className="space-y-4 pt-1">
              <div>
                <label className="label">Announcement Title</label>
                <input
                  className="input"
                  placeholder="e.g. AIETS Mock Test #4 Schedule Release"
                  value={broadcast.title}
                  onChange={(e) => setBroadcast((b) => ({ ...b, title: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="label">Message Body</label>
                <textarea
                  className="input"
                  rows={4}
                  placeholder="Write clear instructions or announcement details for candidates..."
                  value={broadcast.body}
                  onChange={(e) => setBroadcast((b) => ({ ...b, body: e.target.value }))}
                  required
                />
              </div>
              <div className="flex justify-end pt-2 border-t border-slate-200/80 dark:border-slate-800">
                <button type="submit" className="btn btn-primary">
                  📢 Send Broadcast
                </button>
              </div>
            </form>
          </AdminCard>
        </div>

        {/* Right Column (6 Cols): AI Prediction Feature Flags & Environment Info */}
        <div className="lg:col-span-6 space-y-6">
          {/* 3. AI ETS Feature Flags & Sensitive Prediction Controls */}
          <AdminCard
            title="AI ETS Prediction Feature Flags"
            subtitle="Enable or disable sensitive AI score predictions and college cutoff algorithms platform-wide"
          >
            <div className="space-y-4 pt-1">
              {/* Toggle 1: Predicted NEET Score */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <div className="space-y-1 max-w-sm">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Predicted NEET Score Feature</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Controls display of estimated NEET score range on student post-test reports.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleFlag('predicted_neet_score', isPredictedNeetEnabled)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isPredictedNeetEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isPredictedNeetEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 2: College Prediction */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <div className="space-y-1 max-w-sm">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">College Eligibility Predictor</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Matches candidate performance against historical NEET college cutoff rank data.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleFlag('college_prediction', isCollegePredictionEnabled)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isCollegePredictionEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isCollegePredictionEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </AdminCard>

          {/* 4. System Environment & Security Summary */}
          <AdminCard
            title="System Environment & Compliance"
            subtitle="Platform operational parameters and security controls"
          >
            <div className="space-y-3 pt-1 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800">
                <span className="font-semibold text-slate-600 dark:text-slate-400">Environment</span>
                <span className="font-bold text-slate-900 dark:text-white">Production (Hostinger VPS)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800">
                <span className="font-semibold text-slate-600 dark:text-slate-400">Database Engine</span>
                <span className="font-bold text-slate-900 dark:text-white">PostgreSQL (Prisma ORM)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800">
                <span className="font-semibold text-slate-600 dark:text-slate-400">CBT Proctoring Status</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Active (Full-Screen & Tab Lock)</span>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}

