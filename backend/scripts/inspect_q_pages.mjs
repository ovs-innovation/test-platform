import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/bonding_ocr_cache.json', 'utf8'));

// Search each page for any occurrence of the target question numbers
function inspectPagesForRange(startQ, endQ) {
  for (let q = startQ; q <= endQ; q++) {
    const hits = [];
    for (let p = 1; p <= 120; p++) {
      const text = ocr[p] || '';
      // search for q at start of line or with space or dot
      const regex = new RegExp(`(^|\\n|\\s)${q}[\\.\\s\\)]`, 'g');
      if (regex.test(text)) {
        hits.push(p);
      }
    }
    console.log(`Q${q} found on page(s): ${hits.join(', ') || 'NOT FOUND'}`);
  }
}

inspectPagesForRange(56, 110);
