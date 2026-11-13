import fs from 'fs';

// Scan all questions from biomolecules_raw_inspect.txt and find any questions with chemical drawings or missing parts
const inspect = fs.readFileSync('./backend/scripts/biomolecules_raw_inspect.txt', 'utf8');
const blocks = inspect.split('====================================================\n');

for (const b of blocks) {
  if (!b.trim()) continue;
  const headerMatch = b.match(/QUESTION (\d+)/);
  if (!headerMatch) continue;
  const qNum = parseInt(headerMatch[1], 10);
  
  // Check if OCR has weird vertical pipe characters or chemical structures
  if (b.includes('|') || b.includes('CH2OH') || b.includes('CHO') || b.includes('COOH') || b.includes('NH2') || b.includes('C=O')) {
    console.log(`Q${qNum} contains chemical formula or structure tokens.`);
  }
}

