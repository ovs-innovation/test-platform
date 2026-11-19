import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const diagramsMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'lom_diagrams.json'), 'utf8'));

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
        folder: 'edvedum/lom_pyq',
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

  const outMapFile = path.join(__dirname, 'lom_diagram_urls.json');
  fs.writeFileSync(outMapFile, JSON.stringify(urlMap, null, 2), 'utf8');
  console.log(`Saved Cloudinary URLs for ${Object.keys(urlMap).length} diagrams to ${outMapFile}`);
}

uploadAll().catch(console.error);
