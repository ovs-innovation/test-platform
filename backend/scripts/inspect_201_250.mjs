import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesText = fs.readFileSync(path.resolve(__dirname, 'p3_pages_112_170.txt'), 'utf8');
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Print summary of Q201 to Q250
console.log('Writing clean Part 3 Q201..Q250 inspection...');
