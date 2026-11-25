import fs from 'fs';

const cache = JSON.parse(fs.readFileSync('backend/scripts/fluids_ocr_cache.json', 'utf8'));

const targets = [6, 7, 9, 12, 13, 34, 37, 39, 61, 62, 64, 78, 81, 89, 110, 121, 125, 138, 156, 175];

const results = {};

for (const qNum of targets) {
  // Regex to find question start like "6." or "6 " or "06."
  const qRegex = new RegExp(`(^|\\n)\\s*${qNum}[\\.\\s:]+`, 'i');
  let foundPage = null;
  for (const [pageStr, text] of Object.entries(cache)) {
    if (qRegex.test(text)) {
      foundPage = parseInt(pageStr, 10);
      break;
    }
  }
  results[qNum] = foundPage;
}

console.log('Detected pages for 20 diagram questions:');
console.log(JSON.stringify(results, null, 2));
