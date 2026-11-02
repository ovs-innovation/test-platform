import sharp from 'sharp';
import { createWorker } from 'tesseract.js';
import fs from 'fs';

const pages = [
  'page_001', 'page_226', 'page_227', 'page_228', 'page_229',
  'page_230', 'page_231', 'page_232', 'page_233',
  'page_238', 'page_239', 'page_240', 'page_241'
];

async function main() {
  const worker = await createWorker('eng');
  for (const p of pages) {
    const file = `backend/uploads/breathing/pages_clean/${p}.png`;
    // Extract top 100px across the top
    const headerBuf = await sharp(file)
      .extract({ left: 10, top: 0, width: 1180, height: 120 })
      .toBuffer();
    const hText = (await worker.recognize(headerBuf)).data.text.replace(/\s+/g, ' ').trim();
    console.log(`${p}: Header -> "${hText}"`);
  }
  await worker.terminate();
}

main().catch(console.error);

