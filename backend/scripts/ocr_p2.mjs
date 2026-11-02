import { createWorker } from 'tesseract.js';

async function run() {
  const worker = await createWorker('eng');

  console.log('=== PAGE 2 LEFT (Q11-Q17) ===');
  const retL = await worker.recognize('backend/uploads/equilibrium/new_pages/crop_p2_left.png');
  console.log(retL.data.text);

  console.log('=== PAGE 2 RIGHT (Q18-Q25) ===');
  const retR = await worker.recognize('backend/uploads/equilibrium/new_pages/crop_p2_right.png');
  console.log(retR.data.text);

  await worker.terminate();
}

run().catch(console.error);

