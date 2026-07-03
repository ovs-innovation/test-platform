import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, EmptyState, Badge } from '../../components/ui.jsx';
import { formatDateTime, attemptStatusLabel } from '../../lib/format.js';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'passed', label: 'Passed' },
  { id: 'failed', label: 'Failed' },
  { id: 'in_progress', label: 'In progress' },
];

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [state, setState] = useState('loading');
  const [filter, setFilter] = useState('all');
  const [exporting, setExporting] = useState(false);

  const load = async () => {
    setState('loading');
    try {
      setReports(await adminService.reports());
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const exportCsv = async () => {
    setExporting(true);
    try {
      await adminService.exportReports();
    } catch {
      /* toast handled by api interceptor pattern - use alert fallback */
    } finally {
      setExporting(false);
    }
  };

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      if (filter === 'all') return true;
      if (filter === 'passed') return r.passed === true;
      if (filter === 'failed') return r.passed === false && r.status !== 'in_progress';
      if (filter === 'in_progress') return r.status === 'in_progress';
      return true;
    });
  }, [reports, filter]);

  if (state === 'loading') return <LoadingScreen label="Loading reports…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  return (
    <div>
      <PageHeader
        title="Attempt reports"
        subtitle="Every candidate attempt with scores and violations."
        actions={(
          <button type="button" className="btn-secondary text-sm" onClick={exportCsv} disabled={exporting || !reports.length}>
            {exporting ? 'Exporting…' : 'Export CSV'}
          </button>
        )}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition ${
              filter === f.id ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 ring-1 ring-inset ring-slate-300 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No attempts to show" message="Candidate attempts will appear here." />
      ) : (
        <div className="card overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <Th>Candidate</Th>
                <Th>Assessment</Th>
                <Th>Score</Th>
                <Th>Result</Th>
                <Th>Status</Th>
                <Th>Violations</Th>
                <Th>Submitted</Th>
                <Th className="text-right">Details</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.attempt_id} className="hover:bg-slate-50">
                  <Td>
                    <p className="font-medium text-slate-900">{r.candidate_name}</p>
                    <p className="text-xs text-slate-500">{r.candidate_email}</p>
                  </Td>
                  <Td className="text-slate-700">{r.assessment_title}</Td>
                  <Td>
                    {r.marks_obtained != null ? (
                      <span className="font-medium">
                        {r.marks_obtained}/{r.total_marks}{' '}
                        <span className="text-slate-400">({r.percentage}%)</span>
                      </span>
                    ) : (
                      '—'
                    )}
                  </Td>
                  <Td>
                    {r.status === 'in_progress' ? (
                      <Badge color="slate">—</Badge>
                    ) : r.passed ? (
                      <Badge color="green">Passed</Badge>
                    ) : (
                      <Badge color="red">Failed</Badge>
                    )}
                  </Td>
                  <Td className="text-slate-600">{attemptStatusLabel[r.status] || r.status}</Td>
                  <Td>
                    {r.violation_count > 0 ? (
                      <Badge color="amber">{r.violation_count}</Badge>
                    ) : (
                      <span className="text-slate-400">0</span>
                    )}
                  </Td>
                  <Td className="text-slate-500">{r.submitted_at ? formatDateTime(r.submitted_at) : '—'}</Td>
                  <Td className="text-right">
                    <Link to={`/admin/attempts/${r.attempt_id}`} className="text-sm font-medium text-brand-700 hover:underline">
                      View
                    </Link>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const Th = ({ children, className = '' }) => (
  <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 ${className}`}>{children}</th>
);
const Td = ({ children, className = '' }) => (
  <td className={`whitespace-nowrap px-4 py-3 text-sm text-slate-700 ${className}`}>{children}</td>
);
