import { Link } from 'react-router-dom';
import { getExamTheme, getSeriesBlurb } from '../../lib/testSeriesCover.js';

function Stat({ label, value, bg }) {
  return (
    <div className={`rounded-xl px-3 py-2.5 transition-colors ${bg}`}>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-0.5 text-base sm:text-lg font-extrabold tabular-nums text-slate-100">{value}</p>
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
      className={`group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 ${theme.glassCard}`}
    >
      {/* Header Glass Banner */}
      <div className={`relative overflow-hidden px-5 py-5 text-white ${theme.glassHeader}`}>
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10 blur-xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-10 right-10 h-24 w-24 rounded-full bg-white/5 blur-lg"
          aria-hidden
        />

        <div className="relative flex items-start justify-between gap-3">
          <div>
            <span className={`inline-flex rounded-lg px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md ${theme.badge}`}>
              {theme.label}
            </span>
            <p className="mt-2 text-[13px] font-medium text-slate-300">{theme.tagline}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            {series.is_featured && (
              <span className="rounded-md bg-amber-400/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-950 shadow-sm">
                Featured
              </span>
            )}
            {free && (
              <span className={`rounded-md border border-cyan-400/40 bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${theme.accent}`}>
                Free
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-[17px] font-extrabold leading-snug text-[#F5F6FA] transition group-hover:text-[#00F0FF]">
          {series.title}
        </h3>

        {/* Frosted Stat Boxes */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Stat label="Mocks" value={series.test_count} bg={theme.statBg} />
          <Stat label="Validity" value={`${series.validity_days} days`} bg={theme.statBg} />
        </div>

        {/* Highlight Bullet Checklist */}
        <ul className="mt-4 space-y-1.5">
          {theme.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[12px] leading-snug text-[#94A3B8]">
              <span className={`mt-0.5 shrink-0 font-bold ${theme.accent}`} aria-hidden>✓</span>
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-3 line-clamp-2 text-[12px] leading-relaxed text-slate-400">
          {blurb}
        </p>

        {/* Price & CTA Button Footer */}
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-800/80 bg-[#070c18]/90 px-4 py-3 backdrop-blur-md transition-colors group-hover:border-slate-700">
            <div>
              {free ? (
                <p className={`text-xl font-extrabold ${theme.accent}`}>Free</p>
              ) : (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Series fee</p>
                  <p className="text-xl font-extrabold tabular-nums text-white">₹{price}</p>
                </>
              )}
            </div>
            <span className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[13px] font-bold transition-transform group-hover:scale-[1.02] ${theme.btnGradient}`}>
              {free ? 'Start free' : 'View series'}
              <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
