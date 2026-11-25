import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ac_jee_ocr_cache.json'), 'utf8'));

const missing = [7, 14, 15, 19, 46, 51, 58, 66, 81, 91, 94, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 132, 135, 141, 146, 157, 166];

for (const q of missing) {
  const estPage = Math.max(1, Math.min(112, Math.round(q * 0.63)));
  console.log(`\n================ Looking for Q${q} (est page ~${estPage}) ================`);
  for (let p = Math.max(1, estPage - 3); p <= Math.min(112, estPage + 4); p++) {
    const text = pages[p] || '';
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    for (let li = 0; li < lines.length; li++) {
      const l = lines[li];
      // check if line looks like question start
      if (/^[0-9Il|i!oaA]+\.?\s+/i.test(l) || l.includes('LCR') || l.includes('circuit') || l.includes('ANSWER:') || l.includes('marks')) {
        console.log(`  [P${p} L${li}] ${l.slice(0, 85)}`);
      }
    }
  }
}
