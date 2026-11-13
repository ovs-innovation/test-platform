import fs from 'fs';

const pagesDump = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_pages_dump.json', 'utf8'));
const p4 = pagesDump.find(p => p.page === 4);

console.log('All items on Page 4 between y=515 and y=595:');
const items = p4.items.filter(it => it.y >= 515 && it.y <= 595);
for (const it of items) {
  console.log(`x=${it.x}, y=${it.y}, w=${it.width}: "${it.str}"`);
}

