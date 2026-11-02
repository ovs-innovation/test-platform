import { createWorker } from 'tesseract.js';

async function run() {
  const worker = await createWorker('eng');

  console.log('=== PAGE 23 ===');
  const ret23 = await worker.recognize('backend/uploads/periodic/pages/page23.png');
  console.log(ret23.data.text);

  console.log('=== PAGE 24 ===');
  const ret24 = await worker.recognize('backend/uploads/periodic/pages/page24.png');
  console.log(ret24.data.text);

  console.log('=== PAGE 25 (top half) ===');
  const ret25 = await worker.recognize('backend/uploads/periodic/pages/page25.png');
  console.log(ret25.data.text.slice(0, 1500));

  await worker.terminate();
}

run().catch(console.error);

