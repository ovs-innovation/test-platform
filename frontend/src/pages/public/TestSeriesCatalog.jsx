import { useEffect, useState, useMemo } from 'react';
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
  { id: 'featured', label: 'Featured' },
];

export default function TestSeriesCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = FILTERS.some((f) => f.id === searchParams.get('filter'))
    ? searchParams.get('filter')
    : 'all';

  const [list, setList] = useState([]);
  const [state, setState] = useState('loading');
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    const q = searchParams.get('filter');
    if (q && FILTERS.some((f) => f.id === q)) setFilter(q);
  }, [searchParams]);

  useEffect(() => {
    publicService.testSeries()
      .then((d) => { setList(d.test_series); setState('done'); })
      .catch(() => setState('error'));
  }, []);

  const setFilterAndUrl = (id) => {
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
    if (filter === 'featured') return s.is_featured;
    return true;
  }), [list, filter]);

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

      <div className="container-app relative z-20 -mt-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-elevated sm:p-4">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterAndUrl(f.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  filter === f.id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
                }`}
              >
                {f.label}
                {f.id === 'all' && !loading && (
                  <span className={`ml-1.5 ${filter === f.id ? 'text-brand-200' : 'text-slate-400'}`}>
                    {list.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-app py-12 lg:py-16">
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
