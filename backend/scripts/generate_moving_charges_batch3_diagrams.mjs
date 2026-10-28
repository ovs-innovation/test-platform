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
  // Q26: Folded rectangular loop ABCD about perpendicular bisector EF
  'moving_charges_q26_folded_loop.png': `
    <svg width="480" height="250" viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Fig 1: Flat rectangular loop ABCD -->
      <g transform="translate(30, 40)">
        <rect x="0" y="0" width="160" height="110" fill="#eff6ff" stroke="#0284c7" stroke-width="3" />
        <!-- Midline EF -->
        <line x1="80" y1="0" x2="80" y2="110" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4" />
        <!-- Current arrows -->
        <polygon points="40,0 30,-5 30,5" fill="#0284c7" />
        <polygon points="160,55 155,45 165,45" fill="#0284c7" />
        <polygon points="120,110 130,105 130,115" fill="#0284c7" />
        <polygon points="0,55 5,65 -5,65" fill="#0284c7" />
        <!-- Labels -->
        <text x="-15" y="-5" font-size="16" font-weight="bold" fill="#0f172a">A</text>
        <text x="165" y="-5" font-size="16" font-weight="bold" fill="#0f172a">B</text>
        <text x="165" y="125" font-size="16" font-weight="bold" fill="#0f172a">C</text>
        <text x="-15" y="125" font-size="16" font-weight="bold" fill="#0f172a">D</text>
        <text x="75" y="-5" font-size="15" font-weight="bold" fill="#ef4444">F</text>
        <text x="75" y="128" font-size="15" font-weight="bold" fill="#ef4444">E</text>
        <text x="-25" y="55" font-size="15" font-style="italic" fill="#0284c7">i</text>
        <text x="50" y="150" font-size="16" font-weight="bold" fill="#64748b">(Fig 1)</text>
      </g>

      <!-- Arrow => -->
      <text x="215" y="105" font-size="28" font-weight="bold" fill="#64748b">⇒</text>

      <!-- Fig 2: Folded 3D loop into two perpendicular planes -->
      <g transform="translate(270, 30)">
        <!-- Vertical plane AFED -->
        <polygon points="40,20 85,45 85,135 40,110" fill="#dbeafe" stroke="#0284c7" stroke-width="2.5" />
        <!-- Horizontal/Perpendicular plane ECBF -->
        <polygon points="85,45 155,45 155,135 85,135" fill="#bfdbfe" stroke="#0284c7" stroke-width="2.5" />
        <!-- Right angle symbol at fold F -->
        <path d="M 75 40 L 80 43 L 85 45" fill="none" stroke="#ef4444" stroke-width="2" />
        <!-- Labels -->
        <text x="30" y="15" font-size="16" font-weight="bold" fill="#0f172a">A</text>
        <text x="30" y="125" font-size="16" font-weight="bold" fill="#0f172a">D</text>
        <text x="90" y="40" font-size="16" font-weight="bold" fill="#ef4444">F</text>
        <text x="75" y="152" font-size="16" font-weight="bold" fill="#ef4444">E</text>
        <text x="160" y="45" font-size="16" font-weight="bold" fill="#0f172a">B</text>
        <text x="160" y="145" font-size="16" font-weight="bold" fill="#0f172a">C</text>
        <!-- Current arrow on AD -->
        <polygon points="40,60 36,70 44,70" fill="#0284c7" />
        <text x="20" y="65" font-size="14" font-style="italic" fill="#0284c7">i</text>
        <text x="80" y="180" font-size="16" font-weight="bold" fill="#64748b">(Fig 2)</text>
      </g>
    </svg>
  `,

  // Q28: Particle deflected by angle theta across magnetic slab x=0 to x=d
  'moving_charges_q28_particle_deflection_slab.png': `
    <svg width="380" height="260" viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Slab boundary lines -->
      <line x1="100" y1="20" x2="100" y2="200" stroke="#0f172a" stroke-width="2" stroke-dasharray="4,4" />
      <line x1="220" y1="20" x2="220" y2="200" stroke="#0f172a" stroke-width="2" stroke-dasharray="4,4" />

      <!-- Magnetic field into page (x) inside slab -->
      <g stroke="#94a3b8" stroke-width="2">
        <path d="M 125 50 L 135 60 M 135 50 L 125 60" />
        <path d="M 185 50 L 195 60 M 195 50 L 185 60" />
        <path d="M 125 110 L 135 120 M 135 110 L 125 120" />
        <path d="M 185 110 L 195 120 M 195 110 L 185 120" />
      </g>

      <!-- Particle trajectory entering at x = 0 -->
      <line x1="40" y1="160" x2="100" y2="160" stroke="#ef4444" stroke-width="3" />
      <circle cx="100" cy="160" r="4" fill="#ef4444" />
      <polygon points="80,160 70,155 70,165" fill="#ef4444" />
      <text x="65" y="150" font-size="16" font-weight="bold" fill="#ef4444">v</text>

      <!-- Circular curved path from (100, 160) to (220, 100) -->
      <path d="M 100 160 A 180 180 0 0 0 220 95" fill="none" stroke="#ef4444" stroke-width="3" />
      <!-- Emerging line at angle theta -->
      <line x1="220" y1="95" x2="290" y2="57" stroke="#ef4444" stroke-width="3" />
      <polygon points="260,73 250,73 256,64" fill="#ef4444" />

      <!-- Horizontal reference dashed line from (220, 95) -->
      <line x1="220" y1="95" x2="310" y2="95" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />
      <!-- Angle theta arc -->
      <path d="M 260 95 A 40 40 0 0 0 256 75" fill="none" stroke="#0f172a" stroke-width="1.5" />
      <text x="268" y="85" font-size="15" font-weight="bold" fill="#0f172a">θ</text>

      <!-- Labels for x = 0 and x = d -->
      <text x="85" y="225" font-size="16" font-weight="bold" fill="#0f172a">x = 0</text>
      <text x="195" y="225" font-size="16" font-weight="bold" fill="#0f172a">x = d &lt; (mv/qB)</text>
    </svg>
  `,

  // Q30: Square loop PQRS with uniform magnetic field along PS
  'moving_charges_q30_square_loop.png': `
    <svg width="320" height="240" viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Square loop PQRS -->
      <rect x="90" y="50" width="130" height="130" fill="#eff6ff" stroke="#2563eb" stroke-width="3" />

      <!-- Current arrows around PQRS -->
      <polygon points="90,110 85,120 95,120" fill="#2563eb" /> <!-- Q to P -->
      <polygon points="155,180 145,175 145,185" fill="#2563eb" /> <!-- P to S -->
      <polygon points="220,120 215,110 225,110" fill="#2563eb" /> <!-- S to R -->
      <polygon points="155,50 165,45 165,55" fill="#2563eb" /> <!-- R to Q -->

      <!-- Vertex Labels -->
      <text x="68" y="55" font-size="18" font-weight="bold" fill="#0f172a">Q</text>
      <text x="230" y="55" font-size="18" font-weight="bold" fill="#0f172a">R</text>
      <text x="68" y="195" font-size="18" font-weight="bold" fill="#0f172a">P</text>
      <text x="230" y="195" font-size="18" font-weight="bold" fill="#0f172a">S</text>

      <!-- Magnetic field arrow along PS -->
      <line x1="90" y1="215" x2="220" y2="215" stroke="#ef4444" stroke-width="2.5" />
      <polygon points="225,215 215,210 215,220" fill="#ef4444" />
      <text x="145" y="235" font-size="15" font-weight="bold" fill="#ef4444">B⃗ (along PS)</text>
    </svg>
  `,

  // Q31: Four candidate graphs of B vs r for a long solid cylinder
  'moving_charges_q31_cylinder_b_graphs.png': `
    <svg width="460" height="400" viewBox="0 0 460 400" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Solid cylinder illustration at top -->
      <g transform="translate(130, 20)">
        <line x1="30" y1="20" x2="170" y2="20" stroke="#0f172a" stroke-width="2" />
        <line x1="30" y1="60" x2="170" y2="60" stroke="#0f172a" stroke-width="2" />
        <ellipse cx="30" cy="40" rx="10" ry="20" fill="#e2e8f0" stroke="#0f172a" stroke-width="2" />
        <ellipse cx="170" cy="40" rx="10" ry="20" fill="#e2e8f0" stroke="#0f172a" stroke-width="2" />
        <!-- Axis and radius R -->
        <line x1="100" y1="40" x2="100" y2="20" stroke="#ef4444" stroke-width="2" />
        <polygon points="100,18 96,26 104,26" fill="#ef4444" />
        <text x="110" y="32" font-size="16" font-weight="bold" fill="#ef4444">R</text>
      </g>

      <!-- Graph (1): zero inside, 1/r outside -->
      <g transform="translate(40, 110)">
        <text x="-25" y="20" font-size="16" font-weight="bold" fill="#0f172a">(1)</text>
        <line x1="0" y1="90" x2="140" y2="90" stroke="#0f172a" stroke-width="1.5" />
        <line x1="0" y1="90" x2="0" y2="10" stroke="#0f172a" stroke-width="1.5" />
        <text x="-15" y="15" font-size="14" font-weight="bold" fill="#0f172a">B</text>
        <text x="145" y="95" font-size="14" font-weight="bold" fill="#0f172a">r</text>
        <!-- Curve -->
        <line x1="0" y1="90" x2="50" y2="90" stroke="#2563eb" stroke-width="2.5" />
        <path d="M 50 40 Q 75 75 130 85" fill="none" stroke="#2563eb" stroke-width="2.5" />
        <line x1="50" y1="90" x2="50" y2="40" stroke="#64748b" stroke-dasharray="3,3" />
        <text x="35" y="105" font-size="12" fill="#64748b">r=R</text>
      </g>

      <!-- Graph (2): Linear inside, 1/r outside (CORRECT) -->
      <g transform="translate(260, 110)">
        <text x="-25" y="20" font-size="16" font-weight="bold" fill="#0f172a">(2)</text>
        <line x1="0" y1="90" x2="140" y2="90" stroke="#0f172a" stroke-width="1.5" />
        <line x1="0" y1="90" x2="0" y2="10" stroke="#0f172a" stroke-width="1.5" />
        <text x="-15" y="15" font-size="14" font-weight="bold" fill="#0f172a">B</text>
        <text x="145" y="95" font-size="14" font-weight="bold" fill="#0f172a">r</text>
        <!-- Curve -->
        <line x1="0" y1="90" x2="50" y2="35" stroke="#16a34a" stroke-width="3" />
        <path d="M 50 35 Q 75 75 130 85" fill="none" stroke="#16a34a" stroke-width="3" />
        <line x1="50" y1="90" x2="50" y2="35" stroke="#64748b" stroke-dasharray="3,3" />
        <text x="35" y="105" font-size="12" fill="#64748b">r=R</text>
      </g>

      <!-- Graph (3): Constant inside, 1/r outside -->
      <g transform="translate(40, 260)">
        <text x="-25" y="20" font-size="16" font-weight="bold" fill="#0f172a">(3)</text>
        <line x1="0" y1="90" x2="140" y2="90" stroke="#0f172a" stroke-width="1.5" />
        <line x1="0" y1="90" x2="0" y2="10" stroke="#0f172a" stroke-width="1.5" />
        <text x="-15" y="15" font-size="14" font-weight="bold" fill="#0f172a">B</text>
        <text x="145" y="95" font-size="14" font-weight="bold" fill="#0f172a">r</text>
        <!-- Curve -->
        <line x1="0" y1="40" x2="50" y2="40" stroke="#2563eb" stroke-width="2.5" />
        <path d="M 50 40 Q 75 75 130 85" fill="none" stroke="#2563eb" stroke-width="2.5" />
        <line x1="50" y1="90" x2="50" y2="40" stroke="#64748b" stroke-dasharray="3,3" />
        <text x="35" y="105" font-size="12" fill="#64748b">r=R</text>
      </g>

      <!-- Graph (4): Quadratic flat peak inside, 1/r outside -->
      <g transform="translate(260, 260)">
        <text x="-25" y="20" font-size="16" font-weight="bold" fill="#0f172a">(4)</text>
        <line x1="0" y1="90" x2="140" y2="90" stroke="#0f172a" stroke-width="1.5" />
        <line x1="0" y1="90" x2="0" y2="10" stroke="#0f172a" stroke-width="1.5" />
        <text x="-15" y="15" font-size="14" font-weight="bold" fill="#0f172a">B</text>
        <text x="145" y="95" font-size="14" font-weight="bold" fill="#0f172a">r</text>
        <!-- Curve -->
        <path d="M 0 40 Q 30 40 50 50 Q 80 80 130 85" fill="none" stroke="#2563eb" stroke-width="2.5" />
        <line x1="50" y1="90" x2="50" y2="50" stroke="#64748b" stroke-dasharray="3,3" />
        <text x="35" y="105" font-size="12" fill="#64748b">r=R</text>
      </g>
    </svg>
  `,

  // Q32: Triangular current carrying loop with angles 30, 120, 30
  'moving_charges_q32_triangular_loop.png': `
    <svg width="400" height="240" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Uniform magnetic field into page (x) -->
      <g stroke="#cbd5e1" stroke-width="2">
        <path d="M 50 40 L 60 50 M 60 40 L 50 50" />
        <path d="M 120 40 L 130 50 M 130 40 L 120 50" />
        <path d="M 280 40 L 290 50 M 290 40 L 280 50" />
        <path d="M 350 40 L 360 50 M 360 40 L 350 50" />
        <path d="M 50 160 L 60 170 M 60 160 L 50 170" />
        <path d="M 350 160 L 360 170 M 360 160 L 350 170" />
      </g>
      <text x="355" y="190" font-size="16" font-weight="bold" fill="#64748b">B⃗ ⊗</text>

      <!-- Triangle vertices: A(60, 180), C(200, 70), D(340, 180) -->
      <polygon points="60,180 200,70 340,180" fill="#eff6ff" stroke="#0284c7" stroke-width="3" />

      <!-- Current arrows: A -> C -> D -> A -->
      <polygon points="130,125 120,123 125,133" fill="#0284c7" />
      <text x="115" y="115" font-size="16" font-style="italic" fill="#0284c7">i</text>
      <polygon points="270,125 275,133 280,123" fill="#0284c7" />
      <polygon points="200,180 190,175 190,185" fill="#0284c7" />

      <!-- Angle labels -->
      <!-- At A: 30 deg -->
      <path d="M 90 180 A 30 30 0 0 0 85 160" fill="none" stroke="#ef4444" stroke-width="1.5" />
      <text x="95" y="175" font-size="13" font-weight="bold" fill="#ef4444">30°</text>

      <!-- At D: 30 deg -->
      <path d="M 310 180 A 30 30 0 0 1 315 160" fill="none" stroke="#ef4444" stroke-width="1.5" />
      <text x="280" y="175" font-size="13" font-weight="bold" fill="#ef4444">30°</text>

      <!-- At C: 120 deg -->
      <path d="M 183 83 A 20 20 0 0 0 217 83" fill="none" stroke="#ef4444" stroke-width="1.5" />
      <text x="185" y="105" font-size="13" font-weight="bold" fill="#ef4444">120°</text>

      <!-- Vertex labels -->
      <text x="40" y="195" font-size="18" font-weight="bold" fill="#0f172a">A</text>
      <text x="195" y="55" font-size="18" font-weight="bold" fill="#0f172a">C</text>
      <text x="345" y="195" font-size="18" font-weight="bold" fill="#0f172a">D</text>
    </svg>
  `,

  // Q33: Coordinate axes showing E-field along +y and charge projected along +x
  'moving_charges_q33_coordinate_system.png': `
    <svg width="340" height="260" viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Coordinate Axes: Origin at (120, 160) -->
      <!-- y-axis -->
      <line x1="120" y1="160" x2="120" y2="40" stroke="#0f172a" stroke-width="2" />
      <polygon points="120,35 116,45 124,45" fill="#0f172a" />
      <text x="115" y="25" font-size="18" font-weight="bold" fill="#0f172a">y</text>

      <!-- x-axis -->
      <line x1="120" y1="160" x2="270" y2="160" stroke="#0f172a" stroke-width="2" />
      <polygon points="275,160 265,156 265,164" fill="#0f172a" />
      <text x="285" y="165" font-size="18" font-weight="bold" fill="#0f172a">x</text>

      <!-- z-axis -->
      <line x1="120" y1="160" x2="40" y2="230" stroke="#0f172a" stroke-width="2" />
      <polygon points="35,234 43,225 48,232" fill="#0f172a" />
      <text x="25" y="240" font-size="18" font-weight="bold" fill="#0f172a">z</text>

      <!-- Electric field arrows along +y -->
      <g stroke="#2563eb" stroke-width="2">
        <line x1="145" y1="150" x2="145" y2="120" />
        <polygon points="145,115 142,125 148,125" fill="#2563eb" />
        <line x1="165" y1="150" x2="165" y2="120" />
        <polygon points="165,115 162,125 168,125" fill="#2563eb" />
        <line x1="185" y1="150" x2="185" y2="120" />
        <polygon points="185,115 182,125 188,125" fill="#2563eb" />
      </g>
      <text x="160" y="105" font-size="16" font-weight="bold" fill="#2563eb">E⃗</text>

      <!-- Velocity vector of q along +x -->
      <line x1="120" y1="160" x2="200" y2="160" stroke="#ef4444" stroke-width="3" />
      <polygon points="205,160 195,155 195,165" fill="#ef4444" />
      <text x="180" y="180" font-size="15" font-weight="bold" fill="#ef4444">v⃗</text>
    </svg>
  `,

  // Q34: Sphere with current loop on inclined plane under downward B
  'moving_charges_q34_sphere_incline.png': `
    <svg width="380" height="280" viewBox="0 0 380 280" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Inclined plane -->
      <polygon points="60,230 320,230 60,60" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5" />
      <!-- Incline angle theta -->
      <path d="M 280 230 A 40 40 0 0 0 295 210" fill="none" stroke="#ef4444" stroke-width="1.5" />
      <text x="260" y="222" font-size="16" font-weight="bold" fill="#ef4444">θ</text>

      <!-- Sphere on incline -->
      <!-- Incline goes from (60,60) to (320,230). Vector (260, 170). Unit vector along incline ~ (0.837, 0.547). Normal ~ (-0.547, 0.837) -->
      <!-- Let contact point be around (150, 118.8). Center of sphere (radius 36): (150 - 36*(-0.547), 118.8 - 36*0.837) = (170, 88.7) -->
      <g transform="translate(165, 85)">
        <circle cx="0" cy="0" r="36" fill="#eff6ff" stroke="#0f172a" stroke-width="2.5" />
        <!-- Equatorial current loop (ellipse parallel to incline) -->
        <g transform="rotate(33)">
          <ellipse cx="0" cy="0" rx="36" ry="12" fill="none" stroke="#0284c7" stroke-width="2.5" />
          <polygon points="0,-12 -8,-8 -8,-16" fill="#0284c7" />
          <text x="-5" y="8" font-size="15" font-weight="bold" fill="#0284c7">I</text>
        </g>
      </g>

      <!-- Downward magnetic field B -->
      <line x1="80" y1="120" x2="80" y2="180" stroke="#059669" stroke-width="2.5" />
      <polygon points="80,185 76,175 84,175" fill="#059669" />
      <text x="90" y="155" font-size="18" font-weight="bold" fill="#059669">B⃗</text>
    </svg>
  `,

  // Q35: Rotating uniformly charged ring/disc of thickness t
  'moving_charges_q35_charged_ring_thickness.png': `
    <svg width="360" height="220" viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Central vertical axis of rotation -->
      <line x1="180" y1="30" x2="180" y2="190" stroke="#0f172a" stroke-width="2" stroke-dasharray="4,4" />
      
      <!-- Cylindrical ring of thickness t -->
      <!-- Top surface ellipse -->
      <ellipse cx="180" cy="90" rx="80" ry="24" fill="#eff6ff" stroke="#0284c7" stroke-width="2" />
      <!-- Side rect/path -->
      <path d="M 100 90 L 100 115 A 80 24 0 0 0 260 115 L 260 90 Z" fill="#dbeafe" stroke="#0284c7" stroke-width="2" />
      
      <!-- Pluses representing surface charge density sigma -->
      <g fill="#2563eb" font-size="13" font-weight="bold">
        <text x="115" y="107">+</text>
        <text x="140" y="112">+</text>
        <text x="170" y="114">+</text>
        <text x="200" y="114">+</text>
        <text x="225" y="110">+</text>
      </g>

      <!-- Thickness dimension t -->
      <line x1="275" y1="90" x2="275" y2="115" stroke="#ef4444" stroke-width="1.5" />
      <line x1="270" y1="90" x2="280" y2="90" stroke="#ef4444" stroke-width="1.5" />
      <line x1="270" y1="115" x2="280" y2="115" stroke="#ef4444" stroke-width="1.5" />
      <text x="285" y="106" font-size="16" font-style="italic" fill="#ef4444">t</text>

      <!-- Angular velocity omega arrow at top of axis -->
      <path d="M 165 45 A 15 15 0 0 1 195 45" fill="none" stroke="#0f172a" stroke-width="2" />
      <polygon points="198,48 193,38 201,41" fill="#0f172a" />
      <text x="205" y="45" font-size="16" font-weight="bold" fill="#0f172a">ω</text>
    </svg>
  `,

  // Q37: Two concentric perpendicular circular coils carrying equal currents
  'moving_charges_q37_perpendicular_coils.png': `
    <svg width="340" height="260" viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Common Centre -->
      <circle cx="170" cy="130" r="4" fill="#0f172a" />

      <!-- Horizontal coil (ellipse) -->
      <ellipse cx="170" cy="130" rx="90" ry="28" fill="none" stroke="#0284c7" stroke-width="3" />
      <!-- Current arrows on horizontal coil -->
      <polygon points="170,102 160,98 160,106" fill="#0284c7" />
      <polygon points="170,158 180,154 180,162" fill="#0284c7" />

      <!-- Vertical coil (ellipse) -->
      <ellipse cx="170" cy="130" rx="28" ry="90" fill="none" stroke="#dc2626" stroke-width="3" />
      <!-- Current arrows on vertical coil -->
      <polygon points="198,130 194,140 202,140" fill="#dc2626" />
      <polygon points="142,130 138,120 146,120" fill="#dc2626" />
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
  console.log('All Batch 3 diagrams generated successfully!');
}

generateAll().catch(console.error);
