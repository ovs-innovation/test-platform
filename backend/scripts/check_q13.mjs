import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/structural_org_pages_dump.json', 'utf8'));
const p4 = pages.find(p => p.page === 4);
const items = p4.items.filter(i => i.y <= 335 && i.y >= 260);
console.log(items.map(i => `"${i.str}" (x:${i.x}, y:${i.y})`).join(', '));
