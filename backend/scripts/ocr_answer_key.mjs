import { createWorker } from 'tesseract.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const worker = await createWorker('eng');
  const imgPath = path.resolve(__dirname, 'com_pages/page_106.png');
  const ret = await worker.recognize(imgPath);
  console.log('--- Page 106 OCR ---');
  console.log(ret.data.text);
  fs.writeFileSync(path.resolve(__dirname, 'com_answer_key_raw.txt'), ret.data.text);
  await worker.terminate();
}

main().catch(console.error);
