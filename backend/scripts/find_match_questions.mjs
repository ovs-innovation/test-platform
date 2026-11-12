import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/animal_kingdom_pages_dump.json', 'utf8'));

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

const matchQuestions = [];

for (let i = 0; i < qStarts.length; i++) {
  const current = qStarts[i];
  const next = qStarts[i + 1];
  const qLines = linesWithMeta.slice(current.lineIndex, next ? next.lineIndex : linesWithMeta.length);

  const rawTexts = qLines.map(l => l.text).filter(t => 
    !t.includes('Keep practising on the ExamGOAL') &&
    !t.includes('NEET Biology: Animal Kingdom') &&
    !t.includes('Solutions: questions.examside.com') &&
    !t.includes('Exam GOAL') &&
    !t.includes('Page ')
  );

  const fullText = rawTexts.join('\n');
  if (/Match/i.test(fullText) || /Column\s*[-–I]/i.test(fullText) || /List\s*[-–I]/i.test(fullText)) {
    matchQuestions.push({ num: current.num, page: current.page, text: fullText.slice(0, 150) });
  }
}

console.log(`Found ${matchQuestions.length} Match questions:`);
console.log(matchQuestions.map(m => m.num).join(', '));
for (const mq of matchQuestions) {
  console.log(`\n--- Q${mq.num} (Page ${mq.page}) ---`);
  console.log(mq.text);
}
