import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const backendDir = 'c:/Users/rs004/OneDrive/Desktop/test-platform/backend/uploads/moving_charges';
const frontendDir = 'c:/Users/rs004/OneDrive/Desktop/test-platform/frontend/public/uploads/moving_charges';

[backendDir, frontendDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const diagrams = {
  // Q122: Conducting arc of radius r subtending angle theta at O
  'moving_charges_q122_conducting_arc.png': `
    <svg width="340" height="260" viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Origin O -->
      <circle cx="100" cy="200" r="4" fill="#0f172a" />
      <text x="75" y="205" font-size="16" font-weight="bold" fill="#0f172a">O</text>

      <!-- Radial bounding lines -->
      <line x1="100" y1="200" x2="100" y2="70" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4" />
      <line x1="100" y1="200" x2="212" y2="135" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4" />

      <!-- Arc carrying current I (radius = 130px, from 90° to 30°, theta = 60°) -->
      <!-- Center (100, 200). Start at (100, 70), end at (100 + 130*cos(30°), 200 - 130*sin(30°)) = (212.5, 135) -->
      <path d="M 100 70 A 130 130 0 0 1 212.5 135" fill="none" stroke="#0284c7" stroke-width="3" />
      <polygon points="160,88 150,80 152,92" fill="#0284c7" />
      <text x="165" y="80" font-size="16" font-style="italic" font-weight="bold" fill="#0284c7">I</text>

      <!-- Radius label r -->
      <text x="160" y="180" font-size="15" font-style="italic" font-weight="bold" fill="#475569">r</text>

      <!-- Angle theta arc -->
      <path d="M 100 160 A 40 40 0 0 1 134 180" fill="none" stroke="#0f172a" stroke-width="1.5" />
      <text x="110" y="165" font-size="16" font-style="italic" fill="#0f172a">θ</text>
    </svg>
  `,

  // Q126: Charge entering magnetic slab of width (b - a) and deflecting by 30°
  'moving_charges_q126_deflected_charge_slab.png': `
    <svg width="380" height="260" viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Coordinate axes -->
      <line x1="40" y1="130" x2="340" y2="130" stroke="#0f172a" stroke-width="2" />
      <polygon points="345,130 335,126 335,134" fill="#0f172a" />
      <text x="350" y="135" font-size="15" font-weight="bold" fill="#0f172a">x</text>

      <line x1="120" y1="230" x2="120" y2="30" stroke="#0f172a" stroke-width="2" />
      <polygon points="120,25 116,35 124,35" fill="#0f172a" />
      <text x="105" y="30" font-size="15" font-weight="bold" fill="#0f172a">y</text>

      <!-- Slab boundaries at x = a (180) and x = b (280) -->
      <line x1="180" y1="40" x2="180" y2="220" stroke="#0f172a" stroke-width="2" />
      <line x1="280" y1="40" x2="280" y2="220" stroke="#0f172a" stroke-width="2" />

      <!-- Field dots inside slab -->
      <g fill="#0284c7">
        <circle cx="205" cy="70" r="3" /><circle cx="230" cy="70" r="3" /><circle cx="255" cy="70" r="3" />
        <circle cx="205" cy="100" r="3" /><circle cx="230" cy="100" r="3" /><circle cx="255" cy="100" r="3" />
        <circle cx="205" cy="160" r="3" /><circle cx="230" cy="160" r="3" /><circle cx="255" cy="160" r="3" />
        <circle cx="205" cy="190" r="3" /><circle cx="230" cy="190" r="3" /><circle cx="255" cy="190" r="3" />
      </g>
      <text x="225" y="125" font-size="16" font-weight="bold" fill="#0284c7">B</text>

      <!-- Particle moving along x-axis -->
      <circle cx="80" cy="130" r="5" fill="#ef4444" />
      <line x1="80" y1="130" x2="160" y2="130" stroke="#ef4444" stroke-width="2" />
      <polygon points="160,130 150,126 150,134" fill="#ef4444" />
      <text x="140" y="120" font-size="15" font-style="italic" font-weight="bold" fill="#ef4444">v</text>

      <!-- Deflected trajectory inside field -->
      <path d="M 180 130 Q 230 130 280 158" fill="none" stroke="#ef4444" stroke-width="2.5" />
      <!-- Tangent indicating 30 deg -->
      <line x1="280" y1="158" x2="330" y2="187" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3" />

      <!-- Distances a and b -->
      <line x1="120" y1="210" x2="180" y2="210" stroke="#64748b" stroke-width="1.5" />
      <text x="145" y="205" font-size="14" font-weight="bold" fill="#64748b">a</text>
      <line x1="120" y1="230" x2="280" y2="230" stroke="#64748b" stroke-width="1.5" />
      <text x="200" y="245" font-size="14" font-weight="bold" fill="#64748b">b</text>
    </svg>
  `,

  // Q127: Major circular arc (270°) with current 40 A and radius r = 1.57 cm
  'moving_charges_q127_major_arc_270deg.png': `
    <svg width="340" height="260" viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Center Point P -->
      <circle cx="180" cy="130" r="4" fill="#ef4444" />
      <text x="175" y="120" font-size="16" font-weight="bold" fill="#ef4444">P</text>

      <!-- 90 deg corner lines from P -->
      <!-- Radial wire entering at 225° and exiting at 315° -->
      <line x1="70" y1="190" x2="140" y2="150" stroke="#0284c7" stroke-width="2.5" />
      <polygon points="120,162 110,165 115,155" fill="#0284c7" />

      <line x1="220" y1="150" x2="290" y2="190" stroke="#0284c7" stroke-width="2.5" />
      <polygon points="270,179 265,168 260,178" fill="#0284c7" />

      <!-- Major Arc from (140, 150) to (220, 150) around (180, 130), radius ~65px -->
      <!-- Subtending 270 deg -->
      <path d="M 140 150 A 65 65 0 1 1 220 150" fill="none" stroke="#0284c7" stroke-width="3" />

      <!-- Radius r indicator -->
      <line x1="180" y1="130" x2="135" y2="147" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />
      <text x="145" y="135" font-size="14" font-style="italic" font-weight="bold" fill="#64748b">r</text>

      <!-- 90 deg angle indicator -->
      <path d="M 160 142 A 25 25 0 0 0 200 142" fill="none" stroke="#0f172a" stroke-width="1.5" />
      <text x="168" y="160" font-size="13" font-weight="bold" fill="#0f172a">90°</text>
    </svg>
  `,

  // Q132: Wire abcdef bent in 3D in uniform field B along y
  'moving_charges_q132_3d_bent_wire.png': `
    <svg width="360" height="260" viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- 3D Axes: Origin at (120, 180) -->
      <!-- x-axis (down-left) -->
      <line x1="120" y1="180" x2="50" y2="230" stroke="#0f172a" stroke-width="2" />
      <polygon points="45,233 58,230 52,222" fill="#0f172a" />
      <text x="35" y="235" font-size="15" font-weight="bold" fill="#0f172a">x</text>

      <!-- y-axis (right) -->
      <line x1="120" y1="180" x2="280" y2="180" stroke="#0f172a" stroke-width="2" />
      <polygon points="285,180 275,176 275,184" fill="#0f172a" />
      <text x="290" y="185" font-size="15" font-weight="bold" fill="#0f172a">y</text>

      <!-- z-axis (up) -->
      <line x1="120" y1="180" x2="120" y2="40" stroke="#0f172a" stroke-width="2" />
      <polygon points="120,35 116,45 124,45" fill="#0f172a" />
      <text x="105" y="45" font-size="15" font-weight="bold" fill="#0f172a">z</text>

      <!-- Wire abcdef -->
      <!-- b at (70, 215) on x-axis. Segment ba to a at (160, 215) -->
      <line x1="70" y1="215" x2="160" y2="215" stroke="#0284c7" stroke-width="3" />
      <circle cx="160" cy="215" r="3.5" fill="#0284c7" />
      <text x="165" y="225" font-size="14" font-weight="bold" fill="#0f172a">a</text>
      <circle cx="70" cy="215" r="3.5" fill="#0284c7" />
      <text x="55" y="215" font-size="14" font-weight="bold" fill="#0f172a">b</text>

      <!-- Segment bc along -x from b(70, 215) to c(70, 95) vertically along z -->
      <line x1="70" y1="215" x2="70" y2="95" stroke="#0284c7" stroke-width="3" />
      <circle cx="70" cy="95" r="3.5" fill="#0284c7" />
      <text x="55" y="95" font-size="14" font-weight="bold" fill="#0f172a">c</text>

      <!-- Segment cd along -x to origin-aligned or to (150, 60) -->
      <line x1="70" y1="95" x2="150" y2="60" stroke="#0284c7" stroke-width="3" />
      <circle cx="150" cy="60" r="3.5" fill="#0284c7" />
      <text x="155" y="60" font-size="14" font-weight="bold" fill="#0f172a">d</text>

      <!-- Segment de along -z from d(150, 60) to e(150, 140) -->
      <line x1="150" y1="60" x2="150" y2="140" stroke="#0284c7" stroke-width="3" />
      <circle cx="150" cy="140" r="3.5" fill="#0284c7" />
      <text x="155" y="145" font-size="14" font-weight="bold" fill="#0f172a">e</text>

      <!-- Segment ef along +y from e(150, 140) to f(240, 140) -->
      <line x1="150" y1="140" x2="240" y2="140" stroke="#0284c7" stroke-width="3" />
      <circle cx="240" cy="140" r="3.5" fill="#0284c7" />
      <text x="245" y="140" font-size="14" font-weight="bold" fill="#0f172a">f</text>

      <!-- Magnetic field arrows parallel to y -->
      <line x1="250" y1="120" x2="300" y2="120" stroke="#64748b" stroke-width="2" />
      <polygon points="305,120 295,116 295,124" fill="#64748b" />
      <line x1="250" y1="140" x2="300" y2="140" stroke="#64748b" stroke-width="2" />
      <polygon points="305,140 295,136 295,144" fill="#64748b" />
      <line x1="250" y1="160" x2="300" y2="160" stroke="#64748b" stroke-width="2" />
      <polygon points="305,160 295,156 295,164" fill="#64748b" />
      <text x="315" y="145" font-size="16" font-weight="bold" fill="#64748b">B</text>
    </svg>
  `,

  // Q138: Semicircular wire in uniform field B towards right
  'moving_charges_q138_semicircular_wire_in_field.png': `
    <svg width="360" height="240" viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Uniform magnetic field arrows directed right -->
      <g stroke="#94a3b8" stroke-width="1.5">
        <line x1="60" y1="50" x2="300" y2="50" />
        <polygon points="305,50 295,46 295,54" fill="#94a3b8" />
        <line x1="60" y1="80" x2="300" y2="80" />
        <polygon points="305,80 295,76 295,84" fill="#94a3b8" />
        <line x1="60" y1="110" x2="300" y2="110" />
        <polygon points="305,110 295,106 295,114" fill="#94a3b8" />
        <line x1="60" y1="140" x2="300" y2="140" />
        <polygon points="305,140 295,136 295,144" fill="#94a3b8" />
        <line x1="60" y1="170" x2="300" y2="170" />
        <polygon points="305,170 295,166 295,174" fill="#94a3b8" />
        <line x1="60" y1="200" x2="300" y2="200" />
        <polygon points="305,200 295,196 295,204" fill="#94a3b8" />
      </g>
      <text x="315" y="130" font-size="18" font-weight="bold" fill="#64748b">B</text>

      <!-- Semicircular wire: Center at (180, 170), radius 70 -->
      <path d="M 110 170 A 70 70 0 0 1 250 170" fill="none" stroke="#0284c7" stroke-width="3" />
      <!-- Current arrow along semicircle -->
      <polygon points="185,100 175,95 175,105" fill="#0284c7" />
      <text x="175" y="85" font-size="15" font-style="italic" font-weight="bold" fill="#0284c7">i</text>

      <!-- Baseline P to Q -->
      <line x1="110" y1="170" x2="250" y2="170" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,4" />
      <circle cx="110" cy="170" r="4" fill="#0f172a" />
      <text x="95" y="175" font-size="15" font-weight="bold" fill="#0f172a">P</text>
      <circle cx="250" cy="170" r="4" fill="#0f172a" />
      <text x="255" y="175" font-size="15" font-weight="bold" fill="#0f172a">Q</text>
      <circle cx="180" cy="170" r="3" fill="#0f172a" />

      <!-- Radius R -->
      <text x="210" y="165" font-size="14" font-weight="bold" fill="#475569">R</text>
    </svg>
  `
};

async function generate() {
  console.log('Generating Batch 8 diagrams...');
  for (const [filename, svg] of Object.entries(diagrams)) {
    const buffer = Buffer.from(svg.trim());
    const bPath = path.join(backendDir, filename);
    const fPath = path.join(frontendDir, filename);
    await sharp(buffer).png().toFile(bPath);
    await sharp(buffer).png().toFile(fPath);
    console.log(`✓ Saved: ${filename}`);
  }
}

generate().catch(console.error);
