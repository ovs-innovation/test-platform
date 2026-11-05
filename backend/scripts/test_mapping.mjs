import fs from 'fs';

const raw = fs.readFileSync('./backend/scripts/vector_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);
const ansKey = JSON.parse(fs.readFileSync('./backend/scripts/official_answer_key.json', 'utf8'));

// Identify the 305 question boundaries across all pages
const questions = [];

// For each question 1..305, find the question start, options, answer, and solution
// We know every question has an ANSWER: line, and we matched them to Q1..Q305.

// Let's first build an index of all ANSWER occurrences that correspond to Q1..Q305
const trueAnswers = [];

for (const p of pages) {
  for (let i = 0; i < p.lines.length; i++) {
    const t = typeof p.lines[i] === 'string' ? p.lines[i] : p.lines[i].Text;
    const m = t.match(/^ANSWER\s*:\s*([A-Za-z0-9\.\-]+)/i);
    if (m) {
      // Check if this is a real question answer
      // Skip duplicate solution answers (like "Answer: 60", "Answer: 44", "Answer: 3" inside solutions)
      // True question answers are capitalized "ANSWER:" and usually have marks metadata preceding them
      trueAnswers.push({
        page: p.page,
        lineIdx: i,
        ocrAns: m[1].toUpperCase(),
        fullLine: t
      });
    }
  }
}

console.log('Total candidate ANSWER lines:', trueAnswers.length);

// Let's filter trueAnswers to exactly 305 by matching with ansKey
const mappedQuestions = [];
let keyQ = 1;

for (let i = 0; i < trueAnswers.length && keyQ <= 305; i++) {
  const item = trueAnswers[i];
  const expected = String(ansKey[keyQ]).toUpperCase();
  
  // Check if item.ocrAns matches expected (or OCR error like S for 5, A for 4)
  let isMatch = (item.ocrAns === expected);
  if (!isMatch) {
    if (keyQ === 110 && (item.ocrAns === 'A' || item.ocrAns === '1')) isMatch = true;
    if (keyQ === 275 && item.ocrAns === 'S') isMatch = true;
  }

  if (isMatch) {
    mappedQuestions.push({
      qNum: keyQ,
      expectedAns: ansKey[keyQ],
      page: item.page,
      ansLineIdx: item.lineIdx
    });
    keyQ++;
  } else {
    console.log(`Skipping duplicate/mismatched answer at page ${item.page} line ${item.lineIdx}: "${item.fullLine}" (waiting for Q${keyQ}: ${expected})`);
  }
}

console.log('Mapped questions count:', mappedQuestions.length);
fs.writeFileSync('./backend/scripts/mapped_305_boundaries.json', JSON.stringify(mappedQuestions, null, 2));

