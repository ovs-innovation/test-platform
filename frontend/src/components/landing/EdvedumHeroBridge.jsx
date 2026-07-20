import { Link } from "react-router-dom";
import { ProgramDropdownGrid } from "./EdvedumProgramDropdowns.jsx";

export default function EdvedumHeroBridge() {
  return (
    <section className="relative z-20 -mt-14 px-4 pb-2 lg:-mt-16 lg:px-8">
      <div className="edvedum-section-wrap !px-0">
        <div className="rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_50px_-12px_rgba(15,23,42,0.18)]">
          {/* Announcement */}
          <div className="flex flex-col gap-3 overflow-hidden rounded-t-2xl border-b border-slate-100 bg-gradient-to-r from-[#f5f3ff] via-white to-[#eff6ff] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
            <div className="flex min-w-0 items-start gap-3 sm:items-center">
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#7c3aed] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.084 20.084 0 01-1.44-4.282m0 0A17.92 17.92 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m0 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772M15 6.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Latest
              </span>
              <p className="text-[13px] leading-snug text-slate-700 sm:text-[14px]">
                <span className="font-semibold text-slate-900">
                  NEET 2025 Test Series
                </span>{" "}
                now available — enroll before 15 July &amp; get{" "}
                <span className="font-semibold text-[#7c3aed]">20% off</span>.
              </p>
            </div>
            <Link
              to="/test-series"
              className="inline-flex shrink-0 items-center justify-center gap-1 rounded-lg border border-[#2563eb]/25 bg-[#2563eb]/5 px-4 py-2 text-[12px] font-semibold text-[#2563eb] transition hover:border-[#2563eb]/40 hover:bg-[#2563eb]/10 sm:text-[13px]"
            >
              View announcements
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Program dropdowns — overflow visible so menus aren't clipped */}
          <div className="relative overflow-visible px-5 py-6 sm:px-6 sm:py-7">
            <ProgramDropdownGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
