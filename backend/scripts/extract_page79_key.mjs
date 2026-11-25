import { createWorker } from 'tesseract.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractKey() {
  const worker = await createWorker('eng');
  const page79Path = path.resolve(__dirname, 'basic_chem_pages/page_079.png');
  const { data: { text } } = await worker.recognize(page79Path);
  await worker.terminate();

  console.log('--- RAW PAGE 79 OCR ---');
  console.log(text);
  fs.writeFileSync(path.resolve(__dirname, 'basic_chem_page79_raw.txt'), text);
}

extractKey().catch(console.error);
