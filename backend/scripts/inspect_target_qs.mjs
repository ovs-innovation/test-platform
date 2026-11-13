import fs from 'fs';

const content = fs.readFileSync('./backend/scripts/morphology_extracted_lines.txt', 'utf8');

const targetQs = [5, 15, 16, 26, 31, 32, 62, 86, 91, 95, 96, 97, 146, 153, 159];

for (const qNum of targetQs) {
  const regex = new RegExp(`(Q${qNum}\\..*?)(?=Q${qNum + 1}\\.|=== PAGE|$)`, 's');
  const match = content.match(regex);
  console.log(`\n================ Q${qNum} ===============`);
  if (match) {
    console.log(match[1].trim());
  } else {
    // find index of `Q${qNum}.`
    const idx = content.indexOf(`Q${qNum}.`);
    if (idx !== -1) {
      console.log(content.slice(idx, idx + 400));
    } else {
      console.log('NOT FOUND');
    }
  }
}

