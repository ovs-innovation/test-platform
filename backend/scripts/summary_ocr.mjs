import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/alcohols_ocr.json', 'utf8'));

// Check which questions have reactions, structures, or match-the-following
for (let q = 1; q <= 78; q++) {
  const text = ocr[q].ocrText;
  const isMatch = text.includes('Match') || text.includes('List I') || text.includes('List-I');
  const isReaction = text.includes('->') || text.includes('sequence') || text.includes('reaction') || text.includes('product');
  const isStructure = text.includes('CH3') || text.includes('OH') || text.includes('phenol') || text.includes('ether');
  console.log(`Q${q} (P${ocr[q].page}): [lines: ${text.split('\n').length}] ${text.slice(0, 100).replace(/\n/g, ' ')}`);
}

