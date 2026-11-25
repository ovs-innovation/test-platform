import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// Helper to check if a line is an ANSWER line
function isAnsLine(line) {
  return /^.*answ[a-z]{0,3}\s*:/i.test(line);
}

// Helper to check if line is a marks line
function isMarksLine(line) {
  return line.includes('marks') || line.includes('wrong answer') || line.includes('negative marking') || line.includes('Shift') || line.includes('Offline');
}

// Find all answer lines across all pages
const allAnswerLines = [];
for (let p = 1; p <= 170; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  lines.forEach((l, idx) => {
    if (isAnsLine(l.trim())) {
      allAnswerLines.push({ page: p, lineIdx: idx, text: l.trim() });
    }
  });
}

console.log(`Total answer lines: ${allAnswerLines.length}`);

// We know there are 300 questions and 302 answer lines.
// Let's filter out the 2 false answer lines:
// Let's inspect answer lines where the next answer line is on the same page within a few lines,
// or where it's part of a solution explanation.
const cleanAnsLines = [];
for (let i = 0; i < allAnswerLines.length; i++) {
  const cur = allAnswerLines[i];
  const pLines = (cache[String(cur.page)] || '').split('\n');
  // Check if this line is preceded by a marks line or options or question text
  let hasPrecedingQuestionIndicator = false;
  for (let l = Math.max(0, cur.lineIdx - 6); l < cur.lineIdx; l++) {
    const txt = pLines[l].trim();
    if (isMarksLine(txt) || /^\(?[A-D]\)/i.test(txt) || /^\d{1,3}[\.\s\:\-]/i.test(txt)) {
      hasPrecedingQuestionIndicator = true;
      break;
    }
  }
  // Check if text is just formula explanation containing word answer
  if (!hasPrecedingQuestionIndicator && i > 0 && cur.page === allAnswerLines[i - 1].page) {
    console.log(`Filtered out false answer line on page ${cur.page}, line ${cur.lineIdx}: "${cur.text}"`);
    continue;
  }
  cleanAnsLines.push(cur);
}

console.log(`Clean answer lines: ${cleanAnsLines.length}`);
