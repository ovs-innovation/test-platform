import fs from 'fs';

const pdfItems = JSON.parse(fs.readFileSync('./backend/scripts/df_pdf_items.json', 'utf8'));
const qPositions = JSON.parse(fs.readFileSync('./backend/scripts/df_q_positions.json', 'utf8'));

const pageItems = {};
for (const item of pdfItems) {
  if (!pageItems[item.pageNum]) pageItems[item.pageNum] = [];
  pageItems[item.pageNum].push(item);
}

const pageQs = {};
for (const q of qPositions) {
  if (!pageQs[q.pageNum]) pageQs[q.pageNum] = [];
  pageQs[q.pageNum].push(q);
}

const qTextMap = {};

for (let pageNum = 2; pageNum <= 22; pageNum++) {
  const qs = pageQs[pageNum] || [];
  const items = pageItems[pageNum] || [];

  for (let i = 0; i < qs.length; i++) {
    const curQ = qs[i];
    const nextQ = qs[i + 1];

    const startY = curQ.y - 10;
    const endY = nextQ ? nextQ.y - 10 : 1560;

    const matchedItems = items.filter(it => it.y >= startY && it.y < endY);
    matchedItems.sort((a, b) => {
      if (Math.abs(a.y - b.y) < 6) return a.x - b.x;
      return a.y - b.y;
    });

    qTextMap[curQ.qNum] = matchedItems.map(it => it.str).join(' ');
  }
}

fs.writeFileSync('./backend/scripts/df_q_text_items.json', JSON.stringify(qTextMap, null, 2));
console.log(`Mapped text items for ${Object.keys(qTextMap).length} questions.`);

