import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/bonding_ocr_cache.json', 'utf8'));

let output = '';
for (let p = 99; p <= 120; p++) {
  output += `\n<<< PAGE ${p} >>>\n` + (ocr[p] || '');
}

fs.writeFileSync('./backend/scripts/pages_99_120.txt', output);
console.log('Saved pages_99_120.txt, size:', output.length);
