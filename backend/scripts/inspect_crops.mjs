import { createWorker } from 'tesseract.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function test() {
  const worker = await createWorker('eng');
  const files = ['q63_sol_diagram.png', 'q107_sol_diagram.png', 'q133_q_diagram.png', 'q164_sol_diagram.png'];
  for (const f of files) {
    const res = await worker.recognize(path.resolve(__dirname, 'periodicity_diagrams', f));
    console.log(`=== ${f} ===\n${res.data.text.trim()}\n`);
  }
  await worker.terminate();
}
test().catch(console.error);
