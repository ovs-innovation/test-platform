import { createWorker } from 'tesseract.js';

async function run() {
  const worker = await createWorker('eng');
  const ret = await worker.recognize('backend/uploads/equilibrium/new_pages/crop_q253.png');
  console.log(ret.data.text);
  await worker.terminate();
}

run().catch(console.error);

