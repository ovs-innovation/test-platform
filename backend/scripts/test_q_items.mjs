import fs from 'fs';

const items = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_pdf_items.json', 'utf8'));
const positions = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_q_positions.json', 'utf8'));

// Check Q6 (where options are structures)
const q6Pos = positions.find(p => p.qNum === 6);
console.log('Q6 pos:', q6Pos);

const q6Items = items.filter(it => it.pageNum === q6Pos.pageNum && it.y >= q6Pos.y - 20 && it.y <= q6Pos.y + 1300);
console.log('Q6 items on page:', q6Items.map(it => `[${it.str} @ y=${it.y.toFixed(1)}, x=${it.x.toFixed(1)}]`).join('; '));

