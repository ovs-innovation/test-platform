import { createWorker } from 'tesseract.js';

async function run() {
  const worker = await createWorker('eng');
  const ret = await worker.recognize('backend/uploads/periodic/pages/crop_p27_top.png');
  console.log(ret.data.text);
  await worker.terminate();
}

run().catch(console.error);

