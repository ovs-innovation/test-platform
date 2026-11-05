import fs from 'fs';

const mapped = JSON.parse(fs.readFileSync('./backend/scripts/mapped_305_boundaries.json', 'utf8'));

// Check how many questions are on each page
const pageCounts = {};
for (const m of mapped) {
  pageCounts[m.page] = (pageCounts[m.page] || 0) + 1;
}

console.log('Pages with questions count:', Object.keys(pageCounts).length);
console.log('Distribution of questions per page:');
const freq = {};
for (const [p, c] of Object.entries(pageCounts)) {
  freq[c] = (freq[c] || 0) + 1;
}
console.log(freq);

// Are there pages with 0 questions?
const emptyPages = [];
for (let p = 1; p <= 247; p++) {
  if (!pageCounts[p]) emptyPages.push(p);
}
console.log('Pages without an ANSWER line (could be solution continuation):', emptyPages);

