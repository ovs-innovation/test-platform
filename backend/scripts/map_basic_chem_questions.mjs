import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_ocr_cache.json'), 'utf8'));

// Each page from '001' to '078' has questions.
// Let's find for each question 1..221:
// - which page it appears on
// - the answer declared inside the question block (e.g. ANSWER: X)
const qMap = {};
for (let q = 1; q <= 221; q++) {
  qMap[q] = { page: null, answerInDoc: null };
}

// Regex to match question start: e.g. "1. ", "\n1. ", "1: ", etc.
// And ANSWER: [A-D] or [0-9]+
for (let p = 1; p <= 78; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  
  // Find lines starting with a number followed by '.' or ':'
  const matches = [...text.matchAll(/(?:^|\n)\s*(\d{1,3})\s*[\.:\)]\s+([A-Z0-9])/g)];
  for (const m of matches) {
    const qNum = parseInt(m[1], 10);
    if (qNum >= 1 && qNum <= 221) {
      if (!qMap[qNum].page) {
        qMap[qNum].page = p;
      }
    }
  }

  // Also check answers in this page
  // e.g. ANSWER: A or Answer: 42 or Ans: C
  const ansMatches = [...text.matchAll(/(?:answer|answeR|Answer|Ans)\s*[:\.]\s*([A-D0-9\.\-]+)/gi)];
  // We can also extract more specifically per question block
}

console.log('Detected questions on pages:');
let missing = [];
for (let q = 1; q <= 221; q++) {
  if (!qMap[q].page) missing.push(q);
}
console.log(`Mapped ${221 - missing.length}/221 questions.`);
console.log('Missing question numbers from naive regex:', missing);

fs.writeFileSync(path.resolve(__dirname, 'basic_chem_initial_qmap.json'), JSON.stringify(qMap, null, 2));
