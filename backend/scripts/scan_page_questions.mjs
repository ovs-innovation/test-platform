import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

// Print sequential page mapping
for (let p = 1; p <= 211; p++) {
  const text = cache[p] || '';
  // find all lines starting with a number or letter resembling a number
  const lines = text.split('\n');
  const candidates = [];
  for (const line of lines) {
    const m = line.match(/^\s*(?:Q\.?\s*)?([0-9]{1,3}|[I|lT][0-9]|[B8][0-9]|[A-Z]{1,2})\s*[\.\)]\s*(.*)/i);
    if (m) {
      candidates.push({ rawNum: m[1], preview: m[2].slice(0, 50) });
    }
  }
  if (p <= 15 || p % 20 === 0 || p >= 200) {
    console.log(`Page ${p}:`, candidates);
  }
}
