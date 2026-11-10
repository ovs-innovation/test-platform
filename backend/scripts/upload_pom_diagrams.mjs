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

const diagramsDir = path.resolve(__dirname, 'pom_diagrams');
const publicDir = path.resolve(__dirname, '../../frontend/public/uploads/properties_of_matter');
const outFile = path.resolve(__dirname, 'pom_diagram_urls.json');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function uploadAll() {
  const files = fs.readdirSync(diagramsDir).filter(f => f.endsWith('.png'));
  const urls = {};

  for (const file of files) {
    const srcPath = path.join(diagramsDir, file);
    const destPath = path.join(publicDir, file);
    fs.copyFileSync(srcPath, destPath);

    console.log(`Uploading ${file} to Cloudinary...`);
    const res = await cloudinary.uploader.upload(srcPath, {
      folder: 'edvedum/questions/properties_of_matter',
      public_id: file.replace('.png', ''),
      overwrite: true
    });
    console.log(`Uploaded ${file} -> ${res.secure_url}`);
    const key = file.replace('.png', '');
    urls[key] = res.secure_url;
  }

  fs.writeFileSync(outFile, JSON.stringify(urls, null, 2));
  console.log('Saved POM diagram URLs to:', outFile);
}

uploadAll().catch(console.error);
