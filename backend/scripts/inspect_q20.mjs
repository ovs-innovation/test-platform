import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/biotech_pages_dump.json', 'utf8'));

// Build continuous stream
const allLines = [];
for (let p = 0; p < 33; p++) {
  const page = pages[p];
  for (const rawLine of page.lines) {
    if (
      rawLine.includes('Exam GOAL') ||
      rawLine.includes('P Y Q   P D F') ||
      rawLine.includes('Keep practising on the ExamGOAL app') ||
      rawLine.includes('Chapter-wise PYQs with solutions') ||
      rawLine.includes('NEET Biology: Biotechnology: Principles and Processes') ||
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

const idx20 = qBlocks.findIndex(q => q.num === 20);
const nextStart = qBlocks[idx20 + 1].startIndex;
console.log('Q20 lines:\n' + allLines.slice(qBlocks[idx20].startIndex, nextStart).join('\n'));
