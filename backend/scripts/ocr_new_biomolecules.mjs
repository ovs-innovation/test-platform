import { createWorker } from 'tesseract.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runOCR() {
  const worker = await createWorker('eng');

  // Group 1: 216 & 217
  let t1 = '';
  for (const f of ['p216_c1.png', 'p216_c2.png', 'p217_c1.png', 'p217_c2.png']) {
    const res = await worker.recognize(path.join(__dirname, f));
    t1 += `\n\n=== ${f} ===\n` + res.data.text;
  }
  fs.writeFileSync(path.join(__dirname, 'new_p216_p217_ocr.txt'), t1);
  console.log('p216 & p217 OCR done');

  // Group 2: 218 & 219
  let t2 = '';
  for (const f of ['p218_c1.png', 'p218_c2.png', 'p219_c1.png', 'p219_c2.png']) {
    const res = await worker.recognize(path.join(__dirname, f));
    t2 += `\n\n=== ${f} ===\n` + res.data.text;
  }
  fs.writeFileSync(path.join(__dirname, 'new_p218_p219_ocr.txt'), t2);
  console.log('p218 & p219 OCR done');

  // Group 3: 220 & 221
  let t3 = '';
  for (const f of ['p220_c1.png', 'p220_c2.png', 'p221_c1.png', 'p221_c2.png']) {
    const res = await worker.recognize(path.join(__dirname, f));
    t3 += `\n\n=== ${f} ===\n` + res.data.text;
  }
  fs.writeFileSync(path.join(__dirname, 'new_p220_p221_ocr.txt'), t3);
  console.log('p220 & p221 OCR done');

  // Group 4: 224 (AR)
  let t4 = '';
  for (const f of ['p224_c1.png', 'p224_c2.png']) {
    const res = await worker.recognize(path.join(__dirname, f));
    t4 += `\n\n=== ${f} ===\n` + res.data.text;
  }
  fs.writeFileSync(path.join(__dirname, 'new_p224_ar_ocr.txt'), t4);
  console.log('p224 AR OCR done');

  await worker.terminate();
}

runOCR().catch(console.error);

