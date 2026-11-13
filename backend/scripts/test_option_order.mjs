import fs from 'fs';

const lines = fs.readFileSync('./backend/scripts/morphology_extracted_lines.txt', 'utf8').split('\n');
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/morphology_official_keys.json', 'utf8'));

// Filter lines
const clean = [];
for (let line of lines) {
  line = line.trim();
  if (!line) continue;
  if (/^=== PAGE \d+ ===$/.test(line)) continue;
  if (/^Exam\s*GOAL$/i.test(line)) continue;
  if (/^P\s*Y\s*Q\s*P\s*D\s*F$/i.test(line)) continue;
  if (/^MCQ \(Single Correct Answer\)/i.test(line)) continue;
  if (/^Keep practising on the ExamGOAL app/i.test(line)) continue;
  if (/^Chapter-wise PYQs with solutions/i.test(line)) continue;
  if (/^NEET Biology: Morphology of Flowering Plants/i.test(line)) continue;
  if (/^Solutions: questions\.examside\.com/i.test(line)) continue;
  if (/^GET IT ON Google Play/i.test(line)) continue;
  if (/^Open solution$/i.test(line)) continue;
  if (/^Out of syllabus/i.test(line)) continue;
  if (/^These questions are on topics no longer in the current syllabus/i.test(line)) continue;
  clean.push(line);
}

const qBlocks = [];
let currentBlock = null;

for (const line of clean) {
  const match = line.match(/^Q(\d+)\.\s*(.*)$/);
  if (match) {
    if (currentBlock) qBlocks.push(currentBlock);
    currentBlock = {
      qNum: parseInt(match[1], 10),
      header: match[2],
      lines: []
    };
  } else if (currentBlock) {
    currentBlock.lines.push(line);
  }
}
if (currentBlock) qBlocks.push(currentBlock);

let cleanCount = 0;
let problemCount = 0;

for (const b of qBlocks) {
  const fullText = b.lines.join(' ');
  const aIdx = fullText.lastIndexOf('(A)');
  const bIdx = fullText.lastIndexOf('(B)');
  const cIdx = fullText.lastIndexOf('(C)');
  const dIdx = fullText.lastIndexOf('(D)');

  if (aIdx < bIdx && bIdx < cIdx && cIdx < dIdx) {
    cleanCount++;
  } else {
    problemCount++;
    console.log(`Q${b.qNum} order issue: A=${aIdx}, B=${bIdx}, C=${cIdx}, D=${dIdx}`);
  }
}

console.log(`Order check: ${cleanCount} strictly A < B < C < D, ${problemCount} order issues.`);

