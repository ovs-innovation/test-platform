import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { publicService } from '../../lib/services.js';
import { EXAM_NAV_ITEMS } from '../../lib/examNav.js';
import { isNeetPg, isNeetUg } from '../../lib/testSeriesCover.js';
import TestSeriesCard from '../../components/public/TestSeriesCard.jsx';
import { Skeleton } from '../../components/ui.jsx';

const STEPS = [
  'Create a free student account',
  'Enroll in the free mock',
  'Start the CBT from My Tests',
  'Submit and check rank + solutions',
];

function seriesMatchesExam(series, examId) {
  const text = `${series.exam_type || ''} ${series.title || ''}`;
  if (examId === 'jee') return /jee/i.test(text);
  if (examId === 'neet') return isNeetUg(text);
  if (examId === 'neetpg') return isNeetPg(text);
  return false;
}

export default function FreeMock() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  const examId = EXAM_NAV_ITEMS.some((e) => e.id === searchParams.get('exam'))
    ? searchParams.get('exam')
    : 'jee';

  const activeExam = EXAM_NAV_ITEMS.find((e) => e.id === examId) || EXAM_NAV_ITEMS[0];

  useEffect(() => {
    publicService
      .testSeries()
      .then((d) => setSeries(d.test_series || []))
      .catch(() => setSeries([]))
      .finally(() => setLoading(false));
  }, []);

  const freeForExam = useMemo(() => {
    const free = series.filter((s) => Number(s.price) === 0);
    const matched = free.filter((s) => seriesMatchesExam(s, examId));
    return matched.length > 0 ? matched : free;
  }, [series, examId]);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-emerald-700 text-white">
        <div className="container-app py-14 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-lg">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-200">₹0 · No payment</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">Free mock tests</h1>
              <p className="mt-4 text-emerald-100">
                Real NTA CBT — timer, palette, sections. Pick your exam below.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {EXAM_NAV_ITEMS.map((exam) => (
                <button
                  key={exam.id}
                  type="button"
                  onClick={() => setSearchParams({ exam: exam.id })}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    exam.id === examId
                      ? 'bg-white text-emerald-800 shadow-md'
                      : 'bg-emerald-600 text-white ring-1 ring-emerald-500 hover:bg-emerald-500'
                  }`}
                >
                  {exam.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container-app -mt-6 pb-16 pt-0">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold text-slate-900">{activeExam.label} — free mock</h2>
              <p className="mt-2 text-slate-600">
                Full computer-based test. Same screen you&apos;ll see on exam day.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {['NTA exam layout', 'Live countdown timer', 'Question palette', 'Rank after submit'].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-900">
                    <span className="text-emerald-600">✓</span>
                    {item}
                  </div>
                ))}
              </div>

              <ol className="mt-8 space-y-4 border-t border-slate-100 pt-8">
                {STEPS.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-sm text-slate-700">{step}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-100 pt-8">
                {!user ? (
                  <>
                    <Link to="/signup" className="btn-primary bg-emerald-600 hover:border-emerald-700 hover:bg-emerald-700">
                      Sign up free
                    </Link>
                    <Link to="/student-login" className="btn-secondary">
                      Log in
                    </Link>
                  </>
                ) : freeForExam[0] ? (
                  <>
                    <Link
                      to={`/test-series/${freeForExam[0].slug}`}
                      className="btn-primary bg-emerald-600 hover:border-emerald-700 hover:bg-emerald-700"
                    >
                      Enroll now
                    </Link>
                    <Link to="/my-tests" className="btn-secondary">
                      My Tests
                    </Link>
                  </>
                ) : (
                  <Link to={activeExam.catalogTo} className="btn-primary">
                    Browse {activeExam.label} series
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">Available mocks</p>
            {loading ? (
              <Skeleton className="h-72 w-full rounded-2xl" />
            ) : freeForExam.length > 0 ? (
              freeForExam.map((s) => <TestSeriesCard key={s.id} series={s} />)
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
                <p className="font-medium text-slate-800">No free {activeExam.label} mock yet</p>
                <p className="mt-2 text-sm text-slate-500">Try the diagnostic or paid series.</p>
                <div className="mt-4 flex flex-col gap-2">
                  <Link to="/test-series/free-diagnostic" className="btn-secondary btn-sm">
                    Free diagnostic
                  </Link>
                  <Link to={activeExam.catalogTo} className="text-sm font-semibold text-brand-600 hover:underline">
                    {activeExam.label} test series →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
