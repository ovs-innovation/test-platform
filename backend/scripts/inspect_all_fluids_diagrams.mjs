import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagDir = path.resolve(__dirname, 'fluids_diagrams');
const files = fs.readdirSync(diagDir).filter(f => f.endsWith('.png'));

async function main() {
  const worker = await createWorker('eng');
  for (const f of files) {
    const filePath = path.join(diagDir, f);
    const ret = await worker.recognize(filePath);
    console.log(`=== ${f} ===`);
    console.log(ret.data.text.trim().replace(/\n+/g, ' '));
  }
  await worker.terminate();
}

main().catch(console.error);
