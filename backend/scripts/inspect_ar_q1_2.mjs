import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

async function main() {
  const worker = await createWorker('eng');

  // Crop top right of page_241_true.png
  await sharp('backend/uploads/breathing/page_241_true.png')
    .extract({ left: 700, top: 0, width: 700, height: 400 })
    .toFile('backend/uploads/breathing/ar_q1_q2.png');

  console.log('=== AR Q1 and Q2 ===');
  console.log((await worker.recognize('backend/uploads/breathing/ar_q1_q2.png')).data.text);

  await worker.terminate();
}

main().catch(console.error);

