import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/biotech_pages_dump.json', 'utf8'));

// Filter out header/footer lines and combine text
let allLines = [];
for (let p = 0; p < 33; p++) { // Questions are on pages 1 to 33
  const page = pages[p];
  for (const line of page.lines) {
    if (line.includes('Exam GOAL') || line.includes('P Y Q   P D F') || line.includes('Keep practising on the ExamGOAL app') || line.includes('Chapter-wise PYQs with solutions') || line.includes('NEET Biology: Biotechnology: Principles and Processes') || line.includes('MCQ (Single Correct Answer)') || line.includes('MCQ (More than One Correct Answer)')) {
      continue;
    }
    // Clean line
    let cleaned = line.replace(/Open solution/gi, '').trim();
    if (cleaned) {
      allLines.push(cleaned);
    }
  }
}

console.log(`Total cleaned lines: ${allLines.length}`);

// Find all question boundaries: Q1., Q2., ..., Q143.
const qPositions = [];
for (let i = 0; i < allLines.length; i++) {
  const line = allLines[i];
  const m = line.match(/^Q(\d+)\.\s*(.*)/);
  if (m) {
    qPositions.push({
      num: parseInt(m[1]),
      lineIndex: i,
      headerText: m[2]
    });
  }
}

console.log(`Found ${qPositions.length} question markers.`);
for (let i = 1; i <= 143; i++) {
  const found = qPositions.find(q => q.num === i);
  if (!found) {
    console.error(`Missing marker for Q${i}!`);
  }
}
