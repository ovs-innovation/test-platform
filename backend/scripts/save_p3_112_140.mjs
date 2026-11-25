import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesText = fs.readFileSync(path.resolve(__dirname, 'p3_pages_112_170.txt'), 'utf8');

// Print full text of pages 112 through 140
fs.writeFileSync(path.resolve(__dirname, 'p3_pages_112_140.txt'), pagesText.split('==================== PAGE 141 ====================')[0]);
console.log('Saved p3_pages_112_140.txt');
