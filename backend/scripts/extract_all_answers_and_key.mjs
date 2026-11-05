import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

// 1. Extract answers from page 169
const p169 = pages.find(p => p.page === 169);
const words169 = [];
for (const line of p169.lines) {
  const wList = Array.isArray(line.Words) ? line.Words : (line.Words ? [line.Words] : []);
  for (const w of wList) {
    words169.push(w);
  }
}

// Sort by X then Y
words169.sort((a, b) => {
  if (Math.abs(a.X - b.X) < 30) return a.Y - b.Y;
  return a.X - b.X;
});

// Let's also search across all pages 1 to 168 for questions and their solutions / answers!
const qAnswersFromPages = new Map();
const qPages = new Map();

for (const pg of pages) {
  if (pg.page === 169) continue;
  
  // Find lines starting with question numbers or containing ANSWER:
  const text = pg.text;
  
  // Look for question headers like "1. ", "2. ", "104. "
  // and ANSWER: [A-D] or numbers
  const qMatches = [...text.matchAll(/(?:^|\n)\s*(\d+)\.\s+/g)];
  for (const qm of qMatches) {
    const qNum = parseInt(qm[1]);
    if (qNum >= 1 && qNum <= 260) {
      if (!qPages.has(qNum)) qPages.set(qNum, []);
      qPages.get(qNum).push(pg.page);
    }
  }

  const ansMatches = [...text.matchAll(/ANSWER[:\s\-\*]+([A-D]|\d+)/gi)];
  for (const am of ansMatches) {
    // am[1] is the answer
  }
}

console.log(`Found question numbers on pages: ${qPages.size}/260 questions located!`);
const missingQ = [];
for (let i = 1; i <= 260; i++) {
  if (!qPages.has(i)) missingQ.push(i);
}
console.log(`Missing question numbers in simple search: ${missingQ.length}:`, missingQ);

