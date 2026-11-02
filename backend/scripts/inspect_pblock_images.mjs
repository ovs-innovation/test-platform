import sharp from 'sharp';
import fs from 'fs';

const inputDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/17e84f12-f0f0-467e-9e84-3e64c8f2e457/.user_uploaded/';
const outputDir = './scripts/pblock_pages/';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = [
  'media_1793268133856.png',
  'media_1793268163903.png',
  'media_1793268190250.png',
  'media_1793268206649.png',
  'media_1793268220317.png'
];

async function inspect() {
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const meta = await sharp(inputDir + f).metadata();
    console.log(`File ${i + 1}: ${f} | Dimensions: ${meta.width}x${meta.height}`);
  }
}

inspect().catch(console.error);
