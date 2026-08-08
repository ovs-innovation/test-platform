import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Send,
  Sparkles,
  Building2,
  Users,
  User,
  X,
  FileText,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
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

  useEffect(() => {
    if (selectedTest) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedTest]);

  const defaultTests = [
    { id: 81, test_name: 'AIETS 01 - Physics: Kinematics & Laws of Motion', test_type: 'Full Mock', max_marks: 720, duration_minutes: 180, test_date: '2026-08-15' },
    { id: 84, test_name: 'JEE Main Physics Mechanics Speed Test #02', test_type: 'Topic Test', max_marks: 300, duration_minutes: 180, test_date: '2026-08-20' },
    { id: 85, test_name: 'NEET Organic Chemistry Grand Test #03', test_type: 'Subject Test', max_marks: 720, duration_minutes: 180, test_date: '2026-08-28' },
  ];

  const testsList = availableTests && availableTests.length > 0 ? availableTests : defaultTests;

  const handleTargetTypeChange = (newType) => {
    setTargetType(newType);
    if (newType === 'batch' && batches.length > 0) {
      setTargetId(String(batches[0].id));
    } else if (newType === 'student' && students.length > 0) {
      setTargetId(String(students[0].id));
    } else {
      setTargetId('');
    }
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTest) return;

    if (targetType === 'batch') {
      if (batches.length === 0) {
        toast.error('No batches found. Please create an academic batch in the Batches tab first.');
        return;
      }
      if (!targetId) {
        toast.error('Please select a target batch.');
        return;
      }
    }

    if (targetType === 'student') {
      if (students.length === 0) {
        toast.error('No students enrolled yet. Please add students first.');
        return;
      }
      if (!targetId) {
        toast.error('Please select a student.');
        return;
      }
    }

    setAssigning(true);
    try {
      if (onAssignTest) {
        await onAssignTest(selectedTest.id, {
          assign_to: targetType,
          target_id: targetType === 'institution' ? null : Number(targetId),
        });
      }
      toast.success(`Test "${selectedTest.test_name}" assigned successfully.`);
      setSelectedTest(null);
    } catch (err) {
      toast.error(err.message || 'Test assignment completed.');
      setSelectedTest(null);
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* TAB HEADER */}
      <div className={`rounded-3xl border p-6 backdrop-blur-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Test Scheduling & Evaluation</span>
          </div>
          <h2 className={`text-lg sm:text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            AIETS Test Series & Active Assignments
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Schedule examinations, assign test dates to student batches, and trigger instant test reminders.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1 text-xs font-extrabold text-cyan-400 shrink-0">
          <Sparkles className="h-3.5 w-3.5" />
          NEET & JEE Schedules Active
        </span>
      </div>

      {/* TESTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testsList.map((test) => (
          <div
            key={test.id}
            className={`rounded-3xl border p-6 space-y-4 shadow-sm flex flex-col justify-between transition hover:border-cyan-500/30 ${
              isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold text-blue-400 uppercase">
                  {test.test_type || 'AIETS Mock'}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-400">
                  {test.max_marks || 720} Marks
                </span>
              </div>

              <div>
                <h3 className={`text-base font-extrabold leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {test.test_name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{test.test_date ? new Date(test.test_date).toLocaleDateString() : 'Scheduled'}</span>
                  <span>•</span>
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  <span>{test.duration_minutes || 180} mins</span>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/40 flex items-center justify-between gap-2 text-xs">
              <button
                onClick={() => onSendReminder && onSendReminder(test.id)}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition cursor-pointer text-[11px]"
              >
                <Send className="h-3.5 w-3.5 text-cyan-400" />
                <span>Send Reminder</span>
              </button>

              <button
                onClick={() => {
                  setSelectedTest(test);
                  handleTargetTypeChange('institution');
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-4 py-2 text-xs font-bold text-white hover:brightness-110 transition cursor-pointer shadow-md shadow-blue-500/20"
              >
                <span>Assign Test</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PORTAL-RENDERED ASSIGN TEST MODAL */}
      {selectedTest &&
        createPortal(
          <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-opacity animate-in fade-in duration-200">
            <div
              className={`w-full max-w-[640px] max-h-[calc(100dvh-32px)] sm:max-h-[calc(100dvh-48px)] flex flex-col rounded-3xl border shadow-2xl overflow-hidden m-0 transition-all ${
                isDarkMode ? 'bg-[#0A1628] border-slate-800 text-white shadow-blue-900/10' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* 1. FIXED MODAL HEADER */}
              <div
                className={`p-5 sm:p-6 border-b shrink-0 flex items-start justify-between gap-4 ${
                  isDarkMode ? 'border-slate-800/80 bg-[#060D1A]/50' : 'border-slate-100 bg-slate-50/50'
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-1">
                      <Sparkles className="h-3 w-3" />
                      <span>Test Assignment Dispatch</span>
                    </div>
                    <h3 className={`text-base sm:text-lg font-black leading-snug truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      Assign Test
                    </h3>
                    <p className="text-xs font-semibold text-cyan-400 truncate mt-0.5">
                      {selectedTest.test_name}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTest(null)}
                  className={`p-2 rounded-xl border shrink-0 transition cursor-pointer ${
                    isDarkMode ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800' : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-label="Close modal"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* MODAL FORM WITH SCROLLABLE CONTENT & FIXED ACTION FOOTER */}
              <form onSubmit={handleAssignSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
                
                {/* 2. SCROLLABLE MODAL CONTENT */}
                <div className="flex-1 overflow-y-auto min-h-0 p-5 sm:p-6 space-y-5 text-xs custom-scrollbar">
                  
                  {/* TARGET TYPE SELECTION TILES */}
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-400 mb-2">
                      Select Target Audience
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleTargetTypeChange('institution')}
                        className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                          targetType === 'institution'
                            ? 'border-blue-500 bg-blue-600/15 ring-2 ring-blue-500/30'
                            : isDarkMode
                              ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/60'
                              : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Building2 className={`h-4.5 w-4.5 ${targetType === 'institution' ? 'text-cyan-400' : 'text-slate-400'}`} />
                          {targetType === 'institution' && <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />}
                        </div>
                        <div>
                          <p className={`font-extrabold text-xs ${targetType === 'institution' ? 'text-white' : 'text-slate-300'}`}>
                            Entire School
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">All enrolled batches</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTargetTypeChange('batch')}
                        className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                          targetType === 'batch'
                            ? 'border-blue-500 bg-blue-600/15 ring-2 ring-blue-500/30'
                            : isDarkMode
                              ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/60'
                              : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Users className={`h-4.5 w-4.5 ${targetType === 'batch' ? 'text-cyan-400' : 'text-slate-400'}`} />
                          {targetType === 'batch' && <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />}
                        </div>
                        <div>
                          <p className={`font-extrabold text-xs ${targetType === 'batch' ? 'text-white' : 'text-slate-300'}`}>
                            Specific Batch
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Single class cohort</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTargetTypeChange('student')}
                        className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                          targetType === 'student'
                            ? 'border-blue-500 bg-blue-600/15 ring-2 ring-blue-500/30'
                            : isDarkMode
                              ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/60'
                              : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <User className={`h-4.5 w-4.5 ${targetType === 'student' ? 'text-cyan-400' : 'text-slate-400'}`} />
                          {targetType === 'student' && <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />}
                        </div>
                        <div>
                          <p className={`font-extrabold text-xs ${targetType === 'student' ? 'text-white' : 'text-slate-300'}`}>
                            One Student
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Individual learner</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* DYNAMIC TARGET SELECTOR */}
                  {targetType === 'batch' && (
                    <div className="space-y-1.5 animate-in fade-in duration-200">
                      <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-400">
                        Select Target Batch Roster
                      </label>
                      {batches.length === 0 ? (
                        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold space-y-1">
                          <p className="font-bold flex items-center gap-1.5">
                            <span>⚠️ No Active Batches Found</span>
                          </p>
                          <p className="text-[11px] text-amber-300/90">
                            Please create a batch in the <strong>Batches</strong> tab first, or select <strong>Entire School</strong>.
                          </p>
                        </div>
                      ) : (
                        <select
                          value={targetId}
                          onChange={(e) => setTargetId(e.target.value)}
                          required
                          className={`w-full py-3 px-3.5 rounded-2xl border font-bold text-xs transition cursor-pointer ${
                            isDarkMode
                              ? 'border-slate-800 bg-slate-900/90 text-slate-100 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
                              : 'border-slate-200 bg-slate-50 text-slate-900'
                          }`}
                        >
                          {batches.map((b) => (
                            <option key={b.id} value={b.id} className="bg-slate-900 text-white py-1">
                              {b.batch_name || b.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  )}

                  {targetType === 'student' && (
                    <div className="space-y-1.5 animate-in fade-in duration-200">
                      <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-400">
                        Select Individual Student
                      </label>
                      {students.length === 0 ? (
                        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                          ⚠️ No students enrolled yet. Please add students first.
                        </div>
                      ) : (
                        <select
                          value={targetId}
                          onChange={(e) => setTargetId(e.target.value)}
                          required
                          className={`w-full py-3 px-3.5 rounded-2xl border font-bold text-xs transition cursor-pointer ${
                            isDarkMode
                              ? 'border-slate-800 bg-slate-900/90 text-slate-100 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
                              : 'border-slate-200 bg-slate-50 text-slate-900'
                          }`}
                        >
                          {students.map((s) => (
                            <option key={s.id} value={s.id} className="bg-slate-900 text-white py-1">
                              {s.name} ({s.roll_number || s.email})
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  )}

                  {/* SPECIFICATION CARD DETAILS */}
                  <div
                    className={`p-4 rounded-2xl border flex items-center justify-between text-xs ${
                      isDarkMode ? 'bg-slate-900/40 border-slate-800/80 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className="font-extrabold text-white flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-emerald-400" />
                        <span>Instant Portal Activation</span>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Students will see this assessment in their portal dashboard immediately.
                      </p>
                    </div>
                    <div className="text-right font-mono font-bold text-cyan-400 text-xs shrink-0 pl-2">
                      {selectedTest.duration_minutes || 180} mins
                    </div>
                  </div>

                </div>

                {/* 3. FIXED MODAL ACTION FOOTER */}
                <div
                  className={`p-4 sm:p-6 border-t shrink-0 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 ${
                    isDarkMode ? 'border-slate-800/80 bg-[#060D1A]/50' : 'border-slate-100 bg-slate-50/50'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedTest(null)}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-2xl border font-extrabold text-xs transition cursor-pointer text-center ${
                      isDarkMode
                        ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      assigning ||
                      (targetType === 'batch' && batches.length === 0) ||
                      (targetType === 'student' && students.length === 0)
                    }
                    className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 font-extrabold text-xs text-white hover:brightness-110 shadow-lg shadow-blue-500/25 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2"
                  >
                    {assigning ? (
                      <>
                        <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Assigning...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Test Assignment</span>
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
