/** PRD-aligned hand-drawn doodles — brand blue, wobbly strokes */
const stroke = {
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  fill: 'none',
};

export function DoodleStar({ className = 'h-16 w-16 text-brand-300' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden {...stroke}>
      <path d="M32 6 L38 24 L56 26 L42 38 L46 56 L32 46 L18 56 L22 38 L8 26 L26 24 Z" />
    </svg>
  );
}

export function DoodleBook({ className = 'h-16 w-16 text-brand-400' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden {...stroke}>
      <path d="M12 14 C12 14 20 10 32 10 C44 10 52 14 52 14 V50 C52 50 44 46 32 46 C20 46 12 50 12 50 Z" />
      <path d="M32 10 V46" />
      <path d="M20 22 H28 M36 22 H44 M20 30 H28" />
    </svg>
  );
}

export function DoodlePencil({ className = 'h-14 w-14 text-brand-500' }) {
  return (
    <svg className={className} viewBox="0 0 56 56" aria-hidden {...stroke}>
      <path d="M10 46 L38 18 L46 26 L18 54 Z" />
      <path d="M38 18 L42 14 M46 26 L50 22" />
      <path d="M10 46 L6 50 L10 54 Z" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

export function DoodleShield({ className = 'h-16 w-16 text-brand-600' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden {...stroke}>
      <path d="M32 6 L52 14 V30 C52 44 42 54 32 58 C22 54 12 44 12 30 V14 Z" />
      <path d="M24 32 L30 38 L42 26" />
    </svg>
  );
}

export function DoodleStudent({ className = 'h-20 w-20 text-brand-600' }) {
  return (
    <svg className={className} viewBox="0 0 80 80" aria-hidden {...stroke}>
      <circle cx="40" cy="22" r="12" />
      <path d="M40 34 C28 34 20 44 18 58 L28 56 C30 46 34 40 40 40 C46 40 50 46 52 56 L62 58 C60 44 52 34 40 34" />
      <path d="M30 50 L24 62 M50 50 L56 62" />
      <path d="M58 28 L64 24 M64 32 L70 28" />
    </svg>
  );
}

export function DoodleWave({ className = 'h-8 w-24 text-brand-200' }) {
  return (
    <svg className={className} viewBox="0 0 96 24" aria-hidden {...stroke}>
      <path d="M2 14 Q14 4 26 14 T50 14 T74 14 T94 14" />
    </svg>
  );
}

/** 16:9 banner doodle pattern for test series cards */
export function CardBannerDoodle({ examType = '' }) {
  const t = examType.toLowerCase();
  const bg = t.includes('jee') ? 'from-blue-500 to-blue-600'
    : t.includes('neet') ? 'from-emerald-500 to-emerald-600'
    : t.includes('ssc') ? 'from-orange-400 to-orange-500'
    : 'from-brand-500 to-brand-600';

  return (
    <div className={`relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br ${bg}`}>
      <svg className="absolute -right-2 -top-2 h-24 w-24 text-white/15" viewBox="0 0 80 80" aria-hidden {...stroke}>
        <circle cx="40" cy="40" r="28" strokeDasharray="4 6" />
      </svg>
      <svg className="absolute bottom-2 left-3 h-14 w-14 text-white/25" viewBox="0 0 56 56" aria-hidden {...stroke}>
        <rect x="10" y="12" width="36" height="28" rx="3" />
        <path d="M18 22 h20 M18 30 h14" />
      </svg>
      <DoodlePencil className="absolute bottom-3 right-4 h-10 w-10 text-white/30" />
    </div>
  );
}

export default function DoodleDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="animate-float absolute left-[6%] top-20">
        <DoodleStar className="h-14 w-14 text-brand-200 dark:text-brand-900/50" />
      </div>
      <div className="animate-float absolute right-[10%] top-28" style={{ animationDelay: '1s' }}>
        <DoodleBook className="h-12 w-12 text-brand-300/80 dark:text-brand-800/40" />
      </div>
      <div className="animate-float absolute bottom-24 left-[14%]" style={{ animationDelay: '2s' }}>
        <DoodlePencil className="h-11 w-11 text-brand-400/60 dark:text-brand-700/40" />
      </div>
      <div className="animate-float absolute bottom-32 right-[8%]" style={{ animationDelay: '0.5s' }}>
        <DoodleShield className="h-14 w-14 text-brand-200/90 dark:text-brand-800/30" />
      </div>
    </div>
  );
}
