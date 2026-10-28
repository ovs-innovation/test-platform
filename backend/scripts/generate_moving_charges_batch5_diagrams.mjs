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
  // Q64: Semi-infinite wire along y-axis from A(0,b) to +infinity, field at (a,0)
  'moving_charges_q64_semi_infinite_wire.png': `
    <svg width="360" height="260" viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Coordinate axes: Origin at (100, 200) -->
      <!-- x-axis -->
      <line x1="100" y1="200" x2="300" y2="200" stroke="#0f172a" stroke-width="2" />
      <polygon points="305,200 295,196 295,204" fill="#0f172a" />
      <text x="310" y="205" font-size="16" font-weight="bold" fill="#0f172a">x</text>

      <!-- y-axis (dashed below A, solid along wire) -->
      <line x1="100" y1="200" x2="100" y2="130" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3" />

      <!-- Semi-infinite wire from A(0,b) to +infinity -->
      <line x1="100" y1="130" x2="100" y2="30" stroke="#0284c7" stroke-width="3.5" />
      <!-- Current arrow -->
      <polygon points="100,75 95,85 105,85" fill="#0284c7" />
      <text x="85" y="80" font-size="16" font-style="italic" fill="#0284c7">i</text>
      <!-- End A(0, b) -->
      <circle cx="100" cy="130" r="4" fill="#ef4444" />
      <text x="110" y="135" font-size="15" font-weight="bold" fill="#0f172a">A(0, b)</text>

      <!-- Point P(a, 0) -->
      <circle cx="220" cy="200" r="4" fill="#ef4444" />
      <text x="210" y="225" font-size="15" font-weight="bold" fill="#0f172a">(a, 0)</text>

      <!-- Connecting line from A to P -->
      <line x1="100" y1="130" x2="220" y2="200" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />
    </svg>
  `,

  // Q65: Charged particle entering magnetic slab of width 4d at speed v = 2 alpha d B
  'moving_charges_q65_magnetic_slab_4d.png': `
    <svg width="360" height="280" viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Magnetic field slab boundaries -->
      <line x1="130" y1="30" x2="130" y2="250" stroke="#0f172a" stroke-width="2.5" />
      <line x1="290" y1="30" x2="290" y2="250" stroke="#0f172a" stroke-width="2.5" />

      <!-- Thickness 4d -->
      <line x1="130" y1="20" x2="290" y2="20" stroke="#64748b" stroke-width="1.5" />
      <line x1="130" y1="15" x2="130" y2="25" stroke="#64748b" stroke-width="1.5" />
      <line x1="290" y1="15" x2="290" y2="25" stroke="#64748b" stroke-width="1.5" />
      <text x="200" y="15" font-size="15" font-weight="bold" fill="#0f172a">4d</text>

      <!-- Magnetic field crosses into page -->
      <g stroke="#94a3b8" stroke-width="2">
        <path d="M 160 50 L 170 60 M 170 50 L 160 60" />
        <path d="M 210 50 L 220 60 M 220 50 L 210 60" />
        <path d="M 260 50 L 270 60 M 270 50 L 260 60" />
        <path d="M 160 100 L 170 110 M 170 100 L 160 110" />
        <path d="M 210 100 L 220 110 M 220 100 L 210 110" />
        <path d="M 260 100 L 270 110 M 270 100 L 260 110" />
        <path d="M 160 150 L 170 160 M 170 150 L 160 160" />
        <path d="M 210 150 L 220 160 M 220 150 L 210 160" />
        <path d="M 260 150 L 270 160 M 270 150 L 260 160" />
        <path d="M 160 200 L 170 210 M 170 200 L 160 210" />
        <path d="M 210 200 L 220 210 M 220 200 L 210 210" />
        <path d="M 260 200 L 270 210 M 270 200 L 260 210" />
      </g>

      <!-- Incoming charge q/m = alpha -->
      <line x1="50" y1="100" x2="130" y2="100" stroke="#ef4444" stroke-width="3" />
      <polygon points="100,100 90,95 90,105" fill="#ef4444" />
      <text x="50" y="85" font-size="16" font-weight="bold" fill="#ef4444">q/m = α</text>
      <text x="80" y="120" font-size="14" font-weight="bold" fill="#ef4444">v</text>

      <!-- Semicircular path of radius 2d turning back to entry boundary at distance 4d -->
      <!-- Center at (130, 160), radius R = 60 (representing 2d) -->
      <path d="M 130 100 A 60 60 0 0 1 130 220" fill="none" stroke="#ef4444" stroke-width="3" />
      <!-- Emergent path -->
      <line x1="130" y1="220" x2="50" y2="220" stroke="#ef4444" stroke-width="3" />
      <polygon points="80,220 90,215 90,225" fill="#ef4444" />

      <!-- Distance 4d between entry and exit -->
      <line x1="115" y1="100" x2="115" y2="220" stroke="#059669" stroke-width="1.5" />
      <line x1="110" y1="100" x2="120" y2="100" stroke="#059669" stroke-width="1.5" />
      <line x1="110" y1="220" x2="120" y2="220" stroke="#059669" stroke-width="1.5" />
      <text x="85" y="165" font-size="15" font-weight="bold" fill="#059669">4d</text>
    </svg>
  `,

  // Q68: Current enters uniform circular loop at X and leaves at Y
  'moving_charges_q68_circular_loop_xy.png': `
    <svg width="340" height="260" viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Circular loop of radius r -->
      <circle cx="170" cy="130" r="70" fill="none" stroke="#0284c7" stroke-width="3" />
      <!-- Centre O -->
      <circle cx="170" cy="130" r="4" fill="#0f172a" />
      <text x="165" y="120" font-size="16" font-weight="bold" fill="#0f172a">O</text>

      <!-- Arc labels A and B -->
      <text x="165" y="50" font-size="18" font-weight="bold" fill="#0284c7">A</text>
      <text x="165" y="225" font-size="18" font-weight="bold" fill="#0284c7">B</text>

      <!-- Entrance X and Exit Y -->
      <!-- Let angle theta at bottom be 80 deg, so X is at -130 deg, Y at -50 deg from top -->
      <!-- Coordinates: X(115, 175), Y(225, 175) -->
      <!-- Lead entering at X -->
      <line x1="60" y1="210" x2="116" y2="173" stroke="#0f172a" stroke-width="2.5" />
      <polygon points="90,190 80,192 86,183" fill="#0f172a" />
      <text x="65" y="185" font-size="15" font-style="italic" fill="#0f172a">i</text>
      <text x="105" y="195" font-size="16" font-weight="bold" fill="#0f172a">X</text>

      <!-- Lead leaving at Y -->
      <line x1="224" y1="173" x2="280" y2="210" stroke="#0f172a" stroke-width="2.5" />
      <polygon points="255,193 250,185 260,187" fill="#0f172a" />
      <text x="230" y="195" font-size="16" font-weight="bold" fill="#0f172a">Y</text>

      <!-- Radius r line -->
      <line x1="170" y1="130" x2="235" y2="105" stroke="#64748b" stroke-width="1.5" />
      <text x="200" y="115" font-size="15" font-style="italic" fill="#64748b">r</text>

      <!-- Angle theta arc at O -->
      <line x1="170" y1="130" x2="116" y2="173" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />
      <line x1="170" y1="130" x2="224" y2="173" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />
      <path d="M 152 144 A 25 25 0 0 0 188 144" fill="none" stroke="#ef4444" stroke-width="1.5" />
      <text x="165" y="160" font-size="14" font-weight="bold" fill="#ef4444">θ</text>
    </svg>
  `,

  // Q71: Circular loop of radius R in uniform magnetic field in x-y plane
  'moving_charges_q71_circular_loop_xy_torque.png': `
    <svg width="360" height="260" viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Coordinate axes: Origin at (150, 150) -->
      <!-- x-axis -->
      <line x1="60" y1="150" x2="300" y2="150" stroke="#0f172a" stroke-width="2" />
      <polygon points="305,150 295,146 295,154" fill="#0f172a" />
      <text x="310" y="155" font-size="16" font-weight="bold" fill="#0f172a">x</text>

      <!-- y-axis -->
      <line x1="150" y1="230" x2="150" y2="50" stroke="#0f172a" stroke-width="2" />
      <polygon points="150,45 146,55 154,55" fill="#0f172a" />
      <text x="145" y="35" font-size="16" font-weight="bold" fill="#0f172a">y</text>

      <!-- Circular loop in x-y plane -->
      <circle cx="150" cy="150" r="45" fill="none" stroke="#0284c7" stroke-width="3" />
      <!-- Current arrow anticlockwise -->
      <polygon points="150,105 142,109 142,101" fill="#0284c7" />
      <text x="155" y="95" font-size="14" font-weight="bold" fill="#0284c7">i</text>

      <!-- Magnetic field lines at angle 45 deg -->
      <g stroke="#16a34a" stroke-width="2">
        <line x1="70" y1="190" x2="270" y2="70" />
        <polygon points="275,67 265,68 270,77" fill="#16a34a" />

        <line x1="100" y1="210" x2="290" y2="95" />
        <polygon points="295,92 285,93 290,102" fill="#16a34a" />

        <line x1="50" y1="165" x2="240" y2="50" />
        <polygon points="245,47 235,48 240,57" fill="#16a34a" />
      </g>
      <text x="280" y="60" font-size="16" font-weight="bold" fill="#16a34a">B⃗</text>
      <!-- Angle 45 deg arc -->
      <path d="M 200 150 A 50 50 0 0 0 185 115" fill="none" stroke="#0f172a" stroke-width="1.5" />
      <text x="195" y="135" font-size="13" font-weight="bold" fill="#0f172a">45°</text>
    </svg>
  `,

  // Q72: Current 2I entering two semicircular loops with semi-infinite wires
  'moving_charges_q72_two_semicircles_wires.png': `
    <svg width="360" height="340" viewBox="0 0 360 340" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Centre O -->
      <circle cx="170" cy="180" r="4" fill="#0f172a" />
      <text x="155" y="180" font-size="16" font-weight="bold" fill="#0f172a">O</text>

      <!-- Upper semicircle of radius r2 (r2 = 90) -->
      <path d="M 80 180 A 90 90 0 0 1 260 180" fill="none" stroke="#0284c7" stroke-width="3" />
      <!-- Current arrow clockwise on upper semicircle -->
      <polygon points="170,90 178,85 178,95" fill="#0284c7" />
      <text x="165" y="75" font-size="15" font-weight="bold" fill="#0284c7">I</text>
      <!-- Radius r2 -->
      <line x1="170" y1="180" x2="235" y2="115" stroke="#64748b" stroke-width="1.5" />
      <text x="210" y="140" font-size="14" font-style="italic" fill="#64748b">r₂</text>

      <!-- Lower semicircle of radius r1 (r1 = 40) -->
      <path d="M 130 180 A 40 40 0 0 0 210 180" fill="none" stroke="#0284c7" stroke-width="3" />
      <!-- Current arrow anticlockwise on lower semicircle -->
      <polygon points="170,220 162,215 162,225" fill="#0284c7" />
      <text x="165" y="240" font-size="15" font-weight="bold" fill="#0284c7">I</text>
      <!-- Radius r1 -->
      <line x1="170" y1="180" x2="198" y2="208" stroke="#64748b" stroke-width="1.5" />
      <text x="180" y="195" font-size="14" font-style="italic" fill="#64748b">r₁</text>

      <!-- Horizontal connector bridges -->
      <line x1="80" y1="180" x2="130" y2="180" stroke="#0284c7" stroke-width="3" />
      <line x1="210" y1="180" x2="260" y2="180" stroke="#0284c7" stroke-width="3" />

      <!-- Left straight wire downwards to infinity carrying 2I -->
      <line x1="80" y1="180" x2="80" y2="310" stroke="#0f172a" stroke-width="2.5" />
      <polygon points="80,260 75,250 85,250" fill="#0f172a" />
      <text x="95" y="260" font-size="15" font-weight="bold" fill="#0f172a">2I</text>
      <text x="75" y="330" font-size="14" fill="#64748b">∞</text>

      <!-- Right straight wire upwards to infinity carrying 2I -->
      <line x1="260" y1="180" x2="260" y2="30" stroke="#0f172a" stroke-width="2.5" />
      <polygon points="260,90 255,100 265,100" fill="#0f172a" />
      <text x="275" y="95" font-size="15" font-weight="bold" fill="#0f172a">2I</text>
      <text x="255" y="20" font-size="14" fill="#64748b">∞</text>
    </svg>
  `,

  // Q75: Two parallel wires A and A' separated by sqrt(3)x, point P at distance x from A
  'moving_charges_q75_two_parallel_wires.png': `
    <svg width="340" height="260" viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Wire A at (100, 60) -->
      <circle cx="100" cy="60" r="14" fill="#eff6ff" stroke="#0f172a" stroke-width="2" />
      <circle cx="100" cy="60" r="3.5" fill="#0f172a" />
      <text x="70" y="65" font-size="16" font-weight="bold" fill="#0f172a">A ⊙</text>
      <text x="120" y="55" font-size="14" font-style="italic" fill="#0f172a">i</text>

      <!-- Wire A' at (100, 200), distance sqrt(3)x below A -->
      <circle cx="100" cy="200" r="14" fill="#fef2f2" stroke="#0f172a" stroke-width="2" />
      <path d="M 94 194 L 106 206 M 106 194 L 94 206" stroke="#0f172a" stroke-width="2.5" />
      <text x="65" y="205" font-size="16" font-weight="bold" fill="#0f172a">A' ⊗</text>
      <text x="120" y="205" font-size="14" font-style="italic" fill="#0f172a">i</text>

      <!-- Vertical line between A and A' -->
      <line x1="100" y1="74" x2="100" y2="186" stroke="#64748b" stroke-width="2" />
      <text x="45" y="135" font-size="15" font-weight="bold" fill="#64748b">√3 x</text>

      <!-- Horizontal line from A to P of length x -->
      <line x1="114" y1="60" x2="240" y2="60" stroke="#64748b" stroke-width="2" />
      <text x="170" y="50" font-size="16" font-style="italic" fill="#64748b">x</text>

      <!-- Point P -->
      <circle cx="240" cy="60" r="4.5" fill="#ef4444" />
      <text x="250" y="65" font-size="18" font-weight="bold" fill="#ef4444">P</text>

      <!-- Right angle at A -->
      <rect x="100" y="60" width="14" height="14" fill="none" stroke="#0f172a" stroke-width="1.5" />

      <!-- Hypotenuse line from A' to P -->
      <line x1="100" y1="200" x2="240" y2="60" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3" />
      <text x="180" y="145" font-size="14" font-style="italic" fill="#94a3b8">2x</text>
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
  console.log('All Batch 5 diagrams generated successfully!');
}

generateAll().catch(console.error);
