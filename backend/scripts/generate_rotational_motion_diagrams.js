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
    <marker id="arrow-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669"/>
    </marker>
  </defs>
`;

export const DIAGRAMS = {
  // Q1: Coordinate grid with four masses
  1: `
  ${SVG_HEADER(540, 360)}
    <!-- Coordinate axes -->
    <line x1="60" y1="200" x2="480" y2="200" class="axis" marker-end="url(#arrow)"/>
    <line x1="260" y1="340" x2="260" y2="40" class="axis" marker-end="url(#arrow)"/>
    <text x="495" y="200" class="label">x(m)</text>
    <text x="260" y="25" class="label">y(m)</text>

    <!-- Grid lines -->
    <!-- X ticks: -4,-3,-2,-1, 1, 2, 3, 4 with scale 35px per unit -->
    <!-- Origin at (260, 200) -->
    ${[-4,-3,-2,-1,1,2,3,4].map(x => `
      <line x1="${260 + x * 35}" y1="195" x2="${260 + x * 35}" y2="205" stroke="#64748b" stroke-width="1.5"/>
      <text x="${260 + x * 35}" y="218" class="sublabel" font-size="11">${x}</text>
    `).join('')}
    ${[-3,-2,-1,1,2,3,4,5].map(y => `
      <line x1="255" y1="${200 - y * 25}" x2="265" y2="${200 - y * 25}" stroke="#64748b" stroke-width="1.5"/>
      <text x="245" y="${200 - y * 25}" class="sublabel" font-size="11">${y}</text>
    `).join('')}

    <!-- Mass 1: 5 kg at (-3, 5) -> (260 - 105 = 155, 200 - 125 = 75) -->
    <line x1="155" y1="200" x2="155" y2="75" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <line x1="260" y1="75" x2="155" y2="75" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <circle cx="155" cy="75" r="9" fill="#2563eb" stroke="#1d4ed8" stroke-width="2"/>
    <text x="155" y="55" class="label" fill="#2563eb">m&#8323; = 5 kg</text>

    <!-- Mass 2: 4 kg at (3, 1) -> (260 + 105 = 365, 200 - 25 = 175) -->
    <line x1="365" y1="200" x2="365" y2="175" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <line x1="260" y1="175" x2="365" y2="175" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <circle cx="365" cy="175" r="8" fill="#d97706" stroke="#b45309" stroke-width="2"/>
    <text x="395" y="155" class="label" fill="#d97706">m&#8324; = 4 kg</text>

    <!-- Mass 3: 2 kg at (2, -2) -> (260 + 70 = 330, 200 + 50 = 250) -->
    <line x1="330" y1="200" x2="330" y2="250" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <line x1="260" y1="250" x2="330" y2="250" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <circle cx="330" cy="250" r="7" fill="#059669" stroke="#047857" stroke-width="2"/>
    <text x="365" y="270" class="label" fill="#059669">m&#8322; = 2 kg</text>

    <!-- Mass 4: 1 kg at (-2, -3) -> (260 - 70 = 190, 200 + 75 = 275) -->
    <line x1="190" y1="200" x2="190" y2="275" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <line x1="260" y1="275" x2="190" y2="275" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <circle cx="190" cy="275" r="6" fill="#dc2626" stroke="#b91c1c" stroke-width="2"/>
    <text x="145" y="295" class="label" fill="#dc2626">m&#8321; = 1 kg</text>
  </svg>
  `,

  // Q2: Circular lamina with circular hole
  2: `
  ${SVG_HEADER(480, 320)}
    <!-- Axes -->
    <line x1="40" y1="160" x2="440" y2="160" class="axis" marker-end="url(#arrow)"/>
    <line x1="200" y1="300" x2="200" y2="30" class="axis" marker-end="url(#arrow)"/>
    <text x="450" y="160" class="label">X</text>
    <text x="200" y="18" class="label">Y</text>

    <!-- Main disc of radius a (110px) centered at (200, 160) -->
    <circle cx="200" cy="160" r="110" fill="#94a3b8" fill-opacity="0.4" stroke="#0f172a" stroke-width="2.5"/>
    
    <!-- Cut circular cavity of radius a/2 (55px) centered at (255, 160) -->
    <circle cx="255" cy="160" r="55" fill="#ffffff" stroke="#0f172a" stroke-width="2.2" stroke-dasharray="4,3"/>

    <!-- Labels and markers -->
    <circle cx="200" cy="160" r="3" fill="#0f172a"/>
    <text x="185" y="175" class="sublabel">O</text>

    <line x1="200" y1="160" x2="310" y2="160" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="255" y="145" class="label">a</text>

    <line x1="255" y1="160" x2="255" y2="215" stroke="#2563eb" stroke-width="1.5" marker-end="url(#arrow-blue)"/>
    <text x="280" y="195" class="sublabel" fill="#2563eb">a/2</text>
  </svg>
  `,

  // Q6: Equilateral triangle with forces along sides
  6: `
  ${SVG_HEADER(440, 320)}
    <!-- Equilateral triangle vertices: A(220, 50), B(90, 260), C(350, 260) -->
    <!-- Centroid O at (220, 190) -->
    <polygon points="220,50 90,260 350,260" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>

    <!-- Centroid O -->
    <circle cx="220" cy="190" r="4" fill="#0f172a"/>
    <text x="220" y="172" class="label">O</text>

    <!-- Vertices labels -->
    <text x="220" y="35" class="label">A</text>
    <text x="75" y="275" class="label">B</text>
    <text x="365" y="275" class="label">C</text>

    <!-- Force F1 along AB (from A towards B) -->
    <line x1="180" y1="115" x2="135" y2="187" class="force-arrow" marker-end="url(#arrow-red)"/>
    <text x="130" y="140" class="label" fill="#dc2626">F&#8321;</text>

    <!-- Force F2 along BC (from B towards C) -->
    <line x1="180" y1="260" x2="260" y2="260" class="force-arrow" marker-end="url(#arrow-red)"/>
    <text x="220" y="285" class="label" fill="#dc2626">F&#8322;</text>

    <!-- Force F3 along AC (from C towards A or A towards C) -->
    <line x1="260" y1="115" x2="305" y2="187" class="force-arrow" marker-end="url(#arrow-red)"/>
    <text x="315" y="140" class="label" fill="#dc2626">F&#8323;</text>
  </svg>
  `,

  // Q9: Light rod on fulcrum with three masses
  9: `
  ${SVG_HEADER(540, 260)}
    <!-- Fulcrum triangle at x=220, y=140 -->
    <polygon points="220,135 205,175 235,175" fill="#64748b" stroke="#0f172a" stroke-width="2"/>
    <!-- Floor hatch -->
    <line x1="180" y1="175" x2="260" y2="175" class="surface"/>

    <!-- Light rod horizontal at y=130 from x=60 to x=460 -->
    <rect x="60" y="125" width="400" height="10" rx="3" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>

    <!-- Mass 12 kg at left end (x=80) -->
    <rect x="65" y="90" width="40" height="35" rx="3" class="block-blue"/>
    <text x="85" y="108" class="label">12kg</text>

    <!-- Mass m at x=300 (distance l/2 = 80px from fulcrum) -->
    <rect x="285" y="95" width="30" height="30" rx="3" class="block"/>
    <text x="300" y="110" class="label">m</text>

    <!-- Mass 3 kg at x=440 (distance l = 160px from m) -->
    <rect x="425" y="95" width="30" height="30" rx="3" class="block-amber"/>
    <text x="440" y="110" class="label">3kg</text>

    <!-- Dimensions -->
    <!-- Fulcrum at x=220 -->
    <!-- Left distance l (from 85 to 220) -->
    <line x1="85" y1="155" x2="220" y2="155" class="dim-line"/>
    <text x="150" y="150" class="label">l</text>

    <!-- Distance l/2 (from 220 to 300) -->
    <line x1="220" y1="155" x2="300" y2="155" class="dim-line"/>
    <text x="260" y="150" class="label">l/2</text>

    <!-- Distance l (from 300 to 440) -->
    <line x1="300" y1="155" x2="440" y2="155" class="dim-line"/>
    <text x="370" y="150" class="label">l</text>
  </svg>
  `,

  // Q10: Ladder on smooth vertical wall and rough floor
  10: `
  ${SVG_HEADER(440, 320)}
    <!-- Vertical Wall at x=100 from y=40 to y=270 -->
    <line x1="100" y1="40" x2="100" y2="270" class="surface"/>
    ${[50, 80, 110, 140, 170, 200, 230, 260].map(y => `
      <line x1="85" y1="${y+10}" x2="100" y2="${y}" class="hatch"/>
    `).join('')}
    <text x="65" y="90" class="sublabel">smooth</text>

    <!-- Horizontal Floor at y=270 from x=80 to x=380 -->
    <line x1="80" y1="270" x2="380" y2="270" class="surface"/>
    ${[100, 130, 160, 190, 220, 250, 280, 310, 340, 370].map(x => `
      <line x1="${x}" y1="270" x2="${x-12}" y2="285" class="hatch"/>
    `).join('')}
    <text x="320" y="295" class="sublabel">rough</text>

    <!-- Ladder from (100, 70) to (300, 270) -->
    <line x1="100" y1="70" x2="300" y2="270" stroke="#0f172a" stroke-width="7" stroke-linecap="round"/>
    <line x1="100" y1="70" x2="300" y2="270" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>

    <!-- Angle theta at (300, 270) -->
    <path d="M 255 270 A 45 45 0 0 1 268 238" fill="none" stroke="#0f172a" stroke-width="1.8"/>
    <text x="245" y="255" class="label">&#952;</text>

    <!-- Normal force from wall -->
    <line x1="100" y1="70" x2="160" y2="70" class="force-arrow" marker-end="url(#arrow-red)"/>
    <text x="180" y="70" class="label" fill="#dc2626">N</text>

    <!-- CM and weight Mg -->
    <circle cx="200" cy="170" r="4" fill="#0f172a"/>
    <line x1="200" y1="170" x2="200" y2="230" class="force-arrow" marker-end="url(#arrow-red)"/>
    <text x="220" y="215" class="label" fill="#dc2626">Mg</text>
  </svg>
  `,

  // Q11: Variation of moment of inertia I with theta
  11: `
  ${SVG_HEADER(540, 260)}
    <!-- 4 Graphs showing variation of I with theta -->
    <!-- (1) Increasing curve -->
    <g transform="translate(30, 30)">
      <text x="50" y="0" class="label">(1)</text>
      <line x1="20" y1="90" x2="100" y2="90" class="axis" marker-end="url(#arrow)"/>
      <line x1="20" y1="90" x2="20" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="10" y="20" class="sublabel">I</text>
      <text x="105" y="93" class="sublabel">&#952;</text>
      <text x="10" y="65" class="sublabel">I&#8320;</text>
      <path d="M 20 65 Q 50 63 90 35" fill="none" stroke="#2563eb" stroke-width="2.2"/>
    </g>

    <!-- (2) Parabola open down -->
    <g transform="translate(160, 30)">
      <text x="50" y="0" class="label">(2)</text>
      <line x1="20" y1="90" x2="100" y2="90" class="axis" marker-end="url(#arrow)"/>
      <line x1="20" y1="90" x2="20" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="10" y="20" class="sublabel">I</text>
      <text x="105" y="93" class="sublabel">&#952;</text>
      <path d="M 20 65 Q 55 25 90 65" fill="none" stroke="#2563eb" stroke-width="2.2"/>
    </g>

    <!-- (3) Flat horizontal constant line I = I0 (CORRECT) -->
    <g transform="translate(290, 30)">
      <text x="50" y="0" class="label">(3)</text>
      <line x1="20" y1="90" x2="100" y2="90" class="axis" marker-end="url(#arrow)"/>
      <line x1="20" y1="90" x2="20" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="10" y="20" class="sublabel">I</text>
      <text x="105" y="93" class="sublabel">&#952;</text>
      <text x="10" y="50" class="sublabel">I&#8320;</text>
      <line x1="20" y1="50" x2="95" y2="50" stroke="#059669" stroke-width="2.5"/>
    </g>

    <!-- (4) U-shaped curve -->
    <g transform="translate(420, 30)">
      <text x="50" y="0" class="label">(4)</text>
      <line x1="20" y1="90" x2="100" y2="90" class="axis" marker-end="url(#arrow)"/>
      <line x1="20" y1="90" x2="20" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="10" y="20" class="sublabel">I</text>
      <text x="105" y="93" class="sublabel">&#952;</text>
      <path d="M 20 40 Q 55 80 90 40" fill="none" stroke="#2563eb" stroke-width="2.2"/>
    </g>
  </svg>
  `,

  // Q12: L-joint of two rods about P
  12: `
  ${SVG_HEADER(440, 260)}
    <!-- Horizontal rod of length l from (140, 100) to (300, 100) -->
    <line x1="140" y1="100" x2="300" y2="100" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
    <text x="220" y="80" class="label">M, l</text>

    <!-- Vertical rod of length l from (140, 100) down to (140, 220) -->
    <line x1="140" y1="100" x2="140" y2="220" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
    <text x="105" y="165" class="label">M, l</text>

    <!-- Point P at right end (300, 100) -->
    <circle cx="300" cy="100" r="5" fill="#dc2626"/>
    <text x="325" y="100" class="label" fill="#dc2626">P</text>
  </svg>
  `,

  // Q14: Sphere of radius R with cavity R/2
  14: `
  ${SVG_HEADER(440, 320)}
    <!-- Solid sphere of radius R=110 centered at (220, 160) -->
    <circle cx="220" cy="160" r="110" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="220" cy="160" r="3" fill="#0f172a"/>

    <!-- Cavity of radius R/2=55 centered at (275, 160) -->
    <circle cx="275" cy="160" r="55" fill="#ffffff" stroke="#0f172a" stroke-width="2.2" stroke-dasharray="4,3"/>
    <circle cx="275" cy="160" r="3" fill="#0f172a"/>

    <!-- Radius arrows -->
    <line x1="220" y1="160" x2="220" y2="50" stroke="#0f172a" stroke-width="1.8" marker-end="url(#arrow)"/>
    <text x="235" y="105" class="label">R</text>

    <line x1="275" y1="160" x2="275" y2="215" stroke="#2563eb" stroke-width="1.8" marker-end="url(#arrow-blue)"/>
    <text x="300" y="190" class="label" fill="#2563eb">R/2</text>
  </svg>
  `,

  // Q17: Cube sliding on smooth floor hitting small ridge O
  17: `
  ${SVG_HEADER(480, 240)}
    <!-- Floor -->
    <line x1="40" y1="170" x2="440" y2="170" class="surface"/>
    ${[60, 100, 140, 180, 220, 260, 300, 340, 380, 420].map(x => `
      <line x1="${x}" y1="170" x2="${x-15}" y2="185" class="hatch"/>
    `).join('')}

    <!-- Cube of side a=70 at x=140 to x=210, y=100 to y=170 -->
    <rect x="140" y="100" width="70" height="70" class="block-blue"/>
    <text x="175" y="85" class="label">a</text>

    <!-- Velocity v -->
    <line x1="210" y1="135" x2="270" y2="135" class="vel-arrow" marker-end="url(#arrow-blue)"/>
    <text x="285" y="135" class="label" fill="#2563eb">v</text>

    <!-- Ridge at O at x=280, y=170 -->
    <circle cx="280" cy="170" r="5" fill="#dc2626"/>
    <text x="280" y="195" class="label" fill="#dc2626">O</text>
  </svg>
  `,

  // Q18: Cube held against rough vertical wall by force F
  18: `
  ${SVG_HEADER(440, 280)}
    <!-- Wall on left at x=140 -->
    <line x1="140" y1="40" x2="140" y2="240" class="surface"/>
    ${[50, 80, 110, 140, 170, 200, 230].map(y => `
      <line x1="125" y1="${y+10}" x2="140" y2="${y}" class="hatch"/>
    `).join('')}

    <!-- Cube of side 2a=80 from x=140 to x=220, y=80 to y=160 -->
    <rect x="140" y="80" width="80" height="80" class="block"/>
    <text x="180" y="65" class="label">2a</text>

    <!-- Applied Force F from right at height a (y=120) -->
    <line x1="280" y1="120" x2="220" y2="120" class="force-arrow" marker-end="url(#arrow-red)"/>
    <text x="300" y="120" class="label" fill="#dc2626">F</text>
    <text x="195" y="135" class="sublabel">a</text>
  </svg>
  `,

  // Q19: Wire loop of length L bent into circular loop with axis XX'
  19: `
  ${SVG_HEADER(440, 280)}
    <!-- Tangent Axis XX' at y=80 -->
    <line x1="60" y1="80" x2="380" y2="80" stroke="#0f172a" stroke-width="2.5" stroke-dasharray="6,4"/>
    <text x="50" y="80" class="label">X</text>
    <text x="395" y="80" class="label">X'</text>

    <!-- Circular loop centered at (220, 160), radius 80 touching axis at (220, 80) -->
    <circle cx="220" cy="160" r="80" fill="none" stroke="#2563eb" stroke-width="3"/>
    <circle cx="220" cy="160" r="4" fill="#0f172a"/>
    <text x="235" y="165" class="label">O</text>

    <!-- Radius line to tangent -->
    <line x1="220" y1="160" x2="220" y2="80" stroke="#64748b" stroke-width="1.8"/>
    <!-- 90 deg symbol -->
    <path d="M 220 95 L 205 95 L 205 80" fill="none" stroke="#64748b" stroke-width="1.5"/>
    <text x="190" y="95" class="sublabel">90&#176;</text>
  </svg>
  `,

  // Q20: Cube on rough floor with horizontal force F at top
  20: `
  ${SVG_HEADER(440, 260)}
    <!-- Floor -->
    <line x1="60" y1="180" x2="380" y2="180" class="surface"/>
    ${[80, 120, 160, 200, 240, 280, 320, 360].map(x => `
      <line x1="${x}" y1="180" x2="${x-15}" y2="195" class="hatch"/>
    `).join('')}

    <!-- Cube of side a=70 from x=160 to x=230, y=110 to y=180 -->
    <rect x="160" y="110" width="70" height="70" class="block-blue"/>
    <text x="245" y="145" class="label">a</text>

    <!-- Applied Force F at top face -->
    <line x1="100" y1="110" x2="160" y2="110" class="force-arrow" marker-end="url(#arrow-red)"/>
    <text x="85" y="110" class="label" fill="#dc2626">F</text>
  </svg>
  `,

  // Q22: Atwood machine with 2kg and 1kg masses
  22: `
  ${SVG_HEADER(400, 320)}
    <!-- Ceiling -->
    <line x1="140" y1="40" x2="260" y2="40" class="surface"/>
    ${[150, 170, 190, 210, 230, 250].map(x => `
      <line x1="${x}" y1="40" x2="${x+10}" y2="25" class="hatch"/>
    `).join('')}

    <!-- Pulley suspended at (200, 90) -->
    <line x1="200" y1="40" x2="200" y2="90" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="200" cy="90" r="30" class="pulley"/>
    <circle cx="200" cy="90" r="4" class="pulley-center"/>

    <!-- Left string and 2kg mass -->
    <line x1="170" y1="90" x2="170" y2="180" class="string-line"/>
    <rect x="150" y="180" width="40" height="40" class="block-blue"/>
    <text x="170" y="200" class="label">2kg</text>

    <!-- Right string and 1kg mass -->
    <line x1="230" y1="90" x2="230" y2="220" class="string-line"/>
    <rect x="215" y="220" width="30" height="30" class="block"/>
    <text x="230" y="235" class="label">1kg</text>
  </svg>
  `,

  // Q23: Merry-go-round with child jumping off
  23: `
  ${SVG_HEADER(440, 280)}
    <!-- Rotating disc -->
    <circle cx="200" cy="140" r="80" fill="#f1f5f9" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="200" cy="140" r="4" fill="#0f172a"/>

    <!-- Rotation arrow omega -->
    <path d="M 180 90 A 50 50 0 0 1 230 100" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
    <text x="210" y="75" class="label" fill="#2563eb">&#969;</text>

    <!-- Tangential jump velocity v at edge (x=280, y=140) -->
    <line x1="280" y1="140" x2="280" y2="60" class="vel-arrow" marker-end="url(#arrow-blue)"/>
    <text x="295" y="80" class="label" fill="#2563eb">v</text>

    <!-- Child dot at edge -->
    <circle cx="280" cy="140" r="5" fill="#dc2626"/>
    <text x="260" y="150" class="sublabel" fill="#dc2626">m</text>
  </svg>
  `,

  // Q26: Semicircular disc of radius R about diameter AB
  26: `
  ${SVG_HEADER(440, 280)}
    <!-- Vertical axis AB at x=180 -->
    <line x1="180" y1="30" x2="180" y2="250" class="axis"/>
    <path d="M 170 50 A 15 15 0 1 1 190 50" fill="none" stroke="#0f172a" stroke-width="2" marker-end="url(#arrow)"/>
    <text x="195" y="60" class="label">A</text>
    <text x="195" y="240" class="label">B</text>

    <!-- Semicircular disc of radius 80 to the left -->
    <path d="M 180 60 A 80 80 0 0 0 180 220 Z" fill="#94a3b8" fill-opacity="0.4" stroke="#0f172a" stroke-width="2.5"/>
    <text x="130" y="145" class="label">m</text>
  </svg>
  `,

  // Q27: Cube sliding down inclined plane
  27: `
  ${SVG_HEADER(480, 280)}
    <!-- Incline at angle theta -->
    <polygon points="80,220 380,220 80,70" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Floor hatch -->
    ${[100, 140, 180, 220, 260, 300, 340, 380].map(x => `
      <line x1="${x}" y1="220" x2="${x-12}" y2="235" class="hatch"/>
    `).join('')}

    <!-- Angle theta at (380, 220) -->
    <path d="M 330 220 A 50 50 0 0 1 340 195" fill="none" stroke="#0f172a" stroke-width="1.8"/>
    <text x="315" y="210" class="label">&#952;</text>

    <!-- Block on incline sliding down with constant speed u -->
    <!-- Incline slope: dy/dx = -150/300 = -0.5, angle ~ 26.5 deg -->
    <g transform="translate(190, 115) rotate(-26.5)">
      <rect x="-30" y="-35" width="60" height="35" class="block-blue"/>
      <text x="0" y="-17" class="label">m</text>
      <line x1="-30" y1="-17" x2="-65" y2="-17" class="vel-arrow" marker-end="url(#arrow-blue)"/>
      <text x="-80" y="-17" class="label" fill="#2563eb">u</text>
    </g>
  </svg>
  `,

  // Q31: Plank of length 10m on smooth floor with person
  31: `
  ${SVG_HEADER(500, 240)}
    <!-- Floor -->
    <line x1="50" y1="180" x2="450" y2="180" class="surface"/>
    ${[70, 110, 150, 190, 230, 270, 310, 350, 390, 430].map(x => `
      <line x1="${x}" y1="180" x2="${x-15}" y2="195" class="hatch"/>
    `).join('')}

    <!-- Wooden plank: length 260px (10m) from x=120 to x=380, height 18px -->
    <rect x="120" y="160" width="260" height="18" rx="2" fill="#d97706" fill-opacity="0.3" stroke="#b45309" stroke-width="2"/>
    <text x="250" y="170" class="sublabel" font-weight="600">Plank 20kg</text>

    <!-- Person at left end (x=150) -->
    <circle cx="150" cy="115" r="8" fill="#0f172a"/>
    <line x1="150" y1="123" x2="150" y2="145" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="140" y1="133" x2="160" y2="133" stroke="#0f172a" stroke-width="2"/>
    <line x1="150" y1="145" x2="142" y2="160" stroke="#0f172a" stroke-width="2"/>
    <line x1="150" y1="145" x2="158" y2="160" stroke="#0f172a" stroke-width="2"/>
    <text x="150" y="95" class="sublabel">Man 60kg</text>

    <!-- Dimension 10m -->
    <line x1="120" y1="210" x2="380" y2="210" class="dim-line"/>
    <text x="250" y="225" class="label">10m</text>
  </svg>
  `,

  // Q34: Table with circular motion of mass on string pulled through hole
  34: `
  ${SVG_HEADER(500, 320)}
    <!-- Table top (perspective parallelogram) -->
    <polygon points="80,180 180,80 420,80 320,180" fill="#f8fafc" stroke="#0f172a" stroke-width="2.2"/>
    <!-- Table legs -->
    <line x1="80" y1="180" x2="80" y2="250" stroke="#0f172a" stroke-width="3"/>
    <line x1="320" y1="180" x2="320" y2="250" stroke="#0f172a" stroke-width="3"/>
    <line x1="420" y1="80" x2="420" y2="160" stroke="#0f172a" stroke-width="2.5"/>

    <!-- Central hole at (250, 130) -->
    <ellipse cx="250" cy="130" rx="60" ry="25" fill="none" stroke="#94a3b8" stroke-dasharray="4,4"/>
    <circle cx="250" cy="130" r="4" fill="#0f172a"/>

    <!-- String from hole down below table -->
    <line x1="250" y1="130" x2="250" y2="230" class="string-line" stroke="#dc2626"/>
    <line x1="250" y1="230" x2="250" y2="260" class="force-arrow" marker-end="url(#arrow-red)"/>
    <text x="270" y="245" class="label" fill="#dc2626">T</text>

    <!-- Mass m on table moving in circle of radius R0 -->
    <line x1="250" y1="130" x2="310" y2="130" class="string-line"/>
    <circle cx="310" cy="130" r="7" fill="#2563eb"/>
    <text x="310" y="115" class="label">m</text>
    <text x="280" y="122" class="sublabel">R&#8320;</text>

    <!-- Velocity arrow v0 -->
    <line x1="310" y1="130" x2="325" y2="160" class="vel-arrow" marker-end="url(#arrow-blue)"/>
    <text x="345" y="155" class="label" fill="#2563eb">v&#8320;</text>
  </svg>
  `,

  // Q43: Cube on rough fixed inclined plane
  43: `
  ${SVG_HEADER(480, 280)}
    <!-- Inclined plane -->
    <polygon points="60,220 360,220 60,80" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>
    ${[80, 120, 160, 200, 240, 280, 320, 360].map(x => `
      <line x1="${x}" y1="220" x2="${x-12}" y2="235" class="hatch"/>
    `).join('')}

    <!-- Angle theta -->
    <path d="M 310 220 A 50 50 0 0 1 320 195" fill="none" stroke="#0f172a" stroke-width="1.8"/>
    <text x="295" y="210" class="label">&#952;</text>

    <!-- Cubical block on incline -->
    <g transform="translate(170, 128) rotate(-25)">
      <rect x="-30" y="-35" width="60" height="35" class="block"/>
      <text x="0" y="-17" class="label">m</text>
    </g>
  </svg>
  `,

  // Q44: Three uniform solid spheres along x-axis with y-axis
  44: `
  ${SVG_HEADER(520, 280)}
    <!-- X and Y axes -->
    <line x1="40" y1="140" x2="480" y2="140" class="axis" marker-end="url(#arrow)"/>
    <line x1="260" y1="260" x2="260" y2="30" class="axis" marker-end="url(#arrow)"/>
    <text x="495" y="140" class="label">x</text>
    <text x="260" y="18" class="label">y</text>

    <!-- Three solid spheres of radius R=50 -->
    <!-- Middle sphere at origin (260, 140) -->
    <circle cx="260" cy="140" r="50" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="260" cy="140" r="3" fill="#0f172a"/>

    <!-- Left sphere at x = -2R = 160 -->
    <circle cx="160" cy="140" r="50" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="160" cy="140" r="3" fill="#0f172a"/>

    <!-- Right sphere at x = +2R = 360 -->
    <circle cx="360" cy="140" r="50" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="360" cy="140" r="3" fill="#0f172a"/>

    <text x="260" y="140" class="label">M, R</text>
    <text x="160" y="140" class="label">M, R</text>
    <text x="360" y="140" class="label">M, R</text>
  </svg>
  `,

  // Q45: Quarter sector of disc of radius R with vertical axis through origin
  45: `
  ${SVG_HEADER(440, 300)}
    <!-- Vertical rotation axis at x=140 -->
    <line x1="140" y1="30" x2="140" y2="270" class="axis"/>
    <path d="M 130 50 A 15 15 0 1 1 150 50" fill="none" stroke="#0f172a" stroke-width="2" marker-end="url(#arrow)"/>

    <!-- Quarter sector from vertex (140, 160), radius R=110 -->
    <path d="M 140 160 L 250 160 A 110 110 0 0 1 140 270 Z" fill="#94a3b8" fill-opacity="0.5" stroke="#0f172a" stroke-width="2.5"/>
    <text x="190" y="200" class="label">M, R</text>
  </svg>
  `,

  // Q49: Block of mass M, length L, height H on incline
  49: `
  ${SVG_HEADER(480, 280)}
    <!-- Incline at angle alpha -->
    <polygon points="60,220 380,220 60,70" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>
    ${[80, 120, 160, 200, 240, 280, 320, 360].map(x => `
      <line x1="${x}" y1="220" x2="${x-12}" y2="235" class="hatch"/>
    `).join('')}

    <!-- Angle alpha -->
    <path d="M 330 220 A 50 50 0 0 1 340 195" fill="none" stroke="#0f172a" stroke-width="1.8"/>
    <text x="315" y="210" class="label">&#945;</text>

    <!-- Block of length L and height H -->
    <g transform="translate(180, 125) rotate(-25)">
      <rect x="-40" y="-45" width="80" height="45" class="block-blue"/>
      <text x="0" y="-22" class="label">M</text>
      <!-- Dimension arrows for L and H -->
      <line x1="-40" y1="-55" x2="40" y2="-55" class="dim-line"/>
      <text x="0" y="-65" class="sublabel">L</text>
      <line x1="48" y1="-45" x2="48" y2="0" class="dim-line"/>
      <text x="60" y="-22" class="sublabel">H</text>
    </g>
  </svg>
  `,

  // Q51: Pulley with moment of inertia I and radius r, hanging mass m
  51: `
  ${SVG_HEADER(400, 320)}
    <!-- Ceiling -->
    <line x1="140" y1="40" x2="260" y2="40" class="surface"/>
    ${[150, 170, 190, 210, 230, 250].map(x => `
      <line x1="${x}" y1="40" x2="${x+10}" y2="25" class="hatch"/>
    `).join('')}

    <!-- Pulley supported at (200, 90) -->
    <line x1="200" y1="40" x2="200" y2="90" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="200" cy="90" r="35" class="pulley"/>
    <circle cx="200" cy="90" r="4" class="pulley-center"/>
    <line x1="200" y1="90" x2="235" y2="90" stroke="#0f172a" stroke-width="1.5"/>
    <text x="215" y="80" class="sublabel">r</text>
    <text x="180" y="90" class="label">I</text>

    <!-- Hanging mass m -->
    <line x1="235" y1="90" x2="235" y2="200" class="string-line"/>
    <rect x="215" y="200" width="40" height="40" class="block-blue"/>
    <text x="235" y="220" class="label">m</text>
  </svg>
  `,

  // Q52: Hollow cylinder of mass m, radius R with hanging block m
  52: `
  ${SVG_HEADER(440, 320)}
    <!-- Ceiling/Wall support -->
    <line x1="160" y1="50" x2="240" y2="50" class="surface"/>
    ${[170, 190, 210, 230].map(x => `
      <line x1="${x}" y1="50" x2="${x+10}" y2="35" class="hatch"/>
    `).join('')}

    <!-- Cylinder at (200, 100) -->
    <circle cx="200" cy="100" r="35" fill="#f1f5f9" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="200" cy="100" r="4" fill="#0f172a"/>
    <text x="250" y="95" class="label">m, R</text>

    <!-- Hanging mass m from wound string -->
    <line x1="235" y1="100" x2="235" y2="210" class="string-line"/>
    <rect x="215" y="210" width="40" height="40" class="block-blue"/>
    <text x="235" y="230" class="label">m</text>
  </svg>
  `,

  // Q57: Cylindrical pulley of mass 4kg with masses 2kg and 1kg
  57: `
  ${SVG_HEADER(420, 340)}
    <!-- Ceiling support -->
    <line x1="150" y1="40" x2="270" y2="40" class="surface"/>
    ${[160, 180, 200, 220, 240, 260].map(x => `
      <line x1="${x}" y1="40" x2="${x+10}" y2="25" class="hatch"/>
    `).join('')}

    <!-- Cylindrical Pulley at (210, 95) -->
    <line x1="210" y1="40" x2="210" y2="95" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="210" cy="95" r="35" class="pulley"/>
    <circle cx="210" cy="95" r="4" class="pulley-center"/>
    <text x="210" y="95" class="sublabel" font-size="12">M=4kg</text>

    <!-- Left side string and mass 2kg -->
    <line x1="175" y1="95" x2="175" y2="200" class="string-line"/>
    <text x="155" y="150" class="label" fill="#dc2626">T&#8321;</text>
    <rect x="155" y="200" width="40" height="40" class="block-blue"/>
    <text x="175" y="220" class="label">2kg</text>

    <!-- Right side string and mass 1kg -->
    <line x1="245" y1="95" x2="245" y2="240" class="string-line"/>
    <rect x="230" y="240" width="30" height="30" class="block"/>
    <text x="245" y="255" class="label">1kg</text>
  </svg>
  `,

  // Q60: Circular disc 9M, radius R, cavity R/3 at distance 2R/3
  60: `
  ${SVG_HEADER(440, 320)}
    <!-- Main disc centered at (200, 160), radius R=110 -->
    <circle cx="200" cy="160" r="110" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="200" cy="160" r="4" fill="#0f172a"/>
    <text x="185" y="175" class="label">O</text>

    <!-- Cavity of radius R/3=37 centered at (200 + 73 = 273, 160) -->
    <circle cx="273" cy="160" r="37" fill="#ffffff" stroke="#0f172a" stroke-width="2.2" stroke-dasharray="4,3"/>
    <circle cx="273" cy="160" r="3" fill="#0f172a"/>

    <!-- Labels -->
    <line x1="200" y1="160" x2="200" y2="50" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="185" y="105" class="label">R</text>

    <line x1="200" y1="160" x2="273" y2="160" stroke="#2563eb" stroke-width="1.8"/>
    <text x="236" y="145" class="sublabel" fill="#2563eb">2R/3</text>
  </svg>
  `,

  // Q61: Cubical block with force F at height h
  61: `
  ${SVG_HEADER(440, 260)}
    <!-- Floor -->
    <line x1="60" y1="190" x2="380" y2="190" class="surface"/>
    ${[80, 120, 160, 200, 240, 280, 320, 360].map(x => `
      <line x1="${x}" y1="190" x2="${x-15}" y2="205" class="hatch"/>
    `).join('')}

    <!-- Cube of side a=70 from x=160 to x=230, y=120 to y=190 -->
    <rect x="160" y="120" width="70" height="70" class="block-blue"/>
    <text x="195" y="155" class="label">m, a</text>

    <!-- Applied Force F at height h -->
    <line x1="100" y1="130" x2="160" y2="130" class="force-arrow" marker-end="url(#arrow-red)"/>
    <text x="85" y="130" class="label" fill="#dc2626">F</text>
    <line x1="150" y1="130" x2="150" y2="190" class="dim-line"/>
    <text x="140" y="160" class="sublabel">h</text>
  </svg>
  `,

  // Q62: Square plate with axes 1 and 2
  62: `
  ${SVG_HEADER(460, 280)}
    <!-- Square plate centered at (240, 140) of side 80 -->
    <rect x="200" y="100" width="80" height="80" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>

    <!-- Axis 1 along diagonal from (170, 70) to (310, 210) -->
    <line x1="160" y1="60" x2="320" y2="220" stroke="#2563eb" stroke-width="2.5"/>
    <text x="150" y="55" class="label" fill="#2563eb">1</text>

    <!-- Axis 2 parallel through corner (200, 180) -> from (120, 100) to (280, 260) -->
    <line x1="120" y1="100" x2="280" y2="260" stroke="#dc2626" stroke-width="2.5"/>
    <text x="110" y="95" class="label" fill="#dc2626">2</text>
  </svg>
  `,

  // Q63: Rod of length l with masses m and 2m against wall and floor
  63: `
  ${SVG_HEADER(460, 320)}
    <!-- Wall and Floor axes -->
    <line x1="80" y1="260" x2="400" y2="260" class="surface"/>
    <line x1="80" y1="40" x2="80" y2="260" class="surface"/>
    ${[90, 130, 170, 210, 250, 290, 330, 370].map(x => `
      <line x1="${x}" y1="260" x2="${x-12}" y2="275" class="hatch"/>
    `).join('')}
    ${[60, 100, 140, 180, 220].map(y => `
      <line x1="68" y1="${y+10}" x2="80" y2="${y}" class="hatch"/>
    `).join('')}

    <!-- Rod of length l from (80, 80) to (260, 260) -->
    <line x1="80" y1="80" x2="260" y2="260" stroke="#0f172a" stroke-width="4"/>
    <text x="180" y="160" class="label">l</text>

    <!-- Particle 1 at (80, 80) mass m -->
    <circle cx="80" cy="80" r="7" fill="#2563eb"/>
    <text x="100" y="75" class="label" fill="#2563eb">1 (m)</text>

    <!-- Particle 2 at (260, 260) mass 2m -->
    <circle cx="260" cy="260" r="9" fill="#d97706"/>
    <text x="285" y="280" class="label" fill="#d97706">2 (2m)</text>

    <!-- Velocity v of particle 2 to the right -->
    <line x1="260" y1="260" x2="330" y2="260" class="vel-arrow" marker-end="url(#arrow-blue)"/>
    <text x="345" y="260" class="label" fill="#2563eb">v</text>

    <!-- Angle theta at floor -->
    <path d="M 215 260 A 45 45 0 0 1 228 228" fill="none" stroke="#0f172a" stroke-width="1.8"/>
    <text x="205" y="245" class="label">&#952;</text>
  </svg>
  `,

  // Q64: Particle at (3, 4) moving parallel to x-axis
  64: `
  ${SVG_HEADER(480, 320)}
    <!-- X and Y axes -->
    <line x1="60" y1="240" x2="420" y2="240" class="axis" marker-end="url(#arrow)"/>
    <line x1="120" y1="280" x2="120" y2="40" class="axis" marker-end="url(#arrow)"/>
    <text x="435" y="240" class="label">X</text>
    <text x="120" y="25" class="label">Y</text>
    <text x="105" y="255" class="label">O</text>

    <!-- Point at (120 + 90 = 210, 240 - 120 = 120) -> (3, 4) -->
    <line x1="120" y1="240" x2="210" y2="120" stroke="#059669" stroke-width="2"/>
    <text x="155" y="170" class="label" fill="#059669">5m</text>

    <line x1="210" y1="120" x2="210" y2="240" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <text x="225" y="180" class="sublabel">4m</text>
    <text x="165" y="255" class="sublabel">3m</text>

    <!-- Particle m = 2kg -->
    <circle cx="210" cy="120" r="7" fill="#dc2626"/>
    <text x="185" y="105" class="label" fill="#dc2626">m=2kg</text>

    <!-- Velocity 10 m/s parallel to X-axis -->
    <line x1="210" y1="120" x2="290" y2="120" class="vel-arrow" marker-end="url(#arrow-blue)"/>
    <text x="325" y="120" class="label" fill="#2563eb">10m/s</text>
  </svg>
  `,

  // Q65: Solid sphere rolling on floor with 2v0, omega0, axis at O
  65: `
  ${SVG_HEADER(480, 280)}
    <!-- Floor -->
    <line x1="60" y1="200" x2="420" y2="200" class="surface"/>
    ${[80, 120, 160, 200, 240, 280, 320, 360, 400].map(x => `
      <line x1="${x}" y1="200" x2="${x-15}" y2="215" class="hatch"/>
    `).join('')}

    <!-- Sphere centered at (240, 130), radius r=70 -->
    <circle cx="240" cy="130" r="70" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="240" cy="130" r="4" fill="#0f172a"/>
    <text x="240" y="130" class="label">m, r</text>

    <!-- Velocity 2v0 at center -->
    <line x1="240" y1="130" x2="330" y2="130" class="vel-arrow" marker-end="url(#arrow-blue)"/>
    <text x="355" y="130" class="label" fill="#2563eb">2v&#8320;</text>

    <!-- Angular velocity omega0 (clockwise) -->
    <path d="M 210 90 A 40 40 0 0 1 270 90" fill="none" stroke="#2563eb" stroke-width="2.2" marker-end="url(#arrow-blue)"/>
    <text x="240" y="75" class="label" fill="#2563eb">&#969;&#8320;</text>

    <!-- Axis at point O on surface -->
    <circle cx="240" cy="200" r="4" fill="#dc2626"/>
    <text x="220" y="215" class="label" fill="#dc2626">O</text>
    <text x="290" y="215" class="sublabel" fill="#dc2626">axis &#8869; to page</text>
  </svg>
  `
};

async function generateAll() {
  console.log('Generating Rotational Motion Diagrams...');
  const mapping = {};

  for (const [qNum, svgString] of Object.entries(DIAGRAMS)) {
    const filename = `rotational_motion_q${qNum}.png`;
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
            folder: 'edvedum_rotational_motion',
            public_id: `rotational_motion_q${qNum}`,
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

  const mapPath = path.resolve(__dirname, 'rotational_motion_diagrams.json');
  fs.writeFileSync(mapPath, JSON.stringify(mapping, null, 2));
  console.log(`All diagrams generated and saved to ${mapPath}`);
}

generateAll().catch(err => {
  console.error('Fatal diagram generation error:', err);
  process.exit(1);
});
