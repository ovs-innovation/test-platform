import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicService } from '../../lib/services.js';
import { Skeleton } from '../../components/ui.jsx';
import TestSeriesCard from '../../components/public/TestSeriesCard.jsx';
import TestSeriesCardSkeleton from '../../components/public/TestSeriesCardSkeleton.jsx';
import ExamCategoryGrid from '../../components/public/ExamCategoryGrid.jsx';
import HeroSection from '../../components/landing/HeroSection.jsx';
import WhyAssessPro from '../../components/landing/WhyAssessPro.jsx';
import HowItWorksSection from '../../components/landing/HowItWorksSection.jsx';

function HomeFaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicService.cmsList('faq')
      .then((list) => setFaqs(list.slice(0, 4)))
      .catch(() => setFaqs([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && faqs.length === 0) return null;

  return (
    <section className="bg-brand-50 py-20 lg:py-24">
      <div className="container-app grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-sm font-semibold text-brand-700">Help</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Questions before you enroll</h2>
          <p className="mt-4 text-slate-600">
            Quick answers about mocks, payments and the CBT interface.
          </p>
          <Link to="/faqs" className="btn-secondary mt-6 inline-flex">
            Full help centre
          </Link>
        </div>

        <div className="space-y-2">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))
          ) : (
            faqs.map((f) => (
              <details key={f.id} className="rounded-lg border border-brand-100 bg-white">
                <summary className="cursor-pointer px-4 py-3.5 text-sm font-medium text-slate-900">
                  {f.title}
                </summary>
                <p className="border-t border-brand-50 px-4 py-3 text-sm text-slate-600">{f.content}</p>
              </details>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicService.testSeries()
      .then((ts) => setSeries(ts.test_series))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const featured = series.some((s) => s.is_featured)
    ? series.filter((s) => s.is_featured)
    : series;

  return (
    <div>
      <HeroSection seriesCount={loading ? 0 : series.length} />

      <section className="bg-slate-900 py-20 text-white lg:py-24">
        <div className="container-app">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-sky-300">Exams</p>
              <h2 className="mt-1 text-3xl font-bold">Choose your target</h2>
              <p className="mt-2 text-slate-400">Engineering and medical entrances — full test series.</p>
            </div>
            <Link to="/test-series" className="text-sm font-semibold text-sky-300 hover:text-white">
              All series →
            </Link>
          </div>
          <div className="mt-10">
            {loading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-[4/3] w-full rounded-xl bg-slate-800" />
                ))}
              </div>
            ) : (
              <ExamCategoryGrid series={series} />
            )}
          </div>
        </div>
      </section>

      <WhyAssessPro />

      <section className="py-20 lg:py-24">
        <div className="container-app">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-brand-600">Catalog</p>
              <h2 className="mt-1 text-3xl font-bold text-slate-900">Popular test series</h2>
            </div>
            {!loading && series.length > 0 && (
              <Link to="/test-series" className="hidden text-sm font-semibold text-brand-600 hover:underline sm:inline">
                View all →
              </Link>
            )}
          </div>

          <div className="mt-8 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-[min(100%,300px)] shrink-0 snap-start">
                    <TestSeriesCardSkeleton />
                  </div>
                ))
              : featured.length === 0
                ? <p className="text-sm text-muted">No test series available yet.</p>
                : featured.slice(0, 8).map((s) => (
                    <div key={s.id} className="w-[min(100%,300px)] shrink-0 snap-start">
                      <TestSeriesCard series={s} />
                    </div>
                  ))}
          </div>
        </div>
      </section>

      <HowItWorksSection />
      <HomeFaqSection />

      <section className="bg-brand-600 py-20">
        <div className="container-app text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Know the screen before exam day
          </h2>
          <p className="mx-auto mt-4 max-w-md text-brand-100">
            Take one free NTA-style mock. See your rank. Then decide which series to buy.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/free-mock" className="rounded-lg bg-white px-7 py-3 text-sm font-semibold text-brand-700 shadow-sm hover:bg-brand-50">
              Start free mock
            </Link>
            <Link to="/signup" className="rounded-lg border border-white/40 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Create account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
