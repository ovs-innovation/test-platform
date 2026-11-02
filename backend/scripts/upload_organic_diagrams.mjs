import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const organicDir = path.resolve(__dirname, '../../frontend/public/uploads/organic');
const mapFile = path.resolve(__dirname, './organic_cloudinary_map.json');

async function main() {
  console.log('=== Uploading Organic Chemistry Diagrams to Cloudinary ===');

  let diagramMap = {};
  if (fs.existsSync(mapFile)) {
    try {
      diagramMap = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
    } catch {
      diagramMap = {};
    }
  }

  const files = fs.readdirSync(organicDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} diagram files in ${organicDir}.`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const localRel = `/uploads/organic/${file}`;
    if (diagramMap[localRel]) {
      console.log(`[Already Uploaded] ${file} -> ${diagramMap[localRel]}`);
      continue;
    }

    const filePath = path.join(organicDir, file);
    const pubId = file.replace(/\.png$/, '');
    console.log(`[${i + 1}/${files.length}] Uploading ${file} to Cloudinary...`);
    try {
      const res = await uploadImageToCloudinary(filePath, {
        folder: 'edvedum_chemistry/organic',
        public_id: pubId,
        overwrite: true
      });
      diagramMap[localRel] = res.secure_url;
      fs.writeFileSync(mapFile, JSON.stringify(diagramMap, null, 2));
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.message);
    }
  }

  console.log(`\nSuccessfully uploaded all diagrams. Map saved to ${mapFile}`);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

