import { useEffect, useState, useCallback } from 'react';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader, EmptyState } from '../../components/ui.jsx';

export default function Leaderboard() {
  const [assessments, setAssessments] = useState([]);
  const [assessmentId, setAssessmentId] = useState('');
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');

  const loadAssessments = useCallback(async () => {
    try {
      const list = await studentService.leaderboardAssessments();
      setAssessments(list);
      return list;
    } catch {
      return [];
    }
  }, []);

  const loadLeaderboard = useCallback(async (id) => {
    setState('loading');
    try {
      const params = id ? { assessment_id: id } : {};
      const result = await studentService.leaderboard(params);
      setData(result);
      if (result.assessment_id) {
        setAssessmentId(String(result.assessment_id));
      }
      setState('done');
    } catch {
      setState('error');
    }
  }, []);

  useEffect(() => {
    (async () => {
      await loadAssessments();
      await loadLeaderboard();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAssessmentChange = (e) => {
    const id = e.target.value;
    setAssessmentId(id);
    loadLeaderboard(id || undefined);
  };

  if (state === 'loading' && !data) return <LoadingScreen />;
  if (state === 'error') return <ErrorState onRetry={() => loadLeaderboard(assessmentId || undefined)} />;

  const rows = data?.leaderboard || [];

  return (
    <div>
      <PageHeader
        title="Leaderboard"
        subtitle="Rankings for each test — scores are compared within the same assessment only."
      />

      {assessments.length > 0 && (
        <div className="mb-6 max-w-md">
          <label className="label" htmlFor="lb-assessment">Test</label>
          <select
            id="lb-assessment"
            className="input"
            value={assessmentId}
            onChange={onAssessmentChange}
          >
            {assessments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title} ({a.attempt_count} attempts)
              </option>
            ))}
          </select>
        </div>
      )}

      {data?.your_rank != null && (
        <div className="mb-6 border border-brand-200 bg-brand-50 px-4 py-3 text-sm dark:border-brand-900 dark:bg-brand-950/40">
          Your rank: <strong>#{data.your_rank}</strong>
          {data.your_percentage != null && <> · {data.your_percentage}%</>}
          {data.assessment_title && <> on {data.assessment_title}</>}
        </div>
      )}

      {rows.length === 0 ? (
        <EmptyState
          title="No rankings yet"
          message="Complete a mock test to appear on the leaderboard."
        />
      ) : (
        <div className="overflow-hidden border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <table className="w-full text-sm">
            <thead className="table-head">
              <tr>
                <th className="px-4 py-2.5 text-left">Rank</th>
                <th className="px-4 py-2.5 text-left">Student</th>
                <th className="px-4 py-2.5 text-left">Marks</th>
                <th className="px-4 py-2.5 text-left">Score</th>
                <th className="hidden px-4 py-2.5 text-left sm:table-cell">Percentile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map((r) => (
                <tr
                  key={r.attempt_id}
                  className={r.is_you ? 'bg-brand-50/80 dark:bg-brand-950/30' : undefined}
                >
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">#{r.rank}</td>
                  <td className="px-4 py-3">
                    {r.name}
                    {r.is_you && <span className="ml-2 text-xs text-brand-700 dark:text-brand-400">(you)</span>}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {r.marks_obtained} / {r.total_marks}
                  </td>
                  <td className="px-4 py-3 font-medium">{r.percentage}%</td>
                  <td className="hidden px-4 py-3 text-muted sm:table-cell">
                    {r.percentile != null ? `${r.percentile}%` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
