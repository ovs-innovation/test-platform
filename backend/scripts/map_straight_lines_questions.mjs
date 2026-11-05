import fs from 'fs';

const data = JSON.parse(fs.readFileSync('backend/scripts/straight_lines_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, ''));

// We want to track each question 1..200
const mapped = [];

for (let q = 1; q <= 200; q++) {
  let found = null;

  for (const p of data) {
    if (p.page > 118) continue;
    
    // Look for lines that start with q, or have q. at start, or bullet q
    for (let i = 0; i < p.lines.length; i++) {
      const t = p.lines[i].Text.trim();
      // Match "1.", "1•", "1)", "1 ", or exactly "1"
      const isMatch = (
        new RegExp(`^(?:[•\\*\\-]?\\s*)?${q}\\s*[\\.\\•\\)]`).test(t) ||
        new RegExp(`^${q}$`).test(t) ||
        new RegExp(`^(?:[•\\*\\-]?\\s*)?${q}\\s+[A-Z]`).test(t)
      );

      if (isMatch) {
        // Verify this is not in a formula or solution
        // Also ensure monotonic page ordering
        const prevPage = mapped.length > 0 ? mapped[mapped.length - 1].page : 1;
        if (p.page >= prevPage && p.page <= prevPage + 3) {
          found = { q, page: p.page, lineIdx: i, text: t };
          break;
        }
      }
    }
    if (found) break;
  }

  if (found) {
    mapped.push(found);
  } else {
    // If not found, let's search loosely
    const prevPage = mapped.length > 0 ? mapped[mapped.length - 1].page : 1;
    for (const p of data) {
      if (p.page < prevPage || p.page > prevPage + 2 || p.page > 118) continue;
      for (let i = 0; i < p.lines.length; i++) {
        const t = p.lines[i].Text.trim();
        if (new RegExp(`\\b${q}\\s*[\\.\\•\\)]`).test(t)) {
          found = { q, page: p.page, lineIdx: i, text: t, loose: true };
          break;
        }
      }
      if (found) break;
    }
    if (found) mapped.push(found);
    else mapped.push({ q, page: null, lineIdx: null, text: null, notFound: true });
  }
}

const missing = mapped.filter(m => m.notFound);
console.log(`Mapped: ${mapped.length - missing.length}/200 questions.`);
if (missing.length > 0) {
  console.log("Still missing:", missing.map(m => m.q));
}

