import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDirBackend = path.resolve(__dirname, '../uploads/electrostatic_potential');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/electrostatic_potential');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

const SVG_HEADER = (w = 560, h = 320) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
  <style>
    .line { stroke: #0f172a; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .thin-line { stroke: #64748b; stroke-width: 1.5; stroke-dasharray: 4,4; }
    .axis { stroke: #0f172a; stroke-width: 2; }
    .plate { fill: #cbd5e1; stroke: #0f172a; stroke-width: 2.2; }
    .dielectric { fill: #fde68a; stroke: #d97706; stroke-width: 2; }
    .dielectric2 { fill: #bae6fd; stroke: #0284c7; stroke-width: 2; }
    .metal { fill: #94a3b8; stroke: #334155; stroke-width: 2.2; }
    .wire { stroke: #0f172a; stroke-width: 2.2; fill: none; }
    .ground { stroke: #0f172a; stroke-width: 2.5; stroke-linecap: round; }
    .label { font-size: 15px; font-weight: 600; fill: #0f172a; text-anchor: middle; dominant-baseline: middle; }
    .sublabel { font-size: 13px; font-weight: 500; fill: #475569; text-anchor: middle; dominant-baseline: middle; }
    .field-line { stroke: #2563eb; stroke-width: 1.8; stroke-linecap: round; fill: none; }
    .field-arrow { stroke: #dc2626; stroke-width: 2; fill: none; }
    .cap-plate { stroke: #0f172a; stroke-width: 3.5; stroke-linecap: round; }
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0f172a"/>
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb"/>
    </marker>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626"/>
    </marker>
  </defs>
`;

export const DIAGRAMS = {
  // Q3: Charged ring and axial line integral
  3: `${SVG_HEADER(540, 260)}
    <!-- Ring -->
    <ellipse cx="140" cy="130" rx="35" ry="90" fill="none" stroke="#2563eb" stroke-width="4.5" />
    <ellipse cx="140" cy="130" rx="30" ry="84" fill="none" stroke="#93c5fd" stroke-width="2" />
    <text x="140" y="245" class="label" fill="#2563eb">+Q, R</text>
    <line x1="140" y1="130" x2="140" y2="40" class="thin-line" />
    <text x="125" y="85" class="sublabel">R = 0.5 m</text>
    
    <!-- Central axis -->
    <line x1="140" y1="130" x2="480" y2="130" class="axis" marker-end="url(#arrow)" />
    <circle cx="140" cy="130" r="4" fill="#0f172a" />
    <text x="140" y="150" class="label">O</text>
    
    <!-- Path from infinity to O -->
    <line x1="440" y1="110" x2="160" y2="110" class="field-arrow" marker-end="url(#arrow-red)" />
    <text x="320" y="90" class="label" fill="#dc2626">∫ -E · dl (from ∞ to 0)</text>
    <text x="450" y="150" class="sublabel">axis (x)</text>
  </svg>`,

  // Q10: Bridge network (10, 10, 3, 5, 15, 6, 6 uF)
  10: `${SVG_HEADER(560, 280)}
    <!-- Input terminal A -->
    <circle cx="60" cy="140" r="4" fill="#0f172a" />
    <text x="45" y="140" class="label">A</text>
    <line x1="60" y1="140" x2="140" y2="140" class="wire" />
    
    <!-- Split to top and bottom -->
    <line x1="140" y1="70" x2="140" y2="210" class="wire" />
    
    <!-- Top branch: 10uF, 10uF in series, then 3uF -->
    <line x1="140" y1="70" x2="180" y2="70" class="wire" />
    <!-- 10uF -->
    <line x1="180" y1="55" x2="180" y2="85" class="cap-plate" />
    <line x1="192" y1="55" x2="192" y2="85" class="cap-plate" />
    <text x="186" y="42" class="sublabel">10 μF</text>
    <line x1="192" y1="70" x2="230" y2="70" class="wire" />
    <!-- 10uF -->
    <line x1="230" y1="55" x2="230" y2="85" class="cap-plate" />
    <line x1="242" y1="55" x2="242" y2="85" class="cap-plate" />
    <text x="236" y="42" class="sublabel">10 μF</text>
    <line x1="242" y1="70" x2="330" y2="70" class="wire" />
    
    <!-- Bridge connection at x=330 -->
    <circle cx="330" cy="70" r="3.5" fill="#0f172a" />
    <line x1="330" y1="70" x2="330" y2="115" class="wire" />
    <!-- 15uF bridge -->
    <line x1="315" y1="115" x2="345" y2="115" class="cap-plate" />
    <line x1="315" y1="127" x2="345" y2="127" class="cap-plate" />
    <text x="375" y="121" class="label" fill="#2563eb">15 μF</text>
    <line x1="330" y1="127" x2="330" y2="210" class="wire" />
    <circle cx="330" cy="210" r="3.5" fill="#0f172a" />
    
    <!-- Top arm right: 3uF -->
    <line x1="330" y1="70" x2="390" y2="70" class="wire" />
    <line x1="390" y1="55" x2="390" y2="85" class="cap-plate" />
    <line x1="402" y1="55" x2="402" y2="85" class="cap-plate" />
    <text x="396" y="42" class="sublabel">3 μF</text>
    <line x1="402" y1="70" x2="470" y2="70" class="wire" />
    
    <!-- Bottom branch: 5uF, then 6uF, 6uF -->
    <line x1="140" y1="210" x2="200" y2="210" class="wire" />
    <line x1="200" y1="195" x2="200" y2="225" class="cap-plate" />
    <line x1="212" y1="195" x2="212" y2="225" class="cap-plate" />
    <text x="206" y="240" class="sublabel">5 μF</text>
    <line x1="212" y1="210" x2="330" y2="210" class="wire" />
    
    <!-- Bottom arm right: 6uF and 6uF in series -->
    <line x1="330" y1="210" x2="365" y2="210" class="wire" />
    <line x1="365" y1="195" x2="365" y2="225" class="cap-plate" />
    <line x1="377" y1="195" x2="377" y2="225" class="cap-plate" />
    <text x="371" y="240" class="sublabel">6 μF</text>
    <line x1="377" y1="210" x2="415" y2="210" class="wire" />
    <line x1="415" y1="195" x2="415" y2="225" class="cap-plate" />
    <line x1="427" y1="195" x2="427" y2="225" class="cap-plate" />
    <text x="421" y="240" class="sublabel">6 μF</text>
    <line x1="427" y1="210" x2="470" y2="210" class="wire" />
    
    <!-- Reconnect to B -->
    <line x1="470" y1="70" x2="470" y2="210" class="wire" />
    <line x1="470" y1="140" x2="520" y2="140" class="wire" />
    <circle cx="520" cy="140" r="4" fill="#0f172a" />
    <text x="535" y="140" class="label">B</text>
  </svg>`,

  // Q11: Capacitors bridge between X and Y
  11: `${SVG_HEADER(480, 280)}
    <!-- Terminal X -->
    <line x1="60" y1="140" x2="160" y2="140" class="wire" />
    <circle cx="60" cy="140" r="4" fill="#0f172a" />
    <text x="45" y="140" class="label">X</text>
    
    <!-- Upper and lower branches -->
    <line x1="160" y1="70" x2="160" y2="210" class="wire" />
    <!-- C top-left -->
    <line x1="160" y1="70" x2="210" y2="70" class="wire" />
    <line x1="210" y1="55" x2="210" y2="85" class="cap-plate" />
    <line x1="222" y1="55" x2="222" y2="85" class="cap-plate" />
    <text x="216" y="42" class="sublabel">C</text>
    <line x1="222" y1="70" x2="270" y2="70" class="wire" />
    
    <!-- C bottom-left -->
    <line x1="160" y1="210" x2="210" y2="210" class="wire" />
    <line x1="210" y1="195" x2="210" y2="225" class="cap-plate" />
    <line x1="222" y1="195" x2="222" y2="225" class="cap-plate" />
    <text x="216" y="240" class="sublabel">C</text>
    <line x1="222" y1="210" x2="270" y2="210" class="wire" />
    
    <!-- Bridge C -->
    <circle cx="270" cy="70" r="3.5" fill="#0f172a" />
    <circle cx="270" cy="210" r="3.5" fill="#0f172a" />
    <line x1="270" y1="70" x2="270" y2="125" class="wire" />
    <line x1="255" y1="125" x2="285" y2="125" class="cap-plate" />
    <line x1="255" y1="137" x2="285" y2="137" class="cap-plate" />
    <text x="305" y="131" class="label">C</text>
    <line x1="270" y1="137" x2="270" y2="210" class="wire" />
    
    <!-- C top-right -->
    <line x1="270" y1="70" x2="320" y2="70" class="wire" />
    <line x1="320" y1="55" x2="320" y2="85" class="cap-plate" />
    <line x1="332" y1="55" x2="332" y2="85" class="cap-plate" />
    <text x="326" y="42" class="sublabel">C</text>
    <line x1="332" y1="70" x2="380" y2="70" class="wire" />
    
    <!-- C bottom-right -->
    <line x1="270" y1="210" x2="320" y2="210" class="wire" />
    <line x1="320" y1="195" x2="320" y2="225" class="cap-plate" />
    <line x1="332" y1="195" x2="332" y2="225" class="cap-plate" />
    <text x="326" y="240" class="sublabel">C</text>
    <line x1="332" y1="210" x2="380" y2="210" class="wire" />
    
    <!-- Reconnect to Y -->
    <line x1="380" y1="70" x2="380" y2="210" class="wire" />
    <line x1="380" y1="140" x2="430" y2="140" class="wire" />
    <circle cx="430" cy="140" r="4" fill="#0f172a" />
    <text x="445" y="140" class="label">Y</text>
  </svg>`,

  // Q13: Work done along curved path AB
  13: `${SVG_HEADER(460, 300)}
    <line x1="80" y1="240" x2="420" y2="240" class="axis" marker-end="url(#arrow)" />
    <line x1="80" y1="240" x2="80" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="420" y="260" class="label">X</text>
    <text x="60" y="45" class="label">Y</text>
    
    <!-- Charge q at origin -->
    <circle cx="80" cy="240" r="7" fill="#dc2626" />
    <text x="95" y="255" class="label" fill="#dc2626">+q</text>
    <text x="65" y="255" class="sublabel">O</text>
    
    <!-- Point A(a, 0) -->
    <circle cx="320" cy="240" r="5" fill="#2563eb" />
    <text x="320" y="265" class="label">A (a, 0)</text>
    
    <!-- Point B(0, b) -->
    <circle cx="80" cy="80" r="5" fill="#2563eb" />
    <text x="125" y="80" class="label">B (0, b)</text>
    
    <!-- Curved path -->
    <path d="M 320 240 Q 280 120 80 80" fill="none" stroke="#2563eb" stroke-width="2.8" marker-mid="url(#arrow-blue)" />
    <text x="240" y="140" class="label" fill="#2563eb">Path AB</text>
  </svg>`,

  // Q14: Rod AB and point O
  14: `${SVG_HEADER(520, 200)}
    <!-- Point O -->
    <circle cx="80" cy="100" r="5" fill="#0f172a" />
    <text x="80" y="130" class="label">O</text>
    
    <!-- Dimension 2L -->
    <line x1="80" y1="60" x2="260" y2="60" class="thin-line" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="170" y="45" class="label">2L</text>
    
    <!-- Rod AB of length L -->
    <rect x="260" y="90" width="180" height="20" rx="4" fill="#fed7aa" stroke="#ea580c" stroke-width="2.5" />
    <text x="260" y="130" class="label">A</text>
    <text x="440" y="130" class="label">B</text>
    <text x="350" y="102" class="label" fill="#ea580c">+Q, L</text>
    
    <!-- Dimension L -->
    <line x1="260" y1="150" x2="440" y2="150" class="thin-line" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="350" y="170" class="label">L</text>
  </svg>`,

  // Q15: Grounded inner shell and outer shell
  15: `${SVG_HEADER(460, 300)}
    <!-- Outer shell: r=2m, Q=10uC -->
    <circle cx="210" cy="150" r="100" fill="#f8fafc" stroke="#0f172a" stroke-width="3" />
    <text x="330" y="140" class="label" fill="#2563eb">10 μC</text>
    <line x1="210" y1="150" x2="295" y2="90" class="thin-line" />
    <text x="250" y="105" class="sublabel">2 m</text>
    
    <!-- Inner shell: r=1m, grounded -->
    <circle cx="210" cy="150" r="50" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5" />
    <line x1="210" y1="150" x2="245" y2="185" class="thin-line" />
    <text x="240" y="165" class="sublabel">1 m</text>
    <circle cx="210" cy="150" r="3" fill="#0f172a" />
    <text x="200" y="145" class="sublabel">O</text>
    
    <!-- Grounding wire from inner shell -->
    <line x1="160" y1="150" x2="110" y2="150" class="wire" />
    <line x1="110" y1="150" x2="110" y2="180" class="wire" />
    <line x1="95" y1="180" x2="125" y2="180" class="ground" />
    <line x1="100" y1="186" x2="120" y2="186" class="ground" />
    <line x1="105" y1="192" x2="115" y2="192" class="ground" />
    <text x="75" y="185" class="sublabel">Ground</text>
    <text x="180" y="170" class="label">q'</text>
  </svg>`,

  // Q17: Four parallel capacitors connected by alternate plates
  17: `${SVG_HEADER(500, 240)}
    <!-- 4 plates -->
    <!-- Plate 1 -->
    <line x1="120" y1="60" x2="380" y2="60" class="plate" stroke-width="6" />
    <!-- Plate 2 -->
    <line x1="120" y1="100" x2="380" y2="100" class="plate" stroke-width="6" />
    <!-- Plate 3 -->
    <line x1="120" y1="140" x2="380" y2="140" class="plate" stroke-width="6" />
    <!-- Plate 4 -->
    <line x1="120" y1="180" x2="380" y2="180" class="plate" stroke-width="6" />
    
    <!-- Alternate connections: Terminal A connects plates 1 and 3 -->
    <line x1="60" y1="100" x2="100" y2="100" class="wire" />
    <circle cx="60" cy="100" r="4" fill="#0f172a" />
    <text x="45" y="100" class="label">A</text>
    <line x1="100" y1="60" x2="100" y2="140" class="wire" />
    <line x1="100" y1="60" x2="120" y2="60" class="wire" />
    <line x1="100" y1="140" x2="120" y2="140" class="wire" />
    
    <!-- Terminal B connects plates 2 and 4 -->
    <line x1="400" y1="100" x2="400" y2="180" class="wire" />
    <line x1="380" y1="100" x2="400" y2="100" class="wire" />
    <line x1="380" y1="180" x2="400" y2="180" class="wire" />
    <line x1="400" y1="140" x2="440" y2="140" class="wire" />
    <circle cx="440" cy="140" r="4" fill="#0f172a" />
    <text x="455" y="140" class="label">B</text>
    <text x="250" y="215" class="sublabel">Each capacitor has capacitance 8 μF</text>
  </svg>`,

  // Q19: Charge q near neutral metallic sphere
  19: `${SVG_HEADER(480, 240)}
    <!-- Sphere -->
    <circle cx="160" cy="120" r="60" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5" />
    <circle cx="160" cy="120" r="3.5" fill="#0f172a" />
    <text x="145" y="115" class="label">O</text>
    <line x1="160" y1="120" x2="160" y2="60" class="thin-line" />
    <text x="175" y="90" class="sublabel">R</text>
    <text x="160" y="150" class="sublabel">Neutral sphere</text>
    
    <!-- Charge q at distance d -->
    <line x1="160" y1="120" x2="380" y2="120" class="thin-line" />
    <circle cx="380" cy="120" r="7" fill="#dc2626" />
    <text x="380" y="145" class="label" fill="#dc2626">+q</text>
    
    <!-- Distance d -->
    <line x1="160" y1="180" x2="380" y2="180" class="thin-line" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="270" y="170" class="label">d</text>
  </svg>`,

  // Q20: Capacitors 1 and 2 in series with dielectric
  20: `${SVG_HEADER(480, 260)}
    <!-- Circuit loop -->
    <line x1="100" y1="60" x2="200" y2="60" class="wire" />
    <!-- Cap 1 -->
    <line x1="200" y1="45" x2="200" y2="75" class="cap-plate" />
    <line x1="212" y1="45" x2="212" y2="75" class="cap-plate" />
    <text x="206" y="32" class="label">1</text>
    <line x1="212" y1="60" x2="300" y2="60" class="wire" />
    
    <!-- Cap 2 with dielectric -->
    <rect x="300" y="47" width="14" height="26" fill="#fde68a" stroke="#d97706" />
    <line x1="300" y1="45" x2="300" y2="75" class="cap-plate" />
    <line x1="314" y1="45" x2="314" y2="75" class="cap-plate" />
    <text x="307" y="32" class="label">2 (k)</text>
    <line x1="314" y1="60" x2="400" y2="60" class="wire" />
    
    <!-- Drop down to battery V0 -->
    <line x1="400" y1="60" x2="400" y2="180" class="wire" />
    <line x1="100" y1="60" x2="100" y2="180" class="wire" />
    <line x1="100" y1="180" x2="235" y2="180" class="wire" />
    <!-- Battery -->
    <line x1="235" y1="165" x2="235" y2="195" class="cap-plate" stroke-width="4" />
    <line x1="247" y1="172" x2="247" y2="188" class="cap-plate" stroke-width="2" />
    <text x="241" y="215" class="label">V₀</text>
    <line x1="247" y1="180" x2="400" y2="180" class="wire" />
  </svg>`,

  // Q21: Diamond bridge of 5 capacitors
  21: `${SVG_HEADER(460, 300)}
    <!-- Terminals A and B -->
    <circle cx="80" cy="150" r="4" fill="#0f172a" />
    <text x="60" y="150" class="label">A</text>
    <line x1="80" y1="150" x2="130" y2="150" class="wire" />
    
    <!-- Diamond nodes: Left(130,150), Top(230,60), Bottom(230,240), Right(330,150) -->
    <!-- Top left arm: 2uF -->
    <line x1="130" y1="150" x2="175" y2="105" class="wire" />
    <line x1="170" y1="95" x2="190" y2="115" class="cap-plate" />
    <line x1="177" y1="88" x2="197" y2="108" class="cap-plate" />
    <text x="170" y="80" class="sublabel">2 μF</text>
    <line x1="185" y1="100" x2="230" y2="60" class="wire" />
    
    <!-- Bottom left arm: 2uF -->
    <line x1="130" y1="150" x2="175" y2="195" class="wire" />
    <line x1="170" y1="205" x2="190" y2="185" class="cap-plate" />
    <line x1="177" y1="212" x2="197" y2="192" class="cap-plate" />
    <text x="170" y="225" class="sublabel">2 μF</text>
    <line x1="185" y1="200" x2="230" y2="240" class="wire" />
    
    <!-- Center vertical arm: 4uF -->
    <circle cx="230" cy="60" r="3.5" fill="#0f172a" />
    <circle cx="230" cy="240" r="3.5" fill="#0f172a" />
    <line x1="230" y1="60" x2="230" y2="140" class="wire" />
    <line x1="215" y1="140" x2="245" y2="140" class="cap-plate" />
    <line x1="215" y1="152" x2="245" y2="152" class="cap-plate" />
    <text x="265" y="146" class="label" fill="#2563eb">4 μF</text>
    <line x1="230" y1="152" x2="230" y2="240" class="wire" />
    
    <!-- Top right arm: 2uF -->
    <line x1="230" y1="60" x2="275" y2="105" class="wire" />
    <line x1="265" y1="115" x2="285" y2="95" class="cap-plate" />
    <line x1="272" y1="122" x2="292" y2="102" class="cap-plate" />
    <text x="295" y="80" class="sublabel">2 μF</text>
    <line x1="285" y1="100" x2="330" y2="150" class="wire" />
    
    <!-- Bottom right arm: 2uF -->
    <line x1="230" y1="240" x2="275" y2="195" class="wire" />
    <line x1="265" y1="185" x2="285" y2="205" class="cap-plate" />
    <line x1="272" y1="178" x2="292" y2="198" class="cap-plate" />
    <text x="295" y="225" class="sublabel">2 μF</text>
    <line x1="285" y1="200" x2="330" y2="150" class="wire" />
    
    <!-- To B -->
    <line x1="330" y1="150" x2="380" y2="150" class="wire" />
    <circle cx="380" cy="150" r="4" fill="#0f172a" />
    <text x="400" y="150" class="label">B</text>
  </svg>`,

  // Q22: Concentric conducting spheres connected by wire
  22: `${SVG_HEADER(460, 280)}
    <!-- Outer shell: radius 2r, 3uC -->
    <circle cx="210" cy="140" r="95" fill="#f8fafc" stroke="#0f172a" stroke-width="3" />
    <text x="310" y="80" class="label" fill="#2563eb">3 μC</text>
    <text x="300" y="100" class="sublabel">(radius 2r)</text>
    
    <!-- Inner solid sphere: radius r, 5uC -->
    <circle cx="210" cy="140" r="50" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5" />
    <text x="210" y="140" class="label" fill="#dc2626">5 μC</text>
    <text x="210" y="160" class="sublabel">(radius r)</text>
    
    <!-- Connecting metallic wire with switch -->
    <line x1="210" y1="90" x2="210" y2="45" class="wire" />
    <circle cx="210" cy="90" r="3.5" fill="#0f172a" />
    <circle cx="210" cy="45" r="3.5" fill="#0f172a" />
    <text x="150" y="65" class="label">switch</text>
  </svg>`,

  // Q24: Sphere between charged plates field lines
  24: `${SVG_HEADER(560, 260)}
    <!-- Correct Pattern 3 shown prominently -->
    <!-- Top plate (+Q) -->
    <rect x="100" y="30" width="360" height="12" fill="#ef4444" stroke="#b91c1c" />
    <text x="280" y="20" class="label" fill="#b91c1c">+ + + + + Positive Plate + + + + +</text>
    
    <!-- Conducting Sphere -->
    <circle cx="280" cy="130" r="45" fill="#e2e8f0" stroke="#0f172a" stroke-width="3" />
    <text x="280" y="130" class="label">E = 0</text>
    
    <!-- Bottom plate (-Q) -->
    <rect x="100" y="218" width="360" height="12" fill="#3b82f6" stroke="#1d4ed8" />
    <text x="280" y="248" class="label" fill="#1d4ed8">- - - - - Negative Plate - - - - -</text>
    
    <!-- Normal field lines hitting sphere -->
    <path d="M 140 42 L 140 218" class="field-line" marker-mid="url(#arrow-blue)" />
    <path d="M 420 42 L 420 218" class="field-line" marker-mid="url(#arrow-blue)" />
    <path d="M 210 42 Q 220 90 240 100" class="field-line" marker-mid="url(#arrow-blue)" />
    <path d="M 240 160 Q 220 170 210 218" class="field-line" marker-mid="url(#arrow-blue)" />
    <path d="M 350 42 Q 340 90 320 100" class="field-line" marker-mid="url(#arrow-blue)" />
    <path d="M 320 160 Q 340 170 350 218" class="field-line" marker-mid="url(#arrow-blue)" />
    <path d="M 280 42 L 280 85" class="field-line" marker-mid="url(#arrow-blue)" />
    <path d="M 280 175 L 280 218" class="field-line" marker-mid="url(#arrow-blue)" />
  </svg>`,

  // Q27: Bridge/square network between A and B
  27: `${SVG_HEADER(500, 260)}
    <circle cx="60" cy="130" r="4" fill="#0f172a" />
    <text x="45" y="130" class="label">A</text>
    <line x1="60" y1="130" x2="140" y2="130" class="wire" />
    <line x1="140" y1="70" x2="140" y2="190" class="wire" />
    
    <!-- Top arm -->
    <line x1="140" y1="70" x2="220" y2="70" class="wire" />
    <line x1="220" y1="55" x2="220" y2="85" class="cap-plate" />
    <line x1="232" y1="55" x2="232" y2="85" class="cap-plate" />
    <text x="226" y="42" class="sublabel">2 μF</text>
    <line x1="232" y1="70" x2="310" y2="70" class="wire" />
    
    <!-- Bottom arm -->
    <line x1="140" y1="190" x2="220" y2="190" class="wire" />
    <line x1="220" y1="175" x2="220" y2="205" class="cap-plate" />
    <line x1="232" y1="175" x2="232" y2="205" class="cap-plate" />
    <text x="226" y="222" class="sublabel">2 μF</text>
    <line x1="232" y1="190" x2="310" y2="190" class="wire" />
    
    <!-- Middle cross arm -->
    <line x1="310" y1="70" x2="310" y2="190" class="wire" />
    <circle cx="310" cy="70" r="3.5" fill="#0f172a" />
    <circle cx="310" cy="190" r="3.5" fill="#0f172a" />
    <line x1="310" y1="130" x2="420" y2="130" class="wire" />
    <circle cx="420" cy="130" r="4" fill="#0f172a" />
    <text x="440" y="130" class="label">B</text>
  </svg>`,

  // Q31: Metal sphere inside conducting shell connected by wire
  31: `${SVG_HEADER(440, 260)}
    <circle cx="200" cy="130" r="80" fill="#f8fafc" stroke="#0f172a" stroke-width="3" />
    <text x="295" y="110" class="label">b</text>
    
    <circle cx="160" cy="130" r="35" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5" />
    <text x="160" y="130" class="label">a</text>
    
    <!-- Wire connecting them -->
    <path d="M 160 95 Q 160 50 200 50" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <circle cx="160" cy="95" r="3" fill="#2563eb" />
    <circle cx="200" cy="50" r="3" fill="#2563eb" />
    <text x="175" y="40" class="sublabel">conducting wire</text>
  </svg>`,

  // Q32: Concentric spherical equipotential surfaces
  32: `${SVG_HEADER(460, 260)}
    <circle cx="220" cy="130" r="10" fill="#dc2626" />
    <text x="220" y="130" class="sublabel" fill="#ffffff">+q</text>
    
    <!-- Surface A -->
    <circle cx="220" cy="130" r="40" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,4" />
    <text x="250" y="110" class="sublabel">A</text>
    
    <!-- Surface B -->
    <circle cx="220" cy="130" r="65" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,4" />
    <text x="275" y="95" class="sublabel">B</text>
    
    <!-- Surface C -->
    <circle cx="220" cy="130" r="100" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,4" />
    <text x="310" y="80" class="sublabel">C</text>
    
    <!-- Spacings t1 and t2 -->
    <line x1="260" y1="130" x2="285" y2="130" class="axis" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="272" y="145" class="sublabel">t₁</text>
    <line x1="285" y1="130" x2="320" y2="130" class="axis" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="302" y="145" class="sublabel">t₂</text>
  </svg>`,

  // Q36: 4uF || 2uF in series with 6uF across 12V
  36: `${SVG_HEADER(500, 260)}
    <!-- 12V battery -->
    <line x1="100" y1="130" x2="160" y2="130" class="wire" />
    <line x1="160" y1="110" x2="160" y2="150" class="cap-plate" stroke-width="4" />
    <line x1="172" y1="118" x2="172" y2="142" class="cap-plate" stroke-width="2" />
    <text x="166" y="95" class="label">12 V</text>
    <line x1="172" y1="130" x2="240" y2="130" class="wire" />
    
    <!-- Split into 4uF and 2uF parallel -->
    <line x1="240" y1="80" x2="240" y2="180" class="wire" />
    <!-- 4uF -->
    <line x1="240" y1="80" x2="280" y2="80" class="wire" />
    <line x1="280" y1="65" x2="280" y2="95" class="cap-plate" />
    <line x1="292" y1="65" x2="292" y2="95" class="cap-plate" />
    <text x="286" y="52" class="label">4 μF</text>
    <line x1="292" y1="80" x2="330" y2="80" class="wire" />
    
    <!-- 2uF -->
    <line x1="240" y1="180" x2="280" y2="180" class="wire" />
    <line x1="280" y1="165" x2="280" y2="195" class="cap-plate" />
    <line x1="292" y1="165" x2="292" y2="195" class="cap-plate" />
    <text x="286" y="212" class="label">2 μF</text>
    <line x1="292" y1="180" x2="330" y2="180" class="wire" />
    
    <!-- Reconnect and go to 6uF -->
    <line x1="330" y1="80" x2="330" y2="180" class="wire" />
    <line x1="330" y1="130" x2="380" y2="130" class="wire" />
    <line x1="380" y1="115" x2="380" y2="145" class="cap-plate" />
    <line x1="392" y1="115" x2="392" y2="145" class="cap-plate" />
    <text x="386" y="102" class="label">6 μF</text>
    
    <!-- Return to 12V battery -->
    <line x1="392" y1="130" x2="440" y2="130" class="wire" />
    <line x1="440" y1="130" x2="440" y2="230" class="wire" />
    <line x1="100" y1="130" x2="100" y2="230" class="wire" />
    <line x1="100" y1="230" x2="440" y2="230" class="wire" />
  </svg>`,

  // Q38: Dipoles p1, p2 and points A, B
  38: `${SVG_HEADER(460, 300)}
    <line x1="80" y1="220" x2="400" y2="220" class="axis" marker-end="url(#arrow)" />
    <line x1="160" y1="280" x2="160" y2="40" class="axis" marker-end="url(#arrow)" />
    <text x="400" y="240" class="label">X</text>
    <text x="140" y="45" class="label">Y</text>
    
    <!-- Dipoles at origin -->
    <line x1="160" y1="220" x2="160" y2="170" class="field-arrow" marker-end="url(#arrow-red)" />
    <text x="140" y="190" class="label" fill="#dc2626">p₁</text>
    <line x1="160" y1="220" x2="220" y2="220" class="field-arrow" marker-end="url(#arrow-red)" />
    <text x="210" y="240" class="label" fill="#dc2626">p₂</text>
    
    <!-- Point A(0, 1) -->
    <circle cx="160" cy="110" r="5" fill="#2563eb" />
    <text x="130" y="110" class="label">A (0, 1)</text>
    
    <!-- Point B(1, 0) -->
    <circle cx="270" cy="220" r="5" fill="#2563eb" />
    <text x="270" y="245" class="label">B (1, 0)</text>
    
    <text x="280" y="100" class="sublabel">|p₁| &gt; |p₂|</text>
  </svg>`,

  // Q41: Hexagonal capacitor network
  41: `${SVG_HEADER(480, 320)}
    <!-- Hexagon vertices: center=(240,160), R=100 -->
    <!-- Angles: 0, 60, 120, 180, 240, 300 deg -->
    <!-- V0: (340, 160) = Q -->
    <!-- V1: (290, 246.6) -->
    <!-- V2: (190, 246.6) -->
    <!-- V3: (140, 160) = P -->
    <!-- V4: (190, 73.4) -->
    <!-- V5: (290, 73.4) -->
    <polygon points="340,160 290,246.6 190,246.6 140,160 190,73.4 290,73.4" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5" />
    
    <!-- Spokes to center -->
    <line x1="240" y1="160" x2="340" y2="160" class="wire" />
    <line x1="240" y1="160" x2="290" y2="246.6" class="wire" />
    <line x1="240" y1="160" x2="190" y2="246.6" class="wire" />
    <line x1="240" y1="160" x2="140" y2="160" class="wire" />
    <line x1="240" y1="160" x2="190" y2="73.4" class="wire" />
    <line x1="240" y1="160" x2="290" y2="73.4" class="wire" />
    <circle cx="240" cy="160" r="4" fill="#0f172a" />
    
    <!-- Terminal P -->
    <line x1="80" y1="160" x2="140" y2="160" class="wire" stroke-width="3" />
    <circle cx="80" cy="160" r="5" fill="#0f172a" />
    <text x="65" y="160" class="label">P</text>
    
    <!-- Terminal Q -->
    <line x1="340" y1="160" x2="400" y2="160" class="wire" stroke-width="3" />
    <circle cx="400" cy="160" r="5" fill="#0f172a" />
    <text x="415" y="160" class="label">Q</text>
    <text x="240" y="295" class="sublabel">Each arm has capacitance C</text>
  </svg>`,

  // Q42: 5V battery, 3uF, 2uF with switch
  42: `${SVG_HEADER(480, 260)}
    <line x1="80" y1="130" x2="160" y2="130" class="wire" />
    <!-- 5V battery -->
    <line x1="160" y1="110" x2="160" y2="150" class="cap-plate" stroke-width="4" />
    <line x1="172" y1="118" x2="172" y2="142" class="cap-plate" stroke-width="2" />
    <text x="166" y="95" class="label">5 V</text>
    <line x1="172" y1="130" x2="240" y2="130" class="wire" />
    
    <!-- 3uF top branch -->
    <line x1="240" y1="80" x2="240" y2="180" class="wire" />
    <line x1="240" y1="80" x2="290" y2="80" class="wire" />
    <line x1="290" y1="65" x2="290" y2="95" class="cap-plate" />
    <line x1="302" y1="65" x2="302" y2="95" class="cap-plate" />
    <text x="296" y="52" class="label">3 μF</text>
    <line x1="302" y1="80" x2="380" y2="80" class="wire" />
    
    <!-- Switch and 2uF bottom branch -->
    <line x1="240" y1="180" x2="270" y2="180" class="wire" />
    <circle cx="270" cy="180" r="3" fill="#0f172a" />
    <line x1="270" y1="180" x2="295" y2="165" class="wire" stroke-width="2.5" />
    <circle cx="305" cy="180" r="3" fill="#0f172a" />
    <text x="285" y="150" class="sublabel">switch</text>
    <line x1="305" y1="180" x2="330" y2="180" class="wire" />
    <line x1="330" y1="165" x2="330" y2="195" class="cap-plate" />
    <line x1="342" y1="165" x2="342" y2="195" class="cap-plate" />
    <text x="336" y="215" class="label">2 μF</text>
    <line x1="342" y1="180" x2="380" y2="180" class="wire" />
    
    <line x1="380" y1="80" x2="380" y2="180" class="wire" />
    <line x1="380" y1="130" x2="420" y2="130" class="wire" />
    <line x1="420" y1="130" x2="420" y2="230" class="wire" />
    <line x1="80" y1="130" x2="80" y2="230" class="wire" />
    <line x1="80" y1="230" x2="420" y2="230" class="wire" />
  </svg>`,

  // Q45: C in series with 2uF and 6uF
  45: `${SVG_HEADER(500, 240)}
    <circle cx="60" cy="120" r="4" fill="#0f172a" />
    <text x="45" y="120" class="label">A</text>
    <line x1="60" y1="120" x2="130" y2="120" class="wire" />
    <!-- Capacitor C -->
    <line x1="130" y1="105" x2="130" y2="135" class="cap-plate" />
    <line x1="142" y1="105" x2="142" y2="135" class="cap-plate" />
    <text x="136" y="90" class="label">C</text>
    <line x1="142" y1="120" x2="220" y2="120" class="wire" />
    
    <!-- Parallel 2uF and 6uF -->
    <line x1="220" y1="70" x2="220" y2="170" class="wire" />
    <!-- 6uF top -->
    <line x1="220" y1="70" x2="270" y2="70" class="wire" />
    <line x1="270" y1="55" x2="270" y2="85" class="cap-plate" />
    <line x1="282" y1="55" x2="282" y2="85" class="cap-plate" />
    <text x="276" y="42" class="label">6 μF</text>
    <line x1="282" y1="70" x2="330" y2="70" class="wire" />
    
    <!-- 2uF bottom -->
    <line x1="220" y1="170" x2="270" y2="170" class="wire" />
    <line x1="270" y1="155" x2="270" y2="185" class="cap-plate" />
    <line x1="282" y1="155" x2="282" y2="185" class="cap-plate" />
    <text x="276" y="202" class="label">2 μF</text>
    <line x1="282" y1="170" x2="330" y2="170" class="wire" />
    
    <line x1="330" y1="70" x2="330" y2="170" class="wire" />
    <line x1="330" y1="120" x2="420" y2="120" class="wire" />
    <circle cx="420" cy="120" r="4" fill="#0f172a" />
    <text x="435" y="120" class="label">B</text>
  </svg>`,

  // Q46: 3 capacitors in series with switch
  46: `${SVG_HEADER(520, 240)}
    <!-- Battery V -->
    <line x1="60" y1="120" x2="110" y2="120" class="wire" />
    <line x1="110" y1="100" x2="110" y2="140" class="cap-plate" stroke-width="4" />
    <line x1="122" y1="108" x2="122" y2="132" class="cap-plate" stroke-width="2" />
    <text x="116" y="85" class="label">V</text>
    <line x1="122" y1="120" x2="180" y2="120" class="wire" />
    
    <!-- C1 -->
    <line x1="180" y1="105" x2="180" y2="135" class="cap-plate" />
    <line x1="192" y1="105" x2="192" y2="135" class="cap-plate" />
    <text x="186" y="90" class="label">C</text>
    <line x1="192" y1="120" x2="250" y2="120" class="wire" />
    
    <!-- C2 -->
    <line x1="250" y1="105" x2="250" y2="135" class="cap-plate" />
    <line x1="262" y1="105" x2="262" y2="135" class="cap-plate" />
    <text x="256" y="90" class="label">C</text>
    <line x1="262" y1="120" x2="320" y2="120" class="wire" />
    
    <!-- C3 -->
    <line x1="320" y1="105" x2="320" y2="135" class="cap-plate" />
    <line x1="332" y1="105" x2="332" y2="135" class="cap-plate" />
    <text x="326" y="90" class="label">C</text>
    <line x1="332" y1="120" x2="420" y2="120" class="wire" />
    
    <!-- Switch S across C3 -->
    <circle cx="300" cy="120" r="3.5" fill="#0f172a" />
    <line x1="300" y1="120" x2="300" y2="175" class="wire" />
    <line x1="300" y1="175" x2="340" y2="175" class="wire" />
    <circle cx="340" cy="175" r="3" fill="#0f172a" />
    <line x1="340" y1="175" x2="370" y2="160" class="wire" stroke-width="2.5" />
    <circle cx="380" cy="175" r="3" fill="#0f172a" />
    <text x="360" y="195" class="label">S</text>
    <line x1="380" y1="175" x2="420" y2="175" class="wire" />
    <line x1="420" y1="120" x2="420" y2="175" class="wire" />
    
    <!-- Close loop to battery -->
    <line x1="420" y1="120" x2="460" y2="120" class="wire" />
    <line x1="460" y1="120" x2="460" y2="215" class="wire" />
    <line x1="60" y1="120" x2="60" y2="215" class="wire" />
    <line x1="60" y1="215" x2="460" y2="215" class="wire" />
  </svg>`,

  // Q47: Split dielectric slab (K1, K2)
  47: `${SVG_HEADER(460, 260)}
    <!-- Top plate -->
    <line x1="120" y1="60" x2="340" y2="60" class="plate" stroke-width="6" />
    <line x1="230" y1="20" x2="230" y2="60" class="wire" />
    
    <!-- Bottom plate -->
    <line x1="120" y1="200" x2="340" y2="200" class="plate" stroke-width="6" />
    <line x1="230" y1="200" x2="230" y2="240" class="wire" />
    
    <!-- Left dielectric slab K1 -->
    <rect x="150" y="63" width="80" height="134" fill="#fde68a" stroke="#d97706" stroke-width="2" />
    <text x="190" y="130" class="label" fill="#d97706">K₁</text>
    <text x="190" y="155" class="sublabel">A/2</text>
    
    <!-- Right dielectric slab K2 -->
    <rect x="230" y="63" width="80" height="134" fill="#bae6fd" stroke="#0284c7" stroke-width="2" />
    <text x="270" y="130" class="label" fill="#0284c7">K₂</text>
    <text x="270" y="155" class="sublabel">A/2</text>
    
    <!-- Spacing d -->
    <line x1="370" y1="60" x2="370" y2="200" class="axis" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="390" y="130" class="label">d</text>
  </svg>`,

  // Q48: Bridge across 10V battery
  48: `${SVG_HEADER(480, 260)}
    <!-- Battery 10V -->
    <line x1="80" y1="130" x2="140" y2="130" class="wire" />
    <line x1="140" y1="110" x2="140" y2="150" class="cap-plate" stroke-width="4" />
    <line x1="152" y1="118" x2="152" y2="142" class="cap-plate" stroke-width="2" />
    <text x="146" y="95" class="label">10 V</text>
    <line x1="152" y1="130" x2="200" y2="130" class="wire" />
    
    <line x1="200" y1="70" x2="200" y2="190" class="wire" />
    
    <!-- Top branch: 2uF and 3uF in series -->
    <line x1="200" y1="70" x2="240" y2="70" class="wire" />
    <line x1="240" y1="55" x2="240" y2="85" class="cap-plate" />
    <line x1="252" y1="55" x2="252" y2="85" class="cap-plate" />
    <text x="246" y="42" class="sublabel">2 μF</text>
    <line x1="252" y1="70" x2="310" y2="70" class="wire" />
    <line x1="310" y1="55" x2="310" y2="85" class="cap-plate" />
    <line x1="322" y1="55" x2="322" y2="85" class="cap-plate" />
    <text x="316" y="42" class="sublabel">3 μF</text>
    <line x1="322" y1="70" x2="360" y2="70" class="wire" />
    
    <!-- Bottom branch: 3uF and 2uF in series -->
    <line x1="200" y1="190" x2="240" y2="190" class="wire" />
    <line x1="240" y1="175" x2="240" y2="205" class="cap-plate" />
    <line x1="252" y1="175" x2="252" y2="205" class="cap-plate" />
    <text x="246" y="222" class="sublabel">3 μF</text>
    <line x1="252" y1="190" x2="310" y2="190" class="wire" />
    <line x1="310" y1="175" x2="310" y2="205" class="cap-plate" />
    <line x1="322" y1="175" x2="322" y2="205" class="cap-plate" />
    <text x="316" y="222" class="sublabel">2 μF</text>
    <line x1="322" y1="190" x2="360" y2="190" class="wire" />
    
    <!-- Return to battery -->
    <line x1="360" y1="70" x2="360" y2="190" class="wire" />
    <line x1="360" y1="130" x2="410" y2="130" class="wire" />
    <line x1="410" y1="130" x2="410" y2="235" class="wire" />
    <line x1="80" y1="130" x2="80" y2="235" class="wire" />
    <line x1="80" y1="235" x2="410" y2="235" class="wire" />
  </svg>`,

  // Q54: Semicircular charged arc with center P
  54: `${SVG_HEADER(440, 260)}
    <!-- Semicircular arc -->
    <path d="M 120 130 A 100 100 0 0 1 320 130" fill="none" stroke="#ea580c" stroke-width="4.5" stroke-linecap="round" />
    <text x="220" y="20" class="label" fill="#ea580c">λ (uniform linear charge density)</text>
    
    <!-- Center P -->
    <circle cx="220" cy="130" r="5" fill="#0f172a" />
    <text x="220" y="155" class="label">P</text>
    
    <!-- Radius R -->
    <line x1="220" y1="130" x2="290" y2="60" class="thin-line" marker-end="url(#arrow)" />
    <text x="270" y="100" class="label">R</text>
  </svg>`,

  // Q55: Bridge network (4, 6, 2 uF)
  55: `${SVG_HEADER(500, 260)}
    <!-- Terminal A -->
    <circle cx="80" cy="80" r="4.5" fill="#0f172a" />
    <text x="60" y="80" class="label">A</text>
    
    <!-- Left vertical 4uF -->
    <line x1="80" y1="80" x2="80" y2="200" class="wire" />
    <line x1="70" y1="135" x2="90" y2="135" class="cap-plate" />
    <line x1="70" y1="147" x2="90" y2="147" class="cap-plate" />
    <text x="50" y="141" class="sublabel">4 μF</text>
    
    <!-- Top arm: 4uF then 6uF -->
    <line x1="80" y1="80" x2="160" y2="80" class="wire" />
    <line x1="160" y1="65" x2="160" y2="95" class="cap-plate" />
    <line x1="172" y1="65" x2="172" y2="95" class="cap-plate" />
    <text x="166" y="52" class="sublabel">4 μF</text>
    <line x1="172" y1="80" x2="250" y2="80" class="wire" />
    
    <circle cx="250" cy="80" r="3.5" fill="#0f172a" />
    <line x1="250" y1="80" x2="330" y2="80" class="wire" />
    <line x1="330" y1="65" x2="330" y2="95" class="cap-plate" />
    <line x1="342" y1="65" x2="342" y2="95" class="cap-plate" />
    <text x="336" y="52" class="sublabel">6 μF</text>
    <line x1="342" y1="80" x2="420" y2="80" class="wire" />
    
    <!-- Middle vertical: 2uF -->
    <line x1="250" y1="80" x2="250" y2="135" class="wire" />
    <line x1="240" y1="135" x2="260" y2="135" class="cap-plate" />
    <line x1="240" y1="147" x2="260" y2="147" class="cap-plate" />
    <text x="275" y="141" class="label">2 μF</text>
    <line x1="250" y1="147" x2="250" y2="200" class="wire" />
    <circle cx="250" cy="200" r="4.5" fill="#0f172a" />
    <text x="250" y="225" class="label">B</text>
    
    <!-- Right vertical: 6uF -->
    <line x1="420" y1="80" x2="420" y2="200" class="wire" />
    <line x1="410" y1="135" x2="430" y2="135" class="cap-plate" />
    <line x1="410" y1="147" x2="430" y2="147" class="cap-plate" />
    <text x="450" y="141" class="sublabel">6 μF</text>
    
    <!-- Bottom arm: 4uF and 6uF -->
    <line x1="80" y1="200" x2="160" y2="200" class="wire" />
    <line x1="160" y1="185" x2="160" y2="215" class="cap-plate" />
    <line x1="172" y1="185" x2="172" y2="215" class="cap-plate" />
    <text x="166" y="235" class="sublabel">4 μF</text>
    <line x1="172" y1="200" x2="250" y2="200" class="wire" />
    
    <line x1="250" y1="200" x2="330" y2="200" class="wire" />
    <line x1="330" y1="185" x2="330" y2="215" class="cap-plate" />
    <line x1="342" y1="185" x2="342" y2="215" class="cap-plate" />
    <text x="336" y="235" class="sublabel">6 μF</text>
    <line x1="342" y1="200" x2="420" y2="200" class="wire" />
  </svg>`,

  // Q56: Two distant spheres with switch
  56: `${SVG_HEADER(500, 220)}
    <!-- Sphere 1 (R, q) -->
    <circle cx="120" cy="110" r="40" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5" />
    <text x="120" y="110" class="label">R</text>
    <text x="120" y="55" class="label" fill="#dc2626">+q</text>
    
    <!-- Connecting wire with switch s -->
    <line x1="160" y1="110" x2="220" y2="110" class="wire" />
    <circle cx="220" cy="110" r="3" fill="#0f172a" />
    <line x1="220" y1="110" x2="255" y2="90" class="wire" stroke-width="2.5" />
    <circle cx="265" cy="110" r="3" fill="#0f172a" />
    <text x="240" y="75" class="label">s</text>
    <line x1="265" y1="110" x2="320" y2="110" class="wire" />
    
    <!-- Sphere 2 (2R, q) -->
    <circle cx="380" cy="110" r="60" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5" />
    <text x="380" y="110" class="label">2R</text>
    <text x="380" y="35" class="label" fill="#dc2626">+q</text>
  </svg>`,

  // Q57: 4 plates arrangement with U-shaped plate
  57: `${SVG_HEADER(480, 260)}
    <!-- U-shaped outer plate -->
    <path d="M 320 60 L 140 60 Q 110 60 110 90 L 110 170 Q 110 200 140 200 L 320 200" fill="none" stroke="#334155" stroke-width="5" />
    
    <!-- Inner plate a -->
    <line x1="150" y1="105" x2="330" y2="105" class="plate" stroke-width="6" />
    <line x1="330" y1="105" x2="390" y2="105" class="wire" />
    <circle cx="390" cy="105" r="4" fill="#0f172a" />
    <text x="410" y="105" class="label">a</text>
    
    <!-- Inner plate b -->
    <line x1="150" y1="155" x2="330" y2="155" class="plate" stroke-width="6" />
    <line x1="330" y1="155" x2="390" y2="155" class="wire" />
    <circle cx="390" cy="155" r="4" fill="#0f172a" />
    <text x="410" y="155" class="label">b</text>
    <text x="240" y="235" class="sublabel">Area A, spacing d</text>
  </svg>`,

  // Q59: Triangle circuit of capacitors
  59: `${SVG_HEADER(460, 260)}
    <!-- Triangle nodes: Top(230,60), Left(140,170), Right(320,170) -->
    <!-- Left arm: 1uF -->
    <line x1="230" y1="60" x2="190" y2="110" class="wire" />
    <line x1="185" y1="100" x2="205" y2="120" class="cap-plate" />
    <line x1="177" y1="106" x2="197" y2="126" class="cap-plate" />
    <text x="160" y="95" class="label">1 μF</text>
    <line x1="185" y1="115" x2="140" y2="170" class="wire" />
    
    <!-- Right arm: 2uF -->
    <line x1="230" y1="60" x2="270" y2="110" class="wire" />
    <line x1="255" y1="120" x2="275" y2="100" class="cap-plate" />
    <line x1="263" y1="126" x2="283" y2="106" class="cap-plate" />
    <text x="300" y="95" class="label">2 μF</text>
    <line x1="275" y1="115" x2="320" y2="170" class="wire" />
    
    <!-- Base: 3uF -->
    <line x1="140" y1="170" x2="215" y2="170" class="wire" />
    <line x1="215" y1="155" x2="215" y2="185" class="cap-plate" />
    <line x1="227" y1="155" x2="227" y2="185" class="cap-plate" />
    <text x="221" y="142" class="label">3 μF</text>
    <line x1="227" y1="170" x2="320" y2="170" class="wire" />
    
    <!-- Battery across base -->
    <line x1="140" y1="170" x2="140" y2="225" class="wire" />
    <line x1="140" y1="225" x2="215" y2="225" class="wire" />
    <line x1="215" y1="210" x2="215" y2="240" class="cap-plate" stroke-width="4" />
    <line x1="227" y1="216" x2="227" y2="234" class="cap-plate" stroke-width="2" />
    <text x="221" y="255" class="label">E</text>
    <line x1="227" y1="225" x2="320" y2="225" class="wire" />
    <line x1="320" y1="170" x2="320" y2="225" class="wire" />
  </svg>`,

  // Q60: Capacitor with metal plate d/2
  60: `${SVG_HEADER(460, 260)}
    <!-- Top plate -->
    <line x1="140" y1="60" x2="320" y2="60" class="plate" stroke-width="6" />
    <line x1="230" y1="20" x2="230" y2="60" class="wire" />
    
    <!-- Metal plate of thickness d/2 -->
    <rect x="150" y="105" width="160" height="40" rx="2" fill="#94a3b8" stroke="#334155" stroke-width="2.5" />
    <text x="230" y="125" class="label" fill="#0f172a">Metal plate</text>
    <text x="340" y="125" class="sublabel">d/2</text>
    
    <!-- Bottom plate -->
    <line x1="140" y1="190" x2="320" y2="190" class="plate" stroke-width="6" />
    <line x1="230" y1="190" x2="230" y2="230" class="wire" />
    
    <!-- Dimension d -->
    <line x1="110" y1="60" x2="110" y2="190" class="axis" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="90" y="125" class="label">d</text>
  </svg>`,

  // Q61: 5 interleaved parallel plates
  61: `${SVG_HEADER(480, 260)}
    <!-- 5 plates -->
    <!-- Plate 1 -->
    <line x1="170" y1="50" x2="330" y2="50" class="plate" stroke-width="6" />
    <!-- Plate 2 -->
    <line x1="170" y1="85" x2="330" y2="85" class="plate" stroke-width="6" />
    <!-- Plate 3 -->
    <line x1="170" y1="120" x2="330" y2="120" class="plate" stroke-width="6" />
    <!-- Plate 4 -->
    <line x1="170" y1="155" x2="330" y2="155" class="plate" stroke-width="6" />
    <!-- Plate 5 -->
    <line x1="170" y1="190" x2="330" y2="190" class="plate" stroke-width="6" />
    
    <!-- Terminal A connects 1, 3, 5 -->
    <line x1="80" y1="120" x2="130" y2="120" class="wire" />
    <circle cx="80" cy="120" r="4" fill="#0f172a" />
    <text x="65" y="120" class="label">A</text>
    <line x1="130" y1="120" x2="170" y2="50" class="wire" />
    <line x1="130" y1="120" x2="170" y2="120" class="wire" />
    <line x1="130" y1="120" x2="170" y2="190" class="wire" />
    
    <!-- Terminal B connects 2, 4 -->
    <line x1="330" y1="85" x2="370" y2="120" class="wire" />
    <line x1="330" y1="155" x2="370" y2="120" class="wire" />
    <line x1="370" y1="120" x2="420" y2="120" class="wire" />
    <circle cx="420" cy="120" r="4" fill="#0f172a" />
    <text x="435" y="120" class="label">B</text>
    <text x="250" y="235" class="sublabel">Area A, spacing d between adjacent plates</text>
  </svg>`,

  // Q62: Bridge circuit C1=1, C2=4, C3=4, C4=4 uF
  62: `${SVG_HEADER(480, 260)}
    <!-- Top branch: C1=1uF, a, C2=4uF -->
    <line x1="120" y1="80" x2="170" y2="80" class="wire" />
    <line x1="170" y1="65" x2="170" y2="95" class="cap-plate" />
    <line x1="182" y1="65" x2="182" y2="95" class="cap-plate" />
    <text x="176" y="52" class="sublabel">C₁ = 1 μF</text>
    <line x1="182" y1="80" x2="240" y2="80" class="wire" />
    <circle cx="240" cy="80" r="4" fill="#0f172a" />
    <text x="240" y="62" class="label">a</text>
    <line x1="240" y1="80" x2="295" y2="80" class="wire" />
    <line x1="295" y1="65" x2="295" y2="95" class="cap-plate" />
    <line x1="307" y1="65" x2="307" y2="95" class="cap-plate" />
    <text x="301" y="52" class="sublabel">C₂ = 4 μF</text>
    <line x1="307" y1="80" x2="360" y2="80" class="wire" />
    
    <!-- Bottom branch: C3=4uF, b, C4=4uF -->
    <line x1="120" y1="160" x2="170" y2="160" class="wire" />
    <line x1="170" y1="145" x2="170" y2="175" class="cap-plate" />
    <line x1="182" y1="145" x2="182" y2="175" class="cap-plate" />
    <text x="176" y="190" class="sublabel">C₃ = 4 μF</text>
    <line x1="182" y1="160" x2="240" y2="160" class="wire" />
    <circle cx="240" cy="160" r="4" fill="#0f172a" />
    <text x="240" y="180" class="label">b</text>
    <line x1="240" y1="160" x2="295" y2="160" class="wire" />
    <line x1="295" y1="145" x2="295" y2="175" class="cap-plate" />
    <line x1="307" y1="145" x2="307" y2="175" class="cap-plate" />
    <text x="301" y="190" class="sublabel">C₄ = 4 μF</text>
    <line x1="307" y1="160" x2="360" y2="160" class="wire" />
    
    <!-- Outer loop with battery -->
    <line x1="120" y1="80" x2="120" y2="160" class="wire" />
    <line x1="360" y1="80" x2="360" y2="160" class="wire" />
    
    <line x1="80" y1="120" x2="120" y2="120" class="wire" />
    <line x1="360" y1="120" x2="400" y2="120" class="wire" />
    <line x1="80" y1="120" x2="80" y2="230" class="wire" />
    <line x1="400" y1="120" x2="400" y2="230" class="wire" />
    <line x1="80" y1="230" x2="225" y2="230" class="wire" />
    <line x1="225" y1="215" x2="225" y2="245" class="cap-plate" stroke-width="4" />
    <line x1="237" y1="222" x2="237" y2="238" class="cap-plate" stroke-width="2" />
    <line x1="237" y1="230" x2="400" y2="230" class="wire" />
  </svg>`,

  // Q65: Equilateral triangle of side l with charges Q and -q
  65: `${SVG_HEADER(460, 300)}
    <!-- Triangle vertices: Top(230,60), Left(130,220), Right(330,220) -->
    <polygon points="230,60 130,220 330,220" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5" />
    
    <!-- Vertices charges +Q -->
    <circle cx="230" cy="60" r="8" fill="#dc2626" />
    <text x="230" y="38" class="label" fill="#dc2626">+Q</text>
    
    <circle cx="130" cy="220" r="8" fill="#dc2626" />
    <text x="105" y="240" class="label" fill="#dc2626">+Q</text>
    
    <circle cx="330" cy="220" r="8" fill="#dc2626" />
    <text x="355" y="240" class="label" fill="#dc2626">+Q</text>
    
    <!-- Center -q -->
    <!-- Centroid: (230, 166.7) -->
    <circle cx="230" cy="167" r="7" fill="#2563eb" />
    <text x="250" y="167" class="label" fill="#2563eb">-q</text>
    
    <!-- Sides length l -->
    <text x="165" y="130" class="sublabel">l</text>
    <text x="295" y="130" class="sublabel">l</text>
    <text x="230" y="240" class="sublabel">l</text>
  </svg>`,

  // Q67: Three large plates (+3Q, -8Q, +Q) with earthing switch
  67: `${SVG_HEADER(480, 260)}
    <!-- Plate 1: +3Q, earthed through switch -->
    <rect x="130" y="50" width="16" height="150" fill="#cbd5e1" stroke="#0f172a" stroke-width="2.2" />
    <text x="138" y="35" class="label" fill="#dc2626">+3Q</text>
    
    <!-- Switch and earth on plate 1 -->
    <line x1="138" y1="200" x2="138" y2="225" class="wire" />
    <circle cx="138" cy="225" r="3" fill="#0f172a" />
    <line x1="138" y1="225" x2="155" y2="215" class="wire" stroke-width="2.5" />
    <circle cx="138" cy="240" r="3" fill="#0f172a" />
    <line x1="125" y1="240" x2="151" y2="240" class="ground" />
    <line x1="130" y1="246" x2="146" y2="246" class="ground" />
    <line x1="135" y1="252" x2="141" y2="252" class="ground" />
    
    <!-- Plate 2: -8Q -->
    <rect x="230" y="50" width="16" height="150" fill="#cbd5e1" stroke="#0f172a" stroke-width="2.2" />
    <text x="238" y="35" class="label" fill="#2563eb">-8Q</text>
    
    <!-- Plate 3: +Q -->
    <rect x="330" y="50" width="16" height="150" fill="#cbd5e1" stroke="#0f172a" stroke-width="2.2" />
    <text x="338" y="35" class="label" fill="#dc2626">+Q</text>
  </svg>`,

  // Q70: Semicircle centered at O(-Q) with A, B, C and external P
  70: `${SVG_HEADER(480, 240)}
    <!-- Horizontal axis -->
    <line x1="60" y1="160" x2="420" y2="160" class="axis" />
    
    <!-- Center O with charge -Q -->
    <circle cx="200" cy="160" r="6" fill="#2563eb" />
    <text x="200" y="185" class="label" fill="#2563eb">-Q</text>
    <text x="200" y="205" class="sublabel">O (center)</text>
    
    <!-- Semicircular path of radius R: from C through B to A -->
    <path d="M 100 160 A 100 100 0 0 1 300 160" fill="none" stroke="#0f172a" stroke-width="3" />
    
    <!-- Point C -->
    <circle cx="100" cy="160" r="4.5" fill="#0f172a" />
    <text x="85" y="150" class="label">C</text>
    
    <!-- Point B at top -->
    <circle cx="200" cy="60" r="4.5" fill="#0f172a" />
    <text x="200" y="45" class="label">B</text>
    
    <!-- Point A -->
    <circle cx="300" cy="160" r="4.5" fill="#0f172a" />
    <text x="310" y="150" class="label">A</text>
    
    <!-- Radius R -->
    <line x1="200" y1="160" x2="270" y2="90" class="thin-line" marker-end="url(#arrow)" />
    <text x="245" y="115" class="label">R</text>
    
    <!-- External point P at distance R from A -->
    <circle cx="370" cy="160" r="4.5" fill="#dc2626" />
    <text x="370" y="185" class="label" fill="#dc2626">P</text>
    <line x1="300" y1="140" x2="370" y2="140" class="thin-line" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="335" y="130" class="sublabel">R</text>
  </svg>`,

  // Q71: Concentric shells 10cm (10C) and 20cm (20C)
  71: `${SVG_HEADER(460, 260)}
    <!-- Outer shell: 20cm, 20C -->
    <circle cx="220" cy="130" r="95" fill="#f8fafc" stroke="#0f172a" stroke-width="3" />
    <text x="330" y="110" class="label" fill="#2563eb">20 C</text>
    <line x1="220" y1="130" x2="300" y2="75" class="thin-line" marker-end="url(#arrow)" />
    <text x="270" y="90" class="sublabel">20 cm</text>
    
    <!-- Inner shell: 10cm, 10C -->
    <circle cx="220" cy="130" r="50" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5" />
    <text x="220" y="105" class="label" fill="#dc2626">10 C</text>
    <line x1="220" y1="130" x2="260" y2="160" class="thin-line" marker-end="url(#arrow)" />
    <text x="250" y="145" class="sublabel">10 cm</text>
    <circle cx="220" cy="130" r="3.5" fill="#0f172a" />
  </svg>`,

  // Q73: Two-position switch (2uF and 8uF)
  73: `${SVG_HEADER(480, 240)}
    <!-- Battery -->
    <line x1="80" y1="120" x2="130" y2="120" class="wire" />
    <line x1="130" y1="100" x2="130" y2="140" class="cap-plate" stroke-width="4" />
    <line x1="142" y1="108" x2="142" y2="132" class="cap-plate" stroke-width="2" />
    <line x1="142" y1="120" x2="180" y2="120" class="wire" />
    <line x1="180" y1="60" x2="180" y2="120" class="wire" />
    <line x1="180" y1="60" x2="225" y2="60" class="wire" />
    
    <!-- Two-position switch S -->
    <circle cx="225" cy="60" r="3.5" fill="#0f172a" />
    <text x="225" y="45" class="label">1</text>
    
    <!-- Switch pole at top of 2uF -->
    <circle cx="250" cy="80" r="4" fill="#0f172a" />
    <line x1="250" y1="80" x2="230" y2="63" class="wire" stroke-width="3" stroke="#2563eb" />
    <text x="270" y="70" class="label">S</text>
    
    <!-- Position 2 -->
    <circle cx="285" cy="60" r="3.5" fill="#0f172a" />
    <text x="285" y="45" class="label">2</text>
    
    <!-- 2uF capacitor connected to switch pole -->
    <line x1="250" y1="80" x2="250" y2="120" class="wire" />
    <line x1="235" y1="120" x2="265" y2="120" class="cap-plate" />
    <line x1="235" y1="132" x2="265" y2="132" class="cap-plate" />
    <text x="210" y="126" class="label">2 μF</text>
    <line x1="250" y1="132" x2="250" y2="200" class="wire" />
    
    <!-- 8uF capacitor connected to pos 2 -->
    <line x1="285" y1="60" x2="350" y2="60" class="wire" />
    <line x1="350" y1="60" x2="350" y2="120" class="wire" />
    <line x1="335" y1="120" x2="365" y2="120" class="cap-plate" />
    <line x1="335" y1="132" x2="365" y2="132" class="cap-plate" />
    <text x="390" y="126" class="label">8 μF</text>
    <line x1="350" y1="132" x2="350" y2="200" class="wire" />
    
    <!-- Common ground/bottom wire -->
    <line x1="80" y1="120" x2="80" y2="200" class="wire" />
    <line x1="80" y1="200" x2="350" y2="200" class="wire" />
  </svg>`,

  // Q74: Field lines pattern for charge q inside cavity of conducting sphere
  74: `${SVG_HEADER(560, 260)}
    <!-- 4 Sub-diagrams showing Options 1 to 4 -->
    <!-- Option 1 (Correct) -->
    <g transform="translate(70, 110)">
      <circle cx="0" cy="0" r="50" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5" />
      <circle cx="0" cy="0" r="30" fill="#ffffff" stroke="#0f172a" stroke-width="2" />
      <circle cx="-12" cy="0" r="4" fill="#dc2626" />
      <!-- Radial inside lines ending normally -->
      <line x1="-12" y1="0" x2="-30" y2="0" class="field-line" />
      <line x1="-12" y1="0" x2="15" y2="26" class="field-line" />
      <line x1="-12" y1="0" x2="15" y2="-26" class="field-line" />
      <line x1="-12" y1="0" x2="-21" y2="21" class="field-line" />
      <line x1="-12" y1="0" x2="-21" y2="-21" class="field-line" />
      <!-- Outside uniform radial lines from center -->
      <line x1="0" y1="-50" x2="0" y2="-70" class="field-arrow" marker-end="url(#arrow-red)" />
      <line x1="0" y1="50" x2="0" y2="70" class="field-arrow" marker-end="url(#arrow-red)" />
      <line x1="-50" y1="0" x2="-70" y2="0" class="field-arrow" marker-end="url(#arrow-red)" />
      <line x1="50" y1="0" x2="70" y2="0" class="field-arrow" marker-end="url(#arrow-red)" />
      <text x="0" y="85" class="label">(1)</text>
    </g>
    
    <!-- Option 2 -->
    <g transform="translate(210, 110)">
      <circle cx="0" cy="0" r="50" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5" />
      <circle cx="0" cy="0" r="30" fill="#ffffff" stroke="#0f172a" stroke-width="2" />
      <circle cx="-12" cy="0" r="4" fill="#dc2626" />
      <line x1="-12" y1="0" x2="70" y2="0" class="field-arrow" />
      <text x="0" y="85" class="label">(2)</text>
    </g>
    
    <!-- Option 3 -->
    <g transform="translate(350, 110)">
      <circle cx="0" cy="0" r="50" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5" />
      <circle cx="0" cy="0" r="30" fill="#ffffff" stroke="#0f172a" stroke-width="2" />
      <circle cx="-12" cy="0" r="4" fill="#dc2626" />
      <!-- Non-radial outside lines -->
      <line x1="-12" y1="0" x2="-70" y2="-40" class="field-arrow" />
      <text x="0" y="85" class="label">(3)</text>
    </g>
    
    <!-- Option 4 -->
    <g transform="translate(490, 110)">
      <circle cx="0" cy="0" r="50" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5" />
      <circle cx="0" cy="0" r="30" fill="#ffffff" stroke="#0f172a" stroke-width="2" />
      <circle cx="-12" cy="0" r="4" fill="#dc2626" />
      <text x="0" y="85" class="label">(4)</text>
    </g>
  </svg>`,

  // Q76: Pear-shaped non-spherical conductor
  76: `${SVG_HEADER(460, 240)}
    <!-- Pear shaped path -->
    <path d="M 120 120 C 120 70, 220 80, 320 105 C 345 110, 345 130, 320 135 C 220 160, 120 170, 120 120 Z" fill="#e2e8f0" stroke="#0f172a" stroke-width="3" />
    
    <!-- Region 1: rounded blunt end -->
    <text x="100" y="120" class="label" fill="#2563eb">1 (σ₁)</text>
    
    <!-- Region 2: sharp pointed end -->
    <text x="365" y="120" class="label" fill="#dc2626">2 (σ₂)</text>
    
    <!-- Region 3: flatter side -->
    <text x="230" y="70" class="label" fill="#0f172a">3 (σ₃)</text>
    <text x="230" y="175" class="label" fill="#0f172a">3 (σ₃)</text>
  </svg>`,

  // Q77: Three parallel plates with switch to earth
  77: `${SVG_HEADER(500, 260)}
    <!-- Plate 1: 10uC -->
    <rect x="130" y="50" width="16" height="150" fill="#cbd5e1" stroke="#0f172a" stroke-width="2.2" />
    <text x="138" y="35" class="label">10 μC</text>
    <text x="138" y="215" class="sublabel">(1)</text>
    
    <!-- Plate 2: 20uC -->
    <rect x="240" y="50" width="16" height="150" fill="#cbd5e1" stroke="#0f172a" stroke-width="2.2" />
    <text x="248" y="35" class="label">20 μC</text>
    <text x="248" y="215" class="sublabel">(2)</text>
    
    <!-- Plate 3: 30uC with switch S to earth -->
    <rect x="350" y="50" width="16" height="150" fill="#cbd5e1" stroke="#0f172a" stroke-width="2.2" />
    <text x="358" y="35" class="label">30 μC</text>
    <text x="358" y="215" class="sublabel">(3)</text>
    
    <!-- Ground switch on Plate 3 -->
    <line x1="366" y1="150" x2="410" y2="150" class="wire" />
    <circle cx="410" cy="150" r="3" fill="#0f172a" />
    <line x1="410" y1="150" x2="430" y2="135" class="wire" stroke-width="2.5" />
    <text x="420" y="125" class="label">S</text>
    <circle cx="435" cy="150" r="3" fill="#0f172a" />
    <line x1="435" y1="150" x2="435" y2="180" class="wire" />
    <line x1="420" y1="180" x2="450" y2="180" class="ground" />
    <line x1="425" y1="186" x2="445" y2="186" class="ground" />
    <line x1="430" y1="192" x2="440" y2="192" class="ground" />
  </svg>`
};

async function generateAllDiagrams() {
  console.log(`Generating ${Object.keys(DIAGRAMS).length} diagrams...`);
  for (const [qNum, svgContent] of Object.entries(DIAGRAMS)) {
    const filename = `pot_q${qNum}.png`;
    const backendPath = path.join(outDirBackend, filename);
    const frontendPath = path.join(outDirFrontend, filename);
    
    const buffer = Buffer.from(svgContent);
    await sharp(buffer)
      .png({ quality: 95 })
      .toFile(backendPath);
      
    fs.copyFileSync(backendPath, frontendPath);
    console.log(`Saved ${filename}`);
  }
  console.log('All electrostatic potential diagrams generated successfully!');
}

generateAllDiagrams().catch(console.error);
