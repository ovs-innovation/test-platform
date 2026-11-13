import fs from 'fs';

const rawText = fs.readFileSync('./backend/scripts/photosynthesis_extracted_lines.txt', 'utf8');
const lines = rawText.split('\n');

const questions = [];
let currentQ = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const qMatch = line.match(/^Q(\d+)\.\s*(.*)/);
  if (qMatch) {
    if (currentQ) questions.push(currentQ);
    currentQ = {
      q_num: parseInt(qMatch[1], 10),
      header: qMatch[2],
      lines: []
    };
  } else if (currentQ) {
    if (line.includes('=== PAGE') || line.includes('Exam GOAL') || line.includes('Page ') || line.includes('Keep practising on the ExamGOAL')) {
      continue;
    }
    currentQ.lines.push(line);
  }
}
if (currentQ) questions.push(currentQ);

console.log(`Parsed ${questions.length} question blocks.`);

function parseQ(q) {
  const cleanedLines = q.lines
    .map(l => l.replace(/open solution/gi, '').trim())
    .filter(l => l.length > 0);
  const fullText = cleanedLines.join('\n');

  const optAMatches = [...fullText.matchAll(/\(A\)/g)];
  if (optAMatches.length === 0) {
    return { q_num: q.q_num, error: 'No (A) found' };
  }

  // Iterate backwards from last (A)
  for (let k = optAMatches.length - 1; k >= 0; k--) {
    const optAIdx = optAMatches[k].index;
    const questionBody = fullText.slice(0, optAIdx).trim();
    const optionsPart = fullText.slice(optAIdx).trim();
    const matches = [...optionsPart.matchAll(/\((A|B|C|D)\)\s*([\s\S]*?)(?=\((?:[A-D])\)|$)/g)];
    if (matches.length >= 4) {
      return {
        q_num: q.q_num,
        questionBody,
        options: matches.slice(0, 4).map(m => ({ key: m[1], text: m[2].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim() }))
      };
    }
  }
  return { q_num: q.q_num, error: 'Could not find 4 options' };
}

let errs = 0;
for (const q of questions) {
  const p = parseQ(q);
  if (p.error) {
    console.log('Error Q' + q.q_num, p.error);
    errs++;
  } else {
    p.options.forEach(opt => {
      if (opt.text.length <= 1 || /^[,.\s]+$/.test(opt.text)) {
        console.log(`Short option in Q${p.q_num} Opt ${opt.key}: "${opt.text}"`);
      }
    });
  }
}
console.log('Total errors:', errs);

