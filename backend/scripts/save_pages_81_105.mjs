import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/bonding_ocr_cache.json', 'utf8'));

let output = '';
for (let p = 81; p <= 105; p++) {
  output += `\n<<< PAGE ${p} >>>\n` + (ocr[p] || '');
}

fs.writeFileSync('./backend/scripts/pages_81_105.txt', output);
console.log('Saved pages_81_105.txt, size:', output.length);
