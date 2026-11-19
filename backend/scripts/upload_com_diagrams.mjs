import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fyxpnmdh',
  api_key: process.env.CLOUDINARY_API_KEY || '716642519429436',
  api_secret: process.env.CLOUDINARY_API_SECRET || '69WgGypmzKl34WdRC_OLaKiaBRU',
});

const diagramsDir = path.resolve(__dirname, 'com_diagrams');
const urlsFile = path.resolve(__dirname, 'com_diagram_urls.json');

async function uploadAll() {
  const files = fs.readdirSync(diagramsDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} diagrams to upload to Cloudinary...`);

  let urlsMap = {};
  if (fs.existsSync(urlsFile)) {
    try {
      urlsMap = JSON.parse(fs.readFileSync(urlsFile, 'utf8'));
    } catch (_) {}
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const base = path.basename(file, '.png');
    if (urlsMap[file]) {
      console.log(`[ALREADY UPLOADED] ${file} -> ${urlsMap[file]}`);
      continue;
    }

    const filePath = path.resolve(diagramsDir, file);
    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: 'edvedum/com_pyq',
        public_id: base,
        overwrite: true,
      });
      urlsMap[file] = res.secure_url;
      console.log(`[UPLOADED ${i + 1}/${files.length}] ${file} -> ${res.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.message);
    }
  }

  fs.writeFileSync(urlsFile, JSON.stringify(urlsMap, null, 2));
  console.log('Finished uploading all diagrams to Cloudinary!');
}

uploadAll().catch(console.error);
