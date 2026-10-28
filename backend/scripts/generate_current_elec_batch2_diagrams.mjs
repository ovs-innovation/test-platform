import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BACKEND_DIR = path.resolve(__dirname, '../uploads/current_electricity');
const FRONTEND_DIR = path.resolve(__dirname, '../../frontend/public/uploads/current_electricity');

[BACKEND_DIR, FRONTEND_DIR].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

async function saveSvgAsPng(filename, svgString) {
  const buf = Buffer.from(svgString);
  const backendPath = path.join(BACKEND_DIR, filename);
  const frontendPath = path.join(FRONTEND_DIR, filename);

  await sharp(buf).png({ quality: 95 }).toFile(backendPath);
  fs.copyFileSync(backendPath, frontendPath);
  console.log(`Saved: ${filename}`);
}

async function generateAll() {
  console.log('Generating Batch 2 Diagrams for Current Electricity...');

  // 1. Q30: 11-Resistor Cube Network
  await saveSvgAsPng('current_elec_q30_cube_network.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="340" viewBox="0 0 400 340">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Front Face (Missing left edge between A and B) -->
        <!-- Top edge -->
        <path d="M 120 80 l 20 0 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6 l 26 0" />
        <!-- Right edge -->
        <path d="M 200 80 l 0 20 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4 l 0 26" />
        <!-- Bottom edge -->
        <path d="M 120 160 l 20 0 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6 l 26 0" />
        <!-- Back Face -->
        <!-- Top edge -->
        <path d="M 180 50 l 20 0 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6 l 26 0" />
        <!-- Right edge -->
        <path d="M 260 50 l 0 20 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4 l 0 26" />
        <!-- Bottom edge -->
        <path d="M 180 130 l 20 0 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6 l 26 0" />
        <!-- Left edge of back face -->
        <path d="M 180 50 l 0 20 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4 l 0 26" />
        <!-- Connecting Edges (depth) -->
        <!-- Top-left -->
        <path d="M 120 80 l 15 -7.5 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6 l 13 -6.5" />
        <!-- Top-right -->
        <path d="M 200 80 l 15 -7.5 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6 l 13 -6.5" />
        <!-- Bottom-right -->
        <path d="M 200 160 l 15 -7.5 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6 l 13 -6.5" />
        <!-- Bottom-left -->
        <path d="M 120 160 l 15 -7.5 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6 l 13 -6.5" />
        <!-- Terminal leads to A and B -->
        <line x1="80" y1="80" x2="120" y2="80" stroke="#ef4444" stroke-width="3" />
        <line x1="80" y1="160" x2="120" y2="160" stroke="#ef4444" stroke-width="3" />
      </g>
      <!-- Terminals A and B -->
      <circle cx="120" cy="80" r="5" fill="#ef4444" />
      <circle cx="120" cy="160" r="5" fill="#ef4444" />
      <text x="60" y="86" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ef4444">A</text>
      <text x="60" y="166" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ef4444">B</text>
      <text x="110" y="220" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b">11 wires of resistance R (edge AB missing)</text>
    </svg>
  `);

  // 2. Q34: Dual Loop with 10V, 6V, 4V Batteries
  await saveSvgAsPng('current_elec_q34_circuit.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="440" height="260" viewBox="0 0 440 260">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Outer rectangle -->
        <!-- Top Branch: 4Ω resistor, 6V battery (+ on right) -->
        <line x1="80" y1="50" x2="160" y2="50" />
        <path d="M 160 50 l 4 -7 l 8 14 l 8 -14 l 8 14 l 4 -7" />
        <line x1="192" y1="50" x2="280" y2="50" />
        <line x1="280" y1="38" x2="280" y2="62" stroke-width="4.5" />
        <line x1="288" y1="32" x2="288" y2="68" stroke-width="3" />
        <line x1="288" y1="50" x2="360" y2="50" />

        <!-- Right Vertical Wire -->
        <line x1="360" y1="50" x2="360" y2="210" />

        <!-- Bottom Branch: 2Ω resistor, 4V battery (+ on left) -->
        <line x1="360" y1="210" x2="280" y2="210" />
        <line x1="280" y1="198" x2="280" y2="222" stroke-width="4.5" />
        <line x1="272" y1="192" x2="272" y2="228" stroke-width="3" />
        <line x1="272" y1="210" x2="200" y2="210" />
        <path d="M 200 210 l -4 -7 l -8 14 l -8 -14 l -8 14 l -4 -7" />
        <line x1="168" y1="210" x2="80" y2="210" />

        <!-- Left Vertical Wire -->
        <line x1="80" y1="210" x2="80" y2="50" />

        <!-- Diagonal Branch: 10V battery (+ on right) -->
        <line x1="80" y1="210" x2="210" y2="135" />
        <!-- 10V Battery -->
        <line x1="210" y1="123" x2="210" y2="147" stroke-width="4.5" />
        <line x1="218" y1="117" x2="218" y2="153" stroke-width="3" />
        <line x1="218" y1="130" x2="360" y2="50" />
      </g>
      <!-- Labels -->
      <text x="170" y="35" font-family="sans-serif" font-size="13" font-weight="bold">4Ω</text>
      <text x="275" y="25" font-family="sans-serif" font-size="13" font-weight="bold">6V</text>
      <text x="215" y="105" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0284c7">10V</text>
      <text x="175" y="235" font-family="sans-serif" font-size="13" font-weight="bold">2Ω</text>
      <text x="270" y="235" font-family="sans-serif" font-size="13" font-weight="bold">4V</text>
    </svg>
  `);

  // 3. Q35: Trapezoid 7-Resistor Network
  await saveSvgAsPng('current_elec_q35_trapezoid_network.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="420" height="220" viewBox="0 0 420 220">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Bottom rail: A to M to B -->
        <line x1="60" y1="160" x2="200" y2="160" />
        <line x1="200" y1="160" x2="340" y2="160" />
        <!-- Top rail: C to D -->
        <line x1="130" y1="50" x2="270" y2="50" />
        <!-- Outer slanted: A to C and D to B -->
        <line x1="60" y1="160" x2="130" y2="50" />
        <line x1="270" y1="50" x2="340" y2="160" />
        <!-- Inner slanted: M to C and M to D -->
        <line x1="200" y1="160" x2="130" y2="50" />
        <line x1="200" y1="160" x2="270" y2="50" />
      </g>
      <!-- Vertex circles -->
      <circle cx="60" cy="160" r="5" fill="#ef4444" />
      <circle cx="340" cy="160" r="5" fill="#ef4444" />
      <circle cx="200" cy="160" r="4" fill="#64748b" />
      <circle cx="130" cy="50" r="4" fill="#64748b" />
      <circle cx="270" cy="50" r="4" fill="#64748b" />
      <!-- Labels -->
      <text x="40" y="166" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ef4444">A</text>
      <text x="350" y="166" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ef4444">B</text>
      <text x="125" y="178" font-family="sans-serif" font-size="14" font-style="italic">r</text>
      <text x="265" y="178" font-family="sans-serif" font-size="14" font-style="italic">r</text>
      <text x="195" y="40" font-family="sans-serif" font-size="14" font-style="italic">r</text>
      <text x="85" y="100" font-family="sans-serif" font-size="14" font-style="italic">r</text>
      <text x="175" y="100" font-family="sans-serif" font-size="14" font-style="italic">r</text>
      <text x="225" y="100" font-family="sans-serif" font-size="14" font-style="italic">r</text>
      <text x="315" y="100" font-family="sans-serif" font-size="14" font-style="italic">r</text>
    </svg>
  `);

  // 4. Q37: Wheatstone Bridge Balancing
  await saveSvgAsPng('current_elec_q37_wheatstone_bridge.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <line x1="40" y1="140" x2="80" y2="140" />
        <line x1="320" y1="140" x2="360" y2="140" />
        <!-- Diamond arms -->
        <!-- Arm AC: 10Ω -->
        <path d="M 80 140 l 30 -40 l 4 -5 l 8 10 l 8 -10 l 8 10 l 4 -5 l 58 -50" />
        <!-- Arm CB: 50Ω -->
        <path d="M 200 40 l 30 25 l 4 5 l 8 -10 l 8 10 l 8 -10 l 4 5 l 58 75" />
        <!-- Arm AD: 12Ω -->
        <path d="M 80 140 l 30 40 l 4 5 l 8 -10 l 8 10 l 8 -10 l 4 5 l 58 50" />
        <!-- Arm DB: 20Ω -->
        <path d="M 200 240 l 30 -25 l 4 -5 l 8 10 l 8 -10 l 8 10 l 4 -5 l 58 -75" />
        <!-- Galvanometer between C and D -->
        <line x1="200" y1="40" x2="200" y2="115" />
        <circle cx="200" cy="140" r="18" fill="#f8fafc" stroke="#334155" />
        <line x1="200" y1="165" x2="200" y2="240" />
      </g>
      <!-- Node circles -->
      <circle cx="80" cy="140" r="4.5" fill="#0284c7" />
      <circle cx="320" cy="140" r="4.5" fill="#0284c7" />
      <circle cx="200" cy="40" r="4" fill="#64748b" />
      <circle cx="200" cy="240" r="4" fill="#64748b" />
      <!-- Labels -->
      <text x="60" y="145" font-family="sans-serif" font-size="18" font-weight="bold">A</text>
      <text x="330" y="145" font-family="sans-serif" font-size="18" font-weight="bold">B</text>
      <text x="195" y="28" font-family="sans-serif" font-size="18" font-weight="bold">C</text>
      <text x="195" y="265" font-family="sans-serif" font-size="18" font-weight="bold">D</text>
      <text x="193" y="147" font-family="sans-serif" font-size="16" font-weight="bold">G</text>
      <text x="120" y="70" font-family="sans-serif" font-size="14" font-weight="bold">10Ω</text>
      <text x="270" y="70" font-family="sans-serif" font-size="14" font-weight="bold">50Ω</text>
      <text x="110" y="215" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ef4444">12Ω</text>
      <text x="270" y="215" font-family="sans-serif" font-size="14" font-weight="bold">20Ω</text>
      <text x="45" y="130" font-family="sans-serif" font-size="14" font-style="italic">I →</text>
      <text x="335" y="130" font-family="sans-serif" font-size="14" font-style="italic">→ I</text>
    </svg>
  `);

  // 5. Q38: Symmetrical Bridge Circuit
  await saveSvgAsPng('current_elec_q38_bridge_circuit.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="460" height="260" viewBox="0 0 460 260">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Lead A -->
        <line x1="40" y1="120" x2="80" y2="120" />
        <line x1="80" y1="120" x2="80" y2="60" />
        <line x1="80" y1="120" x2="80" y2="180" />
        <!-- Top Left 10Ω -->
        <line x1="80" y1="60" x2="110" y2="60" />
        <path d="M 110 60 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="142" y1="60" x2="180" y2="60" />
        <!-- Bottom Left 20Ω -->
        <line x1="80" y1="180" x2="110" y2="180" />
        <path d="M 110 180 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="142" y1="180" x2="180" y2="180" />
        <!-- Central vertical 20Ω -->
        <line x1="180" y1="60" x2="180" y2="100" />
        <path d="M 180 100 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4" />
        <line x1="180" y1="132" x2="180" y2="180" />

        <!-- Right square from (180,60) to (300,180) -->
        <!-- Top 3Ω -->
        <line x1="180" y1="60" x2="220" y2="60" />
        <path d="M 220 60 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="252" y1="60" x2="300" y2="60" />
        <!-- Right 7Ω -->
        <line x1="300" y1="60" x2="300" y2="100" />
        <path d="M 300 100 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4" />
        <line x1="300" y1="132" x2="300" y2="180" />
        <!-- Bottom 10Ω -->
        <line x1="180" y1="180" x2="220" y2="180" />
        <path d="M 220 180 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="252" y1="180" x2="300" y2="180" />
        <!-- Diagonal 10Ω from (180,60) to (300,180) -->
        <line x1="180" y1="60" x2="220" y2="100" />
        <path d="M 220 100 l 5 -5 l 10 10 l -10 10 l 10 10 l 5 -5" />
        <line x1="240" y1="120" x2="300" y2="180" />

        <!-- Terminal B lead from (300, 180) -->
        <line x1="300" y1="180" x2="350" y2="210" stroke="#0284c7" stroke-width="3" />
      </g>
      <!-- Labels -->
      <circle cx="40" cy="120" r="4.5" fill="#0284c7" />
      <circle cx="350" cy="210" r="4.5" fill="#0284c7" />
      <text x="25" y="126" font-family="sans-serif" font-size="18" font-weight="bold">A</text>
      <text x="360" y="216" font-family="sans-serif" font-size="18" font-weight="bold" fill="#0284c7">B</text>
      <text x="120" y="48" font-family="sans-serif" font-size="13" font-weight="bold">10Ω</text>
      <text x="120" y="202" font-family="sans-serif" font-size="13" font-weight="bold">20Ω</text>
      <text x="195" y="125" font-family="sans-serif" font-size="13" font-weight="bold">20Ω</text>
      <text x="235" y="48" font-family="sans-serif" font-size="13" font-weight="bold">3Ω</text>
      <text x="315" y="125" font-family="sans-serif" font-size="13" font-weight="bold">7Ω</text>
      <text x="235" y="202" font-family="sans-serif" font-size="13" font-weight="bold">10Ω</text>
      <text x="260" y="105" font-family="sans-serif" font-size="13" font-weight="bold">10Ω</text>
    </svg>
  `);

  // 6. Q39: Open Terminals Circuit
  await saveSvgAsPng('current_elec_q39_circuit.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="440" height="240" viewBox="0 0 440 240">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Series 4Ω on left -->
        <line x1="60" y1="80" x2="90" y2="80" />
        <path d="M 90 80 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="122" y1="80" x2="160" y2="80" />

        <!-- 3 parallel paths -->
        <line x1="160" y1="80" x2="160" y2="30" />
        <line x1="160" y1="80" x2="160" y2="130" />

        <!-- Top Path: 4Ω -->
        <line x1="160" y1="30" x2="220" y2="30" />
        <path d="M 220 30 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="252" y1="30" x2="320" y2="30" />

        <!-- Mid Path: 5Ω resistor to open terminal A -->
        <line x1="160" y1="80" x2="180" y2="80" />
        <path d="M 180 80 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="212" y1="80" x2="250" y2="80" />

        <!-- Bottom Path: 4Ω -->
        <line x1="160" y1="130" x2="220" y2="130" />
        <path d="M 220 130 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="252" y1="130" x2="320" y2="130" />

        <!-- Right confluence to battery -->
        <line x1="320" y1="30" x2="320" y2="130" />
        <line x1="320" y1="80" x2="360" y2="80" />
        <line x1="360" y1="80" x2="360" y2="190" />
        <line x1="360" y1="190" x2="230" y2="190" />
        <!-- 1.2V Battery -->
        <line x1="230" y1="178" x2="230" y2="202" stroke-width="3" />
        <line x1="222" y1="183" x2="222" y2="197" stroke-width="4.5" />
        <line x1="222" y1="190" x2="60" y2="190" />
        <line x1="60" y1="190" x2="60" y2="80" />
      </g>
      <!-- Terminals A and B -->
      <circle cx="250" cy="80" r="4.5" fill="#ef4444" />
      <circle cx="290" cy="80" r="4.5" fill="#ef4444" />
      <text x="245" y="105" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ef4444">A</text>
      <text x="285" y="105" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ef4444">B</text>
      <!-- Labels -->
      <text x="100" y="65" font-family="sans-serif" font-size="13">4Ω</text>
      <text x="230" y="20" font-family="sans-serif" font-size="13">4Ω</text>
      <text x="190" y="70" font-family="sans-serif" font-size="13">5Ω</text>
      <text x="230" y="150" font-family="sans-serif" font-size="13">4Ω</text>
      <text x="210" y="225" font-family="sans-serif" font-size="14" font-weight="bold">1.2V</text>
    </svg>
  `);

  // 7. Q40: Coaxial Conductors K1 and K2
  await saveSvgAsPng('current_elec_q40_coaxial_conductors.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="440" height="220" viewBox="0 0 440 220">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#334155" stroke-width="2.5" fill="none">
        <!-- Outer Cylinder -->
        <path d="M 130 50 L 310 50" />
        <path d="M 130 170 L 310 170" />
        <ellipse cx="130" cy="110" rx="15" ry="60" fill="#f8fafc" />
        <ellipse cx="310" cy="110" rx="15" ry="60" fill="#e2e8f0" />
        <!-- Inner Cylinder -->
        <path d="M 130 80 L 310 80" stroke-dasharray="4,4" />
        <path d="M 130 140 L 310 140" stroke-dasharray="4,4" />
        <ellipse cx="130" cy="110" rx="8" ry="30" fill="#bae6fd" />
        <ellipse cx="310" cy="110" rx="8" ry="30" fill="#7dd3fc" />
        <!-- Leads A and B -->
        <line x1="60" y1="110" x2="130" y2="110" stroke="#0f172a" stroke-width="3" />
        <line x1="310" y1="110" x2="380" y2="110" stroke="#0f172a" stroke-width="3" />
      </g>
      <!-- Labels -->
      <circle cx="60" cy="110" r="4.5" fill="#0284c7" />
      <circle cx="380" cy="110" r="4.5" fill="#0284c7" />
      <text x="45" y="115" font-family="sans-serif" font-size="18" font-weight="bold">A</text>
      <text x="390" y="115" font-family="sans-serif" font-size="18" font-weight="bold">B</text>
      <text x="210" y="115" font-family="sans-serif" font-size="15" font-weight="bold" fill="#0284c7">K₁ (radius R)</text>
      <text x="210" y="42" font-family="sans-serif" font-size="15" font-weight="bold" fill="#475569">K₂ (radius 2R)</text>
    </svg>
  `);

  // 8. Q41: Two Bulbs in Series
  await saveSvgAsPng('current_elec_q41_two_bulbs.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="220" viewBox="0 0 400 220">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <line x1="80" y1="80" x2="140" y2="80" />
        <!-- Bulb A -->
        <circle cx="160" cy="80" r="16" stroke="#0284c7" stroke-width="2.5" />
        <path d="M 152 88 Q 160 68 168 88" stroke="#f59e0b" stroke-width="2.5" />
        <line x1="176" y1="80" x2="224" y2="80" />
        <!-- Bulb B -->
        <circle cx="240" cy="80" r="16" stroke="#0284c7" stroke-width="2.5" />
        <path d="M 232 88 Q 240 68 248 88" stroke="#f59e0b" stroke-width="2.5" />
        <line x1="256" y1="80" x2="320" y2="80" />

        <line x1="320" y1="80" x2="320" y2="160" />
        <line x1="320" y1="160" x2="210" y2="160" />
        <!-- 250V Supply -->
        <line x1="210" y1="148" x2="210" y2="172" stroke-width="3" />
        <line x1="202" y1="153" x2="202" y2="167" stroke-width="4.5" />
        <line x1="202" y1="160" x2="80" y2="160" />
        <line x1="80" y1="160" x2="80" y2="80" />
      </g>
      <!-- Labels -->
      <text x="155" y="115" font-family="sans-serif" font-size="16" font-weight="bold">A</text>
      <text x="235" y="115" font-family="sans-serif" font-size="16" font-weight="bold">B</text>
      <text x="120" y="48" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0284c7">220V, 100W</text>
      <text x="215" y="48" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0284c7">110V, 60W</text>
      <text x="185" y="195" font-family="sans-serif" font-size="15" font-weight="bold">250V</text>
    </svg>
  `);

  // 9. Q50: Concentric Triangles
  await saveSvgAsPng('current_elec_q50_concentric_triangles.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="420" height="340" viewBox="0 0 420 340">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Outer Triangle: A(210,40), Left(90,260), Right(330,260) -->
        <line x1="210" y1="40" x2="90" y2="260" stroke="#0284c7" stroke-width="2.5" />
        <line x1="210" y1="40" x2="330" y2="260" stroke="#0284c7" stroke-width="2.5" />
        <line x1="90" y1="260" x2="330" y2="260" stroke="#64748b" stroke-width="2.5" />
        <!-- Inner Triangle: B(210,120), Left(140,230), Right(280,230) -->
        <line x1="210" y1="120" x2="140" y2="230" stroke="#0284c7" stroke-width="2.5" />
        <line x1="210" y1="120" x2="280" y2="230" stroke="#0284c7" stroke-width="2.5" />
        <line x1="140" y1="230" x2="280" y2="230" stroke="#64748b" stroke-width="2.5" />
        <!-- Spokes between corresponding vertices -->
        <line x1="210" y1="40" x2="210" y2="120" stroke="#ef4444" stroke-width="3" />
        <line x1="90" y1="260" x2="140" y2="230" stroke="#ef4444" stroke-width="3" />
        <line x1="330" y1="260" x2="280" y2="230" stroke="#ef4444" stroke-width="3" />
      </g>
      <!-- Vertex circles -->
      <circle cx="210" cy="40" r="5" fill="#ef4444" />
      <circle cx="210" cy="120" r="5" fill="#ef4444" />
      <!-- Labels -->
      <text x="205" y="28" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ef4444">A</text>
      <text x="218" y="125" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ef4444">B</text>
      <text x="215" y="80" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ef4444">1Ω</text>
      <text x="95" y="235" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ef4444">1Ω</text>
      <text x="310" y="235" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ef4444">1Ω</text>
      <text x="135" y="140" font-family="sans-serif" font-size="13" font-weight="bold">2Ω</text>
      <text x="270" y="140" font-family="sans-serif" font-size="13" font-weight="bold">2Ω</text>
      <text x="160" y="185" font-family="sans-serif" font-size="13" font-weight="bold">2Ω</text>
      <text x="245" y="185" font-family="sans-serif" font-size="13" font-weight="bold">2Ω</text>
      <text x="205" y="222" font-family="sans-serif" font-size="13" font-weight="bold">2Ω</text>
      <text x="205" y="285" font-family="sans-serif" font-size="13" font-weight="bold">2Ω</text>
    </svg>
  `);

  // 10. Q56: Star Resistor Network
  await saveSvgAsPng('current_elec_q56_star_network.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Lead A -->
        <line x1="60" y1="70" x2="110" y2="70" />
        <!-- Top R/2 resistor -->
        <path d="M 110 70 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="142" y1="70" x2="300" y2="70" />

        <!-- Star central junction O at (240, 150) -->
        <!-- Resistor R from A to O -->
        <line x1="110" y1="70" x2="165" y2="110" />
        <path d="M 165 110 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="187" y1="120" x2="240" y2="150" />

        <!-- Resistor R from (300,70) to O -->
        <line x1="300" y1="70" x2="275" y2="105" />
        <path d="M 275 105 l 4 6 l -8 12 l 8 -12 l -8 12 l 4 6" />
        <line x1="265" y1="130" x2="240" y2="150" />

        <!-- Vertical wire from O to bottom rail -->
        <line x1="240" y1="150" x2="240" y2="210" />

        <!-- Right vertical resistor R from (300,70) to (300,210) -->
        <line x1="300" y1="70" x2="300" y2="120" />
        <path d="M 300 120 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4" />
        <line x1="300" y1="152" x2="300" y2="210" />
        <line x1="240" y1="210" x2="300" y2="210" />

        <!-- Bottom R/2 resistor to Lead B -->
        <line x1="240" y1="210" x2="190" y2="210" />
        <path d="M 190 210 l -4 -6 l -8 12 l -8 -12 l -8 12 l -4 -6" />
        <line x1="158" y1="210" x2="60" y2="210" />
      </g>
      <!-- Terminals A and B -->
      <circle cx="60" cy="70" r="4.5" fill="#0284c7" />
      <circle cx="60" cy="210" r="4.5" fill="#0284c7" />
      <text x="45" y="75" font-family="sans-serif" font-size="18" font-weight="bold">A</text>
      <text x="45" y="215" font-family="sans-serif" font-size="18" font-weight="bold">B</text>
      <text x="180" y="55" font-family="sans-serif" font-size="14" font-weight="bold">R/2</text>
      <text x="175" y="235" font-family="sans-serif" font-size="14" font-weight="bold">R/2</text>
      <text x="155" y="150" font-family="sans-serif" font-size="14" font-weight="bold">R</text>
      <text x="270" y="105" font-family="sans-serif" font-size="14" font-weight="bold">R</text>
      <text x="315" y="145" font-family="sans-serif" font-size="14" font-weight="bold">R</text>
    </svg>
  `);

  // 11. Q58: Ammeter with Capacitor Circuit
  await saveSvgAsPng('current_elec_q58_ammeter_circuit.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="420" height="250" viewBox="0 0 420 250">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Left branch: capacitor 4μF and resistor 5Ω -->
        <line x1="100" y1="180" x2="100" y2="120" />
        <!-- 4μF Capacitor -->
        <line x1="88" y1="120" x2="112" y2="120" stroke-width="3" />
        <line x1="88" y1="112" x2="112" y2="112" stroke-width="3" />
        <line x1="100" y1="112" x2="100" y2="60" />
        <line x1="100" y1="60" x2="130" y2="60" />
        <!-- 5Ω resistor -->
        <path d="M 130 60 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="162" y1="60" x2="210" y2="60" />

        <!-- Middle Vertical Branch: Ammeter and 5Ω to Earth -->
        <line x1="210" y1="60" x2="210" y2="80" />
        <circle cx="210" cy="98" r="16" fill="#f8fafc" stroke="#334155" />
        <line x1="210" y1="114" x2="210" y2="135" />
        <!-- 5Ω resistor -->
        <path d="M 210 135 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4" />
        <line x1="210" y1="167" x2="210" y2="195" />
        <!-- Earth at bottom of middle branch -->
        <line x1="195" y1="195" x2="225" y2="195" stroke-width="3" />
        <line x1="200" y1="201" x2="220" y2="201" stroke-width="2.5" />
        <line x1="205" y1="207" x2="215" y2="207" stroke-width="2" />

        <!-- Right branch: 10Ω resistor and 30V battery -->
        <line x1="210" y1="60" x2="250" y2="60" />
        <!-- 10Ω resistor -->
        <path d="M 250 60 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="282" y1="60" x2="330" y2="60" />
        <line x1="330" y1="60" x2="330" y2="110" />
        <!-- 30V battery -->
        <line x1="318" y1="110" x2="342" y2="110" stroke-width="3" />
        <line x1="322" y1="118" x2="338" y2="118" stroke-width="4.5" />
        <line x1="330" y1="118" x2="330" y2="180" />
        <line x1="330" y1="180" x2="100" y2="180" />
      </g>
      <!-- Labels -->
      <text x="204" y="104" font-family="sans-serif" font-size="14" font-weight="bold">A</text>
      <text x="60" y="120" font-family="sans-serif" font-size="13" font-weight="bold">4μF</text>
      <text x="135" y="45" font-family="sans-serif" font-size="13" font-weight="bold">5Ω</text>
      <text x="260" y="45" font-family="sans-serif" font-size="13" font-weight="bold">10Ω</text>
      <text x="225" y="155" font-family="sans-serif" font-size="13" font-weight="bold">5Ω</text>
      <text x="350" y="120" font-family="sans-serif" font-size="15" font-weight="bold">30V</text>
    </svg>
  `);

  // 12. Q60: Shorted Circuit
  await saveSvgAsPng('current_elec_q60_shorted_circuit.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="440" height="250" viewBox="0 0 440 250">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Top Branch: 2Ω, middle 2Ω (shorted), 2Ω -->
        <line x1="90" y1="60" x2="120" y2="60" />
        <path d="M 120 60 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="152" y1="60" x2="190" y2="60" />
        <!-- Shorted 2Ω -->
        <path d="M 190 60 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="222" y1="60" x2="260" y2="60" />
        <!-- Jumper shorting middle resistor -->
        <path d="M 190 60 L 190 30 L 260 30 L 260 60" stroke="#0284c7" stroke-width="2.5" />
        <!-- Third 2Ω -->
        <path d="M 260 60 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="292" y1="60" x2="330" y2="60" />

        <!-- Side verticals to middle row -->
        <line x1="90" y1="60" x2="90" y2="120" />
        <line x1="330" y1="60" x2="330" y2="120" />

        <!-- Middle row: two 2Ω resistors -->
        <line x1="90" y1="120" x2="135" y2="120" />
        <path d="M 135 120 l 5 -7 l 10 14 l 10 -14 l 10 14 l 5 -7" />
        <line x1="175" y1="120" x2="235" y2="120" />
        <path d="M 235 120 l 5 -7 l 10 14 l 10 -14 l 10 14 l 5 -7" />
        <line x1="275" y1="120" x2="330" y2="120" />

        <!-- Down to 10V battery -->
        <line x1="90" y1="120" x2="60" y2="120" />
        <line x1="60" y1="120" x2="60" y2="200" />
        <line x1="330" y1="120" x2="360" y2="120" />
        <line x1="360" y1="120" x2="360" y2="200" />
        <line x1="60" y1="200" x2="195" y2="200" />
        <!-- 10V Battery -->
        <line x1="195" y1="188" x2="195" y2="212" stroke-width="4.5" />
        <line x1="203" y1="182" x2="203" y2="218" stroke-width="3" />
        <line x1="203" y1="200" x2="360" y2="200" />
      </g>
      <!-- Labels -->
      <text x="125" y="85" font-family="sans-serif" font-size="13" font-weight="bold">2Ω</text>
      <text x="215" y="85" font-family="sans-serif" font-size="13" font-weight="bold" fill="#64748b">2Ω</text>
      <text x="295" y="85" font-family="sans-serif" font-size="13" font-weight="bold">2Ω</text>
      <text x="145" y="145" font-family="sans-serif" font-size="13" font-weight="bold">2Ω</text>
      <text x="245" y="145" font-family="sans-serif" font-size="13" font-weight="bold">2Ω</text>
      <text x="215" y="225" font-family="sans-serif" font-size="15" font-weight="bold">10V</text>
    </svg>
  `);

  // 13. Q61: Unbalanced Bridge with Central Shorting Wire
  await saveSvgAsPng('current_elec_q61_unbalanced_bridge.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="440" height="240" viewBox="0 0 440 240">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <line x1="50" y1="120" x2="100" y2="120" />
        <line x1="100" y1="120" x2="100" y2="60" />
        <line x1="100" y1="120" x2="100" y2="180" />

        <!-- Top Branch: 20Ω to C, then 5Ω from C to B -->
        <line x1="100" y1="60" x2="135" y2="60" />
        <path d="M 135 60 l 5 -7 l 10 14 l 10 -14 l 10 14 l 5 -7" />
        <line x1="175" y1="60" x2="220" y2="60" />
        <path d="M 220 60 l 5 -7 l 10 14 l 10 -14 l 10 14 l 5 -7" />
        <line x1="260" y1="60" x2="300" y2="60" />

        <!-- Bottom Branch: 5Ω to D, then 20Ω from D to B -->
        <line x1="100" y1="180" x2="135" y2="180" />
        <path d="M 135 180 l 5 -7 l 10 14 l 10 -14 l 10 14 l 5 -7" />
        <line x1="175" y1="180" x2="220" y2="180" />
        <path d="M 220 180 l 5 -7 l 10 14 l 10 -14 l 10 14 l 5 -7" />
        <line x1="260" y1="180" x2="300" y2="180" />

        <!-- Central vertical shorting wire CD -->
        <line x1="220" y1="60" x2="220" y2="180" stroke="#0284c7" stroke-width="3" />

        <!-- Right Confluence to Terminal B -->
        <line x1="300" y1="60" x2="300" y2="120" />
        <line x1="300" y1="180" x2="300" y2="120" />
        <line x1="300" y1="120" x2="360" y2="120" />
      </g>
      <!-- Labels -->
      <circle cx="50" cy="120" r="4.5" fill="#0284c7" />
      <circle cx="360" cy="120" r="4.5" fill="#0284c7" />
      <circle cx="220" cy="60" r="4" fill="#0284c7" />
      <circle cx="220" cy="180" r="4" fill="#0284c7" />
      <text x="35" y="125" font-family="sans-serif" font-size="18" font-weight="bold">A</text>
      <text x="370" y="125" font-family="sans-serif" font-size="18" font-weight="bold">B</text>
      <text x="215" y="45" font-family="sans-serif" font-size="18" font-weight="bold" fill="#0284c7">C</text>
      <text x="215" y="205" font-family="sans-serif" font-size="18" font-weight="bold" fill="#0284c7">D</text>
      <text x="145" y="45" font-family="sans-serif" font-size="13" font-weight="bold">20Ω</text>
      <text x="235" y="45" font-family="sans-serif" font-size="13" font-weight="bold">5Ω</text>
      <text x="145" y="205" font-family="sans-serif" font-size="13" font-weight="bold">5Ω</text>
      <text x="235" y="205" font-family="sans-serif" font-size="13" font-weight="bold">20Ω</text>
      <text x="55" y="105" font-family="sans-serif" font-size="14" font-weight="bold">5A →</text>
    </svg>
  `);

  console.log('🎉 Batch 2 Diagrams Generated Successfully!');
}

generateAll().catch(console.error);
