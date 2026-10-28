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
  console.log('Generating Batch 6 diagrams...');

  // 1. Q127: Tetrahedron network of 6 resistors
  const svg127 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="260" viewBox="0 0 500 260">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Terminals P(80,180) and Q(420,180) -->
    <!-- Top Apex: (250,40) -->
    <!-- Front/Middle Apex: (250,110) -->

    <!-- Direct edge P to Q along bottom -->
    <line x1="80" y1="180" x2="220" y2="180" stroke="#1e293b" stroke-width="2" />
    <path d="M 220,180 l 5,-8 l 10,16 l 10,-16 l 10,16 l 10,-16 l 10,16 l 5,-8" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="245" y="205" font-family="Arial, sans-serif" font-size="15" font-style="italic" font-weight="bold" fill="#2563eb">r</text>
    <line x1="280" y1="180" x2="420" y2="180" stroke="#1e293b" stroke-width="2" />

    <!-- Top ridge: P to Top Apex (250,40) -->
    <line x1="80" y1="180" x2="140" y2="130" stroke="#1e293b" stroke-width="2" />
    <path d="M 140,130 l 6,-8 l 10,14 l 10,-14 l 10,14 l 10,-14 l 6,8" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="150" y="105" font-family="Arial, sans-serif" font-size="15" font-style="italic" font-weight="bold" fill="#2563eb">r</text>
    <line x1="192" y1="88" x2="250" y2="40" stroke="#1e293b" stroke-width="2" />

    <!-- Top Apex to Q (420,180) -->
    <line x1="250" y1="40" x2="308" y2="88" stroke="#1e293b" stroke-width="2" />
    <path d="M 308,88 l 6,8 l 10,-14 l 10,14 l 10,-14 l 10,14 l 6,-8" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="345" y="105" font-family="Arial, sans-serif" font-size="15" font-style="italic" font-weight="bold" fill="#2563eb">r</text>
    <line x1="360" y1="130" x2="420" y2="180" stroke="#1e293b" stroke-width="2" />

    <!-- Middle ridge: P to Front Apex (250,110) -->
    <line x1="80" y1="180" x2="145" y2="153" stroke="#1e293b" stroke-width="2" />
    <path d="M 145,153 l 6,-6 l 10,12 l 10,-12 l 10,12 l 10,-12 l 6,6" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="180" y="145" font-family="Arial, sans-serif" font-size="15" font-style="italic" font-weight="bold" fill="#2563eb">r</text>
    <line x1="197" y1="131" x2="250" y2="110" stroke="#1e293b" stroke-width="2" />

    <!-- Front Apex to Q (420,180) -->
    <line x1="250" y1="110" x2="303" y2="131" stroke="#1e293b" stroke-width="2" />
    <path d="M 303,131 l 6,6 l 10,-12 l 10,12 l 10,-12 l 10,12 l 6,-6" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="315" y="145" font-family="Arial, sans-serif" font-size="15" font-style="italic" font-weight="bold" fill="#2563eb">r</text>
    <line x1="355" y1="153" x2="420" y2="180" stroke="#1e293b" stroke-width="2" />

    <!-- Central vertical edge between Top Apex and Front Apex -->
    <line x1="250" y1="40" x2="250" y2="110" stroke="#1e293b" stroke-width="2.5" />

    <!-- Terminal P and Q -->
    <line x1="50" y1="180" x2="80" y2="180" stroke="#1e293b" stroke-width="2" />
    <circle cx="80" cy="180" r="4" fill="#0f172a" />
    <text x="45" y="175" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">P</text>

    <line x1="420" y1="180" x2="450" y2="180" stroke="#1e293b" stroke-width="2" />
    <circle cx="420" cy="180" r="4" fill="#0f172a" />
    <text x="455" y="175" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">Q</text>
  </svg>`;
  await saveSvg(svg127, 'current_elec_q127_tetrahedron_network.png');

  // 2. Q130: Semiconductor resistivity vs temperature graphs (4 options)
  const svg130 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="560" height="280" viewBox="0 0 560 280">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Graph 1: Top-Left (x=40, y=30) -->
    <text x="30" y="25" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">(1)</text>
    <line x1="60" y1="30" x2="60" y2="120" stroke="#1e293b" stroke-width="2" />
    <line x1="60" y1="120" x2="160" y2="120" stroke="#1e293b" stroke-width="2" />
    <polygon points="60,25 56,33 64,33" fill="#1e293b" />
    <polygon points="165,120 157,116 157,124" fill="#1e293b" />
    <text x="45" y="40" font-family="Arial, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#0f172a">ρ</text>
    <text x="165" y="135" font-family="Arial, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#0f172a">T</text>
    <line x1="70" y1="110" x2="150" y2="50" stroke="#2563eb" stroke-width="2.5" />

    <!-- Graph 2: Top-Right (x=320, y=30) -->
    <text x="310" y="25" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">(2)</text>
    <line x1="340" y1="30" x2="340" y2="120" stroke="#1e293b" stroke-width="2" />
    <line x1="340" y1="120" x2="440" y2="120" stroke="#1e293b" stroke-width="2" />
    <polygon points="340,25 336,33 344,33" fill="#1e293b" />
    <polygon points="445,120 437,116 437,124" fill="#1e293b" />
    <text x="325" y="40" font-family="Arial, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#0f172a">ρ</text>
    <text x="445" y="135" font-family="Arial, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#0f172a">T</text>
    <line x1="350" y1="50" x2="430" y2="110" stroke="#2563eb" stroke-width="2.5" />

    <!-- Graph 3: Bottom-Left (x=40, y=160) -->
    <text x="30" y="155" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">(3)</text>
    <line x1="60" y1="160" x2="60" y2="250" stroke="#1e293b" stroke-width="2" />
    <line x1="60" y1="250" x2="160" y2="250" stroke="#1e293b" stroke-width="2" />
    <polygon points="60,155 56,163 64,163" fill="#1e293b" />
    <polygon points="165,250 157,246 157,254" fill="#1e293b" />
    <text x="45" y="170" font-family="Arial, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#0f172a">ρ</text>
    <text x="165" y="265" font-family="Arial, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#0f172a">T</text>
    <path d="M 70,175 Q 85,240 150,245" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <!-- Graph 4: Bottom-Right (x=320, y=160) -->
    <text x="310" y="155" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">(4)</text>
    <line x1="340" y1="160" x2="340" y2="250" stroke="#1e293b" stroke-width="2" />
    <line x1="340" y1="250" x2="440" y2="250" stroke="#1e293b" stroke-width="2" />
    <polygon points="340,155 336,163 344,163" fill="#1e293b" />
    <polygon points="445,250 437,246 437,254" fill="#1e293b" />
    <text x="325" y="170" font-family="Arial, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#0f172a">ρ</text>
    <text x="445" y="265" font-family="Arial, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#0f172a">T</text>
    <path d="M 350,245 Q 415,240 430,175" fill="none" stroke="#2563eb" stroke-width="2.5" />
  </svg>`;
  await saveSvg(svg130, 'current_elec_q130_semiconductor_resistivity.png');

  // 3. Q132: Circular network with 12 V battery and resistors
  const svg132 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="360" viewBox="0 0 400 360">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Center (200, 180), Radius 120 -->
    <!-- Circular wire with gaps for battery (top-right) and bottom resistor -->
    <!-- Arc from 330 deg (approx (304, 120)) clockwise to 240 deg (approx (140, 284)) -->
    <circle cx="200" cy="180" r="120" fill="none" stroke="#1e293b" stroke-width="2" />

    <!-- Mask/overlay battery at angle -30 deg: cx=200+120*cos(-30)=304, cy=180-120*sin(30)=120 -->
    <rect x="280" y="80" width="50" height="50" fill="#ffffff" />
    <!-- Battery 12 V -->
    <line x1="285" y1="125" x2="310" y2="85" stroke="#1e293b" stroke-width="2.5" />
    <line x1="295" y1="130" x2="315" y2="100" stroke="#1e293b" stroke-width="3.5" />
    <text x="330" y="105" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">12 V</text>
    <line x1="260" y1="80" x2="285" y2="105" stroke="#1e293b" stroke-width="2" />
    <line x1="315" y1="115" x2="320" y2="180" stroke="#1e293b" stroke-width="2" />

    <!-- Mask/overlay bottom 10 ohm at (200, 300) -->
    <rect x="160" y="280" width="80" height="40" fill="#ffffff" />
    <path d="M 160,300 l 5,-8 l 10,16 l 10,-16 l 10,16 l 10,-16 l 10,16 l 5,-8" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="185" y="335" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">10 Ω</text>
    <line x1="140" y1="284" x2="160" y2="300" stroke="#1e293b" stroke-width="2" />
    <line x1="220" y1="300" x2="260" y2="284" stroke="#1e293b" stroke-width="2" />

    <!-- Horizontal diameter from (80,180) to (320,180) -->
    <!-- Left part: 10 ohm from 80 to 200 -->
    <line x1="80" y1="180" x2="110" y2="180" stroke="#1e293b" stroke-width="2" />
    <path d="M 110,180 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="125" y="210" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">10 Ω</text>
    <line x1="160" y1="180" x2="200" y2="180" stroke="#1e293b" stroke-width="2" />

    <!-- Right part: 5 ohm from 200 to 320 -->
    <line x1="200" y1="180" x2="235" y2="180" stroke="#1e293b" stroke-width="2" />
    <path d="M 235,180 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="250" y="210" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">5 Ω</text>
    <line x1="285" y1="180" x2="320" y2="180" stroke="#1e293b" stroke-width="2" />

    <!-- Vertical radius: 10 ohm from (200,60) to (200,180) -->
    <line x1="200" y1="60" x2="200" y2="90" stroke="#1e293b" stroke-width="2" />
    <path d="M 200,90 l -10,5 l 20,10 l -20,10 l 20,10 l -20,10 l 10,5" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="145" y="125" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">10 Ω</text>
    <line x1="200" y1="140" x2="200" y2="180" stroke="#1e293b" stroke-width="2" />
  </svg>`;
  await saveSvg(svg132, 'current_elec_q132_circular_network.png');

  // 4. Q133: KCL network with junctions
  const svg133 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="520" height="200" viewBox="0 0 520 200">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Left junction at (150, 100) -->
    <!-- Top-left input: 5 A -->
    <line x1="80" y1="40" x2="150" y2="100" stroke="#1e293b" stroke-width="2.5" />
    <polygon points="120,74 125,65 115,67" fill="#1e293b" />
    <text x="110" y="55" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">5 A</text>

    <!-- Bottom-left input: 3 A -->
    <line x1="80" y1="160" x2="150" y2="100" stroke="#1e293b" stroke-width="2.5" />
    <polygon points="120,126 115,133 125,135" fill="#1e293b" />
    <text x="75" y="130" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">3 A</text>

    <!-- Bottom-left exit: 2 A -->
    <line x1="150" y1="100" x2="170" y2="175" stroke="#1e293b" stroke-width="2.5" />
    <polygon points="163,148 160,138 170,140" fill="#1e293b" />
    <text x="180" y="150" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">2 A</text>

    <!-- Horizontal link to right junction at (340, 100) -->
    <line x1="150" y1="100" x2="340" y2="100" stroke="#1e293b" stroke-width="2.5" />
    <polygon points="255,100 243,95 243,105" fill="#1e293b" />

    <!-- Right junction at (340, 100) -->
    <!-- Top-right exit: 1 A -->
    <line x1="340" y1="100" x2="420" y2="40" stroke="#1e293b" stroke-width="2.5" />
    <polygon points="385,66 375,68 380,77" fill="#1e293b" />
    <text x="350" y="55" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">1 A</text>

    <!-- Current branch with i pointing right-down -->
    <line x1="340" y1="100" x2="450" y2="140" stroke="#dc2626" stroke-width="3" />
    <polygon points="405,124 392,118 396,128" fill="#dc2626" />
    <text x="390" y="150" font-family="Arial, sans-serif" font-size="18" font-style="italic" font-weight="bold" fill="#dc2626">i</text>
  </svg>`;
  await saveSvg(svg133, 'current_elec_q133_kcl_network.png');

  // 5. Q134: Infinite ladder network (1 ohm series, 1 ohm shunt)
  const svg134 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="220" viewBox="0 0 600 220">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Terminals A(50,50) and B(50,170) -->
    <circle cx="50" cy="50" r="4" fill="#0f172a" />
    <text x="30" y="55" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">A</text>
    <circle cx="50" cy="170" r="4" fill="#0f172a" />
    <text x="30" y="175" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">B</text>

    <!-- Unit 1 -->
    <line x1="50" y1="50" x2="90" y2="50" stroke="#1e293b" stroke-width="2" />
    <path d="M 90,50 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="105" y="30" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">1 Ω</text>
    <line x1="140" y1="50" x2="190" y2="50" stroke="#1e293b" stroke-width="2" />

    <line x1="50" y1="170" x2="90" y2="170" stroke="#1e293b" stroke-width="2" />
    <path d="M 90,170 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="105" y="200" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">1 Ω</text>
    <line x1="140" y1="170" x2="190" y2="170" stroke="#1e293b" stroke-width="2" />

    <!-- Shunt 1 -->
    <line x1="190" y1="50" x2="190" y2="85" stroke="#1e293b" stroke-width="2" />
    <path d="M 190,85 l -10,5 l 20,10 l -20,10 l 20,10 l -20,10 l 10,5" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="205" y="115" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">1 Ω</text>
    <line x1="190" y1="135" x2="190" y2="170" stroke="#1e293b" stroke-width="2" />

    <!-- Unit 2 -->
    <line x1="190" y1="50" x2="230" y2="50" stroke="#1e293b" stroke-width="2" />
    <path d="M 230,50 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="245" y="30" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">1 Ω</text>
    <line x1="280" y1="50" x2="330" y2="50" stroke="#1e293b" stroke-width="2" />

    <line x1="190" y1="170" x2="230" y2="170" stroke="#1e293b" stroke-width="2" />
    <path d="M 230,170 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="245" y="200" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">1 Ω</text>
    <line x1="280" y1="170" x2="330" y2="170" stroke="#1e293b" stroke-width="2" />

    <!-- Shunt 2 -->
    <line x1="330" y1="50" x2="330" y2="85" stroke="#1e293b" stroke-width="2" />
    <path d="M 330,85 l -10,5 l 20,10 l -20,10 l 20,10 l -20,10 l 10,5" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="345" y="115" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">1 Ω</text>
    <line x1="330" y1="135" x2="330" y2="170" stroke="#1e293b" stroke-width="2" />

    <!-- Unit 3 -->
    <line x1="330" y1="50" x2="370" y2="50" stroke="#1e293b" stroke-width="2" />
    <path d="M 370,50 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="385" y="30" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">1 Ω</text>
    <line x1="420" y1="50" x2="470" y2="50" stroke="#1e293b" stroke-width="2" />

    <line x1="330" y1="170" x2="370" y2="170" stroke="#1e293b" stroke-width="2" />
    <path d="M 370,170 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="385" y="200" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">1 Ω</text>
    <line x1="420" y1="170" x2="470" y2="170" stroke="#1e293b" stroke-width="2" />

    <!-- Shunt 3 -->
    <line x1="470" y1="50" x2="470" y2="85" stroke="#1e293b" stroke-width="2" />
    <path d="M 470,85 l -10,5 l 20,10 l -20,10 l 20,10 l -20,10 l 10,5" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="485" y="115" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">1 Ω</text>
    <line x1="470" y1="135" x2="470" y2="170" stroke="#1e293b" stroke-width="2" />

    <!-- Infinite dashes -->
    <line x1="470" y1="50" x2="540" y2="50" stroke="#1e293b" stroke-width="2" stroke-dasharray="6,4" />
    <line x1="470" y1="170" x2="540" y2="170" stroke="#1e293b" stroke-width="2" stroke-dasharray="6,4" />
  </svg>`;
  await saveSvg(svg134, 'current_elec_q134_infinite_ladder.png');

  // 6. Q135: Symmetric bridge network (10, 5, 5, 5, 10)
  const svg135 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="260" viewBox="0 0 460 260">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Terminals A(60, 130) and B(400, 130) -->
    <!-- Nodes: Top(230, 40), Bottom(230, 220) -->

    <circle cx="60" cy="130" r="4" fill="#0f172a" />
    <text x="40" y="135" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">A</text>
    <line x1="60" y1="130" x2="110" y2="130" stroke="#1e293b" stroke-width="2" />

    <!-- Top Left Arm: 10 ohm (110,130) to (230,40) -->
    <line x1="110" y1="130" x2="148" y2="102" stroke="#1e293b" stroke-width="2" />
    <path d="M 148,102 l 6,-8 l 10,14 l 10,-14 l 10,14 l 10,-14 l 6,8" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="135" y="80" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">10 Ω</text>
    <line x1="200" y1="62" x2="230" y2="40" stroke="#1e293b" stroke-width="2" />

    <!-- Bottom Left Arm: 5 ohm (110,130) to (230,220) -->
    <line x1="110" y1="130" x2="148" y2="158" stroke="#1e293b" stroke-width="2" />
    <path d="M 148,158 l 6,8 l 10,-14 l 10,14 l 10,-14 l 10,14 l 6,-8" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="135" y="195" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">5 Ω</text>
    <line x1="200" y1="198" x2="230" y2="220" stroke="#1e293b" stroke-width="2" />

    <!-- Central Vertical Arm: 5 ohm (230,40) to (230,220) -->
    <line x1="230" y1="40" x2="230" y2="100" stroke="#1e293b" stroke-width="2" />
    <path d="M 230,100 l -10,5 l 20,10 l -20,10 l 20,10 l -20,10 l 10,5" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="245" y="135" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">5 Ω</text>
    <line x1="230" y1="160" x2="230" y2="220" stroke="#1e293b" stroke-width="2" />

    <!-- Top Right Arm: 5 ohm (230,40) to (350,130) -->
    <line x1="230" y1="40" x2="268" y2="68" stroke="#1e293b" stroke-width="2" />
    <path d="M 268,68 l 6,8 l 10,-14 l 10,14 l 10,-14 l 10,14 l 6,-8" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="295" y="80" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">5 Ω</text>
    <line x1="320" y1="108" x2="350" y2="130" stroke="#1e293b" stroke-width="2" />

    <!-- Bottom Right Arm: 10 ohm (230,220) to (350,130) -->
    <line x1="230" y1="220" x2="268" y2="192" stroke="#1e293b" stroke-width="2" />
    <path d="M 268,192 l 6,-8 l 10,14 l 10,-14 l 10,14 l 10,-14 l 6,8" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="295" y="195" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">10 Ω</text>
    <line x1="320" y1="152" x2="350" y2="130" stroke="#1e293b" stroke-width="2" />

    <!-- Terminal B connection -->
    <line x1="350" y1="130" x2="400" y2="130" stroke="#1e293b" stroke-width="2" />
    <circle cx="400" cy="130" r="4" fill="#0f172a" />
    <text x="410" y="135" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">B</text>
  </svg>`;
  await saveSvg(svg135, 'current_elec_q135_bridge_network.png');

  // 7. Q136: Three parallel branches with capacitor
  const svg136 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="240" viewBox="0 0 460 240">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Left vertical bus (x=80, y=50 to 190) -->
    <line x1="80" y1="50" x2="80" y2="190" stroke="#1e293b" stroke-width="2" />
    <!-- Right vertical bus (x=380, y=50 to 190) -->
    <line x1="380" y1="50" x2="380" y2="190" stroke="#1e293b" stroke-width="2" />

    <!-- Top branch at y=50: Battery V and Resistor R -->
    <line x1="80" y1="50" x2="160" y2="50" stroke="#1e293b" stroke-width="2" />
    <line x1="160" y1="40" x2="160" y2="60" stroke="#1e293b" stroke-width="3.5" />
    <line x1="170" y1="35" x2="170" y2="65" stroke="#1e293b" stroke-width="2.5" />
    <text x="155" y="25" font-family="Arial, sans-serif" font-size="15" font-style="italic" font-weight="bold" fill="#0f172a">V</text>
    <line x1="170" y1="50" x2="250" y2="50" stroke="#1e293b" stroke-width="2" />
    <path d="M 250,50 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="270" y="30" font-family="Arial, sans-serif" font-size="15" font-style="italic" font-weight="bold" fill="#2563eb">R</text>
    <line x1="300" y1="50" x2="380" y2="50" stroke="#1e293b" stroke-width="2" />

    <!-- Middle branch at y=120: Battery V and Capacitor C -->
    <line x1="80" y1="120" x2="160" y2="120" stroke="#1e293b" stroke-width="2" />
    <line x1="160" y1="110" x2="160" y2="130" stroke="#1e293b" stroke-width="3.5" />
    <line x1="170" y1="105" x2="170" y2="135" stroke="#1e293b" stroke-width="2.5" />
    <text x="155" y="95" font-family="Arial, sans-serif" font-size="15" font-style="italic" font-weight="bold" fill="#0f172a">V</text>
    <line x1="170" y1="120" x2="265" y2="120" stroke="#1e293b" stroke-width="2" />
    <line x1="265" y1="105" x2="265" y2="135" stroke="#047857" stroke-width="3" />
    <line x1="275" y1="105" x2="275" y2="135" stroke="#047857" stroke-width="3" />
    <text x="265" y="95" font-family="Arial, sans-serif" font-size="15" font-style="italic" font-weight="bold" fill="#047857">C</text>
    <line x1="275" y1="120" x2="380" y2="120" stroke="#1e293b" stroke-width="2" />

    <!-- Bottom branch at y=190: Battery 2V and Resistor 2R -->
    <line x1="80" y1="190" x2="160" y2="190" stroke="#1e293b" stroke-width="2" />
    <line x1="160" y1="180" x2="160" y2="200" stroke="#1e293b" stroke-width="3.5" />
    <line x1="170" y1="175" x2="170" y2="205" stroke="#1e293b" stroke-width="2.5" />
    <text x="150" y="165" font-family="Arial, sans-serif" font-size="15" font-style="italic" font-weight="bold" fill="#0f172a">2V</text>
    <line x1="170" y1="190" x2="250" y2="190" stroke="#1e293b" stroke-width="2" />
    <path d="M 250,190 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="265" y="225" font-family="Arial, sans-serif" font-size="15" font-style="italic" font-weight="bold" fill="#2563eb">2R</text>
    <line x1="300" y1="190" x2="380" y2="190" stroke="#1e293b" stroke-width="2" />
  </svg>`;
  await saveSvg(svg136, 'current_elec_q136_three_branch_capacitor.png');

  // 8. Q138: Isolated circuit loops connected by single wire
  const svg138 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="200" viewBox="0 0 480 200">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Left Loop: x=60 to x=180, y=50 to y=150 -->
    <line x1="60" y1="50" x2="180" y2="50" stroke="#1e293b" stroke-width="2" />
    <line x1="60" y1="50" x2="60" y2="90" stroke="#1e293b" stroke-width="2" />
    <line x1="50" y1="90" x2="70" y2="90" stroke="#1e293b" stroke-width="2.5" />
    <line x1="55" y1="100" x2="65" y2="100" stroke="#1e293b" stroke-width="3.5" />
    <text x="25" y="100" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">2 V</text>
    <line x1="60" y1="100" x2="60" y2="150" stroke="#1e293b" stroke-width="2" />
    <line x1="60" y1="150" x2="180" y2="150" stroke="#1e293b" stroke-width="2" />

    <!-- 10 ohm in left loop -->
    <line x1="180" y1="50" x2="180" y2="80" stroke="#1e293b" stroke-width="2" />
    <path d="M 180,80 l -8,4 l 16,8 l -16,8 l 16,8 l -16,8 l 8,4" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="195" y="105" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">10 Ω</text>
    <line x1="180" y1="120" x2="180" y2="150" stroke="#1e293b" stroke-width="2" />

    <!-- Connecting wire with 2 ohm resistor from (180,150) to (300,150) -->
    <line x1="180" y1="150" x2="220" y2="150" stroke="#1e293b" stroke-width="2" />
    <path d="M 220,150 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="235" y="130" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">2 Ω</text>
    <line x1="270" y1="150" x2="300" y2="150" stroke="#1e293b" stroke-width="2" />

    <!-- Right Loop: x=300 to x=420, y=50 to y=150 -->
    <!-- 20 ohm in right loop -->
    <line x1="300" y1="150" x2="300" y2="120" stroke="#1e293b" stroke-width="2" />
    <path d="M 300,120 l -8,-4 l 16,-8 l -16,-8 l 16,-8 l -16,-8 l 8,-4" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="255" y="105" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">20 Ω</text>
    <line x1="300" y1="80" x2="300" y2="50" stroke="#1e293b" stroke-width="2" />

    <line x1="300" y1="50" x2="420" y2="50" stroke="#1e293b" stroke-width="2" />
    <line x1="420" y1="50" x2="420" y2="90" stroke="#1e293b" stroke-width="2" />
    <line x1="410" y1="90" x2="430" y2="90" stroke="#1e293b" stroke-width="2.5" />
    <line x1="415" y1="100" x2="425" y2="100" stroke="#1e293b" stroke-width="3.5" />
    <text x="435" y="100" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">12 V</text>
    <line x1="420" y1="100" x2="420" y2="150" stroke="#1e293b" stroke-width="2" />
    <line x1="420" y1="150" x2="300" y2="150" stroke="#1e293b" stroke-width="2" />
  </svg>`;
  await saveSvg(svg138, 'current_elec_q138_isolated_loops.png');

  // 9. Q140: Three parallel resistors with current division
  const svg140 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="220" viewBox="0 0 480 220">
    <rect width="100%" height="100%" fill="#ffffff" />
    <!-- Incoming current 1 A -->
    <line x1="40" y1="110" x2="110" y2="110" stroke="#1e293b" stroke-width="2" />
    <polygon points="90,110 78,105 78,115" fill="#1e293b" />
    <text x="70" y="135" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">1 A</text>

    <!-- Node Left: (110, 110) -->
    <!-- Node Right: (370, 110) -->

    <!-- Top branch: 20 ohm -->
    <line x1="110" y1="110" x2="160" y2="50" stroke="#1e293b" stroke-width="2" />
    <line x1="160" y1="50" x2="215" y2="50" stroke="#1e293b" stroke-width="2" />
    <path d="M 215,50 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="230" y="30" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">20 Ω</text>
    <line x1="265" y1="50" x2="320" y2="50" stroke="#1e293b" stroke-width="2" />
    <line x1="320" y1="50" x2="370" y2="110" stroke="#1e293b" stroke-width="2" />

    <!-- Middle branch: 5 ohm + 15 ohm -->
    <line x1="110" y1="110" x2="170" y2="110" stroke="#1e293b" stroke-width="2" />
    <path d="M 170,110 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="180" y="90" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">5 Ω</text>
    <line x1="220" y1="110" x2="260" y2="110" stroke="#1e293b" stroke-width="2" />
    <path d="M 260,110 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="270" y="90" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">15 Ω</text>
    <line x1="310" y1="110" x2="370" y2="110" stroke="#1e293b" stroke-width="2" />

    <!-- Bottom branch: 10 ohm with current i -->
    <line x1="110" y1="110" x2="160" y2="170" stroke="#1e293b" stroke-width="2" />
    <polygon points="180,170 170,165 170,175" fill="#dc2626" />
    <text x="175" y="195" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#dc2626">i</text>
    <line x1="160" y1="170" x2="215" y2="170" stroke="#1e293b" stroke-width="2" />
    <path d="M 215,170 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="230" y="200" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">10 Ω</text>
    <line x1="265" y1="170" x2="320" y2="170" stroke="#1e293b" stroke-width="2" />
    <line x1="320" y1="170" x2="370" y2="110" stroke="#1e293b" stroke-width="2" />

    <!-- Outgoing wire to B -->
    <line x1="370" y1="110" x2="440" y2="110" stroke="#1e293b" stroke-width="2" />
    <circle cx="440" cy="110" r="4" fill="#0f172a" />
    <text x="445" y="115" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">B</text>
  </svg>`;
  await saveSvg(svg140, 'current_elec_q140_three_parallel.png');

  console.log('All 9 Batch 6 diagrams generated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
