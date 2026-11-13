import fs from 'fs';

const items = JSON.parse(fs.readFileSync('./backend/scripts/biomolecules_pdf_items.json', 'utf8'));
const pos27 = JSON.parse(fs.readFileSync('./backend/scripts/biomolecules_q_positions.json', 'utf8')).find(p => p.qNum === 27);
const pos52 = JSON.parse(fs.readFileSync('./backend/scripts/biomolecules_q_positions.json', 'utf8')).find(p => p.qNum === 52);

console.log('Q27 PDF items:');
const q27 = items.filter(it => it.pageNum === pos27.pageNum && it.y >= pos27.y - 10 && it.y <= 1500);
for (const it of q27) {
  console.log(`x: ${it.x.toFixed(1)}, y: ${it.y.toFixed(1)}, str: "${it.str}"`);
}

console.log('\nQ52 PDF items:');
const q52 = items.filter(it => it.pageNum === pos52.pageNum && it.y >= pos52.y - 10 && it.y <= 1500);
for (const it of q52) {
  console.log(`x: ${it.x.toFixed(1)}, y: ${it.y.toFixed(1)}, str: "${it.str}"`);
}

