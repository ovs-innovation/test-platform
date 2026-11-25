import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesText = fs.readFileSync(path.resolve(__dirname, 'p3_pages_112_170.txt'), 'utf8');

// Pages 140 to 170
const part = pagesText.split('==================== PAGE 140 ====================')[1];
fs.writeFileSync(path.resolve(__dirname, 'p3_pages_140_170.txt'), part);
console.log('Saved p3_pages_140_170.txt');
