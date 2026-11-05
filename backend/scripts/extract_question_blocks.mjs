import fs from 'fs';

const raw = fs.readFileSync('./backend/scripts/vector_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);
const ansKey = JSON.parse(fs.readFileSync('./backend/scripts/official_answer_key.json', 'utf8'));

// We want to segment each page into question blocks:
// Notice: each question has an `ANSWER: <X>`
// Before `ANSWER:` is question text + options + metadata `[4 marks, ...]`
// After `ANSWER:` until next question or end of page is solution!

const blocks = [];

for (const p of pages) {
  const lines = p.lines.map(l => (typeof l === 'string' ? l : l.Text).trim()).filter(Boolean);
  
  // Find indices of ANSWER lines
  const ansIndices = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^ANSWER\s*:/i.test(lines[i]) || /ANSWER\s*:\s*[A-D0-9\.\-]+/i.test(lines[i])) {
      ansIndices.push(i);
    }
  }

  if (ansIndices.length === 0) continue;

  // Question headers or boundaries
  for (let a = 0; a < ansIndices.length; a++) {
    const ansIdx = ansIndices[a];
    const prevAnsIdx = a > 0 ? ansIndices[a - 1] : -1;
    const nextAnsIdx = a < ansIndices.length - 1 ? ansIndices[a + 1] : lines.length;

    // Lines for question statement are between prev question end (or page start) and ansIdx
    // Search backward from ansIdx for metadata line `[4 marks...` or options (A)/(B)/(C)/(D)
    const qLines = [];
    let startIdx = prevAnsIdx + 1;
    
    // Find question number header if present
    for (let j = startIdx; j < ansIdx; j++) {
      qLines.push(lines[j]);
    }

    // Solution lines are from ansIdx + 1 to next question start (or end of page)
    const solLines = [];
    for (let j = ansIdx + 1; j < nextAnsIdx; j++) {
      // If j looks like a new question header, stop
      if (/^\s*(?:•\s*)?\d{1,3}\s*[\.\)]\s+[A-Za-z]/.test(lines[j])) {
        break;
      }
      solLines.push(lines[j]);
    }

    blocks.push({
      page: p.page,
      ansLine: lines[ansIdx],
      qLines,
      solLines
    });
  }
}

console.log('Total extracted blocks:', blocks.length);
for (let i = 0; i < 5; i++) {
  console.log(`\n--- Block ${i + 1} (Page ${blocks[i].page}) ---`);
  console.log('Q lines:', blocks[i].qLines.join(' | '));
  console.log('Ans line:', blocks[i].ansLine);
  console.log('Sol lines:', blocks[i].solLines.join(' | '));
}

