const EXAM_BADGES = [
  { label: 'JEE', className: 'left-3 top-4 bg-gradient-to-r from-[#0D6EFD] to-[#2563eb] text-white border border-blue-300/60 shadow-lg shadow-blue-500/35 font-extrabold' },
  { label: 'NEET', className: 'right-3 top-8 bg-gradient-to-r from-[#00F0FF] via-[#06b6d4] to-[#0891b2] text-slate-950 border border-cyan-200/90 shadow-xl shadow-cyan-500/40 font-extrabold' },
  { label: 'Foundation', className: 'left-4 bottom-6 bg-gradient-to-r from-[#7C3AED] to-purple-700 text-white border border-purple-300/60 shadow-lg shadow-purple-500/35 font-extrabold' },
];

/** Auth / marketing visual — students, not CBT mockup */
export default function HomeHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#94A3B8]">
        JEE · NEET · Foundation
      </p>

      <div className="relative">
        <div className="overflow-hidden rounded-2xl border border-slate-700/80 shadow-2xl shadow-slate-950/60">
          <img
            src="/edvedum/student-hero.png"
            alt="EDVEDUM student preparing for JEE and NEET"
            className="aspect-[4/5] w-full object-cover object-top"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#010d1f]/60 via-transparent to-transparent"
            aria-hidden
          />
        </div>

        {EXAM_BADGES.map((badge) => (
          <span
            key={badge.label}
            className={`absolute ${badge.className} rounded-lg border px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-md`}
          >
            {badge.label}
          </span>
        ))}
      </div>
    </div>
  );
}
