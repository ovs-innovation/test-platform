import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

// Build page list
const pageItems = [];
for (let p = 1; p <= 202; p++) {
  const text = pages[String(p)] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  pageItems.push({ page: p, lines });
}

// Search for each number in its expected page range (p in [q*0.7 - 5, q*0.75 + 10])
const qResults = {};

for (let q = 1; q <= 268; q++) {
  const minP = Math.max(1, Math.floor(q * 0.65) - 4);
  const maxP = Math.min(202, Math.ceil(q * 0.8) + 8);
  
  const matches = [];
  for (let p = minP; p <= maxP; p++) {
    const lines = pageItems[p - 1].lines;
    for (let li = 0; li < lines.length; li++) {
      const line = lines[li];
      // match q at start of line
      const exactReg = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.\\s\\)]`, 'i');
      if (exactReg.test(line)) {
        matches.push({ page: p, lineIdx: li, line });
      }
    }
  }

  qResults[q] = matches;
}

const found = [];
const missing = [];
for (let q = 1; q <= 268; q++) {
  if (qResults[q].length > 0) {
    found.push(q);
  } else {
    missing.push(q);
  }
}

console.log(`Direct numeric start found for ${found.length} / 268 questions.`);
console.log(`Missing count: ${missing.length}`);
console.log(`Missing questions:`, missing.join(', '));
