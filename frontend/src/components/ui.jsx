import { useState, useMemo } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { EmptyLineArt } from './landing/LineArtIllustrations.jsx';

export function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder = '••••••••',
  required = false,
  autoComplete = 'current-password',
  className = '',
  disabled = false,
  ...props
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <input
        id={id}
        name={name}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        disabled={disabled}
        className={`w-full pr-12 ${className}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        tabIndex={-1}
        className="absolute right-1 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 hover:text-slate-200 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer focus:outline-none"
        aria-label={show ? 'Hide password' : 'Show password'}
        title={show ? 'Hide password' : 'Show password'}
      >
        {show ? (
          <EyeOff className="h-4 w-4 shrink-0 text-slate-400 hover:text-slate-200 dark:text-slate-400 dark:hover:text-white" />
        ) : (
          <Eye className="h-4 w-4 shrink-0 text-slate-400 hover:text-slate-200 dark:text-slate-400 dark:hover:text-white" />
        )}
      </button>
    </div>
  );
}

export function Skeleton({ className = '' }) {
  return <div className={`animate-shimmer rounded-xl bg-slate-200/80 dark:bg-slate-800/80 ${className}`} aria-hidden />;
}

/** Inline button feedback only — no full-page use */
export function Spinner({ className = 'h-4 w-4' }) {
  return (
    <svg className={`inline-block animate-spin text-current opacity-70 ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

export function TestSeriesCardSkeleton() {
  return (
    <div className="saas-card overflow-hidden p-6 space-y-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
      <Skeleton className="h-2 w-full rounded-full" />
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800/60 pt-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 rounded-xl" />
          <Skeleton className="h-4 w-96 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="saas-card p-6 space-y-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-9 w-9 rounded-xl" />
            </div>
            <Skeleton className="h-8 w-32 rounded-lg" />
            <Skeleton className="h-3 w-40" />
          </div>
        ))}
      </div>

      <div className="saas-card p-6 space-y-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
        <Skeleton className="h-6 w-48 rounded-lg" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    </div>
  );
}

/** @deprecated Use skeletons inline; kept so existing pages render layout placeholders instead of spinners */
export function LoadingScreen({ variant = 'page' }) {
  if (variant === 'cards') {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <TestSeriesCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  return <PageSkeleton />;
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6 dark:border-slate-800/60">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{title}</h1>
        {subtitle && <p className="mt-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  accent = 'text-slate-900 dark:text-white',
  trend,
  trendUp = true,
  subtitle,
}) {
  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-5 shadow-xs transition hover:border-slate-300 dark:hover:border-slate-700">
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{label}</p>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <h3 className={`text-2xl sm:text-3xl font-black tracking-tight ${accent}`}>{value}</h3>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold">
        {trend && (
          <span className={`font-bold ${trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
        {subtitle && (
          <span className="text-slate-400 dark:text-slate-500 font-medium truncate">{subtitle}</span>
        )}
      </div>
    </div>
  );
}

export function EmptyState({ title, message, action, illustration = true }) {
  return (
    <div className="saas-card flex flex-col items-center justify-center gap-3 p-6 sm:p-10 text-center bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-2xl">
      {illustration ? (
        <EmptyLineArt className="h-28 w-28 sm:h-36 sm:w-36 opacity-90" />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-400">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
      )}
      <div className="max-w-md space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
        {message && <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{message}</p>}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}

export function Badge({ children, color = 'slate' }) {
  const colors = {
    slate: 'bg-slate-100 text-slate-800 border border-slate-200 dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-700/60',
    green: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30',
    red: 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/30',
    blue: 'bg-blue-500/15 text-blue-700 dark:text-cyan-300 border border-blue-500/30',
    amber: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30',
    purple: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-xs ${colors[color] || colors.slate}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function DataTable({ columns, rows, emptyMessage = 'No records available.', searchable = true }) {
  const [filterText, setFilterText] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const filteredRows = useMemo(() => {
    if (!rows?.length) return [];
    let result = [...rows];
    if (filterText.trim()) {
      const q = filterText.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((val) => val && String(val).toLowerCase().includes(q))
      );
    }
    if (sortKey) {
      result.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA < valB) return sortDir === 'asc' ? -1 : 1;
        if (valA > valB) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [rows, filterText, sortKey, sortDir]);

  const totalPages = Math.ceil(filteredRows.length / pageSize) || 1;
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const exportCSV = () => {
    if (!filteredRows.length) return;
    const headers = columns.map((c) => c.label).join(',');
    const csvRows = filteredRows.map((r) =>
      columns.map((c) => `"${String(r[c.key] || '').replace(/"/g, '""')}"`).join(',')
    );
    const blob = new Blob([[headers, ...csvRows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `export-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!rows?.length) {
    return <EmptyState title="No records found" message={emptyMessage} illustration={false} />;
  }

  return (
    <div className="saas-card overflow-hidden bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
      {/* Table Controls Header */}
      {searchable && (
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-[#0f172a]/60">
          <div className="relative w-full sm:w-72">
            <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search table..."
              value={filterText}
              onChange={(e) => {
                setFilterText(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportCSV}
              className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <svg className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export CSV
            </button>
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-100/90 text-xs font-extrabold uppercase tracking-wider text-slate-600 backdrop-blur-md dark:border-slate-800/60 dark:bg-[#0b1120]/90 dark:text-slate-400">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="cursor-pointer px-5 py-4 transition hover:text-slate-900 dark:hover:text-white"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.label}</span>
                    {sortKey === col.key && (
                      <span className="text-blue-600 dark:text-blue-400">{sortDir === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/40">
            {paginatedRows.map((row, i) => (
              <tr key={row.id ?? i} className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-4 font-medium text-slate-900 dark:text-slate-300">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 text-xs font-bold text-slate-600 dark:border-slate-800/40 dark:text-slate-400">
          <span>
            Page {currentPage} of {totalPages} ({filteredRows.length} items)
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 transition hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700/60 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 transition hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700/60 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="saas-card flex flex-col items-center gap-4 p-10 text-center bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-rose-500/30 bg-rose-500/10 text-rose-500 shadow-lg">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div className="max-w-md space-y-1">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Unable to load content</h3>
        <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">{message || 'An unexpected error occurred while fetching data.'}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          className="mt-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500"
          onClick={onRetry}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
