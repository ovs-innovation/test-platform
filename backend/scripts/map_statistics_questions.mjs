import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

console.log(`Loaded ${pages.length} pages.`);

// Find all questions across pages
// Look for lines or text matching: ^\s*(\d{1,3})\.\s+ or \n(\d{1,3})\.\s+
const qMap = {};

for (const p of pages) {
  const pNum = p.page;
  const text = p.text;
  
  // Find question headers
  // In AcadXL PDFs, questions start with "N. " at the start of a line or paragraph
  const qRegex = /(?:^|\n)\s*(\d{1,3})\.\s+/g;
  let match;
  while ((match = qRegex.exec(text)) !== null) {
    const qNum = parseInt(match[1]);
    if (qNum >= 1 && qNum <= 160) {
      if (!qMap[qNum]) {
        qMap[qNum] = [];
      }
      qMap[qNum].push({ page: pNum, index: match.index });
    }
  }
}

const foundNums = Object.keys(qMap).map(Number).sort((a, b) => a - b);
console.log(`Found ${foundNums.length} question markers in OCR:`, foundNums);

const missing = [];
for (let i = 1; i <= 160; i++) {
  if (!qMap[i]) {
    missing.push(i);
  }
}
console.log(`Missing question numbers (${missing.length}):`, missing);

