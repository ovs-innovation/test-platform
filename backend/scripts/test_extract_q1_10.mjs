import fs from 'fs';

const raw = fs.readFileSync('./backend/scripts/vector_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);
const mapped = JSON.parse(fs.readFileSync('./backend/scripts/mapped_305_boundaries.json', 'utf8'));

function getPage(pNum) {
  return pages.find(p => p.page === pNum);
}

for (let q = 1; q <= 10; q++) {
  const info = mapped[q - 1];
  const p = getPage(info.page);
  const lines = p.lines.map(l => (typeof l === 'string' ? l : l.Text).trim()).filter(Boolean);
  
  // Find where this question starts on page:
  // It starts either at index 0 (if first question on page) or after previous question's ANSWER / solution
  let startIdx = 0;
  if (q > 1 && mapped[q - 2].page === info.page) {
    // There is an earlier question on this page
    const prevAnsIdx = mapped[q - 2].ansLineIdx;
    // Find where the next question header starts
    for (let i = prevAnsIdx + 1; i < info.ansLineIdx; i++) {
      if (new RegExp(`^\\s*(?:•\\s*)?${q}\\s*[\\.\\)]`, 'i').test(lines[i])) {
        startIdx = i;
        break;
      }
    }
    if (startIdx === 0) startIdx = prevAnsIdx + 1;
  } else {
    // First question on page. Skip AcadXL header lines on page 1 if present
    for (let i = 0; i < info.ansLineIdx; i++) {
      if (new RegExp(`^\\s*(?:•\\s*)?${q}\\s*[\\.\\)]`, 'i').test(lines[i])) {
        startIdx = i;
        break;
      }
    }
  }

  const qLines = lines.slice(startIdx, info.ansLineIdx);
  
  // Next question on this page
  let endIdx = lines.length;
  if (q < 305 && mapped[q].page === info.page) {
    // Next question is on same page, find its start
    for (let i = info.ansLineIdx + 1; i < lines.length; i++) {
      if (new RegExp(`^\\s*(?:•\\s*)?${q + 1}\\s*[\\.\\)]`, 'i').test(lines[i])) {
        endIdx = i;
        break;
      }
    }
  }

  const solLines = lines.slice(info.ansLineIdx + 1, endIdx);

  console.log(`\n=================== QUESTION ${q} (Page ${info.page}) ===================`);
  console.log('EXPECTED ANSWER:', info.expectedAns);
  console.log('Q LINES:', qLines);
  console.log('SOL LINES:', solLines);
}

