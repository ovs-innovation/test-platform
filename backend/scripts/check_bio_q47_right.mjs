import { createWorker } from 'tesseract.js';

async function main() {
  const worker = await createWorker('eng');
  const res = await worker.recognize('backend/uploads/bio/diagrams/bio_q47_diagram.png');
  console.log('bio_q47_diagram text:');
  console.log(res.data.text);
  await worker.terminate();
}

main().catch(console.error);
