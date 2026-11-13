import fs from 'fs';

const dump = JSON.parse(fs.readFileSync('./backend/scripts/structural_org_pages_dump.json', 'utf8'));

for (const pNum of [15, 16, 17]) {
  const p = dump.find(d => d.page === pNum);
  console.log(`\n================ Page ${pNum} ================`);
  for (const it of p.items) {
    if (it.str.includes('Q58') || it.str.includes('Identify the tissue') || it.str.includes('(A)') || it.str.includes('Q59') ||
        it.str.includes('Q60') || it.str.includes('Given below') || it.str.includes('Q61') ||
        it.str.includes('Q62') || it.str.includes('The four sketches') || it.str.includes('Q63')) {
      console.log(`y: ${it.y}, top: ${(841.92 - it.y) * 2}, text: "${it.str.slice(0, 60)}"`);
    }
  }
}

