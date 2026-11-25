import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/gravitation_ocr_cache.json', 'utf8'));
const base = JSON.parse(fs.readFileSync('backend/scripts/gravitation_base_records.json', 'utf8'));

// Fix Q208 to page 130
base.find(b => b.qNum === 208).page = 130;

// Re-group by page
const pageToQ = {};
for (const b of base) {
  if (!pageToQ[b.page]) pageToQ[b.page] = [];
  pageToQ[b.page].push(b.qNum);
}

// Check if any page has an unexpected number of ANSWER matches vs question count
const mismatches = [];
for (let p = 1; p <= 144; p++) {
  const pStr = String(p).padStart(3, '0');
  const text = ocr[pStr] || '';
  const qList = pageToQ[p] || [];
  const ansMatches = (text.match(/\b(ANSWER|Answer|ANS|Ans)\s*[:\.]/gi) || []).length;
  if (ansMatches !== qList.length) {
    mismatches.push({ page: p, expectedCount: qList.length, ansMatches, qList });
  }
}

console.log('Mismatches count:', mismatches.length);
console.log('Sample mismatches:', mismatches.slice(0, 10));
