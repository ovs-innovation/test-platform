import fs from 'fs';

const items = JSON.parse(fs.readFileSync('./backend/scripts/alcohols_pdf_items.json', 'utf8'));
const qPositions = JSON.parse(fs.readFileSync('./backend/scripts/alcohols_q_positions.json', 'utf8'));

function inspectQuestion(qNum) {
  const cur = qPositions.find(q => q.qNum === qNum);
  if (!cur) return console.log(`Q${qNum} not found`);
  const next = qPositions.find(q => q.qNum === qNum + 1);

  const qItems = items.filter(it => {
    if (it.page < cur.page) return false;
    if (next && it.page > next.page) return false;
    if (it.page === cur.page && it.y < cur.y - 5) return false;
    if (next && it.page === next.page && it.y >= next.y - 5) return false;
    if (it.y > 780 || it.y < 50) return false;
    if (it.text.includes('Open solution')) return false;
    return true;
  });

  console.log(`\n================ QUESTION ${qNum} (Page ${cur.page}, Y: ${cur.y}) ================`);
  for (const it of qItems) {
    console.log(`[P${it.page} X:${it.x} Y:${it.y} W:${it.w} H:${it.h}] ${it.text}`);
  }
}

const targetQuestions = process.argv.slice(2).map(Number);
for (const q of targetQuestions) {
  inspectQuestion(q);
}

