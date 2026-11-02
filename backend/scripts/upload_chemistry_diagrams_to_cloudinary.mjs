import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { pool } from '../src/config/db.js';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const haloDir = path.resolve(__dirname, '../uploads/haloalkanes');
const pblockDir = path.resolve(__dirname, '../uploads/pblock');
const mapFile = path.resolve(__dirname, './cloudinary_diagrams_map.json');

async function main() {
  console.log('=== Uploading Chemistry Diagrams to Cloudinary ===');

  let diagramMap = {};
  if (fs.existsSync(mapFile)) {
    try {
      diagramMap = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
    } catch {
      diagramMap = {};
    }
  }

  // 1. Upload Haloalkanes diagrams
  const haloFiles = fs.readdirSync(haloDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${haloFiles.length} Haloalkanes diagram files.`);

  for (let i = 0; i < haloFiles.length; i++) {
    const file = haloFiles[i];
    const localRel = `/uploads/haloalkanes/${file}`;
    if (diagramMap[localRel]) {
      console.log(`[Already Uploaded] ${file} -> ${diagramMap[localRel]}`);
      continue;
    }

    const filePath = path.join(haloDir, file);
    const pubId = file.replace(/\.png$/, '');
    console.log(`[${i + 1}/${haloFiles.length}] Uploading ${file} to Cloudinary...`);
    const res = await uploadImageToCloudinary(filePath, {
      folder: 'edvedum_chemistry/haloalkanes',
      public_id: pubId,
      overwrite: true
    });
    diagramMap[localRel] = res.secure_url;
    fs.writeFileSync(mapFile, JSON.stringify(diagramMap, null, 2));
  }

  // 2. Upload p-Block diagrams
  const pblockFiles = fs.readdirSync(pblockDir).filter(f => f.endsWith('.png'));
  console.log(`\nFound ${pblockFiles.length} p-Block diagram files.`);

  for (let i = 0; i < pblockFiles.length; i++) {
    const file = pblockFiles[i];
    const localRel = `/uploads/pblock/${file}`;
    if (diagramMap[localRel]) {
      console.log(`[Already Uploaded] ${file} -> ${diagramMap[localRel]}`);
      continue;
    }

    const filePath = path.join(pblockDir, file);
    const pubId = file.replace(/\.png$/, '');
    console.log(`[${i + 1}/${pblockFiles.length}] Uploading ${file} to Cloudinary...`);
    const res = await uploadImageToCloudinary(filePath, {
      folder: 'edvedum_chemistry/pblock',
      public_id: pubId,
      overwrite: true
    });
    diagramMap[localRel] = res.secure_url;
    fs.writeFileSync(mapFile, JSON.stringify(diagramMap, null, 2));
  }

  console.log('\n=== All diagrams uploaded to Cloudinary successfully! ===');
  console.log(`Total mapped diagram URLs: ${Object.keys(diagramMap).length}`);

  // 3. Update local Neon DB with Cloudinary URLs
  console.log('\n--- Updating PostgreSQL DB with Cloudinary URLs ---');
  let updatedInDb = 0;
  for (const [relPath, cdnUrl] of Object.entries(diagramMap)) {
    const upRes = await pool.query(
      "UPDATE question_bank SET image_url = $1 WHERE image_url = $2 RETURNING id",
      [cdnUrl, relPath]
    );
    if (upRes.rowCount > 0) {
      updatedInDb += upRes.rowCount;
    }
  }
  console.log(`Updated ${updatedInDb} questions in question_bank with Cloudinary CDN URLs.`);

  await pool.end();
}

main().catch(err => {
  console.error('Fatal Upload Error:', err);
  process.exit(1);
});
