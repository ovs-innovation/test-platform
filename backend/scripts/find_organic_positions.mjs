import fs from 'fs';

const items = JSON.parse(fs.readFileSync('./backend/scripts/organic_pdf_items.json', 'utf8'));

// Search for Q1., Q2., ... Q130.
const qPositions = [];
for (let q = 1; q <= 130; q++) {
  const re = new RegExp(`^Q${q}\\.$`, 'i');
  const found = items.filter(it => re.test(it.str.trim()) && it.pageNum >= 2 && it.pageNum <= 55);
  if (found.length > 0) {
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
    const alt = items.filter(it => (it.str.trim() === `Q${q}` || it.str.trim().startsWith(`Q${q}.`)) && it.pageNum >= 2 && it.pageNum <= 55);
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

console.log(`Found markers for ${qPositions.length} / 130 questions.`);
fs.writeFileSync('./backend/scripts/organic_q_positions.json', JSON.stringify(qPositions, null, 2));

