import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const UPLOADS_DIR = path.resolve(__dirname, '../uploads/goc_diagrams');
const MAP_FILE = path.resolve(__dirname, './goc_diagram_urls.json');

async function main() {
  console.log('=== Uploading Basics of Organic Chemistry Diagrams to Cloudinary ===');

  let urls = {};
  if (fs.existsSync(MAP_FILE)) {
    try {
      urls = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'));
    } catch {
      urls = {};
    }
  }

  const files = fs.readdirSync(UPLOADS_DIR).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} diagram files in ${UPLOADS_DIR}.`);

  const pending = files.filter(f => {
    const key = f.replace(/\.png$/, '');
    return !(urls[key] && urls[key].startsWith('http'));
  });
  console.log(`Pending uploads: ${pending.length} / ${files.length}`);

  // Upload with concurrency of 12
  const CONCURRENCY = 12;
  for (let i = 0; i < pending.length; i += CONCURRENCY) {
    const batch = pending.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(async (file) => {
      const key = file.replace(/\.png$/, '');
      const filePath = path.join(UPLOADS_DIR, file);
      try {
        const res = await uploadImageToCloudinary(filePath, {
          folder: 'edvedum/questions/basics_of_organic_chemistry',
          public_id: key,
          overwrite: true
        });
        urls[key] = res.secure_url || res.url;
      } catch (err) {
        console.error(`Upload failed for ${key}:`, err.message);
        urls[key] = `/uploads/goc_diagrams/${file}`;
      }
    }));

    fs.writeFileSync(MAP_FILE, JSON.stringify(urls, null, 2));
    const doneCount = files.length - pending.length + Math.min(i + CONCURRENCY, pending.length);
    if ((i / CONCURRENCY) % 5 === 0 || i + CONCURRENCY >= pending.length) {
      console.log(`Uploaded progress: ${doneCount} / ${files.length}`);
    }
  }

  const uploadedCount = Object.values(urls).filter(u => u.startsWith('http')).length;
  console.log(`Successfully uploaded and mapped ${uploadedCount} / ${files.length} diagrams!`);
}

main().catch(console.error);
