import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const raw212 = fs.readFileSync(path.resolve(__dirname, 'current_electricity_page212_raw.txt'), 'utf8');
const raw213 = fs.readFileSync(path.resolve(__dirname, 'current_electricity_page213_raw.txt'), 'utf8');

const combined = raw212 + '\n' + raw213;

const keys = {};

// Clean up some OCR character substitutions in answer table
const tokens = combined.split(/\s+/);
console.log('Total tokens in answer key pages:', tokens.length);

// Regex matching e.g. "1.C" or "1C" or "212.75" or "408.200"
for (const token of tokens) {
  const m = token.match(/^(\d{1,3})[\.\:\;\,\_\-\)]\s*([A-Da-d0-9\.\-]+)$/);
  if (m) {
    const qNum = parseInt(m[1], 10);
    if (qNum >= 1 && qNum <= 408) {
      let ans = m[2].toUpperCase().trim();
      keys[qNum] = ans;
    }
  }
}

console.log(`Found ${Object.keys(keys).length} / 408 keys from direct token match.`);
// Let's print missing numbers from 1 to 408
const missing = [];
for (let q = 1; q <= 408; q++) {
  if (!keys[q]) missing.push(q);
}
console.log(`Missing count: ${missing.length}`);
console.log('Sample missing:', missing.slice(0, 30));
