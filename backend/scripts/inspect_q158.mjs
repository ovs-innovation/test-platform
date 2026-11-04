import sharp from 'sharp';
import Tesseract from 'tesseract.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function inspectQ158() {
  const p = path.join(__dirname, 'chem_q158_hormone_flowchart.png');
  const res = await Tesseract.recognize(p, 'eng');
  console.log('Q158 Diagram OCR:');
  console.log(res.data.text);
}

inspectQ158().catch(console.error);
