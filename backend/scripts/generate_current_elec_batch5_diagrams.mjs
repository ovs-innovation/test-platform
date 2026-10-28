import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendDir = path.resolve(__dirname, '../uploads/current_electricity');
const frontendDir = path.resolve(__dirname, '../../frontend/public/uploads/current_electricity');

for (const dir of [backendDir, frontendDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function saveSvg(svg, filename) {
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  fs.writeFileSync(path.join(backendDir, filename), buf);
  fs.writeFileSync(path.join(frontendDir, filename), buf);
  console.log(`Saved: ${filename}`);
}

async function main() {
  console.log('Generating Batch 5 diagrams...');

  // 1. Q98: Conical conductor of variable cross-section
  const svg98 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="200" viewBox="0 0 500 200">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Tapering wire / truncated cone -->
    <!-- Left ellipse: cx=180, cy=100, rx=16, ry=45 -->
    <!-- Right ellipse: cx=360, cy=100, rx=8, ry=20 -->
    <!-- Current entering from left -->
    <line x1="60" y1="100" x2="164" y2="100" stroke="#1e293b" stroke-width="2.5" />
    <polygon points="160,94 174,100 160,106" fill="#1e293b" />
    <text x="110" y="85" font-family="Arial, sans-serif" font-size="16" font-style="italic" fill="#0f172a" font-weight="bold">I</text>

    <!-- Cone body -->
    <path d="M 180,55 L 360,80 A 8,20 0 0,1 360,120 L 180,145 A 16,45 0 0,1 180,55 Z" fill="#e2e8f0" stroke="#334155" stroke-width="2" />
    <!-- Left face ellipse -->
    <ellipse cx="180" cy="100" rx="16" ry="45" fill="#cbd5e1" stroke="#334155" stroke-width="2" />
    <!-- Right face ellipse -->
    <ellipse cx="360" cy="100" rx="8" ry="20" fill="#94a3b8" stroke="#334155" stroke-width="2" />

    <!-- Current exiting to right -->
    <line x1="368" y1="100" x2="440" y2="100" stroke="#1e293b" stroke-width="2.5" />
    <polygon points="425,94 439,100 425,106" fill="#1e293b" />
    <text x="400" y="85" font-family="Arial, sans-serif" font-size="16" font-style="italic" fill="#0f172a" font-weight="bold">I</text>
  </svg>`;
  await saveSvg(svg98, 'current_elec_q98_conical_conductor.png');

  // 2. Q99: Resistor ladder with 1 A in second shunt
  const svg99 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="620" height="240" viewBox="0 0 620 240">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Bottom line -->
    <line x1="60" y1="190" x2="560" y2="190" stroke="#1e293b" stroke-width="2" />

    <!-- Battery E on left -->
    <line x1="60" y1="190" x2="60" y2="135" stroke="#1e293b" stroke-width="2" />
    <line x1="45" y1="135" x2="75" y2="135" stroke="#1e293b" stroke-width="2.5" />
    <line x1="50" y1="125" x2="70" y2="125" stroke="#1e293b" stroke-width="3.5" />
    <line x1="60" y1="125" x2="60" y2="70" stroke="#1e293b" stroke-width="2" />
    <text x="25" y="135" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">E</text>

    <!-- Top wire segment 1 -->
    <line x1="60" y1="70" x2="100" y2="70" stroke="#1e293b" stroke-width="2" />
    <!-- Resistor 4 ohm -->
    <path d="M 100,70 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="110" y="45" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">4 Ω</text>
    <line x1="150" y1="70" x2="210" y2="70" stroke="#1e293b" stroke-width="2" />

    <!-- Shunt 1: 8 ohm at x=210 -->
    <line x1="210" y1="70" x2="210" y2="95" stroke="#1e293b" stroke-width="2" />
    <path d="M 210,95 l -10,5 l 20,10 l -20,10 l 20,10 l -20,10 l 10,5" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="225" y="130" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">8 Ω</text>
    <line x1="210" y1="145" x2="210" y2="190" stroke="#1e293b" stroke-width="2" />

    <!-- Top wire segment 2 -->
    <line x1="210" y1="70" x2="260" y2="70" stroke="#1e293b" stroke-width="2" />
    <!-- Resistor 4 ohm -->
    <path d="M 260,70 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="270" y="45" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">4 Ω</text>
    <line x1="310" y1="70" x2="380" y2="70" stroke="#1e293b" stroke-width="2" />

    <!-- Shunt 2: 8 ohm at x=380 with 1 A downwards -->
    <line x1="380" y1="70" x2="380" y2="95" stroke="#1e293b" stroke-width="2" />
    <path d="M 380,95 l -10,5 l 20,10 l -20,10 l 20,10 l -20,10 l 10,5" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="395" y="125" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">8 Ω</text>
    <line x1="380" y1="145" x2="380" y2="190" stroke="#1e293b" stroke-width="2" />
    <!-- Arrow 1 A -->
    <polygon points="380,175 375,160 385,160" fill="#dc2626" />
    <text x="395" y="170" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#dc2626">1 A</text>

    <!-- Top wire segment 3 -->
    <line x1="380" y1="70" x2="440" y2="70" stroke="#1e293b" stroke-width="2" />
    <!-- Resistor 4 ohm -->
    <path d="M 440,70 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="450" y="45" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">4 Ω</text>
    <line x1="490" y1="70" x2="560" y2="70" stroke="#1e293b" stroke-width="2" />

    <!-- Shunt 3: 4 ohm at end x=560 -->
    <line x1="560" y1="70" x2="560" y2="105" stroke="#1e293b" stroke-width="2" />
    <path d="M 560,105 l -10,5 l 20,10 l -20,10 l 20,10 l -20,10 l 10,5" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="575" y="135" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">4 Ω</text>
    <line x1="560" y1="155" x2="560" y2="190" stroke="#1e293b" stroke-width="2" />
  </svg>`;
  await saveSvg(svg99, 'current_elec_q99_resistor_ladder.png');

  // 3. Q101: Parallel branches with 10 ohm and 50 uF capacitor
  const svg101 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="260" viewBox="0 0 480 260">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Left vertical bus -->
    <line x1="80" y1="50" x2="80" y2="210" stroke="#1e293b" stroke-width="2" />
    <!-- Right vertical bus -->
    <line x1="400" y1="50" x2="400" y2="210" stroke="#1e293b" stroke-width="2" />

    <!-- Top branch: 10 ohm -->
    <line x1="80" y1="50" x2="200" y2="50" stroke="#1e293b" stroke-width="2" />
    <path d="M 200,50 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="220" y="30" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">10 Ω</text>
    <line x1="250" y1="50" x2="400" y2="50" stroke="#1e293b" stroke-width="2" />

    <!-- Middle branch: 10 ohm and 50 uF -->
    <line x1="80" y1="130" x2="140" y2="130" stroke="#1e293b" stroke-width="2" />
    <path d="M 140,130 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="150" y="110" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">10 Ω</text>
    <line x1="190" y1="130" x2="280" y2="130" stroke="#1e293b" stroke-width="2" />
    <!-- Capacitor 50 uF -->
    <line x1="280" y1="110" x2="280" y2="150" stroke="#047857" stroke-width="3" />
    <line x1="295" y1="110" x2="295" y2="150" stroke="#047857" stroke-width="3" />
    <text x="270" y="100" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#047857">50 μF</text>
    <line x1="295" y1="130" x2="400" y2="130" stroke="#1e293b" stroke-width="2" />

    <!-- Bottom branch: 100 V battery -->
    <line x1="80" y1="210" x2="225" y2="210" stroke="#1e293b" stroke-width="2" />
    <line x1="225" y1="195" x2="225" y2="225" stroke="#1e293b" stroke-width="2.5" />
    <line x1="235" y1="200" x2="235" y2="220" stroke="#1e293b" stroke-width="3.5" />
    <line x1="235" y1="210" x2="400" y2="210" stroke="#1e293b" stroke-width="2" />
    <text x="210" y="245" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">100 V</text>
  </svg>`;
  await saveSvg(svg101, 'current_elec_q101_parallel_branches.png');

  // 4. Q102: Capacitor loop with two batteries
  const svg102 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="450" height="250" viewBox="0 0 450 250">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Loop: left x=80, right x=350, top y=60, bottom y=190 -->
    <!-- Top branch: Battery 4 V -->
    <line x1="80" y1="60" x2="190" y2="60" stroke="#1e293b" stroke-width="2" />
    <line x1="190" y1="50" x2="190" y2="70" stroke="#1e293b" stroke-width="3.5" />
    <line x1="200" y1="45" x2="200" y2="75" stroke="#1e293b" stroke-width="2.5" />
    <line x1="200" y1="60" x2="350" y2="60" stroke="#1e293b" stroke-width="2" />
    <text x="185" y="35" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">4 V</text>

    <!-- Right branch: point a, capacitor 3 uF, point b -->
    <circle cx="350" cy="60" r="4" fill="#0f172a" />
    <text x="365" y="65" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">a</text>
    <line x1="350" y1="60" x2="350" y2="115" stroke="#1e293b" stroke-width="2" />
    <line x1="335" y1="115" x2="365" y2="115" stroke="#047857" stroke-width="3" />
    <line x1="335" y1="125" x2="365" y2="125" stroke="#047857" stroke-width="3" />
    <line x1="350" y1="125" x2="350" y2="190" stroke="#1e293b" stroke-width="2" />
    <text x="380" y="125" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#047857">3 μF</text>
    <circle cx="350" cy="190" r="4" fill="#0f172a" />
    <text x="365" y="195" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">b</text>

    <!-- Bottom branch: Battery 10 V -->
    <line x1="80" y1="190" x2="200" y2="190" stroke="#1e293b" stroke-width="2" />
    <line x1="200" y1="175" x2="200" y2="205" stroke="#1e293b" stroke-width="2.5" />
    <line x1="210" y1="180" x2="210" y2="200" stroke="#1e293b" stroke-width="3.5" />
    <line x1="210" y1="190" x2="350" y2="190" stroke="#1e293b" stroke-width="2" />
    <text x="195" y="225" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">10 V</text>

    <!-- Left branch: capacitor 6 uF -->
    <line x1="80" y1="60" x2="80" y2="115" stroke="#1e293b" stroke-width="2" />
    <line x1="65" y1="115" x2="95" y2="115" stroke="#047857" stroke-width="3" />
    <line x1="65" y1="125" x2="95" y2="125" stroke="#047857" stroke-width="3" />
    <line x1="80" y1="125" x2="80" y2="190" stroke="#1e293b" stroke-width="2" />
    <text x="15" y="125" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#047857">6 μF</text>
  </svg>`;
  await saveSvg(svg102, 'current_elec_q102_capacitor_loop.png');

  // 5. Q105: Parallel network with 8 ohm, 3 ohm, 24 ohm
  const svg105 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="220" viewBox="0 0 460 220">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Terminal A -->
    <circle cx="50" cy="110" r="4" fill="#0f172a" />
    <text x="35" y="105" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">A</text>
    <line x1="50" y1="110" x2="110" y2="110" stroke="#1e293b" stroke-width="2" />

    <!-- Split into top and bottom -->
    <line x1="110" y1="50" x2="110" y2="170" stroke="#1e293b" stroke-width="2" />

    <!-- Top arm: 8 ohm on left, wire on right -->
    <line x1="110" y1="50" x2="150" y2="50" stroke="#1e293b" stroke-width="2" />
    <path d="M 150,50 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="165" y="30" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">8 Ω</text>
    <line x1="200" y1="50" x2="350" y2="50" stroke="#1e293b" stroke-width="2" />

    <!-- Bottom arm: wire on left, 24 ohm on right -->
    <line x1="110" y1="170" x2="260" y2="170" stroke="#1e293b" stroke-width="2" />
    <path d="M 260,170 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="270" y="200" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">24 Ω</text>
    <line x1="310" y1="170" x2="350" y2="170" stroke="#1e293b" stroke-width="2" />

    <!-- Vertical 3 ohm in middle at x=230 -->
    <line x1="230" y1="50" x2="230" y2="85" stroke="#1e293b" stroke-width="2" />
    <path d="M 230,85 l -10,5 l 20,10 l -20,10 l 20,10 l -20,10 l 10,5" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="245" y="115" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">3 Ω</text>
    <line x1="230" y1="135" x2="230" y2="170" stroke="#1e293b" stroke-width="2" />

    <!-- Right combine and Terminal B -->
    <line x1="350" y1="50" x2="350" y2="170" stroke="#1e293b" stroke-width="2" />
    <line x1="350" y1="110" x2="410" y2="110" stroke="#1e293b" stroke-width="2" />
    <circle cx="410" cy="110" r="4" fill="#0f172a" />
    <text x="420" y="105" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">B</text>
  </svg>`;
  await saveSvg(svg105, 'current_elec_q105_parallel_network.png');

  // 6. Q106: Bank of 6 cells (2 rows of 3) across load R
  const svg106 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="240" viewBox="0 0 480 240">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Left bus -->
    <line x1="80" y1="60" x2="80" y2="190" stroke="#1e293b" stroke-width="2" />
    <!-- Right bus -->
    <line x1="400" y1="60" x2="400" y2="190" stroke="#1e293b" stroke-width="2" />

    <!-- Row 1: 3 cells in series at y=60 -->
    <!-- Cell 1 -->
    <line x1="80" y1="60" x2="130" y2="60" stroke="#1e293b" stroke-width="2" />
    <line x1="130" y1="45" x2="130" y2="75" stroke="#1e293b" stroke-width="2.5" />
    <line x1="140" y1="50" x2="140" y2="70" stroke="#1e293b" stroke-width="3.5" />
    <text x="122" y="40" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">+</text>
    <text x="142" y="40" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">-</text>

    <!-- Cell 2 -->
    <line x1="140" y1="60" x2="230" y2="60" stroke="#1e293b" stroke-width="2" />
    <line x1="230" y1="45" x2="230" y2="75" stroke="#1e293b" stroke-width="2.5" />
    <line x1="240" y1="50" x2="240" y2="70" stroke="#1e293b" stroke-width="3.5" />
    <text x="222" y="40" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">+</text>
    <text x="242" y="40" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">-</text>

    <!-- Cell 3 -->
    <line x1="240" y1="60" x2="330" y2="60" stroke="#1e293b" stroke-width="2" />
    <line x1="330" y1="45" x2="330" y2="75" stroke="#1e293b" stroke-width="2.5" />
    <line x1="340" y1="50" x2="340" y2="70" stroke="#1e293b" stroke-width="3.5" />
    <text x="322" y="40" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">+</text>
    <text x="342" y="40" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">-</text>
    <line x1="340" y1="60" x2="400" y2="60" stroke="#1e293b" stroke-width="2" />

    <!-- Row 2: 3 cells in series at y=120 -->
    <!-- Cell 1 -->
    <line x1="80" y1="120" x2="130" y2="120" stroke="#1e293b" stroke-width="2" />
    <line x1="130" y1="105" x2="130" y2="135" stroke="#1e293b" stroke-width="2.5" />
    <line x1="140" y1="110" x2="140" y2="130" stroke="#1e293b" stroke-width="3.5" />
    <text x="122" y="100" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">+</text>
    <text x="142" y="100" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">-</text>

    <!-- Cell 2 -->
    <line x1="140" y1="120" x2="230" y2="120" stroke="#1e293b" stroke-width="2" />
    <line x1="230" y1="105" x2="230" y2="135" stroke="#1e293b" stroke-width="2.5" />
    <line x1="240" y1="110" x2="240" y2="130" stroke="#1e293b" stroke-width="3.5" />
    <text x="222" y="100" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">+</text>
    <text x="242" y="100" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">-</text>

    <!-- Cell 3 -->
    <line x1="240" y1="120" x2="330" y2="120" stroke="#1e293b" stroke-width="2" />
    <line x1="330" y1="105" x2="330" y2="135" stroke="#1e293b" stroke-width="2.5" />
    <line x1="340" y1="110" x2="340" y2="130" stroke="#1e293b" stroke-width="3.5" />
    <text x="322" y="100" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">+</text>
    <text x="342" y="100" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">-</text>
    <line x1="340" y1="120" x2="400" y2="120" stroke="#1e293b" stroke-width="2" />

    <!-- Bottom load resistor R at y=190 -->
    <line x1="80" y1="190" x2="210" y2="190" stroke="#1e293b" stroke-width="2" />
    <path d="M 210,190 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="235" y="225" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">R</text>
    <line x1="260" y1="190" x2="400" y2="190" stroke="#1e293b" stroke-width="2" />
  </svg>`;
  await saveSvg(svg106, 'current_elec_q106_cell_bank.png');

  // 7. Q108: Bridge with capacitors C, 2C and resistors R, 2R
  const svg108 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="260" viewBox="0 0 480 260">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Terminals P and Q -->
    <circle cx="100" cy="110" r="4" fill="#0f172a" />
    <text x="80" y="105" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">P</text>
    <circle cx="380" cy="110" r="4" fill="#0f172a" />
    <text x="390" y="105" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">Q</text>

    <!-- Upper branch: capacitors C and 2C -->
    <line x1="100" y1="110" x2="100" y2="50" stroke="#1e293b" stroke-width="2" />
    <line x1="100" y1="50" x2="170" y2="50" stroke="#1e293b" stroke-width="2" />
    <!-- Capacitor C -->
    <line x1="170" y1="35" x2="170" y2="65" stroke="#047857" stroke-width="3" />
    <line x1="180" y1="35" x2="180" y2="65" stroke="#047857" stroke-width="3" />
    <text x="170" y="25" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#047857">C</text>
    <line x1="180" y1="50" x2="240" y2="50" stroke="#1e293b" stroke-width="2" />
    <!-- Point A -->
    <circle cx="240" cy="50" r="4" fill="#0f172a" />
    <text x="235" y="40" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">A</text>
    <line x1="240" y1="50" x2="300" y2="50" stroke="#1e293b" stroke-width="2" />
    <!-- Capacitor 2C -->
    <line x1="300" y1="35" x2="300" y2="65" stroke="#047857" stroke-width="3" />
    <line x1="310" y1="35" x2="310" y2="65" stroke="#047857" stroke-width="3" />
    <text x="300" y="25" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#047857">2C</text>
    <line x1="310" y1="50" x2="380" y2="50" stroke="#1e293b" stroke-width="2" />
    <line x1="380" y1="50" x2="380" y2="110" stroke="#1e293b" stroke-width="2" />

    <!-- Lower branch: resistors R and 2R -->
    <line x1="100" y1="110" x2="100" y2="150" stroke="#1e293b" stroke-width="2" />
    <line x1="100" y1="150" x2="145" y2="150" stroke="#1e293b" stroke-width="2" />
    <!-- Resistor R -->
    <path d="M 145,150 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="165" y="180" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">R</text>
    <line x1="195" y1="150" x2="240" y2="150" stroke="#1e293b" stroke-width="2" />
    <!-- Point B -->
    <circle cx="240" cy="150" r="4" fill="#0f172a" />
    <text x="235" y="175" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">B</text>
    <line x1="240" y1="150" x2="285" y2="150" stroke="#1e293b" stroke-width="2" />
    <!-- Resistor 2R -->
    <path d="M 285,150 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="300" y="180" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">2R</text>
    <line x1="335" y1="150" x2="380" y2="150" stroke="#1e293b" stroke-width="2" />
    <line x1="380" y1="150" x2="380" y2="110" stroke="#1e293b" stroke-width="2" />

    <!-- Outer Battery V -->
    <line x1="50" y1="110" x2="100" y2="110" stroke="#1e293b" stroke-width="2" />
    <line x1="50" y1="110" x2="50" y2="220" stroke="#1e293b" stroke-width="2" />
    <line x1="50" y1="220" x2="220" y2="220" stroke="#1e293b" stroke-width="2" />
    <line x1="220" y1="205" x2="220" y2="235" stroke="#1e293b" stroke-width="2.5" />
    <line x1="230" y1="210" x2="230" y2="230" stroke="#1e293b" stroke-width="3.5" />
    <line x1="230" y1="220" x2="430" y2="220" stroke="#1e293b" stroke-width="2" />
    <line x1="430" y1="220" x2="430" y2="110" stroke="#1e293b" stroke-width="2" />
    <line x1="430" y1="110" x2="380" y2="110" stroke="#1e293b" stroke-width="2" />
    <text x="215" y="250" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">V</text>
  </svg>`;
  await saveSvg(svg108, 'current_elec_q108_bridge_capacitors.png');

  // 8. Q109: Meter bridge setup
  const svg109 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="240" viewBox="0 0 500 240">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Top bridge resistors: 10 ohm and 15 ohm -->
    <line x1="60" y1="60" x2="130" y2="60" stroke="#1e293b" stroke-width="2" />
    <path d="M 130,60 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="140" y="40" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">10 Ω</text>
    <line x1="180" y1="60" x2="250" y2="60" stroke="#1e293b" stroke-width="2" />

    <!-- Point C -->
    <circle cx="250" cy="60" r="4" fill="#0f172a" />
    <text x="245" y="45" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">C</text>

    <line x1="250" y1="60" x2="320" y2="60" stroke="#1e293b" stroke-width="2" />
    <path d="M 320,60 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="330" y="40" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">15 Ω</text>
    <line x1="370" y1="60" x2="440" y2="60" stroke="#1e293b" stroke-width="2" />

    <!-- End connections to wire AB -->
    <line x1="60" y1="60" x2="60" y2="130" stroke="#1e293b" stroke-width="2" />
    <line x1="440" y1="60" x2="440" y2="130" stroke="#1e293b" stroke-width="2" />

    <!-- Wire AB (100 cm) -->
    <line x1="60" y1="130" x2="440" y2="130" stroke="#d97706" stroke-width="4" />
    <circle cx="60" cy="130" r="4" fill="#0f172a" />
    <text x="40" y="135" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">A</text>
    <circle cx="440" cy="130" r="4" fill="#0f172a" />
    <text x="450" y="135" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">B</text>

    <!-- Galvanometer from C to Jockey D -->
    <line x1="250" y1="60" x2="250" y2="80" stroke="#1e293b" stroke-width="2" />
    <line x1="250" y1="80" x2="270" y2="80" stroke="#1e293b" stroke-width="2" />
    <circle cx="285" cy="80" r="14" fill="#f8fafc" stroke="#1e293b" stroke-width="2" />
    <text x="279" y="86" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#1e293b">G</text>
    <line x1="300" y1="80" x2="300" y2="105" stroke="#1e293b" stroke-width="2" />
    <line x1="300" y1="105" x2="212" y2="105" stroke="#1e293b" stroke-width="2" />
    <line x1="212" y1="105" x2="212" y2="126" stroke="#1e293b" stroke-width="2" />
    <polygon points="212,128 207,118 217,118" fill="#1e293b" />
    <text x="195" y="118" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">D</text>

    <!-- Bottom battery -->
    <line x1="60" y1="130" x2="60" y2="200" stroke="#1e293b" stroke-width="2" />
    <line x1="60" y1="200" x2="235" y2="200" stroke="#1e293b" stroke-width="2" />
    <line x1="235" y1="185" x2="235" y2="215" stroke="#1e293b" stroke-width="2.5" />
    <line x1="245" y1="190" x2="245" y2="210" stroke="#1e293b" stroke-width="3.5" />
    <line x1="245" y1="200" x2="440" y2="200" stroke="#1e293b" stroke-width="2" />
    <line x1="440" y1="200" x2="440" y2="130" stroke="#1e293b" stroke-width="2" />
  </svg>`;
  await saveSvg(svg109, 'current_elec_q109_meter_bridge.png');

  // 9. Q110: Infinite ladder network (series 4 ohm, shunt 3 ohm)
  const svg110 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="620" height="200" viewBox="0 0 620 200">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Terminal A -->
    <circle cx="40" cy="50" r="4" fill="#0f172a" />
    <text x="20" y="55" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">A</text>
    <!-- Terminal B -->
    <circle cx="40" cy="150" r="4" fill="#0f172a" />
    <text x="20" y="155" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">B</text>

    <!-- Bottom wire -->
    <line x1="40" y1="150" x2="550" y2="150" stroke="#1e293b" stroke-width="2" />

    <!-- Cell 1 -->
    <line x1="40" y1="50" x2="70" y2="50" stroke="#1e293b" stroke-width="2" />
    <path d="M 70,50 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="80" y="30" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">4 Ω</text>
    <line x1="120" y1="50" x2="160" y2="50" stroke="#1e293b" stroke-width="2" />

    <!-- Shunt 1 -->
    <line x1="160" y1="50" x2="160" y2="75" stroke="#1e293b" stroke-width="2" />
    <path d="M 160,75 l -10,5 l 20,10 l -20,10 l 20,10 l -20,10 l 10,5" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="175" y="105" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">3 Ω</text>
    <line x1="160" y1="125" x2="160" y2="150" stroke="#1e293b" stroke-width="2" />

    <!-- Cell 2 -->
    <line x1="160" y1="50" x2="190" y2="50" stroke="#1e293b" stroke-width="2" />
    <path d="M 190,50 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="200" y="30" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">4 Ω</text>
    <line x1="240" y1="50" x2="280" y2="50" stroke="#1e293b" stroke-width="2" />

    <!-- Shunt 2 -->
    <line x1="280" y1="50" x2="280" y2="75" stroke="#1e293b" stroke-width="2" />
    <path d="M 280,75 l -10,5 l 20,10 l -20,10 l 20,10 l -20,10 l 10,5" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="295" y="105" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">3 Ω</text>
    <line x1="280" y1="125" x2="280" y2="150" stroke="#1e293b" stroke-width="2" />

    <!-- Cell 3 -->
    <line x1="280" y1="50" x2="310" y2="50" stroke="#1e293b" stroke-width="2" />
    <path d="M 310,50 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="320" y="30" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">4 Ω</text>
    <line x1="360" y1="50" x2="400" y2="50" stroke="#1e293b" stroke-width="2" />

    <!-- Shunt 3 -->
    <line x1="400" y1="50" x2="400" y2="75" stroke="#1e293b" stroke-width="2" />
    <path d="M 400,75 l -10,5 l 20,10 l -20,10 l 20,10 l -20,10 l 10,5" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="415" y="105" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">3 Ω</text>
    <line x1="400" y1="125" x2="400" y2="150" stroke="#1e293b" stroke-width="2" />

    <!-- Cell 4 -->
    <line x1="400" y1="50" x2="430" y2="50" stroke="#1e293b" stroke-width="2" />
    <path d="M 430,50 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="440" y="30" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">4 Ω</text>
    <line x1="480" y1="50" x2="520" y2="50" stroke="#1e293b" stroke-width="2" />

    <!-- Shunt 4 -->
    <line x1="520" y1="50" x2="520" y2="75" stroke="#1e293b" stroke-width="2" />
    <path d="M 520,75 l -10,5 l 20,10 l -20,10 l 20,10 l -20,10 l 10,5" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="535" y="105" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">3 Ω</text>
    <line x1="520" y1="125" x2="520" y2="150" stroke="#1e293b" stroke-width="2" />

    <!-- Dashed infinite extension -->
    <line x1="520" y1="50" x2="570" y2="50" stroke="#1e293b" stroke-width="2" stroke-dasharray="6,4" />
    <line x1="550" y1="150" x2="570" y2="150" stroke="#1e293b" stroke-width="2" stroke-dasharray="6,4" />
  </svg>`;
  await saveSvg(svg110, 'current_elec_q110_infinite_ladder.png');

  // 10. Q112: Diamond bridge with ideal ammeter
  const svg112 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="320" viewBox="0 0 460 320">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Diamond corners: Top(230,40), Bottom(230,200), Left(130,120), Right(330,120) -->

    <!-- Top Left Arm: 4 ohm (Left to Top) -->
    <line x1="130" y1="120" x2="165" y2="92" stroke="#1e293b" stroke-width="2" />
    <path d="M 165,92 l 6,-8 l 10,14 l -10,-14 l 14,-10 l -6,14 l 14,-10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="140" y="70" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">4 Ω</text>
    <line x1="195" y1="68" x2="230" y2="40" stroke="#1e293b" stroke-width="2" />

    <!-- Top Right Arm: 6 ohm (Top to Right) -->
    <line x1="230" y1="40" x2="265" y2="68" stroke="#1e293b" stroke-width="2" />
    <path d="M 265,68 l 6,8 l 10,-14 l -10,14 l 14,10 l -6,-14 l 14,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="290" y="70" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">6 Ω</text>
    <line x1="295" y1="92" x2="330" y2="120" stroke="#1e293b" stroke-width="2" />

    <!-- Bottom Left Arm: 18 ohm (Left to Bottom) -->
    <line x1="130" y1="120" x2="165" y2="148" stroke="#1e293b" stroke-width="2" />
    <path d="M 165,148 l 6,8 l 10,-14 l -10,14 l 14,10 l -6,-14 l 14,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="135" y="180" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">18 Ω</text>
    <line x1="195" y1="172" x2="230" y2="200" stroke="#1e293b" stroke-width="2" />

    <!-- Central Vertical Arm: 3 ohm (Top to Bottom) -->
    <line x1="230" y1="40" x2="230" y2="90" stroke="#1e293b" stroke-width="2" />
    <path d="M 230,90 l -10,5 l 20,10 l -20,10 l 20,10 l -20,10 l 10,5" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="245" y="125" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">3 Ω</text>
    <line x1="230" y1="140" x2="230" y2="200" stroke="#1e293b" stroke-width="2" />

    <!-- Bottom Right Arm: Ideal Ammeter (Bottom to Right) -->
    <line x1="230" y1="200" x2="265" y2="172" stroke="#1e293b" stroke-width="2" />
    <circle cx="280" cy="160" r="14" fill="#f8fafc" stroke="#dc2626" stroke-width="2.5" />
    <text x="274" y="166" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#dc2626">A</text>
    <line x1="295" y1="148" x2="330" y2="120" stroke="#1e293b" stroke-width="2" />

    <!-- Battery 36 V connected across Left (130,120) and Right (330,120) -->
    <line x1="130" y1="120" x2="90" y2="120" stroke="#1e293b" stroke-width="2" />
    <line x1="90" y1="120" x2="90" y2="270" stroke="#1e293b" stroke-width="2" />
    <line x1="90" y1="270" x2="215" y2="270" stroke="#1e293b" stroke-width="2" />
    <line x1="215" y1="255" x2="215" y2="285" stroke="#1e293b" stroke-width="2.5" />
    <line x1="225" y1="260" x2="225" y2="280" stroke="#1e293b" stroke-width="3.5" />
    <text x="202" y="250" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">+</text>
    <text x="228" y="250" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">-</text>
    <text x="205" y="305" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">36 V</text>
    <line x1="225" y1="270" x2="370" y2="270" stroke="#1e293b" stroke-width="2" />
    <line x1="370" y1="270" x2="370" y2="120" stroke="#1e293b" stroke-width="2" />
    <line x1="370" y1="120" x2="330" y2="120" stroke="#1e293b" stroke-width="2" />
  </svg>`;
  await saveSvg(svg112, 'current_elec_q112_bridge_ammeter.png');

  // 11. Q115: Parallel 6 ohm & 12 ohm in series with 2 ohm and emf E
  const svg115 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="240" viewBox="0 0 460 240">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Loop: left x=80, right x=380, top y=60, bottom y=180 -->
    <!-- Top parallel block: x=170 to x=290 -->
    <line x1="80" y1="60" x2="170" y2="60" stroke="#1e293b" stroke-width="2" />
    <line x1="170" y1="30" x2="170" y2="90" stroke="#1e293b" stroke-width="2" />

    <!-- 6 ohm upper branch -->
    <line x1="170" y1="30" x2="205" y2="30" stroke="#1e293b" stroke-width="2" />
    <path d="M 205,30 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="220" y="15" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">6 Ω</text>
    <line x1="255" y1="30" x2="290" y2="30" stroke="#1e293b" stroke-width="2" />

    <!-- 12 ohm lower branch -->
    <line x1="170" y1="90" x2="205" y2="90" stroke="#1e293b" stroke-width="2" />
    <path d="M 205,90 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="215" y="120" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">12 Ω</text>
    <line x1="255" y1="90" x2="290" y2="90" stroke="#1e293b" stroke-width="2" />

    <line x1="290" y1="30" x2="290" y2="90" stroke="#1e293b" stroke-width="2" />
    <line x1="290" y1="60" x2="380" y2="60" stroke="#1e293b" stroke-width="2" />

    <!-- Right and bottom wires -->
    <line x1="380" y1="60" x2="380" y2="180" stroke="#1e293b" stroke-width="2" />
    <line x1="380" y1="180" x2="260" y2="180" stroke="#1e293b" stroke-width="2" />

    <!-- Battery epsilon -->
    <line x1="260" y1="165" x2="260" y2="195" stroke="#1e293b" stroke-width="2.5" />
    <line x1="250" y1="170" x2="250" y2="190" stroke="#1e293b" stroke-width="3.5" />
    <text x="250" y="155" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">ε</text>
    <line x1="250" y1="180" x2="195" y2="180" stroke="#1e293b" stroke-width="2" />

    <!-- 2 ohm series resistor -->
    <path d="M 195,180 l -5,-10 l -10,20 l -10,-20 l -10,20 l -10,-20 l -5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="160" y="215" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">2 Ω</text>
    <line x1="145" y1="180" x2="80" y2="180" stroke="#1e293b" stroke-width="2" />
    <line x1="80" y1="180" x2="80" y2="60" stroke="#1e293b" stroke-width="2" />
  </svg>`;
  await saveSvg(svg115, 'current_elec_q115_parallel_resistors.png');

  console.log('All 11 Batch 5 diagrams generated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
