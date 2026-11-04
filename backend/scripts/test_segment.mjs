import fs from 'fs';

// Load all pages into an array of { pageNum, text }
const pages = [];
for (let p = 1; p <= 76; p++) {
  const text = fs.readFileSync(`backend/scripts/ocr_results/page_${p}.txt`, 'utf8');
  pages.push({ pageNum: p, text });
}

// We know each question number 1..135
// Let's create an explicit locator for each question based on page and text patterns
// Let's test finding each question's position

