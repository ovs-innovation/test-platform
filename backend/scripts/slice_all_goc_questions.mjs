import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_pages_text.json'), 'utf8'));
const starts = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_question_starts.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_official_keys.json'), 'utf8'));

// Filter out noise lines
function isNoise(line) {
  const l = line.trim();
  if (!l) return true;
  if (/^ExamGOAL$/i.test(l)) return true;
  if (/^PYQ PDF$/i.test(l)) return true;
  if (/^MCQ \(Single Correct Answer\)/i.test(l)) return true;
  if (/^Numerical \d+ questions/i.test(l)) return true;
  if (/^MCQ \(More than One Correct Answer\)/i.test(l)) return true;
  if (/^Out of syllabus/i.test(l)) return true;
  if (/^These questions are on topics no longer/i.test(l)) return true;
  if (/^Keep practising on the ExamGOAL app/i.test(l)) return true;
  if (/^Chapter-wise PYQs with solutions/i.test(l)) return true;
  if (/^Google Play/i.test(l)) return true;
  if (/^GET IT ON/i.test(l)) return true;
  if (/^JEE Main Chemistry: Basics of Organic Chemistry/i.test(l)) return true;
  if (/^Solutions: questions\.examside\.com/i.test(l)) return true;
  if (/^Open solution$/i.test(l)) return true;
  return false;
}

const parsedQuestions = [];

for (let i = 0; i < starts.length; i++) {
  const cur = starts[i];
  const next = starts[i + 1] || null;

  const qLines = [];
  const startPageIdx = cur.pageIndex;
  const endPageIdx = next ? next.pageIndex : 144;

  for (let pIdx = startPageIdx; pIdx <= endPageIdx; pIdx++) {
    const pageLines = (pages[pIdx] || '').split('\n');
    const startLine = (pIdx === startPageIdx) ? cur.lineIndex : 0;
    const endLine = (next && pIdx === endPageIdx) ? next.lineIndex : pageLines.length;

    for (let li = startLine; li < endLine; li++) {
      const line = pageLines[li];
      if (li === cur.lineIndex && pIdx === startPageIdx) {
        // First line is header
        qLines.push(line);
      } else if (!isNoise(line)) {
        qLines.push(line);
      }
    }
  }

  const rawHeader = qLines[0] || '';
  const bodyLines = qLines.slice(1);

  // Extract exam shift from rawHeader
  let examShift = '';
  const headerMatch = rawHeader.match(/^(?:Q\s*)?\d{1,3}\s*[\.\)]\s*(.*)$/i);
  if (headerMatch) {
    examShift = headerMatch[1].trim();
  }

  const fullText = bodyLines.join('\n').trim();
  const keyInfo = officialKeys[cur.qNum] || {};

  parsedQuestions.push({
    qNum: cur.qNum,
    pageNumber: cur.pageNumber,
    rawHeader,
    examShift,
    fullText,
    type: keyInfo.type || 'single_choice',
    officialKey: keyInfo
  });
}

console.log(`Sliced ${parsedQuestions.length} questions.`);

// Check sample questions
console.log('Sample Q1:', parsedQuestions[0]);
console.log('Sample Q2:', parsedQuestions[1]);
console.log('Sample Q293 (Numerical):', parsedQuestions[292]);
console.log('Sample Q333 (Multi-choice):', parsedQuestions[332]);
console.log('Sample Q336 (Out of syllabus):', parsedQuestions[335]);

fs.writeFileSync('backend/scripts/goc_sliced_questions.json', JSON.stringify(parsedQuestions, null, 2));
