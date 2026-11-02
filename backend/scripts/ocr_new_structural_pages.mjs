import Tesseract from 'tesseract.js';
import fs from 'fs';
import path from 'path';

const pagesDir = 'backend/uploads/structural_organisation/pages_hires2';

async function ocrNewPages() {
  const pages = ['page_192.png', 'page_193.png', 'page_194.png', 'page_195.png', 'page_198.png', 'page_199.png'];

  for (const p of pages) {
    const pPath = path.join(pagesDir, p);
    const txtPath = path.join(pagesDir, p.replace('.png', '.txt'));
    console.log(`OCR on ${p}...`);
    const ret = await Tesseract.recognize(pPath, 'eng');
    fs.writeFileSync(txtPath, ret.data.text);
    console.log(`Wrote ${txtPath}`);
  }
}

ocrNewPages().catch(console.error);

