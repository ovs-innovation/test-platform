import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const DIAGRAMS_DIR = path.resolve(__dirname, 'evolution_diagrams');
const urlFile = path.resolve(__dirname, 'evolution_diagram_urls.json');

async function main() {
  const qNums = [12];
  const urls = {};
  for (const qNum of qNums) {
    const filePath = path.join(DIAGRAMS_DIR, `q_${qNum}.png`);
    console.log(`Uploading Q${qNum} diagram to Cloudinary...`);
    const res = await uploadImageToCloudinary(filePath, {
      folder: 'edvedum/questions/evolution',
      public_id: `evolution_q_${qNum}`,
      overwrite: true
    });
    urls[`q_${qNum}`] = res.secure_url;
    console.log(`Q${qNum} uploaded:`, res.secure_url);
  }
  fs.writeFileSync(urlFile, JSON.stringify(urls, null, 2));
  console.log('Saved diagram URLs to', urlFile);
}

main().catch(console.error);

