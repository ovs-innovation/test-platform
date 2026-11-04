import { createWorker } from 'tesseract.js';
import fs from 'fs';
import path from 'path';

const PAGES_DIR = 'backend/scripts/animal_pages_part2';
const OUT_FILE = 'backend/scripts/animal_part2_ocr_dump.txt';

const allPages = [
  354, 355, 356, 357,
  358, 359, 360, 361,
  362, 363, 364, 365,
  366, 367, 368, 369,
  380, 381
];

async function runOCR() {
  console.log('Starting OCR for Animal Kingdom Part 2...');
  const worker = await createWorker('eng');
  let fullDump = '';

  for (const p of allPages) {
    fullDump += `\n==================== Page ${p} ====================\n`;
    for (const c of [1, 2]) {
      const colImg = path.join(PAGES_DIR, `page_${p}_c${c}.png`);
      if (fs.existsSync(colImg)) {
        console.log(`Processing Page ${p} Col ${c}...`);
        try {
          const ret = await worker.recognize(colImg);
          fullDump += `\n--- page_${p}_c${c}.png ---\n${ret.data.text}\n`;
        } catch (err) {
          console.error(`Error on Page ${p} Col ${c}:`, err);
        }
      }
    }
  }

  await worker.terminate();
  fs.writeFileSync(OUT_FILE, fullDump);
  console.log(`OCR complete! Dump written to ${OUT_FILE} (${fullDump.length} characters)`);
}

runOCR().catch(console.error);

