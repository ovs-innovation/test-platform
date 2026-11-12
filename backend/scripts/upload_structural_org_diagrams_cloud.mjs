import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const DIAGRAMS_DIR = './backend/scripts/structural_org_diagrams';
const urlFile = './backend/scripts/structural_org_diagram_urls.json';

async function main() {
  const qNums = [58, 60, 62];
  const urls = {};
  for (const qNum of qNums) {
    const filePath = path.join(DIAGRAMS_DIR, `q_${qNum}.png`);
    console.log(`Uploading Q${qNum} diagram to Cloudinary...`);
    const res = await uploadImageToCloudinary(filePath, {
      folder: 'edvedum/questions/structural_organisation_in_animals',
      public_id: `structural_org_q_${qNum}`,
      overwrite: true
    });
    urls[`q_${qNum}`] = res.secure_url;
    console.log(`Q${qNum} uploaded:`, res.secure_url);
  }
  fs.writeFileSync(urlFile, JSON.stringify(urls, null, 2));
  console.log('Saved diagram URLs to', urlFile);
}

main().catch(console.error);
