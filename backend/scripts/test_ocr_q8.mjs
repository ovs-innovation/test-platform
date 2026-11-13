import pkg from 'tesseract.js';
const { createWorker } = pkg;

async function ocrQ8() {
  const worker = await createWorker('eng');
  const res = await worker.recognize('./backend/uploads/hydrocarbons/q8_diag.png');
  console.log(res.data.text);
  await worker.terminate();
}

ocrQ8().catch(console.error);
