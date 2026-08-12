import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, EmptyState } from '../../components/ui.jsx';
import { AdminHeader } from '../../components/admin/AdminUI.jsx';
import { formatDateTime, formatCompactDateTime, attemptStatusLabel } from '../../lib/format.js';
import {
  Search,
  Download,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  FileText,
  AlertTriangle
} from 'lucide-react';

const FILTERS = [
  { id: 'all', label: 'All Attempts' },
  { id: 'passed', label: 'Passed' },
  { id: 'failed', label: 'Failed' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'violations', label: 'Violations Flagged' },
];

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [state, setState] = useState('loading');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('submitted_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [exporting, setExporting] = useState(false);

  const load = async () => {
    setState('loading');
    try {
      const data = await adminService.reports();
      setReports(data || []);
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      await adminService.exportReports();
    } catch (err) {
      alert(err.message || 'Failed to export CSV report');
    } finally {
      setExporting(false);
    }
  };

  // KPI Metrics calculation
  const metrics = useMemo(() => {
    const total = reports.length;
    const completed = reports.filter((r) => r.status !== 'in_progress' && r.status !== 'started');
    const passed = reports.filter((r) => r.passed === true || r.status === 'passed');
    const inProgress = reports.filter((r) => r.status === 'in_progress' || r.status === 'started');
    const totalViolations = reports.reduce((acc, r) => acc + (r.violation_count || r.violations_count || r.cheating_events_count || 0), 0);
    const passRate = completed.length > 0 ? Math.round((passed.length / completed.length) * 100) : 0;

    return {
      total,
      passRate,
      inProgress: inProgress.length,
      violations: totalViolations,
    };
  }, [reports]);

  // Filtered and searched reports
  const filtered = useMemo(() => {
    return reports.filter((r) => {
      // 1. Search Query
      const q = searchQuery.toLowerCase();
      const name = (r.candidate_name || r.user_name || '').toLowerCase();
      const email = (r.candidate_email || r.user_email || '').toLowerCase();
      const test = (r.assessment_title || r.test_name || '').toLowerCase();
      const matchesSearch = !q || name.includes(q) || email.includes(q) || test.includes(q);

      if (!matchesSearch) return false;

      // 2. Tab Filter
      if (filter === 'passed') return r.passed === true || r.status === 'passed';
      if (filter === 'failed') return r.passed === false || r.status === 'failed';
      if (filter === 'in_progress') return r.status === 'in_progress' || r.status === 'started';
      if (filter === 'violations') return (r.violation_count || r.violations_count || r.cheating_events_count || 0) > 0;

      return true;
    });
  }, [reports, filter, searchQuery]);

  // Sorted reports
  const sortedAndFiltered = useMemo(() => {
    const data = [...filtered];
    data.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'submitted_at') {
        aVal = aVal ? new Date(aVal).getTime() : 0;
        bVal = bVal ? new Date(bVal).getTime() : 0;
      } else if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal || '').toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return data;
  }, [filtered, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (state === 'loading') return <LoadingScreen label="Loading reports…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  return (
    <div className="w-full max-w-full space-y-6">
      {/* 1. Page Header with Title, Description, and Primary Actions */}
      <AdminHeader
        title="Reports & Attempt Audit Trail"
        subtitle="Audit candidate test attempts, proctoring security violations, and export comprehensive CSV attempt logs."
        breadcrumbs={['Platform Reports']}
        actions={
          <button
            type="button"
            disabled={exporting}
            onClick={handleExportCSV}
            className="btn btn-primary"
          >
            {exporting ? 'Exporting…' : 'Export Reports CSV'}
          </button>
        }
      />

      {/* 2. Clean Summary KPI Stat Cards (Lighter Visual Weight) */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        <div className="p-4 sm:p-5 bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs transition hover:border-slate-300 dark:hover:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Attempts</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-3">{metrics.total}</p>
          <p className="text-[11px] font-medium text-slate-400 mt-1">Across all assessments</p>
        </div>

        <div className="p-4 sm:p-5 bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs transition hover:border-slate-300 dark:hover:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pass Rate</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight mt-3">{metrics.passRate}%</p>
          <p className="text-[11px] font-medium text-slate-400 mt-1">Completed tests benchmark</p>
        </div>

        <div className="p-4 sm:p-5 bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs transition hover:border-slate-300 dark:hover:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">In Progress</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400 tracking-tight mt-3">{metrics.inProgress}</p>
          <p className="text-[11px] font-medium text-slate-400 mt-1">Live active test sessions</p>
        </div>

        <div className="p-4 sm:p-5 bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs transition hover:border-slate-300 dark:hover:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Violations Flagged</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
              <ShieldAlert className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-rose-600 dark:text-rose-400 tracking-tight mt-3">{metrics.violations}</p>
          <p className="text-[11px] font-medium text-slate-400 mt-1">Proctoring warning logs</p>
        </div>
      </div>

      {/* 3. Filter & Search Control Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-[#111827] sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input Bar */}
        <div className="relative w-full sm:w-[380px] shrink-0">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidate, email, assessment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-3 text-xs font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-1.5 scrollbar-thin overflow-x-auto">
          {FILTERS.map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Data Table Section */}
      {sortedAndFiltered.length === 0 ? (
        <EmptyState title="No attempt logs found" message="No matching candidate attempts found for the selected filter or search query." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-[#111827]">
          {/* Horizontally scrollable table wrapper to support mobile screens (375px, 768px) */}
          <div className="w-full overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[850px] text-left text-xs border-collapse">
              {/* Header */}
              <thead className="border-b border-slate-200/80 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
                <tr>
                  <Th className="w-[22%]" onClick={() => handleSort('candidate_name')}>
                    <HeaderCell label="Candidate" isSorted={sortField === 'candidate_name'} direction={sortDirection} />
                  </Th>
                  <Th className="w-[30%]" onClick={() => handleSort('assessment_title')}>
                    <HeaderCell label="Assessment" isSorted={sortField === 'assessment_title'} direction={sortDirection} />
                  </Th>
                  <Th className="w-[12%]" onClick={() => handleSort('marks_obtained')}>
                    <HeaderCell label="Score" isSorted={sortField === 'marks_obtained'} direction={sortDirection} />
                  </Th>
                  <Th className="w-[10%]" onClick={() => handleSort('passed')}>
                    <HeaderCell label="Result" isSorted={sortField === 'passed'} direction={sortDirection} />
                  </Th>
                  <Th className="w-[10%]" onClick={() => handleSort('status')}>
                    <HeaderCell label="Status" isSorted={sortField === 'status'} direction={sortDirection} />
                  </Th>
                  <Th className="w-[8%]" onClick={() => handleSort('violation_count')}>
                    <HeaderCell label="Violations" isSorted={sortField === 'violation_count'} direction={sortDirection} />
                  </Th>
                  <Th className="w-[12%]" onClick={() => handleSort('submitted_at')}>
                    <HeaderCell label="Submitted" isSorted={sortField === 'submitted_at'} direction={sortDirection} />
                  </Th>
                  <Th className="w-[6%] text-right pr-4">Action</Th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800/50 dark:bg-[#111827]">
                {sortedAndFiltered.map((r) => (
                  <tr
                    key={r.attempt_id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors duration-150"
                  >
                    {/* Candidate Name & Email */}
                    <td className="px-4 py-3.5 align-middle">
                      <div className="truncate">
                        <p className="truncate text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                          {r.candidate_name}
                        </p>
                        <p className="truncate text-[11px] text-slate-400 font-normal mt-0.5">
                          {r.candidate_email}
                        </p>
                      </div>
                    </td>

                    {/* Assessment Title */}
                    <td className="px-4 py-3.5 align-middle">
                      <p className="truncate text-xs font-medium text-slate-800 dark:text-slate-200">
                        {r.assessment_title}
                      </p>
                    </td>

                    {/* Score */}
                    <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                      {r.marks_obtained != null ? (
                        <div className="flex items-baseline gap-1">
                          <span className="font-semibold text-slate-900 dark:text-white text-xs">
                            {r.marks_obtained}/{r.total_marks}
                          </span>
                          <span className="text-[11px] font-normal text-slate-400">
                            ({r.percentage}%)
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-normal text-xs">—</span>
                      )}
                    </td>

                    {/* Result Badge */}
                    <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                      {r.status === 'in_progress' ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          —
                        </span>
                      ) : r.passed ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                          <CheckCircle2 className="h-3 w-3" />
                          Passed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20">
                          <XCircle className="h-3 w-3" />
                          Failed
                        </span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                      <StatusBadge status={r.status} />
                    </td>

                    {/* Violations Badge */}
                    <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                      {r.violation_count > 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
                          <AlertTriangle className="h-3 w-3 text-amber-500" />
                          {r.violation_count}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal text-xs pl-1">0</span>
                      )}
                    </td>

                    {/* Submitted Date */}
                    <td className="px-4 py-3.5 align-middle whitespace-nowrap text-slate-500 dark:text-slate-400 text-[11px] font-normal" title={r.submitted_at ? formatDateTime(r.submitted_at) : 'Not submitted'}>
                      {r.submitted_at ? formatCompactDateTime(r.submitted_at) : '—'}
                    </td>

                    {/* View Action Link */}
                    <td className="px-4 py-3.5 align-middle text-right pr-4 whitespace-nowrap">
                      <Link
                        to={`/admin/attempts/${r.attempt_id}`}
                        className="inline-flex items-center justify-end gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline transition"
                      >
                        <span>View</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex items-center justify-between border-t border-slate-200/80 bg-slate-50/50 px-4 py-3 text-xs font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
            <span>Showing <strong className="text-slate-900 dark:text-white font-semibold">{sortedAndFiltered.length}</strong> of {reports.length} audit logs</span>
            <span className="text-[11px] text-slate-400 font-normal">Realtime records</span>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const label = attemptStatusLabel[status] || status;
  if (status === 'in_progress') {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
        {label}
      </span>
    );
  }
  if (status === 'auto_submitted') {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-0.5 text-[11px] font-medium text-purple-700 border border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20">
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
      {label}
    </span>
  );
}

const Th = ({ children, className = '', onClick }) => (
  <th
    onClick={onClick}
    className={`px-4 py-3 transition hover:text-slate-900 dark:hover:text-white cursor-pointer select-none ${className}`}
  >
    {children}
  </th>
);

function HeaderCell({ label, isSorted, direction }) {
  return (
    <div className="flex items-center gap-1">
      <span>{label}</span>
      {isSorted ? (
        direction === 'asc' ? (
          <ChevronUp className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        )
      ) : (
        <ArrowUpDown className="h-3 w-3 text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition" />
      )}
    </div>
  );
}
