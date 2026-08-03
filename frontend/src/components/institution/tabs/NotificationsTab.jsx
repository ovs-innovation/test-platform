import { useState } from 'react';
import { Bell, Send, CheckCircle2, ShieldCheck, AlertCircle, Layers, Users } from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';

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
      <div className={`rounded-3xl border p-6 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-[#071126] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div>
          <h2 className={`text-lg sm:text-xl font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <Bell className="h-5 w-5 text-cyan-400" />
            <span>Notification Center & Student Reminders</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Send upcoming AIETS examination reminders to batches or individual students and review platform notifications.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: SEND REMINDER FORM (~40%) */}
        <div className={`lg:col-span-5 rounded-3xl border p-6 space-y-4 backdrop-blur-xl shadow-xl ${
          isDarkMode ? 'bg-[#071126] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <h3 className="text-base font-extrabold flex items-center gap-2">
            <Send className="h-4 w-4 text-cyan-400" />
            <span>Dispatch Test Reminder</span>
          </h3>

          <form onSubmit={handleSendReminder} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">Target Recipient Group</label>
              <select
                value={targetType}
                onChange={(e) => setTargetType(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-200 cursor-pointer"
              >
                <option value="all">All Enrolled Students</option>
                <option value="batch">Specific Batch</option>
                <option value="student">Individual Student</option>
              </select>
            </div>

            {targetType === 'batch' && (
              <div>
                <label className="block font-semibold uppercase text-slate-300 mb-1">Select Target Batch</label>
                <select
                  value={targetId}
                  onChange={(e) => setTargetId(e.target.value)}
                  required
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-200 cursor-pointer"
                >
                  <option value="">Select batch...</option>
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>{b.batch_name || b.name}</option>
                  ))}
                </select>
              </div>
            )}

            {targetType === 'student' && (
              <div>
                <label className="block font-semibold uppercase text-slate-300 mb-1">Select Target Student</label>
                <select
                  value={targetId}
                  onChange={(e) => setTargetId(e.target.value)}
                  required
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-200 cursor-pointer"
                >
                  <option value="">Select student...</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} ({s.roll_number || s.email})</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">Custom Reminder Message (Optional)</label>
              <textarea
                rows="3"
                placeholder="Reminder: AIETS NTA Mock Test #05 is live this Sunday at 10:00 AM."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-white shadow-md hover:scale-[1.02] transition cursor-pointer"
            >
              {sending ? 'Dispatching Reminder...' : 'Dispatch Reminder Notification →'}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: NOTIFICATION LOGS (~60%) */}
        <div className={`lg:col-span-7 rounded-3xl border p-6 space-y-4 backdrop-blur-xl shadow-xl ${
          isDarkMode ? 'bg-[#071126] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
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
                      ? 'bg-blue-500/10 border-blue-500/30 text-white'
                      : isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-cyan-400 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {n.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-8">No notifications received.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
