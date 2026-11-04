import { createWorker } from 'tesseract.js';

async function testOcr() {
  const worker = await createWorker('eng');
  const ret = await worker.recognize('backend/scripts/page_1.png');
  console.log('OCR text:');
  console.log(ret.data.text);
  await worker.terminate();
}

testOcr().catch(console.error);
