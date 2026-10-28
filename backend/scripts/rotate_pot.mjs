import sharp from 'sharp';
import fs from 'fs';

const baseDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/39e11379-7ffb-459f-b4f0-6d978d3d1c61/.user_uploaded/';
const outDir = 'backend/scripts/electro_pot_temp/';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = [
  'media_1793101126166.png',
  'media_1793101161016.png',
  'media_1793101174545.png',
  'media_1793101187239.png',
  'media_1793101208702.png'
];

async function rotateAll() {
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    await sharp(baseDir + f).rotate(90).toFile(`${outDir}rot90_${i+1}.png`);
    await sharp(baseDir + f).rotate(270).toFile(`${outDir}rot270_${i+1}.png`);
  }
  console.log('Rotated 5 images');
}

rotateAll();
