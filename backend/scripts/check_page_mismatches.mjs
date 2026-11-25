import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// Count answers per page
const pageAnsCounts = {};
for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  let cnt = 0;
  for (let l of lines) {
    if (/answer\s*:/i.test(l.trim())) {
      cnt++;
    }
  }
  pageAnsCounts[p] = cnt;
}

// Let's also count questions per page
const pageQCounts = {};
for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  let qMatches = [];
  for (let l of lines) {
    const m = l.trim().match(/^(\d{1,3})[\.\s\:\-]\s*(.*)/);
    if (m) {
      const num = parseInt(m[1], 10);
      if (num >= 1 && num <= 300) {
        qMatches.push(num);
      }
    }
  }
  pageQCounts[p] = qMatches;
}

const diffs = [];
for (let p = 1; p <= 170; p++) {
  const qList = pageQCounts[p];
  const ansCount = pageAnsCounts[p];
  if (qList.length !== ansCount) {
    diffs.push({ page: p, qList, ansCount });
  }
}

console.log(`Pages where question count != answer count: ${diffs.length}`);
console.log(diffs.slice(0, 25));
