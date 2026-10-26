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

export const DIAGRAMS = {
  // Q4: Two identical masses A and B on same vertical line
  4: `
  ${SVG_HEADER(360, 320)}
    <!-- Ground -->
    <line x1="80" y1="280" x2="280" y2="280" class="surface" />
    <line x1="90" y1="280" x2="70" y2="295" class="hatch" />
    <line x1="130" y1="280" x2="110" y2="295" class="hatch" />
    <line x1="170" y1="280" x2="150" y2="295" class="hatch" />
    <line x1="210" y1="280" x2="190" y2="295" class="hatch" />
    <line x1="250" y1="280" x2="230" y2="295" class="hatch" />

    <!-- Vertical dashed line -->
    <line x1="180" y1="60" x2="180" y2="250" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="5,4" />

    <!-- Mass A at top (height 50 m) -->
    <rect x="160" y="50" width="40" height="25" class="block" />
    <text x="180" y="62" class="label">A</text>
    <text x="235" y="62" class="sublabel">u = 0 (rest)</text>

    <!-- Height dimension 50 m -->
    <line x1="120" y1="62" x2="120" y2="250" stroke="#475569" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="90" y="156" class="label">50 m</text>

    <!-- Mass B at ground projected upwards with 50 m/s -->
    <rect x="160" y="240" width="40" height="25" class="block-blue" />
    <text x="180" y="252" class="label">B</text>
    <line x1="180" y1="230" x2="180" y2="185" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="245" y="205" class="label" fill="#2563eb">50 m/s</text>
  </svg>`,

  // Q5: Suspended particle A (string 2l) collides with B (string l)
  5: `
  ${SVG_HEADER(480, 300)}
    <!-- Ceiling / Pivot -->
    <line x1="180" y1="50" x2="340" y2="50" class="surface" />
    <line x1="200" y1="50" x2="215" y2="38" class="hatch" />
    <line x1="240" y1="50" x2="255" y2="38" class="hatch" />
    <line x1="280" y1="50" x2="295" y2="38" class="hatch" />
    <line x1="320" y1="50" x2="335" y2="38" class="hatch" />

    <!-- Pivot point O -->
    <circle cx="260" cy="50" r="4" fill="#0f172a" />
    <line x1="260" y1="50" x2="260" y2="250" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,4" />

    <!-- Angle arc theta -->
    <path d="M 235 90 A 45 45 0 0 1 260 95" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="245" y="80" class="label">θ</text>

    <!-- String 2l to particle A -->
    <line x1="260" y1="50" x2="150" y2="190" class="string-line" stroke-width="2.2" />
    <circle cx="150" cy="190" r="14" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
    <text x="150" y="190" class="label">A</text>
    <text x="190" y="110" class="label">2l</text>

    <!-- Arc trajectory from A to bottom -->
    <path d="M 150 190 A 180 180 0 0 0 260 230" fill="none" stroke="#94a3b8" stroke-dasharray="3,3" />

    <!-- String l to particle B (hanging vertically) -->
    <circle cx="340" cy="50" r="4" fill="#0f172a" />
    <line x1="340" y1="50" x2="340" y2="170" class="string-line" />
    <circle cx="340" cy="170" r="14" fill="#fffbeb" stroke="#d97706" stroke-width="2" />
    <text x="340" y="170" class="label">B</text>
    <text x="360" y="110" class="label">l</text>

    <!-- Horizontal line where B reaches -->
    <line x1="260" y1="50" x2="420" y2="50" stroke="#cbd5e1" stroke-dasharray="3,3" />
    <line x1="340" y1="50" x2="420" y2="50" class="surface" />
    <line x1="390" y1="50" x2="390" y2="170" stroke="#475569" stroke-width="1.2" stroke-dasharray="3,3" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="405" y="110" class="sublabel">l</text>
  </svg>`,

  // Q6: Force vs Position F(x) curve with equilibrium points
  6: `
  ${SVG_HEADER(520, 280)}
    <!-- Axes -->
    <line x1="50" y1="210" x2="480" y2="210" class="axis" marker-end="url(#arrow)" />
    <text x="495" y="210" class="label">x</text>
    <line x1="230" y1="250" x2="230" y2="30" class="axis" marker-end="url(#arrow)" />
    <text x="230" y="18" class="label">F</text>

    <!-- Equilibrium Curve: passes through x-axis at B, D, F -->
    <path d="M 80 210 Q 115 110 150 110 Q 185 110 220 210 Q 240 250 260 210 Q 280 80 320 80 Q 360 80 390 210 Q 420 250 450 210" 
          fill="none" stroke="#0f172a" stroke-width="2.5" />

    <!-- Points along curve and axis -->
    <!-- Point A -->
    <circle cx="80" cy="210" r="3.5" fill="#0f172a" />
    <text x="80" y="230" class="label">A</text>

    <!-- Point B (slope > 0: unstable) -->
    <circle cx="220" cy="210" r="3.5" fill="#0f172a" />
    <text x="210" y="230" class="label">B</text>

    <!-- Peak C -->
    <circle cx="250" cy="235" r="3" fill="#0f172a" />
    <text x="250" y="255" class="label">C</text>

    <!-- Point D (slope > 0: unstable) -->
    <circle cx="270" cy="180" r="3" fill="#0f172a" />
    <text x="280" y="230" class="label">D</text>

    <!-- Point E -->
    <circle cx="350" cy="120" r="3" fill="#0f172a" />
    <text x="350" y="230" class="label">E</text>

    <!-- Point F -->
    <circle cx="390" cy="210" r="3.5" fill="#0f172a" />
    <text x="390" y="230" class="label">F</text>
  </svg>`,

  // Q7: Horizontal spring-block with constant force F on smooth surface
  7: `
  ${SVG_HEADER(500, 240)}
    <!-- Wall on left -->
    <line x1="80" y1="70" x2="80" y2="190" class="surface" />
    <line x1="80" y1="85" x2="65" y2="100" class="hatch" />
    <line x1="80" y1="115" x2="65" y2="130" class="hatch" />
    <line x1="80" y1="145" x2="65" y2="160" class="hatch" />
    <line x1="80" y1="175" x2="65" y2="190" class="hatch" />

    <!-- Smooth surface -->
    <line x1="70" y1="190" x2="440" y2="190" class="surface" />
    <text x="260" y="215" class="sublabel">smooth surface</text>

    <!-- Spring k -->
    <path d="M 80 140 L 110 140 
             L 120 120 L 135 160 L 150 120 L 165 160 L 180 120 L 195 160 L 210 120 L 225 160 L 240 120 L 255 160 L 265 140 L 280 140" 
          class="spring-path" />
    <text x="185" y="105" class="label">k</text>

    <!-- Block m -->
    <rect x="280" y="105" width="70" height="70" class="block" />
    <text x="315" y="140" class="label" font-size="18">m</text>

    <!-- Pulling force F -->
    <line x1="350" y1="140" x2="430" y2="140" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="445" y="140" class="label" fill="#dc2626">F</text>
  </svg>`,

  // Q9: Spring compressed by x against mass m, entering circular track of radius R
  9: `
  ${SVG_HEADER(560, 280)}
    <!-- Left wall -->
    <line x1="50" y1="110" x2="50" y2="230" class="surface" />
    <line x1="50" y1="130" x2="35" y2="145" class="hatch" />
    <line x1="50" y1="160" x2="35" y2="175" class="hatch" />
    <line x1="50" y1="190" x2="35" y2="205" class="hatch" />
    <line x1="50" y1="220" x2="35" y2="235" class="hatch" />

    <!-- Ground -->
    <line x1="45" y1="230" x2="380" y2="230" class="surface" />

    <!-- Compressed Spring -->
    <path d="M 50 190 L 75 190 L 82 175 L 92 205 L 102 175 L 112 205 L 122 175 L 132 205 L 140 190 L 155 190" class="spring-path" />
    <text x="105" y="160" class="label">k</text>

    <!-- Mass m in contact -->
    <rect x="155" y="165" width="50" height="50" class="block" />
    <text x="180" y="190" class="label">m</text>

    <!-- Compression x dimension -->
    <line x1="205" y1="150" x2="245" y2="150" stroke="#475569" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="225" y="135" class="sublabel">x</text>

    <!-- Natural length dashed line -->
    <line x1="245" y1="140" x2="245" y2="230" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
    <text x="255" y="245" class="sublabel">Natural length</text>

    <!-- Circular loop of radius R -->
    <circle cx="430" cy="150" r="80" fill="none" stroke="#0f172a" stroke-width="2.5" />
    <line x1="430" y1="150" x2="490" y2="95" stroke="#475569" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrow)" />
    <text x="470" y="115" class="label">R</text>
    <text x="430" y="245" class="sublabel">smooth track</text>
  </svg>`,

  // Q19: Potential energy plot U vs x with stable equilibrium points
  19: `
  ${SVG_HEADER(500, 260)}
    <!-- Axes -->
    <line x1="60" y1="210" x2="460" y2="210" class="axis" marker-end="url(#arrow)" />
    <text x="475" y="210" class="label">x</text>
    <line x1="100" y1="230" x2="100" y2="30" class="axis" marker-end="url(#arrow)" />
    <text x="100" y="18" class="label">U</text>

    <!-- Double-well curve with local minima at b and d -->
    <path d="M 120 70 Q 145 100 170 180 Q 195 200 220 180 Q 250 80 280 110 Q 310 130 330 180 Q 350 200 370 170 Q 400 90 420 140" 
          fill="none" stroke="#0f172a" stroke-width="2.5" />

    <!-- Minima and Maxima labeled -->
    <!-- Point a (slope 0 or peak) -->
    <line x1="130" y1="80" x2="130" y2="210" stroke="#cbd5e1" stroke-dasharray="3,3" />
    <text x="130" y="225" class="label">a</text>

    <!-- Point b (minimum - stable) -->
    <line x1="195" y1="190" x2="195" y2="210" stroke="#2563eb" stroke-dasharray="3,3" />
    <circle cx="195" cy="190" r="4" fill="#2563eb" />
    <text x="195" y="225" class="label" fill="#2563eb">b</text>

    <!-- Point c (peak - unstable) -->
    <line x1="270" y1="100" x2="270" y2="210" stroke="#cbd5e1" stroke-dasharray="3,3" />
    <text x="270" y="225" class="label">c</text>

    <!-- Point d (minimum - stable) -->
    <line x1="345" y1="190" x2="345" y2="210" stroke="#2563eb" stroke-dasharray="3,3" />
    <circle cx="345" cy="190" r="4" fill="#2563eb" />
    <text x="345" y="225" class="label" fill="#2563eb">d</text>

    <!-- Point e (peak) -->
    <line x1="385" y1="110" x2="385" y2="210" stroke="#cbd5e1" stroke-dasharray="3,3" />
    <text x="385" y="225" class="label">e</text>

    <!-- Point f -->
    <line x1="420" y1="140" x2="420" y2="210" stroke="#cbd5e1" stroke-dasharray="3,3" />
    <text x="420" y="225" class="label">f</text>
  </svg>`,

  // Q21: Ball 1 collides with identical ball 2 at rest
  21: `
  ${SVG_HEADER(460, 220)}
    <!-- Floor -->
    <line x1="50" y1="170" x2="410" y2="170" class="surface" />
    <line x1="60" y1="170" x2="45" y2="185" class="hatch" />
    <line x1="120" y1="170" x2="105" y2="185" class="hatch" />
    <line x1="180" y1="170" x2="165" y2="185" class="hatch" />
    <line x1="240" y1="170" x2="225" y2="185" class="hatch" />
    <line x1="300" y1="170" x2="285" y2="185" class="hatch" />
    <line x1="360" y1="170" x2="345" y2="185" class="hatch" />

    <!-- Ball 1 moving right -->
    <circle cx="160" cy="130" r="26" fill="#eff6ff" stroke="#2563eb" stroke-width="2.2" />
    <text x="160" y="130" class="label">1</text>
    <line x1="195" y1="130" x2="250" y2="130" class="vel-arrow" marker-end="url(#arrow-blue)" />

    <!-- Ball 2 at rest -->
    <circle cx="290" cy="130" r="26" fill="#fffbeb" stroke="#d97706" stroke-width="2.2" />
    <text x="290" y="130" class="label">2</text>
    <text x="290" y="85" class="sublabel">at rest</text>
  </svg>`,

  // Q27: Block C moving towards block A connected to B via spring
  27: `
  ${SVG_HEADER(560, 240)}
    <!-- Smooth surface -->
    <line x1="40" y1="190" x2="520" y2="190" class="surface" />
    <text x="475" y="210" class="sublabel">smooth</text>

    <!-- Block C moving right with v0 -->
    <rect x="70" y="130" width="55" height="50" class="block-blue" />
    <text x="97" y="155" class="label">C</text>
    <line x1="130" y1="155" x2="175" y2="155" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="155" y="135" class="label" fill="#2563eb">v₀</text>

    <!-- Block A (mass m) -->
    <rect x="230" y="130" width="55" height="50" class="block" />
    <text x="257" y="155" class="label">A</text>
    <text x="257" y="115" class="sublabel">m</text>

    <!-- Spring K -->
    <path d="M 285 155 L 305 155 L 313 140 L 323 170 L 333 140 L 343 170 L 353 140 L 363 170 L 373 140 L 381 155 L 400 155" class="spring-path" />
    <text x="342" y="125" class="label">K</text>

    <!-- Block B (mass 2m) -->
    <rect x="400" y="120" width="70" height="60" class="block-amber" />
    <text x="435" y="150" class="label">B</text>
    <text x="435" y="105" class="sublabel">2m</text>
  </svg>`,

  // Q35: Vertical spring hanging from ceiling with mass m
  35: `
  ${SVG_HEADER(360, 320)}
    <!-- Ceiling -->
    <line x1="110" y1="40" x2="250" y2="40" class="surface" />
    <line x1="130" y1="40" x2="145" y2="28" class="hatch" />
    <line x1="170" y1="40" x2="185" y2="28" class="hatch" />
    <line x1="210" y1="40" x2="225" y2="28" class="hatch" />

    <!-- Vertical spring -->
    <path d="M 180 40 L 180 70 
             L 165 80 L 195 95 L 165 110 L 195 125 L 165 140 L 195 155 L 165 170 L 195 185 L 180 195 L 180 215" 
          class="spring-path" />
    <text x="235" y="135" class="label">k</text>

    <!-- Block m -->
    <rect x="150" y="215" width="60" height="50" class="block" />
    <text x="180" y="240" class="label" font-size="18">m</text>
  </svg>`,

  // Q37: Block m sliding on smooth surface towards spring on wall
  37: `
  ${SVG_HEADER(500, 240)}
    <!-- Right Wall -->
    <line x1="420" y1="70" x2="420" y2="190" class="surface" />
    <line x1="420" y1="85" x2="435" y2="100" class="hatch" />
    <line x1="420" y1="115" x2="435" y2="130" class="hatch" />
    <line x1="420" y1="145" x2="435" y2="160" class="hatch" />
    <line x1="420" y1="175" x2="435" y2="190" class="hatch" />

    <!-- Floor (mu = 0) -->
    <line x1="60" y1="190" x2="430" y2="190" class="surface" />
    <text x="140" y="215" class="label">μ = 0</text>

    <!-- Block m moving with velocity v -->
    <rect x="110" y="125" width="60" height="55" class="block" />
    <text x="140" y="152" class="label">m</text>
    <line x1="175" y1="152" x2="235" y2="152" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="205" y="132" class="label" fill="#2563eb">v</text>

    <!-- Spring k attached to right wall -->
    <path d="M 420 152 L 390 152 L 380 135 L 368 170 L 356 135 L 344 170 L 332 135 L 320 170 L 308 135 L 298 152 L 280 152" class="spring-path" />
    <text x="350" y="115" class="label">k</text>
  </svg>`,

  // Q41: Force F vs distance x graph (Triangle 0 to 4 m, F = 4 N)
  41: `
  ${SVG_HEADER(460, 260)}
    <!-- Axes -->
    <line x1="80" y1="200" x2="400" y2="200" class="axis" marker-end="url(#arrow)" />
    <text x="420" y="200" class="label">x(m)</text>
    <line x1="80" y1="200" x2="80" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="80" y="25" class="label">F(N)</text>

    <!-- Triangle curve -->
    <path d="M 80 200 L 260 70 L 260 200 Z" fill="#eff6ff" stroke="#2563eb" stroke-width="2.5" />

    <!-- Labels -->
    <line x1="75" y1="70" x2="85" y2="70" class="axis" />
    <text x="55" y="70" class="label">4N</text>

    <line x1="260" y1="195" x2="260" y2="205" class="axis" />
    <text x="260" y="225" class="label">4</text>
    <text x="80" y="225" class="label">0</text>
  </svg>`,

  // Q43: Block m dropped onto vertical spring resting on ground
  43: `
  ${SVG_HEADER(380, 320)}
    <!-- Ground -->
    <line x1="110" y1="270" x2="270" y2="270" class="surface" />
    <line x1="125" y1="270" x2="110" y2="285" class="hatch" />
    <line x1="165" y1="270" x2="150" y2="285" class="hatch" />
    <line x1="205" y1="270" x2="190" y2="285" class="hatch" />
    <line x1="245" y1="270" x2="230" y2="285" class="hatch" />

    <!-- Vertical spring of stiffness k resting on floor -->
    <path d="M 190 270 L 190 240 
             L 175 225 L 205 210 L 175 195 L 205 180 L 175 165 L 205 150 L 175 135 L 190 125 L 190 115" 
          class="spring-path" />
    <text x="235" y="180" class="label">k</text>

    <!-- Block m dropped from relaxed position -->
    <rect x="160" y="55" width="60" height="45" class="block" />
    <text x="190" y="78" class="label">m</text>
    <line x1="190" y1="102" x2="190" y2="112" stroke="#dc2626" stroke-width="1.8" marker-end="url(#arrow-red)" />
  </svg>`,

  // Q44: Heavy mass M >> m collides with spring on mass m
  44: `
  ${SVG_HEADER(560, 240)}
    <!-- Floor -->
    <line x1="40" y1="190" x2="520" y2="190" class="surface" />

    <!-- Massive block M >> m -->
    <rect x="70" y="100" width="80" height="80" class="block" />
    <text x="110" y="140" class="label" font-size="20">M</text>
    <line x1="155" y1="140" x2="215" y2="140" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="185" y="120" class="label" fill="#2563eb">v</text>

    <!-- Spring k attached to mass m -->
    <path d="M 330 145 L 305 145 L 297 130 L 287 160 L 277 130 L 267 160 L 257 130 L 247 160 L 235 145" class="spring-path" />
    <text x="270" y="115" class="label">k</text>

    <!-- Small mass m -->
    <circle cx="360" cy="145" r="28" fill="#fffbeb" stroke="#d97706" stroke-width="2.2" />
    <text x="360" y="145" class="label">m</text>
  </svg>`,

  // Q54: Pendulum deflected by horizontal force F to angle theta
  54: `
  ${SVG_HEADER(420, 300)}
    <!-- Ceiling -->
    <line x1="130" y1="40" x2="270" y2="40" class="surface" />
    <line x1="150" y1="40" x2="165" y2="28" class="hatch" />
    <line x1="190" y1="40" x2="205" y2="28" class="hatch" />
    <line x1="230" y1="40" x2="245" y2="28" class="hatch" />

    <!-- Pivot -->
    <circle cx="190" cy="40" r="4" fill="#0f172a" />
    <!-- Vertical dashed line -->
    <line x1="190" y1="40" x2="190" y2="240" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="4,4" />

    <!-- Arc for angle theta -->
    <path d="M 190 100 A 60 60 0 0 1 228 90" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="210" y="75" class="label">θ</text>

    <!-- Deflected String -->
    <line x1="190" y1="40" x2="270" y2="180" class="string-line" stroke-width="2.5" />
    <circle cx="270" cy="180" r="16" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
    <text x="270" y="180" class="label">m</text>

    <!-- Horizontal force F -->
    <line x1="288" y1="180" x2="350" y2="180" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="365" y="180" class="label" fill="#dc2626">F</text>
  </svg>`,

  // Q55: Particle rebound at 37 deg and 53 deg to normal
  55: `
  ${SVG_HEADER(460, 260)}
    <!-- Surface -->
    <line x1="60" y1="190" x2="400" y2="190" class="surface" />
    <line x1="70" y1="190" x2="55" y2="205" class="hatch" />
    <line x1="130" y1="190" x2="115" y2="205" class="hatch" />
    <line x1="190" y1="190" x2="175" y2="205" class="hatch" />
    <line x1="250" y1="190" x2="235" y2="205" class="hatch" />
    <line x1="310" y1="190" x2="295" y2="205" class="hatch" />
    <line x1="370" y1="190" x2="355" y2="205" class="hatch" />

    <!-- Normal line at point of impact (230, 190) -->
    <line x1="230" y1="40" x2="230" y2="190" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4,4" />

    <!-- Incident ray (37 deg to normal) -->
    <line x1="130" y1="60" x2="230" y2="190" class="vel-arrow" stroke-width="2.5" marker-mid="url(#arrow-blue)" />
    <path d="M 230 130 A 60 60 0 0 0 195 145" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="200" y="125" class="label">37°</text>

    <!-- Rebounded ray (53 deg to normal) -->
    <line x1="230" y1="190" x2="360" y2="90" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)" />
    <path d="M 230 130 A 60 60 0 0 1 275 155" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="260" y="125" class="label">53°</text>
  </svg>`,

  // Q57: Two colliding particles: 2kg at 10m/s right and 3kg at 5m/s left
  57: `
  ${SVG_HEADER(480, 220)}
    <!-- Floor -->
    <line x1="60" y1="170" x2="420" y2="170" class="surface" />

    <!-- Particle 1: 2kg moving right -->
    <circle cx="160" cy="125" r="28" fill="#eff6ff" stroke="#2563eb" stroke-width="2.2" />
    <text x="160" y="125" class="label">2kg</text>
    <line x1="160" y1="75" x2="220" y2="75" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="190" y="55" class="label" fill="#2563eb">10 m/s</text>

    <!-- Particle 2: 3kg moving left -->
    <circle cx="320" cy="120" r="34" fill="#fffbeb" stroke="#d97706" stroke-width="2.2" />
    <text x="320" y="120" class="label">3kg</text>
    <line x1="320" y1="70" x2="260" y2="70" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="290" y="50" class="label" fill="#2563eb">5 m/s</text>
  </svg>`,

  // Q58: Vertical circular tube of radius R with particle at bottom
  58: `
  ${SVG_HEADER(440, 300)}
    <!-- Outer and Inner circle forming tube -->
    <circle cx="220" cy="150" r="95" fill="none" stroke="#0f172a" stroke-width="3" />
    <circle cx="220" cy="150" r="75" fill="none" stroke="#0f172a" stroke-width="3" />

    <!-- Center and Radius R -->
    <circle cx="220" cy="150" r="3.5" fill="#0f172a" />
    <line x1="220" y1="150" x2="220" y2="65" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />
    <text x="235" y="105" class="label">R</text>

    <!-- Small sphere at bottom inside tube -->
    <circle cx="220" cy="235" r="9" fill="#2563eb" />
    <line x1="230" y1="235" x2="290" y2="235" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="315" y="235" class="label" fill="#2563eb">v = ??</text>
  </svg>`,

  // Q65: Horizontal spring over pulley to hanging block m
  65: `
  ${SVG_HEADER(520, 280)}
    <!-- Left wall -->
    <line x1="70" y1="60" x2="70" y2="150" class="surface" />
    <line x1="70" y1="75" x2="55" y2="90" class="hatch" />
    <line x1="70" y1="105" x2="55" y2="120" class="hatch" />
    <line x1="70" y1="135" x2="55" y2="150" class="hatch" />

    <!-- Table surface -->
    <line x1="65" y1="150" x2="380" y2="150" class="surface" />

    <!-- Horizontal spring k -->
    <path d="M 70 125 L 100 125 L 110 110 L 122 140 L 134 110 L 146 140 L 158 110 L 170 140 L 182 110 L 194 140 L 204 125 L 230 125" class="spring-path" />
    <text x="150" y="90" class="label">k</text>

    <!-- String from spring to pulley -->
    <line x1="230" y1="125" x2="380" y2="125" class="string-line" />

    <!-- Pulley at edge -->
    <circle cx="380" cy="140" r="16" class="pulley" />
    <circle cx="380" cy="140" r="3.5" class="pulley-center" />

    <!-- Hanging string to block m -->
    <line x1="396" y1="140" x2="396" y2="215" class="string-line" />
    <rect x="376" y="215" width="40" height="35" class="block" />
    <text x="396" y="232" class="label">m</text>
  </svg>`,

  // Q66: Two spring stretching situations (A) fixed to wall, (B) pulled both ends
  66: `
  ${SVG_HEADER(500, 260)}
    <!-- Situation (A) -->
    <text x="60" y="70" class="label" font-size="16">(A)</text>
    <!-- Wall on left -->
    <line x1="110" y1="40" x2="110" y2="100" class="surface" />
    <line x1="110" y1="50" x2="95" y2="65" class="hatch" />
    <line x1="110" y1="75" x2="95" y2="90" class="hatch" />
    <!-- Spring k1 -->
    <path d="M 110 70 L 140 70 L 148 55 L 158 85 L 168 55 L 178 85 L 188 55 L 198 85 L 206 70 L 230 70" class="spring-path" />
    <text x="175" y="40" class="label">k₁</text>
    <!-- Force F on right -->
    <line x1="230" y1="70" x2="300" y2="70" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="315" y="70" class="label" fill="#dc2626">F</text>

    <!-- Situation (B) -->
    <text x="60" y="180" class="label" font-size="16">(B)</text>
    <!-- Force F on left -->
    <line x1="140" y1="180" x2="70" y2="180" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="50" y="180" class="label" fill="#dc2626">F</text>
    <!-- Spring k2 -->
    <path d="M 140 180 L 170 180 L 178 165 L 188 195 L 198 165 L 208 195 L 218 165 L 228 195 L 236 180 L 260 180" class="spring-path" />
    <text x="205" y="150" class="label">k₂</text>
    <!-- Force F on right -->
    <line x1="260" y1="180" x2="330" y2="180" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="345" y="180" class="label" fill="#dc2626">F</text>
  </svg>`,

  // Q72: Smooth vertical circular track with points A (bottom), B (horizontal), C (top)
  72: `
  ${SVG_HEADER(440, 300)}
    <!-- Vertical circular track of radius R -->
    <circle cx="220" cy="150" r="90" fill="none" stroke="#0f172a" stroke-width="2.5" />

    <!-- Center and Axes -->
    <line x1="130" y1="150" x2="310" y2="150" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3" />
    <line x1="220" y1="60" x2="220" y2="240" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3" />

    <!-- Point A at bottom -->
    <circle cx="220" cy="240" r="5" fill="#2563eb" />
    <text x="220" y="265" class="label">A</text>

    <!-- Point B at equator -->
    <circle cx="310" cy="150" r="4" fill="#0f172a" />
    <text x="325" y="150" class="label">B</text>

    <!-- Point C at top -->
    <circle cx="220" cy="60" r="4" fill="#0f172a" />
    <text x="220" y="45" class="label">C</text>
  </svg>`,

  // Q73: Truck accelerating right with 2kg block inside
  73: `
  ${SVG_HEADER(480, 240)}
    <!-- Road -->
    <line x1="50" y1="200" x2="430" y2="200" class="surface" />

    <!-- Truck frame -->
    <rect x="100" y="100" width="220" height="75" class="block" stroke-width="2.5" />
    <!-- Wheels -->
    <circle cx="150" cy="185" r="14" fill="#334155" />
    <circle cx="150" cy="185" r="6" fill="#ffffff" />
    <circle cx="270" cy="185" r="14" fill="#334155" />
    <circle cx="270" cy="185" r="6" fill="#ffffff" />

    <!-- Block 2kg inside truck -->
    <rect x="175" y="125" width="55" height="40" class="block-blue" />
    <text x="202" y="145" class="label">2Kg</text>

    <!-- Acceleration arrow a -->
    <line x1="330" y1="140" x2="390" y2="140" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="405" y="140" class="label" fill="#2563eb">a</text>
  </svg>`,

  // Q79: Trolley accelerating with pendulum deflected inside
  79: `
  ${SVG_HEADER(460, 260)}
    <!-- Ground -->
    <line x1="60" y1="220" x2="400" y2="220" class="surface" />

    <!-- Trolley cabin -->
    <rect x="120" y="60" width="180" height="135" class="block" stroke-width="2.2" />
    <!-- Wheels -->
    <circle cx="160" cy="205" r="12" fill="#334155" />
    <circle cx="160" cy="205" r="5" fill="#ffffff" />
    <circle cx="260" cy="205" r="12" fill="#334155" />
    <circle cx="260" cy="205" r="5" fill="#ffffff" />

    <!-- Pendulum pivot at top ceiling of trolley -->
    <circle cx="200" cy="60" r="3.5" fill="#0f172a" />
    <!-- Vertical dashed line -->
    <line x1="200" y1="60" x2="200" y2="175" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3" />

    <!-- String at angle theta -->
    <line x1="200" y1="60" x2="160" y2="160" class="string-line" stroke-width="2" />
    <circle cx="160" cy="160" r="12" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
    <text x="180" y="100" class="label">θ</text>
    <text x="135" y="160" class="sublabel">m</text>

    <!-- Trolley acceleration arrow a to the right -->
    <line x1="315" y1="120" x2="375" y2="120" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="390" y="120" class="label" fill="#2563eb">a</text>
  </svg>`,

  // Q80: Pulley with mass m1 on floor, mass m2 held 5m above floor
  80: `
  ${SVG_HEADER(440, 320)}
    <!-- Ceiling support -->
    <line x1="150" y1="40" x2="270" y2="40" class="surface" />
    <line x1="170" y1="40" x2="185" y2="28" class="hatch" />
    <line x1="210" y1="40" x2="225" y2="28" class="hatch" />
    <line x1="250" y1="40" x2="265" y2="28" class="hatch" />

    <!-- Pulley bracket & wheel -->
    <line x1="210" y1="40" x2="210" y2="75" stroke="#0f172a" stroke-width="3" />
    <circle cx="210" cy="75" r="18" class="pulley" />
    <circle cx="210" cy="75" r="4" class="pulley-center" />

    <!-- Floor -->
    <line x1="80" y1="280" x2="360" y2="280" class="surface" />

    <!-- Block m1 (3kg) on floor -->
    <line x1="192" y1="75" x2="192" y2="245" class="string-line" />
    <rect x="172" y="245" width="40" height="35" class="block" />
    <text x="192" y="262" class="label">m₁</text>

    <!-- Block m2 (5kg) held 5m above floor -->
    <line x1="228" y1="75" x2="228" y2="145" class="string-line" />
    <rect x="208" y="145" width="40" height="35" class="block-amber" />
    <text x="228" y="162" class="label">m₂</text>

    <!-- Dimension 5m -->
    <line x1="270" y1="180" x2="270" y2="280" stroke="#475569" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="295" y="230" class="label">5m</text>
  </svg>`
};

async function generateAll() {
  const mapping = {};
  console.log(`Starting diagram generation for ${Object.keys(DIAGRAMS).length} diagrams...`);

  for (const [qNum, svgString] of Object.entries(DIAGRAMS)) {
    const filename = `wpe_q${qNum}.png`;
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
            public_id: `wpe_q${qNum}`,
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

  const mapPath = path.resolve(__dirname, 'work_energy_power_diagrams.json');
  fs.writeFileSync(mapPath, JSON.stringify(mapping, null, 2));
  console.log(`All diagrams generated and saved to ${mapPath}`);
}

generateAll().catch(err => {
  console.error('Fatal diagram generation error:', err);
  process.exit(1);
});
