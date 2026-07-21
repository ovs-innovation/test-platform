import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader, DataTable, Badge } from '../../components/ui.jsx';
import { SubjectBar } from '../../components/design.jsx';
import { formatDateTime } from '../../lib/format.js';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');

  const load = async () => {
    setState('loading');
    try {
      setData(await studentService.analytics());
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => { load(); }, []);

  const { summary, attempts, trend, subject_breakdown, chapter_breakdown } = data || {};

  // Additional performance stats calculations
  const avgAccuracy = useMemo(() => {
    if (!attempts || attempts.length === 0) return 0;
    let totalCorrect = 0;
    let totalWrong = 0;
    for (const a of attempts) {
      totalCorrect += Number(a.correct_count) || 0;
      totalWrong += Number(a.wrong_count) || 0;
    }
    const attempted = totalCorrect + totalWrong;
    return attempted > 0 ? Math.round((totalCorrect / attempted) * 100) : 0;
  }, [attempts]);

  const avgSpeed = useMemo(() => {
    if (!attempts || attempts.length === 0) return '—';
    let totalSecs = 0;
    let totalQ = 0;
    for (const a of attempts) {
      totalSecs += Number(a.duration_seconds) || 0;
      totalQ += Number(a.total_questions) || 0;
    }
    if (totalQ === 0) return '—';
    const secPerQ = Math.round(totalSecs / totalQ);
    return `${secPerQ}s / q`;
  }, [attempts]);

  const subjects = useMemo(() => {
    const list = subject_breakdown || [];
    return {
      weak: [...list].filter(s => s.accuracy < 60).sort((a, b) => a.accuracy - b.accuracy).slice(0, 5),
      strong: [...list].filter(s => s.accuracy >= 60).sort((a, b) => b.accuracy - a.accuracy).slice(0, 5),
    };
  }, [subject_breakdown]);

  const chapters = useMemo(() => {
    const list = chapter_breakdown || [];
    return {
      weak: [...list].filter(c => c.accuracy < 60).sort((a, b) => a.accuracy - b.accuracy).slice(0, 5),
      strong: [...list].filter(c => c.accuracy >= 60).sort((a, b) => b.accuracy - a.accuracy).slice(0, 5),
    };
  }, [chapter_breakdown]);

  const scoreImprovementSummary = useMemo(() => {
    if (!trend || trend.length < 2) return 'Complete more tests to visualize your score trend!';
    const latest = trend[trend.length - 1].percentage;
    const first = trend[0].percentage;
    const diff = latest - first;
    if (diff > 0) {
      return `🎉 Great progress! Your score has improved by ${diff}% since your first test.`;
    } else if (diff < 0) {
      return `📉 Focus warning: Your average score dropped by ${Math.abs(diff)}% recently. Study weak chapters!`;
    } else {
      return '📊 Consistent Performance: Your scores have stayed steady across recent tests.';
    }
  }, [trend]);

  if (state === 'loading') return <LoadingScreen label="Loading performance report…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Performance Analytics"
        subtitle="Detailed analysis of your scores, subject strengths, chapter metrics, and time management."
      />

      {/* Summary Scorecards Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Tests Taken', value: summary.tests_taken, desc: 'submitted attempts' },
          { label: 'Average Score', value: `${summary.avg_score}%`, desc: 'across all attempts' },
          { label: 'Overall Accuracy', value: `${avgAccuracy}%`, desc: 'correct / total attempted' },
          { label: 'Average Speed', value: avgSpeed, desc: 'time spent per question' },
        ].map((item) => (
          <div key={item.label} className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{item.label}</p>
            <p className="mt-1 text-3xl font-extrabold text-slate-900">{item.value}</p>
            <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Double Column Trend Graph Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Score Improvement Trends */}
        <div className="card p-5">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Score Improvement Graph</h2>
          <p className="text-xs text-slate-500 mt-1">{scoreImprovementSummary}</p>
          {trend.length > 0 ? (
            <div className="mt-6 flex items-end gap-2 overflow-x-auto border-b border-slate-200 pb-2">
              {trend.map((t, i) => (
                <div key={i} className="flex min-w-[50px] flex-col items-center gap-1">
                  <span className="text-xs font-bold text-slate-600">{t.percentage}%</span>
                  <div
                    className="w-10 bg-brand-500 hover:bg-brand-600 transition-colors rounded-t"
                    style={{ height: `${Math.max(12, t.percentage * 1.5)}px` }}
                    title={`${t.title}: ${t.percentage}%`}
                  />
                  <span className="text-[9px] font-medium text-slate-400 mt-1 text-center truncate w-12">
                    {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 mt-8 text-center">No trend data available yet.</p>
          )}
        </div>

        {/* Accuracy Trend Graph */}
        <div className="card p-5">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Accuracy Trend Graph</h2>
          <p className="text-xs text-slate-500 mt-1">Percentage of correct answers out of questions attempted per test.</p>
          {trend.length > 0 ? (
            <div className="mt-6 flex items-end gap-2 overflow-x-auto border-b border-slate-200 pb-2">
              {trend.map((t, i) => (
                <div key={i} className="flex min-w-[50px] flex-col items-center gap-1">
                  <span className="text-xs font-bold text-emerald-600">{t.accuracy}%</span>
                  <div
                    className="w-10 bg-emerald-500 hover:bg-emerald-600 transition-colors rounded-t"
                    style={{ height: `${Math.max(12, t.accuracy * 1.5)}px` }}
                    title={`${t.title} Accuracy: ${t.accuracy}%`}
                  />
                  <span className="text-[9px] font-medium text-slate-400 mt-1 text-center truncate w-12">
                    {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 mt-8 text-center">No trend data available yet.</p>
          )}
        </div>
      </div>

      {/* Weak & Strong Chapters Side-by-Side */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weak Chapters */}
        <div className="card p-5 border-t-4 border-red-500">
          <h2 className="text-sm font-bold text-red-600 uppercase tracking-wide">Weak Chapters (&lt;60% Accuracy)</h2>
          <p className="text-xs text-slate-500 mt-1">Chapters requiring immediate revision and focus.</p>
          {chapters.weak.length > 0 ? (
            <div className="mt-4 space-y-3">
              {chapters.weak.map((c, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700">{c.chapter} <span className="text-slate-400">({c.subject})</span></span>
                    <span className="text-red-600">{c.accuracy}% Accuracy</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded overflow-hidden">
                    <div className="bg-red-500 h-full" style={{ width: `${c.accuracy}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 mt-6 text-center">Fantastic! No weak chapters identified.</p>
          )}
        </div>

        {/* Strong Chapters */}
        <div className="card p-5 border-t-4 border-emerald-500">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-wide">Strong Chapters (&ge;60% Accuracy)</h2>
          <p className="text-xs text-slate-500 mt-1">Your top performing areas with high concept clarity.</p>
          {chapters.strong.length > 0 ? (
            <div className="mt-4 space-y-3">
              {chapters.strong.map((c, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700">{c.chapter} <span className="text-slate-400">({c.subject})</span></span>
                    <span className="text-emerald-600">{c.accuracy}% Accuracy</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${c.accuracy}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 mt-6 text-center">Complete more tests to discover your strengths.</p>
          )}
        </div>
      </div>

      {/* Time Management Analysis List */}
      <div className="card p-5">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">Time Management Analysis</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs uppercase bg-slate-50 text-slate-400">
              <tr>
                <th className="px-4 py-2">Test Taken</th>
                <th className="px-4 py-2">Questions Count</th>
                <th className="px-4 py-2">Total Time Spent</th>
                <th className="px-4 py-2">Average Speed</th>
                <th className="px-4 py-2">Pace Level</th>
              </tr>
            </thead>
            <tbody>
              {attempts.slice(0, 5).map((a, i) => {
                const mins = Math.floor((a.duration_seconds || 0) / 60);
                const secs = (a.duration_seconds || 0) % 60;
                const speed = a.total_questions > 0 ? Math.round((a.duration_seconds || 0) / a.total_questions) : 0;
                let pace = 'Optimized';
                let color = 'emerald';
                if (speed > 120) { pace = 'Slow Pace'; color = 'amber'; }
                else if (speed < 30) { pace = 'Fast Pace / Rushed'; color = 'red'; }

                return (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-800">{a.title}</td>
                    <td className="px-4 py-3">{a.total_questions} questions</td>
                    <td className="px-4 py-3">{mins}m {secs}s</td>
                    <td className="px-4 py-3 font-semibold">{speed}s per question</td>
                    <td className="px-4 py-3">
                      <Badge color={color}>{pace}</Badge>
                    </td>
                  </tr>
                );
              })}
              {attempts.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-slate-400">No time analysis data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subject-wise & Chapter-wise Detailed Performance Reports */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Subject wise list */}
        <div className="card p-5">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">Subject-wise Performance</h2>
          {subject_breakdown && subject_breakdown.length > 0 ? (
            <div className="space-y-4">
              {subject_breakdown.map((s) => (
                <div key={s.subject} className="bg-slate-50 border border-slate-100 p-3 rounded">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{s.subject}</span>
                    <span>{s.accuracy}% Accuracy ({s.correct}/{s.total})</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 mt-2 rounded overflow-hidden">
                    <div className="bg-brand-500 h-full rounded" style={{ width: `${s.accuracy}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center">No subject breakdown available.</p>
          )}
        </div>

        {/* Chapter wise list */}
        <div className="card p-5">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">Chapter-wise Performance</h2>
          {chapter_breakdown && chapter_breakdown.length > 0 ? (
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {chapter_breakdown.map((c, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 p-3 rounded">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{c.chapter} <span className="text-slate-400 font-normal">({c.subject})</span></span>
                    <span>{c.accuracy}% Accuracy</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 mt-2 rounded overflow-hidden">
                    <div className="bg-brand-500 h-full rounded" style={{ width: `${c.accuracy}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center">No chapter breakdown available.</p>
          )}
        </div>
      </div>

      {/* Attempts History */}
      <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-lg">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800">
          <h2 className="text-sm font-semibold">All Test Attempts History</h2>
        </div>
        {attempts.length === 0 ? (
          <p className="p-4 text-sm text-muted">
            No attempts yet. <Link to="/my-tests" className="text-brand-700 underline">Start a test</Link>
          </p>
        ) : (
          <DataTable
            columns={[
              { key: 'title', label: 'Test Title' },
              { key: 'percentage', label: 'Score Percentage', render: (r) => (r.percentage != null ? `${r.percentage}%` : '—') },
              { key: 'rank', label: 'Rank Obtained', render: (r) => (r.rank ? `#${r.rank}` : '—') },
              { key: 'percentile', label: 'Percentile Rank', render: (r) => (r.percentile != null ? `${r.percentile}%` : '—') },
              { key: 'submitted_at', label: 'Submitted Date', render: (r) => formatDateTime(r.submitted_at) },
            ]}
            rows={attempts}
          />
        )}
      </div>
    </div>
  );
}
