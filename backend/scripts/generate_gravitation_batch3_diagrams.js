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

const outDirBackend = path.resolve(__dirname, '../uploads/gravitation');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/gravitation');
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
    <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626"/>
    </marker>
  </defs>
`;

const diagrams = {
  // Q191: Square ABCD with 4 masses m
  q191: `${SVG_HEADER(480, 260)}
    <!-- Square ABCD -->
    <rect x="150" y="40" width="180" height="180" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Vertex A (top-left) -->
    <circle cx="150" cy="40" r="6" fill="#0f172a"/>
    <text x="150" y="22" class="label">A</text>
    <text x="130" y="42" class="sublabel">m</text>
    <!-- Vertex B (top-right) -->
    <circle cx="330" cy="40" r="6" fill="#0f172a"/>
    <text x="330" y="22" class="label">B</text>
    <text x="350" y="42" class="sublabel">m</text>
    <!-- Vertex C (bottom-right) -->
    <circle cx="330" cy="220" r="6" fill="#0f172a"/>
    <text x="330" y="240" class="label">C</text>
    <text x="350" y="220" class="sublabel">m</text>
    <!-- Vertex D (bottom-left) -->
    <circle cx="150" cy="220" r="6" fill="#0f172a"/>
    <text x="150" y="240" class="label">D</text>
    <text x="130" y="220" class="sublabel">m</text>
  </svg>`,

  // Q212: Three paths 1, 2, 3 connecting A and B
  q212: `${SVG_HEADER(500, 280)}
    <!-- Point A -->
    <circle cx="340" cy="220" r="6" fill="#0f172a"/>
    <text x="360" y="228" class="label">A</text>
    <!-- Point B -->
    <circle cx="160" cy="60" r="6" fill="#0f172a"/>
    <text x="140" y="55" class="label">B</text>
    
    <!-- Path 1: Up then left (right angle) -->
    <path d="M 340 220 L 340 60 L 160 60" fill="none" stroke="#0f172a" stroke-width="2"/>
    <line x1="260" y1="60" x2="245" y2="60" stroke="#0f172a" stroke-width="2" marker-end="url(#arrow)"/>
    <text x="355" y="140" class="label">1</text>

    <!-- Path 2: Straight line from A to B -->
    <line x1="340" y1="220" x2="160" y2="60" stroke="#0f172a" stroke-width="2"/>
    <line x1="260" y1="149" x2="246" y2="136" stroke="#0f172a" stroke-width="2" marker-end="url(#arrow)"/>
    <text x="275" y="130" class="label">2</text>

    <!-- Path 3: Curved arc bowing down-left -->
    <path d="M 340 220 Q 200 240 160 60" fill="none" stroke="#0f172a" stroke-width="2"/>
    <!-- Arrow on path 3 -->
    <line x1="218" y1="190" x2="210" y2="175" stroke="#0f172a" stroke-width="2" marker-end="url(#arrow)"/>
    <text x="215" y="215" class="label">3</text>
  </svg>`
};

async function generateAndUpload() {
  const urlMap = {};

  for (const [key, svg] of Object.entries(diagrams)) {
    const pngName = `gravitation_batch3_${key}.png`;
    const backendPath = path.join(outDirBackend, pngName);
    const frontendPath = path.join(outDirFrontend, pngName);

    await sharp(Buffer.from(svg.trim())).png({ quality: 95 }).toFile(backendPath);
    fs.copyFileSync(backendPath, frontendPath);
    console.log(`Rendered PNG: ${pngName}`);

    try {
      const uploadRes = await cloudinary.uploader.upload(backendPath, {
        folder: 'edvedum_gravitation',
        public_id: `gravitation_batch3_${key}`,
        overwrite: true,
        resource_type: 'image'
      });
      urlMap[key] = uploadRes.secure_url;
      console.log(`Uploaded to Cloudinary: ${key} -> ${uploadRes.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${key} to Cloudinary:`, err.message);
      urlMap[key] = `/uploads/gravitation/${pngName}`;
    }
  }

  const jsonPath = path.resolve(__dirname, 'gravitation_batch3_diagrams.json');
  fs.writeFileSync(jsonPath, JSON.stringify(urlMap, null, 2));
  console.log(`Saved batch 3 diagram URLs to ${jsonPath}`);
}

generateAndUpload();
