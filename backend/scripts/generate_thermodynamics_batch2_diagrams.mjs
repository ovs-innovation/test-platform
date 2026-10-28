import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDirBackend = path.resolve(__dirname, '../uploads/thermodynamics');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/thermodynamics');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

const SVG_HEADER = (w = 400, h = 300) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2.5; stroke-linecap: round; }
    .label { font-size: 16px; font-weight: 700; fill: #0f172a; text-anchor: middle; dominant-baseline: middle; }
    .tick-label { font-size: 14px; font-weight: 600; fill: #1e293b; text-anchor: middle; dominant-baseline: middle; }
    .dashed { stroke: #64748b; stroke-width: 1.5; stroke-dasharray: 4,4; }
    .solid { stroke: #0f172a; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; fill: none; }
    .cycle { stroke: #2563eb; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; fill: none; }
    .grid { stroke: #cbd5e1; stroke-width: 1; stroke-dasharray: 2,2; }
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0f172a"/>
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb"/>
    </marker>
    <marker id="axis-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#0f172a"/>
    </marker>
  </defs>
`;

const diagrams = {
  // Q78: P-T cyclic process A->B->C->D->A
  thermo_q78: `${SVG_HEADER(420, 320)}
    <!-- Axes -->
    <line x1="60" y1="270" x2="380" y2="270" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="270" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="395" y="270" class="label">T</text>
    <text x="60" y="18" class="label">P</text>
    <text x="45" y="285" class="tick-label">O</text>

    <!-- Ray 1 through origin and A, B -->
    <line x1="60" y1="270" x2="290" y2="70" class="solid" stroke-width="1.8" />
    <!-- Ray 2 through origin and D, C -->
    <line x1="60" y1="270" x2="290" y2="155" class="solid" stroke-width="1.8" />

    <!-- Points: A(160, 183), B(270, 87), C(270, 172), D(160, 222) -->
    <!-- Dashed projections -->
    <line x1="60" y1="183" x2="160" y2="183" class="dashed" />
    <line x1="60" y1="87" x2="270" y2="87" class="dashed" />
    <line x1="160" y1="270" x2="160" y2="183" class="dashed" />
    <line x1="270" y1="270" x2="270" y2="87" class="dashed" />

    <text x="40" y="183" class="tick-label">P₁</text>
    <text x="40" y="87" class="tick-label">P₂</text>
    <text x="160" y="290" class="tick-label">T₁</text>
    <text x="270" y="290" class="tick-label">T₂</text>

    <!-- Cycle A->B->C->D->A with arrows -->
    <line x1="160" y1="183" x2="220" y2="131" class="solid" marker-end="url(#arrow)" />
    <line x1="220" y1="131" x2="270" y2="87" class="solid" />

    <line x1="270" y1="87" x2="270" y2="135" class="solid" marker-end="url(#arrow)" />
    <line x1="270" y1="135" x2="270" y2="172" class="solid" />

    <line x1="270" y1="172" x2="210" y2="199" class="solid" marker-end="url(#arrow)" />
    <line x1="210" y1="199" x2="160" y2="222" class="solid" />

    <line x1="160" y1="222" x2="160" y2="200" class="solid" marker-end="url(#arrow)" />
    <line x1="160" y1="200" x2="160" y2="183" class="solid" />

    <!-- Labels A, B, C, D -->
    <text x="145" y="175" class="label">A</text>
    <text x="288" y="80" class="label">B</text>
    <text x="288" y="172" class="label">C</text>
    <text x="175" y="228" class="label">D</text>
  </svg>`,

  // Q79: V-T line from A to B
  thermo_q79: `${SVG_HEADER(360, 280)}
    <line x1="60" y1="240" x2="330" y2="240" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="240" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="340" y="240" class="label">T</text>
    <text x="60" y="20" class="label">V</text>

    <!-- Ray through origin and line from A to B -->
    <line x1="60" y1="240" x2="130" y2="170" class="dashed" />
    <line x1="130" y1="170" x2="200" y2="100" class="solid" marker-end="url(#arrow)" />
    <line x1="200" y1="100" x2="260" y2="40" class="solid" />

    <circle cx="130" cy="170" r="4" fill="#0f172a" />
    <circle cx="260" cy="40" r="4" fill="#0f172a" />
    <text x="148" y="180" class="label">A</text>
    <text x="275" y="45" class="label">B</text>
  </svg>`,

  // Q82: V vs P triangle P->Q->R->P
  thermo_q82: `${SVG_HEADER(380, 300)}
    <line x1="70" y1="240" x2="340" y2="240" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="70" y1="240" x2="70" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="300" y="265" class="tick-label">(N/m²)</text>
    <text x="70" y="18" class="label">V</text>

    <line x1="70" y1="200" x2="160" y2="200" class="dashed" />
    <line x1="70" y1="140" x2="160" y2="140" class="dashed" />
    <line x1="70" y1="80" x2="160" y2="80" class="dashed" />
    <line x1="160" y1="240" x2="160" y2="200" class="dashed" />

    <text x="40" y="200" class="tick-label">1 m³</text>
    <text x="40" y="140" class="tick-label">2 m³</text>
    <text x="40" y="80" class="tick-label">3 m³</text>
    <text x="160" y="260" class="tick-label">15</text>

    <!-- Triangle P(160, 200), Q(160, 80), R(280, 80) -->
    <line x1="160" y1="200" x2="160" y2="135" class="solid" marker-end="url(#arrow)" />
    <line x1="160" y1="135" x2="160" y2="80" class="solid" />

    <line x1="160" y1="80" x2="225" y2="80" class="solid" marker-end="url(#arrow)" />
    <line x1="225" y1="80" x2="280" y2="80" class="solid" />

    <line x1="280" y1="80" x2="215" y2="145" class="solid" marker-end="url(#arrow)" />
    <line x1="215" y1="145" x2="160" y2="200" class="solid" />

    <circle cx="160" cy="200" r="3" fill="#0f172a" />
    <circle cx="160" cy="80" r="3" fill="#0f172a" />
    <circle cx="280" cy="80" r="3" fill="#0f172a" />

    <text x="145" y="215" class="label">P</text>
    <text x="160" y="65" class="label">Q</text>
    <text x="300" y="80" class="label">R</text>
  </svg>`,

  // Q83: P-V isobaric line A->B from V1 to V2
  thermo_q83: `${SVG_HEADER(360, 240)}
    <line x1="60" y1="200" x2="320" y2="200" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="200" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="330" y="200" class="label">V</text>
    <text x="60" y="18" class="label">P</text>

    <!-- Point A(120, 80) to B(240, 80) at P0 -->
    <line x1="60" y1="80" x2="120" y2="80" class="dashed" />
    <line x1="120" y1="200" x2="120" y2="80" class="dashed" />
    <line x1="240" y1="200" x2="240" y2="80" class="dashed" />

    <line x1="120" y1="80" x2="185" y2="80" class="solid" marker-end="url(#arrow)" />
    <line x1="185" y1="80" x2="240" y2="80" class="solid" />

    <text x="42" y="80" class="tick-label">P₀</text>
    <text x="120" y="220" class="tick-label">V₁</text>
    <text x="240" y="220" class="tick-label">V₂</text>
    <text x="110" y="65" class="label">A</text>
    <text x="250" y="65" class="label">B</text>
  </svg>`,

  // Q84: P-V rectangle cycle ABCD
  thermo_q84: `${SVG_HEADER(340, 260)}
    <line x1="60" y1="220" x2="300" y2="220" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="220" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="310" y="220" class="label">V</text>
    <text x="60" y="18" class="label">P</text>

    <!-- Rectangle: A(100, 160), B(100, 70), C(220, 70), D(220, 160) -->
    <line x1="100" y1="160" x2="100" y2="110" class="solid" marker-end="url(#arrow)" />
    <line x1="100" y1="110" x2="100" y2="70" class="solid" />

    <line x1="100" y1="70" x2="165" y2="70" class="solid" marker-end="url(#arrow)" />
    <line x1="165" y1="70" x2="220" y2="70" class="solid" />

    <line x1="220" y1="70" x2="220" y2="120" class="solid" marker-end="url(#arrow)" />
    <line x1="220" y1="120" x2="220" y2="160" class="solid" />

    <line x1="220" y1="160" x2="155" y2="160" class="solid" marker-end="url(#arrow)" />
    <line x1="155" y1="160" x2="100" y2="160" class="solid" />

    <text x="85" y="170" class="label">A</text>
    <text x="85" y="65" class="label">B</text>
    <text x="235" y="65" class="label">C</text>
    <text x="235" y="170" class="label">D</text>
  </svg>`,

  // Q84 Options: V-T cycles
  thermo_q84_opt1: `${SVG_HEADER(280, 220)}
    <line x1="50" y1="180" x2="250" y2="180" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="50" y1="180" x2="50" y2="25" class="axis" marker-end="url(#axis-arrow)" />
    <text x="260" y="180" class="label">T</text>
    <text x="45" y="15" class="label">V</text>
    <!-- rays from origin -->
    <line x1="50" y1="180" x2="100" y2="60" class="dashed" />
    <line x1="50" y1="180" x2="210" y2="60" class="dashed" />
    <!-- Trapezoid B(100,60), C(210,60), D(130,150), A(80,150) -->
    <line x1="80" y1="150" x2="100" y2="60" class="solid" />
    <line x1="100" y1="60" x2="210" y2="60" class="solid" />
    <line x1="210" y1="60" x2="130" y2="150" class="solid" />
    <line x1="130" y1="150" x2="80" y2="150" class="solid" />
    <text x="90" y="50" class="label">B</text>
    <text x="225" y="60" class="label">C</text>
    <text x="145" y="155" class="label">D</text>
    <text x="70" y="155" class="label">A</text>
  </svg>`,

  thermo_q84_opt2: `${SVG_HEADER(280, 220)}
    <line x1="50" y1="180" x2="250" y2="180" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="50" y1="180" x2="50" y2="25" class="axis" marker-end="url(#axis-arrow)" />
    <text x="260" y="180" class="label">T</text>
    <text x="45" y="15" class="label">V</text>
    <line x1="50" y1="180" x2="90" y2="60" class="dashed" />
    <line x1="50" y1="180" x2="200" y2="60" class="dashed" />
    <!-- A(90,60), B(200,60), C(140,150), D(80,150) -->
    <line x1="80" y1="150" x2="90" y2="60" class="solid" />
    <line x1="90" y1="60" x2="200" y2="60" class="solid" />
    <line x1="200" y1="60" x2="140" y2="150" class="solid" />
    <line x1="140" y1="150" x2="80" y2="150" class="solid" />
    <text x="80" y="50" class="label">A</text>
    <text x="215" y="60" class="label">B</text>
    <text x="155" y="155" class="label">C</text>
    <text x="70" y="155" class="label">D</text>
  </svg>`,

  thermo_q84_opt3: `${SVG_HEADER(280, 220)}
    <line x1="50" y1="180" x2="250" y2="180" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="50" y1="180" x2="50" y2="25" class="axis" marker-end="url(#axis-arrow)" />
    <text x="260" y="180" class="label">T</text>
    <text x="45" y="15" class="label">V</text>
    <line x1="50" y1="180" x2="105" y2="60" class="dashed" />
    <line x1="50" y1="180" x2="215" y2="60" class="dashed" />
    <!-- D(105,60), C(215,60), B(130,150), A(80,150) -->
    <line x1="80" y1="150" x2="105" y2="60" class="solid" />
    <line x1="105" y1="60" x2="215" y2="60" class="solid" />
    <line x1="215" y1="60" x2="130" y2="150" class="solid" />
    <line x1="130" y1="150" x2="80" y2="150" class="solid" />
    <text x="95" y="50" class="label">D</text>
    <text x="230" y="60" class="label">C</text>
    <text x="145" y="155" class="label">B</text>
    <text x="70" y="155" class="label">A</text>
  </svg>`,

  thermo_q84_opt4: `${SVG_HEADER(280, 220)}
    <line x1="50" y1="180" x2="250" y2="180" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="50" y1="180" x2="50" y2="25" class="axis" marker-end="url(#axis-arrow)" />
    <text x="260" y="180" class="label">T</text>
    <text x="45" y="15" class="label">V</text>
    <line x1="50" y1="180" x2="110" y2="60" class="dashed" />
    <line x1="50" y1="180" x2="220" y2="60" class="dashed" />
    <!-- C(110,60), B(220,60), A(140,150), D(80,150) -->
    <line x1="80" y1="150" x2="110" y2="60" class="solid" />
    <line x1="110" y1="60" x2="220" y2="60" class="solid" />
    <line x1="220" y1="60" x2="140" y2="150" class="solid" />
    <line x1="140" y1="150" x2="80" y2="150" class="solid" />
    <text x="100" y="50" class="label">C</text>
    <text x="235" y="60" class="label">B</text>
    <text x="155" y="155" class="label">A</text>
    <text x="70" y="155" class="label">D</text>
  </svg>`,

  // Q85: P-V with AB and BC
  thermo_q85: `${SVG_HEADER(320, 260)}
    <line x1="60" y1="210" x2="280" y2="210" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="210" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="290" y="210" class="label">V</text>
    <text x="60" y="18" class="label">P</text>
    <text x="45" y="225" class="tick-label">O</text>

    <!-- AB vertical down from (110, 60) to (110, 160) -->
    <line x1="110" y1="60" x2="110" y2="115" class="solid" marker-end="url(#arrow)" />
    <line x1="110" y1="115" x2="110" y2="160" class="solid" />

    <!-- BC horizontal right from (110, 160) to (210, 160) -->
    <line x1="110" y1="160" x2="165" y2="160" class="solid" marker-end="url(#arrow)" />
    <line x1="165" y1="160" x2="210" y2="160" class="solid" />

    <circle cx="110" cy="60" r="3" fill="#0f172a" />
    <circle cx="110" cy="160" r="3" fill="#0f172a" />
    <circle cx="210" cy="160" r="3" fill="#0f172a" />

    <text x="95" y="60" class="label">A</text>
    <text x="95" y="175" class="label">B</text>
    <text x="225" y="175" class="label">C</text>
  </svg>`,

  // Q89: V vs P line A(P0, V0) to B(3P0, 4V0)
  thermo_q89: `${SVG_HEADER(360, 280)}
    <line x1="70" y1="220" x2="320" y2="220" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="70" y1="220" x2="70" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="330" y="220" class="label">P</text>
    <text x="70" y="18" class="label">V</text>

    <!-- Point A(130, 170) at (P0, V0), Point B(250, 70) at (3P0, 4V0) -->
    <line x1="70" y1="170" x2="130" y2="170" class="dashed" />
    <line x1="130" y1="220" x2="130" y2="170" class="dashed" />

    <line x1="70" y1="70" x2="250" y2="70" class="dashed" />
    <line x1="250" y1="220" x2="250" y2="70" class="dashed" />

    <line x1="130" y1="170" x2="195" y2="115" class="solid" marker-end="url(#arrow)" />
    <line x1="195" y1="115" x2="250" y2="70" class="solid" />

    <text x="45" y="170" class="tick-label">V₀</text>
    <text x="45" y="70" class="tick-label">4V₀</text>
    <text x="130" y="240" class="tick-label">P₀</text>
    <text x="250" y="240" class="tick-label">3P₀</text>

    <text x="115" y="160" class="label">A</text>
    <text x="265" y="65" class="label">B</text>
  </svg>`,

  // Q91: P-V right triangle cycle
  thermo_q91: `${SVG_HEADER(360, 280)}
    <line x1="70" y1="230" x2="320" y2="230" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="70" y1="230" x2="70" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="330" y="230" class="label">V</text>
    <text x="70" y="18" class="label">P</text>

    <!-- Triangle: (120, 190) -> (120, 80) -> (240, 190) -> (120, 190) -->
    <line x1="120" y1="190" x2="120" y2="130" class="solid" marker-end="url(#arrow)" />
    <line x1="120" y1="130" x2="120" y2="80" class="solid" />

    <line x1="120" y1="80" x2="185" y2="140" class="solid" marker-end="url(#arrow)" />
    <line x1="185" y1="140" x2="240" y2="190" class="solid" />

    <line x1="240" y1="190" x2="175" y2="190" class="solid" marker-end="url(#arrow)" />
    <line x1="175" y1="190" x2="120" y2="190" class="solid" />

    <text x="120" y="60" class="tick-label">2P₀, V₀</text>
    <text x="115" y="210" class="tick-label">P₀, V₀</text>
    <text x="265" y="210" class="tick-label">P₀, 3V₀</text>
  </svg>`,

  // Q92: P-T cycle ABC
  thermo_q92: `${SVG_HEADER(360, 280)}
    <line x1="70" y1="230" x2="320" y2="230" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="70" y1="230" x2="70" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="330" y="230" class="label">T</text>
    <text x="70" y="18" class="label">P</text>

    <!-- Ray from origin through A(160, 160) and B(250, 70) -->
    <line x1="70" y1="230" x2="160" y2="160" class="dashed" />
    <line x1="160" y1="160" x2="210" y2="110" class="solid" marker-end="url(#arrow)" />
    <line x1="210" y1="110" x2="250" y2="70" class="solid" />

    <line x1="250" y1="70" x2="250" y2="120" class="solid" marker-end="url(#arrow)" />
    <line x1="250" y1="120" x2="250" y2="160" class="solid" />

    <line x1="250" y1="160" x2="200" y2="160" class="solid" marker-end="url(#arrow)" />
    <line x1="200" y1="160" x2="160" y2="160" class="solid" />

    <line x1="70" y1="160" x2="160" y2="160" class="dashed" />
    <line x1="70" y1="70" x2="250" y2="70" class="dashed" />
    <line x1="160" y1="230" x2="160" y2="160" class="dashed" />
    <line x1="250" y1="230" x2="250" y2="160" class="dashed" />

    <text x="45" y="160" class="tick-label">P₀</text>
    <text x="45" y="70" class="tick-label">2P₀</text>
    <text x="160" y="250" class="tick-label">T₀</text>
    <text x="250" y="250" class="tick-label">2T₀</text>

    <text x="145" y="150" class="label">A</text>
    <text x="265" y="65" class="label">B</text>
    <text x="265" y="165" class="label">C</text>
  </svg>`,

  // Q95: P-V curves A(Isobaric), B(Isothermal), C(Adiabatic)
  thermo_q95: `${SVG_HEADER(380, 260)}
    <line x1="60" y1="210" x2="340" y2="210" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="210" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="350" y="210" class="label">V</text>
    <text x="60" y="18" class="label">P</text>

    <!-- Initial point (90, 80) -->
    <!-- Curve A: Isobaric horizontal -->
    <line x1="90" y1="80" x2="160" y2="80" class="solid" marker-end="url(#arrow)" />
    <line x1="160" y1="80" x2="210" y2="80" class="solid" />
    <text x="180" y="65" class="label">A</text>
    <text x="260" y="80" class="tick-label">Isobaric</text>

    <!-- Curve B: Isothermal -->
    <path d="M 90 80 Q 140 120 210 135" class="solid" />
    <polygon points="155,115 165,120 157,125" fill="#0f172a" />
    <text x="185" y="125" class="label">B</text>
    <text x="265" y="135" class="tick-label">Isothermal</text>

    <!-- Curve C: Adiabatic (steeper) -->
    <path d="M 90 80 Q 125 145 210 175" class="solid" />
    <polygon points="140,147 150,154 141,159" fill="#0f172a" />
    <text x="175" y="165" class="label">C</text>
    <text x="260" y="175" class="tick-label">Adiabatic</text>
  </svg>`,

  // Q96: Insulated cylinder with piston and spring
  thermo_q96: `${SVG_HEADER(380, 220)}
    <!-- Cylinder walls (thick hatched/insulated) -->
    <rect x="70" y="50" width="160" height="100" fill="#f8fafc" stroke="#0f172a" stroke-width="3" />
    <!-- Heating coil inside -->
    <path d="M 100 80 Q 110 70 120 80 Q 130 90 120 100 Q 110 110 120 120" stroke="#ef4444" stroke-width="2.5" fill="none" />
    <line x1="70" y1="85" x2="105" y2="85" stroke="#0f172a" stroke-width="2" />
    <line x1="70" y1="115" x2="115" y2="115" stroke="#0f172a" stroke-width="2" />
    <circle cx="95" cy="70" r="1.5" fill="#64748b" />
    <circle cx="140" cy="70" r="1.5" fill="#64748b" />
    <circle cx="110" cy="130" r="1.5" fill="#64748b" />
    <circle cx="130" cy="130" r="1.5" fill="#64748b" />

    <!-- Piston at x=200 -->
    <rect x="195" y="52" width="15" height="96" fill="#64748b" stroke="#0f172a" stroke-width="2" />

    <!-- Spring connected to piston and wall -->
    <path d="M 210 100 L 220 90 L 230 110 L 240 90 L 250 110 L 260 90 L 270 110 L 280 100" stroke="#0f172a" stroke-width="2.5" fill="none" />
    <!-- Fixed support wall -->
    <line x1="280" y1="75" x2="280" y2="125" stroke="#0f172a" stroke-width="4" stroke-linecap="round" />
    <line x1="280" y1="80" x2="290" y2="70" stroke="#0f172a" stroke-width="1.5" />
    <line x1="280" y1="95" x2="290" y2="85" stroke="#0f172a" stroke-width="1.5" />
    <line x1="280" y1="110" x2="290" y2="100" stroke="#0f172a" stroke-width="1.5" />
    <line x1="280" y1="125" x2="290" y2="115" stroke="#0f172a" stroke-width="1.5" />
  </svg>`,

  // Q97: V-T cycle and 4 P-V options
  thermo_q97: `${SVG_HEADER(320, 260)}
    <line x1="60" y1="210" x2="280" y2="210" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="210" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="290" y="210" class="label">T</text>
    <text x="60" y="18" class="label">V</text>

    <!-- Ray from origin through c(120, 160) and b(220, 80) -->
    <line x1="60" y1="210" x2="120" y2="160" class="dashed" />
    <!-- Triangle: a(120, 80), b(220, 80), c(120, 160) -->
    <line x1="120" y1="80" x2="175" y2="80" class="solid" marker-end="url(#arrow)" />
    <line x1="175" y1="80" x2="220" y2="80" class="solid" />

    <line x1="220" y1="80" x2="165" y2="125" class="solid" marker-end="url(#arrow)" />
    <line x1="165" y1="125" x2="120" y2="160" class="solid" />

    <line x1="120" y1="160" x2="120" y2="115" class="solid" marker-end="url(#arrow)" />
    <line x1="120" y1="115" x2="120" y2="80" class="solid" />

    <text x="105" y="75" class="label">a</text>
    <text x="235" y="75" class="label">b</text>
    <text x="105" y="165" class="label">c</text>
  </svg>`,

  thermo_q97_opt1: `${SVG_HEADER(260, 200)}
    <line x1="50" y1="160" x2="230" y2="160" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="50" y1="160" x2="50" y2="20" class="axis" marker-end="url(#axis-arrow)" />
    <text x="240" y="160" class="label">V</text>
    <text x="45" y="15" class="label">P</text>
    <!-- c(80, 50), b(160, 50), a(160, 130) -->
    <line x1="160" y1="50" x2="115" y2="50" class="solid" marker-end="url(#arrow)" />
    <line x1="115" y1="50" x2="80" y2="50" class="solid" />
    <path d="M 80 50 Q 100 120 160 130" class="solid" />
    <line x1="160" y1="130" x2="160" y2="85" class="solid" marker-end="url(#arrow)" />
    <line x1="160" y1="85" x2="160" y2="50" class="solid" />
    <text x="65" y="50" class="label">c</text>
    <text x="175" y="50" class="label">b</text>
    <text x="175" y="135" class="label">a</text>
  </svg>`,

  thermo_q97_opt2: `${SVG_HEADER(260, 200)}
    <line x1="50" y1="160" x2="230" y2="160" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="50" y1="160" x2="50" y2="20" class="axis" marker-end="url(#axis-arrow)" />
    <text x="240" y="160" class="label">V</text>
    <text x="45" y="15" class="label">P</text>
    <line x1="80" y1="130" x2="80" y2="85" class="solid" marker-end="url(#arrow)" />
    <line x1="80" y1="85" x2="80" y2="50" class="solid" />
    <path d="M 80 50 Q 120 100 160 130" class="solid" />
    <line x1="160" y1="130" x2="115" y2="130" class="solid" marker-end="url(#arrow)" />
    <line x1="115" y1="130" x2="80" y2="130" class="solid" />
    <text x="65" y="50" class="label">b</text>
    <text x="65" y="135" class="label">a</text>
    <text x="175" y="135" class="label">c</text>
  </svg>`,

  thermo_q97_opt3: `${SVG_HEADER(260, 200)}
    <line x1="50" y1="160" x2="230" y2="160" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="50" y1="160" x2="50" y2="20" class="axis" marker-end="url(#axis-arrow)" />
    <text x="240" y="160" class="label">V</text>
    <text x="45" y="15" class="label">P</text>
    <line x1="80" y1="50" x2="125" y2="50" class="solid" marker-end="url(#arrow)" />
    <line x1="125" y1="50" x2="160" y2="50" class="solid" />
    <line x1="160" y1="50" x2="160" y2="95" class="solid" marker-end="url(#arrow)" />
    <line x1="160" y1="95" x2="160" y2="130" class="solid" />
    <path d="M 160 130 Q 100 120 80 50" class="solid" />
    <text x="65" y="50" class="label">c</text>
    <text x="175" y="50" class="label">a</text>
    <text x="175" y="135" class="label">b</text>
  </svg>`,

  thermo_q97_opt4: `${SVG_HEADER(260, 200)}
    <line x1="50" y1="160" x2="230" y2="160" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="50" y1="160" x2="50" y2="20" class="axis" marker-end="url(#axis-arrow)" />
    <text x="240" y="160" class="label">V</text>
    <text x="45" y="15" class="label">P</text>
    <line x1="80" y1="50" x2="80" y2="95" class="solid" marker-end="url(#arrow)" />
    <line x1="80" y1="95" x2="80" y2="130" class="solid" />
    <line x1="80" y1="130" x2="125" y2="130" class="solid" marker-end="url(#arrow)" />
    <line x1="125" y1="130" x2="160" y2="130" class="solid" />
    <path d="M 160 130 Q 120 70 80 50" class="solid" />
    <text x="65" y="50" class="label">a</text>
    <text x="65" y="135" class="label">b</text>
    <text x="175" y="135" class="label">c</text>
  </svg>`,

  // Q101: P-V with two paths 1 and 2 from A to B
  thermo_q101: `${SVG_HEADER(340, 260)}
    <line x1="60" y1="210" x2="300" y2="210" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="210" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="310" y="210" class="label">V</text>
    <text x="60" y="18" class="label">P</text>

    <!-- Path 2: straight horizontal line from A(100, 160) to B(240, 160) -->
    <line x1="100" y1="160" x2="175" y2="160" class="solid" marker-end="url(#arrow)" />
    <line x1="175" y1="160" x2="240" y2="160" class="solid" />
    <text x="170" y="180" class="label">2</text>

    <!-- Path 1: A(100, 160) to Peak(170, 70) to B(240, 160) -->
    <line x1="100" y1="160" x2="138" y2="110" class="solid" marker-end="url(#arrow)" />
    <line x1="138" y1="110" x2="170" y2="70" class="solid" />
    <line x1="170" y1="70" x2="208" y2="120" class="solid" marker-end="url(#arrow)" />
    <line x1="208" y1="120" x2="240" y2="160" class="solid" />
    <text x="130" y="95" class="label">1</text>

    <text x="85" y="165" class="label">A</text>
    <text x="255" y="165" class="label">B</text>
  </svg>`,

  // Q102: P-V path 1 -> 2 -> 3 -> 4
  thermo_q102: `${SVG_HEADER(380, 280)}
    <line x1="70" y1="230" x2="330" y2="230" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="70" y1="230" x2="70" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="340" y="230" class="label">V</text>
    <text x="70" y="18" class="label">P</text>

    <!-- Dashed ticks -->
    <line x1="70" y1="180" x2="130" y2="180" class="dashed" />
    <line x1="70" y1="130" x2="200" y2="130" class="dashed" />
    <line x1="70" y1="80" x2="130" y2="80" class="dashed" />
    <line x1="130" y1="230" x2="130" y2="80" class="dashed" />
    <line x1="200" y1="230" x2="200" y2="130" class="dashed" />
    <line x1="270" y1="230" x2="270" y2="80" class="dashed" />

    <text x="45" y="180" class="tick-label">P₀</text>
    <text x="45" y="130" class="tick-label">2P₀</text>
    <text x="45" y="80" class="tick-label">3P₀</text>
    <text x="130" y="250" class="tick-label">V₀</text>
    <text x="200" y="250" class="tick-label">2V₀</text>
    <text x="270" y="250" class="tick-label">3V₀</text>

    <!-- 1(200, 130) -> 2(130, 180) -->
    <line x1="200" y1="130" x2="160" y2="158" class="solid" marker-end="url(#arrow)" />
    <line x1="160" y1="158" x2="130" y2="180" class="solid" />

    <!-- 2(130, 180) -> 3(130, 80) -->
    <line x1="130" y1="180" x2="130" y2="125" class="solid" marker-end="url(#arrow)" />
    <line x1="130" y1="125" x2="130" y2="80" class="solid" />

    <!-- 3(130, 80) -> 4(270, 80) -->
    <line x1="130" y1="80" x2="205" y2="80" class="solid" marker-end="url(#arrow)" />
    <line x1="205" y1="80" x2="270" y2="80" class="solid" />

    <text x="215" y="130" class="label">1</text>
    <text x="145" y="190" class="label">2</text>
    <text x="115" y="80" class="label">3</text>
    <text x="285" y="80" class="label">4</text>
  </svg>`,

  // Q107: P-V cycle ABCA
  thermo_q107: `${SVG_HEADER(360, 260)}
    <line x1="60" y1="210" x2="310" y2="210" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="210" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="320" y="210" class="label">V</text>
    <text x="60" y="18" class="label">P</text>

    <!-- Cycle A(95, 75) -> B(170, 95) -> C(240, 150) -> A(95, 75) -->
    <line x1="95" y1="210" x2="95" y2="75" class="dashed" />
    <line x1="240" y1="210" x2="240" y2="150" class="dashed" />

    <!-- A->B isothermal -->
    <path d="M 95 75 Q 130 83 170 95" class="solid" />
    <polygon points="135,84 144,88 137,93" fill="#0f172a" />

    <!-- B->C adiabatic -->
    <path d="M 170 95 Q 205 118 240 150" class="solid" />
    <polygon points="205,123 214,130 206,134" fill="#0f172a" />

    <!-- C->A return curve -->
    <path d="M 240 150 Q 155 135 95 75" class="solid" />
    <polygon points="165,130 154,126 160,120" fill="#0f172a" />

    <text x="95" y="60" class="label">A</text>
    <text x="180" y="85" class="label">B</text>
    <text x="255" y="150" class="label">C</text>
  </svg>`,

  // Q108: V-T with P1 and P2
  thermo_q108: `${SVG_HEADER(340, 260)}
    <line x1="60" y1="210" x2="300" y2="210" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="210" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="310" y="210" class="label">T</text>
    <text x="60" y="18" class="label">V</text>

    <!-- Point at T1(110, 140), line rises to T2(210, 80) -->
    <line x1="110" y1="210" x2="110" y2="140" class="dashed" />
    <line x1="210" y1="210" x2="210" y2="80" class="dashed" />
    <line x1="110" y1="140" x2="210" y2="140" class="solid" />

    <line x1="110" y1="140" x2="210" y2="80" class="solid" stroke-width="2.5" />

    <text x="110" y="230" class="tick-label">T₁</text>
    <text x="210" y="230" class="tick-label">T₂</text>

    <text x="95" y="130" class="label">P₁</text>
    <text x="200" y="65" class="label">P₂</text>
  </svg>`,

  // Q111: Two isotherms T1 and T2 with Oab
  thermo_q111: `${SVG_HEADER(360, 280)}
    <line x1="60" y1="230" x2="320" y2="230" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="230" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="330" y="230" class="label">V</text>
    <text x="60" y="18" class="label">P</text>
    <text x="45" y="245" class="tick-label">O</text>

    <!-- Isotherm T1 -->
    <path d="M 85 190 Q 120 170 230 190" class="solid" />
    <!-- Isotherm T2 -->
    <path d="M 120 120 Q 180 100 290 140" class="solid" />

    <!-- 45 deg line from origin intersecting T1 at a(130, 160) and T2 at b(200, 90) -->
    <line x1="60" y1="230" x2="240" y2="50" class="dashed" stroke-width="2" />

    <circle cx="130" cy="160" r="4" fill="#0f172a" />
    <circle cx="200" cy="90" r="4" fill="#0f172a" />

    <text x="115" y="150" class="label">a</text>
    <text x="190" y="75" class="label">b</text>
    <text x="245" y="195" class="label">T₁</text>
    <text x="305" y="145" class="label">T₂</text>
    <text x="85" y="220" class="tick-label">45°</text>
  </svg>`,

  // Q113: P(kPa) vs V(litre) grid
  thermo_q113: `${SVG_HEADER(360, 280)}
    <line x1="70" y1="220" x2="320" y2="220" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="70" y1="220" x2="70" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="310" y="245" class="tick-label">V (litre)</text>
    <text x="110" y="25" class="tick-label">P (kPa)</text>

    <!-- Grid lines -->
    <line x1="70" y1="170" x2="270" y2="170" class="grid" />
    <line x1="70" y1="120" x2="270" y2="120" class="grid" />
    <line x1="70" y1="70" x2="270" y2="70" class="grid" />
    <line x1="130" y1="220" x2="130" y2="70" class="grid" />
    <line x1="200" y1="220" x2="200" y2="70" class="grid" />
    <line x1="270" y1="220" x2="270" y2="70" class="grid" />

    <text x="50" y="220" class="tick-label">0</text>
    <text x="50" y="170" class="tick-label">10</text>
    <text x="50" y="120" class="tick-label">20</text>
    <text x="50" y="70" class="tick-label">30</text>
    <text x="130" y="240" class="tick-label">1</text>
    <text x="200" y="240" class="tick-label">2</text>
    <text x="270" y="240" class="tick-label">3</text>

    <!-- Line from A(130, 170) to B(270, 70) -->
    <line x1="130" y1="170" x2="205" y2="116" class="solid" marker-end="url(#arrow)" />
    <line x1="205" y1="116" x2="270" y2="70" class="solid" />

    <circle cx="130" cy="170" r="4" fill="#0f172a" />
    <circle cx="270" cy="70" r="4" fill="#0f172a" />

    <text x="115" y="185" class="label">A</text>
    <text x="285" y="60" class="label">B</text>
  </svg>`,

  // Q117: Options 1, 2, 3, 4
  thermo_q117_opt1: `${SVG_HEADER(220, 180)}
    <line x1="40" y1="140" x2="190" y2="140" class="axis" />
    <line x1="40" y1="140" x2="40" y2="25" class="axis" />
    <text x="195" y="140" class="label">V</text>
    <text x="30" y="30" class="label">P</text>
    <line x1="40" y1="40" x2="160" y2="140" class="solid" />
  </svg>`,

  thermo_q117_opt2: `${SVG_HEADER(220, 180)}
    <line x1="40" y1="140" x2="190" y2="140" class="axis" />
    <line x1="40" y1="140" x2="40" y2="25" class="axis" />
    <text x="195" y="140" class="label">V</text>
    <text x="30" y="30" class="label">P</text>
    <path d="M 40 140 Q 60 50 160 50" class="solid" />
  </svg>`,

  thermo_q117_opt3: `${SVG_HEADER(220, 180)}
    <line x1="40" y1="140" x2="190" y2="140" class="axis" />
    <line x1="40" y1="140" x2="40" y2="25" class="axis" />
    <text x="195" y="140" class="label">V</text>
    <text x="30" y="30" class="label">P</text>
    <path d="M 50 40 Q 60 120 160 130" class="solid" />
  </svg>`,

  thermo_q117_opt4: `${SVG_HEADER(220, 180)}
    <line x1="40" y1="140" x2="190" y2="140" class="axis" />
    <line x1="40" y1="140" x2="40" y2="25" class="axis" />
    <text x="195" y="140" class="label">V</text>
    <text x="30" y="30" class="label">P</text>
    <line x1="40" y1="140" x2="160" y2="40" class="solid" />
  </svg>`,

  // Q121: P-V process I and II from A to B
  thermo_q121: `${SVG_HEADER(340, 240)}
    <line x1="60" y1="190" x2="290" y2="190" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="190" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="300" y="190" class="label">V</text>
    <text x="60" y="18" class="label">P</text>

    <!-- Path I (upper) A(100, 130) -> (170, 70) -> B(240, 130) -->
    <line x1="100" y1="130" x2="140" y2="95" class="solid" marker-end="url(#arrow)" />
    <line x1="140" y1="95" x2="170" y2="70" class="solid" />
    <line x1="170" y1="70" x2="210" y2="105" class="solid" marker-end="url(#arrow)" />
    <line x1="210" y1="105" x2="240" y2="130" class="solid" />
    <text x="170" y="55" class="label">I</text>

    <!-- Path II (lower) A(100, 130) -> B(240, 130) curved down -->
    <path d="M 100 130 Q 170 170 240 130" class="solid" />
    <polygon points="175,150 185,150 180,157" fill="#0f172a" />
    <text x="170" y="175" class="label">II</text>

    <text x="85" y="135" class="label">A</text>
    <text x="255" y="135" class="label">B</text>
  </svg>`,

  // Q124: P-T isobaric processes A and B
  thermo_q124: `${SVG_HEADER(340, 260)}
    <line x1="60" y1="210" x2="300" y2="210" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="210" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="310" y="210" class="label">T</text>
    <text x="60" y="18" class="label">P</text>

    <!-- Two rays from origin -->
    <line x1="60" y1="210" x2="160" y2="50" class="dashed" stroke-width="1.8" />
    <line x1="60" y1="210" x2="270" y2="50" class="dashed" stroke-width="1.8" />

    <!-- Process A: upper horizontal line at y=90 from x=135 to x=220 -->
    <line x1="135" y1="90" x2="185" y2="90" class="solid" marker-end="url(#arrow)" />
    <line x1="185" y1="90" x2="220" y2="90" class="solid" />
    <text x="180" y="75" class="label">A</text>

    <!-- Process B: lower horizontal line at y=140 from x=105 to x=155 -->
    <line x1="105" y1="140" x2="135" y2="140" class="solid" marker-end="url(#arrow)" />
    <line x1="135" y1="140" x2="155" y2="140" class="solid" />
    <text x="130" y="125" class="label">B</text>
  </svg>`,

  // Q125: Options for Cv vs T
  thermo_q125_opt1: `${SVG_HEADER(220, 180)}
    <line x1="40" y1="140" x2="190" y2="140" class="axis" />
    <line x1="40" y1="140" x2="40" y2="25" class="axis" />
    <text x="195" y="140" class="label">T</text>
    <text x="30" y="25" class="label">Cv</text>
    <text x="30" y="150" class="tick-label">O</text>
    <path d="M 40 140 Q 60 70 160 60" class="solid" />
  </svg>`,

  thermo_q125_opt2: `${SVG_HEADER(220, 180)}
    <line x1="40" y1="140" x2="190" y2="140" class="axis" />
    <line x1="40" y1="140" x2="40" y2="25" class="axis" />
    <text x="195" y="140" class="label">T</text>
    <text x="30" y="25" class="label">Cv</text>
    <text x="30" y="150" class="tick-label">O</text>
    <line x1="40" y1="140" x2="160" y2="60" class="solid" />
  </svg>`,

  thermo_q125_opt3: `${SVG_HEADER(220, 180)}
    <line x1="40" y1="140" x2="190" y2="140" class="axis" />
    <line x1="40" y1="140" x2="40" y2="25" class="axis" />
    <text x="195" y="140" class="label">T</text>
    <text x="30" y="25" class="label">Cv</text>
    <text x="30" y="150" class="tick-label">O</text>
    <line x1="40" y1="80" x2="160" y2="80" class="solid" />
  </svg>`,

  thermo_q125_opt4: `${SVG_HEADER(220, 180)}
    <line x1="40" y1="140" x2="190" y2="140" class="axis" />
    <line x1="40" y1="140" x2="40" y2="25" class="axis" />
    <text x="195" y="140" class="label">T</text>
    <text x="30" y="25" class="label">Cv</text>
    <text x="30" y="150" class="tick-label">O</text>
    <path d="M 50 60 Q 60 130 160 135" class="solid" />
  </svg>`,

  // Q126: P-T trapezoid cycle
  thermo_q126: `${SVG_HEADER(380, 280)}
    <line x1="60" y1="230" x2="330" y2="230" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="230" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="340" y="230" class="label">T</text>
    <text x="60" y="18" class="label">P</text>

    <!-- Ray 1 through origin and A(100, 170), B(170, 70) -->
    <line x1="60" y1="230" x2="170" y2="70" class="dashed" stroke-width="1.8" />
    <!-- Ray 2 through origin and D(150, 170), C(270, 70) -->
    <line x1="60" y1="230" x2="270" y2="70" class="dashed" stroke-width="1.8" />

    <!-- Dashed ticks -->
    <line x1="60" y1="170" x2="100" y2="170" class="dashed" />
    <line x1="60" y1="70" x2="170" y2="70" class="dashed" />
    <line x1="150" y1="230" x2="150" y2="170" class="dashed" />

    <text x="45" y="170" class="tick-label">P₁</text>
    <text x="45" y="70" class="tick-label">P₂</text>

    <!-- Cycle A->B->C->D->A -->
    <line x1="100" y1="170" x2="140" y2="113" class="solid" marker-end="url(#arrow)" />
    <line x1="140" y1="113" x2="170" y2="70" class="solid" />

    <line x1="170" y1="70" x2="225" y2="70" class="solid" marker-end="url(#arrow)" />
    <line x1="225" y1="70" x2="270" y2="70" class="solid" />

    <line x1="270" y1="70" x2="205" y2="125" class="solid" marker-end="url(#arrow)" />
    <line x1="205" y1="125" x2="150" y2="170" class="solid" />

    <line x1="150" y1="170" x2="120" y2="170" class="solid" marker-end="url(#arrow)" />
    <line x1="120" y1="170" x2="100" y2="170" class="solid" />

    <text x="90" y="155" class="tick-label">A(T_A)</text>
    <text x="170" y="55" class="tick-label">B(T_B)</text>
    <text x="285" y="65" class="tick-label">C(T_C)</text>
    <text x="175" y="175" class="tick-label">D(T_D)</text>
  </svg>`,

  // Q130: P-V straight line A(V0, 2P0) to B(2V0, P0)
  thermo_q130: `${SVG_HEADER(340, 260)}
    <line x1="60" y1="210" x2="290" y2="210" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="210" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="300" y="210" class="label">V</text>
    <text x="60" y="18" class="label">P</text>

    <!-- Dashed ticks -->
    <line x1="60" y1="140" x2="200" y2="140" class="dashed" />
    <line x1="60" y1="70" x2="120" y2="70" class="dashed" />
    <line x1="120" y1="210" x2="120" y2="70" class="dashed" />
    <line x1="200" y1="210" x2="200" y2="140" class="dashed" />

    <text x="45" y="140" class="tick-label">P₀</text>
    <text x="45" y="70" class="tick-label">2P₀</text>
    <text x="120" y="230" class="tick-label">V₀</text>
    <text x="200" y="230" class="tick-label">2V₀</text>

    <!-- A(120, 70) to B(200, 140) -->
    <line x1="120" y1="70" x2="165" y2="109" class="solid" marker-end="url(#arrow)" />
    <line x1="165" y1="109" x2="200" y2="140" class="solid" />

    <circle cx="120" cy="70" r="4" fill="#0f172a" />
    <circle cx="200" cy="140" r="4" fill="#0f172a" />

    <text x="120" y="55" class="label">A</text>
    <text x="215" y="135" class="label">B</text>
  </svg>`,

  // Q143: P-V circle/ellipse between P1, P2 and V1, V2
  thermo_q143: `${SVG_HEADER(360, 260)}
    <line x1="60" y1="210" x2="310" y2="210" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="210" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="320" y="210" class="label">V</text>
    <text x="60" y="18" class="label">P</text>
    <text x="45" y="225" class="tick-label">O</text>

    <!-- Dashed box from V1(130) to V2(230) and P1(160) to P2(70) -->
    <line x1="60" y1="160" x2="230" y2="160" class="dashed" />
    <line x1="60" y1="70" x2="230" y2="70" class="dashed" />
    <line x1="130" y1="210" x2="130" y2="70" class="dashed" />
    <line x1="230" y1="210" x2="230" y2="70" class="dashed" />

    <text x="40" y="160" class="tick-label">P₁</text>
    <text x="40" y="70" class="tick-label">P₂</text>
    <text x="130" y="230" class="tick-label">V₁</text>
    <text x="230" y="230" class="tick-label">V₂</text>

    <!-- Ellipse center(180, 115), rx=50, ry=45 -->
    <ellipse cx="180" cy="115" rx="50" ry="45" class="solid" stroke-width="2.5" />
    <!-- Arrows showing clockwise circulation -->
    <polygon points="175,66 185,70 175,74" fill="#0f172a" />
    <polygon points="226,110 230,120 234,110" fill="#0f172a" />
    <polygon points="185,156 175,160 185,164" fill="#0f172a" />
    <polygon points="126,120 130,110 134,120" fill="#0f172a" />
  </svg>`,

  // Q145: P-V figure 8 loop
  thermo_q145: `${SVG_HEADER(340, 260)}
    <line x1="60" y1="210" x2="290" y2="210" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="210" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="300" y="210" class="label">V</text>
    <text x="60" y="18" class="label">P</text>

    <!-- Loop 1 (top-left, counter-clockwise) and Loop 2 (bottom-right, clockwise) -->
    <path d="M 140 110 C 120 70 80 70 80 95 C 80 120 120 110 140 110 C 160 110 230 90 230 140 C 230 185 160 170 140 110 Z" class="solid" stroke-width="2.5" />

    <!-- Arrows on Loop 1 -->
    <polygon points="105,73 115,75 110,83" fill="#0f172a" />
    <polygon points="90,118 80,115 85,107" fill="#0f172a" />
    <text x="95" y="60" class="label">1</text>

    <!-- Arrows on Loop 2 -->
    <polygon points="182,100 192,107 185,114" fill="#0f172a" />
    <polygon points="175,162 165,157 172,151" fill="#0f172a" />
    <text x="215" y="95" class="label">2</text>
  </svg>`,

  // Q147: P-V four processes a, b, c, d
  thermo_q147: `${SVG_HEADER(340, 260)}
    <line x1="60" y1="210" x2="290" y2="210" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="210" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="300" y="210" class="label">V</text>
    <text x="60" y="18" class="label">P</text>

    <!-- Common point (90, 60) -->
    <!-- a: Isobaric horizontal -->
    <line x1="90" y1="60" x2="160" y2="60" class="solid" marker-end="url(#arrow)" />
    <line x1="160" y1="60" x2="210" y2="60" class="solid" />
    <text x="225" y="60" class="label">a</text>

    <!-- b: Isothermal curve -->
    <path d="M 90 60 Q 130 95 195 110" class="solid" />
    <polygon points="145,91 155,96 148,102" fill="#0f172a" />
    <text x="210" y="110" class="label">b</text>

    <!-- c: Adiabatic curve (steeper) -->
    <path d="M 90 60 Q 115 125 180 160" class="solid" />
    <polygon points="135,130 144,136 136,142" fill="#0f172a" />
    <text x="195" y="165" class="label">c</text>

    <!-- d: Isochoric vertical -->
    <line x1="90" y1="60" x2="90" y2="130" class="solid" marker-end="url(#arrow)" />
    <line x1="90" y1="130" x2="90" y2="175" class="solid" />
    <text x="110" y="170" class="label">d</text>
  </svg>`,

  // Q149: P-V rectangle cycle 100 kPa - 200 kPa and 100 cc - 200 cc
  thermo_q149: `${SVG_HEADER(360, 260)}
    <line x1="70" y1="210" x2="310" y2="210" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="70" y1="210" x2="70" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="320" y="210" class="label">V</text>
    <text x="70" y="18" class="label">P</text>

    <!-- Rectangle (130, 80) to (220, 160) -->
    <line x1="70" y1="160" x2="220" y2="160" class="dashed" />
    <line x1="70" y1="80" x2="220" y2="80" class="dashed" />
    <line x1="130" y1="210" x2="130" y2="80" class="dashed" />
    <line x1="220" y1="210" x2="220" y2="80" class="dashed" />

    <text x="40" y="160" class="tick-label">100 kPa</text>
    <text x="40" y="80" class="tick-label">200 kPa</text>
    <text x="130" y="230" class="tick-label">100 cc</text>
    <text x="220" y="230" class="tick-label">200 cc</text>

    <line x1="130" y1="160" x2="130" y2="115" class="solid" marker-end="url(#arrow)" />
    <line x1="130" y1="115" x2="130" y2="80" class="solid" />

    <line x1="130" y1="80" x2="180" y2="80" class="solid" marker-end="url(#arrow)" />
    <line x1="180" y1="80" x2="220" y2="80" class="solid" />

    <line x1="220" y1="80" x2="220" y2="125" class="solid" marker-end="url(#arrow)" />
    <line x1="220" y1="125" x2="220" y2="160" class="solid" />

    <line x1="220" y1="160" x2="170" y2="160" class="solid" marker-end="url(#arrow)" />
    <line x1="170" y1="160" x2="130" y2="160" class="solid" />
  </svg>`,

  // Q151: P-T with two lines V1 and V2 through origin
  thermo_q151: `${SVG_HEADER(340, 260)}
    <line x1="60" y1="210" x2="290" y2="210" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="210" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="300" y="210" class="label">T</text>
    <text x="60" y="18" class="label">P</text>

    <!-- Line V1 (steeper) -->
    <line x1="60" y1="210" x2="180" y2="60" class="solid" stroke-width="2.5" />
    <text x="195" y="60" class="label">V₁</text>

    <!-- Line V2 (less steep) -->
    <line x1="60" y1="210" x2="240" y2="120" class="solid" stroke-width="2.5" />
    <text x="255" y="120" class="label">V₂</text>
  </svg>`,

  // Q152: P-V cycle ABCA (triangle)
  thermo_q152: `${SVG_HEADER(360, 280)}
    <line x1="60" y1="230" x2="310" y2="230" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="230" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="320" y="230" class="label">V</text>
    <text x="60" y="18" class="label">P</text>

    <!-- Ray from origin to B(130, 160) -->
    <line x1="60" y1="230" x2="130" y2="160" class="dashed" stroke-width="1.8" />

    <!-- Triangle: A(240, 60) -> B(130, 160) -> C(240, 160) -> A(240, 60) -->
    <line x1="240" y1="60" x2="180" y2="114" class="solid" marker-end="url(#arrow)" />
    <line x1="180" y1="114" x2="130" y2="160" class="solid" />

    <line x1="130" y1="160" x2="190" y2="160" class="solid" marker-end="url(#arrow)" />
    <line x1="190" y1="160" x2="240" y2="160" class="solid" />

    <line x1="240" y1="160" x2="240" y2="105" class="solid" marker-end="url(#arrow)" />
    <line x1="240" y1="105" x2="240" y2="60" class="solid" />

    <text x="245" y="45" class="label">A</text>
    <text x="115" y="165" class="label">B</text>
    <text x="255" y="165" class="label">C</text>
  </svg>`
};

async function generateAll() {
  console.log(`Generating ${Object.keys(diagrams).length} diagrams...`);
  for (const [key, svg] of Object.entries(diagrams)) {
    const filename = `${key}.png`;
    const backendPath = path.join(outDirBackend, filename);
    const frontendPath = path.join(outDirFrontend, filename);

    const buffer = await sharp(Buffer.from(svg.trim())).png().toBuffer();
    fs.writeFileSync(backendPath, buffer);
    fs.writeFileSync(frontendPath, buffer);
    console.log(`✓ Generated ${filename}`);
  }
  console.log('All diagrams generated successfully!');
}

generateAll().catch(console.error);
