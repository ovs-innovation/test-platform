import { createWorker } from 'tesseract.js';
import fs from 'fs';
import path from 'path';

const pagesDir = path.resolve('backend/scripts/electrochem_pages');
const outFile = path.resolve('backend/scripts/electrochem_tsv_cache.json');

const NUM_WORKERS = 6;
const TOTAL_PAGES = 96; // page 97 is answer key

async function main() {
  console.log(`Starting Tesseract OCR worker pool (${NUM_WORKERS} workers) across ${TOTAL_PAGES} pages...`);
  const startTime = Date.now();

  const workers = [];
  for (let i = 0; i < NUM_WORKERS; i++) {
    workers.push(await createWorker('eng'));
  }

  let cache = {};
  if (fs.existsSync(outFile)) {
    try {
      cache = JSON.parse(fs.readFileSync(outFile, 'utf8'));
      console.log(`Loaded existing cache with ${Object.keys(cache).length} pages.`);
    } catch (_) {}
  }

  const tasks = [];
  for (let p = 1; p <= TOTAL_PAGES; p++) {
    if (!cache[p]) {
      tasks.push(p);
    }
  }

  console.log(`Pages remaining to OCR: ${tasks.length}`);

  let completed = 0;
  async function processPage(pageNum, worker) {
    const pageFile = path.join(pagesDir, `page_${String(pageNum).padStart(3, '0')}.png`);
    if (!fs.existsSync(pageFile)) {
      console.error(`Page file not found: ${pageFile}`);
      return;
    }

    const ret = await worker.recognize(pageFile, {}, { tsv: true });
    
    const lines = [];
    let curLineWords = [];
    let curLineBox = null;

    for (const raw of ret.data.tsv.split('\n')) {
      if (!raw.trim()) continue;
      const parts = raw.split('\t');
      const level = parseInt(parts[0]);
      const left = parseInt(parts[6]);
      const top = parseInt(parts[7]);
      const width = parseInt(parts[8]);
      const height = parseInt(parts[9]);
      const text = parts[11];

      if (level === 4) {
        if (curLineWords.length > 0 && curLineBox) {
          lines.push({ text: curLineWords.join(' '), ...curLineBox });
          curLineWords = [];
        }
        curLineBox = { left, top, width, height };
      } else if (level === 5 && text && text.trim()) {
        curLineWords.push(text.trim());
      }
    }
    if (curLineWords.length > 0 && curLineBox) {
      lines.push({ text: curLineWords.join(' '), ...curLineBox });
    }

    cache[pageNum] = {
      fullText: ret.data.text,
      lines: lines
    };

    completed++;
    if (completed % 10 === 0 || completed === tasks.length) {
      console.log(`[OCR Progress] ${completed}/${tasks.length} pages completed (${Math.round((Date.now() - startTime) / 1000)}s)`);
      fs.writeFileSync(outFile, JSON.stringify(cache, null, 2));
    }
  }

  const workerQueue = [...workers];
  const promises = [];

  for (const pageNum of tasks) {
    const worker = await new Promise((resolve) => {
      const check = () => {
        if (workerQueue.length > 0) resolve(workerQueue.pop());
        else setTimeout(check, 50);
      };
      check();
    });

    const p = processPage(pageNum, worker).finally(() => {
      workerQueue.push(worker);
    });
    promises.push(p);
  }

  await Promise.all(promises);

  for (const w of workers) {
    await w.terminate();
  }

  fs.writeFileSync(outFile, JSON.stringify(cache, null, 2));
  console.log(`All OCR completed in ${Math.round((Date.now() - startTime) / 1000)}s. Saved to ${outFile}`);
}

main().catch(console.error);
