import { useState } from 'react';
import { studentService } from '../../lib/services.js';
import { PageHeader, Spinner } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';

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
    <div className="space-y-6 pb-12">
      <PageHeader title="Account Settings & Preferences" subtitle="Manage your login security, notification alerts, and active login sessions." />
      
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Account Security & Change Password (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Change Password Form Card */}
          <form onSubmit={submit} className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>🔒</span> Change Password
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Security</span>
            </div>
            
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Current Password</label>
              <input
                type="password"
                className="w-full rounded-xl border border-slate-700/90 bg-[#070c18] px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#2563eb] focus:bg-[#0a1224] focus:outline-none"
                required
                value={form.current_password}
                onChange={(e) => setForm((f) => ({ ...f, current_password: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">New Password</label>
              <input
                type="password"
                className="w-full rounded-xl border border-slate-700/90 bg-[#070c18] px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#2563eb] focus:bg-[#0a1224] focus:outline-none"
                required
                minLength={6}
                value={form.new_password}
                onChange={(e) => setForm((f) => ({ ...f, new_password: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Confirm New Password</label>
              <input
                type="password"
                className="w-full rounded-xl border border-slate-700/90 bg-[#070c18] px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#2563eb] focus:bg-[#0a1224] focus:outline-none"
                required
                value={form.confirm}
                onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
              />
            </div>

            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-7 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-105 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? <Spinner className="h-4 w-4" /> : 'Update Password'}
            </button>
          </form>

          {/* Active Sessions & Device Management Card */}
          <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>💻</span> Active Login Sessions
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">1 Device Connected</span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#070e24] border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 text-cyan-300 text-sm">🖥️</span>
                <div>
                  <p className="text-xs font-bold text-white">Current Web Session (Windows / Chrome)</p>
                  <p className="text-[10.5px] text-slate-400">IP: 103.21.124.x · Active Now</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-300 border border-emerald-500/30">
                This Device
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Notification Preferences (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Notification Preferences Card */}
          <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>🔔</span> Notification Preferences
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Alert System</span>
            </div>

            <div className="space-y-3 pt-1">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#070e24] border border-slate-800 cursor-pointer hover:border-slate-700">
                <div>
                  <p className="text-xs font-bold text-white">Email Score Reports</p>
                  <p className="text-[10.5px] text-slate-400">Receive rank and percentile breakdown after mock tests.</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#2563eb]"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#070e24] border border-slate-800 cursor-pointer hover:border-slate-700">
                <div>
                  <p className="text-xs font-bold text-white">SMS Alerts & Invites</p>
                  <p className="text-[10.5px] text-slate-400">Get instant SMS when invited to new diagnostic tests.</p>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#2563eb]"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#070e24] border border-slate-800 cursor-pointer hover:border-slate-700">
                <div>
                  <p className="text-xs font-bold text-white">CBT Test Schedule Reminders</p>
                  <p className="text-[10.5px] text-slate-400">Get alerts 1 hour before scheduled NTA mock tests start.</p>
                </div>
                <input
                  type="checkbox"
                  checked={cbtReminders}
                  onChange={(e) => setCbtReminders(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#2563eb]"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#070e24] border border-slate-800 cursor-pointer hover:border-slate-700">
                <div>
                  <p className="text-xs font-bold text-white">Result & Rank Announcements</p>
                  <p className="text-[10.5px] text-slate-400">Notifications when All India Leaderboard is published.</p>
                </div>
                <input
                  type="checkbox"
                  checked={resultAlerts}
                  onChange={(e) => setResultAlerts(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#2563eb]"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
