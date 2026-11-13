import fs from 'fs';

const blocks = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_raw_blocks.json', 'utf8'));

const matchQuestions = [];
for (const b of blocks) {
  const text = b.rawLines.join('\n');
  if (text.includes('Match') || text.includes('List - I') || text.includes('List I') || text.includes('Column')) {
    matchQuestions.push({ qNum: b.qNum, lines: b.rawLines });
  }
}

console.log(`Found ${matchQuestions.length} match questions:`, matchQuestions.map(m => m.qNum));

for (const m of matchQuestions) {
  console.log(`\n--- Q${m.qNum} ---`);
  console.log(m.lines.join('\n'));
}
