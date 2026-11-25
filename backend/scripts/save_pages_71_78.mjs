import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/bonding_ocr_cache.json', 'utf8'));

let output = '';
for (let p = 71; p <= 78; p++) {
  output += `\n<<< PAGE ${p} >>>\n` + (ocr[p] || '');
}

fs.writeFileSync('./backend/scripts/pages_71_78.txt', output);
console.log('Saved pages_71_78.txt, size:', output.length);
