import fs from 'fs';

const items = JSON.parse(fs.readFileSync('backend/scripts/organic_pdf_items.json', 'utf8'));

const pages = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 34];

for (const pg of pages) {
  console.log(`=== PAGE ${pg} ===`);
  const pgItems = items.filter(it => it.pageNum === pg);
  for (const it of pgItems) {
    if (it.str.trim() && (it.str.includes('(A)') || it.str.includes('(B)') || it.str.includes('(C)') || it.str.includes('(D)') || it.str.startsWith('Q') || it.str.includes('I') || it.str.includes('II') || it.str.includes('III') || it.str.includes('Choose') || it.str.includes('Which') || it.str.includes('The'))) {
      console.log(`  y=${(it.y * 2).toFixed(1)}: "${it.str}"`);
    }
  }
}
