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

const outDirBackend = path.resolve(__dirname, '../uploads/laws_of_motion');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/laws_of_motion');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

const SVG_HEADER = (w = 560, h = 320) => `
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
    <pattern id="hatch-pat" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="10" stroke="#94a3b8" stroke-width="1.5" />
    </pattern>
  </defs>
`;

export const DIAGRAMS = {
  // Q3: String suspended from ceiling with horizontal string to wall
  3: `
  ${SVG_HEADER(500, 300)}
    <!-- Wall on left -->
    <line x1="100" y1="60" x2="100" y2="240" class="surface" />
    <line x1="100" y1="80" x2="80" y2="100" class="hatch" />
    <line x1="100" y1="120" x2="80" y2="140" class="hatch" />
    <line x1="100" y1="160" x2="80" y2="180" class="hatch" />
    <line x1="100" y1="200" x2="80" y2="220" class="hatch" />

    <!-- Ceiling on top -->
    <line x1="180" y1="60" x2="380" y2="60" class="surface" />
    <line x1="200" y1="60" x2="220" y2="40" class="hatch" />
    <line x1="240" y1="60" x2="260" y2="40" class="hatch" />
    <line x1="280" y1="60" x2="300" y2="40" class="hatch" />
    <line x1="320" y1="60" x2="340" y2="40" class="hatch" />
    <line x1="360" y1="60" x2="380" y2="40" class="hatch" />

    <!-- Junction point O at (280, 160) -->
    <!-- Horizontal string from wall to O -->
    <line x1="100" y1="160" x2="280" y2="160" class="string-line" />
    <!-- Slanted string from ceiling (340, 60) to O (280, 160) -->
    <line x1="340" y1="60" x2="280" y2="160" class="string-line" />
    <!-- Angle arc at ceiling -->
    <path d="M 320 60 A 20 20 0 0 1 328 80" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="310" y="80" class="label">θ</text>

    <!-- Vertical string from O to mass m -->
    <line x1="280" y1="160" x2="280" y2="220" class="string-line" />
    <circle cx="280" cy="160" r="4" fill="#0f172a" />
    <rect x="255" y="220" width="50" height="40" class="block" />
    <text x="280" y="240" class="label">m</text>
    <text x="190" y="145" class="sublabel">Horizontal String</text>
  </svg>`,

  // Q4: Uniform rope of mass M, length L with mass m at bottom
  4: `
  ${SVG_HEADER(480, 340)}
    <!-- Top support / upward force T0 -->
    <line x1="240" y1="60" x2="240" y2="25" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="260" y="35" class="label" fill="#dc2626">T₀</text>

    <!-- Rope -->
    <rect x="234" y="60" width="12" height="180" fill="#e2e8f0" stroke="#0f172a" stroke-width="2" rx="2" />
    <!-- Section point P -->
    <line x1="220" y1="190" x2="260" y2="190" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="3,2" />
    <text x="210" y="190" class="label" fill="#dc2626">P</text>

    <!-- Dimension x from bottom -->
    <line x1="280" y1="240" x2="280" y2="190" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" marker-start="url(#arrow)" />
    <text x="295" y="215" class="sublabel">x</text>

    <!-- Dimension L -->
    <line x1="330" y1="240" x2="330" y2="60" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" marker-start="url(#arrow)" />
    <text x="350" y="150" class="label">L</text>
    <text x="170" y="120" class="sublabel">Rope (M, L)</text>

    <!-- Hanging mass m -->
    <rect x="215" y="240" width="50" height="45" class="block" />
    <text x="240" y="262" class="label">m</text>
  </svg>`,

  // Q5: Block M on smooth ground with block m on front vertical face, force F
  5: `
  ${SVG_HEADER(500, 260)}
    <!-- Ground -->
    <line x1="60" y1="200" x2="440" y2="200" class="surface" />
    <line x1="70" y1="200" x2="50" y2="220" class="hatch" />
    <line x1="120" y1="200" x2="100" y2="220" class="hatch" />
    <line x1="170" y1="200" x2="150" y2="220" class="hatch" />
    <line x1="220" y1="200" x2="200" y2="220" class="hatch" />
    <line x1="270" y1="200" x2="250" y2="220" class="hatch" />
    <line x1="320" y1="200" x2="300" y2="220" class="hatch" />
    <line x1="370" y1="200" x2="350" y2="220" class="hatch" />
    <text x="250" y="235" class="sublabel">Smooth ground</text>

    <!-- Block M -->
    <rect x="180" y="100" width="140" height="100" class="block" />
    <text x="250" y="150" class="label" font-size="20">M</text>

    <!-- Force F applied on left of M -->
    <line x1="100" y1="150" x2="175" y2="150" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="135" y="135" class="label" fill="#dc2626">F</text>

    <!-- Small block m on front face -->
    <rect x="320" y="120" width="40" height="50" class="block-amber" />
    <text x="340" y="145" class="label">m</text>
    <text x="355" y="95" class="sublabel">friction μ</text>
    <line x1="345" y1="105" x2="330" y2="120" stroke="#475569" stroke-width="1.2" />
  </svg>`,

  // Q6: Truck accelerating with block m on truck bed
  6: `
  ${SVG_HEADER(540, 260)}
    <!-- Road -->
    <line x1="40" y1="210" x2="500" y2="210" class="surface" />

    <!-- Truck body -->
    <rect x="100" y="120" width="260" height="60" class="block" />
    <rect x="360" y="100" width="60" height="80" class="block" />
    <!-- Wheels -->
    <circle cx="160" cy="195" r="16" fill="#334155" />
    <circle cx="160" cy="195" r="7" fill="#ffffff" />
    <circle cx="380" cy="195" r="16" fill="#334155" />
    <circle cx="380" cy="195" r="7" fill="#ffffff" />

    <!-- Block m on truck bed -->
    <rect x="180" y="90" width="45" height="30" class="block-amber" />
    <text x="202" y="105" class="label">m</text>

    <!-- Dimension L = 2m from block to rear edge -->
    <line x1="180" y1="75" x2="100" y2="75" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" marker-start="url(#arrow)" />
    <text x="140" y="60" class="sublabel">L = 2 m</text>

    <!-- Acceleration arrow -->
    <line x1="430" y1="130" x2="490" y2="130" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="460" y="110" class="label" fill="#2563eb">a = 6 m/s²</text>
    <text x="235" y="140" class="sublabel">μ = 0.5</text>
  </svg>`,

  // Q7: Inclined plane at 30 deg with block of mass m
  7: `
  ${SVG_HEADER(500, 280)}
    <!-- Horizontal base -->
    <line x1="80" y1="220" x2="420" y2="220" class="surface" />
    <!-- Wedge incline -->
    <line x1="80" y1="220" x2="380" y2="70" class="surface" />
    <line x1="380" y1="70" x2="380" y2="220" class="surface" />

    <!-- Angle arc 30 deg -->
    <path d="M 140 220 A 60 60 0 0 0 135 195" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="160" y="205" class="label">30°</text>

    <!-- Block m on incline -->
    <g transform="translate(230, 145) rotate(-26.5)">
      <rect x="-25" y="-30" width="50" height="30" class="block-amber" />
      <text x="0" y="-15" class="label">m</text>
    </g>
    <text x="270" y="105" class="sublabel">μ = 0.8</text>
  </svg>`,

  // Q8: Two blocks 2kg on 6kg, F = 12N on 6kg
  8: `
  ${SVG_HEADER(500, 260)}
    <!-- Ground (smooth) -->
    <line x1="80" y1="200" x2="420" y2="200" class="surface" />
    <line x1="90" y1="200" x2="70" y2="220" class="hatch" />
    <line x1="140" y1="200" x2="120" y2="220" class="hatch" />
    <line x1="190" y1="200" x2="170" y2="220" class="hatch" />
    <line x1="240" y1="200" x2="220" y2="220" class="hatch" />
    <line x1="290" y1="200" x2="270" y2="220" class="hatch" />
    <line x1="340" y1="200" x2="320" y2="220" class="hatch" />
    <text x="250" y="235" class="sublabel">Smooth ground</text>

    <!-- Lower block 6kg -->
    <rect x="160" y="130" width="150" height="70" class="block" />
    <text x="235" y="165" class="label">6 kg</text>

    <!-- Force F = 12 N on 6 kg block -->
    <line x1="310" y1="165" x2="390" y2="165" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="350" y="145" class="label" fill="#dc2626">F = 12 N</text>

    <!-- Upper block 2kg -->
    <rect x="195" y="80" width="80" height="50" class="block-amber" />
    <text x="235" y="105" class="label">2 kg</text>
    <text x="140" y="105" class="sublabel">μ = 0.3</text>
    <line x1="170" y1="105" x2="195" y2="115" stroke="#475569" stroke-width="1.2" />
  </svg>`,

  // Q9: Contact force on 37 deg incline with mu = 0.5
  9: `
  ${SVG_HEADER(500, 280)}
    <!-- Horizontal base -->
    <line x1="80" y1="220" x2="420" y2="220" class="surface" />
    <!-- Incline 37 deg -->
    <line x1="80" y1="220" x2="380" y2="50" class="surface" />
    <line x1="380" y1="50" x2="380" y2="220" class="surface" />

    <!-- Angle arc 37 deg -->
    <path d="M 140 220 A 60 60 0 0 0 130 190" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="160" y="200" class="label">37°</text>

    <!-- Block m on incline -->
    <g transform="translate(230, 135) rotate(-29.5)">
      <rect x="-25" y="-30" width="50" height="30" class="block-amber" />
      <text x="0" y="-15" class="label">m</text>
    </g>
    <text x="270" y="90" class="sublabel">μ = 0.5</text>
  </svg>`,

  // Q10: Force-time graph from 6N to 0 at t = 4s
  10: `
  ${SVG_HEADER(520, 280)}
    <!-- Axes -->
    <line x1="100" y1="220" x2="440" y2="220" class="axis" marker-end="url(#arrow)" />
    <line x1="100" y1="220" x2="100" y2="50" class="axis" marker-end="url(#arrow)" />
    <text x="430" y="245" class="label">t (sec)</text>
    <text x="65" y="60" class="label">F (N)</text>

    <!-- Ticks & Labels -->
    <text x="80" y="80" class="label">6</text>
    <text x="100" y="240" class="label">0</text>
    <line x1="95" y1="80" x2="105" y2="80" stroke="#0f172a" stroke-width="2" />

    <text x="340" y="240" class="label">4</text>
    <line x1="340" y1="215" x2="340" y2="225" stroke="#0f172a" stroke-width="2" />

    <!-- Triangular area shading -->
    <polygon points="100,80 340,220 100,220" fill="#eff6ff" />
    <!-- Graph Line -->
    <line x1="100" y1="80" x2="340" y2="220" stroke="#2563eb" stroke-width="3" />
    <circle cx="100" cy="80" r="4" fill="#2563eb" />
    <circle cx="340" cy="220" r="4" fill="#2563eb" />
  </svg>`,

  // Q12: Equilibrium of pulleys with central mass sqrt(2)m
  12: `
  ${SVG_HEADER(540, 320)}
    <!-- Ceiling -->
    <line x1="100" y1="50" x2="440" y2="50" class="surface" />
    <line x1="120" y1="50" x2="140" y2="35" class="hatch" />
    <line x1="180" y1="50" x2="200" y2="35" class="hatch" />
    <line x1="240" y1="50" x2="260" y2="35" class="hatch" />
    <line x1="300" y1="50" x2="320" y2="35" class="hatch" />
    <line x1="360" y1="50" x2="380" y2="35" class="hatch" />
    <line x1="420" y1="50" x2="440" y2="35" class="hatch" />

    <!-- Pulleys at (180, 80) and (360, 80) -->
    <line x1="180" y1="50" x2="180" y2="80" stroke="#0f172a" stroke-width="2" />
    <circle cx="180" cy="80" r="16" class="pulley" />
    <circle cx="180" cy="80" r="3" class="pulley-center" />

    <line x1="360" y1="50" x2="360" y2="80" stroke="#0f172a" stroke-width="2" />
    <circle cx="360" cy="80" r="16" class="pulley" />
    <circle cx="360" cy="80" r="3" class="pulley-center" />

    <!-- Left outer hanging string & mass m -->
    <line x1="164" y1="80" x2="164" y2="200" class="string-line" />
    <rect x="144" y="200" width="40" height="35" class="block" />
    <text x="164" y="217" class="label">m</text>

    <!-- Right outer hanging string & mass m -->
    <line x1="376" y1="80" x2="376" y2="200" class="string-line" />
    <rect x="356" y="200" width="40" height="35" class="block" />
    <text x="376" y="217" class="label">m</text>

    <!-- Inner strings converging to central mass sqrt(2)m at (270, 180) -->
    <line x1="196" y1="80" x2="270" y2="180" class="string-line" />
    <line x1="344" y1="80" x2="270" y2="180" class="string-line" />

    <!-- Vertical dashed reference line for angle theta -->
    <line x1="270" y1="110" x2="270" y2="180" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3" />
    <path d="M 270 140 A 40 40 0 0 1 285 145" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <path d="M 270 140 A 40 40 0 0 0 255 145" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="290" y="130" class="label">θ</text>
    <text x="250" y="130" class="label">θ</text>

    <rect x="245" y="180" width="50" height="40" class="block-amber" />
    <text x="270" y="200" class="label">√2m</text>
  </svg>`,

  // Q14: Bar m1 on plank m2 with F = at
  14: `
  ${SVG_HEADER(500, 260)}
    <!-- Smooth horizontal floor -->
    <line x1="80" y1="200" x2="420" y2="200" class="surface" />
    <line x1="90" y1="200" x2="70" y2="220" class="hatch" />
    <line x1="140" y1="200" x2="120" y2="220" class="hatch" />
    <line x1="190" y1="200" x2="170" y2="220" class="hatch" />
    <line x1="240" y1="200" x2="220" y2="220" class="hatch" />
    <line x1="290" y1="200" x2="270" y2="220" class="hatch" />
    <line x1="340" y1="200" x2="320" y2="220" class="hatch" />

    <!-- Plank m2 -->
    <rect x="150" y="140" width="180" height="60" class="block" />
    <text x="240" y="170" class="label">m₂</text>

    <!-- Force F = at on plank -->
    <line x1="330" y1="170" x2="410" y2="170" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="370" y="150" class="label" fill="#dc2626">F = αt</text>

    <!-- Bar m1 on plank -->
    <rect x="200" y="85" width="80" height="55" class="block-blue" />
    <text x="240" y="112" class="label">m₁</text>
    <text x="120" y="112" class="sublabel">friction k</text>
    <line x1="160" y1="112" x2="200" y2="125" stroke="#475569" stroke-width="1.2" />
  </svg>`,

  // Q15: Incline 30 deg with mass M and hanging 2M
  15: `
  ${SVG_HEADER(540, 320)}
    <!-- Incline base -->
    <line x1="60" y1="250" x2="460" y2="250" class="surface" />
    <line x1="60" y1="250" x2="380" y2="90" class="surface" />
    <line x1="380" y1="90" x2="380" y2="250" class="surface" />

    <!-- Angle 30 deg -->
    <path d="M 120 250 A 60 60 0 0 0 115 225" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="140" y="235" class="label">30°</text>

    <!-- Pulley at apex -->
    <circle cx="380" cy="85" r="16" class="pulley" />
    <circle cx="380" cy="85" r="3" class="pulley-center" />

    <!-- Block M on incline -->
    <g transform="translate(230, 165) rotate(-26.5)">
      <rect x="-25" y="-30" width="50" height="30" class="block" />
      <text x="0" y="-15" class="label">M</text>
    </g>

    <!-- String from M to pulley to hanging 2M -->
    <line x1="240" y1="150" x2="375" y2="72" class="string-line" />
    <line x1="396" y1="85" x2="396" y2="180" class="string-line" />

    <!-- Hanging mass 2M -->
    <rect x="375" y="180" width="42" height="45" class="block-amber" />
    <text x="396" y="202" class="label">2M</text>
  </svg>`,

  // Q16: Impulse from triangular F-t graph (peak 100 N at t = 1 to 10s)
  16: `
  ${SVG_HEADER(520, 280)}
    <!-- Axes -->
    <line x1="90" y1="220" x2="450" y2="220" class="axis" marker-end="url(#arrow)" />
    <line x1="90" y1="220" x2="90" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="440" y="245" class="label">t (s)</text>
    <text x="55" y="50" class="label">F (N)</text>

    <!-- Ticks -->
    <text x="65" y="80" class="label">100</text>
    <line x1="85" y1="80" x2="95" y2="80" stroke="#0f172a" stroke-width="2" />
    <line x1="90" y1="80" x2="230" y2="80" stroke="#94a3b8" stroke-dasharray="3,3" />

    <text x="140" y="240" class="label">1</text>
    <line x1="140" y1="215" x2="140" y2="225" stroke="#0f172a" stroke-width="2" />

    <text x="370" y="240" class="label">10</text>
    <line x1="370" y1="215" x2="370" y2="225" stroke="#0f172a" stroke-width="2" />

    <!-- Triangle shading & line -->
    <polygon points="140,220 230,80 370,220" fill="#eff6ff" />
    <polyline points="140,220 230,80 370,220" stroke="#2563eb" stroke-width="3" fill="none" />
    <circle cx="230" cy="80" r="4" fill="#2563eb" />
  </svg>`,

  // Q18: 10kg on 25kg, F = 250N on block A
  18: `
  ${SVG_HEADER(500, 260)}
    <!-- Frictionless table -->
    <line x1="80" y1="200" x2="420" y2="200" class="surface" />
    <line x1="90" y1="200" x2="70" y2="220" class="hatch" />
    <line x1="140" y1="200" x2="120" y2="220" class="hatch" />
    <line x1="190" y1="200" x2="170" y2="220" class="hatch" />
    <line x1="240" y1="200" x2="220" y2="220" class="hatch" />
    <line x1="290" y1="200" x2="270" y2="220" class="hatch" />
    <line x1="340" y1="200" x2="320" y2="220" class="hatch" />

    <!-- Lower block B (25kg) -->
    <rect x="150" y="130" width="160" height="70" class="block" />
    <text x="180" y="165" class="label">B</text>
    <text x="240" y="165" class="sublabel">25 kg</text>

    <!-- Upper block A (10kg) -->
    <rect x="185" y="75" width="90" height="55" class="block-amber" />
    <text x="210" y="102" class="label">A</text>
    <text x="250" y="102" class="sublabel">10 kg</text>
    <text x="120" y="90" class="sublabel">μ = 0.4</text>

    <!-- Force F = 250 N on upper block A -->
    <line x1="275" y1="102" x2="365" y2="102" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="325" y="82" class="label" fill="#dc2626">F = 250 N</text>
  </svg>`,

  // Q20: Force-time graph: triangle from 0 to 2s, negative rectangle from 2 to 4s, positive rectangle from 4 to 8s
  20: `
  ${SVG_HEADER(520, 280)}
    <!-- Axes -->
    <line x1="70" y1="150" x2="450" y2="150" class="axis" marker-end="url(#arrow)" />
    <line x1="120" y1="240" x2="120" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="440" y="175" class="label">t (s)</text>
    <text x="90" y="50" class="label">F (N)</text>

    <!-- Force ticks -->
    <text x="100" y="70" class="label">6</text>
    <line x1="115" y1="70" x2="125" y2="70" stroke="#0f172a" stroke-width="2" />
    <text x="100" y="110" class="label">3</text>
    <line x1="115" y1="110" x2="125" y2="110" stroke="#0f172a" stroke-width="2" />
    <text x="95" y="190" class="label">-3</text>
    <line x1="115" y1="190" x2="125" y2="190" stroke="#0f172a" stroke-width="2" />

    <!-- Time ticks -->
    <text x="120" y="170" class="label">0</text>
    <text x="180" y="170" class="label">2</text>
    <text x="240" y="170" class="label">4</text>
    <text x="300" y="170" class="label">6</text>
    <text x="360" y="170" class="label">8</text>

    <!-- Triangle: (0,0) -> (2,6) -> (2,-3) -> (4,-3) -> (4,3) -> (8,3) -> (8,0) -->
    <polygon points="120,150 180,70 180,150" fill="#eff6ff" />
    <polygon points="180,150 180,190 240,190 240,150" fill="#fef2f2" />
    <polygon points="240,150 240,110 360,110 360,150" fill="#eff6ff" />
    <polyline points="120,150 180,70 180,190 240,190 240,110 360,110 360,150" stroke="#2563eb" stroke-width="3" fill="none" />
  </svg>`,

  // Q21: Wedge ABC with angle ACB = 30 deg
  21: `
  ${SVG_HEADER(480, 280)}
    <!-- Triangle ABC: C is top apex, B is right angle at bottom, A is left corner -->
    <line x1="120" y1="230" x2="360" y2="230" class="surface" />
    <line x1="360" y1="230" x2="360" y2="60" class="surface" />
    <line x1="120" y1="230" x2="360" y2="60" class="surface" />

    <text x="100" y="240" class="label">A</text>
    <text x="375" y="240" class="label">B</text>
    <text x="375" y="60" class="label">C</text>

    <!-- Angle ACB = 30 deg at C -->
    <path d="M 360 100 A 40 40 0 0 1 340 85" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="330" y="115" class="label">30°</text>

    <!-- Block M on incline AC -->
    <g transform="translate(240, 145) rotate(-35.3)">
      <rect x="-25" y="-30" width="50" height="30" class="block-amber" />
      <text x="0" y="-15" class="label">M</text>
    </g>
  </svg>`,

  // Q22: Rough vertical board accelerating horizontally with a
  22: `
  ${SVG_HEADER(480, 280)}
    <!-- Vertical board -->
    <rect x="260" y="40" width="30" height="200" fill="#cbd5e1" stroke="#0f172a" stroke-width="2" />
    <!-- Block 2kg pressed against it -->
    <rect x="190" y="100" width="70" height="60" class="block-amber" />
    <text x="225" y="130" class="label">2 kg</text>

    <!-- Acceleration arrow -->
    <line x1="100" y1="130" x2="160" y2="130" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="130" y="110" class="label" fill="#2563eb">a</text>
    <text x="320" y="140" class="sublabel">Rough board</text>
  </svg>`,

  // Q23: Particle rebounding from wall at angle theta
  23: `
  ${SVG_HEADER(520, 280)}
    <!-- Wall along y-axis -->
    <line x1="260" y1="40" x2="260" y2="240" class="surface" />
    <line x1="260" y1="50" x2="280" y2="70" class="hatch" />
    <line x1="260" y1="90" x2="280" y2="110" class="hatch" />
    <line x1="260" y1="130" x2="280" y2="150" class="hatch" />
    <line x1="260" y1="170" x2="280" y2="190" class="hatch" />
    <line x1="260" y1="210" x2="280" y2="230" class="hatch" />

    <!-- Normal (x-axis) -->
    <line x1="80" y1="140" x2="260" y2="140" stroke="#94a3b8" stroke-dasharray="3,3" stroke-width="1.5" />
    <text x="70" y="140" class="label">x</text>
    <text x="260" y="255" class="label">y</text>

    <!-- Incident trajectory -->
    <line x1="120" y1="70" x2="260" y2="140" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <!-- Rebound trajectory -->
    <line x1="260" y1="140" x2="120" y2="210" class="vel-arrow" marker-end="url(#arrow-blue)" />

    <!-- Angle arcs -->
    <path d="M 210 140 A 50 50 0 0 1 225 120" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="200" y="120" class="label">θ</text>
    <path d="M 210 140 A 50 50 0 0 0 225 160" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="200" y="160" class="label">θ</text>
    <text x="110" y="60" class="label" fill="#2563eb">v</text>
    <text x="110" y="225" class="label" fill="#2563eb">v</text>
  </svg>`,

  // Q24: Pulley supported by strings AB and BC at 90 deg
  24: `
  ${SVG_HEADER(520, 300)}
    <!-- Ceiling -->
    <line x1="120" y1="50" x2="400" y2="50" class="surface" />
    <line x1="140" y1="50" x2="160" y2="35" class="hatch" />
    <line x1="200" y1="50" x2="220" y2="35" class="hatch" />
    <line x1="260" y1="50" x2="280" y2="35" class="hatch" />
    <line x1="320" y1="50" x2="340" y2="35" class="hatch" />

    <!-- Pulley B at (260, 130) -->
    <circle cx="260" cy="130" r="18" class="pulley" />
    <circle cx="260" cy="130" r="3" class="pulley-center" />
    <text x="240" y="130" class="label">B</text>

    <!-- String AB to ceiling (180, 50) -->
    <line x1="180" y1="50" x2="260" y2="130" class="string-line" />
    <text x="170" y="45" class="label">A</text>

    <!-- String BC to ceiling (340, 50) -->
    <line x1="340" y1="50" x2="260" y2="130" class="string-line" />
    <text x="350" y="45" class="label">C</text>
    <text x="260" y="105" class="label">90°</text>

    <!-- Rope over pulley: left has mass m, right tied to floor -->
    <line x1="242" y1="130" x2="242" y2="220" class="string-line" />
    <rect x="222" y="220" width="40" height="35" class="block" />
    <text x="242" y="237" class="label">m</text>

    <!-- Right string tied to ground -->
    <line x1="278" y1="130" x2="278" y2="250" class="string-line" />
    <line x1="265" y1="250" x2="295" y2="250" class="surface" />
  </svg>`,

  // Q25: Pulleys with 4kg hanging each side, 3kg and 1kg on table
  25: `
  ${SVG_HEADER(560, 260)}
    <!-- Table -->
    <line x1="120" y1="120" x2="440" y2="120" class="surface" />

    <line x1="150" y1="120" x2="150" y2="210" class="surface" />
    <line x1="410" y1="120" x2="410" y2="210" class="surface" />

    <!-- Left Pulley -->
    <circle cx="120" cy="120" r="14" class="pulley" />
    <!-- Right Pulley -->
    <circle cx="440" cy="120" r="14" class="pulley" />

    <!-- Table Blocks: 3kg and 1kg connected by string -->
    <rect x="200" y="80" width="60" height="40" class="block" />
    <text x="230" y="100" class="label">3 kg</text>

    <line x1="260" y1="100" x2="320" y2="100" class="string-line" />

    <rect x="320" y="85" width="50" height="35" class="block" />
    <text x="345" y="102" class="label">1 kg</text>

    <!-- Strings to pulleys -->
    <line x1="120" y1="106" x2="200" y2="100" class="string-line" />
    <line x1="370" y1="100" x2="440" y2="106" class="string-line" />

    <!-- Left hanging 4kg -->
    <line x1="106" y1="120" x2="106" y2="190" class="string-line" />
    <rect x="86" y="190" width="40" height="35" class="block-amber" />
    <text x="106" y="207" class="label">4 kg</text>

    <!-- Right hanging 4kg -->
    <line x1="454" y1="120" x2="454" y2="190" class="string-line" />
    <rect x="434" y="190" width="40" height="35" class="block-amber" />
    <text x="454" y="207" class="label">4 kg</text>
  </svg>`,

  // Q26: Block M with m1 on top and m2 hanging on front vertical face
  26: `
  ${SVG_HEADER(500, 260)}
    <!-- Ground -->
    <line x1="80" y1="210" x2="420" y2="210" class="surface" />

    <!-- Wedge/Block M -->
    <rect x="160" y="90" width="160" height="120" class="block" />
    <text x="220" y="150" class="label" font-size="20">M</text>

    <!-- Pulley at top right corner of M -->
    <circle cx="320" cy="90" r="10" class="pulley" />

    <!-- Block m1 on top -->
    <rect x="210" y="55" width="50" height="35" class="block-blue" />
    <text x="235" y="72" class="label">m₁</text>

    <!-- String from m1 to pulley to m2 -->
    <line x1="260" y1="72" x2="320" y2="80" class="string-line" />
    <line x1="330" y1="90" x2="330" y2="140" class="string-line" />

    <!-- Hanging block m2 against front face -->
    <rect x="320" y="140" width="35" height="40" class="block-amber" />
    <text x="337" y="160" class="label">m₂</text>
  </svg>`,

  // Q28: Block 4kg on horizontal surface
  28: `
  ${SVG_HEADER(460, 220)}
    <line x1="80" y1="160" x2="380" y2="160" class="surface" />
    <line x1="90" y1="160" x2="70" y2="180" class="hatch" />
    <line x1="140" y1="160" x2="120" y2="180" class="hatch" />
    <line x1="190" y1="160" x2="170" y2="180" class="hatch" />
    <line x1="240" y1="160" x2="220" y2="180" class="hatch" />
    <line x1="290" y1="160" x2="270" y2="180" class="hatch" />
    <line x1="340" y1="160" x2="320" y2="180" class="hatch" />

    <rect x="180" y="90" width="100" height="70" class="block" />
    <text x="230" y="125" class="label">4 kg</text>
    <text x="230" y="185" class="sublabel">μ = 0.3</text>
  </svg>`,

  // Q30: Three pulley systems A, B, C
  30: `
  ${SVG_HEADER(560, 280)}
    <!-- Ceiling -->
    <line x1="50" y1="40" x2="510" y2="40" class="surface" />

    <!-- System A -->
    <circle cx="120" cy="80" r="16" class="pulley" />
    <line x1="120" y1="40" x2="120" y2="80" stroke="#0f172a" stroke-width="2" />
    <line x1="104" y1="80" x2="104" y2="160" class="string-line" />
    <rect x="84" y="160" width="40" height="35" class="block" />
    <text x="104" y="177" class="label">m</text>
    <line x1="136" y1="80" x2="136" y2="160" class="string-line" />
    <line x1="136" y1="160" x2="136" y2="200" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="136" y="220" class="label" fill="#dc2626">F₁ = 2mg</text>
    <text x="104" y="245" class="label">(A)</text>

    <!-- System B -->
    <circle cx="280" cy="80" r="16" class="pulley" />
    <line x1="280" y1="40" x2="280" y2="80" stroke="#0f172a" stroke-width="2" />
    <line x1="264" y1="80" x2="264" y2="160" class="string-line" />
    <rect x="244" y="160" width="40" height="35" class="block" />
    <text x="264" y="177" class="label">m</text>
    <line x1="296" y1="80" x2="296" y2="160" class="string-line" />
    <rect x="276" y="160" width="45" height="40" class="block-amber" />
    <text x="298" y="180" class="label">2m</text>
    <text x="280" y="245" class="label">(B)</text>

    <!-- System C -->
    <circle cx="440" cy="80" r="16" class="pulley" />
    <line x1="440" y1="40" x2="440" y2="80" stroke="#0f172a" stroke-width="2" />
    <line x1="424" y1="80" x2="424" y2="160" class="string-line" />
    <rect x="404" y="160" width="40" height="35" class="block" />
    <text x="424" y="177" class="label">m</text>
    <line x1="456" y1="80" x2="456" y2="160" class="string-line" />
    <line x1="456" y1="160" x2="456" y2="200" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="456" y="220" class="label" fill="#dc2626">F₂ = mg</text>
    <text x="440" y="245" class="label">(C)</text>
  </svg>`,

  // Q32: Pushing force F at 60 deg on block m = sqrt(3) kg
  32: `
  ${SVG_HEADER(500, 260)}
    <!-- Ground -->
    <line x1="80" y1="190" x2="420" y2="190" class="surface" />
    <line x1="90" y1="190" x2="70" y2="210" class="hatch" />
    <line x1="140" y1="190" x2="120" y2="210" class="hatch" />
    <line x1="190" y1="190" x2="170" y2="210" class="hatch" />
    <line x1="240" y1="190" x2="220" y2="210" class="hatch" />
    <line x1="290" y1="190" x2="270" y2="210" class="hatch" />
    <line x1="340" y1="190" x2="320" y2="210" class="hatch" />

    <!-- Block -->
    <rect x="180" y="110" width="120" height="80" class="block" />
    <text x="240" y="150" class="label">m = √3 kg</text>
    <text x="360" y="210" class="sublabel">μ = 1/(2√3)</text>

    <!-- Force F pointing down and right into the block at 60 deg -->
    <line x1="110" y1="70" x2="180" y2="110" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="135" y="75" class="label" fill="#dc2626">F</text>
    <!-- Angle arc with horizontal -->
    <line x1="110" y1="70" x2="170" y2="70" stroke="#94a3b8" stroke-dasharray="3,3" />
    <path d="M 140 70 A 30 30 0 0 1 150 90" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="165" y="85" class="label">60°</text>
  </svg>`,

  // Q33: Spring suspending 2m and m
  33: `
  ${SVG_HEADER(460, 320)}
    <!-- Ceiling -->
    <line x1="160" y1="40" x2="300" y2="40" class="surface" />
    <line x1="180" y1="40" x2="200" y2="25" class="hatch" />
    <line x1="220" y1="40" x2="240" y2="25" class="hatch" />
    <line x1="260" y1="40" x2="280" y2="25" class="hatch" />

    <!-- Spring from (230, 40) to (230, 110) -->
    <path d="M 230 40 L 230 50 L 220 55 L 240 65 L 220 75 L 240 85 L 220 95 L 240 105 L 230 110" fill="none" stroke="#0f172a" stroke-width="2.5" />

    <!-- Block A (2m) -->
    <rect x="200" y="110" width="60" height="45" class="block-blue" />
    <text x="175" y="132" class="label">A</text>
    <text x="230" y="132" class="label">2m</text>

    <!-- String between A and B -->
    <line x1="230" y1="155" x2="230" y2="220" class="string-line" />
    <text x="255" y="185" class="sublabel">string</text>

    <!-- Block B (m) -->
    <rect x="205" y="220" width="50" height="40" class="block" />
    <text x="180" y="240" class="label">B</text>
    <text x="230" y="240" class="label">m</text>
  </svg>`,

  // Q34: Man climbs rope over pulley with block 3m on floor
  34: `
  ${SVG_HEADER(480, 320)}
    <!-- Ceiling & Pulley -->
    <line x1="180" y1="40" x2="320" y2="40" class="surface" />
    <circle cx="250" cy="80" r="16" class="pulley" />
    <line x1="250" y1="40" x2="250" y2="80" stroke="#0f172a" stroke-width="2" />

    <!-- Left side: block 3m on floor -->
    <line x1="234" y1="80" x2="234" y2="180" class="string-line" />
    <rect x="205" y="180" width="58" height="50" class="block" />
    <text x="234" y="205" class="label">3m</text>

    <!-- Ground under 3m -->
    <line x1="180" y1="230" x2="280" y2="230" class="surface" />

    <!-- Right side: man climbing rope with a = g/2 -->
    <line x1="266" y1="80" x2="266" y2="230" class="string-line" />
    <!-- Man symbol -->
    <circle cx="266" cy="150" r="10" fill="#3b82f6" />
    <line x1="266" y1="160" x2="266" y2="185" stroke="#3b82f6" stroke-width="3" />
    <line x1="266" y1="170" x2="255" y2="160" stroke="#3b82f6" stroke-width="2" />
    <line x1="266" y1="170" x2="277" y2="160" stroke="#3b82f6" stroke-width="2" />
    <line x1="266" y1="185" x2="255" y2="200" stroke="#3b82f6" stroke-width="2" />
    <line x1="266" y1="185" x2="277" y2="200" stroke="#3b82f6" stroke-width="2" />
    <text x="305" y="150" class="label">m</text>
    <line x1="330" y1="175" x2="330" y2="135" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="365" y="155" class="label" fill="#2563eb">a = g/2</text>
  </svg>`,

  // Q35: 5kg - 3kg rod - 8kg pulled with 180 N
  35: `
  ${SVG_HEADER(540, 240)}
    <!-- Ground -->
    <line x1="60" y1="180" x2="480" y2="180" class="surface" />

    <!-- Block 5kg -->
    <rect x="100" y="110" width="70" height="70" class="block" />
    <text x="135" y="145" class="label">5 kg</text>

    <!-- Rod 3kg -->
    <rect x="170" y="135" width="100" height="20" fill="#cbd5e1" stroke="#0f172a" stroke-width="2" />
    <text x="220" y="120" class="sublabel">3 kg rod</text>

    <!-- Block 8kg -->
    <rect x="270" y="100" width="80" height="80" class="block-amber" />
    <text x="310" y="140" class="label">8 kg</text>

    <!-- Pulling force 180 N -->
    <line x1="350" y1="140" x2="440" y2="140" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="395" y="120" class="label" fill="#dc2626">F = 180 N</text>
  </svg>`,

  // Q37: Table block 5kg with mu = 0.5 and hanging block B (m)
  37: `
  ${SVG_HEADER(500, 280)}
    <!-- Table -->
    <line x1="80" y1="130" x2="360" y2="130" class="surface" />
    <line x1="120" y1="130" x2="120" y2="230" class="surface" />

    <!-- Pulley at table edge -->
    <circle cx="360" cy="130" r="14" class="pulley" />

    <!-- Block A (5kg) on table -->
    <rect x="180" y="85" width="70" height="45" class="block" />
    <text x="215" y="100" class="label">A</text>
    <text x="215" y="118" class="sublabel">m = 5 kg</text>
    <text x="270" y="148" class="sublabel">μ = 0.5</text>

    <!-- String from A to pulley to hanging B -->
    <line x1="250" y1="110" x2="360" y2="116" class="string-line" />
    <line x1="374" y1="130" x2="374" y2="210" class="string-line" />

    <!-- Hanging Block B -->
    <rect x="354" y="210" width="40" height="40" class="block-amber" />
    <text x="374" y="222" class="label">B</text>
    <text x="374" y="238" class="sublabel">m</text>
  </svg>`,

  // Q38: Block A (5kg, mu = 0.2) on B (3kg, mu = 0.3) pulled by 8 N
  38: `
  ${SVG_HEADER(500, 260)}
    <!-- Horizontal floor -->
    <line x1="80" y1="190" x2="420" y2="190" class="surface" />

    <!-- Block B (3kg) -->
    <rect x="160" y="130" width="140" height="60" class="block" />
    <text x="230" y="160" class="label">B (3 kg)</text>
    <text x="230" y="210" class="sublabel">μ = 0.3</text>

    <!-- Force 8 N on B -->
    <line x1="300" y1="160" x2="380" y2="160" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="340" y="140" class="label" fill="#dc2626">8 N</text>

    <!-- Block A (5kg) on top -->
    <rect x="185" y="80" width="90" height="50" class="block-amber" />
    <text x="230" y="105" class="label">A (5 kg)</text>
    <text x="135" y="105" class="sublabel">μ = 0.2</text>
    <line x1="160" y1="105" x2="185" y2="115" stroke="#475569" stroke-width="1.2" />
  </svg>`,

  // Q42: Three blocks 4kg - 2kg - 1kg pulled by 7 N and 28 N
  42: `
  ${SVG_HEADER(560, 240)}
    <!-- Smooth surface -->
    <line x1="50" y1="170" x2="510" y2="170" class="surface" />

    <!-- Force 7 N left -->
    <line x1="110" y1="130" x2="50" y2="130" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="80" y="110" class="label" fill="#dc2626">7 N</text>

    <!-- Block 4kg -->
    <rect x="110" y="90" width="70" height="80" class="block" />
    <text x="145" y="130" class="label">4 kg</text>

    <!-- String 1 -->
    <line x1="180" y1="130" x2="240" y2="130" class="string-line" />

    <!-- Block 2kg -->
    <rect x="240" y="105" width="60" height="65" class="block-amber" />
    <text x="270" y="137" class="label">2 kg</text>

    <!-- String 2 -->
    <line x1="300" y1="130" x2="360" y2="130" class="string-line" />

    <!-- Block 1kg -->
    <rect x="360" y="115" width="50" height="55" class="block" />
    <text x="385" y="142" class="label">1 kg</text>

    <!-- Force 28 N right -->
    <line x1="410" y1="130" x2="490" y2="130" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="450" y="110" class="label" fill="#dc2626">28 N</text>
  </svg>`,

  // Q43: Position-time x-t zig-zag graph
  43: `
  ${SVG_HEADER(540, 280)}
    <!-- Axes -->
    <line x1="70" y1="200" x2="480" y2="200" class="axis" marker-end="url(#arrow)" />
    <line x1="70" y1="200" x2="70" y2="50" class="axis" marker-end="url(#arrow)" />
    <text x="470" y="225" class="label">t (s)</text>
    <text x="45" y="60" class="label">x (m)</text>

    <!-- Peak 2m tick -->
    <text x="50" y="90" class="label">2</text>
    <line x1="65" y1="90" x2="75" y2="90" stroke="#0f172a" stroke-width="2" />
    <line x1="70" y1="90" x2="450" y2="90" stroke="#e2e8f0" stroke-dasharray="3,3" />

    <!-- Time ticks: 0, 2, 4, 6, 8, 10, 12, 14, 16 -->
    <text x="70" y="220" class="label">0</text>
    <text x="115" y="220" class="label">2</text>
    <text x="160" y="220" class="label">4</text>
    <text x="205" y="220" class="label">6</text>
    <text x="250" y="220" class="label">8</text>
    <text x="295" y="220" class="label">10</text>
    <text x="340" y="220" class="label">12</text>
    <text x="385" y="220" class="label">14</text>
    <text x="430" y="220" class="label">16</text>

    <!-- Zigzag: (0,0) -> (2,2) -> (4,0) -> (6,2) -> (8,0) -> (10,2) -> (12,0) -> (14,2) -> (16,0) -->
    <polyline points="70,200 115,90 160,200 205,90 250,200 295,90 340,200 385,90 430,200" stroke="#2563eb" stroke-width="3" fill="none" />
  </svg>`,

  // Q44: Block A on block B, 50 N on A
  44: `
  ${SVG_HEADER(500, 260)}
    <!-- Ground (smooth) -->
    <line x1="80" y1="190" x2="420" y2="190" class="surface" />
    <text x="250" y="225" class="sublabel">Smooth ground</text>

    <!-- Block B (m2 = 10kg) -->
    <rect x="160" y="130" width="150" height="60" class="block" />
    <text x="235" y="160" class="label">B (10 kg)</text>

    <!-- Block A (m1 = 10kg) -->
    <rect x="185" y="70" width="100" height="60" class="block-amber" />
    <text x="235" y="100" class="label">A (10 kg)</text>

    <!-- Pulling force 50 N on A -->
    <line x1="285" y1="100" x2="375" y2="100" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="330" y="80" class="label" fill="#dc2626">50 N</text>
    <text x="130" y="100" class="sublabel">μ = 0.5</text>
  </svg>`,

  // Q46: Pulley rope tied to hook C, man 40kg climbs
  46: `
  ${SVG_HEADER(500, 320)}
    <!-- Ceiling with hook C on left -->
    <line x1="100" y1="50" x2="400" y2="50" class="surface" />
    <text x="130" y="40" class="label">C</text>

    <!-- Pulley P suspended from ceiling at (300, 110) -->
    <line x1="300" y1="50" x2="300" y2="110" stroke="#0f172a" stroke-width="2" />
    <circle cx="300" cy="110" r="18" class="pulley" />
    <circle cx="300" cy="110" r="3" class="pulley-center" />
    <text x="325" y="110" class="label">P</text>

    <!-- Rope fixed at hook C, passing over pulley P -->
    <line x1="130" y1="50" x2="282" y2="110" class="string-line" />
    <!-- Free end with climbing man -->
    <line x1="318" y1="110" x2="318" y2="250" class="string-line" />

    <!-- Climbing man symbol -->
    <circle cx="318" cy="190" r="10" fill="#3b82f6" />
    <line x1="318" y1="200" x2="318" y2="225" stroke="#3b82f6" stroke-width="3" />
    <line x1="318" y1="210" x2="305" y2="200" stroke="#3b82f6" stroke-width="2" />
    <line x1="318" y1="210" x2="330" y2="200" stroke="#3b82f6" stroke-width="2" />
    <line x1="318" y1="225" x2="305" y2="240" stroke="#3b82f6" stroke-width="2" />
    <line x1="318" y1="225" x2="330" y2="240" stroke="#3b82f6" stroke-width="2" />
    <text x="370" y="200" class="label">40 kg</text>
  </svg>`,

  // Q48: Man on trolley pulling rope
  48: `
  ${SVG_HEADER(500, 300)}
    <!-- Ceiling & Pulley -->
    <line x1="150" y1="40" x2="350" y2="40" class="surface" />
    <circle cx="250" cy="80" r="16" class="pulley" />
    <line x1="250" y1="40" x2="250" y2="80" stroke="#0f172a" stroke-width="2" />

    <!-- Ground -->
    <line x1="100" y1="250" x2="400" y2="250" class="surface" />

    <!-- Trolley -->
    <rect x="180" y="200" width="140" height="35" class="block" />
    <circle cx="210" cy="242" r="8" fill="#334155" />
    <circle cx="290" cy="242" r="8" fill="#334155" />

    <!-- Man standing on trolley -->
    <circle cx="230" cy="150" r="9" fill="#3b82f6" />
    <line x1="230" y1="159" x2="230" y2="185" stroke="#3b82f6" stroke-width="2.5" />
    <line x1="230" y1="185" x2="220" y2="200" stroke="#3b82f6" stroke-width="2" />
    <line x1="230" y1="185" x2="240" y2="200" stroke="#3b82f6" stroke-width="2" />

    <!-- String from ceiling/pulley: one strand tied to trolley, other held by man -->
    <line x1="266" y1="80" x2="266" y2="200" class="string-line" />
    <line x1="234" y1="80" x2="234" y2="165" class="string-line" />
    <line x1="230" y1="168" x2="234" y2="165" stroke="#3b82f6" stroke-width="2" />
  </svg>`,

  // Q49: Block against vertical wall pressed by 25 N
  49: `
  ${SVG_HEADER(460, 260)}
    <!-- Wall on right -->
    <line x1="320" y1="40" x2="320" y2="220" class="surface" />
    <line x1="320" y1="50" x2="340" y2="70" class="hatch" />
    <line x1="320" y1="90" x2="340" y2="110" class="hatch" />
    <line x1="320" y1="130" x2="340" y2="150" class="hatch" />
    <line x1="320" y1="170" x2="340" y2="190" class="hatch" />
    <line x1="320" y1="210" x2="340" y2="230" class="hatch" />

    <!-- Block against wall -->
    <rect x="250" y="90" width="70" height="70" class="block-amber" />
    <text x="285" y="125" class="label">m</text>
    <text x="350" y="130" class="sublabel">μ = 0.4</text>

    <!-- Force 25 N pushing block into wall -->
    <line x1="160" y1="125" x2="245" y2="125" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="200" y="105" class="label" fill="#dc2626">25 N</text>
  </svg>`,

  // Q50: Block m on smooth wedge M pushed by F
  50: `
  ${SVG_HEADER(500, 260)}
    <!-- Ground -->
    <line x1="80" y1="210" x2="420" y2="210" class="surface" />
    <text x="250" y="235" class="sublabel">Smooth</text>

    <!-- Wedge M with angle theta -->
    <polygon points="170,210 350,210 350,90" fill="#f8fafc" stroke="#0f172a" stroke-width="2.2" />
    <text x="280" y="170" class="label" font-size="20">M</text>

    <!-- Angle theta at bottom-left -->
    <path d="M 220 210 A 50 50 0 0 0 210 185" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="235" y="195" class="label">θ</text>

    <!-- Block m on incline -->
    <g transform="translate(275, 140) rotate(33.7)">
      <rect x="-25" y="-30" width="50" height="30" class="block-amber" />
      <text x="0" y="-15" class="label">m</text>
    </g>

    <!-- Force F on wedge -->
    <line x1="90" y1="170" x2="165" y2="170" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="125" y="150" class="label" fill="#dc2626">F</text>
  </svg>`,

  // Q52: Triangular wedge of angle beta, block m flies off
  52: `
  ${SVG_HEADER(480, 260)}
    <!-- Ground -->
    <line x1="80" y1="210" x2="400" y2="210" class="surface" />

    <!-- Triangular wedge of angle beta on right -->
    <polygon points="140,210 340,210 140,90" fill="#f8fafc" stroke="#0f172a" stroke-width="2.2" />
    <text x="200" y="165" class="label" font-size="20">M</text>

    <!-- Angle beta at right corner -->
    <path d="M 290 210 A 50 50 0 0 1 295 185" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="275" y="195" class="label">β</text>

    <!-- Block m on slope -->
    <g transform="translate(225, 140) rotate(-31)">
      <rect x="-25" y="-30" width="50" height="30" class="block-amber" />
      <text x="0" y="-15" class="label">m</text>
    </g>
    <text x="225" y="85" class="sublabel">smooth</text>
  </svg>`,

  // Q53: Force-time graph passing from (0,4) through (2,0)
  53: `
  ${SVG_HEADER(520, 280)}
    <!-- Axes -->
    <line x1="80" y1="180" x2="450" y2="180" class="axis" marker-end="url(#arrow)" />
    <line x1="120" y1="240" x2="120" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="440" y="205" class="label">t (sec)</text>
    <text x="90" y="50" class="label">F (N)</text>

    <!-- Ticks -->
    <text x="100" y="80" class="label">4</text>
    <line x1="115" y1="80" x2="125" y2="80" stroke="#0f172a" stroke-width="2" />

    <text x="120" y="200" class="label">0</text>
    <text x="240" y="200" class="label">2</text>
    <line x1="240" y1="175" x2="240" y2="185" stroke="#0f172a" stroke-width="2" />

    <text x="300" y="200" class="label">3</text>
    <line x1="300" y1="175" x2="300" y2="185" stroke="#0f172a" stroke-width="2" />

    <!-- Line through (0,4), (2,0), (3,-2) -->
    <line x1="120" y1="80" x2="300" y2="230" stroke="#2563eb" stroke-width="3" />
    <circle cx="120" cy="80" r="4" fill="#2563eb" />
    <circle cx="240" cy="180" r="4" fill="#2563eb" />
    <circle cx="300" cy="230" r="4" fill="#2563eb" />
  </svg>`,

  // Q56: Trolley accelerating with a, block A on floor, hanging block B
  56: `
  ${SVG_HEADER(520, 280)}
    <!-- Accelerating trolley container -->
    <rect x="120" y="70" width="280" height="150" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5" />

    <!-- Block A on floor -->
    <rect x="220" y="160" width="90" height="60" class="block" />
    <text x="265" y="190" class="label">A</text>

    <!-- Pulley on top edge of A -->
    <circle cx="220" cy="160" r="8" class="pulley" />

    <!-- Block B hanging on left vertical face of A -->
    <rect x="195" y="170" width="25" height="35" class="block-amber" />
    <text x="207" y="187" class="label" font-size="12">B</text>
    <line x1="207" y1="170" x2="220" y2="155" class="string-line" />
    <line x1="220" y1="155" x2="270" y2="160" class="string-line" />

    <!-- Trolley acceleration a -->
    <line x1="230" y1="45" x2="290" y2="45" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="260" y="30" class="label" fill="#2563eb">a</text>
  </svg>`,

  // Q58: Four blocks 4kg - 3kg - 2kg - 1kg with 100 N
  58: `
  ${SVG_HEADER(560, 220)}
    <!-- Floor -->
    <line x1="40" y1="160" x2="520" y2="160" class="surface" />

    <!-- 4kg -->
    <rect x="60" y="90" width="60" height="70" class="block" />
    <text x="90" y="125" class="label">4 kg</text>

    <!-- string -->
    <line x1="120" y1="125" x2="160" y2="125" class="string-line" />

    <!-- 3kg -->
    <rect x="160" y="95" width="55" height="65" class="block-amber" />
    <text x="187" y="127" class="label">3 kg</text>

    <!-- string -->
    <line x1="215" y1="125" x2="265" y2="125" class="string-line" />

    <!-- 2kg -->
    <rect x="265" y="105" width="50" height="55" class="block" />
    <text x="290" y="132" class="label">2 kg</text>

    <!-- string -->
    <line x1="315" y1="125" x2="365" y2="125" class="string-line" />

    <!-- 1kg -->
    <rect x="365" y="115" width="45" height="45" class="block-amber" />
    <text x="387" y="137" class="label">1 kg</text>

    <!-- Force 100 N -->
    <line x1="410" y1="137" x2="490" y2="137" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="450" y="117" class="label" fill="#dc2626">100 N</text>
  </svg>`,

  // Q60: Rough incline with block projected up
  60: `
  ${SVG_HEADER(480, 260)}
    <!-- Base -->
    <line x1="80" y1="210" x2="400" y2="210" class="surface" />
    <!-- Incline -->
    <line x1="80" y1="210" x2="360" y2="70" class="surface" />
    <line x1="360" y1="70" x2="360" y2="210" class="surface" />

    <!-- Block on incline -->
    <g transform="translate(200, 150) rotate(-26.5)">
      <rect x="-25" y="-30" width="50" height="30" class="block-amber" />
      <text x="0" y="-15" class="label">m</text>
      <!-- Velocity vector pointing up the plane -->
      <line x1="30" y1="-15" x2="70" y2="-15" class="vel-arrow" marker-end="url(#arrow-blue)" />
      <text x="50" y="-30" class="label" fill="#2563eb">u</text>
    </g>
    <text x="260" y="110" class="sublabel">Rough incline (μ)</text>
  </svg>`,

  // Q98: Sphere in V-shaped trough with horizontal base A and inclined wall B at 30 deg
  98: `
  ${SVG_HEADER(500, 280)}
    <!-- Horizontal floor A -->
    <line x1="100" y1="210" x2="420" y2="210" class="surface" />
    <text x="390" y="230" class="label">A</text>

    <!-- Wall B inclined at 30 deg to horizontal -->
    <line x1="120" y1="210" x2="340" y2="83" class="surface" />
    <text x="350" y="80" class="label">B</text>

    <!-- Angle 30 deg -->
    <path d="M 180 210 A 60 60 0 0 0 172 180" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="200" y="195" class="label">30°</text>

    <!-- Sphere resting in trough -->
    <circle cx="270" cy="160" r="50" fill="#eff6ff" stroke="#0f172a" stroke-width="2.5" />
    <circle cx="270" cy="160" r="3" fill="#0f172a" />
    <text x="270" y="160" class="label">10 N</text>
  </svg>`,

  // Q100: Conical pendulum with angle 60 deg to vertical
  100: `
  ${SVG_HEADER(480, 320)}
    <!-- Ceiling -->
    <line x1="160" y1="40" x2="320" y2="40" class="surface" />
    <line x1="180" y1="40" x2="200" y2="25" class="hatch" />
    <line x1="220" y1="40" x2="240" y2="25" class="hatch" />
    <line x1="260" y1="40" x2="280" y2="25" class="hatch" />

    <!-- Center vertical dashed axis -->
    <line x1="240" y1="40" x2="240" y2="230" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5" />

    <!-- String from ceiling to bob at angle 60 deg -->
    <line x1="240" y1="40" x2="160" y2="220" class="string-line" />
    <!-- Bob -->
    <circle cx="160" cy="220" r="14" fill="#3b82f6" stroke="#0f172a" stroke-width="2" />
    <text x="135" y="220" class="label">m</text>

    <!-- Angle 60 deg with vertical -->
    <path d="M 240 100 A 60 60 0 0 1 215 92" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="225" y="115" class="label">60°</text>

    <!-- Horizontal circular path (ellipse) -->
    <ellipse cx="240" cy="220" rx="80" ry="20" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />
  </svg>`,

  // Q102: Smooth wedge of 60 deg with block m, pushed by F
  102: `
  ${SVG_HEADER(500, 260)}
    <!-- Ground -->
    <line x1="80" y1="210" x2="420" y2="210" class="surface" />

    <!-- Wedge with 60 deg angle -->
    <polygon points="180,210 380,210 180,60" fill="#f8fafc" stroke="#0f172a" stroke-width="2.2" />

    <!-- 60 deg angle at bottom right -->
    <path d="M 330 210 A 50 50 0 0 1 345 180" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="320" y="195" class="label">60°</text>

    <!-- Block m on incline -->
    <g transform="translate(260, 120) rotate(-37)">
      <rect x="-25" y="-30" width="50" height="30" class="block-amber" />
      <text x="0" y="-15" class="label">m</text>
    </g>

    <!-- Force F on left vertical face of wedge -->
    <line x1="100" y1="135" x2="175" y2="135" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="135" y="115" class="label" fill="#dc2626">F</text>
  </svg>`,

  // Q103: Ladder resting against smooth vertical wall and rough floor
  103: `
  ${SVG_HEADER(480, 280)}
    <!-- Smooth vertical wall -->
    <line x1="160" y1="40" x2="160" y2="230" class="surface" />
    <text x="110" y="120" class="sublabel">Smooth wall</text>

    <!-- Rough horizontal floor -->
    <line x1="160" y1="230" x2="400" y2="230" class="surface" />
    <line x1="180" y1="230" x2="160" y2="250" class="hatch" />
    <line x1="220" y1="230" x2="200" y2="250" class="hatch" />
    <line x1="260" y1="230" x2="240" y2="250" class="hatch" />
    <line x1="300" y1="230" x2="280" y2="250" class="hatch" />
    <text x="340" y="255" class="sublabel">Rough floor (μ)</text>

    <!-- Ladder -->
    <line x1="165" y1="70" x2="300" y2="225" stroke="#94a3b8" stroke-width="8" stroke-linecap="round" />
    <line x1="165" y1="70" x2="300" y2="225" stroke="#0f172a" stroke-width="2" />
    <text x="260" y="130" class="label">Ladder</text>
  </svg>`,

  // Q105: Vertical uniform bar of mass M and length l pulled upward by force F
  105: `
  ${SVG_HEADER(460, 320)}
    <!-- Force F on top -->
    <line x1="230" y1="70" x2="230" y2="25" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="250" y="40" class="label" fill="#dc2626">F</text>

    <!-- Bar of mass M, length l -->
    <rect x="215" y="70" width="30" height="180" fill="#f1f5f9" stroke="#0f172a" stroke-width="2" rx="2" />
    <text x="270" y="120" class="label">M</text>

    <!-- Cut line at distance x from bottom -->
    <line x1="205" y1="180" x2="255" y2="180" stroke="#dc2626" stroke-width="2" stroke-dasharray="3,3" />

    <!-- Dimension x -->
    <line x1="270" y1="250" x2="270" y2="180" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" marker-start="url(#arrow)" />
    <text x="285" y="215" class="sublabel">x</text>

    <!-- Dimension l -->
    <line x1="180" y1="250" x2="180" y2="70" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" marker-start="url(#arrow)" />
    <text x="165" y="160" class="label">l</text>
  </svg>`,

  // Q107: Block A (10kg) on 37 deg incline with pulley to hanging block B
  107: `
  ${SVG_HEADER(520, 300)}
    <!-- Base -->
    <line x1="80" y1="230" x2="420" y2="230" class="surface" />
    <!-- Incline 37 deg -->
    <line x1="80" y1="230" x2="360" y2="70" class="surface" />
    <line x1="360" y1="70" x2="360" y2="230" class="surface" />

    <text x="140" y="215" class="label">37°</text>

    <!-- Pulley at apex -->
    <circle cx="360" cy="65" r="14" class="pulley" />

    <!-- Block A on incline -->
    <g transform="translate(220, 150) rotate(-29.7)">
      <rect x="-30" y="-35" width="60" height="35" class="block" />
      <text x="0" y="-17" class="label">10 kg</text>
    </g>
    <text x="210" y="90" class="sublabel">A (μ = 0.5)</text>

    <!-- String from A to pulley to hanging B -->
    <line x1="235" y1="135" x2="355" y2="53" class="string-line" />
    <line x1="374" y1="65" x2="374" y2="160" class="string-line" />

    <!-- Hanging Block B -->
    <rect x="354" y="160" width="40" height="40" class="block-amber" />
    <text x="374" y="180" class="label">B</text>
  </svg>`,

  // Q109: Pulley with 3m on left and m with downward force F = mg on right
  109: `
  ${SVG_HEADER(480, 320)}
    <!-- Ceiling & Pulley -->
    <line x1="180" y1="40" x2="300" y2="40" class="surface" />
    <circle cx="240" cy="80" r="18" class="pulley" />
    <line x1="240" y1="40" x2="240" y2="80" stroke="#0f172a" stroke-width="2" />

    <!-- Left side: 3m -->
    <line x1="222" y1="80" x2="222" y2="200" class="string-line" />
    <rect x="197" y="200" width="50" height="45" class="block" />
    <text x="222" y="222" class="label">3m</text>

    <!-- Right side: mass m with downward force F = mg -->
    <line x1="258" y1="80" x2="258" y2="150" class="string-line" />
    <text x="275" y="115" class="sublabel">T</text>
    <rect x="238" y="150" width="40" height="35" class="block-amber" />
    <text x="258" y="167" class="label">m</text>

    <!-- Downward force F = mg -->
    <line x1="258" y1="185" x2="258" y2="235" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="258" y="255" class="label" fill="#dc2626">F = mg</text>
  </svg>`,

  // Q111: Pulley with spring balance and 2kg on left, 5kg on right
  111: `
  ${SVG_HEADER(480, 340)}
    <!-- Ceiling & Pulley -->
    <line x1="180" y1="40" x2="300" y2="40" class="surface" />
    <circle cx="240" cy="80" r="18" class="pulley" />
    <line x1="240" y1="40" x2="240" y2="80" stroke="#0f172a" stroke-width="2" />

    <!-- Left string with Spring Balance -->
    <line x1="222" y1="80" x2="222" y2="120" class="string-line" />
    <rect x="210" y="120" width="24" height="70" fill="#f1f5f9" stroke="#0f172a" stroke-width="2" rx="3" />
    <!-- Spring coils inside -->
    <line x1="214" y1="135" x2="230" y2="135" stroke="#0f172a" stroke-width="1.5" />
    <line x1="214" y1="145" x2="230" y2="145" stroke="#0f172a" stroke-width="1.5" />
    <line x1="214" y1="155" x2="230" y2="155" stroke="#0f172a" stroke-width="1.5" />
    <line x1="214" y1="165" x2="230" y2="165" stroke="#0f172a" stroke-width="1.5" />
    <line x1="214" y1="175" x2="230" y2="175" stroke="#0f172a" stroke-width="1.5" />

    <line x1="222" y1="190" x2="222" y2="230" class="string-line" />
    <rect x="202" y="230" width="40" height="35" class="block" />
    <text x="222" y="247" class="label">2 kg</text>

    <!-- Right side: 5kg -->
    <line x1="258" y1="80" x2="258" y2="200" class="string-line" />
    <rect x="233" y="200" width="50" height="45" class="block-amber" />
    <text x="258" y="222" class="label">5 kg</text>
  </svg>`
};

async function generateAll() {
  const mapping = {};
  console.log(`Starting diagram generation for ${Object.keys(DIAGRAMS).length} diagrams...`);

  for (const [qNum, svgString] of Object.entries(DIAGRAMS)) {
    const filename = `lom_q${qNum}.png`;
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
            folder: 'edvedum_laws_of_motion',
            public_id: `lom_q${qNum}`,
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
        local_url: `/uploads/laws_of_motion/${filename}`,
        public_id: uploadRes.public_id,
      };
    } catch (uploadErr) {
      console.warn(`Cloudinary upload failed for Q${qNum}, using local URL:`, uploadErr.message);
      mapping[qNum] = {
        cloudinary_url: `/uploads/laws_of_motion/${filename}`,
        local_url: `/uploads/laws_of_motion/${filename}`,
      };
    }
  }

  const mapPath = path.resolve(__dirname, 'laws_of_motion_diagrams.json');
  fs.writeFileSync(mapPath, JSON.stringify(mapping, null, 2));
  console.log(`All diagrams generated and saved to ${mapPath}`);
}

generateAll().catch(err => {
  console.error('Fatal diagram generation error:', err);
  process.exit(1);
});
