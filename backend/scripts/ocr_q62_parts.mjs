import fs from 'fs';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

async function ocrQ62Parts() {
  const img = await loadImage('./backend/scripts/crop_test/q62_detail.png');
  const worker = await createWorker('eng');

  // Upper diagram: y: 40 to y: 320
  const c1 = createCanvas(img.width, 280);
  c1.getContext('2d').drawImage(img, 0, 40, img.width, 280, 0, 0, img.width, 280);
  const { data: { text: t1 } } = await worker.recognize(c1.toBuffer('image/png'));
  console.log('Upper part OCR:\n', t1);

  // Middle diagram: y: 400 to y: 650
  const c2 = createCanvas(img.width, 250);
  c2.getContext('2d').drawImage(img, 0, 400, img.width, 250, 0, 0, img.width, 250);
  const { data: { text: t2 } } = await worker.recognize(c2.toBuffer('image/png'));
  console.log('Middle part OCR:\n', t2);

  await worker.terminate();
}

ocrQ62Parts().catch(console.error);

