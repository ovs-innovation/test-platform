import fs from 'fs';

const pagesDump = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_pages_dump.json', 'utf8'));
const p10 = pagesDump.find(p => p.page === 10);

console.log('Items around y=580-660 on Page 10:');
const items = p10.items.filter(it => it.y >= 580 && it.y <= 670);
for (const it of items) {
  console.log(`x=${it.x}, y=${it.y}: "${it.str}"`);
}

