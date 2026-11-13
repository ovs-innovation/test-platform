import fs from 'fs';

const items = JSON.parse(fs.readFileSync('./backend/scripts/aldehydes_pdf_items.json', 'utf8'));
const qPos = JSON.parse(fs.readFileSync('./backend/scripts/aldehydes_q_positions.json', 'utf8'));

const questionsData = {};

for (let i = 0; i < qPos.length; i++) {
  const cur = qPos[i];
  const next = qPos[i + 1];

  const qItems = items.filter(it => {
    if (it.pageNum !== cur.pageNum) return false;
    // between cur.y and next.y (or bottom of page)
    if (it.y < cur.y - 12) return false;
    if (next && next.pageNum === cur.pageNum && it.y >= next.y - 10) return false;
    // ignore header/footer
    if (it.y < 50 || it.y > 780) return false;
    // ignore QR code text on top right
    if (it.x > 480 && it.y < 200) return false;
    return true;
  });

  // Sort top-to-bottom, left-to-right
  qItems.sort((a, b) => {
    if (Math.abs(a.y - b.y) < 6) return a.x - b.x;
    return a.y - b.y;
  });

  questionsData[cur.qNum] = {
    qNum: cur.qNum,
    pageNum: cur.pageNum,
    rawText: qItems.map(it => it.str).join(' ')
  };
}

fs.writeFileSync('./backend/scripts/aldehydes_ocr.json', JSON.stringify(questionsData, null, 2));
console.log('Organized text for 138 questions into aldehydes_ocr.json');

