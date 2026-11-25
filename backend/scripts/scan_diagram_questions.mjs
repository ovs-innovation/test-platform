import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electro_raw_blocks.json'), 'utf8'));

// Keywords that indicate a question diagram
const diagKeywords = [
  /shown in (?:the )?(?:figure|diagram|circuit)/i,
  /given in (?:the )?(?:figure|diagram)/i,
  /as (?:shown|in) (?:the )?figure/i,
  /circuit diagram/i,
  /adjacent figure/i,
  /following graph/i,
  /represented by the (?:graph|figure)/i,
  /variation of .*?(?:graph|curve)/i,
  /as depicted in/i
];

const diagramQuestions = [];

for (const b of blocks) {
  // Only look in the question part of rawLines, not the previous solution
  // The question part starts where question text starts
  const text = b.rawLines.map(l => l.text).join(' ');
  for (const kw of diagKeywords) {
    if (kw.test(text)) {
      diagramQuestions.push({ qNum: b.qNum, page: b.ans.p, kw: kw.toString() });
      break;
    }
  }
}

console.log(`Total questions with diagram keywords: ${diagramQuestions.length}`);
console.log(diagramQuestions.map(d => `Q${d.qNum} (P${d.page})`).join(', '));
