import { createWorker } from 'tesseract.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function check() {
  const worker = await createWorker('eng');
  for (const f of ['test_q63.png', 'test_q107.png', 'test_q133.png', 'test_q164.png']) {
    const res = await worker.recognize(path.resolve(__dirname, 'periodicity_diagrams', f));
    console.log(`=== ${f} ===\n${res.data.text.trim()}\n`);
  }
  await worker.terminate();
}
check().catch(console.error);
