import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);
const ansKey = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_statistics.json', 'utf8').replace(/^\uFEFF/, ''));

let currentQ = 1;
const pageQMap = {};

for (let i = 0; i < 127; i++) {
  const p = pages[i];
  const ansMatches = [...p.text.matchAll(/ANSWER:\s*([A-Za-z0-9\-]+)/gi)];
  pageQMap[p.page] = [];
  for (const m of ansMatches) {
    pageQMap[p.page].push({
      q: currentQ,
      expectedAns: ansKey[currentQ],
      foundAns: m[1]
    });
    currentQ++;
  }
}

console.log(`Assigned through Q${currentQ - 1}/160.`);

// Print any pages where count was unexpected or where answer didn't match
for (let pNum = 1; pNum <= 127; pNum++) {
  const qs = pageQMap[pNum];
  if (!qs || qs.length === 0) {
    console.log(`Page ${pNum}: NO ANSWER found!`);
  } else {
    for (const item of qs) {
      if (item.expectedAns && item.foundAns.toUpperCase() !== item.expectedAns && item.foundAns.toLowerCase() !== 'g') {
        console.log(`Mismatch on P${pNum} Q${item.q}: expected ${item.expectedAns}, found ${item.foundAns}`);
      }
    }
  }
}

