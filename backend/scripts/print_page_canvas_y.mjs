import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/inheritance_pages_dump.json', 'utf8'));

const PAGE_HEIGHT = 841.92;
const SCALE = 2.0;
function ptToCanvasY(ptY) {
  return Math.round((PAGE_HEIGHT - ptY) * SCALE);
}

const targets = [
  { q: 10, page: 4 },
  { q: 34, page: 11 },
  { q: 40, page: 13 },
  { q: 86, page: 22 },
  { q: 106, page: 26 },
  { q: 117, page: 28 },
  { q: 121, page: 29 },
  { q: 129, page: 31 }
];

for (const t of targets) {
  const p = pages.find(x => x.page === t.page);
  console.log(`\n================== PAGE ${t.page} (Q${t.q}) ==================`);
  const sorted = p.items.filter(i => i.str.trim().length > 0).sort((a,b) => b.y - a.y);
  for (const item of sorted) {
    console.log(`CanvasY: ${ptToCanvasY(item.y)}, text: "${item.str}"`);
  }
}

