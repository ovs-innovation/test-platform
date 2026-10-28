import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userUploadedDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/39e11379-7ffb-459f-b4f0-6d978d3d1c61/.user_uploaded/';
const tempDir = './scripts/electro_pot_batch2_temp/';

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const files = [
  'media_1793104265224.png',
  'media_1793104311784.png',
  'media_1793104328845.png',
  'media_1793104344721.png',
  'media_1793104360856.png'
];

async function rotateAndInspect() {
  for (let i = 0; i < files.length; i++) {
    const inputPath = path.join(userUploadedDir, files[i]);
    const rot270Path = path.join(tempDir, `rot270_${i + 1}.png`);
    
    await sharp(inputPath).rotate(270).toFile(rot270Path);
    const meta = await sharp(rot270Path).metadata();
    console.log(`Image ${i + 1}: ${meta.width} x ${meta.height}`);
  }
}

rotateAndInspect().catch(console.error);
