import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function parseKeys() {
  const pagesDir = path.resolve(__dirname, 'current_electricity_pages');
  const worker = await createWorker('eng');

  // Check pages 211, 212, 213
  for (const p of [211, 212, 213]) {
    const pPath = path.join(pagesDir, `page_${String(p).padStart(3, '0')}.png`);
    if (fs.existsSync(pPath)) {
      console.log(`\n=== OCR ON PAGE ${p} ===`);
      const { data: { text } } = await worker.recognize(pPath);
      console.log(text.substring(0, 1000));
      fs.writeFileSync(path.resolve(__dirname, `current_electricity_page${p}_raw.txt`), text);
    }
  }

  await worker.terminate();
}

parseKeys().catch(console.error);
