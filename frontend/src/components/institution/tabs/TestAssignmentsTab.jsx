import { useState } from 'react';
import { FileText, CheckCircle2, Calendar, Clock, Send, Users, Layers, Award, Sparkles, Filter } from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';

export default function TestAssignmentsTab({
  availableTests = [],
  batches = [],
  students = [],
  onAssignTest,
  onSendReminder,
  isDarkMode = true,
}) {
  const toast = useToast();
  const [selectedTest, setSelectedTest] = useState(null);
  const [targetType, setTargetType] = useState('institution');
  const [targetId, setTargetId] = useState('');
  const [assigning, setAssigning] = useState(false);

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTest) return;

    setAssigning(true);
    try {
      await onAssignTest(selectedTest.id, {
        assign_to: targetType,
        target_id: targetType === 'institution' ? null : targetId,
      });
      setSelectedTest(null);
    } catch (err) {
      toast.error(err.message || 'Failed to assign test series.');
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* TAB HEADER */}
      <div className={`rounded-3xl border p-6 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-[#071126] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div>
          <h2 className={`text-lg sm:text-xl font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <CheckCircle2 className="h-5 w-5 text-cyan-400" />
            <span>AIETS Test Series & Assignments</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            View 39-test and 60-test AIETS schedules included in your purchased package. Assign tests to batches or individual students.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1 text-xs font-extrabold text-cyan-400 shrink-0">
          <Sparkles className="h-3.5 w-3.5" />
          NEET-UG 2027 Package Active
        </span>
      </div>

      {/* TESTS GRID */}
      {availableTests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableTests.map((test) => (
            <div
              key={test.id}
              className={`rounded-3xl border p-6 space-y-4 backdrop-blur-xl shadow-lg relative overflow-hidden transition hover:-translate-y-1 ${
                isDarkMode ? 'bg-[#071126] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold text-blue-400 uppercase">
                  {test.test_type || 'AIETS Diagnostic'}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-400">
                  {test.max_marks || 720} Marks
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-white leading-snug">{test.test_name}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Date: {test.test_date ? new Date(test.test_date).toLocaleDateString() : 'Scheduled'}</span>
                  <span>•</span>
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  <span>{test.duration_minutes || 180} mins</span>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => onSendReminder(test.id)}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition cursor-pointer text-[11px]"
                >
                  <Send className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Send Reminder</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedTest(test);
                    setTargetType('institution');
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-500 transition cursor-pointer"
                >
                  <span>Assign Test</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`rounded-3xl border p-12 text-center space-y-3 ${
          isDarkMode ? 'bg-[#071126] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
        }`}>
          <FileText className="h-10 w-10 text-cyan-400 mx-auto" />
          <h3 className="text-lg font-extrabold text-white">All Package Tests Available</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">Tests will automatically unlock according to your institution package calendar schedule.</p>
        </div>
      )}

      {/* ASSIGN TEST MODAL */}
      {selectedTest && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 space-y-5 ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className="text-lg font-extrabold text-white">Assign "{selectedTest.test_name}"</h3>

            <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-slate-300 mb-1">Assign Target Level</label>
                <select
                  value={targetType}
                  onChange={(e) => setTargetType(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-200 cursor-pointer"
                >
                  <option value="institution">Entire Institution (All Students)</option>
                  <option value="batch">Specific Batch</option>
                  <option value="student">Individual Student</option>
                </select>
              </div>

              {targetType === 'batch' && (
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">Select Batch</label>
                  <select
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    required
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-200 cursor-pointer"
                  >
                    <option value="">Select a batch...</option>
                    {batches.map((b) => (
                      <option key={b.id} value={b.id}>{b.batch_name || b.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {targetType === 'student' && (
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">Select Student</label>
                  <select
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    required
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-200 cursor-pointer"
                  >
                    <option value="">Select a student...</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} ({s.roll_number || s.email})</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTest(null)}
                  className="px-4 py-2 rounded-xl border border-slate-700 font-bold text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={assigning}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 font-bold text-white hover:bg-blue-500"
                >
                  {assigning ? 'Assigning...' : 'Confirm Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
