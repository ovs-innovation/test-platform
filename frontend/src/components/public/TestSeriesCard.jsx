import { Link } from 'react-router-dom';
import { getSeriesBlurb, getTestSeriesCover } from '../../lib/testSeriesCover.js';

export default function TestSeriesCard({ series }) {
  const free = Number(series.price) === 0;
  const examLabel = series.exam_type || 'General';
  const cover = getTestSeriesCover(series);
  const blurb = getSeriesBlurb(series);

  return (
    <Link
      to={`/test-series/${series.slug}`}
      className="card group flex h-full flex-col overflow-hidden shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <img
          src={cover}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <span className="badge w-fit bg-white/95 text-slate-800 backdrop-blur-sm">{examLabel}</span>
          <p className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-white drop-shadow-sm">
            {series.title}
          </p>
        </div>
        {free && (
          <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white shadow-sm">
            Free
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-caption">
          {series.test_count} mocks · {series.validity_days} days access
        </p>
        <p className="mt-2 line-clamp-2 min-h-[2.5rem] flex-1 text-sm leading-relaxed text-slate-500">
          {blurb}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xl font-extrabold text-slate-900">
            {free ? '₹0' : `₹${Number(series.price)}`}
          </span>
          <span className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition group-hover:bg-brand-700">
            View series →
          </span>
        </div>
      </div>
    </Link>
  );
}
