import fs from 'fs';

// Build official answer key
const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

const wordsRaw = fs.readFileSync('backend/scripts/page_128_words.json', 'utf8').replace(/^\uFEFF/, '');
const p128Words = JSON.parse(wordsRaw);

// Group page 128 words into lines by Y
const lines = [];
for (const w of [...p128Words].sort((a, b) => a.Y - b.Y || a.X - b.X)) {
  let line = lines.find(l => Math.abs(l.y - w.Y) < 18);
  if (!line) {
    line = { y: w.Y, words: [] };
    lines.push(line);
  }
  line.words.push(w);
}
lines.sort((a, b) => a.y - b.y);

const ansKey = {};
for (const line of lines) {
  line.words.sort((a, b) => a.X - b.X);
  const text = line.words.map(w => w.Text).join(' ');
  const matches = [...text.matchAll(/(\d{1,3})\s*[\.:\-]?\s*([A-Za-z0-9\-]+)/g)];
  for (const m of matches) {
    const qNum = parseInt(m[1]);
    const ans = m[2].toUpperCase().trim();
    if (qNum >= 1 && qNum <= 160) {
      ansKey[qNum] = ans;
    }
  }
}

// Explicit mappings from page OCR verification:
ansKey[1] = "B";
ansKey[2] = "A";
ansKey[3] = "B";
ansKey[4] = "C";
ansKey[5] = "C";
ansKey[6] = "B";
ansKey[7] = "D";
ansKey[8] = "A";
ansKey[9] = "C";
ansKey[10] = "D";
ansKey[11] = "D";
ansKey[12] = "C";

ansKey[28] = "A";
ansKey[29] = "A";
ansKey[32] = "A";
ansKey[37] = "A";
ansKey[48] = "A";
ansKey[58] = "A";
ansKey[59] = "A";
ansKey[70] = "11";
ansKey[84] = "A";
ansKey[87] = "25";
ansKey[93] = "A";
ansKey[95] = "0"; // In OCR: "95. o" -> 0
ansKey[144] = "D";

console.log(`Total answers in key: ${Object.keys(ansKey).length}/160`);
const missing = [];
for (let i = 1; i <= 160; i++) {
  if (!ansKey[i]) missing.push(i);
}
console.log('Missing:', missing);

fs.writeFileSync('backend/scripts/official_answer_key_statistics.json', JSON.stringify(ansKey, null, 2), 'utf8');
console.log('Saved to backend/scripts/official_answer_key_statistics.json');

