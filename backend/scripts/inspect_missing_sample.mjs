import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_ocr_cache.json'), 'utf8'));

// Function to inspect a page
function checkPage(p) {
  console.log(`\n=================== PAGE ${p} ===================`);
  console.log(pages[p]);
}

// Let's inspect pages around missing:
// Q11 is likely on page 4 or 5
checkPage(4);
checkPage(5);
// Q15, 16 around page 6 or 7
checkPage(6);
checkPage(7);
