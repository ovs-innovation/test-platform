import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const diagrams = [
  { qNum: 9, file: 'uploads/work_energy_power/q9_diagram.png' },
  { qNum: 14, file: 'uploads/work_energy_power/q14_diagram.png' },
  { qNum: 33, file: 'uploads/work_energy_power/q33_diagram.png' },
  { qNum: 44, file: 'uploads/work_energy_power/q44_diagram.png' },
  { qNum: 47, file: 'uploads/work_energy_power/q47_diagram.png' },
];

async function main() {
  const result = {};
  for (const item of diagrams) {
    const fullPath = path.resolve(__dirname, '..', item.file);
    try {
      console.log(`Uploading Q${item.qNum}...`);
      const res = await uploadImageToCloudinary(fullPath, {
        folder: 'edvedum/questions/work_energy_power',
        public_id: `q${item.qNum}_diagram`
      });
      console.log(`Q${item.qNum} uploaded:`, res.secure_url || res.url);
      result[item.qNum] = res.secure_url || res.url;
    } catch (err) {
      console.error(`Failed to upload Q${item.qNum}:`, err.message);
      result[item.qNum] = `/uploads/work_energy_power/${path.basename(item.file)}`;
    }
  }

  const outPath = path.resolve(__dirname, 'wep_diagram_urls.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log('Saved diagram URLs to:', outPath);
}

main().catch(console.error);

