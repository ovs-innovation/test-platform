import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'human_health_pages_dump.json'), 'utf8'));

// Filter pages 2 to 37 (indices 1 to 36)
const lines = [];
for (let p = 1; p <= 36; p++) {
  const plines = pages[p].lines;
  for (let l of plines) {
    if (
      l.includes('Exam   GOAL') ||
      l.includes('Exam GOAL') ||
      l.includes('P Y Q   P D F') ||
      l.includes('Keep practising on the ExamGOAL app') ||
      l.includes('Chapter-wise PYQs with solutions') ||
      l.includes('NEET Biology: Human Health and Diseases') ||
      (!l.startsWith('Q') && (l.includes('MCQ (Single Correct Answer)') || l.includes('Out of syllabus')))
    ) {
      continue;
    }
    const cleaned = l.replace(/Open solution/gi, '').trim();
    if (cleaned) {
      lines.push({ page: pages[p].page, text: cleaned });
    }
  }
}

const foundQuestions = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].text.match(/^Q(\d+)\.\s*(.*)/);
  if (m) {
    foundQuestions.push({
      qNum: parseInt(m[1]),
      page: lines[i].page,
      exam: m[2],
      lineIdx: i
    });
  }
}

console.log(`Found ${foundQuestions.length} questions.`);
const missing = [];
for (let i = 1; i <= 171; i++) {
  if (!foundQuestions.some(q => q.qNum === i)) {
    missing.push(i);
  }
}
console.log('Missing question numbers:', missing);
if (foundQuestions.length > 0) {
  console.log('First 5:', foundQuestions.slice(0, 5));
  console.log('Last 5:', foundQuestions.slice(-5));
}

