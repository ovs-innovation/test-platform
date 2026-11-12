import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/locomotion_pages_dump.json', 'utf8'));

const allLines = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 20)) {
  const items = [...p.items];
  items.sort((a, b) => (Math.abs(b.y - a.y) > 3) ? (b.y - a.y) : (a.x - b.x));
  let currentY = null;
  let currentLine = [];
  for (const item of items) {
    if (currentY === null || Math.abs(item.y - currentY) > 3) {
      if (currentLine.length > 0) {
        allLines.push({ page: p.page, text: currentLine.map(i => i.str).join(' ').trim() });
      }
      currentLine = [item];
      currentY = item.y;
    } else {
      currentLine.push(item);
    }
  }
  if (currentLine.length > 0) {
    allLines.push({ page: p.page, text: currentLine.map(i => i.str).join(' ').trim() });
  }
}

const qStarts = [];
for (let i = 0; i < allLines.length; i++) {
  const m = allLines[i].text.match(/^Q(\d+)\./);
  if (m) {
    qStarts.push({ qNum: parseInt(m[1]), lineIdx: i, page: allLines[i].page });
  }
}

console.log('Total Q starts found:', qStarts.length);
const foundNums = qStarts.map(q => q.qNum);
const missing = [];
for (let i = 1; i <= 78; i++) {
  if (!foundNums.includes(i)) missing.push(i);
}
console.log('Missing question numbers:', missing);

const optionIssues = [];
const matchQs = [];

for (let i = 0; i < qStarts.length; i++) {
  const startIdx = qStarts[i].lineIdx;
  const endIdx = (i + 1 < qStarts.length) ? qStarts[i+1].lineIdx : allLines.length;
  const qLines = allLines.slice(startIdx, endIdx);
  const qNum = qStarts[i].qNum;

  const cleanedLines = qLines.map(l => {
    let t = l.text.replace(/Open solution/g, '').trim();
    if (t.includes('Exam GOAL') || t.includes('Keep practising') || t.includes('Chapter-wise PYQs') || t.includes('NEET Biology:') || t.includes('MCQ (More than One Correct Answer)')) {
      return '';
    }
    return t;
  }).filter(t => t.length > 0);

  const fullText = cleanedLines.join('\n');

  const hasA = /\(A\)/.test(fullText);
  const hasB = /\(B\)/.test(fullText);
  const hasC = /\(C\)/.test(fullText);
  const hasD = /\(D\)/.test(fullText);

  if (!hasA || !hasB || !hasC || !hasD) {
    optionIssues.push({ qNum, hasA, hasB, hasC, hasD, fullText });
  }

  if (/match/i.test(fullText) || /column/i.test(fullText) || /list\s*[-i]/i.test(fullText)) {
    matchQs.push(qNum);
  }
}

console.log('Questions with missing option markers:', optionIssues.length);
for (const iss of optionIssues) {
  console.log(`Q${iss.qNum}: A:${iss.hasA} B:${iss.hasB} C:${iss.hasC} D:${iss.hasD}`);
  console.log(iss.fullText);
  console.log('---');
}

console.log('Match questions count:', matchQs.length, matchQs);

