import fs from 'fs';

const dump = JSON.parse(fs.readFileSync('./backend/scripts/breathing_pages_dump.json', 'utf8'));

for (const pNum of [11, 13]) {
  const p = dump.find(d => d.page === pNum);
  console.log(`\n================ Page ${pNum} ================`);
  for (const it of p.items) {
    if (it.str.includes('Q38') || it.str.includes('The figure shows') || it.str.includes('(A)') || it.str.includes('Q39') ||
        it.str.includes('Q44') || it.str.includes('The figure given') || it.str.includes('Q45')) {
      console.log(`y: ${it.y}, top: ${(841.92 - it.y) * 2}, text: "${it.str.slice(0, 60)}"`);
    }
  }
}
