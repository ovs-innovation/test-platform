import fs from 'fs';

const content = fs.readFileSync('./backend/scripts/anatomy_extracted_lines.txt', 'utf8');

const lines = content.split('\n');

const matchQs = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const qm = line.match(/^Q(\d+)\./);
  if (qm) {
    const qNum = parseInt(qm[1]);
    const block = lines.slice(i, i + 15).join(' ');
    if (/Match\s+(List|Column|the)/i.test(block)) {
      matchQs.push(qNum);
    }
  }
}

console.log('Match questions found:', matchQs);

for (const qNum of matchQs) {
  const regex = new RegExp(`(Q${qNum}\\..*?)(?=Q${qNum + 1}\\.|=== PAGE|$)`, 's');
  const match = content.match(regex);
  console.log(`\n================ Q${qNum} ===============`);
  if (match) {
    console.log(match[1].trim());
  }
}
