import { useState } from 'react';
import { Bell, Send, CheckCircle2, ShieldCheck, AlertCircle, Layers, Users } from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';
import { CustomSelectDropdown } from '../../ui.jsx';

export default function NotificationsTab({
  notifications = [],
  batches = [],
  students = [],
  onSendReminder,
  onMarkRead,
  isDarkMode = true,
}) {
  const toast = useToast();
  const [targetType, setTargetType] = useState('all');
  const [targetId, setTargetId] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSendReminder = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await onSendReminder({
        target_type: targetType,
        target_id: targetType === 'all' ? null : targetId,
        custom_message: message,
      });
      toast.success('Test reminder notification dispatched successfully.');
      setMessage('');
    } catch (err) {
      toast.error(err.message || 'Failed to dispatch reminder.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* HEADER */}
      <div className={`rounded-3xl border p-6 backdrop-blur-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
            <Bell className="h-3.5 w-3.5" />
            <span>Communication & Broadcast Center</span>
          </div>
          <h2 className={`text-lg sm:text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Notification Center & Student Reminders
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Send upcoming AIETS examination reminders to batches or individual students and review platform notifications.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: SEND REMINDER FORM (~40%) */}
        <div className={`lg:col-span-5 rounded-3xl border p-6 space-y-4 shadow-sm ${
          isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <h3 className="text-base font-extrabold flex items-center gap-2">
            <Send className="h-4 w-4 text-cyan-400" />
            <span>Dispatch Test Reminder</span>
          </h3>

          <form onSubmit={handleSendReminder} className="space-y-4 text-xs">
            <div>
              <label className={`block font-extrabold uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Target Recipient Group
              </label>
              <CustomSelectDropdown
                value={targetType}
                onChange={(val) => setTargetType(val)}
                options={[
                  { value: 'all', label: 'All Enrolled Students' },
                  { value: 'batch', label: 'Specific Batch' },
                  { value: 'student', label: 'Individual Student' },
                ]}
                isDarkMode={isDarkMode}
                className="w-full"
              />
            </div>

            {targetType === 'batch' && (
              <div>
                <label className={`block font-extrabold uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Select Target Batch
                </label>
                <CustomSelectDropdown
                  value={targetId}
                  onChange={(val) => setTargetId(val)}
                  options={[
                    { value: '', label: 'Select batch...' },
                    ...batches.map((b) => ({ value: b.id, label: b.batch_name || b.name })),
                  ]}
                  isDarkMode={isDarkMode}
                  placeholder="Select batch..."
                  className="w-full"
                />
              </div>
            )}

            {targetType === 'student' && (
              <div>
                <label className={`block font-extrabold uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Select Target Student
                </label>
                <CustomSelectDropdown
                  value={targetId}
                  onChange={(val) => setTargetId(val)}
                  options={[
                    { value: '', label: 'Select student...' },
                    ...students.map((s) => ({ value: s.id, label: `${s.name} (${s.roll_number || s.email})` })),
                  ]}
                  isDarkMode={isDarkMode}
                  placeholder="Select student..."
                  className="w-full"
                />
              </div>
            )}

            <div>
              <label className={`block font-extrabold uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Custom Reminder Message (Optional)
              </label>
              <textarea
                rows="3"
                placeholder="Reminder: AIETS NTA Mock Test #05 is live this Sunday at 10:00 AM."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`w-full py-2.5 px-3 rounded-xl border font-medium transition focus:outline-none ${
                  isDarkMode
                    ? 'border-slate-800 bg-slate-900 text-white placeholder-slate-500 focus:border-cyan-500'
                    : 'border-slate-200 bg-slate-100 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-extrabold text-white shadow-md hover:scale-[1.02] transition cursor-pointer"
            >
              {sending ? 'Dispatching Reminder...' : 'Dispatch Reminder Notification →'}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: NOTIFICATION LOGS (~60%) */}
        <div className={`lg:col-span-7 rounded-3xl border p-6 space-y-4 shadow-sm ${
          isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <h3 className="text-base font-extrabold flex items-center gap-2">
            <Bell className="h-4 w-4 text-purple-400" />
            <span>Recent Notifications ({notifications.length})</span>
          </h3>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 rounded-2xl border transition space-y-1 ${
                    !n.is_read
                      ? (isDarkMode ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-cyan-50 border-cyan-200')
                      : (isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200')
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-cyan-400">{n.title || 'Platform Notice'}</span>
                    <span className="text-[10px] text-slate-400">{n.created_at || 'Just now'}</span>
                  </div>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{n.message}</p>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <Bell className="h-8 w-8 text-slate-400 mx-auto" />
                <p className="text-xs font-semibold">No notifications received.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
