import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linearText = fs.readFileSync(path.resolve(__dirname, 'dual_nature_ocr_linear.txt'), 'utf8');

// Search for keywords indicating diagrams in questions
// e.g. "shown in figure", "as shown", "figure shows", "following graph", "given graph", "graphical representation"
const diagramCandidates = [];

for (let q = 1; q <= 217; q++) {
  // Extract question chunk up to options or solution
  const qRegex = new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}\\s*[\\.\\:\\)]\\s*([\\s\\S]*?)(?=(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q+1}\\s*[\\.\\:\\)]|--- PAGE|$)`, 'i');
  const m = linearText.match(qRegex);
  if (m) {
    const chunk = m[1];
    if (/figure|graph|curve|shown below|as shown|diagram/i.test(chunk)) {
      diagramCandidates.push(q);
    }
  }
}

console.log(`Found ${diagramCandidates.length} potential diagram questions:`, diagramCandidates);
