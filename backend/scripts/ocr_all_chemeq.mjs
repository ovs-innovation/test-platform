import fs from 'fs';
import path from 'path';
import { createWorker } from 'tesseract.js';

const slicesDir = path.join(process.cwd(), 'backend/scripts/chemeq_q_slices');

async function ocrAll() {
  const worker = await createWorker('eng');
  const results = {};

  for (let num = 1; num <= 45; num++) {
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

  fs.writeFileSync('backend/scripts/chemeq_ocr.json', JSON.stringify(results, null, 2));
  console.log('Saved chemeq_ocr.json');
}

ocrAll().catch(console.error);

