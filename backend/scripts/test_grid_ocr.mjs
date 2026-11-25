import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testGridOCR() {
  const p212Path = path.resolve(__dirname, 'current_electricity_pages/page_212.png');
  const img = await loadImage(p212Path);
  const worker = await createWorker('eng');

  // Let's test the first 5 rows on Page 212
  // We know minX = 256, maxX = 921, minY = 50, rowH ~ 40..42
  const minX = 250;
  const maxX = 930;
  const colW = (maxX - minX) / 6;

  console.log('Testing Row-by-Row OCR on first 10 rows...');
  // Let's test varying top from 80 onwards
  const rowTop = 75;
  const rowH = 40;

  for (let r = 0; r < 8; r++) {
    const y = rowTop + r * rowH;
    const canvas = createCanvas(maxX - minX, rowH + 6);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, minX, y - 3, maxX - minX, rowH + 6, 0, 0, maxX - minX, rowH + 6);

    const { data: { text } } = await worker.recognize(canvas.toBuffer('image/png'));
    console.log(`Row ${r} (y=${y}):`, text.replace(/\n/g, '  |  ').trim());
  }

  await worker.terminate();
}

testGridOCR().catch(console.error);
