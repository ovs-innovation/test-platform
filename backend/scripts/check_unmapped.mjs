import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

const questionMap = new Map();

for (let p = 1; p <= 168; p++) {
  const pg = pages.find(x => x.page === p);
  const lines = pg.lines;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].Text.trim();
    const m = l.match(/^(\d+)[\.\s]+(.*)/);
    if (m) {
      const num = parseInt(m[1]);
      if (num >= 1 && num <= 260) {
        if (!questionMap.has(num)) {
          questionMap.set(num, { page: p, line: l, lineIdx: i });
        }
      }
    }
  }
}

const unmapped = [];
for (let i = 1; i <= 260; i++) {
  if (!questionMap.has(i)) unmapped.push(i);
}

console.log(`Unmapped questions (${unmapped.length}):`, unmapped);

// For each unmapped question, let's look at the page between the previous and next question
for (const q of unmapped) {
  const prevPage = questionMap.get(q - 1)?.page || 1;
  const nextPage = questionMap.get(q + 1)?.page || prevPage + 1;
  console.log(`Q${q} must be between page ${prevPage} and ${nextPage}`);
}

