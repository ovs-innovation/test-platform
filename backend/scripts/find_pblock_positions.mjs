import fs from 'fs';

const items = JSON.parse(fs.readFileSync('./backend/scripts/pblock_pdf_items.json', 'utf8'));

// Search for Q1., Q2., ... Q161.
const qPositions = [];
for (let q = 1; q <= 161; q++) {
  const re = new RegExp(`^Q${q}\\.$`, 'i');
  const found = items.filter(it => re.test(it.str.trim()) && it.pageNum >= 2 && it.pageNum <= 34);
  if (found.length > 0) {
    // Pick the leftmost/topmost item
    found.sort((a,b) => a.y - b.y);
    const item = found[0];
    qPositions.push({
      qNum: q,
      pageNum: item.pageNum,
      x: item.x,
      y: item.y,
      str: item.str
    });
  } else {
    // Try matching if Q{q} and . are separate or preceded by space
    const alt = items.filter(it => (it.str.trim() === `Q${q}` || it.str.trim().startsWith(`Q${q}.`)) && it.pageNum >= 2 && it.pageNum <= 34);
    if (alt.length > 0) {
      alt.sort((a,b) => a.y - b.y);
      const item = alt[0];
      qPositions.push({
        qNum: q,
        pageNum: item.pageNum,
        x: item.x,
        y: item.y,
        str: item.str
      });
    } else {
      console.warn(`Could not find marker for Q${q}!`);
    }
  }
}

console.log(`Found markers for ${qPositions.length} / 161 questions.`);
fs.writeFileSync('./backend/scripts/pblock_q_positions.json', JSON.stringify(qPositions, null, 2));

