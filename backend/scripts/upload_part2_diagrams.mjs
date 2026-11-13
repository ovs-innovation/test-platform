import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const images = [
  'q39_opt_a.png',
  'q39_opt_b.png',
  'q39_opt_c.png',
  'q39_opt_d.png',
  'q40_opt_a.png',
  'q40_opt_b.png',
  'q40_opt_c.png',
  'q40_opt_d.png',
  'q44_diag.png',
  'q46_diag.png',
  'q47_opt_a.png',
  'q47_opt_b.png',
  'q47_opt_c.png',
  'q47_opt_d.png',
  'q51_diag.png',
  'q52_diag.png',
  'q53_opt_a.png',
  'q53_opt_b.png',
  'q53_opt_c.png',
  'q53_opt_d.png',
  'q55_diag.png',
  'q56_diag.png',
  'q57_opt_a.png',
  'q57_opt_b.png',
  'q57_opt_c.png',
  'q57_opt_d.png',
  'q60_diag.png',
  'q62_opt_a.png',
  'q62_opt_b.png',
  'q62_opt_c.png',
  'q62_opt_d.png',
  'q63_diag.png',
  'q64_diag.png',
  'q65_opt_a.png',
  'q65_opt_b.png',
  'q65_opt_c.png',
  'q65_opt_d.png',
  'q66_opt_a.png',
  'q66_opt_b.png',
  'q66_opt_c.png',
  'q66_opt_d.png',
  'q70_diag.png',
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

