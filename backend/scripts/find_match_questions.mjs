import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/biotech_pages_dump.json', 'utf8'));

let fullText = pages.slice(0, 33).map(p => p.rawText).join('\n');

const matchMatches = fullText.match(/(?:Match List|Match Column|List\s*[-–]?\s*I|Column\s*[-–]?\s*I)/gi);
console.log('Match occurrences:', matchMatches ? matchMatches.length : 0);

// Let's find which question numbers have Match
for (let p = 0; p < 33; p++) {
  const lines = pages[p].lines;
  let curQ = null;
  for (const line of lines) {
    const qM = line.match(/^Q(\d+)\./);
    if (qM) curQ = qM[1];
    if (/(?:Match List|Match Column|List\s*[-–]?\s*I|Column\s*[-–]?\s*I)/i.test(line)) {
      console.log(`Q${curQ} on page ${p + 1} has Match: ${line}`);
    }
  }
}
