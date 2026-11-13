import fs from 'fs';

const pagesDump = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_pages_dump.json', 'utf8'));
const p9 = pagesDump.find(p => p.page === 9);

console.log('Items around Q32 on Page 9:');
const q32Items = p9.items.filter(it => it.y >= 300 && it.y <= 450);
for (const it of q32Items) {
  console.log(`x=${it.x}, y=${it.y}: "${it.str}"`);
}

