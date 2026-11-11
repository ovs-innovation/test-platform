import fs from 'fs';
import path from 'path';
import { createWorker } from 'tesseract.js';

const SLICES_DIR = './backend/scripts/pblock_q_slices';
const OUT_FILE = './backend/scripts/pblock_ocr.json';

async function ocrAll() {
  console.log('Initializing Tesseract worker for p-block...');
  const worker = await createWorker('eng');

  const results = {};
  const total = 161;

  for (let q = 1; q <= total; q++) {
    const slicePath = path.join(SLICES_DIR, `q_${q}.png`);
    if (!fs.existsSync(slicePath)) {
      console.warn(`Slice missing: ${slicePath}`);
      continue;
    }

    const { data: { text } } = await worker.recognize(slicePath);
    results[q] = text.trim();

    if (q % 20 === 0 || q === total) {
      console.log(`OCR progress: ${q} / ${total}`);
      fs.writeFileSync(OUT_FILE, JSON.stringify(results, null, 2));
    }
  }

  await worker.terminate();
  console.log(`OCR complete for all ${Object.keys(results).length} questions! Saved to ${OUT_FILE}`);
}

ocrAll().catch(err => {
  console.error(err);
  process.exit(1);
});

