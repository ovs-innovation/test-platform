import fs from 'fs';

const rawText = fs.readFileSync('./backend/scripts/cell_cycle_extracted_lines.txt', 'utf8');
const lines = rawText.split('\n');

const matchQNums = [3, 6, 7, 11, 20, 32, 39, 41, 53, 59];

for (const qNum of matchQNums) {
  const startIdx = lines.findIndex(l => l.startsWith(`Q${qNum}.`));
  const endIdx = lines.findIndex((l, idx) => idx > startIdx && l.match(/^Q\d+\./));
  const qLines = lines.slice(startIdx, endIdx !== -1 ? endIdx : startIdx + 20)
    .filter(l => !l.includes('=== PAGE') && !l.includes('Exam GOAL') && !l.includes('Keep practising'));
  console.log(`\n================== Q${qNum} ==================`);
  console.log(qLines.join('\n'));
}

