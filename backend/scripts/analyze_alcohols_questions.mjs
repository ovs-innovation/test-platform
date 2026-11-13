import fs from 'fs';

const qPositions = JSON.parse(fs.readFileSync('./backend/scripts/alcohols_q_positions.json', 'utf8'));
const items = JSON.parse(fs.readFileSync('./backend/scripts/alcohols_pdf_items.json', 'utf8'));

// Group items by question
const questionsData = [];

for (let i = 0; i < qPositions.length; i++) {
  const cur = qPositions[i];
  const next = qPositions[i + 1];

  const qItems = items.filter(it => {
    if (it.page < cur.page) return false;
    if (next && it.page > next.page) return false;
    if (it.page === cur.page && it.y < cur.y - 5) return false;
    if (next && it.page === next.page && it.y >= next.y - 5) return false;
    // Exclude header / footer
    if (it.y > 780 || it.y < 50) return false;
    if (it.text.includes('Open solution')) return false;
    return true;
  });

  questionsData.push({
    qNum: cur.qNum,
    page: cur.page,
    y: cur.y,
    nextPage: next ? next.page : 36,
    nextY: next ? next.y : 800,
    text: qItems.map(it => it.text).join(' ')
  });
}

for (const q of questionsData) {
  console.log(`Q${q.qNum} (P${q.page}): ${q.text.slice(0, 100)}...`);
}

