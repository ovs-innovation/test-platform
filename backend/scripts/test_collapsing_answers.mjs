import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const answers = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_all_302_answers.json'), 'utf8'));

// Filter out spurious entries:
// For example, if rawAns is empty or if two answers occur immediately within 1 line of each other (like ANSWER: A followed by ANSWER: (20i + 30j))
const validUnits = [];
for (let i = 0; i < answers.length; i++) {
  const cur = answers[i];
  const next = answers[i + 1];

  // If this entry and next entry are on the same page and line distance is very small (like repeating the answer text)
  if (next && cur.page === next.page && (cur.rawAns.length === 1 && next.rawAns.length > 2)) {
    // cur is the option letter, next is the full option text!
    validUnits.push({
      page: cur.page,
      ans: cur.rawAns,
      fullText: next.rawAns,
      marksLine: cur.marksLine || next.marksLine
    });
    i++; // skip next
    continue;
  }

  if (cur.rawAns.length > 0) {
    validUnits.push({
      page: cur.page,
      ans: cur.rawAns,
      fullText: '',
      marksLine: cur.marksLine
    });
  }
}

console.log(`Valid units after collapsing adjacent repetitions: ${validUnits.length}`);

for (let i = 0; i < Math.min(20, validUnits.length); i++) {
  console.log(`Q${i + 1} (p${validUnits[i].page}): ans=${validUnits[i].ans} ${validUnits[i].fullText ? `(${validUnits[i].fullText})` : ''}`);
}

for (let i = Math.max(0, validUnits.length - 15); i < validUnits.length; i++) {
  console.log(`Q${i + 1} (p${validUnits[i].page}): ans=${validUnits[i].ans} ${validUnits[i].fullText ? `(${validUnits[i].fullText})` : ''}`);
}
