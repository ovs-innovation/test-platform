import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/d5ca2a07-dcd1-40f5-92f2-f44308e59fc5/scratch/rotated_laws_of_motion';
fs.mkdirSync(outDir, { recursive: true });

const images = [
  { id: 1, name: 'media_1792991419706.png' },
  { id: 2, name: 'media_1792991419709.png' },
  { id: 3, name: 'media_1792991419716.png' },
  { id: 4, name: 'media_1792991419728.png' },
  { id: 5, name: 'media_1792991419734.png' },
];

async function rotateAll() {
  for (const img of images) {
    const src = path.join('C:/Users/rs004/.gemini/antigravity-ide/brain/d5ca2a07-dcd1-40f5-92f2-f44308e59fc5/.user_uploaded', img.name);
    const dest = path.join(outDir, `lom_page${img.id}.png`);
    await sharp(src).rotate(270).toFile(dest);
    const meta = await sharp(dest).metadata();
    console.log(`Rotated lom_page${img.id}.png: ${meta.width}x${meta.height}`);
  }
}

rotateAll().catch(console.error);
