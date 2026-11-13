import fs from 'fs';

const dump = JSON.parse(fs.readFileSync('./backend/scripts/body_fluids_pages_dump.json', 'utf8'));

for (const pNum of [12, 13, 14, 15]) {
  const p = dump.find(d => d.page === pNum);
  console.log(`\n================ Page ${pNum} ================`);
  for (const it of p.items) {
    if (it.str.includes('Q42') || it.str.includes('Q43') || it.str.includes('Q44') || it.str.includes('Q45') ||
        it.str.includes('Q46') || it.str.includes('Q47') || it.str.includes('Q48') || it.str.includes('Q49') || it.str.includes('Q50') ||
        it.str.includes('The figure') || it.str.includes('The diagram') || it.str.includes('(A)')) {
      console.log(`y: ${it.y}, top: ${(841.92 - it.y) * 2}, text: "${it.str.slice(0, 60)}"`);
    }
  }
}

