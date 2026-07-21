import { useEffect, useState, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { publicService } from '../../lib/services.js';
import { ErrorState, Skeleton } from '../../components/ui.jsx';
import TestSeriesCard from '../../components/public/TestSeriesCard.jsx';
import TestSeriesCardSkeleton from '../../components/public/TestSeriesCardSkeleton.jsx';
import CatalogHero from '../../components/public/CatalogHero.jsx';
import { isNeetPg, isNeetUg } from '../../lib/testSeriesCover.js';

const FILTERS = [
  { id: 'all', label: 'All series' },
  { id: 'free', label: 'Free' },
  { id: 'jee', label: 'JEE' },
  { id: 'neet', label: 'NEET UG' },
  { id: 'neetpg', label: 'NEET PG' },
  { id: 'foundation', label: 'Foundation' },
  { id: 'featured', label: 'Featured' },
];

export default function TestSeriesCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawParam = (searchParams.get('filter') || '').toLowerCase();
  const initialFilter = FILTERS.some((f) => f.id === rawParam) ? rawParam : 'all';

  const [list, setList] = useState([]);
  const [state, setState] = useState('loading');
  const [filter, setFilter] = useState(initialFilter);
  const skipScrollRef = useRef(false);

  useEffect(() => {
    const q = (searchParams.get('filter') || '').toLowerCase();
    if (skipScrollRef.current) {
      skipScrollRef.current = false;
      if (q && FILTERS.some((f) => f.id === q)) setFilter(q);
      else if (!searchParams.get('filter')) setFilter('all');
      return;
    }

    if (q && FILTERS.some((f) => f.id === q)) {
      setFilter(q);
      const timer = setTimeout(() => {
        const target = document.getElementById('catalog-results');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else if (!searchParams.get('filter')) {
      setFilter('all');
    }
  }, [searchParams]);

  useEffect(() => {
    publicService.testSeries()
      .then((d) => { setList(d.test_series); setState('done'); })
      .catch(() => setState('error'));
  }, []);

  const setFilterAndUrl = (id) => {
    skipScrollRef.current = true;
    setFilter(id);
    if (id === 'all') setSearchParams({});
    else setSearchParams({ filter: id });
  };

  const filtered = useMemo(() => list.filter((s) => {
    const text = `${s.exam_type || ''} ${s.title || ''}`;
    if (filter === 'free') return Number(s.price) === 0;
    if (filter === 'paid') return Number(s.price) > 0;
    if (filter === 'jee') return /jee/i.test(text);
    if (filter === 'neet') return isNeetUg(text);
    if (filter === 'neetpg') return isNeetPg(text);
    if (filter === 'foundation') return /foundation|class\s*[5-9]|class\s*1[0-2]|\b12\b/i.test(text);
    if (filter === 'featured') return s.is_featured;
    return true;
  }), [list, filter]);

  const filterCounts = useMemo(() => {
    const counts = {
      all: list.length,
      free: 0,
      jee: 0,
      neet: 0,
      neetpg: 0,
      foundation: 0,
      featured: 0,
    };
    list.forEach((s) => {
      const text = `${s.exam_type || ''} ${s.title || ''}`;
      if (Number(s.price) === 0) counts.free++;
      if (/jee/i.test(text)) counts.jee++;
      if (isNeetUg(text)) counts.neet++;
      if (isNeetPg(text)) counts.neetpg++;
      if (/foundation|class\s*[5-9]|class\s*1[0-2]|\b12\b/i.test(text)) counts.foundation++;
      if (s.is_featured) counts.featured++;
    });
    return counts;
  }, [list]);

  if (state === 'error') {
    return (
      <div className="container-app py-16">
        <ErrorState />
      </div>
    );
  }

  const loading = state === 'loading';
  const filterLabel = FILTERS.find((f) => f.id === filter)?.label || 'All';

  return (
    <div className="bg-slate-50">
      <CatalogHero seriesCount={loading ? 0 : list.length} />

      {/* FILTER TAB BAR - Auto-scrolled target for filtered navbar links */}
      <div id="catalog-results" className="container-app relative z-20 -mt-10 sm:-mt-12 mb-8 pt-4">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200/90 bg-[#F5F6FA] p-3 sm:p-3.5 shadow-xl shadow-slate-200/60">
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap px-1 py-0.5">
            {FILTERS.map((f) => {
              const isActive = filter === f.id;
              const count = filterCounts[f.id] ?? 0;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilterAndUrl(f.id)}
                  className={`group inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0D6EFD] to-[#2563eb] text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                      : 'border border-slate-200/90 bg-white text-slate-700 shadow-xs hover:border-[#0D6EFD]/50 hover:bg-blue-50/70 hover:text-[#0D6EFD] hover:scale-[1.02]'
                  }`}
                >
                  <span>{f.label}</span>
                  {!loading && (
                    <span
                      className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-extrabold transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-[#0D6EFD]'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-app pb-12 pt-4 lg:pb-16 lg:pt-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {filter === 'all' ? 'All test series' : `${filterLabel} series`}
            </h2>
            {!loading && (
              <p className="mt-1 text-sm text-slate-500">{filtered.length} series available</p>
            )}
          </div>
          <Link to="/free-mock" className="text-sm font-semibold text-brand-600 hover:underline">
            Try a free mock first →
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <TestSeriesCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="font-medium text-slate-700">No series match this filter</p>
            <button type="button" onClick={() => setFilterAndUrl('all')} className="btn-secondary btn-sm mt-4">
              Show all
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <TestSeriesCard key={s.id} series={s} />
            ))}
          </div>
        )}

        <p className="mt-14 text-center text-sm text-slate-500">
          Already enrolled?{' '}
          <Link to="/student-login" className="font-semibold text-brand-600 hover:underline">
            Log in to your dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}
