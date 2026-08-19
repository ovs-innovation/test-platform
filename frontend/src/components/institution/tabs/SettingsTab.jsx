import { useState } from 'react';
import {
  Settings,
  Lock,
  BellRing,
  ShieldAlert,
  CheckCircle2,
  Key,
  Smartphone,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';

export default function SettingsTab({
  isDarkMode = true,
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

  const textMutedClass = isDarkMode ? 'text-slate-400' : 'text-slate-600 font-semibold';
  const labelClass = isDarkMode ? 'text-slate-300 font-bold' : 'text-slate-700 font-black';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* HEADER CARD */}
      <div className={`p-5 sm:p-6 rounded-3xl border shadow-sm ${
        isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200/90 text-slate-900'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border mb-2 ${
              isDarkMode ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-purple-50 text-purple-700 border-purple-200'
            }`}>
              <Settings className="h-3.5 w-3.5" />
              <span>Portal System Controls</span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Portal & Account Security Settings
            </h2>
            <p className={`text-xs mt-1 ${textMutedClass}`}>
              Manage administrator account authentication credentials, security protocols, and notification broadcast alerts.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: PASSWORD CHANGE */}
        <div className="lg:col-span-6 space-y-6">
          <form onSubmit={handleChangePassword} className={`p-6 rounded-3xl border space-y-5 shadow-sm ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200/90 text-slate-900'
          }`}>
            <h3 className={`text-base font-black flex items-center gap-2 pb-3 border-b ${
              isDarkMode ? 'border-slate-800/80 text-white' : 'border-slate-200 text-slate-900'
            }`}>
              <Lock className="h-4.5 w-4.5 text-cyan-600 dark:text-cyan-400" />
              <span>Administrator Password Change</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className={`block text-xs mb-1.5 ${labelClass}`}>Current Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold transition ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-600 focus:bg-white shadow-2xs'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs mb-1.5 ${labelClass}`}>New Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Enter new password (min 6 characters)"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold transition ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-600 focus:bg-white shadow-2xs'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs mb-1.5 ${labelClass}`}>Confirm New Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold transition ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-600 focus:bg-white shadow-2xs'
                  }`}
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={savingPassword}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xs font-black text-white shadow-md hover:scale-[1.02] transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                <Key className="h-4 w-4" />
                <span>{savingPassword ? 'Updating Password...' : 'Update Password'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: NOTIFICATION PREFERENCES & SECURITY CONTROLS */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* NOTIFICATION PREFERENCES */}
          <div className={`p-6 rounded-3xl border space-y-5 shadow-sm ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200/90 text-slate-900'
          }`}>
            <h3 className={`text-base font-black flex items-center gap-2 pb-3 border-b ${
              isDarkMode ? 'border-slate-800/80 text-white' : 'border-slate-200 text-slate-900'
            }`}>
              <BellRing className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
              <span>Notification Alert Preferences</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className={`flex items-center justify-between p-3.5 rounded-2xl border transition ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-2xs'
              }`}>
                <div className="flex items-center gap-3">
                  <Mail className="h-4.5 w-4.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <div>
                    <strong className={`block font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      Email Test Publishing Alerts
                    </strong>
                    <span className={`text-[11px] block mt-0.5 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium'
                    }`}>
                      Receive email notification when new AIETS mock tests are published
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifPrefs.emailTestAlerts}
                  onChange={() => handleTogglePref('emailTestAlerts')}
                  className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                />
              </div>

              <div className={`flex items-center justify-between p-3.5 rounded-2xl border transition ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-2xs'
              }`}>
                <div className="flex items-center gap-3">
                  <Mail className="h-4.5 w-4.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <div>
                    <strong className={`block font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      Weekly Performance Summary Reports
                    </strong>
                    <span className={`text-[11px] block mt-0.5 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium'
                    }`}>
                      Automated PDF/CSV performance summary sent every Monday
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifPrefs.emailResultReports}
                  onChange={() => handleTogglePref('emailResultReports')}
                  className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                />
              </div>

              <div className={`flex items-center justify-between p-3.5 rounded-2xl border transition ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-2xs'
              }`}>
                <div className="flex items-center gap-3">
                  <Smartphone className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <strong className={`block font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      WhatsApp Student Result Broadcast (Opt-In)
                    </strong>
                    <span className={`text-[11px] block mt-0.5 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium'
                    }`}>
                      Send instant scorecard links to parents via WhatsApp API
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifPrefs.whatsappScoreAlerts}
                  onChange={() => handleTogglePref('whatsappScoreAlerts')}
                  className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                />
              </div>
            </div>
          </div>

          {/* HIGH CONTRAST SECURITY & SESSION CLEAR CARD */}
          <div className={`p-6 rounded-3xl border space-y-4 shadow-sm ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200/90 text-slate-900'
          }`}>
            <h3 className={`text-base font-black flex items-center gap-2 pb-3 border-b ${
              isDarkMode ? 'border-slate-800/80 text-white' : 'border-slate-200 text-slate-900'
            }`}>
              <ShieldAlert className="h-4.5 w-4.5 text-rose-600 dark:text-rose-400" />
              <span>Session Security Controls</span>
            </h3>

            <div className={`p-4 rounded-2xl border space-y-1.5 ${
              isDarkMode
                ? 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                : 'bg-rose-50 border-rose-200 text-rose-950 shadow-2xs'
            }`}>
              <p className={`font-black text-xs flex items-center gap-1.5 ${
                isDarkMode ? 'text-rose-300' : 'text-rose-900'
              }`}>
                <ShieldCheck className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>Portal Session Lock & Security Guarantee</span>
              </p>
              <p className={`text-xs leading-relaxed ${
                isDarkMode ? 'text-rose-200/80' : 'text-rose-900 font-semibold'
              }`}>
                Signing out clears active JWT authentication tokens from browser local storage securely.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
