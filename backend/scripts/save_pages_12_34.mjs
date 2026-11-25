import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/bonding_ocr_cache.json', 'utf8'));

// Print pages 12 to 34
let output = '';
for (let p = 12; p <= 34; p++) {
  output += `\n<<< PAGE ${p} >>>\n` + (ocr[p] || '');
}

fs.writeFileSync('./backend/scripts/pages_12_34.txt', output);
console.log('Saved pages_12_34.txt, size:', output.length);
