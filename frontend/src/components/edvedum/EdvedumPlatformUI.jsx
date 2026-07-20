import { Link } from "react-router-dom";

export function EdvedumPlatformHero({
  badge,
  title,
  highlight,
  subtitle,
  stats = [],
  actions = [],
  showExamPreview = false,
  showStudentImage = false,
  studentImage = "/edvedum/student-hero.png",
  studentImageAlt = "EDVEDUM Academy student",
}) {
  return (
    <section className="relative overflow-hidden bg-[#010d1f]">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/edvedum/hero-bg.png')",
          backgroundPosition: "70% center",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#010d1f] via-[#010d1f]/92 to-[#010d1f]/75"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 85% 25%, rgba(124,58,237,0.35) 0%, transparent 60%), radial-gradient(ellipse 40% 35% at 5% 85%, rgba(37,99,235,0.3) 0%, transparent 55%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-16">
        <div>
          {badge && (
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-300">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                aria-hidden
              />
              {badge}
            </div>
          )}
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
            {title}
            {highlight && (
              <span className="mt-1 block text-transparent bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#a855f7] bg-clip-text">
                {highlight}
              </span>
            )}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/65">
              {subtitle}
            </p>
          )}

          {actions.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {actions.map((a, i) => (
                <Link
                  key={a.to + a.label}
                  to={a.to}
                  className={
                    i === 0
                      ? "edvedum-btn-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg"
                      : "rounded-full border border-white/25 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                  }
                >
                  {a.label}
                </Link>
              ))}
            </div>
          )}

          {stats.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-6 border-t border-white/10 pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold text-white">
                    {s.value}
                  </p>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-white/50">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {showExamPreview && !showStudentImage && (
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/15 to-purple-500/20 blur-xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/40 ring-1 ring-white/10">
              <img
                src={studentImage}
                alt={studentImageAlt}
                className="aspect-[16/10] w-full object-cover object-center"
              />
            </div>
            <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-widest text-cyan-400/80">
              Students preparing with EDVEDUM
            </p>
          </div>
        )}

        {showStudentImage && !showExamPreview && (
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-purple-500/15 to-indigo-500/20 blur-xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/40 ring-1 ring-white/10">
              <img
                src={studentImage}
                alt={studentImageAlt}
                className="aspect-[4/3] w-full object-cover object-top"
              />
            </div>
          </div>
        )}

        {showExamPreview && showStudentImage && (
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-2xl ring-1 ring-white/10">
              <img
                src={studentImage}
                alt={studentImageAlt}
                className="aspect-[16/10] w-full object-cover object-center"
              />
            </div>
          </div>
        )}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 text-[#f4f6f9]"
        aria-hidden
      >
        <svg viewBox="0 0 1440 48" fill="currentColor" className="block w-full">
          <path d="M0,24 C360,48 720,0 1440,28 L1440,48 L0,48 Z" />
        </svg>
      </div>
    </section>
  );
}

export function EdvedumSectionHeader({
  eyebrow,
  title,
  description,
  action,
  dark = false,
}) {
  return (
    <div
      className={`mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${dark ? "" : ""}`}
    >
      <div>
        {eyebrow && (
          <p
            className={`edvedum-section-eyebrow ${dark ? "text-cyan-400" : ""}`}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={`text-[1.65rem] font-bold tracking-tight lg:text-[1.85rem] ${dark ? "text-white" : "text-slate-900"}`}
        >
          {title}
        </h2>
        <div
          className={`edvedum-title-accent ${dark ? "from-cyan-400 to-blue-400" : ""}`}
          aria-hidden
        />
        {description && (
          <p
            className={`mt-3 max-w-xl text-[14px] leading-relaxed ${dark ? "text-white/65" : "text-slate-600"}`}
          >
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function EdvedumSectionTitle({ title, accent, sub }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-extrabold text-slate-900 lg:text-2xl">
        {title}
        {accent && <span className="text-[#7c3aed]"> {accent}</span>}
      </h2>
      {sub && <p className="mt-2 max-w-xl text-sm text-slate-500">{sub}</p>}
    </div>
  );
}

export function EdvedumFeatureCard({ icon, title, desc, to }) {
  const inner = (
    <>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[#1d4ed8]">
        {icon}
      </div>
      <h3 className="mt-4 text-[15px] font-semibold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
        {desc}
      </p>
      {to && (
        <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-[#1d4ed8]">
          View →
        </span>
      )}
    </>
  );

  const cls = "edvedum-card p-5 transition hover:border-slate-300";
  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  return <div className={cls}>{inner}</div>;
}

export function EdvedumCtaStrip({ title, desc, primary, secondary }) {
  return (
    <section className="edvedum-page-bg py-14 lg:py-16">
      <div className="edvedum-section-wrap">
        <div className="edvedum-cta-panel flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="edvedum-section-eyebrow text-cyan-400">Get started</p>
            <h2 className="mt-2 text-2xl font-bold text-white lg:text-[1.75rem]">
              {title}
            </h2>
            {desc && (
              <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-white/60">
                {desc}
              </p>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              to={primary.to}
              className="edvedum-btn-gradient rounded-lg px-6 py-2.5 text-sm font-semibold text-white shadow-lg"
            >
              {primary.label}
            </Link>
            {secondary && (
              <Link
                to={secondary.to}
                className="rounded-lg border border-white/25 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const ICONS = {
  cbt: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25",
  ai: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  rank: "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108 4.284 3.818 9.75 3.818s9.75-1.71 9.75-3.818V4.236",
  dash: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
};

export function PlatformIcon({ type }) {
  return (
    <svg
      className="h-6 w-6 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[type]} />
    </svg>
  );
}

export const PLATFORM_PILLARS = [
  {
    icon: "cbt",
    title: "NTA CBT Mocks",
    desc: "Real exam interface — timer, palette, sections & proctoring.",
    to: "/test-series",
  },
  {
    icon: "ai",
    title: "AI Analytics",
    desc: "Topic-wise weakness, speed vs accuracy & smart recommendations.",
    to: "/test-series",
  },
  {
    icon: "rank",
    title: "All India Rank",
    desc: "Compete nationally with detailed rank & percentile reports.",
    to: "/test-series",
  },
  {
    icon: "dash",
    title: "Live Dashboard",
    desc: "Track attempts, scores & progress in one student dashboard.",
    to: "/student-login",
  },
];
