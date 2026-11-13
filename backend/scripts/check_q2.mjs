import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/breathing_pages_dump.json', 'utf8'));
const p2 = pages.find(p => p.page === 2);
const items = p2.items.filter(i => i.str.includes('Q2') || i.str.includes('respiration') || i.str.includes('Pulmonary'));
console.log(items);

