import fs from 'fs';

const raw = fs.readFileSync('./backend/scripts/vector_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

const answers = [];

for (const p of pages) {
  for (let i = 0; i < p.lines.length; i++) {
    const line = p.lines[i];
    const text = typeof line === 'string' ? line : line.Text;
    const m = text.match(/ANSWER\s*:\s*([A-Za-z0-9\.\-]+)/i);
    if (m) {
      answers.push({
        page: p.page,
        lineIdx: i,
        ans: m[1].toUpperCase(),
        fullLine: text
      });
    }
  }
}

console.log('Total ANSWER occurrences:', answers.length);

// Compare with official answer key
const ansKey = JSON.parse(fs.readFileSync('./backend/scripts/official_answer_key.json', 'utf8'));

// Let's see how the sequence of `answers` matches `ansKey[1..305]`
let keyIdx = 1;
const matched = [];
const mismatched = [];

for (let i = 0; i < answers.length; i++) {
  const item = answers[i];
  const expected = String(ansKey[keyIdx]).toUpperCase();
  const actual = item.ans;
  
  if (actual === expected || (actual.startsWith(expected) && expected.length > 0)) {
    matched.push({ qNum: keyIdx, page: item.page, expected, actual });
    keyIdx++;
  } else {
    mismatched.push({ indexInFound: i, candidateQ: keyIdx, expected, actual, page: item.page });
    // Maybe an extra answer or misread? Let's check next expected
    if (String(ansKey[keyIdx + 1]).toUpperCase() === actual) {
      // Skipped one
      console.log(`Skipped Q${keyIdx}! Expected ${expected}, got ${actual} which matches Q${keyIdx + 1}`);
      keyIdx += 2;
    }
  }
}

console.log(`Matched ${matched.length} questions in sequence! Current keyIdx: ${keyIdx}`);
console.log('First 10 mismatches:', mismatched.slice(0, 10));

