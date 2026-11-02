import fs from 'fs';
import path from 'path';
import { createWorker } from 'tesseract.js';

const colsDir = path.resolve('backend/scripts/hydrocarbons_pages/cols');
const ocrOutDir = path.resolve('backend/scripts/hydrocarbons_pages/ocr');

if (!fs.existsSync(ocrOutDir)) fs.mkdirSync(ocrOutDir, { recursive: true });

async function runOCR() {
  const worker = await createWorker('eng');
  const files = fs.readdirSync(colsDir).filter(f => f.endsWith('.png'));

  console.log(`Starting OCR on ${files.length} column images...`);

  for (const file of files) {
    const filePath = path.join(colsDir, file);
    const outTxt = path.join(ocrOutDir, file.replace('.png', '.txt'));
    if (fs.existsSync(outTxt)) {
      console.log(`Already done: ${file}`);
      continue;
    }
    console.log(`Processing: ${file}...`);
    const { data: { text } } = await worker.recognize(filePath);
    fs.writeFileSync(outTxt, text, 'utf8');
    console.log(`Saved: ${outTxt}`);
  }

  await worker.terminate();
  console.log('All OCR complete!');
}

runOCR().catch(console.error);

