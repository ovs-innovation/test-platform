import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/emi_jee_ocr_cache.json', 'utf8'));

// For each page 1 to 143, inspect all lines and find lines matching question headers or marks lines
const pageSummaries = [];

for (let p = 1; p <= 143; p++) {
  const text = pages[String(p)] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  // Find potential question starts
  const qStartsOnPage = [];
  const marksOnPage = [];
  const answersOnPage = [];

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.match(/\[\d+\s*marks/i)) {
      marksOnPage.push({ lineIdx: i, line: l });
    }
    const ansM = l.match(/^ANSWER\s*:\s*(.*)/i);
    if (ansM) {
      answersOnPage.push({ lineIdx: i, ans: ansM[1] });
    }
    // Check if line looks like a question number start
    const numM = l.match(/^([A-Za-z0-9]{1,4})[\.,:\)\s]\s+(.*)/);
    if (numM && numM[1].match(/^\d+$/)) {
      qStartsOnPage.push({ lineIdx: i, num: parseInt(numM[1], 10), line: l.substring(0, 60) });
    }
  }

  pageSummaries.push({
    page: p,
    totalLines: lines.length,
    qStarts: qStartsOnPage,
    marks: marksOnPage.length,
    answers: answersOnPage
  });
}

console.log('Total pages inspected:', pageSummaries.length);
let totalAnswersFound = 0;
for (const ps of pageSummaries) {
  totalAnswersFound += ps.answers.length;
}
console.log('Total answers found across 143 pages:', totalAnswersFound);

// Print the first 25 pages summary
for (let p = 0; p < 25; p++) {
  const ps = pageSummaries[p];
  console.log(`Page ${ps.page}: Qstarts: [${ps.qStarts.map(q => q.num).join(', ')}] | Answers: [${ps.answers.map(a => a.ans).join(', ')}]`);
}
