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

function getQ(num) {
  const idx = qStarts.findIndex(q => q.num === num);
  const cur = qStarts[idx];
  const next = qStarts[idx + 1];
  const qLines = linesWithMeta.slice(cur.lineIndex, next ? next.lineIndex : linesWithMeta.length);
  return qLines.map(l => l.text).filter(t => 
    !t.includes('Keep practising on the ExamGOAL') &&
    !t.includes('NEET Biology: Animal Kingdom') &&
    !t.includes('Solutions: questions.examside.com') &&
    !t.includes('Exam GOAL') &&
    !t.includes('Page ')
  ).join('\n');
}

const targetNums = [12, 16, 18, 20, 26, 31, 33, 35, 38, 41, 42, 43, 46, 70, 74, 79, 81, 84, 95, 99, 124, 202];
for (const n of targetNums) {
  console.log(`\n=================== Q${n} ===================`);
  console.log(getQ(n));
}

