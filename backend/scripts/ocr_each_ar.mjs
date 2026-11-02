import { createWorker } from 'tesseract.js';

async function run() {
  const worker = await createWorker('eng');
  for (let i = 1; i <= 10; i++) {
    const ret = await worker.recognize(`backend/uploads/equilibrium/new_pages/q_ar_${i}.png`);
    console.log(`--- Q AR ${i} ---`);
    console.log(ret.data.text.trim());
  }
  await worker.terminate();
}

run().catch(console.error);

