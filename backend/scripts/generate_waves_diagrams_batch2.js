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

const outDirBackend = path.resolve(__dirname, '../uploads/waves');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/waves');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

const SVG_HEADER = (w = 500, h = 260) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2; }
    .label { font-size: 15px; font-weight: 600; fill: #0f172a; text-anchor: middle; dominant-baseline: middle; }
    .sublabel { font-size: 13px; font-weight: 500; fill: #475569; text-anchor: middle; dominant-baseline: middle; }
    .dashed { stroke: #64748b; stroke-width: 1.5; stroke-dasharray: 4,4; }
    .solid { stroke: #0f172a; stroke-width: 2; }
    .wave { stroke: #2563eb; stroke-width: 2.5; fill: none; }
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
    </marker>
    <pattern id="hatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="10" stroke="#0f172a" stroke-width="2" />
    </pattern>
  </defs>
`;

const diagrams = {
  // Q89: Quincke's tube with circular segment radius r, source S, detector D
  q89: `${SVG_HEADER(460, 200)}
    <!-- Left entrance S -->
    <rect x="40" y="110" width="60" height="20" fill="#f1f5f9" stroke="#0f172a" stroke-width="2"/>
    <text x="25" y="120" class="label">S</text>

    <!-- Straight bottom path -->
    <rect x="100" y="110" width="220" height="20" fill="#f8fafc" stroke="#0f172a" stroke-width="2"/>

    <!-- Right exit D -->
    <rect x="320" y="110" width="60" height="20" fill="#f1f5f9" stroke="#0f172a" stroke-width="2"/>
    <text x="395" y="120" class="label">D</text>

    <!-- Semicircular upper path -->
    <path d="M 120 110 A 90 90 0 0 1 300 110" fill="none" stroke="#0f172a" stroke-width="2"/>
    <path d="M 140 110 A 70 70 0 0 1 280 110" fill="none" stroke="#0f172a" stroke-width="2"/>

    <!-- Radius arrow -->
    <line x1="210" y1="110" x2="210" y2="20" class="dashed"/>
    <circle cx="210" cy="110" r="3" fill="#0f172a"/>
    <line x1="210" y1="110" x2="265" y2="55" stroke="#2563eb" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="235" y="70" class="label" fill="#2563eb">r</text>
  </svg>`,

  // Q90: Source and Detector with reflecting wall above
  q90: `${SVG_HEADER(460, 260)}
    <!-- Reflector Wall at Top -->
    <rect x="60" y="20" width="340" height="15" fill="url(#hatch)" stroke="#0f172a" stroke-width="2"/>
    <line x1="60" y1="35" x2="400" y2="35" stroke="#0f172a" stroke-width="2.5"/>

    <!-- Ground baseline -->
    <line x1="60" y1="210" x2="400" y2="210" stroke="#94a3b8" stroke-width="1.5"/>

    <!-- Sound Source and Detector -->
    <circle cx="130" cy="210" r="6" fill="#2563eb"/>
    <text x="90" y="210" class="label">Source</text>

    <circle cx="330" cy="210" r="6" fill="#2563eb"/>
    <text x="375" y="210" class="label">Detector</text>

    <!-- Horizontal Distance 6m -->
    <line x1="130" y1="225" x2="330" y2="225" class="dashed"/>
    <text x="230" y="240" class="sublabel">6m</text>

    <!-- Reflected Path (5m each) -->
    <line x1="130" y1="210" x2="230" y2="35" stroke="#2563eb" stroke-width="2.5"/>
    <line x1="230" y1="35" x2="330" y2="210" stroke="#2563eb" stroke-width="2.5"/>

    <!-- Labels 5m on reflected paths -->
    <text x="165" y="115" class="label" fill="#2563eb">5m</text>
    <text x="295" y="115" class="label" fill="#2563eb">5m</text>

    <!-- Midline dashed -->
    <line x1="230" y1="35" x2="230" y2="210" class="dashed"/>
  </svg>`,

  // Q94: Sources A and B meeting at point P
  q94: `${SVG_HEADER(460, 200)}
    <!-- Source A -->
    <circle cx="60" cy="60" r="5" fill="#0f172a"/>
    <text x="40" y="60" class="label">A</text>

    <!-- Source B -->
    <circle cx="60" cy="140" r="5" fill="#0f172a"/>
    <text x="40" y="140" class="label">B</text>

    <!-- Point P -->
    <circle cx="380" cy="100" r="6" fill="#2563eb"/>
    <text x="400" y="100" class="label">P</text>

    <!-- Wave path from A to P -->
    <path d="M 65 60 Q 120 40, 160 65 T 260 75 T 375 100" class="wave"/>

    <!-- Wave path from B to P -->
    <path d="M 65 140 Q 120 165, 160 135 T 260 120 T 375 100" class="wave" stroke="#dc2626"/>

    <text x="200" y="50" class="sublabel">AP = 0.5 m</text>
    <text x="200" y="160" class="sublabel">BP = 0.8 m</text>
  </svg>`,

  // Q101: Right angle triangle S1, S2, P
  q101: `${SVG_HEADER(460, 240)}
    <!-- Source S1 at (80, 50) -->
    <circle cx="80" cy="50" r="6" fill="#0f172a"/>
    <text x="55" y="50" class="label">S₁</text>

    <!-- Source S2 at (80, 180) -->
    <circle cx="80" cy="180" r="6" fill="#0f172a"/>
    <text x="55" y="180" class="label">S₂</text>

    <!-- Vertical line S1 S2 = 9 m -->
    <line x1="80" y1="50" x2="80" y2="180" stroke="#0f172a" stroke-width="2.5"/>
    <text x="65" y="115" class="label">9 m</text>

    <!-- Point P at (380, 50) -->
    <circle cx="380" cy="50" r="6" fill="#2563eb"/>
    <text x="400" y="50" class="label">P</text>

    <!-- Horizontal path S1 to P = 40 m -->
    <line x1="80" y1="50" x2="380" y2="50" stroke="#0f172a" stroke-width="2.5" stroke-dasharray="6,4"/>
    <text x="230" y="35" class="label">40 m</text>

    <!-- Hypotenuse S2 to P = 41 m -->
    <line x1="80" y1="180" x2="380" y2="50" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="6,4"/>
    <text x="250" y="130" class="label" fill="#2563eb">41 m</text>

    <!-- Right angle indicator at S1 -->
    <rect x="80" y="50" width="16" height="16" fill="none" stroke="#0f172a" stroke-width="1.5"/>
  </svg>`,

  // Q104: Stereo speakers 2.4 m apart, man 3.2 m in front of bottom speaker
  q104: `${SVG_HEADER(460, 240)}
    <!-- Top Speaker -->
    <rect x="50" y="35" width="25" height="35" rx="3" fill="#334155" stroke="#0f172a" stroke-width="2"/>
    <path d="M 75 42 L 95 30 L 95 75 L 75 63 Z" fill="#64748b" stroke="#0f172a" stroke-width="1.5"/>

    <!-- Bottom Speaker -->
    <rect x="50" y="155" width="25" height="35" rx="3" fill="#334155" stroke="#0f172a" stroke-width="2"/>
    <path d="M 75 162 L 95 150 L 95 195 L 75 183 Z" fill="#64748b" stroke="#0f172a" stroke-width="1.5"/>

    <!-- Separation 2.4 m -->
    <line x1="35" y1="52" x2="35" y2="172" stroke="#0f172a" stroke-width="2"/>
    <line x1="28" y1="52" x2="42" y2="52" stroke="#0f172a" stroke-width="2"/>
    <line x1="28" y1="172" x2="42" y2="172" stroke="#0f172a" stroke-width="2"/>
    <text x="15" y="112" class="label" transform="rotate(-90 15 112)">2.4 m</text>

    <!-- Man standing at (350, 172) -->
    <!-- Head -->
    <circle cx="360" cy="135" r="12" fill="#0f172a"/>
    <!-- Body -->
    <line x1="360" y1="147" x2="360" y2="190" stroke="#0f172a" stroke-width="4"/>
    <!-- Legs -->
    <line x1="360" y1="190" x2="350" y2="225" stroke="#0f172a" stroke-width="3.5"/>
    <line x1="360" y1="190" x2="370" y2="225" stroke="#0f172a" stroke-width="3.5"/>
    <!-- Arms -->
    <line x1="360" y1="155" x2="345" y2="180" stroke="#0f172a" stroke-width="3"/>
    <line x1="360" y1="155" x2="375" y2="180" stroke="#0f172a" stroke-width="3"/>

    <!-- Distance 3.2 m to man -->
    <line x1="95" y1="172" x2="345" y2="172" stroke="#0f172a" stroke-width="2" stroke-dasharray="6,4"/>
    <text x="215" y="190" class="label">3.2 m</text>

    <!-- Hypotenuse line from top speaker to man (4.0 m) -->
    <line x1="95" y1="52" x2="350" y2="140" stroke="#2563eb" stroke-width="2" stroke-dasharray="6,4"/>
  </svg>`,

  // Q112: 4 Graphs of fundamental frequency (f) vs tension (T)
  q112: `${SVG_HEADER(560, 220)}
    <!-- Graph 1: Concave upward -->
    <g transform="translate(30, 20)">
      <line x1="0" y1="130" x2="90" y2="130" class="axis" marker-end="url(#arrow)"/>
      <line x1="0" y1="130" x2="0" y2="10" class="axis" marker-end="url(#arrow)"/>
      <text x="95" y="130" class="label">T</text>
      <text x="-12" y="15" class="label">f</text>
      <path d="M 0 130 Q 50 120, 75 30" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <text x="40" y="160" class="label">(1)</text>
    </g>

    <!-- Graph 2: Linear downward -->
    <g transform="translate(160, 20)">
      <line x1="0" y1="130" x2="90" y2="130" class="axis" marker-end="url(#arrow)"/>
      <line x1="0" y1="130" x2="0" y2="10" class="axis" marker-end="url(#arrow)"/>
      <text x="95" y="130" class="label">T</text>
      <text x="-12" y="15" class="label">f</text>
      <line x1="10" y1="30" x2="75" y2="120" stroke="#2563eb" stroke-width="2.5"/>
      <text x="40" y="160" class="label">(2)</text>
    </g>

    <!-- Graph 3: Hyperbola downward -->
    <g transform="translate(290, 20)">
      <line x1="0" y1="130" x2="90" y2="130" class="axis" marker-end="url(#arrow)"/>
      <line x1="0" y1="130" x2="0" y2="10" class="axis" marker-end="url(#arrow)"/>
      <text x="95" y="130" class="label">T</text>
      <text x="-12" y="15" class="label">f</text>
      <path d="M 10 30 Q 15 110, 80 120" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <text x="40" y="160" class="label">(3)</text>
    </g>

    <!-- Graph 4: Square root curve f ∝ √T -->
    <g transform="translate(420, 20)">
      <line x1="0" y1="130" x2="90" y2="130" class="axis" marker-end="url(#arrow)"/>
      <line x1="0" y1="130" x2="0" y2="10" class="axis" marker-end="url(#arrow)"/>
      <text x="95" y="130" class="label">T</text>
      <text x="-12" y="15" class="label">f</text>
      <path d="M 0 130 Q 15 50, 75 35" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <text x="40" y="160" class="label">(4)</text>
    </g>
  </svg>`,

  // Q127: Massless rod BD suspended by strings AB and CD with hanging mass
  q127: `${SVG_HEADER(460, 250)}
    <!-- Ceiling -->
    <rect x="70" y="15" width="280" height="15" fill="url(#hatch)" stroke="#0f172a" stroke-width="2"/>
    <line x1="70" y1="30" x2="350" y2="30" stroke="#0f172a" stroke-width="2.5"/>

    <!-- Point A and Point C -->
    <text x="110" y="20" class="label">A</text>
    <text x="310" y="20" class="label">C</text>

    <!-- String AB -->
    <line x1="120" y1="30" x2="120" y2="130" stroke="#0f172a" stroke-width="2.5"/>
    <text x="105" y="130" class="label">B</text>

    <!-- String CD -->
    <line x1="300" y1="30" x2="300" y2="130" stroke="#0f172a" stroke-width="2.5"/>
    <text x="315" y="130" class="label">D</text>

    <!-- Rod BD of length l -->
    <line x1="120" y1="130" x2="300" y2="130" stroke="#0f172a" stroke-width="4"/>

    <!-- Point P at distance X from D -->
    <circle cx="280" cy="130" r="4" fill="#2563eb"/>
    <text x="270" y="120" class="label" fill="#2563eb">P</text>

    <!-- Suspended 10 kg mass -->
    <line x1="280" y1="130" x2="280" y2="175" stroke="#0f172a" stroke-width="2"/>
    <rect x="260" y="175" width="40" height="30" fill="#f8fafc" stroke="#0f172a" stroke-width="2"/>
    <text x="280" y="192" class="sublabel">10 kg</text>

    <!-- Dimension labels -->
    <text x="210" y="145" class="sublabel">length = l</text>
    <line x1="280" y1="110" x2="300" y2="110" class="dashed"/>
    <text x="290" y="100" class="sublabel">X</text>
  </svg>`,

  // Q129: String over pulley with block submerged in beaker
  q129: `${SVG_HEADER(460, 250)}
    <!-- Wall on left -->
    <rect x="40" y="50" width="15" height="120" fill="url(#hatch)" stroke="#0f172a" stroke-width="2"/>
    <line x1="55" y1="50" x2="55" y2="170" stroke="#0f172a" stroke-width="2"/>

    <!-- Horizontal table / support -->
    <line x1="55" y1="100" x2="260" y2="100" stroke="#0f172a" stroke-width="3"/>

    <!-- Pulley at corner -->
    <circle cx="260" cy="100" r="16" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>

    <!-- String from wall over pulley to hanging block -->
    <line x1="55" y1="90" x2="260" y2="90" stroke="#2563eb" stroke-width="2.5"/>
    <line x1="276" y1="100" x2="276" y2="160" stroke="#2563eb" stroke-width="2.5"/>

    <!-- Beaker -->
    <rect x="250" y="140" width="60" height="80" rx="3" fill="#e0f2fe" fill-opacity="0.6" stroke="#0f172a" stroke-width="2"/>
    <!-- Liquid surface -->
    <line x1="250" y1="150" x2="310" y2="150" stroke="#0284c7" stroke-width="2"/>
    <text x="325" y="170" class="label" fill="#0284c7">ρ</text>

    <!-- Block submerged in beaker -->
    <rect x="264" y="160" width="24" height="28" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
    <text x="276" y="176" class="sublabel">m</text>
  </svg>`,

  // Q145: Organ Pipes (A) and (B) with standing wave loops
  q145: `${SVG_HEADER(500, 200)}
    <!-- Pipe A: Closed at left end, open at right end -->
    <g transform="translate(40, 40)">
      <!-- Closed left wall -->
      <line x1="0" y1="15" x2="0" y2="95" stroke="#0f172a" stroke-width="4"/>
      <!-- Top and bottom tube walls -->
      <line x1="0" y1="15" x2="160" y2="15" stroke="#0f172a" stroke-width="2.5"/>
      <line x1="0" y1="95" x2="160" y2="95" stroke="#0f172a" stroke-width="2.5"/>
      <!-- Standing wave: node at 0, antinode at 53, node at 107, antinode at 160 -->
      <path d="M 0 55 Q 53 15, 107 55 T 160 15" class="wave"/>
      <path d="M 0 55 Q 53 95, 107 55 T 160 95" class="wave"/>
      <!-- Dimension X -->
      <line x1="0" y1="5" x2="160" y2="5" class="dashed" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
      <text x="80" y="0" class="sublabel">X</text>
      <text x="80" y="125" class="label">(A)</text>
    </g>

    <!-- Pipe B: Open at both ends -->
    <g transform="translate(260, 40)">
      <!-- Top and bottom tube walls -->
      <line x1="0" y1="15" x2="160" y2="15" stroke="#0f172a" stroke-width="2.5"/>
      <line x1="0" y1="95" x2="160" y2="95" stroke="#0f172a" stroke-width="2.5"/>
      <!-- Standing wave: antinode at 0, node at 80, antinode at 160 -->
      <path d="M 0 15 Q 80 55, 160 15" class="wave"/>
      <path d="M 0 95 Q 80 55, 160 95" class="wave"/>
      <!-- Dimension X -->
      <line x1="0" y1="5" x2="160" y2="5" class="dashed" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
      <text x="80" y="0" class="sublabel">X</text>
      <text x="80" y="125" class="label">(B)</text>
    </g>
  </svg>`
};

async function generateAndUpload() {
  console.log('Generating Waves batch 2 diagrams...');
  const results = {};

  for (const [key, svg] of Object.entries(diagrams)) {
    const filename = `waves_${key}.png`;
    const backendPath = path.join(outDirBackend, filename);
    const frontendPath = path.join(outDirFrontend, filename);

    const pngBuffer = await sharp(Buffer.from(svg))
      .png({ quality: 100 })
      .toBuffer();

    fs.writeFileSync(backendPath, pngBuffer);
    fs.writeFileSync(frontendPath, pngBuffer);
    console.log(`Saved locally: ${filename}`);

    try {
      const uploadRes = await cloudinary.uploader.upload(backendPath, {
        folder: 'edvedum_waves',
        public_id: `waves_${key}`,
        overwrite: true,
        resource_type: 'image'
      });
      results[key] = uploadRes.secure_url;
      console.log(`Uploaded to Cloudinary: ${key} -> ${uploadRes.secure_url}`);
    } catch (err) {
      console.warn(`Failed to upload ${key} to Cloudinary, falling back to local:`, err.message);
      results[key] = `/uploads/waves/${filename}`;
    }
  }

  const jsonPath = path.resolve(__dirname, 'waves_diagrams_batch2.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  console.log(`Saved waves batch 2 diagrams map to ${jsonPath}`);
}

generateAndUpload().catch(console.error);
