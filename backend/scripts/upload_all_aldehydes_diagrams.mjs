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

const diagramsDir = path.resolve(__dirname, 'aldehydes_diagrams');
const outFile = path.resolve(__dirname, 'aldehydes_diagram_urls.json');

async function uploadDiagrams() {
  if (!fs.existsSync(diagramsDir)) {
    console.log('aldehydes_diagrams directory does not exist.');
    return;
  }
  const files = fs.readdirSync(diagramsDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} diagrams in aldehydes_diagrams to upload to Cloudinary...`);

  const urls = {};
  if (fs.existsSync(outFile)) {
    try {
      Object.assign(urls, JSON.parse(fs.readFileSync(outFile, 'utf8')));
    } catch (_) {}
  }

  const pending = files.filter(f => !urls[f.replace('.png', '')]);
  console.log(`Pending uploads: ${pending.length} / ${files.length}`);

  let uploaded = 0;
  const CONCURRENCY = 6;
  const queue = [...pending];

  async function worker() {
    while (queue.length > 0) {
      const file = queue.shift();
      const key = file.replace('.png', '');
      const filePath = path.join(diagramsDir, file);

      try {
        const res = await cloudinary.uploader.upload(filePath, {
          folder: 'edvedum_aldehydes_and_ketones',
          public_id: key,
          overwrite: true,
          resource_type: 'image'
        });
        urls[key] = res.secure_url;
        uploaded++;
        if (uploaded % 10 === 0 || queue.length === 0) {
          console.log(`Uploaded ${uploaded}/${pending.length} diagrams (${res.secure_url.substring(0, 60)}...)`);
          fs.writeFileSync(outFile, JSON.stringify(urls, null, 2));
        }
      } catch (err) {
        console.error(`Failed to upload ${file}:`, err.message);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  fs.writeFileSync(outFile, JSON.stringify(urls, null, 2));
  console.log(`Cloudinary upload complete. Total mapped URLs: ${Object.keys(urls).length}`);
}

uploadDiagrams().catch(console.error);
