import { createWorker } from 'tesseract.js';

async function run() {
  const worker = await createWorker('eng');
  const ret = await worker.recognize('backend/uploads/equilibrium/new_pages/crop_mcq_numbers.png');
  console.log('--- OCR Result ---');
  console.log(ret.data.text);
  await worker.terminate();
}

run().catch(console.error);

