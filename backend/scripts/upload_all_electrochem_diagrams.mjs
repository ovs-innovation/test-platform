import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fyxpnmdh',
  api_key: process.env.CLOUDINARY_API_KEY || '716642519429436',
  api_secret: process.env.CLOUDINARY_API_SECRET || '69WgGypmzKl34WdRC_OLaKiaBRU',
  secure: true
});

const diagramsDir = path.resolve('backend/scripts/electrochem_diagrams');
const outFile = path.resolve('backend/scripts/electrochemistry_diagram_urls.json');

const files = fs.readdirSync(diagramsDir).filter(f => f.endsWith('.png') && !f.includes('_test'));
console.log(`Found ${files.length} diagrams to upload to Cloudinary...`);

const urls = {};
// Load existing urls if any
if (fs.existsSync(outFile)) {
  try {
    Object.assign(urls, JSON.parse(fs.readFileSync(outFile, 'utf8')));
  } catch (_) {}
}

for (const file of files) {
  const key = file.replace('.png', '');
  if (urls[key]) {
    console.log(`Already uploaded: ${key} -> ${urls[key]}`);
    continue;
  }

  const filePath = path.join(diagramsDir, file);
  try {
    console.log(`Uploading ${file}...`);
    const res = await cloudinary.uploader.upload(filePath, {
      folder: 'edvedum_electrochemistry',
      public_id: key,
      overwrite: true,
      resource_type: 'image'
    });
    urls[key] = res.secure_url;
    console.log(`Uploaded ${key} -> ${res.secure_url}`);
  } catch (err) {
    console.error(`Failed to upload ${file}:`, err.message);
  }
}

fs.writeFileSync(outFile, JSON.stringify(urls, null, 2));
console.log(`Saved ${Object.keys(urls).length} diagram URLs to ${outFile}`);
