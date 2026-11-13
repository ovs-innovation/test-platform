import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const DIAGRAMS_DIR = path.resolve(__dirname, 'biomolecules_diagrams');
const urlFile = path.resolve(__dirname, 'biomolecules_diagram_urls.json');

async function main() {
  const files = fs.readdirSync(DIAGRAMS_DIR).filter(f => f.endsWith('.png'));
  const urls = {};
  if (fs.existsSync(urlFile)) {
    try {
      Object.assign(urls, JSON.parse(fs.readFileSync(urlFile, 'utf8')));
    } catch (e) {}
  }

  for (const file of files) {
    const key = file.replace('.png', '');
    if (urls[key]) {
      console.log(`Already uploaded ${file}: ${urls[key]}`);
      continue;
    }
    const filePath = path.join(DIAGRAMS_DIR, file);
    console.log(`Uploading ${file}...`);
    const res = await uploadImageToCloudinary(filePath, {
      folder: 'edvedum/questions/biomolecules',
      public_id: `biomolecules_${key}`,
      overwrite: true
    });
    urls[key] = res.secure_url;
    console.log(`Uploaded ${file} -> ${res.secure_url}`);
  }

  fs.writeFileSync(urlFile, JSON.stringify(urls, null, 2));
  console.log(`Saved all ${Object.keys(urls).length} diagram URLs to ${urlFile}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

