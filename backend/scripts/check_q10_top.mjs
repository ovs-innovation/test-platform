import fs from 'fs';

const pagesDump = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_pages_dump.json', 'utf8'));
const p4 = pagesDump.find(p => p.page === 4);

console.log('Items between y=490 and y=750 on Page 4:');
const q10Items = p4.items.filter(it => it.y >= 490 && it.y <= 750);
for (const it of q10Items) {
  console.log(`x=${it.x}, y=${it.y}: "${it.str}"`);
}

