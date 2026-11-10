import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const diagramsDir = path.resolve(__dirname, '../../frontend/public/uploads/waves');
const outFile = path.resolve(__dirname, 'waves_diagram_urls.json');

async function uploadAll() {
  const files = fs.readdirSync(diagramsDir).filter(f => f.endsWith('.png'));
  const urls = {};

  for (const file of files) {
    const filePath = path.join(diagramsDir, file);
    const key = file.replace('_diagram.png', '').replace('q', '');
    console.log(`Uploading ${file}...`);
    const res = await cloudinary.uploader.upload(filePath, {
      folder: 'edvedum/questions/waves',
      public_id: file.replace('.png', ''),
      overwrite: true
    });
    console.log(`Uploaded ${file} -> ${res.secure_url}`);
    urls[key] = res.secure_url;
  }

  fs.writeFileSync(outFile, JSON.stringify(urls, null, 2));
  console.log('Saved diagram URLs to:', outFile);
}

uploadAll().catch(console.error);

