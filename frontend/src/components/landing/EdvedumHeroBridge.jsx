import { Link } from 'react-router-dom';
import { ProgramDropdownGrid } from './EdvedumProgramDropdowns.jsx';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function EdvedumHeroBridge() {
  return (
    <section className="relative z-20 mt-4 sm:mt-8 lg:-mt-16 px-4 pb-4 sm:pb-6 lg:px-8">
      <div className="max-w-[1480px] mx-auto">
        <div className="rounded-[24px] border border-slate-200/90 bg-white shadow-[0_20px_50px_-12px_rgba(15,23,42,0.14)] overflow-visible">
          
          {/* ANNOUNCEMENT BAR AT TOP */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 overflow-hidden rounded-t-[24px] border-b border-slate-100 bg-gradient-to-r from-[#f5f3ff] via-white to-[#eff6ff] px-4 py-3.5 sm:px-6 sm:py-5 min-h-[82px]">
            
            {/* LEFT: LATEST BADGE & TEXT */}
            <div className="flex min-w-0 items-start sm:items-center gap-2.5 sm:gap-3">
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#7c3aed] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-wider text-white shadow-sm shadow-purple-500/20 mt-0.5 sm:mt-0">
                <Sparkles className="h-3 w-3" />
                Latest
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                <span className="font-bold text-slate-900">
                  NEET & JEE 2026 Test Series
                </span>{' '}
                now live — enroll early &amp; get{' '}
                <span className="font-extrabold text-[#7c3aed]">20% off</span> on all full mocks.
              </p>
            </div>

            {/* RIGHT: VIEW ANNOUNCEMENTS BUTTON */}
            <Link
              to="/test-series"
              className="inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-2 text-xs font-bold text-blue-600 transition hover:border-blue-300 hover:bg-blue-100/60 shadow-xs"
            >
              <span>View announcements</span>
              <ArrowRight className="h-3.5 w-3.5 text-blue-600" />
            </Link>
          </div>

          {/* EXAM CATEGORY SELECTOR CARDS GRID */}
          <div className="relative overflow-visible p-4 sm:p-6 lg:p-7">
            <ProgramDropdownGrid />
          </div>
        </div>
      </div>
    </section>
  );
}

