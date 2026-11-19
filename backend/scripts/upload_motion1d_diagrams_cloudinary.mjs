import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const diagramsMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'motion1d_diagrams.json'), 'utf8'));

async function uploadAll() {
  console.log(`Uploading ${Object.keys(diagramsMap).length} diagrams to Cloudinary...`);
  const urlMap = {};

  for (const [qStr, localRel] of Object.entries(diagramsMap)) {
    const qNum = parseInt(qStr);
    const fullPath = path.resolve(__dirname, `..${localRel}`);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File ${fullPath} not found`);
      urlMap[qNum] = localRel;
      continue;
    }

    try {
      const res = await uploadImageToCloudinary(fullPath, {
        folder: 'edvedum/motion1d_pyq',
        public_id: `q${qNum}_diagram`
      });
      const cloudUrl = res.secure_url || res.url || localRel;
      console.log(`Q${qNum} uploaded -> ${cloudUrl}`);
      urlMap[qNum] = cloudUrl;
    } catch (err) {
      console.error(`Failed to upload Q${qNum} to Cloudinary: ${err.message}. Using local path.`);
      urlMap[qNum] = localRel;
    }
  }

  fs.writeFileSync(path.join(__dirname, 'motion1d_diagram_urls.json'), JSON.stringify(urlMap, null, 2));
  console.log('Saved motion1d_diagram_urls.json with all Cloudinary URLs!');
}

uploadAll().catch(err => {
  console.error('Fatal upload error:', err);
  process.exit(1);
});
