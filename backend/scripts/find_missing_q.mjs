import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_ocr_cache.json'), 'utf8'));
const qPageMap = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_q_page_map.json'), 'utf8'));

const missing = [11, 51, 110, 111, 113, 115, 117, 119, 133, 135, 159, 182, 185, 190, 191, 192];

for (const q of missing) {
  const prevP = qPageMap[q - 1] ? qPageMap[q - 1][0] : 1;
  const nextP = qPageMap[q + 1] ? qPageMap[q + 1][0] : prevP + 2;
  console.log(`\n=== Finding Q${q} (between page ${prevP} and ${nextP}) ===`);
  for (let p = prevP; p <= nextP; p++) {
    const text = cache[p] || '';
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    // Print lines that look like a question beginning
    console.log(`--- Page ${p} lines: ---`);
    lines.slice(0, 15).forEach((line, i) => {
      if (/^\s*[0-9A-Za-z\.\:\)\"\']{1,5}\s+/i.test(line) || /when|an?|if|the|in|for/i.test(line.slice(0, 15))) {
        console.log(`  [line ${i}]: ${line.slice(0, 90)}`);
      }
    });
  }
}
