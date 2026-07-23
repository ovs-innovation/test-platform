import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { testSeriesService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, EmptyState } from '../../components/ui.jsx';
import { getSeriesBannerImage, getTestSeriesCover } from '../../lib/testSeriesCover.js';

export default function MyTests() {
  const [enrollments, setEnrollments] = useState([]);
  const [state, setState] = useState('loading');

  useEffect(() => {
    testSeriesService.myEnrollments()
      .then((d) => { setEnrollments(d.enrollments); setState('done'); })
      .catch(() => setState('error'));
  }, []);

  if (state === 'loading') return <LoadingScreen />;
  if (state === 'error') return <ErrorState />;

  return (
    <div className="space-y-6 pb-12">
      <PageHeader title="My Test Series" subtitle="Purchased and enrolled test packs for JEE, NEET and Foundation." />
      
      {enrollments.length === 0 ? (
        <div className="space-y-6">
          <EmptyState
            title="No Test Series Enrolled Yet"
            message="Explore structured NTA CBT test series packages tailored for JEE Main, NEET UG, and Foundation exam tracks."
            action={
              <Link
                to="/test-series"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-6 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition hover:scale-105"
              >
                Browse Test Series Catalog →
              </Link>
            }
          />

          <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center justify-between">
              <span>🎯 Available Exam Preparation Tracks</span>
              <Link to="/test-series" className="text-xs text-[#60a5fa] hover:underline font-bold">
                View All Catalog →
              </Link>
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <Link
                to="/test-series"
                className="rounded-2xl border border-slate-800 bg-[#070c18] p-4 transition hover:border-blue-500/40 space-y-1.5"
              >
                <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-black text-cyan-300 border border-blue-400/30">
                  NEET UG MEDICAL
                </span>
                <p className="font-extrabold text-white text-sm">NCERT-Aligned Biology & Physics</p>
                <p className="text-[11px] text-slate-400">Full-length 720 marks NTA CBT Mocks with step solutions.</p>
              </Link>

              <Link
                to="/test-series"
                className="rounded-2xl border border-slate-800 bg-[#070c18] p-4 transition hover:border-blue-500/40 space-y-1.5"
              >
                <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-black text-indigo-300 border border-indigo-400/30">
                  JEE MAIN & ADVANCED
                </span>
                <p className="font-extrabold text-white text-sm">Physics, Chemistry & Maths CBT</p>
                <p className="text-[11px] text-slate-400">Numerical entry & MCQ chapter tests with rank prediction.</p>
              </Link>

              <Link
                to="/test-series"
                className="rounded-2xl border border-slate-800 bg-[#070c18] p-4 transition hover:border-blue-500/40 space-y-1.5"
              >
                <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-[10px] font-black text-purple-300 border border-purple-400/30">
                  FOUNDATION & OLYMPIAD
                </span>
                <p className="font-extrabold text-white text-sm">Class 9th & 10th Science & Math</p>
                <p className="text-[11px] text-slate-400">Conceptual mastery & mental ability diagnostic tests.</p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {enrollments.map((e) => (
            <Link
              key={e.id}
              to={`/my-tests/${e.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800/90 bg-[#0b1430] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/80 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              {/* Upper Side: Image Banner & Title */}
              <div className="relative aspect-[16/9.2] w-full overflow-hidden bg-slate-950">
                <img
                  src={getTestSeriesCover(e)}
                  alt={e.title}
                  className="h-full w-full object-cover object-[center_15%] transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Top-Left Category Badge */}
                <span className="absolute left-4 top-4 rounded-full border border-blue-400/40 bg-blue-500/25 px-3 py-0.5 text-[10px] font-black uppercase text-cyan-300 backdrop-blur-md shadow-md">
                  {e.exam_type || 'GENERAL'}
                </span>

                {/* Top-Right Enrolled Status Pill */}
                <span className="absolute right-4 top-4 rounded-full border border-emerald-400/40 bg-emerald-500/25 px-3 py-0.5 text-[10px] font-black uppercase text-emerald-300 backdrop-blur-md shadow-md">
                  Enrolled
                </span>

                {/* Banner Title */}
                <h2 className="absolute bottom-3 left-4 right-4 text-base font-black text-white leading-tight line-clamp-1 drop-shadow-md">
                  {e.title}
                </h2>
              </div>

              {/* Horizontal Line & Down Side: Distinct Footer Container */}
              <div className="p-5 flex items-center justify-between border-t border-slate-800/90 bg-[#060c1e] text-xs">
                <div>
                  <p className="font-extrabold text-slate-100 flex items-center gap-1.5">
                    <span>📚</span> {e.available_tests} {e.available_tests === 1 ? 'Test' : 'Tests'} Available
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-400">
                    Expires {new Date(e.expires_at).toLocaleDateString('en-GB')}
                  </p>
                </div>

                <span className="rounded-full bg-blue-600 group-hover:bg-blue-500 px-5 py-2 text-xs font-black text-white shadow-md shadow-blue-600/30 transition hover:scale-105">
                  Open →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
