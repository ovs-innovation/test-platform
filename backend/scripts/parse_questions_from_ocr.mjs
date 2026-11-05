import fs from 'fs';

const raw = fs.readFileSync('./backend/scripts/vector_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

const ansKey = JSON.parse(fs.readFileSync('./backend/scripts/official_answer_key.json', 'utf8'));

// We want to find the exact page and line for each question 1..305
const questionLocations = {};

for (const p of pages) {
  for (let i = 0; i < p.lines.length; i++) {
    const line = p.lines[i];
    const text = typeof line === 'string' ? line : line.Text;
    
    // Look for question start: e.g. "1.", "1 ", "105.", "241." at start of line or after bullet
    const m = text.match(/^\s*(?:•\s*)?(\d{1,3})\s*[\.\)]\s*(.*)$/);
    if (m) {
      const qNum = parseInt(m[1], 10);
      if (qNum >= 1 && qNum <= 305 && !questionLocations[qNum]) {
        questionLocations[qNum] = {
          page: p.page,
          lineIdx: i,
          text: m[2],
          rawLine: text
        };
      }
    }
  }
}

console.log('Direct regex question headers found:', Object.keys(questionLocations).length);
const missing = [];
for (let i = 1; i <= 305; i++) {
  if (!questionLocations[i]) missing.push(i);
}
console.log('Missing question numbers from direct line start regex:', missing);

