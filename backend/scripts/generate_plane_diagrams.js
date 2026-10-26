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
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fyxpnmdh',
  api_key: process.env.CLOUDINARY_API_KEY || '716642519429436',
  api_secret: process.env.CLOUDINARY_API_SECRET || '69WgGypmzKl34WdRC_OLaKiaBRU',
});

const outDirBackend = path.resolve(__dirname, '../uploads/motion_in_plane');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/motion_in_plane');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

const SVG_HEADER = (w = 640, h = 340) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', Arial, sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2.2; }
    .grid { stroke: #e2e8f0; stroke-width: 1; stroke-dasharray: 4,4; }
    .plot-line { stroke: #2563eb; stroke-width: 3; fill: none; stroke-linejoin: round; stroke-linecap: round; }
    .plot-line-red { stroke: #dc2626; stroke-width: 2.5; fill: none; }
    .plot-line-amber { stroke: #d97706; stroke-width: 2.5; fill: none; }
    .axis-label { font-size: 15px; font-weight: bold; fill: #0f172a; }
    .tick-label { font-size: 13px; font-weight: 600; fill: #475569; text-anchor: middle; }
    .point { fill: #2563eb; stroke: #ffffff; stroke-width: 2; }
    .box-title { font-size: 14px; font-weight: bold; fill: #1e293b; }
    .option-tag { font-size: 14px; font-weight: bold; fill: #1e3a8a; }
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0f172a"/>
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb"/>
    </marker>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626"/>
    </marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#16a34a"/>
    </marker>
  </defs>
`;

export const DIAGRAMS = {
  // Q1: River-boat problem (40m width, 30m downstream, vr = 4 m/s)
  1: `
  ${SVG_HEADER(640, 320)}
    <!-- River banks -->
    <rect x="50" y="80" width="540" height="150" fill="#f0f9ff" stroke="none" />
    <line x1="50" y1="80" x2="590" y2="80" stroke="#0284c7" stroke-width="3" />
    <line x1="50" y1="230" x2="590" y2="230" stroke="#0284c7" stroke-width="3" />
    
    <!-- Flow arrows -->
    <line x1="160" y1="130" x2="230" y2="130" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow-blue)" />
    <line x1="320" y1="130" x2="390" y2="130" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow-blue)" />
    <line x1="220" y1="180" x2="290" y2="180" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow-blue)" />
    <text x="310" y="175" font-size="14" font-weight="bold" fill="#0284c7">River flow (v_r = 4 m/s) →</text>

    <!-- Point A & Point B -->
    <circle cx="200" cy="230" r="5" fill="#dc2626" />
    <text x="180" y="250" font-size="16" font-weight="bold" fill="#dc2626">A</text>
    
    <circle cx="380" cy="80" r="5" fill="#16a34a" />
    <text x="395" y="75" font-size="16" font-weight="bold" fill="#16a34a">B</text>

    <!-- Path AB -->
    <line x1="200" y1="230" x2="380" y2="80" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#arrow-blue)" />
    <text x="300" y="145" font-size="14" font-weight="bold" fill="#2563eb">Straight path to B</text>

    <!-- Dimensions -->
    <!-- Downstream distance 30m -->
    <line x1="200" y1="80" x2="200" y2="60" stroke="#64748b" stroke-width="1.5" />
    <line x1="380" y1="80" x2="380" y2="60" stroke="#64748b" stroke-width="1.5" />
    <line x1="200" y1="65" x2="380" y2="65" stroke="#64748b" stroke-width="1.5" />
    <text x="290" y="58" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">30 m</text>

    <!-- Vertical width 40m -->
    <line x1="200" y1="230" x2="200" y2="80" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
    <line x1="150" y1="80" x2="135" y2="80" stroke="#64748b" stroke-width="1.5" />
    <line x1="150" y1="230" x2="135" y2="230" stroke="#64748b" stroke-width="1.5" />
    <line x1="140" y1="80" x2="140" y2="230" stroke="#64748b" stroke-width="1.5" />
    <text x="125" y="160" font-size="14" font-weight="bold" fill="#475569" text-anchor="end">40 m</text>

    <text x="320" y="295" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">River-Boat Navigation to Reach Point B Directly</text>
  </svg>`,

  // Q6: Projectile motion arc with change in velocity = 2 m/s
  6: `
  ${SVG_HEADER(640, 320)}
    <!-- Ground with hatching -->
    <line x1="80" y1="240" x2="560" y2="240" class="axis" />
    ${Array.from({ length: 24 }).map((_, i) => `<line x1="${90 + i * 20}" y1="240" x2="${80 + i * 20}" y2="252" stroke="#64748b" stroke-width="1.5" />`).join('')}
    
    <!-- Parabolic path -->
    <path d="M 120 240 Q 320 60 520 240" stroke="#2563eb" stroke-width="3.5" fill="none" />

    <!-- Launch velocity -->
    <line x1="120" y1="240" x2="190" y2="170" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrow-green)" />
    <text x="145" y="175" font-size="14" font-weight="bold" fill="#16a34a">v_i</text>
    
    <!-- Landing velocity -->
    <line x1="520" y1="240" x2="590" y2="310" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)" />
    <text x="575" y="285" font-size="14" font-weight="bold" fill="#dc2626">v_f</text>

    <!-- Maximum height H -->
    <line x1="320" y1="240" x2="320" y2="105" stroke="#d97706" stroke-width="2" stroke-dasharray="4,4" />
    <circle cx="320" cy="105" r="4" fill="#d97706" />
    <text x="330" y="170" font-size="15" font-weight="bold" fill="#d97706">H_max</text>

    <!-- Change in velocity annotation -->
    <rect x="220" y="20" width="220" height="40" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="330" y="45" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">|Δv| = |v_f - v_i| = 2 m/s</text>

    <text x="320" y="295" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Projectile Trajectory and Maximum Height</text>
  </svg>`,

  // Q8: Clockwise circular motion on xy axes with point Q at 60 deg
  8: `
  ${SVG_HEADER(540, 400)}
    <!-- Axes -->
    <line x1="50" y1="200" x2="490" y2="200" class="axis" marker-end="url(#arrow)" />
    <line x1="270" y1="370" x2="270" y2="30" class="axis" marker-end="url(#arrow)" />
    <text x="495" y="205" class="axis-label">x</text>
    <text x="275" y="25" class="axis-label">y</text>

    <!-- Circle radius = 130px (representing R = 3m) -->
    <circle cx="270" cy="200" r="130" stroke="#0284c7" stroke-width="2.5" fill="none" stroke-dasharray="none" />
    <circle cx="270" cy="200" r="3" fill="#0f172a" />
    <text x="255" y="218" font-size="13" font-weight="bold" fill="#475569">O</text>

    <!-- Clockwise arrow along circle -->
    <path d="M 270 70 A 130 130 0 0 1 390 150" stroke="#2563eb" stroke-width="3" fill="none" marker-end="url(#arrow-blue)" />
    <text x="350" y="100" font-size="13" font-weight="bold" fill="#2563eb">ω = 2 rad/s</text>

    <!-- Point Q at 60 deg from +y axis: (270 + 130*sin(60°), 200 - 130*cos(60°)) = (270 + 112.6, 200 - 65) = (382.6, 135) -->
    <circle cx="383" cy="135" r="5" fill="#dc2626" />
    <text x="398" y="130" font-size="16" font-weight="bold" fill="#dc2626">Q</text>
    
    <!-- Radius line to Q -->
    <line x1="270" y1="200" x2="383" y2="135" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4,4" />
    
    <!-- 60 deg arc from +y axis -->
    <path d="M 270 150 A 50 50 0 0 1 313 175" stroke="#d97706" stroke-width="1.8" fill="none" />
    <text x="295" y="150" font-size="13" font-weight="bold" fill="#d97706">60°</text>

    <!-- Acceleration vector towards O -->
    <line x1="383" y1="135" x2="326" y2="167" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)" />
    <text x="360" y="175" font-size="13" font-weight="bold" fill="#dc2626">a_c</text>

    <text x="270" y="385" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Uniform Circular Motion: R = 3 m, Clockwise</text>
  </svg>`,

  // Q9: Average acceleration between P and Q (60 deg arc)
  9: `
  ${SVG_HEADER(540, 360)}
    <!-- Center O and Circle -->
    <circle cx="270" cy="180" r="120" stroke="#0284c7" stroke-width="2.5" fill="none" />
    <circle cx="270" cy="180" r="3" fill="#0f172a" />
    <text x="255" y="185" font-size="14" font-weight="bold" fill="#475569">O</text>

    <!-- Point P at bottom (270, 300) -->
    <circle cx="270" cy="300" r="5" fill="#2563eb" />
    <text x="250" y="325" font-size="16" font-weight="bold" fill="#2563eb">P</text>
    <!-- Velocity at P: to right 4 m/s -->
    <line x1="270" y1="300" x2="340" y2="300" stroke="#2563eb" stroke-width="3" marker-end="url(#arrow-blue)" />
    <text x="345" y="305" font-size="13" font-weight="bold" fill="#2563eb">4 m/s</text>

    <!-- Point Q: 60 deg arc anticlockwise from P -> at (270 + 120*sin(60°), 180 + 120*cos(60°)) = (270 + 104, 180 + 60) = (374, 240) -->
    <circle cx="374" cy="240" r="5" fill="#dc2626" />
    <text x="390" y="245" font-size="16" font-weight="bold" fill="#dc2626">Q</text>
    <!-- Velocity at Q tangent: angle 30° above horizontal -->
    <line x1="374" y1="240" x2="415" y2="180" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)" />
    <text x="420" y="195" font-size="13" font-weight="bold" fill="#dc2626">4 m/s</text>

    <!-- Angle 60° at center -->
    <line x1="270" y1="180" x2="270" y2="300" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,4" />
    <line x1="270" y1="180" x2="374" y2="240" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,4" />
    <path d="M 270 230 A 50 50 0 0 1 313 205" stroke="#d97706" stroke-width="2" fill="none" />
    <text x="290" y="240" font-size="14" font-weight="bold" fill="#d97706">60°</text>

    <text x="180" y="200" font-size="14" font-weight="bold" fill="#475569">R = 2 m</text>
    <text x="270" y="345" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Average Acceleration Between P and Q (v = 4 m/s)</text>
  </svg>`,

  // Q11: Chords of vertical circle (OA chord at angle α, OB vertical diameter)
  11: `
  ${SVG_HEADER(500, 420)}
    <!-- Vertical circle -->
    <circle cx="250" cy="210" r="150" stroke="#0284c7" stroke-width="2.5" fill="none" />
    
    <!-- Top point O -->
    <circle cx="250" cy="60" r="5" fill="#0f172a" />
    <text x="245" y="45" font-size="16" font-weight="bold" fill="#0f172a">O</text>

    <!-- Bottom point B (vertical diameter OB) -->
    <circle cx="250" cy="360" r="5" fill="#0f172a" />
    <text x="245" y="385" font-size="16" font-weight="bold" fill="#0f172a">B</text>
    <!-- Vertical Diameter OB line -->
    <line x1="250" y1="60" x2="250" y2="360" stroke="#0f172a" stroke-width="2.5" />
    <text x="260" y="210" font-size="14" font-weight="bold" fill="#2563eb">Particle 2 (OB)</text>

    <!-- Point A on chord OA: let α = 45°, length = 2R*cos(45°) = 300 * 0.707 = 212 px -->
    <!-- (250 - 212*sin(45°), 60 + 212*cos(45°)) = (250 - 150, 60 + 150) = (100, 210) -->
    <circle cx="100" cy="210" r="5" fill="#dc2626" />
    <text x="75" y="215" font-size="16" font-weight="bold" fill="#dc2626">A</text>
    <line x1="250" y1="60" x2="100" y2="210" stroke="#dc2626" stroke-width="2.5" />
    <text x="140" y="125" font-size="14" font-weight="bold" fill="#dc2626">Particle 1 (OA)</text>

    <!-- Angle alpha -->
    <path d="M 250 110 A 50 50 0 0 1 215 95" stroke="#d97706" stroke-width="2" fill="none" />
    <text x="220" y="120" font-size="14" font-weight="bold" fill="#d97706">α</text>

    <text x="250" y="405" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Particles Descending Along Frictionless Chords OA and OB</text>
  </svg>`,

  // Q25: Circular trajectory centered at origin with velocity -5.0 j m/s at (4,0)
  25: `
  ${SVG_HEADER(540, 360)}
    <!-- Axes -->
    <line x1="60" y1="180" x2="480" y2="180" class="axis" marker-end="url(#arrow)" />
    <line x1="250" y1="330" x2="250" y2="30" class="axis" marker-end="url(#arrow)" />
    <text x="485" y="185" class="axis-label">x</text>
    <text x="255" y="25" class="axis-label">y</text>
    <text x="235" y="198" font-size="13" font-weight="bold" fill="#475569">(0,0)</text>

    <!-- Circular path radius 120px (representing r = 4m) -->
    <circle cx="250" cy="180" r="120" stroke="#0284c7" stroke-width="2.5" fill="none" stroke-dasharray="4,4" />

    <!-- Point at (4, 0): (250 + 120, 180) = (370, 180) -->
    <circle cx="370" cy="180" r="5" fill="#dc2626" />
    <text x="350" y="168" font-size="14" font-weight="bold" fill="#0f172a">(4, 0)</text>

    <!-- Velocity vector downwards -5.0 j m/s -->
    <line x1="370" y1="180" x2="370" y2="270" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)" />
    <text x="380" y="235" font-size="14" font-weight="bold" fill="#dc2626">u = -5.0ĵ m/s</text>

    <!-- Acceleration towards center (radial) -->
    <line x1="370" y1="180" x2="290" y2="180" stroke="#2563eb" stroke-width="3" marker-end="url(#arrow-blue)" />
    <text x="315" y="165" font-size="14" font-weight="bold" fill="#2563eb">a_c</text>

    <text x="250" y="345" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Particle in Circular Trajectory at (4, 0) with Velocity -5.0ĵ m/s</text>
  </svg>`,

  // Q41: Staircase projectile with steps height h, width b, horizontal velocity u
  41: `
  ${SVG_HEADER(640, 340)}
    <!-- Staircase steps -->
    <path d="M 80 80 L 140 80 L 140 120 L 200 120 L 200 160 L 260 160 L 260 200 L 320 200 L 320 240 L 380 240 L 380 280 L 560 280" stroke="#0f172a" stroke-width="2.5" fill="#f8fafc" />

    <!-- Step dimensions h and b on second step -->
    <!-- width b -->
    <line x1="140" y1="110" x2="200" y2="110" stroke="#64748b" stroke-width="1.5" />
    <text x="170" y="105" font-size="13" font-weight="bold" fill="#475569" text-anchor="middle">b</text>
    <!-- height h -->
    <line x1="210" y1="120" x2="210" y2="160" stroke="#64748b" stroke-width="1.5" />
    <text x="220" y="145" font-size="13" font-weight="bold" fill="#475569">h</text>

    <!-- Ball at top step -->
    <circle cx="140" cy="72" r="8" fill="#dc2626" />
    <line x1="148" y1="72" x2="210" y2="72" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)" />
    <text x="215" y="76" font-size="14" font-weight="bold" fill="#dc2626">u</text>

    <!-- Parabolic path landing on n-th step (e.g. edge at x=380, y=240) -->
    <path d="M 140 72 Q 260 80 380 240" stroke="#2563eb" stroke-width="3" stroke-dasharray="6,4" fill="none" />
    <circle cx="380" cy="240" r="5" fill="#16a34a" />
    <text x="390" y="235" font-size="14" font-weight="bold" fill="#16a34a">n-th step edge</text>

    <!-- Dimension lines for x = nb, y = nh -->
    <line x1="140" y1="40" x2="380" y2="40" stroke="#2563eb" stroke-width="1.5" />
    <text x="260" y="32" font-size="13" font-weight="bold" fill="#2563eb" text-anchor="middle">x = nb</text>

    <text x="320" y="320" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Ball Rolling off Staircase with Velocity u</text>
  </svg>`,

  // Q46: Bullet aimed at height h above target 200m away
  46: `
  ${SVG_HEADER(640, 320)}
    <!-- Ground line -->
    <line x1="60" y1="240" x2="580" y2="240" class="axis" />
    ${Array.from({ length: 26 }).map((_, i) => `<line x1="${70 + i * 20}" y1="240" x2="${60 + i * 20}" y2="252" stroke="#64748b" stroke-width="1.5" />`).join('')}

    <!-- Gun at (100, 240) -->
    <circle cx="100" cy="240" r="6" fill="#0f172a" />
    <text x="75" y="230" font-size="13" font-weight="bold" fill="#0f172a">Gun</text>

    <!-- Target at (500, 240) -->
    <line x1="500" y1="240" x2="500" y2="100" stroke="#0f172a" stroke-width="2.5" />
    <rect x="495" y="225" width="10" height="15" fill="#dc2626" />
    <text x="515" y="235" font-size="14" font-weight="bold" fill="#dc2626">Target</text>

    <!-- Aiming line (straight dashed line to height h above target) -->
    <line x1="100" y1="240" x2="500" y2="100" stroke="#dc2626" stroke-width="2" stroke-dasharray="6,4" />
    <circle cx="500" cy="100" r="4" fill="#dc2626" />
    <text x="510" y="105" font-size="13" font-weight="bold" fill="#dc2626">Aim Point</text>

    <!-- Bullet parabolic trajectory from (100, 240) to target (500, 240) -->
    <path d="M 100 240 Q 300 170 500 240" stroke="#2563eb" stroke-width="3" fill="none" />
    <text x="300" y="185" font-size="13" font-weight="bold" fill="#2563eb" text-anchor="middle">Bullet Trajectory (u = 2000 m/s)</text>

    <!-- Height h dimension -->
    <line x1="540" y1="100" x2="540" y2="240" stroke="#64748b" stroke-width="1.5" />
    <line x1="530" y1="100" x2="550" y2="100" stroke="#64748b" stroke-width="1.5" />
    <line x1="530" y1="240" x2="550" y2="240" stroke="#64748b" stroke-width="1.5" />
    <text x="560" y="175" font-size="15" font-weight="bold" fill="#dc2626">h = ?</text>

    <!-- Distance 200m dimension -->
    <line x1="100" y1="265" x2="500" y2="265" stroke="#475569" stroke-width="1.5" />
    <text x="300" y="285" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">200 m</text>

    <text x="300" y="305" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Aiming Above Target to Compensate for Gravity</text>
  </svg>`,

  // Q59: 4 option graphs showing ellipses for x = 2 sin θ, y = 3 cos θ
  59: `
  ${SVG_HEADER(640, 340)}
    <!-- Panel 1: Vertical Ellipse (Option 1) -->
    <g transform="translate(20, 20)">
      <rect x="0" y="0" width="135" height="135" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
      <line x1="10" y1="67" x2="125" y2="67" stroke="#94a3b8" stroke-width="1.5" />
      <line x1="67" y1="125" x2="67" y2="10" stroke="#94a3b8" stroke-width="1.5" />
      <!-- Vertical ellipse: rx = 30 (x=2), ry = 48 (y=3) -->
      <ellipse cx="67" cy="67" rx="30" ry="48" stroke="#2563eb" stroke-width="2.5" fill="none" />
      <text x="97" y="62" font-size="11" font-weight="bold" fill="#0f172a">2</text>
      <text x="30" y="62" font-size="11" font-weight="bold" fill="#0f172a">-2</text>
      <text x="72" y="23" font-size="11" font-weight="bold" fill="#0f172a">3</text>
      <text x="72" y="122" font-size="11" font-weight="bold" fill="#0f172a">-3</text>
      <text x="67" y="152" class="option-tag" text-anchor="middle">(1)</text>
    </g>

    <!-- Panel 2: Horizontal Ellipse (Option 2) -->
    <g transform="translate(175, 20)">
      <rect x="0" y="0" width="135" height="135" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
      <line x1="10" y1="67" x2="125" y2="67" stroke="#94a3b8" stroke-width="1.5" />
      <line x1="67" y1="125" x2="67" y2="10" stroke="#94a3b8" stroke-width="1.5" />
      <!-- Horizontal ellipse: rx = 48 (x=3), ry = 30 (y=2) -->
      <ellipse cx="67" cy="67" rx="48" ry="30" stroke="#2563eb" stroke-width="2.5" fill="none" />
      <text x="115" y="62" font-size="11" font-weight="bold" fill="#0f172a">3</text>
      <text x="15" y="62" font-size="11" font-weight="bold" fill="#0f172a">-3</text>
      <text x="72" y="40" font-size="11" font-weight="bold" fill="#0f172a">2</text>
      <text x="72" y="105" font-size="11" font-weight="bold" fill="#0f172a">-2</text>
      <text x="67" y="152" class="option-tag" text-anchor="middle">(2)</text>
    </g>

    <!-- Panel 3: Circle radius 2 (Option 3) -->
    <g transform="translate(330, 20)">
      <rect x="0" y="0" width="135" height="135" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
      <line x1="10" y1="67" x2="125" y2="67" stroke="#94a3b8" stroke-width="1.5" />
      <line x1="67" y1="125" x2="67" y2="10" stroke="#94a3b8" stroke-width="1.5" />
      <circle cx="67" cy="67" r="35" stroke="#2563eb" stroke-width="2.5" fill="none" />
      <text x="102" y="62" font-size="11" font-weight="bold" fill="#0f172a">2</text>
      <text x="25" y="62" font-size="11" font-weight="bold" fill="#0f172a">-2</text>
      <text x="72" y="35" font-size="11" font-weight="bold" fill="#0f172a">2</text>
      <text x="72" y="110" font-size="11" font-weight="bold" fill="#0f172a">-2</text>
      <text x="67" y="152" class="option-tag" text-anchor="middle">(3)</text>
    </g>

    <!-- Panel 4: Parabola (Option 4) -->
    <g transform="translate(485, 20)">
      <rect x="0" y="0" width="135" height="135" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
      <line x1="10" y1="67" x2="125" y2="67" stroke="#94a3b8" stroke-width="1.5" />
      <line x1="67" y1="125" x2="67" y2="10" stroke="#94a3b8" stroke-width="1.5" />
      <path d="M 27 67 Q 67 20 107 67" stroke="#2563eb" stroke-width="2.5" fill="none" />
      <text x="107" y="80" font-size="11" font-weight="bold" fill="#0f172a">2</text>
      <text x="20" y="80" font-size="11" font-weight="bold" fill="#0f172a">-2</text>
      <text x="72" y="25" font-size="11" font-weight="bold" fill="#0f172a">3</text>
      <text x="67" y="152" class="option-tag" text-anchor="middle">(4)</text>
    </g>

    <text x="320" y="210" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle">Trajectories: x = 2 sin θ, y = 3 cos θ  ⟹  (x/2)² + (y/3)² = 1 (Vertical Ellipse)</text>
  </svg>`,

  // Q60: Slope vs x graphs (4 options)
  60: `
  ${SVG_HEADER(640, 340)}
    <!-- Option 1: V-shape -->
    <g transform="translate(20, 20)">
      <rect x="0" y="0" width="135" height="135" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
      <line x1="15" y1="110" x2="125" y2="110" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)" />
      <line x1="25" y1="120" x2="25" y2="15" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)" />
      <text x="120" y="125" font-size="11" font-weight="bold" fill="#0f172a">x</text>
      <text x="20" y="12" font-size="11" font-weight="bold" fill="#0f172a">Slope</text>
      <path d="M 25 35 L 70 110 L 115 35" stroke="#2563eb" stroke-width="2.5" fill="none" />
      <text x="67" y="155" class="option-tag" text-anchor="middle">(1)</text>
    </g>

    <!-- Option 2: Linear decreasing line passing through x-axis -->
    <g transform="translate(175, 20)">
      <rect x="0" y="0" width="135" height="135" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
      <line x1="15" y1="70" x2="125" y2="70" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)" />
      <line x1="25" y1="120" x2="25" y2="15" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)" />
      <text x="120" y="85" font-size="11" font-weight="bold" fill="#0f172a">x</text>
      <text x="20" y="12" font-size="11" font-weight="bold" fill="#0f172a">Slope</text>
      <line x1="25" y1="30" x2="115" y2="110" stroke="#2563eb" stroke-width="2.5" />
      <text x="67" y="155" class="option-tag" text-anchor="middle">(2)</text>
    </g>

    <!-- Option 3: Inverted parabola -->
    <g transform="translate(330, 20)">
      <rect x="0" y="0" width="135" height="135" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
      <line x1="15" y1="110" x2="125" y2="110" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)" />
      <line x1="25" y1="120" x2="25" y2="15" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)" />
      <text x="120" y="125" font-size="11" font-weight="bold" fill="#0f172a">x</text>
      <text x="20" y="12" font-size="11" font-weight="bold" fill="#0f172a">Slope</text>
      <path d="M 25 110 Q 70 30 115 110" stroke="#2563eb" stroke-width="2.5" fill="none" />
      <text x="67" y="155" class="option-tag" text-anchor="middle">(3)</text>
    </g>

    <!-- Option 4: Sine wave -->
    <g transform="translate(485, 20)">
      <rect x="0" y="0" width="135" height="135" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
      <line x1="15" y1="70" x2="125" y2="70" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)" />
      <line x1="25" y1="120" x2="25" y2="15" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)" />
      <text x="120" y="85" font-size="11" font-weight="bold" fill="#0f172a">x</text>
      <text x="20" y="12" font-size="11" font-weight="bold" fill="#0f172a">Slope</text>
      <path d="M 25 70 Q 45 35 65 70 T 105 70" stroke="#2563eb" stroke-width="2.5" fill="none" />
      <text x="67" y="155" class="option-tag" text-anchor="middle">(4)</text>
    </g>

    <text x="320" y="210" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle">Slope of Projectile: dy/dx = tan θ - (g / (u² cos² θ)) x  ⟹  Linear Decreasing with x (Option 2)</text>
  </svg>`,

  // Q66: Vector Triangle (A = B + C)
  66: `
  ${SVG_HEADER(520, 360)}
    <!-- Triangle vertices:
         Start (bottom-left): (120, 260)
         Top vertex: (280, 80)
         Bottom-right: (420, 260)
    -->
    <!-- Vector C: from (120, 260) to (280, 80) -->
    <line x1="120" y1="260" x2="280" y2="80" stroke="#2563eb" stroke-width="3.5" marker-end="url(#arrow-blue)" />
    <text x="180" y="160" font-size="18" font-weight="bold" fill="#2563eb">C</text>

    <!-- Vector B: from (280, 80) to (420, 260) -->
    <line x1="280" y1="80" x2="420" y2="260" stroke="#dc2626" stroke-width="3.5" marker-end="url(#arrow-red)" />
    <text x="365" y="160" font-size="18" font-weight="bold" fill="#dc2626">B</text>

    <!-- Vector A: from (120, 260) to (420, 260) -->
    <line x1="120" y1="260" x2="420" y2="260" stroke="#16a34a" stroke-width="3.5" marker-end="url(#arrow-green)" />
    <text x="270" y="295" font-size="18" font-weight="bold" fill="#16a34a">A</text>

    <!-- Vertices points -->
    <circle cx="120" cy="260" r="4" fill="#0f172a" />
    <circle cx="280" cy="80" r="4" fill="#0f172a" />
    <circle cx="420" cy="260" r="4" fill="#0f172a" />

    <text x="270" y="340" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">Triangle Law of Vector Addition: A = B + C</text>
  </svg>`,

  // Q70: Pursuit problem on square ABCD
  70: `
  ${SVG_HEADER(520, 400)}
    <!-- Square corners:
         A: (140, 280)
         B: (380, 280)
         C: (380, 100)
         D: (140, 100)
    -->
    <!-- Square sides -->
    <rect x="140" y="100" width="240" height="180" stroke="#94a3b8" stroke-width="2" fill="none" stroke-dasharray="4,4" />
    
    <!-- Corners labels -->
    <circle cx="140" cy="280" r="5" fill="#2563eb" />
    <text x="115" y="290" font-size="16" font-weight="bold" fill="#2563eb">A</text>

    <circle cx="380" cy="280" r="5" fill="#2563eb" />
    <text x="395" y="290" font-size="16" font-weight="bold" fill="#2563eb">B</text>

    <circle cx="380" cy="100" r="5" fill="#2563eb" />
    <text x="395" y="95" font-size="16" font-weight="bold" fill="#2563eb">C</text>

    <circle cx="140" cy="100" r="5" fill="#2563eb" />
    <text x="115" y="95" font-size="16" font-weight="bold" fill="#2563eb">D</text>

    <!-- Initial velocity arrows -->
    <!-- A moves towards B -->
    <line x1="140" y1="280" x2="220" y2="280" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)" />
    <text x="180" y="270" font-size="13" font-weight="bold" fill="#dc2626">v</text>

    <!-- B moves towards C -->
    <line x1="380" y1="280" x2="380" y2="200" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)" />
    <text x="390" y="240" font-size="13" font-weight="bold" fill="#dc2626">v</text>

    <!-- C moves towards D -->
    <line x1="380" y1="100" x2="300" y2="100" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)" />
    <text x="340" y="90" font-size="13" font-weight="bold" fill="#dc2626">v</text>

    <!-- D moves towards A -->
    <line x1="140" y1="100" x2="140" y2="180" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)" />
    <text x="125" y="140" font-size="13" font-weight="bold" fill="#dc2626">v</text>

    <!-- Side length L -->
    <text x="260" y="315" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle">Side length L</text>

    <text x="260" y="375" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Four Particles at Corners of Square Pursuing Cyclically</text>
  </svg>`
};

async function generateAll() {
  const mapping = {};
  console.log(`Starting diagram generation for ${Object.keys(DIAGRAMS).length} diagrams...`);

  for (const [qNum, svgString] of Object.entries(DIAGRAMS)) {
    const filename = `plane_q${qNum}.png`;
    const localBackendPath = path.join(outDirBackend, filename);
    const localFrontendPath = path.join(outDirFrontend, filename);

    // Render SVG to PNG using sharp
    const pngBuffer = await sharp(Buffer.from(svgString.trim()))
      .png({ quality: 95 })
      .toBuffer();

    fs.writeFileSync(localBackendPath, pngBuffer);
    fs.writeFileSync(localFrontendPath, pngBuffer);
    console.log(`Saved local PNG for Q${qNum} -> ${filename}`);

    // Upload to Cloudinary
    try {
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'edvedum_motion_in_plane',
            public_id: `plane_q${qNum}`,
            overwrite: true,
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(pngBuffer);
      });

      console.log(`Cloudinary uploaded Q${qNum} -> ${uploadRes.secure_url}`);
      mapping[qNum] = {
        cloudinary_url: uploadRes.secure_url,
        local_url: `/uploads/motion_in_plane/${filename}`,
        public_id: uploadRes.public_id,
      };
    } catch (uploadErr) {
      console.warn(`Cloudinary upload failed for Q${qNum}, using local URL:`, uploadErr.message);
      mapping[qNum] = {
        cloudinary_url: `/uploads/motion_in_plane/${filename}`,
        local_url: `/uploads/motion_in_plane/${filename}`,
      };
    }
  }

  const mapPath = path.resolve(__dirname, 'plane_diagrams.json');
  fs.writeFileSync(mapPath, JSON.stringify(mapping, null, 2));
  console.log(`All diagrams generated and saved to ${mapPath}`);
}

generateAll().catch(err => {
  console.error('Fatal diagram generation error:', err);
  process.exit(1);
});
