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
    .axis-label { font-size: 15px; font-weight: bold; fill: #0f172a; }
    .tick-label { font-size: 13px; font-weight: 600; fill: #475569; text-anchor: middle; }
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

export const PART2_DIAGRAMS = {
  // Q102: 3D coordinate system (x right, z up, y down-left)
  102: `
  ${SVG_HEADER(480, 360)}
    <!-- Origin (220, 200) -->
    <line x1="220" y1="200" x2="420" y2="200" class="axis" marker-end="url(#arrow)" />
    <text x="430" y="205" class="axis-label">x</text>

    <line x1="220" y1="200" x2="220" y2="50" class="axis" marker-end="url(#arrow)" />
    <text x="225" y="45" class="axis-label">z</text>

    <line x1="220" y1="200" x2="100" y2="290" class="axis" marker-end="url(#arrow)" />
    <text x="85" y="305" class="axis-label">y</text>

    <circle cx="220" cy="200" r="4" fill="#0f172a" />
    <text x="205" y="215" font-size="13" font-weight="bold" fill="#475569">O</text>

    <text x="240" y="335" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">3D Axis System (g = 10(-k̂) m/s²)</text>
  </svg>`,

  // Q106: Circular motion with velocity and acceleration vectors at an angle
  106: `
  ${SVG_HEADER(500, 380)}
    <!-- Circle centered at (250, 200), radius 120 -->
    <circle cx="250" cy="200" r="120" stroke="#0284c7" stroke-width="2.5" fill="none" stroke-dasharray="4,4" />
    <circle cx="250" cy="200" r="3" fill="#0f172a" />
    <text x="240" y="215" font-size="14" font-weight="bold" fill="#475569">O</text>

    <!-- Point P on upper left: (250 - 120*cos(45°), 200 - 120*sin(45°)) = (165, 115) -->
    <circle cx="165" cy="115" r="5" fill="#0f172a" />

    <!-- Velocity vector v tangent (pointing down-left) -->
    <line x1="165" y1="115" x2="100" y2="180" stroke="#2563eb" stroke-width="3" marker-end="url(#arrow-blue)" />
    <text x="80" y="170" font-size="16" font-weight="bold" fill="#2563eb">v⃗</text>

    <!-- Acceleration vector a pointing inwards making an acute angle with v -->
    <line x1="165" y1="115" x2="215" y2="175" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)" />
    <text x="225" y="180" font-size="16" font-weight="bold" fill="#dc2626">a⃗</text>

    <!-- Arc between v and a -->
    <text x="250" y="350" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Velocity and Acceleration Vectors of Particle in Circular Path</text>
  </svg>`,

  // Q109: Circle centered at origin with A at (r, 0) and B at (0, r)
  109: `
  ${SVG_HEADER(500, 380)}
    <!-- Axes -->
    <line x1="50" y1="200" x2="450" y2="200" class="axis" marker-end="url(#arrow)" />
    <line x1="250" y1="350" x2="250" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="455" y="205" class="axis-label">x</text>
    <text x="255" y="35" class="axis-label">y</text>
    <text x="235" y="215" font-size="13" font-weight="bold" fill="#475569">O</text>

    <!-- Circle radius 110 -->
    <circle cx="250" cy="200" r="110" stroke="#0284c7" stroke-width="2.5" fill="none" />

    <!-- Point A at (360, 200) -->
    <circle cx="360" cy="200" r="5" fill="#dc2626" />
    <text x="365" y="195" font-size="16" font-weight="bold" fill="#dc2626">A</text>
    <line x1="360" y1="200" x2="360" y2="130" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)" />
    <text x="370" y="150" font-size="13" font-weight="bold" fill="#2563eb">v</text>

    <!-- Point B at (250, 90) -->
    <circle cx="250" cy="90" r="5" fill="#16a34a" />
    <text x="255" y="80" font-size="16" font-weight="bold" fill="#16a34a">B</text>
    <line x1="250" y1="90" x2="180" y2="90" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)" />
    <text x="200" y="75" font-size="13" font-weight="bold" fill="#2563eb">v</text>

    <!-- Radius line r -->
    <line x1="250" y1="200" x2="328" y2="122" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,4" />
    <text x="295" y="170" font-size="13" font-weight="bold" fill="#64748b">r</text>

    <text x="250" y="365" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Anticlockwise Circular Motion from Point A to Point B</text>
  </svg>`,

  // Q114: Inclined plane (45°) and projectile at 30°
  114: `
  ${SVG_HEADER(540, 360)}
    <!-- Ground line -->
    <line x1="60" y1="280" x2="480" y2="280" class="axis" />
    ${Array.from({ length: 21 }).map((_, i) => `<line x1="${70 + i * 20}" y1="280" x2="${60 + i * 20}" y2="292" stroke="#64748b" stroke-width="1.5" />`).join('')}

    <!-- Incline: base from 150 to 350, height 200 (45° incline) -->
    <polygon points="150,280 350,280 350,80" fill="#f1f5f9" stroke="#0f172a" stroke-width="2.5" />
    <text x="195" y="270" font-size="14" font-weight="bold" fill="#0f172a">45°</text>

    <!-- Projectile launched from (150, 280) at 30° to incline (total 75° to horizontal) -->
    <line x1="150" y1="280" x2="350" y2="80" stroke="#0f172a" stroke-width="2" />
    
    <!-- Parabolic path on incline -->
    <path d="M 150 280 Q 230 110 310 120" stroke="#2563eb" stroke-width="3" fill="none" />
    <circle cx="230" cy="115" r="4" fill="#dc2626" />
    <text x="215" y="100" font-size="13" font-weight="bold" fill="#dc2626">Highest Point</text>

    <!-- Launch vector -->
    <line x1="150" y1="280" x2="200" y2="190" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)" />
    <text x="175" y="225" font-size="13" font-weight="bold" fill="#dc2626">30°</text>

    <text x="250" y="325" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Projection on an Incline of Inclination 45° at 30°</text>
  </svg>`,

  // Q122: Circle with horizontal diameter AB, chords AC at 30° and AD at 60°
  122: `
  ${SVG_HEADER(520, 380)}
    <!-- Circle centered at (260, 190), radius 120 -->
    <circle cx="260" cy="190" r="120" stroke="#0284c7" stroke-width="2.5" fill="none" />
    
    <!-- Diameter AB -->
    <line x1="140" y1="190" x2="380" y2="190" stroke="#0f172a" stroke-width="2.5" />
    <circle cx="140" cy="190" r="4" fill="#0f172a" />
    <text x="120" y="195" font-size="16" font-weight="bold" fill="#0f172a">A</text>
    <circle cx="380" cy="190" r="4" fill="#0f172a" />
    <text x="390" y="195" font-size="16" font-weight="bold" fill="#0f172a">B</text>

    <!-- Point C: chord AC at 30° to AB -> length = 2R*cos(30°) = 240 * 0.866 = 208 px -->
    <!-- (140 + 208*cos(30°), 190 - 208*sin(30°)) = (140 + 180, 190 - 104) = (320, 86) -->
    <circle cx="320" cy="86" r="4" fill="#2563eb" />
    <text x="325" y="78" font-size="16" font-weight="bold" fill="#2563eb">C</text>
    <line x1="140" y1="190" x2="320" y2="86" stroke="#2563eb" stroke-width="2.5" />
    <text x="200" y="170" font-size="13" font-weight="bold" fill="#2563eb">30°</text>

    <!-- Point D: chord AD at 60° below AB -> length = 2R*cos(60°) = 240 * 0.5 = 120 px -->
    <!-- (140 + 120*cos(60°), 190 + 120*sin(60°)) = (140 + 60, 190 + 104) = (200, 294) -->
    <circle cx="200" cy="294" r="4" fill="#dc2626" />
    <text x="195" y="315" font-size="16" font-weight="bold" fill="#dc2626">D</text>
    <line x1="140" y1="190" x2="200" y2="294" stroke="#dc2626" stroke-width="2.5" />
    <text x="165" y="235" font-size="13" font-weight="bold" fill="#dc2626">60°</text>

    <text x="260" y="360" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Particles Moving from A to C and A to D in Circle</text>
  </svg>`,

  // Q125: Rod AB of length 5m sliding between vertical and horizontal guides
  125: `
  ${SVG_HEADER(500, 360)}
    <!-- Wall and Floor -->
    <line x1="140" y1="60" x2="140" y2="280" stroke="#0f172a" stroke-width="3" />
    <line x1="140" y1="280" x2="420" y2="280" stroke="#0f172a" stroke-width="3" />
    <text x="120" y="295" font-size="15" font-weight="bold" fill="#0f172a">O</text>

    <!-- Rod AB: length 5m. B is at distance 3m (e.g. 150px) -> (140 + 150, 280) = (290, 280) -->
    <!-- A is at distance 4m (e.g. 200px) -> (140, 280 - 200) = (140, 80) -->
    <line x1="140" y1="80" x2="290" y2="280" stroke="#2563eb" stroke-width="5" stroke-linecap="round" />
    
    <circle cx="140" cy="80" r="5" fill="#dc2626" />
    <text x="115" y="75" font-size="16" font-weight="bold" fill="#dc2626">A</text>
    <line x1="140" y1="80" x2="140" y2="135" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)" />
    <text x="150" y="115" font-size="13" font-weight="bold" fill="#dc2626">v_A</text>

    <circle cx="290" cy="280" r="5" fill="#16a34a" />
    <text x="285" y="305" font-size="16" font-weight="bold" fill="#16a34a">B</text>
    <line x1="290" y1="280" x2="360" y2="280" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrow-green)" />
    <text x="365" y="275" font-size="13" font-weight="bold" fill="#16a34a">v_B = 4 m/s</text>

    <!-- Rod length label -->
    <text x="230" y="170" font-size="15" font-weight="bold" fill="#2563eb">5 m</text>
    <!-- Distance labels -->
    <text x="215" y="270" font-size="13" font-weight="bold" fill="#475569">3 m</text>

    <text x="260" y="340" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Rod of Length 5 m Moving along Guides</text>
  </svg>`,

  // Q126: Particle moving 30° N of E, then North
  126: `
  ${SVG_HEADER(500, 360)}
    <!-- Compass axes -->
    <line x1="120" y1="220" x2="400" y2="220" class="axis" marker-end="url(#arrow)" />
    <line x1="240" y1="320" x2="240" y2="60" class="axis" marker-end="url(#arrow)" />
    <text x="410" y="225" class="axis-label">E</text>
    <text x="245" y="50" class="axis-label">N</text>
    <text x="245" y="335" class="axis-label">S</text>

    <!-- Initial velocity vector: 30° North of East, length 140px -->
    <!-- (240 + 140*cos(30°), 220 - 140*sin(30°)) = (240 + 121, 220 - 70) = (361, 150) -->
    <line x1="240" y1="220" x2="361" y2="150" stroke="#2563eb" stroke-width="3" marker-end="url(#arrow-blue)" />
    <text x="320" y="160" font-size="13" font-weight="bold" fill="#2563eb">v_1 (30° N of E)</text>
    <text x="275" y="210" font-size="13" font-weight="bold" fill="#475569">30°</text>

    <!-- Final velocity vector: along North from head of v1 or from origin -->
    <line x1="361" y1="150" x2="361" y2="80" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)" />
    <text x="370" y="115" font-size="13" font-weight="bold" fill="#dc2626">v_2 (North)</text>

    <text x="250" y="350" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Average Acceleration: Change from 30° N of E to Due North</text>
  </svg>`,

  // Q128: Forces of 1N along sides AB, BC, CD of regular hexagon
  128: `
  ${SVG_HEADER(500, 360)}
    <!-- Regular hexagon centered at (250, 180), radius 110 -->
    <!-- Vertices at 0°, 60°, 120°, 180°, 240°, 300°:
         D: (250 + 55, 180 - 95) = (305, 85)
         E: (250 - 55, 180 - 95) = (195, 85)
         F: (140, 180)
         A: (195, 275)
         B: (305, 275)
         C: (360, 180)
    -->
    <polygon points="195,275 305,275 360,180 305,85 195,85 140,180" stroke="#94a3b8" stroke-width="2" fill="#f8fafc" />

    <!-- AB vector -->
    <line x1="195" y1="275" x2="305" y2="275" stroke="#2563eb" stroke-width="3.5" marker-end="url(#arrow-blue)" />
    <text x="250" y="295" font-size="14" font-weight="bold" fill="#2563eb">1 N (AB)</text>

    <!-- BC vector -->
    <line x1="305" y1="275" x2="360" y2="180" stroke="#2563eb" stroke-width="3.5" marker-end="url(#arrow-blue)" />
    <text x="350" y="235" font-size="14" font-weight="bold" fill="#2563eb">1 N (BC)</text>

    <!-- CD vector -->
    <line x1="360" y1="180" x2="305" y2="85" stroke="#2563eb" stroke-width="3.5" marker-end="url(#arrow-blue)" />
    <text x="350" y="125" font-size="14" font-weight="bold" fill="#2563eb">1 N (CD)</text>

    <!-- Vertex labels -->
    <text x="180" y="285" font-size="15" font-weight="bold" fill="#0f172a">A</text>
    <text x="315" y="285" font-size="15" font-weight="bold" fill="#0f172a">B</text>
    <text x="375" y="185" font-size="15" font-weight="bold" fill="#0f172a">C</text>
    <text x="315" y="80" font-size="15" font-weight="bold" fill="#0f172a">D</text>
    <text x="180" y="80" font-size="15" font-weight="bold" fill="#0f172a">E</text>
    <text x="120" y="185" font-size="15" font-weight="bold" fill="#0f172a">F</text>

    <text x="250" y="340" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Three Forces of 1 N Acting Along AB, BC, CD of Regular Hexagon</text>
  </svg>`,

  // Q130: 4 trajectory graphs for v = 4 i + 2t j  =>  y = x^2 / 16 (Option 3)
  130: `
  ${SVG_HEADER(640, 340)}
    <!-- Graph 1: Concave downward -->
    <g transform="translate(20, 20)">
      <rect x="0" y="0" width="135" height="135" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
      <line x1="15" y1="115" x2="125" y2="115" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)" />
      <line x1="25" y1="125" x2="25" y2="15" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)" />
      <text x="120" y="128" font-size="11" font-weight="bold" fill="#0f172a">x</text>
      <text x="20" y="12" font-size="11" font-weight="bold" fill="#0f172a">y</text>
      <path d="M 25 115 Q 40 40 115 35" stroke="#2563eb" stroke-width="2.5" fill="none" />
      <text x="67" y="155" class="option-tag" text-anchor="middle">(1)</text>
    </g>

    <!-- Graph 2: Straight line -->
    <g transform="translate(175, 20)">
      <rect x="0" y="0" width="135" height="135" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
      <line x1="15" y1="115" x2="125" y2="115" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)" />
      <line x1="25" y1="125" x2="25" y2="15" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)" />
      <text x="120" y="128" font-size="11" font-weight="bold" fill="#0f172a">x</text>
      <text x="20" y="12" font-size="11" font-weight="bold" fill="#0f172a">y</text>
      <line x1="25" y1="115" x2="115" y2="25" stroke="#2563eb" stroke-width="2.5" />
      <text x="67" y="155" class="option-tag" text-anchor="middle">(2)</text>
    </g>

    <!-- Graph 3: Upward opening parabola y = x^2 / 16 -->
    <g transform="translate(330, 20)">
      <rect x="0" y="0" width="135" height="135" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
      <line x1="15" y1="115" x2="125" y2="115" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)" />
      <line x1="25" y1="125" x2="25" y2="15" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)" />
      <text x="120" y="128" font-size="11" font-weight="bold" fill="#0f172a">x</text>
      <text x="20" y="12" font-size="11" font-weight="bold" fill="#0f172a">y</text>
      <path d="M 25 115 Q 85 115 115 25" stroke="#2563eb" stroke-width="2.5" fill="none" />
      <text x="67" y="155" class="option-tag" text-anchor="middle">(3)</text>
    </g>

    <!-- Graph 4: Linear decreasing -->
    <g transform="translate(485, 20)">
      <rect x="0" y="0" width="135" height="135" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
      <line x1="15" y1="115" x2="125" y2="115" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)" />
      <line x1="25" y1="125" x2="25" y2="15" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)" />
      <text x="120" y="128" font-size="11" font-weight="bold" fill="#0f172a">x</text>
      <text x="20" y="12" font-size="11" font-weight="bold" fill="#0f172a">y</text>
      <line x1="25" y1="25" x2="115" y2="115" stroke="#2563eb" stroke-width="2.5" />
      <text x="67" y="155" class="option-tag" text-anchor="middle">(4)</text>
    </g>

    <text x="320" y="210" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle">Trajectory: v = 4î + 2tĵ  ⟹  x = 4t, y = t²  ⟹  y = x²/16 (Parabola Opening Upwards - Option 3)</text>
  </svg>`,

  // Q133: Block pulled by rope over pulley
  133: `
  ${SVG_HEADER(540, 360)}
    <!-- Floor and vertical wall -->
    <line x1="80" y1="280" x2="420" y2="280" class="axis" />
    <line x1="420" y1="280" x2="420" y2="100" class="axis" />
    <line x1="420" y1="100" x2="480" y2="100" class="axis" />

    <!-- Pulley at (420, 100) -->
    <circle cx="420" cy="100" r="16" fill="#cbd5e1" stroke="#0f172a" stroke-width="2.5" />
    <circle cx="420" cy="100" r="4" fill="#0f172a" />

    <!-- Block of mass m at (140, 250) -->
    <rect x="140" y="240" width="50" height="40" fill="#f87171" stroke="#0f172a" stroke-width="2" />
    <text x="165" y="265" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">m</text>

    <!-- Rope from block to pulley -->
    <line x1="190" y1="250" x2="420" y2="100" stroke="#0f172a" stroke-width="2.5" />

    <!-- Vertical dashed line at pulley to show angle theta -->
    <line x1="420" y1="100" x2="420" y2="250" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,4" />
    <text x="390" y="160" font-size="14" font-weight="bold" fill="#475569">θ</text>

    <!-- Horizontal pulled rope from pulley -->
    <line x1="420" y1="84" x2="510" y2="84" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)" />
    <text x="475" y="75" font-size="14" font-weight="bold" fill="#2563eb">v</text>

    <text x="270" y="330" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Constrained Motion: Horizontal Velocity of Block = v / sin θ</text>
  </svg>`,

  // Q145: Projectile with point (30, 20) and range 40m
  145: `
  ${SVG_HEADER(560, 360)}
    <!-- Axes -->
    <line x1="60" y1="280" x2="500" y2="280" class="axis" marker-end="url(#arrow)" />
    <line x1="100" y1="300" x2="100" y2="60" class="axis" marker-end="url(#arrow)" />
    <text x="505" y="285" class="axis-label">x</text>
    <text x="95" y="50" class="axis-label">y</text>

    <!-- Trajectory from (100, 280) through (340, 160) to (420, 280) -->
    <!-- Let total range = 40m (320px). x=30m is at 100 + 240 = 340. x=40m is at 100 + 320 = 420. -->
    <path d="M 100 280 Q 260 40 420 280" stroke="#2563eb" stroke-width="3" fill="none" />

    <!-- Point at x = 30m, y = 20m -->
    <circle cx="340" cy="160" r="5" fill="#dc2626" />
    <line x1="340" y1="280" x2="340" y2="160" stroke="#dc2626" stroke-width="2" stroke-dasharray="4,4" />
    <text x="350" y="215" font-size="14" font-weight="bold" fill="#dc2626">20 m</text>

    <!-- Dimension 30m and 10m -->
    <line x1="100" y1="295" x2="340" y2="295" stroke="#475569" stroke-width="1.5" />
    <text x="220" y="312" font-size="13" font-weight="bold" fill="#475569" text-anchor="middle">30 m</text>
    
    <line x1="340" y1="295" x2="420" y2="295" stroke="#475569" stroke-width="1.5" />
    <text x="380" y="312" font-size="13" font-weight="bold" fill="#475569" text-anchor="middle">10 m</text>

    <!-- Angle theta at launch -->
    <path d="M 100 280 L 150 200" stroke="#16a34a" stroke-width="2" />
    <text x="135" y="265" font-size="15" font-weight="bold" fill="#16a34a">θ</text>

    <text x="280" y="345" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Angle of Projection for Trajectory Passing Through (30 m, 20 m)</text>
  </svg>`,

  // Q150: Regular hexagon with center O and vectors from vertex A
  150: `
  ${SVG_HEADER(500, 380)}
    <!-- Regular hexagon centered at (250, 190), radius 120 -->
    <!-- Vertices:
         A: (250 - 60, 190 + 104) = (190, 294)
         B: (250 + 60, 190 + 104) = (310, 294)
         C: (370, 190)
         D: (310, 86)
         E: (190, 86)
         F: (130, 190)
    -->
    <polygon points="190,294 310,294 370,190 310,86 190,86 130,190" stroke="#0f172a" stroke-width="2.5" fill="#f8fafc" />

    <!-- Center O -->
    <circle cx="250" cy="190" r="4" fill="#dc2626" />
    <text x="255" y="185" font-size="15" font-weight="bold" fill="#dc2626">O</text>

    <!-- Diagonals to O -->
    <line x1="190" y1="294" x2="310" y2="86" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
    <line x1="310" y1="294" x2="190" y2="86" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
    <line x1="130" y1="190" x2="370" y2="190" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />

    <!-- Vectors from A: AB, AC, AD, AE, AF -->
    <line x1="190" y1="294" x2="310" y2="294" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)" />
    <line x1="190" y1="294" x2="370" y2="190" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)" />
    <line x1="190" y1="294" x2="310" y2="86" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)" />
    <line x1="190" y1="294" x2="190" y2="86" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)" />
    <line x1="190" y1="294" x2="130" y2="190" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)" />

    <!-- Labels -->
    <text x="175" y="305" font-size="16" font-weight="bold" fill="#0f172a">A</text>
    <text x="320" y="305" font-size="16" font-weight="bold" fill="#0f172a">B</text>
    <text x="385" y="195" font-size="16" font-weight="bold" fill="#0f172a">C</text>
    <text x="320" y="78" font-size="16" font-weight="bold" fill="#0f172a">D</text>
    <text x="175" y="78" font-size="16" font-weight="bold" fill="#0f172a">E</text>
    <text x="110" y="195" font-size="16" font-weight="bold" fill="#0f172a">F</text>

    <text x="250" y="355" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Vector Sum AB + AC + AD + AE + AF in Regular Hexagon</text>
  </svg>`
};

async function generateAll() {
  const mapping = {};
  console.log(`Starting Part 2 diagram generation for ${Object.keys(PART2_DIAGRAMS).length} diagrams...`);

  for (const [qNum, svgString] of Object.entries(PART2_DIAGRAMS)) {
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

  const mapPath = path.resolve(__dirname, 'plane_part2_diagrams.json');
  fs.writeFileSync(mapPath, JSON.stringify(mapping, null, 2));
  console.log(`All Part 2 diagrams generated and saved to ${mapPath}`);
}

generateAll().catch(err => {
  console.error('Fatal Part 2 diagram generation error:', err);
  process.exit(1);
});
