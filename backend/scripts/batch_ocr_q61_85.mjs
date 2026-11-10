import fs from 'fs';
import path from 'path';
import Tesseract from 'tesseract.js';

async function runOCR() {
  const results = {};
  for (let q = 61; q <= 85; q++) {
    const imgPath = `scripts/rotational_q_slices/q${q}.png`;
    if (!fs.existsSync(imgPath)) {
      console.log(`Missing ${imgPath}`);
      continue;
    }
    const res = await Tesseract.recognize(imgPath, 'eng');
    results['Q' + q] = res.data.text;
    console.log(`Processed Q${q}`);
  }
  fs.writeFileSync('scripts/ocr_q61_85.json', JSON.stringify(results, null, 2));
  console.log('Saved scripts/ocr_q61_85.json');
}

runOCR().catch(console.error);

