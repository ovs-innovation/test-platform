import fs from 'fs';

const text = fs.readFileSync('backend/scripts/aod_extracted_text.txt', 'utf8');

const lines = text.split('\n');
let currentQ = null;
const rawQuestions = [];
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

let issues = 0;
for (const q of rawQuestions) {
  const full = q.lines.join(' ');
  const aIdx = full.indexOf('(A)');
  const bIdx = full.indexOf('(B)');
  const cIdx = full.indexOf('(C)');
  const dIdx = full.indexOf('(D)');

  if (aIdx === -1 || bIdx === -1 || cIdx === -1 || dIdx === -1 || !(aIdx < bIdx && bIdx < cIdx && cIdx < dIdx)) {
    console.log(`Issue in Q${q.num}: a=${aIdx}, b=${bIdx}, c=${cIdx}, d=${dIdx}`);
    console.log(`Text: ${full}`);
    issues++;
  }
}

console.log(`Total issues with option indices: ${issues}`);

