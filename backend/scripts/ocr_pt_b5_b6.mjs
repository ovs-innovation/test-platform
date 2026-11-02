import { createWorker } from 'tesseract.js';

async function run() {
  const worker = await createWorker('eng');

  console.log('=== PAGE 31 BOTTOM (Q141-Q142) ===');
  const ret31 = await worker.recognize('backend/uploads/periodic/pages/page31.png');
  console.log(ret31.data.text.slice(1200));

  console.log('=== PAGE 32 (Q143-Q161) ===');
  const ret32 = await worker.recognize('backend/uploads/periodic/pages/page32.png');
  console.log(ret32.data.text);

  console.log('=== PAGE 33 (Q162-Q171 + AR Q1-Q2) ===');
  const ret33 = await worker.recognize('backend/uploads/periodic/pages/page33.png');
  console.log(ret33.data.text);

  console.log('=== PAGE 34 (AR Q3-Q16) ===');
  const ret34 = await worker.recognize('backend/uploads/periodic/pages/page34.png');
  console.log(ret34.data.text);

  await worker.terminate();
}

run().catch(console.error);

