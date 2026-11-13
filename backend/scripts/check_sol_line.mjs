import fs from 'fs';

const content = fs.readFileSync('backend/scripts/hydrocarbons_pyq_part2.mjs', 'utf8');
const lines = content.split('\n');
const solLine = lines[27]; // line 28
console.log('Line 28:');
console.log(solLine);
// Check for any single backslash
const matches = [...solLine.matchAll(/\\./g)];
console.log('Escapes in line 28:', matches.map(m => m[0]));

