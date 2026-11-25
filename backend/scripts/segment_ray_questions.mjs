import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linearText = fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_linear.txt'), 'utf8');
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_official_keys.json'), 'utf8'));

// Split by pages 1..250
const pageBlocks = linearText.split(/=== PAGE (\d+) ===/).slice(1);
const pageMap = {};
for (let i = 0; i < pageBlocks.length; i += 2) {
  const p = parseInt(pageBlocks[i], 10);
  if (p <= 250) {
    pageMap[p] = pageBlocks[i + 1] || '';
  }
}

console.log(`Total question pages: ${Object.keys(pageMap).length}`);

// Let's inspect where questions are on each page
// We will output a summary of found questions
const qMap = {};

for (let p = 1; p <= 250; p++) {
  const text = pageMap[p];
  if (!text) continue;
  
  // Find all answer lines on this page
  const ansMatches = [...text.matchAll(/^(?:ANSWER|Answer|Ans)\s*:\s*([^\n\r]+)/gim)];
  if (ansMatches.length > 0) {
    qMap[p] = ansMatches.map(m => m[1].trim());
  }
}

const pagesWithAnswers = Object.keys(qMap).length;
const totalAnswers = Object.values(qMap).reduce((acc, v) => acc + v.length, 0);
console.log(`Pages with answers: ${pagesWithAnswers}, Total answers found: ${totalAnswers}`);

fs.writeFileSync(
  path.resolve(__dirname, 'ray_page_answers_map.json'),
  JSON.stringify(qMap, null, 2)
);
