import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectRows() {
  const img251 = await loadImage(path.resolve(__dirname, 'ray_jee_pages/page_251.png'));
  const worker = await createWorker('eng');

  // Let's test rows 0..39
  // The header 'Answer key' is at top. Let's find exactly where row 0 starts.
  // In our previous full page OCR:
  // L1 was "Answer key"
  // L2 was "1A 2A 3.B 4.B 5C 6. A"
  // Let's test a slice of row 0:
  // y between 100 and 140
  const y0 = 100;
  const rowHeight = 35.5; // (1520 - 100) / 40 = 35.5

  console.log('Testing rows 0 to 5 on Page 251:');
  for (let r = 0; r < 6; r++) {
    const y = Math.round(y0 + r * rowHeight);
    const canvas = createCanvas(img251.width * 2, Math.round(rowHeight * 2));
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img251, 0, y, img251.width, Math.round(rowHeight), 0, 0, img251.width * 2, Math.round(rowHeight * 2));
    const buf = canvas.toBuffer('image/png');
    const res = await worker.recognize(buf);
    console.log(`Row ${r} (Q${r*6+1}..Q${r*6+6}): ${res.data.text.trim()}`);
  }

  await worker.terminate();
}

inspectRows().catch(console.error);
