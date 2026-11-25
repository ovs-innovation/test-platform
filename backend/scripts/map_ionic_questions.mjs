import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/ionic_ocr_cache.json', 'utf8'));
const keys = JSON.parse(fs.readFileSync('backend/scripts/ionic_official_keys.json', 'utf8'));

const qMap = {};

for (let p = 1; p <= 64; p++) {
  const text = ocr[p] || '';
  // match question numbers: e.g. "1.", "159." at start of line or after newline
  const regex = /(?:^|\n)\s*(\d+)\.\s+/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const qNum = parseInt(match[1], 10);
    if (qNum >= 1 && qNum <= 159) {
      if (!qMap[qNum]) {
        qMap[qNum] = { page: p, key: keys[qNum] };
      }
    }
  }
}

console.log(`Found ${Object.keys(qMap).length} / 159 questions in OCR.`);

const missing = [];
for (let i = 1; i <= 159; i++) {
  if (!qMap[i]) missing.push(i);
}
console.log('Missing question numbers in naive regex:', missing);

fs.writeFileSync('backend/scripts/ionic_question_page_map.json', JSON.stringify(qMap, null, 2), 'utf8');
