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

const SVG_Q223 = `
<svg width="480" height="280" viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
  <style>
    .label { font-size: 16px; font-weight: 600; fill: #0f172a; text-anchor: middle; dominant-baseline: middle; }
    .sublabel { font-size: 13px; font-weight: 500; fill: #475569; text-anchor: middle; dominant-baseline: middle; }
  </style>

  <!-- Connecting tube -->
  <path d="M 140 135 L 140 80 L 340 80 L 340 120" fill="none" stroke="#0f172a" stroke-width="12" stroke-linecap="round"/>
  <path d="M 140 135 L 140 80 L 340 80 L 340 120" fill="none" stroke="#e0f2fe" stroke-width="6" stroke-linecap="round"/>

  <!-- Valve S -->
  <polygon points="230,70 250,90 250,70 230,90" fill="#dc2626" stroke="#0f172a" stroke-width="1.5"/>
  <line x1="240" y1="65" x2="240" y2="70" stroke="#0f172a" stroke-width="2"/>
  <line x1="235" y1="65" x2="245" y2="65" stroke="#0f172a" stroke-width="2"/>
  <text x="240" y="50" class="label">S</text>

  <!-- Bubble A (Smaller) -->
  <circle cx="140" cy="180" r="45" fill="#bae6fd" fill-opacity="0.5" stroke="#0284c7" stroke-width="2.5"/>
  <text x="140" y="180" class="label">A</text>

  <!-- Bubble B (Bigger) -->
  <circle cx="340" cy="180" r="60" fill="#bae6fd" fill-opacity="0.5" stroke="#0284c7" stroke-width="2.5"/>
  <text x="340" y="180" class="label">B</text>
</svg>
`;

async function run() {
  const filename = 'fluids_q223.png';
  const backendPath = path.join(outDirBackend, filename);
  const frontendPath = path.join(outDirFrontend, filename);

  const pngBuffer = await sharp(Buffer.from(SVG_Q223))
    .png({ quality: 100 })
    .toBuffer();

  fs.writeFileSync(backendPath, pngBuffer);
  fs.writeFileSync(frontendPath, pngBuffer);
  console.log(`Saved locally: ${filename}`);

  const uploadRes = await cloudinary.uploader.upload(backendPath, {
    folder: 'edvedum_fluids',
    public_id: 'fluids_q223',
    overwrite: true,
    resource_type: 'image'
  });

  console.log(`Uploaded to Cloudinary: ${uploadRes.secure_url}`);
  fs.writeFileSync(path.resolve(__dirname, 'fluids_diagram_q223.json'), JSON.stringify({ q223: uploadRes.secure_url }, null, 2));
}

run().catch(console.error);
