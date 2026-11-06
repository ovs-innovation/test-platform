import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';

const pdfPath = 'backend/scripts/real_probability.pdf';
const outDir = 'backend/scripts/real_prob_pages';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function renderAll() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Rendering ${doc.numPages} pages...`);

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');
    await page.render({ canvasContext: context, viewport }).promise;
    const buf = canvas.toBuffer('image/png');
    const outFile = path.join(outDir, `page_${String(pageNum).padStart(3, '0')}.png`);
    fs.writeFileSync(outFile, buf);
    if (pageNum % 20 === 0 || pageNum === doc.numPages) {
      console.log(`Rendered ${pageNum}/${doc.numPages} pages.`);
    }
  }
  console.log('Rendering complete!');
}

renderAll().catch(console.error);

