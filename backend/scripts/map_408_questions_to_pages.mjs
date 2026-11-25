import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

// We know the exact page distribution:
// Total questions = 408
// Total pages = 211
// Let's inspect pages around where each question should be:
// expected_page(q) approx = q * 211 / 408 = q * 0.517

// Let's create an accurate page map by finding question markers on each page.
const pageQuestions = {};
for (let p = 1; p <= 211; p++) {
  pageQuestions[p] = [];
}

// Map each question q from 1 to 408
const qToPage = {};

// We can scan through pages 1 to 211 sequentially.
// On each page, we identify the questions that start on that page.
let expectedQ = 1;

for (let p = 1; p <= 211; p++) {
  const text = cache[p] || '';
  const lines = text.split('\n');
  
  // Find all possible question beginnings on this page
  // We expect questions to be in order: expectedQ, expectedQ+1, ...
  for (let testQ = expectedQ; testQ <= Math.min(408, expectedQ + 5); testQ++) {
    // Check if testQ appears as a question start on page p
    const numStr = String(testQ);
    // Patterns for testQ:
    // 1. Direct number: "testQ." or "testQ)" or "Q. testQ"
    const regDirect = new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${numStr}\\s*[\\.\\:\\)]\\s*`, 'i');
    
    let matched = regDirect.test(text);
    
    // Also check if text has a unique start for known OCR replacements
    if (!matched) {
      if (testQ === 6 && /(?:^|\n)\s*BL\s*[\.\:\)]/i.test(text)) matched = true;
      if (testQ === 8 && /(?:^|\n)\s*8B\s*[\.\:\)]/i.test(text)) matched = true;
      if (testQ === 10 && /(?:^|\n)\s*0\s*[\.\:\)]\s*The negate/i.test(text)) matched = true;
      if (testQ === 12 && /(?:^|\n)\s*"2\s*[\.\:\)]/i.test(text)) matched = true;
      if (testQ === 13 && /(?:^|\n)\s*BB\s*[\.\:\)]/i.test(text)) matched = true;
      if (testQ === 14 && /(?:^|\n)\s*HM\s*[\.\:\)]/i.test(text)) matched = true;
      if (testQ === 16 && /(?:^|\n)\s*6\s*[\.\:\)]\s*An aleciric/i.test(text)) matched = true;
      if (testQ === 45 && /(?:^|\n)\s*AB\s*[\.\:\)]\s*Thre/i.test(text)) matched = true;
      if (testQ === 47 && /(?:^|\n)\s*AB\s*[\.\:\)]\s*sg/i.test(text)) matched = true;
      if (testQ === 48 && /(?:^|\n)\s*SB\s*[\.\:\)]/i.test(text)) matched = true;
      if (testQ === 50 && /(?:^|\n)\s*S0\s*[\.\:\)]/i.test(text)) matched = true;
      if (testQ === 51 && /(?:^|\n)\s*ST\s*[\.\:\)]/i.test(text)) matched = true;
      if (testQ === 57 && /(?:^|\n)\s*BT\s*[\.\:\)]/i.test(text)) matched = true;
      if (testQ === 63 && /(?:^|\n)\s*B3\s*[\.\:\)]/i.test(text)) matched = true;
      if (testQ === 64 && /(?:^|\n)\s*B4\s*[\.\:\)]/i.test(text)) matched = true;
      if (testQ === 66 && /(?:^|\n)\s*BE\s*[\.\:\)]/i.test(text)) matched = true;
      if (testQ === 71 && /(?:^|\n)\s*TL\s*[\.\:\)]/i.test(text)) matched = true;
      if (testQ === 76 && /(?:^|\n)\s*FE\s*[\.\:\)]/i.test(text)) matched = true;
      if (testQ === 79 && /(?:^|\n)\s*TB\s*[\.\:\)]/i.test(text)) matched = true;
      if (testQ === 80 && /(?:^|\n)\s*BO\s*[\.\:\)]/i.test(text)) matched = true;
      if (testQ === 157 && /(?:^|\n)\s*57\s*[\.\:\)]\s*Four/i.test(text)) matched = true;
      if (testQ === 158 && /(?:^|\n)\s*0\s*[\.\:\)]\s*The vahae/i.test(text)) matched = true;
      if (testQ === 159 && /(?:^|\n)\s*155\s*[\.\:\)]\s*an electrical/i.test(text)) matched = true;
      if (testQ === 160 && /(?:^|\n)\s*180\s*[\.\:\)]\s*1 gavarrmater/i.test(text)) matched = true;
      if (testQ === 408 && /(?:^|\n)\s*ADB\s*[\.\:\)]/i.test(text)) matched = true;
    }

    if (matched) {
      qToPage[testQ] = p;
      pageQuestions[p].push(testQ);
      expectedQ = testQ + 1;
    }
  }
}

console.log('Mapped questions count:', Object.keys(qToPage).length);
const unmapped = [];
for (let q = 1; q <= 408; q++) {
  if (!qToPage[q]) unmapped.push(q);
}
console.log('Unmapped questions count:', unmapped.length);
if (unmapped.length > 0) {
  console.log('First 20 unmapped:', unmapped.slice(0, 20));
}
