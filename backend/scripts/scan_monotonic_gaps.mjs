import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

// Let's inspect pages 1 to 202 and find where each question starts
const qStarts = [];

// Regex to look for explicit question numbers:
// e.g. "1.", "2.", "3.", ..., "268."
// or lines starting with number
for (let p = 1; p <= 202; p++) {
  const text = pages[String(p)] || '';
  const lines = text.split('\n');
  lines.forEach((l, li) => {
    const trimmed = l.trim();
    // Check if line starts with a number followed by dot or space
    const m = trimmed.match(/^([0-9]{1,3})[\.\s]/);
    if (m) {
      const num = parseInt(m[1], 10);
      if (num >= 1 && num <= 268) {
        qStarts.push({ page: p, lineIdx: li, num, line: trimmed });
      }
    }
  });
}

console.log(`Found ${qStarts.length} raw numeric line starts.`);

// Let's filter to those that are strictly or nearly increasing
const monotonic = [];
let lastNum = 0;
for (const qs of qStarts) {
  if (qs.num === lastNum + 1) {
    monotonic.push(qs);
    lastNum = qs.num;
  } else if (qs.num > lastNum && qs.num <= lastNum + 4) {
    // maybe skipped 1 or 2
    console.log(`Gap from ${lastNum} to ${qs.num} at Page ${qs.page}: "${qs.line.slice(0, 50)}"`);
    monotonic.push(qs);
    lastNum = qs.num;
  }
}

console.log(`Found ${monotonic.length} monotonic starts up to ${lastNum}`);
