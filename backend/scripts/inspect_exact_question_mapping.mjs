import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocrCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));

// Find exact occurrences of Q1..Q298
const foundQuestions = {};

for (let p = 1; p <= 250; p++) {
  const text = ocrCache[String(p)] || '';
  const lines = text.split('\n');

  for (let idx = 0; idx < lines.length; idx++) {
    const l = lines[idx].trim();
    // Patterns:
    // "1. If two mirrors..."
    // "1- If two..."
    // "1 If two..."
    // "[JEE Main 2021] 1."
    // "Lif two mirrors" (L -> 1)
    // "oa light ray" (oa -> 7? Q7 is on p3)
    const m = l.match(/(?:^|\s)(?:Q\.?\s*)?(\d{1,3})[\.\-\)\s]+([A-Za-z].*)/);
    if (m) {
      const num = parseInt(m[1], 10);
      if (num >= 1 && num <= 298) {
        if (!foundQuestions[num]) foundQuestions[num] = [];
        foundQuestions[num].push({ page: p, line: l.slice(0, 80) });
      }
    }
  }
}

console.log(`Total distinct question numbers found: ${Object.keys(foundQuestions).length}`);
const missing = [];
for (let i = 1; i <= 298; i++) {
  if (!foundQuestions[i]) missing.push(i);
}
console.log('Missing question numbers:', missing);
fs.writeFileSync(
  path.resolve(__dirname, 'ray_found_questions_map.json'),
  JSON.stringify(foundQuestions, null, 2)
);
