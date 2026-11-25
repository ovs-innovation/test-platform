import { createWorker } from 'tesseract.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const worker = await createWorker('eng');
  
  for (const pageNum of [251, 252]) {
    const imgPath = path.resolve(__dirname, `ray_jee_pages/page_${pageNum}.png`);
    const ret = await worker.recognize(imgPath);
    const lines = ret.data.lines.map(l => ({
      text: l.text.trim(),
      bbox: l.bbox,
      words: l.words.map(w => ({ text: w.text, bbox: w.bbox }))
    }));
    fs.writeFileSync(`backend/scripts/ray_key_lines_p${pageNum}.json`, JSON.stringify(lines, null, 2));
    console.log(`Page ${pageNum} lines count: ${lines.length}`);
  }
  await worker.terminate();
}

main().catch(console.error);
