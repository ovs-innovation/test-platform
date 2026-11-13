import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/repro_pages_dump.json', 'utf8'));

// Build continuous line stream
const allLines = [];
for (let p = 0; p < 18; p++) {
  const page = pages[p];
  for (const rawLine of page.lines) {
    if (
      rawLine.includes('Exam GOAL') ||
      rawLine.includes('P Y Q   P D F') ||
      rawLine.includes('Keep practising on the ExamGOAL app') ||
      rawLine.includes('Chapter-wise PYQs with solutions') ||
      rawLine.includes('NEET Biology: Reproductive Health') ||
      rawLine.includes('MCQ (Single Correct Answer)') ||
      rawLine.includes('MCQ (More than One Correct Answer)')
    ) {
      continue;
    }
    const cleaned = rawLine.replace(/Open solution/gi, '').trim();
    if (cleaned) {
      allLines.push(cleaned);
    }
  }
}

const qBlocks = [];
for (let i = 0; i < allLines.length; i++) {
  const m = allLines[i].match(/^Q(\d+)\.\s*(.*)/);
  if (m) {
    qBlocks.push({
      num: parseInt(m[1]),
      startIndex: i
    });
  }
}

const idx12 = qBlocks.findIndex(q => q.num === 12);
const nextStart = qBlocks[idx12 + 1].startIndex;
console.log('Q12 lines:\n' + allLines.slice(qBlocks[idx12].startIndex, nextStart).join('\n'));
