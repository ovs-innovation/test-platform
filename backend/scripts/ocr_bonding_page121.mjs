import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function ocrPage121() {
  const worker = await createWorker('eng');
  const pagePath = path.resolve(__dirname, 'bonding_jee_pages/page_121.png');
  const { data: { text } } = await worker.recognize(pagePath);
  await worker.terminate();

  console.log('=== PAGE 121 OCR ===');
  console.log(text);
  fs.writeFileSync(path.resolve(__dirname, 'page121_ocr.txt'), text);
}

ocrPage121().catch(console.error);
