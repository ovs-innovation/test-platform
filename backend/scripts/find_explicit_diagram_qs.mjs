import fs from 'fs';
import path from 'path';

const chunks = JSON.parse(fs.readFileSync('backend/scripts/emi_monotonic_chunks.json', 'utf8'));

// Filter questions where the question text mentions a figure
const diagramQuestions = [];

for (let q = 1; q <= 173; q++) {
  const c = chunks[q];
  const qLines = [];
  for (const l of c.lines) {
    if (l.match(/\[\d+\s*marks/i) || l.match(/^ANSWER\s*:/i)) break;
    qLines.push(l);
  }
  const qText = qLines.join(' ');
  // Check if it mentions figure or graph or circuit shown or below
  const hasFigRef = /(shown in figure|in figure|see figure|given figure|circuit shown|shown below|following figure|figure shows|as shown|from figure|given circuit)/i.test(qText);
  if (hasFigRef) {
    diagramQuestions.push({
      q,
      startPage: c.startPage,
      endPage: c.endPage,
      lines: qLines
    });
  }
}

console.log(`Explicit diagram reference questions count: ${diagramQuestions.length}`);
console.log('List of Qs with diagrams:', diagramQuestions.map(d => d.q));
fs.writeFileSync('backend/scripts/emi_diagram_candidates_explicit.json', JSON.stringify(diagramQuestions, null, 2));
