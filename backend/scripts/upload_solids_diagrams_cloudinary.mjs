import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const qNums = [5, 8, 11, 14, 17, 20, 27, 41, 42, 47, 53, 61, 70, 80, 83, 90, 101, 107, 113];

async function uploadAll() {
  console.log('Uploading diagrams to Cloudinary...');
  const urlMap = {};

  for (const q of qNums) {
    const localRel = `/uploads/solids_pyq/q${q}/question-diagram.png`;
    const fullPath = path.resolve(__dirname, `../uploads/solids_pyq/q${q}/question-diagram.png`);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File ${fullPath} not found`);
      urlMap[q] = localRel;
      continue;
    }

    try {
      const res = await uploadImageToCloudinary(fullPath, {
        folder: 'edvedum/solids_pyq',
        public_id: `q${q}_diagram`
      });
      const cloudUrl = res.secure_url || res.url || localRel;
      console.log(`Q${q} uploaded -> ${cloudUrl}`);
      urlMap[q] = cloudUrl;
    } catch (err) {
      console.error(`Failed to upload Q${q} to Cloudinary: ${err.message}. Using local path.`);
      urlMap[q] = localRel;
    }
  }

  fs.writeFileSync(path.join(__dirname, 'solids_diagram_urls.json'), JSON.stringify(urlMap, null, 2));
  console.log('Saved solids_diagram_urls.json');
}

uploadAll().catch(err => {
  console.error('Fatal upload error:', err);
  process.exit(1);
});
