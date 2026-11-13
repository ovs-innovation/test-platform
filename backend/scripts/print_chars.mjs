import fs from 'fs';

const content = fs.readFileSync('backend/scripts/hydrocarbons_pyq_part2.mjs', 'utf8');
const lines = content.split('\n');
const line24 = lines[23];
console.log('Line 24 length:', line24.length);
for (let i = 0; i < line24.length; i++) {
  console.log(`${i}: '${line24[i]}' (${line24.charCodeAt(i)})`);
}

