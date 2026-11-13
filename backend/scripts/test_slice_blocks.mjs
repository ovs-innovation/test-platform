import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/biotech_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('backend/scripts/biotech_official_keys.json', 'utf8'));

// Build continuous stream of lines with page information
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
      allLines.push({ text: cleaned, page: p + 1 });
    }
  }
}

// Slice into individual question blocks
const qBlocks = [];
for (let i = 0; i < allLines.length; i++) {
  const m = allLines[i].text.match(/^Q(\d+)\.\s*(.*)/);
  if (m) {
    qBlocks.push({
      num: parseInt(m[1]),
      headerExam: m[2],
      startIndex: i
    });
  }
}

console.log(`Found ${qBlocks.length} question blocks.`);

const parsedQuestions = [];

for (let i = 0; i < qBlocks.length; i++) {
  const qb = qBlocks[i];
  const nextStart = (i + 1 < qBlocks.length) ? qBlocks[i + 1].startIndex : allLines.length;
  const lines = allLines.slice(qb.startIndex, nextStart);

  parsedQuestions.push({
    num: qb.num,
    exam: qb.headerExam,
    lines: lines.map(l => l.text)
  });
}

console.log(`Parsed blocks: ${parsedQuestions.length}`);

// Print a few sample blocks to check structure
console.log('Q1 lines:', parsedQuestions[0].lines);
console.log('Q2 lines:', parsedQuestions[1].lines);
console.log('Q10 lines:', parsedQuestions[9].lines);
console.log('Q11 lines:', parsedQuestions[10].lines);
console.log('Q143 lines:', parsedQuestions[142].lines);
