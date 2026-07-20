const EXAM_BADGES = [
  { label: 'JEE', className: 'left-3 top-4' },
  { label: 'NEET', className: 'right-3 top-8' },
  { label: 'Foundation', className: 'left-4 bottom-6' },
];

/** Auth / marketing visual — students, not CBT mockup */
export default function HomeHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
        JEE · NEET · Foundation
      </p>

      <div className="relative">
        <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.18)]">
          <img
            src="/edvedum/student-hero.png"
            alt="EDVEDUM student preparing for JEE and NEET"
            className="aspect-[4/5] w-full object-cover object-top"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent"
            aria-hidden
          />
        </div>

        {EXAM_BADGES.map((badge) => (
          <span
            key={badge.label}
            className={`absolute ${badge.className} rounded-lg border border-white/80 bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700 shadow-md backdrop-blur-sm`}
          >
            {badge.label}
          </span>
        ))}
      </div>
    </div>
  );
}
