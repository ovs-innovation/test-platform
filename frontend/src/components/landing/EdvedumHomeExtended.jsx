import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TestSeriesCard from '../public/TestSeriesCard.jsx';
import TestSeriesCardSkeleton from '../public/TestSeriesCardSkeleton.jsx';
import { EdvedumSectionHeader } from '../edvedum/EdvedumPlatformUI.jsx';
import { publicService } from '../../lib/services.js';

const STEPS = [
  { title: 'Create account', desc: 'Register with your email. No payment required to explore.' },
  { title: 'Enroll in a series', desc: 'Choose JEE, NEET or Foundation based on your class and exam.' },
  { title: 'Attempt the mock', desc: 'Full-screen CBT with section timer and question palette.' },
  { title: 'Review performance', desc: 'Score, rank, solutions and subject-wise breakdown.' },
];

const MINI_FAQ = [
  {
    q: 'Does the interface match NTA CBT?',
    a: 'Yes. Navigation, timer, palette colours, mark-for-review and submit flow follow the NTA pattern.',
  },
  {
    q: 'Can I attempt a free mock first?',
    a: 'Yes. Use the free diagnostic mock before purchasing a full test series.',
  },
  {
    q: 'How is rank calculated?',
    a: 'Rank is based on all students who completed the same mock within the active attempt window.',
  },
];

export function EdvedumHowItWorks() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="edvedum-section-wrap">
        <EdvedumSectionHeader
          eyebrow="Process"
          title="How it works"
          description="Four steps from registration to your first performance report."
        />
        <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-9 hidden h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent lg:block"
            aria-hidden
          />
          {STEPS.map((step, i) => (
            <li key={step.title} className="edvedum-step-card">
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-sm font-bold text-white shadow-md shadow-blue-500/30">
                {i + 1}
              </span>
              <h3 className="mt-4 text-[15px] font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function EdvedumFeaturedSeries() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicService.testSeries()
      .then((d) => setSeries((d.test_series || []).slice(0, 6)))
      .catch(() => setSeries([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="edvedum-page-bg border-y border-slate-200/80 py-16 lg:py-20">
      <div className="edvedum-section-wrap">
        <EdvedumSectionHeader
          eyebrow="Enroll now"
          title="Popular test series"
          description="Series currently open for enrollment."
          action={(
            <Link to="/test-series" className="edvedum-btn-outline shrink-0">
              View all
            </Link>
          )}
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <TestSeriesCardSkeleton key={i} />)
            : series.map((s) => <TestSeriesCard key={s.id} series={s} />)}
        </div>
        {!loading && series.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-500">No test series published yet.</p>
        )}
      </div>
    </section>
  );
}

export function EdvedumMiniFaq() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="edvedum-section-wrap max-w-3xl">
        <EdvedumSectionHeader
          eyebrow="Support"
          title="Common questions"
          description={(
            <>
              Visit{' '}
              <Link to="/faqs" className="font-medium text-[#2563eb] hover:underline">Customer Care</Link>
              {' '}or{' '}
              <Link to="/contact" className="font-medium text-[#2563eb] hover:underline">contact us</Link>
              {' '}for account and payment help.
            </>
          )}
        />
        <div className="space-y-3">
          {MINI_FAQ.map((f) => (
            <details key={f.q} className="group rounded-xl border border-slate-200 bg-white open:border-[#2563eb]/25">
              <summary className="cursor-pointer list-none px-5 py-4 text-[14px] font-medium text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-lg font-light text-slate-400 transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="border-t border-slate-100 px-5 py-4 text-[14px] leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
