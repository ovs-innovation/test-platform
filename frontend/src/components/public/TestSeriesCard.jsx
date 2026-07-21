import { Link } from 'react-router-dom';
import { getExamTheme, getSeriesBlurb } from '../../lib/testSeriesCover.js';

export default function TestSeriesCard({ series }) {
  const free = Number(series.price) === 0;
  const theme = getExamTheme(series);
  const blurb = getSeriesBlurb(series);
  const price = Number(series.price).toLocaleString('en-IN');
  const tags = theme.tags || ['NTA CBT Screen', 'All India Rank', 'Step Solutions'];

  return (
    <Link
      to={`/test-series/${series.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-300/40"
    >
      {/* 1. FULL-WIDTH INTEGRATED HERO BANNER HEADER */}
      <div className={`relative h-44 sm:h-48 w-full overflow-hidden rounded-2xl bg-gradient-to-r ${theme.heroGradient} text-white shadow-inner`}>
        {/* Full-Cover Background Image with Natural Gradient Blending & Zero Blank Margins */}
        {theme.studentImage && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={theme.studentImage}
              alt={theme.label}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Category Gradient Overlay Mask (Left to Right) for legibility & smooth blend */}
            <div className={`absolute inset-y-0 left-0 w-full sm:w-3/4 bg-gradient-to-r ${theme.heroGradient} via-slate-950/70 to-transparent opacity-95`} />
            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          </div>
        )}

        {/* Subtle Blueprint Grid Pattern Overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-15 z-10" aria-hidden="true">
          <svg className="h-full w-full" fill="none" viewBox="0 0 360 160">
            <pattern id={`hero-grid-${series.id || series.slug}`} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.75" />
            </pattern>
            <rect width="100%" height="100%" fill={`url(#hero-grid-${series.id || series.slug})`} />
          </svg>
        </div>

        {/* Floating Banner Badges & Overlay Items (Left-Aligned) */}
        <div className="relative z-20 flex flex-col justify-between h-full p-4 sm:p-5 max-w-[65%] sm:max-w-[70%]">
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-white/20 px-3 py-1 text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-wider text-white backdrop-blur-md border border-white/25 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span>{theme.label}</span>
            </span>

            <div className="flex items-center gap-1.5">
              {series.is_featured && (
                <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-wide text-amber-950 shadow-xs">
                  ★ Featured
                </span>
              )}
              {free && (
                <span className="rounded-full bg-white px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-wide text-cyan-950 shadow-xs">
                  Free
                </span>
              )}
            </div>
          </div>

          {/* Integrated Mock & Validity Stat Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/60 px-3 py-1 text-[11px] font-extrabold text-white backdrop-blur-md border border-white/20 shadow-xs">
              <span>⚡</span>
              <span>{series.test_count || 0} Full Mocks</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/60 px-3 py-1 text-[11px] font-extrabold text-white/90 backdrop-blur-md border border-white/20 shadow-xs">
              <span>⏳</span>
              <span>{series.validity_days || 365}D</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. PRODUCT DETAILS & BENTO SHOWCASE FLOW */}
      <div className="mt-4 flex flex-1 flex-col">
        {/* Title */}
        <h3 className="line-clamp-2 min-h-[2.6rem] text-base sm:text-lg font-black leading-snug tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-[#0D6EFD]">
          {series.title}
        </h3>

        {/* Feature Tags Row */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${theme.chipBg}`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-500 font-medium">
          {blurb}
        </p>
      </div>

      {/* 3. INTEGRATED PRODUCT ACTION BAR */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          {free ? (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Access</p>
              <p className={`text-xl font-black ${theme.accentText}`}>FREE</p>
            </div>
          ) : (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">One-Time Fee</p>
              <p className="text-xl font-black tabular-nums text-slate-900">₹{price}</p>
            </div>
          )}
        </div>

        <span className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-black tracking-wide text-white transition-all duration-300 group-hover:scale-105 active:scale-95 ${theme.btnGradient}`}>
          <span>{free ? 'Start Free' : 'View Series'}</span>
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
