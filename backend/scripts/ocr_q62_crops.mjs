import fs from 'fs';
import { createWorker } from 'tesseract.js';

async function ocrQ62Crops() {
  const worker = await createWorker('eng');
  const { data: { text: t1 } } = await worker.recognize('./backend/scripts/crop_test/q62_bond.png');
  console.log('q62_bond OCR:\n', t1);
  const { data: { text: t2 } } = await worker.recognize('./backend/scripts/crop_test/q62_group.png');
  console.log('q62_group OCR:\n', t2);
  await worker.terminate();
}

ocrQ62Crops().catch(console.error);

