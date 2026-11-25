import fs from 'fs';
const f = fs.readFileSync('backend/scripts/clean_com_part1.mjs', 'utf8');
console.log('clean_com_part1.mjs length:', f.length);
console.log('Sample (first 1000 chars):');
console.log(f.slice(0, 1000));
