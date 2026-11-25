import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectKeyRows() {
  const img203 = await loadImage(path.resolve(__dirname, 'mag_jee_pages/page_203.png'));
  const worker = await createWorker('eng');
  await worker.setParameters({
    tessedit_char_whitelist: '0123456789ABCD. ',
    tessedit_pageseg_mode: '6'
  });

  // Let's crop into 4 horizontal vertical quarters or bands to read with high precision
  const bands = [
    { name: 'band1', y: 0, h: 400 },
    { name: 'band2', y: 380, h: 400 },
    { name: 'band3', y: 760, h: 400 },
    { name: 'band4', y: 1140, h: 444 },
  ];

  for (const b of bands) {
    const canvas = createCanvas(img203.width, b.h);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img203, 0, b.y, img203.width, b.h, 0, 0, img203.width, b.h);
    const buf = canvas.toBuffer('image/png');
    const { data: { text } } = await worker.recognize(buf);
    console.log(`=== BAND ${b.name} (y=${b.y}..${b.y+b.h}) ===\n`, text.trim());
  }

  await worker.terminate();
}

inspectKeyRows().catch(console.error);
