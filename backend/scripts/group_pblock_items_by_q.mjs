import fs from 'fs';

const items = JSON.parse(fs.readFileSync('./backend/scripts/pblock_pdf_items.json', 'utf8'));
const positions = JSON.parse(fs.readFileSync('./backend/scripts/pblock_q_positions.json', 'utf8'));

// Filter out footer items (y > 1500) and header items (y < 120)
const validItems = items.filter(it => it.pageNum >= 2 && it.pageNum <= 34 && it.y >= 120 && it.y <= 1520);

// For each question, find its bounding box [yStart, yEnd] on its page
const qMap = {};

for (let i = 0; i < positions.length; i++) {
  const current = positions[i];
  const qNum = current.qNum;
  const pageNum = current.pageNum;
  const yStart = current.y - 15;

  // Next question on the same page or bottom of page
  const nextOnPage = positions.find((p, idx) => idx > i && p.pageNum === pageNum);
  const yEnd = nextOnPage ? nextOnPage.y - 15 : 1520;

  const pageItems = validItems.filter(it => it.pageNum === pageNum && it.y >= yStart && it.y < yEnd);
  // Sort items reading order: by y (within tolerance) then x
  pageItems.sort((a,b) => {
    if (Math.abs(a.y - b.y) > 8) return a.y - b.y;
    return a.x - b.x;
  });

  qMap[qNum] = pageItems.map(it => it.str).join(' ');
}

fs.writeFileSync('./backend/scripts/pblock_q_text_items.json', JSON.stringify(qMap, null, 2));
console.log(`Saved grouped text items for ${Object.keys(qMap).length} questions.`);

