import fs from 'fs';

const qPos = JSON.parse(fs.readFileSync('backend/scripts/organic_q_positions.json', 'utf8'));

const targets = [39, 40, 44, 46, 47, 51, 52, 53, 55, 56, 57, 60, 62, 63, 64, 65, 66, 70];
for (const qNum of targets) {
  const item = qPos.find(p => p.qNum === qNum);
  const nextItem = qPos.find(p => p.qNum === qNum + 1);
  console.log(`Q${qNum}: pageNum ${item.pageNum}, y=${item.y.toFixed(1)}, nextQ pageNum=${nextItem ? nextItem.pageNum : 'end'}, nextQ y=${nextItem ? nextItem.y.toFixed(1) : 'end'}`);
}
