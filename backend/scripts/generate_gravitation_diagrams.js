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

const outDirBackend = path.resolve(__dirname, '../uploads/gravitation');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/gravitation');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

const SVG_HEADER = (w = 540, h = 300) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2; }
    .grid { stroke: #e2e8f0; stroke-width: 1; stroke-dasharray: 4,4; }
    .surface { stroke: #0f172a; stroke-width: 2.2; stroke-linecap: round; }
    .label { font-size: 15px; font-weight: 600; fill: #0f172a; text-anchor: middle; dominant-baseline: middle; }
    .sublabel { font-size: 13px; font-weight: 500; fill: #475569; text-anchor: middle; dominant-baseline: middle; }
    .force-arrow { stroke: #dc2626; stroke-width: 2.2; stroke-linecap: round; }
    .vel-arrow { stroke: #2563eb; stroke-width: 2.2; stroke-linecap: round; }
    .dim-line { stroke: #64748b; stroke-width: 1.5; stroke-dasharray: 3,3; }
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb"/>
    </marker>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626"/>
    </marker>
  </defs>
`;

const diagrams = {
  // Q1: Elliptical path with Sun at focus S, points A, B, C, D
  q1: `${SVG_HEADER(540, 280)}
    <!-- Major & minor axes -->
    <line x1="80" y1="140" x2="460" y2="140" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>
    <line x1="270" y1="40" x2="270" y2="240" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>
    <!-- Orbit -->
    <ellipse cx="270" cy="140" rx="170" ry="85" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <!-- Sun at focus S -->
    <circle cx="180" cy="140" r="14" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
    <!-- Sun rays -->
    <path d="M 180 120 L 180 114 M 180 160 L 180 166 M 160 140 L 154 140 M 200 140 L 206 140 M 166 126 L 161 121 M 194 154 L 199 159 M 166 154 L 161 159 M 194 126 L 199 121" stroke="#f59e0b" stroke-width="2"/>
    <text x="180" y="172" class="label" fill="#b45309">S</text>
    <!-- Points A, B, C, D -->
    <circle cx="100" cy="140" r="4" fill="#0f172a"/>
    <text x="82" y="140" class="label">A</text>
    <circle cx="270" cy="55" r="4" fill="#0f172a"/>
    <text x="270" y="38" class="label">B</text>
    <circle cx="440" cy="140" r="4" fill="#0f172a"/>
    <text x="458" y="140" class="label">C</text>
    <circle cx="270" cy="225" r="4" fill="#0f172a"/>
    <text x="270" y="248" class="label">D</text>
    <!-- Arrow showing direction of motion -->
    <path d="M 270 55 L 250 55" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
  </svg>`,

  // Q7: Elliptical orbit with r1 and r2
  q7: `${SVG_HEADER(540, 260)}
    <!-- Major axis -->
    <line x1="70" y1="130" x2="470" y2="130" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,4"/>
    <!-- Orbit -->
    <ellipse cx="270" cy="130" rx="170" ry="85" fill="none" stroke="#3b82f6" stroke-width="2.2"/>
    <!-- Sun at focus -->
    <circle cx="170" cy="130" r="14" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
    <text x="170" y="162" class="label" fill="#b45309">Sun</text>
    <!-- Point 1 (perihelion) -->
    <circle cx="100" cy="130" r="5" fill="#0f172a"/>
    <text x="85" y="130" class="label">1</text>
    <!-- Point 2 (aphelion) -->
    <circle cx="440" cy="130" r="5" fill="#0f172a"/>
    <text x="455" y="130" class="label">2</text>
    <!-- Dimension r1 -->
    <line x1="100" y1="105" x2="170" y2="105" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="135" y="95" class="sublabel">r&#8321;</text>
    <!-- Dimension r2 -->
    <line x1="170" y1="105" x2="440" y2="105" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="305" y="95" class="sublabel">r&#8322;</text>
  </svg>`,

  // Q14: Elliptical orbit with areas ASB and CSD
  q14: `${SVG_HEADER(540, 280)}
    <!-- Major & minor axis -->
    <line x1="80" y1="140" x2="460" y2="140" stroke="#e2e8f0" stroke-width="1.5"/>
    <line x1="270" y1="50" x2="270" y2="230" stroke="#e2e8f0" stroke-width="1.5"/>
    <!-- Sector CSD (shaded) -->
    <path d="M 200 140 L 290 62 A 170 85 0 0 1 350 78 Z" fill="#bfdbfe" fill-opacity="0.6" stroke="#2563eb" stroke-width="1.5"/>
    <!-- Sector ASB (shaded) -->
    <path d="M 200 140 L 115 110 A 170 85 0 0 0 120 180 Z" fill="#fed7aa" fill-opacity="0.6" stroke="#ea580c" stroke-width="1.5"/>
    <!-- Orbit -->
    <ellipse cx="270" cy="140" rx="170" ry="85" fill="none" stroke="#0f172a" stroke-width="2.2"/>
    <!-- Sun at focus S -->
    <circle cx="200" cy="140" r="10" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
    <text x="200" y="165" class="label" fill="#b45309">SUN (S)</text>
    <!-- Points A, B, C, D -->
    <circle cx="115" cy="110" r="4" fill="#ea580c"/>
    <text x="100" y="105" class="label">A</text>
    <circle cx="120" cy="180" r="4" fill="#ea580c"/>
    <text x="105" y="195" class="label">B</text>
    <circle cx="290" cy="62" r="4" fill="#2563eb"/>
    <text x="290" y="48" class="label">C</text>
    <circle cx="350" cy="78" r="4" fill="#2563eb"/>
    <text x="365" y="70" class="label">D</text>
    <!-- Labels T1 and T2 -->
    <text x="145" y="145" class="sublabel" fill="#ea580c">T&#8321;</text>
    <text x="275" y="100" class="sublabel" fill="#2563eb">T&#8322;</text>
    <!-- Planet label -->
    <text x="370" y="120" class="sublabel">Planet</text>
  </svg>`,

  // Q15: Satellite orbit with 2R and 4R (distances from Earth center)
  q15: `${SVG_HEADER(540, 280)}
    <!-- Orbit -->
    <ellipse cx="280" cy="140" rx="180" ry="100" fill="none" stroke="#2563eb" stroke-width="2.2"/>
    <!-- Earth at focus -->
    <circle cx="190" cy="140" r="32" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>
    <text x="190" y="140" class="label" fill="#1e40af">Earth</text>
    <text x="190" y="158" class="sublabel" fill="#1e40af">(R)</text>
    <!-- Perigee at 2R from center -->
    <circle cx="100" cy="140" r="6" fill="#0f172a"/>
    <line x1="100" y1="140" x2="100" y2="85" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)"/>
    <text x="80" y="100" class="label" fill="#dc2626">v&#8321;</text>
    <!-- Apogee at 4R from center -->
    <circle cx="460" cy="140" r="6" fill="#0f172a"/>
    <line x1="460" y1="140" x2="460" y2="185" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)"/>
    <text x="480" y="170" class="label" fill="#dc2626">v&#8322;</text>
    <!-- Dimensions -->
    <line x1="100" y1="190" x2="190" y2="190" stroke="#64748b" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="145" y="208" class="sublabel">2R</text>
    <line x1="190" y1="190" x2="460" y2="190" stroke="#64748b" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="325" y="208" class="sublabel">4R</text>
  </svg>`,

  // Q20: Asteroid at 5R at 37 degrees to radial line
  q20: `${SVG_HEADER(540, 260)}
    <!-- Earth at right -->
    <circle cx="390" cy="140" r="40" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2.5"/>
    <circle cx="390" cy="140" r="3" fill="#1e40af"/>
    <text x="390" y="140" class="label" fill="#1e40af">Earth</text>
    <text x="390" y="160" class="sublabel" fill="#1e40af">(R)</text>
    <!-- Connecting dashed line -->
    <line x1="80" y1="140" x2="390" y2="140" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="5,5"/>
    <!-- Asteroid at 5R -->
    <circle cx="90" cy="140" r="6" fill="#0f172a"/>
    <!-- Velocity v0 at 37 deg -->
    <line x1="90" y1="140" x2="175" y2="76" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
    <text x="175" y="65" class="label" fill="#2563eb">v&#8320;</text>
    <!-- Angle arc 37 deg -->
    <path d="M 125 140 A 35 35 0 0 0 120 117" fill="none" stroke="#0f172a" stroke-width="1.5"/>
    <text x="135" y="125" class="sublabel">37&#176;</text>
    <!-- Distance 5R dimension -->
    <line x1="90" y1="180" x2="390" y2="180" stroke="#64748b" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="240" y="200" class="sublabel">5R</text>
    <!-- Grazing path -->
    <path d="M 90 140 Q 220 50 390 100" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="4,4"/>
  </svg>`,

  // Q21: Elliptical path with equal shaded areas a-b and c-d
  q21: `${SVG_HEADER(540, 260)}
    <!-- Sector a-b -->
    <path d="M 210 130 L 330 65 A 160 80 0 0 1 360 115 Z" fill="#bbf7d0" fill-opacity="0.7" stroke="#16a34a" stroke-width="1.5"/>
    <!-- Sector c-d -->
    <path d="M 210 130 L 90 110 A 160 80 0 0 0 120 170 Z" fill="#bbf7d0" fill-opacity="0.7" stroke="#16a34a" stroke-width="1.5"/>
    <!-- Orbit -->
    <ellipse cx="270" cy="130" rx="160" ry="80" fill="none" stroke="#0f172a" stroke-width="2.2"/>
    <!-- Sun S -->
    <circle cx="210" cy="130" r="10" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
    <text x="210" y="155" class="label" fill="#b45309">S</text>
    <!-- Points a, b, c, d -->
    <circle cx="360" cy="115" r="4" fill="#0f172a"/>
    <text x="375" y="120" class="label">b</text>
    <circle cx="330" cy="65" r="4" fill="#0f172a"/>
    <text x="330" y="50" class="label">a</text>
    <circle cx="90" cy="110" r="4" fill="#0f172a"/>
    <text x="75" y="105" class="label">d</text>
    <circle cx="120" cy="170" r="4" fill="#0f172a"/>
    <text x="110" y="185" class="label">c</text>
    <!-- Shaded area labels -->
    <text x="290" y="105" class="sublabel" fill="#15803d">Area 1</text>
    <text x="135" y="135" class="sublabel" fill="#15803d">Area 2</text>
  </svg>`,

  // Q31: 4 Graphs of magnitude of gravitational potential |V| vs r for solid sphere
  q31: `${SVG_HEADER(540, 320)}
    <!-- Panel 1 -->
    <rect x="25" y="20" width="220" height="130" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="40" y="40" class="label">(1)</text>
    <line x1="60" y1="125" x2="220" y2="125" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="60" y1="125" x2="60" y2="35" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="50" y="45" class="sublabel">|V|</text>
    <text x="220" y="140" class="sublabel">r</text>
    <path d="M 60 45 Q 120 100 200 120" fill="none" stroke="#2563eb" stroke-width="2"/>
    <line x1="130" y1="125" x2="130" y2="105" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <text x="130" y="138" class="sublabel">r=R</text>

    <!-- Panel 2 -->
    <rect x="285" y="20" width="220" height="130" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="300" y="40" class="label">(2)</text>
    <line x1="320" y1="125" x2="480" y2="125" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="320" y1="125" x2="320" y2="35" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="310" y="45" class="sublabel">|V|</text>
    <text x="480" y="140" class="sublabel">r</text>
    <line x1="320" y1="125" x2="390" y2="55" stroke="#2563eb" stroke-width="2"/>
    <path d="M 390 55 Q 430 105 470 120" fill="none" stroke="#2563eb" stroke-width="2"/>
    <text x="390" y="138" class="sublabel">r=R</text>

    <!-- Panel 3 (CORRECT) -->
    <rect x="25" y="170" width="220" height="130" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
    <text x="40" y="190" class="label">(3)</text>
    <line x1="60" y1="275" x2="220" y2="275" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="60" y1="275" x2="60" y2="185" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="50" y="195" class="sublabel">|V|</text>
    <text x="220" y="290" class="sublabel">r</text>
    <!-- Parabolic inside, hyperbolic outside -->
    <path d="M 60 195 Q 110 200 130 230 Q 165 260 210 270" fill="none" stroke="#16a34a" stroke-width="2.5"/>
    <line x1="130" y1="275" x2="130" y2="230" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <text x="130" y="288" class="sublabel">r=R</text>

    <!-- Panel 4 -->
    <rect x="285" y="170" width="220" height="130" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="300" y="190" class="label">(4)</text>
    <line x1="320" y1="275" x2="480" y2="275" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="320" y1="275" x2="320" y2="185" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="310" y="195" class="sublabel">|V|</text>
    <text x="480" y="290" class="sublabel">r</text>
    <line x1="320" y1="210" x2="390" y2="210" stroke="#2563eb" stroke-width="2"/>
    <path d="M 390 210 Q 425 255 470 270" fill="none" stroke="#2563eb" stroke-width="2"/>
    <text x="390" y="288" class="sublabel">r=R</text>
  </svg>`,

  // Q32: Uniform hollow sphere of mass M, radius R with point mass m at centre moved to A
  q32: `${SVG_HEADER(540, 260)}
    <!-- Hollow sphere -->
    <circle cx="270" cy="130" r="90" fill="#f8fafc" stroke="#0f172a" stroke-width="3"/>
    <text x="345" y="55" class="label">M</text>
    <!-- Center O -->
    <circle cx="270" cy="130" r="4" fill="#0f172a"/>
    <text x="255" y="145" class="label">O</text>
    <!-- Point mass m at centre -->
    <text x="245" y="125" class="label" fill="#2563eb">m</text>
    <!-- Point A at R/2 -->
    <circle cx="315" cy="130" r="4" fill="#dc2626"/>
    <text x="315" y="112" class="label" fill="#dc2626">A</text>
    <!-- Displacement vector from O to A -->
    <line x1="270" y1="130" x2="310" y2="130" stroke="#dc2626" stroke-width="2.2" marker-end="url(#arrow-red)"/>
    <!-- Radius R -->
    <line x1="270" y1="130" x2="270" y2="40" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3"/>
    <text x="285" y="85" class="sublabel">R</text>
    <!-- Dimension R/2 -->
    <text x="292" y="148" class="sublabel">R/2</text>
  </svg>`,

  // Q42: Equilateral triangle of side a with masses m at corners
  q42: `${SVG_HEADER(540, 280)}
    <!-- Triangle ABC -->
    <polygon points="270,50 160,220 380,220" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Vertex A -->
    <circle cx="270" cy="50" r="7" fill="#2563eb"/>
    <text x="270" y="30" class="label">A (m)</text>
    <!-- Vertex B -->
    <circle cx="160" cy="220" r="7" fill="#2563eb"/>
    <text x="135" y="235" class="label">B (m)</text>
    <!-- Vertex C -->
    <circle cx="380" cy="220" r="7" fill="#2563eb"/>
    <text x="405" y="235" class="label">C (m)</text>
    <!-- Side labels a -->
    <text x="200" y="130" class="sublabel">a</text>
    <text x="340" y="130" class="sublabel">a</text>
    <text x="270" y="238" class="sublabel">a</text>
    <!-- Forces acting on C -->
    <line x1="380" y1="220" x2="325" y2="135" stroke="#dc2626" stroke-width="2.2" marker-end="url(#arrow-red)"/>
    <text x="325" y="118" class="sublabel" fill="#dc2626">F_CA</text>
    <line x1="380" y1="220" x2="270" y2="220" stroke="#dc2626" stroke-width="2.2" marker-end="url(#arrow-red)"/>
    <text x="310" y="205" class="sublabel" fill="#dc2626">F_CB</text>
  </svg>`,

  // Q48: Variation in g of two planets A and B vs r
  q48: `${SVG_HEADER(540, 280)}
    <!-- Axes -->
    <line x1="70" y1="230" x2="480" y2="230" stroke="#0f172a" stroke-width="2" marker-end="url(#arrow)"/>
    <line x1="70" y1="230" x2="70" y2="30" stroke="#0f172a" stroke-width="2" marker-end="url(#arrow)"/>
    <text x="50" y="40" class="label">g</text>
    <text x="480" y="250" class="label">r</text>
    <!-- Planet A: steeper slope, peaks at RA = 190, y = 80 -->
    <line x1="70" y1="230" x2="190" y2="80" stroke="#2563eb" stroke-width="2.5"/>
    <path d="M 190 80 Q 250 160 440 215" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <text x="180" y="65" class="label" fill="#2563eb">A</text>
    <!-- Planet B: gentler slope, peaks at RB = 250, y = 120 -->
    <line x1="70" y1="230" x2="250" y2="120" stroke="#dc2626" stroke-width="2.5"/>
    <path d="M 250 120 Q 320 180 440 220" fill="none" stroke="#dc2626" stroke-width="2.5"/>
    <text x="260" y="105" class="label" fill="#dc2626">B</text>
    <!-- Dashed drop lines -->
    <line x1="190" y1="230" x2="190" y2="80" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <text x="190" y="248" class="sublabel">R_A</text>
    <line x1="250" y1="230" x2="250" y2="120" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <text x="250" y="248" class="sublabel">R_B</text>
  </svg>`,

  // Q53: Mass m placed in the cavity inside a hollow sphere of mass M
  q53: `${SVG_HEADER(540, 260)}
    <!-- Outer sphere shell -->
    <circle cx="270" cy="130" r="95" fill="#f1f5f9" stroke="#0f172a" stroke-width="3"/>
    <!-- Cavity inside -->
    <circle cx="290" cy="140" r="45" fill="#ffffff" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4"/>
    <!-- Shell mass M -->
    <text x="200" y="100" class="label">M</text>
    <!-- Mass m inside cavity -->
    <circle cx="290" cy="140" r="8" fill="#2563eb"/>
    <text x="290" y="140" class="label" fill="#ffffff">m</text>
  </svg>`,

  // Q56: Force of interaction between semi-circular ring (M, R) and particle M at its centre
  q56: `${SVG_HEADER(540, 260)}
    <!-- Center O with particle M -->
    <circle cx="270" cy="130" r="7" fill="#dc2626"/>
    <text x="290" y="130" class="label" fill="#dc2626">M</text>
    <!-- Semi-circular ring -->
    <path d="M 270 40 A 90 90 0 0 0 270 220" fill="none" stroke="#2563eb" stroke-width="4.5"/>
    <text x="155" y="130" class="label" fill="#2563eb">(M, R)</text>
    <!-- Radius line -->
    <line x1="270" y1="130" x2="270" y2="40" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3"/>
    <text x="255" y="85" class="sublabel">R</text>
    <!-- Force vector on particle M towards the ring -->
    <line x1="270" y1="130" x2="220" y2="130" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)"/>
    <text x="240" y="115" class="sublabel" fill="#dc2626">F</text>
  </svg>`,

  // Q57: Two spheres 4M (radius 2R) and M (radius R) separated by 6R, null point P
  q57: `${SVG_HEADER(540, 260)}
    <!-- Common line -->
    <line x1="70" y1="130" x2="470" y2="130" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>
    <!-- Left sphere 4M (radius 2R) -->
    <circle cx="130" cy="130" r="45" fill="#eff6ff" stroke="#2563eb" stroke-width="2.5"/>
    <circle cx="130" cy="130" r="4" fill="#1e40af"/>
    <text x="130" y="115" class="label">4M</text>
    <text x="130" y="145" class="sublabel">O (2R)</text>
    <!-- Right sphere M (radius R) -->
    <circle cx="430" cy="130" r="25" fill="#eff6ff" stroke="#2563eb" stroke-width="2.5"/>
    <circle cx="430" cy="130" r="4" fill="#1e40af"/>
    <text x="430" y="115" class="label">M</text>
    <text x="430" y="145" class="sublabel">(R)</text>
    <!-- Null point P -->
    <circle cx="330" cy="130" r="5" fill="#dc2626"/>
    <text x="330" y="105" class="label" fill="#dc2626">P</text>
    <!-- 6R dimension -->
    <line x1="130" y1="200" x2="430" y2="200" stroke="#64748b" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="280" y="220" class="sublabel">6R</text>
    <!-- OP dimension -->
    <line x1="130" y1="65" x2="330" y2="65" stroke="#64748b" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="230" y="50" class="sublabel">OP = ?</text>
  </svg>`,

  // Q58: Two concentric thin spherical shells m1, r1 and m2, r2 with point P in between
  q58: `${SVG_HEADER(540, 260)}
    <!-- Outer shell m2, r2 -->
    <circle cx="270" cy="130" r="100" fill="#f8fafc" stroke="#2563eb" stroke-width="2.2"/>
    <text x="385" y="80" class="label" fill="#2563eb">m&#8322;, r&#8322;</text>
    <!-- Inner shell m1, r1 -->
    <circle cx="270" cy="130" r="50" fill="#eff6ff" stroke="#2563eb" stroke-width="2.2"/>
    <text x="270" y="110" class="label" fill="#2563eb">m&#8321;, r&#8321;</text>
    <!-- Center O -->
    <circle cx="270" cy="130" r="3" fill="#0f172a"/>
    <!-- Point P at distance r between shells -->
    <circle cx="340" cy="130" r="5" fill="#dc2626"/>
    <text x="340" y="115" class="label" fill="#dc2626">P</text>
    <!-- Radius lines -->
    <line x1="270" y1="130" x2="340" y2="130" stroke="#dc2626" stroke-width="1.5"/>
    <text x="305" y="145" class="sublabel" fill="#dc2626">r</text>
  </svg>`,

  // Q59: Solid sphere M and ring m, R at distance x
  q59: `${SVG_HEADER(540, 260)}
    <!-- Center line -->
    <line x1="80" y1="130" x2="460" y2="130" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>
    <!-- Solid sphere M -->
    <circle cx="160" cy="130" r="45" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>
    <text x="160" y="130" class="label" fill="#1e40af">M</text>
    <text x="160" y="195" class="sublabel">solid sphere</text>
    <!-- Ring m, R -->
    <ellipse cx="380" cy="130" rx="14" ry="45" fill="none" stroke="#0f172a" stroke-width="3.5"/>
    <text x="420" y="130" class="label">R, m</text>
    <text x="380" y="195" class="sublabel">ring</text>
    <!-- Distance x -->
    <line x1="160" y1="70" x2="380" y2="70" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="270" y="55" class="sublabel">x</text>
  </svg>`,

  // Q61: Planet (M, R) with particle m thrown upward with speed V = sqrt(GM/R)
  q61: `${SVG_HEADER(540, 280)}
    <!-- Planet M, R -->
    <circle cx="270" cy="190" r="70" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>
    <text x="270" y="190" class="label" fill="#1e40af">M, R</text>
    <!-- Particle m at surface -->
    <circle cx="270" cy="120" r="5" fill="#dc2626"/>
    <text x="285" y="125" class="label" fill="#dc2626">m</text>
    <!-- Upward velocity arrow -->
    <line x1="270" y1="115" x2="270" y2="40" stroke="#2563eb" stroke-width="2.8" marker-end="url(#arrow-blue)"/>
    <text x="335" y="70" class="label" fill="#2563eb">V = &#8730;(GM/R)</text>
  </svg>`,

  // Q63: Elliptical orbit with P at minor axis end, Q at perihelion, Sun, C (center)
  q63: `${SVG_HEADER(540, 260)}
    <!-- Orbit -->
    <ellipse cx="270" cy="130" rx="170" ry="85" fill="none" stroke="#2563eb" stroke-width="2.2"/>
    <!-- Major and minor axes -->
    <line x1="80" y1="130" x2="460" y2="130" stroke="#cbd5e1" stroke-dasharray="3,3"/>
    <line x1="270" y1="40" x2="270" y2="220" stroke="#cbd5e1" stroke-dasharray="3,3"/>
    <!-- Centre C -->
    <circle cx="270" cy="130" r="4" fill="#0f172a"/>
    <text x="270" y="150" class="sublabel">C (centre)</text>
    <!-- Sun at focus -->
    <circle cx="185" cy="130" r="10" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
    <text x="185" y="155" class="label" fill="#b45309">SUN</text>
    <!-- Perihelion Q -->
    <circle cx="100" cy="130" r="5" fill="#dc2626"/>
    <text x="85" y="130" class="label" fill="#dc2626">Q</text>
    <!-- Point P on minor axis -->
    <circle cx="270" cy="45" r="5" fill="#059669"/>
    <text x="270" y="30" class="label" fill="#059669">P</text>
    <!-- Eccentricity note -->
    <text x="380" y="70" class="sublabel">e = 0.5</text>
  </svg>`,

  // Q64: Square ABCD of side l with masses m, 2m, 3m at corners and m at centre O
  q64: `${SVG_HEADER(540, 280)}
    <!-- Square ABCD -->
    <rect x="180" y="50" width="180" height="180" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Diagonals -->
    <line x1="180" y1="50" x2="360" y2="230" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="3,3"/>
    <line x1="180" y1="230" x2="360" y2="50" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="3,3"/>
    <!-- Corner A (m) -->
    <circle cx="180" cy="50" r="7" fill="#2563eb"/>
    <text x="160" y="45" class="label">A (m)</text>
    <!-- Corner B (2m) -->
    <circle cx="180" cy="230" r="8" fill="#2563eb"/>
    <text x="155" y="245" class="label">B (2m)</text>
    <!-- Corner C (3m) -->
    <circle cx="360" cy="230" r="9" fill="#2563eb"/>
    <text x="385" y="245" class="label">C (3m)</text>
    <!-- Corner D (empty) -->
    <circle cx="360" cy="50" r="4" fill="#94a3b8"/>
    <text x="380" y="45" class="label">D</text>
    <!-- Centre O with mass m -->
    <circle cx="270" cy="140" r="7" fill="#dc2626"/>
    <text x="270" y="160" class="label" fill="#dc2626">O (m)</text>
    <!-- Side label l -->
    <text x="270" y="38" class="sublabel">l</text>
  </svg>`,

  // Q65: Gravitational field intensity I vs r for uniform solid sphere
  q65: `${SVG_HEADER(540, 300)}
    <!-- Panel 1 (CORRECT) -->
    <rect x="25" y="15" width="220" height="125" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
    <text x="40" y="35" class="label">(1)</text>
    <line x1="60" y1="115" x2="220" y2="115" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="60" y1="115" x2="60" y2="30" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="50" y="35" class="sublabel">I</text>
    <text x="220" y="130" class="sublabel">r</text>
    <line x1="60" y1="115" x2="130" y2="50" stroke="#16a34a" stroke-width="2.5"/>
    <path d="M 130 50 Q 165 95 210 110" fill="none" stroke="#16a34a" stroke-width="2.5"/>
    <line x1="130" y1="115" x2="130" y2="50" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <text x="130" y="128" class="sublabel">R</text>

    <!-- Panel 2 -->
    <rect x="285" y="15" width="220" height="125" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="300" y="35" class="label">(2)</text>
    <line x1="320" y1="115" x2="480" y2="115" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="320" y1="115" x2="320" y2="30" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="310" y="35" class="sublabel">I</text>
    <text x="480" y="130" class="sublabel">r</text>
    <line x1="320" y1="50" x2="390" y2="50" stroke="#2563eb" stroke-width="2"/>
    <path d="M 390 50 Q 425 95 470 110" fill="none" stroke="#2563eb" stroke-width="2"/>
    <text x="390" y="128" class="sublabel">R</text>

    <!-- Panel 3 -->
    <rect x="25" y="155" width="220" height="125" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="40" y="175" class="label">(3)</text>
    <line x1="60" y1="255" x2="220" y2="255" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="60" y1="255" x2="60" y2="170" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="50" y="175" class="sublabel">I</text>
    <text x="220" y="270" class="sublabel">r</text>
    <path d="M 60 255 Q 110 240 130 190 Q 165 240 210 250" fill="none" stroke="#2563eb" stroke-width="2"/>
    <text x="130" y="268" class="sublabel">R</text>

    <!-- Panel 4 -->
    <rect x="285" y="155" width="220" height="125" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="300" y="175" class="label">(4)</text>
    <line x1="320" y1="255" x2="480" y2="255" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="320" y1="255" x2="320" y2="170" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="310" y="175" class="sublabel">I</text>
    <text x="480" y="270" class="sublabel">r</text>
    <path d="M 320 180 Q 380 230 470 250" fill="none" stroke="#2563eb" stroke-width="2"/>
    <text x="390" y="268" class="sublabel">r</text>
  </svg>`
};

async function generateAndUpload() {
  const urlMap = {};

  for (const [key, svg] of Object.entries(diagrams)) {
    const pngName = `gravitation_${key}.png`;
    const backendPath = path.join(outDirBackend, pngName);
    const frontendPath = path.join(outDirFrontend, pngName);

    // Render sharp PNG
    await sharp(Buffer.from(svg.trim())).png({ quality: 95 }).toFile(backendPath);
    fs.copyFileSync(backendPath, frontendPath);
    console.log(`Rendered PNG: ${pngName}`);

    // Upload to Cloudinary
    try {
      const uploadRes = await cloudinary.uploader.upload(backendPath, {
        folder: 'edvedum_gravitation',
        public_id: `gravitation_${key}`,
        overwrite: true,
        resource_type: 'image'
      });
      urlMap[key] = uploadRes.secure_url;
      console.log(`Uploaded to Cloudinary: ${key} -> ${uploadRes.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${key} to Cloudinary:`, err.message);
      urlMap[key] = `/uploads/gravitation/${pngName}`;
    }
  }

  const jsonPath = path.resolve(__dirname, 'gravitation_diagrams.json');
  fs.writeFileSync(jsonPath, JSON.stringify(urlMap, null, 2));
  console.log(`Saved diagram URLs to ${jsonPath}`);
}

generateAndUpload();
