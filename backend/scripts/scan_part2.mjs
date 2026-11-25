import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_ocr_cache.json'), 'utf8'));

const found = {};
for (let q = 61; q <= 120; q++) {
  for (let p = 35; p <= 78; p++) {
    const pad = String(p).padStart(3, '0');
    const text = cache[pad] || '';
    const regex = new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}[\\.:\\-\\)]\\s+`, 'i');
    if (regex.test(text)) {
      found[q] = p;
      break;
    }
  }
}

const missing = [];
for (let q = 61; q <= 120; q++) {
  if (!found[q]) missing.push(q);
}

console.log(`Part 2 (Q61-Q120): Found ${Object.keys(found).length}/60 questions.`);
console.log('Missing in Part 2:', missing.join(', '));
