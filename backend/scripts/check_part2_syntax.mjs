import fs from 'fs';

const content = fs.readFileSync('backend/scripts/hydrocarbons_pyq_part2.mjs', 'utf8');

// The file exports part2Questions
// Let's test parsing each line or object
const lines = content.split('\n');
console.log(`Total lines: ${lines.length}`);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Check for non-ASCII or unescaped characters
  for (let j = 0; j < line.length; j++) {
    const code = line.charCodeAt(j);
    if (code > 127 && code !== 956 && code !== 8594 && code !== 8776 && code !== 176 && code !== 8652 && code !== 8592 && code !== 8596 && code !== 8211 && code !== 8212 && code !== 945 && code !== 946 && code !== 960 && code !== 963 && code !== 916 && code !== 197) {
      console.log(`Non-standard char at line ${i+1}, col ${j+1}: code ${code} (${line[j]}) -> line: ${line.slice(0, 80)}`);
    }
  }
}

