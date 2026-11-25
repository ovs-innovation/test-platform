import Tesseract from 'tesseract.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function ocrPage99() {
  const imgPath = path.join(__dirname, 'thermo_jee_pages/page_099.png');
  const res = await Tesseract.recognize(imgPath, 'eng');
  console.log('--- Page 99 OCR ---');
  console.log(res.data.text);
}

ocrPage99().catch(console.error);
