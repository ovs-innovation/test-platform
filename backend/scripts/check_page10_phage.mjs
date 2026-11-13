import fs from 'fs';

const pagesDump = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_pages_dump.json', 'utf8'));
const p10 = pagesDump.find(p => p.page === 10);

console.log('Items around phage on Page 10:');
const phageItems = p10.items.filter(it => it.str.includes('phage') || it.y > 100 && it.y < 300);
for (const it of phageItems) {
  console.log(`x=${it.x}, y=${it.y}: "${it.str}"`);
}

