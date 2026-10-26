import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const files = [
  'media_1793016606802.png',
  'media_1793016615404.png',
  'media_1793016624098.png',
  'media_1793016633806.png',
  'media_1793016648456.png'
];

const tempDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/d5ca2a07-dcd1-40f5-92f2-f44308e59fc5/.tempmediaStorage';
const outDir = './scripts/wpe_batch3_pages';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function rotatePages() {
  for (let i = 0; i < files.length; i++) {
    const src = path.join(tempDir, files[i]);
    if (fs.existsSync(src)) {
      const meta = await sharp(src).metadata();
      console.log(`File ${files[i]}: ${meta.width}x${meta.height}`);
      await sharp(src).rotate(270).toFile(path.join(outDir, `page_${i+1}.png`));
      console.log(`Saved upright page_${i+1}.png`);
    } else {
      console.log(`Missing: ${src}`);
    }
  }
}
rotatePages();
