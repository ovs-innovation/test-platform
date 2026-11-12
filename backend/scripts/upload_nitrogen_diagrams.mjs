import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const DIAGRAMS_DIR = './backend/scripts/nitrogen_diagrams';

async function main() {
  const urlFile = './backend/scripts/nitrogen_diagram_urls.json';
  let urls = {};
  if (fs.existsSync(urlFile)) {
    urls = JSON.parse(fs.readFileSync(urlFile, 'utf8'));
  }

  const files = fs.readdirSync(DIAGRAMS_DIR).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} images to upload...`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const key = path.basename(file, '.png');
    if (urls[key]) {
      console.log(`[${i+1}/${files.length}] Already uploaded: ${key} -> ${urls[key]}`);
      continue;
    }

    const filePath = path.join(DIAGRAMS_DIR, file);
    try {
      const res = await uploadImageToCloudinary(filePath, {
        folder: 'edvedum/questions/nitrogen',
        public_id: key,
        overwrite: true
      });
      urls[key] = res.secure_url || res.url;
      console.log(`[${i+1}/${files.length}] Uploaded: ${key} -> ${urls[key]}`);
      fs.writeFileSync(urlFile, JSON.stringify(urls, null, 2));
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.message);
    }
  }

  console.log('Finished uploading all diagrams!');
  fs.writeFileSync(urlFile, JSON.stringify(urls, null, 2));
}

main().catch(err => {
  console.error('Fatal upload error:', err);
  process.exit(1);
});

