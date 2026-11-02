import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const diagDir = path.resolve(__dirname, '../uploads/thermodynamics_chem');
const mapFile = path.resolve(__dirname, './thermo_chem_cloudinary_map.json');

async function main() {
  console.log('=== Uploading Thermodynamics Chemistry Diagrams to Cloudinary ===');

  let diagramMap = {};
  if (fs.existsSync(mapFile)) {
    try {
      diagramMap = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
    } catch {
      diagramMap = {};
    }
  }

  const files = fs.readdirSync(diagDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} diagram files.`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (diagramMap[file]) {
      console.log(`[Already Uploaded] ${file} -> ${diagramMap[file]}`);
      continue;
    }

    const filePath = path.join(diagDir, file);
    const pubId = file.replace(/\.png$/, '');
    console.log(`[${i + 1}/${files.length}] Uploading ${file} to Cloudinary...`);
    const res = await uploadImageToCloudinary(filePath, {
      folder: 'edvedum_chemistry/thermodynamics',
      public_id: pubId,
      overwrite: true
    });
    diagramMap[file] = res.secure_url;
    fs.writeFileSync(mapFile, JSON.stringify(diagramMap, null, 2));
    console.log(`Uploaded ${file}: ${res.secure_url}`);
  }

  console.log('All diagrams uploaded to Cloudinary successfully!');
}

main().catch(console.error);

