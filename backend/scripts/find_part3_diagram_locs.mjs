import fs from 'fs';

const qPos = JSON.parse(fs.readFileSync('backend/scripts/organic_q_positions.json', 'utf8'));

const targets = [72, 73, 77, 78, 79, 81, 82, 83, 88, 89, 90, 94, 95, 97, 100, 102];
for (const qNum of targets) {
  const item = qPos.find(p => p.qNum === qNum);
  const nextItem = qPos.find(p => p.qNum === qNum + 1);
  console.log(`Q${qNum}: pageNum ${item.pageNum}, y=${item.y.toFixed(1)}, nextQ pageNum=${nextItem ? nextItem.pageNum : 'end'}, nextQ y=${nextItem ? nextItem.y.toFixed(1) : 'end'}`);
}

