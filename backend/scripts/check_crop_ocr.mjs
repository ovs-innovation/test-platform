import Tesseract from 'tesseract.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const p = path.join(__dirname, 'chem_q158_test_crop.png');
  const res = await Tesseract.recognize(p, 'eng');
  console.log('Result:\n', res.data.text);
}

main().catch(console.error);

