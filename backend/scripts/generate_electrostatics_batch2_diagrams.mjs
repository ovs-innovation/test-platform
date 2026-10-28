import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = 'frontend/public/uploads/electric_charges/';
const backendDir = 'backend/uploads/electric_charges/';

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(backendDir)) fs.mkdirSync(backendDir, { recursive: true });

async function saveSvgAsPng(svgContent, filename) {
  const buffer = Buffer.from(svgContent);
  const pngBuffer = await sharp(buffer).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, filename), pngBuffer);
  fs.writeFileSync(path.join(backendDir, filename), pngBuffer);
  console.log(`✓ Generated ${filename}`);
}

const diagrams = {
  // Q77: Cube with vertex D and face BCGH
  'electro_q77.png': `
    <svg width="400" height="320" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Back face G-B-C-H -->
      <polygon points="260,60 340,110 340,250 260,200" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
      <!-- Edges -->
      <line x1="80" y1="110" x2="260" y2="60" stroke="#94a3b8" stroke-dasharray="4" stroke-width="2"/>
      <line x1="80" y1="250" x2="260" y2="200" stroke="#94a3b8" stroke-dasharray="4" stroke-width="2"/>
      <!-- Front face F-A-D-E -->
      <polygon points="80,110 180,160 180,300 80,250" fill="none" stroke="#1e293b" stroke-width="2.5"/>
      <!-- Connecting edges -->
      <line x1="180" y1="160" x2="340" y2="110" stroke="#1e293b" stroke-width="2.5"/>
      <line x1="180" y1="300" x2="340" y2="250" stroke="#1e293b" stroke-width="2.5"/>
      <line x1="80" y1="110" x2="260" y2="60" stroke="#1e293b" stroke-width="2.5"/>
      <line x1="260" y1="60" x2="340" y2="110" stroke="#1e293b" stroke-width="2.5"/>
      
      <!-- Labels -->
      <text x="65" y="105" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">F</text>
      <text x="185" y="155" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">A</text>
      <text x="350" y="115" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">B</text>
      <text x="260" y="50" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">G</text>
      <text x="65" y="260" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">E</text>
      <text x="185" y="320" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">D (q)</text>
      <text x="350" y="265" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">C</text>
      <text x="245" y="210" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">H</text>

      <circle cx="180" cy="300" r="6" fill="#dc2626"/>
      <text x="270" y="160" font-family="sans-serif" font-size="14" fill="#0284c7" font-weight="bold">Face BCGH</text>
    </svg>
  `,

  // Q78: Dipole on circular arc with points A, B, C
  'electro_q78.png': `
    <svg width="400" height="260" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Semicircular arc -->
      <path d="M 60 180 A 140 140 0 0 1 340 180" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="4"/>
      <!-- Axis -->
      <line x1="30" y1="180" x2="370" y2="180" stroke="#94a3b8" stroke-width="2"/>
      <line x1="200" y1="180" x2="200" y2="30" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4"/>
      <!-- Dipole charges -->
      <circle cx="160" cy="180" r="14" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
      <text x="155" y="185" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">-</text>
      <circle cx="240" cy="180" r="14" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
      <text x="234" y="186" font-family="sans-serif" font-size="16" font-weight="bold" fill="#2563eb">+</text>
      
      <!-- Points A, B, C -->
      <circle cx="60" cy="180" r="4" fill="#1e293b"/>
      <text x="55" y="205" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">A</text>
      <circle cx="200" cy="40" r="4" fill="#1e293b"/>
      <text x="205" y="35" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">B</text>
      <circle cx="340" cy="180" r="4" fill="#1e293b"/>
      <text x="335" y="205" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">C</text>
      
      <text x="195" y="210" font-family="sans-serif" font-size="14" fill="#64748b">l</text>
      <line x1="160" y1="215" x2="240" y2="215" stroke="#64748b" stroke-width="1.5"/>
      <text x="365" y="185" font-family="sans-serif" font-size="14" fill="#64748b">x</text>
    </svg>
  `,

  // Q79: Conductor with cavity, charge q, Gaussian surface S inside metal
  'electro_q79.png': `
    <svg width="340" height="280" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Conductor Outer boundary -->
      <path d="M 170 30 C 270 30, 310 90, 300 170 C 290 240, 240 260, 160 250 C 90 240, 40 210, 50 140 C 60 70, 90 30, 170 30 Z" 
            fill="#f1f5f9" stroke="#1e293b" stroke-width="2.5"/>
      <!-- Dotted Gaussian surface S in conductor -->
      <path d="M 170 60 C 240 60, 275 105, 270 165 C 260 215, 220 230, 160 220 C 105 210, 75 185, 80 140 C 85 90, 115 60, 170 60 Z" 
            fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="5"/>
      <text x="278" y="160" font-family="sans-serif" font-size="16" font-weight="bold" fill="#2563eb">S</text>
      <!-- Cavity -->
      <circle cx="170" cy="145" r="45" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
      <!-- Point charge +q -->
      <circle cx="170" cy="145" r="6" fill="#dc2626"/>
      <text x="180" y="150" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">+q</text>
    </svg>
  `,

  // Q80: Non-conducting sheet S, uncharged metal rods A and B
  'electro_q80.png': `
    <svg width="400" height="220" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Sheet S -->
      <line x1="80" y1="30" x2="80" y2="190" stroke="#2563eb" stroke-width="3" stroke-dasharray="6"/>
      <text x="55" y="115" font-family="sans-serif" font-size="18" font-weight="bold" fill="#2563eb">S</text>
      <!-- Rod A -->
      <rect x="150" y="95" width="70" height="30" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
      <text x="180" y="85" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">A</text>
      <!-- Rod B -->
      <rect x="260" y="95" width="70" height="30" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
      <text x="290" y="85" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">B</text>
    </svg>
  `,

  // Q82: Electric field to left, particle +q moving right with velocity v
  'electro_q82.png': `
    <svg width="400" height="220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr" markerWidth="10" markerHeight="10" refX="2" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#64748b" />
        </marker>
        <marker id="arr-v" markerWidth="10" markerHeight="10" refX="2" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#2563eb" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Electric field lines (leftwards) -->
      <line x1="340" y1="50" x2="60" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#arr)"/>
      <line x1="340" y1="100" x2="60" y2="100" stroke="#94a3b8" stroke-width="2" marker-end="url(#arr)"/>
      <line x1="340" y1="150" x2="60" y2="150" stroke="#94a3b8" stroke-width="2" marker-end="url(#arr)"/>
      <line x1="340" y1="200" x2="60" y2="200" stroke="#94a3b8" stroke-width="2" marker-end="url(#arr)"/>
      <text x="350" y="105" font-family="sans-serif" font-size="16" font-weight="bold" fill="#64748b">E</text>

      <!-- Particle -->
      <circle cx="160" cy="125" r="8" fill="#dc2626"/>
      <text x="150" y="115" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b">m, q</text>
      <!-- Velocity arrow rightward -->
      <line x1="170" y1="125" x2="250" y2="125" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arr-v)"/>
      <text x="255" y="130" font-family="sans-serif" font-size="16" font-weight="bold" fill="#2563eb">v</text>
    </svg>
  `,

  // Q84: Concentric shells A (charge q), B (earthed), Gaussian surface S
  'electro_q84.png': `
    <svg width="360" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Inner shell A -->
      <circle cx="160" cy="150" r="45" fill="#f8fafc" stroke="#1e293b" stroke-width="2"/>
      <text x="135" y="145" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">A</text>
      <text x="170" y="145" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">+q</text>
      <!-- Outer shell B -->
      <circle cx="160" cy="150" r="85" fill="none" stroke="#1e293b" stroke-width="2.5"/>
      <text x="175" y="225" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">B</text>
      <!-- Earthing of B -->
      <line x1="245" y1="150" x2="280" y2="150" stroke="#1e293b" stroke-width="2"/>
      <line x1="280" y1="150" x2="280" y2="180" stroke="#1e293b" stroke-width="2"/>
      <line x1="265" y1="180" x2="295" y2="180" stroke="#1e293b" stroke-width="3"/>
      <line x1="270" y1="185" x2="290" y2="185" stroke="#1e293b" stroke-width="2"/>
      <line x1="275" y1="190" x2="285" y2="190" stroke="#1e293b" stroke-width="1.5"/>

      <!-- Gaussian surface S -->
      <circle cx="160" cy="150" r="115" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="5"/>
      <text x="245" y="60" font-family="sans-serif" font-size="16" font-weight="bold" fill="#2563eb">S</text>
    </svg>
  `,

  // Q119: Conducting sphere radius R with charge Q, point charge -Q at distance r
  'electro_q119.png': `
    <svg width="400" height="260" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Sphere -->
      <circle cx="130" cy="130" r="70" fill="#f1f5f9" stroke="#1e293b" stroke-width="2.5"/>
      <text x="120" y="45" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">Q</text>
      <!-- Radius R -->
      <line x1="130" y1="130" x2="180" y2="80" stroke="#64748b" stroke-width="2"/>
      <text x="145" y="100" font-family="sans-serif" font-size="15" font-weight="bold" fill="#64748b">R</text>
      <circle cx="130" cy="130" r="3" fill="#1e293b"/>
      
      <!-- Distance r line -->
      <line x1="130" y1="130" x2="330" y2="130" stroke="#94a3b8" stroke-dasharray="4" stroke-width="2"/>
      <text x="230" y="150" font-family="sans-serif" font-size="15" font-weight="bold" fill="#64748b">r</text>

      <!-- Charge -Q -->
      <circle cx="330" cy="130" r="8" fill="#3b82f6"/>
      <text x="320" y="115" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">-Q</text>
    </svg>
  `,

  // Q120: Cube with corner charge q, shaded surface
  'electro_q120.png': `
    <svg width="340" height="280" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Bottom shaded surface -->
      <polygon points="60,200 160,240 260,200 160,160" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
      
      <!-- Front cube frame -->
      <polygon points="60,100 160,140 160,240 60,200" fill="none" stroke="#1e293b" stroke-width="2"/>
      <polygon points="160,140 260,100 260,200 160,240" fill="none" stroke="#1e293b" stroke-width="2"/>
      <polygon points="60,100 160,60 260,100 160,140" fill="none" stroke="#1e293b" stroke-width="2"/>

      <!-- Corner charge q at (60, 100) -->
      <circle cx="60" cy="100" r="6" fill="#dc2626"/>
      <text x="40" y="95" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">q</text>
      <text x="135" y="210" font-family="sans-serif" font-size="13" fill="#1e293b">Shaded</text>
    </svg>
  `,

  // Q129: Cylinder with charge Q at center, plane surface A
  'electro_q129.png': `
    <svg width="420" height="220" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Cylinder body -->
      <line x1="100" y1="60" x2="320" y2="60" stroke="#1e293b" stroke-width="2.5"/>
      <line x1="100" y1="160" x2="320" y2="160" stroke="#1e293b" stroke-width="2.5"/>
      <!-- Left end A -->
      <ellipse cx="100" cy="110" rx="20" ry="50" fill="#e2e8f0" stroke="#1e293b" stroke-width="2.5"/>
      <text x="95" y="195" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1e293b">A</text>
      <!-- Right end B -->
      <ellipse cx="320" cy="110" rx="20" ry="50" fill="none" stroke="#1e293b" stroke-width="2.5"/>
      <text x="315" y="195" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1e293b">B</text>
      <!-- Center charge Q -->
      <line x1="100" y1="110" x2="320" y2="110" stroke="#94a3b8" stroke-dasharray="4" stroke-width="1.5"/>
      <circle cx="210" cy="110" r="6" fill="#dc2626"/>
      <text x="205" y="135" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">Q</text>
      <text x="200" y="45" font-family="sans-serif" font-size="15" fill="#64748b">Flux \u03c6</text>
    </svg>
  `,

  // Q130: Three parallel plates with charges -5Q, neutral, Q, point x
  'electro_q130.png': `
    <svg width="420" height="260" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Plate 1 (-5Q) -->
      <rect x="100" y="40" width="220" height="12" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5" rx="3"/>
      <text x="40" y="52" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">-5Q</text>
      <text x="335" y="52" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">1</text>
      
      <!-- Point x -->
      <circle cx="210" cy="80" r="3" fill="#1e293b"/>
      <text x="220" y="85" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">x</text>

      <!-- Plate 2 (neutral) -->
      <rect x="100" y="110" width="220" height="12" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5" rx="3"/>
      <text x="335" y="122" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">2</text>

      <!-- Plate 3 (Q) -->
      <rect x="100" y="180" width="220" height="12" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5" rx="3"/>
      <text x="50" y="192" font-family="sans-serif" font-size="16" font-weight="bold" fill="#2563eb">Q</text>
      <text x="335" y="192" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">3</text>
    </svg>
  `,

  // Q133: Hemispherical surface with charge +q at open face center
  'electro_q133.png': `
    <svg width="340" height="240" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Open circular face -->
      <ellipse cx="170" cy="70" rx="90" ry="22" fill="#f8fafc" stroke="#1e293b" stroke-width="2"/>
      <!-- Curved surface -->
      <path d="M 80 70 A 90 90 0 0 0 260 70" fill="#f1f5f9" stroke="#1e293b" stroke-width="2.5"/>
      <!-- Center charge +q -->
      <circle cx="170" cy="70" r="5" fill="#dc2626"/>
      <text x="162" y="95" font-family="sans-serif" font-size="15" font-weight="bold" fill="#dc2626">+q</text>
      <!-- Radius r -->
      <line x1="170" y1="70" x2="260" y2="70" stroke="#64748b" stroke-width="1.5"/>
      <text x="210" y="60" font-family="sans-serif" font-size="14" fill="#64748b">r</text>
    </svg>
  `,

  // Q139: Square ABCD with charges +q, -2q, +2q, -q
  'electro_q139.png': `
    <svg width="340" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Square -->
      <rect x="80" y="60" width="180" height="180" fill="none" stroke="#1e293b" stroke-width="2.5"/>
      <!-- Diagonal lines dashed -->
      <line x1="80" y1="60" x2="260" y2="240" stroke="#cbd5e1" stroke-dasharray="4" stroke-width="1.5"/>
      <line x1="80" y1="240" x2="260" y2="60" stroke="#cbd5e1" stroke-dasharray="4" stroke-width="1.5"/>

      <!-- Vertices -->
      <!-- B (-2q) top-left -->
      <circle cx="80" cy="60" r="6" fill="#1e293b"/>
      <text x="50" y="55" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">B</text>
      <text x="70" y="45" font-family="sans-serif" font-size="15" font-weight="bold" fill="#3b82f6">-2q</text>

      <!-- C (+2q) top-right -->
      <circle cx="260" cy="60" r="6" fill="#1e293b"/>
      <text x="275" y="55" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">C</text>
      <text x="245" y="45" font-family="sans-serif" font-size="15" font-weight="bold" fill="#dc2626">+2q</text>

      <!-- A (+q) bottom-left -->
      <circle cx="80" cy="240" r="6" fill="#1e293b"/>
      <text x="50" y="260" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">A</text>
      <text x="70" y="270" font-family="sans-serif" font-size="15" font-weight="bold" fill="#dc2626">+q</text>

      <!-- D (-q) bottom-right -->
      <circle cx="260" cy="240" r="6" fill="#1e293b"/>
      <text x="275" y="260" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">D</text>
      <text x="250" y="270" font-family="sans-serif" font-size="15" font-weight="bold" fill="#3b82f6">-q</text>
    </svg>
  `,

  // Q141: Four conducting plates A, B, C, D with charges Q1, Q2, q1, q2
  'electro_q141.png': `
    <svg width="420" height="260" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <!-- Plate A -->
      <rect x="70" y="50" width="18" height="160" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
      <text x="72" y="40" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">A</text>
      
      <!-- Plate B -->
      <rect x="140" y="50" width="18" height="160" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
      <text x="142" y="40" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">B</text>
      <text x="110" y="135" font-family="sans-serif" font-size="15" font-weight="bold" fill="#2563eb">q₁</text>

      <!-- Plate C -->
      <rect x="230" y="50" width="18" height="160" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
      <text x="232" y="40" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">C</text>
      <text x="260" y="135" font-family="sans-serif" font-size="15" font-weight="bold" fill="#2563eb">q₂</text>

      <!-- Plate D -->
      <rect x="300" y="50" width="18" height="160" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
      <text x="302" y="40" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">D</text>

      <text x="65" y="240" font-family="sans-serif" font-size="15" fill="#64748b">Q₁</text>
      <text x="295" y="240" font-family="sans-serif" font-size="15" fill="#64748b">Q₂</text>
    </svg>
  `
};

async function generateAll() {
  console.log(`Generating ${Object.keys(diagrams).length} diagrams for batch 2...`);
  for (const [filename, svg] of Object.entries(diagrams)) {
    await saveSvgAsPng(svg, filename);
  }
  console.log('All batch 2 diagrams generated successfully!');
}

generateAll();
