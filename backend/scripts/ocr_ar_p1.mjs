import { createWorker } from 'tesseract.js';

async function run() {
  const worker = await createWorker('eng');
  const ret = await worker.recognize('backend/uploads/equilibrium/new_pages/crop_ar_p1.png');
  console.log('=== AR PAGE 1 OCR ===');
  console.log(ret.data.text);
  await worker.terminate();
}

run().catch(console.error);

