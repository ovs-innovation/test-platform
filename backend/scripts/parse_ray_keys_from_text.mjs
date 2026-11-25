import { createWorker } from 'tesseract.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const worker = await createWorker('eng');
  for (const p of [251, 252]) {
    const imgPath = path.resolve(__dirname, `ray_jee_pages/page_${p}.png`);
    const ret = await worker.recognize(imgPath);
    const lines = ret.data.text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    console.log(`\n=== PAGE ${p} (${lines.length} lines) ===`);
    lines.forEach((l, idx) => {
      console.log(`P${p}_L${idx + 1}: ${l}`);
    });
  }
  await worker.terminate();
}

main().catch(console.error);
