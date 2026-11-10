import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const diagrams = [
  { qNum: 2, file: 'uploads/motion_in_straight_line/q2_diagram.png' },
  { qNum: 7, file: 'uploads/motion_in_straight_line/q7_diagram.png' },
  { qNum: 11, file: 'uploads/motion_in_straight_line/q11_diagram.png' },
  { qNum: 13, file: 'uploads/motion_in_straight_line/q13_diagram.png' },
  { qNum: 35, file: 'uploads/motion_in_straight_line/q35_diagram.png' },
  { qNum: 57, file: 'uploads/motion_in_straight_line/q57_diagram.png' },
  { qNum: 59, file: 'uploads/motion_in_straight_line/q59_diagram.png' },
];

async function main() {
  const result = {};
  for (const item of diagrams) {
    const fullPath = path.resolve(__dirname, '..', item.file);
    try {
      console.log(`Uploading Q${item.qNum}...`);
      const res = await uploadImageToCloudinary(fullPath, {
        folder: 'edvedum/questions/motion_straight_line',
        public_id: `q${item.qNum}_diagram`
      });
      console.log(`Q${item.qNum} uploaded:`, res.secure_url || res.url);
      result[item.qNum] = res.secure_url || res.url;
    } catch (err) {
      console.error(`Failed to upload Q${item.qNum}:`, err.message);
      result[item.qNum] = `/uploads/motion_in_straight_line/${path.basename(item.file)}`;
    }
  }

  const outPath = path.resolve(__dirname, 'motion_diagram_urls.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log('Saved diagram URLs to:', outPath);
}

main().catch(console.error);
