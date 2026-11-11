import fs from 'fs';
const pos = JSON.parse(fs.readFileSync('backend/scripts/current_electricity_q_positions.json', 'utf8'));
const qList = JSON.parse(fs.readFileSync('backend/scripts/current_electricity_diagram_q_list.json', 'utf8'));
const map = pos.filter(p => qList.includes(p.qNum));
console.log(map.map(m => `Q${m.qNum}: p${m.page}, y=${Math.round(m.rawY)}`).join('\n'));

