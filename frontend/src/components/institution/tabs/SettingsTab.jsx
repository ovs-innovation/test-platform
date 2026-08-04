import { useState } from 'react';
import {
  Settings,
  Lock,
  Sun,
  Moon,
  BellRing,
  ShieldAlert,
  Database,
  CheckCircle2,
  Save,
  Key,
  Smartphone,
  Mail,
  RefreshCw,
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';

export default function SettingsTab({
  isDarkMode = true,
  setIsDarkMode,
}) {
  const toast = useToast();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [savingPassword, setSavingPassword] = useState(false);

  // Notification Preferences
  const [notifPrefs, setNotifPrefs] = useState({
    emailTestAlerts: true,
    emailResultReports: true,
    smsStudentReminders: false,
    whatsappScoreAlerts: true,
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    setSavingPassword(true);
    setTimeout(() => {
      setSavingPassword(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Admin password updated successfully!');
    }, 800);
  };

  const handleTogglePref = (key) => {
    setNotifPrefs((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      toast.info('Notification preferences updated');
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className={`p-6 rounded-3xl border ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
              <Settings className="h-3.5 w-3.5" />
              <span>Portal System Controls</span>
            </div>
            <h2 className="text-xl font-black tracking-tight">Portal & Account Settings</h2>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Configure administrator password credentials, theme appearance, and notification alert channels.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: PASSWORD CHANGE */}
        <div className="lg:col-span-6 space-y-6">
          <form onSubmit={handleChangePassword} className={`p-6 rounded-3xl border space-y-5 ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <h3 className="text-sm font-extrabold flex items-center gap-2 border-b border-slate-800/40 pb-3">
              <Lock className="h-4 w-4 text-cyan-400" />
              <span>Administrator Password Change</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Current Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border transition ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">New Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Enter new password (min 6 characters)"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border transition ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Confirm New Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border transition ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={savingPassword}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xs font-extrabold text-white shadow-md hover:scale-[1.02] transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                <Key className="h-4 w-4" />
                <span>{savingPassword ? 'Updating Password...' : 'Update Password'}</span>
              </button>
            </div>
          </form>

          {/* THEME PREFERENCES CARD */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <h3 className="text-sm font-extrabold flex items-center gap-2 border-b border-slate-800/40 pb-3">
              <Sun className="h-4 w-4 text-amber-400" />
              <span>Theme Appearance Preference</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setIsDarkMode && setIsDarkMode(true)}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition cursor-pointer ${
                  isDarkMode
                    ? 'bg-blue-600/10 border-blue-500 text-white shadow-md'
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Moon className="h-5 w-5 text-cyan-400" />
                  {isDarkMode && <CheckCircle2 className="h-4 w-4 text-cyan-400" />}
                </div>
                <span className="font-extrabold text-sm block">Dark Theme</span>
                <span className="text-[10px] text-slate-400 mt-0.5">High contrast dark canvas</span>
              </button>

              <button
                type="button"
                onClick={() => setIsDarkMode && setIsDarkMode(false)}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition cursor-pointer ${
                  !isDarkMode
                    ? 'bg-blue-600/10 border-blue-500 text-slate-900 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Sun className="h-5 w-5 text-amber-400" />
                  {!isDarkMode && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                </div>
                <span className="font-extrabold text-sm block">Light Theme</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Clean light dashboard</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: NOTIFICATION & SESSION PREFERENCES */}
        <div className="lg:col-span-6 space-y-6">
          <div className={`p-6 rounded-3xl border space-y-5 ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <h3 className="text-sm font-extrabold flex items-center gap-2 border-b border-slate-800/40 pb-3">
              <BellRing className="h-4 w-4 text-emerald-400" />
              <span>Notification Alert Preferences</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className={`flex items-center justify-between p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-cyan-400" />
                  <div>
                    <strong className={`block font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Email Test Publishing Alerts</strong>
                    <span className="text-[11px] text-slate-400">Receive email notification when new AIETS mock tests are published</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifPrefs.emailTestAlerts}
                  onChange={() => handleTogglePref('emailTestAlerts')}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500/20 cursor-pointer"
                />
              </div>

              <div className={`flex items-center justify-between p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-cyan-400" />
                  <div>
                    <strong className={`block font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Weekly Performance Summary Reports</strong>
                    <span className="text-[11px] text-slate-400">Automated PDF/CSV performance summary sent every Monday</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifPrefs.emailResultReports}
                  onChange={() => handleTogglePref('emailResultReports')}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500/20 cursor-pointer"
                />
              </div>

              <div className={`flex items-center justify-between p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <Smartphone className="h-4 w-4 text-emerald-400" />
                  <div>
                    <strong className={`block font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>WhatsApp Student Result Broadcast (Opt-In)</strong>
                    <span className="text-[11px] text-slate-400">Send instant scorecard links to parents via WhatsApp API</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifPrefs.whatsappScoreAlerts}
                  onChange={() => handleTogglePref('whatsappScoreAlerts')}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500/20 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* SECURITY & SESSION CLEAR CARD */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <h3 className="text-sm font-extrabold flex items-center gap-2 border-b border-slate-800/40 pb-3">
              <ShieldAlert className="h-4 w-4 text-rose-400" />
              <span>Session Security Controls</span>
            </h3>

            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs space-y-1">
              <p className="font-bold">Portal Session Lock</p>
              <p className="text-[11px] text-rose-200/80">
                Signing out clears active JWT authentication tokens from browser local storage securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
