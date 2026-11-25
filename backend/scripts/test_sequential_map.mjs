import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

// Build exact page mapping by scanning page text in strictly increasing order
const exactMapping = [];
let currentPage = 1;

for (let q = 1; q <= 408; q++) {
  let mappedPage = null;
  // Search from currentPage up to currentPage + 2
  for (let p = currentPage; p <= Math.min(211, currentPage + 2); p++) {
    const text = cache[p] || '';
    // Look for question start patterns:
    // "q." or "q)" or "[AIEEE ...]" or "[JEE ...]"
    // Notice that q can appear at line start or after solution
    const qPat1 = new RegExp(`(?:^|\\n)\\s*${q}\\s*[\\.\\)]`, 'm');
    // Also handle cases where Tesseract saw e.g. "BL." for 6, "TB." for 79, etc.
    if (qPat1.test(text)) {
      mappedPage = p;
      break;
    }
  }
  if (!mappedPage) {
    mappedPage = currentPage; // stay on current page
  } else {
    currentPage = mappedPage;
  }
  exactMapping.push({ q, page: mappedPage });
}

console.log('Sample mapped sequence:');
for (let i = 0; i < 408; i += 20) {
  console.log(`Q${exactMapping[i].q} -> Page ${exactMapping[i].page}`);
}
console.log(`Q408 -> Page ${exactMapping[407].page}`);
