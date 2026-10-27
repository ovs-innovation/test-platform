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

const outDirBackend = path.resolve(__dirname, '../uploads/fluids');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/fluids');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

const SVG_HEADER = (w = 540, h = 300) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2; }
    .label { font-size: 15px; font-weight: 600; fill: #0f172a; text-anchor: middle; dominant-baseline: middle; }
    .sublabel { font-size: 13px; font-weight: 500; fill: #475569; text-anchor: middle; dominant-baseline: middle; }
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
  // Q1: Tank with immiscible liquids rho and 2rho of height H each, orifice at bottom
  q1: `${SVG_HEADER(480, 300)}
    <!-- Tank outline -->
    <rect x="140" y="40" width="180" height="200" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Top liquid rho -->
    <rect x="141" y="41" width="178" height="99" fill="#e0f2fe" opacity="0.8"/>
    <text x="230" y="90" class="label">ρ</text>
    <text x="110" y="90" class="label">H</text>
    <line x1="125" y1="40" x2="125" y2="140" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <!-- Bottom liquid 2rho -->
    <rect x="141" y="140" width="178" height="99" fill="#93c5fd" opacity="0.8"/>
    <text x="230" y="190" class="label">2ρ</text>
    <text x="110" y="190" class="label">H</text>
    <line x1="125" y1="140" x2="125" y2="240" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <!-- Interface line -->
    <line x1="140" y1="140" x2="320" y2="140" stroke="#0f172a" stroke-width="1.5" stroke-dasharray="4,4"/>
    <!-- Orifice at bottom right -->
    <line x1="320" y1="235" x2="390" y2="235" stroke="#2563eb" stroke-width="3" marker-end="url(#arrow-blue)"/>
    <text x="410" y="235" class="label" fill="#2563eb">v</text>
    <!-- Ground hatch -->
    <line x1="120" y1="240" x2="340" y2="240" stroke="#0f172a" stroke-width="3"/>
    <rect x="120" y="240" width="220" height="15" fill="url(#hatch)"/>
  </svg>`,

  // Q21: Solid sphere in water attached by string to tank bottom, accelerated upward
  q21: `${SVG_HEADER(400, 320)}
    <!-- Tank -->
    <rect x="100" y="40" width="200" height="220" fill="#f0f9ff" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Upward acceleration arrow -->
    <line x1="330" y1="160" x2="330" y2="90" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow)"/>
    <text x="360" y="125" class="label" fill="#dc2626">a = 2 m/s²</text>
    <!-- String from bottom to sphere -->
    <line x1="200" y1="260" x2="200" y2="145" stroke="#0f172a" stroke-width="2"/>
    <text x="215" y="190" class="sublabel">T</text>
    <!-- Sphere -->
    <circle cx="200" cy="115" r="30" fill="#94a3b8" stroke="#0f172a" stroke-width="2"/>
    <text x="200" y="115" class="label">m, s=0.5</text>
    <!-- Water level -->
    <line x1="100" y1="65" x2="300" y2="65" stroke="#0284c7" stroke-width="1.5"/>
  </svg>`,

  // Q22: Pressure P versus depth h graph
  q22: `${SVG_HEADER(460, 260)}
    <!-- Axes -->
    <line x1="90" y1="200" x2="380" y2="200" class="axis" marker-end="url(#arrow)"/>
    <line x1="90" y1="200" x2="90" y2="40" class="axis" marker-end="url(#arrow)"/>
    <text x="390" y="200" class="label" text-anchor="start">h (depth)</text>
    <text x="90" y="25" class="label">Pressure (P)</text>
    <!-- Straight line with slope at 45 deg -->
    <line x1="90" y1="140" x2="240" y2="50" stroke="#2563eb" stroke-width="2.5"/>
    <text x="70" y="140" class="label">P₀</text>
    <!-- Horizontal reference dashed line and 45 deg angle -->
    <line x1="90" y1="140" x2="190" y2="140" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3"/>
    <path d="M 140 140 A 50 50 0 0 0 130 115" fill="none" stroke="#0f172a" stroke-width="1.5"/>
    <text x="155" y="125" class="sublabel">45°</text>
  </svg>`,

  // Q23: Tank with liquids rho and 2rho with holes at h/2 and 3h/2
  q23: `${SVG_HEADER(480, 320)}
    <rect x="130" y="40" width="180" height="220" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <rect x="131" y="41" width="178" height="109" fill="#e0f2fe" opacity="0.8"/>
    <text x="220" y="95" class="label">ρ</text>
    <rect x="131" y="150" width="178" height="109" fill="#93c5fd" opacity="0.8"/>
    <text x="220" y="205" class="label">2ρ</text>
    <line x1="130" y1="150" x2="310" y2="150" stroke="#0f172a" stroke-width="1.5" stroke-dasharray="4,4"/>
    <!-- Hole 1 at h/2 -->
    <line x1="310" y1="95" x2="375" y2="95" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
    <text x="395" y="95" class="label" fill="#2563eb">v₁</text>
    <text x="85" y="95" class="sublabel">h/2</text>
    <!-- Hole 2 at 3h/2 -->
    <line x1="310" y1="205" x2="375" y2="205" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
    <text x="395" y="205" class="label" fill="#2563eb">v₂</text>
    <text x="85" y="205" class="sublabel">3h/2</text>
  </svg>`,

  // Q25: Pipe junction with branches 1 and 2 joining into branch 3
  q25: `${SVG_HEADER(500, 240)}
    <!-- Branch 1 (top-left) -->
    <path d="M 100 60 L 250 110 L 400 110" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M 100 100 L 230 130 L 400 150" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M 100 180 L 250 150" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Text labels -->
    <text x="140" y="70" class="label">Branch 1: A, v</text>
    <text x="140" y="195" class="label">Branch 2: A, 2v</text>
    <text x="330" y="130" class="label">Branch 3: 2A, v₃ = ?</text>
    <line x1="380" y1="130" x2="430" y2="130" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
  </svg>`,

  // Q27: Vessel with liquids 0.5 g/cc and 1.0 g/cc, orifice at bottom
  q27: `${SVG_HEADER(480, 320)}
    <rect x="140" y="40" width="180" height="220" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Top liquid 0.5 g/cc (height 2H) -->
    <rect x="141" y="41" width="178" height="146" fill="#fef08a" opacity="0.6"/>
    <text x="230" y="115" class="label">ρ₁ = 0.5 g/cc (2H)</text>
    <!-- Bottom liquid 1.0 g/cc (height H) -->
    <rect x="141" y="187" width="178" height="72" fill="#93c5fd" opacity="0.7"/>
    <text x="230" y="225" class="label">ρ₂ = 1.0 g/cc (H)</text>
    <!-- Orifice at bottom center -->
    <line x1="230" y1="260" x2="230" y2="295" stroke="#2563eb" stroke-width="3" marker-end="url(#arrow-blue)"/>
    <text x="250" y="285" class="label" fill="#2563eb">v</text>
  </svg>`,

  // Q28: Wind blowing over roof of hut with area A, mass m
  q28: `${SVG_HEADER(480, 260)}
    <!-- Roof of hut (slanted / horizontal sheet) -->
    <polygon points="160,120 320,120 340,140 180,140" fill="#cbd5e1" stroke="#0f172a" stroke-width="2.5"/>
    <text x="250" y="132" class="sublabel">Sheet: mass m, area A</text>
    <!-- Hut walls -->
    <rect x="180" y="140" width="140" height="90" fill="#f8fafc" stroke="#0f172a" stroke-width="2"/>
    <!-- Wind streams above roof -->
    <line x1="100" y1="85" x2="380" y2="85" stroke="#0284c7" stroke-width="2" marker-end="url(#arrow-blue)"/>
    <line x1="80" y1="100" x2="390" y2="100" stroke="#0284c7" stroke-width="2" marker-end="url(#arrow-blue)"/>
    <text x="250" y="70" class="label" fill="#0284c7">Wind velocity v, density ρ</text>
  </svg>`,

  // Q44: Ball with spin (Magnus effect)
  q44: `${SVG_HEADER(480, 220)}
    <!-- Ball moving forward with backspin -->
    <circle cx="220" cy="110" r="40" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Velocity arrow -->
    <line x1="260" y1="110" x2="360" y2="110" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)"/>
    <text x="380" y="110" class="label">v</text>
    <!-- Curved arrow for spin -->
    <path d="M 220 55 A 55 55 0 0 1 270 95" fill="none" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow)"/>
    <text x="250" y="45" class="label" fill="#dc2626">Spin (ω)</text>
  </svg>`,

  // Q49: Pressure along varying duct cross section
  q49: `${SVG_HEADER(500, 240)}
    <!-- Duct narrowing then widening -->
    <path d="M 100 60 Q 250 85 400 60" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M 100 160 Q 250 135 400 160" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <text x="140" y="110" class="sublabel">Wide (P high, v low)</text>
    <text x="250" y="110" class="label" fill="#dc2626">Throat (P min)</text>
    <text x="350" y="110" class="sublabel">Wide (P high)</text>
    <line x1="160" y1="110" x2="320" y2="110" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrow-blue)"/>
  </svg>`,

  // Q50: Accelerated U-tube with liquids rho and 2rho
  q50: `${SVG_HEADER(480, 300)}
    <!-- U-tube outline -->
    <path d="M 140 50 L 140 230 L 320 230 L 320 50" fill="none" stroke="#0f172a" stroke-width="3"/>
    <path d="M 170 50 L 170 200 L 290 200 L 290 50" fill="none" stroke="#0f172a" stroke-width="3"/>
    <!-- Liquid levels -->
    <rect x="141" y="90" width="28" height="110" fill="#93c5fd"/>
    <rect x="141" y="200" width="148" height="29" fill="#93c5fd"/>
    <rect x="291" y="150" width="28" height="50" fill="#e0f2fe"/>
    <!-- Horizontal acceleration -->
    <line x1="340" y1="140" x2="410" y2="140" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow)"/>
    <text x="425" y="140" class="label" fill="#dc2626">a</text>
    <!-- Base length l -->
    <text x="230" y="250" class="label">l</text>
    <text x="120" y="140" class="label">h</text>
  </svg>`,

  // Q53: Cube balanced at interface of two liquids
  q53: `${SVG_HEADER(460, 280)}
    <!-- Beaker -->
    <rect x="130" y="40" width="200" height="200" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Liquid A (top, sp gravity 0.8) -->
    <rect x="131" y="41" width="198" height="99" fill="#fef08a" opacity="0.6"/>
    <text x="350" y="90" class="sublabel">Liquid A (s = 0.8)</text>
    <!-- Liquid B (bottom, sp gravity 0.4 or denser) -->
    <rect x="131" y="140" width="198" height="99" fill="#93c5fd" opacity="0.7"/>
    <text x="350" y="190" class="sublabel">Liquid B</text>
    <!-- Cube balanced at interface -->
    <rect x="190" y="100" width="80" height="80" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
    <text x="230" y="140" class="label">Cube (10 cm)</text>
  </svg>`,

  // Q64: Velocity vs time for body dropped in viscous liquid (reaches terminal velocity)
  q64: `${SVG_HEADER(460, 260)}
    <!-- Axes -->
    <line x1="80" y1="210" x2="380" y2="210" class="axis" marker-end="url(#arrow)"/>
    <line x1="80" y1="210" x2="80" y2="40" class="axis" marker-end="url(#arrow)"/>
    <text x="390" y="210" class="label" text-anchor="start">t (s)</text>
    <text x="80" y="25" class="label">V (m/s)</text>
    <!-- Asymptotic terminal velocity curve -->
    <path d="M 80 210 Q 140 100 360 90" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <line x1="80" y1="90" x2="360" y2="90" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,4"/>
    <text x="60" y="90" class="label" fill="#dc2626">v_T</text>
  </svg>`,

  // Q66: Tapering pipe from P to Q
  q66: `${SVG_HEADER(480, 200)}
    <!-- Pipe tapering from P (larger) to Q (smaller) -->
    <path d="M 120 50 L 360 80" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M 120 150 L 360 120" stroke="#0f172a" stroke-width="2.5"/>
    <!-- End cross-sections -->
    <ellipse cx="120" cy="100" rx="15" ry="50" fill="#e0f2fe" stroke="#0f172a" stroke-width="2"/>
    <ellipse cx="360" cy="100" rx="8" ry="20" fill="#93c5fd" stroke="#0f172a" stroke-width="2"/>
    <!-- Labels -->
    <text x="120" y="175" class="label">P: A₁, V₁</text>
    <text x="360" y="150" class="label">Q: A₂, V₂</text>
    <line x1="140" y1="100" x2="200" y2="100" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>
    <line x1="375" y1="100" x2="435" y2="100" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
  </svg>`,

  // Q67: U-tube with two immiscible liquids in static equilibrium
  q67: `${SVG_HEADER(460, 300)}
    <path d="M 140 50 L 140 230 L 300 230 L 300 50" fill="none" stroke="#0f172a" stroke-width="3"/>
    <path d="M 170 50 L 170 200 L 270 200 L 270 50" fill="none" stroke="#0f172a" stroke-width="3"/>
    <!-- Liquid 1 (left) -->
    <rect x="141" y="90" width="28" height="110" fill="#93c5fd"/>
    <rect x="141" y="200" width="128" height="29" fill="#93c5fd"/>
    <!-- Liquid 2 (right) -->
    <rect x="271" y="60" width="28" height="140" fill="#fef08a"/>
    <!-- Interface and points B and C -->
    <line x1="140" y1="180" x2="300" y2="180" stroke="#0f172a" stroke-width="1.5" stroke-dasharray="3,3"/>
    <circle cx="155" cy="180" r="4" fill="#dc2626"/>
    <text x="130" y="180" class="label" fill="#dc2626">B</text>
    <circle cx="285" cy="180" r="4" fill="#dc2626"/>
    <text x="310" y="180" class="label" fill="#dc2626">C</text>
  </svg>`,

  // Q73: U-tube accelerated horizontally to the right
  q73: `${SVG_HEADER(480, 280)}
    <path d="M 150 50 L 150 210 L 310 210 L 310 50" fill="none" stroke="#0f172a" stroke-width="3"/>
    <path d="M 180 50 L 180 180 L 280 180 L 280 50" fill="none" stroke="#0f172a" stroke-width="3"/>
    <!-- Liquid tilted: higher in left limb, lower in right -->
    <rect x="151" y="70" width="28" height="110" fill="#93c5fd"/>
    <rect x="151" y="180" width="128" height="29" fill="#93c5fd"/>
    <rect x="281" y="130" width="28" height="50" fill="#93c5fd"/>
    <!-- Height difference h -->
    <line x1="210" y1="70" x2="210" y2="130" stroke="#dc2626" stroke-width="1.5"/>
    <text x="225" y="100" class="label" fill="#dc2626">h</text>
    <!-- Acceleration arrow -->
    <line x1="330" y1="130" x2="400" y2="130" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)"/>
    <text x="415" y="130" class="label">a</text>
    <text x="230" y="235" class="label">l</text>
  </svg>`,

  // Q74: Closed rectangular tank accelerated to the right
  q74: `${SVG_HEADER(480, 260)}
    <!-- Tank with corners A, B, C, D -->
    <rect x="130" y="50" width="220" height="140" fill="#e0f2fe" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="130" cy="50" r="4" fill="#0f172a"/><text x="115" y="45" class="label">A</text>
    <circle cx="350" cy="50" r="4" fill="#0f172a"/><text x="365" y="45" class="label">B</text>
    <circle cx="350" cy="190" r="4" fill="#0f172a"/><text x="365" y="195" class="label">C</text>
    <circle cx="130" cy="190" r="4" fill="#dc2626"/><text x="115" y="195" class="label" fill="#dc2626">D</text>
    <!-- Acceleration a to the right -->
    <line x1="380" y1="120" x2="440" y2="120" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)"/>
    <text x="455" y="120" class="label">a</text>
    <text x="240" y="120" class="sublabel">Filled with water</text>
  </svg>`,

  // Q79: U-tube with liquids rho and 2rho accelerated horizontally
  q79: `${SVG_HEADER(480, 300)}
    <!-- Vertical limbs height h, horizontal part 2h -->
    <rect x="130" y="50" width="30" height="180" fill="#e0f2fe" stroke="#0f172a" stroke-width="2"/>
    <rect x="310" y="50" width="30" height="180" fill="#e0f2fe" stroke="#0f172a" stroke-width="2"/>
    <rect x="130" y="200" width="210" height="30" fill="#93c5fd" stroke="#0f172a" stroke-width="2"/>
    <text x="145" y="120" class="label">ρ</text>
    <text x="325" y="120" class="label">ρ</text>
    <text x="235" y="215" class="label">2ρ</text>
    <text x="105" y="120" class="sublabel">h</text>
    <text x="235" y="250" class="sublabel">2h</text>
    <!-- Acceleration g/2 -->
    <line x1="365" y1="140" x2="435" y2="140" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow)"/>
    <text x="455" y="140" class="label" fill="#dc2626">g/2</text>
  </svg>`,

  // Q92: Tank with water up to height H, small hole at depth y, trajectory landing at x
  q92: `${SVG_HEADER(500, 280)}
    <!-- Tank -->
    <rect x="100" y="40" width="140" height="180" fill="#f0f9ff" stroke="#0f172a" stroke-width="2.5"/>
    <text x="70" y="130" class="label">H</text>
    <line x1="85" y1="40" x2="85" y2="220" stroke="#0f172a" stroke-width="1.5"/>
    <!-- Small hole at depth y -->
    <line x1="85" y1="40" x2="85" y2="90" stroke="#dc2626" stroke-width="1.5"/>
    <text x="70" y="65" class="sublabel" fill="#dc2626">y</text>
    <!-- Water jet trajectory parabolic curve -->
    <path d="M 240 90 Q 320 90 410 220" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <!-- Ground line -->
    <line x1="90" y1="220" x2="450" y2="220" stroke="#0f172a" stroke-width="2.5"/>
    <text x="325" y="240" class="label">Range x</text>
  </svg>`,

  // Q95: U-tube with pistons A and B supporting masses M and m
  q95: `${SVG_HEADER(480, 260)}
    <!-- U-tube limbs -->
    <rect x="120" y="70" width="60" height="150" fill="#e0f2fe" stroke="#0f172a" stroke-width="2.5"/>
    <rect x="290" y="70" width="40" height="150" fill="#e0f2fe" stroke="#0f172a" stroke-width="2.5"/>
    <rect x="120" y="180" width="210" height="40" fill="#e0f2fe" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Piston A (left, area 10 cm^2, mass 10 kg) -->
    <rect x="121" y="90" width="58" height="15" fill="#94a3b8" stroke="#0f172a" stroke-width="1.5"/>
    <rect x="135" y="55" width="30" height="35" rx="3" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
    <text x="150" y="72" class="label">10 kg</text>
    <text x="150" y="120" class="sublabel">A = 10 cm²</text>
    <!-- Piston B (right, area a, mass 5 kg) -->
    <rect x="291" y="90" width="38" height="15" fill="#94a3b8" stroke="#0f172a" stroke-width="1.5"/>
    <rect x="300" y="55" width="20" height="35" rx="3" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
    <text x="310" y="72" class="label">5 kg</text>
    <text x="310" y="120" class="sublabel">a = ?</text>
  </svg>`
};

async function generateAndUpload() {
  const urlMap = {};

  for (const [key, svg] of Object.entries(diagrams)) {
    const pngName = `fluids_${key}.png`;
    const backendPath = path.join(outDirBackend, pngName);
    const frontendPath = path.join(outDirFrontend, pngName);

    await sharp(Buffer.from(svg.trim())).png({ quality: 95 }).toFile(backendPath);
    fs.copyFileSync(backendPath, frontendPath);
    console.log(`Rendered PNG: ${pngName}`);

    try {
      const uploadRes = await cloudinary.uploader.upload(backendPath, {
        folder: 'edvedum_fluids',
        public_id: `fluids_${key}`,
        overwrite: true,
        resource_type: 'image'
      });
      urlMap[key] = uploadRes.secure_url;
      console.log(`Uploaded to Cloudinary: ${key} -> ${uploadRes.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${key} to Cloudinary:`, err.message);
      urlMap[key] = `/uploads/fluids/${pngName}`;
    }
  }

  const jsonPath = path.resolve(__dirname, 'fluids_diagrams.json');
  fs.writeFileSync(jsonPath, JSON.stringify(urlMap, null, 2));
  console.log(`Saved diagrams map to ${jsonPath}`);
}

generateAndUpload().catch(console.error);
