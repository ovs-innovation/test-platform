import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const backendDir = './uploads/electrostatic_potential';
const frontendDir = '../frontend/public/uploads/electrostatic_potential';

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
  // Q108: Equipotential surfaces 10 V and 15 V separated by 50 cm
  await saveSvgAsPng('batch2_q108_equipotential.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(150, 60)">
        <line x1="80" y1="30" x2="80" y2="200" stroke="#1e293b" stroke-width="4"/>
        <text x="75" y="15" font-family="sans-serif" font-size="18" font-weight="bold">A</text>
        <text x="65" y="230" font-family="sans-serif" font-size="18" font-weight="bold" fill="#2563eb">10 V</text>
        <line x1="220" y1="30" x2="220" y2="200" stroke="#1e293b" stroke-width="4"/>
        <text x="215" y="15" font-family="sans-serif" font-size="18" font-weight="bold">B</text>
        <text x="205" y="230" font-family="sans-serif" font-size="18" font-weight="bold" fill="#2563eb">15 V</text>
        <!-- separation arrow -->
        <line x1="80" y1="115" x2="220" y2="115" stroke="#dc2626" stroke-width="2"/>
        <polygon points="80,115 90,110 90,120" fill="#dc2626"/>
        <polygon points="220,115 210,110 210,120" fill="#dc2626"/>
        <text x="125" y="105" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">50 cm</text>
      </g>
    </svg>
  `);

  // Q111: Curved equipotential surfaces 10 V, 20 V, 30 V, 40 V with path A to B
  await saveSvgAsPng('batch2_q111_equipotential_path.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(100, 40)">
        <path d="M 50 180 Q 200 60 380 90" fill="none" stroke="#2563eb" stroke-width="2.5"/>
        <text x="390" y="95" font-family="sans-serif" font-size="16" font-weight="bold" fill="#2563eb">10 V</text>
        <path d="M 50 200 Q 200 90 410 150" fill="none" stroke="#2563eb" stroke-width="2.5"/>
        <text x="420" y="155" font-family="sans-serif" font-size="16" font-weight="bold" fill="#2563eb">20 V</text>
        <path d="M 50 220 Q 200 130 380 220" fill="none" stroke="#2563eb" stroke-width="2.5"/>
        <text x="390" y="225" font-family="sans-serif" font-size="16" font-weight="bold" fill="#2563eb">30 V</text>
        <path d="M 50 240 Q 180 180 270 270" fill="none" stroke="#2563eb" stroke-width="2.5"/>
        <text x="280" y="280" font-family="sans-serif" font-size="16" font-weight="bold" fill="#2563eb">40 V</text>
        <!-- Point A on 40 V -->
        <circle cx="165" cy="215" r="5" fill="#dc2626"/>
        <text x="145" y="235" font-family="sans-serif" font-size="18" font-weight="bold" fill="#dc2626">A</text>
        <!-- Point B on 20 V -->
        <circle cx="280" cy="115" r="5" fill="#dc2626"/>
        <text x="290" y="130" font-family="sans-serif" font-size="18" font-weight="bold" fill="#dc2626">B</text>
        <!-- Wavy path from A to B -->
        <path d="M 165 215 Q 180 170 190 140 T 230 80 T 260 90 T 280 115" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="3,3"/>
        <polygon points="280,115 272,106 282,104" fill="#dc2626"/>
      </g>
    </svg>
  `);

  // Q113: Series 8 uF and parallel pair 4 uF across 10 V
  await saveSvgAsPng('batch2_q113_switch_circuit.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(80, 50)">
        <!-- 8 uF capacitor -->
        <line x1="50" y1="70" x2="130" y2="70" stroke="#1e293b" stroke-width="3"/>
        <line x1="130" y1="50" x2="130" y2="90" stroke="#1e293b" stroke-width="5"/>
        <line x1="145" y1="50" x2="145" y2="90" stroke="#1e293b" stroke-width="5"/>
        <text x="120" y="40" font-family="sans-serif" font-size="16" font-weight="bold">8 µF</text>
        <line x1="145" y1="70" x2="210" y2="70" stroke="#1e293b" stroke-width="3"/>
        <!-- Parallel branches of two 4 uF capacitors -->
        <line x1="210" y1="30" x2="210" y2="110" stroke="#1e293b" stroke-width="3"/>
        <!-- top branch 4 uF -->
        <line x1="210" y1="30" x2="270" y2="30" stroke="#1e293b" stroke-width="3"/>
        <line x1="270" y1="15" x2="270" y2="45" stroke="#1e293b" stroke-width="5"/>
        <line x1="285" y1="15" x2="285" y2="45" stroke="#1e293b" stroke-width="5"/>
        <text x="260" y="10" font-family="sans-serif" font-size="14" font-weight="bold">4 µF</text>
        <line x1="285" y1="30" x2="345" y2="30" stroke="#1e293b" stroke-width="3"/>
        <!-- bottom branch 4 uF -->
        <line x1="210" y1="110" x2="270" y2="110" stroke="#1e293b" stroke-width="3"/>
        <line x1="270" y1="95" x2="270" y2="125" stroke="#1e293b" stroke-width="5"/>
        <line x1="285" y1="95" x2="285" y2="125" stroke="#1e293b" stroke-width="5"/>
        <text x="260" y="145" font-family="sans-serif" font-size="14" font-weight="bold">4 µF</text>
        <line x1="285" y1="110" x2="345" y2="110" stroke="#1e293b" stroke-width="3"/>
        <line x1="345" y1="30" x2="345" y2="110" stroke="#1e293b" stroke-width="3"/>
        <line x1="345" y1="70" x2="390" y2="70" stroke="#1e293b" stroke-width="3"/>
        <!-- loop wires -->
        <line x1="390" y1="70" x2="390" y2="200" stroke="#1e293b" stroke-width="3"/>
        <line x1="50" y1="70" x2="50" y2="200" stroke="#1e293b" stroke-width="3"/>
        <!-- bottom wire with switch S and 10V battery -->
        <line x1="50" y1="200" x2="160" y2="200" stroke="#1e293b" stroke-width="3"/>
        <circle cx="160" cy="200" r="3.5" fill="#1e293b"/>
        <line x1="160" y1="200" x2="195" y2="180" stroke="#dc2626" stroke-width="3"/>
        <circle cx="205" cy="200" r="3.5" fill="#1e293b"/>
        <text x="175" y="170" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">S</text>
        <line x1="205" y1="200" x2="270" y2="200" stroke="#1e293b" stroke-width="3"/>
        <!-- 10V battery -->
        <line x1="270" y1="185" x2="270" y2="215" stroke="#1e293b" stroke-width="5"/>
        <line x1="280" y1="192" x2="280" y2="208" stroke="#1e293b" stroke-width="3"/>
        <text x="260" y="235" font-family="sans-serif" font-size="16" font-weight="bold">10 V</text>
        <line x1="280" y1="200" x2="390" y2="200" stroke="#1e293b" stroke-width="3"/>
      </g>
    </svg>
  `);

  // Q114: Bridge network with C, 2C, 3C, 4C, 5C
  await saveSvgAsPng('batch2_q114_bridge.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(100, 30)">
        <!-- Outer rectangle -->
        <line x1="40" y1="60" x2="40" y2="240" stroke="#1e293b" stroke-width="3"/>
        <line x1="360" y1="60" x2="360" y2="240" stroke="#1e293b" stroke-width="3"/>
        <!-- Top horizontal with C and 2C -->
        <line x1="40" y1="60" x2="120" y2="60" stroke="#1e293b" stroke-width="3"/>
        <line x1="120" y1="45" x2="120" y2="75" stroke="#1e293b" stroke-width="5"/>
        <line x1="135" y1="45" x2="135" y2="75" stroke="#1e293b" stroke-width="5"/>
        <text x="120" y="35" font-family="sans-serif" font-size="16" font-weight="bold">C</text>
        <line x1="135" y1="60" x2="265" y2="60" stroke="#1e293b" stroke-width="3"/>
        <line x1="265" y1="45" x2="265" y2="75" stroke="#1e293b" stroke-width="5"/>
        <line x1="280" y1="45" x2="280" y2="75" stroke="#1e293b" stroke-width="5"/>
        <text x="265" y="35" font-family="sans-serif" font-size="16" font-weight="bold">2C</text>
        <line x1="280" y1="60" x2="360" y2="60" stroke="#1e293b" stroke-width="3"/>
        <!-- Middle horizontal with 5C -->
        <line x1="40" y1="150" x2="185" y2="150" stroke="#1e293b" stroke-width="3"/>
        <line x1="185" y1="135" x2="185" y2="165" stroke="#1e293b" stroke-width="5"/>
        <line x1="200" y1="135" x2="200" y2="165" stroke="#1e293b" stroke-width="5"/>
        <text x="185" y="125" font-family="sans-serif" font-size="16" font-weight="bold">5C</text>
        <line x1="200" y1="150" x2="360" y2="150" stroke="#1e293b" stroke-width="3"/>
        <!-- Vertical capacitors 3C and 4C -->
        <line x1="160" y1="60" x2="160" y2="90" stroke="#1e293b" stroke-width="3"/>
        <line x1="145" y1="90" x2="175" y2="90" stroke="#1e293b" stroke-width="5"/>
        <line x1="145" y1="105" x2="175" y2="105" stroke="#1e293b" stroke-width="5"/>
        <text x="115" y="103" font-family="sans-serif" font-size="16" font-weight="bold">3C</text>
        <line x1="160" y1="105" x2="160" y2="150" stroke="#1e293b" stroke-width="3"/>

        <line x1="240" y1="60" x2="240" y2="90" stroke="#1e293b" stroke-width="3"/>
        <line x1="225" y1="90" x2="255" y2="90" stroke="#1e293b" stroke-width="5"/>
        <line x1="225" y1="105" x2="255" y2="105" stroke="#1e293b" stroke-width="5"/>
        <text x="260" y="103" font-family="sans-serif" font-size="16" font-weight="bold">4C</text>
        <line x1="240" y1="105" x2="240" y2="150" stroke="#1e293b" stroke-width="3"/>
        <!-- Bottom battery V -->
        <line x1="40" y1="240" x2="190" y2="240" stroke="#1e293b" stroke-width="3"/>
        <line x1="190" y1="225" x2="190" y2="255" stroke="#1e293b" stroke-width="5"/>
        <line x1="200" y1="232" x2="200" y2="248" stroke="#1e293b" stroke-width="3"/>
        <text x="190" y="275" font-family="sans-serif" font-size="16" font-weight="bold">V</text>
        <line x1="200" y1="240" x2="360" y2="240" stroke="#1e293b" stroke-width="3"/>
      </g>
    </svg>
  `);

  // Q115: Capacitor 1 in series with parallel pair 2 and 3
  await saveSvgAsPng('batch2_q115_breakdown_network.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(100, 80)">
        <line x1="30" y1="90" x2="110" y2="90" stroke="#1e293b" stroke-width="3"/>
        <circle cx="30" cy="90" r="4" fill="#1e293b"/>
        <!-- Capacitor 1 -->
        <line x1="110" y1="65" x2="110" y2="115" stroke="#1e293b" stroke-width="5"/>
        <line x1="125" y1="65" x2="125" y2="115" stroke="#1e293b" stroke-width="5"/>
        <text x="95" y="55" font-family="sans-serif" font-size="16" font-weight="bold">1</text>
        <line x1="125" y1="90" x2="200" y2="90" stroke="#1e293b" stroke-width="3"/>
        <!-- Parallel split -->
        <line x1="200" y1="40" x2="200" y2="140" stroke="#1e293b" stroke-width="3"/>
        <!-- Capacitor 2 (top) -->
        <line x1="200" y1="40" x2="250" y2="40" stroke="#1e293b" stroke-width="3"/>
        <line x1="250" y1="20" x2="250" y2="60" stroke="#1e293b" stroke-width="5"/>
        <line x1="265" y1="20" x2="265" y2="60" stroke="#1e293b" stroke-width="5"/>
        <text x="275" y="35" font-family="sans-serif" font-size="16" font-weight="bold">2</text>
        <line x1="265" y1="40" x2="320" y2="40" stroke="#1e293b" stroke-width="3"/>
        <!-- Capacitor 3 (bottom) -->
        <line x1="200" y1="140" x2="250" y2="140" stroke="#1e293b" stroke-width="3"/>
        <line x1="250" y1="120" x2="250" y2="160" stroke="#1e293b" stroke-width="5"/>
        <line x1="265" y1="120" x2="265" y2="160" stroke="#1e293b" stroke-width="5"/>
        <text x="275" y="155" font-family="sans-serif" font-size="16" font-weight="bold">3</text>
        <line x1="265" y1="140" x2="320" y2="140" stroke="#1e293b" stroke-width="3"/>
        <line x1="320" y1="40" x2="320" y2="140" stroke="#1e293b" stroke-width="3"/>
        <line x1="320" y1="90" x2="390" y2="90" stroke="#1e293b" stroke-width="3"/>
        <circle cx="390" cy="90" r="4" fill="#1e293b"/>
      </g>
    </svg>
  `);

  console.log('Batch 2 diagrams generated!');
}

generateAll().catch(console.error);
