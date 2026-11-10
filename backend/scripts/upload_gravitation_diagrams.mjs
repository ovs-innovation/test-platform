import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const diagrams = [
  { key: '7', file: 'uploads/gravitation/q7_diagram.png', id: 'q7_diagram' },
  { key: '14', file: 'uploads/gravitation/q14_diagram.png', id: 'q14_diagram' },
  { key: '27', file: 'uploads/gravitation/q27_diagram.png', id: 'q27_diagram' },
  { key: '31_opt_a', file: 'uploads/gravitation/q31_opt_a.png', id: 'q31_opt_a' },
  { key: '31_opt_b', file: 'uploads/gravitation/q31_opt_b.png', id: 'q31_opt_b' },
  { key: '31_opt_c', file: 'uploads/gravitation/q31_opt_c.png', id: 'q31_opt_c' },
  { key: '31_opt_d', file: 'uploads/gravitation/q31_opt_d.png', id: 'q31_opt_d' },
  { key: '39_opt_a', file: 'uploads/gravitation/q39_opt_a.png', id: 'q39_opt_a' },
  { key: '39_opt_b', file: 'uploads/gravitation/q39_opt_b.png', id: 'q39_opt_b' },
  { key: '39_opt_c', file: 'uploads/gravitation/q39_opt_c.png', id: 'q39_opt_c' },
  { key: '39_opt_d', file: 'uploads/gravitation/q39_opt_d.png', id: 'q39_opt_d' },
  { key: '45_opt_a', file: 'uploads/gravitation/q45_opt_a.png', id: 'q45_opt_a' },
  { key: '45_opt_b', file: 'uploads/gravitation/q45_opt_b.png', id: 'q45_opt_b' },
  { key: '45_opt_c', file: 'uploads/gravitation/q45_opt_c.png', id: 'q45_opt_c' },
  { key: '45_opt_d', file: 'uploads/gravitation/q45_opt_d.png', id: 'q45_opt_d' },
  { key: '53', file: 'uploads/gravitation/q53_diagram.png', id: 'q53_diagram' },
  { key: '57', file: 'uploads/gravitation/q57_diagram.png', id: 'q57_diagram' },
];

async function main() {
  const result = {};
  for (const item of diagrams) {
    const fullPath = path.resolve(__dirname, '..', item.file);
    try {
      console.log(`Uploading ${item.key}...`);
      const res = await uploadImageToCloudinary(fullPath, {
        folder: 'edvedum/questions/gravitation',
        public_id: item.id
      });
      const url = res.secure_url || res.url;
      console.log(`${item.key} uploaded:`, url);
      result[item.key] = url;
    } catch (err) {
      console.error(`Failed to upload ${item.key}:`, err.message);
      result[item.key] = `/uploads/gravitation/${path.basename(item.file)}`;
    }
  }

  const outPath = path.resolve(__dirname, 'gravitation_diagram_urls.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log('Saved diagram URLs to:', outPath);
}

main().catch(console.error);

