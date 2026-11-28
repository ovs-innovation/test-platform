import { createWorker } from 'tesseract.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'aldehydes_pages');
const tsvOutFile = path.resolve(__dirname, 'aldehydes_tsv_cache.json');
const wordsOutFile = path.resolve(__dirname, 'aldehydes_words_cache.json');

const NUM_WORKERS = 8;
const TOTAL_PAGES = 160;

async function main() {
  console.log(`Starting combined Tesseract OCR worker pool (${NUM_WORKERS} workers) across ${TOTAL_PAGES} pages for Aldehydes and Ketones...`);
  const startTime = Date.now();

  const workers = [];
  for (let i = 0; i < NUM_WORKERS; i++) {
    workers.push(await createWorker('eng'));
  }

  let tsvCache = {};
  let wordsCache = {};

  if (fs.existsSync(tsvOutFile)) {
    try {
      tsvCache = JSON.parse(fs.readFileSync(tsvOutFile, 'utf8'));
      console.log(`Loaded existing tsvCache with ${Object.keys(tsvCache).length} pages.`);
    } catch (_) {}
  }
  if (fs.existsSync(wordsOutFile)) {
    try {
      wordsCache = JSON.parse(fs.readFileSync(wordsOutFile, 'utf8'));
      console.log(`Loaded existing wordsCache with ${Object.keys(wordsCache).length} pages.`);
    } catch (_) {}
  }

  const tasks = [];
  for (let p = 1; p <= TOTAL_PAGES; p++) {
    if (!tsvCache[p] || !wordsCache[p]) {
      tasks.push(p);
    }
  }

  console.log(`Pages remaining to OCR: ${tasks.length}`);

  let completed = 0;
  async function processPage(pageNo, worker) {
    const pageImg = path.join(pagesDir, `page_${String(pageNo).padStart(3, '0')}.png`);
    if (!fs.existsSync(pageImg)) {
      console.warn(`Page image missing: ${pageImg}`);
      return;
    }

    const ret = await worker.recognize(pageImg, {}, {
      tsv: true,
      blocks: true
    });

    const lines = ret.data.tsv.split('\n');
    const header = lines[0].split('\t');
    const wordEntries = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split('\t');
      if (parts.length < header.length) continue;
      const text = (parts[11] || '').trim();
      const conf = parseFloat(parts[10]) || 0;
      if (!text || conf < 20) continue;
      wordEntries.push({
        text,
        conf,
        left: parseInt(parts[6]),
        top: parseInt(parts[7]),
        width: parseInt(parts[8]),
        height: parseInt(parts[9])
      });
    }

    tsvCache[pageNo] = ret.data.tsv;
    wordsCache[pageNo] = wordEntries;

    completed++;
    if (completed % 10 === 0 || completed === tasks.length) {
      console.log(`OCR Progress: ${completed}/${tasks.length} pages completed (${Math.round((Date.now() - startTime) / 1000)}s)`);
      fs.writeFileSync(tsvOutFile, JSON.stringify(tsvCache));
      fs.writeFileSync(wordsOutFile, JSON.stringify(wordsCache));
    }
  }

  const taskQueue = [...tasks];
  async function runWorker(worker, workerId) {
    while (taskQueue.length > 0) {
      const pageNo = taskQueue.shift();
      try {
        await processPage(pageNo, worker);
      } catch (err) {
        console.error(`Worker ${workerId} failed on page ${pageNo}:`, err.message);
      }
    }
  }

  await Promise.all(workers.map((w, idx) => runWorker(w, idx)));

  fs.writeFileSync(tsvOutFile, JSON.stringify(tsvCache));
  fs.writeFileSync(wordsOutFile, JSON.stringify(wordsCache));

  for (const w of workers) {
    await w.terminate();
  }

  console.log(`All ${TOTAL_PAGES} pages processed with OCR in ${Math.round((Date.now() - startTime) / 1000)}s!`);
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal OCR error:', err);
  process.exit(1);
});
