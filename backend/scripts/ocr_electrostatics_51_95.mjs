import fs from 'fs';
import path from 'path';
import Tesseract from 'tesseract.js';

async function runOCR() {
  const results = {};
  for (let q = 51; q <= 95; q++) {
    const imgPath = `scripts/electrostatics_q_slices/q${q}.png`;
    if (!fs.existsSync(imgPath)) {
      console.log(`Missing ${imgPath}`);
      continue;
    }
    const res = await Tesseract.recognize(imgPath, 'eng');
    results['Q' + q] = res.data.text;
    console.log(`Processed Q${q}`);
  }
  fs.writeFileSync('scripts/ocr_electrostatics_51_95.json', JSON.stringify(results, null, 2));
  console.log('Saved scripts/ocr_electrostatics_51_95.json');
}

runOCR().catch(console.error);

