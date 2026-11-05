import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

// Look for lines containing "ANSWER:" across all pages 1 to 168
const answersFound = [];
for (let p = 1; p <= 168; p++) {
  const pg = pages.find(x => x.page === p);
  pg.lines.forEach((l, idx) => {
    if (/ANSWER/i.test(l.Text)) {
      answersFound.push({
        page: p,
        lineIdx: idx,
        text: l.Text,
        prevLine: idx > 0 ? pg.lines[idx - 1].Text : '',
        nextLine: idx < pg.lines.length - 1 ? pg.lines[idx + 1].Text : ''
      });
    }
  });
}

console.log(`Found ${answersFound.length} "ANSWER" occurrences on pages 1-168!`);
console.log(`First 10 occurrences:`);
answersFound.slice(0, 10).forEach(a => {
  console.log(`Page ${a.page}: "${a.text}" (prev: "${a.prevLine.slice(0, 30)}")`);
});

