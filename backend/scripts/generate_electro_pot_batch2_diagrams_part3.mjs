import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const backendDir = './uploads/electrostatic_potential';
const frontendDir = '../frontend/public/uploads/electrostatic_potential';

[backendDir, frontendDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function saveSvgAsPng(filename, svgString, width = 600, height = 350) {
  const backendPath = path.join(backendDir, filename);
  const frontendPath = path.join(frontendDir, filename);

  const pngBuffer = await sharp(Buffer.from(svgString))
    .resize(width, height)
    .png()
    .toBuffer();

  fs.writeFileSync(backendPath, pngBuffer);
  fs.writeFileSync(frontendPath, pngBuffer);
  console.log(`Generated: ${filename}`);
}

async function generateAll() {
  // Q116: Cross-connected capacitor network
  await saveSvgAsPng('batch2_q116_cross_cap.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(100, 60)">
        <!-- Terminal a -->
        <circle cx="50" cy="50" r="4" fill="#1e293b"/>
        <text x="30" y="55" font-family="sans-serif" font-size="18" font-weight="bold">a</text>
        <line x1="50" y1="50" x2="130" y2="50" stroke="#1e293b" stroke-width="3"/>
        <!-- C1 top -->
        <line x1="130" y1="35" x2="130" y2="65" stroke="#1e293b" stroke-width="5"/>
        <line x1="145" y1="35" x2="145" y2="65" stroke="#1e293b" stroke-width="5"/>
        <text x="133" y="25" font-family="sans-serif" font-size="16" font-weight="bold">C</text>
        <line x1="145" y1="50" x2="225" y2="50" stroke="#1e293b" stroke-width="3"/>
        <!-- C2 top -->
        <line x1="225" y1="35" x2="225" y2="65" stroke="#1e293b" stroke-width="5"/>
        <line x1="240" y1="35" x2="240" y2="65" stroke="#1e293b" stroke-width="5"/>
        <text x="228" y="25" font-family="sans-serif" font-size="16" font-weight="bold">C</text>
        <line x1="240" y1="50" x2="330" y2="50" stroke="#1e293b" stroke-width="3"/>

        <!-- Terminal b -->
        <circle cx="50" cy="190" r="4" fill="#1e293b"/>
        <text x="30" y="195" font-family="sans-serif" font-size="18" font-weight="bold">b</text>
        <line x1="50" y1="190" x2="130" y2="190" stroke="#1e293b" stroke-width="3"/>
        <!-- C3 bottom -->
        <line x1="130" y1="175" x2="130" y2="205" stroke="#1e293b" stroke-width="5"/>
        <line x1="145" y1="175" x2="145" y2="205" stroke="#1e293b" stroke-width="5"/>
        <text x="133" y="225" font-family="sans-serif" font-size="16" font-weight="bold">C</text>
        <line x1="145" y1="190" x2="225" y2="190" stroke="#1e293b" stroke-width="3"/>
        <!-- C4 bottom -->
        <line x1="225" y1="175" x2="225" y2="205" stroke="#1e293b" stroke-width="5"/>
        <line x1="240" y1="175" x2="240" y2="205" stroke="#1e293b" stroke-width="5"/>
        <text x="228" y="225" font-family="sans-serif" font-size="16" font-weight="bold">C</text>
        <line x1="240" y1="190" x2="330" y2="190" stroke="#1e293b" stroke-width="3"/>

        <!-- Right vertical capacitor C -->
        <line x1="330" y1="50" x2="330" y2="105" stroke="#1e293b" stroke-width="3"/>
        <line x1="315" y1="105" x2="345" y2="105" stroke="#1e293b" stroke-width="5"/>
        <line x1="315" y1="120" x2="345" y2="120" stroke="#1e293b" stroke-width="5"/>
        <text x="355" y="117" font-family="sans-serif" font-size="16" font-weight="bold">C</text>
        <line x1="330" y1="120" x2="330" y2="190" stroke="#1e293b" stroke-width="3"/>

        <!-- Diagonal wire from a to bottom-right (330, 190) -->
        <line x1="50" y1="50" x2="330" y2="190" stroke="#dc2626" stroke-width="2.5"/>
        <!-- Diagonal wire from b (50, 190) with jumper over the red diagonal to (330, 50) -->
        <line x1="50" y1="190" x2="180" y2="125" stroke="#2563eb" stroke-width="2.5"/>
        <path d="M 180 125 A 15 15 0 0 1 200 115" fill="none" stroke="#2563eb" stroke-width="2.5"/>
        <line x1="200" y1="115" x2="330" y2="50" stroke="#2563eb" stroke-width="2.5"/>
      </g>
    </svg>
  `);

  // Q118: Ring circuit with 3 capacitors and battery V
  await saveSvgAsPng('batch2_q118_ring_circuit.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(300, 175)">
        <!-- Outer circle wire -->
        <circle r="120" fill="none" stroke="#1e293b" stroke-width="3"/>
        <!-- Center junction -->
        <circle cx="0" cy="0" r="4" fill="#1e293b"/>
        
        <!-- North branch: Capacitor C -->
        <line x1="0" y1="0" x2="0" y2="-45" stroke="#1e293b" stroke-width="3"/>
        <line x1="-20" y1="-45" x2="20" y2="-45" stroke="#1e293b" stroke-width="5"/>
        <line x1="-20" y1="-60" x2="20" y2="-60" stroke="#1e293b" stroke-width="5"/>
        <text x="30" y="-48" font-family="sans-serif" font-size="16" font-weight="bold">C</text>
        <line x1="0" y1="-60" x2="0" y2="-120" stroke="#1e293b" stroke-width="3"/>

        <!-- East branch: Capacitor C -->
        <line x1="0" y1="0" x2="45" y2="0" stroke="#1e293b" stroke-width="3"/>
        <line x1="45" y1="-20" x2="45" y2="20" stroke="#1e293b" stroke-width="5"/>
        <line x1="60" y1="-20" x2="60" y2="20" stroke="#1e293b" stroke-width="5"/>
        <text x="50" y="-30" font-family="sans-serif" font-size="16" font-weight="bold">C</text>
        <line x1="60" y1="0" x2="120" y2="0" stroke="#1e293b" stroke-width="3"/>

        <!-- South branch: Capacitor C -->
        <line x1="0" y1="0" x2="0" y2="45" stroke="#1e293b" stroke-width="3"/>
        <line x1="-20" y1="45" x2="20" y2="45" stroke="#1e293b" stroke-width="5"/>
        <line x1="-20" y1="60" x2="20" y2="60" stroke="#1e293b" stroke-width="5"/>
        <text x="30" y="58" font-family="sans-serif" font-size="16" font-weight="bold">C</text>
        <line x1="0" y1="60" x2="0" y2="120" stroke="#1e293b" stroke-width="3"/>

        <!-- West branch: Switch S and Battery V -->
        <line x1="0" y1="0" x2="-20" y2="0" stroke="#1e293b" stroke-width="3"/>
        <circle cx="-20" cy="0" r="3" fill="#1e293b"/>
        <!-- Switch S -->
        <line x1="-20" y1="0" x2="-45" y2="-15" stroke="#dc2626" stroke-width="3"/>
        <circle cx="-50" cy="0" r="3" fill="#1e293b"/>
        <text x="-40" y="-22" font-family="sans-serif" font-size="15" font-weight="bold" fill="#dc2626">S</text>
        <line x1="-50" y1="0" x2="-75" y2="0" stroke="#1e293b" stroke-width="3"/>
        <!-- Battery V -->
        <line x1="-75" y1="-20" x2="-75" y2="20" stroke="#1e293b" stroke-width="5"/>
        <line x1="-85" y1="-12" x2="-85" y2="12" stroke="#1e293b" stroke-width="3"/>
        <text x="-88" y="-28" font-family="sans-serif" font-size="16" font-weight="bold">V</text>
        <line x1="-85" y1="0" x2="-120" y2="0" stroke="#1e293b" stroke-width="3"/>
      </g>
    </svg>
  `);

  // Q119: Concentric spheres, inner earthed, outer charged +Q
  await saveSvgAsPng('batch2_q119_concentric_earthing.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(300, 175)">
        <circle r="45" fill="none" stroke="#1e293b" stroke-width="3"/>
        <circle r="105" fill="none" stroke="#1e293b" stroke-width="3"/>
        <circle cx="0" cy="0" r="3" fill="#1e293b"/>
        <!-- Radii a and b -->
        <line x1="0" y1="0" x2="38" y2="-24" stroke="#64748b" stroke-dasharray="3,3" stroke-width="2"/>
        <text x="22" y="-5" font-family="sans-serif" font-size="16" font-weight="bold">a</text>
        <line x1="0" y1="0" x2="52" y2="-91" stroke="#64748b" stroke-dasharray="3,3" stroke-width="2"/>
        <text x="45" y="-50" font-family="sans-serif" font-size="16" font-weight="bold">b</text>
        <!-- Charge Q on outer -->
        <text x="90" y="-70" font-family="sans-serif" font-size="18" font-weight="bold" fill="#2563eb">+Q</text>
        <!-- Grounding of inner sphere -->
        <line x1="-45" y1="0" x2="-25" y2="0" stroke="#1e293b" stroke-width="3"/>
        <line x1="-25" y1="0" x2="-25" y2="25" stroke="#1e293b" stroke-width="3"/>
        <!-- Earth symbol -->
        <line x1="-35" y1="25" x2="-15" y2="25" stroke="#1e293b" stroke-width="3"/>
        <line x1="-31" y1="30" x2="-19" y2="30" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="-27" y1="35" x2="-23" y2="35" stroke="#1e293b" stroke-width="2"/>
      </g>
    </svg>
  `);

  // Q120: Infinite ladder of parallel rows of series capacitors
  await saveSvgAsPng('batch2_q120_infinite_ladder.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(150, 40)">
        <!-- Vertical rails -->
        <line x1="30" y1="40" x2="30" y2="240" stroke="#1e293b" stroke-width="3" stroke-dasharray="0,0"/>
        <line x1="30" y1="240" x2="30" y2="270" stroke="#1e293b" stroke-width="3" stroke-dasharray="4,4"/>
        <line x1="270" y1="40" x2="270" y2="240" stroke="#1e293b" stroke-width="3"/>
        <line x1="270" y1="240" x2="270" y2="270" stroke="#1e293b" stroke-width="3" stroke-dasharray="4,4"/>
        
        <!-- Row 1: 1 capacitor C -->
        <line x1="30" y1="40" x2="140" y2="40" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="140" y1="25" x2="140" y2="55" stroke="#1e293b" stroke-width="5"/>
        <line x1="155" y1="25" x2="155" y2="55" stroke="#1e293b" stroke-width="5"/>
        <text x="142" y="75" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="155" y1="40" x2="270" y2="40" stroke="#1e293b" stroke-width="2.5"/>

        <!-- Row 2: 2 capacitors C each -->
        <line x1="30" y1="110" x2="90" y2="110" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="90" y1="95" x2="90" y2="125" stroke="#1e293b" stroke-width="5"/>
        <line x1="105" y1="95" x2="105" y2="125" stroke="#1e293b" stroke-width="5"/>
        <text x="92" y="85" font-family="sans-serif" font-size="14" font-weight="bold">C</text>
        <line x1="105" y1="110" x2="185" y2="110" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="185" y1="95" x2="185" y2="125" stroke="#1e293b" stroke-width="5"/>
        <line x1="200" y1="95" x2="200" y2="125" stroke="#1e293b" stroke-width="5"/>
        <text x="187" y="85" font-family="sans-serif" font-size="14" font-weight="bold">C</text>
        <line x1="200" y1="110" x2="270" y2="110" stroke="#1e293b" stroke-width="2.5"/>

        <!-- Row 3: 4 capacitors C each -->
        <line x1="30" y1="180" x2="65" y2="180" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="65" y1="168" x2="65" y2="192" stroke="#1e293b" stroke-width="4"/>
        <line x1="77" y1="168" x2="77" y2="192" stroke="#1e293b" stroke-width="4"/>
        <text x="67" y="160" font-family="sans-serif" font-size="12" font-weight="bold">C</text>
        <line x1="77" y1="180" x2="120" y2="180" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="120" y1="168" x2="120" y2="192" stroke="#1e293b" stroke-width="4"/>
        <line x1="132" y1="168" x2="132" y2="192" stroke="#1e293b" stroke-width="4"/>
        <text x="122" y="160" font-family="sans-serif" font-size="12" font-weight="bold">C</text>
        <line x1="132" y1="180" x2="175" y2="180" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="175" y1="168" x2="175" y2="192" stroke="#1e293b" stroke-width="4"/>
        <line x1="187" y1="168" x2="187" y2="192" stroke="#1e293b" stroke-width="4"/>
        <text x="177" y="160" font-family="sans-serif" font-size="12" font-weight="bold">C</text>
        <line x1="187" y1="180" x2="230" y2="180" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="230" y1="168" x2="230" y2="192" stroke="#1e293b" stroke-width="4"/>
        <line x1="242" y1="168" x2="242" y2="192" stroke="#1e293b" stroke-width="4"/>
        <text x="232" y="160" font-family="sans-serif" font-size="12" font-weight="bold">C</text>
        <line x1="242" y1="180" x2="270" y2="180" stroke="#1e293b" stroke-width="2.5"/>

        <text x="130" y="270" font-family="sans-serif" font-size="18" font-weight="bold" fill="#64748b">to ∞</text>
      </g>
    </svg>
  `);

  // Q124: Three copper plates A, B, C
  await saveSvgAsPng('batch2_q124_three_plates.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(150, 70)">
        <!-- Plate A -->
        <rect x="50" y="30" width="220" height="14" rx="3" fill="#cbd5e1" stroke="#1e293b" stroke-width="2"/>
        <text x="285" y="43" font-family="sans-serif" font-size="18" font-weight="bold">A</text>
        <!-- Plate B -->
        <rect x="50" y="90" width="220" height="14" rx="3" fill="#cbd5e1" stroke="#1e293b" stroke-width="2"/>
        <text x="285" y="103" font-family="sans-serif" font-size="18" font-weight="bold">B</text>
        <!-- Plate C -->
        <rect x="50" y="150" width="220" height="14" rx="3" fill="#cbd5e1" stroke="#1e293b" stroke-width="2"/>
        <text x="285" y="163" font-family="sans-serif" font-size="18" font-weight="bold">C</text>
      </g>
    </svg>
  `);

  // Q125: Capacitor bridge circuit with switch S
  await saveSvgAsPng('batch2_q125_bridge_switch.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(100, 40)">
        <!-- Top horizontal with 2C, node a, C -->
        <line x1="80" y1="50" x2="135" y2="50" stroke="#1e293b" stroke-width="3"/>
        <line x1="135" y1="35" x2="135" y2="65" stroke="#1e293b" stroke-width="5"/>
        <line x1="150" y1="35" x2="150" y2="65" stroke="#1e293b" stroke-width="5"/>
        <text x="135" y="25" font-family="sans-serif" font-size="16" font-weight="bold">2C</text>
        <line x1="150" y1="50" x2="250" y2="50" stroke="#1e293b" stroke-width="3"/>
        <circle cx="200" cy="50" r="4" fill="#1e293b"/>
        <text x="195" y="40" font-family="sans-serif" font-size="18" font-weight="bold">a</text>
        <line x1="250" y1="35" x2="250" y2="65" stroke="#1e293b" stroke-width="5"/>
        <line x1="265" y1="35" x2="265" y2="65" stroke="#1e293b" stroke-width="5"/>
        <text x="252" y="25" font-family="sans-serif" font-size="16" font-weight="bold">C</text>
        <line x1="265" y1="50" x2="320" y2="50" stroke="#1e293b" stroke-width="3"/>

        <!-- Bottom horizontal with 4C, node b, 3C -->
        <line x1="80" y1="150" x2="135" y2="150" stroke="#1e293b" stroke-width="3"/>
        <line x1="135" y1="135" x2="135" y2="165" stroke="#1e293b" stroke-width="5"/>
        <line x1="150" y1="135" x2="150" y2="165" stroke="#1e293b" stroke-width="5"/>
        <text x="135" y="185" font-family="sans-serif" font-size="16" font-weight="bold">4C</text>
        <line x1="150" y1="150" x2="250" y2="150" stroke="#1e293b" stroke-width="3"/>
        <circle cx="200" cy="150" r="4" fill="#1e293b"/>
        <text x="195" y="175" font-family="sans-serif" font-size="18" font-weight="bold">b</text>
        <line x1="250" y1="135" x2="250" y2="165" stroke="#1e293b" stroke-width="5"/>
        <line x1="265" y1="135" x2="265" y2="165" stroke="#1e293b" stroke-width="5"/>
        <text x="252" y="185" font-family="sans-serif" font-size="16" font-weight="bold">3C</text>
        <line x1="265" y1="150" x2="320" y2="150" stroke="#1e293b" stroke-width="3"/>

        <!-- Vertical link with switch S -->
        <line x1="200" y1="50" x2="200" y2="85" stroke="#1e293b" stroke-width="3"/>
        <circle cx="200" cy="85" r="3" fill="#1e293b"/>
        <line x1="200" y1="85" x2="220" y2="110" stroke="#dc2626" stroke-width="3"/>
        <circle cx="200" cy="115" r="3" fill="#1e293b"/>
        <text x="225" y="105" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">S</text>
        <line x1="200" y1="115" x2="200" y2="150" stroke="#1e293b" stroke-width="3"/>

        <!-- Outer rectangle and battery E -->
        <line x1="80" y1="50" x2="80" y2="150" stroke="#1e293b" stroke-width="3"/>
        <line x1="320" y1="50" x2="320" y2="150" stroke="#1e293b" stroke-width="3"/>
        
        <line x1="40" y1="100" x2="80" y2="100" stroke="#1e293b" stroke-width="3"/>
        <line x1="320" y1="100" x2="360" y2="100" stroke="#1e293b" stroke-width="3"/>
        <line x1="40" y1="100" x2="40" y2="230" stroke="#1e293b" stroke-width="3"/>
        <line x1="360" y1="100" x2="360" y2="230" stroke="#1e293b" stroke-width="3"/>
        <!-- Battery E -->
        <line x1="40" y1="230" x2="190" y2="230" stroke="#1e293b" stroke-width="3"/>
        <line x1="190" y1="215" x2="190" y2="245" stroke="#1e293b" stroke-width="5"/>
        <line x1="200" y1="222" x2="200" y2="238" stroke="#1e293b" stroke-width="3"/>
        <text x="190" y="270" font-family="sans-serif" font-size="18" font-weight="bold">E</text>
        <line x1="200" y1="230" x2="360" y2="230" stroke="#1e293b" stroke-width="3"/>
        <text x="30" y="245" font-family="sans-serif" font-size="14" font-weight="bold">c</text>
        <text x="365" y="245" font-family="sans-serif" font-size="14" font-weight="bold">d</text>
      </g>
    </svg>
  `);

  // Q127: Four graphs of U vs q
  await saveSvgAsPng('batch2_q127_energy_charge_graphs.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Graph 1: Parabola curving up -->
      <g transform="translate(60, 40)">
        <text x="-35" y="50" font-family="sans-serif" font-size="16" font-weight="bold">(1)</text>
        <line x1="0" y1="100" x2="120" y2="100" stroke="#1e293b" stroke-width="2"/>
        <line x1="0" y1="100" x2="0" y2="0" stroke="#1e293b" stroke-width="2"/>
        <path d="M 0 100 Q 50 95 90 20" fill="none" stroke="#2563eb" stroke-width="3"/>
        <text x="125" y="105" font-family="sans-serif" font-size="14" font-style="italic">q</text>
        <text x="-5" y="-5" font-family="sans-serif" font-size="14" font-style="italic">U</text>
      </g>
      <!-- Graph 2: Inverted curve -->
      <g transform="translate(360, 40)">
        <text x="-35" y="50" font-family="sans-serif" font-size="16" font-weight="bold">(2)</text>
        <line x1="0" y1="100" x2="120" y2="100" stroke="#1e293b" stroke-width="2"/>
        <line x1="0" y1="100" x2="0" y2="0" stroke="#1e293b" stroke-width="2"/>
        <path d="M 0 100 Q 20 30 100 20" fill="none" stroke="#2563eb" stroke-width="3"/>
        <text x="125" y="105" font-family="sans-serif" font-size="14" font-style="italic">q</text>
        <text x="-5" y="-5" font-family="sans-serif" font-size="14" font-style="italic">U</text>
      </g>
      <!-- Graph 3: Linear -->
      <g transform="translate(60, 200)">
        <text x="-35" y="50" font-family="sans-serif" font-size="16" font-weight="bold">(3)</text>
        <line x1="0" y1="100" x2="120" y2="100" stroke="#1e293b" stroke-width="2"/>
        <line x1="0" y1="100" x2="0" y2="0" stroke="#1e293b" stroke-width="2"/>
        <line x1="0" y1="100" x2="90" y2="20" stroke="#2563eb" stroke-width="3"/>
        <text x="125" y="105" font-family="sans-serif" font-size="14" font-style="italic">q</text>
        <text x="-5" y="-5" font-family="sans-serif" font-size="14" font-style="italic">U</text>
      </g>
      <!-- Graph 4: Hyperbolic decay -->
      <g transform="translate(360, 200)">
        <text x="-35" y="50" font-family="sans-serif" font-size="16" font-weight="bold">(4)</text>
        <line x1="0" y1="100" x2="120" y2="100" stroke="#1e293b" stroke-width="2"/>
        <line x1="0" y1="100" x2="0" y2="0" stroke="#1e293b" stroke-width="2"/>
        <path d="M 15 20 Q 25 75 100 85" fill="none" stroke="#2563eb" stroke-width="3"/>
        <text x="125" y="105" font-family="sans-serif" font-size="14" font-style="italic">q</text>
        <text x="-5" y="-5" font-family="sans-serif" font-size="14" font-style="italic">U</text>
      </g>
    </svg>
  `);

  // Q128: 6 charges on circle
  await saveSvgAsPng('batch2_q128_charges_on_circle.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(300, 175)">
        <circle r="95" fill="none" stroke="#1e293b" stroke-width="2" stroke-dasharray="4,4"/>
        <circle cx="0" cy="0" r="4" fill="#1e293b"/>
        <text x="10" y="5" font-family="sans-serif" font-size="16" font-weight="bold">O</text>
        <!-- 6 charges at 0, 60, 120, 180, 240, 300 degrees -->
        <!-- Top (270 deg) -->
        <circle cx="0" cy="-95" r="5" fill="#dc2626"/>
        <text x="-6" y="-105" font-family="sans-serif" font-size="16" font-weight="bold">q</text>
        <!-- Bottom (90 deg) -->
        <circle cx="0" cy="95" r="5" fill="#dc2626"/>
        <text x="-6" y="120" font-family="sans-serif" font-size="16" font-weight="bold">q</text>
        <!-- Top Right (330 deg) -->
        <circle cx="82" cy="-47" r="5" fill="#dc2626"/>
        <text x="95" y="-45" font-family="sans-serif" font-size="16" font-weight="bold">q</text>
        <!-- Bottom Right (30 deg) -->
        <circle cx="82" cy="47" r="5" fill="#dc2626"/>
        <text x="95" y="55" font-family="sans-serif" font-size="16" font-weight="bold">q</text>
        <!-- Top Left (210 deg) -->
        <circle cx="-82" cy="-47" r="5" fill="#dc2626"/>
        <text x="-110" y="-45" font-family="sans-serif" font-size="16" font-weight="bold">q</text>
        <!-- Bottom Left (150 deg) -->
        <circle cx="-82" cy="47" r="5" fill="#dc2626"/>
        <text x="-110" y="55" font-family="sans-serif" font-size="16" font-weight="bold">q</text>
      </g>
    </svg>
  `);

  // Q130: 5 identical capacitors in series across 10 V, grounded at node N
  await saveSvgAsPng('batch2_q130_five_caps_ground.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(60, 60)">
        <!-- Top battery 10 V -->
        <line x1="30" y1="120" x2="30" y2="40" stroke="#1e293b" stroke-width="3"/>
        <line x1="30" y1="40" x2="210" y2="40" stroke="#1e293b" stroke-width="3"/>
        <line x1="210" y1="25" x2="210" y2="55" stroke="#1e293b" stroke-width="5"/>
        <line x1="220" y1="32" x2="220" y2="48" stroke="#1e293b" stroke-width="3"/>
        <text x="200" y="18" font-family="sans-serif" font-size="16" font-weight="bold">10 V</text>
        <line x1="220" y1="40" x2="450" y2="40" stroke="#1e293b" stroke-width="3"/>
        <line x1="450" y1="40" x2="450" y2="120" stroke="#1e293b" stroke-width="3"/>

        <!-- Bottom line with 5 capacitors -->
        <circle cx="30" cy="120" r="4" fill="#1e293b"/>
        <text x="10" y="125" font-family="sans-serif" font-size="18" font-weight="bold">A</text>
        
        <!-- Cap 1 -->
        <line x1="30" y1="120" x2="70" y2="120" stroke="#1e293b" stroke-width="3"/>
        <line x1="70" y1="105" x2="70" y2="135" stroke="#1e293b" stroke-width="5"/>
        <line x1="82" y1="105" x2="82" y2="135" stroke="#1e293b" stroke-width="5"/>
        <text x="70" y="95" font-family="sans-serif" font-size="15" font-weight="bold">C</text>

        <!-- Cap 2 -->
        <line x1="82" y1="120" x2="150" y2="120" stroke="#1e293b" stroke-width="3"/>
        <line x1="150" y1="105" x2="150" y2="135" stroke="#1e293b" stroke-width="5"/>
        <line x1="162" y1="105" x2="162" y2="135" stroke="#1e293b" stroke-width="5"/>
        <text x="150" y="95" font-family="sans-serif" font-size="15" font-weight="bold">C</text>

        <!-- Cap 3 -->
        <line x1="162" y1="120" x2="230" y2="120" stroke="#1e293b" stroke-width="3"/>
        <line x1="230" y1="105" x2="230" y2="135" stroke="#1e293b" stroke-width="5"/>
        <line x1="242" y1="105" x2="242" y2="135" stroke="#1e293b" stroke-width="5"/>
        <text x="230" y="95" font-family="sans-serif" font-size="15" font-weight="bold">C</text>

        <!-- Node N (Ground) -->
        <line x1="242" y1="120" x2="310" y2="120" stroke="#1e293b" stroke-width="3"/>
        <circle cx="275" cy="120" r="4" fill="#1e293b"/>
        <text x="270" y="105" font-family="sans-serif" font-size="16" font-weight="bold">N</text>
        <line x1="275" y1="120" x2="275" y2="160" stroke="#1e293b" stroke-width="3"/>
        <line x1="260" y1="160" x2="290" y2="160" stroke="#1e293b" stroke-width="3"/>
        <line x1="265" y1="165" x2="285" y2="165" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="270" y1="170" x2="280" y2="170" stroke="#1e293b" stroke-width="2"/>

        <!-- Cap 4 -->
        <line x1="310" y1="105" x2="310" y2="135" stroke="#1e293b" stroke-width="5"/>
        <line x1="322" y1="105" x2="322" y2="135" stroke="#1e293b" stroke-width="5"/>
        <text x="310" y="95" font-family="sans-serif" font-size="15" font-weight="bold">C</text>

        <!-- Cap 5 -->
        <line x1="322" y1="120" x2="390" y2="120" stroke="#1e293b" stroke-width="3"/>
        <line x1="390" y1="105" x2="390" y2="135" stroke="#1e293b" stroke-width="5"/>
        <line x1="402" y1="105" x2="402" y2="135" stroke="#1e293b" stroke-width="5"/>
        <text x="390" y="95" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        
        <line x1="402" y1="120" x2="450" y2="120" stroke="#1e293b" stroke-width="3"/>
        <circle cx="450" cy="120" r="4" fill="#1e293b"/>
        <text x="460" y="125" font-family="sans-serif" font-size="18" font-weight="bold">B</text>
      </g>
    </svg>
  `);

  // Q131: 5 interleaved plates
  await saveSvgAsPng('batch2_q131_interleaved_plates.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(140, 50)">
        <!-- Plate 1 (y=40) -->
        <line x1="60" y1="40" x2="280" y2="40" stroke="#1e293b" stroke-width="5"/>
        <!-- Plate 2 (y=80) -->
        <line x1="60" y1="80" x2="280" y2="80" stroke="#1e293b" stroke-width="5"/>
        <!-- Plate 3 (y=120) -->
        <line x1="60" y1="120" x2="280" y2="120" stroke="#1e293b" stroke-width="5"/>
        <!-- Plate 4 (y=160) -->
        <line x1="60" y1="160" x2="280" y2="160" stroke="#1e293b" stroke-width="5"/>
        <!-- Plate 5 (y=200) -->
        <line x1="60" y1="200" x2="280" y2="200" stroke="#1e293b" stroke-width="5"/>

        <!-- Left U-curve connecting 1 and 3, leads to a -->
        <path d="M 60 40 A 40 40 0 0 0 60 120" fill="none" stroke="#1e293b" stroke-width="3"/>
        <line x1="20" y1="80" x2="-20" y2="80" stroke="#1e293b" stroke-width="3"/>
        <circle cx="-20" cy="80" r="4" fill="#1e293b"/>
        <text x="-40" y="85" font-family="sans-serif" font-size="18" font-weight="bold">a</text>

        <!-- Right U-curve connecting 2 and 4 -->
        <path d="M 280 80 A 40 40 0 0 1 280 160" fill="none" stroke="#1e293b" stroke-width="3"/>

        <!-- Plate 5 leads to b -->
        <line x1="280" y1="200" x2="350" y2="200" stroke="#1e293b" stroke-width="3"/>
        <circle cx="350" cy="200" r="4" fill="#1e293b"/>
        <text x="365" y="205" font-family="sans-serif" font-size="18" font-weight="bold">b</text>
      </g>
    </svg>
  `);

  // Q132: Spheres r (2q) and 3r (2q)
  await saveSvgAsPng('batch2_q132_spheres_charge.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(120, 80)">
        <!-- Sphere A (radius r) -->
        <circle cx="100" cy="100" r="45" fill="none" stroke="#1e293b" stroke-width="3"/>
        <circle cx="100" cy="100" r="3" fill="#1e293b"/>
        <line x1="100" y1="100" x2="100" y2="55" stroke="#64748b" stroke-dasharray="3,3" stroke-width="2"/>
        <text x="105" y="85" font-family="sans-serif" font-size="16" font-style="italic">r</text>
        <text x="95" y="40" font-family="sans-serif" font-size="16" font-weight="bold">2q</text>
        <text x="95" y="165" font-family="sans-serif" font-size="18" font-weight="bold">A</text>

        <!-- Sphere B (radius 3r) -->
        <circle cx="280" cy="100" r="75" fill="none" stroke="#1e293b" stroke-width="3"/>
        <circle cx="280" cy="100" r="3" fill="#1e293b"/>
        <line x1="280" y1="100" x2="280" y2="25" stroke="#64748b" stroke-dasharray="3,3" stroke-width="2"/>
        <text x="285" y="65" font-family="sans-serif" font-size="16" font-style="italic">3r</text>
        <text x="275" y="15" font-family="sans-serif" font-size="16" font-weight="bold">2q</text>
        <text x="275" y="195" font-family="sans-serif" font-size="18" font-weight="bold">B</text>
      </g>
    </svg>
  `);

  // Q133: (3 uF || 1 uF) in series with 2 uF across 6 V
  await saveSvgAsPng('batch2_q133_cap_parallel_series.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(100, 50)">
        <!-- Left vertical wire -->
        <line x1="50" y1="50" x2="50" y2="190" stroke="#1e293b" stroke-width="3"/>
        <!-- Parallel branch for 3 uF and 1 uF -->
        <line x1="50" y1="50" x2="110" y2="50" stroke="#1e293b" stroke-width="3"/>
        <line x1="110" y1="20" x2="110" y2="80" stroke="#1e293b" stroke-width="3"/>
        
        <!-- 3 uF top -->
        <line x1="110" y1="20" x2="150" y2="20" stroke="#1e293b" stroke-width="3"/>
        <line x1="150" y1="5" x2="150" y2="35" stroke="#1e293b" stroke-width="5"/>
        <line x1="162" y1="5" x2="162" y2="35" stroke="#1e293b" stroke-width="5"/>
        <text x="145" y="-3" font-family="sans-serif" font-size="14" font-weight="bold">3 µF</text>
        <line x1="162" y1="20" x2="200" y2="20" stroke="#1e293b" stroke-width="3"/>

        <!-- 1 uF bottom -->
        <line x1="110" y1="80" x2="150" y2="80" stroke="#1e293b" stroke-width="3"/>
        <line x1="150" y1="65" x2="150" y2="95" stroke="#1e293b" stroke-width="5"/>
        <line x1="162" y1="65" x2="162" y2="95" stroke="#1e293b" stroke-width="5"/>
        <text x="145" y="115" font-family="sans-serif" font-size="14" font-weight="bold">1 µF</text>
        <line x1="162" y1="80" x2="200" y2="80" stroke="#1e293b" stroke-width="3"/>

        <line x1="200" y1="20" x2="200" y2="80" stroke="#1e293b" stroke-width="3"/>
        
        <!-- Series capacitor 2 uF -->
        <line x1="200" y1="50" x2="270" y2="50" stroke="#1e293b" stroke-width="3"/>
        <line x1="270" y1="35" x2="270" y2="65" stroke="#1e293b" stroke-width="5"/>
        <line x1="282" y1="35" x2="282" y2="65" stroke="#1e293b" stroke-width="5"/>
        <text x="265" y="25" font-family="sans-serif" font-size="14" font-weight="bold">2 µF</text>
        <line x1="282" y1="50" x2="350" y2="50" stroke="#1e293b" stroke-width="3"/>
        <line x1="350" y1="50" x2="350" y2="190" stroke="#1e293b" stroke-width="3"/>

        <!-- Bottom wire with 6 V battery -->
        <line x1="50" y1="190" x2="190" y2="190" stroke="#1e293b" stroke-width="3"/>
        <line x1="190" y1="175" x2="190" y2="205" stroke="#1e293b" stroke-width="5"/>
        <line x1="200" y1="182" x2="200" y2="198" stroke="#1e293b" stroke-width="3"/>
        <text x="185" y="230" font-family="sans-serif" font-size="16" font-weight="bold">6 V</text>
        <line x1="200" y1="190" x2="350" y2="190" stroke="#1e293b" stroke-width="3"/>
      </g>
    </svg>
  `);

  // Q134: Parallel plate capacitor with half area filled with dielectric k
  await saveSvgAsPng('batch2_q134_half_dielectric.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(150, 75)">
        <!-- Top plate -->
        <line x1="30" y1="40" x2="270" y2="40" stroke="#1e293b" stroke-width="6"/>
        <!-- Bottom plate -->
        <line x1="30" y1="160" x2="270" y2="160" stroke="#1e293b" stroke-width="6"/>
        <!-- Dielectric block on right half -->
        <rect x="150" y="46" width="120" height="108" fill="#e2e8f0" stroke="#94a3b8" stroke-dasharray="4,4"/>
        <text x="200" y="105" font-family="sans-serif" font-size="22" font-weight="bold" fill="#334155">k</text>
        <!-- Separation d -->
        <line x1="15" y1="40" x2="15" y2="160" stroke="#64748b" stroke-width="2"/>
        <text x="-5" y="105" font-family="sans-serif" font-size="16" font-weight="bold" fill="#64748b">d</text>
      </g>
    </svg>
  `);

  // Q136: Overlapping bypass ladder capacitors
  await saveSvgAsPng('batch2_q136_ladder_caps.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(70, 70)">
        <!-- Terminal P -->
        <circle cx="30" cy="100" r="4" fill="#1e293b"/>
        <text x="10" y="105" font-family="sans-serif" font-size="18" font-weight="bold">P</text>
        
        <!-- Main horizontal line with 4 capacitors C -->
        <line x1="30" y1="100" x2="80" y2="100" stroke="#1e293b" stroke-width="3"/>
        <!-- C1 -->
        <line x1="80" y1="85" x2="80" y2="115" stroke="#1e293b" stroke-width="5"/>
        <line x1="92" y1="85" x2="92" y2="115" stroke="#1e293b" stroke-width="5"/>
        <text x="80" y="135" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="92" y1="100" x2="170" y2="100" stroke="#1e293b" stroke-width="3"/>

        <!-- C2 -->
        <line x1="170" y1="85" x2="170" y2="115" stroke="#1e293b" stroke-width="5"/>
        <line x1="182" y1="85" x2="182" y2="115" stroke="#1e293b" stroke-width="5"/>
        <text x="170" y="135" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="182" y1="100" x2="260" y2="100" stroke="#1e293b" stroke-width="3"/>

        <!-- C3 -->
        <line x1="260" y1="85" x2="260" y2="115" stroke="#1e293b" stroke-width="5"/>
        <line x1="272" y1="85" x2="272" y2="115" stroke="#1e293b" stroke-width="5"/>
        <text x="260" y="135" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="272" y1="100" x2="350" y2="100" stroke="#1e293b" stroke-width="3"/>

        <!-- C4 -->
        <line x1="350" y1="85" x2="350" y2="115" stroke="#1e293b" stroke-width="5"/>
        <line x1="362" y1="85" x2="362" y2="115" stroke="#1e293b" stroke-width="5"/>
        <text x="350" y="135" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="362" y1="100" x2="420" y2="100" stroke="#1e293b" stroke-width="3"/>
        <circle cx="420" cy="100" r="4" fill="#1e293b"/>
        <text x="430" y="105" font-family="sans-serif" font-size="18" font-weight="bold">Q</text>

        <!-- Top bypass: from between P and C1 to between C2 and C3 -->
        <line x1="55" y1="100" x2="55" y2="40" stroke="#2563eb" stroke-width="2.5"/>
        <line x1="55" y1="40" x2="220" y2="40" stroke="#2563eb" stroke-width="2.5"/>
        <line x1="220" y1="40" x2="220" y2="100" stroke="#2563eb" stroke-width="2.5"/>

        <!-- Bottom bypass: from between C1 and C2 to between C3 and C4 -->
        <line x1="130" y1="100" x2="130" y2="160" stroke="#dc2626" stroke-width="2.5"/>
        <line x1="130" y1="160" x2="310" y2="160" stroke="#dc2626" stroke-width="2.5"/>
        <line x1="310" y1="160" x2="310" y2="100" stroke="#dc2626" stroke-width="2.5"/>

        <!-- Top right bypass: from between C3 and C4 to Q -->
        <line x1="310" y1="100" x2="310" y2="40" stroke="#2563eb" stroke-width="2.5"/>
        <line x1="310" y1="40" x2="420" y2="40" stroke="#2563eb" stroke-width="2.5"/>
        <line x1="420" y1="40" x2="420" y2="100" stroke="#2563eb" stroke-width="2.5"/>
      </g>
    </svg>
  `);

  // Q137: Wheatstone bridge of capacitors
  await saveSvgAsPng('batch2_q137_wheatstone_caps.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(150, 40)">
        <!-- Node a -->
        <circle cx="30" cy="135" r="4" fill="#1e293b"/>
        <text x="10" y="140" font-family="sans-serif" font-size="18" font-weight="bold">a</text>
        <!-- Node c (top) -->
        <circle cx="160" cy="30" r="4" fill="#1e293b"/>
        <text x="155" y="20" font-family="sans-serif" font-size="18" font-weight="bold">c</text>
        <!-- Node d (bottom) -->
        <circle cx="160" cy="240" r="4" fill="#1e293b"/>
        <text x="155" y="265" font-family="sans-serif" font-size="18" font-weight="bold">d</text>
        <!-- Node b (right) -->
        <circle cx="290" cy="135" r="4" fill="#1e293b"/>
        <text x="300" y="140" font-family="sans-serif" font-size="18" font-weight="bold">b</text>

        <!-- Branch a-c: 4 uF -->
        <line x1="30" y1="135" x2="85" y2="90" stroke="#1e293b" stroke-width="3"/>
        <line x1="75" y1="80" x2="95" y2="100" stroke="#1e293b" stroke-width="5"/>
        <line x1="85" y1="70" x2="105" y2="90" stroke="#1e293b" stroke-width="5"/>
        <text x="60" y="70" font-family="sans-serif" font-size="15" font-weight="bold">4 µF</text>
        <line x1="105" y1="75" x2="160" y2="30" stroke="#1e293b" stroke-width="3"/>

        <!-- Branch c-b: 2 uF -->
        <line x1="160" y1="30" x2="215" y2="75" stroke="#1e293b" stroke-width="3"/>
        <line x1="210" y1="70" x2="230" y2="90" stroke="#1e293b" stroke-width="5"/>
        <line x1="220" y1="80" x2="240" y2="100" stroke="#1e293b" stroke-width="5"/>
        <text x="240" y="70" font-family="sans-serif" font-size="15" font-weight="bold">2 µF</text>
        <line x1="235" y1="90" x2="290" y2="135" stroke="#1e293b" stroke-width="3"/>

        <!-- Branch a-d: 6 uF -->
        <line x1="30" y1="135" x2="85" y2="180" stroke="#1e293b" stroke-width="3"/>
        <line x1="85" y1="170" x2="105" y2="190" stroke="#1e293b" stroke-width="5"/>
        <line x1="75" y1="180" x2="95" y2="200" stroke="#1e293b" stroke-width="5"/>
        <text x="50" y="215" font-family="sans-serif" font-size="15" font-weight="bold">6 µF</text>
        <line x1="95" y1="190" x2="160" y2="240" stroke="#1e293b" stroke-width="3"/>

        <!-- Branch d-b: 3 uF -->
        <line x1="160" y1="240" x2="215" y2="195" stroke="#1e293b" stroke-width="3"/>
        <line x1="220" y1="180" x2="240" y2="200" stroke="#1e293b" stroke-width="5"/>
        <line x1="210" y1="190" x2="230" y2="210" stroke="#1e293b" stroke-width="5"/>
        <text x="240" y="215" font-family="sans-serif" font-size="15" font-weight="bold">3 µF</text>
        <line x1="235" y1="180" x2="290" y2="135" stroke="#1e293b" stroke-width="3"/>

        <!-- Bridge c-d: 5 uF -->
        <line x1="160" y1="30" x2="160" y2="125" stroke="#1e293b" stroke-width="3"/>
        <line x1="145" y1="125" x2="175" y2="125" stroke="#1e293b" stroke-width="5"/>
        <line x1="145" y1="140" x2="175" y2="140" stroke="#1e293b" stroke-width="5"/>
        <text x="180" y="137" font-family="sans-serif" font-size="15" font-weight="bold">5 µF</text>
        <line x1="160" y1="140" x2="160" y2="240" stroke="#1e293b" stroke-width="3"/>
      </g>
    </svg>
  `);

  // Q138: Circuit with capacitors across battery E with cross diagonals
  await saveSvgAsPng('batch2_q138_battery_caps_cross.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(80, 50)">
        <!-- Battery E and Switch S on left -->
        <line x1="30" y1="80" x2="30" y2="180" stroke="#1e293b" stroke-width="3"/>
        <line x1="20" y1="125" x2="40" y2="125" stroke="#1e293b" stroke-width="5"/>
        <line x1="25" y1="135" x2="35" y2="135" stroke="#1e293b" stroke-width="3"/>
        <text x="5" y="133" font-family="sans-serif" font-size="16" font-weight="bold">E</text>
        <!-- Switch S -->
        <line x1="30" y1="80" x2="30" y2="50" stroke="#1e293b" stroke-width="3"/>
        <circle cx="30" cy="50" r="3" fill="#1e293b"/>
        <line x1="30" y1="50" x2="55" y2="30" stroke="#dc2626" stroke-width="3"/>
        <circle cx="60" cy="50" r="3" fill="#1e293b"/>
        <text x="45" y="25" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">S</text>
        
        <!-- Top and bottom rails -->
        <line x1="60" y1="50" x2="350" y2="50" stroke="#1e293b" stroke-width="3"/>
        <line x1="30" y1="180" x2="350" y2="180" stroke="#1e293b" stroke-width="3"/>

        <!-- First vertical capacitor C -->
        <line x1="140" y1="50" x2="140" y2="105" stroke="#1e293b" stroke-width="3"/>
        <line x1="125" y1="105" x2="155" y2="105" stroke="#1e293b" stroke-width="5"/>
        <line x1="125" y1="117" x2="155" y2="117" stroke="#1e293b" stroke-width="5"/>
        <text x="160" y="115" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="140" y1="117" x2="140" y2="180" stroke="#1e293b" stroke-width="3"/>

        <!-- Second vertical capacitor C -->
        <line x1="230" y1="50" x2="230" y2="105" stroke="#1e293b" stroke-width="3"/>
        <line x1="215" y1="105" x2="245" y2="105" stroke="#1e293b" stroke-width="5"/>
        <line x1="215" y1="117" x2="245" y2="117" stroke="#1e293b" stroke-width="5"/>
        <text x="195" y="115" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="230" y1="117" x2="230" y2="180" stroke="#1e293b" stroke-width="3"/>

        <!-- Third vertical capacitor C (right edge) -->
        <line x1="350" y1="50" x2="350" y2="105" stroke="#1e293b" stroke-width="3"/>
        <line x1="335" y1="105" x2="365" y2="105" stroke="#1e293b" stroke-width="5"/>
        <line x1="335" y1="117" x2="365" y2="117" stroke="#1e293b" stroke-width="5"/>
        <text x="370" y="115" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="350" y1="117" x2="350" y2="180" stroke="#1e293b" stroke-width="3"/>

        <!-- Diagonal cross capacitors between x=230 and x=350 -->
        <!-- Diagonal 1: (230, 50) to (350, 180) -->
        <line x1="230" y1="50" x2="280" y2="105" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="270" y1="95" x2="290" y2="115" stroke="#1e293b" stroke-width="4"/>
        <line x1="280" y1="85" x2="300" y2="105" stroke="#1e293b" stroke-width="4"/>
        <text x="290" y="80" font-family="sans-serif" font-size="14" font-weight="bold">C</text>
        <line x1="290" y1="115" x2="350" y2="180" stroke="#1e293b" stroke-width="2.5"/>

        <!-- Diagonal 2: (230, 180) to (350, 50) with jumper in middle -->
        <line x1="230" y1="180" x2="275" y2="130" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="265" y1="140" x2="285" y2="120" stroke="#1e293b" stroke-width="4"/>
        <line x1="275" y1="150" x2="295" y2="130" stroke="#1e293b" stroke-width="4"/>
        <text x="250" y="160" font-family="sans-serif" font-size="14" font-weight="bold">C</text>
        <line x1="295" y1="110" x2="350" y2="50" stroke="#1e293b" stroke-width="2.5"/>
      </g>
    </svg>
  `);

  // Q139: Bridge balance arrangement for unknown x
  await saveSvgAsPng('batch2_q139_bridge_balance.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(150, 30)">
        <!-- Diamond bridge -->
        <!-- Top vertex P -->
        <circle cx="150" cy="50" r="4" fill="#1e293b"/>
        <text x="145" y="35" font-family="sans-serif" font-size="18" font-weight="bold">P</text>
        <!-- Bottom vertex Q -->
        <circle cx="150" cy="230" r="4" fill="#1e293b"/>
        <text x="145" y="255" font-family="sans-serif" font-size="18" font-weight="bold">Q</text>
        <!-- Left vertex -->
        <circle cx="40" cy="140" r="4" fill="#1e293b"/>
        <!-- Right vertex -->
        <circle cx="260" cy="140" r="4" fill="#1e293b"/>

        <!-- Top-left arm: parallel combo of 3 uF and x -->
        <line x1="40" y1="140" x2="80" y2="105" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="80" y1="105" x2="60" y2="80" stroke="#1e293b" stroke-width="2"/>
        <line x1="60" y1="80" x2="85" y2="60" stroke="#1e293b" stroke-width="2"/>
        <line x1="85" y1="50" x2="95" y2="65" stroke="#1e293b" stroke-width="4"/>
        <line x1="93" y1="43" x2="103" y2="58" stroke="#1e293b" stroke-width="4"/>
        <text x="75" y="45" font-family="sans-serif" font-size="14" font-weight="bold">x</text>
        <line x1="100" y1="55" x2="120" y2="75" stroke="#1e293b" stroke-width="2"/>

        <line x1="80" y1="105" x2="105" y2="85" stroke="#1e293b" stroke-width="2"/>
        <line x1="105" y1="75" x2="115" y2="90" stroke="#1e293b" stroke-width="4"/>
        <line x1="113" y1="68" x2="123" y2="83" stroke="#1e293b" stroke-width="4"/>
        <text x="100" y="115" font-family="sans-serif" font-size="14" font-weight="bold">3 µF</text>
        <line x1="120" y1="75" x2="150" y2="50" stroke="#1e293b" stroke-width="2.5"/>

        <!-- Top-right arm: Capacitor C -->
        <line x1="150" y1="50" x2="195" y2="88" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="190" y1="80" x2="208" y2="98" stroke="#1e293b" stroke-width="4"/>
        <line x1="198" y1="72" x2="216" y2="90" stroke="#1e293b" stroke-width="4"/>
        <text x="215" y="75" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="210" y1="95" x2="260" y2="140" stroke="#1e293b" stroke-width="2.5"/>

        <!-- Bottom-left arm: 6 uF -->
        <line x1="40" y1="140" x2="85" y2="178" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="80" y1="185" x2="98" y2="167" stroke="#1e293b" stroke-width="4"/>
        <line x1="88" y1="193" x2="106" y2="175" stroke="#1e293b" stroke-width="4"/>
        <text x="60" y="210" font-family="sans-serif" font-size="14" font-weight="bold">6 µF</text>
        <line x1="100" y1="185" x2="150" y2="230" stroke="#1e293b" stroke-width="2.5"/>

        <!-- Bottom-right arm: C -->
        <line x1="150" y1="230" x2="195" y2="192" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="190" y1="200" x2="208" y2="182" stroke="#1e293b" stroke-width="4"/>
        <line x1="198" y1="208" x2="216" y2="190" stroke="#1e293b" stroke-width="4"/>
        <text x="215" y="220" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="210" y1="185" x2="260" y2="140" stroke="#1e293b" stroke-width="2.5"/>

        <!-- Battery connected across Left and Right vertices -->
        <line x1="40" y1="140" x2="40" y2="270" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="40" y1="270" x2="135" y2="270" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="135" y1="260" x2="135" y2="280" stroke="#1e293b" stroke-width="4"/>
        <line x1="143" y1="264" x2="143" y2="276" stroke="#1e293b" stroke-width="2.5"/>
        <text x="130" y="300" font-family="sans-serif" font-size="14" font-weight="bold">10 V</text>
        <line x1="143" y1="270" x2="260" y2="270" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="260" y1="270" x2="260" y2="140" stroke="#1e293b" stroke-width="2.5"/>
      </g>
    </svg>
  `);

  // Q141: Dielectric slab in uniform field E0
  await saveSvgAsPng('batch2_q141_dielectric_face.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(180, 80)">
        <!-- External field E0 arrows -->
        <line x1="0" y1="30" x2="240" y2="30" stroke="#2563eb" stroke-width="2"/>
        <polygon points="240,30 230,25 230,35" fill="#2563eb"/>
        <line x1="0" y1="150" x2="240" y2="150" stroke="#2563eb" stroke-width="2"/>
        <polygon points="240,150 230,145 230,155" fill="#2563eb"/>
        <text x="250" y="95" font-family="sans-serif" font-size="18" font-weight="bold" fill="#2563eb">E₀</text>

        <!-- Dielectric slab -->
        <rect x="70" y="45" width="100" height="90" fill="#e2e8f0" stroke="#1e293b" stroke-width="3"/>
        <text x="110" y="98" font-family="sans-serif" font-size="22" font-weight="bold">K</text>
        
        <!-- Left face highlighting -->
        <line x1="70" y1="45" x2="70" y2="135" stroke="#dc2626" stroke-width="5"/>
        <text x="20" y="115" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626">Left face</text>
      </g>
    </svg>
  `);

  // Q142: Work done by external force at 60 deg to vertical/horizontal in uniform field
  await saveSvgAsPng('batch2_q142_work_uniform_field.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(180, 70)">
        <!-- Uniform electric field lines E -->
        <line x1="40" y1="60" x2="260" y2="60" stroke="#2563eb" stroke-width="2"/>
        <polygon points="260,60 250,55 250,65" fill="#2563eb"/>
        <line x1="40" y1="120" x2="260" y2="120" stroke="#2563eb" stroke-width="2"/>
        <polygon points="260,120 250,115 250,125" fill="#2563eb"/>
        <line x1="40" y1="180" x2="260" y2="180" stroke="#2563eb" stroke-width="2"/>
        <polygon points="260,180 250,175 250,185" fill="#2563eb"/>
        <text x="270" y="125" font-family="sans-serif" font-size="18" font-weight="bold" fill="#2563eb">E</text>

        <!-- Segment AB of length d -->
        <line x1="80" y1="60" x2="160" y2="180" stroke="#dc2626" stroke-width="3"/>
        <circle cx="80" cy="60" r="5" fill="#dc2626"/>
        <text x="60" y="60" font-family="sans-serif" font-size="18" font-weight="bold" fill="#dc2626">A</text>
        <circle cx="160" cy="180" r="5" fill="#dc2626"/>
        <text x="175" y="190" font-family="sans-serif" font-size="18" font-weight="bold" fill="#dc2626">B</text>

        <!-- Vertical reference and angle 60 deg -->
        <line x1="80" y1="60" x2="80" y2="180" stroke="#64748b" stroke-dasharray="3,3" stroke-width="2"/>
        <path d="M 80 100 A 40 40 0 0 0 105 92" fill="none" stroke="#1e293b" stroke-width="2"/>
        <text x="90" y="115" font-family="sans-serif" font-size="15" font-weight="bold">60°</text>
        <text x="130" y="125" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">d</text>
      </g>
    </svg>
  `);

  // Q143: Symmetric 5-capacitor network between A and B
  await saveSvgAsPng('batch2_q143_symmetric_network.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(100, 70)">
        <!-- Node A -->
        <circle cx="40" cy="100" r="4" fill="#1e293b"/>
        <text x="20" y="105" font-family="sans-serif" font-size="18" font-weight="bold">A</text>
        
        <!-- Main horizontal line with 3 capacitors -->
        <line x1="40" y1="100" x2="100" y2="100" stroke="#1e293b" stroke-width="3"/>
        <!-- C1 -->
        <line x1="100" y1="85" x2="100" y2="115" stroke="#1e293b" stroke-width="5"/>
        <line x1="112" y1="85" x2="112" y2="115" stroke="#1e293b" stroke-width="5"/>
        <line x1="112" y1="100" x2="190" y2="100" stroke="#1e293b" stroke-width="3"/>
        <!-- C2 -->
        <line x1="190" y1="85" x2="190" y2="115" stroke="#1e293b" stroke-width="5"/>
        <line x1="202" y1="85" x2="202" y2="115" stroke="#1e293b" stroke-width="5"/>
        <line x1="202" y1="100" x2="280" y2="100" stroke="#1e293b" stroke-width="3"/>
        <!-- C3 -->
        <line x1="280" y1="85" x2="280" y2="115" stroke="#1e293b" stroke-width="5"/>
        <line x1="292" y1="85" x2="292" y2="115" stroke="#1e293b" stroke-width="5"/>
        <line x1="292" y1="100" x2="350" y2="100" stroke="#1e293b" stroke-width="3"/>
        <!-- Node B -->
        <circle cx="350" cy="100" r="4" fill="#1e293b"/>
        <text x="365" y="105" font-family="sans-serif" font-size="18" font-weight="bold">B</text>

        <!-- Top jumper with capacitor: from between A and C1 to between C2 and C3 -->
        <line x1="70" y1="100" x2="70" y2="40" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="70" y1="40" x2="150" y2="40" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="150" y1="25" x2="150" y2="55" stroke="#1e293b" stroke-width="5"/>
        <line x1="162" y1="25" x2="162" y2="55" stroke="#1e293b" stroke-width="5"/>
        <line x1="162" y1="40" x2="240" y2="40" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="240" y1="40" x2="240" y2="100" stroke="#1e293b" stroke-width="2.5"/>

        <!-- Bottom jumper with capacitor: from between C1 and C2 to between C3 and B -->
        <line x1="150" y1="100" x2="150" y2="160" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="150" y1="160" x2="225" y2="160" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="225" y1="145" x2="225" y2="175" stroke="#1e293b" stroke-width="5"/>
        <line x1="237" y1="145" x2="237" y2="175" stroke="#1e293b" stroke-width="5"/>
        <line x1="237" y1="160" x2="320" y2="160" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="320" y1="160" x2="320" y2="100" stroke="#1e293b" stroke-width="2.5"/>

        <text x="175" y="195" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b">Each capacitor = 2 µF</text>
      </g>
    </svg>
  `);

  // Q147: (2 || 2) in series with 4 in series with (2 || 2)
  await saveSvgAsPng('batch2_q147_caps_h_network.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(100, 60)">
        <!-- Node A -->
        <circle cx="20" cy="90" r="4" fill="#1e293b"/>
        <text x="0" y="95" font-family="sans-serif" font-size="18" font-weight="bold">A</text>
        <line x1="20" y1="90" x2="60" y2="90" stroke="#1e293b" stroke-width="3"/>

        <!-- First parallel stage (2 uF and 2 uF) -->
        <line x1="60" y1="40" x2="60" y2="140" stroke="#1e293b" stroke-width="3"/>
        <line x1="60" y1="40" x2="95" y2="40" stroke="#1e293b" stroke-width="3"/>
        <line x1="95" y1="25" x2="95" y2="55" stroke="#1e293b" stroke-width="5"/>
        <line x1="107" y1="25" x2="107" y2="55" stroke="#1e293b" stroke-width="5"/>
        <text x="90" y="20" font-family="sans-serif" font-size="14" font-weight="bold">2 µF</text>
        <line x1="107" y1="40" x2="140" y2="40" stroke="#1e293b" stroke-width="3"/>

        <line x1="60" y1="140" x2="95" y2="140" stroke="#1e293b" stroke-width="3"/>
        <line x1="95" y1="125" x2="95" y2="155" stroke="#1e293b" stroke-width="5"/>
        <line x1="107" y1="125" x2="107" y2="155" stroke="#1e293b" stroke-width="5"/>
        <text x="90" y="175" font-family="sans-serif" font-size="14" font-weight="bold">2 µF</text>
        <line x1="107" y1="140" x2="140" y2="140" stroke="#1e293b" stroke-width="3"/>
        <line x1="140" y1="40" x2="140" y2="140" stroke="#1e293b" stroke-width="3"/>

        <!-- Middle capacitor 4 uF -->
        <line x1="140" y1="90" x2="185" y2="90" stroke="#1e293b" stroke-width="3"/>
        <line x1="185" y1="75" x2="185" y2="105" stroke="#1e293b" stroke-width="5"/>
        <line x1="197" y1="75" x2="197" y2="105" stroke="#1e293b" stroke-width="5"/>
        <text x="180" y="70" font-family="sans-serif" font-size="14" font-weight="bold">4 µF</text>
        <line x1="197" y1="90" x2="240" y2="90" stroke="#1e293b" stroke-width="3"/>

        <!-- Second parallel stage (2 uF and 2 uF) -->
        <line x1="240" y1="40" x2="240" y2="140" stroke="#1e293b" stroke-width="3"/>
        <line x1="240" y1="40" x2="275" y2="40" stroke="#1e293b" stroke-width="3"/>
        <line x1="275" y1="25" x2="275" y2="55" stroke="#1e293b" stroke-width="5"/>
        <line x1="287" y1="25" x2="287" y2="55" stroke="#1e293b" stroke-width="5"/>
        <text x="270" y="20" font-family="sans-serif" font-size="14" font-weight="bold">2 µF</text>
        <line x1="287" y1="40" x2="320" y2="40" stroke="#1e293b" stroke-width="3"/>

        <line x1="240" y1="140" x2="275" y2="140" stroke="#1e293b" stroke-width="3"/>
        <line x1="275" y1="125" x2="275" y2="155" stroke="#1e293b" stroke-width="5"/>
        <line x1="287" y1="125" x2="287" y2="155" stroke="#1e293b" stroke-width="5"/>
        <text x="270" y="175" font-family="sans-serif" font-size="14" font-weight="bold">2 µF</text>
        <line x1="287" y1="140" x2="320" y2="140" stroke="#1e293b" stroke-width="3"/>
        <line x1="320" y1="40" x2="320" y2="140" stroke="#1e293b" stroke-width="3"/>

        <!-- Node B -->
        <line x1="320" y1="90" x2="360" y2="90" stroke="#1e293b" stroke-width="3"/>
        <circle cx="360" cy="90" r="4" fill="#1e293b"/>
        <text x="370" y="95" font-family="sans-serif" font-size="18" font-weight="bold">B</text>
      </g>
    </svg>
  `);

  // Q148: Capacitor with 3 dielectric slabs K1, K2, K3
  await saveSvgAsPng('batch2_q148_three_dielectrics.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(150, 60)">
        <!-- Top plate X -->
        <line x1="40" y1="40" x2="280" y2="40" stroke="#1e293b" stroke-width="6"/>
        <circle cx="160" cy="40" r="4" fill="#1e293b"/>
        <text x="155" y="25" font-family="sans-serif" font-size="18" font-weight="bold">X</text>
        <!-- Bottom plate Y -->
        <line x1="40" y1="180" x2="280" y2="180" stroke="#1e293b" stroke-width="6"/>
        <circle cx="160" cy="180" r="4" fill="#1e293b"/>
        <text x="155" y="210" font-family="sans-serif" font-size="18" font-weight="bold">Y</text>

        <!-- K1: top left, area A/2, thickness d/2 -->
        <rect x="40" y="44" width="120" height="66" fill="#e2e8f0" stroke="#94a3b8" stroke-dasharray="3,3"/>
        <text x="90" y="85" font-family="sans-serif" font-size="20" font-weight="bold" fill="#334155">K₁</text>

        <!-- K2: bottom left, area A/2, thickness d/2 -->
        <rect x="40" y="110" width="120" height="66" fill="#cbd5e1" stroke="#94a3b8" stroke-dasharray="3,3"/>
        <text x="90" y="150" font-family="sans-serif" font-size="20" font-weight="bold" fill="#334155">K₂</text>

        <!-- K3: right half, area A/2, thickness d -->
        <rect x="160" y="44" width="120" height="132" fill="#bfdbfe" stroke="#93c5fd" stroke-dasharray="3,3"/>
        <text x="210" y="118" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e3a8a">K₃</text>

        <!-- Area and thickness dimensions -->
        <text x="90" y="32" font-family="sans-serif" font-size="14" font-weight="bold">A/2</text>
        <text x="210" y="32" font-family="sans-serif" font-size="14" font-weight="bold">A/2</text>
        <line x1="295" y1="40" x2="295" y2="180" stroke="#64748b" stroke-width="2"/>
        <text x="305" y="115" font-family="sans-serif" font-size="16" font-weight="bold" fill="#64748b">d</text>
      </g>
    </svg>
  `);

  // Q150: Three capacitors 15, 30, 90 uF in series across 50 V
  await saveSvgAsPng('batch2_q150_three_caps_series.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(100, 60)">
        <!-- Top line with 3 series capacitors -->
        <line x1="50" y1="60" x2="110" y2="60" stroke="#1e293b" stroke-width="3"/>
        <!-- 15 uF -->
        <line x1="110" y1="45" x2="110" y2="75" stroke="#1e293b" stroke-width="5"/>
        <line x1="122" y1="45" x2="122" y2="75" stroke="#1e293b" stroke-width="5"/>
        <text x="100" y="35" font-family="sans-serif" font-size="14" font-weight="bold">15 µF</text>
        <line x1="122" y1="60" x2="200" y2="60" stroke="#1e293b" stroke-width="3"/>
        <!-- 30 uF -->
        <line x1="200" y1="45" x2="200" y2="75" stroke="#1e293b" stroke-width="5"/>
        <line x1="212" y1="45" x2="212" y2="75" stroke="#1e293b" stroke-width="5"/>
        <text x="190" y="35" font-family="sans-serif" font-size="14" font-weight="bold">30 µF</text>
        <line x1="212" y1="60" x2="290" y2="60" stroke="#1e293b" stroke-width="3"/>
        <!-- 90 uF -->
        <line x1="290" y1="45" x2="290" y2="75" stroke="#1e293b" stroke-width="5"/>
        <line x1="302" y1="45" x2="302" y2="75" stroke="#1e293b" stroke-width="5"/>
        <text x="280" y="35" font-family="sans-serif" font-size="14" font-weight="bold">90 µF</text>
        <line x1="302" y1="60" x2="350" y2="60" stroke="#1e293b" stroke-width="3"/>

        <!-- Outer loop to 50 V battery -->
        <line x1="50" y1="60" x2="50" y2="180" stroke="#1e293b" stroke-width="3"/>
        <line x1="350" y1="60" x2="350" y2="180" stroke="#1e293b" stroke-width="3"/>

        <line x1="50" y1="180" x2="190" y2="180" stroke="#1e293b" stroke-width="3"/>
        <line x1="190" y1="165" x2="190" y2="195" stroke="#1e293b" stroke-width="5"/>
        <line x1="200" y1="172" x2="200" y2="188" stroke="#1e293b" stroke-width="3"/>
        <text x="185" y="225" font-family="sans-serif" font-size="16" font-weight="bold">50 V</text>
        <line x1="200" y1="180" x2="350" y2="180" stroke="#1e293b" stroke-width="3"/>
      </g>
    </svg>
  `);

  // Q154: Five identical capacitors in closed loop (pentagon)
  await saveSvgAsPng('batch2_q154_pentagon_caps.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(300, 175)">
        <!-- 5 vertices of a pentagon at radius 100 -->
        <!-- P at top, Q at top-right, R at bottom-right, S at bottom-left, T at top-left -->
        <!-- Angles: -90, -18, 54, 126, 198 -->
        <circle cx="0" cy="-90" r="4" fill="#1e293b"/>
        <text x="-5" y="-105" font-family="sans-serif" font-size="18" font-weight="bold">P</text>
        <circle cx="85" cy="-28" r="4" fill="#1e293b"/>
        <text x="95" y="-25" font-family="sans-serif" font-size="18" font-weight="bold">Q</text>
        <circle cx="53" cy="73" r="4" fill="#1e293b"/>
        <text x="65" y="85" font-family="sans-serif" font-size="18" font-weight="bold">R</text>
        <circle cx="-53" cy="73" r="4" fill="#1e293b"/>
        <text x="-75" y="85" font-family="sans-serif" font-size="18" font-weight="bold">S</text>
        <circle cx="-85" cy="-28" r="4" fill="#1e293b"/>
        <text x="-105" y="-25" font-family="sans-serif" font-size="18" font-weight="bold">T</text>

        <!-- Sides with capacitors -->
        <!-- P to Q -->
        <line x1="0" y1="-90" x2="85" y2="-28" stroke="#1e293b" stroke-width="2.5"/>
        <rect x="35" y="-65" width="16" height="12" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
        <!-- Q to R -->
        <line x1="85" y1="-28" x2="53" y2="73" stroke="#1e293b" stroke-width="2.5"/>
        <rect x="62" y="15" width="16" height="12" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
        <!-- R to S -->
        <line x1="53" y1="73" x2="-53" y2="73" stroke="#1e293b" stroke-width="2.5"/>
        <rect x="-8" y="67" width="16" height="12" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
        <!-- S to T -->
        <line x1="-53" y1="73" x2="-85" y2="-28" stroke="#1e293b" stroke-width="2.5"/>
        <rect x="-78" y="15" width="16" height="12" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
        <!-- T to P -->
        <line x1="-85" y1="-28" x2="0" y2="-90" stroke="#1e293b" stroke-width="2.5"/>
        <rect x="-51" y="-65" width="16" height="12" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
      </g>
    </svg>
  `);

  // Q155: Switch flow in loop with 2 uF parallel to (6 uF - S - 3 uF)
  await saveSvgAsPng('batch2_q155_switch_loop.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(120, 60)">
        <!-- Left input wire -->
        <line x1="0" y1="90" x2="60" y2="90" stroke="#1e293b" stroke-width="3"/>
        <line x1="60" y1="30" x2="60" y2="150" stroke="#1e293b" stroke-width="3"/>

        <!-- Top branch: 2 uF with +q -q -->
        <line x1="60" y1="30" x2="160" y2="30" stroke="#1e293b" stroke-width="3"/>
        <line x1="160" y1="15" x2="160" y2="45" stroke="#1e293b" stroke-width="5"/>
        <line x1="172" y1="15" x2="172" y2="45" stroke="#1e293b" stroke-width="5"/>
        <text x="150" y="5" font-family="sans-serif" font-size="14" font-weight="bold">2 µF</text>
        <text x="145" y="25" font-family="sans-serif" font-size="12" font-weight="bold" fill="#dc2626">+q</text>
        <text x="180" y="25" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2563eb">-q</text>
        <line x1="172" y1="30" x2="280" y2="30" stroke="#1e293b" stroke-width="3"/>

        <!-- Bottom branch: 6 uF, switch S, 3 uF -->
        <line x1="60" y1="150" x2="110" y2="150" stroke="#1e293b" stroke-width="3"/>
        <line x1="110" y1="135" x2="110" y2="165" stroke="#1e293b" stroke-width="5"/>
        <line x1="122" y1="135" x2="122" y2="165" stroke="#1e293b" stroke-width="5"/>
        <text x="100" y="190" font-family="sans-serif" font-size="14" font-weight="bold">6 µF</text>
        <text x="95" y="145" font-family="sans-serif" font-size="12" font-weight="bold" fill="#dc2626">+q</text>
        <text x="130" y="145" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2563eb">-q</text>
        
        <!-- Switch S -->
        <line x1="122" y1="150" x2="150" y2="150" stroke="#1e293b" stroke-width="3"/>
        <circle cx="150" cy="150" r="3" fill="#1e293b"/>
        <line x1="150" y1="150" x2="170" y2="135" stroke="#dc2626" stroke-width="3"/>
        <circle cx="175" cy="150" r="3" fill="#1e293b"/>
        <text x="155" y="130" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626">S</text>
        <line x1="175" y1="150" x2="210" y2="150" stroke="#1e293b" stroke-width="3"/>

        <!-- 3 uF -->
        <line x1="210" y1="135" x2="210" y2="165" stroke="#1e293b" stroke-width="5"/>
        <line x1="222" y1="135" x2="222" y2="165" stroke="#1e293b" stroke-width="5"/>
        <text x="200" y="190" font-family="sans-serif" font-size="14" font-weight="bold">3 µF</text>
        <text x="195" y="145" font-family="sans-serif" font-size="12" font-weight="bold" fill="#dc2626">+q</text>
        <text x="230" y="145" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2563eb">-q</text>
        <line x1="222" y1="150" x2="280" y2="150" stroke="#1e293b" stroke-width="3"/>

        <!-- Right output wire -->
        <line x1="280" y1="30" x2="280" y2="150" stroke="#1e293b" stroke-width="3"/>
        <line x1="280" y1="90" x2="340" y2="90" stroke="#1e293b" stroke-width="3"/>
      </g>
    </svg>
  `);

  // Q159: Two loop circuit with 6 uF, 4 uF, 12 V and 8 V batteries
  await saveSvgAsPng('batch2_q159_two_loop_batteries.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(150, 70)">
        <!-- Top horizontal with 6 uF -->
        <line x1="30" y1="40" x2="100" y2="40" stroke="#1e293b" stroke-width="3"/>
        <line x1="100" y1="25" x2="100" y2="55" stroke="#1e293b" stroke-width="5"/>
        <line x1="112" y1="25" x2="112" y2="55" stroke="#1e293b" stroke-width="5"/>
        <text x="95" y="18" font-family="sans-serif" font-size="14" font-weight="bold">6 µF</text>
        <line x1="112" y1="40" x2="180" y2="40" stroke="#1e293b" stroke-width="3"/>
        <line x1="180" y1="40" x2="280" y2="40" stroke="#1e293b" stroke-width="3"/>

        <!-- Right vertical branch with 4 uF -->
        <line x1="280" y1="40" x2="280" y2="85" stroke="#1e293b" stroke-width="3"/>
        <line x1="265" y1="85" x2="295" y2="85" stroke="#1e293b" stroke-width="5"/>
        <line x1="265" y1="97" x2="295" y2="97" stroke="#1e293b" stroke-width="5"/>
        <text x="305" y="95" font-family="sans-serif" font-size="14" font-weight="bold">4 µF</text>
        <line x1="280" y1="97" x2="280" y2="160" stroke="#1e293b" stroke-width="3"/>

        <!-- Middle vertical branch with 8 V battery -->
        <line x1="180" y1="40" x2="180" y2="85" stroke="#1e293b" stroke-width="3"/>
        <line x1="165" y1="85" x2="195" y2="85" stroke="#1e293b" stroke-width="5"/>
        <line x1="170" y1="97" x2="190" y2="97" stroke="#1e293b" stroke-width="3"/>
        <text x="135" y="95" font-family="sans-serif" font-size="14" font-weight="bold">8 V</text>
        <line x1="180" y1="97" x2="180" y2="160" stroke="#1e293b" stroke-width="3"/>

        <!-- Left branch and bottom 12 V battery -->
        <line x1="30" y1="40" x2="30" y2="160" stroke="#1e293b" stroke-width="3"/>
        <line x1="30" y1="160" x2="90" y2="160" stroke="#1e293b" stroke-width="3"/>
        <line x1="90" y1="145" x2="90" y2="175" stroke="#1e293b" stroke-width="5"/>
        <line x1="100" y1="152" x2="100" y2="168" stroke="#1e293b" stroke-width="3"/>
        <text x="85" y="200" font-family="sans-serif" font-size="14" font-weight="bold">12 V</text>
        <line x1="100" y1="160" x2="280" y2="160" stroke="#1e293b" stroke-width="3"/>
      </g>
    </svg>
  `);

  // Q160: Concentric shells A and B, B earthed
  await saveSvgAsPng('batch2_q160_concentric_shells_b_earthed.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(300, 175)">
        <circle r="45" fill="none" stroke="#1e293b" stroke-width="3"/>
        <text x="10" y="35" font-family="sans-serif" font-size="18" font-weight="bold">A</text>
        <circle r="95" fill="none" stroke="#1e293b" stroke-width="3"/>
        <text x="35" y="80" font-family="sans-serif" font-size="18" font-weight="bold">B</text>
        <!-- Earthing on shell B -->
        <line x1="75" y1="55" x2="115" y2="85" stroke="#1e293b" stroke-width="3"/>
        <line x1="115" y1="85" x2="115" y2="110" stroke="#1e293b" stroke-width="3"/>
        <!-- Earth symbol -->
        <line x1="105" y1="110" x2="125" y2="110" stroke="#1e293b" stroke-width="3"/>
        <line x1="108" y1="115" x2="122" y2="115" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="112" y1="120" x2="118" y2="120" stroke="#1e293b" stroke-width="2"/>
      </g>
    </svg>
  `);

  // Q161: Equipotential surfaces inclined at 30 deg
  await saveSvgAsPng('batch2_q161_equipotential_inclined.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(180, 180)">
        <!-- Axes -->
        <line x1="-30" y1="0" x2="220" y2="0" stroke="#1e293b" stroke-width="2.5"/>
        <polygon points="220,0 210,-5 210,5" fill="#1e293b"/>
        <text x="225" y="5" font-family="sans-serif" font-size="14" font-weight="bold">x (cm)</text>

        <line x1="0" y1="60" x2="0" y2="-130" stroke="#1e293b" stroke-width="2.5"/>
        <polygon points="0,-130 -5,-120 5,-120" fill="#1e293b"/>
        <text x="-5" y="-140" font-family="sans-serif" font-size="14" font-weight="bold">y (cm)</text>
        <text x="-15" y="18" font-family="sans-serif" font-size="14" font-weight="bold">O</text>

        <!-- Equipotential lines at 30 deg to x-axis: tan(30) = 1/sqrt(3) ≈ 0.577 -->
        <!-- x = 10 cm, V = 10 V -->
        <line x1="10" y1="30" x2="80" y2="-75" stroke="#2563eb" stroke-width="2.5"/>
        <text x="35" y="18" font-family="sans-serif" font-size="13" font-weight="bold">10</text>
        <text x="75" y="-85" font-family="sans-serif" font-size="13" font-weight="bold" fill="#2563eb">10 V</text>

        <!-- x = 20 cm, V = 20 V -->
        <line x1="50" y1="30" x2="120" y2="-75" stroke="#2563eb" stroke-width="2.5"/>
        <text x="75" y="18" font-family="sans-serif" font-size="13" font-weight="bold">20</text>
        <text x="115" y="-85" font-family="sans-serif" font-size="13" font-weight="bold" fill="#2563eb">20 V</text>

        <!-- x = 30 cm, V = 30 V -->
        <line x1="90" y1="30" x2="160" y2="-75" stroke="#2563eb" stroke-width="2.5"/>
        <text x="115" y="18" font-family="sans-serif" font-size="13" font-weight="bold">30</text>
        <text x="155" y="-85" font-family="sans-serif" font-size="13" font-weight="bold" fill="#2563eb">30 V</text>

        <!-- x = 40 cm, V = 40 V -->
        <line x1="130" y1="30" x2="200" y2="-75" stroke="#2563eb" stroke-width="2.5"/>
        <text x="155" y="18" font-family="sans-serif" font-size="13" font-weight="bold">40</text>
        <text x="195" y="-85" font-family="sans-serif" font-size="13" font-weight="bold" fill="#2563eb">40 V</text>

        <!-- Angle 30 deg -->
        <path d="M 175 0 A 20 20 0 0 1 187 -12" fill="none" stroke="#dc2626" stroke-width="2"/>
        <text x="192" y="-5" font-family="sans-serif" font-size="12" font-weight="bold" fill="#dc2626">30°</text>
      </g>
    </svg>
  `);

  // Q165: Circle capacitor network across A and B
  await saveSvgAsPng('batch2_q165_circle_cap_network.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(300, 175)">
        <!-- Outer circle with gap at top -->
        <path d="M -25 -102 A 105 105 0 1 0 25 -102" fill="none" stroke="#1e293b" stroke-width="3"/>
        <circle cx="-25" cy="-102" r="4" fill="#1e293b"/>
        <text x="-45" y="-105" font-family="sans-serif" font-size="18" font-weight="bold">A</text>
        <circle cx="25" cy="-102" r="4" fill="#1e293b"/>
        <text x="35" y="-105" font-family="sans-serif" font-size="18" font-weight="bold">B</text>

        <!-- Horizontal diameter with two capacitors C -->
        <line x1="-105" y1="0" x2="-45" y2="0" stroke="#1e293b" stroke-width="3"/>
        <line x1="-45" y1="-15" x2="-45" y2="15" stroke="#1e293b" stroke-width="5"/>
        <line x1="-33" y1="-15" x2="-33" y2="15" stroke="#1e293b" stroke-width="5"/>
        <text x="-45" y="-22" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="-33" y1="0" x2="33" y2="0" stroke="#1e293b" stroke-width="3"/>
        <line x1="33" y1="-15" x2="33" y2="15" stroke="#1e293b" stroke-width="5"/>
        <line x1="45" y1="-15" x2="45" y2="15" stroke="#1e293b" stroke-width="5"/>
        <text x="35" y="-22" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="45" y1="0" x2="105" y2="0" stroke="#1e293b" stroke-width="3"/>

        <!-- Vertical branch from center (0,0) to top near B (0, -105) -->
        <line x1="0" y1="0" x2="0" y2="-40" stroke="#1e293b" stroke-width="3"/>
        <line x1="-15" y1="-40" x2="15" y2="-40" stroke="#1e293b" stroke-width="5"/>
        <line x1="-15" y1="-52" x2="15" y2="-52" stroke="#1e293b" stroke-width="5"/>
        <text x="22" y="-42" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="0" y1="-52" x2="0" y2="-102" stroke="#1e293b" stroke-width="3"/>
        <!-- Connect to B -->
        <line x1="0" y1="-102" x2="25" y2="-102" stroke="#1e293b" stroke-width="3"/>

        <!-- Bottom capacitor C in the circle arc -->
        <rect x="-10" y="95" width="20" height="20" fill="#ffffff"/>
        <line x1="-15" y1="97" x2="-15" y2="113" stroke="#1e293b" stroke-width="5"/>
        <line x1="15" y1="97" x2="15" y2="113" stroke="#1e293b" stroke-width="5"/>
        <text x="-6" y="85" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
      </g>
    </svg>
  `);

  // Q166: Hollow conducting sphere in field of point charge P
  await saveSvgAsPng('batch2_q166_hollow_sphere_field.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(320, 175)">
        <!-- Hollow conducting sphere -->
        <circle r="80" fill="none" stroke="#1e293b" stroke-width="3"/>
        <!-- Center C -->
        <circle cx="0" cy="0" r="3" fill="#1e293b"/>
        <text x="-5" y="-10" font-family="sans-serif" font-size="16" font-weight="bold">C</text>
        <!-- Surface points A and B -->
        <circle cx="-80" cy="0" r="4" fill="#1e293b"/>
        <text x="-95" y="20" font-family="sans-serif" font-size="16" font-weight="bold">A</text>
        <circle cx="80" cy="0" r="4" fill="#1e293b"/>
        <text x="85" y="20" font-family="sans-serif" font-size="16" font-weight="bold">B</text>
        <!-- Horizontal diameter line -->
        <line x1="-80" y1="0" x2="80" y2="0" stroke="#64748b" stroke-dasharray="3,3" stroke-width="2"/>

        <!-- Point charge P outside at left -->
        <line x1="-80" y1="0" x2="-180" y2="0" stroke="#64748b" stroke-dasharray="3,3" stroke-width="2"/>
        <circle cx="-180" cy="0" r="5" fill="#dc2626"/>
        <text x="-195" y="-10" font-family="sans-serif" font-size="18" font-weight="bold" fill="#dc2626">P</text>
        <text x="-195" y="20" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626">+q</text>
      </g>
    </svg>
  `);

  // Q167: Off-center point charge inside cavity of conducting sphere
  await saveSvgAsPng('batch2_q167_off_center_cavity.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(300, 175)">
        <!-- Outer conducting surface -->
        <circle r="105" fill="none" stroke="#1e293b" stroke-width="4"/>
        <!-- Inner cavity surface -->
        <circle r="75" fill="none" stroke="#1e293b" stroke-width="3"/>
        <!-- Shading for conducting material -->
        <circle r="105" fill="none" stroke="#cbd5e1" stroke-width="28"/>
        <!-- Center O -->
        <circle cx="0" cy="0" r="3" fill="#1e293b"/>
        <text x="8" y="5" font-family="sans-serif" font-size="15" font-weight="bold">O</text>
        <!-- Radius R -->
        <line x1="0" y1="0" x2="53" y2="-53" stroke="#64748b" stroke-dasharray="3,3" stroke-width="2"/>
        <text x="35" y="-20" font-family="sans-serif" font-size="15" font-weight="bold">R</text>

        <!-- Off-center charge +q at position A -->
        <circle cx="-35" cy="20" r="5" fill="#dc2626"/>
        <text x="-55" y="38" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">+q</text>
        <text x="-40" y="5" font-family="sans-serif" font-size="15" font-weight="bold">A</text>
      </g>
    </svg>
  `);

  // Q170: Parallel plate capacitor with three dielectric slabs k=5, k=3, k=6
  await saveSvgAsPng('batch2_q170_three_layers_parallel.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(180, 60)">
        <!-- Terminal y connected to top and bottom plates -->
        <circle cx="20" cy="115" r="4" fill="#1e293b"/>
        <text x="-5" y="120" font-family="sans-serif" font-size="18" font-weight="bold">y</text>
        <line x1="20" y1="115" x2="60" y2="115" stroke="#1e293b" stroke-width="3"/>
        <line x1="60" y1="115" x2="110" y2="40" stroke="#1e293b" stroke-width="3"/>
        <line x1="60" y1="115" x2="110" y2="190" stroke="#1e293b" stroke-width="3"/>

        <!-- Top plate (y=40) -->
        <line x1="110" y1="40" x2="230" y2="40" stroke="#1e293b" stroke-width="5"/>
        <!-- Slab 1: k=5, thickness d -->
        <rect x="110" y="44" width="120" height="46" fill="#fde68a" stroke="#d97706" stroke-dasharray="3,3"/>
        <text x="145" y="73" font-family="sans-serif" font-size="16" font-weight="bold" fill="#92400e">k = 5</text>

        <!-- Plate 2 (y=90) connected to terminal x -->
        <line x1="110" y1="90" x2="230" y2="90" stroke="#1e293b" stroke-width="5"/>
        <line x1="230" y1="90" x2="310" y2="90" stroke="#1e293b" stroke-width="3"/>
        <circle cx="310" cy="90" r="4" fill="#1e293b"/>
        <text x="320" y="95" font-family="sans-serif" font-size="18" font-weight="bold">x</text>

        <!-- Slab 2: k=3, thickness d -->
        <rect x="110" y="94" width="120" height="46" fill="#fed7aa" stroke="#ea580c" stroke-dasharray="3,3"/>
        <text x="145" y="123" font-family="sans-serif" font-size="16" font-weight="bold" fill="#9a3412">k = 3</text>

        <!-- Plate 3 (y=140) -->
        <line x1="110" y1="140" x2="230" y2="140" stroke="#1e293b" stroke-width="5"/>

        <!-- Slab 3: k=6, thickness d -->
        <rect x="110" y="144" width="120" height="46" fill="#bbf7d0" stroke="#16a34a" stroke-dasharray="3,3"/>
        <text x="145" y="173" font-family="sans-serif" font-size="16" font-weight="bold" fill="#166534">k = 6</text>

        <!-- Bottom plate (y=190) -->
        <line x1="110" y1="190" x2="230" y2="190" stroke="#1e293b" stroke-width="5"/>

        <!-- Thickness indicators -->
        <line x1="245" y1="40" x2="245" y2="90" stroke="#64748b" stroke-width="2"/>
        <text x="255" y="70" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b">d</text>
        <line x1="245" y1="90" x2="245" y2="140" stroke="#64748b" stroke-width="2"/>
        <text x="255" y="120" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b">d</text>
        <line x1="245" y1="140" x2="245" y2="190" stroke="#64748b" stroke-width="2"/>
        <text x="255" y="170" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b">d</text>
      </g>
    </svg>
  `);

  console.log('Batch 3 diagrams generated successfully!');
}

generateAll().catch(console.error);
