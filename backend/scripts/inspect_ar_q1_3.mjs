import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

async function main() {
  const worker = await createWorker('eng');

  // Crop top half of page_241_section_b.png
  await sharp('backend/uploads/breathing/page_241_section_b.png')
    .extract({ left: 10, top: 10, width: 680, height: 500 })
    .toFile('backend/uploads/breathing/ar_q1_to_q3.png');

  console.log('=== AR Q1 to Q3 ===');
  console.log((await worker.recognize('backend/uploads/breathing/ar_q1_to_q3.png')).data.text);

  await worker.terminate();
}

main().catch(console.error);

