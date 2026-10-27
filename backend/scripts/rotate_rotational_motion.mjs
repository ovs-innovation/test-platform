import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const userDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/d5ca2a07-dcd1-40f5-92f2-f44308e59fc5/.user_uploaded';
const outDir = './scripts/rotational_motion_pages';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const files = [
  'media_1793020490837.png',
  'media_1793020508697.png',
  'media_1793020529112.png',
  'media_1793020549872.png',
  'media_1793020567040.png'
];

async function rotateAll() {
  for (let i = 0; i < files.length; i++) {
    const src = path.join(userDir, files[i]);
    const dest = path.join(outDir, `page_${i + 1}.png`);
    await sharp(src).rotate(270).toFile(dest);
    console.log(`Rotated ${files[i]} -> page_${i + 1}.png`);
  }
  console.log('All 5 pages rotated upright.');
}

rotateAll();
