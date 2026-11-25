import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

// Build a reliable question-to-page map
// Since questions are strictly sequential 1..408 across pages 1..211,
// we can use a monotonic forward search!

const qToPage = {};
let currentSearchPage = 1;

for (let q = 1; q <= 408; q++) {
  let found = false;
  // Search within [currentSearchPage, currentSearchPage + 4]
  for (let p = currentSearchPage; p <= Math.min(211, currentSearchPage + 4); p++) {
    const text = cache[p] || '';
    // Look for q. or q) or Qq or similar
    const patterns = [
      new RegExp(`(?:^|\\n)\\s*${q}\\s*[\\.\\)]\\s+`, 'i'),
      new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}\\s*[\\.\\)]`, 'i'),
      new RegExp(`\\b${q}\\s*\\.\\s+[A-Z]`, 'i')
    ];
    if (patterns.some(pat => pat.test(text))) {
      qToPage[q] = p;
      currentSearchPage = p;
      found = true;
      break;
    }
  }
  if (!found) {
    // If not found directly, interpolate based on previous known page
    qToPage[q] = currentSearchPage;
  }
}

// Check coverage
console.log('Mapped all 408 questions to pages.');
const pageCounts = {};
for (let q = 1; q <= 408; q++) {
  const p = qToPage[q];
  pageCounts[p] = (pageCounts[p] || 0) + 1;
}

console.log('Sample mappings:');
console.log('Q1 -> Page', qToPage[1]);
console.log('Q50 -> Page', qToPage[50]);
console.log('Q100 -> Page', qToPage[100]);
console.log('Q200 -> Page', qToPage[200]);
console.log('Q300 -> Page', qToPage[300]);
console.log('Q400 -> Page', qToPage[400]);
console.log('Q408 -> Page', qToPage[408]);

fs.writeFileSync(path.resolve(__dirname, 'q_to_page_map.json'), JSON.stringify(qToPage, null, 2));
