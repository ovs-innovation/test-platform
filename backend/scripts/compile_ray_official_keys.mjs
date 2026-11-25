import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocrCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));

// 1. Extract in-line answers from all question pages (1..250)
const inlineAnswers = {};

for (let p = 1; p <= 250; p++) {
  const text = ocrCache[String(p)] || '';
  const lines = text.split('\n');

  let currentQNum = null;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();

    // Check for question number start
    const mQ = l.match(/(?:^|\s)(?:Q\.?\s*)?(\d{1,3})[\.\-\)]\s*([A-Za-z].*)/);
    if (mQ) {
      const num = parseInt(mQ[1], 10);
      if (num >= 1 && num <= 298) {
        currentQNum = num;
      }
    }

    // Check for answer
    const mAns = l.match(/^ANSWER\s*:\s*([^\s]+)/i);
    if (mAns && currentQNum) {
      let rawAns = mAns[1].toUpperCase().replace(/[\(\)\[\]\.]/g, '');
      if (rawAns === '©' || rawAns === 'C') rawAns = 'C';
      if (rawAns === '0' || rawAns === 'D') rawAns = 'D';
      if (rawAns === 'B' || rawAns === '8') rawAns = 'B';
      if (rawAns === 'A' || rawAns === '4') rawAns = 'A';
      inlineAnswers[currentQNum] = rawAns;
      currentQNum = null;
    }
  }
}

console.log(`Extracted in-line answers for ${Object.keys(inlineAnswers).length} questions.`);
fs.writeFileSync(
  path.resolve(__dirname, 'ray_inline_answers.json'),
  JSON.stringify(inlineAnswers, null, 2)
);
