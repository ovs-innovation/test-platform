import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/plant_growth_pages_dump.json', 'utf8'));

for (const qNum of [3, 35]) {
  console.log(`\n=== RAW LINES FOR Q${qNum} ===`);
  const lines = fs.readFileSync('./backend/scripts/plant_growth_extracted_lines.txt', 'utf8').split('\n');
  const startIdx = lines.findIndex(l => l.includes(`Q${qNum}.`));
  const endIdx = lines.findIndex(l => l.includes(`Q${qNum + 1}.`));
  console.log(lines.slice(startIdx, endIdx).join('\n'));
}

