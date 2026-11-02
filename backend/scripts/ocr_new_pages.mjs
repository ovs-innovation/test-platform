import { createWorker } from 'tesseract.js';

async function ocr() {
  const worker = await createWorker('eng');

  console.log('=== OCR NEW PAGE 1 (4X) ===');
  const ret1 = await worker.recognize('backend/uploads/equilibrium/new_pages/page_new1_4x.png');
  console.log(ret1.data.text);

  console.log('=== OCR NEW PAGE 2 (4X) ===');
  const ret2 = await worker.recognize('backend/uploads/equilibrium/new_pages/page_new2_4x.png');
  console.log(ret2.data.text);

  await worker.terminate();
}

ocr().catch(console.error);
