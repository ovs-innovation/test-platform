import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/solutions_ocr.json', 'utf8'));
const key = JSON.parse(fs.readFileSync('backend/scripts/solutions_official_key.json', 'utf8'));

const start = parseInt(process.argv[2] || '1', 10);
const end = parseInt(process.argv[3] || '25', 10);

for (let q = start; q <= end; q++) {
  console.log(`=== Q${q} (Official Ans: ${key[q]}) ===`);
  console.log(ocr[q]?.trim());
  console.log('----------------------------------------------------');
}
