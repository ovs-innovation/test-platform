import fs from 'fs';

const items = JSON.parse(fs.readFileSync('./backend/scripts/alcohols_pdf_items.json', 'utf8'));
const qPositions = JSON.parse(fs.readFileSync('./backend/scripts/alcohols_q_positions.json', 'utf8'));

console.log('--- Scanning all questions for potential diagrams / images ---');
for (let i = 0; i < qPositions.length; i++) {
  const cur = qPositions[i];
  const next = qPositions[i + 1];

  const qItems = items.filter(it => {
    if (it.page < cur.page) return false;
    if (next && it.page > next.page) return false;
    if (it.page === cur.page && it.y < cur.y - 5) return false;
    if (next && it.page === next.page && it.y >= next.y - 5) return false;
    if (it.y > 780 || it.y < 50) return false;
    if (it.text.includes('Open solution')) return false;
    return true;
  });

  const full = qItems.map(it => it.text).join(' ');
  const hasOptions = full.includes('(A)') && full.includes('(B)');
  const optAIndex = qItems.findIndex(it => it.text.trim() === '(A)');
  
  // Check height difference
  let yDiff = 0;
  if (next && next.page === cur.page) {
    yDiff = next.y - cur.y;
  }

  // Check if options have very short text or if there is vertical gap > 40 between items
  let maxGap = 0;
  for (let j = 0; j < qItems.length - 1; j++) {
    if (qItems[j+1].page === qItems[j].page) {
      const g = qItems[j+1].y - qItems[j].y;
      if (g > maxGap) maxGap = g;
    }
  }

  const suspicious = maxGap > 45 || !hasOptions || full.includes('following') || full.includes('structure') || full.includes('reaction') || full.includes('Match');
  if (suspicious) {
    console.log(`Q${cur.qNum} (P${cur.page}, Y:${cur.y}, H-span:${yDiff}): maxGap=${maxGap}, text: "${full.slice(0, 80)}..."`);
  }
}

