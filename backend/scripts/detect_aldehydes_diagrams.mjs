import fs from 'fs';

const items = JSON.parse(fs.readFileSync('./backend/scripts/aldehydes_pdf_items.json', 'utf8'));
const qPositions = JSON.parse(fs.readFileSync('./backend/scripts/aldehydes_q_positions.json', 'utf8'));

console.log(`Analyzing ${qPositions.length} questions for diagrams and structures...`);

const report = [];

for (let i = 0; i < qPositions.length; i++) {
  const current = qPositions[i];
  const next = qPositions[i + 1];

  const qItems = items.filter(it => {
    if (it.pageNum === current.pageNum) {
      if (it.y >= current.y - 15) {
        if (next && next.pageNum === current.pageNum) {
          return it.y < next.y - 10;
        }
        return true;
      }
    }
    return false;
  });

  const text = qItems.map(it => it.str.trim()).join(' ');
  const hasA = qItems.some(it => /^\(A\)/.test(it.str.trim()));
  const hasB = qItems.some(it => /^\(B\)/.test(it.str.trim()));
  const hasC = qItems.some(it => /^\(C\)/.test(it.str.trim()));
  const hasD = qItems.some(it => /^\(D\)/.test(it.str.trim()));

  report.push({
    qNum: current.qNum,
    pageNum: current.pageNum,
    y: current.y,
    nextY: next && next.pageNum === current.pageNum ? next.y : 800,
    height: (next && next.pageNum === current.pageNum ? next.y : 800) - current.y,
    textPreview: text.substring(0, 100),
    hasA, hasB, hasC, hasD
  });
}

console.log(`Questions with height > 250 (likely have diagrams):`);
const large = report.filter(r => r.height > 200);
console.log(large.map(r => `Q${r.qNum} (p${r.pageNum}, h:${Math.round(r.height)})`).join(', '));

fs.writeFileSync('./backend/scripts/aldehydes_structure_report.json', JSON.stringify(report, null, 2));

