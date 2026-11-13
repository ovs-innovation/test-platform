import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const UPLOADS_DIR = path.resolve(__dirname, '../uploads/hydrocarbons');
const MAP_FILE = path.resolve(__dirname, './hydrocarbons_diagram_urls.json');

async function main() {
  console.log('=== Uploading Hydrocarbons Diagrams to Cloudinary ===');

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

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const key = file.replace(/\.png$/, '');

    if (urls[key] && urls[key].startsWith('http')) {
      console.log(`[Already Uploaded] ${key} -> ${urls[key]}`);
      continue;
    }

    const filePath = path.join(UPLOADS_DIR, file);
    console.log(`[${i + 1}/${files.length}] Uploading ${file}...`);
    try {
      const res = await uploadImageToCloudinary(filePath, {
        folder: 'edvedum/questions/hydrocarbons',
        public_id: key,
        overwrite: true
      });
      urls[key] = res.secure_url || res.url;
      console.log(`  Uploaded -> ${urls[key]}`);
    } catch (err) {
      console.error(`  Upload failed for ${key}:`, err.message);
      urls[key] = `/uploads/hydrocarbons/${file}`;
    }

    fs.writeFileSync(MAP_FILE, JSON.stringify(urls, null, 2));
  }

  console.log(`Successfully mapped ${Object.keys(urls).length} diagrams!`);
}

main().catch(console.error);

