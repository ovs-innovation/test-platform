import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadDir = path.resolve(__dirname, '../public/uploads/kinetics');
const mapFile = path.resolve(__dirname, 'cloudinary_kinetics_diagrams_map.json');

async function main() {
  console.log('=== Uploading Chemical Kinetics Diagrams to Cloudinary ===');
  const files = fs.readdirSync(uploadDir).filter(f => f.endsWith('.png') && !f.startsWith('test_'));
  console.log(`Found ${files.length} diagram files.`);

  const diagramMap = fs.existsSync(mapFile) ? JSON.parse(fs.readFileSync(mapFile, 'utf8')) : {};

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const localRel = `/uploads/kinetics/${file}`;
    if (diagramMap[localRel]) {
      console.log(`[${i + 1}/${files.length}] Already uploaded: ${file}`);
      continue;
    }
    const fullPath = path.join(uploadDir, file);
    console.log(`[${i + 1}/${files.length}] Uploading ${file} to Cloudinary...`);
    const res = await cloudinary.uploader.upload(fullPath, {
      folder: 'edvedum_chemistry/kinetics',
      public_id: file.replace('.png', ''),
      overwrite: true
    });
    diagramMap[localRel] = res.secure_url;
    fs.writeFileSync(mapFile, JSON.stringify(diagramMap, null, 2));
    console.log(`  -> URL: ${res.secure_url}`);
  }

  console.log('\n=== All Chemical Kinetics diagrams uploaded to Cloudinary successfully! ===');
  console.log(`Total mapped: ${Object.keys(diagramMap).length}`);
}

main().catch(console.error);
