import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const images = [
  'q72_opt_a.png',
  'q72_opt_b.png',
  'q72_opt_c.png',
  'q72_opt_d.png',
  'q73_diag.png',
  'q77_opt_a.png',
  'q77_opt_b.png',
  'q77_opt_c.png',
  'q77_opt_d.png',
  'q78_opt_a.png',
  'q78_opt_b.png',
  'q78_opt_c.png',
  'q78_opt_d.png',
  'q79_opt_a.png',
  'q79_opt_b.png',
  'q79_opt_c.png',
  'q79_opt_d.png',
  'q81_diag.png',
  'q82_opt_a.png',
  'q82_opt_b.png',
  'q82_opt_c.png',
  'q82_opt_d.png',
  'q83_diag.png',
  'q88_diag.png',
  'q89_opt_a.png',
  'q89_opt_b.png',
  'q89_opt_c.png',
  'q89_opt_d.png',
  'q90_diag.png',
  'q94_diag.png',
  'q95_diag.png',
  'q97_opt_a.png',
  'q97_opt_b.png',
  'q97_opt_c.png',
  'q97_opt_d.png',
  'q100_opt_a.png',
  'q100_opt_b.png',
  'q100_opt_c.png',
  'q100_opt_d.png',
  'q102_diag.png',
];

async function main() {
  const urlFile = './backend/scripts/organic_diagram_urls.json';
  let urls = {};
  if (fs.existsSync(urlFile)) {
    urls = JSON.parse(fs.readFileSync(urlFile, 'utf8'));
  }

  for (const imgName of images) {
    const id = path.basename(imgName, path.extname(imgName));
    if (urls[id]) {
      console.log(`Already uploaded ${id}: ${urls[id]}`);
      continue;
    }
    const fullPath = path.resolve(__dirname, '../uploads/organic_chemistry', imgName);
    try {
      console.log(`Uploading ${id}...`);
      const res = await uploadImageToCloudinary(fullPath, {
        folder: 'edvedum/questions/organic_chemistry',
        public_id: id
      });
      const url = res.secure_url || res.url;
      console.log(`${id} uploaded:`, url);
      urls[id] = url;
    } catch (err) {
      console.error(`Failed to upload ${id}:`, err.message);
      urls[id] = `/uploads/organic_chemistry/${imgName}`;
    }
  }

  fs.writeFileSync(urlFile, JSON.stringify(urls, null, 2));
  console.log(`Updated URLs file: ${Object.keys(urls).length} entries.`);
}

main().catch(console.error);

