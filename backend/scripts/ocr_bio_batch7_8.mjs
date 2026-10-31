import Tesseract from 'tesseract.js';
import path from 'path';

async function ocr(file) {
  console.log(`--- OCR for ${file} ---`);
  const res = await Tesseract.recognize(file, 'eng');
  console.log(res.data.text);
}

async function run() {
  await ocr(path.resolve('backend/uploads/bio/pages_hires/page80.png'));
  await ocr(path.resolve('backend/uploads/bio/pages_hires/page81.png'));
}
run();
