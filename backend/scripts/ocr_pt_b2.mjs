import { createWorker } from 'tesseract.js';

async function run() {
  const worker = await createWorker('eng');

  console.log('=== PAGE 25 (Q36-Q43) ===');
  const ret25 = await worker.recognize('backend/uploads/periodic/pages/page25.png');
  console.log(ret25.data.text.slice(1200));

  console.log('=== PAGE 26 (Q44-Q60) ===');
  const ret26 = await worker.recognize('backend/uploads/periodic/pages/page26.png');
  console.log(ret26.data.text);

  console.log('=== PAGE 27 (Q61-Q70) ===');
  const ret27 = await worker.recognize('backend/uploads/periodic/pages/page27.png');
  console.log(ret27.data.text.slice(0, 1500));

  await worker.terminate();
}

run().catch(console.error);

