import fs from 'fs';

const pagesDump = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_official_keys.json', 'utf8'));

// Reconstruct text lines per page
const allLines = [];

for (const p of pagesDump) {
  if (p.page === 1 || p.page >= 21) continue;

  let currentLine = [];
  let lastY = null;

  for (const it of p.items) {
    if (lastY === null || Math.abs(it.y - lastY) > 3) {
      if (currentLine.length > 0) {
        allLines.push({
          page: p.page,
          y: Math.round(lastY),
          text: currentLine.map(x => x.str).join(' ').trim()
        });
      }
      currentLine = [it];
      lastY = it.y;
    } else {
      currentLine.push(it);
    }
  }
  if (currentLine.length > 0) {
    allLines.push({
      page: p.page,
      y: Math.round(lastY),
      text: currentLine.map(x => x.str).join(' ').trim()
    });
  }
}

console.log(`Total extracted raw lines across pages 2-20: ${allLines.length}`);

// Filter out header/footer lines and "Open solution"
const cleanLines = [];
for (const lineObj of allLines) {
  let txt = lineObj.text;
  if (!txt) continue;
  if (txt.includes('Exam GOAL') || txt.includes('P Y Q   P D F') || txt.includes('P Y Q P D F')) continue;
  if (txt.includes('MCQ (Single Correct Answer)')) continue;
  if (txt.includes('Keep practising on the ExamGOAL app') || txt.includes('Chapter-wise PYQs') || txt.includes('Google Play')) continue;
  if (txt.includes('NEET Biology: Biotechnology') || txt.includes('pdf.questions.examgoal.com')) continue;

  // Remove "Open solution" from text
  txt = txt.replace(/Open solution/g, '').trim();
  if (!txt) continue;

  cleanLines.push({ ...lineObj, text: txt });
}

console.log(`Clean lines count: ${cleanLines.length}`);

// Group lines by Question
const questionBlocks = [];
let currentBlock = null;

for (let i = 0; i < cleanLines.length; i++) {
  const line = cleanLines[i].text;
  const qMatch = line.match(/^Q(\d{1,3})\.\s*(.*)$/);

  if (qMatch) {
    if (currentBlock) {
      questionBlocks.push(currentBlock);
    }
    const qNum = parseInt(qMatch[1], 10);
    const remainder = qMatch[2].trim();
    currentBlock = {
      qNum,
      page: cleanLines[i].page,
      examTag: remainder,
      rawLines: []
    };
  } else if (currentBlock) {
    currentBlock.rawLines.push(line);
  }
}
if (currentBlock) {
  questionBlocks.push(currentBlock);
}

console.log(`Total question blocks identified: ${questionBlocks.length}`);

// Check which Q numbers were found
const foundNums = questionBlocks.map(b => b.qNum);
console.log(`Range: min=${Math.min(...foundNums)}, max=${Math.max(...foundNums)}, count=${foundNums.length}`);
const missing = [];
for (let i = 1; i <= 99; i++) {
  if (!foundNums.includes(i)) missing.push(i);
}
console.log('Missing question numbers:', missing);

// Save parsed blocks to JSON for further inspection
fs.writeFileSync('backend/scripts/biotech_app_raw_blocks.json', JSON.stringify(questionBlocks, null, 2));

