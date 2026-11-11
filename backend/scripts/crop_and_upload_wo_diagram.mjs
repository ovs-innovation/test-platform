import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fyxpnmdh',
  api_key: process.env.CLOUDINARY_API_KEY || '621644782397127',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'n83n92W0D3L9gUu8q9r9q5bY3jI'
});

const outDir = 'backend/scripts/wo_diagrams';
const frontendDir = 'frontend/public/uploads/wave_optics';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir, { recursive: true });

async function processDiagram() {
  const pageImg = await loadImage('backend/scripts/wo_pages/page_3.png');
  const spec = { id: 'wo_q7_diagram', page: 3, yMin: 625, yMax: 905, xMin: 60, xMax: 980 };

  const winW = spec.xMax - spec.xMin;
  const winH = spec.yMax - spec.yMin;
  const winCanvas = createCanvas(winW, winH);
  const winCtx = winCanvas.getContext('2d');
  winCtx.drawImage(pageImg, spec.xMin, spec.yMin, winW, winH, 0, 0, winW, winH);

  const imgData = winCtx.getImageData(0, 0, winW, winH);
  const data = imgData.data;

  let minX = winW, maxX = 0, minY = winH, maxY = 0;
  let found = false;

  for (let y = 0; y < winH; y++) {
    for (let x = 0; x < winW; x++) {
      const idx = (y * winW + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      if (a > 50 && (r < 235 || g < 235 || b < 235)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        found = true;
      }
    }
  }

  const pad = 12;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(winW - cropX, (maxX - minX) + 2 * pad);
  const cropH = Math.min(winH - cropY, (maxY - minY) + 2 * pad);

  const cropCanvas = createCanvas(cropW, cropH);
  const cropCtx = cropCanvas.getContext('2d');
  cropCtx.drawImage(winCanvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

  const buf = cropCanvas.toBuffer('image/png');
  const outPath = path.join(outDir, `${spec.id}.png`);
  fs.writeFileSync(outPath, buf);
  fs.writeFileSync(path.join(frontendDir, `${spec.id}.png`), buf);
  console.log(`Cropped ${spec.id} (${cropW}x${cropH})`);

  // Upload to Cloudinary
  const urlMap = {};
  try {
    const res = await cloudinary.uploader.upload(outPath, {
      folder: 'edvedum/questions/wave_optics',
      public_id: spec.id,
      overwrite: true,
      resource_type: 'image'
    });
    urlMap[spec.id] = res.secure_url;
    console.log(`Uploaded to Cloudinary: ${res.secure_url}`);
  } catch (err) {
    console.error(`Failed to upload ${spec.id}:`, err.message);
    urlMap[spec.id] = `/uploads/wave_optics/${spec.id}.png`;
  }

  fs.writeFileSync('backend/scripts/wo_diagram_urls.json', JSON.stringify(urlMap, null, 2));
  console.log('Saved wo_diagram_urls.json');
}

processDiagram().catch(console.error);
