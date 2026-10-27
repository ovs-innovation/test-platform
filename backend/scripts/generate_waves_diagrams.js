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
    .dashed { stroke: #94a3b8; stroke-width: 1.5; stroke-dasharray: 4,4; }
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb"/>
    </marker>
    <pattern id="hatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="10" stroke="#0f172a" stroke-width="2" />
    </pattern>
  </defs>
`;

const diagrams = {
  // Q36: 4 graph choices for y vs t at origin
  q36: `${SVG_HEADER(560, 240)}
    <!-- Option (1) -->
    <g transform="translate(40, 20)">
      <line x1="0" y1="90" x2="160" y2="90" class="axis" marker-end="url(#arrow)"/>
      <line x1="0" y1="180" x2="0" y2="10" class="axis" marker-end="url(#arrow)"/>
      <text x="170" y="90" class="label">t</text>
      <text x="-15" y="15" class="label">y</text>
      <line x1="0" y1="35" x2="150" y2="35" class="dashed"/>
      <line x1="0" y1="145" x2="150" y2="145" class="dashed"/>
      <text x="-25" y="35" class="sublabel">2√3</text>
      <text x="-25" y="55" class="sublabel">3</text>
      <text x="-25" y="145" class="sublabel">-2√3</text>
      <text x="-10" y="105" class="sublabel">(0,0)</text>
      <!-- Starts at 3, goes down -->
      <path d="M 0 55 C 15 110, 25 145, 40 145 C 55 145, 65 35, 80 35 C 95 35, 105 145, 120 145 C 135 145, 145 50, 150 35" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <text x="75" y="200" class="label">(1)</text>
    </g>

    <!-- Option (2) -->
    <g transform="translate(320, 20)">
      <line x1="0" y1="90" x2="160" y2="90" class="axis" marker-end="url(#arrow)"/>
      <line x1="0" y1="180" x2="0" y2="10" class="axis" marker-end="url(#arrow)"/>
      <text x="170" y="90" class="label">t</text>
      <text x="-15" y="15" class="label">y</text>
      <line x1="0" y1="35" x2="150" y2="35" class="dashed"/>
      <line x1="0" y1="145" x2="150" y2="145" class="dashed"/>
      <text x="-25" y="35" class="sublabel">2√3</text>
      <text x="-25" y="125" class="sublabel">-3</text>
      <text x="-25" y="145" class="sublabel">-2√3</text>
      <text x="-10" y="105" class="sublabel">(0,0)</text>
      <!-- Starts at -3, goes up -->
      <path d="M 0 125 C 15 70, 25 35, 40 35 C 55 35, 65 145, 80 145 C 95 145, 105 35, 120 35 C 135 35, 145 130, 150 145" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <text x="75" y="200" class="label">(2)</text>
    </g>
  </svg>`,

  // Q40: Light pulley with strings AB and CD and suspended mass m
  q40: `${SVG_HEADER(380, 280)}
    <!-- Ceiling -->
    <rect x="80" y="15" width="220" height="15" fill="url(#hatch)" stroke="#0f172a" stroke-width="2"/>
    <line x1="80" y1="30" x2="300" y2="30" stroke="#0f172a" stroke-width="2.5"/>

    <!-- String CD from ceiling to pulley center C -->
    <line x1="190" y1="30" x2="190" y2="110" stroke="#0f172a" stroke-width="3"/>
    <text x="210" y="70" class="label">D</text>

    <!-- Pulley B/C -->
    <circle cx="190" cy="110" r="35" fill="#f8fafc" stroke="#0f172a" stroke-width="3"/>
    <circle cx="190" cy="110" r="6" fill="#0f172a"/>
    <text x="190" y="125" class="label">C</text>
    <text x="140" y="110" class="label">B</text>

    <!-- String AB: from floor to pulley left side, over pulley to mass m -->
    <!-- Floor at left -->
    <rect x="135" y="240" width="40" height="12" fill="url(#hatch)" stroke="#0f172a" stroke-width="2"/>
    <line x1="135" y1="240" x2="175" y2="240" stroke="#0f172a" stroke-width="2.5"/>
    <text x="155" y="225" class="label">A</text>
    
    <line x1="155" y1="110" x2="155" y2="240" stroke="#2563eb" stroke-width="2.5"/>
    <line x1="225" y1="110" x2="225" y2="180" stroke="#2563eb" stroke-width="2.5"/>

    <!-- Mass m -->
    <rect x="210" y="180" width="30" height="30" rx="3" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
    <text x="225" y="195" class="label">m</text>
  </svg>`,

  // Q48: Uniform rope suspended from ceiling, particle dropped, wave pulse from bottom
  q48: `${SVG_HEADER(360, 280)}
    <!-- Ceiling -->
    <rect x="100" y="15" width="160" height="15" fill="url(#hatch)" stroke="#0f172a" stroke-width="2"/>
    <line x1="100" y1="30" x2="260" y2="30" stroke="#0f172a" stroke-width="2.5"/>

    <!-- Rope -->
    <line x1="150" y1="30" x2="150" y2="230" stroke="#0f172a" stroke-width="4"/>

    <!-- Particle dropped at t=0 -->
    <circle cx="175" cy="45" r="7" fill="#0f172a"/>
    <text x="120" y="45" class="label">t = 0</text>
    <line x1="190" y1="35" x2="215" y2="35" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="240" y="35" class="label">Particle</text>
    <text x="240" y="55" class="sublabel">dropped</text>

    <!-- Wave pulse generated at bottom -->
    <line x1="170" y1="230" x2="170" y2="190" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
    <text x="240" y="200" class="label">Wave pulse</text>
    <text x="240" y="220" class="sublabel">generated at t = 0</text>

    <!-- Length l marker -->
    <line x1="90" y1="30" x2="90" y2="230" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="75" y="130" class="label">l</text>
  </svg>`,

  // Q67: Sound pressure wave P(x) sinusoidal graph
  q67: `${SVG_HEADER(440, 240)}
    <g transform="translate(40, 20)">
      <!-- Axes -->
      <line x1="0" y1="100" x2="350" y2="100" class="axis" marker-end="url(#arrow)"/>
      <line x1="0" y1="190" x2="0" y2="10" class="axis" marker-end="url(#arrow)"/>
      <text x="365" y="100" class="label">x (m)</text>
      <text x="0" y="-5" class="label">P (Pa)</text>

      <!-- Dashed amplitude lines -->
      <line x1="0" y1="30" x2="250" y2="30" class="dashed"/>
      <line x1="0" y1="170" x2="250" y2="170" class="dashed"/>
      <text x="-40" y="30" class="label">5π × 10²</text>
      <text x="-45" y="170" class="label">-5π × 10²</text>

      <!-- Sine wave P(x) = P0 cos(kx) -->
      <path d="M 0 30 C 35 30, 45 170, 80 170 C 115 170, 125 30, 160 30 C 175 30, 185 80, 200 100" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      
      <!-- x markers at 0.1 and 0.2 -->
      <line x1="80" y1="100" x2="80" y2="170" class="dashed"/>
      <text x="80" y="85" class="label">0.1</text>

      <line x1="160" y1="30" x2="160" y2="100" class="dashed"/>
      <text x="160" y="115" class="label">0.2</text>
    </g>
  </svg>`
};

async function generateAndUpload() {
  console.log('Generating Waves diagrams...');
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
      console.error(`Failed to upload ${key} to Cloudinary:`, err);
      results[key] = `/uploads/waves/${filename}`;
    }
  }

  const jsonPath = path.resolve(__dirname, 'waves_diagrams.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  console.log(`Saved waves diagrams map to ${jsonPath}`);
}

generateAndUpload().catch(console.error);
