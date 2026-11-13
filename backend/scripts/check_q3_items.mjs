import fs from 'fs';

const pagesDump = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_pages_dump.json', 'utf8'));
const p2 = pagesDump.find(p => p.page === 2);

console.log('Items around Q3:');
const q3Items = p2.items.filter(it => it.str.includes('antitrypsin') || it.str.includes('human protein') || it.y > 400 && it.y < 550);
for (const it of q3Items) {
  console.log(`x=${it.x}, y=${it.y}: "${it.str}"`);
}

