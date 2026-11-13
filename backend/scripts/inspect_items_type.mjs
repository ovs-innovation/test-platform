import fs from 'fs';
const qItems = JSON.parse(fs.readFileSync('backend/scripts/organic_q_text_items.json', 'utf8'));
console.log('qItems keys sample:', Object.keys(qItems).slice(0, 5));
console.log('qItems[1] sample:', typeof qItems[1], qItems[1]);

