import fs from 'fs';

const linear = fs.readFileSync('backend/scripts/thermo_ocr_linear.txt', 'utf8');

// Find page ranges for each part:
// Pages 1 to 16: Q1 to Q50
// Pages 16 to 37: Q51 to Q100
// Pages 38 to 54: Q101 to Q150
// Pages 54 to 72: Q151 to Q200
// Pages 72 to 98: Q201 to Q245

const cache = JSON.parse(fs.readFileSync('backend/scripts/thermo_ocr_cache.json', 'utf8'));

function getPagesText(start, end) {
  let s = '';
  for (let p = start; p <= end; p++) {
    s += `\n\n=== PAGE ${p} ===\n\n` + (cache[p] || '');
  }
  return s;
}

fs.writeFileSync('backend/scripts/thermo_part1_raw.txt', getPagesText(1, 16));
fs.writeFileSync('backend/scripts/thermo_part2_raw.txt', getPagesText(16, 37));
fs.writeFileSync('backend/scripts/thermo_part3_raw.txt', getPagesText(38, 54));
fs.writeFileSync('backend/scripts/thermo_part4_raw.txt', getPagesText(54, 72));
fs.writeFileSync('backend/scripts/thermo_part5_raw.txt', getPagesText(72, 98));

console.log('Saved raw part files 1 to 5 successfully.');
