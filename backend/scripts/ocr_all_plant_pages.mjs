import Tesseract from 'tesseract.js';
import path from 'path';
import fs from 'fs';

async function ocrAll() {
  const outDir = 'backend/uploads/plant/ocr_raw';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const pages = [
    'page_01.png', 'page_02.png', 'page_03.png', 'page_04.png',
    'page_05.png', 'page_06.png', 'page_07.png', 'page_08.png',
    'page_09.png', 'page_10.png', 'page_11.png', 'page_12.png',
    'page_13.png', 'page_14.png'
  ];

  for (const p of pages) {
    const file = path.resolve(`backend/uploads/plant/pages_hires/${p}`);
    console.log(`OCRing ${p}...`);
    const res = await Tesseract.recognize(file, 'eng');
    fs.writeFileSync(`${outDir}/${p.replace('.png', '.txt')}`, res.data.text);
    console.log(`Saved ${p.replace('.png', '.txt')}`);
  }
}

ocrAll().catch(console.error);
