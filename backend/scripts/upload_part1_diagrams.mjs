import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const images = [
  'q1_diag.png',
  'q5_diag.png',
  'q7_diag.png',
  'q11_diag.png',
  'q15_opt_a.png',
  'q15_opt_b.png',
  'q15_opt_c.png',
  'q15_opt_d.png',
  'q19_opt_a.png',
  'q19_opt_b.png',
  'q19_opt_c.png',
  'q19_opt_d.png',
  'q24_diag.png',
  'q27_opt_a.png',
  'q27_opt_b.png',
  'q27_opt_c.png',
  'q27_opt_d.png',
  'q28_opt_a.png',
  'q28_opt_b.png',
  'q28_opt_c.png',
  'q28_opt_d.png',
  'q30_opt_a.png',
  'q30_opt_b.png',
  'q30_opt_c.png',
  'q30_opt_d.png',
  'q31_diag.png',
  'q33_opt_a.png',
  'q33_opt_b.png',
  'q33_opt_c.png',
  'q33_opt_d.png',
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

