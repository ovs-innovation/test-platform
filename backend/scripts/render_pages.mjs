import { createCanvas } from '@napi-rs/canvas';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';
import path from 'path';

const pdfPath = './backend/scripts/original_vector_mixed.pdf';
const outDir = './backend/scripts/vector_pages';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function renderAll() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const start = Date.now();
  console.log(`Rendering all ${doc.numPages} pages...`);
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;
    fs.writeFileSync(path.join(outDir, `page_${String(i).padStart(3, '0')}.png`), canvas.toBuffer('image/png'));
    if (i % 25 === 0 || i === doc.numPages) {
      console.log(`Rendered page ${i}/${doc.numPages} (${((Date.now() - start) / 1000).toFixed(1)}s)`);
    }
  }
  console.log(`Finished all ${doc.numPages} pages in ${((Date.now() - start) / 1000).toFixed(1)}s`);
}

renderAll().catch(console.error);
