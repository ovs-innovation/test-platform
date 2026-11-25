import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function dumpAllCols() {
  const worker = await createWorker('eng');

  for (const pageNum of [251, 252]) {
    const img = await loadImage(path.resolve(__dirname, `ray_jee_pages/page_${pageNum}.png`));
    const maxRows = pageNum === 251 ? 40 : 10;
    
    // We can also divide by rows directly!
    // Since page 251 has 40 rows between y=100 and y=1520:
    // row height = (1520 - 100) / 40 = 35.5 px
    const cols = [
      { x: 50, w: 180 },
      { x: 230, w: 180 },
      { x: 410, w: 180 },
      { x: 590, w: 180 },
      { x: 770, w: 180 },
      { x: 950, w: 200 }
    ];

    const colTexts = [];
    for (let c = 0; c < 6; c++) {
      const col = cols[c];
      const yStart = 95;
      const yEnd = pageNum === 251 ? 1525 : (95 + 10 * 35.5 + 20);
      const h = yEnd - yStart;

      const canvas = createCanvas(col.w * 2, h * 2);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, col.x, yStart, col.w, h, 0, 0, col.w * 2, h * 2);
      const buf = canvas.toBuffer('image/png');

      const res = await worker.recognize(buf);
      const lines = res.data.text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      colTexts.push(lines);
    }

    fs.writeFileSync(
      path.resolve(__dirname, `ray_col_lines_p${pageNum}.json`),
      JSON.stringify(colTexts, null, 2)
    );
    console.log(`Page ${pageNum} dumped. Column line counts:`, colTexts.map(c => c.length));
  }

  await worker.terminate();
}

dumpAllCols().catch(console.error);
