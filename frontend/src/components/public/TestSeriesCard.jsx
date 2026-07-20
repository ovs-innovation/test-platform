import { Link } from 'react-router-dom';
import { getExamTheme, getSeriesBlurb } from '../../lib/testSeriesCover.js';

function Stat({ label, value, bg }) {
  return (
    <div className={`rounded-lg px-3 py-2.5 ${bg}`}>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-0.5 text-lg font-bold tabular-nums text-slate-900">{value}</p>
    </div>
  );
}

export default function TestSeriesCard({ series }) {
  const free = Number(series.price) === 0;
  const theme = getExamTheme(series);
  const blurb = getSeriesBlurb(series);
  const price = Number(series.price).toLocaleString('en-IN');

  return (
    <Link
      to={`/test-series/${series.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60"
    >
      <div className={`relative overflow-hidden px-5 py-5 text-white ${theme.header}`}>
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-10 right-10 h-24 w-24 rounded-full bg-white/5"
          aria-hidden
        />

        <div className="relative flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex rounded-md bg-white/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
              {theme.label}
            </span>
            <p className="mt-2 text-[13px] font-medium text-white/85">{theme.tagline}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            {series.is_featured && (
              <span className="rounded-md bg-amber-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-950">
                Featured
              </span>
            )}
            {free && (
              <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                Free
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-[17px] font-bold leading-snug text-slate-900 transition group-hover:text-[#1d4ed8]">
          {series.title}
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Stat label="Mocks" value={series.test_count} bg={theme.statBg} />
          <Stat label="Validity" value={`${series.validity_days} days`} bg={theme.statBg} />
        </div>

        <ul className="mt-4 space-y-1.5">
          {theme.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[12px] leading-snug text-slate-600">
              <span className={`mt-0.5 shrink-0 font-bold ${theme.accent}`} aria-hidden>✓</span>
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-3 line-clamp-2 text-[12px] leading-relaxed text-slate-500">
          {blurb}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 transition group-hover:border-slate-200 group-hover:bg-white">
            <div>
              {free ? (
                <p className="text-xl font-extrabold text-emerald-600">Free</p>
              ) : (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Series fee</p>
                  <p className="text-xl font-extrabold tabular-nums text-slate-900">₹{price}</p>
                </>
              )}
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#1d4ed8] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition group-hover:bg-[#1e40af]">
              {free ? 'Start free' : 'View series'}
              <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
