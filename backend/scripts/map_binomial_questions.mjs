import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

// Let's inspect page by page, tracking current expected question number from 1 to 260
const questionMap = new Map();

for (let p = 1; p <= 168; p++) {
  const pg = pages.find(x => x.page === p);
  const text = pg.text;
  
  // Look for ANSWER: occurrences on this page
  const ansMatches = [...text.matchAll(/ANSWER[:\s\-\*]+([A-D]|\d+)/gi)];
  // Look for [4 marks, -1 for a wrong answer] • <YEAR>
  const markMatches = [...text.matchAll(/(?:\[\d+\s*marks?|marks?,\s*[-–\d]+|for\s*a\s*wrong)/gi)];
  
  // Also look for explicit question number patterns like "1.", "2.", etc.
  const lines = pg.lines;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].Text.trim();
    const m = l.match(/^(\d+)[\.\s]+(.*)/);
    if (m) {
      const num = parseInt(m[1]);
      if (num >= 1 && num <= 260) {
        if (!questionMap.has(num)) {
          questionMap.set(num, { page: p, line: l, lineIdx: i });
        }
      }
    }
  }
}

console.log(`Directly mapped ${questionMap.size}/260 question headers.`);

