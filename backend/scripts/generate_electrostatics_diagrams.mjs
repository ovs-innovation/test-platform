import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDirBackend = path.resolve(__dirname, '../uploads/electric_charges');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/electric_charges');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

const SVG_HEADER = (w = 380, h = 240) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2.2; stroke-linecap: round; }
    .label { font-size: 15px; font-weight: 700; fill: #0f172a; text-anchor: middle; dominant-baseline: middle; }
    .tick-label { font-size: 13px; font-weight: 600; fill: #1e293b; text-anchor: middle; dominant-baseline: middle; }
    .dashed { stroke: #64748b; stroke-width: 1.5; stroke-dasharray: 4,4; }
    .solid { stroke: #0f172a; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; fill: none; }
    .opt-box { stroke: #cbd5e1; stroke-width: 1.2; fill: #ffffff; rx: 6; }
    .opt-title { font-size: 13px; font-weight: 700; fill: #334155; }
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0f172a"/>
    </marker>
    <marker id="axis-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#0f172a"/>
    </marker>
  </defs>
`;

const diagrams = {
  // Q3: Electric field lines between A and B
  electro_q3: `${SVG_HEADER(360, 200)}
    <!-- Charge A -->
    <circle cx="80" cy="100" r="10" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
    <text x="80" y="100" class="label" style="fill:#dc2626;">A</text>

    <!-- Charge B -->
    <circle cx="280" cy="100" r="10" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
    <text x="280" y="100" class="label" style="fill:#2563eb;">B</text>

    <!-- Lines from A to B -->
    <line x1="90" y1="100" x2="270" y2="100" class="solid" marker-mid="url(#arrow)"/>
    <path d="M 90 95 Q 180 60 270 95" class="solid"/>
    <path d="M 90 105 Q 180 140 270 105" class="solid"/>
    <path d="M 88 90 Q 180 30 272 90" class="solid"/>
    <path d="M 88 110 Q 180 170 272 110" class="solid"/>

    <!-- Extra lines leaving A into space -->
    <line x1="70" y1="100" x2="30" y2="100" class="solid" marker-end="url(#arrow)"/>
    <line x1="72" y1="92" x2="35" y2="65" class="solid" marker-end="url(#arrow)"/>
    <line x1="72" y1="108" x2="35" y2="135" class="solid" marker-end="url(#arrow)"/>
    <line x1="80" y1="90" x2="80" y2="40" class="solid" marker-end="url(#arrow)"/>
    <line x1="80" y1="110" x2="80" y2="160" class="solid" marker-end="url(#arrow)"/>

    <!-- Fewer lines entering B -->
    <line x1="320" y1="80" x2="288" y2="92" class="solid" marker-mid="url(#arrow)"/>
    <line x1="320" y1="120" x2="288" y2="108" class="solid" marker-mid="url(#arrow)"/>
  </svg>`,

  // Q9: Dipole rod at 60 deg in uniform field
  electro_q9: `${SVG_HEADER(360, 220)}
    <!-- Uniform E lines -->
    <line x1="40" y1="50" x2="320" y2="50" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="40" y1="90" x2="320" y2="90" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="40" y1="130" x2="320" y2="130" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="40" y1="170" x2="320" y2="170" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="310" y="70" class="label">E</text>

    <!-- Rod at 60 deg -->
    <line x1="140" y1="165" x2="220" y2="65" stroke="#0f172a" stroke-width="4"/>
    <circle cx="140" cy="165" r="7" fill="#0f172a"/>
    <circle cx="220" cy="65" r="7" fill="#0f172a"/>

    <text x="125" y="180" class="tick-label">-q</text>
    <text x="235" y="55" class="tick-label">+q</text>

    <!-- Angle arc -->
    <line x1="140" y1="165" x2="200" y2="165" class="dashed"/>
    <path d="M 170 165 A 30 30 0 0 0 160 140" class="solid"/>
    <text x="180" y="150" class="tick-label">60°</text>
  </svg>`,

  // Q10: Dipole along radial line of charged sphere
  electro_q10: `${SVG_HEADER(360, 200)}
    <circle cx="100" cy="100" r="50" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>
    <text x="80" y="100" class="label">+Q</text>
    <line x1="100" y1="100" x2="135" y2="65" class="dashed"/>
    <text x="110" y="80" class="tick-label">R</text>

    <!-- Radial axis -->
    <line x1="100" y1="100" x2="310" y2="100" class="dashed"/>
    <!-- Dipole -->
    <line x1="220" y1="100" x2="265" y2="100" class="solid" marker-end="url(#arrow)" style="stroke-width:3.5;"/>
    <text x="275" y="90" class="label">p</text>
    <line x1="100" y1="145" x2="242" y2="145" class="solid" marker-end="url(#arrow)"/>
    <line x1="242" y1="145" x2="100" y2="145" class="solid" marker-end="url(#arrow)"/>
    <text x="170" y="160" class="tick-label">r</text>
  </svg>`,

  // Q11: Conducting shell with cavities
  electro_q11: `${SVG_HEADER(340, 200)}
    <circle cx="150" cy="100" r="75" fill="#f1f5f9" stroke="#0f172a" stroke-width="3"/>
    <!-- Cavity 1 -->
    <circle cx="125" cy="85" r="22" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
    <text x="125" y="85" class="tick-label">+q₁</text>
    <!-- Cavity 2 -->
    <circle cx="170" cy="115" r="22" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
    <text x="170" y="115" class="tick-label">+q₂</text>
    <!-- Outside charge -->
    <circle cx="270" cy="95" r="5" fill="#0f172a"/>
    <text x="285" y="95" class="tick-label">+q₃</text>
  </svg>`,

  // Q14: 4 graphs of E vs r for charged conductor
  electro_q14: `${SVG_HEADER(460, 280)}
    <rect x="15" y="15" width="205" height="115" class="opt-box"/>
    <text x="30" y="32" class="opt-title">(1)</text>
    <line x1="55" y1="105" x2="195" y2="105" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="55" y1="105" x2="55" y2="35" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="205" y="105" class="label">r</text>
    <text x="55" y="25" class="label">E</text>
    <line x1="55" y1="105" x2="95" y2="105" stroke="#dc2626" stroke-width="3"/>
    <line x1="95" y1="105" x2="95" y2="55" class="dashed"/>
    <path d="M 95 55 Q 120 95 185 102" class="solid"/>
    <text x="95" y="118" class="tick-label">r=R</text>

    <rect x="235" y="15" width="205" height="115" class="opt-box"/>
    <text x="250" y="32" class="opt-title">(2)</text>
    <line x1="275" y1="105" x2="415" y2="105" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="275" y1="105" x2="275" y2="35" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="425" y="105" class="label">r</text>
    <text x="275" y="25" class="label">E</text>
    <line x1="275" y1="105" x2="335" y2="55" class="solid"/>
    <line x1="335" y1="55" x2="395" y2="105" class="solid"/>

    <rect x="15" y="145" width="205" height="115" class="opt-box"/>
    <text x="30" y="162" class="opt-title">(3)</text>
    <line x1="55" y1="235" x2="195" y2="235" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="55" y1="235" x2="55" y2="165" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="205" y="235" class="label">r</text>
    <text x="55" y="155" class="label">E</text>
    <path d="M 55 175 Q 85 225 185 233" class="solid"/>

    <rect x="235" y="145" width="205" height="115" class="opt-box"/>
    <text x="250" y="162" class="opt-title">(4)</text>
    <line x1="275" y1="235" x2="415" y2="235" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="275" y1="235" x2="275" y2="165" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="425" y="235" class="label">r</text>
    <text x="275" y="155" class="label">E</text>
    <line x1="275" y1="235" x2="335" y2="185" class="solid"/>
    <path d="M 335 185 Q 365 225 405 233" class="solid"/>
  </svg>`,

  // Q15: Three dipoles arranged around P
  electro_q15: `${SVG_HEADER(340, 220)}
    <!-- Center P -->
    <circle cx="170" cy="110" r="4" fill="#0f172a"/>
    <text x="170" y="95" class="label">P</text>

    <!-- Top dipole (+x) -->
    <line x1="140" y1="50" x2="200" y2="50" class="solid"/>
    <circle cx="140" cy="50" r="5" fill="#0f172a"/><text x="140" y="38" class="tick-label">-Q</text>
    <circle cx="200" cy="50" r="5" fill="#0f172a"/><text x="200" y="38" class="tick-label">+Q</text>

    <!-- Bottom dipole (+x) -->
    <line x1="140" y1="170" x2="200" y2="170" class="solid"/>
    <circle cx="140" cy="170" r="5" fill="#0f172a"/><text x="140" y="185" class="tick-label">-Q</text>
    <circle cx="200" cy="170" r="5" fill="#0f172a"/><text x="200" y="185" class="tick-label">+Q</text>

    <!-- Left dipole (+x towards P) -->
    <line x1="80" y1="110" x2="130" y2="110" class="solid"/>
    <circle cx="80" cy="110" r="5" fill="#0f172a"/><text x="80" y="98" class="tick-label">-Q</text>
    <circle cx="130" cy="110" r="5" fill="#0f172a"/><text x="130" y="98" class="tick-label">+Q</text>

    <line x1="170" y1="50" x2="170" y2="170" class="dashed"/>
    <text x="180" y="75" class="tick-label">x</text>
    <text x="180" y="145" class="tick-label">x</text>
    <text x="150" y="122" class="tick-label">x</text>
  </svg>`,

  // Q16: Semicircular wire
  electro_q16: `${SVG_HEADER(340, 200)}
    <line x1="70" y1="130" x2="270" y2="130" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="170" y1="160" x2="170" y2="30" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="280" y="130" class="tick-label">x</text>
    <text x="170" y="20" class="tick-label">y</text>

    <!-- Semicircle in upper half -->
    <path d="M 110 130 A 60 60 0 0 1 230 130" class="solid" style="stroke-width: 3.5; stroke: #2563eb;"/>
    <text x="170" y="60" class="tick-label" style="fill:#2563eb; font-weight:bold;">+λ</text>
    <line x1="170" y1="130" x2="212" y2="88" class="dashed"/>
    <text x="195" y="112" class="tick-label">R</text>
  </svg>`,

  // Q17: Three large parallel sheets
  electro_q17: `${SVG_HEADER(360, 200)}
    <!-- Sheet 1 -->
    <line x1="90" y1="30" x2="90" y2="170" stroke="#0f172a" stroke-width="3"/>
    <text x="90" y="20" class="tick-label">+σ</text>

    <!-- Sheet 2 -->
    <line x1="180" y1="30" x2="180" y2="170" stroke="#0f172a" stroke-width="3"/>
    <text x="180" y="20" class="tick-label">+2σ</text>

    <!-- Sheet 3 -->
    <line x1="270" y1="30" x2="270" y2="170" stroke="#0f172a" stroke-width="3"/>
    <text x="270" y="20" class="tick-label">+3σ</text>

    <!-- Regions -->
    <text x="45" y="100" class="label">I</text>
    <text x="135" y="100" class="label">II</text>
    <text x="225" y="100" class="label" style="fill:#dc2626; font-size: 18px;">III</text>
    <text x="315" y="100" class="label">IV</text>
  </svg>`,

  // Q19: Concentric shells with points 1 and 2
  electro_q19: `${SVG_HEADER(340, 220)}
    <circle cx="170" cy="110" r="30" fill="none" stroke="#0f172a" stroke-width="2"/>
    <circle cx="170" cy="110" r="60" fill="none" stroke="#0f172a" stroke-width="2"/>
    <circle cx="170" cy="110" r="90" fill="none" stroke="#0f172a" stroke-width="2"/>

    <text x="155" y="100" class="tick-label">Q</text>
    <text x="155" y="65" class="tick-label">2Q</text>
    <text x="155" y="35" class="tick-label">3Q</text>

    <circle cx="215" cy="110" r="4" fill="#dc2626"/>
    <text x="215" y="125" class="tick-label">(1)</text>

    <circle cx="245" cy="110" r="4" fill="#dc2626"/>
    <text x="245" y="125" class="tick-label">(2)</text>
  </svg>`,

  // Q22: Gaussian surface with charges
  electro_q22: `${SVG_HEADER(320, 200)}
    <ellipse cx="150" cy="100" rx="60" ry="45" fill="#f8fafc" stroke="#0f172a" stroke-width="2" stroke-dasharray="4,4"/>
    <circle cx="135" cy="90" r="4" fill="#0f172a"/><text x="145" y="90" class="tick-label">q₁</text>
    <circle cx="160" cy="115" r="4" fill="#0f172a"/><text x="170" y="115" class="tick-label">q₂</text>

    <!-- Point P on surface -->
    <circle cx="210" cy="100" r="4" fill="#dc2626"/><text x="220" y="100" class="label" style="fill:#dc2626;">P</text>

    <!-- Charges outside -->
    <circle cx="65" cy="70" r="4" fill="#0f172a"/><text x="55" y="70" class="tick-label">q₃</text>
    <circle cx="245" cy="140" r="4" fill="#0f172a"/><text x="255" y="140" class="tick-label">q₄</text>
  </svg>`,

  // Q26: Converging and diverging field lines
  electro_q26: `${SVG_HEADER(360, 180)}
    <path d="M 40 50 Q 180 80 320 50" class="solid"/>
    <path d="M 40 80 Q 180 95 320 80" class="solid"/>
    <line x1="40" y1="110" x2="320" y2="110" class="solid"/>
    <path d="M 40 140 Q 180 125 320 140" class="solid"/>
    <path d="M 40 170 Q 180 140 320 170" class="solid"/>

    <circle cx="80" cy="110" r="4" fill="#dc2626"/><text x="80" y="95" class="label">A</text>
    <circle cx="180" cy="110" r="4" fill="#dc2626"/><text x="180" y="95" class="label">B</text>
    <circle cx="280" cy="110" r="4" fill="#dc2626"/><text x="280" y="95" class="label">C</text>
  </svg>`,

  // Q33: Concentric shells with points A and B
  electro_q33: `${SVG_HEADER(340, 220)}
    <circle cx="140" cy="110" r="35" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <text x="140" y="110" class="tick-label">+Q</text>
    <circle cx="140" cy="110" r="70" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <text x="140" y="60" class="tick-label">+3Q</text>

    <!-- Point B inside outer shell -->
    <circle cx="180" cy="110" r="3.5" fill="#0f172a"/><text x="180" y="95" class="label">B</text>
    <!-- Point A outside outer shell -->
    <circle cx="250" cy="110" r="3.5" fill="#0f172a"/><text x="250" y="95" class="label">A</text>

    <line x1="140" y1="110" x2="270" y2="110" class="dashed"/>
  </svg>`,

  // Q41: Right angled dipole system
  electro_q41: `${SVG_HEADER(320, 220)}
    <line x1="80" y1="170" x2="230" y2="170" class="solid"/>
    <line x1="80" y1="170" x2="80" y2="40" class="solid"/>
    <line x1="80" y1="40" x2="230" y2="170" class="dashed"/>

    <circle cx="80" cy="170" r="6" fill="#0f172a"/><text x="60" y="185" class="label">-2q</text>
    <circle cx="230" cy="170" r="6" fill="#0f172a"/><text x="245" y="170" class="label">+q</text>
    <circle cx="80" cy="40" r="6" fill="#0f172a"/><text x="80" y="25" class="label">+q</text>

    <text x="155" y="185" class="tick-label">l</text>
    <text x="65" y="105" class="tick-label">l</text>
    <path d="M 80 155 L 95 155 L 95 170" fill="none" stroke="#0f172a" stroke-width="1.5"/>
  </svg>`,

  // Q42: Conducting sphere near charge q
  electro_q42: `${SVG_HEADER(360, 200)}
    <circle cx="70" cy="100" r="5" fill="#0f172a"/>
    <text x="70" y="80" class="label">q</text>

    <!-- Sphere -->
    <circle cx="230" cy="100" r="55" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="230" cy="100" r="3" fill="#0f172a"/>
    <text x="230" y="115" class="tick-label">C</text>

    <!-- Point P just inside -->
    <circle cx="177" cy="100" r="3.5" fill="#dc2626"/>
    <text x="185" y="90" class="label" style="fill:#dc2626;">P</text>

    <line x1="70" y1="100" x2="230" y2="100" class="dashed"/>
    <text x="150" y="145" class="tick-label">d</text>
    <line x1="70" y1="135" x2="230" y2="135" class="solid" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
  </svg>`,

  // Q44: Spherical cavity in solid sphere
  electro_q44: `${SVG_HEADER(340, 220)}
    <circle cx="150" cy="110" r="80" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="150" cy="110" r="3" fill="#0f172a"/>
    <text x="145" y="125" class="tick-label">O</text>

    <!-- Cavity centered at distance a -->
    <circle cx="195" cy="90" r="28" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
    <circle cx="195" cy="90" r="3" fill="#0f172a"/>
    <line x1="150" y1="110" x2="195" y2="90" class="solid" marker-end="url(#arrow)" style="stroke-width:2.5; stroke:#dc2626;"/>
    <text x="175" y="95" class="tick-label" style="fill:#dc2626;">a</text>
  </svg>`,

  // Q58: Pendulum rod with charge q in horizontal E
  electro_q58: `${SVG_HEADER(340, 220)}
    <line x1="80" y1="50" x2="220" y2="50" stroke="#0f172a" stroke-width="4"/>
    <!-- Support point -->
    <circle cx="150" cy="50" r="3" fill="#0f172a"/>

    <!-- Vertical dashed line -->
    <line x1="150" y1="50" x2="150" y2="180" class="dashed"/>

    <!-- Rod at 45 deg -->
    <line x1="150" y1="50" x2="215" y2="115" stroke="#0f172a" stroke-width="3"/>
    <circle cx="215" cy="115" r="7" fill="#0f172a"/>
    <text x="235" y="115" class="tick-label">q, m</text>

    <!-- Angle 45 -->
    <path d="M 150 90 A 40 40 0 0 1 178 78" class="solid"/>
    <text x="170" y="95" class="tick-label">45°</text>

    <!-- E field lines -->
    <line x1="60" y1="140" x2="260" y2="140" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="270" y="140" class="label">E</text>
  </svg>`,

  // Q61: Short dipole on equator
  electro_q61: `${SVG_HEADER(360, 180)}
    <!-- Charge Q -->
    <circle cx="80" cy="100" r="7" fill="#0f172a"/><text x="80" y="80" class="label">+Q</text>

    <!-- Horizontal line -->
    <line x1="80" y1="100" x2="260" y2="100" class="dashed"/>
    <text x="170" y="90" class="tick-label">d</text>

    <!-- Dipole at distance d -->
    <line x1="260" y1="65" x2="260" y2="135" stroke="#0f172a" stroke-width="3"/>
    <circle cx="260" cy="65" r="5" fill="#0f172a"/><text x="275" y="65" class="tick-label">+q</text>
    <circle cx="260" cy="135" r="5" fill="#0f172a"/><text x="275" y="135" class="tick-label">-q</text>
    <text x="245" y="100" class="tick-label">2a</text>
  </svg>`,

  // Q62: Cube in non-uniform field
  electro_q62: `${SVG_HEADER(340, 220)}
    <!-- Axes -->
    <line x1="70" y1="180" x2="290" y2="180" class="axis" marker-end="url(#axis-arrow)"/><text x="300" y="180" class="tick-label">x</text>
    <line x1="70" y1="180" x2="70" y2="30" class="axis" marker-end="url(#axis-arrow)"/><text x="70" y="20" class="tick-label">y</text>
    <line x1="70" y1="180" x2="30" y2="210" class="axis" marker-end="url(#axis-arrow)"/><text x="20" y="210" class="tick-label">z</text>

    <!-- Cube from x = 0 to x = l -->
    <!-- Front face -->
    <rect x="70" y="100" width="70" height="80" fill="#f8fafc" stroke="#0f172a" stroke-width="2"/>
    <!-- Back face -->
    <rect x="100" y="70" width="70" height="80" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3"/>
    <!-- Connecting edges -->
    <line x1="70" y1="100" x2="100" y2="70" stroke="#0f172a" stroke-width="2"/>
    <line x1="140" y1="100" x2="170" y2="70" stroke="#0f172a" stroke-width="2"/>
    <line x1="140" y1="180" x2="170" y2="150" stroke="#0f172a" stroke-width="2"/>
    <line x1="70" y1="180" x2="100" y2="150" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3"/>
    <text x="105" y="195" class="tick-label">l</text>
  </svg>`,

  // Q67: Two dipoles at 120 deg
  electro_q67: `${SVG_HEADER(320, 200)}
    <circle cx="160" cy="50" r="7" fill="#0f172a"/>
    <text x="160" y="32" class="label">-2q</text>

    <line x1="160" y1="50" x2="90" y2="150" stroke="#0f172a" stroke-width="3"/>
    <circle cx="90" cy="150" r="6" fill="#0f172a"/>
    <text x="75" y="165" class="label">+q</text>

    <line x1="160" y1="50" x2="230" y2="150" stroke="#0f172a" stroke-width="3"/>
    <circle cx="230" cy="150" r="6" fill="#0f172a"/>
    <text x="245" y="165" class="label">+q</text>

    <text x="110" y="95" class="tick-label">2a</text>
    <text x="210" y="95" class="tick-label">2a</text>

    <!-- Angle arc 120 -->
    <path d="M 140 80 A 30 30 0 0 0 180 80" class="solid"/>
    <text x="160" y="95" class="tick-label">120°</text>
  </svg>`,

  // Q72: Concentric shells A and B
  electro_q72: `${SVG_HEADER(300, 180)}
    <circle cx="150" cy="90" r="30" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="150" cy="90" r="60" fill="none" stroke="#0f172a" stroke-width="2.5"/>

    <circle cx="150" cy="90" r="4" fill="#0f172a"/>
    <text x="150" y="105" class="tick-label">q</text>

    <text x="185" y="90" class="label">A</text>
    <text x="215" y="90" class="label">B</text>
  </svg>`,

  // Q73: Distance between q and 100q
  electro_q73: `${SVG_HEADER(360, 140)}
    <circle cx="60" cy="70" r="6" fill="#0f172a"/><text x="60" y="50" class="label">q</text>
    <circle cx="300" cy="70" r="8" fill="#0f172a"/><text x="300" y="50" class="label">100q</text>

    <line x1="60" y1="70" x2="300" y2="70" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="60" y1="95" x2="300" y2="95" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="180" y="115" class="tick-label">44 cm</text>
  </svg>`,

  // Q74: Cut spherical shell with point charge at circular flat face
  electro_q74: `${SVG_HEADER(320, 200)}
    <!-- Main major spherical arc -->
    <path d="M 110 70 A 70 70 0 1 0 210 70" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Cut circular plane -->
    <ellipse cx="160" cy="70" rx="50" ry="12" fill="none" stroke="#0f172a" stroke-width="2" stroke-dasharray="4,4"/>

    <circle cx="160" cy="70" r="4" fill="#dc2626"/>
    <text x="160" y="52" class="label" style="fill:#dc2626;">+q</text>
  </svg>`,

  // Q75: Circular arc of 60 degrees
  electro_q75: `${SVG_HEADER(320, 200)}
    <circle cx="80" cy="100" r="3.5" fill="#0f172a"/>
    <text x="65" y="100" class="label">O</text>

    <line x1="80" y1="100" x2="220" y2="45" class="solid"/>
    <line x1="80" y1="100" x2="220" y2="155" class="solid"/>

    <!-- Arc AB -->
    <path d="M 220 45 A 160 160 0 0 1 220 155" stroke="#dc2626" stroke-width="4" fill="none"/>
    <text x="235" y="45" class="label">A</text>
    <text x="235" y="155" class="label">B</text>
    <text x="245" y="100" class="tick-label" style="fill:#dc2626; font-weight:bold;">Q</text>

    <text x="140" y="65" class="tick-label">R</text>
    <path d="M 120 85 A 40 40 0 0 1 120 115" class="solid"/>
    <text x="135" y="100" class="tick-label">60°</text>
  </svg>`,

  // Q76: Block on spring in E field
  electro_q76: `${SVG_HEADER(360, 180)}
    <!-- Wall & ground -->
    <line x1="60" y1="50" x2="60" y2="140" stroke="#0f172a" stroke-width="4"/>
    <line x1="50" y1="140" x2="310" y2="140" stroke="#0f172a" stroke-width="2.5"/>

    <!-- Spring -->
    <path d="M 60 115 L 75 105 L 90 125 L 105 105 L 120 125 L 135 105 L 150 125 L 165 105 L 180 115" fill="none" stroke="#0f172a" stroke-width="2"/>
    <text x="120" y="95" class="tick-label">k</text>

    <!-- Block -->
    <rect x="180" y="90" width="50" height="50" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>
    <text x="205" y="115" class="label">m, q</text>

    <!-- Electric field arrow -->
    <line x1="250" y1="115" x2="310" y2="115" class="axis" marker-end="url(#axis-arrow)" style="stroke:#2563eb; stroke-width:3;"/>
    <text x="325" y="115" class="label" style="fill:#2563eb;">E</text>
  </svg>`
};

async function generateAll() {
  console.log(`Generating ${Object.keys(diagrams).length} Electric Charges and Fields diagrams...`);
  for (const [name, svgContent] of Object.entries(diagrams)) {
    const pngBuffer = await sharp(Buffer.from(svgContent)).png().toBuffer();
    fs.writeFileSync(path.join(outDirBackend, `${name}.png`), pngBuffer);
    fs.writeFileSync(path.join(outDirFrontend, `${name}.png`), pngBuffer);
    console.log(`✓ Generated ${name}.png`);
  }
  console.log('All diagrams generated successfully!');
}

generateAll().catch(err => {
  console.error('Error generating diagrams:', err);
  process.exit(1);
});
