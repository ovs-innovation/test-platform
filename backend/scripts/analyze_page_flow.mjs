import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

// Let's analyze how each page 1 to 168 is structured.
// Every question in AcadXL PYQ book has:
// 1. Question header: usually starts with "<N>." or follows the previous solution
// 2. Question body
// 3. Options: (A), (B), (C), (D) or numerical
// 4. Marking tag: "[4 marks, -1 for a wrong answer] • <Year/Shift>"
// 5. "ANSWER: <ans>"
// 6. Worked solution

const questions = [];

for (let p = 1; p <= 168; p++) {
  const pg = pages.find(x => x.page === p);
  const text = pg.text;
  
  // Look for ANSWER lines
  const ansMatches = [...text.matchAll(/ANSW[^\n\:\;\,\.\*\+\=]{0,10}[\:\;\,\.\*\+\=]+\s*([A-Za-z0-9\-\+\/]+)/gi)];
  // Also look for marks tags
  const markMatches = [...text.matchAll(/(?:\[|\()?\s*\d+\s*marks?[^\n\]\)]*(?:\]|\))?/gi)];
  
  // Print summary of answers found on page
  if (ansMatches.length > 0) {
    // console.log(`Page ${p}: found ${ansMatches.length} answers: ${ansMatches.map(m => m[1]).join(', ')}`);
  }
}

console.log("Pages analyzed.");

