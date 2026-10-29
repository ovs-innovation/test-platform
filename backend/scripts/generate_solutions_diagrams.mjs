import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: 'fyxpnmdh',
  api_key: '716642519429436',
  api_secret: '69WgGypmzKl34WdRC_OLaKiaBRU',
});

const outDir = path.resolve(__dirname, 'assets/solutions');
fs.mkdirSync(outDir, { recursive: true });

// 1. Q4: Ostwald-Walker Dry Air into Solution Apparatus
const svgQ4 = `
<svg width="500" height="260" viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .label { font-size: 15px; font-weight: bold; fill: #1e293b; }
    .arrow { stroke: #0284c7; stroke-width: 3; fill: none; marker-end: url(#arrow-blue); }
    .tubing { stroke: #334155; stroke-width: 3; fill: none; }
    .vessel { stroke: #0f172a; stroke-width: 3.5; fill: #f8fafc; }
  </style>
  <defs>
    <marker id="arrow-blue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#0284c7" />
    </marker>
  </defs>

  <!-- Left inlet tube: Dry Air -->
  <line x1="40" y1="65" x2="110" y2="65" class="arrow" />
  <text x="35" y="55" class="label">Dry Air</text>

  <!-- Container body -->
  <rect x="120" y="50" width="260" height="150" rx="6" class="vessel" />
  
  <!-- Solution in container -->
  <rect x="123" y="125" width="254" height="72" fill="#e0f2fe" opacity="0.8" />
  <line x1="123" y1="125" x2="377" y2="125" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="6,4" />
  <line x1="123" y1="145" x2="377" y2="145" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5,5" />
  <line x1="123" y1="165" x2="377" y2="165" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5,5" />
  <line x1="123" y1="185" x2="377" y2="185" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5,5" />

  <!-- Inlet pipe extending into liquid -->
  <path d="M 100 65 L 160 65 L 160 170" class="tubing" />
  <polygon points="156 165, 160 175, 164 165" fill="#334155" />

  <!-- Outlet pipe from vapor space -->
  <path d="M 340 100 L 340 65 L 400 65" class="tubing" />

  <!-- Right outlet tube: Moist Air -->
  <line x1="390" y1="65" x2="455" y2="65" class="arrow" />
  <text x="405" y="55" class="label">Moist Air</text>

  <text x="250" y="235" text-anchor="middle" font-size="14px" fill="#475569" font-weight="bold">Solution Container</text>
</svg>
`;

// 2. Q17: Sugar solution and water in closed bell jar
const svgQ17 = `
<svg width="520" height="280" viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .beaker { stroke: #1e293b; stroke-width: 2.5; fill: #ffffff; }
    .label { font-size: 14px; font-weight: bold; fill: #0f172a; }
  </style>

  <!-- Base platform -->
  <rect x="40" y="240" width="440" height="12" rx="4" fill="#64748b" />

  <!-- Glass Bell Jar (Dome) -->
  <path d="M 90 240 L 90 110 C 90 40, 430 40, 430 110 L 430 240" stroke="#0284c7" stroke-width="3" fill="#f0f9ff" opacity="0.6" />
  <!-- Bell jar knob -->
  <circle cx="260" cy="40" r="14" stroke="#0284c7" stroke-width="3" fill="#bae6fd" />

  <!-- Left Beaker: Sugar solution -->
  <rect x="130" y="160" width="85" height="78" rx="2" class="beaker" />
  <rect x="132" y="195" width="81" height="41" fill="#fed7aa" opacity="0.75" />
  <line x1="132" y1="195" x2="213" y2="195" stroke="#f97316" stroke-width="2" />
  
  <!-- Right Beaker: Pure water -->
  <rect x="305" y="160" width="85" height="78" rx="2" class="beaker" />
  <rect x="307" y="195" width="81" height="41" fill="#bae6fd" opacity="0.8" />
  <line x1="307" y1="195" x2="388" y2="195" stroke="#0284c7" stroke-width="2" />

  <!-- Labels with pointer lines -->
  <line x1="172" y1="215" x2="135" y2="265" stroke="#475569" stroke-width="1.5" />
  <text x="60" y="275" class="label">Sugar solution</text>
  <text x="75" y="290" font-size="12px" fill="#64748b">(in water)</text>

  <line x1="347" y1="215" x2="385" y2="265" stroke="#475569" stroke-width="1.5" />
  <text x="375" y="275" class="label">Pure water</text>
</svg>
`;

// 3. Q22: Raoult's Law Vapour Pressure Graph
const svgQ22 = `
<svg width="500" height="340" viewBox="0 0 500 340" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2.5; }
    .plotline { stroke: #0f172a; stroke-width: 2.2; }
    .dashed { stroke: #475569; stroke-width: 1.8; stroke-dasharray: 5,4; }
    .txt { font-size: 15px; font-weight: bold; fill: #0f172a; }
  </style>

  <!-- Left vertical axis -->
  <line x1="100" y1="60" x2="100" y2="260" class="axis" />
  <!-- Right vertical axis -->
  <line x1="400" y1="60" x2="400" y2="260" class="axis" />
  <!-- Bottom baseline -->
  <line x1="100" y1="260" x2="400" y2="260" class="axis" />

  <!-- Points and Lines -->
  <!-- A is top left (100, 90), D is bottom right (400, 260) -->
  <line x1="100" y1="90" x2="400" y2="260" class="plotline" />
  <!-- B is top right (400, 110), C is bottom left (100, 260) -->
  <line x1="400" y1="110" x2="100" y2="260" class="plotline" />
  <!-- E is total VP line from A to B -->
  <line x1="100" y1="90" x2="400" y2="110" class="plotline" stroke-width="2.5" />

  <!-- Vertical dashed line at intermediate mole fraction xe (x=240) -->
  <!-- On AB: y = 90 + (110-90)*(140/300) = 99.3 (point E) -->
  <!-- On AD: y = 90 + (260-90)*(140/300) = 169.3 (point F) -->
  <!-- On BC: y = 260 - (260-110)*(140/300) = 190.0 (point G) -->
  <line x1="240" y1="99" x2="240" y2="260" class="dashed" />

  <!-- Labels on Vertices -->
  <text x="80" y="90" class="txt">A</text>
  <text x="415" y="115" class="txt">B</text>
  <text x="85" y="265" class="txt">C</text>
  <text x="410" y="265" class="txt">D</text>

  <!-- Intersection Labels on dashed line -->
  <text x="245" y="92" class="txt">E</text>
  <text x="250" y="165" class="txt">F</text>
  <text x="220" y="200" class="txt">G</text>
  <text x="235" y="280" class="txt">H</text>

  <!-- X axis labels -->
  <text x="75" y="285" font-size="14px" font-weight="bold" fill="#1e293b">x<tspan font-size="10px" dy="3">A</tspan><tspan font-size="14px" dy="-3"> = 1</tspan></text>
  <text x="390" y="285" font-size="14px" font-weight="bold" fill="#1e293b">x<tspan font-size="10px" dy="3">B</tspan><tspan font-size="14px" dy="-3"> = 1</tspan></text>
  <text x="280" y="295" font-size="13px" fill="#475569">x<tspan font-size="10px" dy="3">e</tspan></text>
  <text x="250" y="325" text-anchor="middle" font-size="14px" fill="#334155" font-weight="bold">(Mole fraction of B)</text>

  <!-- Y axis label -->
  <text x="45" y="170" class="txt" transform="rotate(-90 45,170)">Vapour pressure ↑</text>
</svg>
`;

// 4. Q27: V.P. vs Temperature (Freezing Point Depression Phase Diagram)
const svgQ27 = `
<svg width="480" height="320" viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2.5; }
    .curve { stroke: #0284c7; stroke-width: 2.5; fill: none; }
    .dashed { stroke: #64748b; stroke-width: 1.8; stroke-dasharray: 4,4; }
    .txt { font-size: 15px; font-weight: bold; fill: #0f172a; }
    .tag { font-size: 13px; font-weight: bold; fill: #334155; }
  </style>

  <!-- Axes -->
  <line x1="80" y1="40" x2="80" y2="250" class="axis" />
  <line x1="80" y1="250" x2="440" y2="250" class="axis" />
  <text x="35" y="145" class="txt" transform="rotate(-90 35,145)">V.P. ↑</text>
  <text x="410" y="280" class="txt">Temp →</text>

  <!-- Curve A-B: Solid solvent -->
  <path d="M 110 220 Q 150 180, 200 130" class="curve" stroke="#0f172a" />
  <text x="95" y="225" class="txt">A</text>
  <text x="195" y="120" class="txt">B</text>

  <!-- Curve B-C: Liquid solvent -->
  <path d="M 200 130 Q 280 90, 360 65" class="curve" stroke="#0284c7" />
  <text x="368" y="65" class="txt">C</text>
  <text x="245" y="80" class="tag" transform="rotate(-15 245,80)">solvent (liquid)</text>

  <!-- Curve D-E: Solution -->
  <path d="M 160 170 Q 260 125, 360 100" class="curve" stroke="#dc2626" />
  <text x="145" y="170" class="txt">D</text>
  <text x="368" y="105" class="txt">E</text>
  <text x="270" y="125" class="tag" fill="#dc2626" transform="rotate(-15 270,125)">solution</text>

  <!-- Dashed lines dropping to Temperature axis -->
  <!-- From D (freezing point of solution Tf) -->
  <line x1="160" y1="170" x2="160" y2="250" class="dashed" />
  <text x="150" y="275" class="txt">T<tspan font-size="11px" dy="3">f</tspan></text>

  <!-- From B (freezing point of pure solvent Tf°) -->
  <line x1="200" y1="130" x2="200" y2="250" class="dashed" />
  <text x="192" y="275" class="txt">T<tspan font-size="11px" dy="3">f</tspan><tspan font-size="11px" dy="-4">°</tspan></text>
</svg>
`;

// 5. Q43: Total V.P. and Partial Pressures vs Mole Fraction
const svgQ43 = `
<svg width="480" height="320" viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2.5; }
    .plotline { stroke: #0f172a; stroke-width: 2.2; }
    .dashed { stroke: #475569; stroke-width: 1.8; stroke-dasharray: 4,4; }
    .txt { font-size: 15px; font-weight: bold; fill: #0f172a; }
  </style>

  <!-- Left & Right Axes -->
  <line x1="90" y1="60" x2="90" y2="250" class="axis" />
  <line x1="390" y1="60" x2="390" y2="250" class="axis" />
  <line x1="90" y1="250" x2="390" y2="250" class="axis" />

  <!-- PA° on left (90, 140), PB° on right (390, 80) -->
  <line x1="90" y1="140" x2="390" y2="250" class="plotline" />
  <line x1="390" y1="80" x2="90" y2="250" class="plotline" />
  <!-- Total VP line -->
  <line x1="90" y1="140" x2="390" y2="80" class="plotline" stroke-width="2.5" />

  <!-- Intersection Vertical line at x = 240 -->
  <!-- On Total line: y = 140 - (140-80)*(150/300) = 110 (Point A) -->
  <!-- On PB line: y = 250 - (250-80)*(150/300) = 165 (Point B) -->
  <!-- On PA line: y = 140 + (250-140)*(150/300) = 195 (Point C) -->
  <line x1="240" y1="110" x2="240" y2="250" class="dashed" />

  <text x="245" y="105" class="txt">A</text>
  <text x="245" y="160" class="txt">B</text>
  <text x="245" y="195" class="txt">C</text>
  <text x="235" y="270" class="txt">D</text>

  <text x="50" y="145" class="txt">P<tspan font-size="11px" dy="3">A</tspan><tspan font-size="11px" dy="-4">°</tspan></text>
  <text x="400" y="85" class="txt">P<tspan font-size="11px" dy="3">B</tspan><tspan font-size="11px" dy="-4">°</tspan></text>

  <text x="75" y="275" font-size="14px" font-weight="bold">x<tspan font-size="10px" dy="3">B</tspan><tspan font-size="14px" dy="-3"> = 0</tspan></text>
  <text x="370" y="275" font-size="14px" font-weight="bold">x<tspan font-size="10px" dy="3">B</tspan><tspan font-size="14px" dy="-3"> = 1</tspan></text>
  <text x="240" y="305" text-anchor="middle" font-size="14px" fill="#334155" font-weight="bold">(mol fraction)</text>
</svg>
`;

// 6. Q66: Solubility vs Temperature Curve with Apex
const svgQ66 = `
<svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2.5; }
    .curve { stroke: #0284c7; stroke-width: 3.5; fill: none; stroke-linecap: round; }
    .txt { font-size: 15px; font-weight: bold; fill: #0f172a; }
  </style>

  <!-- Axes -->
  <line x1="80" y1="40" x2="80" y2="220" class="axis" />
  <line x1="80" y1="220" x2="400" y2="220" class="axis" />

  <text x="35" y="130" class="txt" transform="rotate(-90 35,130)">Solubility ↑</text>
  <text x="240" y="255" text-anchor="middle" class="txt">Temperature →</text>

  <!-- Peak curve: rises to peak at x=230, y=90, then drops -->
  <path d="M 100 180 Q 170 140, 230 90 Q 290 140, 360 170" class="curve" />

  <!-- Transition point annotation -->
  <circle cx="230" cy="90" r="4.5" fill="#ef4444" />
  <line x1="230" y1="90" x2="230" y2="220" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="4,4" />
  <text x="230" y="75" text-anchor="middle" font-size="13px" font-weight="bold" fill="#ef4444">Peak (32.4°C)</text>
</svg>
`;

// 7. Q72: SPM Separating Cu2+ and NH3 Compartments
const svgQ72 = `
<svg width="480" height="260" viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .vessel { stroke: #0f172a; stroke-width: 3; fill: #f8fafc; }
    .spm { stroke: #ef4444; stroke-width: 3; stroke-dasharray: 6,4; }
    .txt { font-size: 16px; font-weight: bold; fill: #0f172a; }
    .chem { font-size: 15px; font-weight: bold; fill: #1e293b; }
  </style>

  <!-- Main Vessel divided into two -->
  <rect x="100" y="40" width="280" height="170" rx="4" class="vessel" />
  
  <!-- Left compartment A liquid (light blue) -->
  <rect x="103" y="80" width="137" height="127" fill="#e0f2fe" opacity="0.8" />
  <!-- Right compartment B liquid (light amber) -->
  <rect x="240" y="80" width="137" height="127" fill="#fef3c7" opacity="0.8" />

  <!-- SPM Divider -->
  <line x1="240" y1="40" x2="240" y2="210" class="spm" />

  <!-- Labels Compartment A -->
  <text x="165" y="70" class="txt" text-anchor="middle">A</text>
  <text x="165" y="130" class="chem" text-anchor="middle">0.1 M</text>
  <text x="165" y="155" class="chem" text-anchor="middle">Cu<tspan font-size="11px" dy="-4">2+</tspan><tspan font-size="15px" dy="4"> (aq)</tspan></text>

  <!-- Labels Compartment B -->
  <text x="310" y="70" class="txt" text-anchor="middle">B</text>
  <text x="310" y="130" class="chem" text-anchor="middle">0.1 M</text>
  <text x="310" y="155" class="chem" text-anchor="middle">NH<tspan font-size="11px" dy="3">3</tspan><tspan font-size="15px" dy="-3"> (aq)</tspan></text>

  <!-- SPM Label -->
  <text x="240" y="240" class="txt" fill="#ef4444" text-anchor="middle">S.P.M.</text>
</svg>
`;

// 8. Q73: Boiling Point vs Composition (Minimum Boiling Azeotrope)
const svgQ73 = `
<svg width="460" height="280" viewBox="0 0 460 280" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2.5; }
    .curve { stroke: #0284c7; stroke-width: 2.8; fill: none; }
    .txt { font-size: 15px; font-weight: bold; fill: #0f172a; }
  </style>

  <!-- Axes -->
  <line x1="90" y1="50" x2="90" y2="230" class="axis" />
  <line x1="390" y1="50" x2="390" y2="230" class="axis" />
  <line x1="90" y1="230" x2="390" y2="230" class="axis" />

  <text x="45" y="140" class="txt" transform="rotate(-90 45,140)">B.P. ↑</text>

  <!-- Boiling Curve dipping to minimum point C -->
  <path d="M 90 120 Q 180 185, 270 190 Q 330 185, 390 135" class="curve" />
  <path d="M 90 120 Q 180 205, 270 190 Q 330 165, 390 135" class="curve" stroke="#f97316" stroke-dasharray="4,4" />

  <!-- Points A, B, C, D -->
  <circle cx="90" cy="120" r="4" fill="#0f172a" />
  <text x="105" y="115" class="txt">A</text>

  <circle cx="170" cy="165" r="4" fill="#0f172a" />
  <text x="165" y="150" class="txt">B</text>

  <circle cx="270" cy="190" r="4.5" fill="#ef4444" />
  <text x="270" y="215" class="txt" fill="#ef4444" text-anchor="middle">C</text>

  <circle cx="340" cy="165" r="4" fill="#0f172a" />
  <text x="345" y="155" class="txt">D</text>

  <text x="75" y="250" font-size="14px" font-weight="bold">x<tspan font-size="10px" dy="3">A</tspan><tspan font-size="14px" dy="-3"> = 1</tspan></text>
  <text x="375" y="250" font-size="14px" font-weight="bold">x<tspan font-size="10px" dy="3">B</tspan><tspan font-size="14px" dy="-3"> = 1</tspan></text>
</svg>
`;

// 9. Q82: Water-Ethanol Azeotrope Temperature vs Composition
const svgQ82 = `
<svg width="480" height="300" viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2.5; }
    .curve { stroke: #0284c7; stroke-width: 2.5; fill: none; }
    .dashed { stroke: #ef4444; stroke-width: 1.8; stroke-dasharray: 4,4; }
    .txt { font-size: 15px; font-weight: bold; fill: #0f172a; }
  </style>

  <!-- Axes -->
  <line x1="90" y1="50" x2="90" y2="240" class="axis" />
  <line x1="410" y1="50" x2="410" y2="240" class="axis" />
  <line x1="90" y1="240" x2="410" y2="240" class="axis" />

  <text x="35" y="145" class="txt" transform="rotate(-90 35,145)">Boiling Temperature ↑</text>

  <!-- Liquid and Vapour curves meeting at minimum azeotrope C (x=350, y=180) -->
  <path d="M 90 90 Q 220 170, 350 180 Q 380 175, 410 145" class="curve" stroke="#0284c7" stroke-width="2.5" />
  <path d="M 90 90 Q 220 200, 350 180 Q 380 155, 410 145" class="curve" stroke="#f97316" stroke-width="2.5" />

  <!-- Points A (Water, 100°C), B (Ethanol, 78.3°C), C (Azeotrope, 78.13°C) -->
  <circle cx="90" cy="90" r="4.5" fill="#0f172a" />
  <text x="70" y="85" class="txt">A</text>
  <text x="100" y="85" font-size="12px" fill="#475569">(100°C)</text>

  <circle cx="410" cy="145" r="4.5" fill="#0f172a" />
  <text x="420" y="145" class="txt">B</text>
  <text x="420" y="165" font-size="12px" fill="#475569">(78.3°C)</text>

  <circle cx="350" cy="180" r="5" fill="#ef4444" />
  <text x="350" y="205" class="txt" fill="#ef4444" text-anchor="middle">C</text>
  <text x="350" y="222" font-size="12px" font-weight="bold" fill="#ef4444" text-anchor="middle">(78.13°C)</text>

  <!-- Mole fraction markers -->
  <text x="85" y="265" class="txt">0</text>
  <text x="405" y="265" class="txt">1</text>
  <text x="250" y="280" text-anchor="middle" font-size="14px" fill="#334155" font-weight="bold">Mole fraction of B (Ethanol)</text>
</svg>
`;

// 10. Q152: Total V.P. Graphs for Non-volatile Solute
const svgQ152 = `
<svg width="600" height="280" viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2; }
    .plotline { stroke: #0284c7; stroke-width: 2.5; }
    .lbl { font-size: 13px; font-weight: bold; fill: #1e293b; text-anchor: middle; }
    .sub { font-size: 11px; fill: #475569; text-anchor: middle; }
  </style>

  <!-- (1) Graph 1 -->
  <rect x="20" y="20" width="165" height="190" fill="#f8fafc" stroke="#e2e8f0" rx="4" />
  <line x1="45" y1="40" x2="45" y2="160" class="axis" />
  <line x1="45" y1="160" x2="165" y2="160" class="axis" />
  <line x1="45" y1="130" x2="165" y2="70" class="plotline" />
  <text x="45" y="32" class="sub">Total V.P.</text>
  <text x="45" y="175" class="sub">x<tspan font-size="9px" dy="2">A</tspan><tspan font-size="11px" dy="-2">=1</tspan></text>
  <text x="165" y="175" class="sub">x<tspan font-size="9px" dy="2">B</tspan><tspan font-size="11px" dy="-2">=1</tspan></text>
  <text x="105" y="200" class="lbl">(1)</text>

  <!-- (2) Graph 2 -->
  <rect x="215" y="20" width="165" height="190" fill="#f8fafc" stroke="#e2e8f0" rx="4" />
  <line x1="240" y1="40" x2="240" y2="160" class="axis" />
  <line x1="240" y1="160" x2="360" y2="160" class="axis" />
  <line x1="240" y1="70" x2="360" y2="130" class="plotline" />
  <text x="240" y="32" class="sub">Total V.P.</text>
  <text x="240" y="175" class="sub">x<tspan font-size="9px" dy="2">A</tspan><tspan font-size="11px" dy="-2">=1</tspan></text>
  <text x="360" y="175" class="sub">x<tspan font-size="9px" dy="2">B</tspan><tspan font-size="11px" dy="-2">=1</tspan></text>
  <text x="300" y="200" class="lbl">(2)</text>

  <!-- (3) Graph 3 -->
  <rect x="410" y="20" width="165" height="190" fill="#f8fafc" stroke="#e2e8f0" rx="4" />
  <line x1="435" y1="40" x2="435" y2="160" class="axis" />
  <line x1="435" y1="160" x2="555" y2="160" class="axis" />
  <line x1="435" y1="70" x2="555" y2="160" class="plotline" />
  <text x="435" y="32" class="sub">Total V.P.</text>
  <text x="435" y="175" class="sub">x<tspan font-size="9px" dy="2">A</tspan><tspan font-size="11px" dy="-2">=1</tspan></text>
  <text x="555" y="175" class="sub">x<tspan font-size="9px" dy="2">B</tspan><tspan font-size="11px" dy="-2">=1</tspan></text>
  <text x="495" y="200" class="lbl">(3)</text>
</svg>
`;

// 11. Q153: Three Beakers A, B, C with Different KCl Concentrations
const svgQ153 = `
<svg width="560" height="240" viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .beaker { stroke: #0f172a; stroke-width: 2.5; fill: #ffffff; }
    .liquid { fill: #e0f2fe; stroke: #38bdf8; stroke-width: 1.5; }
    .label { font-size: 17px; font-weight: bold; fill: #0f172a; text-anchor: middle; }
    .conc { font-size: 14px; font-weight: bold; fill: #0369a1; text-anchor: middle; }
  </style>

  <!-- Beaker A -->
  <rect x="40" y="40" width="120" height="130" rx="3" class="beaker" />
  <rect x="42" y="75" width="116" height="93" class="liquid" />
  <text x="100" y="115" class="conc">0.0001 M</text>
  <text x="100" y="138" class="conc">KCl</text>
  <text x="100" y="200" class="label">A</text>

  <!-- Beaker B -->
  <rect x="220" y="40" width="120" height="130" rx="3" class="beaker" />
  <rect x="222" y="75" width="116" height="93" class="liquid" />
  <text x="280" y="115" class="conc">0.00001 M</text>
  <text x="280" y="138" class="conc">KCl</text>
  <text x="280" y="200" class="label">B</text>

  <!-- Beaker C -->
  <rect x="400" y="40" width="120" height="130" rx="3" class="beaker" />
  <rect x="402" y="75" width="116" height="93" class="liquid" />
  <text x="460" y="115" class="conc">0.001 M</text>
  <text x="460" y="138" class="conc">KCl</text>
  <text x="460" y="200" class="label">C</text>
</svg>
`;

const DIAGRAMS = [
  { key: 'q4_ostwald_walker', svg: svgQ4 },
  { key: 'q17_bell_jar', svg: svgQ17 },
  { key: 'q22_raoult_graph', svg: svgQ22 },
  { key: 'q27_fp_depression_graph', svg: svgQ27 },
  { key: 'q43_vp_mol_fraction_graph', svg: svgQ43 },
  { key: 'q66_glauber_solubility_curve', svg: svgQ66 },
  { key: 'q72_spm_cu_nh3', svg: svgQ72 },
  { key: 'q73_azeotrope_bp_curve', svg: svgQ73 },
  { key: 'q82_ethanol_water_azeotrope', svg: svgQ82 },
  { key: 'q152_nonvolatile_vp_graphs', svg: svgQ152 },
  { key: 'q153_three_kcl_beakers', svg: svgQ153 },
];

async function generateAndUpload() {
  console.log('--- Generating and Uploading Solutions Diagrams ---');
  const urls = {};

  for (const item of DIAGRAMS) {
    const pngPath = path.join(outDir, `${item.key}.png`);
    await sharp(Buffer.from(item.svg))
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(pngPath);
    console.log(`Rendered PNG: ${pngPath}`);

    const uploadRes = await cloudinary.uploader.upload(pngPath, {
      folder: 'edvedum_solutions',
      public_id: item.key,
      overwrite: true,
    });
    console.log(`Uploaded ${item.key}: ${uploadRes.secure_url}`);
    urls[item.key] = uploadRes.secure_url;
  }

  const jsonPath = path.resolve(__dirname, 'solutions_diagrams.json');
  fs.writeFileSync(jsonPath, JSON.stringify(urls, null, 2));
  console.log(`Saved diagram URLs to ${jsonPath}`);
}

generateAndUpload().catch(console.error);
