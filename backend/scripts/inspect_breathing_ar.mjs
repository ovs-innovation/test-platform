import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

async function main() {
  const meta = await sharp('backend/uploads/breathing/pages_clean/page_241.png').metadata();
  console.log('page_241 size:', meta.width, meta.height);

  // Extract right half of page 241 (where Section B AR questions are located)
  const arCrop = await sharp('backend/uploads/breathing/pages_clean/page_241.png')
    .extract({
      left: Math.floor(meta.width * 0.48),
      top: 0,
      width: Math.floor(meta.width * 0.52),
      height: meta.height
    })
    .toFile('backend/uploads/breathing/page_241_ar_col.png');

  const worker = await createWorker('eng');
  const res = await worker.recognize('backend/uploads/breathing/page_241_ar_col.png');
  console.log('=== Section B AR Questions Text ===');
  console.log(res.data.text);
  await worker.terminate();
}

main().catch(console.error);

