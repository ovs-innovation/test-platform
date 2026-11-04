import { createWorker } from 'tesseract.js';

async function testOcr() {
  const worker = await createWorker('eng');
  const ret = await worker.recognize('backend/scripts/page_77.png');
  console.log('OCR text page 77:');
  console.log(ret.data.text);
  await worker.terminate();
}

testOcr().catch(console.error);

