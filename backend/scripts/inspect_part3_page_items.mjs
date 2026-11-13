import fs from 'fs';

const items = JSON.parse(fs.readFileSync('backend/scripts/organic_pdf_items.json', 'utf8'));

const pages = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

for (const pg of pages) {
  console.log(`=== PAGE ${pg} ===`);
  const pgItems = items.filter(it => it.pageNum === pg);
  for (const it of pgItems) {
    if (it.str.trim() && (it.str.includes('(A)') || it.str.includes('(B)') || it.str.includes('(C)') || it.str.includes('(D)') || it.str.startsWith('Q') || it.str.includes('I') || it.str.includes('II') || it.str.includes('III') || it.str.includes('Choose') || it.str.includes('Which') || it.str.includes('The') || it.str.includes('is'))) {
      console.log(`  y=${(it.y * 2).toFixed(1)}: "${it.str}"`);
    }
  }
}

