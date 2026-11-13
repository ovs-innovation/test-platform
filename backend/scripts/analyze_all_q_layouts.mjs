import fs from 'fs';

const items = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_pdf_items.json', 'utf8'));
const positions = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_q_positions.json', 'utf8'));

const analysis = [];

for (let i = 0; i < positions.length; i++) {
  const current = positions[i];
  const qNum = current.qNum;
  const pageNum = current.pageNum;
  const yStart = current.y - 15;
  const nextOnPage = positions.find((p, idx) => idx > i && p.pageNum === pageNum);
  const yEnd = nextOnPage ? nextOnPage.y - 15 : 1540;

  const qItems = items.filter(it => it.pageNum === pageNum && it.y >= yStart && it.y < yEnd && it.y <= 1540);
  
  // Find option markers
  const optA = qItems.find(it => /^\(A\)$/i.test(it.str.trim()));
  const optB = qItems.find(it => /^\(B\)$/i.test(it.str.trim()));
  const optC = qItems.find(it => /^\(C\)$/i.test(it.str.trim()));
  const optD = qItems.find(it => /^\(D\)$/i.test(it.str.trim()));

  // Question header text (excluding QX. and exam tag)
  const nonHeader = qItems.filter(it => !/^Q\d+\.?$/i.test(it.str.trim()) && !/NEET|AIPMT|RE-NEET/i.test(it.str.trim()) && it.str.trim() !== 'Open solution');
  
  // Find question stem items (items before optA)
  const stemItems = optA ? qItems.filter(it => it.y < optA.y && it.str.trim() !== 'Open solution') : nonHeader;

  // Measure gaps
  let qDiagGap = 0;
  if (optA && stemItems.length > 0) {
    const maxStemY = Math.max(...stemItems.map(it => it.y));
    qDiagGap = optA.y - maxStemY;
  }

  let optGapAB = 0;
  let optGapBC = 0;
  let optGapCD = 0;
  if (optA && optB) optGapAB = optB.y - optA.y;
  if (optB && optC) optGapBC = optC.y - optB.y;
  if (optC && optD) optGapCD = optD.y - optC.y;

  analysis.push({
    qNum,
    pageNum,
    yStart,
    yEnd,
    stemItemsCount: stemItems.length,
    hasOpts: !!(optA && optB && optC && optD),
    optA_y: optA?.y,
    optB_y: optB?.y,
    optC_y: optC?.y,
    optD_y: optD?.y,
    qDiagGap,
    optGapAB,
    optGapBC,
    optGapCD,
    stemSnippet: stemItems.map(it => it.str).join(' ').slice(0, 80)
  });
}

fs.writeFileSync('./backend/scripts/hydrocarbons_layout_analysis.json', JSON.stringify(analysis, null, 2));

// Summary of large gaps
const qWithLargeStemGap = analysis.filter(a => a.qDiagGap > 70);
const qWithLargeOptGaps = analysis.filter(a => a.optGapAB > 70 || a.optGapBC > 70 || a.optGapCD > 70);

console.log(`Questions with diagram in stem (gap > 70px):`, qWithLargeStemGap.map(a => a.qNum));
console.log(`Questions with diagram in options (gap > 70px):`, qWithLargeOptGaps.map(a => a.qNum));

