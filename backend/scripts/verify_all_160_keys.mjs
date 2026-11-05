import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

const ansKey = {};

// 1. First, extract from page 128 words cleanly:
// Every question in the table has format: `<number>. <answer>`
const wordsRaw = fs.readFileSync('backend/scripts/page_128_words.json', 'utf8').replace(/^\uFEFF/, '');
const p128Words = JSON.parse(wordsRaw);

for (const w of p128Words) {
  // If word ends with a dot and is a number, e.g. "14."
  const m = w.Text.match(/^(\d{1,3})\.$/);
  if (m) {
    const qNum = parseInt(m[1]);
    // Find next word on the same row (Y within 15px, X > w.X)
    const nextWords = p128Words.filter(nw => Math.abs(nw.Y - w.Y) < 15 && nw.X > w.X).sort((a,b) => a.X - b.X);
    if (nextWords[0]) {
      let val = nextWords[0].Text.toUpperCase().trim();
      // 'c' -> 'C', 'o' -> '0'
      if (val === 'O') val = '0';
      ansKey[qNum] = val;
    }
  }
}

console.log(`Answers extracted from p128 table using strict "<q>. <ans>": ${Object.keys(ansKey).length}`);

// 2. Cross-verify with page OCR "ANSWER: X" for every page 1-127
// Let's find each question on each page
for (let pIdx = 0; pIdx < 127; pIdx++) {
  const p = pages[pIdx];
  const text = p.text;
  
  // Find questions and their answers on this page
  // A question typically has "N. " or "N• " or starts at top of page
  // Let's search for "ANSWER:\s*([A-Za-z0-9\-]+)"
  const ansMatches = [...text.matchAll(/ANSWER:\s*([A-Za-z0-9\-]+)/gi)];
  // Also search for question number headers
  const qMatches = [...text.matchAll(/(?:^|\n|\s)(\d{1,3})\s*[\.\•]\s+/g)];
  
  // Print any discrepancies
}

// Explicit overrides verified by page OCR:
ansKey[1] = "B";  // 65 (Option B)
ansKey[2] = "A";  // remains same (Option A)
ansKey[3] = "B";  // 78.00 (Option B)
ansKey[4] = "C";  // (a) and (b) (Option C)
ansKey[5] = "C";  // 2 (Option C)
ansKey[6] = "B";  // 18 (Option B)
ansKey[7] = "D";  // 24.0 (Option D)
ansKey[8] = "A";  // 1 (Option A)
ansKey[9] = "C";  // 80 (Option C)
ansKey[10] = "D"; // 3, 4 (Option D)
ansKey[11] = "D"; // Statement 1 false, 2 true (Option D)
ansKey[12] = "C"; // 10.1 (Option C)

ansKey[14] = "B"; // Option B (value 4)
ansKey[28] = "A";
ansKey[29] = "A";
ansKey[32] = "A";
ansKey[37] = "A";
ansKey[48] = "A";
ansKey[58] = "A";
ansKey[59] = "A";
ansKey[70] = "11";
ansKey[71] = "4";
ansKey[81] = "C"; // On p128: 81. c (earlier 81. 25 was OCR glitch with Q87)
ansKey[84] = "A";
ansKey[86] = "13";
ansKey[87] = "25"; // P60: Q87 is numerical 25
ansKey[93] = "A";
ansKey[95] = "0"; // P65: Q95 is numerical 0
ansKey[144] = "D"; // P108: Q144 is Option D

console.log(`Total keys now: ${Object.keys(ansKey).length}/160`);

const missing = [];
for (let i = 1; i <= 160; i++) {
  if (!ansKey[i]) missing.push(i);
}
console.log('Missing:', missing);

// Write updated official answer key
fs.writeFileSync('backend/scripts/official_answer_key_statistics.json', JSON.stringify(ansKey, null, 2), 'utf8');
console.log('Successfully wrote backend/scripts/official_answer_key_statistics.json');
