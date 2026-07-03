import { Link } from 'react-router-dom';

import { isNeetPg, isNeetUg } from '../../lib/testSeriesCover.js';

const CATEGORIES = [
  {
    id: 'jee',
    label: 'JEE Main',
    tagline: 'PCM full-length mocks',
    cover: '/test-series/jee.svg',
    href: '/test-series?filter=jee',
  },
  {
    id: 'neet',
    label: 'NEET UG',
    tagline: 'Medical entrance pattern',
    cover: '/test-series/neet.svg',
    href: '/test-series?filter=neet',
  },
  {
    id: 'neetpg',
    label: 'NEET PG',
    tagline: 'Postgraduate medical mocks',
    cover: '/test-series/neet-pg.svg',
    href: '/test-series?filter=neetpg',
  },
  {
    id: 'free',
    label: 'Free mock',
    tagline: 'Start without paying',
    cover: '/test-series/free-student-cover.jpg',
    href: '/free-mock',
  },
];

function countForCategory(series, id) {
  if (id === 'free') return series.filter((s) => Number(s.price) === 0).length;
  return series.filter((s) => {
    const t = `${s.exam_type || ''} ${s.title || ''}`;
    if (id === 'jee') return t.toLowerCase().includes('jee');
    if (id === 'neet') return isNeetUg(t);
    if (id === 'neetpg') return isNeetPg(t);
    return false;
  }).length;
}

export default function ExamCategoryGrid({ series = [] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CATEGORIES.map((cat) => {
        const count = countForCategory(series, cat.id);
        return (
          <Link
            key={cat.id}
            to={cat.href}
            className="group relative min-h-[148px] overflow-hidden rounded-xl border border-slate-200/80 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <img
              src={cat.cover}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
            <div className="relative flex h-full flex-col justify-end p-5">
              <p className="text-lg font-bold text-white">{cat.label}</p>
              <p className="mt-0.5 text-sm text-white/85">{cat.tagline}</p>
              {count > 0 && (
                <p className="mt-2 inline-flex w-fit rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {count} series available
                </p>
              )}
            </div>
            <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
              →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
