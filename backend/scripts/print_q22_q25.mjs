import fs from 'fs';

const blocks = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_raw_blocks.json', 'utf8'));

for (const qNum of [22, 25]) {
  const b = blocks.find(x => x.qNum === qNum);
  console.log(`\n=== Q${qNum} ===`);
  console.log(b.rawLines.join('\n'));
}

