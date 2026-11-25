import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/bonding_ocr_cache.json', 'utf8'));

let output = '';
for (let p = 35; p <= 53; p++) {
  output += `\n<<< PAGE ${p} >>>\n` + (ocr[p] || '');
}

fs.writeFileSync('./backend/scripts/pages_35_53.txt', output);
console.log('Saved pages_35_53.txt, size:', output.length);
