import fs from 'fs';
import { createWorker } from 'tesseract.js';

const pagesDir = 'backend/scripts/perm_comb_pages';
const ocrDir = 'backend/scripts/perm_comb_ocr';
if (!fs.existsSync(ocrDir)) fs.mkdirSync(ocrDir, { recursive: true });

const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.png'));
console.log(`Found ${pageFiles.length} page images to OCR.`);

const NUM_WORKERS = 4;
const workers = await Promise.all(
  Array.from({ length: NUM_WORKERS }, async () => {
    const w = await createWorker('eng');
    return w;
  })
);

let idx = 0;
async function processPage(worker) {
  while (idx < pageFiles.length) {
    const pageIndex = idx++;
    const file = `page_${pageIndex + 1}.png`;
    const inputPath = `${pagesDir}/${file}`;
    const outputPath = `${ocrDir}/page_${pageIndex + 1}.txt`;

    if (fs.existsSync(outputPath)) {
      continue;
    }

    try {
      const ret = await worker.recognize(inputPath);
      fs.writeFileSync(outputPath, ret.data.text);
      if ((pageIndex + 1) % 5 === 0 || (pageIndex + 1) === pageFiles.length) {
        console.log(`Page ${pageIndex + 1} OCR completed.`);
      }
    } catch (err) {
      console.error(`Page ${pageIndex + 1} OCR error:`, err);
    }
  }
}

await Promise.all(workers.map(w => processPage(w)));
await Promise.all(workers.map(w => w.terminate()));
console.log('All pages OCR finished!');

