import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: 'fyxpnmdh',
  api_key: '716642519429436',
  api_secret: '69WgGypmzKl34WdRC_OLaKiaBRU',
});

const SVG_HEADER = (w = 640, h = 420) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.08"/>
    </filter>
    <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0f172a"/>
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb"/>
    </marker>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626"/>
    </marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#16a34a"/>
    </marker>
  </defs>
`;

// Q17: Four forces on axes
function createQ17Svg() {
  return `
${SVG_HEADER(560, 420)}
  <rect x="0" y="0" width="560" height="40" fill="#f8fafc"/>
  <text x="280" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">FORCES ALONG COORDINATE AXES</text>
  <line x1="0" y1="40" x2="560" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(280, 230)">
    <!-- Axes -->
    <line x1="-200" y1="0" x2="200" y2="0" stroke="#94a3b8" stroke-width="1.5"/>
    <line x1="0" y1="-170" x2="0" y2="150" stroke="#94a3b8" stroke-width="1.5"/>

    <!-- F1 = 8 N j (Up) -->
    <line x1="0" y1="0" x2="0" y2="-120" stroke="#2563eb" stroke-width="3.5" marker-end="url(#arrow-blue)"/>
    <rect x="15" y="-135" width="90" height="30" rx="5" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="60" y="-115" text-anchor="middle" font-size="13" font-weight="800" fill="#1d4ed8">F₁ = 8 N ĵ</text>

    <!-- F2 = 10 N i (Right) -->
    <line x1="0" y1="0" x2="150" y2="0" stroke="#16a34a" stroke-width="3.5" marker-end="url(#arrow-green)"/>
    <rect x="100" y="-38" width="95" height="30" rx="5" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="147" y="-18" text-anchor="middle" font-size="13" font-weight="800" fill="#15803d">F₂ = 10 N î</text>

    <!-- F3 = -6 N i (Left) -->
    <line x1="0" y1="0" x2="-100" y2="0" stroke="#dc2626" stroke-width="3.5" marker-end="url(#arrow-red)"/>
    <rect x="-185" y="-38" width="95" height="30" rx="5" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="-138" y="-18" text-anchor="middle" font-size="13" font-weight="800" fill="#b91c1c">F₃ = -6 N î</text>

    <!-- F4 = -5 N j (Down) -->
    <line x1="0" y1="0" x2="0" y2="90" stroke="#ea580c" stroke-width="3.5" marker-end="url(#arrow)"/>
    <rect x="15" y="75" width="90" height="30" rx="5" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="60" y="95" text-anchor="middle" font-size="13" font-weight="800" fill="#c2410c">F₄ = -5 N ĵ</text>

    <!-- Origin -->
    <circle cx="0" cy="0" r="5" fill="#0f172a"/>
  </g>
</svg>`;
}

// Q29: Triangle of vectors (A, B, C)
function createQ29Svg() {
  return `
${SVG_HEADER(540, 380)}
  <rect x="0" y="0" width="540" height="40" fill="#f8fafc"/>
  <text x="270" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">TRIANGLE LAW OF VECTORS</text>
  <line x1="0" y1="40" x2="540" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(70, 70)">
    <!-- Base Vector A (left to right) -->
    <line x1="40" y1="240" x2="360" y2="240" stroke="#2563eb" stroke-width="4" marker-end="url(#arrow-blue)"/>
    <text x="200" y="265" text-anchor="middle" font-size="16" font-weight="800" fill="#1d4ed8">A⃗</text>

    <!-- Vector B (right base up to apex) -->
    <line x1="360" y1="240" x2="200" y2="40" stroke="#dc2626" stroke-width="4" marker-end="url(#arrow-red)"/>
    <text x="295" y="130" text-anchor="middle" font-size="16" font-weight="800" fill="#b91c1c">B⃗</text>

    <!-- Vector C (apex back to left base) -->
    <line x1="200" y1="40" x2="40" y2="240" stroke="#16a34a" stroke-width="4" marker-end="url(#arrow-green)"/>
    <text x="105" y="130" text-anchor="middle" font-size="16" font-weight="800" fill="#15803d">C⃗</text>
  </g>

  <!-- Footer Equation -->
  <rect x="20" y="325" width="500" height="40" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="270" y="350" text-anchor="middle" font-size="14" font-weight="700" fill="#0f172a">Cyclic Order: A⃗ + B⃗ + C⃗ = 0⃗</text>
</svg>`;
}

// Q30: Vector Triangle Arrangements Matching
function createQ30Svg() {
  return `
${SVG_HEADER(640, 440)}
  <rect x="0" y="0" width="640" height="40" fill="#f8fafc"/>
  <text x="320" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">MATCHING: TRIANGLE VECTOR RELATIONS</text>
  <line x1="0" y1="40" x2="640" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <!-- Panel (i): C - A - B = 0 -> C = A + B -->
  <g transform="translate(40, 60)">
    <rect x="0" y="0" width="260" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="15" y="22" font-size="12" font-weight="800" fill="#0f172a">Diagram (i):</text>
    <line x1="30" y1="120" x2="160" y2="120" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
    <text x="95" y="138" font-size="12" font-weight="700" fill="#2563eb">A⃗</text>
    <line x1="160" y1="120" x2="220" y2="50" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)"/>
    <text x="200" y="90" font-size="12" font-weight="700" fill="#dc2626">B⃗</text>
    <line x1="30" y1="120" x2="220" y2="50" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrow-green)"/>
    <text x="110" y="70" font-size="12" font-weight="700" fill="#16a34a">C⃗</text>
    <text x="170" y="25" font-size="11" font-weight="700" fill="#0369a1">C⃗ = A⃗ + B⃗</text>
  </g>

  <!-- Panel (ii): A - C - B = 0 -> A = B + C -->
  <g transform="translate(340, 60)">
    <rect x="0" y="0" width="260" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="15" y="22" font-size="12" font-weight="800" fill="#0f172a">Diagram (ii):</text>
    <line x1="30" y1="120" x2="220" y2="120" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
    <text x="125" y="138" font-size="12" font-weight="700" fill="#2563eb">A⃗</text>
    <line x1="30" y1="120" x2="140" y2="50" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrow-green)"/>
    <text x="75" y="75" font-size="12" font-weight="700" fill="#16a34a">C⃗</text>
    <line x1="140" y1="50" x2="220" y2="120" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)"/>
    <text x="190" y="80" font-size="12" font-weight="700" fill="#dc2626">B⃗</text>
    <text x="170" y="25" font-size="11" font-weight="700" fill="#0369a1">A⃗ = B⃗ + C⃗</text>
  </g>

  <!-- Panel (iii): B - A - C = 0 -> B = A + C -->
  <g transform="translate(40, 230)">
    <rect x="0" y="0" width="260" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="15" y="22" font-size="12" font-weight="800" fill="#0f172a">Diagram (iii):</text>
    <line x1="30" y1="120" x2="160" y2="120" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
    <text x="95" y="138" font-size="12" font-weight="700" fill="#2563eb">A⃗</text>
    <line x1="160" y1="120" x2="220" y2="40" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrow-green)"/>
    <text x="200" y="80" font-size="12" font-weight="700" fill="#16a34a">C⃗</text>
    <line x1="30" y1="120" x2="220" y2="40" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)"/>
    <text x="110" y="70" font-size="12" font-weight="700" fill="#dc2626">B⃗</text>
    <text x="170" y="25" font-size="11" font-weight="700" fill="#0369a1">B⃗ = A⃗ + C⃗</text>
  </g>

  <!-- Panel (iv): A + B = -C -> A + B + C = 0 -->
  <g transform="translate(340, 230)">
    <rect x="0" y="0" width="260" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="15" y="22" font-size="12" font-weight="800" fill="#0f172a">Diagram (iv):</text>
    <line x1="30" y1="120" x2="160" y2="120" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
    <text x="95" y="138" font-size="12" font-weight="700" fill="#2563eb">A⃗</text>
    <line x1="160" y1="120" x2="220" y2="50" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)"/>
    <text x="200" y="90" font-size="12" font-weight="700" fill="#dc2626">B⃗</text>
    <line x1="220" y1="50" x2="30" y2="120" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrow-green)"/>
    <text x="110" y="70" font-size="12" font-weight="700" fill="#16a34a">C⃗</text>
    <text x="160" y="25" font-size="11" font-weight="700" fill="#0369a1">A⃗ + B⃗ + C⃗ = 0⃗</text>
  </g>

  <rect x="20" y="395" width="600" height="35" rx="5" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="320" y="418" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Matching: a - iv, b - iii, c - i, d - ii</text>
</svg>`;
}

// Q40: Two forces F1 = 5 N, F2 = 5 N at 60 deg
function createQ40Svg() {
  return `
${SVG_HEADER(540, 360)}
  <rect x="0" y="0" width="540" height="40" fill="#f8fafc"/>
  <text x="270" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">RESULTANT OF TWO EQUAL FORCES AT 60°</text>
  <line x1="0" y1="40" x2="540" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(140, 240)">
    <!-- Base Force F1 = 5 N (horizontal) -->
    <line x1="0" y1="0" x2="220" y2="0" stroke="#2563eb" stroke-width="4" marker-end="url(#arrow-blue)"/>
    <text x="110" y="25" text-anchor="middle" font-size="15" font-weight="800" fill="#1d4ed8">F₁ = 5 N</text>

    <!-- Force F2 = 5 N at 60 deg (rotated up) -->
    <!-- cos 60 = 0.5, sin 60 = 0.866. 220 * 0.5 = 110, 220 * 0.866 = 190.5 -->
    <line x1="0" y1="0" x2="110" y2="-190" stroke="#dc2626" stroke-width="4" marker-end="url(#arrow-red)"/>
    <text x="40" y="-115" text-anchor="middle" font-size="15" font-weight="800" fill="#b91c1c">F₂ = 5 N</text>

    <!-- Angle arc 60 deg -->
    <path d="M 50 0 A 50 50 0 0 0 25 -43" fill="none" stroke="#0f172a" stroke-width="2"/>
    <text x="50" y="-20" font-size="14" font-weight="700" fill="#0f172a">θ = 60°</text>

    <!-- Resultant Parallelogram dashed lines -->
    <line x1="220" y1="0" x2="330" y2="-190" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>
    <line x1="110" y1="-190" x2="330" y2="-190" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>
    <line x1="0" y1="0" x2="330" y2="-190" stroke="#16a34a" stroke-width="3" stroke-dasharray="6,4" marker-end="url(#arrow-green)"/>
    <text x="210" y="-110" font-size="14" font-weight="800" fill="#15803d">F_net = 5√3 N</text>
  </g>
</svg>`;
}

// Q50: Three forces at 120 deg (F1=2F, F2=2F, F3=F)
function createQ50Svg() {
  return `
${SVG_HEADER(560, 420)}
  <rect x="0" y="0" width="560" height="40" fill="#f8fafc"/>
  <text x="280" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">THREE COPLANAR FORCES AT 120°</text>
  <line x1="0" y1="40" x2="560" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(280, 230)">
    <!-- Force F2 = 2F (vertically up, 90 deg) -->
    <line x1="0" y1="0" x2="0" y2="-140" stroke="#2563eb" stroke-width="4" marker-end="url(#arrow-blue)"/>
    <text x="15" y="-115" font-size="15" font-weight="800" fill="#1d4ed8">F₂ = 2F</text>

    <!-- Force F1 = 2F (at 120 deg from F2: 210 deg or down-left) -->
    <!-- cos 210 = -0.866, sin 210 = -0.5 -> x = -140 * 0.866 = -121, y = 140 * 0.5 = 70 -->
    <line x1="0" y1="0" x2="-121" y2="70" stroke="#dc2626" stroke-width="4" marker-end="url(#arrow-red)"/>
    <text x="-150" y="60" font-size="15" font-weight="800" fill="#b91c1c">F₁ = 2F</text>

    <!-- Force F3 = F (at 120 deg from F2: 330 deg or down-right, magnitude half) -->
    <!-- 70 * 0.866 = 61, 70 * 0.5 = 35 -->
    <line x1="0" y1="0" x2="70" y2="40" stroke="#16a34a" stroke-width="3" marker-end="url(#arrow-green)"/>
    <text x="85" y="45" font-size="15" font-weight="800" fill="#15803d">F₃ = F</text>

    <!-- Angle arcs -->
    <path d="M 0 -50 A 50 50 0 0 0 -43 25" fill="none" stroke="#64748b" stroke-width="1.5"/>
    <text x="-40" y="-20" font-size="12" font-weight="700" fill="#475569">120°</text>

    <path d="M 0 -50 A 50 50 0 0 1 43 25" fill="none" stroke="#64748b" stroke-width="1.5"/>
    <text x="25" y="-20" font-size="12" font-weight="700" fill="#475569">120°</text>

    <circle cx="0" cy="0" r="6" fill="#0f172a"/>
  </g>
</svg>`;
}

// Q51: Three forces on axes (4N at 30 deg, 1N at 60 deg, 2N)
function createQ51Svg() {
  return `
${SVG_HEADER(560, 420)}
  <rect x="0" y="0" width="560" height="40" fill="#f8fafc"/>
  <text x="280" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">FORCES ON OBJECT (RESULTANT ALONG Y-AXIS)</text>
  <line x1="0" y1="40" x2="560" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(280, 230)">
    <!-- Axes -->
    <line x1="-180" y1="0" x2="180" y2="0" stroke="#cbd5e1" stroke-width="1.5"/>
    <line x1="0" y1="-170" x2="0" y2="150" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="170" y="-10" font-size="12" fill="#64748b">x</text>
    <text x="10" y="-155" font-size="12" fill="#64748b">y</text>

    <!-- Force 4N at 30 deg to y-axis in 2nd quadrant (120 deg) -->
    <!-- x = -130 * sin 30 = -65, y = -130 * cos 30 = -112.5 -->
    <line x1="0" y1="0" x2="-65" y2="-113" stroke="#2563eb" stroke-width="3.5" marker-end="url(#arrow-blue)"/>
    <text x="-95" y="-115" font-size="14" font-weight="800" fill="#1d4ed8">4 N</text>
    <path d="M 0 -45 A 45 45 0 0 0 -22.5 -39" fill="none" stroke="#2563eb" stroke-width="1.5"/>
    <text x="-25" y="-55" font-size="11" font-weight="700" fill="#2563eb">30°</text>

    <!-- Force 1N at 60 deg to y-axis in 1st quadrant (30 deg to x-axis) -->
    <!-- x = 70 * sin 60 = 60.6, y = -70 * cos 60 = -35 -->
    <line x1="0" y1="0" x2="61" y2="-35" stroke="#16a34a" stroke-width="3" marker-end="url(#arrow-green)"/>
    <text x="75" y="-35" font-size="14" font-weight="800" fill="#15803d">1 N</text>
    <path d="M 0 -40 A 40 40 0 0 1 34.6 -20" fill="none" stroke="#16a34a" stroke-width="1.5"/>
    <text x="20" y="-45" font-size="11" font-weight="700" fill="#15803d">60°</text>

    <!-- Force 2N along negative y-axis -->
    <line x1="0" y1="0" x2="0" y2="90" stroke="#dc2626" stroke-width="3.5" marker-end="url(#arrow-red)"/>
    <text x="15" y="80" font-size="14" font-weight="800" fill="#b91c1c">2 N</text>

    <circle cx="0" cy="0" r="5" fill="#0f172a"/>
  </g>
</svg>`;
}

// Q53: Path ABCD displacement (A to D)
function createQ53Svg() {
  return `
${SVG_HEADER(560, 420)}
  <rect x="0" y="0" width="560" height="40" fill="#f8fafc"/>
  <text x="280" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">PARTICLE DISPLACEMENT PATH ABCD</text>
  <line x1="0" y1="40" x2="560" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(100, 290)">
    <!-- Step 1: A to B (3m East) -->
    <line x1="0" y1="0" x2="100" y2="0" stroke="#2563eb" stroke-width="4" marker-end="url(#arrow-blue)"/>
    <circle cx="0" cy="0" r="6" fill="#0f172a"/>
    <text x="-15" y="5" font-size="14" font-weight="800" fill="#0f172a">A</text>
    <text x="50" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#2563eb">3 m</text>
    <circle cx="100" cy="0" r="5" fill="#0f172a"/>
    <text x="110" y="15" font-size="14" font-weight="800" fill="#0f172a">B</text>

    <!-- Step 2: B to C (4m North) -->
    <line x1="100" y1="0" x2="100" y2="-120" stroke="#16a34a" stroke-width="4" marker-end="url(#arrow-green)"/>
    <text x="125" y="-60" text-anchor="middle" font-size="13" font-weight="700" fill="#16a34a">4 m</text>
    <circle cx="100" cy="-120" r="5" fill="#0f172a"/>
    <text x="80" y="-120" font-size="14" font-weight="800" fill="#0f172a">C</text>

    <!-- Step 3: C to D (5m at 37 deg to horizontal) -->
    <!-- 150 * cos 37 = 120, 150 * sin 37 = 90 -->
    <line x1="100" y1="-120" x2="220" y2="-210" stroke="#ea580c" stroke-width="4" marker-end="url(#arrow)"/>
    <text x="145" y="-180" font-size="13" font-weight="700" fill="#ea580c">5 m</text>
    <line x1="100" y1="-120" x2="180" y2="-120" stroke="#94a3b8" stroke-dasharray="3,3" stroke-width="1.5"/>
    <path d="M 140 -120 A 40 40 0 0 0 132 -144" fill="none" stroke="#ea580c" stroke-width="1.5"/>
    <text x="150" y="-128" font-size="11" font-weight="700" fill="#ea580c">37°</text>
    <circle cx="220" cy="-210" r="6" fill="#0f172a"/>
    <text x="235" y="-210" font-size="15" font-weight="800" fill="#0f172a">D</text>

    <!-- Net displacement vector A to D -->
    <line x1="0" y1="0" x2="220" y2="-210" stroke="#dc2626" stroke-width="3" stroke-dasharray="6,4" marker-end="url(#arrow-red)"/>
    <text x="80" y="-120" font-size="14" font-weight="800" fill="#dc2626">Net = 7√2 m</text>
  </g>
</svg>`;
}

// Q54: Six vectors polygon
function createQ54Svg() {
  return `
${SVG_HEADER(540, 380)}
  <rect x="0" y="0" width="540" height="40" fill="#f8fafc"/>
  <text x="270" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">VECTOR POLYGON RELATIONS</text>
  <line x1="0" y1="40" x2="540" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(100, 60)">
    <!-- Vector a (left side up) -->
    <line x1="80" y1="200" x2="80" y2="70" stroke="#2563eb" stroke-width="3" marker-end="url(#arrow-blue)"/>
    <text x="60" y="135" font-size="15" font-weight="800" fill="#2563eb">a⃗</text>

    <!-- Vector b (up-right) -->
    <line x1="80" y1="70" x2="190" y2="40" stroke="#16a34a" stroke-width="3" marker-end="url(#arrow-green)"/>
    <text x="135" y="45" font-size="15" font-weight="800" fill="#16a34a">b⃗</text>

    <!-- Vector c (right) -->
    <line x1="190" y1="40" x2="290" y2="40" stroke="#ea580c" stroke-width="3" marker-end="url(#arrow)"/>
    <text x="240" y="30" font-size="15" font-weight="800" fill="#ea580c">c⃗</text>

    <!-- Vector f (diagonal: closing d + e) -->
    <line x1="190" y1="40" x2="260" y2="200" stroke="#dc2626" stroke-width="3.5" marker-end="url(#arrow-red)"/>
    <text x="240" y="120" font-size="16" font-weight="800" fill="#dc2626">f⃗</text>

    <!-- Vector d & e forming path -->
    <line x1="190" y1="40" x2="140" y2="150" stroke="#7c3aed" stroke-width="3" marker-end="url(#arrow)"/>
    <text x="150" y="105" font-size="14" font-weight="800" fill="#7c3aed">d⃗</text>

    <line x1="140" y1="150" x2="260" y2="200" stroke="#0891b2" stroke-width="3" marker-end="url(#arrow)"/>
    <text x="195" y="195" font-size="14" font-weight="800" fill="#0891b2">e⃗</text>
  </g>

  <!-- Formula -->
  <rect x="20" y="325" width="500" height="35" rx="5" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="270" y="348" text-anchor="middle" font-size="14" font-weight="700" fill="#0f172a">Correct Vector Addition: d⃗ + e⃗ = f⃗</text>
</svg>`;
}

// Q60: Vectors OA, OB, OC in circular quadrant
function createQ60Svg() {
  return `
${SVG_HEADER(540, 420)}
  <rect x="0" y="0" width="540" height="40" fill="#f8fafc"/>
  <text x="270" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">VECTORS OA, OB, OC IN CIRCLE OF RADIUS R</text>
  <line x1="0" y1="40" x2="540" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(140, 310)">
    <!-- Quadrant Arc of radius 200 -->
    <path d="M 0 -200 A 200 200 0 0 1 200 0" fill="none" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="2"/>
    <line x1="0" y1="0" x2="220" y2="0" stroke="#cbd5e1" stroke-width="1.5"/>
    <line x1="0" y1="0" x2="0" y2="-220" stroke="#cbd5e1" stroke-width="1.5"/>

    <!-- Vector OA (horizontal along +x) -->
    <line x1="0" y1="0" x2="200" y2="0" stroke="#2563eb" stroke-width="4" marker-end="url(#arrow-blue)"/>
    <text x="215" y="5" font-size="15" font-weight="800" fill="#2563eb">A</text>
    <text x="100" y="20" font-size="13" font-weight="700" fill="#2563eb">OA = R</text>

    <!-- Vector OC (vertical along +y) -->
    <line x1="0" y1="0" x2="0" y2="-200" stroke="#16a34a" stroke-width="4" marker-end="url(#arrow-green)"/>
    <text x="-5" y="-210" font-size="15" font-weight="800" fill="#16a34a">C</text>
    <text x="-40" y="-100" font-size="13" font-weight="700" fill="#16a34a">OC = R</text>

    <!-- Vector OB (at 45 deg between OA and OC) -->
    <!-- 200 * cos 45 = 141.4 -->
    <line x1="0" y1="0" x2="141" y2="-141" stroke="#dc2626" stroke-width="4" marker-end="url(#arrow-red)"/>
    <text x="155" y="-150" font-size="15" font-weight="800" fill="#dc2626">B</text>

    <!-- Angle arcs -->
    <text x="60" y="-35" font-size="12" font-weight="700" fill="#0f172a">45°</text>
    <text x="25" y="-70" font-size="12" font-weight="700" fill="#0f172a">45°</text>

    <circle cx="0" cy="0" r="5" fill="#0f172a"/>
    <text x="-15" y="15" font-size="14" font-weight="800" fill="#0f172a">O</text>
  </g>
</svg>`;
}

// Q103: Lami's theorem hanging weight
function createQ103Svg() {
  return `
${SVG_HEADER(540, 420)}
  <rect x="0" y="0" width="540" height="40" fill="#f8fafc"/>
  <text x="270" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">EQUILIBRIUM AT POINT O (LAMI'S THEOREM)</text>
  <line x1="0" y1="40" x2="540" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(200, 80)">
    <!-- Ceiling -->
    <line x1="-30" y1="0" x2="120" y2="0" stroke="#0f172a" stroke-width="4"/>
    <!-- Point A on ceiling -->
    <circle cx="20" cy="0" r="4" fill="#0f172a"/>
    <text x="15" y="-10" font-size="14" font-weight="800" fill="#0f172a">A</text>

    <!-- Vertical reference dashed line from A -->
    <line x1="20" y1="0" x2="20" y2="150" stroke="#94a3b8" stroke-dasharray="3,3" stroke-width="1.5"/>

    <!-- String OA to junction O (30 deg to vertical) -->
    <!-- length 150 -> x = 20 + 150 * sin 30 = 95, y = 150 * cos 30 = 130 -->
    <line x1="20" y1="0" x2="95" y2="130" stroke="#2563eb" stroke-width="3"/>
    <text x="40" y="70" font-size="13" font-weight="800" fill="#2563eb">T₁</text>
    <path d="M 20 40 A 40 40 0 0 0 38 35" fill="none" stroke="#0f172a" stroke-width="1.5"/>
    <text x="28" y="55" font-size="11" font-weight="700" fill="#0f172a">30°</text>

    <!-- Point O (Junction) -->
    <circle cx="95" cy="130" r="6" fill="#0f172a"/>
    <text x="105" y="125" font-size="15" font-weight="800" fill="#0f172a">O</text>

    <!-- Horizontal cord 30N (to right) -->
    <line x1="95" y1="130" x2="210" y2="130" stroke="#16a34a" stroke-width="3" marker-end="url(#arrow-green)"/>
    <text x="160" y="120" font-size="14" font-weight="800" fill="#15803d">30 N</text>

    <!-- Hanging weight W (downward) -->
    <line x1="95" y1="130" x2="95" y2="210" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)"/>
    <rect x="75" y="210" width="40" height="35" rx="4" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
    <text x="95" y="233" text-anchor="middle" font-size="14" font-weight="800" fill="#b91c1c">W</text>
  </g>
</svg>`;
}

// Q104: Equilibrium F1, F2, F3 at 45 deg
function createQ104Svg() {
  return `
${SVG_HEADER(540, 400)}
  <rect x="0" y="0" width="540" height="40" fill="#f8fafc"/>
  <text x="270" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">EQUILIBRIUM OF THREE FORCES (F₁ + F₂ + F₃ = 0)</text>
  <line x1="0" y1="40" x2="540" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(240, 220)">
    <!-- Axes -->
    <line x1="-160" y1="0" x2="180" y2="0" stroke="#cbd5e1" stroke-width="1.5"/>
    <line x1="0" y1="-150" x2="0" y2="140" stroke="#cbd5e1" stroke-width="1.5"/>

    <!-- Force F1 = 50 N along +x -->
    <line x1="0" y1="0" x2="140" y2="0" stroke="#2563eb" stroke-width="3.5" marker-end="url(#arrow-blue)"/>
    <text x="90" y="-12" font-size="14" font-weight="800" fill="#2563eb">F₁ = 50 N</text>

    <!-- Force F2 = 50 N along -y (downward) -->
    <line x1="0" y1="0" x2="0" y2="120" stroke="#16a34a" stroke-width="3.5" marker-end="url(#arrow-green)"/>
    <text x="12" y="90" font-size="14" font-weight="800" fill="#16a34a">F₂ = 50 N</text>

    <!-- Force F3 in 2nd quadrant at 45 deg to equilibrate -->
    <!-- (-100, -100) -->
    <line x1="0" y1="0" x2="-100" y2="-100" stroke="#dc2626" stroke-width="4" marker-end="url(#arrow-red)"/>
    <text x="-135" y="-110" font-size="15" font-weight="800" fill="#b91c1c">F₃ = ?</text>
    <path d="M -40 0 A 40 40 0 0 1 -28 -28" fill="none" stroke="#dc2626" stroke-width="1.5"/>
    <text x="-50" y="-15" font-size="12" font-weight="700" fill="#b91c1c">45°</text>

    <circle cx="0" cy="0" r="5" fill="#0f172a"/>
  </g>
</svg>`;
}

export const PHYSICS_VECTOR_DIAGRAMS = [
  { qNum: 17, filename: 'q17_forces_axes.png', svgFn: createQ17Svg },
  { qNum: 29, filename: 'q29_triangle_vectors.png', svgFn: createQ29Svg },
  { qNum: 30, filename: 'q30_match_triangles.png', svgFn: createQ30Svg },
  { qNum: 40, filename: 'q40_forces_60deg.png', svgFn: createQ40Svg },
  { qNum: 50, filename: 'q50_forces_120deg.png', svgFn: createQ50Svg },
  { qNum: 51, filename: 'q51_three_forces.png', svgFn: createQ51Svg },
  { qNum: 53, filename: 'q53_displacement_abcd.png', svgFn: createQ53Svg },
  { qNum: 54, filename: 'q54_polygon_vectors.png', svgFn: createQ54Svg },
  { qNum: 60, filename: 'q60_vectors_circle.png', svgFn: createQ60Svg },
  { qNum: 103, filename: 'q103_lami_theorem.png', svgFn: createQ103Svg },
  { qNum: 104, filename: 'q104_equilibrium_forces.png', svgFn: createQ104Svg },
];

export async function generateAndUploadPhysicsVectorDiagrams() {
  console.log('=== GENERATING & UPLOADING PHYSICS VECTOR DIAGRAMS ===\n');
  const results = {};

  const localBackendDir = path.resolve(__dirname, '../uploads/physics_vector');
  const localFrontendDir = path.resolve(__dirname, '../../frontend/public/uploads/physics_vector');
  fs.mkdirSync(localBackendDir, { recursive: true });
  fs.mkdirSync(localFrontendDir, { recursive: true });

  for (const item of PHYSICS_VECTOR_DIAGRAMS) {
    console.log(`Processing Q${item.qNum} (${item.filename})...`);

    // 1. Render SVG
    const svgContent = item.svgFn();

    // 2. High-res rasterization via Sharp (300 DPI)
    const pngBuffer = await sharp(Buffer.from(svgContent), { density: 300 })
      .png({ quality: 100, compressionLevel: 9 })
      .toBuffer();

    // 3. Save locally
    const bPath = path.join(localBackendDir, item.filename);
    const fPath = path.join(localFrontendDir, item.filename);
    fs.writeFileSync(bPath, pngBuffer);
    fs.writeFileSync(fPath, pngBuffer);

    // 4. Upload to Cloudinary
    const publicId = path.parse(item.filename).name;
    const uploadRes = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'edvedum_physics/vector',
          public_id: publicId,
          overwrite: true,
          resource_type: 'image',
        },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
      stream.end(pngBuffer);
    });

    results[item.qNum] = uploadRes.secure_url;
    console.log(`  Cloudinary URL: ${uploadRes.secure_url}`);
  }

  console.log('\n=== ALL PHYSICS VECTOR DIAGRAMS UPLOADED SUCCESSFULLY ===');
  return results;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateAndUploadPhysicsVectorDiagrams().catch(console.error);
}

