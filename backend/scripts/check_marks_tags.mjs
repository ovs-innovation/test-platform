import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linear = fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_linear.txt'), 'utf8');

const regex = /\[\s*\d+\s*marks[^\n\]]*\]/gi;
const matches = [...linear.matchAll(regex)];
console.log(`Total [marks...] matches found: ${matches.length}`);

// Let's also check with looser regex
const loose = /marks\s*,\s*[-~]?\s*1\s*for/gi;
const looseMatches = [...linear.matchAll(loose)];
console.log(`Total loose marks matches: ${looseMatches.length}`);
