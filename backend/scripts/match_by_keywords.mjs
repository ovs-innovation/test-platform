import fs from 'fs';
import { ALL_FLUIDS_PYQ_QUESTIONS } from './fluids_pyq_questions_data.mjs';

const cache = JSON.parse(fs.readFileSync('backend/scripts/fluids_ocr_cache.json', 'utf8'));

const targets = [6, 7, 9, 12, 13, 34, 37, 39, 61, 62, 64, 78, 81, 89, 110, 121, 125, 138, 156, 175];

for (const qNum of targets) {
  const qData = ALL_FLUIDS_PYQ_QUESTIONS.find(q => q.qNum === qNum);
  const words = qData.question
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 5)
    .slice(0, 10);

  const pageScores = {};
  for (const [pageStr, text] of Object.entries(cache)) {
    const lower = text.toLowerCase();
    let hits = 0;
    for (const w of words) {
      if (lower.includes(w.toLowerCase())) hits++;
    }
    if (hits >= 3) {
      pageScores[parseInt(pageStr, 10)] = hits;
    }
  }
  const bestPage = Object.entries(pageScores).sort((a,b) => b[1] - a[1])[0];
  console.log(`Q${qNum} (${qData.exam}): best match page ${bestPage ? bestPage[0] : 'NONE'} (hits: ${bestPage ? bestPage[1] : 0}) - words: ${words.slice(0, 4).join(', ')}`);
}
