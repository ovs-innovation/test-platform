import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/gravitation_ocr_cache.json', 'utf8'));

let answerCount = 0;
for (let p = 1; p <= 144; p++) {
  const pStr = String(p).padStart(3, '0');
  const text = ocr[pStr] || '';
  const matches = text.match(/\b(ANSWER|Answer|ANS|Ans)\s*[:\.]/gi) || [];
  answerCount += matches.length;
}

console.log('Total ANSWER/ANS occurrences across 144 pages:', answerCount);
