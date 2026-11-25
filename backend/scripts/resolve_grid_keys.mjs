import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function resolveGrid() {
  const img203 = await loadImage(path.resolve(__dirname, 'mag_jee_pages/page_203.png'));
  const worker = await createWorker('eng');
  await worker.setParameters({
    tessedit_pageseg_mode: '6'
  });

  // Page 203 height is 1584. The title "Answer key" is at the top (~y=50..120).
  // 43 rows span from roughly y=120 to y=1560.
  // Let's find the exact y bounds for each row by slicing small vertical windows.
  const yStart = 100;
  const yEnd = 1560;
  const rowHeight = (yEnd - yStart) / 43;
  console.log(`Row height approx: ${rowHeight}`);

  const rowsData = [];
  for (let r = 0; r < 43; r++) {
    const y = Math.round(yStart + r * rowHeight);
    const h = Math.round(rowHeight + 4);
    const canvas = createCanvas(img203.width, h);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img203, 0, y, img203.width, h, 0, 0, img203.width, h);
    const buf = canvas.toBuffer('image/png');
    const { data: { text } } = await worker.recognize(buf);
    const qStart = r * 6 + 1;
    const qEnd = qStart + 5;
    rowsData.push({ row: r + 1, qStart, qEnd, y, text: text.trim().replace(/\n/g, ' ') });
  }

  await worker.terminate();

  for (const rd of rowsData) {
    console.log(`Row ${rd.row} (Q${rd.qStart}..Q${rd.qEnd}): ${rd.text}`);
  }

  fs.writeFileSync(path.resolve(__dirname, 'mag_key_rows_parsed.json'), JSON.stringify(rowsData, null, 2));
}

resolveGrid().catch(console.error);
