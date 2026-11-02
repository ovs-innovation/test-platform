import fs from 'fs';

const text = fs.readFileSync('backend/scripts/aod_extracted_text.txt', 'utf8');

// The file has lines like:
// 1. The maximum distance from origin of a point on the curve... [JEE 2002]
// (A) a - b (B) a + b
// (C) √(a 2 + b 2 ) (D) √(a 2 - b 2 )

// Let's split by question numbers: `\n(\d+)\.\s+`
const rawQuestions = [];
const lines = text.split('\n');

let currentQ = null;
const qStartRegex = /^(\d+)\.\s+(.*)$/;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line || line.startsWith('=== PAGE') || line.includes('Application of Derivatives • JEE Main') || line.includes('APPLICATION OF DERIVATIVES — QUESTION') || line.includes('Joint Entrance Examination') || line.includes('Questions: 1 to 100') || line.includes('Topic:') || line.includes('Type: Multiple Choice')) {
    continue;
  }

  const match = line.match(qStartRegex);
  if (match) {
    if (currentQ) rawQuestions.push(currentQ);
    currentQ = {
      num: parseInt(match[1]),
      lines: [match[2]]
    };
  } else if (currentQ) {
    currentQ.lines.push(line);
  }
}
if (currentQ) rawQuestions.push(currentQ);

console.log(`Parsed ${rawQuestions.length} raw questions.`);
for (const q of rawQuestions) {
  if (q.num <= 5 || q.num >= 98) {
    console.log(`Q${q.num}:`, q.lines.join(' '));
  }
}

