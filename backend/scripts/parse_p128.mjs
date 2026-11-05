import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/page_128_words.json', 'utf8').replace(/^\uFEFF/, '');
const words = JSON.parse(raw);

// Sort words by Y (row-wise) or cluster into columns
console.log('Total words:', words.length);

// Let's inspect the X distribution to find columns
const xCoords = words.map(w => w.X).sort((a, b) => a - b);
console.log('X range:', Math.min(...xCoords), 'to', Math.max(...xCoords));
console.log('Y range:', Math.min(...words.map(w => w.Y)), 'to', Math.max(...words.map(w => w.Y)));

// Print all words sorted by Y, then X
const sortedByY = [...words].sort((a, b) => a.Y - b.Y || a.X - b.X);
console.log('First 30 words sorted by Y:');
for (let i = 0; i < Math.min(30, sortedByY.length); i++) {
  console.log(`${sortedByY[i].Text} (x=${sortedByY[i].X}, y=${sortedByY[i].Y})`);
}

