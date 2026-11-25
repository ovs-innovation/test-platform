import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795155754212_22ea2d3c.pdf';
const OUTPUT_DIR = path.resolve(__dirname, 'basic_chem_pages');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function renderPages() {
  console.log('Loading PDF from:', PDF_PATH);
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Total PDF pages: ${doc.numPages}`);

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 }); // 2x scale for crisp OCR and diagram crops
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport,
    }).promise;

    const outPath = path.resolve(OUTPUT_DIR, `page_${String(i).padStart(3, '0')}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    process.stdout.write(`Rendered page ${i}/${doc.numPages}...\r`);
  }
  console.log('\nAll pages successfully rendered to PNG!');
}

renderPages().catch(console.error);
