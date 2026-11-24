import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_pages_raw.json'), 'utf8'));

console.log(`Loaded ${pages.length} pages.`);

// Check question occurrences across pages
const qMap = {};

for (const p of pages) {
  const text = p.rawText;
  // Match question headers e.g., "Q. 1", "Q.1", "Q 1", "Q. 191", "Q1"
  const regex = /Q\.?\s*(\d+)/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const qNum = parseInt(match[1], 10);
    if (qNum >= 1 && qNum <= 191) {
      if (!qMap[qNum]) qMap[qNum] = [];
      qMap[qNum].push(p.pageNum);
    }
  }
}

console.log(`Found ${Object.keys(qMap).length} distinct question numbers matched in raw text.`);
const missing = [];
for (let i = 1; i <= 191; i++) {
  if (!qMap[i]) missing.push(i);
}
console.log('Missing question numbers from direct regex:', missing);
for (let i = 1; i <= 10; i++) {
  console.log(`Q${i} found on pages:`, qMap[i]);
}
