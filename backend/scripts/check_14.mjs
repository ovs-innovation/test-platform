import fs from 'fs';

const wordsRaw = fs.readFileSync('backend/scripts/page_128_words.json', 'utf8').replace(/^\uFEFF/, '');
const p128Words = JSON.parse(wordsRaw);

// Find words that are "14." or "14"
for (const w of p128Words) {
  if (w.Text.startsWith('14')) {
    console.log(`Word: "${w.Text}" at x=${w.X}, y=${w.Y}`);
    // find nearest word to the right
    const nextWords = p128Words.filter(nw => Math.abs(nw.Y - w.Y) < 15 && nw.X > w.X).sort((a,b) => a.X - b.X);
    if (nextWords[0]) console.log(`   Next: "${nextWords[0].Text}" at x=${nextWords[0].X}`);
  }
}

