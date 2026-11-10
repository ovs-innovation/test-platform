import fs from 'fs';

const text = fs.readFileSync('backend/scripts/pom_pdf_text.txt', 'utf8');

// Find mentions of "shown in", "figure", "graph", "diagram" in questions
const lines = text.split('\n');
let currentQ = null;
let currentExam = null;

const mentions = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const qMatch = line.match(/(?:^|\s)(\d+)\.\s+(NEET|AIPMT|Re-NEET)/i);
  if (qMatch) {
    currentQ = qMatch[1];
  }
  if (/figure|shown|graph|diagram|table/i.test(line)) {
    mentions.push(`Q${currentQ || '?'}: ${line.trim()}`);
  }
}

console.log('Mentions of figure/graph/shown:');
console.log(mentions.join('\n'));

