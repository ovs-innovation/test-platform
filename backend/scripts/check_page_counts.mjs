import fs from 'fs';

const base = JSON.parse(fs.readFileSync('backend/scripts/gravitation_base_records.json', 'utf8'));

const pages = {};
for (const b of base) {
  if (!pages[b.page]) pages[b.page] = [];
  pages[b.page].push(b.qNum);
}

const counts = { 1: 0, 2: 0, 3: 0, more: 0 };
for (const [p, qList] of Object.entries(pages)) {
  if (qList.length === 1) counts[1]++;
  else if (qList.length === 2) counts[2]++;
  else if (qList.length === 3) counts[3]++;
  else counts.more++;
}

console.log('Pages with 1 question:', counts[1]);
console.log('Pages with 2 questions:', counts[2]);
console.log('Pages with 3 questions:', counts[3]);
console.log('Pages with >3 questions:', counts.more);
