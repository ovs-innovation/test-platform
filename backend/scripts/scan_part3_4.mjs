import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_ocr_cache.json'), 'utf8'));

// Scan Part 3 (121-180)
const missingP3 = [];
for (let q = 121; q <= 180; q++) {
  let found = false;
  for (let p = 77; p <= 116; p++) {
    const pad = String(p).padStart(3, '0');
    const text = cache[pad] || '';
    if (new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}[\\.:\\-\\)]\\s+`, 'i').test(text)) {
      found = true;
      break;
    }
  }
  if (!found) missingP3.push(q);
}
console.log('Part 3 missing:', missingP3.join(', '));

// Scan Part 4 (181-228)
const missingP4 = [];
for (let q = 181; q <= 228; q++) {
  let found = false;
  for (let p = 115; p <= 144; p++) {
    const pad = String(p).padStart(3, '0');
    const text = cache[pad] || '';
    if (new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}[\\.:\\-\\)]\\s+`, 'i').test(text)) {
      found = true;
      break;
    }
  }
  if (!found) missingP4.push(q);
}
console.log('Part 4 missing:', missingP4.join(', '));
