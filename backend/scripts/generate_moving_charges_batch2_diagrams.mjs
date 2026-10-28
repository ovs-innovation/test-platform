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
  // Q11: Ranking magnitude of line integral for closed paths a, b, c, d
  'moving_charges_q11_amperian_loops.png': `
    <svg width="450" height="400" viewBox="0 0 450 400" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Outer boundary loop d -->
      <ellipse cx="225" cy="200" rx="190" ry="170" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="6,4" />
      <text x="360" y="80" font-size="20" font-weight="bold" fill="#2563eb">d</text>
      
      <!-- Loop a (horizontal ellipse enclosing left and right wires) -->
      <ellipse cx="225" cy="230" rx="150" ry="85" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="5,4" />
      <text x="220" y="335" font-size="20" font-weight="bold" fill="#dc2626">a</text>

      <!-- Loop b (tilted/top ellipse enclosing top and right wires) -->
      <g transform="rotate(35 250 160)">
        <ellipse cx="250" cy="160" rx="75" ry="120" fill="none" stroke="#16a34a" stroke-width="2" stroke-dasharray="5,4" />
      </g>
      <text x="315" y="105" font-size="20" font-weight="bold" fill="#16a34a">b</text>

      <!-- Loop c (small loop around left wire) -->
      <circle cx="140" cy="220" r="40" fill="none" stroke="#9333ea" stroke-width="2" stroke-dasharray="4,4" />
      <text x="110" y="170" font-size="20" font-weight="bold" fill="#9333ea">c</text>

      <!-- Wires with current -->
      <!-- Top wire: 2A Out of page (.) -->
      <circle cx="210" cy="100" r="14" fill="#ffffff" stroke="#1e293b" stroke-width="2" />
      <circle cx="210" cy="100" r="4" fill="#1e293b" />
      <text x="230" y="106" font-size="16" font-weight="bold" fill="#1e293b">2A ⊙</text>

      <!-- Left wire: 2A Into page (x) -->
      <circle cx="140" cy="220" r="14" fill="#ffffff" stroke="#1e293b" stroke-width="2" />
      <path d="M 133 213 L 147 227 M 147 213 L 133 227" stroke="#1e293b" stroke-width="2.5" />
      <text x="95" y="248" font-size="15" font-weight="bold" fill="#1e293b">2A ⊗</text>

      <!-- Right wire: 5A Out of page (.) -->
      <circle cx="310" cy="230" r="14" fill="#ffffff" stroke="#1e293b" stroke-width="2" />
      <circle cx="310" cy="230" r="4" fill="#1e293b" />
      <text x="330" y="248" font-size="16" font-weight="bold" fill="#1e293b">5A ⊙</text>
    </svg>
  `,

  // Q16: Straight wire length l carrying i, point P at distance l perpendicular to end
  'moving_charges_q16_straight_wire_p.png': `
    <svg width="400" height="280" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Vertical wire carrying current i -->
      <line x1="120" y1="240" x2="120" y2="70" stroke="#0f172a" stroke-width="4" />
      <!-- Arrow showing current i -->
      <polygon points="120,130 114,148 126,148" fill="#0f172a" />
      <text x="135" y="145" font-size="18" font-weight="bold" fill="#0f172a">i</text>
      <!-- Wire length label l -->
      <line x1="95" y1="240" x2="95" y2="70" stroke="#64748b" stroke-width="1.5" />
      <line x1="90" y1="240" x2="100" y2="240" stroke="#64748b" stroke-width="1.5" />
      <line x1="90" y1="70" x2="100" y2="70" stroke="#64748b" stroke-width="1.5" />
      <text x="75" y="160" font-size="16" font-style="italic" fill="#64748b">l</text>

      <!-- Horizontal line from top end to P -->
      <line x1="120" y1="70" x2="310" y2="70" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4" />
      <!-- Label length l -->
      <line x1="120" y1="50" x2="310" y2="50" stroke="#64748b" stroke-width="1.5" />
      <line x1="120" y1="45" x2="120" y2="55" stroke="#64748b" stroke-width="1.5" />
      <line x1="310" y1="45" x2="310" y2="55" stroke="#64748b" stroke-width="1.5" />
      <text x="210" y="42" font-size="16" font-style="italic" fill="#64748b">l</text>

      <!-- Point P -->
      <circle cx="310" cy="70" r="5" fill="#ef4444" />
      <text x="325" y="75" font-size="20" font-weight="bold" fill="#ef4444">P</text>
      <!-- Dashed line to bottom of wire -->
      <line x1="310" y1="70" x2="120" y2="240" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3" />
      <text x="270" y="95" font-size="14" fill="#64748b">45°</text>
    </svg>
  `,

  // Q20: Circular loop radius R in uniform magnetic field with current I
  'moving_charges_q20_circular_loop_tension.png': `
    <svg width="380" height="320" viewBox="0 0 380 320" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Uniform magnetic field into page (x) grid -->
      <g stroke="#94a3b8" stroke-width="2">
        <!-- row 1 -->
        <path d="M 50 45 L 60 55 M 60 45 L 50 55" />
        <path d="M 120 45 L 130 55 M 130 45 L 120 55" />
        <path d="M 190 45 L 200 55 M 200 45 L 190 55" />
        <path d="M 260 45 L 270 55 M 270 45 L 260 55" />
        <path d="M 330 45 L 340 55 M 340 45 L 330 55" />
        <!-- row 2 -->
        <path d="M 50 115 L 60 125 M 60 115 L 50 125" />
        <path d="M 120 115 L 130 125 M 130 115 L 120 125" />
        <path d="M 190 115 L 200 125 M 200 115 L 190 125" />
        <path d="M 260 115 L 270 125 M 270 115 L 260 125" />
        <path d="M 330 115 L 340 125 M 340 115 L 330 125" />
        <!-- row 3 -->
        <path d="M 50 185 L 60 195 M 60 185 L 50 195" />
        <path d="M 120 185 L 130 195 M 130 185 L 120 195" />
        <path d="M 190 185 L 200 195 M 200 185 L 190 195" />
        <path d="M 260 185 L 270 195 M 270 185 L 260 195" />
        <path d="M 330 185 L 340 195 M 340 185 L 330 195" />
        <!-- row 4 -->
        <path d="M 50 255 L 60 265 M 60 255 L 50 265" />
        <path d="M 120 255 L 130 265 M 130 255 L 120 265" />
        <path d="M 190 255 L 200 265 M 200 255 L 190 265" />
        <path d="M 260 255 L 270 265 M 270 255 L 260 265" />
        <path d="M 330 255 L 340 265 M 340 255 L 330 265" />
      </g>

      <!-- Circular wire loop -->
      <circle cx="195" cy="155" r="95" fill="none" stroke="#0284c7" stroke-width="3.5" />
      <!-- Current arrows (anticlockwise) -->
      <polygon points="195,60 180,55 180,65" fill="#0284c7" />
      <polygon points="100,155 95,170 105,170" fill="#0284c7" />
      <polygon points="195,250 210,245 210,255" fill="#0284c7" />
      <polygon points="290,155 285,140 295,140" fill="#0284c7" />

      <!-- Centre and Radius R -->
      <circle cx="195" cy="155" r="4" fill="#0f172a" />
      <line x1="195" y1="155" x2="275" y2="120" stroke="#0f172a" stroke-width="2" />
      <circle cx="275" cy="120" r="3" fill="#0f172a" />
      <text x="235" y="135" font-size="18" font-weight="bold" fill="#0f172a">R</text>
      <text x="205" y="45" font-size="16" font-weight="bold" fill="#0284c7">I</text>
    </svg>
  `,

  // Q21: Ampere's loop with currents I1, I2, I3
  'moving_charges_q21_ampere_line_integral.png': `
    <svg width="380" height="300" viewBox="0 0 380 300" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Arbitrary closed loop (Amperian loop) -->
      <path d="M 120 70 C 220 50, 260 110, 240 180 C 220 250, 140 260, 100 210 C 60 160, 60 90, 120 70 Z" 
            fill="none" stroke="#2563eb" stroke-width="3" />
      
      <!-- Current I1 = 4.0 A (out of page) -->
      <g transform="translate(145, 120)">
        <circle cx="0" cy="0" r="16" fill="#eff6ff" stroke="#1e293b" stroke-width="2" />
        <circle cx="0" cy="0" r="4" fill="#1e293b" />
        <text x="22" y="6" font-size="16" font-weight="bold" fill="#1e293b">I₁ = 4.0 A ⊙</text>
      </g>

      <!-- Current I2 = 2.0 A (into page) -->
      <g transform="translate(160, 205)">
        <circle cx="0" cy="0" r="16" fill="#fef2f2" stroke="#1e293b" stroke-width="2" />
        <path d="M -7 -7 L 7 7 M 7 -7 L -7 7" stroke="#1e293b" stroke-width="2.5" />
        <text x="22" y="6" font-size="16" font-weight="bold" fill="#1e293b">I₂ = 2.0 A ⊗</text>
      </g>

      <!-- Current I3 = 2.0 A (outside the loop) -->
      <g transform="translate(290, 160)">
        <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#64748b" stroke-width="1.5" />
        <circle cx="0" cy="0" r="3.5" fill="#64748b" />
        <text x="18" y="5" font-size="15" fill="#64748b">I₃ = 2.0 A</text>
      </g>
    </svg>
  `,

  // Q22: Current i in closed loop with circular arc abc and straight wire ac
  'moving_charges_q22_circular_arc_chord.png': `
    <svg width="380" height="340" viewBox="0 0 380 340" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Centre O -->
      <circle cx="190" cy="160" r="4" fill="#0f172a" />
      <text x="185" y="150" font-size="18" font-weight="bold" fill="#0f172a">O</text>

      <!-- Circular arc abc: from angle 125 to 55 degrees (covering major arc 290 deg) -->
      <!-- Let angle at center be 2 theta subtended by chord ac at bottom -->
      <!-- Center (190, 160), radius R = 110. Let theta = 40 deg, so bottom chord subtends 80 deg (from 50 to 130) -->
      <!-- Point a at (190 - 110*sin(40), 160 + 110*cos(40)) = (119.3, 244.2) -->
      <!-- Point c at (190 + 110*sin(40), 160 + 110*cos(40)) = (260.7, 244.2) -->
      <!-- Arc abc goes from c around the top to a -->
      <path d="M 260.7 244.2 A 110 110 0 1 0 119.3 244.2" fill="none" stroke="#0284c7" stroke-width="3" />
      
      <!-- Chord ac -->
      <line x1="119.3" y1="244.2" x2="260.7" y2="244.2" stroke="#0284c7" stroke-width="3" />

      <!-- Current direction arrows (anticlockwise loop) -->
      <!-- arrow on arc at top point b -->
      <polygon points="190,50 175,45 175,55" fill="#0284c7" />
      <text x="185" y="38" font-size="18" font-weight="bold" fill="#0284c7">b</text>
      <text x="100" y="110" font-size="16" font-style="italic" fill="#0284c7">i</text>
      
      <!-- arrow on chord ac (right to left) -->
      <polygon points="180,244.2 195,238 195,250" fill="#0284c7" />

      <!-- Labels a and c -->
      <text x="100" y="260" font-size="18" font-weight="bold" fill="#0f172a">a</text>
      <text x="268" y="260" font-size="18" font-weight="bold" fill="#0f172a">c</text>

      <!-- Radii to a and c -->
      <line x1="190" y1="160" x2="119.3" y2="244.2" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,4" />
      <line x1="190" y1="160" x2="260.7" y2="244.2" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,4" />
      <text x="140" y="195" font-size="16" font-weight="bold" fill="#64748b">R</text>

      <!-- Angle 2theta arc at O -->
      <path d="M 174 179 A 25 25 0 0 0 206 179" fill="none" stroke="#ef4444" stroke-width="1.5" />
      <text x="180" y="200" font-size="15" font-weight="bold" fill="#ef4444">2θ</text>
    </svg>
  `,

  // Q23: Two coaxial circular loops on a cone with semi-vertical angle theta
  'moving_charges_q23_coaxial_conical_loops.png': `
    <svg width="460" height="260" viewBox="0 0 460 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Vertex O -->
      <circle cx="40" cy="130" r="3" fill="#0f172a" />
      <text x="25" y="135" font-size="18" font-weight="bold" fill="#0f172a">O</text>

      <!-- Central axis (dashed) -->
      <line x1="40" y1="130" x2="420" y2="130" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,4" />

      <!-- Conical slant lines -->
      <line x1="40" y1="130" x2="350" y2="35" stroke="#ef4444" stroke-width="1.5" />
      <line x1="40" y1="130" x2="350" y2="225" stroke="#ef4444" stroke-width="1.5" />

      <!-- Angle 2theta at vertex -->
      <path d="M 80 119 A 45 45 0 0 1 80 141" fill="none" stroke="#ef4444" stroke-width="1.5" />
      <text x="88" y="135" font-size="15" font-weight="bold" fill="#ef4444">2θ</text>

      <!-- Loop 1 at distance x -->
      <ellipse cx="180" cy="130" rx="18" ry="48" fill="none" stroke="#0284c7" stroke-width="3" />
      <!-- Plus charges on Loop 1 -->
      <text x="175" y="100" font-size="12" font-weight="bold" fill="#0284c7">+</text>
      <text x="182" y="130" font-size="12" font-weight="bold" fill="#0284c7">+</text>
      <text x="175" y="160" font-size="12" font-weight="bold" fill="#0284c7">+</text>
      <text x="195" y="150" font-size="16" font-weight="bold" fill="#0f172a">1</text>
      <!-- Rotation arrow omega on Loop 1 -->
      <path d="M 155 125 L 155 100" stroke="#0f172a" stroke-width="2" />
      <polygon points="155,95 151,105 159,105" fill="#0f172a" />
      <text x="145" y="90" font-size="14" font-weight="bold" fill="#0f172a">ω</text>

      <!-- Loop 2 at distance 2x -->
      <ellipse cx="320" cy="130" rx="35" ry="95" fill="none" stroke="#0284c7" stroke-width="3" />
      <!-- Plus charges on Loop 2 -->
      <text x="312" y="70" font-size="13" font-weight="bold" fill="#0284c7">+</text>
      <text x="330" y="100" font-size="13" font-weight="bold" fill="#0284c7">+</text>
      <text x="335" y="130" font-size="13" font-weight="bold" fill="#0284c7">+</text>
      <text x="330" y="165" font-size="13" font-weight="bold" fill="#0284c7">+</text>
      <text x="312" y="195" font-size="13" font-weight="bold" fill="#0284c7">+</text>
      <text x="365" y="135" font-size="18" font-weight="bold" fill="#0f172a">2</text>
      <!-- Rotation arrow omega on Loop 2 -->
      <path d="M 280 120 L 280 90" stroke="#0f172a" stroke-width="2" />
      <polygon points="280,85 276,95 284,95" fill="#0f172a" />
      <text x="270" y="80" font-size="14" font-weight="bold" fill="#0f172a">ω</text>

      <!-- Distance x and 2x arrows below -->
      <!-- Distance x -->
      <line x1="40" y1="215" x2="180" y2="215" stroke="#64748b" stroke-width="1.5" />
      <line x1="40" y1="210" x2="40" y2="220" stroke="#64748b" stroke-width="1.5" />
      <line x1="180" y1="210" x2="180" y2="220" stroke="#64748b" stroke-width="1.5" />
      <text x="105" y="210" font-size="15" font-style="italic" fill="#64748b">x</text>

      <!-- Distance 2x -->
      <line x1="40" y1="245" x2="320" y2="245" stroke="#64748b" stroke-width="1.5" />
      <line x1="40" y1="240" x2="40" y2="250" stroke="#64748b" stroke-width="1.5" />
      <line x1="320" y1="240" x2="320" y2="250" stroke="#64748b" stroke-width="1.5" />
      <text x="175" y="240" font-size="15" font-style="italic" fill="#64748b">2x</text>
    </svg>
  `,

  // Q24: Rectangular loop PQRS hinged along PQ on y-axis, B0 along x-axis, horizontal equilibrium
  'moving_charges_q24_rectangular_loop_hinged.png': `
    <svg width="420" height="280" viewBox="0 0 420 280" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Coordinate axes -->
      <!-- Origin at (140, 160) -->
      <!-- z-axis: upwards -->
      <line x1="140" y1="160" x2="140" y2="40" stroke="#0f172a" stroke-width="2" />
      <polygon points="140,35 136,45 144,45" fill="#0f172a" />
      <text x="125" y="45" font-size="18" font-weight="bold" fill="#0f172a">z</text>

      <!-- y-axis: rightwards -->
      <line x1="140" y1="160" x2="330" y2="160" stroke="#0f172a" stroke-width="2" />
      <polygon points="335,160 325,156 325,164" fill="#0f172a" />
      <text x="340" y="165" font-size="18" font-weight="bold" fill="#0f172a">y</text>

      <!-- x-axis: downwards-left -->
      <line x1="140" y1="160" x2="40" y2="240" stroke="#0f172a" stroke-width="2" />
      <polygon points="35,244 43,235 48,242" fill="#0f172a" />
      <text x="25" y="245" font-size="18" font-weight="bold" fill="#0f172a">x</text>

      <!-- Rectangular loop PQRS in horizontal (x-y) plane -->
      <!-- P is on y-axis at (170, 160) -->
      <!-- Q is on y-axis at (250, 160), so PQ = b = 80 -->
      <!-- PS is parallel to x-axis, vector (-60, 48) -> S is at (110, 208) -->
      <!-- QR is parallel to x-axis, vector (-60, 48) -> R is at (190, 208) -->
      <polygon points="170,160 250,160 190,208 110,208" fill="#eff6ff" stroke="#2563eb" stroke-width="3" />

      <!-- Corner labels -->
      <text x="165" y="150" font-size="16" font-weight="bold" fill="#0f172a">P</text>
      <text x="245" y="150" font-size="16" font-weight="bold" fill="#0f172a">Q</text>
      <text x="95" y="225" font-size="16" font-weight="bold" fill="#0f172a">S</text>
      <text x="190" y="225" font-size="16" font-weight="bold" fill="#0f172a">R</text>

      <!-- Dimensions -->
      <!-- PQ = b -->
      <text x="205" y="152" font-size="14" font-style="italic" fill="#2563eb">b</text>
      <!-- SP = a -->
      <text x="125" y="180" font-size="14" font-style="italic" fill="#2563eb">a</text>

      <!-- Gravity arrow -->
      <line x1="300" y1="80" x2="300" y2="120" stroke="#ef4444" stroke-width="2" />
      <polygon points="300,125 296,115 304,115" fill="#ef4444" />
      <text x="310" y="105" font-size="14" font-weight="bold" fill="#ef4444">gravity</text>

      <!-- Magnetic field vector B0 along x-axis -->
      <line x1="80" y1="120" x2="50" y2="144" stroke="#059669" stroke-width="2.5" />
      <polygon points="46,147 52,139 57,145" fill="#059669" />
      <text x="85" y="125" font-size="14" font-weight="bold" fill="#059669">B₀ î</text>
    </svg>
  `,

  // Q25: Non-conducting rod RS rotating about O, OR=a (charge Q), OS=b (charge -2Q)
  'moving_charges_q25_rotating_rod_charges.png': `
    <svg width="450" height="200" viewBox="0 0 450 200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Rod RS -->
      <rect x="70" y="70" width="310" height="22" rx="3" fill="#f8fafc" stroke="#1e293b" stroke-width="2.5" />
      
      <!-- Pivot O -->
      <!-- Let pivot be at x = 180 (length OS = b = 110, length OR = a = 200) -->
      <line x1="180" y1="60" x2="180" y2="102" stroke="#ef4444" stroke-width="2.5" />
      <circle cx="180" cy="115" r="4" fill="#0f172a" />
      <text x="175" y="135" font-size="16" font-weight="bold" fill="#0f172a">O</text>

      <!-- Rotation arrow omega around O -->
      <path d="M 165 55 A 15 15 0 0 1 195 55" fill="none" stroke="#0f172a" stroke-width="2" />
      <polygon points="198,58 193,48 201,51" fill="#0f172a" />
      <text x="205" y="135" font-size="15" font-weight="bold" fill="#0f172a">ω</text>

      <!-- Left segment OS: negative charges '-' -->
      <g fill="#dc2626" font-size="18" font-weight="bold">
        <text x="85" y="86">−</text>
        <text x="105" y="86">−</text>
        <text x="125" y="86">−</text>
        <text x="145" y="86">−</text>
        <text x="165" y="86">−</text>
      </g>
      <text x="50" y="87" font-size="18" font-weight="bold" fill="#0f172a">S</text>
      <text x="110" y="60" font-size="14" font-weight="bold" fill="#dc2626">-2Q</text>

      <!-- Right segment OR: positive charges '+' -->
      <g fill="#2563eb" font-size="16" font-weight="bold">
        <text x="200" y="86">+</text>
        <text x="225" y="86">+</text>
        <text x="250" y="86">+</text>
        <text x="275" y="86">+</text>
        <text x="300" y="86">+</text>
        <text x="325" y="86">+</text>
        <text x="350" y="86">+</text>
      </g>
      <text x="390" y="87" font-size="18" font-weight="bold" fill="#0f172a">R</text>
      <text x="275" y="60" font-size="14" font-weight="bold" fill="#2563eb">+Q</text>

      <!-- Dimension b for OS -->
      <line x1="70" y1="150" x2="180" y2="150" stroke="#64748b" stroke-width="1.5" />
      <polygon points="70,150 78,146 78,154" fill="#64748b" />
      <polygon points="180,150 172,146 172,154" fill="#64748b" />
      <text x="120" y="168" font-size="16" font-style="italic" fill="#64748b">b</text>

      <!-- Dimension a for OR -->
      <line x1="180" y1="150" x2="380" y2="150" stroke="#64748b" stroke-width="1.5" />
      <polygon points="180,150 188,146 188,154" fill="#64748b" />
      <polygon points="380,150 372,146 372,154" fill="#64748b" />
      <text x="275" y="168" font-size="16" font-style="italic" fill="#64748b">a</text>
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
  console.log('All Batch 2 diagrams generated successfully!');
}

generateAll().catch(console.error);
