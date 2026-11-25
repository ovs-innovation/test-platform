import fs from 'fs';
const p1 = fs.readFileSync('backend/scripts/gravitation_pyq_part1.mjs', 'utf8');
const p2 = fs.readFileSync('backend/scripts/gravitation_pyq_part2.mjs', 'utf8');
const p3 = fs.readFileSync('backend/scripts/gravitation_pyq_part3.mjs', 'utf8');
console.log('p1 length:', p1.length, 'p2 length:', p2.length, 'p3 length:', p3.length);
console.log('p2 sample:');
console.log(p2.slice(0, 500));
