import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendDir = path.resolve(__dirname, '../uploads/moving_charges');
const frontendDir = path.resolve(__dirname, '../../frontend/public/uploads/moving_charges');

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
  console.log('Generating Moving Charges Batch 1 diagrams...');

  // 1. Q1: Notched L-shaped loop with point P
  const svg1 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="380" viewBox="0 0 460 380">
    <rect width="100%" height="100%" fill="#ffffff" />
    
    <!-- Origin/Point P is at (340, 70) -->
    <!-- Dimension arrows at top -->
    <line x1="140" y1="45" x2="340" y2="45" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />
    <line x1="140" y1="40" x2="140" y2="50" stroke="#64748b" stroke-width="1.5" />
    <line x1="240" y1="40" x2="240" y2="50" stroke="#64748b" stroke-width="1.5" />
    <line x1="340" y1="40" x2="340" y2="50" stroke="#64748b" stroke-width="1.5" />
    <text x="185" y="38" font-family="Arial, sans-serif" font-size="16" font-style="italic" fill="#0f172a">a</text>
    <text x="285" y="38" font-family="Arial, sans-serif" font-size="16" font-style="italic" fill="#0f172a">a</text>

    <!-- Dimension arrows on right side -->
    <line x1="375" y1="70" x2="375" y2="270" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />
    <line x1="370" y1="70" x2="380" y2="70" stroke="#64748b" stroke-width="1.5" />
    <line x1="370" y1="170" x2="380" y2="170" stroke="#64748b" stroke-width="1.5" />
    <line x1="370" y1="270" x2="380" y2="270" stroke="#64748b" stroke-width="1.5" />
    <text x="390" y="125" font-family="Arial, sans-serif" font-size="16" font-style="italic" fill="#0f172a">a</text>
    <text x="390" y="225" font-family="Arial, sans-serif" font-size="16" font-style="italic" fill="#0f172a">a</text>

    <!-- Reference construction lines to point P -->
    <line x1="240" y1="70" x2="340" y2="70" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,4" />
    <line x1="340" y1="70" x2="340" y2="170" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,4" />

    <!-- Current Loop:
         (140, 70) -> (240, 70) [Top left]
         (240, 70) -> (240, 170) [Inner vertical]
         (240, 170) -> (340, 170) [Inner horizontal]
         (340, 170) -> (340, 270) [Right vertical]
         (340, 270) -> (140, 270) [Bottom horizontal]
         (140, 270) -> (140, 70) [Left vertical]
    -->
    <polygon points="140,70 240,70 240,170 340,170 340,270 140,270" fill="#f8fafc" stroke="#1e293b" stroke-width="3" />

    <!-- Current arrows -->
    <!-- Top-left segment going left from (240,70) to (140,70) -->
    <polygon points="185,65 175,70 185,75" fill="#2563eb" />
    <!-- Left vertical going down -->
    <polygon points="135,175 140,185 145,175" fill="#2563eb" />
    <text x="115" y="175" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#2563eb">i</text>
    <!-- Bottom horizontal going right -->
    <polygon points="245,265 255,270 245,275" fill="#2563eb" />
    <!-- Right vertical going up -->
    <polygon points="335,225 340,215 345,225" fill="#2563eb" />
    <!-- Inner horizontal going left -->
    <polygon points="285,165 275,170 285,175" fill="#2563eb" />
    <!-- Inner vertical going up -->
    <polygon points="235,115 240,105 245,115" fill="#2563eb" />

    <!-- Point P -->
    <circle cx="340" cy="70" r="5" fill="#dc2626" />
    <text x="350" y="65" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#dc2626">P</text>
  </svg>`;
  await saveSvg(svg1, 'moving_charges_q1_l_shaped_loop.png');

  // 2. Q2: Ampere Circuital Law Loops
  const svg2 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="380" viewBox="0 0 500 380">
    <rect width="100%" height="100%" fill="#ffffff" />
    
    <!-- Option (1) diagram: Loop winds twice around 2 A and once around 4 A in opposite direction -->
    <g transform="translate(40, 20)">
      <text x="10" y="55" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">(1)</text>
      <!-- Wire 2 A at (110, 50) -->
      <circle cx="110" cy="50" r="14" fill="#f1f5f9" stroke="#1e293b" stroke-width="1.5" />
      <circle cx="110" cy="50" r="3" fill="#1e293b" />
      <text x="98" y="32" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#0f172a">2A ⊙</text>

      <!-- Wire 4 A at (310, 50) -->
      <circle cx="310" cy="50" r="14" fill="#f1f5f9" stroke="#1e293b" stroke-width="1.5" />
      <circle cx="310" cy="50" r="3" fill="#1e293b" />
      <text x="298" y="32" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#0f172a">4A ⊙</text>

      <!-- Figure-8 path with double loop on left -->
      <path d="M 210,50 C 260,0 370,0 370,50 C 370,100 260,100 210,50 C 180,20 130,10 90,30 C 50,50 60,90 100,90 C 130,90 135,65 125,50 C 115,35 90,40 85,55 C 80,75 110,80 130,70 C 170,50 180,75 210,50 Z" 
            fill="none" stroke="#2563eb" stroke-width="2.5" />
      <!-- Orientation arrows -->
      <polygon points="305,5 315,5 310,12" fill="#2563eb" transform="rotate(180 310 5)" />
      <polygon points="305,95 315,95 310,102" fill="#2563eb" />
    </g>

    <!-- Option (2) diagram: Simple loop enclosing both -->
    <g transform="translate(40, 140)">
      <text x="10" y="45" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">(2)</text>
      <!-- Wire 2 A at (110, 40) -->
      <circle cx="110" cy="40" r="12" fill="#f1f5f9" stroke="#1e293b" stroke-width="1.5" />
      <circle cx="110" cy="40" r="3" fill="#1e293b" />
      <text x="100" y="24" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#0f172a">2A ⊙</text>

      <!-- Wire 4 A at (270, 40) -->
      <circle cx="270" cy="40" r="12" fill="#f1f5f9" stroke="#1e293b" stroke-width="1.5" />
      <circle cx="270" cy="40" r="3" fill="#1e293b" />
      <text x="260" y="24" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#0f172a">4A ⊙</text>

      <!-- Inner loop around 2A and outer enclosing both -->
      <ellipse cx="110" cy="40" rx="30" ry="25" fill="none" stroke="#2563eb" stroke-width="2" />
      <ellipse cx="190" cy="40" rx="130" ry="35" fill="none" stroke="#2563eb" stroke-width="2" />
    </g>

    <!-- Option (3) diagram: Figure-8 with double loop on right -->
    <g transform="translate(40, 250)">
      <text x="10" y="45" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">(3)</text>
      <!-- Wire 2 A at (110, 40) -->
      <circle cx="110" cy="40" r="12" fill="#f1f5f9" stroke="#1e293b" stroke-width="1.5" />
      <circle cx="110" cy="40" r="3" fill="#1e293b" />
      <text x="100" y="24" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#0f172a">2A ⊙</text>

      <!-- Wire 4 A at (270, 40) -->
      <circle cx="270" cy="40" r="12" fill="#f1f5f9" stroke="#1e293b" stroke-width="1.5" />
      <circle cx="270" cy="40" r="3" fill="#1e293b" />
      <text x="260" y="24" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#0f172a">4A ⊙</text>

      <path d="M 190,40 C 150,0 60,0 60,40 C 60,80 150,80 190,40 C 220,15 280,10 320,30 C 350,50 330,80 290,75 C 260,70 260,50 270,40 Z"
            fill="none" stroke="#2563eb" stroke-width="2" />
    </g>
  </svg>`;
  await saveSvg(svg2, 'moving_charges_q2_ampere_loops.png');

  // 3. Q3: Annular disc rotating with linear charges
  const svg3 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="240" viewBox="0 0 460 240">
    <rect width="100%" height="100%" fill="#ffffff" />
    
    <!-- Outer ellipse: rx = 160, ry = 60 at (230, 120) -->
    <!-- Inner ellipse: rx = 80, ry = 30 at (230, 120) -->
    <!-- Annular shaded disc -->
    <path d="M 70,120 A 160,60 0 1,0 390,120 A 160,60 0 1,0 70,120 M 150,120 A 80,30 0 1,0 310,120 A 80,30 0 1,0 150,120"
          fill="#e2e8f0" fill-rule="evenodd" stroke="#1e293b" stroke-width="2" />

    <!-- Outer circumference positive charge symbols -->
    <g fill="#2563eb" font-family="Arial, sans-serif" font-size="14" font-weight="bold">
      <text x="60" y="125">+</text><text x="395" y="125">+</text>
      <text x="120" y="70">+</text><text x="330" y="70">+</text>
      <text x="225" y="55">+</text>
      <text x="120" y="175">+</text><text x="330" y="175">+</text>
      <text x="225" y="190">+</text>
    </g>

    <!-- Inner circumference negative charge symbols -->
    <g fill="#dc2626" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
      <text x="160" y="125">-</text><text x="295" y="125">-</text>
      <text x="225" y="98">-</text><text x="225" y="146">-</text>
    </g>

    <!-- Central Rotation Axis -->
    <line x1="230" y1="20" x2="230" y2="220" stroke="#0f172a" stroke-width="2" />
    <!-- Angular velocity arrow omega -->
    <path d="M 215,35 A 15,6 0 1,1 245,35" fill="none" stroke="#0f172a" stroke-width="2" />
    <polygon points="245,35 242,28 250,33" fill="#0f172a" />
    <text x="255" y="38" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">ω</text>

    <!-- Labels -->
    <text x="350" y="195" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">λ₁ (2R)</text>
    <text x="250" y="125" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#dc2626">λ₂ (R)</text>
  </svg>`;
  await saveSvg(svg3, 'moving_charges_q3_annular_disc.png');

  // 4. Q4: Square loop in magnetic field
  const svg4 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="280" viewBox="0 0 460 280">
    <rect width="100%" height="100%" fill="#ffffff" />
    
    <!-- Magnetic Field Lines (Horizontal B0 pointing right) -->
    <line x1="80" y1="90" x2="380" y2="90" stroke="#64748b" stroke-width="2" />
    <polygon points="370,85 385,90 370,95" fill="#64748b" />

    <line x1="80" y1="210" x2="380" y2="210" stroke="#64748b" stroke-width="2" />
    <polygon points="370,205 385,210 370,215" fill="#64748b" />
    <text x="390" y="95" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">B₀</text>

    <!-- Axis X-X' along bottom side -->
    <line x1="60" y1="240" x2="400" y2="240" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,5" />
    <text x="65" y="235" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#475569">X</text>
    <text x="390" y="235" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#475569">X'</text>

    <!-- Square Loop (150,60) to (310,240) [Size 180x180] -->
    <rect x="150" y="60" width="160" height="180" fill="none" stroke="#1e293b" stroke-width="3" />

    <!-- Current arrows -->
    <!-- Top going right -->
    <polygon points="225,55 235,60 225,65" fill="#2563eb" />
    <text x="228" y="50" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">i</text>
    <!-- Right going down -->
    <polygon points="305,145 310,155 315,145" fill="#2563eb" />
    <text x="320" y="155" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">i</text>
    <!-- Bottom going left -->
    <polygon points="235,235 225,240 235,245" fill="#2563eb" />
    <text x="228" y="260" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">i</text>
    <!-- Left going up -->
    <polygon points="145,155 150,145 155,155" fill="#2563eb" />
    <text x="135" y="155" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#2563eb">i</text>
  </svg>`;
  await saveSvg(svg4, 'moving_charges_q4_square_loop_torque.png');

  // 5. Q5: Loop of 4 semicircular portions
  const svg5 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="340" viewBox="0 0 460 340">
    <rect width="100%" height="100%" fill="#ffffff" />

    <!-- Axes x and y -->
    <line x1="80" y1="170" x2="380" y2="170" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
    <line x1="230" y1="20" x2="230" y2="320" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
    <text x="385" y="175" font-family="Arial, sans-serif" font-size="15" font-style="italic" fill="#64748b">x</text>
    <text x="235" y="25" font-family="Arial, sans-serif" font-size="15" font-style="italic" fill="#64748b">y</text>

    <!-- Central Square bounds: (170, 110) to (290, 230), side a = 120 -->
    <rect x="170" y="110" width="120" height="120" fill="none" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="3,3" />

    <!-- Dimension arrows for side a -->
    <line x1="170" y1="90" x2="290" y2="90" stroke="#64748b" stroke-width="1.5" />
    <line x1="170" y1="85" x2="170" y2="95" stroke="#64748b" stroke-width="1.5" />
    <line x1="290" y1="85" x2="290" y2="95" stroke="#64748b" stroke-width="1.5" />
    <text x="225" y="85" font-family="Arial, sans-serif" font-size="15" font-style="italic" fill="#0f172a">a</text>

    <line x1="310" y1="110" x2="310" y2="230" stroke="#64748b" stroke-width="1.5" />
    <line x1="305" y1="110" x2="315" y2="110" stroke="#64748b" stroke-width="1.5" />
    <line x1="305" y1="230" x2="315" y2="230" stroke="#64748b" stroke-width="1.5" />
    <text x="320" y="175" font-family="Arial, sans-serif" font-size="15" font-style="italic" fill="#0f172a">a</text>

    <!-- 4 Semicircles forming the closed loop -->
    <!-- Top semicircle: from (290,110) to (170,110) with peak at (230,50) -->
    <!-- Left semicircle: from (170,110) to (170,230) with peak at (110,170) -->
    <!-- Bottom semicircle: from (170,230) to (290,230) with peak at (230,290) -->
    <!-- Right semicircle: from (290,230) to (290,110) with peak at (350,170) -->
    <path d="M 290,110 A 60,60 0 0,0 170,110 A 60,60 0 0,0 170,230 A 60,60 0 0,0 290,230 A 60,60 0 0,0 290,110 Z"
          fill="#f8fafc" stroke="#1e293b" stroke-width="3" />

    <!-- Current circulation arrows (counter-clockwise) -->
    <!-- Top semicircle going left: at (230,50) -->
    <polygon points="235,46 223,50 235,54" fill="#2563eb" />
    <!-- Left semicircle going down: at (110,170) -->
    <polygon points="106,165 110,177 114,165" fill="#2563eb" />
    <!-- Bottom semicircle going right: at (230,290) -->
    <polygon points="225,286 237,290 225,294" fill="#2563eb" />
    <!-- Right semicircle going up: at (350,170) -->
    <polygon points="346,175 350,163 354,175" fill="#2563eb" />
  </svg>`;
  await saveSvg(svg5, 'moving_charges_q5_four_semicircles.png');

  // 6. Q6: Homogeneous rotating charged disc
  const svg6 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="240" viewBox="0 0 460 240">
    <rect width="100%" height="100%" fill="#ffffff" />

    <!-- Disc Ellipse rx=140, ry=45 at (230, 120) -->
    <ellipse cx="230" cy="120" rx="140" ry="45" fill="#f1f5f9" stroke="#1e293b" stroke-width="2.5" />

    <!-- Positive charge distribution symbols (+) -->
    <g fill="#2563eb" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
      <text x="130" y="125">+</text><text x="170" y="115">+</text><text x="210" y="125">+</text>
      <text x="250" y="125">+</text><text x="290" y="115">+</text><text x="330" y="125">+</text>
      <text x="190" y="140">+</text><text x="270" y="140">+</text><text x="230" y="100">+</text>
    </g>

    <!-- Center dot and radius arrow R -->
    <circle cx="230" cy="120" r="3" fill="#0f172a" />
    <line x1="230" y1="120" x2="370" y2="120" stroke="#0f172a" stroke-width="1.5" />
    <text x="300" y="115" font-family="Arial, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#0f172a">R</text>

    <!-- Central Rotation Axis -->
    <line x1="230" y1="30" x2="230" y2="210" stroke="#0f172a" stroke-width="2" />
    <!-- Angular velocity arrow omega -->
    <path d="M 215,45 A 15,6 0 1,1 245,45" fill="none" stroke="#0f172a" stroke-width="2" />
    <polygon points="245,45 242,38 250,43" fill="#0f172a" />
    <text x="255" y="48" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">ω</text>

    <text x="375" y="145" font-family="Arial, sans-serif" font-size="15" font-style="italic" font-weight="bold" fill="#2563eb">σ</text>
  </svg>`;
  await saveSvg(svg6, 'moving_charges_q6_rotating_disc.png');

  // 7. Q8: Two opposing charges entering magnetic field
  const svg8 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="260" viewBox="0 0 460 260">
    <rect width="100%" height="100%" fill="#ffffff" />

    <!-- Magnetic Field Region (x = 160 to 400) -->
    <line x1="160" y1="30" x2="160" y2="230" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4" />

    <!-- Magnetic Field Crosses (B into page) -->
    <g fill="#94a3b8" font-family="Arial, sans-serif" font-size="15" font-weight="bold">
      <text x="200" y="60">✕</text><text x="260" y="60">✕</text><text x="320" y="60">✕</text><text x="380" y="60">✕</text>
      <text x="200" y="120">✕</text><text x="260" y="120">✕</text><text x="320" y="120">✕</text><text x="380" y="120">✕</text>
      <text x="200" y="180">✕</text><text x="260" y="180">✕</text><text x="320" y="180">✕</text><text x="380" y="180">✕</text>
    </g>
    <text x="410" y="125" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">B ⊗</text>

    <!-- Top particle (-q) entering at (160, 70) -->
    <circle cx="160" cy="70" r="14" fill="#fee2e2" stroke="#dc2626" stroke-width="2" />
    <text x="154" y="75" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#dc2626">-q</text>
    <!-- Velocity v1 arrow -->
    <line x1="174" y1="70" x2="230" y2="70" stroke="#1e293b" stroke-width="2.5" />
    <polygon points="225,65 235,70 225,75" fill="#1e293b" />
    <text x="240" y="75" font-family="Arial, sans-serif" font-size="15" font-style="italic" font-weight="bold" fill="#0f172a">v₁</text>

    <!-- Bottom particle (+q) entering at (160, 190) -->
    <circle cx="160" cy="190" r="14" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
    <text x="152" y="195" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2563eb">+q</text>
    <!-- Velocity v2 arrow -->
    <line x1="174" y1="190" x2="230" y2="190" stroke="#1e293b" stroke-width="2.5" />
    <polygon points="225,185 235,190 225,195" fill="#1e293b" />
    <text x="240" y="195" font-family="Arial, sans-serif" font-size="15" font-style="italic" font-weight="bold" fill="#0f172a">v₂</text>

    <!-- Distance d arrow -->
    <line x1="110" y1="70" x2="110" y2="190" stroke="#64748b" stroke-width="1.5" />
    <line x1="105" y1="70" x2="115" y2="70" stroke="#64748b" stroke-width="1.5" />
    <line x1="105" y1="190" x2="115" y2="190" stroke="#64748b" stroke-width="1.5" />
    <text x="90" y="135" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">d</text>
  </svg>`;
  await saveSvg(svg8, 'moving_charges_q8_opposing_charges_collision.png');

  // 8. Q10: Wire suspended by two springs in magnetic field
  const svg10 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="260" viewBox="0 0 460 260">
    <rect width="100%" height="100%" fill="#ffffff" />

    <!-- Ceiling support -->
    <line x1="120" y1="40" x2="340" y2="40" stroke="#1e293b" stroke-width="3" />
    <g stroke="#64748b" stroke-width="1.5">
      <line x1="130" y1="40" x2="145" y2="25" /><line x1="160" y1="40" x2="175" y2="25" />
      <line x1="190" y1="40" x2="205" y2="25" /><line x1="220" y1="40" x2="235" y2="25" />
      <line x1="250" y1="40" x2="265" y2="25" /><line x1="280" y1="40" x2="295" y2="25" />
      <line x1="310" y1="40" x2="325" y2="25" />
    </g>

    <!-- Left Spring at x = 160 -->
    <path d="M 160,40 l 0,15 l -10,8 l 20,16 l -20,16 l 20,16 l -20,16 l 10,8 l 0,15" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <!-- Right Spring at x = 300 -->
    <path d="M 300,40 l 0,15 l -10,8 l 20,16 l -20,16 l 20,16 l -20,16 l 10,8 l 0,15" fill="none" stroke="#2563eb" stroke-width="2.5" />

    <!-- Horizontal Wire PQ (110,150) to (350,150) -->
    <rect x="110" y="146" width="240" height="10" rx="3" fill="#cbd5e1" stroke="#1e293b" stroke-width="2" />
    <text x="95" y="156" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#0f172a">P</text>
    <text x="360" y="156" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#0f172a">Q</text>

    <!-- Length L0 dimension arrow -->
    <line x1="110" y1="180" x2="350" y2="180" stroke="#64748b" stroke-width="1.5" />
    <line x1="110" y1="175" x2="110" y2="185" stroke="#64748b" stroke-width="1.5" />
    <line x1="350" y1="175" x2="350" y2="185" stroke="#64748b" stroke-width="1.5" />
    <text x="225" y="198" font-family="Arial, sans-serif" font-size="15" font-style="italic" font-weight="bold" fill="#0f172a">L₀</text>

    <!-- Magnetic Field B0 into page -->
    <text x="360" y="90" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#0f172a">B₀ ⊗</text>
  </svg>`;
  await saveSvg(svg10, 'moving_charges_q10_suspended_wire.png');

  console.log('All Moving Charges Batch 1 diagrams generated successfully!');
}

main().catch(console.error);
