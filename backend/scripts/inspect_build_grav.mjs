import fs from 'fs';
const f = fs.readFileSync('backend/scripts/build_clean_gravitation_part1.mjs', 'utf8');
console.log('Length:', f.length);
console.log('Snippet (first 1200 chars):');
console.log(f.slice(0, 1200));
