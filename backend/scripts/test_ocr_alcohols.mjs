import pkg from 'tesseract.js';
const { createWorker } = pkg;

async function testOCR(imgPath) {
  const worker = await createWorker('eng');
  const res = await worker.recognize(imgPath);
  console.log('=== OCR Result for', imgPath, '===');
  console.log(res.data.text);
  await worker.terminate();
}

async function test() {
  const worker = await createWorker('eng');
  const res = await worker.recognize('./backend/scripts/alcohols_diagrams/q5_diag.png');
  console.log('Q5 diag text:\n', res.data.text);
  const res2 = await worker.recognize('./backend/scripts/alcohols_diagrams/q20_diag.png');
  console.log('Q20 diag text:\n', res2.data.text);
  await worker.terminate();
}

test().catch(console.error);
