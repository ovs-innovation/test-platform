import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function retryQ7() {
  const fullPath = path.resolve(__dirname, '../uploads/motion_in_straight_line/q7_diagram.png');
  console.log('Retrying Q7 upload...');
  const res = await uploadImageToCloudinary(fullPath, {
    folder: 'edvedum/questions/motion_straight_line',
    public_id: 'q7_diagram'
  });
  console.log('Q7 uploaded:', res.secure_url || res.url);
  const outPath = path.resolve(__dirname, 'motion_diagram_urls.json');
  const existing = JSON.parse(fs.readFileSync(outPath, 'utf8'));
  existing['7'] = res.secure_url || res.url;
  fs.writeFileSync(outPath, JSON.stringify(existing, null, 2));
  console.log('Updated motion_diagram_urls.json!');
}

retryQ7().catch(console.error);

