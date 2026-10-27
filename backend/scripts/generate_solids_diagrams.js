import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fyxpnmdh',
  api_key: process.env.CLOUDINARY_API_KEY || '716642519429436',
  api_secret: process.env.CLOUDINARY_API_SECRET || '69WgGypmzKl34WdRC_OLaKiaBRU',
});

const outDirBackend = path.resolve(__dirname, '../uploads/solids');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/solids');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

const SVG_HEADER = (w = 540, h = 300) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2; }
    .label { font-size: 15px; font-weight: 600; fill: #0f172a; text-anchor: middle; dominant-baseline: middle; }
    .sublabel { font-size: 13px; font-weight: 500; fill: #475569; text-anchor: middle; dominant-baseline: middle; }
    .line { stroke: #2563eb; stroke-width: 2.5; fill: none; }
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb"/>
    </marker>
    <pattern id="hatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="10" stroke="#94a3b8" stroke-width="2" />
    </pattern>
  </defs>
`;

const diagrams = {
  // Q1: Stress-strain graph at different temperatures T1, T2, T3, T4
  q1: `${SVG_HEADER(500, 300)}
    <!-- Axes -->
    <line x1="80" y1="240" x2="440" y2="240" class="axis" marker-end="url(#arrow)"/>
    <line x1="80" y1="240" x2="80" y2="40" class="axis" marker-end="url(#arrow)"/>
    <text x="450" y="240" class="label" text-anchor="start">Strain</text>
    <text x="80" y="25" class="label">Stress</text>
    
    <!-- Lines for T1, T2, T3, T4 -->
    <!-- T1: steepest -->
    <line x1="80" y1="240" x2="200" y2="60" stroke="#dc2626" stroke-width="2.5"/>
    <text x="215" y="60" class="label" fill="#dc2626">T₁</text>
    
    <!-- T2 -->
    <line x1="80" y1="240" x2="260" y2="80" stroke="#ea580c" stroke-width="2.5"/>
    <text x="275" y="80" class="label" fill="#ea580c">T₂</text>
    
    <!-- T3 -->
    <line x1="80" y1="240" x2="330" y2="110" stroke="#16a34a" stroke-width="2.5"/>
    <text x="345" y="110" class="label" fill="#16a34a">T₃</text>
    
    <!-- T4: least steep -->
    <line x1="80" y1="240" x2="390" y2="150" stroke="#2563eb" stroke-width="2.5"/>
    <text x="405" y="150" class="label" fill="#2563eb">T₄</text>
  </svg>`,

  // Q3: Two wires in series suspended from ceiling
  q3: `${SVG_HEADER(400, 320)}
    <!-- Ceiling -->
    <line x1="120" y1="40" x2="280" y2="40" stroke="#0f172a" stroke-width="3"/>
    <rect x="120" y="25" width="160" height="15" fill="url(#hatch)"/>
    
    <!-- Wire 1 (Length L, Y1) -->
    <rect x="195" y="40" width="10" height="90" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.5"/>
    <text x="160" y="85" class="label">L, Y₁</text>
    
    <!-- Junction -->
    <line x1="185" y1="130" x2="215" y2="130" stroke="#0f172a" stroke-width="2"/>
    
    <!-- Wire 2 (Length 2L, Y2) -->
    <rect x="195" y="130" width="10" height="140" fill="#94a3b8" stroke="#0f172a" stroke-width="1.5"/>
    <text x="155" y="200" class="label">2L, Y₂</text>
  </svg>`,

  // Q14: Rod with transverse section PQ inclined at angle theta
  q14: `${SVG_HEADER(520, 220)}
    <!-- Cylindrical Rod -->
    <rect x="130" y="60" width="260" height="80" rx="10" fill="#f8fafc" stroke="#0f172a" stroke-width="2"/>
    
    <!-- Left force F -->
    <line x1="130" y1="100" x2="60" y2="100" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow)"/>
    <text x="40" y="100" class="label" fill="#dc2626">F</text>
    
    <!-- Right force F -->
    <line x1="390" y1="100" x2="460" y2="100" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow)"/>
    <text x="480" y="100" class="label" fill="#dc2626">F</text>
    
    <!-- Oblique section PQ -->
    <line x1="280" y1="60" x2="240" y2="140" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="4,3"/>
    <text x="285" y="50" class="label">P</text>
    <text x="235" y="155" class="label">Q</text>
    
    <!-- Vertical dashed reference line -->
    <line x1="260" y1="60" x2="260" y2="140" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="2,2"/>
    <!-- Angle theta -->
    <path d="M 260 85 A 25 25 0 0 1 273 75" fill="none" stroke="#0f172a" stroke-width="1.5"/>
    <text x="272" y="95" class="sublabel">θ</text>
  </svg>`,

  // Q28: Two metallic cylinders A and B twisted by angle theta
  q28: `${SVG_HEADER(440, 320)}
    <!-- Fixed Top Support -->
    <rect x="140" y="20" width="160" height="15" fill="url(#hatch)"/>
    <line x1="140" y1="35" x2="300" y2="35" stroke="#0f172a" stroke-width="2"/>
    
    <!-- Cylinder A (radius 2r, length l) -->
    <rect x="180" y="35" width="80" height="100" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
    <text x="220" y="75" class="label">A</text>
    <text x="220" y="95" class="sublabel">radius = 2r</text>
    <text x="280" y="85" class="sublabel">l</text>
    
    <!-- Cylinder B (radius 3r, length l) -->
    <rect x="160" y="135" width="120" height="110" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
    <text x="220" y="180" class="label">B</text>
    <text x="220" y="200" class="sublabel">radius = 3r</text>
    <text x="300" y="190" class="sublabel">l</text>
    
    <!-- Twist at bottom -->
    <path d="M 180 265 A 40 15 0 0 0 260 265" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>
    <text x="220" y="290" class="label" fill="#2563eb">θ</text>
  </svg>`,

  // Q29: Rod on smooth horizontal surface
  q29: `${SVG_HEADER(460, 200)}
    <!-- Smooth surface -->
    <line x1="80" y1="140" x2="380" y2="140" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="80" y1="140" x2="380" y2="140" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="230" y="165" class="sublabel">Smooth horizontal surface</text>
    
    <!-- Rod -->
    <rect x="140" y="100" width="180" height="40" rx="3" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
    <text x="230" y="120" class="label">Rod (Y, α, A)</text>
    <text x="230" y="70" class="sublabel">Heated by ΔT</text>
  </svg>`,

  // Q34: Load-extension graph with points O, A, B, C, D
  q34: `${SVG_HEADER(480, 300)}
    <!-- Axes -->
    <line x1="80" y1="240" x2="420" y2="240" class="axis" marker-end="url(#arrow)"/>
    <line x1="80" y1="240" x2="80" y2="40" class="axis" marker-end="url(#arrow)"/>
    <text x="430" y="240" class="label" text-anchor="start">Load</text>
    <text x="80" y="25" class="label">Extension</text>
    
    <!-- Origin O -->
    <text x="65" y="245" class="label">O</text>
    
    <!-- Curve: Straight O to A, slight curve A to B, plastic B to C, drop to D -->
    <path d="M 80 240 L 200 150 Q 240 120 290 100 Q 330 90 350 120 L 370 160" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    
    <!-- Points -->
    <circle cx="200" cy="150" r="4" fill="#dc2626"/>
    <text x="200" y="135" class="label" fill="#dc2626">A</text>
    
    <circle cx="290" cy="100" r="4" fill="#0f172a"/>
    <text x="290" y="85" class="label">B</text>
    
    <circle cx="350" cy="120" r="4" fill="#0f172a"/>
    <text x="365" y="115" class="label">C</text>
    
    <circle cx="370" cy="160" r="4" fill="#0f172a"/>
    <text x="385" y="165" class="label">D</text>
  </svg>`,

  // Q35: Stress-strain curves for wires (1) and (2) at 60 deg and 45 deg
  q35: `${SVG_HEADER(480, 280)}
    <!-- Axes -->
    <line x1="80" y1="220" x2="400" y2="220" class="axis" marker-end="url(#arrow)"/>
    <line x1="80" y1="220" x2="80" y2="40" class="axis" marker-end="url(#arrow)"/>
    <text x="410" y="220" class="label" text-anchor="start">Strain</text>
    <text x="80" y="25" class="label">Stress</text>
    
    <!-- Line (1) at 60 deg -->
    <line x1="80" y1="220" x2="195" y2="60" stroke="#dc2626" stroke-width="2.5"/>
    <text x="205" y="55" class="label" fill="#dc2626">(1)</text>
    
    <!-- Line (2) at 45 deg -->
    <line x1="80" y1="220" x2="250" y2="90" stroke="#2563eb" stroke-width="2.5"/>
    <text x="265" y="85" class="label" fill="#2563eb">(2)</text>
    
    <!-- Angle arcs -->
    <path d="M 130 220 A 50 50 0 0 0 115 185" fill="none" stroke="#0f172a" stroke-width="1.5"/>
    <text x="145" y="195" class="sublabel">45°</text>
    
    <path d="M 150 220 A 70 70 0 0 0 115 159" fill="none" stroke="#0f172a" stroke-width="1.5"/>
    <text x="140" y="165" class="sublabel">60°</text>
  </svg>`,

  // Q40: Potential energy U vs separation r
  q40: `${SVG_HEADER(480, 280)}
    <!-- Axes -->
    <line x1="60" y1="150" x2="420" y2="150" class="axis" marker-end="url(#arrow)"/>
    <line x1="120" y1="240" x2="120" y2="40" class="axis" marker-end="url(#arrow)"/>
    <text x="430" y="150" class="label" text-anchor="start">r</text>
    <text x="120" y="25" class="label">U</text>
    
    <!-- Lennard Jones Curve -->
    <path d="M 135 45 Q 145 220 180 220 Q 240 220 400 155" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <!-- Minimum point r0 -->
    <line x1="180" y1="150" x2="180" y2="220" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,3"/>
    <circle cx="180" cy="220" r="4" fill="#dc2626"/>
    <text x="180" y="140" class="label" fill="#dc2626">r₀</text>
    <text x="180" y="240" class="sublabel" fill="#dc2626">-U₀ (min)</text>
  </svg>`,

  // Q41: Cylinder with fixed end, pulled by F, transverse section BB' at angle theta
  q41: `${SVG_HEADER(500, 220)}
    <!-- Fixed left support -->
    <rect x="70" y="50" width="15" height="110" fill="url(#hatch)"/>
    <line x1="85" y1="50" x2="85" y2="160" stroke="#0f172a" stroke-width="2.5"/>
    
    <!-- Cylinder -->
    <rect x="85" y="65" width="260" height="80" rx="6" fill="#f8fafc" stroke="#0f172a" stroke-width="2"/>
    
    <!-- Transverse section BB' inclined at theta -->
    <line x1="240" y1="65" x2="200" y2="145" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="4,3"/>
    <text x="245" y="55" class="label">B</text>
    <text x="195" y="160" class="label">B'</text>
    
    <!-- Vertical dashed line -->
    <line x1="220" y1="65" x2="220" y2="145" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="2,2"/>
    <text x="232" y="95" class="sublabel">θ</text>
    
    <!-- Force F pulling right -->
    <line x1="345" y1="105" x2="430" y2="105" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow)"/>
    <text x="445" y="105" class="label" fill="#dc2626">F</text>
  </svg>`,

  // Q43: Elastic rod on smooth surface pulled by F and 3F
  q43: `${SVG_HEADER(500, 200)}
    <!-- Smooth surface -->
    <line x1="60" y1="130" x2="440" y2="130" stroke="#0f172a" stroke-width="2"/>
    
    <!-- Rod -->
    <rect x="130" y="80" width="240" height="45" rx="3" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
    <text x="250" y="105" class="label">Elastic Rod (L, A, Y)</text>
    
    <!-- Force F to left -->
    <line x1="130" y1="102" x2="60" y2="102" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow)"/>
    <text x="40" y="102" class="label" fill="#dc2626">F</text>
    
    <!-- Force 3F to right -->
    <line x1="370" y1="102" x2="460" y2="102" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow)"/>
    <text x="475" y="102" class="label" fill="#dc2626">3F</text>
  </svg>`,

  // Q45: Two vertical hanging wires supporting m1, m2, and hanger
  q45: `${SVG_HEADER(380, 340)}
    <!-- Ceiling -->
    <line x1="120" y1="30" x2="260" y2="30" stroke="#0f172a" stroke-width="3"/>
    <rect x="120" y="15" width="140" height="15" fill="url(#hatch)"/>
    
    <!-- Wire 1 -->
    <line x1="190" y1="30" x2="190" y2="100" stroke="#0f172a" stroke-width="2.5"/>
    <text x="240" y="65" class="sublabel">A₁ = 0.006 cm²</text>
    
    <!-- Block m1 -->
    <rect x="170" y="100" width="40" height="35" rx="3" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
    <text x="190" y="120" class="label">m₁</text>
    
    <!-- Wire 2 -->
    <line x1="190" y1="135" x2="190" y2="205" stroke="#0f172a" stroke-width="2"/>
    <text x="240" y="170" class="sublabel">A₂ = 0.003 cm²</text>
    
    <!-- Block m2 -->
    <rect x="170" y="205" width="40" height="35" rx="3" fill="#94a3b8" stroke="#0f172a" stroke-width="2"/>
    <text x="190" y="225" class="label">m₂</text>
    
    <!-- Hanger Hook -->
    <path d="M 190 240 L 190 265 L 180 275 L 200 275 L 190 265" fill="none" stroke="#0f172a" stroke-width="2"/>
    <text x="235" y="275" class="sublabel">Hanger</text>
  </svg>`,

  // Q47: Stress-strain curves for materials (A) and (B)
  q47: `${SVG_HEADER(520, 240)}
    <!-- Graph A: Brittle -->
    <line x1="60" y1="180" x2="220" y2="180" class="axis" marker-end="url(#arrow)"/>
    <line x1="60" y1="180" x2="60" y2="40" class="axis" marker-end="url(#arrow)"/>
    <text x="225" y="180" class="sublabel" text-anchor="start">Strain</text>
    <text x="60" y="25" class="sublabel">Stress</text>
    <path d="M 60 180 Q 90 100 130 80" fill="none" stroke="#dc2626" stroke-width="2.5"/>
    <circle cx="130" cy="80" r="4" fill="#dc2626"/>
    <text x="130" y="210" class="label">(A) Brittle</text>
    
    <!-- Graph B: Ductile -->
    <line x1="300" y1="180" x2="480" y2="180" class="axis" marker-end="url(#arrow)"/>
    <line x1="300" y1="180" x2="300" y2="40" class="axis" marker-end="url(#arrow)"/>
    <text x="485" y="180" class="sublabel" text-anchor="start">Strain</text>
    <text x="300" y="25" class="sublabel">Stress</text>
    <path d="M 300 180 L 350 110 Q 370 100 390 105 Q 430 90 450 120" fill="none" stroke="#16a34a" stroke-width="2.5"/>
    <circle cx="450" cy="120" r="4" fill="#16a34a"/>
    <text x="390" y="210" class="label">(B) Ductile</text>
  </svg>`,

  // Q66: Elongation x vs Force F graph within proportional limit
  q66: `${SVG_HEADER(440, 260)}
    <!-- Axes -->
    <line x1="70" y1="210" x2="380" y2="210" class="axis" marker-end="url(#arrow)"/>
    <line x1="70" y1="210" x2="70" y2="40" class="axis" marker-end="url(#arrow)"/>
    <text x="390" y="210" class="label" text-anchor="start">F</text>
    <text x="70" y="25" class="label">x</text>
    <!-- Straight line passing through origin -->
    <line x1="70" y1="210" x2="320" y2="60" stroke="#2563eb" stroke-width="2.5"/>
    <text x="210" y="120" class="sublabel">x ∝ F</text>
  </svg>`,

  // Q78: Pulley system with wire of length L and two weights W
  q78: `${SVG_HEADER(400, 320)}
    <!-- Ceiling Support -->
    <rect x="150" y="20" width="100" height="15" fill="url(#hatch)"/>
    <line x1="150" y1="35" x2="250" y2="35" stroke="#0f172a" stroke-width="2"/>
    <line x1="200" y1="35" x2="200" y2="70" stroke="#0f172a" stroke-width="2"/>
    
    <!-- Pulley -->
    <circle cx="200" cy="90" r="20" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
    <circle cx="200" cy="90" r="4" fill="#0f172a"/>
    
    <!-- Wire passing over pulley -->
    <line x1="180" y1="90" x2="180" y2="210" stroke="#0f172a" stroke-width="2"/>
    <line x1="220" y1="90" x2="220" y2="210" stroke="#0f172a" stroke-width="2"/>
    
    <!-- Block 1 (left) -->
    <rect x="160" y="210" width="40" height="40" rx="3" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
    <text x="180" y="230" class="label">W</text>
    
    <!-- Block 2 (right) -->
    <rect x="200" y="210" width="40" height="40" rx="3" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
    <text x="220" y="230" class="label">W</text>
    
    <text x="260" y="150" class="sublabel">Wire: length L, area A</text>
  </svg>`,

  // Q80: Aluminium and Iron rods in series pulled by F
  q80: `${SVG_HEADER(500, 200)}
    <!-- Wall fixed at left -->
    <rect x="60" y="50" width="15" height="100" fill="url(#hatch)"/>
    <line x1="75" y1="50" x2="75" y2="150" stroke="#0f172a" stroke-width="2.5"/>
    
    <!-- Iron Rod (Fe) -->
    <rect x="75" y="80" width="150" height="40" fill="#94a3b8" stroke="#0f172a" stroke-width="2"/>
    <text x="150" y="102" class="label">Fe</text>
    
    <!-- Aluminium Rod (Al) -->
    <rect x="225" y="80" width="150" height="40" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
    <text x="300" y="102" class="label">Al</text>
    
    <!-- Pulling force F -->
    <line x1="375" y1="100" x2="450" y2="100" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow)"/>
    <text x="465" y="100" class="label" fill="#dc2626">F</text>
  </svg>`,

  // Q81: Parabolic elongation vs length L graph
  q81: `${SVG_HEADER(440, 260)}
    <!-- Axes -->
    <line x1="70" y1="210" x2="380" y2="210" class="axis" marker-end="url(#arrow)"/>
    <line x1="70" y1="210" x2="70" y2="40" class="axis" marker-end="url(#arrow)"/>
    <text x="390" y="210" class="label" text-anchor="start">Length L</text>
    <text x="70" y="25" class="label">Elongation</text>
    
    <!-- Parabolic curve y ∝ x^2 -->
    <path d="M 70 210 Q 230 205 340 60" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <text x="210" y="140" class="sublabel">Elongation ∝ L²</text>
  </svg>`,

  // Q82: Load F vs extension Δx for wires X and Y
  q82: `${SVG_HEADER(480, 280)}
    <!-- Axes -->
    <line x1="80" y1="220" x2="400" y2="220" class="axis" marker-end="url(#arrow)"/>
    <line x1="80" y1="220" x2="80" y2="40" class="axis" marker-end="url(#arrow)"/>
    <text x="410" y="220" class="label" text-anchor="start">Δx</text>
    <text x="80" y="25" class="label">F</text>
    <text x="65" y="225" class="label">O</text>
    
    <!-- Wire Y (steeper) -->
    <line x1="80" y1="220" x2="220" y2="60" stroke="#dc2626" stroke-width="2.5"/>
    <text x="230" y="55" class="label" fill="#dc2626">Y</text>
    
    <!-- Wire X (less steep) -->
    <line x1="80" y1="220" x2="330" y2="120" stroke="#2563eb" stroke-width="2.5"/>
    <text x="345" y="115" class="label" fill="#2563eb">X</text>
  </svg>`
};

async function generateAndUpload() {
  const urlMap = {};

  for (const [key, svg] of Object.entries(diagrams)) {
    const pngName = `solids_${key}.png`;
    const backendPath = path.join(outDirBackend, pngName);
    const frontendPath = path.join(outDirFrontend, pngName);

    await sharp(Buffer.from(svg.trim())).png({ quality: 95 }).toFile(backendPath);
    fs.copyFileSync(backendPath, frontendPath);
    console.log(`Rendered PNG: ${pngName}`);

    try {
      const uploadRes = await cloudinary.uploader.upload(backendPath, {
        folder: 'edvedum_solids',
        public_id: `solids_${key}`,
        overwrite: true,
        resource_type: 'image'
      });
      urlMap[key] = uploadRes.secure_url;
      console.log(`Uploaded to Cloudinary: ${key} -> ${uploadRes.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${key} to Cloudinary:`, err.message);
      urlMap[key] = `/uploads/solids/${pngName}`;
    }
  }

  const jsonPath = path.resolve(__dirname, 'solids_diagrams.json');
  fs.writeFileSync(jsonPath, JSON.stringify(urlMap, null, 2));
  console.log(`Saved diagrams map to ${jsonPath}`);
}

generateAndUpload().catch(console.error);
