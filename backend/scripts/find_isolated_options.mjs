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

for (let i = 0; i < qBlocks.length; i++) {
  const qb = qBlocks[i];
  const nextStart = (i + 1 < qBlocks.length) ? qBlocks[i + 1].startIndex : allLines.length;
  const blockLines = allLines.slice(qb.startIndex, nextStart);
  
  // Look for (A) without following text on the same line or next line
  for (let j = 0; j < blockLines.length; j++) {
    const l = blockLines[j];
    if (l === '(A)' || l === '(B)' || l === '(C)' || l === '(D)') {
      console.log(`Q${qb.num} has isolated option marker: "${l}" at line ${j} of block`);
    }
  }
}
