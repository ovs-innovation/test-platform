import fs from 'fs';

const key = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_binomial_theorem.json', 'utf8'));

key[49] = 'A';
key[84] = 'A';
key[95] = 'A';

fs.writeFileSync('backend/scripts/official_answer_key_binomial_theorem.json', JSON.stringify(key, null, 2), 'utf8');
console.log('Updated official answer key with Q49, Q84, Q95!');

