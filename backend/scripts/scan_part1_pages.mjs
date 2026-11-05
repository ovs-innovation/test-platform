import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);
const key = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_binomial_theorem.json', 'utf8'));

// Print pages 1 to 40 questions summary
for (let p = 1; p <= 40; p++) {
  const pg = pages.find(x => x.page === p);
  const text = pg.text;
  const ansMatches = [...text.matchAll(/ANSWER[:\s\-\*\+\=]+([A-D]|\d+)/gi)];
  console.log(`Page ${p} (length ${text.length}): ${ansMatches.map(m => m[0]).join(', ')}`);
}

