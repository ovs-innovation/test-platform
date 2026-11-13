import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/plant_growth_pages_dump.json', 'utf8'));

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 22)) {
  const items = [...p.items];
  items.sort((a, b) => {
    if (Math.abs(b.y - a.y) > 3) return b.y - a.y;
    return a.x - b.x;
  });

  let currentY = null;
  let currentLineItems = [];

  for (const item of items) {
    if (currentY === null || Math.abs(item.y - currentY) > 3) {
      if (currentLineItems.length > 0) {
        const text = currentLineItems.map(i => i.str).join(' ').trim();
        linesWithMeta.push({ page: p.page, text });
      }
      currentLineItems = [item];
      currentY = item.y;
    } else {
      currentLineItems.push(item);
    }
  }
  if (currentLineItems.length > 0) {
    const text = currentLineItems.map(i => i.str).join(' ').trim();
    linesWithMeta.push({ page: p.page, text });
  }
}

// Find Q start indices
const qStarts = [];
for (let i = 0; i < linesWithMeta.length; i++) {
  const line = linesWithMeta[i].text;
  const m = line.match(/^Q(\d+)\.\s*(.*)$/);
  if (m) {
    qStarts.push({
      num: parseInt(m[1]),
      lineIndex: i,
      page: linesWithMeta[i].page
    });
  }
}

const parsedQuestions = [];
const failures = [];

for (let i = 0; i < qStarts.length; i++) {
  const cur = qStarts[i];
  const next = qStarts[i + 1];
  const endIdx = next ? next.lineIndex : linesWithMeta.length;

  const rawLines = linesWithMeta.slice(cur.lineIndex, endIdx)
    .map(l => l.text)
    .filter(t => !/ExamGOAL|P Y Q P D F|Open solution|Keep practising|Chapter-wise PYQs|NEET Biology:|Google Play|GET IT ON|MCQ \(|Out of syllabus|These questions are on topics/i.test(t));

  // Line 0 is exam header!
  const questionContentLines = rawLines.slice(1);
  const combined = questionContentLines.join(' ').trim();

  // Find options
  const aIdx = combined.search(/\(A\)\s+/);
  const bIdx = combined.search(/\(B\)\s+/);
  const cIdx = combined.search(/\(C\)\s+/);
  const dIdx = combined.search(/\(D\)\s+/);

  if (aIdx === -1 || bIdx === -1 || cIdx === -1 || dIdx === -1) {
    failures.push({ num: cur.num, text: combined });
    continue;
  }

  const qText = combined.substring(0, aIdx).trim();
  const optA = combined.substring(aIdx + 3, bIdx).trim();
  const optB = combined.substring(bIdx + 3, cIdx).trim();
  const optC = combined.substring(cIdx + 3, dIdx).trim();
  const optD = combined.substring(dIdx + 3).trim();

  parsedQuestions.push({
    num: cur.num,
    qText,
    options: [optA, optB, optC, optD]
  });
}

console.log(`Successfully parsed: ${parsedQuestions.length} / 135`);
console.log('Failures count:', failures.length);
if (failures.length > 0) {
  console.log('Failures:', failures);
} else {
  console.log('Sample parsed questions:');
  console.log('Q118:', parsedQuestions.find(q => q.num === 118));
  console.log('Q135:', parsedQuestions.find(q => q.num === 135));
}

