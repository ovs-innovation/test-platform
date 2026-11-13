import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function main() {
  const filePath = './backend/scripts/anatomy_diagrams/q7_diag.png';
  const urlFile = './backend/scripts/anatomy_diagram_urls.json';

  console.log('Uploading q7_diag.png to Cloudinary...');
  const res = await uploadImageToCloudinary(filePath, {
    folder: 'edvedum/questions/anatomy_flowering_plants',
    public_id: 'q7_diag',
    overwrite: true
  });

  const urls = { q7_diag: res.secure_url };
  fs.writeFileSync(urlFile, JSON.stringify(urls, null, 2));
  console.log('Uploaded successfully:', res.secure_url);
}

main().catch(console.error);

