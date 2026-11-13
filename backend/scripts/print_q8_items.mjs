import fs from 'fs';

const items = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_pdf_items.json', 'utf8'));
const positions = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_q_positions.json', 'utf8'));

const pos = positions.find(p => p.qNum === 8);
const nextPos = positions.find(p => p.qNum === 9);

const q8Items = items.filter(it => it.pageNum === pos.pageNum && it.y >= pos.y - 15 && it.y < (nextPos ? nextPos.y - 15 : 1530));
console.log('Q8 text items:');
for (const it of q8Items) {
  console.log(`  [y=${it.y.toFixed(1)}, x=${it.x.toFixed(1)}] "${it.str}"`);
}

