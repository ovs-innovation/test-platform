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
  // Q80: Cylindrical shells R, 2R, 2sqrt(2)R
  await saveSvgAsPng('batch2_q80_cylinders.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(300, 175)">
        <circle r="40" fill="none" stroke="#1e293b" stroke-width="3"/>
        <circle r="80" fill="none" stroke="#1e293b" stroke-width="3"/>
        <circle r="113" fill="none" stroke="#1e293b" stroke-width="3"/>
        <!-- center dot -->
        <circle cx="0" cy="0" r="3" fill="#1e293b"/>
        <!-- radii -->
        <line x1="0" y1="0" x2="35" y2="-20" stroke="#64748b" stroke-dasharray="3,3" stroke-width="2"/>
        <text x="15" y="-22" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">R</text>
        <line x1="0" y1="0" x2="-65" y2="45" stroke="#64748b" stroke-dasharray="3,3" stroke-width="2"/>
        <text x="-45" y="40" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">2R</text>
        <line x1="0" y1="0" x2="90" y2="68" stroke="#64748b" stroke-dasharray="3,3" stroke-width="2"/>
        <text x="50" y="75" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">2√2 R</text>
        <!-- connection between 1 and 3 -->
        <path d="M 0 -40 C 0 -60, 40 -130, 0 -113" fill="none" stroke="#dc2626" stroke-width="3"/>
        <text x="-120" y="-120" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626">Inner &amp; Outer connected</text>
      </g>
    </svg>
  `);

  // Q81: 4 plates with dielectric K=2
  await saveSvgAsPng('batch2_q81_four_plates.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Plates 1, 2, 3, 4 -->
      <line x1="200" y1="80" x2="420" y2="80" stroke="#1e293b" stroke-width="8"/>
      <line x1="200" y1="140" x2="420" y2="140" stroke="#1e293b" stroke-width="8"/>
      <!-- Dielectric K=2 between plates 2 and 3 -->
      <rect x="200" y="144" width="220" height="52" fill="#cbd5e1" stroke="#94a3b8" stroke-dasharray="4,4"/>
      <text x="290" y="175" font-family="sans-serif" font-size="18" font-weight="bold" fill="#334155">K = 2</text>
      <line x1="200" y1="200" x2="420" y2="200" stroke="#1e293b" stroke-width="8"/>
      <line x1="200" y1="260" x2="420" y2="260" stroke="#1e293b" stroke-width="8"/>
      <!-- Plate numbers -->
      <text x="175" y="85" font-family="sans-serif" font-size="16" font-weight="bold" fill="#64748b">1</text>
      <text x="175" y="145" font-family="sans-serif" font-size="16" font-weight="bold" fill="#64748b">2</text>
      <text x="175" y="205" font-family="sans-serif" font-size="16" font-weight="bold" fill="#64748b">3</text>
      <text x="175" y="265" font-family="sans-serif" font-size="16" font-weight="bold" fill="#64748b">4</text>
      <!-- Connections: 1 and 3 to A -->
      <path d="M 420 80 L 460 80 L 460 140 L 490 140" fill="none" stroke="#2563eb" stroke-width="3"/>
      <path d="M 420 200 L 460 200 L 460 140" fill="none" stroke="#2563eb" stroke-width="3"/>
      <circle cx="490" cy="140" r="4" fill="#2563eb"/>
      <text x="505" y="145" font-family="sans-serif" font-size="20" font-weight="bold" fill="#2563eb">A</text>
      <!-- Connection: 4 to B -->
      <line x1="200" y1="260" x2="140" y2="260" stroke="#2563eb" stroke-width="3"/>
      <circle cx="140" cy="260" r="4" fill="#2563eb"/>
      <text x="115" y="265" font-family="sans-serif" font-size="20" font-weight="bold" fill="#2563eb">B</text>
      <!-- Distance d label -->
      <line x1="430" y1="80" x2="430" y2="140" stroke="#64748b" stroke-width="1.5"/>
      <text x="435" y="115" font-family="sans-serif" font-size="14" fill="#64748b">d</text>
    </svg>
  `);

  // Q82: 2 uF (20 uC) and 5 uF (50 uC) switch
  await saveSvgAsPng('batch2_q82_switch_heat.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Top branch: 2 uF with +20 uC, -20 uC -->
      <line x1="150" y1="120" x2="280" y2="120" stroke="#1e293b" stroke-width="3"/>
      <line x1="280" y1="95" x2="280" y2="145" stroke="#1e293b" stroke-width="5"/>
      <line x1="300" y1="95" x2="300" y2="145" stroke="#1e293b" stroke-width="5"/>
      <line x1="300" y1="120" x2="450" y2="120" stroke="#1e293b" stroke-width="3"/>
      <text x="275" y="80" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b">+20µC   -20µC</text>
      <text x="275" y="165" font-family="sans-serif" font-size="14" font-weight="bold" fill="#2563eb">2 µF</text>
      <!-- Bottom branch: 5 uF with +50 uC, -50 uC -->
      <line x1="150" y1="220" x2="280" y2="220" stroke="#1e293b" stroke-width="3"/>
      <line x1="280" y1="195" x2="280" y2="245" stroke="#1e293b" stroke-width="5"/>
      <line x1="300" y1="195" x2="300" y2="245" stroke="#1e293b" stroke-width="5"/>
      <line x1="300" y1="220" x2="450" y2="220" stroke="#1e293b" stroke-width="3"/>
      <text x="275" y="190" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b">+50µC   -50µC</text>
      <text x="275" y="265" font-family="sans-serif" font-size="14" font-weight="bold" fill="#2563eb">5 µF</text>
      <!-- Left vertical wire -->
      <line x1="150" y1="120" x2="150" y2="220" stroke="#1e293b" stroke-width="3"/>
      <!-- Right vertical wire with switch S -->
      <line x1="450" y1="120" x2="450" y2="155" stroke="#1e293b" stroke-width="3"/>
      <circle cx="450" cy="155" r="4" fill="#1e293b"/>
      <line x1="450" y1="185" x2="435" y2="160" stroke="#dc2626" stroke-width="3"/>
      <circle cx="450" cy="185" r="4" fill="#1e293b"/>
      <line x1="450" y1="185" x2="450" y2="220" stroke="#1e293b" stroke-width="3"/>
      <text x="465" y="175" font-family="sans-serif" font-size="18" font-weight="bold" fill="#dc2626">S</text>
    </svg>
  `);

  // Q83: Electric field lines between A and B
  await saveSvgAsPng('batch2_q83_field_lines.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Curved diverging electric field lines -->
      <path d="M 150 175 Q 300 130 450 100" fill="none" stroke="#2563eb" stroke-width="3"/>
      <polygon points="450,100 435,98 440,108" fill="#2563eb"/>
      <path d="M 150 175 Q 300 175 450 175" fill="none" stroke="#2563eb" stroke-width="3"/>
      <polygon points="450,175 435,170 435,180" fill="#2563eb"/>
      <path d="M 150 175 Q 300 220 450 250" fill="none" stroke="#2563eb" stroke-width="3"/>
      <polygon points="450,250 440,242 435,252" fill="#2563eb"/>
      <!-- Points A and B -->
      <circle cx="220" cy="175" r="5" fill="#dc2626"/>
      <text x="215" y="160" font-family="sans-serif" font-size="20" font-weight="bold" fill="#dc2626">A</text>
      <circle cx="380" cy="175" r="5" fill="#dc2626"/>
      <text x="375" y="160" font-family="sans-serif" font-size="20" font-weight="bold" fill="#dc2626">B</text>
    </svg>
  `);

  // Q84: Electron between plates A and B
  await saveSvgAsPng('batch2_q84_electron_plates.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Top plate B (+ plate) -->
      <line x1="200" y1="80" x2="400" y2="80" stroke="#1e293b" stroke-width="8"/>
      <text x="415" y="85" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e293b">B (+)</text>
      <!-- Bottom plate A (- plate) -->
      <line x1="200" y1="260" x2="400" y2="260" stroke="#1e293b" stroke-width="8"/>
      <text x="415" y="265" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e293b">A (-)</text>
      <!-- Field arrows downwards -->
      <g stroke="#2563eb" stroke-width="2" fill="#2563eb">
        <line x1="250" y1="90" x2="250" y2="245"/>
        <polygon points="250,250 245,240 255,240"/>
        <line x1="300" y1="90" x2="300" y2="245"/>
        <polygon points="300,250 295,240 305,240"/>
        <line x1="350" y1="90" x2="350" y2="245"/>
        <polygon points="350,250 345,240 355,240"/>
      </g>
      <!-- Electron moving up -->
      <circle cx="300" cy="240" r="7" fill="#dc2626"/>
      <text x="280" y="245" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">e⁻</text>
      <line x1="300" y1="230" x2="300" y2="150" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="4,4"/>
      <polygon points="300,140 295,152 305,152" fill="#dc2626"/>
      <!-- Dimension d = 21 cm -->
      <line x1="160" y1="80" x2="160" y2="260" stroke="#64748b" stroke-width="2"/>
      <polyline points="155,90 160,80 165,90" fill="none" stroke="#64748b" stroke-width="2"/>
      <polyline points="155,250 160,260 165,250" fill="none" stroke="#64748b" stroke-width="2"/>
      <text x="95" y="175" font-family="sans-serif" font-size="16" font-weight="bold" fill="#64748b">21 cm</text>
      <text x="315" y="180" font-family="sans-serif" font-size="15" fill="#2563eb">E = 10⁴ N/C</text>
    </svg>
  `);

  // Q85: ABCDA rectangular path between plates
  await saveSvgAsPng('batch2_q85_path_abcda.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Plates +sigma and -sigma -->
      <line x1="150" y1="60" x2="150" y2="280" stroke="#dc2626" stroke-width="8"/>
      <text x="135" y="50" font-family="sans-serif" font-size="18" font-weight="bold" fill="#dc2626">+σ</text>
      <line x1="450" y1="60" x2="450" y2="280" stroke="#2563eb" stroke-width="8"/>
      <text x="445" y="50" font-family="sans-serif" font-size="18" font-weight="bold" fill="#2563eb">-σ</text>
      <!-- Electric field arrows -->
      <line x1="170" y1="170" x2="430" y2="170" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="2"/>
      <!-- Rectangular path ABCDA -->
      <rect x="220" y="110" width="160" height="120" fill="none" stroke="#0f172a" stroke-width="3"/>
      <!-- Path vertices -->
      <circle cx="220" cy="230" r="4" fill="#0f172a"/><text x="205" y="245" font-family="sans-serif" font-size="16" font-weight="bold">A</text>
      <circle cx="380" cy="230" r="4" fill="#0f172a"/><text x="390" y="245" font-family="sans-serif" font-size="16" font-weight="bold">B</text>
      <circle cx="380" cy="110" r="4" fill="#0f172a"/><text x="390" y="105" font-family="sans-serif" font-size="16" font-weight="bold">C</text>
      <circle cx="220" cy="110" r="4" fill="#0f172a"/><text x="205" y="105" font-family="sans-serif" font-size="16" font-weight="bold">D</text>
      <!-- Arrow from A to B -->
      <polygon points="310,230 295,225 295,235" fill="#0f172a"/>
      <text x="290" y="255" font-family="sans-serif" font-size="15" fill="#64748b">x</text>
      <text x="395" y="175" font-family="sans-serif" font-size="15" fill="#64748b">y</text>
    </svg>
  `);

  // Q86: Four charges on square with point P at 45 deg
  await saveSvgAsPng('batch2_q86_square_dipole.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(250, 180)">
        <!-- Axes -->
        <line x1="-150" y1="0" x2="180" y2="0" stroke="#64748b" stroke-width="2"/>
        <text x="185" y="5" font-family="sans-serif" font-size="16" font-weight="bold">x</text>
        <line x1="0" y1="120" x2="0" y2="-140" stroke="#64748b" stroke-width="2"/>
        <text x="-5" y="-145" font-family="sans-serif" font-size="16" font-weight="bold">y</text>
        <!-- Origin O -->
        <circle cx="0" cy="0" r="3" fill="#1e293b"/>
        <text x="-18" y="18" font-family="sans-serif" font-size="16" font-weight="bold">O</text>
        <!-- Charges at vertices on axes (side a, d = a/sqrt(2)) -->
        <!-- Right: +q -->
        <circle cx="50" cy="0" r="10" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
        <text x="46" y="5" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626">+</text>
        <!-- Left: -q -->
        <circle cx="-50" cy="0" r="10" fill="#e0e7ff" stroke="#2563eb" stroke-width="2"/>
        <text x="-54" y="4" font-family="sans-serif" font-size="14" font-weight="bold" fill="#2563eb">-</text>
        <!-- Top: +q -->
        <circle cx="0" cy="-50" r="10" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
        <text x="-4" y="-45" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626">+</text>
        <!-- Bottom: -q -->
        <circle cx="0" cy="50" r="10" fill="#e0e7ff" stroke="#2563eb" stroke-width="2"/>
        <text x="-4" y="54" font-family="sans-serif" font-size="14" font-weight="bold" fill="#2563eb">-</text>
        <!-- Point P at 45 degrees -->
        <line x1="0" y1="0" x2="160" y2="-160" stroke="#0f172a" stroke-width="2.5"/>
        <circle cx="160" cy="-160" r="5" fill="#0f172a"/>
        <text x="170" y="-160" font-family="sans-serif" font-size="18" font-weight="bold">P</text>
        <!-- Angle arc 45 deg -->
        <path d="M 40 0 A 40 40 0 0 0 28 -28" fill="none" stroke="#0f172a" stroke-width="1.5"/>
        <text x="45" y="-15" font-family="sans-serif" font-size="14" font-weight="bold">45°</text>
        <text x="80" y="-100" font-family="sans-serif" font-size="16" fill="#64748b">r</text>
      </g>
    </svg>
  `);

  // Q87: Dipole interaction
  await saveSvgAsPng('batch2_q87_dipole_interaction.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(200, 250)">
        <!-- Dipole p1 along horizontal -->
        <line x1="-50" y1="0" x2="80" y2="0" stroke="#64748b" stroke-width="1.5"/>
        <line x1="0" y1="0" x2="50" y2="0" stroke="#1e293b" stroke-width="4"/>
        <polygon points="50,0 40,-5 40,5" fill="#1e293b"/>
        <text x="15" y="25" font-family="sans-serif" font-size="18" font-weight="bold">p₁</text>
        <!-- Ray at angle theta -->
        <line x1="0" y1="0" x2="180" y2="-150" stroke="#0f172a" stroke-width="2.5"/>
        <!-- Dipole p2 along ray -->
        <line x1="180" y1="-150" x2="225" y2="-187.5" stroke="#1e293b" stroke-width="4"/>
        <polygon points="225,-187.5 212,-187 218,-177" fill="#1e293b"/>
        <text x="235" y="-180" font-family="sans-serif" font-size="18" font-weight="bold">p₂</text>
        <!-- Angle theta arc -->
        <path d="M 45 0 A 45 45 0 0 0 35 -29" fill="none" stroke="#0f172a" stroke-width="2"/>
        <text x="48" y="-15" font-family="sans-serif" font-size="16" font-weight="bold">θ</text>
        <!-- Dimension r offset -->
        <line x1="0" y1="0" x2="-30" y2="-36" stroke="#64748b" stroke-width="1.5"/>
        <line x1="180" y1="-150" x2="150" y2="-186" stroke="#64748b" stroke-width="1.5"/>
        <line x1="-30" y1="-36" x2="150" y2="-186" stroke="#64748b" stroke-width="2"/>
        <polyline points="-22,-43 -30,-36 -25,-28" fill="none" stroke="#64748b" stroke-width="2"/>
        <polyline points="142,-179 150,-186 145,-194" fill="none" stroke="#64748b" stroke-width="2"/>
        <text x="45" y="-120" font-family="sans-serif" font-size="18" font-weight="bold" fill="#64748b">r</text>
      </g>
    </svg>
  `);

  // Q88: Bullet fired at charged sphere
  await saveSvgAsPng('batch2_q88_bullet_sphere.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(380, 175)">
        <!-- Charged sphere +q, radius R -->
        <circle cx="0" cy="0" r="90" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
        <line x1="0" y1="0" x2="65" y2="-62" stroke="#b45309" stroke-width="2"/>
        <polygon points="65,-62 55,-57 58,-67" fill="#b45309"/>
        <text x="20" y="-45" font-family="sans-serif" font-size="16" font-weight="bold" fill="#b45309">R</text>
        <text x="-15" y="5" font-family="sans-serif" font-size="18" font-weight="bold" fill="#b45309">+q</text>
        <!-- dashed trajectory through center -->
        <line x1="-250" y1="0" x2="150" y2="0" stroke="#64748b" stroke-dasharray="4,4" stroke-width="1.5"/>
        <!-- bullet -->
        <circle cx="-180" cy="0" r="6" fill="#dc2626"/>
        <line x1="-180" y1="0" x2="-140" y2="0" stroke="#dc2626" stroke-width="3"/>
        <polygon points="-135,0 -145,-4 -145,4" fill="#dc2626"/>
        <text x="-215" y="-15" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">q, m (u)</text>
      </g>
    </svg>
  `);

  // Q89: Concentric conducting shell with inner a and outer b
  await saveSvgAsPng('batch2_q89_concentric_shell.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(300, 175)">
        <!-- Shell with inner radius a, outer radius b -->
        <circle cx="0" cy="0" r="100" fill="#e2e8f0" stroke="#334155" stroke-width="3"/>
        <circle cx="0" cy="0" r="50" fill="#ffffff" stroke="#334155" stroke-width="3"/>
        <!-- Central point charge +Q -->
        <circle cx="0" cy="0" r="5" fill="#dc2626"/>
        <text x="8" y="5" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">+Q</text>
        <!-- Total charge -q on shell -->
        <text x="75" y="-105" font-family="sans-serif" font-size="16" font-weight="bold" fill="#2563eb">-q</text>
        <!-- Radii a and b -->
        <line x1="0" y1="0" x2="35" y2="35" stroke="#64748b" stroke-width="2"/>
        <text x="15" y="40" font-family="sans-serif" font-size="14" font-weight="bold">a</text>
        <line x1="0" y1="0" x2="-70" y2="-70" stroke="#64748b" stroke-width="2"/>
        <text x="-50" y="-60" font-family="sans-serif" font-size="14" font-weight="bold">b</text>
      </g>
    </svg>
  `);

  // Q90: Parallel plates Q1 and Q2 with switch to ground
  await saveSvgAsPng('batch2_q90_grounded_plate.png', `
    <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g transform="translate(250, 175)">
        <!-- Left Plate Q1 -->
        <rect x="-30" y="-80" width="10" height="160" fill="#94a3b8" stroke="#1e293b" stroke-width="2"/>
        <text x="-35" y="-95" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1e293b">Q₁</text>
        <!-- Right Plate Q2 -->
        <rect x="70" y="-80" width="10" height="160" fill="#94a3b8" stroke="#1e293b" stroke-width="2"/>
        <text x="65" y="-95" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1e293b">Q₂</text>
        <!-- Switch to ground from Plate 1 -->
        <line x1="-25" y1="20" x2="-25" y2="60" stroke="#2563eb" stroke-width="2.5"/>
        <line x1="-25" y1="60" x2="5" y2="60" stroke="#2563eb" stroke-width="2.5"/>
        <line x1="5" y1="60" x2="5" y2="85" stroke="#2563eb" stroke-width="2.5"/>
        <circle cx="5" cy="85" r="3.5" fill="#2563eb"/>
        <!-- Switch blade -->
        <line x1="5" y1="105" x2="-10" y2="88" stroke="#dc2626" stroke-width="2.5"/>
        <circle cx="5" cy="105" r="3.5" fill="#2563eb"/>
        <line x1="5" y1="105" x2="5" y2="125" stroke="#2563eb" stroke-width="2.5"/>
        <!-- Ground symbol -->
        <line x1="-10" y1="125" x2="20" y2="125" stroke="#1e293b" stroke-width="3"/>
        <line x1="-5" y1="130" x2="15" y2="130" stroke="#1e293b" stroke-width="2.5"/>
        <line x1="0" y1="135" x2="10" y2="135" stroke="#1e293b" stroke-width="2"/>
      </g>
    </svg>
  `);

  console.log('Batch 1 diagrams generated!');
}

generateAll().catch(console.error);
