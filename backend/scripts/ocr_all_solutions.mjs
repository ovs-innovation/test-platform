import fs from 'fs';
import path from 'path';
import { createWorker } from 'tesseract.js';

const SLICES_DIR = path.join('backend/scripts/solutions_q_slices');

async function main() {
  console.log('Initializing Tesseract OCR pool for Solutions...');
  const poolSize = 4;
  const workers = [];
  for (let i = 0; i < poolSize; i++) {
    const w = await createWorker('eng');
    workers.push(w);
  }

  const results = {};
  const queue = [];
  for (let q = 1; q <= 70; q++) {
    queue.push(q);
  }

  async function processWorker(worker, workerId) {
    while (queue.length > 0) {
      const q = queue.shift();
      const imgPath = path.join(SLICES_DIR, `q_${q}.png`);
      try {
        const { data: { text } } = await worker.recognize(imgPath);
        results[q] = text;
        console.log(`[Worker ${workerId}] Q${q} done.`);
      } catch (err) {
        console.error(`Error on Q${q}:`, err);
        results[q] = '';
      }
    }
  }

  await Promise.all(workers.map((w, idx) => processWorker(w, idx)));

  for (const w of workers) {
    await w.terminate();
  }

  fs.writeFileSync('backend/scripts/solutions_ocr.json', JSON.stringify(results, null, 2));
  console.log('OCR completed for all 70 questions. Saved to backend/scripts/solutions_ocr.json');
}

main().catch(console.error);

