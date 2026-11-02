import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const eqDir = path.resolve(__dirname, '../uploads/equilibrium/diagrams');
const mapFile = path.resolve(__dirname, './cloudinary_equilibrium_diagrams_map.json');

async function main() {
  console.log('=== Uploading Equilibrium Diagrams to Cloudinary ===');

  let diagramMap = {};
  if (fs.existsSync(mapFile)) {
    try {
      diagramMap = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
    } catch {
      diagramMap = {};
    }
  }

  const files = fs.readdirSync(eqDir).filter(f => f.startsWith('eq_q') && f.endsWith('.png'));
  console.log(`Found ${files.length} diagram files to upload.`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const key = file.replace(/\.png$/, '');
    if (diagramMap[key]) {
      console.log(`[Already Uploaded] ${file} -> ${diagramMap[key]}`);
      continue;
    }

    const filePath = path.join(eqDir, file);
    console.log(`[${i + 1}/${files.length}] Uploading ${file} to Cloudinary...`);
    try {
      const res = await uploadImageToCloudinary(filePath, {
        folder: 'edvedum_chemistry/equilibrium',
        public_id: key,
        overwrite: true
      });
      diagramMap[key] = res.secure_url;
      fs.writeFileSync(mapFile, JSON.stringify(diagramMap, null, 2));
      console.log(`  Uploaded -> ${res.secure_url}`);
    } catch (err) {
      console.error(`  Failed to upload ${file}:`, err.message);
    }
  }

  console.log('Finished uploading diagrams.');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

