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
    currentQ = { num: parseInt(match[1]), lines: [match[2]] };
  } else if (currentQ) {
    currentQ.lines.push(line);
  }
}
if (currentQ) rawQuestions.push(currentQ);

function parseQ(q) {
  const full = q.lines.join(' ');
  const aIdx = full.indexOf('(A)');
  const bIdx = full.indexOf('(B)');
  const cIdx = full.indexOf('(C)');
  const dIdx = full.indexOf('(D)');
  return {
    num: q.num,
    question: full.slice(0, aIdx).trim(),
    a: full.slice(aIdx + 3, bIdx).trim(),
    b: full.slice(bIdx + 3, cIdx).trim(),
    c: full.slice(cIdx + 3, dIdx).trim(),
    d: full.slice(dIdx + 3).trim(),
  };
}

const batch2 = rawQuestions.slice(20, 40).map(parseQ);
fs.writeFileSync('backend/scripts/batch2_qs.json', JSON.stringify(batch2, null, 2));
console.log('Saved batch 2 (Q21-Q40)');

