import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const diagrams = [
  { key: '1', file: 'uploads/center_of_mass/q1_diagram.png', id: 'q1_diagram' },
  { key: '2', file: 'uploads/center_of_mass/q2_diagram.png', id: 'q2_diagram' },
  { key: '2_opt_a', file: 'uploads/center_of_mass/q2_opt_a.png', id: 'q2_opt_a' },
  { key: '2_opt_b', file: 'uploads/center_of_mass/q2_opt_b.png', id: 'q2_opt_b' },
  { key: '2_opt_c', file: 'uploads/center_of_mass/q2_opt_c.png', id: 'q2_opt_c' },
  { key: '2_opt_d', file: 'uploads/center_of_mass/q2_opt_d.png', id: 'q2_opt_d' },
  { key: '13', file: 'uploads/center_of_mass/q13_diagram.png', id: 'q13_diagram' },
  { key: '20', file: 'uploads/center_of_mass/q20_diagram.png', id: 'q20_diagram' },
  { key: '26', file: 'uploads/center_of_mass/q26_diagram.png', id: 'q26_diagram' },
];

async function main() {
  const result = {};
  for (const item of diagrams) {
    const fullPath = path.resolve(__dirname, '..', item.file);
    try {
      console.log(`Uploading ${item.key}...`);
      const res = await uploadImageToCloudinary(fullPath, {
        folder: 'edvedum/questions/center_of_mass',
        public_id: item.id
      });
      const url = res.secure_url || res.url;
      console.log(`${item.key} uploaded:`, url);
      result[item.key] = url;
    } catch (err) {
      console.error(`Failed to upload ${item.key}:`, err.message);
      result[item.key] = `/uploads/center_of_mass/${path.basename(item.file)}`;
    }
  }

  const outPath = path.resolve(__dirname, 'com_diagram_urls.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log('Saved diagram URLs to:', outPath);
}

main().catch(console.error);

