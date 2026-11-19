import { createWorker } from 'tesseract.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const worker = await createWorker('eng');
  const cacheFile = path.resolve(__dirname, 'com_ocr_cache.json');
  let cache = {};
  if (fs.existsSync(cacheFile)) {
    try {
      cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    } catch (_) {}
  }

  console.log(`Starting OCR of 105 pages...`);
  const t0 = Date.now();

  for (let p = 1; p <= 105; p++) {
    const pad = String(p).padStart(3, '0');
    if (cache[pad]) continue;

    const imgPath = path.resolve(__dirname, `com_pages/page_${pad}.png`);
    if (!fs.existsSync(imgPath)) continue;

    const ret = await worker.recognize(imgPath);
    cache[pad] = ret.data.text;

    if (p % 10 === 0 || p === 105) {
      console.log(`OCR processed up to page ${p}/105 (${Math.round((Date.now() - t0)/1000)}s)`);
      fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
    }
  }

  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
  await worker.terminate();
  console.log(`OCR completed for all pages in ${Math.round((Date.now() - t0)/1000)}s!`);
}

main().catch(console.error);
