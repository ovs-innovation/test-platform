import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chunks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'emi_monotonic_chunks.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'emi_jee_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'emi_clean_diagram_urls.json'), 'utf8'));

const NUMERICAL_QUESTIONS = new Set([56,63,64,69,71,73,79,80,81,82,84,91,92,94,99,100,101,102,106,108,111,112,113,116,119,120,122,123,124,126,128,129,131,133,134,135,137,138,139,140,141,143,145,149,150,154,158,160,162,168,169]);

// For each question, separate:
// 1. Question statement (before options/marks)
// 2. Options raw
// 3. Solution text (after ANSWER:)
const parsedRaw = {};

for (let q = 1; q <= 173; q++) {
  const c = chunks[q];
  const lines = c.lines;
  
  let marksIdx = -1;
  let ansIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (marksIdx === -1 && /\[\d+\s*marks/i.test(lines[i])) marksIdx = i;
    if (ansIdx === -1 && /^ANSWER\s*:/i.test(lines[i])) ansIdx = i;
  }

  const isNum = NUMERICAL_QUESTIONS.has(q);
  const qLines = marksIdx !== -1 ? lines.slice(0, marksIdx) : lines.slice(0, ansIdx !== -1 ? ansIdx : lines.length);
  const solLines = ansIdx !== -1 ? lines.slice(ansIdx + 1) : [];

  parsedRaw[q] = {
    q,
    page: c.startPage,
    isNumerical: isNum,
    officialAnswer: keys[q],
    diagramUrl: diagramUrls[`emi_q${q}_diagram.png`] || null,
    rawQuestionLines: qLines,
    rawSolution: solLines.join('\n').trim()
  };
}

fs.writeFileSync(path.resolve(__dirname, 'emi_raw_parsed.json'), JSON.stringify(parsedRaw, null, 2));
console.log('Saved emi_raw_parsed.json for all 173 questions!');
