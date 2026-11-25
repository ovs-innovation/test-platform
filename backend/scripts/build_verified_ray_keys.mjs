import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocrCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));

// Let's parse all question answers directly from the question text across pages 1..250
// Every question block has `ANSWER: ...`
const verifiedKeys = {};

// Also let's load the table lines from page 251 and 252
const p251ColLines = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_col_lines_p251.json'), 'utf8'));
const p252ColLines = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_col_lines_p252.json'), 'utf8'));

console.log('Cross-verifying all 298 answers...');
