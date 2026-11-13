import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./scripts/neural_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./scripts/neural_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./scripts/neural_diagram_urls.json', 'utf8'));

// Reconstruct lines per page (pages 2 to 20)
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 20)) {
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

// Find questions
const qIndices = [];
for (let i = 0; i < linesWithMeta.length; i++) {
  const m = linesWithMeta[i].text.match(/^Q(\d+)\./);
  if (m) {
    qIndices.push({ qNum: parseInt(m[1]), lineIdx: i, page: linesWithMeta[i].page });
  }
}

for (let i = 0; i < qIndices.length; i++) {
  const qInfo = qIndices[i];
  const nextLineIdx = (i + 1 < qIndices.length) ? qIndices[i + 1].lineIdx : linesWithMeta.length;
  const qLines = linesWithMeta.slice(qInfo.lineIdx, nextLineIdx).map(l => l.text);
  
  // Filter out boilerplate
  const cleanLines = qLines.filter(line => 
    !line.includes('ExamGOAL') &&
    !line.includes('Open solution') &&
    !line.includes('Keep practising') &&
    !line.includes('Google Play') &&
    !line.includes('GET IT ON') &&
    !line.includes('NEET Biology:') &&
    !line.includes('Solutions: questions.examside.com') &&
    !line.includes('MCQ (Single Correct Answer)') &&
    !line.includes('Out of syllabus') &&
    !line.includes('These questions are on topics')
  );

  console.log(`Q${qInfo.qNum} (Page ${qInfo.page}): ${cleanLines[0]} | total lines: ${cleanLines.length}`);
}

