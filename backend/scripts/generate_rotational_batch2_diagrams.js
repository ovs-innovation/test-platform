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

const outDirBackend = path.resolve(__dirname, '../uploads/rotational_motion');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/rotational_motion');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

const SVG_HEADER = (w = 540, h = 300) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2.2; }
    .grid { stroke: #e2e8f0; stroke-width: 1; stroke-dasharray: 4,4; }
    .hatch { stroke: #94a3b8; stroke-width: 1.5; }
    .surface { stroke: #0f172a; stroke-width: 2.5; stroke-linecap: round; }
    .block { fill: #f8fafc; stroke: #0f172a; stroke-width: 2.2; rx: 4; }
    .block-blue { fill: #eff6ff; stroke: #2563eb; stroke-width: 2.2; rx: 4; }
    .string-line { stroke: #0f172a; stroke-width: 2; stroke-linecap: round; }
    .pulley { fill: #f1f5f9; stroke: #0f172a; stroke-width: 2; }
    .pulley-center { fill: #0f172a; }
    .label { font-size: 15px; font-weight: 600; fill: #0f172a; text-anchor: middle; dominant-baseline: middle; }
    .sublabel { font-size: 13px; font-weight: 500; fill: #475569; text-anchor: middle; dominant-baseline: middle; }
    .force-arrow { stroke: #dc2626; stroke-width: 2.5; stroke-linecap: round; }
    .vel-arrow { stroke: #2563eb; stroke-width: 2.5; stroke-linecap: round; }
    .vector-arrow { stroke: #059669; stroke-width: 2.2; stroke-linecap: round; }
    .dim-line { stroke: #64748b; stroke-width: 1.5; stroke-dasharray: 3,3; }
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0f172a"/>
    </marker>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626"/>
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb"/>
    </marker>
  </defs>
`;

export const DIAGRAMS = {
  // Q69: Rod of mass M and length L hinged at one end with force F at 60 deg
  69: `
  ${SVG_HEADER(480, 260)}
    <!-- Hinge at left (x=100, y=130) -->
    <polygon points="100,130 80,115 80,145" fill="#64748b" stroke="#0f172a" stroke-width="2"/>
    <line x1="80" y1="100" x2="80" y2="160" class="surface"/>
    <circle cx="100" cy="130" r="4" fill="#0f172a"/>

    <!-- Horizontal Rod from (100, 130) to (340, 130) -->
    <line x1="100" y1="130" x2="340" y2="130" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
    <text x="220" y="110" class="label">M, L</text>

    <!-- Force F at right end at angle 60 deg to rod -->
    <line x1="340" y1="130" x2="410" y2="70" class="force-arrow" marker-end="url(#arrow-red)"/>
    <text x="425" y="65" class="label" fill="#dc2626">F</text>
    <line x1="340" y1="130" x2="400" y2="130" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <path d="M 370 130 A 30 30 0 0 0 365 105" fill="none" stroke="#0f172a" stroke-width="1.8"/>
    <text x="385" y="110" class="sublabel">60&#176;</text>
  </svg>
  `,

  // Q70: Rod leaning against smooth vertical wall and rough floor at 60 deg
  70: `
  ${SVG_HEADER(440, 300)}
    <!-- Vertical Wall -->
    <line x1="120" y1="40" x2="120" y2="240" class="surface"/>
    ${[50, 80, 110, 140, 170, 200, 230].map(y => `
      <line x1="105" y1="${y+10}" x2="120" y2="${y}" class="hatch"/>
    `).join('')}

    <!-- Horizontal Floor -->
    <line x1="100" y1="240" x2="380" y2="240" class="surface"/>
    ${[120, 150, 180, 210, 240, 270, 300, 330, 360].map(x => `
      <line x1="${x}" y1="240" x2="${x-12}" y2="255" class="hatch"/>
    `).join('')}

    <!-- Rod from (120, 70) to (260, 240) -->
    <line x1="120" y1="70" x2="260" y2="240" stroke="#0f172a" stroke-width="7" stroke-linecap="round"/>
    <line x1="120" y1="70" x2="260" y2="240" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>

    <!-- Angle 60 deg with horizontal at floor -->
    <path d="M 225 240 A 35 35 0 0 1 242 210" fill="none" stroke="#0f172a" stroke-width="1.8"/>
    <text x="210" y="225" class="label">60&#176;</text>
    <text x="320" y="225" class="sublabel">&#956; = 0.5</text>
  </svg>
  `,

  // Q71: Equilateral triangle of particles m, m, 2m and y-axis
  71: `
  ${SVG_HEADER(460, 280)}
    <!-- X and Y axes -->
    <line x1="60" y1="210" x2="400" y2="210" class="axis" marker-end="url(#arrow)"/>
    <line x1="230" y1="250" x2="230" y2="40" class="axis" marker-end="url(#arrow)"/>
    <text x="415" y="210" class="label">x</text>
    <text x="230" y="25" class="label">y</text>

    <!-- Equilateral triangle lines -->
    <line x1="150" y1="210" x2="310" y2="210" stroke="#94a3b8" stroke-width="2"/>
    <line x1="150" y1="210" x2="230" y2="72" stroke="#94a3b8" stroke-width="2"/>
    <line x1="310" y1="210" x2="230" y2="72" stroke="#94a3b8" stroke-width="2"/>
    <text x="180" y="140" class="sublabel">l</text>
    <text x="280" y="140" class="sublabel">l</text>

    <!-- Left particle m at (-l/2, 0) -> (150, 210) -->
    <circle cx="150" cy="210" r="7" fill="#2563eb"/>
    <text x="130" y="210" class="label" fill="#2563eb">m</text>

    <!-- Right particle m at (+l/2, 0) -> (310, 210) -->
    <circle cx="310" cy="210" r="7" fill="#2563eb"/>
    <text x="330" y="210" class="label" fill="#2563eb">m</text>

    <!-- Top particle 2m at (230, 72) -->
    <circle cx="230" cy="72" r="9" fill="#dc2626"/>
    <text x="255" y="70" class="label" fill="#dc2626">2m</text>
  </svg>
  `,

  // Q72: Light rod 2l welded with heavy rod 2l
  72: `
  ${SVG_HEADER(440, 320)}
    <!-- Ceiling hinge at top (x=220, y=50) -->
    <line x1="180" y1="50" x2="260" y2="50" class="surface"/>
    ${[190, 210, 230, 250].map(x => `
      <line x1="${x}" y1="50" x2="${x+10}" y2="35" class="hatch"/>
    `).join('')}
    <circle cx="220" cy="50" r="4" fill="#0f172a"/>

    <!-- Light rod (length 2l = 90px) from (220, 50) to (220, 140) -->
    <line x1="220" y1="50" x2="220" y2="140" stroke="#0f172a" stroke-width="2.5"/>
    <text x="195" y="95" class="label">2l</text>
    <text x="160" y="95" class="sublabel">(light)</text>

    <!-- Heavy rod (mass m, length 2l = 90px) from (220, 140) to (220, 230) -->
    <rect x="214" y="140" width="12" height="90" rx="3" fill="#cbd5e1" stroke="#0f172a" stroke-width="2.2"/>
    <text x="180" y="185" class="label">m, 2l</text>

    <!-- Velocity v of CM at y=185 -->
    <circle cx="220" cy="185" r="3" fill="#0f172a"/>
    <line x1="220" y1="185" x2="280" y2="185" class="vel-arrow" marker-end="url(#arrow-blue)"/>
    <text x="295" y="185" class="label" fill="#2563eb">v</text>
  </svg>
  `,

  // Q75: Non-uniform rod AB
  75: `
  ${SVG_HEADER(440, 200)}
    <!-- Rod AB from x=100 to x=340, y=100 -->
    <rect x="100" y="90" width="240" height="20" rx="3" fill="#94a3b8" fill-opacity="0.3" stroke="#0f172a" stroke-width="2.2"/>
    <!-- Density hatch showing non-uniformity towards B -->
    ${[110, 130, 160, 180, 200, 215, 230, 245, 260, 275, 290, 305, 320, 335].map(x => `
      <line x1="${x}" y1="90" x2="${x-10}" y2="110" stroke="#64748b" stroke-width="1.5"/>
    `).join('')}

    <text x="85" y="105" class="label">A</text>
    <text x="355" y="105" class="label">B</text>
    <text x="220" y="65" class="label">&#955; = cx&#178;</text>
  </svg>
  `,

  // Q77: Rod hinged at top with particle m hitting at l/2
  77: `
  ${SVG_HEADER(440, 320)}
    <!-- Hinge at top (x=220, y=50) -->
    <circle cx="220" cy="50" r="6" fill="#0f172a"/>
    <text x="245" y="50" class="label">O (m, l)</text>

    <!-- Rod of mass m and length l from (220, 50) to (220, 230) -->
    <line x1="220" y1="50" x2="220" y2="230" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>

    <!-- Particle m approaching at distance l/2 (y=140) -->
    <circle cx="160" cy="140" r="7" fill="#2563eb"/>
    <text x="145" y="140" class="label" fill="#2563eb">m</text>
    <line x1="160" y1="140" x2="210" y2="140" class="vel-arrow" marker-end="url(#arrow-blue)"/>
    <text x="185" y="125" class="label" fill="#2563eb">v</text>

    <!-- Dimension l/2 -->
    <line x1="240" y1="50" x2="240" y2="140" class="dim-line"/>
    <text x="260" y="95" class="sublabel">l/2</text>
  </svg>
  `,

  // Q78: Rigid rod on fulcrum with m and two 2.5kg blocks
  78: `
  ${SVG_HEADER(500, 240)}
    <!-- Fulcrum at x=200, y=120 -->
    <polygon points="200,115 185,155 215,155" fill="#64748b" stroke="#0f172a" stroke-width="2"/>
    <line x1="170" y1="155" x2="230" y2="155" class="surface"/>

    <!-- Rod horizontal at y=110 from x=80 to x=420 -->
    <rect x="80" y="105" width="340" height="10" rx="2" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>

    <!-- Mass m at left end (x=100) -->
    <line x1="100" y1="115" x2="100" y2="150" class="string-line"/>
    <rect x="85" y="150" width="30" height="30" class="block-blue"/>
    <text x="100" y="165" class="label">m</text>

    <!-- Right side: two 2.5kg masses hanging -->
    <line x1="330" y1="115" x2="330" y2="150" class="string-line"/>
    <rect x="315" y="150" width="30" height="30" class="block"/>
    <text x="330" y="165" class="sublabel">2.5kg</text>

    <line x1="380" y1="115" x2="380" y2="150" class="string-line"/>
    <rect x="365" y="150" width="30" height="30" class="block"/>
    <text x="380" y="165" class="sublabel">2.5kg</text>
  </svg>
  `,

  // Q79: Four particles at corners of square with diagonal AC
  79: `
  ${SVG_HEADER(440, 280)}
    <!-- Square ABCD centered at (220, 140) of side 120 -->
    <rect x="160" y="80" width="120" height="120" fill="none" stroke="#94a3b8" stroke-width="2"/>

    <!-- Diagonal line AC from (130, 230) to (310, 50) -->
    <line x1="130" y1="230" x2="310" y2="50" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="6,4"/>

    <!-- Vertices labels and masses: A(160, 200), B(280, 200), C(280, 80), D(160, 80) -->
    <circle cx="160" cy="200" r="7" fill="#2563eb"/>
    <text x="145" y="215" class="label">A (m)</text>

    <circle cx="280" cy="200" r="7" fill="#2563eb"/>
    <text x="295" y="215" class="label">B (m)</text>

    <circle cx="280" cy="80" r="7" fill="#2563eb"/>
    <text x="295" y="65" class="label">C (m)</text>

    <circle cx="160" cy="80" r="7" fill="#2563eb"/>
    <text x="145" y="65" class="label">D (m)</text>

    <text x="220" y="215" class="sublabel">l</text>
  </svg>
  `,

  // Q92: Equilateral triangle of rods with median axis
  92: `
  ${SVG_HEADER(440, 280)}
    <!-- Triangle vertices: Top(220, 60), Bottom-left(140, 220), Bottom-right(300, 220) -->
    <polygon points="220,60 140,220 300,220" fill="#f8fafc" stroke="#0f172a" stroke-width="3"/>
    
    <!-- Median axis from (220, 30) down to (220, 250) -->
    <line x1="220" y1="30" x2="220" y2="250" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="6,4"/>

    <text x="170" y="130" class="label">m, l</text>
    <text x="270" y="130" class="label">m, l</text>
    <text x="220" y="240" class="label">m, l</text>
  </svg>
  `,

  // Q93: Semicircular disc with axis through CM in plane
  93: `
  ${SVG_HEADER(440, 260)}
    <!-- Horizontal diameter base from (120, 160) to (320, 160) -->
    <path d="M 120 160 A 100 100 0 0 1 320 160 Z" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>
    <text x="170" y="120" class="label">M, R</text>

    <!-- Center of mass axis in plane parallel to diameter -->
    <!-- CM is at 4R/(3pi) ~ 0.42R ~ 42px above diameter (y = 118) -->
    <line x1="80" y1="118" x2="360" y2="118" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="5,4"/>
    <circle cx="220" cy="118" r="4" fill="#dc2626"/>
    <text x="240" y="110" class="sublabel" fill="#dc2626">CM</text>
  </svg>
  `,

  // Q97: Circular frame with masses 3m, m, 2m, 2m
  97: `
  ${SVG_HEADER(460, 280)}
    <!-- Ellipse representing circle in perspective -->
    <ellipse cx="230" cy="140" rx="100" ry="40" fill="none" stroke="#94a3b8" stroke-width="2.5"/>
    <circle cx="230" cy="140" r="3" fill="#0f172a"/>

    <!-- Central perpendicular axis AA' -->
    <line x1="230" y1="40" x2="230" y2="240" stroke="#0f172a" stroke-width="2.5" stroke-dasharray="6,4"/>
    <text x="230" y="30" class="label">A</text>
    <text x="230" y="255" class="label">A'</text>

    <!-- 4 masses on perimeter: Top(230, 100), Bottom(230, 180), Left(130, 140), Right(330, 140) -->
    <circle cx="230" cy="100" r="7" fill="#dc2626"/>
    <text x="250" y="95" class="label" fill="#dc2626">3m</text>

    <circle cx="230" cy="180" r="5" fill="#dc2626"/>
    <text x="245" y="185" class="label" fill="#dc2626">m</text>

    <circle cx="130" cy="140" r="6" fill="#2563eb"/>
    <text x="110" y="140" class="label" fill="#2563eb">2m</text>

    <circle cx="330" cy="140" r="6" fill="#2563eb"/>
    <text x="350" y="140" class="label" fill="#2563eb">2m</text>
  </svg>
  `,

  // Q107: 4 KE vs time graphs
  107: `
  ${SVG_HEADER(540, 240)}
    <!-- (1) Smooth non-zero oscillation (CORRECT) -->
    <g transform="translate(30, 30)">
      <text x="40" y="0" class="label">(1)</text>
      <line x1="20" y1="80" x2="95" y2="80" class="axis" marker-end="url(#arrow)"/>
      <line x1="20" y1="80" x2="20" y2="15" class="axis" marker-end="url(#arrow)"/>
      <text x="10" y="15" class="sublabel">KE</text>
      <text x="100" y="83" class="sublabel">t</text>
      <path d="M 20 40 Q 40 25 55 45 T 90 40" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    </g>

    <!-- (2) U-shaped curve -->
    <g transform="translate(160, 30)">
      <text x="40" y="0" class="label">(2)</text>
      <line x1="20" y1="80" x2="95" y2="80" class="axis" marker-end="url(#arrow)"/>
      <line x1="20" y1="80" x2="20" y2="15" class="axis" marker-end="url(#arrow)"/>
      <text x="10" y="15" class="sublabel">KE</text>
      <text x="100" y="83" class="sublabel">t</text>
      <path d="M 20 30 Q 55 75 90 30" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    </g>

    <!-- (3) Inverted U touching zero -->
    <g transform="translate(290, 30)">
      <text x="40" y="0" class="label">(3)</text>
      <line x1="20" y1="80" x2="95" y2="80" class="axis" marker-end="url(#arrow)"/>
      <line x1="20" y1="80" x2="20" y2="15" class="axis" marker-end="url(#arrow)"/>
      <text x="10" y="15" class="sublabel">KE</text>
      <text x="100" y="83" class="sublabel">t</text>
      <path d="M 20 80 Q 55 25 90 80" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    </g>

    <!-- (4) V-shape -->
    <g transform="translate(420, 30)">
      <text x="40" y="0" class="label">(4)</text>
      <line x1="20" y1="80" x2="95" y2="80" class="axis" marker-end="url(#arrow)"/>
      <line x1="20" y1="80" x2="20" y2="15" class="axis" marker-end="url(#arrow)"/>
      <text x="10" y="15" class="sublabel">KE</text>
      <text x="100" y="83" class="sublabel">t</text>
      <path d="M 20 35 L 55 75 L 90 35" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    </g>
  </svg>
  `,

  // Q109: Three rods AB, AC, AD with axis OO' at 45 deg
  109: `
  ${SVG_HEADER(460, 280)}
    <!-- Point A at (230, 160) -->
    <!-- Rod AD to left, AB to right -->
    <line x1="110" y1="160" x2="350" y2="160" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
    <text x="95" y="160" class="label">D</text>
    <text x="365" y="160" class="label">B</text>

    <!-- Rod AC vertical upwards -->
    <line x1="230" y1="160" x2="230" y2="60" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
    <text x="230" y="45" class="label">C</text>

    <!-- Axis OO' at 45 deg from (150, 240) to (310, 80) -->
    <line x1="140" y1="250" x2="320" y2="70" stroke="#2563eb" stroke-width="2.5"/>
    <text x="130" y="260" class="label" fill="#2563eb">O</text>
    <text x="330" y="60" class="label" fill="#2563eb">O'</text>

    <!-- Angle 45 deg -->
    <path d="M 230 115 A 45 45 0 0 1 262 128" fill="none" stroke="#0f172a" stroke-width="1.8"/>
    <text x="255" y="110" class="sublabel">45&#176;</text>
  </svg>
  `,

  // Q115: Two bodies 2m and 3m separated by distance 5a
  115: `
  ${SVG_HEADER(480, 200)}
    <!-- Distance line from x=120 to x=360 at y=100 -->
    <line x1="120" y1="100" x2="360" y2="100" stroke="#94a3b8" stroke-width="2"/>

    <!-- Body A (mass 2m) at x=120 -->
    <circle cx="120" cy="100" r="9" fill="#2563eb"/>
    <text x="120" y="80" class="label" fill="#2563eb">2m</text>
    <text x="120" y="125" class="label">A</text>

    <!-- Body B (mass 3m) at x=360 -->
    <circle cx="360" cy="100" r="11" fill="#dc2626"/>
    <text x="360" y="80" class="label" fill="#dc2626">3m</text>
    <text x="360" y="125" class="label">B</text>

    <!-- Dimension 5a -->
    <text x="240" y="90" class="label">5a</text>
  </svg>
  `,

  // Q118: Rod hinged at one end making angle theta with vertical
  118: `
  ${SVG_HEADER(440, 300)}
    <!-- Vertical dashed line from hinge (220, 60) down to (220, 250) -->
    <line x1="220" y1="60" x2="220" y2="250" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.8"/>

    <!-- Hinge at (220, 60) -->
    <circle cx="220" cy="60" r="5" fill="#0f172a"/>

    <!-- Rod of length l at angle theta (say 35 deg) to vertical -->
    <!-- (220 + 160*sin(35) = 220 + 92 = 312, 60 + 160*cos(35) = 60 + 131 = 191) -->
    <line x1="220" y1="60" x2="312" y2="191" stroke="#0f172a" stroke-width="7" stroke-linecap="round"/>
    <line x1="220" y1="60" x2="312" y2="191" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>

    <!-- Angle theta -->
    <path d="M 220 110 A 50 50 0 0 0 249 101" fill="none" stroke="#0f172a" stroke-width="1.8"/>
    <text x="240" y="125" class="label">&#952;</text>
    <text x="280" y="115" class="label">l</text>
  </svg>
  `,

  // Q143: Rotating circular disc with points A and B
  143: `
  ${SVG_HEADER(440, 280)}
    <!-- Disc of radius R=90 centered at (220, 140) -->
    <circle cx="220" cy="140" r="90" fill="#f1f5f9" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="220" cy="140" r="4" fill="#0f172a"/>
    <text x="210" y="140" class="sublabel">O</text>

    <!-- Point A and B -->
    <circle cx="280" cy="76" r="5" fill="#2563eb"/>
    <text x="295" y="70" class="label" fill="#2563eb">B</text>

    <circle cx="270" cy="200" r="5" fill="#dc2626"/>
    <text x="285" y="210" class="label" fill="#dc2626">A</text>

    <!-- Radius line and angle -->
    <line x1="220" y1="140" x2="280" y2="76" stroke="#64748b" stroke-width="1.5"/>
    <text x="240" y="100" class="sublabel">R</text>

    <!-- Rotation omega -->
    <path d="M 290 140 A 70 70 0 0 1 270 190" fill="none" stroke="#2563eb" stroke-width="2.2" marker-end="url(#arrow-blue)"/>
    <text x="315" y="165" class="label" fill="#2563eb">&#969;</text>
  </svg>
  `,

  // Q145: Circular plate radius 2R with cavity radius R
  145: `
  ${SVG_HEADER(460, 300)}
    <!-- Main disc radius 2R=110 centered at (210, 150) -->
    <circle cx="210" cy="150" r="110" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Axes -->
    <line x1="80" y1="150" x2="350" y2="150" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <line x1="210" y1="30" x2="210" y2="270" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <circle cx="210" cy="150" r="3" fill="#0f172a"/>

    <!-- Removed cavity of radius R=55 centered at (265, 150) -->
    <circle cx="265" cy="150" r="55" fill="#ffffff" stroke="#0f172a" stroke-width="2.2" stroke-dasharray="4,3"/>
    <circle cx="265" cy="150" r="3" fill="#0f172a"/>

    <text x="265" y="135" class="label">R</text>
    <text x="150" y="135" class="label">2R</text>
  </svg>
  `,

  // Q146: Three figures (A) Semicircle, (B) Quarter circle, (C) Sector
  146: `
  ${SVG_HEADER(540, 220)}
    <!-- Figure A: Semicircle of radius R -->
    <g transform="translate(40, 40)">
      <text x="50" y="0" class="label">(A)</text>
      <path d="M 10 90 A 45 45 0 0 1 100 90" fill="none" stroke="#2563eb" stroke-width="3"/>
      <!-- Cross at center -->
      <line x1="50" y1="85" x2="60" y2="95" stroke="#dc2626" stroke-width="2"/>
      <line x1="60" y1="85" x2="50" y2="95" stroke="#dc2626" stroke-width="2"/>
      <text x="55" y="60" class="sublabel">R</text>
    </g>

    <!-- Figure B: Quarter circle of radius R -->
    <g transform="translate(210, 40)">
      <text x="50" y="0" class="label">(B)</text>
      <path d="M 20 90 A 60 60 0 0 1 80 30" fill="none" stroke="#2563eb" stroke-width="3"/>
      <line x1="15" y1="85" x2="25" y2="95" stroke="#dc2626" stroke-width="2"/>
      <line x1="25" y1="85" x2="15" y2="95" stroke="#dc2626" stroke-width="2"/>
      <text x="55" y="70" class="sublabel">R</text>
    </g>

    <!-- Figure C: Sector of radius R -->
    <g transform="translate(380, 40)">
      <text x="50" y="0" class="label">(C)</text>
      <path d="M 40 40 A 60 60 0 0 1 90 70" fill="none" stroke="#2563eb" stroke-width="3"/>
      <line x1="25" y1="85" x2="35" y2="95" stroke="#dc2626" stroke-width="2"/>
      <line x1="35" y1="85" x2="25" y2="95" stroke="#dc2626" stroke-width="2"/>
      <text x="60" y="55" class="sublabel">R</text>
    </g>
  </svg>
  `,

  // Q148: Three cubes touching each other with centers P, Q, R
  148: `
  ${SVG_HEADER(480, 200)}
    <!-- Three cubes of side 70 in a row -->
    <!-- Cube 1 (P) from x=110 to x=180 -->
    <rect x="110" y="70" width="70" height="70" class="block-blue"/>
    <circle cx="145" cy="105" r="4" fill="#0f172a"/>
    <text x="145" y="105" class="label">P</text>

    <!-- Cube 2 (Q) from x=180 to x=250 -->
    <rect x="180" y="70" width="70" height="70" class="block"/>
    <circle cx="215" cy="105" r="4" fill="#0f172a"/>
    <text x="215" y="105" class="label">Q</text>

    <!-- Cube 3 (R) from x=250 to x=320 -->
    <rect x="250" y="70" width="70" height="70" class="block-blue"/>
    <circle cx="285" cy="105" r="4" fill="#0f172a"/>
    <text x="285" y="105" class="label">R</text>
  </svg>
  `,

  // Q157: Arc of wire of radius r subtending angle theta
  157: `
  ${SVG_HEADER(440, 260)}
    <!-- Vertical dashed axis through center (150, 130) -->
    <line x1="150" y1="30" x2="150" y2="230" stroke="#0f172a" stroke-width="2" stroke-dasharray="6,4"/>
    <circle cx="150" cy="130" r="4" fill="#0f172a"/>

    <!-- Arc subtending angle theta of radius r=100 -->
    <path d="M 230 70 A 100 100 0 0 1 230 190" fill="none" stroke="#2563eb" stroke-width="3.5"/>
    <line x1="150" y1="130" x2="230" y2="70" stroke="#94a3b8" stroke-width="1.8"/>
    <line x1="150" y1="130" x2="230" y2="190" stroke="#94a3b8" stroke-width="1.8"/>

    <!-- Angle theta -->
    <path d="M 180 108 A 35 35 0 0 1 180 152" fill="none" stroke="#0f172a" stroke-width="1.8"/>
    <text x="195" y="130" class="label">&#952;</text>
    <text x="200" y="80" class="sublabel">r</text>
  </svg>
  `,

  // Q162: Circular loop of radius r with tangent axis AB
  162: `
  ${SVG_HEADER(440, 260)}
    <!-- Horizontal tangent axis AB at y=70 -->
    <line x1="80" y1="70" x2="360" y2="70" stroke="#0f172a" stroke-width="2.5"/>
    <text x="95" y="55" class="label">B</text>
    <text x="345" y="55" class="label">A</text>

    <!-- Circular loop centered at (220, 150), radius 80 touching axis at (220, 70) -->
    <circle cx="220" cy="150" r="80" fill="none" stroke="#2563eb" stroke-width="3"/>
    <circle cx="220" cy="150" r="4" fill="#0f172a"/>

    <!-- Radius line to tangent -->
    <line x1="220" y1="150" x2="220" y2="70" stroke="#64748b" stroke-width="1.8"/>
    <text x="235" y="115" class="label">r</text>
  </svg>
  `,

  // Q164: Four solid spheres arrangement
  164: `
  ${SVG_HEADER(460, 300)}
    <!-- Vertical axis yy' at x=200 -->
    <line x1="200" y1="20" x2="200" y2="280" stroke="#0f172a" stroke-width="2.5" stroke-dasharray="6,4"/>
    <text x="200" y="15" class="label">y</text>
    <text x="200" y="295" class="label">y'</text>

    <!-- Sphere 1 (upper-left): center at (155, 100), radius 45 touching axis at x=200 -->
    <circle cx="155" cy="100" r="45" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.2"/>
    <circle cx="155" cy="100" r="3" fill="#0f172a"/>

    <!-- Sphere 2 (lower-left): center at (155, 190), radius 45 touching axis at x=200 -->
    <circle cx="155" cy="190" r="45" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.2"/>
    <circle cx="155" cy="190" r="3" fill="#0f172a"/>

    <!-- Sphere 3 (first right): center at (245, 145), radius 45 touching axis at x=200 -->
    <circle cx="245" cy="145" r="45" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.2"/>
    <circle cx="245" cy="145" r="3" fill="#0f172a"/>

    <!-- Sphere 4 (second right): center at (335, 145), radius 45 touching sphere 3 -->
    <circle cx="335" cy="145" r="45" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.2"/>
    <circle cx="335" cy="145" r="3" fill="#0f172a"/>
  </svg>
  `,

  // Q167: Particle A at rest and B moving with 20 m/s at 30 deg
  167: `
  ${SVG_HEADER(480, 220)}
    <!-- Line joining A and B from (100, 120) to (300, 120) -->
    <line x1="100" y1="120" x2="300" y2="120" stroke="#0f172a" stroke-width="2"/>
    <text x="200" y="105" class="label">10 m</text>

    <!-- Particle A at (100, 120) -->
    <circle cx="100" cy="120" r="6" fill="#0f172a"/>
    <text x="100" y="145" class="label">A</text>

    <!-- Particle B at (300, 120) -->
    <circle cx="300" cy="120" r="6" fill="#0f172a"/>
    <text x="300" y="145" class="label">B</text>

    <!-- Velocity vector of B at 30 deg above line AB -->
    <line x1="300" y1="120" x2="370" y2="120" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <line x1="300" y1="120" x2="380" y2="74" class="vel-arrow" marker-end="url(#arrow-blue)"/>
    <text x="405" y="70" class="label" fill="#2563eb">20 m/s</text>

    <!-- Angle 30 deg -->
    <path d="M 340 120 A 40 40 0 0 0 335 97" fill="none" stroke="#0f172a" stroke-width="1.8"/>
    <text x="355" y="108" class="sublabel">30&#176;</text>
  </svg>
  `
};

async function generateAll() {
  console.log('Generating Rotational Motion Batch 2 Diagrams...');
  const mapping = {};

  for (const [qNum, svgString] of Object.entries(DIAGRAMS)) {
    const filename = `rotational_motion_b2_q${qNum}.png`;
    const localBackendPath = path.join(outDirBackend, filename);
    const localFrontendPath = path.join(outDirFrontend, filename);

    const pngBuffer = await sharp(Buffer.from(svgString.trim()))
      .png({ quality: 95 })
      .toBuffer();

    fs.writeFileSync(localBackendPath, pngBuffer);
    fs.writeFileSync(localFrontendPath, pngBuffer);
    console.log(`Saved local PNG for Batch 2 Q${qNum} -> ${filename}`);

    try {
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'edvedum_rotational_motion',
            public_id: `rotational_motion_b2_q${qNum}`,
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
        local_url: `/uploads/rotational_motion/${filename}`,
        public_id: uploadRes.public_id,
      };
    } catch (uploadErr) {
      console.warn(`Cloudinary upload skipped/failed for Q${qNum}, using local URL:`, uploadErr.message);
      mapping[qNum] = {
        cloudinary_url: `/uploads/rotational_motion/${filename}`,
        local_url: `/uploads/rotational_motion/${filename}`,
      };
    }
  }

  const mapPath = path.resolve(__dirname, 'rotational_motion_batch2_diagrams.json');
  fs.writeFileSync(mapPath, JSON.stringify(mapping, null, 2));
  console.log(`All Batch 2 diagrams generated and saved to ${mapPath}`);
}

generateAll().catch(err => {
  console.error('Fatal diagram generation error:', err);
  process.exit(1);
});
