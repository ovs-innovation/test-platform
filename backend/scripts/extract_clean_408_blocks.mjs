import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));
const cleanDiagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_clean_diagram_urls.json'), 'utf8'));

// Verify how many questions we can parse
console.log('Testing block parser...');
