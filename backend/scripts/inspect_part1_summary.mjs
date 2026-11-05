import fs from 'fs';

const dump = fs.readFileSync('./backend/scripts/part1_pages_dump.txt', 'utf8');
const lines = dump.split('\n');

// Print question start lines or year lines
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (/\[\d+\]\s*(?:•\s*)?\d{1,2}\s*[\.\)]/i.test(line) || /\[\d+\]\s*ANSWER/i.test(line) || /\[4 marks/i.test(line)) {
    console.log(line);
  }
}

