import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadsDirBackend = path.resolve(__dirname, '../uploads/thermal_properties');
const uploadsDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/thermal_properties');

if (!fs.existsSync(uploadsDirBackend)) fs.mkdirSync(uploadsDirBackend, { recursive: true });
if (!fs.existsSync(uploadsDirFrontend)) fs.mkdirSync(uploadsDirFrontend, { recursive: true });

async function generateDiagramQ195() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 350" width="450" height="350">
    <rect width="100%" height="100%" fill="#ffffff" />
    <style>
      .label { font-family: 'Arial', sans-serif; font-size: 16px; font-weight: bold; fill: #1e293b; }
      .temp { font-family: 'Arial', sans-serif; font-size: 18px; font-weight: bold; fill: #0f172a; }
      .rod { stroke: #334155; stroke-width: 8; stroke-linecap: round; }
      .node { fill: #0284c7; stroke: #0369a1; stroke-width: 3; }
      .endnode { fill: #ef4444; stroke: #b91c1c; stroke-width: 2; }
    </style>

    <!-- Junction O -->
    <circle cx="225" cy="180" r="8" class="node" />
    <text x="238" y="185" class="label">O</text>

    <!-- Conductor A: to top-left (100, 70) -->
    <line x1="225" y1="180" x2="115" y2="75" class="rod" />
    <circle cx="115" cy="75" r="5" class="endnode" />
    <text x="145" y="115" class="label">A</text>
    <text x="50" y="65" class="temp">60°C</text>

    <!-- Conductor B: to top-right (350, 75) -->
    <line x1="225" y1="180" x2="335" y2="75" class="rod" />
    <circle cx="335" cy="75" r="5" class="endnode" />
    <text x="300" y="115" class="label">B</text>
    <text x="348" y="70" class="temp">40°C</text>

    <!-- Conductor C: to bottom (225, 290) -->
    <line x1="225" y1="180" x2="225" y2="295" class="rod" />
    <circle cx="225" cy="295" r="5" class="endnode" />
    <text x="240" y="245" class="label">C</text>
    <text x="205" y="325" class="temp">50°C</text>
  </svg>`;

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  const filename = 'diagram_q195.png';
  const localBackendPath = path.join(uploadsDirBackend, filename);
  const localFrontendPath = path.join(uploadsDirFrontend, filename);

  fs.writeFileSync(localBackendPath, pngBuffer);
  fs.writeFileSync(localFrontendPath, pngBuffer);
  console.log('Saved local diagram Q195 to backend & frontend');

  const uploadResult = await cloudinary.uploader.upload(localBackendPath, {
    folder: 'edvedum_thermal',
    public_id: 'diagram_q195',
    overwrite: true
  });

  console.log('Cloudinary URL for Q195:', uploadResult.secure_url);
  const jsonPath = path.resolve(__dirname, 'thermal_diagrams_batch3.json');
  fs.writeFileSync(jsonPath, JSON.stringify({ q195: uploadResult.secure_url }, null, 2));
}

generateDiagramQ195().catch(console.error);
