import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_ocr_cache.json'), 'utf8'));

// 1. First let's parse page 145 answer key
const page145Text = cache['145'] || '';
console.log('Page 145 Answer Key Text:\n', page145Text);

// 2. Scan every page 1..144 for "ANSWER: X" or question headers
const questionHeaders = [];

for (let p = 1; p <= 144; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  for (let l = 0; l < lines.length; l++) {
    const line = lines[l].trim();
    // match "1 Capacitance", "2. If there", "74.", etc.
    const m = line.match(/^(\d{1,3})[\.\s]+(.*)/);
    if (m) {
      const qNum = parseInt(m[1], 10);
      if (qNum >= 1 && qNum <= 176) {
        questionHeaders.push({
          qNum,
          page: p,
          lineIdx: l,
          rawHeader: line,
          textAfter: m[2]
        });
      }
    }
  }
}

console.log(`Found ${questionHeaders.length} question header matches across pages 1..144.`);

// Check for missing questions 1..176
const foundQNums = new Set(questionHeaders.map(q => q.qNum));
const missingQNums = [];
for (let i = 1; i <= 176; i++) {
  if (!foundQNums.has(i)) {
    missingQNums.push(i);
  }
}
console.log('Missing question numbers from naive regex:', missingQNums);

// Also look for "ANSWER:" lines
const pageAnswers = [];
for (let p = 1; p <= 144; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  for (let l = 0; l < lines.length; l++) {
    const line = lines[l].trim();
    const ansMatch = line.match(/ANSWER\s*:\s*(.+)/i);
    if (ansMatch) {
      pageAnswers.push({
        page: p,
        lineIdx: l,
        answer: ansMatch[1].trim()
      });
    }
  }
}
console.log(`Found ${pageAnswers.length} ANSWER lines on pages 1..144.`);
