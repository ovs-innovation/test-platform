import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const p115 = path.resolve(__dirname, 'dual_nature_pages/page_115.png');
  const worker = await createWorker('eng');
  const ret = await worker.recognize(p115);
  console.log('Words on page 115 with bounding boxes:');
  const words = ret.data.words;
  console.log(`Total words: ${words.length}`);

  // Let's print out lines
  const lines = ret.data.lines;
  console.log(`Total lines: ${lines.length}`);
  lines.forEach((l, idx) => {
    console.log(`Line ${idx+1}: "${l.text.trim()}" (bbox: y0=${l.bbox.y0}, y1=${l.bbox.y1})`);
  });

  await worker.terminate();
}

main().catch(console.error);
