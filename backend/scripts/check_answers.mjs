import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

let ansCount = 0;
const ansList = [];

for (const p of pages) {
  if (p.page === 128) continue; // Skip answer key page
  const text = p.text;
  const matches = [...text.matchAll(/ANSWER:\s*([A-Za-z0-9\.\-]+)/gi)];
  for (const m of matches) {
    ansCount++;
    ansList.push({ page: p.page, ans: m[1], raw: m[0] });
  }
}

console.log(`Found ${ansCount} ANSWER: markers in pages 1-127.`);

// Also search for "marks, -1" or years
let marksCount = 0;
for (const p of pages) {
  if (p.page === 128) continue;
  const matches = [...p.text.matchAll(/(?:\[\d+\s*marks|\b\d{4}\s*ANSWER)/gi)];
  marksCount += matches.length;
}
console.log(`Found ${marksCount} marks/year markers.`);

