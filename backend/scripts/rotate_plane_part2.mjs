import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/d5ca2a07-dcd1-40f5-92f2-f44308e59fc5/scratch/rotated_plane_part2';
fs.mkdirSync(outDir, { recursive: true });

const images = [
  { id: 1, name: 'media_1792987760546.png' },
  { id: 2, name: 'media_1792987779989.png' },
  { id: 3, name: 'media_1792987806338.png' },
  { id: 4, name: 'media_1792987821292.png' },
];

async function rotateAll() {
  for (const img of images) {
    const src = path.join('C:/Users/rs004/.gemini/antigravity-ide/brain/d5ca2a07-dcd1-40f5-92f2-f44308e59fc5/.user_uploaded', img.name);
    const dest = path.join(outDir, `part2_page${img.id}.png`);
    await sharp(src).rotate(270).toFile(dest);
    const meta = await sharp(dest).metadata();
    console.log(`Rotated part2_page${img.id}.png: ${meta.width}x${meta.height}`);
  }
}

rotateAll().catch(console.error);
