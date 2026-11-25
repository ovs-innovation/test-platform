import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function checkSpecificKeys() {
  const img203 = await loadImage(path.resolve(__dirname, 'mag_jee_pages/page_203.png'));
  const img204 = await loadImage(path.resolve(__dirname, 'mag_jee_pages/page_204.png'));
  const worker = await createWorker('eng');

  // Let's inspect rows 7, 8, 27, 28, 30, 38, and page 204
  const inspectList = [
    { name: 'row7', page: 203, y: 100 + 6 * 33.95 - 5, h: 45 },
    { name: 'row8', page: 203, y: 100 + 7 * 33.95 - 5, h: 45 },
    { name: 'row27', page: 203, y: 100 + 26 * 33.95 - 5, h: 45 },
    { name: 'row28', page: 203, y: 100 + 27 * 33.95 - 5, h: 45 },
    { name: 'row30', page: 203, y: 100 + 29 * 33.95 - 5, h: 45 },
    { name: 'row38', page: 203, y: 100 + 37 * 33.95 - 5, h: 45 },
    { name: 'page204', page: 204, y: 50, h: 200 }
  ];

  for (const item of inspectList) {
    const srcImg = item.page === 203 ? img203 : img204;
    const canvas = createCanvas(srcImg.width, item.h);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(srcImg, 0, item.y, srcImg.width, item.h, 0, 0, srcImg.width, item.h);
    
    // Also save slice to inspect if needed
    const outSlice = path.resolve(__dirname, `slice_${item.name}.png`);
    fs.writeFileSync(outSlice, canvas.toBuffer('image/png'));

    const { data: { text } } = await worker.recognize(canvas.toBuffer('image/png'));
    console.log(`[${item.name}]:`, text.trim().replace(/\n/g, ' '));
  }

  await worker.terminate();
}

checkSpecificKeys().catch(console.error);
