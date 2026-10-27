import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const userDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/d5ca2a07-dcd1-40f5-92f2-f44308e59fc5/.user_uploaded';
const outDir = './scripts/gravitation_pages';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const files = [
  'media_1793024426499.png',
  'media_1793024458916.png',
  'media_1793024488876.png',
  'media_1793024510957.png',
  'media_1793024539027.png'
];

async function rotateAll() {
  for (let i = 0; i < files.length; i++) {
    const src = path.join(userDir, files[i]);
    const dest = path.join(outDir, `page_${i + 1}.png`);
    await sharp(src).rotate(270).toFile(dest);
    console.log(`Rotated ${files[i]} -> page_${i + 1}.png`);
  }
  console.log('All 5 gravitation pages rotated upright.');
}

rotateAll();
