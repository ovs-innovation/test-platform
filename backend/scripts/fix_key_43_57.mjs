import fs from 'fs';

const key = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_binomial_theorem.json', 'utf8'));

key[43] = 'B';
key[57] = 'B';

fs.writeFileSync('backend/scripts/official_answer_key_binomial_theorem.json', JSON.stringify(key, null, 2), 'utf8');
console.log('Fixed Q43=B and Q57=B in official_answer_key_binomial_theorem.json');

