import fs from 'fs';
import { createWorker } from 'tesseract.js';

const outDir = 'backend/scripts/trig_ocr';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log('Initializing Tesseract workers...');
  const numWorkers = 4;
  const workers = [];
  for (let i = 0; i < numWorkers; i++) {
    const w = await createWorker('eng');
    workers.push(w);
  }
  console.log(`${numWorkers} workers ready.`);

  const pages = [];
  for (let p = 1; p <= 53; p++) {
    if (!fs.existsSync(`${outDir}/page_${p}.txt`)) {
      pages.push(p);
    }
  }
  console.log(`${pages.length} pages remaining to OCR.`);

  let completed = 0;
  async function processPage(pageNum, worker) {
    const imagePath = `backend/scripts/trig_pages/page_${pageNum}.png`;
    const ret = await worker.recognize(imagePath);
    fs.writeFileSync(`${outDir}/page_${pageNum}.txt`, ret.data.text);
    completed++;
    if (completed % 5 === 0 || completed === pages.length) {
      console.log(`Progress: ${completed}/${pages.length} pages done.`);
    }
  }

  // Work pool
  let idx = 0;
  async function workerLoop(worker) {
    while (idx < pages.length) {
      const pageNum = pages[idx++];
      await processPage(pageNum, worker);
    }
  }

  await Promise.all(workers.map(w => workerLoop(w)));
  for (const w of workers) {
    await w.terminate();
  }
  console.log('All 53 pages OCR completed!');
}

run().catch(console.error);

