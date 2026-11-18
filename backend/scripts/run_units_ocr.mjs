import Tesseract from 'tesseract.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'units_pages');
const outFile = path.resolve(__dirname, 'units_ocr_all.json');

async function runOcr() {
  console.log('Starting OCR across all 94 pages...');
  const results = {};
  const t0 = Date.now();

  const worker = await Tesseract.createWorker('eng');

  for (let i = 1; i <= 94; i++) {
    const pagePath = path.join(pagesDir, `page_${i}.png`);
    if (!fs.existsSync(pagePath)) {
      console.warn(`Page ${i} does not exist!`);
      continue;
    }

    const { data: { text, lines } } = await worker.recognize(pagePath);
    results[i] = {
      page: i,
      text: text,
      lines: (lines || []).map(l => ({
        text: l.text,
        bbox: l.bbox
      }))
    };

    if (i % 10 === 0 || i === 94) {
      const elapsed = Math.round((Date.now() - t0) / 1000);
      console.log(`  Processed page ${i}/94 (${elapsed}s)`);
    }
  }

  await worker.terminate();
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log(`OCR complete! Saved ${Object.keys(results).length} pages to ${outFile} in ${Math.round((Date.now() - t0) / 1000)}s`);
}

runOcr().catch(err => {
  console.error('OCR Error:', err);
  process.exit(1);
});
