import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, EmptyState } from '../../components/ui.jsx';
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
      /* handled by api pattern */
    } finally {
      setExporting(false);
    }
  };

  // Metrics computation for compact KPI cards
  const metrics = useMemo(() => {
    const total = reports.length;
    const completed = reports.filter((r) => r.status !== 'in_progress');
    const passed = reports.filter((r) => r.passed === true);
    const inProgress = reports.filter((r) => r.status === 'in_progress');
    const totalViolations = reports.reduce((acc, r) => acc + (r.violation_count || 0), 0);
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
      if (filter === 'passed' && r.passed !== true) return false;
      if (filter === 'failed' && (r.passed !== false || r.status === 'in_progress')) return false;
      if (filter === 'in_progress' && r.status !== 'in_progress') return false;
      if (filter === 'violations' && (!r.violation_count || r.violation_count <= 0)) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const candidateMatch = (r.candidate_name || '').toLowerCase().includes(q);
        const emailMatch = (r.candidate_email || '').toLowerCase().includes(q);
        const assessmentMatch = (r.assessment_title || '').toLowerCase().includes(q);
        return candidateMatch || emailMatch || assessmentMatch;
      }

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

  if (state === 'loading') return <LoadingScreen label="Loading audit logs…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-2.5 max-w-[1440px] mx-auto">
      {/* Page Title Header with reduced vertical spacing */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-2.5 dark:border-slate-800/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Admin Audit Logs</h1>
          <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            Complete record of candidate attempts, test performance, and proctoring violation logs.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-blue-500 transition disabled:opacity-50 cursor-pointer shrink-0"
          onClick={exportCsv}
          disabled={exporting || !reports.length}
        >
          <Download className="h-3.5 w-3.5" />
          {exporting ? 'Exporting...' : 'Export Audit CSV'}
        </button>
      </div>

      {/* Reduced Height KPI Stat Cards with Increased Number Prominence */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
        <div className="py-1.5 px-3 bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-xl flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Total Attempts</span>
            <span className="text-xl font-black text-slate-900 dark:text-white leading-none mt-0.5 block">{metrics.total}</span>
          </div>
          <FileText className="h-4 w-4 text-blue-500 opacity-80 shrink-0" />
        </div>

        <div className="py-1.5 px-3 bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-xl flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Pass Rate</span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 leading-none mt-0.5 block">{metrics.passRate}%</span>
          </div>
          <CheckCircle2 className="h-4 w-4 text-emerald-500 opacity-80 shrink-0" />
        </div>

        <div className="py-1.5 px-3 bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-xl flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">In Progress</span>
            <span className="text-xl font-black text-amber-600 dark:text-amber-400 leading-none mt-0.5 block">{metrics.inProgress}</span>
          </div>
          <Clock className="h-4 w-4 text-amber-500 opacity-80 shrink-0" />
        </div>

        <div className="py-1.5 px-3 bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-xl flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Violations Flagged</span>
            <span className="text-xl font-black text-rose-600 dark:text-rose-400 leading-none mt-0.5 block">{metrics.violations}</span>
          </div>
          <ShieldAlert className="h-4 w-4 text-rose-500 opacity-80 shrink-0" />
        </div>
      </div>

      {/* Merged Clean Toolbar: Expanded Search Bar (400px) + Filter Chips */}
      <div className="flex flex-col gap-2 rounded-xl border border-slate-200/80 bg-white p-2 px-3 shadow-2xs dark:border-slate-800/80 dark:bg-[#111827] sm:flex-row sm:items-center sm:justify-between">
        {/* Expanded Search Bar (~400px width) */}
        <div className="relative w-full sm:w-[400px] shrink-0">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidate, email, assessment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/90 py-1.5 pl-8 pr-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-hidden dark:border-slate-800 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-1 scrollbar-none overflow-x-auto">
          {FILTERS.map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Table Section (Primary Focus of Page) */}
      {sortedAndFiltered.length === 0 ? (
        <EmptyState title="No attempt logs found" message="No matching candidate attempts found for the selected filter or search query." />
      ) : (
        <div className="saas-card overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-2xs dark:border-slate-800/90 dark:bg-[#111827]">
          {/* Main Table Container: Zero horizontal scrolling layout */}
          <div className="w-full overflow-hidden">
            <table className="w-full table-fixed text-left text-xs border-collapse">
              {/* Table Header with #F8FAFC Subtle Background & High Contrast */}
              <thead className="sticky top-0 z-10 border-b border-slate-200/90 bg-[#f8fafc] text-[10.5px] font-extrabold uppercase tracking-wider text-slate-700 backdrop-blur-md dark:border-slate-800 dark:bg-[#0b1120] dark:text-slate-200 shadow-2xs">
                <tr>
                  <Th className="w-[18%]" onClick={() => handleSort('candidate_name')}>
                    <HeaderCell label="Candidate" isSorted={sortField === 'candidate_name'} direction={sortDirection} />
                  </Th>
                  <Th className="w-[34%]" onClick={() => handleSort('assessment_title')}>
                    <HeaderCell label="Assessment" isSorted={sortField === 'assessment_title'} direction={sortDirection} />
                  </Th>
                  <Th className="w-[10%]" onClick={() => handleSort('marks_obtained')}>
                    <HeaderCell label="Score" isSorted={sortField === 'marks_obtained'} direction={sortDirection} />
                  </Th>
                  <Th className="w-[8%]" onClick={() => handleSort('passed')}>
                    <HeaderCell label="Result" isSorted={sortField === 'passed'} direction={sortDirection} />
                  </Th>
                  <Th className="w-[9%]" onClick={() => handleSort('status')}>
                    <HeaderCell label="Status" isSorted={sortField === 'status'} direction={sortDirection} />
                  </Th>
                  <Th className="w-[6%]" onClick={() => handleSort('violation_count')}>
                    <HeaderCell label="Violations" isSorted={sortField === 'violation_count'} direction={sortDirection} />
                  </Th>
                  <Th className="w-[10%]" onClick={() => handleSort('submitted_at')}>
                    <HeaderCell label="Submitted" isSorted={sortField === 'submitted_at'} direction={sortDirection} />
                  </Th>
                  <Th className="w-[5%] text-right pr-3">View</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800/40 dark:bg-[#111827]">
                {sortedAndFiltered.map((r) => (
                  <tr
                    key={r.attempt_id}
                    className="group h-[54px] hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors duration-150"
                  >
                    {/* Candidate (Medium Name, Lighter Email) */}
                    <td className="px-3 py-2.5 align-middle min-w-0" title={`${r.candidate_name} (${r.candidate_email})`}>
                      <div className="truncate">
                        <p className="truncate text-[13px] font-medium text-slate-900 dark:text-white leading-snug">
                          {r.candidate_name}
                        </p>
                        <p className="truncate text-[11px] font-normal text-slate-400 dark:text-slate-500 mt-0.5">
                          {r.candidate_email}
                        </p>
                      </div>
                    </td>

                    {/* Assessment Title (Widest Column at 34%, Medium Weight) */}
                    <td className="px-3 py-2.5 align-middle min-w-0" title={r.assessment_title}>
                      <p className="truncate text-[13px] font-medium text-slate-800 dark:text-slate-200">
                        {r.assessment_title}
                      </p>
                    </td>

                    {/* Score */}
                    <td className="px-3 py-2.5 align-middle whitespace-nowrap">
                      {r.marks_obtained != null ? (
                        <div className="flex items-baseline gap-1">
                          <span className="font-semibold text-slate-900 dark:text-white text-xs">
                            {r.marks_obtained}/{r.total_marks}
                          </span>
                          <span className="text-[10px] font-normal text-slate-400">
                            ({r.percentage}%)
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-normal text-xs">—</span>
                      )}
                    </td>

                    {/* Result Badge (Compact Micro Badge) */}
                    <td className="px-3 py-2.5 align-middle whitespace-nowrap">
                      {r.status === 'in_progress' ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10.5px] font-normal text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          —
                        </span>
                      ) : r.passed ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10.5px] font-medium text-emerald-600 border border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" />
                          Passed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/10 px-2 py-0.5 text-[10.5px] font-medium text-rose-600 border border-rose-500/20 dark:bg-rose-500/15 dark:text-rose-400">
                          <XCircle className="h-3 w-3" />
                          Failed
                        </span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="px-3 py-2.5 align-middle whitespace-nowrap">
                      <StatusBadge status={r.status} />
                    </td>

                    {/* Violations Badge */}
                    <td className="px-3 py-2.5 align-middle whitespace-nowrap">
                      {r.violation_count > 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-1.5 py-0.5 text-[10.5px] font-semibold text-amber-700 dark:text-amber-300 border border-amber-500/30">
                          <AlertTriangle className="h-3 w-3 text-amber-500" />
                          {r.violation_count}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal text-xs pl-1">0</span>
                      )}
                    </td>

                    {/* Submitted Date */}
                    <td className="px-3 py-2.5 align-middle whitespace-nowrap text-slate-500 dark:text-slate-400 text-[11px] font-normal" title={r.submitted_at ? formatDateTime(r.submitted_at) : 'Not submitted'}>
                      {r.submitted_at ? formatCompactDateTime(r.submitted_at) : '—'}
                    </td>

                    {/* Compact Ghost Link for View Action */}
                    <td className="px-3 py-2.5 align-middle text-right pr-3 whitespace-nowrap">
                      <Link
                        to={`/admin/attempts/${r.attempt_id}`}
                        className="inline-flex items-center justify-end gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline transition group/link"
                      >
                        <span className="underline-offset-2">View</span>
                        <ExternalLink className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex items-center justify-between border-t border-slate-200/80 bg-slate-50/50 px-3.5 py-2 text-xs font-medium text-slate-500 dark:border-slate-800/80 dark:bg-slate-900/30 dark:text-slate-400">
            <span>Showing <strong className="text-slate-900 dark:text-white font-semibold">{sortedAndFiltered.length}</strong> of {reports.length} audit logs</span>
            <span className="text-[11px] text-slate-400 font-normal">Auto-updated</span>
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
      <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-0.5 text-[10.5px] font-medium text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 border border-blue-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
        {label}
      </span>
    );
  }
  if (status === 'auto_submitted') {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-purple-500/10 px-2 py-0.5 text-[10.5px] font-medium text-purple-600 dark:bg-purple-500/15 dark:text-purple-300 border border-purple-500/20">
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10.5px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
      {label}
    </span>
  );
}

const Th = ({ children, className = '', onClick }) => (
  <th
    onClick={onClick}
    className={`px-3 py-2.5 text-left transition hover:text-slate-900 dark:hover:text-white cursor-pointer select-none ${className}`}
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
