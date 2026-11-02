import { createWorker } from 'tesseract.js';

async function main() {
  const worker = await createWorker('eng');
  const res = await worker.recognize('backend/uploads/bio/pages/q47_crop.png');
  console.log('=== OCR Q47 ===');
  console.log(res.data.text);
  await worker.terminate();
}

main().catch(console.error);

