import { createWorker } from 'tesseract.js';
import fs from 'fs';

async function main() {
  const worker = await createWorker('eng');

  // Let's check headers on each image
  for (let i = 1; i <= 5; i++) {
    const leftText = (await worker.recognize(`backend/uploads/breathing/slices/img${i}_left.png`)).data.text.slice(0, 150);
    const rightText = (await worker.recognize(`backend/uploads/breathing/slices/img${i}_right.png`)).data.text.slice(0, 150);
    console.log(`=== IMG ${i} ===`);
    console.log('LEFT header:', leftText.replace(/\n/g, ' '));
    console.log('RIGHT header:', rightText.replace(/\n/g, ' '));
  }

  await worker.terminate();
}

main().catch(console.error);

