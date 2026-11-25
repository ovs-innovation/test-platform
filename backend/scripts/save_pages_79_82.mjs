import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/bonding_ocr_cache.json', 'utf8'));

let output = '';
for (let p = 79; p <= 82; p++) {
  output += `\n<<< PAGE ${p} >>>\n` + (ocr[p] || '');
}

fs.writeFileSync('./backend/scripts/pages_79_82.txt', output);
console.log('Saved pages_79_82.txt, size:', output.length);
