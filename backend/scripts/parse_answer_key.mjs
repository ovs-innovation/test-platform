import fs from 'fs';

// Let's parse all 305 answers from the OCR and verify against the answer key pages.
// From page 123 (Q1 - Q240) and page 124 (Q241 - Q305).
// Let's inspect the text of ans_key_p123_ocr.txt and ans_key_p124_ocr.txt.

const t1 = fs.readFileSync('./backend/scripts/ans_key_p123_ocr.txt', 'utf8');
const t2 = fs.readFileSync('./backend/scripts/ans_key_p124_ocr.txt', 'utf8');

// Combine tokens: match all `\b(\d+)\.\s*([A-Za-z0-9\.\-]+)`
const allMatches = [];
for (const text of [t1, t2]) {
  const re = /\b(\d{1,3})\.\s*([A-Za-z0-9\.\-]+)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const qNum = parseInt(m[1], 10);
    const ans = m[2].toUpperCase().trim();
    if (qNum >= 1 && qNum <= 305) {
      allMatches.push({ qNum, ans });
    }
  }
}

const ansMap = {};
for (const item of allMatches) {
  ansMap[item.qNum] = item.ans;
}

console.log('Total unique questions parsed:', Object.keys(ansMap).length);
const missing = [];
for (let i = 1; i <= 305; i++) {
  if (!ansMap[i]) missing.push(i);
}
console.log('Missing question numbers from naive regex:', missing);

