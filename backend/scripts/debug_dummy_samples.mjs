import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_dummy_qs_raw.json'), 'utf8'));
console.log('Q19 raw:\n', data['19'].rawQuestion);
console.log('\nQ26 raw:\n', data['26'].rawQuestion);
console.log('\nQ28 raw:\n', data['28'].rawQuestion);
console.log('\nQ31 raw:\n', data['31'].rawQuestion);
