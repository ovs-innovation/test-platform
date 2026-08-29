import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiTestService } from '../../lib/services.js';
import { Sparkles, Clock, Play, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';

export default function ScheduledTestsWidget({ studentId, onRefreshTrigger }) {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startingId, setStartingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const loadTests = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const list = await aiTestService.getScheduledTests(studentId);
      setTests(list || []);
    } catch (err) {
      console.warn('Failed to load scheduled tests:', err);
      setTests([]);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    loadTests();
  }, [loadTests, onRefreshTrigger]);

  const handleStartTest = async (testId) => {
    setStartingId(testId);
    setErrorMsg(null);
    try {
      const res = await aiTestService.startTest(testId);
      if (res.test && res.questions) {
        sessionStorage.setItem(`ai_test_session_${testId}`, JSON.stringify(res));
        navigate(`/exam/ai-${testId}`);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Unable to start test.';
      setErrorMsg(msg);
    } finally {
      setStartingId(null);
    }
  };

  const formatCountdown = (unlocksInMs) => {
    if (!unlocksInMs || unlocksInMs <= 0) return 'Unlocked';
    const totalMins = Math.floor(unlocksInMs / (1000 * 60));
    const hours = Math.floor(totalMins / 60);
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;
    const remMins = totalMins % 60;

    if (days > 0) return `Unlocks in ${days}d ${remHours}h`;
    if (hours > 0) return `Unlocks in ${hours}h ${remMins}m`;
    return `Unlocks in ${remMins}m`;
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 w-40 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
          <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
        </div>
        <div className="h-20 w-full bg-slate-100 dark:bg-slate-900/60 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!tests || tests.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Scheduled Improvement Tests</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Personalized spaced-repetition revision tests</p>
            </div>
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">0 Active</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Scheduled AI Improvement Tests</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Targeted spaced-repetition tests for weak areas</p>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Tests Cards List */}
      <div className="space-y-3">
        {tests.map((t) => {
          const isScheduled = t.status === 'scheduled';
          const isAvailable = t.status === 'available';
          const isCompleted = t.status === 'completed';
          const isExpired = t.status === 'expired';

          return (
            <div
              key={t.id}
              className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700 transition space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {(t.test_name || '').replace(/AI Booster/gi, 'AI Improvement Test')}
                    </span>

                    {/* Status Pills */}
                    {isScheduled && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800/60">
                        <Clock className="h-3 w-3" />
                        {formatCountdown(t.unlocksInMs)}
                      </span>
                    )}

                    {isAvailable && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800/60">
                        <Sparkles className="h-3 w-3" />
                        Unlocked & Ready
                      </span>
                    )}

                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800/60">
                        <CheckCircle2 className="h-3 w-3" />
                        Completed ({t.score != null ? `${t.score}/${t.max_marks}` : 'Submitted'})
                      </span>
                    )}

                    {isExpired && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 text-xs font-medium">
                        Expired
                      </span>
                    )}
                  </div>

                  {/* Weak topics tags */}
                  {t.topics && t.topics.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Targeted:</span>
                      {t.topics.map((top, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300"
                        >
                          {top.topic || top.name} {top.accuracyAtGeneration != null ? `(${Math.round(top.accuracyAtGeneration)}%)` : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Action */}
                <div className="shrink-0 flex items-center gap-2">
                  {isAvailable && (
                    <button
                      type="button"
                      disabled={startingId === t.id}
                      onClick={() => handleStartTest(t.id)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition"
                    >
                      {startingId === t.id ? (
                        <span>Loading...</span>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>Start Test</span>
                        </>
                      )}
                    </button>
                  )}

                  {isScheduled && (
                    <button
                      type="button"
                      disabled
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-semibold text-xs cursor-not-allowed flex items-center gap-1"
                    >
                      <Clock className="h-3.5 w-3.5" />
                      <span>Revising</span>
                    </button>
                  )}

                  {isCompleted && t.attempt_id && (
                    <button
                      type="button"
                      onClick={() => navigate(`/results/${t.attempt_id}`)}
                      className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 font-bold text-xs flex items-center gap-1 transition"
                    >
                      <span>View Results</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
