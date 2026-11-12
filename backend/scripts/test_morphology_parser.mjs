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

// Group into question blocks
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

console.log(`Total question blocks identified: ${qBlocks.length}`);

// Check which questions are missing or have option parsing issues
const issues = [];
for (const b of qBlocks) {
  const fullText = b.lines.join(' ');
  // Check if options (A) ... (B) ... (C) ... (D) are present
  const aIdx = fullText.indexOf('(A)');
  const bIdx = fullText.indexOf('(B)');
  const cIdx = fullText.indexOf('(C)');
  const dIdx = fullText.indexOf('(D)');

  if (aIdx === -1 || bIdx === -1 || cIdx === -1 || dIdx === -1) {
    issues.push({ qNum: b.qNum, fullText: fullText.slice(0, 100) });
  }
}

console.log(`Questions needing custom options or layout: ${issues.length}`);
console.log(issues);
