import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testCellOCR2() {
  const p212Path = path.resolve(__dirname, 'current_electricity_pages/page_212.png');
  const img = await loadImage(p212Path);
  const worker = await createWorker('eng');

  const minX = 256;
  const maxX = 921;
  const colW = (maxX - minX) / 6;

  // Real row height is ~20 px
  // Let's test rows 0, 1, 2, 3
  const topY = 70;
  const rowH = 20.15;

  console.log(`Cell dimensions: ${colW.toFixed(1)} x ${rowH.toFixed(1)}`);

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 6; c++) {
      const qExpected = 1 + r * 6 + c;
      const x = Math.round(minX + c * colW);
      const y = Math.round(topY + r * rowH);
      const w = Math.round(colW);
      const h = Math.round(rowH);

      const canvas = createCanvas(w * 3, h * 3);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, x, y, w, h, 0, 0, w * 3, h * 3);

      const { data: { text } } = await worker.recognize(canvas.toBuffer('image/png'));
      console.log(`Q${qExpected} [r=${r}, c=${c}]: "${text.trim()}"`);
    }
  }

  await worker.terminate();
}

testCellOCR2().catch(console.error);
