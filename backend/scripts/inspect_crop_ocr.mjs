import { createWorker } from 'tesseract.js';
import fs from 'fs';

async function main() {
  const worker = await createWorker('eng');

  for (let i = 1; i <= 3; i++) {
    const res = await worker.recognize(`backend/uploads/structural_organisation/pages_hires2/p199_part${i}.png`);
    console.log(`=== PART ${i} ===`);
    console.log(res.data.text);
  }

  await worker.terminate();
}

main().catch(console.error);

