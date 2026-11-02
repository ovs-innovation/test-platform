import { createWorker } from 'tesseract.js';

async function main() {
  const worker = await createWorker('eng');
  const res1 = await worker.recognize('backend/uploads/bio/pages/img5_left_big.png');
  console.log('=== IMG 5 LEFT ===');
  console.log(res1.data.text.slice(0, 1000));
  const res2 = await worker.recognize('backend/uploads/bio/pages/img5_right_big.png');
  console.log('=== IMG 5 RIGHT ===');
  console.log(res2.data.text.slice(0, 1000));
  await worker.terminate();
}

main().catch(console.error);

