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

const outDirBackend = path.resolve(__dirname, '../uploads/work_energy_power');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/work_energy_power');
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
    .block-amber { fill: #fffbeb; stroke: #d97706; stroke-width: 2.2; rx: 4; }
    .string-line { stroke: #0f172a; stroke-width: 2; stroke-linecap: round; }
    .pulley { fill: #f1f5f9; stroke: #0f172a; stroke-width: 2; }
    .pulley-center { fill: #0f172a; }
    .label { font-size: 15px; font-weight: 600; fill: #0f172a; text-anchor: middle; dominant-baseline: middle; }
    .sublabel { font-size: 13px; font-weight: 500; fill: #475569; text-anchor: middle; dominant-baseline: middle; }
    .force-arrow { stroke: #dc2626; stroke-width: 2.5; stroke-linecap: round; }
    .vel-arrow { stroke: #2563eb; stroke-width: 2.5; stroke-linecap: round; }
    .spring-path { stroke: #0f172a; stroke-width: 2.2; fill: none; stroke-linecap: round; stroke-linejoin: round; }
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

export const BATCH2_DIAGRAMS = {
  // Q87: Pendulum displaced from A (angle theta) to B (vertical)
  87: `
  ${SVG_HEADER(460, 280)}
    <!-- Ceiling support -->
    <line x1="80" y1="40" x2="200" y2="40" class="surface" />
    <line x1="100" y1="40" x2="115" y2="28" class="hatch" />
    <line x1="140" y1="40" x2="155" y2="28" class="hatch" />
    <line x1="180" y1="40" x2="195" y2="28" class="hatch" />

    <!-- Pivot -->
    <circle cx="140" cy="40" r="4" fill="#0f172a" />

    <!-- Vertical line to position B -->
    <line x1="140" y1="40" x2="140" y2="210" class="string-line" stroke-width="2.2" />
    <circle cx="140" cy="210" r="14" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
    <text x="140" y="210" class="label">m</text>
    <text x="115" y="215" class="label">(B)</text>
    <line x1="155" y1="210" x2="215" y2="210" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="230" y="210" class="label" fill="#dc2626">F</text>

    <!-- Slanted dashed line to position A (angle 60 deg) -->
    <line x1="140" y1="40" x2="260" y2="125" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="4,4" />
    <circle cx="260" cy="125" r="14" fill="#fffbeb" stroke="#d97706" stroke-width="2" />
    <text x="260" y="125" class="label">m</text>
    <text x="285" y="125" class="label">(A)</text>
    <line x1="275" y1="125" x2="335" y2="125" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="350" y="125" class="label" fill="#dc2626">F</text>

    <!-- Angle theta = 60 deg arc -->
    <path d="M 140 100 A 60 60 0 0 1 185 80" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="175" y="65" class="label">θ</text>
    <text x="95" y="125" class="label">l</text>
  </svg>`,

  // Q89: Blocks A and B connected by spring on smooth surface
  89: `
  ${SVG_HEADER(520, 240)}
    <!-- Floor -->
    <line x1="50" y1="180" x2="470" y2="180" class="surface" />

    <!-- Block B moving with 5 m/s -->
    <rect x="90" y="120" width="60" height="55" class="block" />
    <text x="120" y="147" class="label" font-size="18">B</text>
    <line x1="120" y1="90" x2="180" y2="90" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="150" y="70" class="label" fill="#2563eb">5m/s</text>

    <!-- Spring -->
    <path d="M 150 147 L 175 147 L 183 130 L 193 165 L 203 130 L 213 165 L 223 130 L 233 165 L 243 130 L 251 147 L 270 147" class="spring-path" />

    <!-- Block A -->
    <rect x="270" y="120" width="60" height="55" class="block" />
    <text x="300" y="147" class="label" font-size="18">A</text>
  </svg>`,

  // Q91: Body of mass 1kg with upward tension T and acceleration 2 m/s^2
  91: `
  ${SVG_HEADER(360, 260)}
    <!-- Block 1kg -->
    <rect x="140" y="110" width="70" height="60" class="block" />
    <text x="175" y="140" class="label" font-size="18">1kg</text>

    <!-- Tension arrow T upward -->
    <line x1="175" y1="110" x2="175" y2="45" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="195" y="55" class="label" fill="#dc2626">T</text>

    <!-- Acceleration arrow -->
    <line x1="225" y1="140" x2="225" y2="85" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="265" y="110" class="label" fill="#2563eb">2m/s²</text>
  </svg>`,

  // Q92: Mass M suspended on string, struck by bullet
  92: `
  ${SVG_HEADER(400, 300)}
    <!-- Ceiling -->
    <line x1="120" y1="40" x2="240" y2="40" class="surface" />
    <line x1="140" y1="40" x2="155" y2="28" class="hatch" />
    <line x1="180" y1="40" x2="195" y2="28" class="hatch" />
    <line x1="220" y1="40" x2="235" y2="28" class="hatch" />

    <!-- String of length l -->
    <line x1="180" y1="40" x2="180" y2="200" class="string-line" />
    <text x="200" y="120" class="label">l</text>

    <!-- Block M -->
    <rect x="155" y="200" width="50" height="45" class="block" />
    <text x="180" y="222" class="label" font-size="18">M</text>

    <!-- Bullet m/2 with velocity u -->
    <rect x="70" y="215" width="25" height="15" fill="#334155" rx="3" />
    <line x1="95" y1="222" x2="145" y2="222" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="115" y="205" class="label" fill="#2563eb">u</text>
    <text x="80" y="245" class="sublabel">m/2</text>
  </svg>`,

  // Q93: Smooth curved track releasing from 3h into loop of radius h
  93: `
  ${SVG_HEADER(480, 280)}
    <!-- Track curve starting at (100, 70), dropping to bottom (160, 230), circular loop up to (260, 230) -->
    <path d="M 80 60 Q 90 230 180 230 A 60 60 0 1 0 300 230 L 320 230" fill="none" stroke="#0f172a" stroke-width="2.5" />

    <!-- Block at position A (height 3h) -->
    <rect x="70" y="70" width="25" height="20" class="block-amber" transform="rotate(35 80 80)" />
    <text x="60" y="65" class="label">A</text>
    <line x1="60" y1="60" x2="60" y2="230" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="45" y="150" class="label">3h</text>

    <!-- Top of loop B -->
    <circle cx="240" cy="110" r="4" fill="#0f172a" />
    <rect x="230" y="112" width="20" height="15" class="block-blue" />
    <text x="240" y="95" class="label">B</text>

    <!-- Radius h from center (240, 170) -->
    <circle cx="240" cy="170" r="3" fill="#0f172a" />
    <line x1="240" y1="170" x2="285" y2="135" stroke="#475569" stroke-width="1.2" stroke-dasharray="2,2" marker-end="url(#arrow)" />
    <text x="275" y="160" class="sublabel">r=h</text>
    <text x="350" y="180" class="sublabel">Cylindrical surface</text>
  </svg>`,

  // Q109: Pulley with block B (4kg) and block A (6kg)
  109: `
  ${SVG_HEADER(420, 300)}
    <!-- Ceiling -->
    <line x1="120" y1="40" x2="240" y2="40" class="surface" />
    <line x1="140" y1="40" x2="155" y2="28" class="hatch" />
    <line x1="180" y1="40" x2="195" y2="28" class="hatch" />
    <line x1="220" y1="40" x2="235" y2="28" class="hatch" />

    <!-- Pulley bracket & wheel -->
    <line x1="180" y1="40" x2="180" y2="75" stroke="#0f172a" stroke-width="3" />
    <circle cx="180" cy="75" r="18" class="pulley" />
    <circle cx="180" cy="75" r="4" class="pulley-center" />

    <!-- Left block B (4kg) -->
    <line x1="162" y1="75" x2="162" y2="150" class="string-line" />
    <rect x="142" y="150" width="40" height="35" class="block" />
    <text x="162" y="167" class="label">B</text>
    <text x="110" y="167" class="label">4 kg</text>

    <!-- Right block A (6kg) -->
    <line x1="198" y1="75" x2="198" y2="190" class="string-line" />
    <rect x="178" y="190" width="45" height="40" class="block-amber" />
    <text x="200" y="210" class="label">A</text>
    <text x="245" y="210" class="label">6 kg</text>
  </svg>`,

  // Q112: Incline from A to B with horizontal base 4m, mass 2kg, mu = 0.2
  112: `
  ${SVG_HEADER(480, 260)}
    <!-- Incline Wedge -->
    <line x1="80" y1="200" x2="380" y2="200" class="surface" />
    <line x1="80" y1="200" x2="380" y2="70" class="surface" />
    <line x1="380" y1="70" x2="380" y2="200" class="surface" />

    <!-- Labels A at top, B at bottom -->
    <text x="395" y="70" class="label">A</text>
    <text x="65" y="200" class="label">B</text>

    <!-- Block 2kg on incline -->
    <g transform="translate(260, 122) rotate(-23.4)">
      <rect x="-25" y="-30" width="50" height="30" class="block-amber" />
      <text x="0" y="-15" class="label">2 kg</text>
    </g>
    <text x="310" y="140" class="sublabel">μ = 0.2</text>

    <!-- Base dimension 4m -->
    <line x1="80" y1="225" x2="380" y2="225" stroke="#475569" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="230" y="240" class="label">4 m</text>
  </svg>`,

  // Q114: Block A moving towards block B with spring attached
  114: `
  ${SVG_HEADER(500, 220)}
    <!-- Floor -->
    <line x1="50" y1="160" x2="450" y2="160" class="surface" />

    <!-- Block A (m) moving with velocity v -->
    <rect x="90" y="105" width="55" height="50" class="block" />
    <text x="117" y="130" class="label">A</text>
    <text x="117" y="90" class="sublabel">m</text>
    <line x1="150" y1="130" x2="195" y2="130" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="175" y="110" class="label" fill="#2563eb">v</text>

    <!-- Spring attached to B -->
    <path d="M 230 130 L 250 130 L 258 115 L 268 145 L 278 115 L 288 145 L 298 115 L 306 130 L 325 130" class="spring-path" />

    <!-- Block B (m) at rest -->
    <rect x="325" y="105" width="55" height="50" class="block" />
    <text x="352" y="130" class="label">B</text>
    <text x="352" y="90" class="sublabel">m</text>
  </svg>`,

  // Q117: Force vs position graph F(x) from x = 0 to 4
  117: `
  ${SVG_HEADER(460, 260)}
    <!-- Axes -->
    <line x1="80" y1="200" x2="380" y2="200" class="axis" marker-end="url(#arrow)" />
    <text x="400" y="200" class="label">x(m)</text>
    <line x1="80" y1="200" x2="80" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="80" y="25" class="label">F(N)</text>

    <!-- Curve: (0,0) to (1,5), (2,5), (3,10), (4,10) -->
    <path d="M 80 200 L 140 140 L 200 140 L 260 70 L 320 70 L 320 200 Z" fill="#eff6ff" stroke="#2563eb" stroke-width="2.5" />

    <!-- Y-axis markers -->
    <text x="60" y="140" class="label">5</text>
    <text x="60" y="70" class="label">10</text>
    <line x1="75" y1="140" x2="85" y2="140" class="axis" />
    <line x1="75" y1="70" x2="85" y2="70" class="axis" />

    <!-- X-axis markers -->
    <text x="140" y="220" class="label">1</text>
    <text x="200" y="220" class="label">2</text>
    <text x="260" y="220" class="label">3</text>
    <text x="320" y="220" class="label">4</text>
  </svg>`,

  // Q120: Power vs time graphs (1, 2, 3, 4)
  120: `
  ${SVG_HEADER(540, 260)}
    <!-- (1) Hyperbolic decreasing -->
    <g transform="translate(40, 20)">
      <line x1="30" y1="100" x2="110" y2="100" class="axis" marker-end="url(#arrow)" /><text x="120" y="100" class="sublabel">t</text>
      <line x1="30" y1="100" x2="30" y2="20" class="axis" marker-end="url(#arrow)" /><text x="30" y="12" class="sublabel">P</text>
      <path d="M 40 30 Q 55 85 100 90" fill="none" stroke="#2563eb" stroke-width="2" />
      <text x="15" y="30" class="label">(1)</text>
    </g>

    <!-- (2) Linear increasing through origin -->
    <g transform="translate(180, 20)">
      <line x1="30" y1="100" x2="110" y2="100" class="axis" marker-end="url(#arrow)" /><text x="120" y="100" class="sublabel">t</text>
      <line x1="30" y1="100" x2="30" y2="20" class="axis" marker-end="url(#arrow)" /><text x="30" y="12" class="sublabel">P</text>
      <line x1="30" y1="100" x2="100" y2="30" stroke="#2563eb" stroke-width="2.2" />
      <text x="15" y="30" class="label">(2)</text>
    </g>

    <!-- (3) Linear decreasing -->
    <g transform="translate(320, 20)">
      <line x1="30" y1="100" x2="110" y2="100" class="axis" marker-end="url(#arrow)" /><text x="120" y="100" class="sublabel">t</text>
      <line x1="30" y1="100" x2="30" y2="20" class="axis" marker-end="url(#arrow)" /><text x="30" y="12" class="sublabel">P</text>
      <line x1="40" y1="30" x2="100" y2="100" stroke="#2563eb" stroke-width="2.2" />
      <text x="15" y="30" class="label">(3)</text>
    </g>

    <!-- (4) Parabolic increasing -->
    <g transform="translate(440, 20)">
      <line x1="30" y1="100" x2="110" y2="100" class="axis" marker-end="url(#arrow)" /><text x="120" y="100" class="sublabel">t</text>
      <line x1="30" y1="100" x2="30" y2="20" class="axis" marker-end="url(#arrow)" /><text x="30" y="12" class="sublabel">P</text>
      <path d="M 30 100 Q 75 95 100 30" fill="none" stroke="#2563eb" stroke-width="2" />
      <text x="15" y="30" class="label">(4)</text>
    </g>
  </svg>`,

  // Q134: Two balls P and Q moving right
  134: `
  ${SVG_HEADER(460, 220)}
    <!-- Floor -->
    <line x1="60" y1="160" x2="400" y2="160" class="surface" />

    <!-- Ball P (mass m, velocity v) -->
    <circle cx="150" cy="120" r="25" fill="#eff6ff" stroke="#2563eb" stroke-width="2.2" />
    <text x="150" y="120" class="label">P</text>
    <text x="150" y="80" class="sublabel">m</text>
    <line x1="180" y1="120" x2="230" y2="120" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="205" y="100" class="label" fill="#2563eb">v</text>

    <!-- Ball Q (mass 2m, velocity v/4) -->
    <circle cx="300" cy="115" r="32" fill="#fffbeb" stroke="#d97706" stroke-width="2.2" />
    <text x="300" y="115" class="label">Q</text>
    <text x="300" y="70" class="sublabel">2m</text>
    <line x1="335" y1="115" x2="375" y2="115" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="355" y="95" class="label" fill="#2563eb">v/4</text>
  </svg>`,

  // Q135: Smooth roller coaster track from P at 10m to R at 5m
  135: `
  ${SVG_HEADER(500, 280)}
    <!-- Ground reference -->
    <line x1="50" y1="220" x2="450" y2="220" class="surface" />

    <!-- Roller coaster curve from (100, 70) down to (250, 220) up to (380, 145) -->
    <path d="M 80 80 Q 150 220 250 220 Q 330 220 380 140" fill="none" stroke="#0f172a" stroke-width="2.5" />

    <!-- Position P at top left -->
    <circle cx="80" cy="80" r="12" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
    <text x="80" y="80" class="label">m</text>
    <text x="60" y="80" class="label">P</text>
    <line x1="50" y1="80" x2="50" y2="220" stroke="#475569" stroke-width="1.5" stroke-dasharray="3,3" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="30" y="150" class="label">10 m</text>

    <!-- Position R at right -->
    <circle cx="380" cy="140" r="4" fill="#0f172a" />
    <text x="395" y="130" class="label">R</text>
    <line x1="380" y1="140" x2="410" y2="115" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <line x1="430" y1="140" x2="430" y2="220" stroke="#475569" stroke-width="1.5" stroke-dasharray="3,3" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="445" y="180" class="label">5m</text>
  </svg>`,

  // Q138: Man pulling rope lifting mass 10kg by 0.5m
  138: `
  ${SVG_HEADER(500, 260)}
    <!-- Overhead support & pulley -->
    <line x1="160" y1="40" x2="380" y2="40" class="surface" />
    <circle cx="340" cy="65" r="16" class="pulley" />
    <circle cx="340" cy="65" r="3.5" class="pulley-center" />

    <!-- Vertical hanging mass m = 10 kg -->
    <line x1="356" y1="65" x2="356" y2="160" class="string-line" />
    <rect x="336" y="160" width="40" height="35" class="block" />
    <text x="356" y="177" class="label">m</text>
    <text x="395" y="177" class="label">10 kg</text>

    <!-- Height dimension 0.5 m -->
    <line x1="385" y1="140" x2="385" y2="195" stroke="#475569" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="415" y="145" class="sublabel">0.5 m</text>

    <!-- Slanted rope pulled by man at 60 deg -->
    <line x1="340" y1="65" x2="220" y2="180" class="string-line" />
    <circle cx="210" cy="180" r="10" fill="#cbd5e1" stroke="#0f172a" />
    <line x1="210" y1="190" x2="210" y2="230" stroke="#0f172a" stroke-width="2.5" />
    <text x="270" y="140" class="sublabel">60°</text>
  </svg>`,

  // Q141: Ball striking surface at angle theta and rebounding at angle alpha
  141: `
  ${SVG_HEADER(460, 240)}
    <!-- Floor -->
    <line x1="60" y1="180" x2="400" y2="180" class="surface" />

    <!-- Normal line at impact point (230, 180) -->
    <line x1="230" y1="50" x2="230" y2="180" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4,4" />

    <!-- Incident ray (speed u, angle theta to normal) -->
    <line x1="140" y1="70" x2="230" y2="180" class="vel-arrow" stroke-width="2.2" marker-mid="url(#arrow-blue)" />
    <text x="130" y="60" class="label" fill="#2563eb">u</text>
    <path d="M 230 130 A 50 50 0 0 0 195 145" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="205" y="125" class="label">θ</text>

    <!-- Rebounded ray (angle alpha to normal) -->
    <line x1="230" y1="180" x2="330" y2="80" stroke="#dc2626" stroke-width="2.2" marker-end="url(#arrow-red)" />
    <path d="M 230 130 A 50 50 0 0 1 265 145" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="255" y="125" class="label">α</text>
  </svg>`,

  // Q151: Graphs between sqrt(E) and 1/p
  151: `
  ${SVG_HEADER(540, 260)}
    <!-- (1) Linear positive slope -->
    <g transform="translate(40, 20)">
      <line x1="30" y1="100" x2="110" y2="100" class="axis" marker-end="url(#arrow)" /><text x="120" y="100" class="sublabel">1/p</text>
      <line x1="30" y1="100" x2="30" y2="20" class="axis" marker-end="url(#arrow)" /><text x="30" y="12" class="sublabel">√E</text>
      <line x1="30" y1="100" x2="90" y2="40" stroke="#2563eb" stroke-width="2" />
      <text x="15" y="30" class="label">(1)</text>
    </g>

    <!-- (2) Rectangular hyperbola (correct) -->
    <g transform="translate(180, 20)">
      <line x1="30" y1="100" x2="110" y2="100" class="axis" marker-end="url(#arrow)" /><text x="120" y="100" class="sublabel">1/p</text>
      <line x1="30" y1="100" x2="30" y2="20" class="axis" marker-end="url(#arrow)" /><text x="30" y="12" class="sublabel">√E</text>
      <path d="M 40 30 Q 48 85 100 90" fill="none" stroke="#2563eb" stroke-width="2.5" />
      <text x="15" y="30" class="label">(2)</text>
    </g>

    <!-- (3) Linear negative slope -->
    <g transform="translate(320, 20)">
      <line x1="30" y1="100" x2="110" y2="100" class="axis" marker-end="url(#arrow)" /><text x="120" y="100" class="sublabel">1/p</text>
      <line x1="30" y1="100" x2="30" y2="20" class="axis" marker-end="url(#arrow)" /><text x="30" y="12" class="sublabel">√E</text>
      <line x1="40" y1="40" x2="90" y2="100" stroke="#2563eb" stroke-width="2" />
      <text x="15" y="30" class="label">(3)</text>
    </g>

    <!-- (4) Concave curve -->
    <g transform="translate(440, 20)">
      <line x1="30" y1="100" x2="110" y2="100" class="axis" marker-end="url(#arrow)" /><text x="120" y="100" class="sublabel">1/p</text>
      <line x1="30" y1="100" x2="30" y2="20" class="axis" marker-end="url(#arrow)" /><text x="30" y="12" class="sublabel">√E</text>
      <path d="M 30 100 Q 80 95 100 40" fill="none" stroke="#2563eb" stroke-width="2" />
      <text x="15" y="30" class="label">(4)</text>
    </g>
  </svg>`,

  // Q155: Pulley system with block A on table and movable pulley with block B
  155: `
  ${SVG_HEADER(480, 280)}
    <!-- Table & Support -->
    <line x1="80" y1="120" x2="280" y2="120" class="surface" />

    <!-- Block A on table -->
    <rect x="130" y="75" width="55" height="45" class="block" />
    <text x="157" y="97" class="label">A</text>

    <!-- Fixed pulley at table edge -->
    <circle cx="280" cy="115" r="14" class="pulley" />
    <circle cx="280" cy="115" r="3" class="pulley-center" />
    <line x1="185" y1="105" x2="280" y2="105" class="string-line" />

    <!-- String going down around movable pulley at (320, 180) -->
    <line x1="280" y1="105" x2="310" y2="180" class="string-line" />
    <circle cx="320" cy="180" r="14" class="pulley" />
    <circle cx="320" cy="180" r="3" class="pulley-center" />
    <line x1="330" y1="180" x2="330" y2="50" class="string-line" />
    <!-- Ceiling anchor for right string -->
    <line x1="310" y1="50" x2="350" y2="50" class="surface" />

    <!-- Block B hanging from movable pulley -->
    <line x1="320" y1="194" x2="320" y2="225" class="string-line" />
    <rect x="300" y="225" width="40" height="35" class="block-amber" />
    <text x="320" y="242" class="label">B</text>
  </svg>`,

  // Q161: Quarter circular track of radius R with block pulled from A to B
  161: `
  ${SVG_HEADER(460, 280)}
    <!-- Pivot O at top left (140, 50) -->
    <circle cx="140" cy="50" r="3.5" fill="#0f172a" />
    <text x="125" y="45" class="label">O</text>

    <!-- Radius lines R -->
    <line x1="140" y1="50" x2="140" y2="220" stroke="#0f172a" stroke-width="2" />
    <text x="120" y="135" class="label">R</text>
    <line x1="140" y1="50" x2="310" y2="50" stroke="#0f172a" stroke-width="2" />
    <text x="225" y="35" class="label">R</text>

    <!-- Quarter circular arc from (140, 220) to (310, 50) -->
    <path d="M 140 220 A 170 170 0 0 1 310 50 L 310 220 Z" fill="#f1f5f9" stroke="#0f172a" stroke-width="2.5" />

    <!-- Block at A (bottom) -->
    <rect x="125" y="210" width="30" height="20" class="block" />
    <text x="110" y="220" class="label">A</text>

    <!-- Point B at top right -->
    <text x="325" y="50" class="label">B</text>
    <!-- Pulling force F on rope along chord -->
    <line x1="140" y1="220" x2="310" y2="50" stroke="#2563eb" stroke-width="2" stroke-dasharray="3,3" />
    <line x1="310" y1="50" x2="360" y2="50" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="375" y="50" class="label" fill="#dc2626">F</text>
  </svg>`,

  // Q191: Colliding balls in figure (i) and (ii)
  191: `
  ${SVG_HEADER(520, 260)}
    <!-- Figure (i): Approach -->
    <text x="70" y="60" class="label" font-size="16">Figure (i)</text>
    <circle cx="180" cy="60" r="22" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
    <text x="180" y="60" class="label">I</text>
    <line x1="180" y1="25" x2="230" y2="25" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="205" y="15" class="label" fill="#2563eb">30 m/s</text>

    <circle cx="330" cy="60" r="22" fill="#fffbeb" stroke="#d97706" stroke-width="2" />
    <text x="330" y="60" class="label">II</text>
    <line x1="330" y1="25" x2="280" y2="25" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="305" y="15" class="label" fill="#2563eb">20 m/s</text>

    <!-- Figure (ii): Separation -->
    <text x="70" y="180" class="label" font-size="16">Figure (ii)</text>
    <circle cx="180" cy="180" r="22" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
    <text x="180" y="180" class="label">I</text>
    <line x1="180" y1="145" x2="130" y2="145" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="155" y="135" class="label" fill="#2563eb">20 m/s</text>

    <circle cx="330" cy="180" r="22" fill="#fffbeb" stroke="#d97706" stroke-width="2" />
    <text x="330" y="180" class="label">II</text>
    <line x1="330" y1="145" x2="380" y2="145" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="355" y="135" class="label" fill="#2563eb">30 m/s</text>
  </svg>`,

  // Q197: Closed loop between a and b with path 1 and path 2
  197: `
  ${SVG_HEADER(440, 240)}
    <!-- Point a and Point b -->
    <circle cx="100" cy="120" r="4" fill="#0f172a" />
    <text x="80" y="120" class="label">a</text>
    <circle cx="340" cy="120" r="4" fill="#0f172a" />
    <text x="360" y="120" class="label">b</text>

    <!-- Path 1 (upper curve from a to b) -->
    <path d="M 100 120 Q 220 30 340 120" fill="none" stroke="#2563eb" stroke-width="2.5" marker-mid="url(#arrow-blue)" />
    <text x="220" y="45" class="label" fill="#2563eb">1</text>

    <!-- Path 2 (lower curve from b to a) -->
    <path d="M 340 120 Q 220 210 100 120" fill="none" stroke="#dc2626" stroke-width="2.5" marker-mid="url(#arrow-red)" />
    <text x="220" y="215" class="label" fill="#dc2626">2</text>
  </svg>`,

  // Q203: Conservative field with paths I, II, III from A to B
  203: `
  ${SVG_HEADER(460, 280)}
    <!-- Point A at bottom left (120, 200) and B at top right (300, 60) -->
    <circle cx="120" cy="200" r="4" fill="#0f172a" />
    <text x="105" y="200" class="label">A</text>
    <circle cx="300" cy="60" r="4" fill="#0f172a" />
    <text x="315" y="60" class="label">B</text>

    <!-- Path I: Horizontal then vertical -->
    <path d="M 120 200 L 300 200 L 300 60" fill="none" stroke="#0f172a" stroke-width="2" stroke-dasharray="4,4" />
    <text x="210" y="215" class="label">I</text>
    <text x="315" y="130" class="sublabel">l</text>
    <text x="210" y="235" class="sublabel">l</text>

    <!-- Path II: Straight diagonal line -->
    <line x1="120" y1="200" x2="300" y2="60" stroke="#2563eb" stroke-width="2.5" marker-mid="url(#arrow-blue)" />
    <text x="225" y="120" class="label" fill="#2563eb">II</text>

    <!-- Path III: Quarter circular arc -->
    <path d="M 120 200 Q 120 60 300 60" fill="none" stroke="#dc2626" stroke-width="2.5" />
    <text x="160" y="75" class="label" fill="#dc2626">III</text>
  </svg>`
};

async function generateAll() {
  const mapping = {};
  console.log(`Starting Batch 2 diagram generation for ${Object.keys(BATCH2_DIAGRAMS).length} diagrams...`);

  for (const [qNum, svgString] of Object.entries(BATCH2_DIAGRAMS)) {
    const filename = `wpe_b2_q${qNum}.png`;
    const localBackendPath = path.join(outDirBackend, filename);
    const localFrontendPath = path.join(outDirFrontend, filename);

    const pngBuffer = await sharp(Buffer.from(svgString.trim()))
      .png({ quality: 95 })
      .toBuffer();

    fs.writeFileSync(localBackendPath, pngBuffer);
    fs.writeFileSync(localFrontendPath, pngBuffer);
    console.log(`Saved local PNG for Q${qNum} -> ${filename}`);

    try {
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'edvedum_work_energy_power',
            public_id: `wpe_b2_q${qNum}`,
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
        local_url: `/uploads/work_energy_power/${filename}`,
        public_id: uploadRes.public_id,
      };
    } catch (uploadErr) {
      console.warn(`Cloudinary upload skipped/failed for Q${qNum}, using local URL:`, uploadErr.message);
      mapping[qNum] = {
        cloudinary_url: `/uploads/work_energy_power/${filename}`,
        local_url: `/uploads/work_energy_power/${filename}`,
      };
    }
  }

  const mapPath = path.resolve(__dirname, 'work_energy_power_batch2_diagrams.json');
  fs.writeFileSync(mapPath, JSON.stringify(mapping, null, 2));
  console.log(`All Batch 2 diagrams generated and saved to ${mapPath}`);
}

generateAll().catch(err => {
  console.error('Fatal diagram generation error:', err);
  process.exit(1);
});
