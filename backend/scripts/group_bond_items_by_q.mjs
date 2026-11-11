import fs from 'fs';

const items = JSON.parse(fs.readFileSync('backend/scripts/bond_pdf_items.json', 'utf8'));
const positions = JSON.parse(fs.readFileSync('backend/scripts/bond_q_positions.json', 'utf8'));

const qMap = {};
for (const p of positions) {
  qMap[p.qNum] = [];
}

for (const item of items) {
  const pList = positions.filter(p => p.pageNum === item.pageNum);
  for (const p of pList) {
    if (item.y >= p.top - 5 && item.y <= p.bottom + 5) {
      qMap[p.qNum].push(item);
      break;
    }
  }
}

// Format each question's text
const formatted = {};
for (const [qNum, list] of Object.entries(qMap)) {
  // Sort by y, then by x
  list.sort((a, b) => {
    if (Math.abs(a.y - b.y) > 6) return a.y - b.y;
    return a.x - b.x;
  });
  formatted[qNum] = list.map(i => i.str).join(' ');
}

fs.writeFileSync('backend/scripts/bond_q_text_items.json', JSON.stringify(formatted, null, 2));
console.log('Saved grouped text items for all questions.');
