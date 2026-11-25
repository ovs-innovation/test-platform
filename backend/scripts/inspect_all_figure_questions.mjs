import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linearText = fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_linear.txt'), 'utf8');
const pageBlocks = linearText.split(/=== PAGE (\d+) ===/).slice(1);
const pages = {};
for (let i = 0; i < pageBlocks.length; i += 2) {
  const pNum = parseInt(pageBlocks[i], 10);
  const pText = pageBlocks[i + 1] || '';
  pages[pNum] = pText;
}

const figQuestions = [];

for (let p = 1; p <= 250; p++) {
  const text = pages[p] || '';
  const lines = text.split('\n');
  
  // Find questions on this page
  let currentQ = null;
  for (let lIdx = 0; lIdx < lines.length; lIdx++) {
    const l = lines[lIdx].trim();
    const qMatch = l.match(/(?:^|\s)(?:Q\.?\s*)?(\d{1,3})[\.\-\)]\s*(.*)/i);
    if (qMatch && parseInt(qMatch[1], 10) >= 1 && parseInt(qMatch[1], 10) <= 298) {
      currentQ = {
        qNum: parseInt(qMatch[1], 10),
        page: p,
        stemLines: [qMatch[2] || ''],
        hasAnswer: false
      };
    } else if (currentQ) {
      if (/ANSWER\s*:/i.test(l)) {
        currentQ.hasAnswer = true;
        const stemText = currentQ.stemLines.join(' ');
        if (/figure|shown in|diagram|graph|fig|circuit|as shown|given below/i.test(stemText)) {
          figQuestions.push({
            qNum: currentQ.qNum,
            page: currentQ.page,
            stem: stemText.slice(0, 150)
          });
        }
        currentQ = null;
      } else {
        currentQ.stemLines.push(l);
      }
    }
  }
}

console.log(`Found ${figQuestions.length} questions whose stems mention figure/diagram.`);
console.table(figQuestions);
fs.writeFileSync(
  path.resolve(__dirname, 'ray_stem_figure_questions.json'),
  JSON.stringify(figQuestions, null, 2)
);
