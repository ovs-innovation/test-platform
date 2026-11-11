import { createWorker } from 'tesseract.js';
import fs from 'fs';
import path from 'path';

const SLICES_DIR = path.resolve('backend/scripts/period_q_slices');

async function main() {
  const files = fs.readdirSync(SLICES_DIR).filter(f => f.startsWith('q_') && f.endsWith('.png'));
  files.sort((a, b) => {
    const na = parseInt(a.replace('q_', '').replace('.png', ''), 10);
    const nb = parseInt(b.replace('q_', '').replace('.png', ''), 10);
    return na - nb;
  });

  const worker = await createWorker('eng');
  const results = {};

  console.log(`Starting OCR on ${files.length} slices...`);
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const qNum = parseInt(f.replace('q_', '').replace('.png', ''), 10);
    const imgPath = path.join(SLICES_DIR, f);
    const ret = await worker.recognize(imgPath);
    results[qNum] = ret.data.text.trim();
    if (qNum % 10 === 0 || qNum === files.length) {
      console.log(`Finished OCR for Q${qNum}`);
    }
  }

  await worker.terminate();
  fs.writeFileSync('backend/scripts/period_ocr.json', JSON.stringify(results, null, 2));
  console.log('Saved all OCR results to backend/scripts/period_ocr.json');
}

main().catch(console.error);
