import fs from 'fs';

const items = JSON.parse(fs.readFileSync('backend/scripts/organic_pdf_items.json', 'utf8'));

console.log('=== PAGE 51 ===');
const pgItems = items.filter(it => it.pageNum === 51);
for (const it of pgItems) {
  if (it.str.trim()) {
    console.log(`  y=${(it.y * 2).toFixed(1)}: "${it.str}"`);
  }
}

