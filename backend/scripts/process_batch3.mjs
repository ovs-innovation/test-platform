import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = 'C:/Users/rs004/.gemini/antigravity-ide/brain/39e11379-7ffb-459f-b4f0-6d978d3d1c61/.user_uploaded/media_1793095259106.png';
const outDir = 'scripts/thermodynamics_batch3';
fs.mkdirSync(outDir, { recursive: true });

async function rotate() {
  const meta = await sharp(inputPath).metadata();
  console.log('Original dimensions:', meta.width, meta.height);
  
  await sharp(inputPath)
    .rotate(270)
    .toFile(path.join(outDir, 'page_rot270.png'));
  
  const rotMeta = await sharp(path.join(outDir, 'page_rot270.png')).metadata();
  console.log('Rotated dimensions:', rotMeta.width, rotMeta.height);
}

rotate().catch(console.error);
