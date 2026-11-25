import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chunks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_monotonic_chunks.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_official_keys.json'), 'utf8'));

// 15 Numerical questions
const NUMERICAL_QUESTIONS = new Set([64, 71, 77, 78, 86, 96, 101, 103, 112, 117, 140, 190, 203, 207, 216]);

function cleanText(text) {
  if (!text) return '';
  let s = text.trim();
  s = s.replace(/AcadXL™[\s\S]*?ACADXL\s*-\s*EDUCATION\s*WITH\s*DISCIPLINE/gi, '');
  s = s.replace(/PREVIOUS YEAR QUESTIONS WITH SOLUTIONS[\s\S]*?acadxl\.com[^\n]*/gi, '');
  s = s.replace(/Dual Nature of Matter\s*—\s*JEE[^\n]*/gi, '');
  s = s.replace(/Time:\s*\d+\s*minutes[^\n]*/gi, '');
  s = s.replace(/\[\d+\s*marks?,?\s*-\d+\s*for\s*a\s*wrong\s*answer\][^\n]*/gi, '');
  s = s.replace(/\[\d+\s*marks?,?\s*1\s*for\s*a\s*wrong\s*answer\][^\n]*/gi, '');
  s = s.replace(/ANSWER\s*:\s*[A-D0-9\.\-]+/gi, '');
  s = s.replace(/--+/g, '—');
  return s.trim();
}

const parsedResults = {};

for (let q = 1; q <= 217; q++) {
  const c = chunks[q];
  if (!c) {
    console.log(`Missing chunk for Q${q}`);
    continue;
  }
  const lines = c.lines;
  let ansIdx = -1;
  for (let l = 0; l < lines.length; l++) {
    if (/ANSWER\s*:\s*/i.test(lines[l])) {
      ansIdx = l;
      break;
    }
  }

  const preLines = ansIdx !== -1 ? lines.slice(0, ansIdx) : lines;
  const postLines = ansIdx !== -1 ? lines.slice(ansIdx) : [];

  // Remove question number from first line
  let firstLine = preLines[0] || '';
  firstLine = firstLine.replace(/^(\bQ\.?\s*)?\d+[\.:\)]\s*/i, '');
  firstLine = firstLine.replace(/^(8\.|TM\.|S51|M0\.|MM\.|M3\.|LUE|M7\.|M[89]\.|13|15|189\.|82\.|Ho:|i308|bi|ea)\s*/i, '');
  
  const questionContent = [firstLine, ...preLines.slice(1)].join('\n');
  const solutionContent = postLines.join('\n');

  parsedResults[q] = {
    q,
    rawQuestion: questionContent,
    rawSolution: solutionContent,
    key: officialKeys[q],
    isNumeric: NUMERICAL_QUESTIONS.has(q)
  };
}

fs.writeFileSync(path.resolve(__dirname, 'dual_nature_parsed_raw.json'), JSON.stringify(parsedResults, null, 2));
console.log(`Parsed raw content for ${Object.keys(parsedResults).length} questions.`);
