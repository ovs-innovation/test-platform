import fs from 'fs';

const text = fs.readFileSync('backend/scripts/all_pages_concat.txt', 'utf8');

const missing = [11, 15, 31, 43, 46, 73, 110, 111, 112, 113, 114, 115, 116, 117, 119];

for (const m of missing) {
  console.log(`\n================ Missing Question ${m} ================`);
  // Find where m-1 or m+1 is
  const prevRegex = new RegExp(`(?:\\n|<<<PAGE_\\d+>>>\\s*)${m-1}[.:\\s]`, 'g');
  const prevMatch = prevRegex.exec(text);
  if (prevMatch) {
    const start = Math.max(0, prevMatch.index);
    const snippet = text.slice(start, start + 1200);
    console.log(`Near Q${m-1}:\n`, snippet);
  } else {
    console.log(`Could not find Q${m-1}`);
  }
}

