import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_sliced_questions.json'), 'utf8'));
const positions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_q_positions.json'), 'utf8'));
const items = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_pdf_items.json'), 'utf8'));

function isValidContentItem(it) {
  if (it.x > 950) return false;
  if (/^Open solution$/i.test(it.str.trim())) return false;
  return true;
}

const categorized = [];

for (const q of questions) {
  const qNum = q.qNum;
  const pos = positions.find(p => p.qNum === qNum);
  const pNum = pos.pageNum;
  const nextPos = positions.find(p => p.pageNum === pNum && p.y > pos.y);
  const yEnd = nextPos ? nextPos.y : 1530;

  const qItems = items
    .filter(it => it.pageNum === pNum && it.y >= pos.y - 5 && it.y < yEnd && isValidContentItem(it))
    .sort((a,b) => a.y - b.y);

  // Find option items
  const optA = qItems.find(it => /^\(?A\)?$/i.test(it.str.trim()) || it.str.trim().startsWith('(A)'));
  const optB = qItems.find(it => /^\(?B\)?$/i.test(it.str.trim()) || it.str.trim().startsWith('(B)'));
  const optC = qItems.find(it => /^\(?C\)?$/i.test(it.str.trim()) || it.str.trim().startsWith('(C)'));
  const optD = qItems.find(it => /^\(?D\)?$/i.test(it.str.trim()) || it.str.trim().startsWith('(D)'));

  let hasStemDiag = false;
  let hasOptionDiags = false;
  let optionLayout = 'none'; // 'vertical', 'horizontal', '2x2', 'unknown'
  let stemGap = 0;
  let stemTop = pos.y + 25;
  let stemBottom = optA ? optA.y - 10 : yEnd - 10;

  if (q.type === 'numerical') {
    // Numerical question: check gap inside question
    // Stem gap is from pos.y to yEnd
    stemBottom = yEnd - 10;
    // Check if there is a gap inside items
    let maxGap = 0;
    for (let i = 0; i < qItems.length - 1; i++) {
      const g = qItems[i+1].y - qItems[i].y;
      if (g > maxGap) maxGap = g;
    }
    if (maxGap > 60) {
      hasStemDiag = true;
    }
  } else if (optA && optB && optC && optD) {
    // Determine option layout
    if (Math.abs(optA.y - optB.y) < 15 && Math.abs(optB.y - optC.y) < 15 && Math.abs(optC.y - optD.y) < 15) {
      optionLayout = 'horizontal';
    } else if (Math.abs(optA.y - optB.y) < 15 && Math.abs(optC.y - optD.y) < 15 && (optC.y - optA.y) > 20) {
      optionLayout = '2x2';
    } else if (optB.y > optA.y + 15 && optC.y > optB.y + 15 && optD.y > optC.y + 15) {
      optionLayout = 'vertical';
    } else {
      optionLayout = 'mixed';
    }

    // Check if options have diagrams
    if (optionLayout === 'vertical') {
      const gapAB = optB.y - optA.y;
      const gapBC = optC.y - optB.y;
      const gapCD = optD.y - optC.y;
      if (gapAB > 65 || gapBC > 65 || gapCD > 65) {
        hasOptionDiags = true;
      }
    } else if (optionLayout === '2x2') {
      const gapRows = optC.y - optA.y;
      if (gapRows > 90) {
        hasOptionDiags = true;
      }
    }

    // Check stem diagram
    const stemItems = qItems.filter(it => it.y < optA.y - 5);
    // Find gaps inside stem items
    let maxStemGap = 0;
    for (let i = 0; i < stemItems.length - 1; i++) {
      const g = stemItems[i+1].y - stemItems[i].y;
      if (g > maxStemGap) maxStemGap = g;
    }
    const lastStemItem = stemItems.sort((a,b) => b.y - a.y)[0];
    const gapToOptA = lastStemItem ? (optA.y - (lastStemItem.y + (lastStemItem.height || 15))) : (optA.y - pos.y);

    if (maxStemGap > 55 || gapToOptA > 55) {
      hasStemDiag = true;
      stemGap = Math.max(maxStemGap, gapToOptA);
    }
  }

  categorized.push({
    qNum,
    pageNum: pNum,
    type: q.type,
    hasStemDiag,
    hasOptionDiags,
    optionLayout,
    stemGap: Math.round(stemGap)
  });
}

const stemDiagCount = categorized.filter(c => c.hasStemDiag).length;
const optDiagCount = categorized.filter(c => c.hasOptionDiags).length;
const bothDiagCount = categorized.filter(c => c.hasStemDiag && c.hasOptionDiags).length;
const neitherCount = categorized.filter(c => !c.hasStemDiag && !c.hasOptionDiags).length;

console.log(`Stem diagrams: ${stemDiagCount}`);
console.log(`Option diagrams: ${optDiagCount}`);
console.log(`Both diagrams: ${bothDiagCount}`);
console.log(`Neither (pure text): ${neitherCount}`);
console.log(`Total: ${categorized.length}`);

fs.writeFileSync(path.resolve(__dirname, 'goc_categorized_questions.json'), JSON.stringify(categorized, null, 2));
