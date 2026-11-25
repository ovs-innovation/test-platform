import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const raw171 = fs.readFileSync(path.resolve(__dirname, 'electrostatics_page171_raw.txt'), 'utf8');
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// Parse raw 171 lines into tokens:
const lines = raw171.split('\n').filter(l => l.trim() && !l.includes('Answer key'));
console.log(`Page 171 lines: ${lines.length}`);

// We also have on-page answers from cache:
// Let's find question blocks and their ANSWER line
// Each question has qNum from 1 to 300
// Let's create an accurate mapping for all 300 questions

const pageAnswersByQ = {};

for (let p = 1; p <= 170; p++) {
  const pText = cache[String(p)] || '';
  const pLines = pText.split('\n');
  
  let currentQ = null;
  for (let l of pLines) {
    const trimmed = l.trim();
    // Check if line starts a question
    const qMatch = trimmed.match(/^(\d{1,3})[\.\s\:\-]\s*(.*)/);
    if (qMatch) {
      const num = parseInt(qMatch[1], 10);
      if (num >= 1 && num <= 300) {
        currentQ = num;
      }
    }

    const ansMatch = trimmed.match(/^\s*answer\s*:\s*(.*)/i);
    if (ansMatch && currentQ) {
      pageAnswersByQ[currentQ] = ansMatch[1].trim();
    }
  }
}

console.log(`Extracted answers for ${Object.keys(pageAnswersByQ).length} questions directly from question pages.`);

// Save preliminary key check
fs.writeFileSync(
  path.resolve(__dirname, 'preliminary_page_answers.json'),
  JSON.stringify(pageAnswersByQ, null, 2)
);
