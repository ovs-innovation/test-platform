import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'thermo_jee_pages');
const CACHE_FILE = path.resolve(__dirname, 'thermo_ocr_cache.json');
const LINEAR_FILE = path.resolve(__dirname, 'thermo_ocr_linear.txt');

async function runOCR() {
  console.log('=== MULTI-WORKER OCR FOR THERMODYNAMICS (245 QUESTIONS) ===');
  const files = fs.readdirSync(PAGES_DIR)
    .filter(f => f.startsWith('page_') && f.endsWith('.png') && f !== 'page_099.png')
    .sort();
  console.log(`Found ${files.length} content pages (pages 1 to 98).`);

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
    if (completed % 10 === 0 || completed === files.length) {
      console.log(`Progress: ${completed} / ${files.length} pages OCR-ed...`);
    }
  }

  const queue = [...files];
  async function workerLoop(workerIdx) {
    while (queue.length > 0) {
      const file = queue.shift();
      if (!file) break;
      await processPage(file, workerIdx);
    }
  }

  const workerPromises = [];
  for (let i = 0; i < numWorkers; i++) {
    workerPromises.push(workerLoop(i));
  }

  await Promise.all(workerPromises);

  for (const worker of workers) {
    await worker.terminate();
  }

  console.log('Writing OCR cache...');
  fs.writeFileSync(CACHE_FILE, JSON.stringify(results, null, 2), 'utf8');

  let linearText = '';
  for (let p = 1; p <= 98; p++) {
    linearText += `\n\n=== PAGE ${p} ===\n\n` + (results[p] || '');
  }
  fs.writeFileSync(LINEAR_FILE, linearText, 'utf8');
  console.log('OCR Complete! Total chars in linear text:', linearText.length);
}

runOCR().catch(err => {
  console.error('OCR Error:', err);
  process.exit(1);
});
