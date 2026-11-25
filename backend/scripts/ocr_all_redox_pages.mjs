import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'redox_pages');
const CACHE_FILE = path.resolve(__dirname, 'redox_ocr_cache.json');
const LINEAR_FILE = path.resolve(__dirname, 'redox_ocr_linear.txt');

async function runOCR() {
  console.log('=== MULTI-WORKER OCR FOR REDOX REACTIONS ===');
  const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.png')).sort();
  console.log(`Found ${files.length} rendered pages.`);

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
    const pad = file.replace('page_', '').replace('.png', '');
    const imgPath = path.resolve(PAGES_DIR, file);
    const worker = workers[workerIdx];
    const { data: { text } } = await worker.recognize(imgPath);
    results[pad] = text;
    completed++;
    console.log(`OCR completed ${completed}/${files.length} (Page ${pad})`);
  }

  // Work queue
  const queue = [...files];
  async function workerLoop(workerIdx) {
    while (queue.length > 0) {
      const file = queue.shift();
      if (!file) break;
      await processPage(file, workerIdx);
    }
  }

  const startTime = Date.now();
  await Promise.all(workers.map((_, idx) => workerLoop(idx)));
  for (const w of workers) {
    await w.terminate();
  }

  console.log(`\nOCR finished in ${((Date.now() - startTime) / 1000).toFixed(1)}s.`);
  fs.writeFileSync(CACHE_FILE, JSON.stringify(results, null, 2));

  let linearText = '';
  for (let i = 1; i <= files.length; i++) {
    const pad = String(i).padStart(3, '0');
    linearText += `\n\n=== PAGE ${i} ===\n\n` + (results[pad] || '');
  }
  fs.writeFileSync(LINEAR_FILE, linearText);
  console.log('Saved redox_ocr_cache.json and redox_ocr_linear.txt.');
}

runOCR().catch(err => {
  console.error('OCR Error:', err);
  process.exit(1);
});
