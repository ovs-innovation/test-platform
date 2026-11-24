import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'wave_optics_pages');
const CACHE_FILE = path.resolve(__dirname, 'wave_optics_ocr_cache.json');
const LINEAR_FILE = path.resolve(__dirname, 'wave_optics_ocr_linear.txt');

async function runOCR() {
  console.log('=== MULTI-WORKER OCR FOR WAVE OPTICS JEE ===');
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
    let lastSave = Date.now();

    const workerPromises = workers.map(async (worker) => {
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
          if (Date.now() - lastSave > 10000) {
            fs.writeFileSync(CACHE_FILE, JSON.stringify(results, null, 2));
            lastSave = Date.now();
          }
        } catch (err) {
          console.error(`Error OCR on page ${pageNum}:`, err.message);
        }
      }
      await worker.terminate();
    });

    await Promise.all(workerPromises);
    fs.writeFileSync(CACHE_FILE, JSON.stringify(results, null, 2));
    console.log('All pages OCR finished and saved to cache!');
  }

  // Generate linear text file sorted by page number
  const pageNumbers = Object.keys(results).map(Number).sort((a, b) => a - b);
  let linearText = '';
  for (const p of pageNumbers) {
    linearText += `\n\n--- PAGE ${p} ---\n\n` + results[p];
  }
  fs.writeFileSync(LINEAR_FILE, linearText);
  console.log(`Saved linear text to ${LINEAR_FILE}`);
}

runOCR().catch(console.error);
