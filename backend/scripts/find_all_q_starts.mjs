import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/emi_jee_ocr_cache.json', 'utf8'));

const pageLines = [];
for (let p = 1; p <= 143; p++) {
  const text = pages[String(p)] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  for (let l = 0; l < lines.length; l++) {
    pageLines.push({ page: p, lineIdx: l, line: lines[l] });
  }
}

const qStarts = {};

for (let i = 0; i < pageLines.length; i++) {
  const { page, line } = pageLines[i];
  
  // Case A: "29." alone on a line
  const loneM = line.match(/^(\d{1,3})[\.,:\)]?$/);
  if (loneM) {
    const qNum = parseInt(loneM[1], 10);
    if (qNum >= 1 && qNum <= 173) {
      if (!qStarts[qNum]) qStarts[qNum] = [];
      qStarts[qNum].push({ idx: i, page, line: line, nextLine: pageLines[i + 1]?.line?.substring(0, 60) });
      continue;
    }
  }

  // Case B: "12. What is...", "12, What is...", "12: What is..."
  const inlineM = line.match(/^(\d{1,3})[\.,:\)\s]\s*(.*)/);
  if (inlineM) {
    const qNum = parseInt(inlineM[1], 10);
    if (qNum >= 1 && qNum <= 173) {
      if (!qStarts[qNum]) qStarts[qNum] = [];
      qStarts[qNum].push({ idx: i, page, line: line.substring(0, 80) });
    }
  }
}

console.log('Directly found Q numbers:', Object.keys(qStarts).length);
const missing = [];
for (let q = 1; q <= 173; q++) {
  if (!qStarts[q]) missing.push(q);
}
console.log('Missing Q numbers count:', missing.length);
console.log('Missing Q numbers:', missing);
