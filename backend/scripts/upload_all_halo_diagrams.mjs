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
  secure: true
});

const diagramsDir = path.resolve(__dirname, 'halo_diagrams_193');
const outFile = path.resolve(__dirname, 'halo_diagram_urls.json');

async function uploadDiagrams() {
  if (!fs.existsSync(diagramsDir)) {
    console.log('halo_diagrams_193 directory does not exist.');
    return;
  }
  const files = fs.readdirSync(diagramsDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} diagrams in halo_diagrams_193 to upload to Cloudinary...`);

  const urls = {};
  if (fs.existsSync(outFile)) {
    try {
      Object.assign(urls, JSON.parse(fs.readFileSync(outFile, 'utf8')));
    } catch (_) {}
  }

  const toUpload = files.filter(f => !urls[f.replace('.png', '')]);
  console.log(`Already uploaded: ${Object.keys(urls).length}, Remaining to upload: ${toUpload.length}`);

  const CONCURRENCY = 8;
  let completed = 0;

  async function uploadOne(file) {
    const key = file.replace('.png', '');
    const filePath = path.join(diagramsDir, file);

    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: 'edvedum_haloalkanes_and_haloarenes',
        public_id: key,
        overwrite: false,
        resource_type: 'image'
      });
      urls[key] = res.secure_url;
      completed++;
      if (completed % 25 === 0 || completed === toUpload.length) {
        console.log(`Uploaded ${completed}/${toUpload.length} images...`);
        fs.writeFileSync(outFile, JSON.stringify(urls, null, 2));
      }
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.message);
    }
  }

  const queue = [...toUpload];
  async function worker() {
    while (queue.length > 0) {
      const f = queue.shift();
      await uploadOne(f);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  fs.writeFileSync(outFile, JSON.stringify(urls, null, 2));
  console.log(`Successfully uploaded and saved ${Object.keys(urls).length} URLs in ${outFile}`);
}

uploadDiagrams().catch(console.error);
