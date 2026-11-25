import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocrCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_clean_diagram_urls.json'), 'utf8'));

// Assemble linear stream of lines with page information
const allLines = [];
for (let p = 1; p <= 250; p++) {
  const text = ocrCache[String(p)] || '';
  const lines = text.split('\n');
  for (let l of lines) {
    allLines.push({ page: p, text: l.trim() });
  }
}

console.log(`Loaded ${allLines.length} lines from 250 pages.`);

// Find all question boundaries
// A question begins with a question number or immediately after the previous question's solution/answer
// Let's identify every ANSWER line
const answerIndices = [];
for (let i = 0; i < allLines.length; i++) {
  const t = allLines[i].text;
  if (/^(?:ANSWER|Answer|Ans)\s*:/i.test(t)) {
    answerIndices.push(i);
  }
}

console.log(`Found ${answerIndices.length} ANSWER lines across all 250 pages.`);
fs.writeFileSync(
  path.resolve(__dirname, 'ray_raw_answer_indices.json'),
  JSON.stringify(answerIndices.map(idx => ({ idx, line: allLines[idx] })), null, 2)
);
