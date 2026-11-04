import fs from 'fs';

const text = fs.readFileSync('backend/scripts/heights_concat.txt', 'utf8');

const pages = text.split(/<<<PAGE_\d+>>>/);

for (let p = 1; p <= 51; p++) {
  const pText = pages[p];
  if (!pText) continue;
  const qMatches = [...pText.matchAll(/(?:^|\n)\s*(\d{1,2})[.:]\s+/g)].map(m => m[1]);
  const ansMatches = [...pText.matchAll(/ANSWER[:\s]+([A-D0-9,\s]+)/gi)].map(m => m[1].trim());
  console.log(`Page ${p}: Qs [${qMatches.join(', ')}] | Answers: [${ansMatches.join('; ')}]`);
}

