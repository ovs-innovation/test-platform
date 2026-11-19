import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/fluids_ocr_cache.json', 'utf8'));

// We know there are 195 questions. Let's find each question in sequence.
// For each question i from 1 to 195:
const questionData = [];

for (let p = 1; p <= 93; p++) {
  const pStr = String(p).padStart(3, '0');
  const text = ocr[pStr] || '';
  questionData.push({ page: p, text });
}

// Print first 50 lines of each page to see question numbers
const pageSummaries = questionData.map(p => {
  const lines = p.text.split('\n').filter(l => l.trim().length > 0);
  // find lines that look like questions
  const qLines = lines.filter(l => /^[0-9©®"'-]{1,4}[\.:\-\s]+[A-Z]/.test(l.trim()) || /JEE\s*Main/i.test(l) || /marks/i.test(l));
  return { page: p.page, firstLine: lines[0]?.slice(0, 50), qLines: qLines.map(l => l.slice(0, 60)) };
});

fs.writeFileSync('backend/scripts/fluids_page_summaries.json', JSON.stringify(pageSummaries, null, 2));
console.log('Saved page summaries. Total pages:', pageSummaries.length);
