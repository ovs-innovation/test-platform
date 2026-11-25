import fs from 'fs';

const chunks = JSON.parse(fs.readFileSync('backend/scripts/emi_monotonic_chunks.json', 'utf8'));

const candidates = [];

for (let q = 1; q <= 173; q++) {
  const c = chunks[q];
  // Check the text BEFORE the marks/ANSWER line (i.e. the question statement)
  const qLines = [];
  for (const l of c.lines) {
    if (l.match(/\[\d+\s*marks/i) || l.match(/^ANSWER\s*:/i)) break;
    qLines.push(l);
  }
  const qText = qLines.join(' ');
  const figMatch = qText.match(/(figure|circuit|graph|shown|plot|diagram)/i);
  if (figMatch) {
    candidates.push({
      q,
      startPage: c.startPage,
      endPage: c.endPage,
      match: figMatch[0],
      snippet: qText.substring(0, 100)
    });
  }
}

console.log(`Found ${candidates.length} questions mentioning figure/circuit/graph/shown:`);
console.log(JSON.stringify(candidates, null, 2));
