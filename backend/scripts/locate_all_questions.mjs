import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));

// For each question 1..408, find which page it appears on
const qPages = {};
const missedQs = [];

for (let q = 1; q <= 408; q++) {
  const qRegex = new RegExp(`(?:^|\\n|\\s)${q}\\s*[\\.\\)]\\s+`, 'i');
  let foundPage = null;
  for (let p = 1; p <= 213; p++) {
    const text = cache[p] || '';
    if (qRegex.test(text)) {
      foundPage = p;
      break;
    }
  }
  if (foundPage) {
    qPages[q] = foundPage;
  } else {
    missedQs.push(q);
  }
}

console.log('Found question headings directly via regex for:', Object.keys(qPages).length, 'questions.');
console.log('Missed question numbers directly via regex:', missedQs.length, missedQs.slice(0, 30));
