import fs from 'fs';

const chunks = JSON.parse(fs.readFileSync('backend/scripts/ac_monotonic_chunks.json', 'utf8'));
const keys = JSON.parse(fs.readFileSync('backend/scripts/ac_jee_official_keys.json', 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync('backend/scripts/ac_clean_diagram_urls.json', 'utf8'));

const startQ = parseInt(process.argv[2] || '1', 10);
const endQ = parseInt(process.argv[3] || '20', 10);

for (let q = startQ; q <= endQ; q++) {
  const c = chunks[q];
  if (!c) {
    console.log(`Q${q} NOT FOUND`);
    continue;
  }
  console.log(`\n==================== Q${q} [Ans: ${keys[q]}] (Diag: ${diagUrls[q] ? 'YES' : 'NO'}, Page: ${c.startPage}-${c.endPage}) ====================`);
  console.log(c.lines.join('\n'));
}
