import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawCells = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'p79_cells_raw.json'), 'utf8'));

const cleaned = {};
const issues = [];

for (let q = 1; q <= 221; q++) {
  const cell = (rawCells[q] || '').trim();
  // Expect pattern: e.g. "1. A", "1A", "65. 27", "65.27", "109. 5418", etc.
  // Match key at end
  let key = null;
  
  // Try matching trailing answer
  // For MCQ: [A-D]
  // For Numerical: digits e.g. 5418, 27, etc.
  const mcqMatch = cell.match(/[\.\s:]+([A-D])$/i);
  const numMatch = cell.match(/[\.\s:]+(\d+)$/);
  
  if (mcqMatch) {
    key = mcqMatch[1].toUpperCase();
  } else if (numMatch) {
    key = numMatch[1];
  } else {
    // Try other patterns
    const anyMatch = cell.match(/^(\d+)[\.\s:]+(.+)$/);
    if (anyMatch) {
      key = anyMatch[2].trim();
    } else {
      key = cell;
    }
  }

  // Check if valid MCQ or valid integer
  if (/^[A-D]$/.test(key) || /^\d+$/.test(key)) {
    cleaned[q] = key;
  } else {
    issues.push({ q, cell, extracted: key });
  }
}

console.log(`Cleaned ${Object.keys(cleaned).length}/221 keys.`);
console.log(`Issues count: ${issues.length}`);
if (issues.length > 0) {
  console.log('Issues details:', JSON.stringify(issues, null, 2));
}

fs.writeFileSync(path.resolve(__dirname, 'basic_chem_official_keys.json'), JSON.stringify(cleaned, null, 2));
console.log('Saved basic_chem_official_keys.json');
