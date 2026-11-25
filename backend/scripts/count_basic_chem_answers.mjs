import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_ocr_cache.json'), 'utf8'));

let totalAnswers = 0;
const pageCounts = {};

for (let p = 1; p <= 78; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  
  // Match ANSWER: or AnsweR: or Answer:
  const matches = [...text.matchAll(/\b(?:answer|answeR|Answer|Answes|AnswER)\b\s*[:\.]/gi)];
  pageCounts[p] = matches.length;
  totalAnswers += matches.length;
}

console.log('Total ANSWER: lines found across 78 pages:', totalAnswers);
console.log('Counts per page:');
for (let p = 1; p <= 78; p++) {
  console.log(`Page ${String(p).padStart(2, '0')}: ${pageCounts[p]} questions`);
}
