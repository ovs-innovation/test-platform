import fs from 'fs';

const items = JSON.parse(fs.readFileSync('backend/scripts/solutions_pdf_items.json', 'utf8'));

const qPos = {};

for (let i = 0; i < items.length; i++) {
  const it = items[i];
  const str = it.str.trim();

  const m1 = str.match(/^Q(\d+)\.?$/);
  if (m1) {
    const qNum = parseInt(m1[1], 10);
    if (qNum >= 1 && qNum <= 70 && !qPos[qNum]) {
      qPos[qNum] = { page: it.page, y: it.y, x: it.x, str };
      continue;
    }
  }

  if (str === 'Q' && i + 1 < items.length) {
    const next = items[i + 1].str.trim();
    const m2 = next.match(/^(\d+)\.?$/);
    if (m2) {
      const qNum = parseInt(m2[1], 10);
      if (qNum >= 1 && qNum <= 70 && !qPos[qNum]) {
        qPos[qNum] = { page: it.page, y: it.y, x: it.x, str: `Q${next}` };
        continue;
      }
    }
  }
}

console.log(`Found ${Object.keys(qPos).length} / 70 question headers.`);
for (let q = 1; q <= 70; q++) {
  if (!qPos[q]) {
    console.warn(`Missing question Q${q}!`);
  }
}

fs.writeFileSync('backend/scripts/solutions_q_positions.json', JSON.stringify(qPos, null, 2));
console.log('Saved solutions_q_positions.json');
