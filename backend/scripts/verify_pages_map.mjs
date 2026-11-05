import fs from 'fs';

// Let's inspect the page headings and question numbers
const data = JSON.parse(fs.readFileSync('backend/scripts/straight_lines_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, ''));

// We want to determine for each page which question numbers it contains.
const pageInfo = [];

for (const p of data) {
  if (p.page > 118) continue;
  const questionsOnPage = [];
  
  for (let i = 0; i < p.lines.length; i++) {
    const text = p.lines[i].Text.trim();
    // Look for patterns like "1. ", "45. ", "123. ", "1• ", "1) "
    const m = text.match(/^(?:[•\*\-]?\s*)?(\d{1,3})\s*[\.\•\)]/);
    if (m) {
      const qNum = parseInt(m[1], 10);
      if (qNum >= 1 && qNum <= 200) {
        questionsOnPage.push({ qNum, lineIdx: i, text });
      }
    }
  }

  pageInfo.push({
    page: p.page,
    found: questionsOnPage
  });
}

// Print consecutive checks
console.log("Found questions per page summary:");
let lastQ = 0;
for (const item of pageInfo) {
  const qs = item.found.map(f => f.qNum);
  if (qs.length > 0) {
    console.log(`Page ${item.page}: Qs -> [ ${qs.join(', ')} ]`);
    lastQ = qs[qs.length - 1];
  } else {
    console.log(`Page ${item.page}: NO question header detected (last was Q${lastQ})`);
  }
}

