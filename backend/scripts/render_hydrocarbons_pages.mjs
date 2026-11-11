import fs from 'fs';
import path from 'path';
import { createCanvas } from '@napi-rs/canvas';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794416057368_79d3f8b1.pdf';
const OUTPUT_DIR = './backend/scripts/hydrocarbons_pages';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function renderPages() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjs.getDocument({ data }).promise;
  console.log(`Rendering ${doc.numPages} pages...`);

  // Render question pages 2 to 47
  for (let pageNum = 2; pageNum <= 47; pageNum++) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 }); // 2x scale for crisp OCR & diagrams
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    const buffer = canvas.toBuffer('image/png');
    const outPath = path.join(OUTPUT_DIR, `page_${pageNum}.png`);
    fs.writeFileSync(outPath, buffer);
    if (pageNum % 5 === 0 || pageNum === 47) {
      console.log(`Rendered page ${pageNum} (${viewport.width}x${viewport.height}) -> ${outPath}`);
    }
  }

  console.log('Finished rendering pages 2 to 47.');
}

renderPages().catch(err => {
  console.error(err);
  process.exit(1);
});
