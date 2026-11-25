import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'bonding_jee_pages');
const CACHE_FILE = path.resolve(__dirname, 'bonding_ocr_cache.json');
const LINEAR_FILE = path.resolve(__dirname, 'bonding_ocr_linear.txt');

async function runOCR() {
  console.log('=== MULTI-WORKER OCR FOR CHEMICAL BONDING ===');
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
    const pageNum = parseInt(file.replace(/[^0-9]/g, ''), 10);
    const filePath = path.join(PAGES_DIR, file);
    try {
      const { data: { text } } = await workers[workerIdx].recognize(filePath);
      results[pageNum] = text;
      completed++;
      if (completed % 10 === 0 || completed === files.length) {
        console.log(`OCR Progress: ${completed}/${files.length} pages completed (${Math.round(completed / files.length * 100)}%)`);
      }
    } catch (err) {
      console.error(`Error on page ${pageNum}:`, err.message);
      results[pageNum] = '';
    }
  }

  // Pool queue
  const queue = [...files];
  const workerPromises = workers.map(async (_, idx) => {
    while (queue.length > 0) {
      const nextFile = queue.shift();
      if (!nextFile) break;
      await processPage(nextFile, idx);
    }
  });

  await Promise.all(workerPromises);

  for (const w of workers) {
    await w.terminate();
  }

  fs.writeFileSync(CACHE_FILE, JSON.stringify(results, null, 2));

  // Write linear text file
  const sortedPages = Object.keys(results).map(Number).sort((a, b) => a - b);
  let linearText = '';
  for (const p of sortedPages) {
    linearText += `\n\n=== PAGE ${p} ===\n\n` + results[p];
  }
  fs.writeFileSync(LINEAR_FILE, linearText);

  console.log(`OCR completed successfully! Output saved to ${CACHE_FILE} and ${LINEAR_FILE}`);
}

runOCR().catch(console.error);
