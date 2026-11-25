import { createWorker } from 'tesseract.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const worker = await createWorker('eng');
  const imgPath = path.resolve(__dirname, 'jee_gravitation_pages/page_145.png');
  const ret = await worker.recognize(imgPath);
  console.log('=== PAGE 145 OCR RESULT ===');
  console.log(ret.data.text);
  await worker.terminate();

  fs.writeFileSync(path.resolve(__dirname, 'gravitation_p145_ocr.txt'), ret.data.text);
}

main().catch(console.error);
