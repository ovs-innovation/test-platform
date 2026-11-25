import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testColumnCrops() {
  const img251 = await loadImage(path.resolve(__dirname, 'ray_jee_pages/page_251.png'));
  const width = img251.width;
  const height = img251.height;

  // Let's determine column boundaries
  // Column width is roughly (1150 - 50) / 6 = 183 px per column
  const cols = [
    { name: 'col0', x: 50, w: 180 },
    { name: 'col1', x: 230, w: 180 },
    { name: 'col2', x: 410, w: 180 },
    { name: 'col3', x: 590, w: 180 },
    { name: 'col4', x: 770, w: 180 },
    { name: 'col5', x: 950, w: 200 }
  ];

  const worker = await createWorker('eng');

  for (let cIdx = 0; cIdx < cols.length; cIdx++) {
    const col = cols[cIdx];
    // Start below 'Answer key' header, around y=100 down to y=1520
    const canvas = createCanvas(col.w * 2, (1520 - 100) * 2);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img251, col.x, 100, col.w, 1420, 0, 0, col.w * 2, 1420 * 2);

    const buf = canvas.toBuffer('image/png');
    const outImg = path.resolve(__dirname, `ray_col_${cIdx}.png`);
    fs.writeFileSync(outImg, buf);

    const res = await worker.recognize(buf);
    const lines = res.data.text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    console.log(`\n=== COLUMN ${cIdx} (${lines.length} lines) ===`);
    console.log(lines.slice(0, 10).join(' | '));
  }

  await worker.terminate();
}

testColumnCrops().catch(console.error);
