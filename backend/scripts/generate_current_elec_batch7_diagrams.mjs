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
  console.log('Generating Batch 7 diagrams...');

  // 1. Q197: Capacitor Bridge Network
  const svg197 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="540" height="260" viewBox="0 0 540 260">
    <rect width="100%" height="100%" fill="#ffffff" />
    
    <!-- Input wire and current arrow (4 A) -->
    <line x1="40" y1="130" x2="100" y2="130" stroke="#1e293b" stroke-width="2.5" />
    <polygon points="75,125 85,130 75,135" fill="#1e293b" />
    <text x="50" y="118" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">4 A</text>

    <!-- Branching to Top and Bottom -->
    <line x1="100" y1="130" x2="100" y2="60" stroke="#1e293b" stroke-width="2" />
    <line x1="100" y1="130" x2="100" y2="200" stroke="#1e293b" stroke-width="2" />

    <!-- TOP BRANCH: 3 ohm, Node X, 5 ohm -->
    <line x1="100" y1="60" x2="150" y2="60" stroke="#1e293b" stroke-width="2" />
    <!-- 3 ohm resistor -->
    <path d="M 150,60 l 6,-10 l 12,20 l 12,-20 l 12,20 l 12,-20 l 6,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="170" y="42" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">3 Ω</text>
    <line x1="210" y1="60" x2="270" y2="60" stroke="#1e293b" stroke-width="2" />

    <!-- Node X -->
    <circle cx="270" cy="60" r="4.5" fill="#1e293b" />
    <text x="264" y="45" font-family="Arial, sans-serif" font-size="16" font-weight="bold" font-style="italic" fill="#0f172a">X</text>

    <!-- 5 ohm resistor -->
    <line x1="270" y1="60" x2="310" y2="60" stroke="#1e293b" stroke-width="2" />
    <path d="M 310,60 l 6,-10 l 12,20 l 12,-20 l 12,20 l 12,-20 l 6,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="330" y="42" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">5 Ω</text>
    <line x1="370" y1="60" x2="440" y2="60" stroke="#1e293b" stroke-width="2" />

    <!-- BOTTOM BRANCH: 5 ohm, Node Y, 3 ohm -->
    <line x1="100" y1="200" x2="150" y2="200" stroke="#1e293b" stroke-width="2" />
    <!-- 5 ohm resistor -->
    <path d="M 150,200 l 6,-10 l 12,20 l 12,-20 l 12,20 l 12,-20 l 6,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="170" y="235" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">5 Ω</text>
    <line x1="210" y1="200" x2="270" y2="200" stroke="#1e293b" stroke-width="2" />

    <!-- Node Y -->
    <circle cx="270" cy="200" r="4.5" fill="#1e293b" />
    <text x="264" y="225" font-family="Arial, sans-serif" font-size="16" font-weight="bold" font-style="italic" fill="#0f172a">Y</text>

    <!-- 3 ohm resistor -->
    <line x1="270" y1="200" x2="310" y2="200" stroke="#1e293b" stroke-width="2" />
    <path d="M 310,200 l 6,-10 l 12,20 l 12,-20 l 12,20 l 12,-20 l 6,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="330" y="235" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">3 Ω</text>
    <line x1="370" y1="200" x2="440" y2="200" stroke="#1e293b" stroke-width="2" />

    <!-- Output Recombination and wire -->
    <line x1="440" y1="60" x2="440" y2="200" stroke="#1e293b" stroke-width="2" />
    <line x1="440" y1="130" x2="500" y2="130" stroke="#1e293b" stroke-width="2.5" />
    <polygon points="475,125 485,130 475,135" fill="#1e293b" />
    <text x="475" y="118" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">4 A</text>

    <!-- CENTRAL BRANCH: Capacitor 4 uF with plates A and B -->
    <line x1="270" y1="60" x2="270" y2="115" stroke="#1e293b" stroke-width="2" />
    <!-- Capacitor Plate A -->
    <line x1="250" y1="115" x2="290" y2="115" stroke="#0f172a" stroke-width="3.5" />
    <text x="296" y="119" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">A</text>

    <!-- Capacitor Plate B -->
    <line x1="250" y1="145" x2="290" y2="145" stroke="#0f172a" stroke-width="3.5" />
    <text x="296" y="150" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">B</text>
    <line x1="270" y1="145" x2="270" y2="200" stroke="#1e293b" stroke-width="2" />

    <text x="195" y="135" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0284c7">4 μF</text>
  </svg>`;
  await saveSvg(svg197, 'current_elec_q197_capacitor_bridge.png');

  // 2. Q199: Two Loop Circuit with Node A and Node B
  const svg199 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="240" viewBox="0 0 500 240">
    <rect width="100%" height="100%" fill="#ffffff" />

    <!-- Left battery (10 V) -->
    <line x1="80" y1="60" x2="80" y2="105" stroke="#1e293b" stroke-width="2" />
    <line x1="60" y1="105" x2="100" y2="105" stroke="#1e293b" stroke-width="3.5" /> <!-- Long/pos -->
    <line x1="68" y1="125" x2="92" y2="125" stroke="#1e293b" stroke-width="4.5" />  <!-- Short/neg -->
    <line x1="80" y1="125" x2="80" y2="180" stroke="#1e293b" stroke-width="2" />
    <text x="25" y="120" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">10 V</text>

    <!-- Top Left Resistor (10 ohm) -->
    <line x1="80" y1="60" x2="130" y2="60" stroke="#1e293b" stroke-width="2" />
    <path d="M 130,60 l 6,-10 l 12,20 l 12,-20 l 12,20 l 12,-20 l 6,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="145" y="40" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">10 Ω</text>
    <line x1="190" y1="60" x2="250" y2="60" stroke="#1e293b" stroke-width="2" />

    <!-- Node A -->
    <circle cx="250" cy="60" r="4.5" fill="#1e293b" />
    <text x="244" y="42" font-family="Arial, sans-serif" font-size="18" font-weight="bold" font-style="italic" fill="#0f172a">A</text>

    <!-- Top Right Resistor (15 ohm) -->
    <line x1="250" y1="60" x2="300" y2="60" stroke="#1e293b" stroke-width="2" />
    <path d="M 300,60 l 6,-10 l 12,20 l 12,-20 l 12,20 l 12,-20 l 6,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="315" y="40" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">15 Ω</text>
    <line x1="360" y1="60" x2="420" y2="60" stroke="#1e293b" stroke-width="2" />

    <!-- Right battery (5 V) -->
    <line x1="420" y1="60" x2="420" y2="105" stroke="#1e293b" stroke-width="2" />
    <line x1="400" y1="105" x2="440" y2="105" stroke="#1e293b" stroke-width="3.5" /> <!-- Long/pos -->
    <line x1="408" y1="125" x2="432" y2="125" stroke="#1e293b" stroke-width="4.5" /> <!-- Short/neg -->
    <line x1="420" y1="125" x2="420" y2="180" stroke="#1e293b" stroke-width="2" />
    <text x="445" y="120" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">5 V</text>

    <!-- Central Vertical Branch: 10 ohm between A and B -->
    <line x1="250" y1="60" x2="250" y2="90" stroke="#1e293b" stroke-width="2" />
    <path d="M 250,90 l -10,6 l 20,12 l -20,12 l 20,12 l -20,12 l 10,6" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="265" y="125" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">10 Ω</text>
    <line x1="250" y1="150" x2="250" y2="180" stroke="#1e293b" stroke-width="2" />

    <!-- Bottom Rail & Node B -->
    <line x1="80" y1="180" x2="420" y2="180" stroke="#1e293b" stroke-width="2" />
    <circle cx="250" cy="180" r="4.5" fill="#1e293b" />
    <text x="245" y="205" font-family="Arial, sans-serif" font-size="18" font-weight="bold" font-style="italic" fill="#0f172a">B</text>
  </svg>`;
  await saveSvg(svg199, 'current_elec_q199_two_loop_circuit.png');

  // 3. Q200: EMF of ideal cell in resistor network
  const svg200 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="520" height="280" viewBox="0 0 520 280">
    <rect width="100%" height="100%" fill="#ffffff" />

    <!-- Cell on left -->
    <line x1="70" y1="80" x2="70" y2="125" stroke="#1e293b" stroke-width="2" />
    <line x1="55" y1="125" x2="85" y2="125" stroke="#1e293b" stroke-width="3.5" /> <!-- Long/pos -->
    <line x1="60" y1="145" x2="80" y2="145" stroke="#1e293b" stroke-width="4.5" /> <!-- Short/neg -->
    <line x1="70" y1="145" x2="70" y2="230" stroke="#1e293b" stroke-width="2" />

    <!-- Series 5 ohm resistor on top -->
    <line x1="70" y1="80" x2="105" y2="80" stroke="#1e293b" stroke-width="2" />
    <path d="M 105,80 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 5,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="115" y="105" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">5 Ω</text>
    <line x1="155" y1="80" x2="190" y2="80" stroke="#1e293b" stroke-width="2" />

    <!-- Junction 1 at (190, 80) -->
    <circle cx="190" cy="80" r="4" fill="#1e293b" />

    <!-- Top wire jumper from (190,80) -> (190,35) -> (430,35) -> (430,80) -->
    <line x1="190" y1="80" x2="190" y2="35" stroke="#1e293b" stroke-width="2" />
    <line x1="190" y1="35" x2="430" y2="35" stroke="#1e293b" stroke-width="2" />
    <line x1="430" y1="35" x2="430" y2="80" stroke="#1e293b" stroke-width="2" />

    <!-- Horizontal 15 ohm #1: between (190,80) and (310,80) -->
    <line x1="190" y1="80" x2="220" y2="80" stroke="#1e293b" stroke-width="2" />
    <path d="M 220,80 l 6,-10 l 12,20 l 12,-20 l 12,20 l 12,-20 l 6,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="235" y="65" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">15 Ω</text>
    <line x1="280" y1="80" x2="310" y2="80" stroke="#1e293b" stroke-width="2" />

    <!-- Junction 2 at (310, 80) -->
    <circle cx="310" cy="80" r="4" fill="#1e293b" />

    <!-- Horizontal 15 ohm #2: between (310,80) and (430,80) -->
    <line x1="310" y1="80" x2="340" y2="80" stroke="#1e293b" stroke-width="2" />
    <path d="M 340,80 l 6,-10 l 12,20 l 12,-20 l 12,20 l 12,-20 l 6,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="355" y="65" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">15 Ω</text>
    <line x1="400" y1="80" x2="430" y2="80" stroke="#1e293b" stroke-width="2" />

    <!-- Junction 3 at (430, 80) -->
    <circle cx="430" cy="80" r="4" fill="#1e293b" />

    <!-- Vertical 15 ohm #3 on right: between (430,80) and (430,140) -->
    <line x1="430" y1="80" x2="430" y2="90" stroke="#1e293b" stroke-width="2" />
    <path d="M 430,90 l -8,5 l 16,10 l -16,10 l 16,10 l -8,5" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="375" y="118" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">15 Ω</text>
    <line x1="430" y1="130" x2="430" y2="140" stroke="#1e293b" stroke-width="2" />

    <!-- Bottom return wire connecting (430,140) to (310,140) and to Junction 2 -->
    <line x1="430" y1="140" x2="310" y2="140" stroke="#1e293b" stroke-width="2" />
    <line x1="310" y1="80" x2="310" y2="155" stroke="#1e293b" stroke-width="2" />
    <circle cx="310" cy="140" r="4" fill="#1e293b" />

    <!-- Vertical 15 ohm #4: between (310,155) and (310,215) -->
    <path d="M 310,155 l -8,6 l 16,12 l -16,12 l 16,12 l -16,12 l 8,6" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="330" y="190" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">15 Ω</text>
    <line x1="310" y1="215" x2="310" y2="230" stroke="#1e293b" stroke-width="2" />

    <!-- Bottom rail to battery negative with 2 A arrow -->
    <line x1="310" y1="230" x2="70" y2="230" stroke="#1e293b" stroke-width="2.5" />
    <polygon points="190,225 180,230 190,235" fill="#1e293b" />
    <circle cx="185" cy="230" r="3" fill="#1e293b" />
    <text x="175" y="215" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">2 A</text>
  </svg>`;
  await saveSvg(svg200, 'current_elec_q200_resistor_network.png');

  // 4. Q201: Conductor AB across Battery V
  const svg201 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="200" viewBox="0 0 500 200">
    <rect width="100%" height="100%" fill="#ffffff" />

    <!-- Top Battery V -->
    <line x1="100" y1="60" x2="230" y2="60" stroke="#1e293b" stroke-width="2" />
    <line x1="230" y1="45" x2="230" y2="75" stroke="#1e293b" stroke-width="3.5" /> <!-- Long/pos -->
    <line x1="240" y1="50" x2="240" y2="70" stroke="#1e293b" stroke-width="4.5" /> <!-- Short/neg -->
    <line x1="240" y1="60" x2="400" y2="60" stroke="#1e293b" stroke-width="2" />
    <text x="230" y="35" font-family="Arial, sans-serif" font-size="18" font-weight="bold" font-style="italic" fill="#0f172a">V</text>

    <!-- Side connecting wires -->
    <line x1="100" y1="60" x2="100" y2="120" stroke="#1e293b" stroke-width="2" />
    <line x1="400" y1="60" x2="400" y2="120" stroke="#1e293b" stroke-width="2" />

    <!-- Cylindrical Conductor AB of Length L -->
    <rect x="110" y="110" width="280" height="20" rx="3" fill="#f1f5f9" stroke="#1e293b" stroke-width="2" />
    <line x1="100" y1="120" x2="110" y2="120" stroke="#1e293b" stroke-width="2" />
    <line x1="390" y1="120" x2="400" y2="120" stroke="#1e293b" stroke-width="2" />

    <!-- Labels A, B, and L -->
    <text x="105" y="150" font-family="Arial, sans-serif" font-size="18" font-weight="bold" font-style="italic" fill="#0f172a">A</text>
    <text x="385" y="150" font-family="Arial, sans-serif" font-size="18" font-weight="bold" font-style="italic" fill="#0f172a">B</text>
    <text x="245" y="150" font-family="Arial, sans-serif" font-size="18" font-weight="bold" font-style="italic" fill="#0f172a">L</text>
  </svg>`;
  await saveSvg(svg201, 'current_elec_q201_conductor_drift.png');

  // 5. Q202: Diamond Bridge Circuit with Branch AB
  const svg202 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="340" viewBox="0 0 500 340">
    <rect width="100%" height="100%" fill="#ffffff" />

    <!-- Diamond Bridge Vertices:
         Apex A: (250, 40)
         Bottom Vertex B: (250, 200)
         Left Vertex: (150, 120)
         Right Vertex: (350, 120)
    -->

    <!-- Branch Left (150,120) to A (250,40): 6 ohm resistor -->
    <g transform="translate(150, 120) rotate(-38.66)">
      <line x1="0" y1="0" x2="35" y2="0" stroke="#1e293b" stroke-width="2" />
      <path d="M 35,0 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 10,20 l 5,-10" fill="none" stroke="#2563eb" stroke-width="2.5" />
      <line x1="95" y1="0" x2="128.06" y2="0" stroke="#1e293b" stroke-width="2" />
    </g>
    <text x="160" y="65" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">6 Ω</text>

    <!-- Branch Left (150,120) to B (250,200): Straight plain wire -->
    <line x1="150" y1="120" x2="250" y2="200" stroke="#1e293b" stroke-width="2" />

    <!-- Branch A (250,40) to Right (350,120): Straight plain wire -->
    <line x1="250" y1="40" x2="350" y2="120" stroke="#1e293b" stroke-width="2" />

    <!-- Branch B (250,200) to Right (350,120): 3 ohm resistor -->
    <g transform="translate(250, 200) rotate(-38.66)">
      <line x1="0" y1="0" x2="35" y2="0" stroke="#1e293b" stroke-width="2" />
      <path d="M 35,0 l 5,-10 l 10,20 l 10,-20 l 10,20 l 10,-20 l 10,20 l 5,-10" fill="none" stroke="#2563eb" stroke-width="2.5" />
      <line x1="95" y1="0" x2="128.06" y2="0" stroke="#1e293b" stroke-width="2" />
    </g>
    <text x="325" y="185" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">3 Ω</text>

    <!-- Central Vertical Branch A to B: Straight wire -->
    <line x1="250" y1="40" x2="250" y2="200" stroke="#1e293b" stroke-width="2.5" />

    <!-- Vertex A label -->
    <circle cx="250" cy="40" r="4.5" fill="#1e293b" />
    <text x="244" y="28" font-family="Arial, sans-serif" font-size="18" font-weight="bold" font-style="italic" fill="#0f172a">A</text>

    <!-- Vertex B label -->
    <circle cx="250" cy="200" r="4.5" fill="#1e293b" />
    <text x="244" y="226" font-family="Arial, sans-serif" font-size="18" font-weight="bold" font-style="italic" fill="#0f172a">B</text>

    <!-- External Circuit from Left (150,120) and Right (350,120) -->
    <line x1="150" y1="120" x2="80" y2="120" stroke="#1e293b" stroke-width="2" />
    <line x1="80" y1="120" x2="80" y2="280" stroke="#1e293b" stroke-width="2" />

    <line x1="350" y1="120" x2="420" y2="120" stroke="#1e293b" stroke-width="2" />
    <line x1="420" y1="120" x2="420" y2="280" stroke="#1e293b" stroke-width="2" />

    <!-- Bottom external branch: Battery 5 V and Resistor 5 ohm -->
    <line x1="80" y1="280" x2="160" y2="280" stroke="#1e293b" stroke-width="2" />
    <!-- Battery 5 V -->
    <line x1="160" y1="268" x2="160" y2="292" stroke="#1e293b" stroke-width="4.5" /> <!-- Short/neg -->
    <line x1="170" y1="262" x2="170" y2="298" stroke="#1e293b" stroke-width="3.5" /> <!-- Long/pos -->
    <text x="145" y="320" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">5 V</text>
    <line x1="170" y1="280" x2="220" y2="280" stroke="#1e293b" stroke-width="2" />

    <!-- Resistor 5 ohm -->
    <path d="M 220,280 l 6,-10 l 12,20 l 12,-20 l 12,20 l 12,-20 l 6,10" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="240" y="318" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">5 Ω</text>
    <line x1="280" y1="280" x2="420" y2="280" stroke="#1e293b" stroke-width="2" />
  </svg>`;
  await saveSvg(svg202, 'current_elec_q202_diamond_bridge.png');

  console.log('All Batch 7 diagrams generated successfully!');
}

main().catch(console.error);
