import { createWorker } from 'tesseract.js';

async function testOCR() {
  console.log('Initializing Tesseract worker...');
  const worker = await createWorker('eng');
  console.log('Worker initialized, recognizing page74.png...');
  const ret = await worker.recognize('backend/uploads/equilibrium/page74.png');
  console.log('--- OCR Result Sample (first 500 chars) ---');
  console.log(ret.data.text.slice(0, 500));
  await worker.terminate();
}

testOCR().catch(console.error);

