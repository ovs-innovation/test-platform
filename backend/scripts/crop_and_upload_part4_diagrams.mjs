import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const OUT_DIR = './backend/uploads/organic_chemistry';
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function main() {
  const p51 = await loadImage('./backend/scripts/organic_pages/page_51.png');
  const c = createCanvas(480, 240);
  const ctx = c.getContext('2d');
  ctx.drawImage(p51, 60, 400, 480, 240, 0, 0, 480, 240);
  fs.writeFileSync(path.join(OUT_DIR, 'q107_diag.png'), c.toBuffer('image/png'));
  console.log('Saved q107_diag.png');

  // Upload to Cloudinary
  const urlFile = './backend/scripts/organic_diagram_urls.json';
  let urls = JSON.parse(fs.readFileSync(urlFile, 'utf8'));

  const fullPath = path.resolve(__dirname, '../uploads/organic_chemistry/q107_diag.png');
  try {
    const res = await uploadImageToCloudinary(fullPath, {
      folder: 'edvedum/questions/organic_chemistry',
      public_id: 'q107_diag'
    });
    urls.q107_diag = res.secure_url || res.url;
    console.log('Uploaded q107_diag:', urls.q107_diag);
  } catch (err) {
    console.error('Failed to upload q107_diag:', err.message);
    urls.q107_diag = '/uploads/organic_chemistry/q107_diag.png';
  }

  fs.writeFileSync(urlFile, JSON.stringify(urls, null, 2));
  console.log('Total URLs now:', Object.keys(urls).length);
}

main().catch(console.error);

