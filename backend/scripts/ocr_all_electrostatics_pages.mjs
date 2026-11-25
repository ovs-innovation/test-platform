import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'electrostatics_pages');
const CACHE_FILE = path.resolve(__dirname, 'electrostatics_ocr_cache.json');
const LINEAR_FILE = path.resolve(__dirname, 'electrostatics_ocr_linear.txt');

async function runOCR() {
  console.log('=== MULTI-WORKER OCR FOR ELECTROSTATICS JEE ===');
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
    return;
  }

  const numWorkers = 4;
  console.log(`Initializing ${numWorkers} Tesseract workers...`);
  const workers = [];
  for (let i = 0; i < numWorkers; i++) {
    const worker = await createWorker('eng');
    workers.push(worker);
  }

  let completed = files.length - remainingFiles.length;
  const total = files.length;

  const queue = [...remainingFiles];
  let lastSave = Date.now();

  const workerPromises = workers.map(async (worker, workerIdx) => {
    while (queue.length > 0) {
      const nextFile = queue.shift();
      if (!nextFile) break;

      const pageNum = parseInt(nextFile.replace(/[^0-9]/g, ''), 10);
      const filePath = path.join(PAGES_DIR, nextFile);

      try {
        const { data: { text } } = await worker.recognize(filePath);
        results[pageNum] = text;
        completed++;
        if (completed % 15 === 0 || completed === total) {
          console.log(`OCR Progress: ${completed}/${total} pages (${Math.round(completed / total * 100)}%)`);
        }
      } catch (err) {
        console.error(`Error on page ${pageNum}:`, err.message);
        results[pageNum] = '';
      }

      if (Date.now() - lastSave > 15000) {
        fs.writeFileSync(CACHE_FILE, JSON.stringify(results, null, 2));
        lastSave = Date.now();
      }
    }
  });

  await Promise.all(workerPromises);

  for (const worker of workers) {
    await worker.terminate();
  }

  fs.writeFileSync(CACHE_FILE, JSON.stringify(results, null, 2));
  console.log('All pages cached to', CACHE_FILE);

  const linearLines = [];
  for (let p = 1; p <= total; p++) {
    linearLines.push(`=== PAGE ${p} ===\n` + (results[p] || ''));
  }
  fs.writeFileSync(LINEAR_FILE, linearLines.join('\n\n'));
  console.log('Linear text saved to', LINEAR_FILE);
}

runOCR().catch(console.error);
