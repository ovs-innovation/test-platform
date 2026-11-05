import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

const toCheck = [
  { p: 21, label: 'P21 (Q35, Q36)' },
  { p: 22, label: 'P22 (Q37, Q38)' },
  { p: 30, label: 'P30 (Q46, Q47)' },
  { p: 35, label: 'P35 (Q50, Q51)' },
  { p: 38, label: 'P38 (Q56, Q57)' },
  { p: 43, label: 'P43 (Q64, Q65)' },
  { p: 44, label: 'P44 (Q66, Q67)' },
  { p: 53, label: 'P53 (Q78, Q79)' },
  { p: 54, label: 'P54 (Q80)' }
];

for (const c of toCheck) {
  console.log(`\n================== ${c.label} ==================`);
  console.log(pages[c.p - 1].text);
}

