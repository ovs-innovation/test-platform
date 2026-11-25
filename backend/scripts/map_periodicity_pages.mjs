import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CACHE_FILE = path.resolve(__dirname, 'periodicity_ocr_cache.json');
const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));

console.log('=== MAPPING QUESTION NUMBERS TO PAGES ===');
const qToPage = {};

for (let p = 1; p <= 58; p++) {
  const text = cache[p] || '';
  const lines = text.split('\n');
  lines.forEach((line, lineIdx) => {
    // Match line starting with number like "1. ", "45. ", "133. "
    const m = line.match(/^(\d{1,3})\s*[\.:\-]\s+/);
    if (m) {
      const qNum = parseInt(m[1], 10);
      if (qNum >= 1 && qNum <= 193) {
        if (!qToPage[qNum]) {
          qToPage[qNum] = [];
        }
        qToPage[qNum].push({ page: p, line: lineIdx, text: line.slice(0, 60) });
      }
    }
  });
}

const foundNums = Object.keys(qToPage).map(Number).sort((a,b)=>a-b);
console.log(`Found starts for ${foundNums.length} / 193 questions.`);

const missing = [];
for (let i = 1; i <= 193; i++) {
  if (!qToPage[i]) missing.push(i);
}

if (missing.length > 0) {
  console.log('Missing question starts:', missing);
} else {
  console.log('All 193 question starts detected cleanly on lines!');
}

fs.writeFileSync(path.resolve(__dirname, 'periodicity_page_ranges.json'), JSON.stringify(qToPage, null, 2));
