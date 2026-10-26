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

const outDirBackend = path.resolve(__dirname, '../uploads/motion_in_straight_line');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/motion_in_straight_line');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

// Common CSS styles for crisp, beautiful scientific graphs
const SVG_HEADER = (w = 640, h = 320) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', Arial, sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2.2; }
    .grid { stroke: #e2e8f0; stroke-width: 1; stroke-dasharray: 4,4; }
    .plot-line { stroke: #2563eb; stroke-width: 3; fill: none; stroke-linejoin: round; stroke-linecap: round; }
    .plot-line-sec { stroke: #dc2626; stroke-width: 2.5; fill: none; }
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
  </defs>
`;

export const DIAGRAMS = {
  // Q5: v-t graph (0 to 70s)
  5: `
  ${SVG_HEADER(640, 320)}
    <!-- Axes -->
    <line x1="70" y1="220" x2="590" y2="220" class="axis" marker-end="url(#arrow)" />
    <line x1="70" y1="270" x2="70" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="595" y="225" class="axis-label">t (s)</text>
    <text x="60" y="30" class="axis-label">v (m/s)</text>

    <!-- Ticks & Grid -->
    <!-- t = 10, 20, 30, 50, 60, 70 -->
    <!-- Origin (0,0) at (70, 220) -->
    <!-- Scale: dx = 6.5px per s, dy = 25px per unit v -->
    <line x1="135" y1="220" x2="135" y2="120" class="grid" />
    <text x="135" y="240" class="tick-label">10</text>

    <line x1="200" y1="220" x2="200" y2="120" class="grid" />
    <text x="200" y="240" class="tick-label">20</text>

    <line x1="265" y1="220" x2="265" y2="70" class="grid" />
    <text x="265" y="240" class="tick-label">30</text>

    <text x="395" y="240" class="tick-label">50</text>
    <text x="460" y="240" class="tick-label">60</text>
    <text x="525" y="240" class="tick-label">70</text>

    <!-- v-axis ticks: 4, 6, -4 -->
    <text x="50" y="125" class="tick-label">4</text>
    <line x1="65" y1="120" x2="200" y2="120" class="grid" />
    <text x="50" y="75" class="tick-label">6</text>
    <line x1="65" y1="70" x2="265" y2="70" class="grid" />

    <!-- Curve: (0,0) -> (10,4) -> (20,4) -> (30,6) -> (50,0) -> (60,-4) -> (70,0) -->
    <polyline points="70,220 135,120 200,120 265,70 395,220 460,270 525,220" class="plot-line" />
    <circle cx="70" cy="220" r="4" class="point" />
    <circle cx="135" cy="120" r="4" class="point" />
    <circle cx="200" cy="120" r="4" class="point" />
    <circle cx="265" cy="70" r="4" class="point" />
    <circle cx="395" cy="220" r="4" class="point" />
    <circle cx="460" cy="270" r="4" class="point" />
    <circle cx="525" cy="220" r="4" class="point" />
  </svg>`,

  // Q6: a-t graph (triangle to 4 at t=2, then -1 from 4 to 8s)
  6: `
  ${SVG_HEADER(560, 300)}
    <!-- Axes: Origin at (70, 200) -->
    <line x1="60" y1="200" x2="520" y2="200" class="axis" marker-end="url(#arrow)" />
    <line x1="70" y1="260" x2="70" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="525" y="205" class="axis-label">t (s)</text>
    <text x="65" y="30" class="axis-label">a (m/s²)</text>

    <!-- y-ticks: 4, -1 -->
    <text x="50" y="85" class="tick-label">4</text>
    <line x1="65" y1="80" x2="170" y2="80" class="grid" />
    <text x="50" y="235" class="tick-label">-1</text>
    <line x1="65" y1="230" x2="470" y2="230" class="grid" />

    <!-- x-ticks: 2, 4, 8 -->
    <!-- Scale: 50px per second -->
    <text x="170" y="218" class="tick-label">2</text>
    <text x="270" y="218" class="tick-label">4</text>
    <text x="470" y="218" class="tick-label">8</text>

    <!-- Curve: (0,0) -> (2,4) -> (4,0) -> drop to (4,-1) -> (8,-1) -->
    <polyline points="70,200 170,80 270,200" class="plot-line" />
    <line x1="270" y1="200" x2="270" y2="230" stroke="#2563eb" stroke-width="2" stroke-dasharray="3,3" />
    <line x1="270" y1="230" x2="470" y2="230" class="plot-line" />
    <circle cx="70" cy="200" r="4" class="point" />
    <circle cx="170" cy="80" r="4" class="point" />
    <circle cx="270" cy="200" r="4" class="point" />
    <circle cx="470" cy="230" r="4" class="point" />
  </svg>`,

  // Q12: Particles A and B projected vertically
  12: `
  ${SVG_HEADER(520, 320)}
    <!-- Ground line -->
    <line x1="80" y1="270" x2="440" y2="270" stroke="#334155" stroke-width="3" />
    <!-- Hatching under ground -->
    <path d="M 100,270 l -15,15 M 140,270 l -15,15 M 180,270 l -15,15 M 220,270 l -15,15 M 260,270 l -15,15 M 300,270 l -15,15 M 340,270 l -15,15 M 380,270 l -15,15 M 420,270 l -15,15" stroke="#94a3b8" stroke-width="2" />
    <text x="445" y="275" class="tick-label" style="text-anchor:start;">Ground</text>

    <!-- Height dimension line 20m -->
    <line x1="160" y1="270" x2="160" y2="90" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4,4" />
    <line x1="150" y1="90" x2="170" y2="90" stroke="#64748b" stroke-width="2" />
    <line x1="150" y1="270" x2="170" y2="270" stroke="#64748b" stroke-width="2" />
    <text x="130" y="185" class="axis-label" fill="#dc2626">20 m</text>

    <!-- Particle A (top, at y=90) -->
    <circle cx="280" cy="90" r="14" fill="#eff6ff" stroke="#2563eb" stroke-width="3" />
    <text x="280" y="95" class="axis-label" style="text-anchor:middle;" fill="#2563eb">A</text>
    <!-- Arrow downwards: 5 m/s -->
    <line x1="280" y1="108" x2="280" y2="155" stroke="#2563eb" stroke-width="3" marker-end="url(#arrow-blue)" />
    <text x="330" y="135" class="axis-label" fill="#2563eb">5 m/s</text>

    <!-- Particle B (ground, at y=256) -->
    <circle cx="280" cy="254" r="14" fill="#fef2f2" stroke="#dc2626" stroke-width="3" />
    <text x="280" y="259" class="axis-label" style="text-anchor:middle;" fill="#dc2626">B</text>
    <!-- Arrow upwards: 20 m/s -->
    <line x1="280" y1="236" x2="280" y2="185" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)" />
    <text x="335" y="210" class="axis-label" fill="#dc2626">20 m/s</text>
  </svg>`,

  // Q19: a-t graph in question + 4 v-t options
  19: `
  ${SVG_HEADER(720, 400)}
    <!-- Question Graph (Top Center): a-t graph triangle -->
    <rect x="230" y="15" width="260" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="245" y="38" class="box-title">Given a–t graph</text>
    <line x1="260" y1="135" x2="470" y2="135" class="axis" marker-end="url(#arrow)" />
    <line x1="280" y1="145" x2="280" y2="45" class="axis" marker-end="url(#arrow)" />
    <text x="475" y="138" class="tick-label">t</text>
    <text x="275" y="42" class="tick-label">a</text>
    <polyline points="280,135 360,65 440,135" class="plot-line" />
    <text x="268" y="70" class="tick-label">2</text>
    <text x="360" y="150" class="tick-label">2</text>
    <text x="440" y="150" class="tick-label">4</text>

    <!-- 4 Options (Bottom 2x2 grid) -->
    <!-- Opt (1) -->
    <rect x="30" y="180" width="150" height="100" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="40" y="200" class="option-tag">(1)</text>
    <line x1="50" y1="260" x2="165" y2="260" class="axis" />
    <line x1="60" y1="265" x2="60" y2="205" class="axis" />
    <path d="M 60,260 Q 95,250 110,230 Q 125,210 160,210" fill="none" stroke="#2563eb" stroke-width="2.2" />

    <!-- Opt (2) -->
    <rect x="200" y="180" width="150" height="100" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="210" y="200" class="option-tag">(2)</text>
    <line x1="220" y1="260" x2="335" y2="260" class="axis" />
    <line x1="230" y1="265" x2="230" y2="205" class="axis" />
    <path d="M 230,260 Q 255,250 280,230 Q 305,210 330,210" fill="none" stroke="#2563eb" stroke-width="2.2" />
    <text x="220" y="215" class="tick-label">4</text>

    <!-- Opt (3) -->
    <rect x="370" y="180" width="150" height="100" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="380" y="200" class="option-tag">(3)</text>
    <line x1="390" y1="260" x2="505" y2="260" class="axis" />
    <line x1="400" y1="265" x2="400" y2="205" class="axis" />
    <path d="M 400,260 Q 420,210 440,210 L 490,210" fill="none" stroke="#2563eb" stroke-width="2.2" />

    <!-- Opt (4) -->
    <rect x="540" y="180" width="150" height="100" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="550" y="200" class="option-tag">(4)</text>
    <line x1="560" y1="260" x2="675" y2="260" class="axis" />
    <line x1="570" y1="265" x2="570" y2="205" class="axis" />
    <path d="M 570,260 Q 610,205 640,220 Q 655,235 670,260" fill="none" stroke="#2563eb" stroke-width="2.2" />
  </svg>`,

  // Q21: v-t graph (-8 to +8)
  21: `
  ${SVG_HEADER(560, 320)}
    <!-- Origin at (70, 160) -->
    <line x1="60" y1="160" x2="510" y2="160" class="axis" marker-end="url(#arrow)" />
    <line x1="70" y1="280" x2="70" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="515" y="165" class="axis-label">t (s)</text>
    <text x="65" y="30" class="axis-label">v (m/s)</text>

    <!-- y-ticks: 8, -8 -->
    <text x="50" y="85" class="tick-label">8</text>
    <line x1="65" y1="80" x2="270" y2="80" class="grid" />
    <text x="50" y="255" class="tick-label">-8</text>

    <!-- x-ticks: 2, 4, 8 -->
    <!-- Scale: 50px per s -->
    <text x="170" y="180" class="tick-label">2</text>
    <text x="270" y="180" class="tick-label">4</text>
    <text x="470" y="180" class="tick-label">8</text>

    <!-- Curve: (0, -8) -> (2, 0) -> (4, 8) -> (8, 0) -->
    <polyline points="70,250 170,160 270,80 470,160" class="plot-line" />
    <circle cx="70" cy="250" r="4" class="point" />
    <circle cx="170" cy="160" r="4" class="point" />
    <circle cx="270" cy="80" r="4" class="point" />
    <circle cx="470" cy="160" r="4" class="point" />
  </svg>`,

  // Q22: v-x graph and 4 a-x options
  22: `
  ${SVG_HEADER(720, 380)}
    <!-- Given v-x graph (Top left) -->
    <rect x="30" y="15" width="220" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="45" y="38" class="box-title">Given v–x graph</text>
    <line x1="60" y1="135" x2="225" y2="135" class="axis" marker-end="url(#arrow)" />
    <line x1="75" y1="145" x2="75" y2="45" class="axis" marker-end="url(#arrow)" />
    <text x="230" y="140" class="tick-label">x</text>
    <text x="70" y="42" class="tick-label">v</text>
    <line x1="75" y1="65" x2="185" y2="135" class="plot-line" />
    <text x="60" y="68" class="tick-label">v₀</text>
    <text x="185" y="150" class="tick-label">x₀</text>

    <!-- 4 a-x options (2x2 grid on right) -->
    <!-- Opt (1) -->
    <rect x="280" y="15" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="290" y="35" class="option-tag">(1)</text>
    <line x1="300" y1="110" x2="450" y2="110" class="axis" />
    <line x1="315" y1="150" x2="315" y2="45" class="axis" />
    <text x="455" y="115" class="tick-label">x</text>
    <text x="310" y="42" class="tick-label">a</text>
    <line x1="315" y1="140" x2="435" y2="70" stroke="#2563eb" stroke-width="2.5" />

    <!-- Opt (2) -->
    <rect x="500" y="15" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="510" y="35" class="option-tag">(2)</text>
    <line x1="520" y1="110" x2="670" y2="110" class="axis" />
    <line x1="535" y1="150" x2="535" y2="45" class="axis" />
    <text x="675" y="115" class="tick-label">x</text>
    <text x="530" y="42" class="tick-label">a</text>
    <line x1="535" y1="80" x2="665" y2="80" stroke="#2563eb" stroke-width="2.5" />

    <!-- Opt (3) -->
    <rect x="280" y="190" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="290" y="210" class="option-tag">(3)</text>
    <line x1="300" y1="285" x2="450" y2="285" class="axis" />
    <line x1="315" y1="325" x2="315" y2="220" class="axis" />
    <text x="455" y="290" class="tick-label">x</text>
    <text x="310" y="217" class="tick-label">a</text>
    <line x1="315" y1="250" x2="435" y2="270" stroke="#2563eb" stroke-width="2.5" />

    <!-- Opt (4) -->
    <rect x="500" y="190" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="510" y="210" class="option-tag">(4)</text>
    <line x1="520" y1="285" x2="670" y2="285" class="axis" />
    <line x1="535" y1="325" x2="535" y2="220" class="axis" />
    <text x="675" y="290" class="tick-label">x</text>
    <text x="530" y="217" class="tick-label">a</text>
    <line x1="535" y1="235" x2="640" y2="285" stroke="#2563eb" stroke-width="2.5" />
  </svg>`,

  // Q25: speed-time graph in question + 4 v-t options
  25: `
  ${SVG_HEADER(720, 360)}
    <!-- Given speed-time graph (Left) -->
    <rect x="30" y="15" width="200" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="45" y="38" class="box-title">Speed–time graph</text>
    <line x1="50" y1="135" x2="210" y2="135" class="axis" marker-end="url(#arrow)" />
    <line x1="65" y1="145" x2="65" y2="45" class="axis" marker-end="url(#arrow)" />
    <text x="215" y="140" class="tick-label">t</text>
    <text x="60" y="42" class="tick-label">speed</text>
    <polyline points="65,60 130,135 195,75" class="plot-line" />

    <!-- 4 Options (Right 4 boxes) -->
    <rect x="260" y="15" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="270" y="35" class="option-tag">(1)</text>
    <line x1="275" y1="110" x2="435" y2="110" class="axis" />
    <line x1="290" y1="150" x2="290" y2="45" class="axis" />
    <text x="440" y="115" class="tick-label">t</text>
    <text x="285" y="42" class="tick-label">v</text>
    <line x1="290" y1="60" x2="410" y2="145" stroke="#2563eb" stroke-width="2.5" />

    <rect x="480" y="15" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="490" y="35" class="option-tag">(2)</text>
    <line x1="495" y1="110" x2="655" y2="110" class="axis" />
    <line x1="510" y1="150" x2="510" y2="45" class="axis" />
    <text x="660" y="115" class="tick-label">t</text>
    <text x="505" y="42" class="tick-label">v</text>
    <line x1="510" y1="145" x2="630" y2="60" stroke="#2563eb" stroke-width="2.5" />

    <rect x="260" y="180" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="270" y="200" class="option-tag">(3)</text>
    <line x1="275" y1="275" x2="435" y2="275" class="axis" />
    <line x1="290" y1="315" x2="290" y2="210" class="axis" />
    <text x="440" y="280" class="tick-label">t</text>
    <text x="285" y="207" class="tick-label">v</text>
    <line x1="290" y1="310" x2="410" y2="225" stroke="#2563eb" stroke-width="2.5" />

    <rect x="480" y="180" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="490" y="200" class="option-tag">(4) All of these</text>
    <text x="510" y="260" class="tick-label" style="text-anchor:start; font-size:14px;">(Depending on initial direction)</text>
  </svg>`,

  // Q26: Dropped from rest: v vs s
  26: `
  ${SVG_HEADER(720, 360)}
    <text x="360" y="30" class="box-title" style="text-anchor:middle;">Velocity (v) vs Displacement (s) for Object Dropped from Rest</text>
    <!-- Opt 1 -->
    <rect x="40" y="60" width="290" height="130" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="85" class="option-tag">(1)</text>
    <line x1="70" y1="165" x2="300" y2="165" class="axis" />
    <line x1="85" y1="175" x2="85" y2="85" class="axis" />
    <text x="305" y="170" class="tick-label">s</text>
    <text x="80" y="80" class="tick-label">v</text>
    <line x1="85" y1="165" x2="275" y2="105" stroke="#2563eb" stroke-width="2.5" />

    <!-- Opt 2 -->
    <rect x="380" y="60" width="290" height="130" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="395" y="85" class="option-tag">(2)</text>
    <line x1="410" y1="165" x2="640" y2="165" class="axis" />
    <line x1="425" y1="175" x2="425" y2="85" class="axis" />
    <text x="645" y="170" class="tick-label">s</text>
    <text x="420" y="80" class="tick-label">v</text>
    <path d="M 425,165 Q 490,160 580,95" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <!-- Opt 3 -->
    <rect x="40" y="210" width="290" height="130" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="235" class="option-tag">(3)</text>
    <line x1="70" y1="315" x2="300" y2="315" class="axis" />
    <line x1="85" y1="325" x2="85" y2="235" class="axis" />
    <text x="305" y="320" class="tick-label">s</text>
    <text x="80" y="230" class="tick-label">v</text>
    <path d="M 85,315 Q 140,245 285,245" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <!-- Opt 4 -->
    <rect x="380" y="210" width="290" height="130" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="395" y="235" class="option-tag">(4)</text>
    <line x1="410" y1="315" x2="640" y2="315" class="axis" />
    <line x1="425" y1="325" x2="425" y2="235" class="axis" />
    <text x="645" y="320" class="tick-label">s</text>
    <text x="420" y="230" class="tick-label">v</text>
    <path d="M 425,245 Q 560,245 615,315" fill="none" stroke="#2563eb" stroke-width="2.5" />
  </svg>`,

  // Q29: Position-time graphs for A and B (vA < vB)
  29: `
  ${SVG_HEADER(720, 360)}
    <text x="360" y="30" class="box-title" style="text-anchor:middle;">Position (x) versus Time (t) Graphs for v_A &lt; v_B</text>
    <!-- Opt 1 -->
    <rect x="40" y="55" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="78" class="option-tag">(1)</text>
    <line x1="70" y1="165" x2="300" y2="165" class="axis" />
    <line x1="85" y1="175" x2="85" y2="80" class="axis" />
    <text x="305" y="170" class="tick-label">t</text>
    <text x="80" y="75" class="tick-label">x</text>
    <!-- A lower slope, B higher slope -->
    <line x1="85" y1="130" x2="270" y2="90" stroke="#2563eb" stroke-width="2.5" />
    <text x="280" y="95" class="axis-label" fill="#2563eb">A</text>
    <line x1="85" y1="150" x2="240" y2="85" stroke="#dc2626" stroke-width="2.5" />
    <text x="250" y="90" class="axis-label" fill="#dc2626">B</text>

    <!-- Opt 2 -->
    <rect x="380" y="55" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="395" y="78" class="option-tag">(2)</text>
    <line x1="410" y1="165" x2="640" y2="165" class="axis" />
    <line x1="425" y1="175" x2="425" y2="80" class="axis" />
    <text x="645" y="170" class="tick-label">t</text>
    <text x="420" y="75" class="tick-label">x</text>
    <line x1="425" y1="145" x2="615" y2="85" stroke="#2563eb" stroke-width="2.5" />
    <text x="625" y="90" class="axis-label" fill="#2563eb">B</text>
    <line x1="425" y1="125" x2="630" y2="105" stroke="#dc2626" stroke-width="2.5" />
    <text x="640" y="110" class="axis-label" fill="#dc2626">A</text>

    <!-- Opt 3 -->
    <rect x="40" y="205" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="228" class="option-tag">(3)</text>
    <line x1="70" y1="315" x2="300" y2="315" class="axis" />
    <line x1="85" y1="325" x2="85" y2="230" class="axis" />
    <text x="305" y="320" class="tick-label">t</text>
    <text x="80" y="225" class="tick-label">x</text>
    <line x1="85" y1="290" x2="280" y2="265" stroke="#2563eb" stroke-width="2.5" />
    <text x="290" y="270" class="axis-label" fill="#2563eb">A</text>
    <line x1="85" y1="310" x2="220" y2="235" stroke="#dc2626" stroke-width="2.5" />
    <text x="230" y="240" class="axis-label" fill="#dc2626">B</text>

    <!-- Opt 4 -->
    <rect x="380" y="205" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="395" y="228" class="option-tag">(4)</text>
    <line x1="410" y1="315" x2="640" y2="315" class="axis" />
    <line x1="425" y1="325" x2="425" y2="230" class="axis" />
    <text x="645" y="320" class="tick-label">t</text>
    <text x="420" y="225" class="tick-label">x</text>
    <line x1="425" y1="315" x2="570" y2="235" stroke="#2563eb" stroke-width="2.5" />
    <text x="580" y="240" class="axis-label" fill="#2563eb">A</text>
    <line x1="425" y1="315" x2="620" y2="265" stroke="#dc2626" stroke-width="2.5" />
    <text x="630" y="270" class="axis-label" fill="#dc2626">B</text>
  </svg>`,

  // Q35: x-t graphs for average velocity = 0
  35: `
  ${SVG_HEADER(720, 360)}
    <text x="360" y="30" class="box-title" style="text-anchor:middle;">Position (x) vs Time (t) Graphs to Determine Average Velocity = 0</text>
    <!-- Opt 1 -->
    <rect x="40" y="55" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="78" class="option-tag">(1)</text>
    <line x1="70" y1="165" x2="300" y2="165" class="axis" />
    <line x1="85" y1="175" x2="85" y2="80" class="axis" />
    <text x="305" y="170" class="tick-label">t</text>
    <text x="80" y="75" class="tick-label">x</text>
    <path d="M 85,165 Q 170,95 255,165" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="85" y="180" class="tick-label">(0,0)</text>

    <!-- Opt 2 -->
    <rect x="380" y="55" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="395" y="78" class="option-tag">(2)</text>
    <line x1="410" y1="165" x2="640" y2="165" class="axis" />
    <line x1="425" y1="175" x2="425" y2="80" class="axis" />
    <text x="645" y="170" class="tick-label">t</text>
    <text x="420" y="75" class="tick-label">x</text>
    <path d="M 425,165 Q 465,95 520,110 Q 560,120 600,160" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <!-- Opt 3 -->
    <rect x="40" y="205" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="228" class="option-tag">(3)</text>
    <line x1="70" y1="315" x2="300" y2="315" class="axis" />
    <line x1="85" y1="325" x2="85" y2="230" class="axis" />
    <text x="305" y="320" class="tick-label">t</text>
    <text x="80" y="225" class="tick-label">x</text>
    <path d="M 85,245 Q 105,315 260,315" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <!-- Opt 4 -->
    <rect x="380" y="205" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="395" y="228" class="option-tag">(4)</text>
    <line x1="410" y1="315" x2="640" y2="315" class="axis" />
    <line x1="425" y1="325" x2="425" y2="230" class="axis" />
    <text x="645" y="320" class="tick-label">t</text>
    <text x="420" y="225" class="tick-label">x</text>
    <path d="M 425,315 Q 470,305 520,270 Q 550,240 600,240" fill="none" stroke="#2563eb" stroke-width="2.5" />
  </svg>`,

  // Q38: v-t graph (0 to 3s ramp to 10 m/s, flat to 6s)
  38: `
  ${SVG_HEADER(520, 280)}
    <line x1="60" y1="220" x2="460" y2="220" class="axis" marker-end="url(#arrow)" />
    <line x1="75" y1="240" x2="75" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="465" y="225" class="axis-label">t (s)</text>
    <text x="70" y="30" class="axis-label">v (m/s)</text>

    <!-- y-tick: 10 -->
    <text x="50" y="105" class="tick-label">10</text>
    <line x1="70" y1="100" x2="375" y2="100" class="grid" />

    <!-- x-ticks: 3s, 6s -->
    <text x="225" y="240" class="tick-label">3s</text>
    <line x1="225" y1="220" x2="225" y2="100" class="grid" />

    <text x="375" y="240" class="tick-label">6s</text>
    <line x1="375" y1="220" x2="375" y2="100" class="grid" />

    <polyline points="75,220 225,100 375,100" class="plot-line" />
    <circle cx="75" cy="220" r="4" class="point" />
    <circle cx="225" cy="100" r="4" class="point" />
    <circle cx="375" cy="100" r="4" class="point" />
  </svg>`,

  // Q39: v-x graph (starts at v=2 with 45 deg slope)
  39: `
  ${SVG_HEADER(480, 280)}
    <line x1="60" y1="220" x2="420" y2="220" class="axis" marker-end="url(#arrow)" />
    <line x1="75" y1="240" x2="75" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="425" y="225" class="axis-label">x (m)</text>
    <text x="70" y="30" class="axis-label">v (m/s)</text>

    <text x="55" y="155" class="tick-label">2</text>
    <line x1="75" y1="150" x2="320" y2="50" class="plot-line" />
    <circle cx="75" cy="150" r="4" class="point" />

    <!-- Angle 45 deg arc -->
    <line x1="75" y1="150" x2="200" y2="150" stroke="#64748b" stroke-dasharray="3,3" />
    <path d="M 125,150 A 50 50 0 0 0 115,134" fill="none" stroke="#dc2626" stroke-width="2" />
    <text x="135" y="140" class="axis-label" fill="#dc2626">45°</text>
  </svg>`,

  // Q46: a-t graph in question + 4 v-t options
  46: `
  ${SVG_HEADER(720, 360)}
    <!-- Given a-t graph (Left) -->
    <rect x="30" y="15" width="200" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="45" y="38" class="box-title">Given a–t graph</text>
    <line x1="50" y1="135" x2="210" y2="135" class="axis" marker-end="url(#arrow)" />
    <line x1="65" y1="145" x2="65" y2="45" class="axis" marker-end="url(#arrow)" />
    <text x="215" y="140" class="tick-label">t</text>
    <text x="60" y="42" class="tick-label">a</text>
    <line x1="65" y1="65" x2="185" y2="135" class="plot-line" />

    <!-- 4 Options (Right 4 boxes) -->
    <rect x="260" y="15" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="270" y="35" class="option-tag">(1)</text>
    <line x1="275" y1="125" x2="435" y2="125" class="axis" />
    <line x1="290" y1="135" x2="290" y2="45" class="axis" />
    <text x="440" y="130" class="tick-label">t</text>
    <text x="285" y="42" class="tick-label">v</text>
    <line x1="290" y1="125" x2="415" y2="65" stroke="#2563eb" stroke-width="2.5" />

    <rect x="480" y="15" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="490" y="35" class="option-tag">(2)</text>
    <line x1="495" y1="90" x2="655" y2="90" class="axis" />
    <line x1="530" y1="145" x2="530" y2="45" class="axis" />
    <text x="660" y="95" class="tick-label">t</text>
    <text x="525" y="42" class="tick-label">v</text>
    <line x1="530" y1="90" x2="610" y2="135" stroke="#2563eb" stroke-width="2.5" />

    <rect x="260" y="180" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="270" y="200" class="option-tag">(3)</text>
    <line x1="275" y1="290" x2="435" y2="290" class="axis" />
    <line x1="290" y1="300" x2="290" y2="210" class="axis" />
    <text x="440" y="295" class="tick-label">t</text>
    <text x="285" y="207" class="tick-label">v</text>
    <path d="M 290,290 Q 330,230 415,230" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <rect x="480" y="180" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="490" y="200" class="option-tag">(4)</text>
    <line x1="495" y1="290" x2="655" y2="290" class="axis" />
    <line x1="530" y1="335" x2="530" y2="210" class="axis" />
    <text x="660" y="295" class="tick-label">t</text>
    <text x="525" y="207" class="tick-label">v</text>
    <path d="M 530,290 Q 570,290 645,230" fill="none" stroke="#2563eb" stroke-width="2.5" />
  </svg>`,

  // Q49: 4 v-t graph options for v = 10 - 10t
  49: `
  ${SVG_HEADER(720, 360)}
    <text x="360" y="30" class="box-title" style="text-anchor:middle;">Velocity (v) vs Time (t) Representation for x = 2 + 10t - 5t²</text>
    <!-- Opt 1 -->
    <rect x="40" y="55" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="78" class="option-tag">(1)</text>
    <line x1="70" y1="165" x2="300" y2="165" class="axis" />
    <line x1="85" y1="175" x2="85" y2="80" class="axis" />
    <text x="305" y="170" class="tick-label">t (s)</text>
    <text x="80" y="75" class="tick-label">v (m/s)</text>
    <line x1="85" y1="105" x2="225" y2="165" stroke="#2563eb" stroke-width="2.5" />
    <text x="70" y="110" class="tick-label">10</text>
    <text x="225" y="180" class="tick-label">1</text>

    <!-- Opt 2 -->
    <rect x="380" y="55" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="395" y="78" class="option-tag">(2)</text>
    <line x1="410" y1="165" x2="640" y2="165" class="axis" />
    <line x1="425" y1="175" x2="425" y2="80" class="axis" />
    <text x="645" y="170" class="tick-label">t (s)</text>
    <text x="420" y="75" class="tick-label">v (m/s)</text>
    <line x1="425" y1="95" x2="565" y2="165" stroke="#2563eb" stroke-width="2.5" />
    <text x="410" y="100" class="tick-label">20</text>
    <text x="565" y="180" class="tick-label">1</text>

    <!-- Opt 3 -->
    <rect x="40" y="205" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="228" class="option-tag">(3)</text>
    <line x1="70" y1="315" x2="300" y2="315" class="axis" />
    <line x1="85" y1="325" x2="85" y2="230" class="axis" />
    <text x="305" y="320" class="tick-label">t (s)</text>
    <text x="80" y="225" class="tick-label">v (m/s)</text>
    <path d="M 85,255 Q 120,315 255,315" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="70" y="260" class="tick-label">10</text>

    <!-- Opt 4 -->
    <rect x="380" y="205" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="395" y="228" class="option-tag">(4)</text>
    <line x1="410" y1="315" x2="640" y2="315" class="axis" />
    <line x1="425" y1="325" x2="425" y2="230" class="axis" />
    <text x="645" y="320" class="tick-label">t (s)</text>
    <text x="420" y="225" class="tick-label">v (m/s)</text>
    <path d="M 425,255 Q 565,255 585,315" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="410" y="260" class="tick-label">20</text>
    <text x="535" y="330" class="tick-label">1</text>
    <text x="585" y="330" class="tick-label">2</text>
  </svg>`,

  // Q56: v vs x with angle theta
  56: `
  ${SVG_HEADER(500, 280)}
    <line x1="60" y1="220" x2="440" y2="220" class="axis" marker-end="url(#arrow)" />
    <line x1="75" y1="240" x2="75" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="445" y="225" class="axis-label">x (m)</text>
    <text x="70" y="30" class="axis-label">v (m/s)</text>
    <text x="65" y="235" class="tick-label">O</text>

    <line x1="75" y1="220" x2="160" y2="220" stroke="#2563eb" stroke-width="3" />
    <line x1="160" y1="220" x2="330" y2="60" class="plot-line" />

    <!-- Angle theta -->
    <path d="M 195,220 A 35 35 0 0 0 185,195" fill="none" stroke="#dc2626" stroke-width="2" />
    <text x="205" y="210" class="axis-label" fill="#dc2626">θ</text>
  </svg>`,

  // Q60: v vs x (from 2 to 5m)
  60: `
  ${SVG_HEADER(540, 300)}
    <line x1="60" y1="220" x2="480" y2="220" class="axis" marker-end="url(#arrow)" />
    <line x1="75" y1="240" x2="75" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="485" y="225" class="axis-label">x (m)</text>
    <text x="70" y="30" class="axis-label">v (m/s)</text>

    <!-- y-ticks: 2, 4, 6 -->
    <text x="55" y="165" class="tick-label">2</text>
    <line x1="70" y1="160" x2="355" y2="160" class="grid" />
    <text x="55" y="125" class="tick-label">4</text>
    <line x1="70" y1="120" x2="285" y2="120" class="grid" />
    <text x="55" y="85" class="tick-label">6</text>
    <line x1="70" y1="80" x2="215" y2="80" class="grid" />

    <!-- x-ticks: 2, 3, 4, 5 -->
    <text x="145" y="240" class="tick-label">2</text>
    <text x="215" y="240" class="tick-label">3</text>
    <line x1="215" y1="220" x2="215" y2="80" class="grid" />
    <text x="285" y="240" class="tick-label">4</text>
    <line x1="285" y1="220" x2="285" y2="120" class="grid" />
    <text x="355" y="240" class="tick-label">5</text>
    <line x1="355" y1="220" x2="355" y2="160" class="grid" />

    <polyline points="145,80 215,80 355,160 440,160" class="plot-line" />
    <circle cx="145" cy="80" r="4" class="point" />
    <circle cx="215" cy="80" r="4" class="point" />
    <circle cx="285" cy="120" r="4" class="point" />
    <circle cx="355" cy="160" r="4" class="point" />
  </svg>`,

  // Q61: a-t graph (line from (0, 6) to (2, 0))
  61: `
  ${SVG_HEADER(500, 280)}
    <line x1="60" y1="200" x2="440" y2="200" class="axis" marker-end="url(#arrow)" />
    <line x1="75" y1="240" x2="75" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="445" y="205" class="axis-label">t (s)</text>
    <text x="70" y="30" class="axis-label">a (m/s²)</text>

    <text x="45" y="75" class="tick-label">6 m/s²</text>
    <line x1="75" y1="70" x2="300" y2="245" class="plot-line" />
    <circle cx="75" cy="70" r="4" class="point" />
    <circle cx="225" cy="200" r="4" class="point" />
    <text x="150" y="220" class="tick-label">1s</text>
    <text x="225" y="220" class="tick-label">2s</text>
  </svg>`,

  // Q62: v-t graph in question + 4 s-t options
  62: `
  ${SVG_HEADER(720, 360)}
    <!-- Given v-t graph (Left) -->
    <rect x="30" y="15" width="220" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="45" y="38" class="box-title">Given v–t graph</text>
    <line x1="45" y1="120" x2="235" y2="120" class="axis" marker-end="url(#arrow)" />
    <line x1="60" y1="145" x2="60" y2="45" class="axis" marker-end="url(#arrow)" />
    <text x="240" y="125" class="tick-label">t</text>
    <text x="55" y="42" class="tick-label">v</text>
    <polyline points="60,120 100,70 160,70 215,145" class="plot-line" />
    <line x1="100" y1="120" x2="100" y2="70" class="grid" />
    <text x="100" y="135" class="tick-label">t₁</text>
    <line x1="160" y1="120" x2="160" y2="70" class="grid" />
    <text x="160" y="135" class="tick-label">t₂</text>
    <text x="215" y="160" class="tick-label">t₃</text>

    <!-- 4 Options (Right 4 boxes) -->
    <rect x="280" y="15" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="290" y="35" class="option-tag">(1)</text>
    <line x1="295" y1="135" x2="455" y2="135" class="axis" />
    <line x1="310" y1="145" x2="310" y2="45" class="axis" />
    <path d="M 310,135 Q 330,135 345,115 L 385,80 Q 405,65 415,65" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <rect x="500" y="15" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="510" y="35" class="option-tag">(2)</text>
    <line x1="515" y1="135" x2="675" y2="135" class="axis" />
    <line x1="530" y1="145" x2="530" y2="45" class="axis" />
    <path d="M 530,135 Q 545,85 575,70 L 615,55 Q 630,45 645,25" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <rect x="280" y="180" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="290" y="200" class="option-tag">(3)</text>
    <line x1="295" y1="300" x2="455" y2="300" class="axis" />
    <line x1="310" y1="310" x2="310" y2="210" class="axis" />
    <path d="M 310,300 Q 330,300 345,280 L 385,245 Q 405,230 420,240 Q 430,250 435,265" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <rect x="500" y="180" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="510" y="200" class="option-tag">(4)</text>
    <line x1="515" y1="300" x2="675" y2="300" class="axis" />
    <line x1="530" y1="310" x2="530" y2="210" class="axis" />
    <polyline points="530,300 555,250 595,250 625,320" stroke="#2563eb" stroke-width="2.5" fill="none" />
  </svg>`,

  // Q65: v-s graph in question + 4 a-s options
  65: `
  ${SVG_HEADER(720, 360)}
    <!-- Given v-s graph (Left) -->
    <rect x="30" y="15" width="200" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="45" y="38" class="box-title">Given v–s graph</text>
    <line x1="45" y1="135" x2="215" y2="135" class="axis" marker-end="url(#arrow)" />
    <line x1="60" y1="145" x2="60" y2="45" class="axis" marker-end="url(#arrow)" />
    <text x="220" y="140" class="tick-label">s</text>
    <text x="55" y="42" class="tick-label">v</text>
    <line x1="60" y1="95" x2="185" y2="55" class="plot-line" />

    <!-- 4 Options (Right 4 boxes) -->
    <rect x="260" y="15" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="270" y="35" class="option-tag">(1)</text>
    <line x1="275" y1="135" x2="435" y2="135" class="axis" />
    <line x1="290" y1="145" x2="290" y2="45" class="axis" />
    <text x="440" y="140" class="tick-label">s</text>
    <text x="285" y="42" class="tick-label">a</text>
    <path d="M 290,110 Q 345,110 395,55" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <rect x="480" y="15" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="490" y="35" class="option-tag">(2)</text>
    <line x1="495" y1="135" x2="655" y2="135" class="axis" />
    <line x1="510" y1="145" x2="510" y2="45" class="axis" />
    <text x="660" y="140" class="tick-label">s</text>
    <text x="505" y="42" class="tick-label">a</text>
    <line x1="510" y1="90" x2="630" y2="90" stroke="#2563eb" stroke-width="2.5" />

    <rect x="260" y="180" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="270" y="200" class="option-tag">(3)</text>
    <line x1="275" y1="300" x2="435" y2="300" class="axis" />
    <line x1="290" y1="310" x2="290" y2="210" class="axis" />
    <text x="440" y="305" class="tick-label">s</text>
    <text x="285" y="207" class="tick-label">a</text>
    <line x1="290" y1="260" x2="420" y2="225" stroke="#2563eb" stroke-width="2.5" />
    <text x="275" y="265" class="tick-label">a</text>

    <rect x="480" y="180" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="490" y="200" class="option-tag">(4)</text>
    <line x1="495" y1="300" x2="655" y2="300" class="axis" />
    <line x1="510" y1="310" x2="510" y2="210" class="axis" />
    <text x="660" y="305" class="tick-label">s</text>
    <text x="505" y="207" class="tick-label">a</text>
    <path d="M 510,250 Q 585,250 630,300" fill="none" stroke="#2563eb" stroke-width="2.5" />
  </svg>`,

  // Q67: Bouncing ball speed-time graph options
  67: `
  ${SVG_HEADER(720, 360)}
    <text x="360" y="30" class="box-title" style="text-anchor:middle;">Speed–Time Graph for Inelastic Bouncing Ball</text>
    <!-- Opt 1 -->
    <rect x="40" y="55" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="78" class="option-tag">(1)</text>
    <line x1="70" y1="165" x2="300" y2="165" class="axis" />
    <line x1="85" y1="175" x2="85" y2="80" class="axis" />
    <text x="305" y="170" class="tick-label">t</text>
    <text x="80" y="75" class="tick-label">v</text>
    <polyline points="85,165 170,105 255,165" stroke="#2563eb" stroke-width="2.5" fill="none" />

    <!-- Opt 2 -->
    <rect x="380" y="55" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="395" y="78" class="option-tag">(2)</text>
    <line x1="410" y1="165" x2="640" y2="165" class="axis" />
    <line x1="425" y1="175" x2="425" y2="80" class="axis" />
    <text x="645" y="170" class="tick-label">t</text>
    <text x="420" y="75" class="tick-label">v</text>
    <polyline points="425,105 510,165 595,105" stroke="#2563eb" stroke-width="2.5" fill="none" />

    <!-- Opt 3 -->
    <rect x="40" y="205" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="228" class="option-tag">(3)</text>
    <line x1="70" y1="315" x2="300" y2="315" class="axis" />
    <line x1="85" y1="325" x2="85" y2="230" class="axis" />
    <text x="305" y="320" class="tick-label">t</text>
    <text x="80" y="225" class="tick-label">v</text>
    <line x1="85" y1="315" x2="165" y2="245" stroke="#2563eb" stroke-width="2.5" />
    <line x1="165" y1="245" x2="165" y2="275" stroke="#2563eb" stroke-width="2" stroke-dasharray="3,3" />
    <polyline points="165,275 220,315 255,285" stroke="#2563eb" stroke-width="2.5" fill="none" />

    <!-- Opt 4 -->
    <rect x="380" y="205" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="395" y="228" class="option-tag">(4)</text>
    <line x1="410" y1="315" x2="640" y2="315" class="axis" />
    <line x1="425" y1="325" x2="425" y2="230" class="axis" />
    <text x="645" y="320" class="tick-label">t</text>
    <text x="420" y="225" class="tick-label">v</text>
    <line x1="425" y1="315" x2="505" y2="245" stroke="#2563eb" stroke-width="2.5" />
    <line x1="505" y1="245" x2="505" y2="315" stroke="#2563eb" stroke-width="2" stroke-dasharray="3,3" />
    <line x1="505" y1="315" x2="585" y2="245" stroke="#2563eb" stroke-width="2.5" />
  </svg>`,

  // Q69: a-t graph (0 to 10s trapezoid)
  69: `
  ${SVG_HEADER(560, 300)}
    <!-- Origin at (70, 160) -->
    <line x1="60" y1="160" x2="510" y2="160" class="axis" marker-end="url(#arrow)" />
    <line x1="70" y1="270" x2="70" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="515" y="165" class="axis-label">t (s)</text>
    <text x="65" y="30" class="axis-label">a (m s⁻²)</text>

    <!-- y-ticks: 5, -5 -->
    <text x="55" y="85" class="tick-label">5</text>
    <line x1="65" y1="80" x2="310" y2="80" class="grid" />
    <text x="50" y="245" class="tick-label">-5</text>
    <line x1="65" y1="240" x2="470" y2="240" class="grid" />

    <!-- x-ticks: 2, 4, 6, 8, 10 -->
    <!-- Scale: 40px per s -->
    <text x="150" y="180" class="tick-label">2</text>
    <line x1="150" y1="160" x2="150" y2="80" class="grid" />
    <text x="230" y="180" class="tick-label">4</text>
    <text x="310" y="180" class="tick-label">6</text>
    <line x1="310" y1="160" x2="310" y2="80" class="grid" />
    <text x="390" y="180" class="tick-label">8</text>
    <text x="470" y="180" class="tick-label">10</text>
    <line x1="470" y1="160" x2="470" y2="240" class="grid" />

    <!-- Plot: (0,0) -> (2,5) -> (6,5) -> (8,0) -> (10,-5) -->
    <polyline points="70,160 150,80 310,80 390,160 470,240" class="plot-line" />
    <circle cx="70" cy="160" r="4" class="point" />
    <circle cx="150" cy="80" r="4" class="point" />
    <circle cx="310" cy="80" r="4" class="point" />
    <circle cx="390" cy="160" r="4" class="point" />
    <circle cx="470" cy="240" r="4" class="point" />
  </svg>`,

  // Q72: v-t graph (0 to 4s ramp to 8 m/s)
  72: `
  ${SVG_HEADER(520, 290)}
    <line x1="60" y1="210" x2="460" y2="210" class="axis" marker-end="url(#arrow)" />
    <line x1="75" y1="230" x2="75" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="465" y="215" class="axis-label">t (s)</text>
    <text x="70" y="30" class="axis-label">v (m/s)</text>

    <!-- y-ticks: 2, 4, 6, 8 -->
    <text x="55" y="175" class="tick-label">2</text>
    <line x1="70" y1="170" x2="145" y2="170" class="grid" />
    <text x="55" y="140" class="tick-label">4</text>
    <line x1="70" y1="135" x2="215" y2="135" class="grid" />
    <text x="55" y="105" class="tick-label">6</text>
    <line x1="70" y1="100" x2="285" y2="100" class="grid" />
    <text x="55" y="70" class="tick-label">8</text>
    <line x1="70" y1="65" x2="355" y2="65" class="grid" />

    <!-- x-ticks: 1, 2, 3, 4 -->
    <text x="145" y="230" class="tick-label">1</text>
    <line x1="145" y1="210" x2="145" y2="170" class="grid" />
    <text x="215" y="230" class="tick-label">2</text>
    <line x1="215" y1="210" x2="215" y2="135" class="grid" />
    <text x="285" y="230" class="tick-label">3</text>
    <line x1="285" y1="210" x2="285" y2="100" class="grid" />
    <text x="355" y="230" class="tick-label">4</text>
    <line x1="355" y1="210" x2="355" y2="65" class="grid" />

    <polyline points="75,210 355,65 425,65" class="plot-line" />
    <circle cx="75" cy="210" r="4" class="point" />
    <circle cx="145" cy="170" r="4" class="point" />
    <circle cx="215" cy="135" r="4" class="point" />
    <circle cx="285" cy="100" r="4" class="point" />
    <circle cx="355" cy="65" r="4" class="point" />
  </svg>`,

  // Q73: a-t graph (line from (0, 10) to (8, -10))
  73: `
  ${SVG_HEADER(540, 300)}
    <!-- Origin at (85, 150) -->
    <line x1="60" y1="150" x2="490" y2="150" class="axis" marker-end="url(#arrow)" />
    <line x1="85" y1="260" x2="85" y2="35" class="axis" marker-end="url(#arrow)" />
    <text x="495" y="155" class="axis-label">t (s)</text>
    <text x="80" y="25" class="axis-label">a (m/s²)</text>

    <!-- y-ticks: 10, -10 -->
    <text x="65" y="75" class="tick-label">10</text>
    <text x="60" y="235" class="tick-label">-10</text>
    <line x1="80" y1="230" x2="365" y2="230" class="grid" />

    <!-- x-ticks: 4, 8, 10 -->
    <!-- Scale: 35px per s -->
    <text x="85" y="170" class="tick-label">(0, 0)</text>
    <text x="225" y="170" class="tick-label">4</text>
    <text x="365" y="140" class="tick-label">8</text>
    <line x1="365" y1="150" x2="365" y2="230" class="grid" />
    <text x="420" y="140" class="tick-label">10</text>

    <polyline points="85,70 225,150 365,230 420,180" class="plot-line" />
    <circle cx="85" cy="70" r="4" class="point" />
    <circle cx="225" cy="150" r="4" class="point" />
    <circle cx="365" cy="230" r="4" class="point" />
  </svg>`,

  // Q77: Projected vertically upward v vs x
  77: `
  ${SVG_HEADER(720, 360)}
    <text x="360" y="30" class="box-title" style="text-anchor:middle;">Velocity (v) vs Position (x) for Vertical Projection with Speed u</text>
    <!-- Opt 1 (Horizontal parabola symmetric about v=0) -->
    <rect x="40" y="55" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="78" class="option-tag">(1)</text>
    <line x1="70" y1="125" x2="300" y2="125" class="axis" />
    <line x1="85" y1="175" x2="85" y2="75" class="axis" />
    <text x="305" y="130" class="tick-label">x</text>
    <text x="80" y="70" class="tick-label">v</text>
    <path d="M 85,85 Q 230,85 230,125 Q 230,165 85,165" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="75" y="88" class="tick-label">u</text>
    <text x="70" y="170" class="tick-label">-u</text>
    <text x="230" y="145" class="tick-label">u²/2g</text>

    <!-- Opt 2 -->
    <rect x="380" y="55" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="395" y="78" class="option-tag">(2)</text>
    <line x1="410" y1="125" x2="640" y2="125" class="axis" />
    <line x1="425" y1="175" x2="425" y2="75" class="axis" />
    <text x="645" y="130" class="tick-label">x</text>
    <text x="420" y="70" class="tick-label">v</text>
    <polyline points="425,85 570,125 425,165" stroke="#2563eb" stroke-width="2.5" fill="none" />
    <text x="415" y="88" class="tick-label">u</text>
    <text x="410" y="170" class="tick-label">-u</text>
    <text x="570" y="145" class="tick-label">u²/2g</text>

    <!-- Opt 3 -->
    <rect x="40" y="205" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="228" class="option-tag">(3)</text>
    <line x1="70" y1="275" x2="300" y2="275" class="axis" />
    <line x1="85" y1="325" x2="85" y2="225" class="axis" />
    <text x="305" y="280" class="tick-label">x</text>
    <text x="80" y="220" class="tick-label">v</text>
    <line x1="85" y1="235" x2="230" y2="315" stroke="#2563eb" stroke-width="2.5" />
    <text x="75" y="238" class="tick-label">u</text>
    <text x="70" y="320" class="tick-label">-u</text>
    <text x="175" y="265" class="tick-label">u²/2g</text>

    <!-- Opt 4 -->
    <rect x="380" y="205" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="395" y="228" class="option-tag">(4)</text>
    <line x1="410" y1="275" x2="640" y2="275" class="axis" />
    <line x1="425" y1="325" x2="425" y2="225" class="axis" />
    <text x="645" y="280" class="tick-label">x</text>
    <text x="420" y="220" class="tick-label">v</text>
    <path d="M 425,325 Q 480,275 520,275" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <path d="M 520,275 Q 560,275 615,225" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="415" y="238" class="tick-label">u</text>
    <text x="520" y="295" class="tick-label">u²/2g</text>
  </svg>`,

  // Q80: x-t curve with segments O, A, B, C, D, E
  80: `
  ${SVG_HEADER(500, 300)}
    <line x1="60" y1="240" x2="440" y2="240" class="axis" marker-end="url(#arrow)" />
    <line x1="80" y1="250" x2="80" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="445" y="245" class="axis-label">t</text>
    <text x="75" y="30" class="axis-label">x</text>

    <!-- S-curve: O(80,240) -> A(130,225) -> B(190,175) -> C(240,115) -> D(310,75) -> E(370,60) -->
    <path d="M 80,240 Q 110,240 140,220 Q 200,180 250,110 Q 300,60 370,60" fill="none" stroke="#2563eb" stroke-width="3" />
    <circle cx="80" cy="240" r="4" class="point" />
    <text x="70" y="255" class="axis-label">O</text>

    <circle cx="130" cy="225" r="4" class="point" />
    <text x="120" y="215" class="axis-label" fill="#dc2626">A</text>

    <circle cx="190" cy="175" r="4" class="point" />
    <text x="175" y="165" class="axis-label" fill="#dc2626">B</text>

    <circle cx="250" cy="115" r="4" class="point" />
    <text x="240" y="105" class="axis-label" fill="#dc2626">C</text>

    <circle cx="310" cy="75" r="4" class="point" />
    <text x="305" y="65" class="axis-label" fill="#dc2626">D</text>

    <circle cx="370" cy="60" r="4" class="point" />
    <text x="375" y="55" class="axis-label" fill="#dc2626">E</text>
  </svg>`,

  // Q81: a-t graph in question + 4 v-t options
  81: `
  ${SVG_HEADER(720, 360)}
    <!-- Given a-t graph (Left) -->
    <rect x="30" y="15" width="200" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="45" y="38" class="box-title">Given a–t graph</text>
    <line x1="45" y1="135" x2="215" y2="135" class="axis" marker-end="url(#arrow)" />
    <line x1="60" y1="145" x2="60" y2="45" class="axis" marker-end="url(#arrow)" />
    <text x="220" y="140" class="tick-label">t</text>
    <text x="55" y="42" class="tick-label">a</text>
    <line x1="60" y1="135" x2="185" y2="65" class="plot-line" />

    <!-- 4 Options (Right 4 boxes) -->
    <rect x="260" y="15" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="270" y="35" class="option-tag">(1)</text>
    <line x1="275" y1="135" x2="435" y2="135" class="axis" />
    <line x1="290" y1="145" x2="290" y2="45" class="axis" />
    <text x="440" y="140" class="tick-label">t</text>
    <text x="285" y="42" class="tick-label">v</text>
    <line x1="290" y1="135" x2="415" y2="65" stroke="#2563eb" stroke-width="2.5" />

    <rect x="480" y="15" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="490" y="35" class="option-tag">(2)</text>
    <line x1="495" y1="135" x2="655" y2="135" class="axis" />
    <line x1="510" y1="145" x2="510" y2="45" class="axis" />
    <text x="660" y="140" class="tick-label">t</text>
    <text x="505" y="42" class="tick-label">v</text>
    <path d="M 510,135 Q 585,135 635,65" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <rect x="260" y="180" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="270" y="200" class="option-tag">(3)</text>
    <line x1="275" y1="300" x2="435" y2="300" class="axis" />
    <line x1="290" y1="310" x2="290" y2="210" class="axis" />
    <text x="440" y="305" class="tick-label">t</text>
    <text x="285" y="207" class="tick-label">v</text>
    <path d="M 290,300 Q 330,230 415,230" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <rect x="480" y="180" width="190" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="490" y="200" class="option-tag">(4)</text>
    <line x1="495" y1="300" x2="655" y2="300" class="axis" />
    <line x1="510" y1="310" x2="510" y2="210" class="axis" />
    <text x="660" y="305" class="tick-label">t</text>
    <text x="505" y="207" class="tick-label">v</text>
    <line x1="510" y1="230" x2="635" y2="300" stroke="#2563eb" stroke-width="2.5" />
  </svg>`,

  // Q83: Which graph is not possible?
  83: `
  ${SVG_HEADER(720, 360)}
    <text x="360" y="30" class="box-title" style="text-anchor:middle;">Identify Which of the Following Graphs is Physically Not Possible</text>
    <!-- Opt 1 -->
    <rect x="40" y="55" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="78" class="option-tag">(1)</text>
    <line x1="70" y1="165" x2="300" y2="165" class="axis" />
    <line x1="85" y1="175" x2="85" y2="80" class="axis" />
    <text x="305" y="170" class="tick-label">t</text>
    <text x="80" y="75" class="tick-label">v (velocity)</text>
    <path d="M 85,165 Q 160,165 245,100" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <!-- Opt 2 (Impossible: vertical drop in v-x) -->
    <rect x="380" y="55" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="395" y="78" class="option-tag">(2)</text>
    <line x1="410" y1="165" x2="640" y2="165" class="axis" />
    <line x1="425" y1="175" x2="425" y2="80" class="axis" />
    <text x="645" y="170" class="tick-label">displacement (x)</text>
    <text x="420" y="75" class="tick-label">v (velocity)</text>
    <line x1="425" y1="165" x2="505" y2="105" stroke="#2563eb" stroke-width="2.5" />
    <line x1="505" y1="105" x2="505" y2="165" stroke="#dc2626" stroke-width="3" />
    <path d="M 505,165 Q 550,115 595,165" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <!-- Opt 3 -->
    <rect x="40" y="205" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="228" class="option-tag">(3)</text>
    <line x1="70" y1="315" x2="300" y2="315" class="axis" />
    <line x1="85" y1="325" x2="85" y2="230" class="axis" />
    <text x="305" y="320" class="tick-label">displacement (x)</text>
    <text x="80" y="225" class="tick-label">v (velocity)</text>
    <polyline points="85,315 130,265 175,315" stroke="#2563eb" stroke-width="2.5" fill="none" />
    <path d="M 175,315 Q 220,265 265,315" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <!-- Opt 4 -->
    <rect x="380" y="205" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="395" y="228" class="option-tag">(4)</text>
    <line x1="410" y1="315" x2="640" y2="315" class="axis" />
    <line x1="425" y1="325" x2="425" y2="230" class="axis" />
    <text x="645" y="320" class="tick-label">t</text>
    <text x="420" y="225" class="tick-label">v (velocity)</text>
    <line x1="425" y1="265" x2="595" y2="265" stroke="#2563eb" stroke-width="2.5" />
  </svg>`,

  // Q84: a-x graphs for v = k|x|
  84: `
  ${SVG_HEADER(720, 360)}
    <text x="360" y="30" class="box-title" style="text-anchor:middle;">Acceleration (a) vs Displacement (x) for v = k|x|</text>
    <!-- Opt 1 -->
    <rect x="40" y="55" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="78" class="option-tag">(1)</text>
    <line x1="70" y1="165" x2="300" y2="165" class="axis" />
    <line x1="85" y1="175" x2="85" y2="80" class="axis" />
    <text x="305" y="170" class="tick-label">x</text>
    <text x="80" y="75" class="tick-label">a</text>
    <line x1="85" y1="105" x2="225" y2="165" stroke="#2563eb" stroke-width="2.5" />

    <!-- Opt 2 -->
    <rect x="380" y="55" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="395" y="78" class="option-tag">(2)</text>
    <line x1="410" y1="165" x2="640" y2="165" class="axis" />
    <line x1="425" y1="175" x2="425" y2="80" class="axis" />
    <text x="645" y="170" class="tick-label">x</text>
    <text x="420" y="75" class="tick-label">a</text>
    <path d="M 425,165 Q 505,165 565,95" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <!-- Opt 3 (Correct: a = k^2 x) -->
    <rect x="40" y="205" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="228" class="option-tag">(3)</text>
    <line x1="70" y1="315" x2="300" y2="315" class="axis" />
    <line x1="85" y1="325" x2="85" y2="230" class="axis" />
    <text x="305" y="320" class="tick-label">x</text>
    <text x="80" y="225" class="tick-label">a</text>
    <line x1="85" y1="315" x2="225" y2="245" stroke="#2563eb" stroke-width="2.5" />

    <!-- Opt 4 -->
    <rect x="380" y="205" width="290" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="395" y="228" class="option-tag">(4)</text>
    <line x1="410" y1="315" x2="640" y2="315" class="axis" />
    <line x1="425" y1="325" x2="425" y2="230" class="axis" />
    <text x="645" y="320" class="tick-label">x</text>
    <text x="420" y="225" class="tick-label">a</text>
    <line x1="425" y1="265" x2="585" y2="265" stroke="#2563eb" stroke-width="2.5" />
  </svg>`,

  // Q86: Position-time graphs for A and B with angles 37 and 53
  86: `
  ${SVG_HEADER(500, 320)}
    <line x1="60" y1="250" x2="440" y2="250" class="axis" marker-end="url(#arrow)" />
    <line x1="80" y1="270" x2="80" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="445" y="255" class="axis-label">t</text>
    <text x="75" y="30" class="axis-label">x</text>

    <!-- Line A: from (80, 250) making 37 deg with t-axis -->
    <line x1="80" y1="250" x2="320" y2="120" stroke="#2563eb" stroke-width="3" />
    <text x="330" y="125" class="axis-label" fill="#2563eb">A</text>
    <path d="M 140,250 A 60 60 0 0 0 128,224" fill="none" stroke="#2563eb" stroke-width="2" />
    <text x="145" y="235" class="axis-label" fill="#2563eb">37°</text>

    <!-- Line B: starts at (80, 70), makes 53 deg with vertical axis, slopes down -->
    <line x1="80" y1="70" x2="260" y2="180" stroke="#dc2626" stroke-width="3" />
    <text x="270" y="185" class="axis-label" fill="#dc2626">B</text>
    <path d="M 80,120 A 50 50 0 0 0 110,105" fill="none" stroke="#dc2626" stroke-width="2" />
    <text x="95" y="130" class="axis-label" fill="#dc2626">53°</text>
  </svg>`,

  // Q88: Ball bouncing between two walls + position-time graph options
  88: `
  ${SVG_HEADER(720, 420)}
    <!-- Wall setup diagram (Top center) -->
    <rect x="180" y="15" width="360" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="360" y="35" class="box-title" style="text-anchor:middle;">Ball Bouncing Elastically Between Two Rigid Walls</text>
    <!-- Left wall at x=230 -->
    <line x1="230" y1="50" x2="230" y2="130" stroke="#0f172a" stroke-width="4" />
    <path d="M 230,60 l -15,10 M 230,80 l -15,10 M 230,100 l -15,10 M 230,120 l -15,10" stroke="#94a3b8" stroke-width="2" />
    <!-- Right wall at x=490 -->
    <line x1="490" y1="50" x2="490" y2="130" stroke="#0f172a" stroke-width="4" />
    <path d="M 490,60 l 15,-10 M 490,80 l 15,-10 M 490,100 l 15,-10 M 490,120 l 15,-10" stroke="#94a3b8" stroke-width="2" />
    <!-- Floor -->
    <line x1="230" y1="130" x2="490" y2="130" stroke="#334155" stroke-width="2.5" />
    <!-- Origin O and Ball -->
    <circle cx="360" cy="120" r="8" fill="#2563eb" />
    <text x="360" y="148" class="tick-label">O</text>
    <!-- Arrow to right -->
    <line x1="372" y1="120" x2="415" y2="120" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)" />
    <!-- Distance marks l and l -->
    <line x1="230" y1="155" x2="360" y2="155" stroke="#64748b" stroke-width="1.5" />
    <text x="295" y="150" class="tick-label">l</text>
    <line x1="360" y1="155" x2="490" y2="155" stroke="#64748b" stroke-width="1.5" />
    <text x="425" y="150" class="tick-label">l</text>

    <!-- Option (1) on left -->
    <rect x="40" y="190" width="310" height="210" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="55" y="215" class="option-tag">(1)</text>
    <line x1="70" y1="295" x2="330" y2="295" class="axis" />
    <line x1="85" y1="385" x2="85" y2="215" class="axis" />
    <text x="335" y="300" class="tick-label">t</text>
    <text x="80" y="210" class="tick-label">x</text>
    <line x1="85" y1="245" x2="320" y2="245" stroke="#64748b" stroke-dasharray="3,3" />
    <text x="70" y="250" class="tick-label">+l</text>
    <line x1="85" y1="345" x2="320" y2="345" stroke="#64748b" stroke-dasharray="3,3" />
    <text x="70" y="350" class="tick-label">-l</text>
    <!-- Triangular wave -->
    <polyline points="85,295 140,245 250,345 305,295" stroke="#2563eb" stroke-width="2.8" fill="none" />

    <!-- Option (2) on right -->
    <rect x="370" y="190" width="310" height="210" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="385" y="215" class="option-tag">(2)</text>
    <line x1="400" y1="345" x2="660" y2="345" class="axis" />
    <line x1="415" y1="385" x2="415" y2="215" class="axis" />
    <text x="665" y="350" class="tick-label">t</text>
    <text x="410" y="210" class="tick-label">x</text>
    <line x1="415" y1="265" x2="650" y2="265" stroke="#64748b" stroke-dasharray="3,3" />
    <text x="400" y="270" class="tick-label">l</text>
    <!-- Sawtooth wave -->
    <line x1="415" y1="345" x2="475" y2="265" stroke="#2563eb" stroke-width="2.5" />
    <line x1="475" y1="265" x2="475" y2="345" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="3,3" />
    <line x1="475" y1="345" x2="535" y2="265" stroke="#2563eb" stroke-width="2.5" />
    <line x1="535" y1="265" x2="535" y2="345" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="3,3" />
    <line x1="535" y1="345" x2="595" y2="265" stroke="#2563eb" stroke-width="2.5" />
  </svg>`
};

async function generateAndUploadAll() {
  console.log('[Diagrams] Generating and uploading diagrams for Motion in a Straight Line...');
  const results = {};

  for (const [qNum, svgStr] of Object.entries(DIAGRAMS)) {
    const cleanSvg = svgStr.trim();
    const fileName = `q${qNum}_motion.png`;

    const filePathBackend = path.join(outDirBackend, fileName);
    const filePathFrontend = path.join(outDirFrontend, fileName);

    // Convert SVG to PNG buffer with high DPI using sharp
    const pngBuffer = await sharp(Buffer.from(cleanSvg), { density: 150 })
      .png()
      .toBuffer();

    fs.writeFileSync(filePathBackend, pngBuffer);
    fs.writeFileSync(filePathFrontend, pngBuffer);
    console.log(`[Diagrams] Saved local PNG: ${fileName}`);

    // Upload to Cloudinary
    try {
      const uploadRes = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'edvedum_motion_straight_line',
            public_id: `q${qNum}_motion`,
            resource_type: 'image',
            overwrite: true,
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
        stream.end(pngBuffer);
      });

      console.log(`[Diagrams] Uploaded Q${qNum} to Cloudinary: ${uploadRes.secure_url}`);
      results[qNum] = uploadRes.secure_url;
    } catch (uploadErr) {
      console.warn(`[Diagrams] Cloudinary upload error for Q${qNum}:`, uploadErr.message);
      // Fallback to local public path
      results[qNum] = `/uploads/motion_in_straight_line/${fileName}`;
    }
  }

  const outMapPath = path.resolve(__dirname, 'motion_diagrams.json');
  fs.writeFileSync(outMapPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`[Diagrams] All ${Object.keys(results).length} diagrams mapped and saved to motion_diagrams.json!`);
  return results;
}

if (process.argv[1]?.endsWith('generate_motion_diagrams.js')) {
  generateAndUploadAll()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[Diagrams] Error:', err);
      process.exit(1);
    });
}
