import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'periodicity_pages');
const CACHE_FILE = path.resolve(__dirname, 'periodicity_ocr_cache.json');
const LINEAR_FILE = path.resolve(__dirname, 'periodicity_ocr_linear.txt');

async function runOCR() {
  console.log('=== MULTI-WORKER OCR FOR PERIODICITY (193 QUESTIONS) ===');
  const files = fs.readdirSync(PAGES_DIR)
    .filter(f => f.startsWith('page_') && f.endsWith('.png') && f !== 'page_059.png')
    .sort();
  console.log(`Found ${files.length} content pages (pages 1 to 58).`);

  const numWorkers = 4;
  console.log(`Initializing ${numWorkers} Tesseract workers...`);
  const workers = [];
  for (let i = 0; i < numWorkers; i++) {
    const worker = await createWorker('eng');
    workers.push(worker);
  }

  const results = {};
  let completed = 0;

  async function processPage(file, workerIdx) {
    const worker = workers[workerIdx];
    const pageNum = parseInt(file.replace('page_', '').replace('.png', ''), 10);
    const imgPath = path.join(PAGES_DIR, file);

    const ret = await worker.recognize(imgPath);
    results[pageNum] = ret.data.text;
    completed++;
    if (completed % 5 === 0 || completed === files.length) {
      console.log(`Progress: ${completed} / ${files.length} pages OCR-ed...`);
    }
  }

  const queue = [...files];
  const running = [];

  for (let w = 0; w < numWorkers; w++) {
    const workerPromise = (async () => {
      while (queue.length > 0) {
        const nextFile = queue.shift();
        if (nextFile) {
          await processPage(nextFile, w);
        }
      }
    })();
    running.push(workerPromise);
  }

  await Promise.all(running);

  for (const worker of workers) {
    await worker.terminate();
  }

  fs.writeFileSync(CACHE_FILE, JSON.stringify(results, null, 2));
  console.log(`Saved OCR cache to ${CACHE_FILE}`);

  let linearText = '';
  for (let p = 1; p <= 58; p++) {
    linearText += `\n--- PAGE ${p} ---\n` + (results[p] || '');
  }
  fs.writeFileSync(LINEAR_FILE, linearText);
  console.log(`Saved linear text to ${LINEAR_FILE}`);
  console.log('=== OCR COMPLETED SUCCESSFULLY ===');
}

runOCR().catch(err => {
  console.error('OCR Error:', err);
  process.exit(1);
});
