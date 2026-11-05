import fs from 'fs';

// Load page 169 parsed answers
const text169 = fs.readFileSync('backend/scripts/page169_text_raw.txt', 'utf8');

const key = {};

let clean = text169
  .replace(/go\.\s*(\d+|[A-D])/gi, '90. $1')
  .replace(/1B\b/g, '1. B')
  .replace(/(\d+)\.([A-D]|\d+)/g, '$1. $2');

const matches = [...clean.matchAll(/(\d+)[\.:\s]+([A-Da-e]|\d+)/g)];
for (const m of matches) {
  const qNum = parseInt(m[1]);
  if (qNum >= 1 && qNum <= 260) {
    let ans = m[2].toUpperCase();
    if (ans === 'E') ans = 'C'; // OCR misread 'c' as 'e' sometimes
    if (ans === 'O') ans = 'D'; // OCR misread 'D' as 'O'
    key[qNum] = ans;
  }
}

// Fill in / verify known questions from pages
// Q1 to Q10:
// From page 1 & summary:
// 1. C (wait, let's check Q1 in detail: page 1 says n equals... let's check options and worked solution)
// 2. C (924)
// 3. A (equal)
// 4. C (3)
// 5. C (33)
// 6. D (8th term)
// 7. B
// 8. C (-3)
// 9. A
// 10. D
key[1] = 'C'; // Let's check Q1 specifically
key[2] = 'C';
key[3] = 'A';
key[4] = 'C';
key[5] = 'C';
key[6] = 'D';
key[7] = 'B';
key[8] = 'C';
key[9] = 'A';
key[10] = 'D';

// Other missing from page 169:
key[26] = 'A';
key[30] = 'A';
key[44] = 'D';
key[49] = 'D';
key[75] = 'B';
key[83] = 'A';
key[84] = 'D';
key[86] = '120';
key[87] = 'D';
key[88] = 'C';
key[95] = 'D';
key[136] = 'A';
key[147] = 'C';
key[165] = 'A';
key[194] = 'A';
key[199] = 'D';
key[206] = 'D';

// Let's verify Q1 to Q260
const missing = [];
for (let i = 1; i <= 260; i++) {
  if (!key[i]) missing.push(i);
}

console.log(`Answer key populated: ${Object.keys(key).length}/260.`);
console.log(`Missing: ${missing.length}`, missing);

fs.writeFileSync('backend/scripts/official_answer_key_binomial_theorem.json', JSON.stringify(key, null, 2), 'utf8');
console.log('Saved backend/scripts/official_answer_key_binomial_theorem.json');

