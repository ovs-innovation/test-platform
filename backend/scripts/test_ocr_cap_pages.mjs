import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function ocrTest() {
  const worker = await createWorker('eng');
  
  console.log('--- OCR PAGE 1 ---');
  const res1 = await worker.recognize(path.resolve(__dirname, 'cap_page_1.png'));
  console.log(res1.data.text);

  console.log('--- OCR PAGE 145 (Answer Key) ---');
  const res145 = await worker.recognize(path.resolve(__dirname, 'cap_page_145.png'));
  console.log(res145.data.text);

  await worker.terminate();
}
ocrTest().catch(console.error);
