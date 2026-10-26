import sharp from 'sharp';
import path from 'path';

const userDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/d5ca2a07-dcd1-40f5-92f2-f44308e59fc5/.user_uploaded';
const outDir = './scripts/wpe_batch3_pages';

const files = [
  'media_1793017464348.png', // let's check order
  'media_1793017448589.png',
  'media_1793017430180.png',
  'media_1793017414327.png'
];

async function rotateAll() {
  for (let i = 0; i < files.length; i++) {
    const src = path.join(userDir, files[i]);
    const dest = path.join(outDir, `page_${i + 1}.png`);
    await sharp(src).rotate(270).toFile(dest);
    console.log(`Rotated ${files[i]} -> page_${i + 1}.png`);
  }
}

rotateAll();
