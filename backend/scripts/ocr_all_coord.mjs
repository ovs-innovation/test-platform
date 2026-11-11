import fs from 'fs';
import path from 'path';
import { createWorker } from 'tesseract.js';

const slicesDir = './backend/scripts/coord_q_slices';
const outFile = './backend/scripts/coord_ocr.json';

async function ocrAll() {
  const worker = await createWorker('eng');
  const results = {};

  for (let i = 1; i <= 121; i++) {
    const slicePath = path.join(slicesDir, `q_${i}.png`);
    if (!fs.existsSync(slicePath)) {
      console.warn(`Slice missing for Q${i}`);
      continue;
    }
    const ret = await worker.recognize(slicePath);
    results[i] = ret.data.text;
    if (i % 20 === 0 || i === 121) {
      console.log(`OCR progress: ${i} / 121`);
    }
  }

  await worker.terminate();
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log(`OCR complete. Saved ${Object.keys(results).length} results to ${outFile}`);
}

ocrAll().catch(err => {
  console.error(err);
  process.exit(1);
});

