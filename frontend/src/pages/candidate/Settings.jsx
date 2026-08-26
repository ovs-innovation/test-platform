import { useState } from 'react';
import { studentService } from '../../lib/services.js';
import { PageHeader, Spinner, PasswordInput } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { Lock, Laptop, Bell } from 'lucide-react';

export default function Settings() {
  const toast = useToast();
  const [form, setForm] = useState({ current_password: '', new_password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [cbtReminders, setCbtReminders] = useState(true);
  const [resultAlerts, setResultAlerts] = useState(true);

  const submit = async (e) => {
    e.preventDefault();
    if (form.new_password !== form.confirm) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      await studentService.changePassword({ current_password: form.current_password, new_password: form.new_password });
      toast.success('Password updated successfully');
      setForm({ current_password: '', new_password: '', confirm: '' });
    } catch (err) {
      toast.error(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Account Settings & Preferences</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage your login security, notification alerts, and active login sessions.
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Account Security & Change Password (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Change Password Form Card */}
          <form onSubmit={submit} className="p-5 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl space-y-3.5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h2 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Change Password</span>
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Security</span>
            </div>
            
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Current Password</label>
              <PasswordInput
                className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                required
                autoComplete="current-password"
                value={form.current_password}
                onChange={(e) => setForm((f) => ({ ...f, current_password: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">New Password</label>
              <PasswordInput
                className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                required
                minLength={6}
                autoComplete="new-password"
                value={form.new_password}
                onChange={(e) => setForm((f) => ({ ...f, new_password: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Confirm New Password</label>
              <PasswordInput
                className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                required
                autoComplete="new-password"
                value={form.confirm}
                onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-black text-white shadow-2xs hover:bg-blue-500 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? <Spinner className="h-4 w-4" /> : 'Update Password'}
            </button>
          </form>

          {/* Active Sessions Card */}
          <div className="saas-card p-4 sm:p-5 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2">
              <h2 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Laptop className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Active Login Sessions</span>
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">1 Active</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <Laptop className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Current Web Session (Windows / Chrome)</p>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400">IP: 103.21.124.x · Active Now</p>
                </div>
              </div>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                This Device
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Notification Preferences (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="saas-card p-4 sm:p-5 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2">
              <h2 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Bell className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>Notification Preferences</span>
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Alert System</span>
            </div>

            <div className="space-y-2 pt-1">
              <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Email Score Reports</p>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400">Receive rank and percentile breakdown after mock tests.</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="h-4 w-4 rounded accent-blue-600"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">SMS Alerts & Invites</p>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400">Get instant SMS when invited to new diagnostic tests.</p>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="h-4 w-4 rounded accent-blue-600"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">CBT Test Schedule Reminders</p>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400">Get alerts 1 hour before scheduled NEET / JEE mock tests start.</p>
                </div>
                <input
                  type="checkbox"
                  checked={cbtReminders}
                  onChange={(e) => setCbtReminders(e.target.checked)}
                  className="h-4 w-4 rounded accent-blue-600"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Result & Rank Announcements</p>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400">Notifications when All India Leaderboard is published.</p>
                </div>
                <input
                  type="checkbox"
                  checked={resultAlerts}
                  onChange={(e) => setResultAlerts(e.target.checked)}
                  className="h-4 w-4 rounded accent-blue-600"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
