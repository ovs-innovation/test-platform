import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/ionic_ocr_cache.json', 'utf8'));

function dumpRange(startP, endP, outFile) {
  let s = '';
  for (let p = startP; p <= endP; p++) {
    s += `\n\n=== PAGE ${p} ===\n\n` + (ocr[p] || '');
  }
  fs.writeFileSync(outFile, s, 'utf8');
  console.log(`Wrote ${outFile} (Pages ${startP} to ${endP}), length: ${s.length}`);
}

dumpRange(1, 12, 'backend/scripts/ionic_part1_raw.txt');   // Q1..Q40
dumpRange(12, 28, 'backend/scripts/ionic_part2_raw.txt');  // Q41..Q80
dumpRange(28, 45, 'backend/scripts/ionic_part3_raw.txt');  // Q81..Q120
dumpRange(45, 64, 'backend/scripts/ionic_part4_raw.txt');  // Q121..Q159
