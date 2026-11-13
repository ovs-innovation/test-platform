import fs from 'fs';

const items = JSON.parse(fs.readFileSync('./backend/scripts/biomolecules_pdf_items.json', 'utf8'));
const pos = JSON.parse(fs.readFileSync('./backend/scripts/biomolecules_q_positions.json', 'utf8')).find(p => p.qNum === 62);

const q62Items = items.filter(it => it.pageNum === pos.pageNum && it.y >= pos.y - 15 && it.y <= 1500);
console.log('Q62 PDF text items:');
for (const it of q62Items) {
  console.log(`x: ${it.x.toFixed(1)}, y: ${it.y.toFixed(1)}, str: "${it.str}"`);
}

