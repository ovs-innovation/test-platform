import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import pkg from 'tesseract.js';
const { createWorker } = pkg;

const qPositions = JSON.parse(fs.readFileSync('./backend/scripts/nitrogen_q_positions.json', 'utf8'));
const sliceDir = './backend/scripts/nitrogen_q_slices';
if (!fs.existsSync(sliceDir)) {
  fs.mkdirSync(sliceDir, { recursive: true });
}

async function cropSlice(pageNum, yTop, yBottom, outName) {
  const pagePath = `./backend/scripts/nitrogen_pages/page_${pageNum}.png`;
  const img = await loadImage(pagePath);
  const scale = 2.0;

  const top = Math.max(0, Math.round(yTop * scale));
  const bottom = Math.min(img.height, Math.round(yBottom * scale));
  const h = bottom - top;
  const left = Math.round(25 * scale);
  const w = Math.round(485 * scale);

  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, left, top, w, h, 0, 0, w, h);

  const outFile = path.join(sliceDir, outName);
  fs.writeFileSync(outFile, canvas.toBuffer('image/png'));
  return outFile;
}

async function main() {
  const worker = await createWorker('eng');
  const results = {};

  console.log(`Processing ${qPositions.length} questions...`);

  for (let i = 0; i < qPositions.length; i++) {
    const cur = qPositions[i];
    const next = qPositions[i + 1];

    let fullOcr = '';
    const sliceFiles = [];

    if (!next || next.page === cur.page) {
      const yBottom = next ? next.y - 5 : 780;
      const f = await cropSlice(cur.page, Math.max(30, cur.y - 12), yBottom, `q_${cur.qNum}.png`);
      sliceFiles.push(f);
    } else {
      const f1 = await cropSlice(cur.page, Math.max(30, cur.y - 12), 780, `q_${cur.qNum}_p1.png`);
      sliceFiles.push(f1);

      for (let p = cur.page + 1; p < next.page; p++) {
        const fp = await cropSlice(p, 60, 780, `q_${cur.qNum}_p${p}.png`);
        sliceFiles.push(fp);
      }

      if (next.y > 70) {
        const f2 = await cropSlice(next.page, 60, next.y - 5, `q_${cur.qNum}_p2.png`);
        sliceFiles.push(f2);
      }
    }

    for (const sf of sliceFiles) {
      const ocrRes = await worker.recognize(sf);
      fullOcr += '\n' + ocrRes.data.text;
    }

    results[cur.qNum] = {
      qNum: cur.qNum,
      page: cur.page,
      ocrText: fullOcr.trim()
    };

    console.log(`[Q${cur.qNum}] OCR done (${results[cur.qNum].ocrText.split('\n').length} lines)`);
  }

  await worker.terminate();
  fs.writeFileSync('./backend/scripts/nitrogen_ocr.json', JSON.stringify(results, null, 2));
  console.log('Saved nitrogen_ocr.json successfully!');
}

main().catch(console.error);

