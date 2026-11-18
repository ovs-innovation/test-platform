import { createWorker } from 'tesseract.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runOCR() {
  const pagesDir = path.join(__dirname, 'ktg_pages');
  const outFile = path.join(__dirname, 'ktg_ocr_all.json');

  console.log('Starting parallel OCR across all 90 question pages of Kinetic Theory of Gases...');
  const startTime = Date.now();

  const numWorkers = 3;
  const workers = await Promise.all(
    Array.from({ length: numWorkers }, () => createWorker('eng'))
  );

  const results = {};
  const totalPages = 90;
  let nextPageIndex = 1;
  let completed = 0;

  async function processWorker(worker, workerId) {
    while (nextPageIndex <= totalPages) {
      const p = nextPageIndex++;
      const imgPath = path.join(pagesDir, `page_${p}.png`);
      if (!fs.existsSync(imgPath)) continue;

      const ret = await worker.recognize(imgPath);
      results[p] = {
        page: p,
        text: ret.data.text
      };
      completed++;
      if (completed % 10 === 0 || completed === totalPages) {
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        console.log(`  Completed ${completed}/${totalPages} pages (${elapsed}s)`);
      }
    }
  }

  await Promise.all(workers.map((w, idx) => processWorker(w, idx)));
  await Promise.all(workers.map(w => w.terminate()));

  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log(`All OCR done! Saved ${Object.keys(results).length} pages to ${outFile} in ${Math.round((Date.now() - startTime) / 1000)}s!`);
}

runOCR().catch(err => {
  console.error('OCR failed:', err);
  process.exit(1);
});
