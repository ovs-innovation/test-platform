import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);
const officialKey = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_binomial_theorem.json', 'utf8'));

// Search each page for every question and find what ANSWER was written on that page
const pageAnswers = {};

for (let p = 1; p <= 168; p++) {
  const pg = pages.find(x => x.page === p);
  const text = pg.text;
  
  // Find all answer patterns
  // E.g. ANSWER: C, ANSWER; C, ANSWERt B, ANSW E-R: as 30, ANSWER: 13, etc.
  const regex = /ANSW[A-Z\s\-\:\;\,\.\*\+\=]+([A-D]|\d+)/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    // Look at preceding text to find question number or year
    const preText = text.slice(Math.max(0, match.index - 300), match.index);
    const qNumMatch = preText.match(/(?:^|\n|\s)(\d{1,3})\.\s+/g);
    let qNum = null;
    if (qNumMatch) {
      const last = qNumMatch[qNumMatch.length - 1].match(/\d+/);
      if (last) qNum = parseInt(last[0]);
    }
    let ansVal = match[1].toUpperCase();
    if (ansVal === 'E') ansVal = 'C';
    if (ansVal === 'O') ansVal = 'D';
    // If not matched, we still record the answer found on page
  }
}

// Let's compare officialKey with page 169 raw matches
const raw169 = fs.readFileSync('backend/scripts/page169_text_raw.txt', 'utf8');
const p169Matches = {};
const m169 = [...raw169.matchAll(/(\d+)[\.:\s]+([A-Da-e]|\d+)/g)];
for (const m of m169) {
  const q = parseInt(m[1]);
  let a = m[2].toUpperCase();
  if (a === 'E') a = 'C';
  if (a === 'O') a = 'D';
  if (q >= 1 && q <= 260) {
    p169Matches[q] = a;
  }
}

console.log('Comparing officialKey with page 169 matches...');
let diffs = 0;
for (let i = 1; i <= 260; i++) {
  if (p169Matches[i] && p169Matches[i] !== officialKey[i]) {
    console.log(`Q${i}: page 169 says ${p169Matches[i]}, officialKey has ${officialKey[i]}`);
    diffs++;
  }
}
console.log(`Total differences between p169 raw and officialKey: ${diffs}`);

