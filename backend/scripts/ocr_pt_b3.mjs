import { createWorker } from 'tesseract.js';

async function run() {
  const worker = await createWorker('eng');

  console.log('=== PAGE 27 BOTTOM (Q71-Q79) ===');
  const ret27 = await worker.recognize('backend/uploads/periodic/pages/page27.png');
  console.log(ret27.data.text.slice(1200));

  console.log('=== PAGE 28 (Q80-Q94) ===');
  const ret28 = await worker.recognize('backend/uploads/periodic/pages/page28.png');
  console.log(ret28.data.text);

  console.log('=== PAGE 29 TOP (Q95-Q105) ===');
  const ret29 = await worker.recognize('backend/uploads/periodic/pages/page29.png');
  console.log(ret29.data.text.slice(0, 1500));

  await worker.terminate();
}

run().catch(console.error);

