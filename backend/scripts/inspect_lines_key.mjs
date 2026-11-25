import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectLines() {
  const worker = await createWorker('eng');
  for (const p of [251, 252]) {
    const imgPath = path.resolve(__dirname, `ray_jee_pages/page_${p}.png`);
    const ret = await worker.recognize(imgPath);
    const lines = [];
    if (ret.data.blocks) {
      for (const b of ret.data.blocks) {
        for (const pr of b.paragraphs || []) {
          for (const l of pr.lines || []) {
            lines.push(l);
          }
        }
      }
    }
    console.log(`\n=== PAGE ${p} (Lines: ${lines.length}) ===`);
    lines.forEach((l, idx) => {
      console.log(`P${p}_L${idx+1}: ${l.text.trim()}`);
    });
  }
  await worker.terminate();
}

inspectLines().catch(console.error);
