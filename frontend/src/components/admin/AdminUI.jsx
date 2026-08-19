import React, { useState } from 'react';

export function AdminHeader({ title, subtitle, breadcrumbs = [], actions, status }) {
  return (
    <div className="mb-6 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-[#0F172A]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1 max-w-2xl">
          {breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>Admin Portal</span>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-slate-300 dark:text-slate-600">/</span>
                  <span className={idx === breadcrumbs.length - 1 ? 'font-bold text-blue-600 dark:text-blue-400' : ''}>
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          )}
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {title}
            </h1>
            {status && (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {status}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
      </div>
    </div>
  );
}

export function AdminMetricRail({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0F172A]">
      <div className="grid grid-cols-2 divide-y divide-slate-200/80 sm:grid-cols-4 sm:divide-x sm:divide-y-0 dark:divide-slate-800">
        {items.map((item, idx) => (
          <div key={idx} className="p-5 transition hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {item.label}
              </span>
              {item.badge && (
                <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                  {item.badge}
                </span>
              )}
            </div>
            <div className="mt-2.5 flex items-baseline justify-between gap-2">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {item.value}
              </span>
              {item.trend && (
                <span
                  className={`text-xs font-bold ${
                    item.trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {item.trendUp ? '↑' : '↓'} {item.trend}
                </span>
              )}
            </div>
            {item.subtext && (
              <p className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                {item.subtext}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminCard({ title, subtitle, action, children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-[#0F172A] ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between border-b border-slate-200/80 pb-3 dark:border-slate-800">
          <div>
            {title && <h3 className="text-base font-bold text-slate-900 dark:text-white">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

export function AdminStatusBadge({ status, type = 'slate' }) {
  const types = {
    green: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
    blue: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30',
    amber: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30',
    red: 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30',
    gold: 'bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-500/40',
    slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-bold border ${types[type] || types.slate}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function AdminDataTable({
  columns = [],
  rows = [],
  searchable = true,
  searchPlaceholder = 'Search records...',
  emptyMessage = 'No admin records found.',
  onRowClick,
  actionHeader,
}) {
  const [query, setQuery] = useState('');
  const [sortCol, setSortCol] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = rows.filter((row) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return columns.some((c) => {
      const val = c.accessor ? row[c.accessor] : row[c.key];
      return val != null && String(val).toLowerCase().includes(q);
    });
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortCol) return 0;
    const va = a[sortCol] ?? '';
    const vb = b[sortCol] ?? '';
    if (va < vb) return sortAsc ? -1 : 1;
    if (va > vb) return sortAsc ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const pagedRows = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key) => {
    if (sortCol === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0F172A] overflow-hidden">
      {(searchable || actionHeader) && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-200/80 p-4 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
          {searchable ? (
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder={searchPlaceholder}
                className="input pl-9 text-xs"
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          ) : (
            <div />
          )}
          {actionHeader && <div>{actionHeader}</div>}
        </div>
      )}

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[600px] text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-100/70 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => col.sortable !== false && col.key && handleSort(col.key)}
                  className={`px-4 py-3.5 ${col.sortable !== false && col.key ? 'cursor-pointer select-none hover:text-blue-600' : ''}`}
                >
                  <div className="flex items-center gap-1">
                    <span>{col.header}</span>
                    {sortCol === col.key && <span>{sortAsc ? '↑' : '↓'}</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80 text-slate-800 dark:divide-slate-800 dark:text-slate-200">
            {pagedRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400 font-medium">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pagedRows.map((row, rIdx) => (
                <tr
                  key={row.id || rIdx}
                  onClick={() => onRowClick?.(row)}
                  className={`transition hover:bg-slate-50 dark:hover:bg-slate-900/50 ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {columns.map((col, cIdx) => (
                    <td key={cIdx} className="px-4 py-3.5 align-middle">
                      {col.render ? col.render(row) : row[col.accessor || col.key] ?? '—'}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-xs text-slate-500 dark:text-slate-400">
          <span>
            Page <strong className="text-slate-900 dark:text-white">{page}</strong> of {totalPages} ({sorted.length} total)
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="btn btn-secondary btn-sm disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="btn btn-secondary btn-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function AdminModal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/75 p-4 sm:p-8 backdrop-blur-xs animate-in fade-in duration-150">
      <div className={`w-full ${sizes[size]} my-6 rounded-2xl border border-slate-200 bg-white p-0 shadow-xl dark:border-slate-800 dark:bg-[#0F172A] dark:text-slate-100 overflow-hidden transform transition-all`}>
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white transition"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
