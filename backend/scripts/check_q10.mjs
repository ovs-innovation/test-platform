import fs from 'fs';

const blocks = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_raw_blocks.json', 'utf8'));
const q10 = blocks.find(b => b.qNum === 10);
console.log('Q10 rawLines:');
console.log(q10.rawLines.join('\n'));

