import fs from 'fs';
import { createWorker } from 'tesseract.js';

async function ocrQ62Slice() {
  const worker = await createWorker('eng');
  const { data: { text } } = await worker.recognize('./backend/scripts/biomolecules_q_slices/q_62.png');
  console.log('Q62 slice OCR:\n', text);
  await worker.terminate();
}

ocrQ62Slice().catch(console.error);

