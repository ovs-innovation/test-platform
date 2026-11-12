import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const DIAGRAMS_DIR = './backend/scripts/cell_cycle_diagrams';

async function main() {
  const urlFile = './backend/scripts/cell_cycle_diagram_urls.json';
  let urls = {};
  if (fs.existsSync(urlFile)) {
    urls = JSON.parse(fs.readFileSync(urlFile, 'utf8'));
  }

  const files = ['q_65.png', 'q_67.png', 'q_70.png', 'q_74.png', 'q_76.png'];
  console.log(`Uploading ${files.length} cell cycle images to Cloudinary...`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const key = path.basename(file, '.png');
    if (urls[key]) {
      console.log(`[${i+1}/${files.length}] Already uploaded: ${key} -> ${urls[key]}`);
      continue;
    }

    const filePath = path.join(DIAGRAMS_DIR, file);
    try {
      const res = await uploadImageToCloudinary(filePath, {
        folder: 'edvedum/questions/cell_cycle_division',
        public_id: `cell_cycle_${key}`,
        overwrite: true
      });
      urls[key] = res.secure_url;
      fs.writeFileSync(urlFile, JSON.stringify(urls, null, 2));
      console.log(`[${i+1}/${files.length}] Uploaded: ${key} -> ${res.secure_url}`);
    } catch (err) {
      console.error(`Error uploading ${key}:`, err.message);
    }
  }

  console.log('Upload complete. Total URLs:', Object.keys(urls).length);
}

main().catch(console.error);
