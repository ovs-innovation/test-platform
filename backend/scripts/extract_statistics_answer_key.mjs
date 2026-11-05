import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

// 1. Extract from page 128 words
const wordsRaw = fs.readFileSync('backend/scripts/page_128_words.json', 'utf8').replace(/^\uFEFF/, '');
const p128Words = JSON.parse(wordsRaw);

// Group page 128 words into lines by Y
const lines = [];
for (const w of [...p128Words].sort((a, b) => a.Y - b.Y || a.X - b.X)) {
  let line = lines.find(l => Math.abs(l.y - w.Y) < 18);
  if (!line) {
    line = { y: w.Y, words: [] };
    lines.push(line);
  }
  line.words.push(w);
}
lines.sort((a, b) => a.y - b.y);

const tableAnswers = {};
for (const line of lines) {
  line.words.sort((a, b) => a.X - b.X);
  const text = line.words.map(w => w.Text).join(' ');
  // Matches like "10. D", "55. 18", "71. 4", "85. 12", etc.
  const matches = [...text.matchAll(/(\d{1,3})\s*[\.:\-]?\s*([A-Za-z0-9\-]+)/g)];
  for (const m of matches) {
    const qNum = parseInt(m[1]);
    const ans = m[2].toUpperCase().trim();
    if (qNum >= 1 && qNum <= 160) {
      tableAnswers[qNum] = ans;
    }
  }
}

console.log(`Table answers found on p128: ${Object.keys(tableAnswers).length}/160`);

// 2. Extract from pages 1-127 OCR text
// Each page may have "N. ... ANSWER: X"
// Let's find question numbers and answers
const pageAnswers = {};

for (const p of pages) {
  if (p.page === 128) continue;
  const text = p.text;
  
  // Find all ANSWER: ...
  // Often preceded by Q number earlier in the page or nearby
  const ansMatches = [...text.matchAll(/ANSWER:\s*([A-Za-z0-9\-]+)/gi)];
  // Also find question numbers like "^\s*(\d{1,3})[\.\•\s]"
  const qMatches = [...text.matchAll(/(?:^|\n|\s)\s*(\d{1,3})\s*[\.\•]\s+/g)];
  
  // Print summary per page
  // console.log(`Page ${p.page}: ${qMatches.map(m=>m[1]).join(',')} | ANS: ${ansMatches.map(m=>m[1]).join(',')}`);
}

// Combine known answers
const combined = { ...tableAnswers };

// Fill Q1 to Q12 from our inspection
combined[1] = "B";
combined[2] = "A";
combined[3] = "B";
combined[4] = "C";
combined[5] = "C";
combined[6] = "B";
combined[7] = "D";
combined[8] = "A";
combined[9] = "C";
combined[10] = "D";
combined[11] = "D";
combined[12] = "C";

console.log(`Combined total answers: ${Object.keys(combined).length}/160`);

const missing = [];
for (let i = 1; i <= 160; i++) {
  if (!combined[i]) missing.push(i);
}
console.log(`Still missing (${missing.length}):`, missing);

