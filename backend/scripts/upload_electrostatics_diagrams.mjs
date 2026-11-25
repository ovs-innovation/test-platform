import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fyxpnmdh',
  api_key: process.env.CLOUDINARY_API_KEY || '716642519429436',
  api_secret: process.env.CLOUDINARY_API_SECRET || '69WgGypmzKl34WdRC_OLaKiaBRU',
});

const DIAGRAMS_DIR = path.resolve(__dirname, 'electrostatics_diagrams');
const URLS_FILE = path.resolve(__dirname, 'electrostatics_diagram_urls.json');

let urlMap = {};
if (fs.existsSync(URLS_FILE)) {
  try {
    urlMap = JSON.parse(fs.readFileSync(URLS_FILE, 'utf8'));
    console.log(`Loaded ${Object.keys(urlMap).length} already uploaded URLs.`);
  } catch (e) {}
}

async function uploadAll() {
  const files = fs.readdirSync(DIAGRAMS_DIR).filter(f => f.endsWith('.png'));
  console.log(`Total diagram files to consider: ${files.length}`);

  const toUpload = files.filter(f => {
    const m = f.match(/_h(\d+)\.png$/);
    const h = m ? parseInt(m[1], 10) : 0;
    return h >= 60 && !urlMap[f];
  });

  console.log(`Remaining diagrams to upload to Cloudinary: ${toUpload.length}`);

  const BATCH = 6;
  let count = 0;
  for (let i = 0; i < toUpload.length; i += BATCH) {
    const batch = toUpload.slice(i, i + BATCH);
    await Promise.all(batch.map(async (file) => {
      const filePath = path.join(DIAGRAMS_DIR, file);
      const publicId = path.parse(file).name;
      try {
        const res = await cloudinary.uploader.upload(filePath, {
          folder: 'edvedum_physics/electrostatics',
          public_id: publicId,
          overwrite: true,
          resource_type: 'image'
        });
        urlMap[file] = res.secure_url;
        count++;
      } catch (err) {
        console.error(`Upload error for ${file}:`, err.message);
      }
    }));

    if (count % 25 === 0 || i + BATCH >= toUpload.length) {
      console.log(`Uploaded ${count} / ${toUpload.length} diagrams.`);
      fs.writeFileSync(URLS_FILE, JSON.stringify(urlMap, null, 2));
    }
  }

  fs.writeFileSync(URLS_FILE, JSON.stringify(urlMap, null, 2));
  console.log(`All uploaded! Total Cloudinary URLs in map: ${Object.keys(urlMap).length}`);
}

uploadAll().catch(console.error);
