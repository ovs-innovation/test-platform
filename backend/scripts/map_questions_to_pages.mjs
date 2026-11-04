import fs from 'fs';

const pages = [];
for (let p = 1; p <= 76; p++) {
  const text = fs.readFileSync(`backend/scripts/ocr_results/page_${p}.txt`, 'utf8');
  pages.push({ pageNum: p, text });
}

// Find all occurrences of marks or ANSWER on each page
for (let p = 1; p <= 76; p++) {
  const txt = pages[p-1].text;
  const marksMatches = [...txt.matchAll(/(\[\s*\d+\s*marks|ANSWER[:\s]+[A-D0-9])/gi)].map(m => m[0]);
  // Also look for potential question numbers
  const qMatches = [...txt.matchAll(/(?:^|\n)\s*(\d{1,3})[.:]\s+/g)].map(m => m[1]);
  console.log(`Page ${p}: Qs [${qMatches.join(', ')}] | Answers/Marks: ${marksMatches.length}`);
}

