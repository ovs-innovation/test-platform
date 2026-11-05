import fs from 'fs';

const raw = fs.readFileSync('./backend/scripts/vector_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

for (const p of pages) {
  const ansOnPage = [];
  for (let i = 0; i < p.lines.length; i++) {
    const t = typeof p.lines[i] === 'string' ? p.lines[i] : p.lines[i].Text;
    if (/ANSWER\s*:\s*[A-Z0-9\.\-]+/i.test(t)) {
      ansOnPage.push({ lineIdx: i, text: t });
    }
  }

  // Look for multiple ANSWERs on the same page and check spacing / marks
  if (ansOnPage.length > 1) {
    // Check if any two ANSWERs are close to each other without a question in between
    for (let k = 0; k < ansOnPage.length; k++) {
      // Check lines between k and k-1
      if (k > 0) {
        const gap = ansOnPage[k].lineIdx - ansOnPage[k - 1].lineIdx;
        if (gap < 8) {
          console.log(`Page ${p.page} has close answers: gap=${gap}`);
          console.log(`  Ans 1 (line ${ansOnPage[k - 1].lineIdx}): ${ansOnPage[k - 1].text}`);
          console.log(`  Ans 2 (line ${ansOnPage[k].lineIdx}): ${ansOnPage[k].text}`);
          // Print lines between
          for (let l = ansOnPage[k - 1].lineIdx; l <= ansOnPage[k].lineIdx; l++) {
            const txt = typeof p.lines[l] === 'string' ? p.lines[l] : p.lines[l].Text;
            console.log(`    line ${l}: ${txt}`);
          }
        }
      }
    }
  }
}
