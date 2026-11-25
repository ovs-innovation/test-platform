import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractExactKeys() {
  const p79 = path.resolve(__dirname, 'basic_chem_pages/page_079.png');
  const worker = await createWorker('eng');

  // We know:
  // table left: 240, width: 700
  // table top: 80, height: 890
  // There are 37 rows.
  // Each row is approx height = 890 / 37 = 24.05 px
  // 6 columns across width 700: each col approx 700 / 6 = 116.67 px
  // Let's crop each cell individually, upscale 3x, and recognize!
  
  const colWidth = 700 / 6;
  const rowHeight = 890 / 37;

  const results = {};

  for (let r = 0; r < 37; r++) {
    const qStart = r * 6 + 1;
    const numCols = (r === 36) ? 5 : 6;
    const top = Math.round(80 + r * rowHeight) - 2;
    const h = Math.round(rowHeight) + 4;

    for (let c = 0; c < numCols; c++) {
      const qNum = qStart + c;
      const left = Math.round(240 + c * colWidth) - 3;
      const w = Math.round(colWidth) + 6;

      const cellBuf = await sharp(p79)
        .extract({ left, top, width: w, height: h })
        .resize(w * 3, h * 3, { kernel: 'lanczos3' })
        .sharpen()
        .toBuffer();

      const { data: { text } } = await worker.recognize(cellBuf);
      const clean = text.trim().replace(/\n/g, ' ');
      results[qNum] = clean;
    }
    process.stdout.write(`Parsed row ${r + 1}/37 (up to Q${qStart + numCols - 1})...\r`);
  }
  await worker.terminate();

  console.log('\nFinished all 221 cells!');
  fs.writeFileSync(path.resolve(__dirname, 'p79_cells_raw.json'), JSON.stringify(results, null, 2));
}

extractExactKeys().catch(console.error);
