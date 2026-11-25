import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_official_keys.json'), 'utf8'));
const bounds = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_question_bounds.json'), 'utf8'));

// Flatten all lines
const lines = [];
for (let p = 1; p <= 151; p++) {
  const pLines = (cache[String(p)] || '').split('\n');
  for (let l = 0; l < pLines.length; l++) {
    lines.push({
      page: p,
      lIdx: l,
      text: pLines[l]
    });
  }
}

const parsedQuestions = [];
let keyMismatches = 0;

for (const b of bounds) {
  const qNum = b.qNum;
  const chunk = lines.slice(b.startLine, b.endLine);
  
  // Find index of [4 marks...]
  let marksIdx = -1;
  let answerIdx = -1;
  for (let i = 0; i < chunk.length; i++) {
    if (/\[\s*\d+\s*marks/i.test(chunk[i].text)) marksIdx = i;
    if (/ANSWER\s*:/i.test(chunk[i].text) && answerIdx === -1) answerIdx = i;
  }
  
  // Extract exam and marks info
  let examStr = 'JEE Main';
  let marks = 4;
  let negativeMarks = 1;
  if (marksIdx !== -1) {
    const mLine = chunk[marksIdx].text;
    const yrMatch = mLine.match(/-\s*([0-9]{4}[^\n\]]*)/);
    if (yrMatch) examStr = `JEE Main ${yrMatch[1].trim()}`;
    if (/no\s*negative|0\s*for\s*a\s*wrong/i.test(mLine)) {
      negativeMarks = 0;
    }
  }
  
  // Extract parsed answer
  let parsedKey = null;
  if (answerIdx !== -1) {
    const aLine = chunk[answerIdx].text;
    const aMatch = aLine.match(/ANSWER\s*:\s*([A-Za-z0-9\.\-]+)/i);
    if (aMatch) parsedKey = aMatch[1].trim().toUpperCase();
  }
  
  const officialKey = String(officialKeys[qNum] || '').trim().toUpperCase();
  const isNumerical = /^[0-9]+$/.test(officialKey);
  if (isNumerical) negativeMarks = 0;

  // Check agreement
  if (parsedKey && parsedKey !== officialKey) {
    // If parsed is e.g. A and official is A,B or OCR had tiny glitch
    if (!officialKey.includes(parsedKey) && !parsedKey.includes(officialKey)) {
      keyMismatches++;
      console.warn(`Key mismatch at Q${qNum}: parsed="${parsedKey}", official="${officialKey}"`);
    }
  }

  parsedQuestions.push({
    qNum,
    page: chunk[0].page,
    exam: examStr,
    officialKey,
    isNumerical,
    marks,
    negativeMarks,
    chunkLength: chunk.length
  });
}

console.log(`Parsed all ${parsedQuestions.length} questions. Key mismatches: ${keyMismatches}`);
