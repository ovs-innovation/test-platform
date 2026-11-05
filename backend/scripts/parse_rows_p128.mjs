import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/page_128_words.json', 'utf8').replace(/^\uFEFF/, '');
const words = JSON.parse(raw);

// Cluster into lines by Y
const lines = [];
const sortedWords = [...words].sort((a, b) => a.Y - b.Y || a.X - b.X);

for (const w of sortedWords) {
  let line = lines.find(l => Math.abs(l.y - w.Y) < 15);
  if (!line) {
    line = { y: w.Y, words: [] };
    lines.push(line);
  }
  line.words.push(w);
}

lines.sort((a, b) => a.y - b.y);

for (const line of lines) {
  line.words.sort((a, b) => a.X - b.X);
  const text = line.words.map(w => w.Text).join(' ');
  console.log(`Y=${Math.round(line.y)}: ${text}`);
}

