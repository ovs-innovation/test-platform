import sharp from 'sharp';
import Tesseract from 'tesseract.js';

async function check() {
  const p57 = await sharp('backend/scripts/ionic_jee_pages/page_057.png').metadata();
  const b1 = await sharp('backend/scripts/ionic_jee_pages/page_057.png')
    .extract({ left: Math.round(p57.width * 0.05), top: Math.round(p57.height * 0.07), width: Math.round(p57.width * 0.9), height: Math.round(p57.height * 0.08) })
    .toBuffer();
  const r1 = await Tesseract.recognize(b1, 'eng');
  console.log('--- Page 57 Q151 Options ---');
  console.log(r1.data.text);

  const b2 = await sharp('backend/scripts/ionic_jee_pages/page_057.png')
    .extract({ left: Math.round(p57.width * 0.05), top: Math.round(p57.height * 0.28), width: Math.round(p57.width * 0.9), height: Math.round(p57.height * 0.10) })
    .toBuffer();
  const r2 = await Tesseract.recognize(b2, 'eng');
  console.log('--- Page 57 Q152 Options ---');
  console.log(r2.data.text);

  const p63 = await sharp('backend/scripts/ionic_jee_pages/page_063.png').metadata();
  const b3 = await sharp('backend/scripts/ionic_jee_pages/page_063.png')
    .extract({ left: Math.round(p63.width * 0.05), top: Math.round(p63.height * 0.10), width: Math.round(p63.width * 0.9), height: Math.round(p63.height * 0.16) })
    .toBuffer();
  const r3 = await Tesseract.recognize(b3, 'eng');
  console.log('--- Page 63 Q158 Options ---');
  console.log(r3.data.text);

  const p64 = await sharp('backend/scripts/ionic_jee_pages/page_064.png').metadata();
  const b4 = await sharp('backend/scripts/ionic_jee_pages/page_064.png')
    .extract({ left: Math.round(p64.width * 0.05), top: Math.round(p64.height * 0.08), width: Math.round(p64.width * 0.9), height: Math.round(p64.height * 0.16) })
    .toBuffer();
  const r4 = await Tesseract.recognize(b4, 'eng');
  console.log('--- Page 64 Q159 Options ---');
  console.log(r4.data.text);
}

check();
