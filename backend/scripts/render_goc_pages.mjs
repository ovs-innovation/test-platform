import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795242206418_33075747.pdf';
const OUTPUT_DIR = path.resolve(__dirname, 'goc_jee_pages');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function renderPages() {
  console.log('Loading GOC PDF from:', PDF_PATH);
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Total pages: ${doc.numPages}`);

  // Pages with questions are 2 to 145
  for (let i = 2; i <= 145; i++) {
    const pad = String(i).padStart(3, '0');
    const outPath = path.join(OUTPUT_DIR, `page_${pad}.png`);
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 10000) {
      continue;
    }

    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    if (i % 20 === 0 || i === 145) {
      console.log(`Rendered page ${i}/145`);
    }
  }
  console.log('Finished rendering pages to:', OUTPUT_DIR);
}

renderPages().catch(err => {
  console.error('Render error:', err);
  process.exit(1);
});
