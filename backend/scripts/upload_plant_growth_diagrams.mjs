import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const mapFile = path.resolve(__dirname, './plant_growth_cloudinary_map.json');

async function main() {
  console.log('=== Uploading Plant Growth Diagrams to Cloudinary ===');
  const imgPath = path.resolve(__dirname, '../../frontend/public/uploads/plant_growth/q23_crop.png');
  const localRel = '/uploads/plant_growth/q23_crop.png';

  let diagramMap = {};
  if (fs.existsSync(mapFile)) {
    try {
      diagramMap = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
    } catch {
      diagramMap = {};
    }
  }

  if (fs.existsSync(imgPath)) {
    console.log('Uploading q23_crop.png to Cloudinary...');
    const res = await uploadImageToCloudinary(imgPath, {
      folder: 'edvedum_botany/plant_growth',
      public_id: 'q23_nutrient_growth_graph',
      overwrite: true
    });
    diagramMap[localRel] = res.secure_url;
    fs.writeFileSync(mapFile, JSON.stringify(diagramMap, null, 2));
    console.log(`Uploaded successfully: ${res.secure_url}`);
  }
}

main().catch(console.error);

