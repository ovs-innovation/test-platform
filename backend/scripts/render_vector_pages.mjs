import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795413055769_4da9dc12.pdf';
const OUTPUT_DIR = path.resolve(__dirname, 'vector_pdf_pages');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function renderPages() {
  console.log('Loading PDF from:', PDF_PATH);
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Total pages: ${doc.numPages}`);

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    const pad = String(i).padStart(2, '0');
    const outPath = path.join(OUTPUT_DIR, `page_${pad}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`Rendered page ${i}/${doc.numPages} (${viewport.width}x${viewport.height})`);
  }
  console.log('Finished rendering all pages to:', OUTPUT_DIR);
}

renderPages().catch(err => {
  console.error('Render error:', err);
  process.exit(1);
});
