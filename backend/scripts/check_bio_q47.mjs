import { createWorker } from 'tesseract.js';

async function main() {
  const worker = await createWorker('eng');
  const res = await worker.recognize('backend/uploads/bio/diagrams/bio_q47.png');
  console.log('bio_q47 text:');
  console.log(res.data.text);
  await worker.terminate();
}

main().catch(console.error);
