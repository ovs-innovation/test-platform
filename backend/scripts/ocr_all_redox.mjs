import fs from 'fs';
import path from 'path';
import { createWorker } from 'tesseract.js';

const slicesDir = path.join(process.cwd(), 'backend/scripts/redox_q_slices');

async function ocrAll() {
  const worker = await createWorker('eng');
  const results = {};

  for (let num = 1; num <= 36; num++) {
    const imgPath = path.join(slicesDir, `q_${num}.png`);
    if (!fs.existsSync(imgPath)) {
      console.warn(`File not found: ${imgPath}`);
      continue;
    }

    const { data: { text } } = await worker.recognize(imgPath);
    results[num] = text;
    console.log(`OCRed Q${num}`);
  }

  await worker.terminate();

  fs.writeFileSync('backend/scripts/redox_ocr.json', JSON.stringify(results, null, 2));
  console.log('Saved redox_ocr.json');
}

ocrAll().catch(console.error);
