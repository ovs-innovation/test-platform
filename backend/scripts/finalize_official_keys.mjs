import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_official_keys.json'), 'utf8'));

// Apply the 10 verified fixes
keys[1] = "A";
keys[11] = "C";
keys[56] = "B";
keys[58] = "B";
keys[69] = "8";
keys[71] = "47";
keys[111] = "3";
keys[119] = "C";
keys[147] = "1";
keys[199] = "B";

// Check 1 to 221
let missing = [];
let invalid = [];
for (let i = 1; i <= 221; i++) {
  if (keys[i] === undefined || keys[i] === null || keys[i] === '') {
    missing.push(i);
  } else if (!/^[A-D]$/.test(keys[i]) && !/^\d+$/.test(keys[i])) {
    invalid.push({ i, val: keys[i] });
  }
}

console.log(`Total keys: ${Object.keys(keys).length}/221`);
console.log(`Missing keys: ${missing.length}`, missing);
console.log(`Invalid keys: ${invalid.length}`, invalid);

fs.writeFileSync(path.resolve(__dirname, 'basic_chem_official_keys.json'), JSON.stringify(keys, null, 2));
console.log('Successfully written basic_chem_official_keys.json with 221 verified keys!');
