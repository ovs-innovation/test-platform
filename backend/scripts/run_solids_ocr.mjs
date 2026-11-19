import { createWorker } from 'tesseract.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runOCR() {
  const pagesDir = path.join(__dirname, 'solids_pages');
  const outFile = path.join(__dirname, 'solids_ocr_all.json');

  console.log('Starting OCR across all 80 pages of Mechanical Properties of Solids...');
  const worker = await createWorker('eng');
  const results = {};
  const startTime = Date.now();

  for (let p = 1; p <= 80; p++) {
    const imgPath = path.join(pagesDir, `page_${p}.png`);
    if (!fs.existsSync(imgPath)) {
      console.warn(`Page ${imgPath} does not exist, skipping.`);
      continue;
    }
    const ret = await worker.recognize(imgPath);
    results[p] = {
      page: p,
      text: ret.data.text
    };

    if (p % 10 === 0 || p === 80) {
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      console.log(`  Processed page ${p}/80 (${elapsed}s)`);
    }
  }

  await worker.terminate();
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log(`OCR complete! Saved 80 pages to ${outFile} in ${Math.round((Date.now() - startTime) / 1000)}s`);
}

runOCR().catch(err => {
  console.error('OCR failed:', err);
  process.exit(1);
});
