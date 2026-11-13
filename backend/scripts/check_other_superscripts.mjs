import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/structural_org_pages_dump.json', 'utf8'));

for (const qNum of [33, 35, 41, 44]) {
  const p = pages.find(p => p.items.some(i => i.str.includes(`Q${qNum}.`)));
  if (p) {
    console.log(`\n--- Q${qNum} on page ${p.page} ---`);
    const qIt = p.items.find(i => i.str.includes(`Q${qNum}.`));
    const items = p.items.filter(i => Math.abs(i.y - qIt.y) < 70);
    console.log(items.map(i => i.str).filter(s => s.trim().length > 0).join(' '));
  }
}

