import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const text = fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_linear.txt'), 'utf8');
const lines = text.split('\n');
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// We will inspect question text and options for Q201 to Q300
// Let's create an extractor that reads lines between question number and marks/ANSWER
console.log('Building Part 3 clean parser...');
