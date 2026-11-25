import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIR = path.resolve(__dirname, 'test_crops');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.png'));

async function inspectCrops() {
  const worker = await createWorker('eng');
  for (const f of files) {
    const filePath = path.join(DIR, f);
    const { data: { text } } = await worker.recognize(filePath);
    const cleanText = text.replace(/\s+/g, ' ').trim();
    console.log(`=== ${f} ===`);
    console.log(`Text in crop: "${cleanText.substring(0, 150)}..."`);
  }
  await worker.terminate();
}

inspectCrops().catch(console.error);
