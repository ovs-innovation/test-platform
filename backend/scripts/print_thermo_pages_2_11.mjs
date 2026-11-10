import fs from 'fs';

const text = fs.readFileSync('backend/scripts/thermo_pdf_text.txt', 'utf8');
const pages = text.split(/=== PAGE \d+ ===/);

pages.forEach((p, idx) => {
  if (idx >= 2 && idx <= 11) {
    console.log(`\n\n==================== PAGE ${idx} ====================`);
    console.log(p.trim());
  }
});

