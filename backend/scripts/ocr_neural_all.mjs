import { createWorker } from 'tesseract.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runOCR() {
  const worker = await createWorker('eng');

  // Group 1: Page 1 (Q1 to Q8)
  console.log('Running OCR on Page 1...');
  let t1 = '';
  for (const f of ['neural_p1_c1.png', 'neural_p1_c2.png']) {
    const res = await worker.recognize(path.join(__dirname, f));
    t1 += `\n\n=== ${f} ===\n` + res.data.text;
  }
  fs.writeFileSync(path.join(__dirname, 'neural_p1_ocr.txt'), t1);

  // Group 2: Pages 300 & 301 (Q9 to Q26)
  console.log('Running OCR on Pages 300 & 301...');
  let t2 = '';
  for (const f of ['neural_p300_c1.png', 'neural_p300_c2.png', 'neural_p301_c1.png', 'neural_p301_c2.png']) {
    const res = await worker.recognize(path.join(__dirname, f));
    t2 += `\n\n=== ${f} ===\n` + res.data.text;
  }
  fs.writeFileSync(path.join(__dirname, 'neural_p300_p301_ocr.txt'), t2);

  // Group 3: Pages 302 & 303 (Q27 to Q45)
  console.log('Running OCR on Pages 302 & 303...');
  let t3 = '';
  for (const f of ['neural_p302_c1.png', 'neural_p302_c2.png', 'neural_p303_c1.png', 'neural_p303_c2.png']) {
    const res = await worker.recognize(path.join(__dirname, f));
    t3 += `\n\n=== ${f} ===\n` + res.data.text;
  }
  fs.writeFileSync(path.join(__dirname, 'neural_p302_p303_ocr.txt'), t3);

  // Group 4: Pages 308 to 311 (Q91 to Q136)
  console.log('Running OCR on Pages 308 to 311...');
  let t4 = '';
  for (const f of [
    'neural_p308_c1.png', 'neural_p308_c2.png',
    'neural_p309_c1.png', 'neural_p309_c2.png',
    'neural_p310_c1.png', 'neural_p310_c2.png',
    'neural_p311_c1.png', 'neural_p311_c2.png'
  ]) {
    const res = await worker.recognize(path.join(__dirname, f));
    t4 += `\n\n=== ${f} ===\n` + res.data.text;
  }
  fs.writeFileSync(path.join(__dirname, 'neural_p308_p311_ocr.txt'), t4);

  // Group 5: Pages 312 & 313 (Q137 to Q139 & AR 1 to AR 18)
  console.log('Running OCR on Pages 312 & 313...');
  let t5 = '';
  for (const f of ['neural_p312_c1.png', 'neural_p312_c2.png', 'neural_p313_c1.png', 'neural_p313_c2.png']) {
    const res = await worker.recognize(path.join(__dirname, f));
    t5 += `\n\n=== ${f} ===\n` + res.data.text;
  }
  fs.writeFileSync(path.join(__dirname, 'neural_p312_p313_ocr.txt'), t5);

  await worker.terminate();
  console.log('All OCR dumps completed successfully!');
}

runOCR().catch(err => {
  console.error('OCR failed:', err);
  process.exit(1);
});

