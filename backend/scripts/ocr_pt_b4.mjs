import { createWorker } from 'tesseract.js';

async function run() {
  const worker = await createWorker('eng');

  console.log('=== PAGE 29 BOTTOM (Q106-Q110) ===');
  const ret29 = await worker.recognize('backend/uploads/periodic/pages/page29.png');
  console.log(ret29.data.text.slice(1200));

  console.log('=== PAGE 30 (Q111-Q124) ===');
  const ret30 = await worker.recognize('backend/uploads/periodic/pages/page30.png');
  console.log(ret30.data.text);

  console.log('=== PAGE 31 (Q125-Q142) ===');
  const ret31 = await worker.recognize('backend/uploads/periodic/pages/page31.png');
  console.log(ret31.data.text);

  await worker.terminate();
}

run().catch(console.error);

