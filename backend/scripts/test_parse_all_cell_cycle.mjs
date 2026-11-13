import fs from 'fs';

const rawText = fs.readFileSync('./backend/scripts/cell_cycle_extracted_lines.txt', 'utf8');
const lines = rawText.split('\n');

const questions = [];
let currentQ = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const qMatch = line.match(/^Q(\d+)\.\s*(.*)/);
  if (qMatch) {
    if (currentQ) {
      questions.push(currentQ);
    }
    currentQ = {
      q_num: parseInt(qMatch[1], 10),
      header: qMatch[2],
      lines: []
    };
  } else if (currentQ) {
    if (line.includes('=== PAGE') || line.includes('Exam GOAL') || line.includes('Page ') || line.includes('Keep practising on the ExamGOAL')) {
      // skip page headers/footers
      continue;
    }
    currentQ.lines.push(line);
  }
}
if (currentQ) {
  questions.push(currentQ);
}

console.log(`Parsed ${questions.length} question blocks.`);
const missing = [];
for (let i = 1; i <= 102; i++) {
  if (!questions.find(q => q.q_num === i)) {
    missing.push(i);
  }
}
console.log('Missing question numbers:', missing);

