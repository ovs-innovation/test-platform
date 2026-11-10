import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const diagrams = [
  { qNum: 4, file: 'uploads/motion_in_plane/q4_diagram.png' },
  { qNum: 15, file: 'uploads/motion_in_plane/q15_diagram.png' },
  { qNum: 17, file: 'uploads/motion_in_plane/q17_diagram.png' },
  { qNum: 27, file: 'uploads/motion_in_plane/q27_diagram.png' },
  { qNum: 37, file: 'uploads/motion_in_plane/q37_diagram.png' },
  { qNum: 56, file: 'uploads/motion_in_plane/q56_diagram.png' },
];

async function main() {
  const result = {};
  for (const item of diagrams) {
    const fullPath = path.resolve(__dirname, '..', item.file);
    try {
      console.log(`Uploading Q${item.qNum}...`);
      const res = await uploadImageToCloudinary(fullPath, {
        folder: 'edvedum/questions/motion_in_plane',
        public_id: `q${item.qNum}_diagram`
      });
      console.log(`Q${item.qNum} uploaded:`, res.secure_url || res.url);
      result[item.qNum] = res.secure_url || res.url;
    } catch (err) {
      console.error(`Failed to upload Q${item.qNum}:`, err.message);
      result[item.qNum] = `/uploads/motion_in_plane/${path.basename(item.file)}`;
    }
  }

  const outPath = path.resolve(__dirname, 'motion_in_plane_diagram_urls.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log('Saved diagram URLs to:', outPath);
}

main().catch(console.error);

