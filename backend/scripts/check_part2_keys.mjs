import fs from 'fs';
const keys = JSON.parse(fs.readFileSync('./backend/scripts/chemeq_official_keys.json', 'utf8'));
const list = [];
for (let i = 67; i <= 132; i++) {
  list.push(`Q${i}: ${keys[String(i)]}`);
}
console.log(list.join(', '));
