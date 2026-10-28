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
  console.log('Generating Batch 1 Diagrams for Current Electricity...');

  // 1. Q2: Diamond Bridge
  await saveSvgAsPng('current_elec_q2_bridge.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Diamond outer edges -->
        <line x1="80" y1="130" x2="200" y2="30" />
        <line x1="200" y1="30" x2="320" y2="130" />
        <line x1="80" y1="130" x2="200" y2="230" />
        <line x1="200" y1="230" x2="320" y2="130" />
        <!-- Central vertical wire -->
        <line x1="200" y1="30" x2="200" y2="230" />
        <!-- Terminal leads -->
        <line x1="40" y1="130" x2="80" y2="130" />
        <line x1="320" y1="130" x2="360" y2="130" />
      </g>
      <!-- Vertex circles -->
      <circle cx="80" cy="130" r="5" fill="#0284c7" />
      <circle cx="320" cy="130" r="5" fill="#0284c7" />
      <circle cx="200" cy="30" r="4" fill="#64748b" />
      <circle cx="200" cy="230" r="4" fill="#64748b" />
      <!-- Labels -->
      <text x="30" y="136" font-family="sans-serif" font-size="20" font-weight="bold" fill="#0f172a">A</text>
      <text x="365" y="136" font-family="sans-serif" font-size="20" font-weight="bold" fill="#0f172a">B</text>
      <text x="130" y="70" font-family="sans-serif" font-size="14" font-style="italic" fill="#475569">r</text>
      <text x="260" y="70" font-family="sans-serif" font-size="14" font-style="italic" fill="#475569">r</text>
      <text x="130" y="195" font-family="sans-serif" font-size="14" font-style="italic" fill="#475569">r</text>
      <text x="260" y="195" font-family="sans-serif" font-size="14" font-style="italic" fill="#475569">r</text>
      <text x="210" y="135" font-family="sans-serif" font-size="14" font-style="italic" fill="#475569">r</text>
    </svg>
  `);

  // 2. Q3: V-I Graph
  await saveSvgAsPng('current_elec_q3_vi_graph.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280">
      <rect width="100%" height="100%" fill="#ffffff" />
      <!-- Axes -->
      <g stroke="#334155" stroke-width="2.5" fill="none" stroke-linecap="round">
        <line x1="70" y1="230" x2="360" y2="230" marker-end="url(#arrow)" />
        <line x1="70" y1="230" x2="70" y2="30" marker-end="url(#arrow)" />
      </g>
      <!-- Lines -->
      <g stroke-linecap="round">
        <!-- 30 deg line -->
        <line x1="70" y1="230" x2="330" y2="80" stroke="#0284c7" stroke-width="3" />
        <!-- 60 deg line -->
        <line x1="70" y1="230" x2="190" y2="35" stroke="#ef4444" stroke-width="3" />
      </g>
      <!-- Angle Arcs -->
      <path d="M 120 230 A 50 50 0 0 0 113 205" fill="none" stroke="#475569" stroke-width="2" />
      <path d="M 150 230 A 80 80 0 0 0 110 160" fill="none" stroke="#475569" stroke-width="2" />
      <!-- Labels -->
      <text x="365" y="235" font-family="sans-serif" font-size="18" font-weight="bold" fill="#0f172a">I</text>
      <text x="65" y="22" font-family="sans-serif" font-size="18" font-weight="bold" fill="#0f172a">V</text>
      <text x="125" y="222" font-family="sans-serif" font-size="14" fill="#334155">30°</text>
      <text x="135" y="185" font-family="sans-serif" font-size="14" fill="#334155">60°</text>
      <text x="335" y="85" font-family="sans-serif" font-size="15" font-weight="bold" fill="#0284c7">T₁ = 25°C</text>
      <text x="195" y="40" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ef4444">T₂ = 100°C</text>
    </svg>
  `);

  // 3. Q4: Two Cells A and B in Series
  await saveSvgAsPng('current_elec_q4_two_cells.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="460" height="240" viewBox="0 0 460 240">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Main Loop -->
        <line x1="60" y1="70" x2="110" y2="70" />
        <!-- Cell A -->
        <line x1="110" y1="52" x2="110" y2="88" stroke-width="3.5" />
        <line x1="118" y1="60" x2="118" y2="80" stroke-width="5" />
        <line x1="118" y1="70" x2="140" y2="70" />
        <!-- r1 -->
        <path d="M 140 70 l 5 -10 l 10 20 l 10 -20 l 10 20 l 5 -10" />
        <line x1="180" y1="70" x2="250" y2="70" />
        <!-- Cell B -->
        <line x1="250" y1="52" x2="250" y2="88" stroke-width="3.5" />
        <line x1="258" y1="60" x2="258" y2="80" stroke-width="5" />
        <line x1="258" y1="70" x2="280" y2="70" />
        <!-- r2 -->
        <path d="M 280 70 l 5 -10 l 10 20 l 10 -20 l 10 20 l 5 -10" />
        <line x1="320" y1="70" x2="380" y2="70" />
        <line x1="380" y1="70" x2="380" y2="170" />
        <line x1="380" y1="170" x2="250" y2="170" />
        <!-- Resistor R -->
        <path d="M 250 170 l -5 -10 l -10 20 l -10 -20 l -10 20 l -5 -10" />
        <line x1="210" y1="170" x2="60" y2="170" />
        <line x1="60" y1="170" x2="60" y2="70" />
      </g>
      <!-- Labels -->
      <circle cx="60" cy="70" r="3" fill="#0f172a" />
      <circle cx="215" cy="70" r="3" fill="#0f172a" />
      <text x="50" y="65" font-family="sans-serif" font-size="14" font-weight="bold">a</text>
      <text x="212" y="62" font-family="sans-serif" font-size="14" font-weight="bold">b</text>
      <text x="110" y="42" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0284c7">A</text>
      <text x="95" y="108" font-family="sans-serif" font-size="13" font-weight="bold">1.5V</text>
      <text x="145" y="108" font-family="sans-serif" font-size="13">r₁ = 3Ω</text>
      <text x="250" y="42" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0284c7">B</text>
      <text x="245" y="108" font-family="sans-serif" font-size="13" font-weight="bold">2V</text>
      <text x="285" y="108" font-family="sans-serif" font-size="13">r₂ = 1Ω</text>
      <text x="225" y="205" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0f172a">R</text>
    </svg>
  `);

  // 4. Q5: Four Parallel Cells
  await saveSvgAsPng('current_elec_q5_four_cells.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="340" viewBox="0 0 400 340">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Busbars -->
        <line x1="100" y1="40" x2="100" y2="280" />
        <line x1="300" y1="40" x2="300" y2="280" />
        <!-- Row 1: 1V, 1Ω -->
        <line x1="100" y1="40" x2="150" y2="40" />
        <line x1="150" y1="28" x2="150" y2="52" stroke-width="3" />
        <line x1="158" y1="33" x2="158" y2="47" stroke-width="4.5" />
        <line x1="158" y1="40" x2="200" y2="40" />
        <path d="M 200 40 l 5 -7 l 10 14 l 10 -14 l 10 14 l 5 -7" />
        <line x1="240" y1="40" x2="300" y2="40" />

        <!-- Row 2: 2V, 1Ω -->
        <line x1="100" y1="100" x2="150" y2="100" />
        <line x1="150" y1="88" x2="150" y2="112" stroke-width="3" />
        <line x1="158" y1="93" x2="158" y2="107" stroke-width="4.5" />
        <line x1="158" y1="100" x2="200" y2="100" />
        <path d="M 200 100 l 5 -7 l 10 14 l 10 -14 l 10 14 l 5 -7" />
        <line x1="240" y1="100" x2="300" y2="100" />

        <!-- Row 3: Reversed! 1Ω, 3V -->
        <line x1="100" y1="160" x2="140" y2="160" />
        <path d="M 140 160 l 5 -7 l 10 14 l 10 -14 l 10 14 l 5 -7" />
        <line x1="180" y1="160" x2="240" y2="160" />
        <line x1="240" y1="153" x2="240" y2="167" stroke-width="4.5" />
        <line x1="248" y1="148" x2="248" y2="172" stroke-width="3" />
        <line x1="248" y1="160" x2="300" y2="160" />

        <!-- Row 4: 4V, 2Ω -->
        <line x1="100" y1="220" x2="150" y2="220" />
        <line x1="150" y1="208" x2="150" y2="232" stroke-width="3" />
        <line x1="158" y1="213" x2="158" y2="227" stroke-width="4.5" />
        <line x1="158" y1="220" x2="200" y2="220" />
        <path d="M 200 220 l 5 -7 l 10 14 l 10 -14 l 10 14 l 5 -7" />
        <line x1="240" y1="220" x2="300" y2="220" />

        <!-- Row 5: Load R = 2Ω -->
        <line x1="100" y1="280" x2="170" y2="280" />
        <path d="M 170 280 l 5 -8 l 10 16 l 10 -16 l 10 16 l 10 -16 l 10 16 l 5 -8" />
        <line x1="230" y1="280" x2="300" y2="280" />
      </g>
      <!-- Labels -->
      <text x="140" y="65" font-family="sans-serif" font-size="12" font-weight="bold">1V</text>
      <text x="210" y="65" font-family="sans-serif" font-size="12">1Ω</text>
      <text x="140" y="125" font-family="sans-serif" font-size="12" font-weight="bold">2V</text>
      <text x="210" y="125" font-family="sans-serif" font-size="12">1Ω</text>
      <text x="150" y="185" font-family="sans-serif" font-size="12">1Ω</text>
      <text x="235" y="185" font-family="sans-serif" font-size="12" font-weight="bold">3V</text>
      <text x="140" y="245" font-family="sans-serif" font-size="12" font-weight="bold">4V</text>
      <text x="210" y="245" font-family="sans-serif" font-size="12">2Ω</text>
      <text x="175" y="315" font-family="sans-serif" font-size="15" font-weight="bold" fill="#0284c7">R = 2Ω</text>
    </svg>
  `);

  // 5. Q6: Bulb in Series with R
  await saveSvgAsPng('current_elec_q6_bulb_circuit.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <line x1="80" y1="60" x2="140" y2="60" />
        <!-- Bulb circle and filament -->
        <circle cx="160" cy="60" r="16" stroke="#0284c7" stroke-width="2.5" />
        <path d="M 152 68 Q 160 48 168 68" stroke="#f59e0b" stroke-width="2.5" />
        <line x1="176" y1="60" x2="230" y2="60" />
        <!-- Resistor R -->
        <path d="M 230 60 l 5 -9 l 10 18 l 10 -18 l 10 18 l 10 -18 l 5 9" />
        <line x1="280" y1="60" x2="330" y2="60" />
        <line x1="330" y1="60" x2="330" y2="150" />
        <line x1="330" y1="150" x2="220" y2="150" />
        <!-- 200V Supply -->
        <line x1="220" y1="135" x2="220" y2="165" stroke-width="3" />
        <line x1="210" y1="142" x2="210" y2="158" stroke-width="4.5" />
        <line x1="210" y1="150" x2="80" y2="150" />
        <line x1="80" y1="150" x2="80" y2="60" />
      </g>
      <!-- Labels -->
      <text x="145" y="32" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0284c7">500W, 100V</text>
      <text x="250" y="42" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0f172a">R</text>
      <text x="195" y="185" font-family="sans-serif" font-size="15" font-weight="bold" fill="#0f172a">200V</text>
    </svg>
  `);

  // 6. Q7: i-t Linear Decay Graph
  await saveSvgAsPng('current_elec_q7_it_graph.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="260" viewBox="0 0 360 260">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#334155" stroke-width="2.5" fill="none" stroke-linecap="round">
        <line x1="60" y1="210" x2="320" y2="210" />
        <line x1="60" y1="210" x2="60" y2="40" />
      </g>
      <!-- Decreasing line -->
      <line x1="60" y1="60" x2="260" y2="210" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="60" cy="60" r="4.5" fill="#ef4444" />
      <circle cx="260" cy="210" r="4.5" fill="#ef4444" />
      <!-- Labels -->
      <text x="325" y="215" font-family="sans-serif" font-size="18" font-weight="bold" fill="#0f172a">t</text>
      <text x="55" y="30" font-family="sans-serif" font-size="18" font-weight="bold" fill="#0f172a">i</text>
      <text x="35" y="65" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0f172a">i₀</text>
      <text x="255" y="235" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0f172a">t₀</text>
    </svg>
  `);

  // 7. Q8: Max Power Transfer Circuit
  await saveSvgAsPng('current_elec_q8_max_power.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="420" height="240" viewBox="0 0 420 240">
      <rect width="100%" height="100%" fill="#ffffff" />
      <!-- Dashed box for real source -->
      <rect x="110" y="25" width="160" height="60" fill="#f8fafc" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5" rx="4" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Top branch: 12V, r=1.5Ω -->
        <line x1="70" y1="55" x2="140" y2="55" />
        <line x1="140" y1="42" x2="140" y2="68" stroke-width="3" />
        <line x1="148" y1="47" x2="148" y2="63" stroke-width="4.5" />
        <line x1="148" y1="55" x2="180" y2="55" />
        <path d="M 180 55 l 5 -7 l 10 14 l 10 -14 l 10 14 l 5 -7" />
        <line x1="220" y1="55" x2="350" y2="55" />
        <line x1="350" y1="55" x2="350" y2="150" />
        <!-- Parallel block on bottom right -->
        <line x1="350" y1="150" x2="310" y2="150" />
        <line x1="310" y1="120" x2="310" y2="180" />
        <!-- Top parallel: 1Ω -->
        <line x1="310" y1="120" x2="280" y2="120" />
        <path d="M 280 120 l -5 -7 l -10 14 l -10 -14 l -10 14 l -5 -7" />
        <line x1="240" y1="120" x2="210" y2="120" />
        <!-- Bottom parallel: 4Ω -->
        <line x1="310" y1="180" x2="280" y2="180" />
        <path d="M 280 180 l -5 -7 l -10 14 l -10 -14 l -10 14 l -5 -7" />
        <line x1="240" y1="180" x2="210" y2="180" />
        <line x1="210" y1="120" x2="210" y2="180" />
        <!-- Series resistor x -->
        <line x1="210" y1="150" x2="175" y2="150" />
        <path d="M 175 150 l -5 -8 l -10 16 l -10 -16 l -10 16 l -5 -8" />
        <line x1="135" y1="150" x2="70" y2="150" />
        <line x1="70" y1="150" x2="70" y2="55" />
      </g>
      <!-- Labels -->
      <text x="125" y="78" font-family="sans-serif" font-size="12" font-weight="bold">12V</text>
      <text x="180" y="78" font-family="sans-serif" font-size="12">r = 1.5Ω</text>
      <text x="150" y="180" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0284c7">x</text>
      <text x="250" y="112" font-family="sans-serif" font-size="12" font-weight="bold">1Ω</text>
      <text x="250" y="202" font-family="sans-serif" font-size="12" font-weight="bold">4Ω</text>
    </svg>
  `);

  // 8. Q9: Infinite Ladder
  await saveSvgAsPng('current_elec_q9_infinite_ladder.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="560" height="240" viewBox="0 0 560 240">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Dashed extensions -->
        <line x1="20" y1="50" x2="60" y2="50" stroke-dasharray="4,4" />
        <line x1="20" y1="170" x2="60" y2="170" stroke-dasharray="4,4" />
        <line x1="500" y1="50" x2="540" y2="50" stroke-dasharray="4,4" />
        <line x1="500" y1="170" x2="540" y2="170" stroke-dasharray="4,4" />
        <!-- Top Rail -->
        <line x1="60" y1="50" x2="100" y2="50" />
        <path d="M 100 50 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="132" y1="50" x2="180" y2="50" />
        <path d="M 180 50 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="212" y1="50" x2="260" y2="50" />
        <!-- Central bridge resistor 1Ω -->
        <path d="M 260 50 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" stroke="#0284c7" stroke-width="2.5" />
        <line x1="292" y1="50" x2="340" y2="50" />
        <path d="M 340 50 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="372" y1="50" x2="420" y2="50" />
        <path d="M 420 50 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="452" y1="50" x2="500" y2="50" />
        <!-- Vertical Shunts -->
        <!-- Shunt 1 -->
        <path d="M 60 50 l 0 40 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4 l 0 48" />
        <!-- Shunt 2 -->
        <path d="M 140 50 l 0 40 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4 l 0 48" />
        <!-- Shunt at A -->
        <path d="M 220 50 l 0 40 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4 l 0 48" />
        <!-- Shunt at B -->
        <path d="M 330 50 l 0 40 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4 l 0 48" />
        <!-- Shunt 4 -->
        <path d="M 410 50 l 0 40 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4 l 0 48" />
        <!-- Shunt 5 -->
        <path d="M 490 50 l 0 40 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4 l 0 48" />
        <!-- Bottom Rail -->
        <line x1="60" y1="170" x2="75" y2="170" />
        <path d="M 75 170 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="107" y1="170" x2="155" y2="170" />
        <path d="M 155 170 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="187" y1="170" x2="220" y2="170" />
        <!-- Terminal B right rail -->
        <line x1="330" y1="170" x2="345" y2="170" />
        <path d="M 345 170 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="377" y1="170" x2="425" y2="170" />
        <path d="M 425 170 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="457" y1="170" x2="490" y2="170" />
      </g>
      <!-- Terminals A and B -->
      <circle cx="220" cy="170" r="5" fill="#ef4444" />
      <circle cx="330" cy="170" r="5" fill="#ef4444" />
      <text x="215" y="200" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ef4444">A</text>
      <text x="325" y="200" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ef4444">B</text>
      <!-- Labels -->
      <text x="110" y="42" font-family="sans-serif" font-size="12">1Ω</text>
      <text x="190" y="42" font-family="sans-serif" font-size="12">1Ω</text>
      <text x="270" y="42" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0284c7">1Ω</text>
      <text x="350" y="42" font-family="sans-serif" font-size="12">1Ω</text>
      <text x="430" y="42" font-family="sans-serif" font-size="12">1Ω</text>
      <text x="230" y="115" font-family="sans-serif" font-size="12">1Ω</text>
      <text x="340" y="115" font-family="sans-serif" font-size="12">1Ω</text>
    </svg>
  `);

  // 9. Q11: Conical Wire
  await saveSvgAsPng('current_elec_q11_conical_wire.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#334155" stroke-width="2.5" fill="none">
        <!-- Axis -->
        <line x1="40" y1="100" x2="360" y2="100" stroke-dasharray="5,5" stroke="#94a3b8" />
        <!-- Conical body -->
        <path d="M 120 75 L 280 40" />
        <path d="M 120 125 L 280 160" />
        <!-- Left ellipse at P -->
        <ellipse cx="120" cy="100" rx="10" ry="25" fill="#f1f5f9" />
        <!-- Right ellipse at Q -->
        <ellipse cx="280" cy="100" rx="16" ry="60" fill="#e2e8f0" />
      </g>
      <!-- Points P and Q -->
      <circle cx="160" cy="100" r="4" fill="#0284c7" />
      <circle cx="230" cy="100" r="4" fill="#0284c7" />
      <text x="155" y="90" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0284c7">P (v_P)</text>
      <text x="225" y="90" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0284c7">Q (v_Q)</text>
    </svg>
  `);

  // 10. Q12: Opposing Batteries Circuit
  await saveSvgAsPng('current_elec_q12_opposing_batteries.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="450" height="220" viewBox="0 0 450 220">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Top Branch: a -> 1Ω -> 10V -> c -> 4V -> 2Ω -> b -->
        <line x1="60" y1="60" x2="90" y2="60" />
        <path d="M 90 60 l 4 -7 l 8 14 l 8 -14 l 8 14 l 4 -7" />
        <line x1="122" y1="60" x2="160" y2="60" />
        <!-- 10V battery: - on left, + on right -->
        <line x1="160" y1="52" x2="160" y2="68" stroke-width="4.5" />
        <line x1="168" y1="46" x2="168" y2="74" stroke-width="3" />
        <line x1="168" y1="60" x2="225" y2="60" />
        <!-- Point c -->
        <!-- 4V battery: + on left, - on right -->
        <line x1="260" y1="46" x2="260" y2="74" stroke-width="3" />
        <line x1="268" y1="52" x2="268" y2="68" stroke-width="4.5" />
        <line x1="268" y1="60" x2="300" y2="60" />
        <path d="M 300 60 l 4 -7 l 8 14 l 8 -14 l 8 14 l 4 -7" />
        <line x1="332" y1="60" x2="390" y2="60" />

        <!-- Bus down to parallel 6Ω resistors -->
        <line x1="60" y1="60" x2="60" y2="160" />
        <line x1="390" y1="60" x2="390" y2="160" />
        <!-- Middle 6Ω -->
        <line x1="60" y1="110" x2="190" y2="110" />
        <path d="M 190 110 l 5 -8 l 10 16 l 10 -16 l 10 16 l 10 -16 l 10 16 l 5 -8" />
        <line x1="250" y1="110" x2="390" y2="110" />
        <!-- Bottom 6Ω -->
        <line x1="60" y1="160" x2="190" y2="160" />
        <path d="M 190 160 l 5 -8 l 10 16 l 10 -16 l 10 16 l 10 -16 l 10 16 l 5 -8" />
        <line x1="250" y1="160" x2="390" y2="160" />
      </g>
      <!-- Points -->
      <circle cx="60" cy="60" r="4" fill="#0f172a" />
      <circle cx="225" cy="60" r="4" fill="#0284c7" />
      <circle cx="390" cy="60" r="4" fill="#0f172a" />
      <text x="50" y="55" font-family="sans-serif" font-size="16" font-weight="bold">a</text>
      <text x="220" y="50" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0284c7">c</text>
      <text x="395" y="55" font-family="sans-serif" font-size="16" font-weight="bold">b</text>
      <text x="95" y="48" font-family="sans-serif" font-size="12">1Ω</text>
      <text x="155" y="38" font-family="sans-serif" font-size="12" font-weight="bold">10V</text>
      <text x="255" y="38" font-family="sans-serif" font-size="12" font-weight="bold">4V</text>
      <text x="310" y="48" font-family="sans-serif" font-size="12">2Ω</text>
      <text x="210" y="130" font-family="sans-serif" font-size="13" font-weight="bold">6Ω</text>
      <text x="210" y="180" font-family="sans-serif" font-size="13" font-weight="bold">6Ω</text>
    </svg>
  `);

  // 11. Q13: Three Cells in Parallel
  await saveSvgAsPng('current_elec_q13_three_cells_parallel.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="460" height="260" viewBox="0 0 460 260">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <line x1="50" y1="130" x2="100" y2="130" />
        <!-- Resistor R -->
        <path d="M 100 130 l 5 -8 l 10 16 l 10 -16 l 10 16 l 10 -16 l 10 16 l 5 -8" />
        <line x1="160" y1="130" x2="200" y2="130" />
        <!-- Distribution to 3 parallel branches -->
        <line x1="200" y1="130" x2="240" y2="50" />
        <line x1="200" y1="130" x2="240" y2="130" />
        <line x1="200" y1="130" x2="240" y2="210" />
        <!-- Branch 1 (top): r1, E1 -->
        <path d="M 240 50 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="272" y1="50" x2="310" y2="50" />
        <line x1="310" y1="38" x2="310" y2="62" stroke-width="3" />
        <line x1="318" y1="43" x2="318" y2="57" stroke-width="4.5" />
        <line x1="318" y1="50" x2="360" y2="50" />
        <!-- Branch 2 (mid): r2, E2 -->
        <path d="M 240 130 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="272" y1="130" x2="310" y2="130" />
        <line x1="310" y1="118" x2="310" y2="142" stroke-width="3" />
        <line x1="318" y1="123" x2="318" y2="137" stroke-width="4.5" />
        <line x1="318" y1="130" x2="360" y2="130" />
        <!-- Branch 3 (bot): r3, E3 -->
        <path d="M 240 210 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="272" y1="210" x2="310" y2="210" />
        <line x1="310" y1="198" x2="310" y2="222" stroke-width="3" />
        <line x1="318" y1="203" x2="318" y2="217" stroke-width="4.5" />
        <line x1="318" y1="210" x2="360" y2="210" />
        <!-- Confluence to B -->
        <line x1="360" y1="50" x2="390" y2="130" />
        <line x1="360" y1="130" x2="390" y2="130" />
        <line x1="360" y1="210" x2="390" y2="130" />
        <line x1="390" y1="130" x2="420" y2="130" />
      </g>
      <!-- Terminals A and B -->
      <circle cx="50" cy="130" r="4.5" fill="#0284c7" />
      <circle cx="420" cy="130" r="4.5" fill="#0284c7" />
      <text x="35" y="136" font-family="sans-serif" font-size="18" font-weight="bold">A</text>
      <text x="430" y="136" font-family="sans-serif" font-size="18" font-weight="bold">B</text>
      <text x="125" y="112" font-family="sans-serif" font-size="14" font-weight="bold">R</text>
      <text x="250" y="42" font-family="sans-serif" font-size="12">r₁</text>
      <text x="310" y="32" font-family="sans-serif" font-size="12" font-weight="bold">E₁</text>
      <text x="250" y="122" font-family="sans-serif" font-size="12">r₂</text>
      <text x="310" y="112" font-family="sans-serif" font-size="12" font-weight="bold">E₂</text>
      <text x="250" y="202" font-family="sans-serif" font-size="12">r₃</text>
      <text x="310" y="192" font-family="sans-serif" font-size="12" font-weight="bold">E₃</text>
    </svg>
  `);

  // 12. Q14: Triangular Prism Wire Mesh
  await saveSvgAsPng('current_elec_q14_prism_mesh.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="460" height="240" viewBox="0 0 460 240">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Base Triangle ABC on right side -->
        <polygon points="270,120 370,180 340,60" stroke="#0284c7" stroke-width="2.5" />
        <!-- Front/Back Edges -->
        <line x1="60" y1="130" x2="270" y2="120" stroke="#ef4444" stroke-width="3" /> <!-- AD -->
        <line x1="160" y1="60" x2="340" y2="60" /> <!-- EF -->
        <line x1="160" y1="190" x2="370" y2="180" /> <!-- CD/BC -->
        <!-- Left Triangle DEF -->
        <polygon points="60,130 160,190 160,60" stroke="#0f172a" stroke-width="2.5" />
        <!-- Battery across E and F (points 160,60 and 340,60) -->
        <path d="M 340 60 L 390 60 L 390 100 L 410 100" />
        <line x1="410" y1="90" x2="410" y2="110" stroke-width="3" />
        <line x1="416" y1="94" x2="416" y2="106" stroke-width="4.5" />
        <path d="M 416 100 L 440 100 L 440 40 L 160 40 L 160 60" />
      </g>
      <!-- Labels -->
      <text x="45" y="135" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ef4444">D</text>
      <text x="260" y="115" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ef4444">A</text>
      <text x="145" y="55" font-family="sans-serif" font-size="16" font-weight="bold">F</text>
      <text x="340" y="55" font-family="sans-serif" font-size="16" font-weight="bold">E</text>
      <text x="150" y="210" font-family="sans-serif" font-size="16" font-weight="bold">C</text>
      <text x="380" y="195" font-family="sans-serif" font-size="16" font-weight="bold">B</text>
      <text x="400" y="135" font-family="sans-serif" font-size="14" font-weight="bold">6V</text>
      <text x="150" y="140" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ef4444">i →</text>
    </svg>
  `);

  // 13. Q15: Carbon Resistor Color Bands
  await saveSvgAsPng('current_elec_q15_carbon_resistor.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="440" height="180" viewBox="0 0 440 180">
      <rect width="100%" height="100%" fill="#ffffff" />
      <!-- Resistor Leads -->
      <line x1="40" y1="90" x2="100" y2="90" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" />
      <line x1="340" y1="90" x2="400" y2="90" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" />
      <!-- Resistor Body -->
      <rect x="100" y="55" width="240" height="70" rx="15" fill="#fef3c7" stroke="#d97706" stroke-width="3" />
      <!-- Bands -->
      <!-- Band 1: Yellow (4) -->
      <rect x="135" y="55" width="16" height="70" fill="#eab308" />
      <!-- Band 2: Violet (7) -->
      <rect x="180" y="55" width="16" height="70" fill="#7c3aed" />
      <!-- Band 3: Brown (10^1) -->
      <rect x="225" y="55" width="16" height="70" fill="#78350f" />
      <!-- Band 4: Gold (5%) -->
      <rect x="290" y="55" width="16" height="70" fill="#d97706" />
      <!-- Band Labels -->
      <text x="125" y="42" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ca8a04">Yellow</text>
      <text x="175" y="145" font-family="sans-serif" font-size="13" font-weight="bold" fill="#6d28d9">Violet</text>
      <text x="220" y="42" font-family="sans-serif" font-size="13" font-weight="bold" fill="#78350f">Brown</text>
      <text x="290" y="145" font-family="sans-serif" font-size="13" font-weight="bold" fill="#b45309">Gold</text>
    </svg>
  `);

  // 14. Q16: Earthed Resistor Circuit
  await saveSvgAsPng('current_elec_q16_earthed_circuit.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="440" height="250" viewBox="0 0 440 250">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Outer Loop -->
        <line x1="80" y1="140" x2="80" y2="60" />
        <line x1="80" y1="60" x2="170" y2="60" />
        <!-- 10V Battery: + on left -->
        <line x1="170" y1="46" x2="170" y2="74" stroke-width="3" />
        <line x1="178" y1="52" x2="178" y2="68" stroke-width="4.5" />
        <line x1="178" y1="60" x2="220" y2="60" />
        <!-- 1Ω internal resistor -->
        <path d="M 220 60 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="252" y1="60" x2="360" y2="60" />
        <line x1="360" y1="60" x2="360" y2="140" />

        <!-- Bottom Line A -> B -> C -> D -->
        <line x1="80" y1="140" x2="110" y2="140" />
        <!-- 4Ω resistor between A and B -->
        <path d="M 110 140 l 4 -7 l 8 14 l 8 -14 l 8 14 l 4 -7" />
        <line x1="142" y1="140" x2="180" y2="140" />
        <!-- 10Ω resistor between B and C -->
        <path d="M 180 140 l 5 -7 l 10 14 l 10 -14 l 10 14 l 10 -14 l 10 14 l 5 -7" />
        <line x1="240" y1="140" x2="280" y2="140" />
        <!-- 5Ω resistor between C and D -->
        <path d="M 280 140 l 4 -7 l 8 14 l 8 -14 l 8 14 l 4 -7" />
        <line x1="312" y1="140" x2="360" y2="140" />

        <!-- Earth at B (x=180) -->
        <line x1="180" y1="140" x2="180" y2="180" />
        <line x1="165" y1="180" x2="195" y2="180" stroke-width="3" />
        <line x1="170" y1="186" x2="190" y2="186" stroke-width="2.5" />
        <line x1="175" y1="192" x2="185" y2="192" stroke-width="2" />

        <!-- Earth at C (x=280) -->
        <line x1="280" y1="140" x2="280" y2="180" />
        <line x1="265" y1="180" x2="295" y2="180" stroke-width="3" />
        <line x1="270" y1="186" x2="290" y2="186" stroke-width="2.5" />
        <line x1="275" y1="192" x2="285" y2="192" stroke-width="2" />
      </g>
      <!-- Labels -->
      <text x="65" y="145" font-family="sans-serif" font-size="16" font-weight="bold">A</text>
      <text x="175" y="130" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0284c7">B</text>
      <text x="275" y="130" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0284c7">C</text>
      <text x="365" y="145" font-family="sans-serif" font-size="16" font-weight="bold">D</text>
      <text x="120" y="165" font-family="sans-serif" font-size="13" font-weight="bold">4Ω</text>
      <text x="200" y="165" font-family="sans-serif" font-size="13" font-weight="bold">10Ω</text>
      <text x="290" y="165" font-family="sans-serif" font-size="13" font-weight="bold">5Ω</text>
      <text x="160" y="38" font-family="sans-serif" font-size="14" font-weight="bold">10V</text>
      <text x="230" y="48" font-family="sans-serif" font-size="12">1Ω</text>
    </svg>
  `);

  // 15. Q17: Meter Bridge
  await saveSvgAsPng('current_elec_q17_meter_bridge.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="420" height="260" viewBox="0 0 420 260">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Top Resistors -->
        <line x1="80" y1="60" x2="110" y2="60" />
        <path d="M 110 60 l 5 -7 l 10 14 l 10 -14 l 10 14 l 5 -7" />
        <line x1="150" y1="60" x2="240" y2="60" />
        <path d="M 240 60 l 5 -7 l 10 14 l 10 -14 l 10 14 l 5 -7" />
        <line x1="280" y1="60" x2="340" y2="60" />

        <!-- Side verticals to bridge wire -->
        <line x1="80" y1="60" x2="80" y2="150" />
        <line x1="340" y1="60" x2="340" y2="150" />
        <!-- Meter bridge wire AC -->
        <line x1="80" y1="150" x2="340" y2="150" stroke="#0284c7" stroke-width="3" />

        <!-- Galvanometer from middle of top to point B on wire -->
        <line x1="195" y1="60" x2="195" y2="90" />
        <circle cx="195" cy="105" r="15" fill="#f8fafc" stroke="#334155" />
        <line x1="195" y1="120" x2="236" y2="150" marker-end="url(#arrow)" />

        <!-- Battery loop below -->
        <line x1="80" y1="150" x2="80" y2="210" />
        <line x1="340" y1="150" x2="340" y2="210" />
        <line x1="80" y1="210" x2="190" y2="210" />
        <line x1="190" y1="198" x2="190" y2="222" stroke-width="3" />
        <line x1="198" y1="203" x2="198" y2="217" stroke-width="4.5" />
        <line x1="198" y1="210" x2="340" y2="210" />
      </g>
      <!-- Labels -->
      <text x="65" y="155" font-family="sans-serif" font-size="16" font-weight="bold">A</text>
      <text x="236" y="172" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0284c7">B</text>
      <text x="350" y="155" font-family="sans-serif" font-size="16" font-weight="bold">C</text>
      <text x="120" y="45" font-family="sans-serif" font-size="13" font-weight="bold">R₁ = 15Ω</text>
      <text x="245" y="45" font-family="sans-serif" font-size="13" font-weight="bold">R₂ = 10Ω</text>
      <text x="190" y="110" font-family="sans-serif" font-size="14" font-weight="bold">G</text>
      <text x="210" y="235" font-family="sans-serif" font-size="15" font-weight="bold">E</text>
    </svg>
  `);

  // 16. Q18: Heat in 6Ω Resistor
  await saveSvgAsPng('current_elec_q18_heat_circuit.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="420" height="220" viewBox="0 0 420 220">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <line x1="70" y1="60" x2="110" y2="60" />
        <!-- 3Ω resistor -->
        <path d="M 110 60 l 4 -7 l 8 14 l 8 -14 l 8 14 l 4 -7" />
        <line x1="142" y1="60" x2="180" y2="60" />
        <!-- Split to parallel: 6Ω and 3Ω -->
        <line x1="180" y1="60" x2="200" y2="35" />
        <line x1="180" y1="60" x2="200" y2="85" />
        <!-- Top parallel 6Ω -->
        <line x1="200" y1="35" x2="210" y2="35" />
        <path d="M 210 35 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="242" y1="35" x2="260" y2="35" />
        <line x1="260" y1="35" x2="280" y2="60" />
        <!-- Bottom parallel 3Ω -->
        <line x1="200" y1="85" x2="210" y2="85" />
        <path d="M 210 85 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="242" y1="85" x2="260" y2="85" />
        <line x1="260" y1="85" x2="280" y2="60" />

        <line x1="280" y1="60" x2="350" y2="60" />
        <!-- 5Ω series resistor -->
        <line x1="350" y1="60" x2="350" y2="80" />
        <path d="M 350 80 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4" />
        <line x1="350" y1="112" x2="350" y2="160" />
        <line x1="350" y1="160" x2="220" y2="160" />
        <!-- 20V battery -->
        <line x1="220" y1="148" x2="220" y2="172" stroke-width="3" />
        <line x1="212" y1="153" x2="212" y2="167" stroke-width="4.5" />
        <line x1="212" y1="160" x2="70" y2="160" />
        <line x1="70" y1="160" x2="70" y2="60" />
      </g>
      <!-- Labels -->
      <text x="120" y="45" font-family="sans-serif" font-size="13" font-weight="bold">3Ω</text>
      <text x="220" y="25" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ef4444">6Ω</text>
      <text x="220" y="105" font-family="sans-serif" font-size="13" font-weight="bold">3Ω</text>
      <text x="365" y="100" font-family="sans-serif" font-size="13" font-weight="bold">5Ω</text>
      <text x="205" y="195" font-family="sans-serif" font-size="15" font-weight="bold">20V</text>
    </svg>
  `);

  // 17. Q19: Square Loop ABCD of 4 Cells
  await saveSvgAsPng('current_elec_q19_cell_loop.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="340" viewBox="0 0 360 340">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Top Branch: A -> B -->
        <line x1="80" y1="80" x2="120" y2="80" />
        <line x1="120" y1="68" x2="120" y2="92" stroke-width="3" />
        <line x1="128" y1="73" x2="128" y2="87" stroke-width="4.5" />
        <line x1="128" y1="80" x2="180" y2="80" />
        <path d="M 180 80 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="212" y1="80" x2="280" y2="80" />

        <!-- Right Branch: B -> C -->
        <line x1="280" y1="80" x2="280" y2="120" />
        <line x1="268" y1="120" x2="292" y2="120" stroke-width="3" />
        <line x1="273" y1="128" x2="287" y2="128" stroke-width="4.5" />
        <line x1="280" y1="128" x2="280" y2="180" />
        <path d="M 280 180 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4" />
        <line x1="280" y1="212" x2="280" y2="260" />

        <!-- Bottom Branch: C -> D -->
        <line x1="280" y1="260" x2="240" y2="260" />
        <line x1="240" y1="248" x2="240" y2="272" stroke-width="3" />
        <line x1="232" y1="253" x2="232" y2="267" stroke-width="4.5" />
        <line x1="232" y1="260" x2="180" y2="260" />
        <path d="M 180 260 l -4 -6 l -8 12 l -8 -12 l -8 12 l -4 -6" />
        <line x1="148" y1="260" x2="80" y2="260" />

        <!-- Left Branch: D -> A -->
        <line x1="80" y1="260" x2="80" y2="220" />
        <line x1="68" y1="220" x2="92" y2="220" stroke-width="3" />
        <line x1="73" y1="212" x2="87" y2="212" stroke-width="4.5" />
        <line x1="80" y1="212" x2="80" y2="160" />
        <path d="M 80 160 l -6 -4 l 12 -8 l -12 -8 l 12 -8 l -6 -4" />
        <line x1="80" y1="128" x2="80" y2="80" />
      </g>
      <!-- Corners -->
      <circle cx="80" cy="80" r="4.5" fill="#0284c7" />
      <circle cx="280" cy="80" r="4.5" fill="#0284c7" />
      <circle cx="280" cy="260" r="4.5" fill="#0284c7" />
      <circle cx="80" cy="260" r="4.5" fill="#0284c7" />
      <text x="60" y="75" font-family="sans-serif" font-size="18" font-weight="bold">A</text>
      <text x="290" y="75" font-family="sans-serif" font-size="18" font-weight="bold">B</text>
      <text x="290" y="275" font-family="sans-serif" font-size="18" font-weight="bold">C</text>
      <text x="60" y="275" font-family="sans-serif" font-size="18" font-weight="bold">D</text>
      <text x="115" y="60" font-family="sans-serif" font-size="13" font-weight="bold">E</text>
      <text x="190" y="70" font-family="sans-serif" font-size="13">r</text>
    </svg>
  `);

  // 18. Q20: Battery Combination
  await saveSvgAsPng('current_elec_q20_battery_combination.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="460" height="200" viewBox="0 0 460 200">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <line x1="40" y1="100" x2="80" y2="100" />
        <!-- 6V cell: + on left -->
        <line x1="80" y1="88" x2="80" y2="112" stroke-width="3" />
        <line x1="88" y1="93" x2="88" y2="107" stroke-width="4.5" />
        <line x1="88" y1="100" x2="120" y2="100" />
        <!-- 1Ω resistor -->
        <path d="M 120 100 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="152" y1="100" x2="190" y2="100" />

        <!-- Fork to parallel branches -->
        <line x1="190" y1="100" x2="220" y2="50" />
        <line x1="190" y1="100" x2="220" y2="150" />
        <!-- Top: 10V (+ on left), 2Ω -->
        <line x1="220" y1="50" x2="250" y2="50" />
        <line x1="250" y1="38" x2="250" y2="62" stroke-width="3" />
        <line x1="258" y1="43" x2="258" y2="57" stroke-width="4.5" />
        <line x1="258" y1="50" x2="290" y2="50" />
        <path d="M 290 50 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="322" y1="50" x2="350" y2="50" />
        <!-- Bottom: 4V (+ on right), 2Ω -->
        <line x1="220" y1="150" x2="250" y2="150" />
        <line x1="250" y1="143" x2="250" y2="157" stroke-width="4.5" />
        <line x1="258" y1="138" x2="258" y2="162" stroke-width="3" />
        <line x1="258" y1="150" x2="290" y2="150" />
        <path d="M 290 150 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="322" y1="150" x2="350" y2="150" />

        <!-- Join to output terminal -->
        <line x1="350" y1="50" x2="380" y2="100" />
        <line x1="350" y1="150" x2="380" y2="100" />
        <line x1="380" y1="100" x2="420" y2="100" />
      </g>
      <!-- Labels -->
      <text x="75" y="78" font-family="sans-serif" font-size="13" font-weight="bold">6V</text>
      <text x="125" y="88" font-family="sans-serif" font-size="12">1Ω</text>
      <text x="245" y="30" font-family="sans-serif" font-size="13" font-weight="bold">10V</text>
      <text x="295" y="38" font-family="sans-serif" font-size="12">2Ω</text>
      <text x="245" y="180" font-family="sans-serif" font-size="13" font-weight="bold">4V</text>
      <text x="295" y="180" font-family="sans-serif" font-size="12">2Ω</text>
    </svg>
  `);

  // 19. Q21: Charging Battery Circuit
  await saveSvgAsPng('current_elec_q21_charging_battery.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="220" viewBox="0 0 400 220">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Top Branch: E1=10V (+ on left), r1=1Ω, E2=4V (+ on right), r2=1Ω -->
        <line x1="80" y1="60" x2="120" y2="60" />
        <!-- E1: 10V -->
        <line x1="120" y1="46" x2="120" y2="74" stroke-width="3" />
        <line x1="128" y1="52" x2="128" y2="68" stroke-width="4.5" />
        <line x1="128" y1="60" x2="155" y2="60" />
        <path d="M 155 60 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="187" y1="60" x2="225" y2="60" />
        <!-- E2: 4V (opposing: - on left, + on right) -->
        <line x1="225" y1="52" x2="225" y2="68" stroke-width="4.5" />
        <line x1="233" y1="46" x2="233" y2="74" stroke-width="3" />
        <line x1="233" y1="60" x2="260" y2="60" />
        <path d="M 260 60 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="292" y1="60" x2="330" y2="60" />

        <!-- Down to R = 2Ω -->
        <line x1="330" y1="60" x2="330" y2="150" />
        <line x1="330" y1="150" x2="235" y2="150" />
        <path d="M 235 150 l -5 -8 l -10 16 l -10 -16 l -10 16 l -5 -8" />
        <line x1="195" y1="150" x2="80" y2="150" />
        <line x1="80" y1="150" x2="80" y2="60" />
      </g>
      <!-- Labels -->
      <text x="110" y="38" font-family="sans-serif" font-size="13" font-weight="bold">E₁ = 10V</text>
      <text x="155" y="90" font-family="sans-serif" font-size="12">r₁ = 1Ω</text>
      <text x="220" y="38" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ef4444">E₂ = 4V</text>
      <text x="260" y="90" font-family="sans-serif" font-size="12">r₂ = 1Ω</text>
      <text x="200" y="185" font-family="sans-serif" font-size="15" font-weight="bold" fill="#0284c7">R = 2Ω</text>
    </svg>
  `);

  // 20. Q22: Variable R Max Power
  await saveSvgAsPng('current_elec_q22_max_power.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Vertical Rails -->
        <line x1="90" y1="40" x2="90" y2="200" />
        <line x1="310" y1="40" x2="310" y2="200" />
        <!-- Top Branch: 10V, 1Ω -->
        <line x1="90" y1="40" x2="160" y2="40" />
        <line x1="160" y1="28" x2="160" y2="52" stroke-width="3" />
        <line x1="168" y1="33" x2="168" y2="47" stroke-width="4.5" />
        <line x1="168" y1="40" x2="210" y2="40" />
        <path d="M 210 40 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="242" y1="40" x2="310" y2="40" />

        <!-- Middle Branch: Variable R -->
        <line x1="90" y1="120" x2="180" y2="120" />
        <path d="M 180 120 l 4 -7 l 8 14 l 8 -14 l 8 14 l 8 -14 l 8 14 l 4 -7" />
        <line x1="228" y1="120" x2="310" y2="120" />
        <!-- Variable arrow -->
        <line x1="185" y1="145" x2="225" y2="95" stroke="#0284c7" stroke-width="2.5" marker-end="url(#arrow)" />

        <!-- Bottom Branch: 10V, 1Ω -->
        <line x1="90" y1="200" x2="160" y2="200" />
        <line x1="160" y1="188" x2="160" y2="212" stroke-width="3" />
        <line x1="168" y1="193" x2="168" y2="207" stroke-width="4.5" />
        <line x1="168" y1="200" x2="210" y2="200" />
        <path d="M 210 200 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="242" y1="200" x2="310" y2="200" />
      </g>
      <!-- Labels -->
      <text x="150" y="24" font-family="sans-serif" font-size="13" font-weight="bold">10V</text>
      <text x="215" y="24" font-family="sans-serif" font-size="13">1Ω</text>
      <text x="200" y="112" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0284c7">R</text>
      <text x="150" y="225" font-family="sans-serif" font-size="13" font-weight="bold">10V</text>
      <text x="215" y="225" font-family="sans-serif" font-size="13">1Ω</text>
    </svg>
  `);

  // 21. Q26: Circuit Section C to B
  await saveSvgAsPng('current_elec_q26_circuit_section.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="240" viewBox="0 0 500 240">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Main Line from left to right -->
        <line x1="40" y1="80" x2="80" y2="80" />
        <!-- 1Ω -->
        <path d="M 80 80 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="112" y1="80" x2="150" y2="80" />
        <!-- 12V battery -->
        <line x1="150" y1="68" x2="150" y2="92" stroke-width="3" />
        <line x1="158" y1="73" x2="158" y2="87" stroke-width="4.5" />
        <line x1="158" y1="80" x2="200" y2="80" />

        <!-- Vertical branch at node 1 -->
        <line x1="200" y1="80" x2="200" y2="110" />
        <path d="M 200 110 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4" />
        <line x1="200" y1="142" x2="200" y2="180" />

        <!-- Between node 1 and node 2: 2Ω and 3V -->
        <line x1="200" y1="80" x2="230" y2="80" />
        <path d="M 230 80 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="262" y1="80" x2="300" y2="80" />
        <!-- 3V battery -->
        <line x1="300" y1="68" x2="300" y2="92" stroke-width="3" />
        <line x1="308" y1="73" x2="308" y2="87" stroke-width="4.5" />
        <line x1="308" y1="80" x2="350" y2="80" />

        <!-- Vertical branch at node 2 -->
        <line x1="350" y1="80" x2="350" y2="110" />
        <path d="M 350 110 l -6 4 l 12 8 l -12 8 l 12 8 l -6 4" />
        <line x1="350" y1="142" x2="350" y2="180" />

        <!-- After node 2 to B: 4Ω -->
        <line x1="350" y1="80" x2="380" y2="80" />
        <path d="M 380 80 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="412" y1="80" x2="460" y2="80" />
      </g>
      <!-- Labels -->
      <circle cx="200" cy="180" r="4" fill="#0284c7" />
      <circle cx="460" cy="80" r="4" fill="#0284c7" />
      <text x="190" y="205" font-family="sans-serif" font-size="18" font-weight="bold" fill="#0284c7">C</text>
      <text x="470" y="85" font-family="sans-serif" font-size="18" font-weight="bold" fill="#0284c7">B</text>
      <text x="90" y="68" font-family="sans-serif" font-size="12">1Ω</text>
      <text x="145" y="58" font-family="sans-serif" font-size="12" font-weight="bold">12V</text>
      <text x="215" y="130" font-family="sans-serif" font-size="12">5Ω</text>
      <text x="240" y="68" font-family="sans-serif" font-size="12">2Ω</text>
      <text x="295" y="58" font-family="sans-serif" font-size="12" font-weight="bold">3V</text>
      <text x="365" y="130" font-family="sans-serif" font-size="12">5Ω</text>
      <text x="335" y="205" font-family="sans-serif" font-size="13" font-weight="bold">↓ 4A</text>
      <text x="390" y="68" font-family="sans-serif" font-size="12">4Ω</text>
      <text x="430" y="65" font-family="sans-serif" font-size="13" font-weight="bold">2A →</text>
    </svg>
  `);

  // 22. Q27: Heater Circuit
  await saveSvgAsPng('current_elec_q27_heater_circuit.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="420" height="220" viewBox="0 0 420 220">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <line x1="70" y1="60" x2="110" y2="60" />
        <!-- 10Ω resistor -->
        <path d="M 110 60 l 4 -7 l 8 14 l 8 -14 l 8 14 l 4 -7" />
        <line x1="142" y1="60" x2="200" y2="60" />

        <!-- Parallel: Heater and R -->
        <line x1="200" y1="60" x2="200" y2="100" />
        <!-- Top: Heater Box -->
        <rect x="210" y="45" width="100" height="30" fill="#fef2f2" stroke="#ef4444" stroke-width="2" rx="4" />
        <line x1="200" y1="60" x2="210" y2="60" />
        <line x1="310" y1="60" x2="330" y2="60" />
        <!-- Bottom: Resistor R -->
        <line x1="200" y1="100" x2="230" y2="100" />
        <path d="M 230 100 l 5 -7 l 10 14 l 10 -14 l 10 14 l 5 -7" />
        <line x1="270" y1="100" x2="330" y2="100" />
        <line x1="330" y1="60" x2="330" y2="100" />

        <line x1="330" y1="80" x2="370" y2="80" />
        <line x1="370" y1="80" x2="370" y2="160" />
        <line x1="370" y1="160" x2="230" y2="160" />
        <!-- 100V Supply -->
        <line x1="230" y1="148" x2="230" y2="172" stroke-width="3" />
        <line x1="222" y1="153" x2="222" y2="167" stroke-width="4.5" />
        <line x1="222" y1="160" x2="70" y2="160" />
        <line x1="70" y1="160" x2="70" y2="60" />
      </g>
      <!-- Labels -->
      <text x="120" y="45" font-family="sans-serif" font-size="13" font-weight="bold">10Ω</text>
      <text x="235" y="65" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ef4444">HEATER</text>
      <text x="245" y="125" font-family="sans-serif" font-size="15" font-weight="bold" fill="#0284c7">R</text>
      <text x="210" y="195" font-family="sans-serif" font-size="15" font-weight="bold">100V</text>
    </svg>
  `);

  // 23. Q28: Water Boiling Circuit
  await saveSvgAsPng('current_elec_q28_water_boiling.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="420" height="220" viewBox="0 0 420 220">
      <rect width="100%" height="100%" fill="#ffffff" />
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <line x1="70" y1="60" x2="110" y2="60" />
        <!-- R1 = 4Ω -->
        <path d="M 110 60 l 4 -7 l 8 14 l 8 -14 l 8 14 l 4 -7" stroke="#0284c7" stroke-width="3" />
        <line x1="142" y1="60" x2="190" y2="60" />

        <!-- Parallel R2 and R3 -->
        <line x1="190" y1="60" x2="190" y2="35" />
        <line x1="190" y1="60" x2="190" y2="85" />
        <!-- Top: R2 = 6Ω -->
        <line x1="190" y1="35" x2="220" y2="35" />
        <path d="M 220 35 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="252" y1="35" x2="280" y2="35" />
        <!-- Bottom: R3 = 3Ω -->
        <line x1="190" y1="85" x2="220" y2="85" />
        <path d="M 220 85 l 4 -6 l 8 12 l 8 -12 l 8 12 l 4 -6" />
        <line x1="252" y1="85" x2="280" y2="85" />

        <line x1="280" y1="35" x2="280" y2="85" />
        <line x1="280" y1="60" x2="350" y2="60" />
        <line x1="350" y1="60" x2="350" y2="160" />
        <line x1="350" y1="160" x2="220" y2="160" />
        <!-- 12V Battery -->
        <line x1="220" y1="148" x2="220" y2="172" stroke-width="3" />
        <line x1="212" y1="153" x2="212" y2="167" stroke-width="4.5" />
        <line x1="212" y1="160" x2="70" y2="160" />
        <line x1="70" y1="160" x2="70" y2="60" />
      </g>
      <!-- Labels -->
      <text x="115" y="42" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0284c7">R₁ = 4Ω</text>
      <text x="225" y="25" font-family="sans-serif" font-size="12">R₂ = 6Ω</text>
      <text x="225" y="105" font-family="sans-serif" font-size="12">R₃ = 3Ω</text>
      <text x="205" y="195" font-family="sans-serif" font-size="15" font-weight="bold">12V</text>
    </svg>
  `);

  // 24. Q29: Cell Grouping Circuit
  await saveSvgAsPng('current_elec_q29_cell_grouping.png', `
    <svg xmlns="http://www.w3.org/2000/svg" width="460" height="260" viewBox="0 0 460 260">
      <rect width="100%" height="100%" fill="#ffffff" />
      <!-- Dashed boxes for cells -->
      <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- 3 Parallel cells on left -->
        <line x1="80" y1="40" x2="80" y2="120" />
        <line x1="200" y1="40" x2="200" y2="120" />
        <!-- Cell 1 -->
        <line x1="80" y1="40" x2="110" y2="40" />
        <line x1="110" y1="30" x2="110" y2="50" stroke-width="3" />
        <line x1="117" y1="34" x2="117" y2="46" stroke-width="4.5" />
        <line x1="117" y1="40" x2="140" y2="40" />
        <path d="M 140 40 l 4 -5 l 8 10 l 8 -10 l 8 10 l 4 -5" />
        <line x1="172" y1="40" x2="200" y2="40" />
        <!-- Cell 2 -->
        <line x1="80" y1="80" x2="110" y2="80" />
        <line x1="110" y1="70" x2="110" y2="90" stroke-width="3" />
        <line x1="117" y1="74" x2="117" y2="86" stroke-width="4.5" />
        <line x1="117" y1="80" x2="140" y2="80" />
        <path d="M 140 80 l 4 -5 l 8 10 l 8 -10 l 8 10 l 4 -5" />
        <line x1="172" y1="80" x2="200" y2="80" />
        <!-- Cell 3 -->
        <line x1="80" y1="120" x2="110" y2="120" />
        <line x1="110" y1="110" x2="110" y2="130" stroke-width="3" />
        <line x1="117" y1="114" x2="117" y2="126" stroke-width="4.5" />
        <line x1="117" y1="120" x2="140" y2="120" />
        <path d="M 140 120 l 4 -5 l 8 10 l 8 -10 l 8 10 l 4 -5" />
        <line x1="172" y1="120" x2="200" y2="120" />

        <!-- In series with 2 cells on right -->
        <line x1="200" y1="80" x2="230" y2="80" />
        <!-- Cell 4 -->
        <line x1="230" y1="68" x2="230" y2="92" stroke-width="3" />
        <line x1="238" y1="73" x2="238" y2="87" stroke-width="4.5" />
        <line x1="238" y1="80" x2="260" y2="80" />
        <path d="M 260 80 l 4 -5 l 8 10 l 8 -10 l 8 10 l 4 -5" />
        <line x1="292" y1="80" x2="310" y2="80" />
        <!-- Cell 5 -->
        <line x1="310" y1="68" x2="310" y2="92" stroke-width="3" />
        <line x1="318" y1="73" x2="318" y2="87" stroke-width="4.5" />
        <line x1="318" y1="80" x2="340" y2="80" />
        <path d="M 340 80 l 4 -5 l 8 10 l 8 -10 l 8 10 l 4 -5" />
        <line x1="372" y1="80" x2="400" y2="80" />

        <!-- Return through load resistor 1Ω -->
        <line x1="400" y1="80" x2="400" y2="200" />
        <line x1="400" y1="200" x2="260" y2="200" />
        <path d="M 260 200 l -5 -8 l -10 16 l -10 -16 l -10 16 l -5 -8" />
        <line x1="220" y1="200" x2="80" y2="200" />
        <line x1="80" y1="200" x2="80" y2="80" />
      </g>
      <!-- Labels -->
      <text x="135" y="25" font-family="sans-serif" font-size="11">r/3 block</text>
      <text x="290" y="55" font-family="sans-serif" font-size="11">2r block</text>
      <text x="225" y="235" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0284c7">R = 1Ω</text>
    </svg>
  `);

  console.log('🎉 Batch 1 Diagrams Generated Successfully!');
}

generateAll().catch(console.error);
