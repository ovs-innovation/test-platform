import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linearText = fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_linear.txt'), 'utf8');

// Match "=== PAGE X ==="
const pageBlocks = linearText.split(/=== PAGE (\d+) ===/).slice(1);
const pages = [];
for (let i = 0; i < pageBlocks.length; i += 2) {
  const pNum = parseInt(pageBlocks[i], 10);
  const pText = pageBlocks[i + 1] || '';
  pages.push({ pageNum: pNum, text: pText });
}

// Find questions sequentially from 1 to 298
// Let's inspect where each question number appears
const questionLocations = {};

for (const p of pages) {
  if (p.pageNum >= 251) continue;
  const lines = p.text.split('\n');
  for (let lIdx = 0; lIdx < lines.length; lIdx++) {
    const l = lines[lIdx].trim();
    // Match patterns like "1.", "1 .", "1-", "1 ", "Q.1", "Q1", "[1]", "Q 1"
    const m = l.match(/^(?:Q\.?\s*|\[)?(\d{1,3})(?:[\.\-\)\s\]]+)(.*)/i);
    if (m) {
      const qNum = parseInt(m[1], 10);
      if (qNum >= 1 && qNum <= 298) {
        if (!questionLocations[qNum]) {
          questionLocations[qNum] = [];
        }
        questionLocations[qNum].push({ page: p.pageNum, lineIdx: lIdx, text: l });
      }
    }
  }
}

const found = Object.keys(questionLocations).map(Number).sort((a,b)=>a-b);
console.log(`Found direct starts for ${found.length} / 298 question numbers.`);

const missing = [];
for (let i = 1; i <= 298; i++) {
  if (!questionLocations[i]) missing.push(i);
}
console.log('Missing direct number matches:', missing.length > 0 ? missing : 'None! All 298 found!');
