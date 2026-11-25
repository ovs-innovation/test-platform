import fs from 'fs';
import { ALL_FLUIDS_PYQ_QUESTIONS } from './fluids_pyq_questions_data.mjs';

const cache = JSON.parse(fs.readFileSync('backend/scripts/fluids_ocr_cache.json', 'utf8'));

const targets = [6, 7, 9, 12, 13, 34, 37, 39, 61, 62, 64, 78, 81, 89, 110, 121, 125, 138, 156, 175];

const pageMap = {};

for (const qNum of targets) {
  const qData = ALL_FLUIDS_PYQ_QUESTIONS.find(q => q.qNum === qNum);
  if (!qData) {
    console.warn(`Q${qNum} not found in questions data!`);
    continue;
  }
  // Take first 30 chars of question text without special latex
  const snippet = qData.question
    .replace(/[\$\\{\\}_]/g, '')
    .slice(0, 30)
    .trim()
    .toLowerCase();

  let matchedPage = null;
  for (const [pageStr, text] of Object.entries(cache)) {
    const cleanText = text.replace(/[\$\\{\\}_]/g, '').toLowerCase();
    if (cleanText.includes(snippet.slice(0, 20))) {
      matchedPage = parseInt(pageStr, 10);
      break;
    }
  }
  pageMap[qNum] = {
    page: matchedPage,
    snippet: qData.question.slice(0, 50)
  };
}

console.log('Stem-matched pages:');
console.log(JSON.stringify(pageMap, null, 2));
