import { createWorker } from 'tesseract.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const cacheFile = path.resolve(__dirname, 'pblock_ocr_cache.json');
  let cache = {};
  if (fs.existsSync(cacheFile)) {
    try {
      cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    } catch (_) {}
  }

  const numPages = 51;
  const pagesToProcess = [];
  for (let p = 1; p <= numPages; p++) {
    const pad = String(p).padStart(3, '0');
    if (!cache[pad]) {
      pagesToProcess.push(p);
    }
  }

  console.log(`Starting OCR of ${pagesToProcess.length} remaining pages with 4 workers...`);
  const t0 = Date.now();

  const numWorkers = 4;
  const workers = await Promise.all(
    Array.from({ length: numWorkers }, () => createWorker('eng'))
  );

  let nextIdx = 0;
  let completed = numPages - pagesToProcess.length;

  async function processNext(worker) {
    while (nextIdx < pagesToProcess.length) {
      const p = pagesToProcess[nextIdx++];
      const pad = String(p).padStart(3, '0');
      const imgPath = path.resolve(__dirname, `jee_pblock_pages/page_${pad}.png`);
      if (fs.existsSync(imgPath)) {
        try {
          const ret = await worker.recognize(imgPath);
          cache[pad] = ret.data.text;
        } catch (e) {
          console.error(`Error on page ${p}:`, e.message);
        }
      }
      completed++;
      if (completed % 10 === 0 || completed === numPages) {
        console.log(`OCR processed ${completed}/${numPages} (${Math.round((Date.now() - t0)/1000)}s)`);
        fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
      }
    }
  }

  await Promise.all(workers.map(w => processNext(w)));
  for (const w of workers) {
    await w.terminate();
  }
  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
  console.log(`OCR Complete for all ${numPages} pages!`);
}

main().catch(console.error);
