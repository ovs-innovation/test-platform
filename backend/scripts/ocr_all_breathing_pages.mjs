import { createWorker } from 'tesseract.js';
import fs from 'fs';

const pages = [
  'page_001', 'page_226', 'page_227', 'page_228', 'page_229',
  'page_230', 'page_231', 'page_232', 'page_233',
  'page_238', 'page_239', 'page_240', 'page_241'
];

async function main() {
  const dir = 'backend/uploads/breathing/pages_clean';
  const worker = await createWorker('eng');

  for (const p of pages) {
    console.log(`Processing ${p}...`);
    const imgPath = `${dir}/${p}.png`;
    const res = await worker.recognize(imgPath);
    fs.writeFileSync(`${dir}/${p}.txt`, res.data.text);
    console.log(`Saved ${p}.txt (${res.data.text.length} chars)`);
  }

  await worker.terminate();
  console.log('Finished OCR for all 13 breathing pages!');
}

main().catch(console.error);

