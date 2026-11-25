import fs from 'fs';

const cache = JSON.parse(fs.readFileSync('backend/scripts/emi_jee_ocr_cache.json', 'utf8'));

// 1. Parse answers from Page 144
const p144 = cache['144'] || '';
const p144Tokens = p144.replace(/\n/g, ' ').split(/\s+/).filter(Boolean);

// Find tokens like "1.D", "2.D", "56. 175"
const p144Keys = {};
for (let i = 0; i < p144Tokens.length; i++) {
  const tok = p144Tokens[i];
  // Match "1.D" or "56." followed by "175"
  const m1 = tok.match(/^(\d+)\.([A-Za-z0-9]+)$/);
  if (m1) {
    p144Keys[parseInt(m1[1], 10)] = m1[2];
    continue;
  }
  const m2 = tok.match(/^(\d+)\.$/);
  if (m2 && i + 1 < p144Tokens.length) {
    p144Keys[parseInt(m2[1], 10)] = p144Tokens[i + 1];
    i++;
  }
}

// 2. Parse inline answers from pages 1 to 143
const inlineAnswers = [];
for (let p = 1; p <= 143; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  for (let l = 0; l < lines.length; l++) {
    const line = lines[l].trim();
    const m = line.match(/^ANSWER\s*:\s*([A-Za-z0-9\.\-\/]+)/i);
    if (m) {
      inlineAnswers.push({ page: p, line: line, ans: m[1] });
    }
  }
}

console.log('p144 keys parsed count:', Object.keys(p144Keys).length);
console.log('inline answers parsed count:', inlineAnswers.length);

// Compare Q1 to Q173
const finalKeys = {};
const mismatches = [];

for (let q = 1; q <= 173; q++) {
  let k144 = p144Keys[q];
  // Inline answer corresponding to q
  // Let's see if we have inline answers in sequence
  finalKeys[q] = {
    p144: k144,
    inline: inlineAnswers[q - 1]?.ans
  };
  if (k144 !== inlineAnswers[q - 1]?.ans) {
    mismatches.push({ q, p144: k144, inline: inlineAnswers[q - 1]?.ans, page: inlineAnswers[q - 1]?.page });
  }
}

console.log(`Mismatches between p144 and inline: ${mismatches.length}`);
console.log('Mismatches sample:', mismatches);
