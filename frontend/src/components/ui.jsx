import { EmptyLineArt } from './landing/LineArtIllustrations.jsx';

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-slate-200 dark:bg-slate-800 ${className}`} aria-hidden />;
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
    <div className="card overflow-hidden shadow-card">
      <Skeleton className="h-1.5 w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-5 w-14" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/5" />
        <div className="flex items-end justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-6 w-10" />
        </div>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-56" />
        <Skeleton className="mt-2 h-4 w-80 max-w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card p-5 shadow-card">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="mt-3 h-8 w-12" />
          </div>
        ))}
      </div>
      <div className="card p-6 shadow-card">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-3 h-4 w-5/6" />
        <Skeleton className="mt-3 h-4 w-4/6" />
        <Skeleton className="mt-6 h-48 w-full rounded-lg" />
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
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white opacity-100">{title}</h1>
        {subtitle && <p className="mt-1 text-xs sm:text-sm font-medium text-slate-300 leading-relaxed opacity-100">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({ label, value, accent = 'text-white' }) {
  return (
    <div className="card p-5 shadow-xl border border-slate-800/90 bg-[#0b1430] hover:border-slate-700/80 transition-all">
      <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">{label}</p>
      <p className={`mt-2 text-2xl sm:text-3xl font-black ${accent}`}>{value}</p>
    </div>
  );
}

export function EmptyState({ title, message, action, illustration = true }) {
  return (
    <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-3 p-8 sm:p-12 text-center shadow-2xl">
      {illustration ? (
        <EmptyLineArt className="h-36 w-36 sm:h-44 sm:w-44" />
      ) : (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-cyan-300 shadow-lg">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      )}
      <h3 className="text-lg sm:text-xl font-extrabold text-white">{title}</h3>
      {message && <p className="max-w-md text-xs sm:text-sm text-slate-300 leading-relaxed">{message}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export function Badge({ children, color = 'slate' }) {
  const colors = {
    slate: 'bg-slate-800 text-slate-300 border border-slate-700/60',
    green: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    red: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
    blue: 'bg-blue-500/20 text-cyan-300 border border-blue-500/30',
    amber: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  };
  return <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-bold ${colors[color] || colors.slate}`}>{children}</span>;
}

export function DataTable({ columns, rows, emptyMessage = 'No records available.' }) {
  if (!rows?.length) {
    return (
      <div className="p-10 text-center flex flex-col items-center justify-center gap-2.5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-[#070e24] text-slate-400">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-slate-300 max-w-sm leading-relaxed">{emptyMessage}</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#070e24] text-slate-300 border-b border-slate-800">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-300">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80">
          {rows.map((row, i) => (
            <tr key={row.id ?? i} className="hover:bg-slate-800/50 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3.5 text-slate-200 font-medium">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="card flex flex-col items-center gap-4 p-10 text-center shadow-card">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/50">
        <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-red-600 dark:text-red-400">{message || 'Failed to load data.'}</p>
      {onRetry && (
        <button type="button" className="btn-secondary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
