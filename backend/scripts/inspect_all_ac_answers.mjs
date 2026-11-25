import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ac_jee_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ac_jee_official_keys.json'), 'utf8'));

const questionsFound = [];
for (let p = 1; p <= 112; p++) {
  const text = pages[p] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  for (let li = 0; li < lines.length; li++) {
    const l = lines[li];
    if (l.startsWith('ANSWER:')) {
      const ansVal = l.replace('ANSWER:', '').trim();
      let qText = '';
      for (let k = li - 1; k >= 0; k--) {
        if (lines[k].startsWith('ANSWER:')) break;
        qText = lines[k] + ' ' + qText;
      }
      questionsFound.push({ page: p, ans: ansVal, lineIdx: li, prevSnippet: qText.slice(0, 120) });
    }
  }
}

console.log('Total ANSWER: blocks found across 112 pages:', questionsFound.length);

// Compare with official keys sequentially
let matchCount = 0;
for (let i = 0; i < questionsFound.length; i++) {
  const qNum = i + 1;
  const expAns = officialKeys[qNum];
  const actAns = questionsFound[i].ans;
  const isMatch = expAns && actAns && expAns.toLowerCase() === actAns.toLowerCase();
  if (isMatch) {
    matchCount++;
  } else {
    console.log(`Mismatch at Q${qNum}: expected '${expAns}', got '${actAns}' on Page ${questionsFound[i].page}`);
    console.log(`  Snippet: ${questionsFound[i].prevSnippet.slice(0, 80)}`);
  }
}

console.log(`Sequential match: ${matchCount} / ${questionsFound.length}`);
