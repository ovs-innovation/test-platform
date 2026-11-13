import Tesseract from 'tesseract.js';

async function main() {
  const res = await Tesseract.recognize('backend/scripts/q10_crop.png', 'eng');
  console.log('--- OCR Result for Q10 ---');
  console.log(res.data.text);
}

main().catch(console.error);

