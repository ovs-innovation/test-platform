import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const filePath = './backend/scripts/respiration_diagrams/q_31.png';
const urlFile = './backend/scripts/respiration_diagram_urls.json';

async function main() {
  console.log('Uploading Q31 diagram to Cloudinary...');
  const res = await uploadImageToCloudinary(filePath, {
    folder: 'edvedum/questions/respiration_in_plants',
    public_id: 'respiration_q_31',
    overwrite: true
  });
  const urls = { q_31: res.secure_url };
  fs.writeFileSync(urlFile, JSON.stringify(urls, null, 2));
  console.log('Uploaded successfully:', res.secure_url);
}

main().catch(console.error);
