import fs from 'fs';
import path from 'path';
import { createWorker } from 'tesseract.js';

const zoomDir = path.resolve('backend/scripts/hydrocarbons_pages/zoom_img4');
const ocrOutDir = path.resolve('backend/scripts/hydrocarbons_pages/zoom_ocr');

if (!fs.existsSync(ocrOutDir)) fs.mkdirSync(ocrOutDir, { recursive: true });

async function runOCR() {
  const worker = await createWorker('eng');
  const files = fs.readdirSync(zoomDir).filter(f => f.endsWith('.png'));

  for (const file of files) {
    const filePath = path.join(zoomDir, file);
    const outTxt = path.join(ocrOutDir, file.replace('.png', '.txt'));
    console.log(`Processing: ${file}...`);
    const { data: { text } } = await worker.recognize(filePath);
    fs.writeFileSync(outTxt, text, 'utf8');
  }

  await worker.terminate();
  console.log('Zoom OCR complete!');
}

runOCR().catch(console.error);

