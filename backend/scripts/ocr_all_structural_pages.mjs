import Tesseract from 'tesseract.js';
import fs from 'fs';
import path from 'path';

const pagesDir = 'backend/uploads/structural_organisation/pages_hires';

async function ocrPages() {
  const pages = [
    'page_169.png', 'page_170.png', 'page_171.png', 'page_172.png',
    'page_173.png', 'page_174.png', 'page_175.png', 'page_176.png',
    'page_177.png', 'page_178.png', 'page_179.png', 'page_180.png',
    'page_181.png', 'page_182.png', 'page_183.png'
  ];

  for (const p of pages) {
    const pPath = path.join(pagesDir, p);
    const txtPath = path.join(pagesDir, p.replace('.png', '.txt'));
    if (!fs.existsSync(txtPath)) {
      console.log(`OCR on ${p}...`);
      const ret = await Tesseract.recognize(pPath, 'eng');
      fs.writeFileSync(txtPath, ret.data.text);
      console.log(`Wrote ${txtPath}`);
    } else {
      console.log(`Already exists: ${txtPath}`);
    }
  }
}

ocrPages().catch(console.error);
