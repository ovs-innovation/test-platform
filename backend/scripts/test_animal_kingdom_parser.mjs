import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/animal_kingdom_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/animal_kingdom_official_keys.json', 'utf8'));

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 43)) {
  const items = [...p.items];
  items.sort((a, b) => (Math.abs(b.y - a.y) > 3) ? (b.y - a.y) : (a.x - b.x));

  let currentY = null;
  let currentLineItems = [];

  for (const item of items) {
    if (currentY === null || Math.abs(item.y - currentY) > 3) {
      if (currentLineItems.length > 0) {
        linesWithMeta.push({ page: p.page, text: currentLineItems.map(i => i.str).join(' ').trim() });
      }
      currentLineItems = [item];
      currentY = item.y;
    } else {
      currentLineItems.push(item);
    }
  }
  if (currentLineItems.length > 0) {
    linesWithMeta.push({ page: p.page, text: currentLineItems.map(i => i.str).join(' ').trim() });
  }
}

// Find Q start indices
const qStarts = [];
for (let i = 0; i < linesWithMeta.length; i++) {
  const m = linesWithMeta[i].text.match(/^Q(\d+)\.\s*(.*)$/);
  if (m) {
    qStarts.push({
      num: parseInt(m[1]),
      lineIndex: i,
      page: linesWithMeta[i].page,
      header: m[2].trim()
    });
  }
}

console.log(`Found ${qStarts.length} question markers in document.`);

// Check option parsing for each question
const problematic = [];

for (let i = 0; i < qStarts.length; i++) {
  const current = qStarts[i];
  const next = qStarts[i + 1];
  const qLines = linesWithMeta.slice(current.lineIndex, next ? next.lineIndex : linesWithMeta.length);

  // Extract raw text
  const rawTexts = qLines.map(l => l.text).filter(t => 
    !t.includes('Keep practising on the ExamGOAL') &&
    !t.includes('NEET Biology: Animal Kingdom') &&
    !t.includes('Solutions: questions.examside.com') &&
    !t.includes('Exam GOAL') &&
    !t.includes('Page ')
  );

  const fullText = rawTexts.join('\n');

  // Let's check for (A), (B), (C), (D)
  const hasA = /\(A\)/.test(fullText);
  const hasB = /\(B\)/.test(fullText);
  const hasC = /\(C\)/.test(fullText);
  const hasD = /\(D\)/.test(fullText);

  if (!hasA || !hasB || !hasC || !hasD) {
    problematic.push({ num: current.num, page: current.page, hasA, hasB, hasC, hasD });
  }
}

console.log(`Problematic questions count: ${problematic.length}`);
if (problematic.length > 0) {
  console.log('Problematic list:', problematic);
}

