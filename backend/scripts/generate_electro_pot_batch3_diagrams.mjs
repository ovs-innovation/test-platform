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
  // Q183: Bridge network on triangle
  await saveSvgAsPng('batch3_q183_bridge_triangle.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(140, 50)">
        <!-- Node A -->
        <circle cx="30" cy="220" r="4" fill="#1e293b"/>
        <text x="10" y="225" font-family="sans-serif" font-size="18" font-weight="bold">A</text>

        <!-- Vertical branch: 1 uF capacitor -->
        <line x1="30" y1="220" x2="30" y2="135" stroke="#1e293b" stroke-width="3"/>
        <line x1="15" y1="135" x2="45" y2="135" stroke="#1e293b" stroke-width="5"/>
        <line x1="15" y1="120" x2="45" y2="120" stroke="#1e293b" stroke-width="5"/>
        <text x="-15" y="132" font-family="sans-serif" font-size="14" font-weight="bold">1 µF</text>
        <line x1="30" y1="120" x2="30" y2="30" stroke="#1e293b" stroke-width="3"/>

        <!-- Horizontal branch: 2 uF capacitor -->
        <line x1="30" y1="220" x2="115" y2="220" stroke="#1e293b" stroke-width="3"/>
        <line x1="115" y1="205" x2="115" y2="235" stroke="#1e293b" stroke-width="5"/>
        <line x1="130" y1="205" x2="130" y2="235" stroke="#1e293b" stroke-width="5"/>
        <text x="112" y="255" font-family="sans-serif" font-size="14" font-weight="bold">2 µF</text>
        <line x1="130" y1="220" x2="220" y2="220" stroke="#1e293b" stroke-width="3"/>

        <!-- Hypotenuse: from (30, 30) to (220, 220) -->
        <line x1="30" y1="30" x2="90" y2="90" stroke="#1e293b" stroke-width="3"/>

        <!-- Square bridge on hypotenuse -->
        <!-- Corner 1 on hypotenuse: (90, 90) -->
        <!-- Corner 2 on hypotenuse: (160, 160) -->
        <!-- Along hypotenuse between Corner 1 and 2: 5 uF capacitor -->
        <line x1="90" y1="90" x2="120" y2="120" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="112" y1="128" x2="128" y2="112" stroke="#1e293b" stroke-width="4"/>
        <line x1="122" y1="138" x2="138" y2="122" stroke="#1e293b" stroke-width="4"/>
        <text x="75" y="145" font-family="sans-serif" font-size="13" font-weight="bold">5 µF</text>
        <line x1="130" y1="130" x2="160" y2="160" stroke="#1e293b" stroke-width="2.5"/>

        <!-- From Corner 2 (160, 160) to bottom-right (220, 220) -->
        <line x1="160" y1="160" x2="220" y2="220" stroke="#1e293b" stroke-width="3"/>

        <!-- Top-left side of square: 3 uF -->
        <line x1="90" y1="90" x2="110" y2="70" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="102" y1="62" x2="118" y2="78" stroke="#1e293b" stroke-width="4"/>
        <line x1="112" y1="52" x2="128" y2="68" stroke="#1e293b" stroke-width="4"/>
        <text x="80" y="60" font-family="sans-serif" font-size="13" font-weight="bold">3 µF</text>
        <line x1="120" y1="60" x2="140" y2="40" stroke="#1e293b" stroke-width="2.5"/>

        <!-- Top-right side of square: 6 uF -->
        <line x1="140" y1="40" x2="170" y2="70" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="162" y1="78" x2="178" y2="62" stroke="#1e293b" stroke-width="4"/>
        <line x1="172" y1="88" x2="188" y2="72" stroke="#1e293b" stroke-width="4"/>
        <text x="185" y="60" font-family="sans-serif" font-size="13" font-weight="bold">6 µF</text>
        <line x1="180" y1="80" x2="210" y2="110" stroke="#1e293b" stroke-width="2.5"/>

        <!-- Bottom-right side of square: 4 uF -->
        <line x1="160" y1="160" x2="180" y2="140" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="172" y1="132" x2="188" y2="148" stroke="#1e293b" stroke-width="4"/>
        <line x1="182" y1="122" x2="198" y2="138" stroke="#1e293b" stroke-width="4"/>
        <text x="195" y="160" font-family="sans-serif" font-size="13" font-weight="bold">4 µF</text>
        <line x1="190" y1="130" x2="210" y2="110" stroke="#1e293b" stroke-width="2.5"/>

        <!-- Node B (at right corner: 210, 110) -->
        <line x1="210" y1="110" x2="270" y2="110" stroke="#1e293b" stroke-width="3"/>
        <circle cx="270" cy="110" r="4" fill="#1e293b"/>
        <text x="285" y="115" font-family="sans-serif" font-size="18" font-weight="bold">B</text>
      </g>
    </svg>
  `);

  // Q187: Symmetrical loop network between P and Q
  await saveSvgAsPng('batch3_q187_symmetrical_loop.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(150, 60)">
        <!-- Top horizontal with P -->
        <line x1="30" y1="40" x2="100" y2="40" stroke="#1e293b" stroke-width="3"/>
        <line x1="100" y1="25" x2="100" y2="55" stroke="#1e293b" stroke-width="5"/>
        <line x1="112" y1="25" x2="112" y2="55" stroke="#1e293b" stroke-width="5"/>
        <text x="95" y="18" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="112" y1="40" x2="185" y2="40" stroke="#1e293b" stroke-width="3"/>
        
        <!-- Point P -->
        <circle cx="150" cy="40" r="4" fill="#1e293b"/>
        <text x="145" y="25" font-family="sans-serif" font-size="18" font-weight="bold">P</text>

        <line x1="185" y1="25" x2="185" y2="55" stroke="#1e293b" stroke-width="5"/>
        <line x1="197" y1="25" x2="197" y2="55" stroke="#1e293b" stroke-width="5"/>
        <text x="185" y="18" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="197" y1="40" x2="270" y2="40" stroke="#1e293b" stroke-width="3"/>

        <!-- Middle horizontal with Q -->
        <line x1="30" y1="120" x2="100" y2="120" stroke="#1e293b" stroke-width="3"/>
        <line x1="100" y1="105" x2="100" y2="135" stroke="#1e293b" stroke-width="5"/>
        <line x1="112" y1="105" x2="112" y2="135" stroke="#1e293b" stroke-width="5"/>
        <text x="95" y="98" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="112" y1="120" x2="185" y2="120" stroke="#1e293b" stroke-width="3"/>

        <!-- Point Q -->
        <circle cx="150" cy="120" r="4" fill="#1e293b"/>
        <text x="145" y="105" font-family="sans-serif" font-size="18" font-weight="bold">Q</text>

        <line x1="185" y1="105" x2="185" y2="135" stroke="#1e293b" stroke-width="5"/>
        <line x1="197" y1="105" x2="197" y2="135" stroke="#1e293b" stroke-width="5"/>
        <text x="185" y="98" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="197" y1="120" x2="270" y2="120" stroke="#1e293b" stroke-width="3"/>

        <!-- Connecting outer loop -->
        <line x1="30" y1="40" x2="30" y2="200" stroke="#1e293b" stroke-width="3"/>
        <line x1="270" y1="40" x2="270" y2="200" stroke="#1e293b" stroke-width="3"/>
        <line x1="30" y1="200" x2="270" y2="200" stroke="#1e293b" stroke-width="3"/>
      </g>
    </svg>
  `);

  // Q191: Semicircular path of electron in vertical plane around +Q
  await saveSvgAsPng('batch3_q191_vertical_semicircle.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(300, 175)">
        <!-- Center charge +Q -->
        <circle cx="0" cy="0" r="16" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
        <text x="-10" y="6" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ca8a04">+Q</text>

        <!-- Vertical diameter from A (bottom) to B (top) -->
        <line x1="0" y1="-100" x2="0" y2="100" stroke="#1e293b" stroke-width="3"/>

        <!-- Point B (top) -->
        <circle cx="0" cy="-100" r="5" fill="#1e293b"/>
        <text x="-25" y="-100" font-family="sans-serif" font-size="18" font-weight="bold">B</text>

        <!-- Point A (bottom) -->
        <circle cx="0" cy="100" r="5" fill="#1e293b"/>
        <text x="-25" y="105" font-family="sans-serif" font-size="18" font-weight="bold">A</text>

        <!-- Radius indicators -->
        <text x="8" y="-45" font-family="sans-serif" font-size="15" font-style="italic" fill="#64748b">r</text>
        <text x="8" y="55" font-family="sans-serif" font-size="15" font-style="italic" fill="#64748b">r</text>

        <!-- Semicircular path from A to B -->
        <path d="M 0 100 A 100 100 0 0 0 0 -100" fill="none" stroke="#2563eb" stroke-width="3"/>
        <!-- Arrowhead on semicircle pointing upward -->
        <polygon points="100,0 93,-12 107,-12" fill="#2563eb"/>
      </g>
    </svg>
  `);

  // Q198: Two parallel capacitors (K=4 and air C) across battery V
  await saveSvgAsPng('batch3_q198_two_capacitors_dielectric.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(180, 50)">
        <!-- Top horizontal with dielectric slab K=4 -->
        <line x1="40" y1="40" x2="105" y2="40" stroke="#1e293b" stroke-width="3"/>
        <line x1="105" y1="20" x2="105" y2="60" stroke="#1e293b" stroke-width="5"/>
        <rect x="108" y="20" width="24" height="40" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5"/>
        <line x1="135" y1="20" x2="135" y2="60" stroke="#1e293b" stroke-width="5"/>
        <text x="100" y="10" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1e3a8a">K = 4</text>
        <line x1="135" y1="40" x2="200" y2="40" stroke="#1e293b" stroke-width="3"/>

        <!-- Middle horizontal with air capacitor C -->
        <line x1="40" y1="120" x2="110" y2="120" stroke="#1e293b" stroke-width="3"/>
        <line x1="110" y1="100" x2="110" y2="140" stroke="#1e293b" stroke-width="5"/>
        <line x1="125" y1="100" x2="125" y2="140" stroke="#1e293b" stroke-width="5"/>
        <text x="112" y="160" font-family="sans-serif" font-size="16" font-weight="bold">C</text>
        <line x1="125" y1="120" x2="200" y2="120" stroke="#1e293b" stroke-width="3"/>

        <!-- Vertical links -->
        <line x1="40" y1="40" x2="40" y2="200" stroke="#1e293b" stroke-width="3"/>
        <line x1="200" y1="40" x2="200" y2="200" stroke="#1e293b" stroke-width="3"/>

        <!-- Bottom wire with battery V -->
        <line x1="40" y1="200" x2="110" y2="200" stroke="#1e293b" stroke-width="3"/>
        <line x1="110" y1="185" x2="110" y2="215" stroke="#1e293b" stroke-width="5"/>
        <line x1="120" y1="192" x2="120" y2="208" stroke="#1e293b" stroke-width="3"/>
        <text x="110" y="240" font-family="sans-serif" font-size="16" font-weight="bold">V</text>
        <line x1="120" y1="200" x2="200" y2="200" stroke="#1e293b" stroke-width="3"/>
      </g>
    </svg>
  `);

  // Q200: Ladder network between A and B
  await saveSvgAsPng('batch3_q200_ladder_network.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(100, 50)">
        <!-- Top horizontal line: C, Node A, C, Node B -->
        <line x1="30" y1="50" x2="75" y2="50" stroke="#1e293b" stroke-width="3"/>
        <line x1="75" y1="35" x2="75" y2="65" stroke="#1e293b" stroke-width="5"/>
        <line x1="87" y1="35" x2="87" y2="65" stroke="#1e293b" stroke-width="5"/>
        <text x="75" y="25" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="87" y1="50" x2="240" y2="50" stroke="#1e293b" stroke-width="3"/>

        <!-- Terminal A -->
        <circle cx="240" cy="50" r="4" fill="#1e293b"/>
        <text x="235" y="35" font-family="sans-serif" font-size="18" font-weight="bold">A</text>

        <!-- Capacitor between A and B -->
        <line x1="240" y1="50" x2="285" y2="50" stroke="#1e293b" stroke-width="3"/>
        <line x1="285" y1="35" x2="285" y2="65" stroke="#1e293b" stroke-width="5"/>
        <line x1="297" y1="35" x2="297" y2="65" stroke="#1e293b" stroke-width="5"/>
        <text x="285" y="25" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="297" y1="50" x2="330" y2="50" stroke="#1e293b" stroke-width="3"/>
        
        <!-- Terminal B -->
        <circle cx="330" cy="50" r="4" fill="#1e293b"/>
        <text x="345" y="55" font-family="sans-serif" font-size="18" font-weight="bold">B</text>

        <!-- Middle horizontal line -->
        <line x1="30" y1="120" x2="75" y2="120" stroke="#1e293b" stroke-width="3"/>
        <line x1="75" y1="105" x2="75" y2="135" stroke="#1e293b" stroke-width="5"/>
        <line x1="87" y1="105" x2="87" y2="135" stroke="#1e293b" stroke-width="5"/>
        <text x="75" y="95" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="87" y1="120" x2="140" y2="120" stroke="#1e293b" stroke-width="3"/>

        <line x1="140" y1="105" x2="140" y2="135" stroke="#1e293b" stroke-width="5"/>
        <line x1="152" y1="105" x2="152" y2="135" stroke="#1e293b" stroke-width="5"/>
        <text x="140" y="95" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="152" y1="120" x2="240" y2="120" stroke="#1e293b" stroke-width="3"/>

        <!-- Middle-right capacitor C -->
        <line x1="240" y1="120" x2="275" y2="120" stroke="#1e293b" stroke-width="3"/>
        <line x1="275" y1="105" x2="275" y2="135" stroke="#1e293b" stroke-width="5"/>
        <line x1="287" y1="105" x2="287" y2="135" stroke="#1e293b" stroke-width="5"/>
        <text x="275" y="95" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="287" y1="120" x2="330" y2="120" stroke="#1e293b" stroke-width="3"/>

        <!-- Left vertical line -->
        <line x1="30" y1="50" x2="30" y2="180" stroke="#1e293b" stroke-width="3"/>

        <!-- Bottom-left branch with capacitor C going up to node (120, 120) -->
        <line x1="30" y1="180" x2="85" y2="180" stroke="#1e293b" stroke-width="3"/>
        <line x1="85" y1="165" x2="85" y2="195" stroke="#1e293b" stroke-width="5"/>
        <line x1="97" y1="165" x2="97" y2="195" stroke="#1e293b" stroke-width="5"/>
        <text x="85" y="215" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="97" y1="180" x2="114" y2="180" stroke="#1e293b" stroke-width="3"/>
        <line x1="114" y1="180" x2="114" y2="120" stroke="#1e293b" stroke-width="3"/>

        <!-- Vertical line from A going down to (240, 180) -->
        <line x1="240" y1="50" x2="240" y2="180" stroke="#1e293b" stroke-width="3"/>
        <!-- Vertical line from B going down to (330, 180) -->
        <line x1="330" y1="50" x2="330" y2="180" stroke="#1e293b" stroke-width="3"/>

        <!-- Bottom-right capacitor C -->
        <line x1="240" y1="180" x2="275" y2="180" stroke="#1e293b" stroke-width="3"/>
        <line x1="275" y1="165" x2="275" y2="195" stroke="#1e293b" stroke-width="5"/>
        <line x1="287" y1="165" x2="287" y2="195" stroke="#1e293b" stroke-width="5"/>
        <text x="275" y="215" font-family="sans-serif" font-size="15" font-weight="bold">C</text>
        <line x1="287" y1="180" x2="330" y2="180" stroke="#1e293b" stroke-width="3"/>
      </g>
    </svg>
  `);

  console.log('Batch 3 diagrams generated successfully!');
}

generateAll().catch(console.error);
