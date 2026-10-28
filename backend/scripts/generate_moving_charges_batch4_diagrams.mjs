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
  // Q39: Uniform magnetic field to the right of boundary MN, +q incident at 60 deg
  'moving_charges_q39_charge_deflection_boundary.png': `
    <svg width="360" height="320" viewBox="0 0 360 320" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Boundary line MN -->
      <line x1="160" y1="20" x2="160" y2="300" stroke="#0f172a" stroke-width="2.5" stroke-dasharray="5,4" />
      <text x="145" y="30" font-size="18" font-weight="bold" fill="#0f172a">M</text>
      <text x="145" y="305" font-size="18" font-weight="bold" fill="#0f172a">N</text>

      <!-- Magnetic field region into page (x) to the right of MN -->
      <g stroke="#94a3b8" stroke-width="2">
        <path d="M 190 50 L 200 60 M 200 50 L 190 60" />
        <path d="M 240 50 L 250 60 M 250 50 L 240 60" />
        <path d="M 290 50 L 300 60 M 300 50 L 290 60" />
        <path d="M 190 110 L 200 120 M 200 110 L 190 120" />
        <path d="M 240 110 L 250 120 M 250 110 L 240 120" />
        <path d="M 290 110 L 300 120 M 300 110 L 290 120" />
        <path d="M 190 170 L 200 180 M 200 170 L 190 180" />
        <path d="M 240 170 L 250 180 M 250 170 L 240 180" />
        <path d="M 290 170 L 300 180 M 300 170 L 290 180" />
        <path d="M 190 230 L 200 240 M 200 230 L 190 240" />
        <path d="M 240 230 L 250 240 M 250 230 L 240 240" />
        <path d="M 290 230 L 300 240 M 300 230 L 290 240" />
      </g>
      <text x="315" y="60" font-size="16" font-weight="bold" fill="#64748b">B⃗ ⊗</text>

      <!-- Incident path of +q at angle 60 deg to MN -->
      <!-- Hits MN at (160, 160) from (90, 200.4) -->
      <line x1="80" y1="206.2" x2="160" y2="160" stroke="#ef4444" stroke-width="3" />
      <polygon points="125,180 115,180 120,171" fill="#ef4444" />
      <text x="50" y="215" font-size="16" font-weight="bold" fill="#ef4444">+q</text>

      <!-- Angle 60 deg with boundary MN -->
      <path d="M 160 130 A 30 30 0 0 1 140 171" fill="none" stroke="#0f172a" stroke-width="1.5" />
      <text x="115" y="145" font-size="14" font-weight="bold" fill="#0f172a">60°</text>

      <!-- Circular arc inside magnetic field (clockwise major arc) -->
      <!-- Center around (240, 160), radius R = 92.4 -->
      <path d="M 160 160 A 80 80 0 1 0 160 220" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,3" />
      
      <!-- Emergent path -->
      <line x1="160" y1="220" x2="80" y2="266.2" stroke="#ef4444" stroke-width="3" />
      <polygon points="115,245 125,245 120,254" fill="#ef4444" />
    </svg>
  `,

  // Q40: Four candidate graphs for magnetic field along the axis of circular loop Bz(z)
  'moving_charges_q40_circular_loop_bz_graph.png': `
    <svg width="440" height="340" viewBox="0 0 440 340" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Graph (1): U-shaped parabola -->
      <g transform="translate(40, 30)">
        <text x="-25" y="20" font-size="16" font-weight="bold" fill="#0f172a">(1)</text>
        <line x1="10" y1="100" x2="150" y2="100" stroke="#0f172a" stroke-width="1.5" />
        <line x1="80" y1="100" x2="80" y2="15" stroke="#0f172a" stroke-width="1.5" />
        <text x="75" y="10" font-size="14" font-weight="bold" fill="#0f172a">B_z</text>
        <text x="5" y="115" font-size="13" fill="#64748b">-z</text>
        <text x="145" y="115" font-size="13" fill="#64748b">+z</text>
        <!-- U curve -->
        <path d="M 25 35 Q 80 95 135 35" fill="none" stroke="#2563eb" stroke-width="2.5" />
      </g>

      <!-- Graph (2): Triangular peak -->
      <g transform="translate(250, 30)">
        <text x="-25" y="20" font-size="16" font-weight="bold" fill="#0f172a">(2)</text>
        <line x1="10" y1="100" x2="150" y2="100" stroke="#0f172a" stroke-width="1.5" />
        <line x1="80" y1="100" x2="80" y2="15" stroke="#0f172a" stroke-width="1.5" />
        <text x="75" y="10" font-size="14" font-weight="bold" fill="#0f172a">B_z</text>
        <text x="5" y="115" font-size="13" fill="#64748b">-z</text>
        <text x="145" y="115" font-size="13" fill="#64748b">+z</text>
        <!-- Triangle -->
        <line x1="25" y1="100" x2="80" y2="25" stroke="#2563eb" stroke-width="2.5" />
        <line x1="80" y1="25" x2="135" y2="100" stroke="#2563eb" stroke-width="2.5" />
      </g>

      <!-- Graph (3): Bell curve (CORRECT) -->
      <g transform="translate(40, 180)">
        <text x="-25" y="20" font-size="16" font-weight="bold" fill="#0f172a">(3)</text>
        <line x1="10" y1="100" x2="150" y2="100" stroke="#0f172a" stroke-width="1.5" />
        <line x1="80" y1="100" x2="80" y2="15" stroke="#0f172a" stroke-width="1.5" />
        <text x="75" y="10" font-size="14" font-weight="bold" fill="#0f172a">B_z</text>
        <text x="5" y="115" font-size="13" fill="#64748b">-z</text>
        <text x="75" y="115" font-size="13" fill="#64748b">O</text>
        <text x="145" y="115" font-size="13" fill="#64748b">+z</text>
        <!-- Bell shaped curve -->
        <path d="M 15 95 C 45 95, 60 25, 80 25 C 100 25, 115 95, 145 95" fill="none" stroke="#16a34a" stroke-width="3" />
      </g>

      <!-- Graph (4): One sided exponential -->
      <g transform="translate(250, 180)">
        <text x="-25" y="20" font-size="16" font-weight="bold" fill="#0f172a">(4)</text>
        <line x1="10" y1="100" x2="150" y2="100" stroke="#0f172a" stroke-width="1.5" />
        <line x1="80" y1="100" x2="80" y2="15" stroke="#0f172a" stroke-width="1.5" />
        <text x="75" y="10" font-size="14" font-weight="bold" fill="#0f172a">B_z</text>
        <text x="5" y="115" font-size="13" fill="#64748b">-z</text>
        <text x="75" y="115" font-size="13" fill="#64748b">O</text>
        <text x="145" y="115" font-size="13" fill="#64748b">+z</text>
        <!-- Rising exponential -->
        <path d="M 15 98 L 80 98 Q 110 95 135 35" fill="none" stroke="#2563eb" stroke-width="2.5" />
      </g>
    </svg>
  `,

  // Q48: Long cylindrical conductor with non-uniform current density j = br
  'moving_charges_q48_cylindrical_conductor_current_density.png': `
    <svg width="420" height="220" viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Cylinder side lines -->
      <line x1="50" y1="60" x2="350" y2="60" stroke="#0f172a" stroke-width="2.5" />
      <line x1="50" y1="140" x2="350" y2="140" stroke="#0f172a" stroke-width="2.5" />

      <!-- Left cross-section -->
      <ellipse cx="50" cy="100" rx="20" ry="40" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5" />
      <!-- Right cross-section -->
      <ellipse cx="350" cy="100" rx="20" ry="40" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5" />

      <!-- Central axis -->
      <line x1="20" y1="100" x2="380" y2="100" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,4" />

      <!-- Radius R on cross-section -->
      <line x1="50" y1="100" x2="50" y2="60" stroke="#ef4444" stroke-width="2" />
      <circle cx="50" cy="100" r="3" fill="#ef4444" />
      <text x="58" y="85" font-size="15" font-weight="bold" fill="#ef4444">R</text>

      <!-- Distance r2 > R line -->
      <line x1="160" y1="100" x2="160" y2="30" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="3,3" />
      <circle cx="160" cy="30" r="4" fill="#2563eb" />
      <text x="170" y="35" font-size="15" font-weight="bold" fill="#2563eb">P (r₂ &gt; R)</text>
      <text x="135" y="70" font-size="14" font-style="italic" fill="#2563eb">r₂</text>

      <!-- Current direction arrow -->
      <line x1="280" y1="40" x2="200" y2="40" stroke="#0f172a" stroke-width="2" />
      <polygon points="195,40 205,35 205,45" fill="#0f172a" />
      <text x="235" y="32" font-size="16" font-style="italic" fill="#0f172a">i</text>
      <text x="220" y="125" font-size="15" font-weight="bold" fill="#0f172a">j = br</text>
    </svg>
  `,

  // Q50: Charged particle deflection across magnetic slab of thickness d
  'moving_charges_q50_charge_slab_deviation.png': `
    <svg width="380" height="260" viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Slab boundary lines -->
      <line x1="100" y1="20" x2="100" y2="200" stroke="#0f172a" stroke-width="2" stroke-dasharray="4,4" />
      <line x1="240" y1="20" x2="240" y2="200" stroke="#0f172a" stroke-width="2" stroke-dasharray="4,4" />

      <!-- Magnetic field out of page (dots) inside slab -->
      <g fill="#2563eb">
        <circle cx="130" cy="50" r="4" />
        <circle cx="170" cy="50" r="4" />
        <circle cx="210" cy="50" r="4" />
        <circle cx="130" cy="110" r="4" />
        <circle cx="170" cy="110" r="4" />
        <circle cx="210" cy="110" r="4" />
        <circle cx="130" cy="170" r="4" />
        <circle cx="170" cy="170" r="4" />
        <circle cx="210" cy="170" r="4" />
      </g>
      <text x="250" y="55" font-size="16" font-weight="bold" fill="#2563eb">B⃗ ⊙</text>

      <!-- Thickness dimension d -->
      <line x1="100" y1="225" x2="240" y2="225" stroke="#64748b" stroke-width="1.5" />
      <line x1="100" y1="220" x2="100" y2="230" stroke="#64748b" stroke-width="1.5" />
      <line x1="240" y1="220" x2="240" y2="230" stroke="#64748b" stroke-width="1.5" />
      <text x="165" y="242" font-size="16" font-style="italic" fill="#64748b">d</text>

      <!-- Incoming negative charge -q along +x -->
      <line x1="40" y1="130" x2="100" y2="130" stroke="#ef4444" stroke-width="3" />
      <circle cx="100" cy="130" r="4" fill="#ef4444" />
      <polygon points="75,130 65,125 65,135" fill="#ef4444" />
      <text x="50" y="120" font-size="15" font-weight="bold" fill="#ef4444">-q, v</text>

      <!-- Deflected trajectory in slab -->
      <path d="M 100 130 A 180 180 0 0 1 240 180" fill="none" stroke="#ef4444" stroke-width="3" />
      <!-- Emerging line -->
      <line x1="240" y1="180" x2="310" y2="210" stroke="#ef4444" stroke-width="3" />
      <!-- Angle deviation theta -->
      <line x1="240" y1="180" x2="320" y2="180" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />
      <path d="M 275 180 A 35 35 0 0 1 270 193" fill="none" stroke="#0f172a" stroke-width="1.5" />
      <text x="280" y="195" font-size="14" font-weight="bold" fill="#0f172a">θ</text>
    </svg>
  `,

  // Q51: Folded square loop with segments of length L in uniform magnetic field
  'moving_charges_q51_bent_loop_torque.png': `
    <svg width="420" height="300" viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Coordinate axes: Origin at (140, 180) -->
      <!-- y-axis: upwards -->
      <line x1="140" y1="180" x2="140" y2="40" stroke="#0f172a" stroke-width="2" />
      <polygon points="140,35 136,45 144,45" fill="#0f172a" />
      <text x="125" y="45" font-size="18" font-weight="bold" fill="#0f172a">y</text>

      <!-- x-axis: rightwards -->
      <line x1="140" y1="180" x2="340" y2="180" stroke="#0f172a" stroke-width="2" />
      <polygon points="345,180 335,176 335,184" fill="#0f172a" />
      <text x="350" y="185" font-size="18" font-weight="bold" fill="#0f172a">x</text>

      <!-- z-axis: downwards-left -->
      <line x1="140" y1="180" x2="40" y2="260" stroke="#0f172a" stroke-width="2" />
      <polygon points="35,264 43,255 48,262" fill="#0f172a" />
      <text x="25" y="270" font-size="18" font-weight="bold" fill="#0f172a">z</text>

      <!-- 3D bent loop consisting of two squares of side L -->
      <!-- Square 1 in y-z plane: (140, 180) to (140, 80) to (70, 136) to (70, 236) -->
      <!-- Square 2 in x-z plane: (140, 180) to (240, 180) to (170, 236) to (70, 236) -->
      <polygon points="140,180 140,80 70,136 70,236" fill="#eff6ff" stroke="#2563eb" stroke-width="3" />
      <polygon points="140,180 240,180 170,236 70,236" fill="#dbeafe" stroke="#2563eb" stroke-width="3" />

      <!-- Current arrows -->
      <polygon points="105,108 100,116 110,114" fill="#2563eb" />
      <text x="115" y="110" font-size="15" font-style="italic" fill="#2563eb">I</text>

      <polygon points="70,186 66,196 74,196" fill="#2563eb" />
      <text x="50" y="195" font-size="15" font-style="italic" fill="#2563eb">I</text>

      <polygon points="120,236 125,230 128,240" fill="#2563eb" />
      <text x="135" y="250" font-size="15" font-style="italic" fill="#2563eb">I</text>

      <polygon points="205,208 200,200 210,202" fill="#2563eb" />
      <text x="215" y="215" font-size="15" font-style="italic" fill="#2563eb">I</text>

      <!-- Length L labels -->
      <text x="80" y="75" font-size="16" font-style="italic" fill="#64748b">L</text>
      <text x="200" y="170" font-size="16" font-style="italic" fill="#64748b">L</text>
    </svg>
  `,

  // Q52: Flexible wire loop in uniform magnetic field expanding into a circle
  'moving_charges_q52_flexible_wire_loop.png': `
    <svg width="340" height="260" viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Magnetic field grid into page (x) -->
      <g stroke="#94a3b8" stroke-width="2">
        <path d="M 40 40 L 50 50 M 50 40 L 40 50" />
        <path d="M 100 40 L 110 50 M 110 40 L 100 50" />
        <path d="M 160 40 L 170 50 M 170 40 L 160 50" />
        <path d="M 220 40 L 230 50 M 230 40 L 220 50" />
        <path d="M 280 40 L 290 50 M 290 40 L 280 50" />

        <path d="M 40 100 L 50 110 M 50 100 L 40 110" />
        <path d="M 100 100 L 110 110 M 110 100 L 100 110" />
        <path d="M 160 100 L 170 110 M 170 100 L 160 110" />
        <path d="M 220 100 L 230 110 M 230 100 L 220 110" />
        <path d="M 280 100 L 290 110 M 290 100 L 280 110" />

        <path d="M 40 160 L 50 170 M 50 160 L 40 170" />
        <path d="M 100 160 L 110 170 M 110 160 L 100 170" />
        <path d="M 160 160 L 170 170 M 170 160 L 160 170" />
        <path d="M 220 160 L 230 170 M 230 160 L 220 170" />
        <path d="M 280 160 L 290 170 M 290 160 L 280 170" />

        <path d="M 40 220 L 50 230 M 50 220 L 40 230" />
        <path d="M 100 220 L 110 230 M 110 220 L 100 230" />
        <path d="M 160 220 L 170 230 M 170 220 L 160 230" />
        <path d="M 220 220 L 230 230 M 230 220 L 220 230" />
        <path d="M 280 220 L 290 230 M 290 220 L 280 230" />
      </g>
      <text x="295" y="115" font-size="16" font-weight="bold" fill="#64748b">B⃗ ⊗</text>

      <!-- Irregular flexible loop -->
      <path d="M 120 70 C 150 60, 180 80, 200 90 C 230 110, 210 150, 190 170 C 180 200, 130 210, 100 180 C 80 150, 90 120, 110 100 Z" 
            fill="#eff6ff" stroke="#0284c7" stroke-width="3" />
      <polygon points="160,70 150,65 150,75" fill="#0284c7" />
      <text x="145" y="125" font-size="16" font-weight="bold" fill="#0284c7">I</text>
    </svg>
  `
};

async function generateAll() {
  for (const [filename, svg] of Object.entries(diagrams)) {
    const buffer = Buffer.from(svg.trim());
    const backendPath = path.join(backendDir, filename);
    const frontendPath = path.join(frontendDir, filename);

    await sharp(buffer).png().toFile(backendPath);
    await sharp(buffer).png().toFile(frontendPath);
    console.log(`Generated: ${filename}`);
  }
  console.log('All Batch 4 diagrams generated successfully!');
}

generateAll().catch(console.error);
