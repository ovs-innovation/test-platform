import fs from 'fs';

const data = JSON.parse(fs.readFileSync('backend/scripts/straight_lines_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, ''));

// Let's find for each question q from 1 to 200:
// 1. Which page contains `q. ` or `q ` at start of a line
// 2. Which line contains ANSWER:

const questionsFound = {};

for (const p of data) {
  if (p.page > 118) continue;
  p.lines.forEach((l, idx) => {
    const text = l.Text.trim();
    
    // Check for question header like "1. ", "2. ", "45. "
    const qMatch = text.match(/^(\d{1,3})\s*[\.\)]\s*(.*)/);
    if (qMatch) {
      const qNum = parseInt(qMatch[1], 10);
      if (qNum >= 1 && qNum <= 200) {
        if (!questionsFound[qNum]) questionsFound[qNum] = [];
        questionsFound[qNum].push({
          type: 'q_start',
          page: p.page,
          lineIdx: idx,
          text: text
        });
      }
    }
    
    // Check for answer header
    const ansMatch = text.match(/\bANSWER\s*:\s*([A-Za-z0-9\.\-]+)/i);
    if (ansMatch) {
      // Find which question this answer might belong to
      // We can record it by page and line
    }
  });
}

console.log("Total distinct question numbers matched at line start:", Object.keys(questionsFound).length);
const missing = [];
for (let i = 1; i <= 200; i++) {
  if (!questionsFound[i]) missing.push(i);
}
console.log("Missing question numbers with strict `^\\d+\\.` match:", missing);

