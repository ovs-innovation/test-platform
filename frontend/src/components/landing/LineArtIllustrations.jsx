/**
 * Open-doodle / unDraw-style line art — thick strokes, white fills, single brand accent.
 * CBT-themed scenes (not generic HR/resume).
 */

const INK = '#0F172A';
const ACCENT = '#2563EB';
const WASH = '#DBEAFE';

function Line({ d, strokeWidth = 2.5, fill = 'none' }) {
  return (
    <path
      d={d}
      stroke={INK}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill}
    />
  );
}

/** Student presenting a mock test paper — hero & marketing */
export function HeroLineArt({ className = 'w-full max-w-md' }) {
  return (
    <svg className={className} viewBox="0 0 420 360" fill="none" aria-hidden>
      <circle cx="255" cy="195" r="130" fill={WASH} fillOpacity="0.55" />

      {/* floating test paper */}
      <g transform="translate(48, 72)">
        <path
          d="M8 12 C8 8 12 4 20 4 H108 C116 4 120 8 120 12 V196 C120 204 116 208 108 208 H20 C12 208 8 204 8 196 Z"
          fill="white"
          stroke={INK}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M8 20 C4 24 4 28 8 32" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <path d="M120 188 C124 184 124 180 120 176" stroke={INK} strokeWidth="2" strokeLinecap="round" />

        {/* accent badge — score */}
        <circle cx="32" cy="36" r="18" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeWidth="2" />
        <text x="32" y="41" textAnchor="middle" fill={ACCENT} fontSize="13" fontWeight="700" fontFamily="Inter, sans-serif">92</text>

        <Line d="M58 32 H100" strokeWidth="2" />
        <Line d="M24 58 H104" strokeWidth="2" />
        <Line d="M24 74 H96" strokeWidth="2" />
        <Line d="M24 90 H88" strokeWidth="2" />
        <Line d="M24 114 H104" strokeWidth="2" />
        <Line d="M24 130 H80" strokeWidth="2" />

        {/* mini palette grid */}
        <rect x="24" y="148" width="10" height="10" rx="1" fill="#22C55E" stroke={INK} strokeWidth="1.2" />
        <rect x="38" y="148" width="10" height="10" rx="1" fill="#22C55E" stroke={INK} strokeWidth="1.2" />
        <rect x="52" y="148" width="10" height="10" rx="1" fill={ACCENT} stroke={INK} strokeWidth="1.2" />
        <rect x="66" y="148" width="10" height="10" rx="1" fill="#F59E0B" stroke={INK} strokeWidth="1.2" />
        <rect x="80" y="148" width="10" height="10" rx="1" fill="#E2E8F0" stroke={INK} strokeWidth="1.2" />
      </g>

      {/* student */}
      <g transform="translate(195, 88)">
        {/* hair */}
        <path
          d="M72 8 C58 4 42 10 36 24 C32 34 34 48 40 56 C44 42 54 36 68 36 C82 36 94 44 98 58 C104 48 106 32 100 22 C94 10 84 4 72 8 Z"
          fill={INK}
          stroke={INK}
          strokeWidth="1"
        />
        {/* face */}
        <ellipse cx="68" cy="62" rx="28" ry="30" fill="white" stroke={INK} strokeWidth="2.5" />
        {/* glasses */}
        <circle cx="56" cy="60" r="10" fill="none" stroke={INK} strokeWidth="2.5" />
        <circle cx="80" cy="60" r="10" fill="none" stroke={INK} strokeWidth="2.5" />
        <path d="M66 60 H70" stroke={INK} strokeWidth="2.5" />
        <path d="M46 58 C48 52 52 50 56 52" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <path d="M90 58 C88 52 84 50 80 52" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        {/* smile */}
        <path d="M58 74 Q68 82 78 74" stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* body */}
        <path
          d="M38 98 C42 92 52 88 68 88 C84 88 94 92 98 98 L108 168 C108 176 100 180 68 180 C36 180 28 176 28 168 Z"
          fill="white"
          stroke={INK}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* arm pointing */}
        <path
          d="M38 108 C20 100 8 88 4 72"
          stroke={INK}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M98 112 C112 108 122 98 128 86"
          stroke={INK}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* legs */}
        <path d="M48 180 L44 228" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M88 180 L92 228" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M36 228 H56 M84 228 H104" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* small doodle sparkles */}
      <path d="M340 80 L344 92 L356 96 L344 100 L340 112 L336 100 L324 96 L336 92 Z" stroke={ACCENT} strokeWidth="1.8" fill="none" opacity="0.6" />
      <path d="M368 200 L370 206 L376 208 L370 210 L368 216 L366 210 L360 208 L366 206 Z" stroke={INK} strokeWidth="1.5" fill="none" opacity="0.35" />
    </svg>
  );
}

/** Compact version for auth sidebar */
export function AuthLineArt({ className = 'w-full max-w-xs' }) {
  return (
    <svg className={className} viewBox="0 0 280 240" fill="none" aria-hidden>
      <circle cx="155" cy="125" r="85" fill={WASH} fillOpacity="0.5" />
      <g transform="translate(24, 40) scale(0.72)">
        <path d="M8 12 C8 8 12 4 20 4 H108 C116 4 120 8 120 12 V160 C120 168 116 172 108 172 H20 C12 172 8 168 8 160 Z" fill="white" stroke={INK} strokeWidth="2.5" />
        <circle cx="32" cy="32" r="14" fill={ACCENT} fillOpacity="0.15" stroke={ACCENT} strokeWidth="2" />
        <path d="M26 33 L30 37 L38 29" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Line d="M54 28 H96" strokeWidth="2" />
        <Line d="M24 52 H100" strokeWidth="2" />
        <Line d="M24 68 H88" strokeWidth="2" />
        <Line d="M24 92 H96" strokeWidth="2" />
      </g>
      <g transform="translate(118, 52) scale(0.65)">
        <path d="M72 8 C58 4 42 10 36 24 C32 34 34 48 40 56 C44 42 54 36 68 36 C82 36 94 44 98 58 C104 48 106 32 100 22 C94 10 84 4 72 8 Z" fill={INK} />
        <ellipse cx="68" cy="62" rx="28" ry="30" fill="white" stroke={INK} strokeWidth="2.5" />
        <circle cx="56" cy="60" r="10" fill="none" stroke={INK} strokeWidth="2.5" />
        <circle cx="80" cy="60" r="10" fill="none" stroke={INK} strokeWidth="2.5" />
        <path d="M66 60 H70" stroke={INK} strokeWidth="2.5" />
        <path d="M58 74 Q68 82 78 74" stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M38 98 C42 92 52 88 68 88 C84 88 94 92 98 98 L108 150 L28 150 L38 98 Z" fill="white" stroke={INK} strokeWidth="2.5" />
        <path d="M38 108 C18 98 6 84 2 70" stroke={INK} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

/** Mini banner for test series cards */
export function CardLineArt({ className = 'h-full w-full' }) {
  return (
    <svg className={className} viewBox="0 0 320 180" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="320" height="180" fill="#F8FAFC" />
      <circle cx="250" cy="95" r="70" fill={WASH} fillOpacity="0.6" />
      <g transform="translate(28, 28) scale(0.55)">
        <path d="M8 12 H108 V140 H20 C12 140 8 136 8 128 Z" fill="white" stroke={INK} strokeWidth="2.5" />
        <circle cx="30" cy="30" r="12" fill={ACCENT} fillOpacity="0.2" stroke={ACCENT} strokeWidth="2" />
        <Line d="M50 26 H90" strokeWidth="2" />
        <Line d="M20 50 H88" strokeWidth="2" />
        <Line d="M20 66 H76" strokeWidth="2" />
      </g>
      <g transform="translate(130, 20) scale(0.5)">
        <ellipse cx="50" cy="48" rx="22" ry="24" fill="white" stroke={INK} strokeWidth="2.5" />
        <circle cx="42" cy="46" r="7" fill="none" stroke={INK} strokeWidth="2" />
        <circle cx="58" cy="46" r="7" fill="none" stroke={INK} strokeWidth="2" />
        <path d="M30 72 L70 72 L64 110 L36 110 Z" fill="white" stroke={INK} strokeWidth="2.5" />
      </g>
    </svg>
  );
}

/** Empty state — no tests */
export function EmptyLineArt({ className = 'mx-auto h-36 w-36' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden>
      <circle cx="105" cy="105" r="75" fill="#1e293b" fillOpacity="0.8" />
      <g transform="translate(20, 36) scale(0.55)">
        <path d="M8 12 H108 V150 H20 C12 150 8 146 8 138 Z" fill="#0b1430" stroke="#3b82f6" strokeWidth="2.5" />
        <path d="M24 40 H88" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 56 H80" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 72 H72" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 100 L52 112 L76 88" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform="translate(88, 58) scale(0.45)">
        <ellipse cx="50" cy="44" rx="20" ry="22" fill="#070c18" stroke="#60a5fa" strokeWidth="2.5" />
        <path d="M34 68 L66 68 L62 98 L38 98 Z" fill="#070c18" stroke="#60a5fa" strokeWidth="2.5" />
        <path d="M42 52 Q50 58 58 52" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

/** Security section accent */
export function SecurityLineArt({ className = 'w-full max-w-sm' }) {
  return (
    <svg className={className} viewBox="0 0 300 260" fill="none" aria-hidden>
      <circle cx="155" cy="135" r="95" fill={WASH} fillOpacity="0.45" />
      <path
        d="M150 50 L210 72 V128 C210 168 182 198 150 210 C118 198 90 168 90 128 V72 Z"
        fill="white"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M128 132 L148 152 L178 118" stroke={ACCENT} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(36, 100)">
        <rect x="0" y="0" width="56" height="72" rx="4" fill="white" stroke={INK} strokeWidth="2" />
        <Line d="M10 14 H46" strokeWidth="1.8" />
        <Line d="M10 26 H38" strokeWidth="1.8" />
        <circle cx="28" cy="48" r="10" fill={ACCENT} fillOpacity="0.15" stroke={ACCENT} strokeWidth="1.8" />
      </g>
    </svg>
  );
}
