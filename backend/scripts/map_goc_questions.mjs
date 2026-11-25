import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_pages_text.json'), 'utf8'));

// Build list of questions in chronological order 1..337
const questions = [];

for (let p = 1; p < 145; p++) {
  const text = pages[p] || '';
  const lines = text.split('\n');

  for (let li = 0; li < lines.length; li++) {
    const l = lines[li].trim();
    const m = l.match(/^(?:Q\s*)?(\d{1,3})\s*[\.\)]\s*(.*)$/i);
    if (m) {
      const qNum = parseInt(m[1], 10);
      if (qNum >= 1 && qNum <= 337) {
        // Is it the real question header?
        const isExamHeader = /JEE Main|AIEEE|Shift|Slot|Morning|Evening|Online|Offline/i.test(l) ||
                             /JEE Main|AIEEE|Shift|Slot|Morning|Evening|Online|Offline/i.test(lines[li + 1] || '');
        if (isExamHeader) {
          questions.push({
            qNum,
            pageNumber: p + 1, // 1-based page number
            pageIndex: p,
            lineIndex: li,
            rawHeader: l
          });
        }
      }
    }
  }
}

// Sort by qNum
questions.sort((a, b) => a.qNum - b.qNum);

console.log(`Matched ${questions.length} question headers with exam info.`);

// Check if any numbers from 1 to 337 are missing
const foundNums = new Set(questions.map(q => q.qNum));
const missing = [];
for (let i = 1; i <= 337; i++) {
  if (!foundNums.has(i)) missing.push(i);
}
console.log(`Missing question numbers with exam header: ${missing.length}`, missing);

// Check if any duplicates
const counts = {};
questions.forEach(q => counts[q.qNum] = (counts[q.qNum] || 0) + 1);
const dups = Object.entries(counts).filter(([k, v]) => v > 1);
console.log('Duplicates:', dups);

fs.writeFileSync('backend/scripts/goc_question_starts.json', JSON.stringify(questions, null, 2));
