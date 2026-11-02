import { createWorker } from 'tesseract.js';

async function run() {
  const worker = await createWorker('eng');

  console.log('=== PAGE 34 LEFT (Q3-Q9) ===');
  const retL = await worker.recognize('backend/uploads/periodic/pages/crop_p34_left.png');
  console.log(retL.data.text);

  console.log('=== PAGE 34 RIGHT (Q10-Q16) ===');
  const retR = await worker.recognize('backend/uploads/periodic/pages/crop_p34_right.png');
  console.log(retR.data.text);

  await worker.terminate();
}

run().catch(console.error);

