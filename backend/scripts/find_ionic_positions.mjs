import fs from 'fs';

const items = JSON.parse(fs.readFileSync('backend/scripts/ionic_pdf_items.json', 'utf8'));

// Find occurrences of Q1., Q2., etc.
const qPos = {};

for (let i = 0; i < items.length; i++) {
  const it = items[i];
  const str = it.str.trim();

  // Pattern Q1., Q2. or "Q" followed by "1." or "Q1" followed by "."
  const m1 = str.match(/^Q(\d+)\.?$/);
  if (m1) {
    const qNum = parseInt(m1[1], 10);
    if (qNum >= 1 && qNum <= 89 && !qPos[qNum]) {
      qPos[qNum] = { page: it.page, y: it.y, x: it.x, str };
      continue;
    }
  }

  // Check if it.str is "Q" and next item is "1." etc.
  if (str === 'Q' && i + 1 < items.length) {
    const next = items[i + 1].str.trim();
    const m2 = next.match(/^(\d+)\.?$/);
    if (m2) {
      const qNum = parseInt(m2[1], 10);
      if (qNum >= 1 && qNum <= 89 && !qPos[qNum]) {
        qPos[qNum] = { page: it.page, y: it.y, x: it.x, str: `Q${next}` };
        continue;
      }
    }
  }
}

console.log(`Found ${Object.keys(qPos).length} / 89 question headers.`);
for (let q = 1; q <= 89; q++) {
  if (!qPos[q]) {
    console.warn(`Missing question Q${q}!`);
  }
}

fs.writeFileSync('backend/scripts/ionic_q_positions.json', JSON.stringify(qPos, null, 2));
console.log('Saved ionic_q_positions.json');
