import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'dual_nature_pages');
const CACHE_FILE = path.resolve(__dirname, 'dual_nature_ocr_cache.json');
const LINEAR_FILE = path.resolve(__dirname, 'dual_nature_ocr_linear.txt');

async function runOCR() {
  console.log('=== MULTI-WORKER OCR FOR DUAL NATURE JEE ===');
  if (!fs.existsSync(PAGES_DIR)) {
    throw new Error(`Directory ${PAGES_DIR} does not exist`);
  }
  const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.png')).sort();
  console.log(`Found ${files.length} rendered pages.`);

  let results = {};
  if (fs.existsSync(CACHE_FILE)) {
    try {
      results = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
      console.log(`Loaded ${Object.keys(results).length} existing cached pages.`);
    } catch (e) {
      console.log('Cache corrupt or empty, starting fresh');
    }
  }

  const remainingFiles = files.filter(f => {
    const pageNum = parseInt(f.replace(/[^0-9]/g, ''), 10);
    return !results[pageNum] || results[pageNum].trim().length < 10;
  });

  console.log(`Remaining pages to OCR: ${remainingFiles.length}`);
  if (remainingFiles.length === 0) {
    console.log('All pages already cached!');
  } else {
    const numWorkers = 6;
    console.log(`Initializing ${numWorkers} Tesseract workers...`);
    const workers = [];
    for (let i = 0; i < numWorkers; i++) {
      const worker = await createWorker('eng');
      workers.push(worker);
    }

    let completed = files.length - remainingFiles.length;
    const total = files.length;
    const queue = [...remainingFiles];

    async function work(workerId) {
      const worker = workers[workerId];
      while (queue.length > 0) {
        const file = queue.shift();
        const pageNum = parseInt(file.replace(/[^0-9]/g, ''), 10);
        const filePath = path.join(PAGES_DIR, file);
        try {
          const ret = await worker.recognize(filePath);
          results[pageNum] = ret.data.text;
          completed++;
          if (completed % 15 === 0 || completed === total) {
            console.log(`[OCR] Completed ${completed} / ${total} pages`);
            fs.writeFileSync(CACHE_FILE, JSON.stringify(results, null, 2));
          }
        } catch (err) {
          console.error(`Error on page ${pageNum}:`, err.message);
        }
      }
    }

    await Promise.all(workers.map((_, i) => work(i)));
    for (const w of workers) {
      await w.terminate();
    }
    fs.writeFileSync(CACHE_FILE, JSON.stringify(results, null, 2));
  }

  // Create linear file
  const sortedPageNums = Object.keys(results).map(Number).sort((a, b) => a - b);
  let linearText = '';
  for (const p of sortedPageNums) {
    linearText += `\n\n--- PAGE ${p} ---\n\n` + results[p];
  }
  fs.writeFileSync(LINEAR_FILE, linearText, 'utf8');
  console.log(`Saved linear OCR dump to ${LINEAR_FILE}`);
}

runOCR().catch(console.error);
