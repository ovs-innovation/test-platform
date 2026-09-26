import { useEffect, useState, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { publicService } from '../../lib/services.js';
import { ErrorState } from '../../components/ui.jsx';
import TestSeriesCard from '../../components/public/TestSeriesCard.jsx';
import TestSeriesCardSkeleton from '../../components/public/TestSeriesCardSkeleton.jsx';
import CatalogHero from '../../components/public/CatalogHero.jsx';
import { isNeetUg } from '../../lib/testSeriesCover.js';

const FILTERS = [
  { id: 'all', label: 'All series' },
  { id: 'neet', label: 'NEET' },
  { id: 'jee', label: 'JEE' },
  { id: 'free', label: 'Free' },
  { id: 'featured', label: 'Featured' },
];

export const CLASS_FILTERS = [
  { id: 'all', label: 'All Classes' },
  { id: 'passed-12', label: 'Dropper / RM' },
  { id: '12', label: 'Class 12' },
  { id: '11', label: 'Class 11' },
];

export function normalizeClass(c) {
  if (!c) return 'all';
  const lower = c.toLowerCase().trim();
  if (lower === '11' || lower === 'class-11' || lower === 'class 11' || lower === 'xi') return '11';
  if (lower === '12' || lower === 'class-12' || lower === 'class 12' || lower === 'xii') return '12';
  if (
    lower === 'passed-12' ||
    lower === 'passed 12' ||
    lower === 'dropper' ||
    lower === 'droppers' ||
    lower === 'rm' ||
    lower === 'repeater' ||
    lower === 'repeaters' ||
    lower === '12+' ||
    lower === 'class-12+'
  ) {
    return 'passed-12';
  }
  return 'all';
}

export function matchesClass(series, targetClass) {
  const norm = normalizeClass(targetClass);
  if (norm === 'all') return true;

  const title = (series.title || '').toLowerCase();
  const slug = (series.slug || '').toLowerCase();
  const desc = (series.description || '').toLowerCase();
  const targetClassField = (series.target_class || '').toLowerCase();
  const programType = (series.program_type || '').toLowerCase();
  const targetYear = String(series.target_year || '').trim();
  const tags = Array.isArray(series.tags)
    ? series.tags.join(' ').toLowerCase()
    : typeof series.tags === 'string'
      ? series.tags.toLowerCase()
      : '';

  const allText = `${title} ${slug} ${desc} ${targetClassField} ${programType} ${tags} ${targetYear}`;

  const isTwoYearProgram = (
    programType.includes('two') ||
    /two[- ]?year|2[- ]?year/i.test(allText) ||
    targetYear === '2028' ||
    targetClassField.includes('xi &') ||
    targetClassField.includes('xi and') ||
    /classes?\s*(?:11|xi)\b/i.test(allText)
  );

  const isDedicatedDropperOrRm = (
    (targetClassField.includes('dropper') && !targetClassField.includes('xii') && !targetClassField.includes('12')) ||
    targetClassField.includes('rm') ||
    programType.includes('repeater') ||
    /rm[- ]personalised|\brm\b/i.test(slug) ||
    /\b(repeater|rm)\b/i.test(title)
  );

  if (norm === '11') {
    if (isDedicatedDropperOrRm) return false;
    return isTwoYearProgram;
  }

  if (norm === '12') {
    if (isTwoYearProgram) return false;
    if (isDedicatedDropperOrRm) return false;
    return (
      targetClassField.includes('12') ||
      targetClassField.includes('xii') ||
      tags.includes('class 12') ||
      /class\s*(?:12|xii)\b|one[- ]?year|1[- ]?year|2027|comprehensive|mock[- ]pack/i.test(allText)
    );
  }

  if (norm === 'passed-12') {
    if (isTwoYearProgram) return false;
    if (isDedicatedDropperOrRm) return true;
    if (targetClassField.includes('dropper') || targetClassField.includes('passed')) return true;
    return false;
  }

  return true;
}

export function getSeriesSortScore(s) {
  const text = `${s.exam_type || ''} ${s.title || ''}`;

  // 1. Exam score: NEET first (1), JEE second (2), Others (3)
  let examScore = 3;
  if (isNeetUg(text)) examScore = 1;
  else if (/jee/i.test(text)) examScore = 2;

  // 2. Class score: RM / Dropper first (1), Class 12 second (2), Two-Year / Class 11 third (3)
  let classScore = 2;
  if (matchesClass(s, 'passed-12')) classScore = 1;
  else if (matchesClass(s, '12')) classScore = 2;
  else if (matchesClass(s, '11')) classScore = 3;

  return examScore * 100 + classScore * 10;
}

const isFoundation = (s) => /foundation/i.test(`${s.exam_type || ''} ${s.title || ''}`);

export default function TestSeriesCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawFilter = (searchParams.get('filter') || '').toLowerCase();
  const initialFilter = FILTERS.some((f) => f.id === rawFilter) ? rawFilter : 'all';
  const initialClass = normalizeClass(searchParams.get('class'));

  const [list, setList] = useState([]);
  const [state, setState] = useState('loading');
  const [filter, setFilter] = useState(initialFilter);
  const [selectedClass, setSelectedClass] = useState(initialClass);
  const skipScrollRef = useRef(false);

  useEffect(() => {
    const qFilter = (searchParams.get('filter') || '').toLowerCase();
    const qClass = normalizeClass(searchParams.get('class'));
    const nextFilter = FILTERS.some((f) => f.id === qFilter) ? qFilter : 'all';

    if (skipScrollRef.current) {
      skipScrollRef.current = false;
      setFilter(nextFilter);
      setSelectedClass(qClass);
      return;
    }

    setFilter(nextFilter);
    setSelectedClass(qClass);

    if (qFilter !== 'all' || qClass !== 'all') {
      const timer = setTimeout(() => {
        const target = document.getElementById('catalog-results');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  useEffect(() => {
    publicService.testSeries()
      .then((d) => {
        const activeSeries = (d.test_series || []).filter((s) => !isFoundation(s));
        setList(activeSeries);
        setState('done');
      })
      .catch(() => setState('error'));
  }, []);

  const updateFilters = (newFilter, newClass) => {
    skipScrollRef.current = true;
    const f = newFilter !== undefined ? newFilter : filter;
    const c = newClass !== undefined ? newClass : selectedClass;

    setFilter(f);
    setSelectedClass(c);

    const params = {};
    if (f && f !== 'all') params.filter = f;
    if (c && c !== 'all') params.class = c;
    setSearchParams(params);
  };

  const setFilterAndUrl = (newFilter) => {
    updateFilters(newFilter, selectedClass);
  };

  const setClassAndUrl = (newClass) => {
    updateFilters(filter, newClass);
  };

  const resetAllFilters = () => {
    updateFilters('all', 'all');
  };

  const filtered = useMemo(() => {
    const result = list.filter((s) => {
      const text = `${s.exam_type || ''} ${s.title || ''}`;
      const isFree = Number(s.price) === 0;

      // 1. Strict Class filter check
      if (selectedClass !== 'all' && !matchesClass(s, selectedClass)) {
        return false;
      }

      // 2. Exam and special tab filter checks
      if (filter === 'free') return isFree;
      // For all other tabs (all, jee, neet, featured), include ONLY paid series
      if (isFree) return false;

      if (filter === 'jee') return /jee/i.test(text);
      if (filter === 'neet') return isNeetUg(text);
      if (filter === 'featured') return Boolean(s.is_featured);
      return true;
    });

    return result.sort((a, b) => {
      const scoreA = getSeriesSortScore(a);
      const scoreB = getSeriesSortScore(b);
      if (scoreA !== scoreB) return scoreA - scoreB;
      const orderA = a.display_order ?? 999;
      const orderB = b.display_order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return a.id - b.id;
    });
  }, [list, filter, selectedClass]);

  const filterCounts = useMemo(() => {
    const counts = {
      all: 0,
      free: 0,
      jee: 0,
      neet: 0,
      featured: 0,
    };
    list.forEach((s) => {
      // If a specific class is selected, show exam counts conforming to that class
      if (selectedClass !== 'all' && !matchesClass(s, selectedClass)) {
        return;
      }
      const text = `${s.exam_type || ''} ${s.title || ''}`;
      const isFree = Number(s.price) === 0;
      if (isFree) {
        counts.free++;
      } else {
        counts.all++;
        if (/jee/i.test(text)) counts.jee++;
        if (isNeetUg(text)) counts.neet++;
        if (s.is_featured) counts.featured++;
      }
    });
    return counts;
  }, [list, selectedClass]);

  const classCounts = useMemo(() => {
    const counts = {
      all: 0,
      '11': 0,
      '12': 0,
      'passed-12': 0,
    };
    list.forEach((s) => {
      const text = `${s.exam_type || ''} ${s.title || ''}`;
      const isFree = Number(s.price) === 0;

      let matchesExam = true;
      if (filter === 'free') matchesExam = isFree;
      else if (isFree) matchesExam = false;
      else if (filter === 'jee') matchesExam = /jee/i.test(text);
      else if (filter === 'neet') matchesExam = isNeetUg(text);
      else if (filter === 'featured') matchesExam = Boolean(s.is_featured);

      if (!matchesExam) return;

      counts.all++;
      if (matchesClass(s, '11')) counts['11']++;
      if (matchesClass(s, '12')) counts['12']++;
      if (matchesClass(s, 'passed-12')) counts['passed-12']++;
    });
    return counts;
  }, [list, filter]);

  if (state === 'error') {
    return (
      <div className="container-app py-16">
        <ErrorState />
      </div>
    );
  }

  const loading = state === 'loading';
  const filterLabel = FILTERS.find((f) => f.id === filter)?.label || 'All';
  const classObj = CLASS_FILTERS.find((c) => c.id === selectedClass);
  const classLabel = classObj?.label || 'All Classes';

  let dynamicTitle = 'All test series';
  if (filter !== 'all' && selectedClass !== 'all') {
    dynamicTitle = `${filterLabel} — ${classLabel} Series`;
  } else if (filter !== 'all') {
    dynamicTitle = `${filterLabel} series`;
  } else if (selectedClass !== 'all') {
    dynamicTitle = `${classLabel} series`;
  }

  return (
    <div className="bg-slate-50">
      <CatalogHero seriesCount={loading ? 0 : list.length} />

      {/* FILTER TAB BAR - Auto-scrolled target for filtered navbar links */}
      <div id="catalog-results" className="container-app relative z-20 -mt-10 sm:-mt-12 mb-8 pt-4">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200/90 bg-[#F5F6FA] p-3 sm:p-4 shadow-xl shadow-slate-200/60">
          {/* 1. Exam Category Selector */}
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

          {/* 2. Target Class Selector (Class 11, Class 12, Dropper/RM) */}
          <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-start sm:justify-center gap-1.5 sm:gap-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
              Class:
            </span>
            {CLASS_FILTERS.map((c) => {
              const isActive = selectedClass === c.id;
              const count = classCounts[c.id] ?? 0;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setClassAndUrl(c.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-900/20 scale-[1.02]'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span>{c.label}</span>
                  {!loading && (
                    <span
                      className={`inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-extrabold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
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

        {/* Active Filter Chips with Quick Remove */}
        {(filter !== 'all' || selectedClass !== 'all') && (
          <div className="mx-auto max-w-5xl mt-3 flex flex-wrap items-center gap-2 px-1">
            <span className="text-xs font-semibold text-slate-500">Active filters:</span>
            {filter !== 'all' && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200 shadow-2xs">
                <span>Exam: {filterLabel}</span>
                <button
                  type="button"
                  onClick={() => setFilterAndUrl('all')}
                  className="rounded-full p-0.5 hover:bg-blue-200 text-blue-600 transition"
                  title="Clear exam filter"
                >
                  ✕
                </button>
              </span>
            )}
            {selectedClass !== 'all' && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-200 shadow-2xs">
                <span>Class: {classLabel}</span>
                <button
                  type="button"
                  onClick={() => setClassAndUrl('all')}
                  className="rounded-full p-0.5 hover:bg-indigo-200 text-indigo-600 transition"
                  title="Clear class filter"
                >
                  ✕
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={resetAllFilters}
              className="text-xs font-semibold text-slate-500 hover:text-brand-600 underline ml-1 cursor-pointer transition"
            >
              Reset all
            </button>
          </div>
        )}
      </div>

      <div className="container-app pb-12 pt-2 lg:pb-16 lg:pt-4">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {dynamicTitle}
            </h2>
            {!loading && (
              <p className="mt-1 text-sm text-slate-500">
                {filtered.length} {filtered.length === 1 ? 'series' : 'series'} available
                {selectedClass !== 'all' && ` for ${classLabel}`}
              </p>
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
            <p className="text-base font-semibold text-slate-700">No test series match your selected filter</p>
            <p className="mt-1 text-xs text-slate-500">
              Try choosing another class or resetting filters to browse all tests.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              {selectedClass !== 'all' && (
                <button
                  type="button"
                  onClick={() => setClassAndUrl('all')}
                  className="rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 text-xs font-bold transition"
                >
                  Clear Class Filter
                </button>
              )}
              <button
                type="button"
                onClick={resetAllFilters}
                className="btn-primary btn-sm"
              >
                Show All Series
              </button>
            </div>
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

