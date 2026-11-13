import fs from 'fs';

const dump = JSON.parse(fs.readFileSync('./backend/scripts/animal_kingdom_pages_dump.json', 'utf8'));
const p24 = dump.find(p => p.page === 24);
const items = p24.items.filter(i => i.y <= 660 && i.y >= 540);
console.log('Items between y 540 and 660:');
for (const it of items) {
  console.log(`x: ${it.x}, y: ${it.y}, top: ${(841.92 - it.y) * 2}, text: "${it.str}"`);
}
