import fs from 'fs';

const items = JSON.parse(fs.readFileSync('./backend/scripts/alcohols_pdf_items.json', 'utf8'));
const p2Items = items.filter(it => it.page === 2);
for (const it of p2Items) {
  console.log(`[X:${it.x} Y:${it.y} W:${it.w} H:${it.h}] "${it.text}"`);
}

