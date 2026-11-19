import fs from 'fs';

const ocrCache = JSON.parse(fs.readFileSync('backend/scripts/fluids_ocr_cache.json', 'utf8'));

// Find which page has each question number Q1 to Q195
const questionPages = {};
for (let q = 1; q <= 195; q++) {
  const qRegex = new RegExp(`(?:Q\\.?\\s*${q}\\b|Question\\s*${q}\\b|\\b${q}\\s*\\.\\s+[A-Z]|\\b${q}\\s*\\([a-z]\\)|Q${q}\\b|\\b${q}\\s*\\n)`, 'i');
  for (const [pageKey, text] of Object.entries(ocrCache)) {
    if (qRegex.test(text)) {
      if (!questionPages[q]) questionPages[q] = [];
      questionPages[q].push(parseInt(pageKey, 10));
    }
  }
}

console.log('Sample question pages:', Object.entries(questionPages).slice(0, 15));
fs.writeFileSync('backend/scripts/fluids_question_pages_rough.json', JSON.stringify(questionPages, null, 2));
