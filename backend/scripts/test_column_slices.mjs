import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testColumns() {
  const p212Path = path.resolve(__dirname, 'current_electricity_pages/page_212.png');
  const img = await loadImage(p212Path);
  const worker = await createWorker('eng');

  const colW = (1180 - 50) / 6;
  console.log('Testing column slices with colW =', colW);

  for (let c = 0; c < 6; c++) {
    const left = Math.round(50 + c * colW);
    const width = Math.round(colW);
    const height = 1480;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, left, 60, width, height, 0, 0, width, height);

    const { data: { text } } = await worker.recognize(canvas.toBuffer('image/png'));
    console.log(`\n--- COLUMN ${c + 1} (left: ${left}) ---`);
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    console.log(lines.slice(0, 15).join(' | '));
  }

  await worker.terminate();
}

testColumns().catch(console.error);
